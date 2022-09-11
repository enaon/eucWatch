//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}eval(require('Storage').read("dashKingsongDis1"));});
//tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}eval(require('Storage').read("dashKingsongAuto"));});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face.go("settings",0);});

//
face[0].init= function(){
	return;
};
face[0].show= function(){
	return;
};
face[0].page="on disconnect";
UI.ele.ind(1,2,12);
UIc.start(1,0);
let val=["NA","ON","OFF","AUTO","CITY"];
UI.btn.c2l("main","_2x2",1,"LIGHT",val[euc.dash.auto.onD.HL],15,euc.dash.auto.onD.HL?euc.dash.auto.onD.HL!=2?12:1:0);
UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,euc.dash.auto.onD.led?euc.dash.auto.onD.led==1?12:1:0);
UIc.end();
//
face[0].bar=()=>{
	UI.ele.title(face[0].page.toUpperCase(),3,0);
	UIc.start(0,1);
	UI.btn.c2l("bar","_2x2",3,"SENSOR","LIFT",15,euc.dash.auto.onD.lift?euc.dash.auto.onD.lift==1?12:1:0);
	UI.btn.c2l("bar","_2x2",4,"VOICE","MODE",15,euc.dash.auto.onD.talk?euc.dash.auto.onD.talk==2?12:1:0);	
	UIc.end();
};
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);
		euc.dash.auto.onD.HL++;  if (3<euc.dash.auto.onD.HL) euc.dash.auto.onD.HL=0;
		let val=["NA","ON","OFF","AUTO"];
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.HL?"SET LIGHT "+val[euc.dash.auto.onD.HL]:"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",1,"LIGHT",val[euc.dash.auto.onD.HL],15,euc.dash.auto.onD.HL?euc.dash.auto.onD.HL!=2?12:1:0);
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);
		euc.dash.auto.onD.led++; if (2<euc.dash.auto.onD.led) euc.dash.auto.onD.led=0;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.led?euc.dash.auto.onD.led==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"LED","RIDE",15,euc.dash.auto.onD.led?euc.dash.auto.onD.led==1?12:1:0);
	}
};
UIc.bar._2x2=(i)=>{
	if (i==3){
		buzzer.nav(buzzer.buzz.ok);		
		euc.dash.auto.onD.lift++; if (2<euc.dash.auto.onD.lift) euc.dash.auto.onD.lift=0;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.lift?euc.dash.auto.onD.lift==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("bar","_2x2",3,"SENSOR","LIFT",15,euc.dash.auto.onD.lift?euc.dash.auto.onD.lift==1?12:1:0);
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);	
		euc.dash.auto.onD.talk++;  if (2<euc.dash.auto.onD.talk) euc.dash.auto.onD.talk=0;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.talk?euc.dash.auto.onD.talk==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);
		UI.btn.c2l("bar","_2x2",4,"VOICE","MODE",15,euc.dash.auto.onD.talk?euc.dash.auto.onD.talk==2?12:1:0);	
	}
};
