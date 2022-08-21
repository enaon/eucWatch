//touch
tcNext.replaceWith(()=>{buzzer(buz.na);});
tcBack.replaceWith(()=>{buzzer(buz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}eval(require('Storage').read("dashKingsongDis"));});
//
face[0].page="on disconnect";
UI.ele.ind(2,2,12);
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"AUTO","LOCK",15,euc.dash.auto.onD.lock?13:0);	
UI.btn.c2l("main","_2x2",2,"AUTO","OFF",15,euc.dash.auto.onD.off?13:0);
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
		buzzer(buz.ok);	
		euc.dash.auto.onD.lock=1-euc.dash.auto.onD.lock;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.lock?"LOCK":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",1,"AUTO","LOCK",15,euc.dash.auto.onD.lock?13:0);
	}else if (i==2){
		buzzer(buz.ok);
		euc.dash.auto.onD.off=1-euc.dash.auto.onD.off;
		UI.btn.ntfy(0,2,0,"_ind",1,euc.dash.auto.onD.off?"POWER OFF":"NO ACTION","",15,0);
		UI.btn.c2l("main","_2x2",2,"AUTO","OFF",15,euc.dash.auto.onD.off?13:0);
	}
};
UIc.bar._2x2=(i)=>{

};
