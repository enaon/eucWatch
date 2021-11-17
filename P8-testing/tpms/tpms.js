//tpms sensor support
//create settings json
if (!require("Storage").read("tpms.json",1) || ( require("Storage").read("tpms.json",1) && require("Storage").readJSON("tpms.json",1).ver!=5) ) {
	let def={"ver":5};
	def.dev={};
	def.def={
			wait:10,
			try:0,
			mode:0,
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
	busy:0,
	new:0,
	status:"IDLE",
	scan:()=>{
		if (tpms.busy) {print("busy");return;}
		tpms.busy=1;
		tpms.new=0;
		tpms.try=tpms.def.try;
		tpms.cnt=getTime()|0;
		tpms.status="SCANNING";
		tpms.find();
	},	
	find:(rp,sl)=>{
		//if (!this.try && this.status!="SCANNING") this.try=this.def.try
		NRF.findDevices(function(devices) {
			let filter = [{services:[ "fbb0" ]}];
			NRF.filterDevices(devices, filter).forEach(function(device) {
				//print (device);
				let mac =device.id.split(" ")[0].split(":");
				if (mac[1]+mac[2] != "eaca") {print("unknown tpms sensor");return;}
				let id=mac[3]+mac[4]+mac[5];
				if ( tpms.def.allowNew || tpms.def.list[id] ) {
					if (!tpms.def.list[id]) {
						tpms.def.list[id]={"hiP":50,"lowP":10}
					}
					tpms.new++;
					tpms.def.ref=0;
					let dev={};
					dev={ 
						"id":id,
						"pos":mac[0][1],
						"kpa":((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000).toFixed(2),
						"bar":((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/100000).toFixed(2),
						"psi":(((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000)*0.1450377377).toFixed(2),
						"temp":((device.manufacturerData[10]|device.manufacturerData[11]<<8|device.manufacturerData[12]<<16|device.manufacturerData[13]<<24)/100).toFixed(2),
						"batt":device.manufacturerData[14],
						"volt":((330-(dev.batt/1.725))/100).toFixed(2),
						"alrm":device.manufacturerData[15],
						"time":getTime()|0,
					};
					//delete dev.log;delete dev.id;delete dev.hiP;delete dev.lowP;
					let log=(require("Storage").readJSON("tpmsLog"+id+".json",1))?require("Storage").readJSON("tpmsLog"+id+".json",1):[];
					log.unshift(dev);
					if (10<log.length) log.pop();
					require("Storage").writeJSON("tpmsLog"+id+".json",log);
					log=0;
					dev=0;
					tpms.def.id=id;
				}
			});
			if (!tpms.new) {
				if (tpms.try) {
					tpms.cnt=getTime()|0;
					tpms.try--;
					tpms.status="RETRY ("+(tpms.try+1)+")";
					tpms.find();
				}else {
					tpms.busy=0;
					tpms.new=0;
					tpms.status="NOT FOUND";
					let modT=[5,30,60];
					if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
					if (tpms.def.mode && tpms.def.mode!=4) {
						tpms.tid=setTimeout(()=>{ 
							tpms.tid=0;
							tpms.scan();
						},modT[tpms.def.mode-1]*60000);
					}
				}
			}else {
				tpms.status="SUCCESS";
				tpms.busy=0;
			}
		}, tpms.def.wait*1000);
	}
};
//run 
tpms.def=require("Storage").readJSON("tpms.json",1).def;
if (tpms.def.mode && tpms.def.mode != 4) {
	tpms.scan();
}


