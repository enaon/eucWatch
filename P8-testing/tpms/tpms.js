if (!require("Storage").read("tpms.json",1) || ( require("Storage").read("tpms.json",1) && require("Storage").readJSON("tpms.json",1).ver!=3) ) {
	let def={"ver":3};
	def.dev={};
	def.def={
			wait:10,
			try:0,
			mode:0,
			ref:0,
			pos:0,
			metric:"psi"
	};			
	require("Storage").writeJSON("tpms.json",def);
}

tpms= {
	busy:0,
	new:0,
	status:"IDLE",
	scan:(rp,sl)=>{
		if (sl) tpms.def.id=sl;
		if (rp) tpms.def.try=rp;
		if (tpms.busy) {print("busy");return;}
		tpms.busy=1;
		tpms.def.id="";
		tpms.status="SCANNING";
		NRF.findDevices(function(devices) {
			this.filter = [{services:[ "fbb0" ]}];
			NRF.filterDevices(devices, this.filter).forEach(function(device) {
				//print (device);
				let mac =device.id.split(" ")[0].split(":");
				if (mac[1]+mac[2] != "eaca") {print("unknown tpms sensor");return;}
				let id=mac[3]+mac[4]+mac[5];
				tpms.new++;
				tpms.def.id=id;
				let dev=(set.read("tpms","dev")[id])?set.read("tpms","dev")[id]:{};
				dev.id=id;
				dev.pos=mac[0][1];
				dev.kpa=((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000).toFixed(2);
				dev.bar=(dev.kpa/100).toFixed(2);
				dev.psi=(dev.kpa*0.1450377377).toFixed(2);
				dev.temp=((device.manufacturerData[10]|device.manufacturerData[11]<<8|device.manufacturerData[12]<<16|device.manufacturerData[13]<<24)/100).toFixed(2);
				dev.batt=device.manufacturerData[14];
				dev.volt=((330-(dev.batt/1.725))/100).toFixed(2);
				dev.alrm=device.manufacturerData[15];
				let last= (getTime()|0)-dev.time;
				dev.time=getTime()|0;
				set.write("tpms","dev",id,dev);
				//logging
				if ( set.read("tpms","dev")[id].log) {
					delete dev.log;delete dev.id;delete dev.hiP;delete dev.lowP;
					let log=(require("Storage").readJSON("tpmsLog"+id+".json",1))?require("Storage").readJSON("tpmsLog"+id+".json",1):[];
					log.unshift(dev);
					if (10<log.length) log.pop();
					require("Storage").writeJSON("tpmsLog"+id+".json",log);
					log=0;
					dev=0;
				}
				tpms.status="SUCCESS";
				tpms.busy=0;
				return;
			});
			if (tpms.def.id=="") {
				if (tpms.def.try) {
					tpms.status="RETRYING:"+tpms.def.try;
					tpms.def.try--;
					tpms.busy=0;
					tpms.scan();
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
						},modT[mode-1]*60000);
					}
				}
			}
		}, tpms.def.wait*1000);
	}
};
//start
tpms.def=require("Storage").readJSON("tpms.json",1).def;
if (tpms.def.mode-0 && tpms.def.mode != 4) {
	tpms.scan(tpms.def.try);
}


