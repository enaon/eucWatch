
//touch
tcN=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		if (euc.dash.auto.offT) euc.wri("setPowerOff",euc.dash.auto.offT);
		eval(require('Storage').read("dashKingsongAuto")); 
	}else 
		eval(require('Storage').read("dashKingsongAdv")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		if (euc.dash.auto.offT) euc.wri("setPowerOff",euc.dash.auto.offT);
		eval(require('Storage').read("dashKingsongAuto")); 
	}else 
		eval(require('Storage').read("dashKingsongOpt")); 

};	
tcBack.replaceWith(tcB);
//
face[0].page="automation";
UI.ele.ind(3,4,0);
face[0].bar();
UIc.start(1,1);
let offH=Math.floor(euc.dash.auto.offT/3600);
let offM=euc.dash.auto.offT/60 %60;	
UI.btn.c2l("main","_2x2",1,"POWER","OFF",15,1);
UI.btn.c2l("main","_2x2",2,"IDLE",!euc.dash.auto.offT?"-":offH+"h:"+offM+"'",15,1);
UI.btn.c2l("main","_4x1",3,"ON CONNECT","",15,6);
UI.btn.c2l("main","_4x1",4,"ON DISCONNECT","",15,6);
UIc.end();

UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		//UI.btn.ntfy(0,3,1,"_bar",6,"TAP TO","CONFiRM",15,13,0);w.gfx.flip();
		UI.btn.ntfy(0,3,1);
		UIc.start(0,1);
		UI.btn.c2l("bar","_bar",6,"TAP TO","CONFiRM",15,13);
		UIc.end();
		UIc.bar._bar_6=()=>{
			euc.aOff=euc.dash.auto.onD.off;
			euc.aLck=euc.dash.auto.onD.lock;
			euc.dash.auto.onD.off=1;
			euc.dash.auto.onD.lock=0;
			euc.tgl();
			return;
		};
		face[0].exe=()=>{
			eval(require('Storage').read("dashKingsongAuto")); 
		};	
	}else if (i==2){
		buzzer(buz.ok);
		let offH=Math.floor(euc.dash.auto.offT/3600);
		let offM=euc.dash.auto.offT/60 %60;	
		UI.btn.c2l("main","_2x2",2,"IDLE",!euc.dash.auto.offT?"-":offH+"h:"+offM+"'",15,4);
		UI.btn.ntfy(1,3,0,"_bar",6,"SET IDLE","TIMEOUT",15,6,1);
		set.bar=1;
		TC.val={cur:euc.dash.auto.offT,dn:0,up:24,tmp:0};
		face[0].exe=()=>{
			eval(require('Storage').read("dashKingsongAuto")); 
		};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,3,1);
			b=!b?60:b*600;
			euc.dash.auto.offT=b;
			let offH=Math.floor(b/3600);
			let offM=b/60 %60;	
			UI.btn.c2l("main","_2x2",2,"IDLE",!euc.dash.auto.offT?"-":offH+"h:"+offM+"'",15,4);
		};
	}
};
/*
//
UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	UI.ele.ind(1,1,13);
	let offH=Math.floor(euc.dash.auto.offT/3600);
	let offM=euc.dash.auto.offT/60 %60;	
	UIc.start(1,1);
	UI.btn.c2l("main","_main",3,"POWER OFF","",15,13);
	UIc.end();
	UI.btn.c2l("main","_main",9,offH+"h:"+offM+"'","",15,0);
	UI.btn.ntfy(1,3,0,"_bar",6,"SET IDLE","TIMEOUT",15,6,1);
	set.bar=1;
	TC.val={cur:euc.dash.auto.offT,dn:0,up:24,tmp:0};
	face[0].exe=()=>{
		eval(require('Storage').read("dashKingsongAuto")); 
	};
	UIc.main._main_3=()=>{
		euc.aOff=euc.dash.auto.onD.off;
		euc.aLck=euc.dash.auto.onD.lock;
		euc.dash.auto.onD.off=1;
		euc.dash.auto.onD.lock=0;
		euc.tgl();
		return;
	};
	UIc.tcBar=(a,b)=>{ 
		UI.btn.ntfy(0,3,1);
		b=!b?60:b*600;
		euc.dash.auto.offT=b;
		let offH=Math.floor(b/3600);
		let offM=b/60 %60;	
		UI.btn.c1l("main","_main",9,offH+"h:"+offM+"'","",15,0);
	};
};
*/
UIc.main._4x1=(i)=>{
	if (i==3){
		buzzer(buz.ok);
		eval(require('Storage').read("dashKingsongCon")); 
	}else if (i==4){
		buzzer(buz.ok);	
		eval(require('Storage').read("dashKingsongDis")); 
	}
};
