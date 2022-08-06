//touch
tcB=(x,y)=>{
	buzzer(buz.ok);	
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].start();}
	else {
		euc.wri("setAlarms");
		eval(require('Storage').read("dashKingsongAdv")); 
	}
};	
tcBack.replaceWith(tcB);
tcNext.replaceWith(tcB);
//
face[0].page="wheel alarms";
face[0].start=()=>{
	UI.ele.ind(1,1,1);
	UIc.start(1,1);
	UI.btn.c2l("main","_2x2",1,"ALARM 1",euc.dash.alrt.spd.one.en?euc.dash.alrt.spd.one.val:"OFF",15,euc.dash.alrt.spd.one.en?6:1);
	UI.btn.c2l("main","_2x2",2,"ALARM 2",euc.dash.alrt.spd.two.en?euc.dash.alrt.spd.two.val:"OFF",15,euc.dash.alrt.spd.two.en?6:1);
	UI.btn.c2l("bar","_2x2",3,"ALARM 3",euc.dash.alrt.spd.thre.val,15,6);
	UI.btn.c2l("bar","_2x2",4,"TILTBACK",euc.dash.alrt.spd.tilt.val,15,6);	
	UIc.end();
	face[0].bar();
	//
	UIc.main._2x2=(i)=>{
		buzzer(buz.ok);
		face[0].set(i);
	};
	UIc.bar._2x2=UIc.main._2x2;
};

face[0].set=(i)=>{
	//UI.btn.ntfy(0,15,1);
	let id=["one","two","thre","tilt"];
	UIc.start(1,1);
	if (i==1||i==2){
		UI.btn.c2l("main","_main",3,euc.dash.alrt.spd[id[i-1]].en?"ENABLED":"DISABLED","",15,euc.dash.alrt.spd[id[i-1]].en?4:1);
		UIc.end();
	}else {UIc.end(); UI.btn.c2l("main","_main",3,"FIXED ALARM","",3,1);}
	UI.btn.c3l("main","_lcd",1,euc.dash.alrt.spd[id[i-1]].val,"KPH",14,0);
	UI.btn.ntfy(1,40,0,"_bar",6,"SET","ALARM",15,1,1);
	set.bar=1;
	
	TC.val={cur:euc.dash.alrt.spd[id[i-1]].val,dn:i!=1?euc.dash.alrt.spd[id[i-2]].val:1,up:i!=4?euc.dash.alrt.spd[id[i]].val:50,tmp:0};
	UIc.tcBar=(a,b)=>{ 
		let id=["one","two","thre","tilt"];

		UI.btn.c1l("main","_lcd",1,b,"",14,0);
		euc.dash.alrt.spd[id[i-1]].val=b;
	};
	face[0].al=i-1;
	UIc.main._main=(i)=>{
		if (i==3){
			let id=["one","two","thre","tilt"];
			buzzer(buz.ok);		
				//this.btn(1,euc.dash.alrt.spd[b].val,100,126,60,12,1,60,40,180,160);
				//euc.dash.alrt.spd[b].en=1;
			euc.dash.alrt.spd[id[face[0].al]].en=1-euc.dash.alrt.spd[id[face[0].al]].en;
			UI.btn.c2l("main","_main",3,euc.dash.alrt.spd[id[face[0].al]].val?"ENABLED":"DISABLED","",15,euc.dash.alrt.spd[id[face[0].al]].val?4:1);
		}
	};
};

face[0].start();

