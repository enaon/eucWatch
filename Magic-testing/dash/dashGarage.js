//Dash Garage
face[0] = { 
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:15000,
	bpp:set.def.bpp?0:1,
	g:w.gfx, 
	dash:0,
	init: function(o){ 
		this.sv=[-1,-1,-1,-1,-1];
		this.dash=require("Storage").readJSON("dash.json",1);
		this.bar();
		this.run=false;	
		TC.on('tc5',UIc.xy);
		UIc.clear();
	},
	show : function(o){return;},
	bar : function(){
		//start bar
		UI.ele.fill("_ele","topS",1);
		UI.ele.ind("top",2,2);
		UIc.start(1,0);	
		this.dash.slot1Mac?UI.btn.c2l("main","_2x2",1,this.dash.slot1Maker.toUpperCase(),this.dash.slot1Model.toUpperCase(),this.dash.slot==1?14:0,this.dash.slot==1?4:3):UI.btn.c2l("main","_2x2",1,"","",0,0);
		this.dash.slot2Mac?UI.btn.c2l("main","_2x2",2,this.dash.slot2Maker.toUpperCase(),this.dash.slot2Model.toUpperCase(),this.dash.slot==2?14:0,this.dash.slot==2?4:3):UI.btn.c2l("main","_2x2",2,"","",0,0);
		this.dash.slot3Mac?UI.btn.c2l("main","_2x2",3,this.dash.slot3Maker.toUpperCase(),this.dash.slot3Model.toUpperCase(),this.dash.slot==3?14:0,this.dash.slot=3?4:3):UI.btn.c2l("main","_2x2",3,"","",0,0); 
		this.dash.slot4Mac?UI.btn.c2l("main","_2x2",4,this.dash.slot4Maker.toUpperCase(),this.dash.slot4Model.toUpperCase(),this.dash.slot==4?14:0,this.dash.slot==4?4:3):UI.btn.c2l("main","_2x2",4,"","",0,0);
		UI.ele.title("btmS","GARAGE",15,1);
		UIc.end();
		UIc.main._2x2_1=function(){face[0].tap(1);};
		UIc.main._2x2_2=function(){face[0].tap(2);};
		UIc.main._2x2_3=function(){face[0].tap(3);};
		UIc.main._2x2_4=function(){face[0].tap(4);};
		//end bar
	},
	tap:function(no){
		buzzer(buz.ok);
		if (face[0].dash["slot"+no+"Mac"]){
			setter.write("dash","slot",no);
			set.def.dash.slot=no;
			this.dash=require("Storage").readJSON("dash.json",1);
			if (Boolean(require("Storage").read('eucSlot'+no+'.json')))
				dash.live=require("Storage").readJSON('eucSlot'+no+'.json',1);
			else 
				dash.live=require("Storage").readJSON("eucSlot.json",1);
			UI.ele.ind("top",1,1);
			UI.ele.title("btmS","SLOT "+no,15,1);
			UI.btn.ntfy("_2x2",3,"","",15,6,4);
			UIc.start(1,0);	
			UI.txt.block("_2x1",1,"Press & hold the side button to start or end the EUC connection.",15,1);
			UI.btn.img("main","_2x2",3,UI.icon.settings,"Setup",15,6);
			UI.btn.img("main","_2x2",4,UI.icon.trash,"Delete",15,6);
			UIc.end();	
			UIc.main._2x2_3=function(){buzzer(buz.ok);face.go("dashAlerts",0);};
			UIc.main._2x2_4=function(){buzzer(buz.ok);face[0].del(no);};
		} else{
			UI.ele.ind("top",1,1);
			UI.ele.title("btmS","SLOT "+no,15,1);
			UI.btn.ntfy("_2x2",3,"","",15,6,4);
			//UI.btn.ntfy("_2X3",1,"","",15,2,3);
			UI.txt.block("_2x1",1,"Tap to scan for a new wheel and add it to this slot. ",15,1);
			UIc.start(1,0);	
			UI.btn.img("main","_2x1",2,UI.icon.scan,"",15,6,1);
			UIc.end();
			UIc.main._2x1_2=function(){
				buzzer(buz.ok);
				setter.write("dash","slot",no);
				set.def.dash.slot=no;			
				face.go("dashScan",0);
			};
		}
	},
	del:function(no){
		UI.ele.title("btmS","",15,1);
		UI.btn.ntfy("_2x1",2,"","",15,7,4);
		UI.btn.c2l("main","_2x1",1,"DELETE",`SLOT ${no} ?`,15,1,1);
		UIc.start(1,0);	
		UI.btn.c2l("main","_2x1",2,"TAP TO","CONFIRM",15,7,1);
		UIc.end();
		UIc.main._2x1_2=function(){
			buzzer(buz.ok);
		    setter.write("dash",`slot${no}Mac`);
			setter.write("dash",`slot${no}Model`);
			setter.write("dash",`slot${no}Maker`);
			require("Storage").erase(`logDaySlot${no}.json`);
			require("Storage").erase(`logWeekSlot${no}.json`);
			require("Storage").erase(`logYearlot${no}.json`);
			set.def.dash.slot=0;
			require("Storage").erase(`eucSlot${no}.json`);
			dash.live=require("Storage").readJSON("eucSlot.json",1);				
			UI.btn.ntfy("_sel",4,"DELETED","SLOT "+no,15,2,2);
			w.gfx.flip();
			face[0].dash=require("Storage").readJSON("dash.json",1);

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
	clear: function(){return;},
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
