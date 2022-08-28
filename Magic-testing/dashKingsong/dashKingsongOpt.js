//touch
tcNext.replaceWith(()=>{
	buzzer.nav(buzzer.buzz.ok);if (!euc.dash.auto.offT) euc.wri("getPowerOff");
	if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;} eval(require('Storage').read("dashKingsongAuto"));});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;} eval(require('Storage').read("dashKingsongAct"));});
//
face[0].page="options";
UI.ele.ind(2,4,0);
UIc.start(1,0);
UI.btn.c2l("main","_2x2",1,"LED","RIDE",15,euc.dash.opt.lght.led?4:1);
UI.btn.c2l("main","_2x2",2,"WATCH","ALERTS",15,(euc.dash.alrt.spd.hapt.en||euc.dash.alrt.amp.hapt.en||euc.dash.alrt.tmp.hapt.en||euc.dash.alrt.bat.hapt.en)?4:1);
UIc.end();
face[0].bar=()=>{
	UI.ele.title(face[0].page.toUpperCase(),3,0);//w.gfx.flip();
	UIc.start(0,1);
	UI.btn.c2l("bar","_2x2",3,"SENSOR","LIFT",15,euc.dash.opt.snsr.lift?4:1);
	UI.btn.c2l("bar","_2x2",4,"HORN","",15,euc.dash.opt.horn.en?4:1);	
	UIc.end();
};
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);
		euc.wri("setLedRideOnOff",euc.dash.opt.lght.led);
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);
		face.go("dashAlerts",0);
		return;		
	}
};
UIc.bar._2x2=(i)=>{
	if (i==3){
		buzzer.nav(buzzer.buzz.ok);		
		euc.wri("setLiftOnOff",1-euc.dash.opt.snsr.lift);
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);	
		euc.dash.opt.horn.en=1-euc.dash.opt.horn.en;
		UI.btn.c2l("main","_2x2",4,"HORN","",15,euc.dash.opt.horn.en?4:1);
	}
};