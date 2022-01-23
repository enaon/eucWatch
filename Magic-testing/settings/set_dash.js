//dash  Options
face[0].page="dash1";
if (!set.def.dash.rtr) set.def.dash.rtr=5;
face[0].d1=function(){
	face[0].page="dash1";
	UI.ele.ind(1,2,6);
	UIc.start(1,0);
	UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,0); //1
	UI.btn.c2l("main","_2x3",2,"SPEED",dash.live.spdF,15,0); //4
	UI.btn.c2l("main","_2x3",3,"AMP",dash.live.ampR?"R":"N",15,0); //3
	UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,6); //4
	UI.btn.c2l("main","_2x3",5,"DIST",dash.live.trpF,15,6); //5
	UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,6); //6
	UIc.end();
	UIc.main._2x3_1=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"100% CELL","VOLT",15,1,1);
		set.bar=1;
		TC.val={cur:dash.live.batF,dn:400,up:425,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,2,1);
			UI.btn.c2l("main","_2x3",1,"FULL",b/100,15,0); //1
			dash.live.batF=b;
		};
	};
	UIc.main._2x3_2=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"SPEED","FACTOR",15,1,1);
		set.bar=1;
		TC.val={cur:dash.live.spdF*100,dn:50,up:150,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,2,1);
			UI.btn.c2l("main","_2x3",2,"SPEED",b/100,15,0); //4
			dash.live.spdF=b/100;
		};		
	};	
	UIc.main._2x3_3=()=>{
			buzzer(buz.ok);
			dash.live.ampR=1-dash.live.ampR;
			if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"AMPERAGE",dash.live.ampR?"REVERSED":"NORMAL",15,0);
			UI.btn.c2l("main","_2x3",3,"AMP",dash.live.ampR?"R":"N",15,0); //3
	};
	UIc.main._2x3_4=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"0% CELL","VOLT",15,1,1);
		set.bar=1;
		TC.val={cur:dash.live.batE,dn:300,up:340,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,2,1);
			UI.btn.c2l("main","_2x3",4,"EMPTY",b/100,15,6); //1
			dash.live.batE=b;
		};		
	};
	UIc.main._2x3_5=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"DISTANCE","FACTOR",15,1,1);
		set.bar=1;
		TC.val={cur:dash.live.trpF*100,dn:50,up:150,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,2,1);
			UI.btn.c2l("main","_2x3",5,"DIST",b/100,15,6); //1
			dash.live.trpF=b/100;
		};	
		
	};
	UIc.main._2x3_6=()=>{
			buzzer(buz.ok); 
			if (1.5<=dash.live.bms) dash.live.bms=1;
			else dash.live.bms=dash.live.bms+0.25;
			if (set.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"WHEEL","VOLTAGE",15,0);
			UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,6); //6
	};

};
face[0].d2=function(){
	face[0].page="dash2";
	UIc.start(1,0);
	UI.ele.ind(2,2,6);
	UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,0);
	UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,0);
	UI.ele.fill("_2x3",3,0);
	UI.ele.fill("_2x3",4,6);
	UI.ele.fill("_2x3",5,6);
	UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,6); //6
	UIc.end();
//
	UIc.main._2x3_1=()=>{
		buzzer(buz.ok);
		set.def.dash.mph=1-set.def.dash.mph;
		if (set.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"LENGTH UNIT",(set.def.dash.mph)?"MILE":"KILOMETER",15,0);
		UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,0);
	};
	UIc.main._2x3_2=()=>{
		buzzer(buz.ok);
		set.def.dash.farn=1-set.def.dash.farn;
		if (set.def.info)  UI.btn.ntfy(1,1.5,0,"_bar",6,"TEMPERATURE",(set.def.dash.farn)?"FAHRENHEIT":"CELSIUS",15,0);
		UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,0);
	};
	UIc.main._2x3_6=()=>{
		buzzer(buz.ok); 
		UI.btn.ntfy(1,3,0,"_bar",6,"RETRIES","ON 'LOST'",15,1,1);
		set.bar=1;
		TC.val={cur:set.def.dash.rtr,dn:1,up:20,tmp:0};
		UIc.tcBar=(a,b)=>{ 
			UI.btn.ntfy(0,2,1);
			UI.btn.c2l("main","_2x3",6,"RETRY",b,15,6); //6
			set.def.dash.rtr=b;
		};	
	};


};
//tcNext.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));
tcNext.replaceWith((x,y)=>{
  if (face[0].page=="dash2") {buzzer(buz.na);return;}
	buzzer(buz.ok);face[0].d2();
  if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
});
tcBack.replaceWith((x,y)=>{
  if (face[0].page=="dash1") {
	buzzer(buz.ok); eval(require("Storage").read("set_apps"));
	if (UI.ntid) {clearTimeout(UI.ntid);UI.	ntid=0;}
	face[0].bar();
	return;
  }
	buzzer(buz.ok);face[0].d1();
  if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
  face[0].bar();
});
face[0].d1();
//this.bar();

 	