//	//this.maker=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'];
//	//this.mac=require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Mac'];

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
			digitalPulse(D16,1,[90,60,90]);  
			set.def.accE=0;
			if (!set.def.acc) {acc.off();}
			this.seq=1;
			this.state="OFF";
   			face.go(set.dash[set.def.dash],0);
			//if (this.kill) clearTimout(this.kill);
			//this.kill=setTimeout(()=>{
			//if (euc.dash.emu) {set.def.atc=0;set.upd();}
			if (require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]!="Ninebot") 
				euc.wri("end");
			else  
				euc.wri(0);
			if (euc.busy)euc.busy=0;
			setTimeout(()=>{euc.updateDash(require("Storage").readJSON("dash.json",1).slot);},500);
			return;
		}else {
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			//if (euc.dash.emu){set.def.atc=1;set.def.gb=0;set.def.cli=0;set.def.hid=0;set.upd();}
			this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"];
			if(!this.mac) {
				face.go('dashScan',0);return;
		    }else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				this.state="ON";
				if (!set.def.acc) {set.def.accE=1;acc.on();}
				this.seq=1;
				this.conn(this.mac); 
				face.go(set.dash[set.def.dash],0);return;
            }
		}
	} 
};
//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);
