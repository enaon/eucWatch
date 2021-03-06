//	//this.maker=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'];
//	//this.mac=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Mac'];
				
global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
    chrg:0,
	kill:0,
	night:1,
	buzz:0,
	day:[7,19],
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
			face.go("dashOff",0);
			set.def.dash.accE=0;
			if (!set.def.acc) {acc.off();}
			this.state="OFF";
			this.wri("end");
			this.mac=0;
			setTimeout(()=>{euc.updateDash(require("Storage").readJSON("dash.json",1).slot);NRF.setTxPower(set.def.rfTX);},500);
			return;
		}else {
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			this.mac=(this.mac)?this.mac:set.read("dash","slot"+set.read("dash","slot")+"Mac");
			if(!this.mac) {
				face.go('dashScan',0);return;
		    }else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				this.state="ON";
				this.conn(this.mac);
				if (!set.def.acc) {set.def.dash.accE=1;acc.on();}
				if (this.dash.bms==undefined) this.dash.bms=1.5;
				if (this.dash.maker!=="Kingsong"||this.dash.maker!=="inmotionV11") this.dash.spdM=0;
				setTimeout(()=>{face.go(set.dash[set.def.dash.face],0);},100);
			}
		}
	} 
};

//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);

