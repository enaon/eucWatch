//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.na);});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}eval(require('Storage').read("dashKingsongCon"));});
//
face[0].page="on connect";
UI.ele.ind(2,2,12);
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"BT","PASS",15,euc.dash.auto.onC.pass?4:0);	
UI.btn.c2l("main","_2x2",2,"UNLOCK","ONCE",15,euc.dash.auto.onC.unlk?4:0);
UIc.end();

face[0].bar=()=>{
	UI.ele.title(face[0].page.toUpperCase(),3,0);//w.gfx.flip();
	UI.btn.c2l("bar","_2x2",3,"","",15,0);
	UI.btn.c2l("bar","_2x2",4,"","",15,0);	
};
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);	
		if (!euc.dash.opt.lock.pass) { UI.btn.ntfy(1,2,0,"_4x1",4,"BT password","needs to be set",15,1);w.gfx.flip();return;}
		euc.dash.auto.onC.pass=1-euc.dash.auto.onC.pass;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onC.pass?"SEND PASS":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",1,"BT","PASS",15,euc.dash.auto.onC.pass?4:0);	
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);	
		euc.dash.auto.onC.unlk=1-euc.dash.auto.onC.unlk;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onC.unlk?"SESSION UNLOCK":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"UNLOCK","ONCE",15,euc.dash.auto.onC.unlk?4:0);	
	}
};
