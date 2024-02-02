//tpms sensor support
//create settings json
if (!require("Storage").read("tpms.json",1) || ( require("Storage").read("tpms.json",1) && require("Storage").readJSON("tpms.json",1).ver!=7) ) {
  let def={"ver":7};
  def.dev={};
  def.def={
    wait:60,
    try:0,
    int:0,
    ref:0,
    pos:0,
    metric:"psi",
    list:{},
    allowNew:1
  };
  require("Storage").writeJSON("tpms.json",def);
}
//tpms module
tpms= {
  euc:{},
  busy:0,
  new:0,
  status:"IDLE",
  scan:()=>{
    if (tpms.busy) return;
    tpms.busy=1;
    tpms.new=0;
    tpms.try=tpms.def.try;
    tpms.cnt=getTime()|0;
    tpms.status="SCANNING";
    if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
    tpms.find();
  },
  find:(rp,sl)=>{
    //if (!this.try && this.status!="SCANNING") this.try=this.def.try
    NRF.findDevices(function(devices) {
      devices.forEach(function(device) {
        if (device != [ ] && device.id ) {
          let mac=device.id.split(" ")[0].split(":");
          if (mac[1]+mac[2] == "eaca") {
            let id=mac[3]+mac[4]+mac[5];
            if ( tpms.def.allowNew || tpms.def.list[id] ) {
              if (!tpms.def.list[id]) {
                tpms.def.list[id]={"hiP":50,"lowP":10};
                let got=require("Storage").readJSON("tpms.json",1);
                got.def=tpms.def;
                require("Storage").writeJSON("tpms.json",got);
                got=0;
              }
              tpms.def.ref=0;
              let time=getTime()|0;
              let alrm=0;
              let dev={};
              dev={
                "id":id,
                "pos":mac[0][1],
                "kpa":((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000).toFixed(2),
                "bar":((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/100000).toFixed(2),
                "psi":(((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000)*0.1450377377).toFixed(2),
                "temp":((device.manufacturerData[10]|device.manufacturerData[11]<<8|device.manufacturerData[12]<<16|device.manufacturerData[13]<<24)/100).toFixed(2),
                "batt":device.manufacturerData[14],
                //"volt":((330-(dev.batt/1.725))/100).toFixed(2),
                "alrm":device.manufacturerData[15],
                "time":time,
              };
              device=[ ];
              tpms.new++;
              //tpms.new.time=time;
              if (dev.psi<tpms.def.list[id].lowP) {
                alrm=1;
                if (euc.state=="READY") euc.dash.alrt.warn.txt="LOW PRESSURE";
                handleInfoEvent({"src":"TPMS","title":id,"body":"LOW PRESSURE."+"  "+dev[tpms.def.metric]+" "+tpms.def.metric+"  "},1);
              } else if (tpms.def.list[id].hiP <=dev.psi) {
                alrm=2;
                if (euc.state=="READY") euc.dash.alrt.warn.txt="HI PRESSURE";
                handleInfoEvent({"src":"TPMS","title":id,"body":"HI PRESSURE."+"  "+dev[tpms.def.metric]+" "+tpms.def.metric+"  "},1);
              } else alrm=0;
              if (euc.state!="OFF") tpms.euc[id]={"time":time,"alrm":alrm,"psi":dev.psi};
              let log=(require("Storage").readJSON("tpmsLog"+id+".json",1))?require("Storage").readJSON("tpmsLog"+id+".json",1):[];
              log.unshift(dev);
              if (10<log.length) log.pop();
              require("Storage").writeJSON("tpmsLog"+id+".json",log);
              log=0;
              dev=0;
              tpms.def.id=id;
            }
          }
        }
      });
      devices=[ ];
      if (!tpms.new) {
        if (tpms.try) {
          tpms.cnt=getTime()|0;
          tpms.try--;
          tpms.status="RETRY ("+(tpms.try+1)+")";
          tpms.find();
          return;
        } else {
          tpms.busy=0;
          tpms.status="NOT FOUND";
        }
      } else {
        tpms.status="SUCCESS";
        tpms.busy=0;
      }
      if (tpms.def.int||euc.state!="OFF") {
        let intT=[2,5,30,60,360];
        if (tpms.tid) clearTimeout(tpms.tid);
        tpms.tid=setTimeout(()=>{
          tpms.tid=0;
          tpms.scan();
        },intT[tpms.def.int]*60000);
      }
    //}, tpms.def.wait*1000);
    }, {timeout :  tpms.def.wait*1000, filters : [{services:[ "fbb0" ]}] });
  }
};
//run
tpms.def=require("Storage").readJSON("tpms.json",1).def;
if (tpms.def.int) tpms.scan();
