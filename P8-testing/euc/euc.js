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
		tid:0,
		trpS:0,
		hrsS:0,
		datS:0,
		monS:0,
		strt:function(){
			if (this.tid) {clearInterval(this.tid); this.tid=0;}
			this.trpS=euc.dash.trpT;
			this.hrsS=Date().getHours();
			this.wekS=Date().toString().split(' ')[0];
			this.monS=Date().toString().split(' ')[1];
			this.tid=setInterval((s)=>{
				if (s!=euc.dash.trpT){
					clearInterval(this.tid); this.tid=0;	
					this.trpS=euc.dash.trpT;
					this.tid=setInterval(()=>{
						if (this.hrsS!=Date().getHours()){
							set.write("logDaySlot"+set.read("dash","slot"),this.hrsS,(euc.dash.trpT-this.log.trpS)+( (set.read("logDaySlot"+set.read("dash","slot"),this.hrsS))? set.read("logDaySlot"+set.read("dash","slot"),this.hrsS):0));
							this.hrsS=Date().getHours();
						}
					},60000);
				}
			},1000,this.trpS);
		}
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
			//log
			if (euc.log.tid) {clearInterval(euc.log.tid); euc.log.tid=0;}
			set.write("logDaySlot"+set.read("dash","slot"),euc.log.hrsS,(euc.dash.trpT-this.log.trpS)+( (set.read("logDaySlot"+set.read("dash","slot"),euc.log.hrsS))?set.read("logDaySlot"+set.read("dash","slot"),euc.log.hrsS):0));
			set.write("logMonthSlot"+set.read("dash","slot"),euc.log.datS,(euc.dash.trpT-this.log.trpS)+( (set.read("logMonthSlot"+set.read("dash","slot"),euc.log.datS))?set.read("logMonthSlot"+set.read("dash","slot"),euc.log.datS):0));
			set.write("logYearSlot"+set.read("dash","slot"),euc.log.monS,(euc.dash.trpT-this.log.trpS)+( (set.read("logYearSlot"+set.read("dash","slot"),euc.log.monS))?set.read("logYearSlot"+set.read("dash","slot"),euc.log.monS):0));

			digitalPulse(D16,1,[90,60,90]);  
			set.def.dash.accE=0;
			if (!set.def.acc) {acc.off();}
			this.state="OFF";
			this.wri("end");
			this.mac=0;
			//save
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
				this.log.strt();
			}
		}
	} 
};

//init
if (Boolean(require("Storage").read('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json'))) { 
euc.dash=require("Storage").readJSON('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json',1);
}else euc.dash=require("Storage").readJSON("eucSlot.json",1);

