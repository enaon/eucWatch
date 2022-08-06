//touch
tcN=(x,y)=>{
	buzzer(buz.ok);	
	if (!euc.dash.auto.offT) euc.wri("getPowerOff");
	eval(require('Storage').read("dashKingsongAuto")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongAct")); 
};	
tcBack.replaceWith(tcB);
//
face[0].page="options";
UI.ele.ind(2,4,1);
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"LED","RIDE",15,euc.dash.opt.ride.mode?4:1);
UI.btn.c2l("main","_2x2",2,"WATCH","ALERTS",15,(euc.dash.live.hapS||euc.dash.live.hapA||euc.dash.live.hapT||euc.dash.live.hapB)?4:1);
UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,euc.dash.opt.snsr.lift?4:1);
UI.btn.c2l("main","_2x2",4,"HORN","",15,euc.dash.opt.horn.en?4:1);	
UIc.end();
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		euc.wri("setLedRideOnOff",euc.dash.opt.ride.mode);
	}else if (i==2){
		buzzer(buz.ok);
		face.go("dashAlerts",0);
		return;		
	}else if (i==3){
		buzzer(buz.ok);		
		euc.wri("setLiftOnOff",1-euc.dash.opt.snsr.lift);
	}else if (i==4){
		buzzer(buz.ok);	
		euc.dash.opt.horn.en=1-euc.dash.opt.horn.en;
		UI.btn.c2l("main","_2x2",4,"HORN","",15,euc.dash.opt.horn.en?4:1);
	}
};
