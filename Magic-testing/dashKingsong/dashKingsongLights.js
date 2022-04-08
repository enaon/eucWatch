face[0].page="lights";
UI.ele.ind(1,1,1);
UIc.start(1,1);
UI.btn.c2l("main","_2x2",1,"ON","",15,dash.live.ks.HL==1?4:1);
UI.btn.c2l("main","_2x2",2,"AUTO","",15,dash.live.ks.HL==3?4:1);
UI.btn.c2l("main","_2x2",3,"eucWatch","CITY",15,dash.live.strb?7:1);
UI.btn.c2l("main","_2x2",4,"OFF","",15,dash.live.ks.HL==1?4:1);	
UIc.end();
//
UIc.main._2x2_1=()=>{
	if (dash.live.ks.HS==1) {buzzer(buz.na);;return;}
	buzzer(buz.ok);
	euc.wri("setLights",1);
	//face[0].ntfy("HOLD -> LIGHTS OFF",1);
};
UIc.main._2x2_2=()=>{
	if (dash.live.ks.HS==3) {buzzer(buz.na);;return;}
	buzzer(buz.ok);
	euc.wri("setLights",3);
};
UIc.main._2x2_3=()=>{
	dash.live.ks.city=1-dash.live.ks.city;
	buzzer(buz.ok);		
	face[0].btn((dash.live.ks.city)?1:0,"eucWatch",18,60,115,12,1,0,100,119,195,"CITY",30,60,150);
};
UIc.main._2x2_4=()=>{
	if (dash.live.ks.HS==2) {buzzer(buz.na);;return;}
	buzzer(buz.ok);	
	euc.wri("setLights",2);
};
if (this.tid) clearTimeout(this.tid);

this.show = function(){
	if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
	if ( this.last!=dash.live.ks.HS) {
		UI.btn.c2l("main","_2x2",1,"ON","",15,dash.live.ks.HL==1?4:1);
		UI.btn.c2l("main","_2x2",2,"AUTO","",15,dash.live.ks.HL==3?4:1);
		UI.btn.c2l("main","_2x2",4,"OFF","",15,dash.live.ks.HL==1?4:1);	
	}	
	this.tid=setTimeout(function(t,o){
	  t.tid=-1;
	  t.show();
	},100,this);
};
this.show();
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