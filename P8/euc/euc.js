global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
    chrg:0,
    lock:0,
	updateDash:function(slot){require('Storage').write('euc_slot'+slot+'.json', euc.dash);},
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
}else euc.dash=require("Storage").readJSON("euc_slot.json",1);
//if (!Boolean(require("Storage").read('euc_slot'+require("Storage").readJSON("dash.json",1).slot+'.json')))
//euc.resetDash(require("Storage").readJSON("dash.json",1).slot);