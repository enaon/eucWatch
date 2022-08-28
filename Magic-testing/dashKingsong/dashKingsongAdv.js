//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.na);});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}eval(require('Storage').read("dashKingsongAuto")); });
//
face[0].page="wheel setup";
UI.ele.ind(4,4,0);
UIc.start(1,0);
let md=["HARD","MED","SOFT"];
UI.btn.c2l("main","_2x2",1,"MODE",md[euc.dash.opt.ride.mode],15,4);
UI.btn.c2l("main","_2x2",2,"CALIBRATE","WHEEL",15,6);
UIc.end();
face[0].bar=()=>{;
	UI.ele.title(face[0].page.toUpperCase(),3,0);//w.gfx.flip();
	UIc.start(0,1);
	UI.btn.c2l("bar","_2x2",3,"WHEEL","ALARMS",15,1);
	UI.btn.c2l("bar","_2x2",4,"BLUETOOTH","PASS",15,6);	
	UIc.end();
};
face[0].bar();
//
UIc.main._2x2=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);
		euc.dash.opt.ride.mode++;
		if (2<euc.dash.opt.ride.mode) euc.dash.opt.ride.mode=0;
		let m=["HARD","MED","SOFT"];
		UI.btn.c2l("main","_2x2",1,"MODE",md[euc.dash.opt.ride.mode],15,4);
		euc.wri("setRideMode",euc.dash.opt.ride.mode);
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);
		euc.wri("getCalibrateTilt");
		eval(require('Storage').read("dashKingsongAdvCalibrate")); 
		return;
	}
};
UIc.bar._2x2=(i)=>{
	if (i==3){
		buzzer.nav(buzzer.buzz.ok);		
		eval(require('Storage').read("dashKingsongAdvAlert")); 
		return;
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);	
		euc.wri("getPass");
		eval(require('Storage').read("dashKingsongAdvPass")); 
		return;
	}
};

