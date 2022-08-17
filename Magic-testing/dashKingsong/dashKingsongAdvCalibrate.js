
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		euc.wri("setCalibrateTilt",euc.dash.live.tiltSet);
		eval(require('Storage').read("dashKingsongAdv")); 
	}else 
		eval(require('Storage').read("dashKingsongAdv")); 

};	
tcBack.replaceWith(tcB);
tcNext.replaceWith(tcB);
//
face[0].page="calibrate";
UI.ele.ind(1,1,12);
//face[0].bar();
UIc.start(1,1);
UI.btn.c2l("main","_main",3,"CALIBRATE","",15,12);
UIc.end();
//
UIc.main._main=(i)=>{
	if (i==3){
		buzzer(buz.ok);
	//	UI.txt.block("_main",6,"1. PRESS START\n\n2. LEVEL WHEEL\n3. TURN WHEEL ON\n4. WHEEL BEEPS->OFF\n5. TURN WHEEL ON\n\n6. DONE!",30,15,0);
		UI.txt.block("_main",9,"1. Press START\n\n2. Level Wheel\n3. Turn Wheel ON\n4. Wheel Beeps->OFF\n5. Turn Wheel ON\n\n6. Done !",30,15,0);
		UIc.start(1,1);
			UI.btn.c2l("main","_bar",6,"START","CALIBRATION",15,4);
		UIc.end();
		UIc.main._bar_6=()=>{ 
			buzzer(buz.ok);
			euc.wri("doCalibrate");
			buzzer(buz.ok);
		};
	}
};
UI.btn.c2l("main","_lcd",1,euc.dash.live.tiltSet,"",15,0);
UI.btn.ntfy(1,40,0,"_bar",6,"ADJUST","TILT",15,6,1);
/*
UIc.bar._sel_left=()=>{ 
	buzzer(buz.ok);
	euc.wri("setCalibrateTilt",euc.dash.live.tiltSet-1);
};
UIc.bar._sel_right=()=>{ 
 	buzzer(buz.ok);
	euc.wri("setCalibrateTilt",euc.dash.live.tiltSet+1);
};
*/
ew.temp.bar=1;
TC.val={cur:euc.dash.live.tiltSet,dn:-99,up:99,tmp:0};
UIc.tcBar=(a,b)=>{ 
	euc.dash.live.tiltSet=b;
	UI.btn.c1l("main","_lcd",1,euc.dash.live.tiltSet,"",15,0);
};

