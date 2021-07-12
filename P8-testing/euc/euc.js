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
	tgl:function(){ 
		face.off();
		this.seq=1;
		ampL=[];batL=[];almL=[];
		if (this.state!="OFF" ) {
			digitalPulse(D16,1,[90,60,90]);  
			set.def.accE=0;
			if (!set.def.acc) {acc.off();}
			this.state="OFF";
			face.go("dashOff",0);
			euc.wri("end");
			if (euc.busy)euc.busy=0;
			setTimeout(()=>{euc.updateDash(require("Storage").readJSON("dash.json",1).slot);},500);
			return;
		}else {
			NRF.setTxPower(4);
			digitalPulse(D16,1,100); 
			this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"];
			if(!this.mac) {
				face.go('dashScan',0);return;
		    }else {
				eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
				this.state="ON";
				if (!set.def.acc) {set.def.accE=1;acc.on();}
				if (euc.dash.bms==undefined) euc.dash.bms=1.5;
				if (euc.dash.maker=="Begobe"||euc.dash.maker=="NinebotZ")euc.dash.spdM=0;
				this.conn(this.mac); 
				face.go(set.dash[set.def.dash.face],0);return;
            }
		}
	} 
};


//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);

