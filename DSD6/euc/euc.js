//euc module loader
global.euc= {
	state: "OFF",
	reconnect:0,
    busy:0,
	night:1,
	day:[7,19],
	update:function(slot){require('Storage').write('eucSlot'+slot+'.json', euc.dash);},
	on:function(){
		if (this.state!="OFF") return;
		NRF.setTxPower(4);
		this.mac=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"];
		if(!this.mac) {
			print("nomac");
			//eval(require('Storage').read('eucScan'));
			//scan.go('dash','fff0');
		}else {
			print("on");
			eval(require('Storage').read('euc'+require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]));
			this.state="ON";
			//if (global.acc) acc.on(2);
			this.conn(this.mac); 
			euc.emit("state","on");
		}
	},
	off:function(){
			if (this.state=="OFF") return;
			print("off");
			//if (global.acc) acc.on(1);
			this.state="OFF";
			euc.wri("end");
			setTimeout(()=>{euc.update(require("Storage").readJSON("dash.json",1).slot);},500);
			euc.emit("state","off");
			return;
	},
	tgl:function(){ 


	}
};
//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("setting.json",1).dashSlot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("setting.json",1).dashSlot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);
