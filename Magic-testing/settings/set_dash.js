//dash  Options
face[0].page="dash1";
if (!set.def.dash.rtr) set.def.dash.rtr=5;
UI.ele.fill("_ele","topS",6);
this.bar = function(){
		UIc.start(0,1);
		UI.btn.img("bar","_bar",1,_icon.watch,0,3,0);
		UI.btn.img("bar","_bar",2,_icon.settings,0,3,0);
		UI.btn.img("bar","_bar",3,_icon.dash,0,14,6);
		UIc.end();
		UIc.bar._bar_1=()=>{
			buzzer(buz.ok);
			eval(require('Storage').read("set_main"));
		};
		UIc.bar._bar_2=()=>{
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_set"));
			  this.bar();
		};
		UIc.bar._bar_3=()=>{
			  buzzer(buz.na);
		};
},
face[0].d1=function(){
	face[0].page="dash1";
	UI.ele.ind("top",1,2);
	UIc.start(1,0);
	UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,set.def.dash.mph?0:4);
	UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,set.def.dash.farn?0:4);
	UI.ele.fill("_2x3",3,0);
	UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,6); //4
	UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,6); //5
	UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,6); //6
	UIc.end();
	//
	UIc.main._2x3_1=()=>{
		buzzer(buz.ok);
		set.def.dash.mph=1-set.def.dash.mph;
		if (set.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"SPEED & DISTANCE",(set.def.dash.mph)?"MILES":"KILOMETERS",15,set.def.dash.mph?0:4);
		UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,set.def.dash.mph?0:4);
	};
	UIc.main._2x3_2=()=>{
		buzzer(buz.ok);
		set.def.dash.farn=1-set.def.dash.farn;
		if (set.def.info)  UI.btn.ntfy(1,1.5,0,"_bar",6,"TEMPERATURE",(set.def.dash.farn)?"FAHRENHEIT":"CELSIUS",15,set.def.dash.farn?0:4);
		UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,set.def.dash.farn?0:4);
	};
	UIc.main._2x3_3=()=>{
		buzzer(buz.na);

	};
	UIc.main._2x3_4=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"SPEED","FACTOR",15,6,1);
		//UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,6); //4
		UIc.bar._sel_left=()=>{
			buzzer(buz.ok);
			dash.live.spdF=(dash.live.spdF - 0.01);	if (dash.live.spdF <0.5)  dash.live.spdF=0.5;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,6); //4

		};
		UIc.bar._sel_right=()=>{
			buzzer(buz.ok);
			dash.live.spdF=(dash.live.spdF + 0.01);if (1.5 <dash.live.spdF)  dash.live.spdF=1.5;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,6); //4
		};
		
	};
	UIc.main._2x3_5=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"DISTANCE","FACTOR",15,6,1);
		//UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,6); //5
		UIc.bar._sel_left=()=>{
			buzzer(buz.ok);
			dash.live.trpF=(dash.live.trpF - 0.01);if (dash.live.trpF <0.5)  dash.live.trpF=0.5;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,6); //5

		};
		UIc.bar._sel_right=()=>{
			buzzer(buz.ok);
			dash.live.trpF=(dash.live.trpF + 0.01);if (1.5 <dash.live.trpF)  dash.live.trpF=1.5;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,6); //5
		};
		
	};
	UIc.main._2x3_6=()=>{
		buzzer(buz.ok); 
		UI.btn.ntfy(1,3,0,"_bar",6,"NO OF RETRIES","ON 'LOST'",15,6,1);
		//UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,6); //6
		UIc.bar._sel_left=()=>{
			buzzer(buz.ok);
			set.def.dash.rtr--; if ( set.def.dash.rtr <= 1 ) set.def.dash.rtr = 1;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,6); //6
		};
		UIc.bar._sel_right=()=>{
			buzzer(buz.ok);
			set.def.dash.rtr++; if (20 <= set.def.dash.rtr) set.def.dash.rtr = 20;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,6); //6
		};
	};

};


face[0].d2=function(){
	face[0].page="dash2";
	UIc.start(1,0);
	UI.ele.ind("top",2,2);
	UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,0); //1
	UI.ele.fill("_2x3",2,0);
	UI.btn.c2l("main","_2x3",3,"AMP",dash.live.ampR?"R":"N",15,dash.live.ampR?0:4); //3
	UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,6); //4
	UI.ele.fill("_2x3",5,6);
	UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,6); //6
	UIc.end();
//
	UIc.main._2x3_1=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"100% CELL","VOLT",15,6,1);
		//UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,0); //1
		UIc.bar._sel_left=()=>{
			buzzer(buz.ok);
			dash.live.batF--; if ( dash.live.batF <= 400 ) dash.live.batF = 400;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,0); //1

		};
		UIc.bar._sel_right=()=>{
			buzzer(buz.ok);
			dash.live.batF++; if (425 <= dash.live.batF) dash.live.batF = 425;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,0); //1
		};
	};
	UIc.main._2x3_2=()=>{
			buzzer(buz.ok); 
	};
	UIc.main._2x3_3=()=>{
			dash.live.ampR=1-dash.live.ampR;
			if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"AMPERAGE REPORT",dash.live.ampR?"REVERSED":"NORMAL",15,dash.live.ampR?0:4);
			UI.btn.c2l("main","_2x3",3,"AMP",dash.live.ampR?"R":"N",15,dash.live.ampR?0:4); //3
			buzzer(buz.ok);
	};
	UIc.main._2x3_4=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(1,3,0,"_bar",6,"0% CELL","VOLT",15,6,1);
		//UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,6); //4
		UIc.bar._sel_left=()=>{
			buzzer(buz.ok);
			dash.live.batE--; if ( dash.live.batE <= 300 ) dash.live.batE = 300;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,6); //4

		};
		UIc.bar._sel_right=()=>{
			buzzer(buz.ok);
			dash.live.batE++; if (340 <= dash.live.batE) dash.live.batE = 340;
			UI.btn.ntfy(0,3,1);
			UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,6); //4
		};			
			
	};
	UIc.main._2x3_5=()=>{
			buzzer(buz.na); 
	};
	UIc.main._2x3_6=()=>{
			buzzer(buz.ok); 
			if (1.5<=dash.live.bms) dash.live.bms=1;
			else dash.live.bms=dash.live.bms+0.25;
			if (set.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"WHEEL","VOLTAGE",15,6);
			UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,6); //6
	};
};
//tcNext.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));
tcNext.replaceWith((x,y)=>{
  if (face[0].page=="dash2") {buzzer(buz.na);return;}
	buzzer(buz.ok);face[0].d2();
  if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;this.bar();}
});
tcBack.replaceWith((x,y)=>{
  if (face[0].page=="dash1") {buzzer(buz.na); if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;this.bar();} return;}
	buzzer(buz.ok);face[0].d1();
  if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;this.bar();}
});
face[0].d1();
this.bar();

 	