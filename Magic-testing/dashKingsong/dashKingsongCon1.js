face[0].page="on connect";
UI.ele.ind(2,2,12);
face[0].bar();
UIc.start(1,1);
UI.btn.c2l("main","_2x2",4,"UNLOCK","ONCE",15,euc.dash.auto.onC.unlk?4:0);	
UIc.end();
UI.btn.c2l("main","_2x2",1,"","",15,1);
UI.btn.c2l("main","_2x2",2,"","",15,1);
UI.btn.c2l("main","_2x2",3,"","",15,1);
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		//eval(require('Storage').read("dashKingsongLight")); 
		//face[0].ntfy("HOLD -> LIGHTS OFF",1);
	}else if (i==2){
		buzzer(buz.ok);
		//euc.wri("setStrobeOnOff",1-euc.dash.opt.lght.strb);
	}else if (i==3){
		buzzer(buz.ok);		
	}else if (i==4){
		buzzer(buz.ok);	
		euc.dash.auto.onC.unlk=1-euc.dash.auto.onC.unlk;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onC.unlk?"UNLOCK":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",4,"UNLOCK","ONCE",15,euc.dash.auto.onC.unlk?4:0);	
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
	eval(require('Storage').read("dashKingsongCon")); 

};	
tcBack.replaceWith(tcB);