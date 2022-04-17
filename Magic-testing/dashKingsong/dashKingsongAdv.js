//touch
tcN=(x,y)=>{
		buzzer(buz.na);		
		//eval(require('Storage').read("dashKingsongAdv")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		eval(require('Storage').read("dashKingsongAdv")); 
	}else 
		eval(require('Storage').read("dashKingsongAuto")); 

};	
tcBack.replaceWith(tcB);
//
face[0].page="wheel setup";
UI.ele.ind(4,4,1);
face[0].bar();
UIc.start(1,1);
let md=["HARD","MED","SOFT"];
UI.btn.c2l("main","_2x2",1,"MODE",md[dash.live.mode],15,4);
UI.btn.c2l("main","_2x2",2,"CALIBRATE","WHEEL",15,6);
UI.btn.c2l("main","_2x2",3,"WHEEL","ALARMS",15,1);
UI.btn.c2l("main","_2x2",4,"BLUETOOTH","PASS",15,6);	
UIc.end();

//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		dash.live.mode++;
		if (2<dash.live.mode) dash.live.mode=0;
		let m=["HARD","MED","SOFT"];
		UI.btn.c2l("main","_2x2",1,"MODE",md[dash.live.mode],15,4);
		euc.wri("setRideMode",dash.live.mode);
	}else if (i==2){
		buzzer(buz.ok);
		euc.wri("getCalibrateTilt");
		eval(require('Storage').read("dashKingsongAdvCalibrate")); 
		return;
	}else if (i==3){
		buzzer(buz.ok);		
		eval(require('Storage').read("dashKingsongAdvLimits")); 
		return;
	}else if (i==4){
		buzzer(buz.ok);	
		euc.wri("getPass");
		eval(require('Storage').read("dashKingsongAdvPass")); 
		return;
	}
};
