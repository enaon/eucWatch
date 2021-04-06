//euc module loader
global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
    chrg:0,
	kill:0,
	night:1,
	day:[7,19],
	updateDash:function(slot){require('Storage').write('eucSlot'+slot+'.json', euc.dash);},
	tgl:function(){ 
		if (this.state!="OFF" ) {
			buzzer(1,200);
			if (!set.def.acc) {acc.off();}
			this.seq=1;
			this.state="OFF";
   			face.go("dash",0);
			if (require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]!="Ninebot") 
				euc.wri("end");
			else  
				euc.wri(0);
			if (euc.busy)euc.busy=0;
			setTimeout(()=>{euc.updateDash(require("Storage").readJSON("dash.json",1).slot);},500);
			return;
		}else {
			buzzer(1,100);
			NRF.setTxPower(4);
			this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"];
			if(!this.mac) {
				print("nomac");
			//	face.go('dashScan');return;
		    }else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				this.state="ON";
				if (!set.def.acc) {set.def.accE=1;acc.on();}
				this.seq=1;
				this.conn(this.mac); 
				face.go("dash");return;
            }
		}
	} 
};
//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("setting.json",1).dashSlot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("setting.json",1).dashSlot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);
