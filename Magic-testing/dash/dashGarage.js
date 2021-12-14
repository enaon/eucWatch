//Dash Garage
face[0] = { 
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:15000,
	bpp:set.def.bpp?0:1,
	g:w.gfx, 
	slot:0,
	init: function(o){ 
		this.prevSlot=set.def.dash.slot;
		this.bar();
		this.run=false;	
		TC.on('tc5',UIc.xy);
	},
	show : function(o){return;},
	bar : function(){
		this.slot=require("Storage").readJSON("dash.json",1);
		UI.ele.fill("_ele","topS",6);
		UI.ele.title("btmS","GARAGE",15,0);
		UI.ele.ind("top",2,2);
		UIc.start(1,1);	
		this.slot.slot1Mac?UI.btn.c2l("main","_2x2",1,this.slot.slot1Maker.toUpperCase(),this.slot.slot1Model.toUpperCase(),this.slot.slot==1?15:3,this.slot.slot==1?4:1):UI.btn.img("main","_2x2",1,_icon.scan,"",2,0);
		this.slot.slot2Mac?UI.btn.c2l("main","_2x2",2,this.slot.slot2Maker.toUpperCase(),this.slot.slot2Model.toUpperCase(),this.slot.slot==2?15:3,this.slot.slot==2?4:1):UI.btn.img("main","_2x2",2,_icon.scan,"",2,0);
		this.slot.slot3Mac?UI.btn.c2l("main","_2x2",3,this.slot.slot3Maker.toUpperCase(),this.slot.slot3Model.toUpperCase(),this.slot.slot==3?15:3,this.slot.slot==3?4:1): UI.btn.img("main","_2x2",3,_icon.scan,"",2,0);
		this.slot.slot4Mac?UI.btn.c2l("main","_2x2",4,this.slot.slot4Maker.toUpperCase(),this.slot.slot4Model.toUpperCase(),this.slot.slot==4?15:3,this.slot.slot==4?4:1):UI.btn.img("main","_2x2",4,_icon.scan,"",2,0);
		UIc.end();
		UIc.main._2x2_1=function(){if (face[0].slot.slot1Mac) face[0].tap(1); else face[0].empty(1) ;};
		UIc.main._2x2_2=function(){if (face[0].slot.slot2Mac) face[0].tap(2); else face[0].empty(2) ;};
		UIc.main._2x2_3=function(){if (face[0].slot.slot3Mac) face[0].tap(3); else face[0].empty(3) ;};
		UIc.main._2x2_4=function(){if (face[0].slot.slot4Mac) face[0].tap(4); else face[0].empty(4) ;};
	},
	tap:function(no){
		buzzer(buz.ok);
		if (this.prevSlot==no) {
			//UI.ele.fill("_ele","topS",12);
			UI.ele.title("btmS","SLOT "+no,15,1);
			UI.btn.ntfy(0,2,0,"_ele","topS","","",15,6);
			UI.ele.ind("top",1,1);
			UIc.start(1,0);	
			if (set.def.info)UI.txt.block("_main",6,"Press & hold the side btn to start/end the connction.",15,15,0);
			UI.btn.img("main","_bar",4,_icon.settings,"Setup",15,6);
			UI.btn.img("main","_bar",5,_icon.trash,"Delete",15,7);
			UIc.end();	
			UIc.main._bar_4=function(){buzzer(buz.ok);face.go("dashAlerts",0);};
			UIc.main._bar_5=function(){buzzer(buz.ok);face[0].del(no);};
		}else{
			UI.btn.c2l("main","_2x2",no,this.slot["slot"+no+"Maker"].toUpperCase(),this.slot["slot"+no+"Model"].toUpperCase(),15,4);
			if (this.slot["slot"+this.prevSlot+"Mac"] ){ 
				UI.btn.c2l("main","_2x2",this.prevSlot,this.slot["slot"+this.prevSlot+"Maker"].toUpperCase(),this.slot["slot"+this.prevSlot+"Model"].toUpperCase(),3,1);
				require("Storage").writeJSON('eucSlot'+this.prevSlot+'.json',dash.live);
			}
			setter.write("dash","slot",no);
			set.def.dash.slot=no;
			this.prevSlot=no;
		}	
		if (Boolean(require("Storage").read('eucSlot'+no+'.json')))
			dash.live=require("Storage").readJSON('eucSlot'+no+'.json',1);
		else 
			dash.live=require("Storage").readJSON("eucSlot.json",1);
	},
	empty: function(no){
		buzzer(buz.ok);
		UI.btn.ntfy(0,2,0,"_ele","topS","","",15,6);
		UI.ele.ind("top",1,1);
		if (set.def.info)UI.txt.block("_main",6,"SLOT "+no+" is empty. Scan for a Wheel.",14,15,0);
		UIc.start(1,0);	
		UI.btn.img("main","_bar",6,_icon.scan,"SCAN",15,6);
		UIc.end();
		UIc.main._bar_6=function(){
			buzzer(buz.ok);
			setter.write("dash","slot",no);
			set.def.dash.slot=no;			
			face.go("dashScan",0);
		};
	},
	del:function(no){
		UI.btn.ntfy(0,2,1);
		if (set.def.info)UI.btn.c2l("main","_main",6,`SLOT ${no}`,"REALLY DELETE ?",15,0,1);
		UIc.start(1,0);	
		UI.btn.img("main","_bar",6,_icon.trash,"CONFIRM",15,7);
		UIc.end();
		UIc.main._bar_6=function(){
			buzzer(buz.ok);
		    setter.write("dash",`slot${no}Mac`);
			setter.write("dash",`slot${no}Model`);
			setter.write("dash",`slot${no}Maker`);
			setter.write("dash",`slot${no}Name`);
			require("Storage").erase(`logDaySlot${no}.json`);
			require("Storage").erase(`logWeekSlot${no}.json`);
			require("Storage").erase(`logYearlot${no}.json`);
			require("Storage").erase(`eucSlot${no}.json`);
			dash.live=require("Storage").readJSON("eucSlot.json",1);	
			UI.btn.ntfy(1,1.5,1);
			UI.btn.c2l("main","_main",6,`SLOT ${no}`,"DELETED",15,0);
			set.def.dash.slot=0;
			face[0].prevSlot=0;
			
		};
	},
	tid:-1,
	run:false,
	clear : function(){TC.removeAllListeners();if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;} return true;},
	off: function(){this.g.off();this.clear();}
};
face[1] = {
	offms:1000,
	init: function(){return;},
	show : function(){
		if (euc.state=="OFF"){
      if (!dash.live.maker||!set.def.dash.slot||!require("Storage").readJSON("logDaySlot"+set.def.dash.slot+".json",1))
		    face.go("main",0); 
	    else face.go("dashOff",0);      
    }else face.go(set.dash[set.def.dash.face],0);
		return;
	},
	clear: function(){TC.removeAllListeners();if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;}return true;},
	off: function(){this.clear();}
};	
//
touchHandler[0]=function(){};
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 	
UIc.back=(x,y)=>{
	if (UI.ntid&&face[0].bar) {
		buzzer(buz.ok);
		clearTimeout(UI.ntid);
		UI.ntid=0;
		face[0].bar();
	}else if (!dash.live.maker||!set.def.dash.slot||!require("Storage").readJSON("logDaySlot"+set.def.dash.slot+".json",1))
		face.go("main",0); 
	else   
		face.go("dashOff",0);
};	
UIc.next=(x,y)=>{
	buzzer(buz.na);
};	
TC.on('tc3',UIc.next); 	
TC.on('tc4',UIc.back); 
