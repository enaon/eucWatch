this.page="set";
UI.ele.fill("_ele","topS",1);
UI.ele.ind("top",1,2);
UIc.start(1,0);
UI.btn.img("main","_2x3",1,(set.def.cli||set.def.gb||set.def.emuZ)?_icon.bt:_icon.plane,"BT",15,1);
UI.btn.img("main","_2x3",2,_icon.themes,"FACE",15,1);
UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
UI.btn.img("main","_2x3",4,_icon.findPhone,"FIND",3,0);
UI.btn.img("main","_2x3",5,_icon.wakeScreen,"WAKE ",set.def.acc?15:3,set.def.acc?4:0);
UI.btn.img("main","_2x3",6,set.def.buzz?_icon.dndOn:_icon.dndOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
UIc.end();
face[0].bar = function(){
		//UI.ele.fill("_ele","btmL",0);
		UIc.start(0,1);
		UI.ele.fill("_bar",1,0);
		UI.btn.img("bar","_bar",1,_icon.watch,0,3,0);
		UI.btn.img("bar","_bar",2,_icon.settings,0,14,0);
		UI.btn.img("bar","_bar",3,_icon.dash,0,3,0);
		UIc.end();
		UIc.bar._bar_1=()=>{
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_main"));
	  };
		UIc.bar._bar_2=()=>{
			  buzzer(buz.na);
		};
		UIc.bar._bar_3=()=>{
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_dash"));
		};
};
//
UIc.main._2x3_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_bt'));};
UIc.main._2x3_2=()=>{buzzer(buz.ok);eval(require('Storage').read('set_theme'));};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	//w.gfx.bri.lv++;
	//if (7<w.gfx.bri.lv) w.gfx.bri.lv=1;
	//w.gfx.bri.set(w.gfx.bri.lv);  
	UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
	UI.btn.ntfy(1,3,0,"_bar",6,"BRIGHTNESS","CONTROL",15,0,1);
	UIc.bar._sel_left=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(0,3,1);
		w.gfx.bri.lv--;
		if (w.gfx.bri.lv<1) w.gfx.bri.lv=1;
		w.gfx.bri.set(w.gfx.bri.lv);  
		UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
	};
	UIc.bar._sel_right=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(0,3,1);
		w.gfx.bri.lv++;
		if (7<w.gfx.bri.lv) w.gfx.bri.lv=7;
		w.gfx.bri.set(w.gfx.bri.lv);  
		UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
	};
	
};
UIc.main._2x3_4=()=>{
	if (set.bt!=3) {
		buzzer(buz.na);
		UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE","not connected",15,7);
		w.gfx.flip();
	}else	buzzer(buz.na);};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.acc=1-set.def.acc;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"TURN TO WAKE",set.def.acc?"ENABLED":"DISABED",15,set.def.acc?4:0);
	UI.btn.img("main","_2x3",5,_icon.wakeScreen,"WAKE",set.def.acc?15:3,set.def.acc?4:0);
	setter.accR();
	
};
UIc.main._2x3_6=()=>{
	
	set.def.buzz=1-set.def.buzz;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"BUZZER",set.def.buzz?"ENABLED":"DISABED",15,set.def.buzz?4:0);
	UI.btn.img("main","_2x3",6,set.def.buzz?_icon.dndOn:_icon.dndOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
	if (set.def.buzz){
		buzzer=digitalPulse.bind(null,ew.pin.BUZZ,0);
		buzzer(buz.ok);
	}else{
		buzzer(buz.ok);
		buzzer=function(){};
	}
	
};

tcNext.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_apps"));'));
tcBack.replaceWith(new Function("x", "y",'buzzer(buz.na);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}'));


