face[0].page="on connect";
UI.ele.ind(1,2,12);
face[0].bar();
UIc.start(1,1);
let val=["NA","ON","OFF","AUTO","CITY"];
UI.btn.c2l("main","_2x2",1,"LIGHT",val[dash.live.ks.aHLC],15,dash.live.ks.aHLC?dash.live.ks.aHLC!=2?12:1:0);
UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,dash.live.ks.aRideC?dash.live.ks.aRideC==1?12:1:0);
UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,dash.live.ks.aLiftC?dash.live.ks.aLiftC==1?12:1:0);
UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,dash.live.ks.aVoiceC?dash.live.ks.aVoiceC==2?12:1:0);	
UIc.end();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		dash.live.ks.aHLC++;  if (3<dash.live.ks.aHLC) dash.live.ks.aHLC=0;
		let val=["NA","ON","OFF","AUTO"];
		UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aHLC?"SET LIGHT "+val[dash.live.ks.aHLC]:"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",1,"LIGHT",val[dash.live.ks.aHLC],15,dash.live.ks.aHLC?dash.live.ks.aHLC!=2?12:1:0);
	}else if (i==2){
		buzzer(buz.ok);
		dash.live.ks.aRideC++; if (2<dash.live.ks.aRideC) dash.live.ks.aRideC=0;
		UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aRideC?dash.live.ks.aRideC==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,dash.live.ks.aRideC?dash.live.ks.aRideC==1?12:1:0);
	}else if (i==3){
		buzzer(buz.ok);		
		dash.live.ks.aLiftC++; if (2<dash.live.ks.aLiftC) dash.live.ks.aLiftC=0;
		UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aLiftC?dash.live.ks.aLiftC==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,dash.live.ks.aLiftC?dash.live.ks.aLiftC==1?12:1:0);
	}else if (i==4){
		buzzer(buz.ok);	
		dash.live.ks.aVoiceC++;  if (2<dash.live.ks.aVoiceC) dash.live.ks.aVoiceC=0;
		UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aVoiceC?dash.live.ks.aVoiceC==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,dash.live.ks.aVoiceC?dash.live.ks.aVoiceC==2?12:1:0);	
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