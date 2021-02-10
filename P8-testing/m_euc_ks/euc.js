global.euc= {
	state: "OFF",
	reconnect:0,
	mac:0,
	maker:"kingsong",
	updateDash:function(wheel){require('Storage').write('euc_slot'+wheel+'_info.json', euc.dash);},
	resetDash:function(slot) {
		euc.dash = {
			spd: ["0","0"],spdA:0,spdT:0,spdC:0,
			amp: "0",ampC:0, 
			batt: "0",batC:0, 
			temp: "0",tmpC:0, 
			trpU:"0.0",trpL:"0.0",trpT:"0.0",trpR:"0.0",trpC:0,
			//aver:"0.0",
			//rdmd:0,
			time:"0",
			lock: -1,
			alrm: 0,
			ride:0,
			//conn: "OFF",
			//aLck: 0,far:83,near:65,
			busy:0,
			maker:"kingsong",
			model:"S18",
			chrg:0
		};
		this.update(wheel);
	},
	tgl:function(){ 
		if (this.state!="OFF" ) {
			digitalPulse(D16,1,[90,60,90]);  
			if (this.reconnect ||  this.state=="WAIT" || this.state=="ON") {
			clearTimeout(this.reconnect); this.reconnect=0;
			}
			if (!set.def.acc) acc.off();
			this.state="OFF";
			face.go(set.dash[set.def.dash],0);return;
		}else {
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"_mac"]
			if(!this.mac) {
			face.go('dashScan',0);return;
		}else {
			//if (this.maker=="ninebot"&&this.state == "OFF") euc.tmp.count=22; else euc.tmp.count=0;  //unlock	
			this.state="ON";
			if (!set.def.acc) acc.on();
			this.conn(this.mac); 
			face.go(set.dash[set.def.dash],0);return;
		}
	} 
};

 