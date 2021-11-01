tpms= {
	busy:0,
	try:0,
	wait:10,
	def:"",
	status:"IDLE",
	//slot:{},
	scan:(rp,sl)=>{
		if (!tpms.slot) tpms.slot={};
		if (sl) tpms.def=sl;
		if (rp) tpms.try=rp;
		if (tpms.busy) {print("busy");return;}
		tpms.busy=1;
		tpms.def="";
		NRF.findDevices(function(devices) {
			tpms.status="SCANNING";
			this.filter = [{services:[ "fbb0" ]}];
			NRF.filterDevices(devices, this.filter).forEach(function(device) {
				print (device);
				let mac =device.id.split(" ")[0].split(":");
				let id=mac[3]+mac[4]+mac[5];
				if (!tpms.slot[id]) {
					if (mac[1]+mac[2] == "eaca") tpms.slot[id]={};
					else {
						tpms.status="NOT FOUND";
						return;
					}
				}
				tpms.def=id;
				tpms.slot[id].pos=mac[0][1];
				tpms.slot[id].kpa=((device.manufacturerData[6]|device.manufacturerData[7]<<8|device.manufacturerData[8]<<16|device.manufacturerData[9]<<24)/1000).toFixed(2);
				tpms.slot[id].bar=(tpms.slot[id].kpa/100).toFixed(2);
				tpms.slot[id].psi=(tpms.slot[id].kpa*0.1450377377).toFixed(2);
				tpms.slot[id].temp=((device.manufacturerData[10]|device.manufacturerData[11]<<8|device.manufacturerData[12]<<16|device.manufacturerData[13]<<24)/100).toFixed(2);
				tpms.slot[id].batt=device.manufacturerData[14];
				tpms.slot[id].volt=((330-(tpms.slot[id].batt/1.725))/100).toFixed(2);
				tpms.slot[id].alrm=device.manufacturerData[15];
				let last= (getTime()|0)-tpms.slot[id].time;
				print("Got new reading, last reading was",(last<60)?last+" secs ago":(last<3600)?last/60|0+" min ago":(last<86400)?last/3600|0+" hour ago":"never");
				tpms.status="SUCCESS";
				tpms.slot[id].time=getTime()|0;
				print(tpms.slot[id]);
				tpms.busy=0;
			});
			if (tpms.def=="") {
				if (tpms.try) {
					tpms.try--;
					print("Retry :",tpms.try);
					tpms.status=("RETRYING:",tpms.try);
					tpms.busy=0;tpms.scan();
					//setTimeout(()=>{ tpms.busy=0;tpms.scan();},1000);
				}else {
					tpms.busy=0;
					tpms.status="NOT FOUND";
				}
			}
		}, tpms.wait*1000);
	}
};

