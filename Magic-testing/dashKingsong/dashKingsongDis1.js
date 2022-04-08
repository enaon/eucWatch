face[0].page="on disconnect";
UI.ele.ind(2,2,1);
face[0].bar();
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"m",15,1);
UI.btn.c2l("main","_2x2",2,"ON","CONN",15,1);
UI.btn.c2l("main","_2x2",4,"ON","DISC",15,1);	
UIc.end();
UI.btn.c2l("main","_2x2",3,"","",15,1);
//
UIc.main._2x2_1=()=>{
	buzzer(buz.ok);
	//eval(require('Storage').read("dashKingsongLight")); 
	//face[0].ntfy("HOLD -> LIGHTS OFF",1);
};
UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	//euc.wri("setStrobeOnOff",1-dash.live.strb);
};
UIc.main._2x2_3=()=>{
	buzzer(buz.ok);		

};
UIc.main._2x2_4=()=>{
	buzzer(buz.ok);	
};

//touch
tcN=(x,y)=>{
		eval(require('Storage').read("dashKingsongAdv")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongOpt")); 

};	
tcBack.replaceWith(tcB);