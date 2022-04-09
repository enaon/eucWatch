face[0].page="on disconnect";
UI.ele.ind(1,2,1);
face[0].bar();
UIc.start(1,1);
let val=["NA","ON","OFF","AUTO","CITY"];
UI.btn.c2l("main","_2x2",1,"LIGHT",val[dash.live.ks.aHLD],15,dash.live.ks.aHLD?dash.live.ks.aHLD!=2?12:1:0);
UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,dash.live.ks.aRideD?dash.live.ks.aRideD==1?12:1:0);
UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,dash.live.ks.aLiftD?dash.live.ks.aLiftD==1?12:1:0);
UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,dash.live.ks.aVoiceD?dash.live.ks.aVoiceD==2?12:1:0);	
UIc.end();
//
UIc.main._2x2_1=()=>{
	buzzer(buz.ok);
	dash.live.ks.aHLD++;  if (3<dash.live.ks.aHLD) dash.live.ks.aHLD=0;
	let val=["NA","ON","OFF","AUTO"];
	UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aHLD?"SET LIGHT "+val[dash.live.ks.aHLD]:"NO ACTION","",15,0);
	UI.btn.c2l("main","_2x2",1,"LIGHT",val[dash.live.ks.aHLD],15,dash.live.ks.aHLD?dash.live.ks.aHLD!=2?12:1:0);
};
UIc.main._2x2_2=()=>{
	buzzer(buz.ok);
	dash.live.ks.aRideD++; if (2<dash.live.ks.aRideD) dash.live.ks.aRideD=0;
	UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aRideD?dash.live.ks.aRideD==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
	UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,dash.live.ks.aRideD?dash.live.ks.aRideD==1?12:1:0);
};
UIc.main._2x2_3=()=>{
	buzzer(buz.ok);		
	dash.live.ks.aLiftD++; if (2<dash.live.ks.aLiftD) dash.live.ks.aLiftD=0;
	UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aLiftD?dash.live.ks.aLiftD==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
	UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,dash.live.ks.aLiftD?dash.live.ks.aLiftD==1?12:1:0);
};
UIc.main._2x2_4=()=>{
	buzzer(buz.ok);	
	dash.live.ks.aVoiceD++;  if (2<dash.live.ks.aVoiceD) dash.live.ks.aVoiceD=0;
	UI.btn.ntfy(1,2,0,"_bar",7,dash.live.ks.aVoiceD?dash.live.ks.aVoiceD==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
	UI.btn.c2l("main","_2x2",4,"VOICE","MODE",15,dash.live.ks.aVoiceD?dash.live.ks.aVoiceD==2?12:1:0);	
};

//touch
tcN=(x,y)=>{
	eval(require('Storage').read("dashKingsongDis1")); 
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongAuto")); 

};	
tcBack.replaceWith(tcB);