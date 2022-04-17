//touch
tcN=(x,y)=>{
	buzzer(buz.ok);	
	if (!dash.live.ks.offT) euc.wri("getPowerOff");
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
UI.btn.c2l("main","_2x2",1,"LED","RIDE",15,dash.live.ks.ride?4:1);
UI.btn.c2l("main","_2x2",2,"WATCH","ALERTS",15,(dash.live.hapS||dash.live.hapA||dash.live.hapT||dash.live.hapB)?4:1);
UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,dash.live.ks.lift?4:1);
UI.btn.c2l("main","_2x2",4,"HORN","",15,dash.live.horn?4:1);	
UIc.end();
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		euc.wri("setLedRideOnOff",dash.live.ks.ride);
	}else if (i==2){
		buzzer(buz.ok);
		face.go("dashAlerts",0);
		return;		
	}else if (i==3){
		buzzer(buz.ok);		
		euc.wri("setLiftOnOff",1-dash.live.ks.lift);
	}else if (i==4){
		buzzer(buz.ok);	
		dash.live.horn=1-dash.live.horn;
		UI.btn.c2l("main","_2x2",4,"HORN","",15,dash.live.horn?4:1);
	}
};
