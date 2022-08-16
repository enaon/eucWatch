//
touchHandler[0]=function(){};
tcB=(x,y)=>{
	buzzer(buz.ok);
	if (UI.ntid&&face[0].bar) {
		clearTimeout(UI.ntid);
		UI.ntid=0;
		face[0].bar();
	}else if (!euc.dash.info.get.makr||!ew.def.dash.slot||!require("Storage").readJSON("logDaySlot"+ew.def.dash.slot+".json",1))
		face.go("main",0); 
	else   
		face.go("dashOff",0);
};	
tcBack.replaceWith(tcB);
tcN=(x,y)=>{
	buzzer(buz.na);
};
tcNext.replaceWith(tcN);
//Dash Garage
face[0] = { 
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:15000,
	bpp:ew.def.bpp?0:1,
	g:w.gfx, 
	slot:0,
	icon:"",
	init: function(o){ 
		this.prevSlot=ew.def.dash.slot;
		this.bar();
		this.run=false;	
	},
	show : function(o){return;},
	bar : function(){
		this.slot=require("Storage").readJSON("dash.json",1);
		target={"InmotionV1":"im","Begode":"bg","NinebotS":"nb","NinebotZ":"nb","Inmotion":"im","Veteran":"vt","Ninebot":"nb","Kingsong":"ks"};
		UI.ele.title("GARAGE",3,0);
		UI.ele.ind(2,2,0);
		UIc.start(1,1);	
		this.slot.slot1Mac?UI.btn.img("main","_2x2",1,this.icon+target[this.slot.slot1Maker],this.slot.slot1Model.toUpperCase(),this.slot.slot==1?15:3,this.slot.slot==1?1:0):UI.btn.img("main","_2x2",1,this.icon+"scan","",2,0);
  this.slot.slot2Mac?UI.btn.img("main","_2x2",2,this.icon+target[this.slot.slot2Maker],this.slot.slot2Model.toUpperCase(),this.slot.slot==2?15:3,this.slot.slot==2?1:0):UI.btn.img("main","_2x2",2,this.icon+"scan","",2,0);   
    this.slot.slot3Mac?UI.btn.img("main","_2x2",3,this.icon+target[this.slot.slot3Maker],this.slot.slot3Model.toUpperCase(),this.slot.slot==3?15:3,this.slot.slot==3?1:0): UI.btn.img("main","_2x2",3,this.icon+"scan","",2,0);    
    this.slot.slot4Mac?UI.btn.img("main","_2x2",4,this.icon+target[this.slot.slot4Maker],this.slot.slot4Model.toUpperCase(),this.slot.slot==4?15:3,this.slot.slot==4?1:0):UI.btn.img("main","_2x2",4,this.icon+"scan","",2,0);
		UIc.end();
		UIc.main._2x2=(i)=>{if (face[0].slot["slot"+i+"Mac"]) face[0].tap(i); else face[0].empty(i) ;};
	},
	tap:function(no){
		buzzer(buz.ok);
		if (this.prevSlot==no) {
			UI.ele.ind(1,1,0);
			UI.btn.ntfy(0,1.5,1);
			if (ew.def.info)
				UI.txt.block("_main",9,"Press & hold\n\nthe side btn\n\nto start/end\nthe connection.",80,15,0);
			else {
				let target={"InmotionV1":"im","Begode":"bg","NinebotS":"nb","NinebotZ":"nb","Inmotion":"im","Veteran":"vt","Ninebot":"nb","Kingsong":"ks"};
				UI.btn.img("main","_2x2",no,this.icon+target[this.slot["slot"+no+"Maker"]],this.slot["slot"+no+"Model"].toUpperCase(),15,4);
			}
			UIc.start(1,0);	
			UI.btn.img("main","_bar",5,this.icon+"alert","Alerts",15,1);
			UI.btn.img("main","_bar",4,this.icon+"trash","Delete",15,13);
			UIc.end();	
			UIc.main._bar=(i)=>{
				if (i==5){
					buzzer(buz.ok);
					face.go("dashAlerts",0);
				}else if (i==4){
					buzzer(buz.ok);
					face[0].del(no);
				}
				return;
			};
		}else{
			UI.ele.title("SELECTED",15,0);
			UI.btn.img("main","_2x2",no,this.icon+target[this.slot["slot"+no+"Maker"]],this.slot["slot"+no+"Model"].toUpperCase(),15,1);
			if (this.slot["slot"+this.prevSlot+"Mac"] ){ 
				UI.btn.img("main","_2x2",this.prevSlot,this.icon+target[this.slot["slot"+this.prevSlot+"Maker"]],this.slot["slot"+this.prevSlot+"Model"].toUpperCase(),3,0);
				require("Storage").writeJSON('eucSlot'+this.prevSlot+'.json',euc.dash.live);
			}
			ew.do.fileWrite("dash","slot",no);
			ew.def.dash.slot=no;
			this.prevSlot=no;
		}	
		if (Boolean(require("Storage").read('eucSlot'+no+'.json')))
			euc.dash=require("Storage").readJSON('eucSlot'+no+'.json',1);
		else 
			euc.dash=require("Storage").readJSON("eucSlot.json",1);
	},
	empty: function(no){
		buzzer(buz.ok);
		UI.btn.ntfy(0,1.5,1);
		UI.ele.ind(1,1,0);
		if (ew.def.info)
			UI.txt.block("_main",9,"SLOT "+no+" is empty. Scan for a Wheel.",14,15,0); 
		else 
			UI.btn.img("main","_2x2",this.icon+no,"scan","",3,1);
		UIc.start(1,0);	
		UI.btn.img("main","_bar",6,this.icon+"scan","SCAN",15,4);
		UIc.end();
		UIc.main._bar=(i)=>{
			if (i==6){
				buzzer(buz.ok);
				euc.dash=require("Storage").readJSON("eucSlot.json",1);	
				ew.do.fileWrite("dash","slot",no);
				ew.def.dash.slot=no;			
				face.go("dashScan",0);
			}
		};
	},
	del:function(no){
		UI.btn.ntfy(0,2,1);
		if (ew.def.info)UI.btn.c2l("main","_main",6,`SLOT ${no}`,"DELETE?",15,0,1);
		UIc.start(1,0);	
		UI.btn.img("main","_bar",6,this.icon+"trash","CONFIRM",15,13);
		UIc.end();
		UIc.main._bar=(i)=>{
			if(i==6){
				buzzer(300);
				ew.do.fileWrite("dash",`slot${no}Mac`);
				ew.do.fileWrite("dash",`slot${no}Name`);
				ew.do.fileWrite("dash",`slot${no}Maker`);
				ew.do.fileWrite("dash",`slot${no}Model`);
				require("Storage").erase(`logDaySlot${no}.json`);
				require("Storage").erase(`logWeekSlot${no}.json`);
				require("Storage").erase(`logYearlot${no}.json`);
				require("Storage").erase(`eucSlot${no}.json`);
				euc.dash=require("Storage").readJSON("eucSlot.json",1);	
				UI.btn.ntfy(1,1.5,1);
				UI.btn.c2l("main","_bar",6,`SLOT ${no}`,"DELETED",15,4);
				ew.def.dash.slot=0;
				face[0].prevSlot=0;
			}
		};
	},
	tid:-1,
	run:false,
	clear : function(){/*TC.removeAllListeners();*/if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;} return true;},
	off: function(){this.g.off();this.clear();}
};

