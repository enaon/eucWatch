if (!set.read("tpms")) {
	set.write("tpms","dev",{});
	set.write("tpms","mode",0);
}

tpms= {
	busy:0,
	try:0,
	wait:10,
	def:"",
	new:0,
	status:"IDLE",
	scan:(rp,sl)=>{
		if (sl) tpms.def=sl;
		if (rp) tpms.try=rp;
		if (tpms.busy) {print("busy");return;}
		tpms.busy=1;
		tpms.def="";
		tpms.status="SCANNING";
		NRF.findDevices(function(devices) {
			this.filter = [{services:[ "fbb0" ]}];
			NRF.filterDevices(devices, this.filter).forEach(function(device) {
				//print (device);
				let mac =device.id.split(" ")[0].split(":");
				let id=mac[3]+mac[4]+mac[5];
				if (!set.read("tpms","dev")[id]) {
					if (mac[1]+mac[2] == "eaca") {
						let slot=(set.read("tpms","slot"))?set.read("tpms","slot"):[];
						slot.unshift(id);
						set.write("tpms","slot",slot);
						//set.write("tpms","dev",);
					}else {
						tpms.new=0;
						tpms.status="NOT FOUND";
						let mode=set.read("tpms","mode")-0;
						let modT=[5,30,60];
						if (mode && mode!=4) {
							if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
							tpms.tid=setTimeout(()=>{ 
								tpms.tid=0;
								tpms.scan();
							},modT[mode]*60000);
						}	
						print(1);
						return;
					}
				}
				tpms.new++;
				tpms.def=id;
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
				//print("Got new reading, last reading was",(last<60)?last+" secs ago":(last<3600)?last/60|0+" min ago":(last<86400)?last/3600|0+" hour ago":"never");
				dev.time=getTime()|0;
				//print(dev);
				set.write("tpms","dev",id,dev);
				//logging
				if ( set.read("tpms","dev")[id].log) {
					delete dev.log;delete dev.id;delete dev.hiP;delete dev.lowP;
					set.write("tpmsLog"+id,dev.time,dev);
				}
				tpms.status="SUCCESS";
				tpms.busy=0;
				return;
			});
			if (tpms.def=="") {
				if (tpms.try) {
					tpms.status="RETRYING:"+tpms.try;
					tpms.try--;
					tpms.busy=0;
					tpms.scan();
					//setTimeout(()=>{ tpms.busy=0;tpms.scan();},1000);
				}else {
					tpms.busy=0;
					tpms.new=0;
					tpms.status="NOT FOUND";
					let mode=set.read("tpms","mode")-0;
					let modT=[5,30,60];
					if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
					if (mode && mode!=4) {
						tpms.tid=setTimeout(()=>{ 
							tpms.tid=0;
							tpms.scan();
						},modT[mode-1]*60000);
					}
					//print(3);
				}
			}
		}, tpms.wait*1000);
	}
};
//start
tpms.metric=(set.read("tpms","metric"))?set.read("tpms","metric"):"psi";
tpms.mode=set.read("tpms","mode")-0;
if (set.read("tpms","mode")-0 && set.read("tpms","mode")-0 != 4) {
	tpms.scan(tpms.try);
}


