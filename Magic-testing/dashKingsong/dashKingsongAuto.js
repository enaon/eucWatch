face[0].page="automation";
UI.ele.ind(3,4,1);
face[0].bar();
UIc.start(1,1);
let offH=Math.floor(dash.live.ks.offT/3600);
let offM=dash.live.ks.offT/60 %60;	
//UI.btn.c2l("main","_2x2",1,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"'",15,1);
//UI.btn.c2l("main","_2x2",2,"ON","CONN",15,12);
//UI.btn.c2l("main","_2x2",4,"ON","DISC",15,12);	
UI.btn.c2l("main","_2x2",1,"POWER","OFF",15,6);
UI.btn.c2l("main","_2x2",2,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"'",15,6);
UI.btn.c2l("main","_4x1",3,"ON CONNECT","",15,12);
UI.btn.c2l("main","_4x1",4,"ON DISCONNECT","",15,12);
//UI.btn.c2l("main","_4x1",4,"IDLE TIMEOUT:",!dash.live.ks.offT?"-":offH+" Hour "+offM+" Min",15,5);
UIc.end();
//UI.btn.c2l("main","_4x1",3,"","",15,5);

UIc.main._2x2_1=()=>{
	buzzer(buz.ok);
	//UI.btn.ntfy(0,3,1,"_bar",6,"TAP TO","CONFiRM",15,13,0);w.gfx.flip();
	UI.btn.ntfy(0,3,1);
	UIc.start(0,1);
	UI.btn.c2l("bar","_bar",6,"TAP TO","CONFiRM",15,13);
	UIc.end();
	UIc.bar._bar_6=()=>{
		euc.aOff=dash.live.ks.aOff;
		euc.aLck=dash.live.ks.aLock;
		dash.live.ks.aOff=1;
		dash.live.ks.aLock=0;
		euc.tgl();
		return;
	};
	face[0].exe=()=>{
		eval(require('Storage').read("dashKingsongAuto")); 
	};	
};
//
UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	let offH=Math.floor(dash.live.ks.offT/3600);
	let offM=dash.live.ks.offT/60 %60;	
	UI.btn.c2l("main","_2x2",2,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"'",15,4);
	UI.btn.ntfy(1,3,0,"_bar",6,"SET IDLE","TIMEOUT",15,6,1);
	set.bar=1;
	TC.val={cur:dash.live.ks.offT,dn:0,up:24,tmp:0};
	face[0].exe=()=>{
		eval(require('Storage').read("dashKingsongAuto")); 
	};
	UIc.tcBar=(a,b)=>{ 
		UI.btn.ntfy(0,3,1);
		b=!b?60:b*600;
		dash.live.ks.offT=b;
		let offH=Math.floor(b/3600);
		let offM=b/60 %60;	
		UI.btn.c2l("main","_2x2",2,"IDLE",!dash.live.ks.offT?"-":offH+"h:"+offM+"'",15,4);
	};
};
/*
//
UIc.main._2x2_2=()=>{
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
*/
UIc.main._4x1_3=()=>{
	buzzer(buz.ok);
	eval(require('Storage').read("dashKingsongCon")); 
};
UIc.main._4x1_4=()=>{
	buzzer(buz.ok);	
	eval(require('Storage').read("dashKingsongDis")); 

};

//touch
tcN=(x,y)=>{
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		if (dash.live.ks.offT) euc.wri("setPowerOff",dash.live.ks.offT);
		eval(require('Storage').read("dashKingsongAuto")); 
	}else 
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