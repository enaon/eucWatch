//euc handler
global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
    chrg:0,
	kill:0,
	night:1,
	buzz:0,
	day:[7,19],
	log:{
		trp:[0,0,0]//hour/day/month
	},
	updateDash:function(slot){require('Storage').write('eucSlot'+slot+'.json', euc.dash);},
	off:function(err){if (set.def.cli) console.log("EUC off, not connected",err);},
	wri:function(err){if (set.def.cli) console.log("EUC write, not connected",err);},
	tgl:function(){ 
		face.off();
		if (this.reconnect) {clearTimeout(this.reconnect); this.reconnect=0;}
		if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
		this.seq=1;
		ampL=[];batL=[];almL=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		if (this.state!="OFF" ) {
			buzzer([90,60,90]); 
			//log
			if (this.log.trp[0]&& 0<this.dash.trpT-this.log.trp[0] ) 
				setter.write("logDaySlot"+set.def.dash.slot,Date().getHours(),(this.dash.trpT-this.log.trp[0])+((setter.read("logDaySlot"+set.def.dash.slot,Date().getHours()))?setter.read("logDaySlot"+set.def.dash.slot,Date().getHours()):0));
			this.log.trp[0]=0;
			set.def.dash.accE=0;
			this.mac=0;
			this.state="OFF";
			acc.off();
			this.wri("end");
			setTimeout(function(){face.go("dashOff",0);},150);
			if (this.proxy) this.proxy.e();
			setTimeout(()=>{
				//print("log");
				if (this.log.trp[1]&& 0<this.dash.trpT-this.log.trp[1] ) {
					//print("week");
					setter.write("logWeekSlot"+set.def.dash.slot,Date().getDay(),(euc.dash.trpT-this.log.trp[1])+( (setter.read("logWeekSlot"+set.def.dash.slot,Date().getDay()))?setter.read("logWeekSlot"+set.def.dash.slot,Date().getDay()):0));
				}
				if (this.log.trp[2]&& 0<this.dash.trpT-this.log.trp[2] ) {
					setter.write("logYearSlot"+set.def.dash.slot,Date().getMonth(),(euc.dash.trpT-this.log.trp[2])+( (setter.read("logYearSlot"+set.def.dash.slot,Date().getMonth()))?setter.read("logYearSlot"+set.def.dash.slot,Date().getMonth()):0));	
				}
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				this.log.trp=[0,0,0];
				//if (face.appCurr!=="dashOff") face.go('dashOff',0);
				if (set.def.acc) acc.on(1);
			},1000);
			
			return;
		}else {
			buzzer(100); 
			this.log.trp=[0,0,0];
			NRF.setTxPower(4);
			this.mac=(this.mac)?this.mac:setter.read("dash","slot"+setter.read("dash","slot")+"Mac");
			if(!this.mac) {
				face.go('dashScan',0);return;
			}else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				if (set.def.emuZ&&require('Storage').read('proxy'+euc.dash.maker)){
					eval(require('Storage').read('proxy'+euc.dash.maker));
				}				
				this.state="ON";
				if (this.dash.bms==undefined) this.dash.bms=1.5;
				if (this.dash.batF<=10) this.dash.batF=420;
				if (this.dash.maker!=="Kingsong"||this.dash.maker!=="inmotionV11") this.dash.spdM=0;
				this.conn(this.mac);
				face.go(set.dash[set.def.dash.face],0);
				this.state="ON";
				if (set.def.acc) acc.off();
				setTimeout(()=>{set.def.dash.accE=1;acc.on(2); },1000);
				if (euc.dash.tpms&&global.tpms&&!tpms.def.int) {tpms.euc={}; setTimeout(()=>{tpms.scan(); },10000);}//tpms
				return;
			}
		}
	} 
};

//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
	euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else 
	euc.dash=require("Storage").readJSON("eucSlot.json",1);
set.def.dash.slot=require("Storage").readJSON("dash.json",1).slot;
//more
setTimeout(()=>{if (require('Storage').read('tpms')) eval(require('Storage').read('tpms'));},2000);

