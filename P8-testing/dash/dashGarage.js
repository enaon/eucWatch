E.setFlags({pretokenise:1});
//Dash Garage
face[0] = { 
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
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
					let name=this.dash["slot"+slotNumber+"Name"];	
					this.g.setColor(0,active?name.includes("Proxy")?12:4:1);
					this.g.fillRect(rx1,ry1,rx2,ry2);	
					this.g.setColor(1,15);
					
					this.g.setFont("Vector",16);	
					if (name.startsWith("GotWay")) {
						if ( (name).includes("Proxy")) name="GW-Proxy";
						else name="GW-"+name.substr(name.length -5,name.length);
					}else if (name.startsWith("LK")) {
						if ( (name).includes("Proxy")) name="LK-Proxy";
						else name="LK-"+name.substr(name.length -4,name.length);
					}else if (name.startsWith("KS")) {
						if ( (name).includes("Proxy")) name="KS-Proxy";
						else name="KS-"+name.substr(name.length -4,name.length);
					}else if (name.startsWith("N")) {
						if ( (name).includes("Proxy")) name="NB-Proxy";
						else name="NB-"+name.substr(name.length -5,name.length);
					}else if (name.startsWith("V")) {
						if ( (name).includes("Proxy")) name="IM-Proxy";
						else name="IM-"+name.substr(name.length -5,name.length);
					}
					this.g.drawString(name,x-(this.g.stringWidth(name)/2),y); 
					
					if (this.dash["slot"+slotNumber+"Model"]) { 
						if (this.dash["slot"+slotNumber+"Model"].length<=5) {
							this.g.setFont("Vector",28);
							this.g.drawString(this.dash["slot"+slotNumber+"Model"].toUpperCase().substr(0,9),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Model"].toUpperCase().substr(0,9))/2),y1+5); 
						}else if (this.dash["slot"+slotNumber+"Model"].split(" ")[1]){
							this.g.setFont("Vector",20);
							this.g.drawString(this.dash["slot"+slotNumber+"Model"].split(" ")[0].toUpperCase(),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Model"].split(" ")[0].toUpperCase())/2),y1-7);
							this.g.drawString(this.dash["slot"+slotNumber+"Model"].split(" ")[1].toUpperCase(),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Model"].split(" ")[1].toUpperCase())/2),y1+22);
						}else{ 
							this.g.setFont("Vector",22);
							this.g.drawString(this.dash["slot"+slotNumber+"Model"].toUpperCase().substr(0,9),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Model"].toUpperCase().substr(0,9))/2),y1+10); 
						}
					}else {
						this.g.setFont("Vector",20);
						this.g.drawString(this.dash["slot"+slotNumber+"Maker"].substr(0,8).toUpperCase(),x-(this.g.stringWidth(this.dash["slot"+slotNumber+"Maker"].substr(0,8).toUpperCase())/2),y1+10); 
					}
					this.g.flip();
			}else if (active) {
				this.g.setColor(0,12);
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
				if (t.set){
					t.g.setColor(0,0);
					t.g.fillRect(118,198,122,239);
					t.g.flip();
					t.g.setFontVector(20);
					t.g.setColor(0,1);
					t.g.fillRect(0,198,118,239); 
					t.g.setColor(1,15);
					t.g.drawString("SET",40,215);
					t.g.flip();
					t.g.setColor(0,2);
					t.g.fillRect(122,198,239,239); 
					t.g.setColor(1,15);
					t.g.drawString("DEL",165,215);
					t.g.flip();
				}else{
					t.g.setColor(0,0);
					t.g.fillRect(0,198,239,239);
					t.g.setColor(1,15);
					t.g.setFont("Vector",22);
					t.g.drawString("GARAGE",120-(t.g.stringWidth("GARAGE")/2),217); 
					t.g.flip();
				}
			},1000,this);
	},
	opt: function(no){
			if (this.dash["slot"+no+"Mac"]){
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,195); 
				this.g.setColor(1,15);
				this.g.setFontVector(18);
				this.g.drawString(euc.dash.info.get.firm,45,20);
				this.g.drawString(euc.dash.info.get.serl,45,60); 
				this.g.drawString(euc.dash.info.get.manD,45,100); 
				this.g.drawString(euc.dash.info.get.mac.split(" ")[0],45,140); 
				this.g.flip();	
				this.g.setColor(1,3);
				this.g.setFontVector(14);
				this.g.drawString("FIRM",0,22);
				this.g.drawString("SERL",0,62);
				this.g.drawString("DATE",0,102);
				this.g.drawString("ID",0,142);
				this.g.flip();
				this.g.setColor(0,0);
				this.g.fillRect(118,198,122,239);
				this.g.flip();
				this.g.setFontVector(20);
				this.g.setColor(0,1);
				this.g.fillRect(0,198,118,239); 
				this.g.setColor(1,15);
				this.g.drawString("SET",40,215);
				this.g.flip();
				this.g.setColor(0,2);
				this.g.fillRect(122,198,239,239); 
				this.g.setColor(1,15);
				this.g.drawString("DEL",165,215);
				this.g.flip();
				this.set=1;
			}else {
				ew.do.fileWrite("dash","slot",no);
				ew.def.dash.slot=no;
				euc.dash=require("Storage").readJSON("eucSlot.json",1);
				face.go("dashScan",0);
                return;
            }
	},	
	tid:-1,
	run:false,
	clear : function(){  
		if (this.s1tid)  clearTimeout(this.s1tid);this.s1tid=0;
		if (this.s2tid)  clearTimeout(this.s2tid);this.s2tid=0;
		if (this.s3tid)  clearTimeout(this.s3tid);this.s3tid=0;
		if (this.s4tid)  clearTimeout(this.s4tid);this.s4tid=0;
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
		(euc.state=="OFF")?face.go("dashOff",0):face.go(ew.is.dash[ew.def.dash.face],0);
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
	this.timeout();
	switch (e) {
	case 5: //tap event
		buzzer.nav([30,50,30]);
		if	( !face[0].set )	{
			if	( x<=120 &&  y<=100 ) this.s=1;	//slot1
			else if( 120<=x && y<=100 ) this.s=2;	//slot2 
			else if( x<=120 && 100<=y ) this.s=3;   //slot3 
			else if( 120<=x && 100<=y ) this.s=4;	//slot4
			
			if (face[0]["sv"+this.s]==1) {
				face[0].clear();
				face[0].opt(this.s);
			}else{
				if (face[0].dash["slot"+this.s+"Mac"]){
					ew.def.dash.slot=this.s;
					ew.do.fileWrite("dash","slot",this.s);
					if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
						euc.dash=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
					else euc.dash=require("Storage").readJSON("eucSlot.json",1);
					face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
					face[0].ntfy("SELECTED","",20,4,1);
				} else 
					face[0].ntfy("tap to SCAN","",20,1,1);
					face[0]["s"+this.s]=1;
				}
			}
		else   {
			if ( 200<=y &&face[0].ntid){
				face[0].ntfy("DELETED","",22,13,1);
				ew.do.fileWrite("dash", "slot"+ew.do.fileRead("dash","slot")+"Mac"  );
                ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Maker");
                ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Name");
				require("Storage").erase('logDaySlot'+ew.do.fileRead("dash","slot")+'.json');
				require("Storage").erase('logWeekSlot'+ew.do.fileRead("dash","slot")+'.json');
				require("Storage").erase('logYearSlot'+ew.do.fileRead("dash","slot")+'.json');
				ew.def.dash.slot=0;
				require("Storage").erase('eucSlot'+ew.do.fileRead("dash","slot")+'.json');
				euc.dash=require("Storage").readJSON("eucSlot.json",1);				
			    face[0].sv1=-1;face[0].sv2=-1;face[0].sv3=-1;face[0].sv4=-1;
                w.gfx.setColor(0,0);w.gfx.fillRect(0,0,239,195);w.gfx.flip();
              	face[0].dash=require("Storage").readJSON("dash.json",1);
				face[0].run=true;face[0].set=0;face[0].show();
                return;
			}else if ( x<=120&&200<=y ) {
				w.gfx.setColor(0,0);
				w.gfx.drawLine (0,98,239,98);
				w.gfx.drawLine (0,99,239,99);
				w.gfx.flip();
				w.gfx.drawLine (120,0,120,195);
				w.gfx.drawLine (121,0,121,195);
				w.gfx.flip();
				face.go("dashAlerts",0);return;	
			}else if (120<x && 200<=y ){
				face[0].ntfy("tap to DELETE","",22,13,1);
			}
		}
		break;
	case 1: //slide down event
		//face.go("clock",0);
		face.go("clock",0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		break;
	case 3: //slide left event
		buzzer.nav(40);    
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].sv1=-1;face[0].sv2=-1;face[0].sv3=-1;face[0].sv4=-1;
			//face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
            //face[0]["s"+require("Storage").readJSON("dash.json",1).slot]=1;
			//w.gfx.setColor(0,0);w.gfx.fillRect(0,0,239,195);w.gfx.flip();
			//face[0].dash=require("Storage").readJSON("dash.json",1);
			face[0].run=true;face[0].set=0;face[0].init();	face[0].show();	
		}else
			(euc.state=="OFF")?face.go("dashOff",0):face.go(ew.is.dash[ew.def.dash.face],0);
	return;
  }
};


