//Dash Garage
face[0] = { 
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	bpp:set.def.bpp?0:1,
	g:w.gfx, 
	dash:0,
	init: function(o){ 
		this.sv=[-1,-1,-1,-1,-1];
		this.dash=require("Storage").readJSON("dash.json",1);
		UI.ele.fill("_ele","topS",1);
		UI.ele.ind("top",2,2);
		this.bar();
		this.s1=0;this.s2=0;this.s3=0;this.s4=0;
		this['s'+this.dash.slot]=1;
		this.set=0;
		this.run=false;	
		TC.on('tc5',UIc.tap.xy);
		TC.on('tc12',UIc.hold.xy);
	},
	show : function(o){
		if (!face[0].run) return;
	},
	bar : function(){
		//start bar
		UIc.start(1,1);	
		this.dash.slot1Mac?UI.btn.c2l("main",[1,1,0],"_2x2",1,this.dash.slot1Maker.toUpperCase(),this.dash.slot1Name.toUpperCase(),this.dash.slot==1?14:0,this.dash.slot==1?4:3):UI.btn.c2l("main",[1,1,0],"_2x2",1,"","",0,0);
		this.dash.slot2Mac?UI.btn.c2l("main",[1,1,0],"_2x2",2,this.dash.slot2Maker.toUpperCase(),this.dash.slot2Name.toUpperCase(),this.dash.slot==2?14:0,this.dash.slot==2?4:3):UI.btn.c2l("main",[1,1,0],"_2x2",2,"","",0,0);
		this.dash.slot3Mac?UI.btn.c2l("main",[1,1,0],"_2x2",3,this.dash.slot3Maker.toUpperCase(),this.dash.slot3Name.toUpperCase(),this.dash.slot==3?14:0,this.dash.slot=3?4:3):UI.btn.c2l("main",[1,1,0],"_2x2",3,"","",0,0); 
		this.dash.slot4Mac?UI.btn.c2l("main",[1,1,0],"_2x2",4,this.dash.slot4Maker.toUpperCase(),this.dash.slot4Name.toUpperCase(),this.dash.slot==4?14:0,this.dash.slot==4?4:3):UI.btn.c2l("main",[1,1,0],"_2x2",4,"","",0,0);
		UIc.end();
		UI.ele.title("btmS","GARAGE",15,1);
		UIc.tap.main._2x2=this.tap;
		UIc.hold.main._2x2=this.hold;
		//end bar
	},
	tap:function(no){
		buzzer(buz.ok);
		if (face[0].dash["slot"+no+"Mac"]){
			setter.write("dash","slot",no);
			set.def.dash.slot=no;
			if (Boolean(require("Storage").read('eucSlot'+no+'.json'))){
				dash.live=require("Storage").readJSON('eucSlot'+no+'.json',1);
			}else dash.live=require("Storage").readJSON("eucSlot.json",1);
			//face[0].slot();
			UI.btn.ntfy("_sel",4,"","",15,6,2);
		} else{
			//UI.btn.img([1,0,0],"_2x2",no,UI.icon.scan,"SCAN",15,2);
			UI.btn.ntfy("_sel",4,"","",15,2,2);
		}
	
	},
	hold:function(no){
		buzzer(buz.ok);
		if (face[0].dash["slot"+no+"Mac"]){
			//face[0].clear();
			UI.ele.title("top",face[0].dash["slot"+no+"Mac"],15,4);
			UI.btn.c2l("main",[1,0,0],"_2x1",1,"WATCH ALERTS",0,15,4); 	
			UI.btn.c2l("main",[1,0,0],"_2x1",2,"DELETE WHEEL",0,15,7); 	
		}else {
			dash.live=require("Storage").readJSON("eucSlot.json",1);
			face.go("dashScan",0);
			return;
		}
	},
	tid:-1,
	run:false,
	clear : function(){  
		TC.removeAllListeners();
		this.run=false;
		return true;
	},
	off: function(){
	this.g.off();
	this.clear();
	}
};
face[1] = {
	offms:1000,
	init: function(){
		return;
	},
	show : function(){
		if (euc.state=="OFF"){
      if (!dash.live.maker||!set.def.dash.slot||!require("Storage").readJSON("logDaySlot"+set.def.dash.slot+".json",1))
		    face.go("main",0); 
	    else   
		    face.go("dashOff",0);      
    }else face.go(set.dash[set.def.dash.face],0);
		return;
	},
	clear: function(){
		return;
	},
	off: function(){
		this.clear();
	}
};	
//
touchHandler[0]=function(){};
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 	
UIc.back=(x,y)=>{
	if (!dash.live.maker||!set.def.dash.slot||!require("Storage").readJSON("logDaySlot"+set.def.dash.slot+".json",1))
		face.go("main",0); 
	else   
		face.go("dashOff",0);
};	
UIc.next=(x,y)=>{
	buzzer(buz.na);
};	
TC.on('tc3',UIc.next); 	
TC.on('tc4',UIc.back); 





touc=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
	case 12: //long press event
		buzzer(100);
		if ( face[0].set ) {
			if ( y<=120 ) {
				w.gfx.setColor(0,0);
				w.gfx.drawLine (0,98,239,98);
				w.gfx.drawLine (0,99,239,99);
				w.gfx.flip();
				w.gfx.drawLine (120,0,120,195);
				w.gfx.drawLine (121,0,121,195);
				w.gfx.flip();
				face.go("dashAlerts",0);return;
			} else {
                setter.write("dash", "slot"+setter.read("dash","slot")+"Mac");
                setter.write("dash","slot"+setter.read("dash","slot")+"Maker");
                setter.write("dash","slot"+setter.read("dash","slot")+"Name");
				require("Storage").erase('logDaySlot'+setter.read("dash","slot")+'.json');
				require("Storage").erase('logWeekSlot'+setter.read("dash","slot")+'.json');
				require("Storage").erase('logYearSlot'+setter.read("dash","slot")+'.json');
				set.def.dash.slot=0;
				require("Storage").erase('eucSlot'+setter.read("dash","slot")+'.json');
				dash.live=require("Storage").readJSON("eucSlot.json",1);				
				face[0].sv=[-1,-1,-1,-1,-1];
                w.gfx.setColor(0,0);w.gfx.fillRect(0,0,239,195);w.gfx.flip();
              	face[0].dash=require("Storage").readJSON("dash.json",1);
				face[0].run=true;face[0].set=0;face[0].show();
                return;
			}
		} else { 
			if	( x<=120 &&  y<=100 ) this.s=1;	//slot1
			else if( 120<=x && y<=100 ) this.s=2;	//slot2 
			else if( x<=120 && 100<=y ) this.s=3;   //slot3 
			else if( 120<=x && 100<=y ) this.s=4;	//slot4
            setter.write("dash","slot",this.s);
			set.def.dash.slot=this.s;
			if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
				dash.live=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
			else dash.live=require("Storage").readJSON("eucSlot.json",1);
			if (face[0].dash["slot"+this.s+"Mac"]){
				face[0].clear();
				UI.ele.title("top",face[0].dash["slot"+this.s+"Mac"],15,4);
				UI.btn.c2l("main",[1,0,0],"_2x1",1,"WATCH ALERTS",0,15,4); 	
				UI.btn.c2l("main",[1,0,0],"_2x1",2,"DELETE WHEEL",0,15,7); 	
				face[0].set=1;
			}else {
				dash.live=require("Storage").readJSON("eucSlot.json",1);
				face.go("dashScan",0);
                return;
            }
		}
		break;
  }
};


