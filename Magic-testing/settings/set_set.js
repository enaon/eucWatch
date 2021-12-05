TC.removeAllListeners("tc5");
face[0].btn={};
face[0].page="set";
let tmp={cli:-1,};
tmp.bt=(set.def.cli||set.def.gb||set.def.emuZ)?1:0;
UI.ele.ind("top",1,2);
UI.btn.img("_2x3",1,tmp.bt?UI.icon.bt:UI.icon.plane,"BT",15,1);
UI.btn.img("_2x3",2,UI.icon.themes,"TIMEOUT",15,1);
UI.btn.img("_2x3",3,UI.icon.bri,"BRIGHT",15,1);
UI.btn.img("_2x3",4,UI.icon.findPhone,"FIND",0,3);
UI.btn.img("_2x3",5,UI.icon.wakeScreen,"WAKE",set.def.acc?15:0,set.def.acc?4:3);
UI.btn.img("_2x3",6,set.def.buzz?UI.icon.dndOn:UI.icon.dndOff,"BUZZER",set.def.buzz?15:0,set.def.buzz?4:3);


UI.btn.img("_bar",1,UI.icon.torch,0,14,0);//btn2
UI.btn.img("_bar",2,UI.icon.settings,0,14,0);//btn2
UI.btn.img("_bar",3,UI.icon.alarm,0,14,0);//btn2
if (set.def.bpp) w.gfx.flip();
//
face[0].btn._2x3_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_bt'));};
face[0].btn._2x3_2=()=>{buzzer(buz.na);};
face[0].btn._2x3_3=()=>{
	buzzer(buz.ok);
	w.gfx.bri.lv++;
	if (7<w.gfx.bri.lv) w.gfx.bri.lv=1;
	w.gfx.bri.set(w.gfx.bri.lv);  
	//UI.btn.img("_2x3",6,img,"BRIGHT",15,1);
	if (set.def.bpp) w.gfx.flip();
};
face[0].btn._2x3_4=()=>{buzzer(buz.na);};
face[0].btn._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.acc=1-set.def.acc;
	UI.btn.img("_2x3",5,UI.icon.wakeScreen,"WAKE",set.def.acc?15:0,set.def.acc?4:3);
	if (set.def.bpp) w.gfx.flip();
	setter.accR();
};
face[0].btn._2x3_6=()=>{
	buzzer(buz.ok);
	set.def.buzz=1-set.def.buzz;
	UI.btn.img("_2x3",6,set.def.buzz?UI.icon.dndOn:UI.icon.dndOff,"BUZZER",set.def.buzz?15:0,set.def.buzz?4:3);
	if (set.def.bpp) w.gfx.flip();
	if (set.def.buzz){ 
		buzzer=digitalPulse.bind(null,ew.pin.BUZZ,0);buzzer(buz.ok);
	}else{
		buzzer(buz.ok);
		buzzer=function(){};
	}
};
//bar
face[0].btn._bar_1=()=>{buzzer(buz.na);};
face[0].btn._bar_2=()=>{
	if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
		buzzer(buz.ok);face.go(face.faceSave[0].substring(0,4)+"Options",0);
	}else buzzer(buz.na);
};
face[0].btn._bar_3=()=>{buzzer(buz.ok);face.go('alarm',0);};