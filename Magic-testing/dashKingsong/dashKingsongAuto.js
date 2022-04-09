face[0].page="automation";
UI.ele.ind(3,4,1);
face[0].bar();
UIc.start(1,1);
let offH=Math.floor(dash.live.ks.offT/3600);
let offM=dash.live.ks.offT/60 %60;	
UI.btn.c2l("main","_2x2",1,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"'",15,1);
UI.btn.c2l("main","_2x2",2,"ON","CONN",15,12);
UI.btn.c2l("main","_2x2",4,"ON","DISC",15,12);	
UIc.end();
UI.btn.c2l("main","_2x2",3,"","",15,1);


//
UIc.main._2x2_1=()=>{
	buzzer(buz.ok);
	UI.ele.ind(1,1,13);
	let offH=Math.floor(dash.live.ks.offT/3600);
	let offM=dash.live.ks.offT/60 %60;	
	UIc.start(1,1);
	UI.btn.c2l("main","_main",3,"POWER OFF","",15,13);
	UIc.end();
	UI.btn.c2l("main","_main",9,offH+"h:"+offM+"'","",15,0);
	UI.btn.ntfy(1,3,0,"_bar",6,"SET IDLE","TIMEOUT",15,6,1);
	set.bar=1;
	TC.val={cur:dash.live.ks.offT,dn:0,up:24,tmp:0};
	face[0].exe=()=>{
		eval(require('Storage').read("dashKingsongAuto")); 
	};
	UIc.main._main_3=()=>{
		euc.aOff=dash.live.ks.aOff;
		euc.aLck=dash.live.ks.aLock;
		dash.live.ks.aOff=1;
		dash.live.ks.aLock=0;
		euc.tgl();
		return;
	};
	UIc.tcBar=(a,b)=>{ 
		UI.btn.ntfy(0,3,1);
		b=!b?60:b*600;
		dash.live.ks.offT=b;
		let offH=Math.floor(b/3600);
		let offM=b/60 %60;	
		UI.btn.c1l("main","_main",9,offH+"h:"+offM+"'","",15,0);
	};
};

UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	eval(require('Storage').read("dashKingsongCon")); 
};
UIc.main._2x2_3=()=>{
	buzzer(buz.ok);		

};
UIc.main._2x2_4=()=>{
	buzzer(buz.ok);	
	eval(require('Storage').read("dashKingsongDis")); 

};

//touch
tcN=(x,y)=>{
		eval(require('Storage').read("dashKingsongAdv")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		if (dash.live.ks.offT) euc.wri("setPowerOff",dash.live.ks.offT);
		eval(require('Storage').read("dashKingsongAuto")); 
	}else 
		eval(require('Storage').read("dashKingsongOpt")); 

};	
tcBack.replaceWith(tcB);