E.setFlags({pretokenise:1});
//
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_apps"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();});
//
face[0].page="set";//
//UI.ele.title("",3,0);
UI.ele.ind(2,5,0);
UIc.start(1,0);
UI.btn.img("main","_2x3",1,(ew.def.cli||ew.def.gb||ew.def.prxy)?"bt":"plane","BT",15,12);
UI.btn.img("main","_2x3",2,"themes","FACE",15,12);
UI.btn.img("main","_2x3",3,"bri",ew.def.bri,15,1,1);
UI.btn.img("main","_2x3",4,"findPhone","FIND",3,0);
UI.btn.img("main","_2x3",5,"wakeScreen","WAKE",euc.state=="READY"?11:ew.def.acc?15:3,euc.state=="READY"?8:ew.def.acc?4:0);
UI.btn.img("main","_2x3",6,ew.def.buzz?"buzzOn":"buzzOff","BUZZ",ew.def.buzz?15:3,ew.def.buzz?4:0);
UIc.end();
//
UIc.main._2x3=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);
		eval(require('Storage').read('set_bt'));
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}	
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);
		eval(require('Storage').read('set_theme'));
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	}else if (i==3){
		buzzer.nav(buzzer.buzz.ok);
		UI.btn.img("main","_2x3",3,"bri",ew.def.bri,15,1,1);
		UI.btn.ntfy(1,3,0,"_bar",6,"BRIGHTNESS",". . . . . . . . .",15,6,1);
		ew.temp.bar=1;
		TC.val={cur:ew.def.bri,dn:1,up:7,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,3,1);
			UI.btn.img("main","_2x3",3,"bri",b,15,1,1);
			w.gfx.bri.set(b); 
			ew.def.bri=b;
		};
	}else if (i==4){
		if (ew.is.bt!=3) {
			buzzer.nav(buzzer.buzz.na);
			UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE","not connected",15,13);w.gfx.flip();
		}else	
			buzzer.nav(buzzer.buzz.na);
	}else if (i==5){
		if (euc.state=="READY") {buzzer.nav(buzzer.buzz.na); UI.btn.ntfy(1,0,0,"_bar",6,"AUTO ENABLED","FOR EUC",15,0); w.gfx.flip(); return;} 
		buzzer.nav(buzzer.buzz.ok);
		ew.def.acc=1-ew.def.acc;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"TURN TO WAKE",ew.def.acc?"ENABLED":"DISABED",15,0);
		UI.btn.img("main","_2x3",5,"wakeScreen","WAKE",ew.def.acc?15:3,ew.def.acc?4:0);
		ew.do.update.acc();
	}else if (i==6){
		ew.def.buzz=1-ew.def.buzz;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"BUZZER",ew.def.buzz?"ENABLED":"DISABED",15,0);
		UI.btn.img("main","_2x3",6,ew.def.buzz?"buzzOn":"buzzOff","BUZZ",ew.def.buzz?15:3,ew.def.buzz?4:0);
		if (ew.def.buzz){
			buzzer.nav=digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
			buzzer.nav(buzzer.buzz.ok);
		}else{
			buzzer.nav(buzzer.buzz.ok);
			buzzer.nav=function(){};
		}
	}
};
//UIc.main._fold_1=UIc.main._2x3_3;
