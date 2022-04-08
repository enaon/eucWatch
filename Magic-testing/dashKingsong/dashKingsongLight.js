face[0].page="light";
UI.ele.ind(1,1,1);
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"ON","",15,dash.live.ks.HL==1?4:1);
UI.btn.c2l("main","_2x2",2,"AUTO","",15,dash.live.ks.HL==3?4:1);
UI.btn.c2l("main","_2x2",3,"eucWatch","CITY",15,dash.live.ks.city?12:1);
UI.btn.c2l("main","_2x2",4,"OFF","",15,dash.live.ks.HL==2?4:1);	
UIc.end();
face[0].bar();

//
UIc.main._2x2_1=()=>{
	if (dash.live.ks.HL==1) {buzzer(buz.na);return;}
	dash.live.ks.city=0;
	buzzer(buz.ok);
	euc.wri("setLights",1);
	//face[0].ntfy("HOLD -> LIGHTS OFF",1);
};
UIc.main._2x2_2=()=>{
	if (dash.live.ks.HL==3) {buzzer(buz.na);return;}
	dash.live.ks.city=0;
	buzzer(buz.ok);
	euc.wri("setLights",3);
};
UIc.main._2x2_3=()=>{
	dash.live.ks.city=1-dash.live.ks.city;
	buzzer(buz.ok);		
	UI.btn.c2l("main","_2x2",3,"eucWatch","CITY",15,dash.live.ks.city?12:1);
};
UIc.main._2x2_4=()=>{
	if (dash.live.ks.HL==2) {buzzer(buz.na);return;}
	dash.live.ks.city=0;
	buzzer(buz.ok);	
	euc.wri("setLights",2);
};
//touch
tcN=(x,y)=>{
		buzzer(buz.na);
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	eval(require('Storage').read("dashKingsongAct")); 
};	
tcBack.replaceWith(tcB);