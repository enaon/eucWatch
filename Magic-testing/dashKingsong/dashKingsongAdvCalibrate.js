face[0].page="calibrate";
UI.ele.ind(1,1,1);
face[0].bar();
UIc.start(1,1);
UI.btn.c2l("main","_main",3,"CALIBRATE","",15,12);
UIc.end();
//
UIc.main._main_3=()=>{
	buzzer(buz.ok);

};
//UI.btn.ntfy(1,3,0,"_bar",6,"ADJUST","TILT",15,6,1);
set.bar=1;
TC.val={cur:dash.live.ks.offT,dn:-99,up:99,tmp:0};
//face[0].exe=()=>{
//	eval(require('Storage').read("dashKingsongAuto")); 
//};
UIc.tcBar=(a,b)=>{ 
	UI.btn.ntfy(0,3,1);
	dash.live.tiltSet=b;
	UI.btn.c1l("main","_main",9,b,"",15,0);
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
		eval(require('Storage').read("dashKingsongAdvCalibrate")); 
	}else 
		eval(require('Storage').read("dashKingsongAdv")); 

};	
tcBack.replaceWith(tcB);