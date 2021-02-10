global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
    chrg:0,
    lock:0,
	updateDash:function(slot){require('Storage').write('euc_slot'+slot+'.json', euc.dash);},
	resetDash:function(slot) {
       // this.dash=require("Storage").readJSON("dash.json",1).defaults;
		euc.dash = {
			spd:0,spdA:0,spdR:0,spdT:0,spdC:0,//average/ride/top/color
			spd1:23,spd2:23,spd3:23,spdS:1,
			amp:"0",ampC:0, 
            ampH:18,ampL:-6,ampS:1,
			bat:"0",batC:0, 
            batM:40,batL:20,
     		tmp:"0",tmpC:0, 
            tmpH: 60,
			trpU:"0.0",trpL:"0.0",trpT:"0.0",trpR:"0.0",trpC:0, //user/last/total/remaining/color
			time:"0",
            buzz:0,
            aOff:0,//auto off
            aLck:0,//auto lock
            pLck:0,far:83,near:65,//proximity lock
            mode:0, // ride mode
            maker:require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"_maker"],
			mac:require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"_mac"],
			model:"S18",
        };
		this.updateDash(slot);
	},
	tgl:function(){ 
		if (this.state!="OFF" ) {
			digitalPulse(D16,1,[90,60,90]);  
			if (this.reconnect ||  this.state=="WAIT" || this.state=="ON") {
				clearTimeout(this.reconnect); this.reconnect=0;
			}
			if (!set.def.acc) acc.off();
			this.state="OFF";
			this.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go(set.dash[set.def.dash],0);return;
		}else {
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"_mac"];
			if(!this.mac) {
				face.go('dashScan',0);return;
		    }else {
				delete euc.conn;delete euc.wri;delete euc.cmd;delete euc.tmp;
				eval(require('Storage').read('euc_'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"_maker"]));
				this.state="ON";
				if (!set.def.acc) acc.on();
				this.conn(this.mac); 
				face.go(set.dash[set.def.dash],0);return;
            }
		}
	} 
};
if (Boolean(require("Storage").read('euc_slot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('euc_slot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.resetDash(require("Storage").readJSON("dash.json",1).slot);
//if (!Boolean(require("Storage").read('euc_slot'+require("Storage").readJSON("dash.json",1).slot+'.json')))
//euc.resetDash(require("Storage").readJSON("dash.json",1).slot);