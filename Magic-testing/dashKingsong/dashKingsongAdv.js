face[0].page="wheel setup";
UI.ele.ind(4,4,1);
//face[0].bar();
UIc.start(1,1);
let md=["HARD","MED","SOFT"];
UI.btn.c2l("main","_2x2",1,"MODE",md[dash.live.mode],15,4);
UI.btn.c2l("main","_2x2",2,"CALIBRATE","WHEEL",15,12);
UI.btn.c2l("main","_2x2",3,"WHEEL","ALERTS",15,1);
UI.btn.c2l("main","_2x2",4,"BLUETOOTH","PASS",15,12);	
UIc.end();

//
UIc.main._2x2_1=()=>{
	buzzer(buz.ok);
	dash.live.mode++;
	if (2<dash.live.mode) dash.live.mode=0;
	let m=["HARD","MED","SOFT"];
	UI.btn.c2l("main","_2x2",1,"MODE",md[dash.live.mode],15,4);
	euc.wri("setRideMode",dash.live.mode);
};
UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	euc.wri("getCalibrateTilt");
	eval(require('Storage').read("dashKingsongAdvCalibrate")); 
	return;
};
UIc.main._2x2_3=()=>{
	buzzer(buz.ok);		
	eval(require('Storage').read("dashKingsongAdvLimits")); 
	return;
};
UIc.main._2x2_4=()=>{
	buzzer(buz.ok);	
	euc.wri("getPass");
	eval(require('Storage').read("dashKingsongAdvPass")); 
	return;
};
//touch
tcN=(x,y)=>{
		buzzer(buz.na);		
		//eval(require('Storage').read("dashKingsongAdv")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		eval(require('Storage').read("dashKingsongAdv")); 
	}else 
		eval(require('Storage').read("dashKingsongAuto")); 

};	
tcBack.replaceWith(tcB);