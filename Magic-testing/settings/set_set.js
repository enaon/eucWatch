face[0].page="set";
UIc.get=1;
UIc.cord="";
let tmp={cli:-1,};
tmp.bt=(set.def.cli||set.def.gb||set.def.emuZ)?1:0;
UI.ele.ind("top",1,2);
UI.btn.img("_2x3",1,tmp.bt?UI.icon.bt:UI.icon.plane,"BT",15,1);
UI.btn.img("_2x3",2,UI.icon.themes,"Face",15,1);
UI.btn.img("_2x3",3,UI.icon.bri,"Lum",15,1);
UI.btn.img("_2x3",4,UI.icon.findPhone,"FIND",0,3);
UI.btn.img("_2x3",5,UI.icon.wakeScreen,"WAKE ",set.def.acc?15:0,set.def.acc?4:3);
UI.btn.img("_2x3",6,set.def.buzz?UI.icon.dndOn:UI.icon.dndOff,"Buzzer",set.def.buzz?15:0,set.def.buzz?4:3);
if (set.def.bpp) w.gfx.flip();
//get coordinates  
UIc.tap.btn.replaceWith( new Function("x", "y",'setTimeout(()=>{'+UIc.cord+'},0);'));
//UIc.tap.btn = new Function("x", "y",'setTimeout(()=>{'+UIc.cord+'},0);'); 
UIc.get=0;UIc.cord="";
//TC.on('tc5',UIc.tap.btn);
//
face[0].btn._2x3_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_bt'));};
face[0].btn._2x3_2=()=>{buzzer(buz.ok);eval(require('Storage').read('set_theme'));};
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