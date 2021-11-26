//Dash Garage
face[0] = { 
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx, 
	init: function(o){ 
		this.dash=require("Storage").readJSON("dash.json",1);
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",22);
		this.g.drawString("GARAGE",120-(this.g.stringWidth("GARAGE")/2),217); 
		this.g.flip();
		this.s1=0;this.s2=0;this.s3=0;this.s4=0;
		this['s'+this.dash.slot]=1;
		this.set=0;
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (this.s1!=this.sv1){
			this.sv1=this.s1;
			this.btn(1,this.s1,60,10,50,40,0,0,119,97);
		}
		if (this.s2!=this.sv2){
			this.sv2=this.s2;
			this.btn(2,this.s2,185,10,50,40,122,0,239,97);
		}
		if (this.s3!=this.sv3){
			this.sv3=this.s3;	
			this.btn(3,this.s3,60,110,150,140,0,100,119,195);
		}
		if (this.s4!=this.sv4){
			this.sv4=this.s4;
			this.btn(4,this.s4,185,110,150,140,122,100,239,195);
		}
		this.tid=setTimeout(function(t){ 
			t.tid=-1;
			t.show(o);
		},100,this);
	},
	btn: function(slotNumber,active,x,y,y1,y2,rx1,ry1,rx2,ry2 ){
			if (this.dash["slot"+slotNumber+"Mac"]) {
				this.g.setColor(0,(active)?4:1);
				this.g.fillRect(rx1,ry1,rx2,ry2);	
				this.g.setColor(1,15);
				this.g.setFont("Vector",18);	
				this.g.drawString(this.dash["slot"+slotNumber+"Maker"].toUpperCase(),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Maker"].toUpperCase())/2),y); 
				if ( (this.dash["slot"+slotNumber+"Name"]).includes("Proxy")) { this.g.setFont("Vector",30);this.dash["slot"+slotNumber+"Name"]="Proxy";}
				else this.g.setFont("Vector",35);
				this.g.drawString(this.dash["slot"+slotNumber+"Name"].split("-")[0],x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Name"].split("-")[0])/2),y1); 
				this.g.flip();
			}else if (active) {
				this.g.setColor(0,7);
				this.g.fillRect(rx1,ry1,rx2,ry2);	
				this.g.setColor(1,15);
				this.g.setFont("Vector",22);	
				this.g.drawString("EMPTY",x-(this.g.stringWidth("EMPTY")/2),y2);
				this.g.flip();
				if (this["s"+slotNumber+"tid"])  clearTimeout(this["s"+slotNumber+"tid"]);
				this["s"+slotNumber+"tid"]=setTimeout(function(slot){
					face[0]["s"+slot]=0;
					face[0]["s"+slot+"tid"]=0;
					w.gfx.setFont("Vector",22);	
					w.gfx.setColor(0,0);
					w.gfx.fillRect(rx1,ry1,rx2,ry2);
					w.gfx.flip();
				},1000,slotNumber);
			}
	},
	ntfy: function(txt1,txt0,size,clr,bt){
			this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
			this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
				t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",22);
				t.g.drawString("GARAGE",120-(t.g.stringWidth("GARAGE")/2),217); 
				t.g.flip();
			},1000,this);
	},
	tid:-1,
	run:false,
	clear : function(){  
		if (this.s1tid)  clearTimeout(this.s1tid);
		if (this.s2tid)  clearTimeout(this.s2tid);
		if (this.s3tid)  clearTimeout(this.s3tid);
		if (this.s4tid)  clearTimeout(this.s4tid);
		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		if (this.tid>=0) clearTimeout(this.tid);     this.tid=-1;
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
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		buzzer([30,50,30]);
		if	( !face[0].set )	{
			if	( x<=120 &&  y<=100 ) this.s=1;	//slot1
			else if( 120<=x && y<=100 ) this.s=2;	//slot2 
			else if( x<=120 && 100<=y ) this.s=3;   //slot3 
			else if( 120<=x && 100<=y ) this.s=4;	//slot4
			if (face[0].dash["slot"+this.s+"Mac"]){
                set.write("dash","slot",this.s);
				set.def.dash.slot=this.s;
				if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
					euc.dash=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
				else euc.dash=require("Storage").readJSON("eucSlot.json",1);
				face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
				face[0].ntfy("HOLD -> OPTIONS","",20,4,1);
			} else face[0].ntfy("HOLD -> SCAN & SET","",20,1,1);
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
      }else face[0].ntfy("HOLD -> DELETE","",22,7,1);
		}
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go("main",0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer(40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].sv1=-1;face[0].sv2=-1;face[0].sv3=-1;face[0].sv4=-1;
			face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
            face[0]["s"+require("Storage").readJSON("dash.json",1).slot]=1;
			w.gfx.setColor(0,0);w.gfx.fillRect(0,0,239,195);w.gfx.flip();
			face[0].dash=require("Storage").readJSON("dash.json",1);
			face[0].run=true;face[0].set=0;face[0].show();		
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
                set.write("dash", "slot"+set.read("dash","slot")+"Mac"  );
                set.write("dash","slot"+set.read("dash","slot")+"Maker");
                set.write("dash","slot"+set.read("dash","slot")+"Name");
				require("Storage").erase('logDaySlot'+set.read("dash","slot")+'.json');
				require("Storage").erase('logWeekSlot'+set.read("dash","slot")+'.json');
				require("Storage").erase('logYearSlot'+set.read("dash","slot")+'.json');
				set.def.dash.slot=0;
				require("Storage").erase('eucSlot'+set.read("dash","slot")+'.json');
				euc.dash=require("Storage").readJSON("eucSlot.json",1);				
			    face[0].sv1=-1;face[0].sv2=-1;face[0].sv3=-1;face[0].sv4=-1;
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
            set.write("dash","slot",this.s);
			set.def.dash.slot=this.s;
			if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
				euc.dash=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
			else euc.dash=require("Storage").readJSON("eucSlot.json",1);
			if (face[0].dash["slot"+this.s+"Mac"]){
				face[0].clear();
				var g=w.gfx;
				g.setFont("Vector",25);	
				g.setColor(0,1);
				g.fillRect(0,0,239,97);
              	g.setColor(1,15);
				g.drawString("WATCH ALERTS",120-(g.stringWidth("WATCH ALERTS")/2),35);
				g.flip();
				g.setColor(0,7);
				g.fillRect(0,100,239,195);
                g.setColor(1,15);
				g.drawString("DELETE WHEEL",120-(g.stringWidth("DELETE WHEEL")/2),135);
				g.flip();
				face[0].set=1;
			}else {
				euc.dash=require("Storage").readJSON("eucSlot.json",1);
				face.go("dashScan",0);
                return;
            }
			this.timeout();
		}
		this.timeout();
		break;
  }
};


