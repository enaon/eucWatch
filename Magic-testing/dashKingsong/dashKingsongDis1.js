face[0].page="on disconnect";
UI.ele.ind(2,2,12);
face[0].bar();
UIc.start(1,1);
UI.btn.c2l("main","_2x2",2,"AUTO","OFF",15,euc.dash.auto.onD.off?4:0);
UI.btn.c2l("main","_2x2",4,"AUTO","LOCK",15,euc.dash.auto.onD.lock?4:0);	
UIc.end();
UI.btn.c2l("main","_2x2",1,"","",15,1);
UI.btn.c2l("main","_2x2",3,"","",15,1);
//
UIc.main._2x2=(i)=>{
	if (i==2){
		buzzer(buz.ok);
		//eval(require('Storage').read("dashKingsongLight")); 
		//face[0].ntfy("HOLD -> LIGHTS OFF",1);
	}else if (i==2){
		buzzer(buz.ok);
		euc.dash.auto.onD.off=1-euc.dash.auto.onD.off;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onD.off?"POWER OFF":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"AUTO","OFF",15,euc.dash.auto.onD.off?4:0);
	}else if (i==3){
		buzzer(buz.ok);		
	}else if (i==4){
		buzzer(buz.ok);	
		euc.dash.auto.onD.lock=1-euc.dash.auto.onD.lock;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onD.lock?"LOCK":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",4,"AUTO","LOCK",15,euc.dash.auto.onD.lock?4:0);	
	}
};

//touch
tcN=(x,y)=>{
	buzzer(buz.na);
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongDis")); 

};	
tcBack.replaceWith(tcB);