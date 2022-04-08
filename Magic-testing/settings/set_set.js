face[0].page="set";
UI.ele.ind(1,2,1);
UIc.start(1,0);
UI.btn.img("main","_2x3",1,(set.def.cli||set.def.gb||set.def.emuZ)?_icon.bt:_icon.plane,"BT",15,1);
UI.btn.img("main","_2x3",2,_icon.themes,"FACE",15,1);
UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
UI.btn.img("main","_2x3",4,_icon.findPhone,"FIND",3,0);
UI.btn.img("main","_2x3",5,_icon.wakeScreen,"WAKE",euc.state=="READY"?14:set.def.acc?15:3,euc.state=="READY"?8:set.def.acc?4:0);
UI.btn.img("main","_2x3",6,set.def.buzz?_icon.buzzOn:_icon.buzzOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
UIc.end();
//
UIc.main._2x3_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_bt'));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}};
UIc.main._2x3_2=()=>{buzzer(buz.ok);eval(require('Storage').read('set_theme'));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
	UI.btn.ntfy(1,3,0,"_bar",6,"BRIGHTNESS",". . . . . . . . .",15,6,1);
	set.bar=1;
	TC.val={cur:set.def.bri,dn:1,up:7,tmp:0};
	UIc.tcBar=(a,b)=>{ 
		UI.btn.ntfy(0,3,1);
		UI.btn.img("main","_2x3",3,_icon.bri,b,15,1,1);
		w.gfx.bri.set(b); 
		set.def.bri=b;
	};
};
UIc.main._2x3_4=()=>{
	if (set.bt!=3) {
		buzzer(buz.na);
		UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE","not connected",15,7);w.gfx.flip();
	}else	
		buzzer(buz.na);};
	UIc.main._2x3_5=()=>{
	if (euc.state=="READY") {buzzer(buz.na); UI.btn.ntfy(1,0,0,"_bar",6,"AUTO ENABLED","FOR EUC",15,0); w.gfx.flip(); return;} 
	buzzer(buz.ok);
	set.def.acc=1-set.def.acc;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"TURN TO WAKE",set.def.acc?"ENABLED":"DISABED",15,0);
	UI.btn.img("main","_2x3",5,_icon.wakeScreen,"WAKE",set.def.acc?15:3,set.def.acc?4:0);
	setter.accR();
	
};
UIc.main._2x3_6=()=>{
	
	set.def.buzz=1-set.def.buzz;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"BUZZER",set.def.buzz?"ENABLED":"DISABED",15,0);
	UI.btn.img("main","_2x3",6,set.def.buzz?_icon.buzzOn:_icon.buzzOff,"BUZZ",set.def.buzz?15:3,set.def.buzz?4:0);
	if (set.def.buzz){
		buzzer=digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
		buzzer(buz.ok);
	}else{
		buzzer(buz.ok);
		buzzer=function(){};
	}
	
};

tcNext.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_apps"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();'));
tcBack.replaceWith(new Function("x", "y",'buzzer(buz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();'));
