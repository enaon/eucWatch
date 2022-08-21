//touch
tcNext.replaceWith(()=>{buzzer(buz.ok); if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;} eval(require('Storage').read("dashKingsongOpt"));});
tcBack.replaceWith(()=>{buzzer(buz.ok);	if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}	face.go(ew.is.dash[ew.def.dash.face],0);});
//
face[0].page="Quick Actions";
UI.ele.ind(1,4,0);
UIc.start(1,0);
let val=["CITY","ON","OFF","AUTO"];
UI.btn.c2l("main","_2x2",1,"LIGHTS",val[euc.dash.opt.lght.HL],15,euc.dash.opt.lght.city?12:euc.dash.opt.lght.HL!=2?4:0);
UI.btn.c2l("main","_2x2",2,"STRB","",15,euc.dash.opt.lght.strb?13:1);
UIc.end();

face[0].bar=()=>{
	UI.ele.title(face[0].page.toUpperCase(),3,0);
	UIc.start(0,1);
	let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
	UI.btn.c2l("bar","_2x2",3,euc.dash.opt.tpms?euc.dash.opt.tpms:"TPMS","",15,(euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.opt.tpms].time<1800)?(tpms.euc[euc.dash.opt.tpms].alrm)?13:4:6);
	UI.btn.c2l("bar","_2x2",4,"LOCK","",15,euc.dash.opt.lock.en?13:1);	
	UIc.end();
};
face[0].bar();

//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer(buz.ok);
		eval(require('Storage').read("dashKingsongLight")); 
		//face[0].ntfy("HOLD -> LIGHTS OFF",1);
	}else if (i==2){
		buzzer(buz.ok);
		euc.wri("setStrobeOnOff",1-euc.dash.opt.lght.strb);
	}
};

UIc.bar._2x2=(i)=>{
	 if (i==3){
		buzzer(buz.ok);		
		if (!euc.dash.opt.tpms) 
			print(1);
		else {
			tpms.def.pos=Object.keys(tpms.def.list).indexOf(euc.dash.opt.tpms);
			face.go("tpmsFace",0);
			return;
		}
	}else if (i==4){
		buzzer(buz.ok);	
		euc.wri((1-euc.dash.opt.lock.en)?"doLock":"doUnlock",euc.temp.lockKey);
	}
};
