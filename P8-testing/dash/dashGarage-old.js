//Dash Garage
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        //if (!face.appPrev.startsWith("dash")) this.g.clear();
		this.dash=require("Storage").readJSON("dash.json",1);
        this.g.setColor(0,0);
		this.g.fillRect(0,0,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",22);
		this.g.drawString("GARAGE",120-(this.g.stringWidth("GARAGE")/2),217); 
		this.g.flip(); 
		var i;
		for (i = 1; i < 5; i++) {
			if (this.dash["slot"+i+"Mac"]){
				if      (i==1) this.btn((this.dash.slot==1)?1:0,this.dash.slot1Maker.toUpperCase(),20,60,20,col("red"),col("dgray"),0,0,119,97,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,60,70);
				else if (i==2) this.btn((this.dash.slot==2)?1:0,this.dash.slot2Maker.toUpperCase(),20,185,20,col("red"),col("dgray"),122,0,239,97,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,185,70);
				else if (i==3) this.btn((this.dash.slot==3)?1:0,this.dash.slot3Maker.toUpperCase(),20,60,120,col("red"),col("dgray"),0,100,119,195,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,60,170);
				else if (i==4) this.btn((this.dash.slot==4)?1:0,this.dash.slot4Maker.toUpperCase(),20,185,120,col("red"),col("dgray"),122,100,239,195,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,185,170);
			}
		}
        this.run=false;
	},
	show : function(){
		return; 
	},
    upd: function(i){
      this.dash=require("Storage").readJSON("dash.json",1);
      //print(this.dash);
			if (this.dash["slot"+i+"Mac"]){
				if      (i==1) this.btn((this.dash.slot==1)?1:0,this.dash.slot1Maker.toUpperCase(),20,60,20,col("red"),col("dgray"),0,0,119,97,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,60,70);
				else if (i==2) this.btn((this.dash.slot==2)?1:0,this.dash.slot2Maker.toUpperCase(),20,185,20,col("red"),col("dgray"),122,0,239,97,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,185,70);
				else if (i==3) this.btn((this.dash.slot==3)?1:0,this.dash.slot3Maker.toUpperCase(),20,60,120,col("red"),col("dgray"),0,100,119,195,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,60,170);
				else if (i==4) this.btn((this.dash.slot==4)?1:0,this.dash.slot4Maker.toUpperCase(),20,185,120,col("red"),col("dgray"),122,100,239,195,(euc.dash.slot1Model)?euc.dash.slot1Model.toUpperCase():"",14,185,170);
			}else{
                this.g.setFont("Vector",24);
				if (i==1) { this.g.setColor(0,col("dgray"));this.g.fillRect(0,0,119,97);this.g.setColor(1,0);this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),50);}
				else if (i==2) { this.g.setColor(0,col("dgray"));this.g.fillRect(122,0,239,97);this.g.setColor(1,0);this.g.drawString("EMPTY",185-(this.g.stringWidth("EMPTY")/2),50);}
				else if (i==3) { this.g.setColor(0,col("dgray"));this.g.fillRect(0,100,119,195);this.g.setColor(1,0);this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),150);}
				else if (i==4) { this.g.setColor(0,col("dgray"));this.g.fillRect(122,100,239,195);this.g.setColor(1,0);this.g.drawString("EMPTY",6185-(this.g.stringWidth("EMPTY")/2),150);}
				this.g.flip();
			}	

    },  
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size1);	
			this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
   			if (txt2){this.g.setFont("Vector",size2);	
            this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
			this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",22);
		        t.g.drawString("GARAGE",120-(t.g.stringWidth("GARAGE")/2),217); 
				t.g.flip();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
//loop face
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
	face.go(set.dash[set.def.dash],0);
    return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
//
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		digitalPulse(D16,1,[30,50,30]);
		if	( !face[0].set )	{
			if	( x<120 &&  y<100 ) this.s=1;	//slot1
			else if( 120<x && y<100 ) this.s=2;	//slot2 
			else if( x<120 && 100<y ) this.s=3;   //slot3 
			else if( 120<x && 100<y ) this.s=4;	//slot4
			if (face[0].dash["slot"+this.s+"Mac"]){
                //require('Storage').write('dashslot.json',this.s);
                this.o=require("Storage").readJSON("dash.json",1).slot;
				(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
				if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
					euc.dash=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
				else euc.dash=require("Storage").readJSON("eucSlot.json",1);
				face[0].upd(this.o);
                face[0].upd(this.s);
				face[0].ntfy("HOLD -> OPTIONS","",20,col("gray"),1);
			} else face[0].ntfy("HOLD -> SCAN & SET","",20,col("gray"),1);
			face[0]["s"+this.s]=1;
		}
		else   {
			if ( y<=120 ) face[0].ntfy("HOLD -> SETUP","",22,col("gray"),1);
			else face[0].ntfy("HOLD -> DELETE","",22,col("red"),1);
		}
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);    
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
			face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		if ( face[0].set ) {
			if ( y<=120 ) {face.go("dashAlerts",0);return;}
			else {
				(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
				(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
				require("Storage").erase('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json')	
              	face[0].s1=1;face[0].sv=0;face[0].s3=0;face[0].s4=0;
                w.gfx.setColor(0,0);w.gfx.fillRect(0,0,239,195);w.gfx.flip();
              	face[0].dash=require("Storage").readJSON("dash.json",1);
				face[0].run=true;face[0].set=0;face[0].show();
                return;
			}
		} else { 
			if	( x<120 &&  y<100 ) this.s=1;	//slot1
			else if( 120<x && y<100 ) this.s=2;	//slot2 
			else if( x<120 && 100<y ) this.s=3;   //slot3 
			else if( 120<x && 100<y ) this.s=4;	//slot4
			if (face[0].dash["slot"+this.s+"Mac"]){
				(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
				//face.go("dashSlot",0);return;
				face[0].clear();
				var g=w.gfx;
				g.setFont("Vector",25);	
				g.setColor(0,col("gray"));
				g.fillRect(0,0,239,97);
              	g.setColor(1,col("white"));
				g.drawString("SETUP HAPTIC",120-(g.stringWidth("SETUP HAPTIC")/2),35);
				g.flip();
				g.setColor(0,col("red"));
				g.fillRect(0,100,239,195);
                g.setColor(1,col("white"));
				g.drawString("DELETE WHEEL",120-(g.stringWidth("DELETE WHEEL")/2),135);
				g.flip();
				face[0].set=1;
			}else {
				(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
				face.go("dashScan",0);return;
			}
			this.timeout();
		}
		this.timeout();
		break;
  }
};
