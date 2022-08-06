face[0].page="on connect";
UI.ele.ind(1,2,12);
face[0].bar();
UIc.start(1,1);
let val=["NA","ON","OFF","AUTO","CITY"];
UI.btn.c2l("main","_2x2",1,"LIGHT",val[euc.dash.auto.onC.HL],15,euc.dash.auto.onC.HL?euc.dash.auto.onC.HL!=2?12:1:0);
UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,euc.dash.auto.onC.led?euc.dash.auto.onC.led==1?12:1:0);
UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,euc.dash.auto.onC.lift?euc.dash.auto.onC.lift==1?12:1:0);
UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,euc.dash.auto.onC.talk?euc.dash.auto.onC.talk==2?12:1:0);	
UIc.end();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		euc.dash.auto.onC.HL++;  if (3<euc.dash.auto.onC.HL) euc.dash.auto.onC.HL=0;
		let val=["NA","ON","OFF","AUTO"];
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onC.HL?"SET LIGHT "+val[euc.dash.auto.onC.HL]:"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",1,"LIGHT",val[euc.dash.auto.onC.HL],15,euc.dash.auto.onC.HL?euc.dash.auto.onC.HL!=2?12:1:0);
	}else if (i==2){
		buzzer(buz.ok);
		euc.dash.auto.onC.led++; if (2<euc.dash.auto.onC.led) euc.dash.auto.onC.led=0;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onC.led?euc.dash.auto.onC.led==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,euc.dash.auto.onC.led?euc.dash.auto.onC.led==1?12:1:0);
	}else if (i==3){
		buzzer(buz.ok);		
		euc.dash.auto.onC.lift++; if (2<euc.dash.auto.onC.lift) euc.dash.auto.onC.lift=0;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onC.lift?euc.dash.auto.onC.lift==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,euc.dash.auto.onC.lift?euc.dash.auto.onC.lift==1?12:1:0);
	}else if (i==4){
		buzzer(buz.ok);	
		euc.dash.auto.onC.talk++;  if (2<euc.dash.auto.onC.talk) euc.dash.auto.onC.talk=0;
		UI.btn.ntfy(1,2,0,"_bar",7,euc.dash.auto.onC.talk?euc.dash.auto.onC.talk==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,euc.dash.auto.onC.talk?euc.dash.auto.onC.talk==2?12:1:0);	
  }
};

//touch
tcN=(x,y)=>{
	buzzer(buz.ok);	
	eval(require('Storage').read("dashKingsongCon1")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongAuto")); 
};	
tcBack.replaceWith(tcB);