//	//this.maker=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'];
//	//this.mac=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Mac'];

//day={1:22,2:1,3:2,10:3};
//set.write("logDay",Date().getHours(),{3:5,4:10,10:10})
//set.read("logDay","day")[6]
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
		trpS:0
	},
	updateDash:function(slot){require('Storage').write('eucSlot'+slot+'.json', euc.dash);},
	off:function(err){if (set.def.cli) console.log("EUC off, not connected");},
	wri:function(err){if (set.def.cli) console.log("EUC write, not connected");},
	tgl:function(){ 
		face.off();
		if (this.reconnect) {clearTimeout(this.reconnect); this.reconnect=0;}
		if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
		this.seq=1;
		ampL=[];batL=[];almL=[];
		if (this.state!="OFF" ) {
			digitalPulse(D16,1,[90,60,90]); 
			//log
			if (this.log.trpS&& 0<this.dash.trpT-this.log.trpS ) set.write("logDaySlot"+set.def.dash.slot,Date().getHours(),(this.dash.trpT-this.log.trpS)+((set.read("logDaySlot"+set.def.dash.slot,Date().getHours()))?set.read("logDaySlot"+set.def.dash.slot,Date().getHours()):0));
			set.def.dash.accE=0;
			if (!set.def.acc) {acc.off();}
			this.mac=0;
			this.state="OFF";
			this.wri("end");
			setTimeout(()=>{
				if (this.log.trpS&& 0<this.dash.trpT-this.log.trpS ) {
					set.write("logWeekSlot"+set.def.dash.slot,Date().getDay(),(euc.dash.trpT-this.log.trpS)+( (set.read("logWeekSlot"+set.def.dash.slot,Date().getDay()))?set.read("logWeekSlot"+set.def.dash.slot,Date().getDay()):0));
					set.write("logMonthSlot"+set.def.dash.slot,Date().getMonth(),(euc.dash.trpT-this.log.trpS)+( (set.read("logMonthSlot"+set.def.dash.slot,Date().getMonth()))?set.read("logMonthSlot"+set.def.dash.slot,Date().getMonth()):0));	
				}
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);NRF.setTxPower(set.def.rfTX);
				this.log.trpS=0;
			},1000);
			return;
		}else {
			this.log.trpS=0;
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			this.mac=(this.mac)?this.mac:set.read("dash","slot"+set.read("dash","slot")+"Mac");
			if(!this.mac) {
				face.go('dashScan',0);return;
			}else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				if (!set.def.acc) {set.def.dash.accE=1;acc.on();}
				if (this.dash.bms==undefined) this.dash.bms=1.5;
				if (this.dash.maker!=="Kingsong"||this.dash.maker!=="inmotionV11") this.dash.spdM=0;
				this.state="ON";
				face.go(set.dash[set.def.dash.face],0);
				this.conn(this.mac);
				return;
			}
		}
	} 
};

//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);
set.def.dash.slot=require("Storage").readJSON("dash.json",1).slot;