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
	UI.btn.c2l("main","_2x2",1,"ALARM 1",dash.live.limE[0]?dash.live.lim[0]:"OFF",15,dash.live.limE[0]?6:1);
	UI.btn.c2l("main","_2x2",2,"ALARM 2",dash.live.limE[1]?dash.live.lim[1]:"OFF",15,dash.live.limE[1]?6:1);
	UI.btn.c2l("bar","_2x2",3,"ALARM 3",dash.live.lim[2],15,6);
	UI.btn.c2l("bar","_2x2",4,"TILTBACK",dash.live.lim[3],15,6);	
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
	UIc.start(1,1);
	if (i==1||i==2){
		UI.btn.c2l("main","_main",3,dash.live.limE[i-1]?"ENABLED":"DISABLED","",15,dash.live.limE[i-1]?4:1);
		UIc.end();
	}else {UIc.end(); UI.btn.c2l("main","_main",3,"FIXED ALARM","",3,1);}
	UI.btn.c3l("main","_lcd",1,dash.live.lim[i-1],"KPH",14,0);
	UI.btn.ntfy(1,40,0,"_bar",6,"SET","ALARM",15,1,1);
	set.bar=1;
	
	TC.val={cur:dash.live.lim[i-1],dn:i!=1?dash.live.lim[i-2]:1,up:i!=4?dash.live.lim[i]:50,tmp:0};
	UIc.tcBar=(a,b)=>{ 
		UI.btn.c1l("main","_lcd",1,b,"",14,0);
		dash.live.lim[i-1]=b;
	};
	face[0].al=i-1;
	UIc.main._main=(i)=>{
		if (i==3){
			buzzer(buz.ok);		
			dash.live.limE[face[0].al]=1-dash.live.limE[face[0].al];
			UI.btn.c2l("main","_main",3,dash.live.limE[face[0].al]?"ENABLED":"DISABLED","",15,dash.live.limE[face[0].al]?4:1);
		}
	};
};

face[0].start();

