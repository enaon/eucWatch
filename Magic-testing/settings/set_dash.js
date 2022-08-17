
//dash  Options
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
//
face[0].page="dash1";
if (!ew.def.dash.rtr) ew.def.dash.rtr=5;
face[0].d1=function(){
	face[0].page="dash1";
	UI.ele.ind(1,2,0);
	UIc.start(1,0);
	UI.btn.c2l("main","_2x3",1,"FULL",euc.dash.opt.bat.hi/100,15,0); //1
	UI.btn.c2l("main","_2x3",2,"SPEED",euc.dash.opt.unit.fact.spd,15,0); //4
	UI.btn.c2l("main","_2x3",3,"AMP",euc.dash.opt.unit.ampR?"R":"N",15,0); //3
	UI.btn.c2l("main","_2x3",4,"EMPTY",euc.dash.opt.bat.low/100,15,6); //4
	UI.btn.c2l("main","_2x3",5,"DIST",euc.dash.opt.unit.fact.dist,15,6); //5
	UI.btn.c2l("main","_2x3",6,"PACK",euc.dash.opt.bat.pack*67.2|0,15,6); //6
	UIc.end();
	//
	UIc.main._2x3=(i)=>{
		if (i==1){
			buzzer(buz.ok);
			UI.btn.ntfy(1,3,0,"_bar",6,"100% CELL","VOLT",15,1,1);
			ew.temp.bar=1;
			TC.val={cur:euc.dash.opt.bat.hi,dn:400,up:425,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,2,1);
				UI.btn.c2l("main","_2x3",1,"FULL",b/100,15,0); //1
				euc.dash.opt.bat.hi=b;
			};
		}else if (i==2){
			buzzer(buz.ok);
			UI.btn.ntfy(1,3,0,"_bar",6,"SPEED","FACTOR",15,1,1);
			ew.temp.bar=1;
			TC.val={cur:euc.dash.opt.unit.fact.spd*100,dn:50,up:150,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,2,1);
				UI.btn.c2l("main","_2x3",2,"SPEED",b/100,15,0); //4
				euc.dash.opt.unit.fact.spd=b/100;
			};			
		}else if (i==3){
			buzzer(buz.ok);
			euc.dash.opt.unit.ampR=1-euc.dash.opt.unit.ampR;
			if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"AMPERAGE",euc.dash.opt.unit.ampR?"REVERSED":"NORMAL",15,0);
			UI.btn.c2l("main","_2x3",3,"AMP",euc.dash.opt.unit.ampR?"R":"N",15,0); //3
		}else if (i==4){
			buzzer(buz.ok);
			UI.btn.ntfy(1,3,0,"_bar",6,"0% CELL","VOLT",15,1,1);
			ew.temp.bar=1;
			TC.val={cur:euc.dash.opt.bat.low,dn:300,up:340,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,2,1);
				UI.btn.c2l("main","_2x3",4,"EMPTY",b/100,15,6); //1
				euc.dash.opt.bat.low=b;
			};		
		}else if (i==5){
			buzzer(buz.ok);
			UI.btn.ntfy(1,3,0,"_bar",6,"DISTANCE","FACTOR",15,1,1);
			ew.temp.bar=1;
			TC.val={cur:euc.dash.opt.unit.fact.dist*100,dn:50,up:150,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,2,1);
				UI.btn.c2l("main","_2x3",5,"DIST",b/100,15,6); //1
				euc.dash.opt.unit.fact.dist=b/100;
			};	
		}else if (i==6){
			buzzer(buz.ok); 
			if (1.5<=euc.dash.opt.bat.pack&& euc.dash.opt.bat.pack<=1.8) euc.dash.opt.bat.pack=1.875;
			else if (euc.dash.opt.bat.pack==1.875) euc.dash.opt.bat.pack=2;
			else if (euc.dash.opt.bat.pack==2) euc.dash.opt.bat.pack=1;
			else euc.dash.opt.bat.pack=euc.dash.opt.bat.pack+0.25;
			if (ew.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"WHEEL","VOLTAGE",15,0);
			UI.btn.c2l("main","_2x3",6,"PACK",euc.dash.opt.bat.pack*67.2|0,15,6); //6
		}
	};
};
face[0].d2=function(){
	face[0].page="dash2";
	UIc.start(1,0);
	UI.ele.ind(2,2,0);
	UI.btn.c2l("main","_2x3",1,(ew.def.dash.mph)?"MPH":"KPH",0,15,0);
	UI.btn.c2l("main","_2x3",2,(ew.def.dash.farn)?"°F":"°C",0,15,0);
	UI.ele.fill("_2x3",3,0);
	UI.ele.fill("_2x3",4,6);
	UI.ele.fill("_2x3",5,6);
	UI.btn.c2l("main","_2x3",6,"RETRY",ew.def.dash.rtr,15,6); //6
	UIc.end();
//
	UIc.main._2x3=(i)=>{
		if (i==1){
			buzzer(buz.ok);
			ew.def.dash.mph=1-ew.def.dash.mph;
			if (ew.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"LENGTH UNIT",(ew.def.dash.mph)?"MILE":"KILOMETER",15,0);
			UI.btn.c2l("main","_2x3",1,(ew.def.dash.mph)?"MPH":"KPH",0,15,0);
		}else if (i==2){
			buzzer(buz.ok);
			ew.def.dash.farn=1-ew.def.dash.farn;
			if (ew.def.info)  UI.btn.ntfy(1,1.5,0,"_bar",6,"TEMPERATURE",(ew.def.dash.farn)?"FAHRENHEIT":"CELSIUS",15,0);
			UI.btn.c2l("main","_2x3",2,(ew.def.dash.farn)?"°F":"°C",0,15,0);
		}else if (i==6){
			buzzer(buz.ok); 
			UI.btn.ntfy(1,3,0,"_bar",6,"RETRIES","ON 'LOST'",15,1,1);
			ew.temp.bar=1;
			TC.val={cur:ew.def.dash.rtr,dn:1,up:20,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,2,1);
				UI.btn.c2l("main","_2x3",6,"RETRY",b,15,6); //6
				ew.def.dash.rtr=b;
			};	
		}
	};
};
face[0].d1();
//this.bar();

 	