//settings - run set.upd() after changing BT settings to take effect.
var set={
	bt:0, //Incomming BT service status indicator- Not user settable.0=not_connected|1=unknown|2=webide|3=gadgetbridge|4=eucemu|5=esp32
	tor:0, //Enables/disables torch- Not user settable.
	ondc:0, //charging indicator-not user settable.
	btsl:0, //bt sleep status-not user settable.
	gIsB:0,//gat status-n.u.s- 0=not busy|1=busy 
	fmp:0, //find my phone-n.u.s.
	boot:getTime(), 
	dash:[],
	tid:{},
	read:function(file,name){
		let got=require("Storage").readJSON([file+".json"],1);
		if (got==undefined) return false;
		if (name) {
			if (require("Storage").readJSON([file+".json"],1)[name])
			return require("Storage").readJSON([file+".json"],1)[name];
			else return false;
		}else return require("Storage").readJSON([file+".json"],1);
	},	
	write:function(file,name,value,value2,value3){
		let got=require("Storage").readJSON([file+".json"],1);
		if (got==undefined) got={};
		if (!value)  delete got[name]; //delete
		else {
			if (value2 && got[name] ) 
				if (value3 || value3==0) got[name][value][value2]=value3;
				else got[name][value]=value2;
			else 
				got[name]=value;
		}
		require("Storage").writeJSON([file+".json"],got);
		return true;
	},
	gDis:function(){
		if (this.gIsB) {
			this.gIsb=2;
			if (global["\xFF"].BLE_GATTS) {
				if (global["\xFF"].BLE_GATTS.connected)
				global["\xFF"].BLE_GATTS.disconnect().then(function (c){this.gIsB=0;});
			}else gIsB=0;
		 }
	},
	updateSettings:function(){require('Storage').write('setting.json', set.def);},
	resetSettings:function() {
		set.def = {
		dash:{
			mph:0, 
			amp:0, 
			bat:0,
			batS:0, 
			face:0,  
			accE:0,//euc acc on/off
			clck:0,
			clkS:0,	
			farn:0,
			rtr:5
		},
		off:{ //face timeout 
		},
		name:"eucWatch", //Set the name to be broadcasted by the Bluetooth module. 
		timezone:0, //Timezone
		hr24:1, //24 hour mode
		woe:1, //wake Screen on event.0=disable|1=enable
		wob:1, //wake Screen on Button press.0=disable|1=enable
		rfTX:-4, //BT radio tx power, -4=low|0=normal|4=high
		cli:1, //Nordic serial bluetooth access. Enables/disables Espruino Web IDE.
		hid:0, //enable/disable Bluetooth music controll Service.
		gb:0,  //Notifications service. Enables/disables support for "GadgetBridge" playstore app.
		atc:0, //Notifications service. Enables/disables support for "d6 notification" playstore app from ATC1441.
		emuZ:0, //emulator service. Enables/disables bridge support for euc world, wheelog, darknessbot emulating a z10 .
		acc:0, //enables/disables wake-screen on wrist-turn. 
		hidT:"media", //joy/kb/media
		bri:2, //Screen brightness 1..7
		acctype:"0",
		touchtype:"0",
		buzz:1
		};
		set.updateSettings();
	},
	accR:function(){if(!this.def.dash.accE) { if (this.def.acc)acc.on(); else acc.off();}},
	hidM:undefined, //not user settable.
	clin:0,//not settable
	upd:function(){ //run this for settings changes to take effect.
		NRF.setAdvertising({}, { name:set.def.name,connectable:true });
		NRF.setAddress(NRF.getAddress(),+" random");
		if (this.def.hid===1) {this.def.hid=0; return;}
		if (this.def.emuZ){
			this.def.cli=0;
			this.def.gb=0;
			this.def.hid=0;
			eval(require('Storage').read('emuZ'));
			// ninebotZ emu support
			NRF.setAdvertising({},{manufacturerData:[78, 66, 18, 0, 0, 0, 0, 237]});
			NRF.setServices({
				0xfee7: {
					0xfec8: {
					},
					0xfec7: {
					},
					0xfec9: {
					}
				}
			}, { uart: true});
		}else {
			NRF.setServices(undefined,{uart:(this.def.cli||this.def.gb)?true:false,hid:(this.def.hid&&this.hidM)?this.hidM.report:undefined });
			if (global.emuZ)  global.emuZ=0;
			//if (this.atcW) {this.atcW=undefined;this.atcR=undefined;} 
		}
		if (this.def.gb) eval(require('Storage').read('m_gb'));
		else {
			this.gbSend=function(){return;};
			this.handleNotificationEvent=0;this.handleFindEvent=0;handleWeatherEvent=0;handleCallEvent=0;handleFindEvent=0;sendBattery=0;global.GB=0;
		}		
		if (!this.def.cli&&!this.def.gb&&!this.def.emuZ&&!this.def.hid) { if (this.bt) NRF.disconnect();  NRF.sleep();this.btsl=1;}
		else if (this.bt) NRF.disconnect();
		else if (this.btsl==1) {NRF.restart();this.btsl=0;}
	}
};

set.def = require('Storage').readJSON('setting.json', 1);
if (!set.def) {set.resetSettings();set.updateSettings();}
if (set.def.buzz) buzzer = digitalPulse.bind(null,D16,1);
else buzzer=function(){return true;};
if (!set.def.off) set.def.off={};
//dash
require('Storage').list("dash_").forEach(dashfile=>{
	set.dash.push(dashfile);
});
if (!Boolean(require("Storage").read("dash.json"))) { 
	let dash={slot:1};
	require('Storage').write('dash.json', dash);
}
//
E.setTimeZone(set.def.timezone);
