//dsd6 set handler 
//kx023 https://kionixfs.kionix.com/en/datasheet/KX023-1025%20Specifications%20Rev%2012.0.pdf
// http://static6.arrow.com/aropdfconversion/d627a443f35fdb58d80c5dedaee45b6bd2b8ae25/5332090777856918an04120getting20started20with20the20kx02320and20kx02.pdf
// https://kionixfs.kionix.com/en/document/TN014%20KX022%2C%20KX023%20Accelerometer%20Power-On%20Procedure.pdf
var set={
	write:function(file,name,value){
		let got=require("Storage").readJSON([file+".json"],1);
		if (!value) delete got[name];
		else got[name]=value;
		require("Storage").writeJSON([file+".json"],got);
		return true;
	},
	updateSettings:function(){require('Storage').write('setting.json', set.def);},
	resetSettings:function() {
		set.def = {
		name:"DSD6",   
		rfTX:-4,  
		bri:2, //Screen brightness 1..7
		dash:0,  
		};
		set.updateSettings();
	},
	def:{
		dash:0
	};
	tid:{}
};
