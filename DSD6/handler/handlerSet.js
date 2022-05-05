//dsd6 set handler 
//kx023 https://kionixfs.kionix.com/en/datasheet/KX023-1025%20Specifications%20Rev%2012.0.pdf
// http://static6.arrow.com/aropdfconversion/d627a443f35fdb58d80c5dedaee45b6bd2b8ae25/5332090777856918an04120getting20started20with20the20kx02320and20kx02.pdf
// https://kionixfs.kionix.com/en/document/TN014%20KX022%2C%20KX023%20Accelerometer%20Power-On%20Procedure.pdf
var set={
	read:function(file,name){
		"ram";
		let got=require("Storage").readJSON([file+".json"],1);
		if (got==undefined) return false;
		if (name) {
			if (require("Storage").readJSON([file+".json"],1)[name])
			return require("Storage").readJSON([file+".json"],1)[name];
			else return false;
		}else return require("Storage").readJSON([file+".json"],1);
	},	
	write:function(file,name,value,value2,value3){
		"ram";
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
	updateBT:function(){ //run this for settings changes to take effect.
		if (set.def.hid===1) {set.def.hid=0; return;}
		//NRF.setServices(undefined,{uart:(set.def.cli||set.def.gb)?true:false,hid:(set.def.hid&&set.hidM)?set.hidM.report:undefined });
		NRF.setServices(undefined,{uart:(set.def.cli||set.def.gb)?true:false });
		if (set.def.gb) 
			eval(require('Storage').read('m_gb'));
		else {
			set.gbSend=function(){return;};
			set.handleNotificationEvent=0;set.handleFindEvent=0;handleWeatherEvent=0;handleCallEvent=0;handleFindEvent=0;sendBattery=0;global.GB=0;
		}		
		if (!set.def.cli&&!set.def.gb) { if (set.bt) NRF.disconnect(); else{ NRF.sleep();set.btsl=1;}}
		else if (set.bt) NRF.disconnect();
		else if (set.btsl==1) {NRF.restart();set.btsl=0;}
	},
	updateSettings:function(){require('Storage').write('setting.json', set.def);},
	resetSettings:function() {
		set.def = {
		name:"DSD6",   
		rfTX:-4,  
		bri:2, //Screen brightness 1..7
		dash:0,  
		cli:1,
		retry:10,
		addr:NRF.getAddress(),
		off:{},
		buzz:0
		};
		set.updateSettings();
	},
	tid:{}
};

if  (!require('Storage').read("setting.json"))
		set.resetSettings();
else 
		set.def=require('Storage').readJSON("setting.json");

if (set.def.buzz) 
buzzer = digitalPulse.bind(null,D25,1);
else buzzer=function(){return true;};
