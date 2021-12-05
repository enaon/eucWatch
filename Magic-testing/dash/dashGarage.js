//Dash Garage
face[0] = { 
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	bpp:set.def.bpp?0:1,
	g:w.gfx, 
	init: function(o){ 
		this.sv=[-1,-1,-1,-1,-1];
		this.dash=require("Storage").readJSON("dash.json",1);
		UI.ele.title("top","SELECT",14,1);
		UI.ele.fill("_ele","btmM",0);
		UI.ele.title("btmS","GARAGE",15,1);
		this.s1=0;this.s2=0;this.s3=0;this.s4=0;
		this['s'+this.dash.slot]=1;
		this.set=0;
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (this.s1!=this.sv[1]){
			this.sv[1]=this.s1;
			this.btn(1,this.s1);
		}
		if (this.s2!=this.sv[2]){
			this.sv[2]=this.s2;
			this.btn(2,this.s2);
		}
		if (this.s3!=this.sv[3]){
			this.sv[3]=this.s3;	
			this.btn(3,this.s3);
		}
		if (this.s4!=this.sv[4]){
			this.sv[4]=this.s4;
			this.btn(4,this.s4);
		}
        if (set.def.bpp) w.gfx.flip();
		this.tid=setTimeout(function(t){ 
			t.tid=-1;
			t.show(o);
		},100,this);
	},
	btn: function(slotNumber,active,x,y,y1,y2,rx1,ry1,rx2,ry2 ){
			if (this.dash["slot"+slotNumber+"Mac"]) {
				if ((this.dash["slot"+slotNumber+"Name"]).includes("Proxy")) { this.g.setFont("Vector",30);this.dash["slot"+slotNumber+"Name"]="Proxy";}
				UI.btn.c2l("_2x2",slotNumber,this.dash["slot"+slotNumber+"Maker"].toUpperCase(),this.dash["slot"+slotNumber+"Name"].split("-")[0],15,(active)?4:1); 
				if (active) UI.ele.title("top",this.dash["slot"+slotNumber+"Maker"].toUpperCase(),14,4);
			}else if (active) {
				var img=require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
				UI.btn.img("_2x2",slotNumber,img,"Empty",15,1); 	
				if (this["s"+slotNumber+"tid"])  clearTimeout(this["s"+slotNumber+"tid"]);
				this["s"+slotNumber+"tid"]=setTimeout(function(slot){
					face[0]["s"+slot]=0;
					face[0]["s"+slot+"tid"]=0;
					UI.btn.c2l("_2x2",slot,"",0,0,0); 	
				},1000,slotNumber);
			} else UI.btn.c2l("_2x2",slotNumber,"",0,0,0);

	},
	tid:-1,
	run:false,
	clear : function(){  
		TC.removeAllListeners("tc5");
		TC.removeAllListeners("tc12");
		TC.removeAllListeners("tc1");
		TC.removeAllListeners("tc2");
		TC.removeAllListeners("tc3");
		TC.removeAllListeners("tc4");
		if (this.s1tid)  clearTimeout(this.s1tid);
		if (this.s2tid)  clearTimeout(this.s2tid);
		if (this.s3tid)  clearTimeout(this.s3tid);
		if (this.s4tid)  clearTimeout(this.s4tid);
		if (this.ntid)	clearTimeout(this.ntid);this.ntid=0;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
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
		(euc.state=="OFF")?face.go("dashOff",0):face.go(set.dash[set.def.dash.face],0);
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
face[0].btn._2x2_1=()=>{;};
face[0].btn._2x2_2=()=>{;};
face[0].btn._2x2_3=()=>{;};
face[0].btn._2x2_4=()=>{;};


touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		buzzer(buz.ok);
		if	( !face[0].set )	{
			if	( x<=120 &&  y<=100 ) this.s=1;	//slot1
			else if( 120<=x && y<=100 ) this.s=2;	//slot2 
			else if( x<=120 && 100<=y ) this.s=3;   //slot3 
			else if( 120<=x && 100<=y ) this.s=4;	//slot4
			if (face[0].dash["slot"+this.s+"Mac"]){
                setter.write("dash","slot",this.s);
				set.def.dash.slot=this.s;
				if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
					dash.live=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
				else dash.live=require("Storage").readJSON("eucSlot.json",1);
				face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
				UI.ntfy.simple("btmS","HOLD -> OPTIONS",0,15,4);
				UI.on('ntfy','UI.ele.title("btmS","GARAGE",15,1);');
			} else{
				UI.ntfy.simple("btmS","HOLD -> SCAN",0,15,1);
				UI.on('ntfy','UI.ele.title("btmS","GARAGE",15,1);');
			}
			face[0]["s"+this.s]=1;
		}
		else   {
			if ( y<=120 ) {
				w.gfx.setColor(0,0);
				w.gfx.drawLine (0,98,239,98);
				w.gfx.drawLine (0,99,239,99);
				w.gfx.flip();
				w.gfx.drawLine (120,0,120,195);
				w.gfx.drawLine (121,0,121,195);
				w.gfx.flip();
				face.go("dashAlerts",0);return;			
			}else{
				UI.ntfy.simple("btmS","HOLD -> DELETE",0,15,7);
				UI.on('ntfy','UI.ele.title("btmS","GARAGE",15,1);');
			}
		}
		break;
	case 1: //slide down event
		face.go("main",0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(buz.ok);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		break;
	case 3: //slide left event
		buzzer(buz.na);    
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].init();	
			face[0].show();
			return;			
		}else
			(euc.state=="OFF")?face.go("dashOff",0):face.go(set.dash[set.def.dash.face],0);
		return;
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
				UI.btn.c2l("_2x1",1,"WATCH ALERTS",0,15,4); 	
				UI.btn.c2l("_2x1",2,"DELETE WHEEL",0,15,7); 	
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


