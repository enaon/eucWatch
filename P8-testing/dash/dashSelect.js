//Dash Select
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
	this.slot1_mac=require("Storage").readJSON("dash.json",1).slot1_mac;
	this.slot2_mac=require("Storage").readJSON("dash.json",1).slot2_mac;
	this.slot3_mac=require("Storage").readJSON("dash.json",1).slot3_mac;
	this.slot4_mac=require("Storage").readJSON("dash.json",1).slot4_mac;
	this.slot1_maker=require("Storage").readJSON("dash.json",1).slot1_maker;
	this.slot2_maker=require("Storage").readJSON("dash.json",1).slot2_maker;
	this.slot3_maker=require("Storage").readJSON("dash.json",1).slot3_maker;
	this.slot4_maker=require("Storage").readJSON("dash.json",1).slot4_maker;
	this.slot=require("Storage").readJSON("dash.json",1).slot;
    this.g.setColor(1,col("dgray"));
	this.g.setFont("Vector",22);	
    this.g.fillRect(0,0,118,95);
    this.g.fillRect(122,0,239,95);	
    this.g.fillRect(0,100,118,195);
    this.g.fillRect(122,100,239,195);
    this.g.setColor(0,col("black"));
	this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),40);
	this.g.drawString("EMPTY",185-(this.g.stringWidth("EMPTY")/2),40);
  	this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),140);     
  	this.g.drawString("EMPTY",185-(this.g.stringWidth("EMPTY")/2),140); 
    this.g.flip();
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",20);
	this.g.drawString("SELECT WHEEL",120-(this.g.stringWidth("SELECT WHEEL")/2),214); 
    this.g.flip();
	this.s1=0;this.s2=0;this.s3=0;this.s4=0;
	//this.sv1=0;this.sv2=0;this.sv3=0;this.sv4=0;
    this['s'+this.slot]=1;
	this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (this.s1!=this.sv1){
		this.sv1=this.s1;
		if (this.slot1_mac) {
			this.g.setColor(0,(this.s1)?col("dblue"):col("dgray"));
			this.g.fillRect(0,0,118,95);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString(this.slot1_maker.toUpperCase(),60-(this.g.stringWidth(this.slot1_maker.toUpperCase())/2),10); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot1_mac.substring(0,17),60-(this.g.stringWidth(this.slot1_mac.substring(0,17))/2),78); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",60-(this.g.stringWidth("-")/2),40); 
			this.g.flip();
		}else if (this.s1) {
			this.g.setColor(0,col("dgray"));
			this.g.fillRect(0,0,118,95);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",60-(this.g.stringWidth("HOLD")/2),20);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SET",60-(this.g.stringWidth("TO SET")/2),60);
			this.g.flip();
            if (this.s1tid)  clearTimeout(this.s1tid);
            this.s1tid=setTimeout(function(t){
              t.s1=0;
              t.s1tid=0;
              t.g.setFont("Vector",22);	
              t.g.setColor(0,col("dgray"));
			  t.g.fillRect(0,0,118,95);
              t.g.setColor(1,col("black"));
	          t.g.drawString("EMPTY",60-(t.g.stringWidth("EMPTY")/2),40);
              t.g.flip();
             },1000,this);
        }
    }
    //slot 2    
    if (this.s2!=this.sv2){
		this.sv2=this.s2;
		if (this.slot2_mac) {
			this.g.setColor(0,(this.s2)?col("dblue"):col("dgray"));
            this.g.fillRect(122,0,239,95);	
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString(this.slot2_maker.toUpperCase(),185-(this.g.stringWidth(this.slot2_maker.toUpperCase())/2),10); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot2_mac.substring(0,17),185-(this.g.stringWidth(this.slot2_mac.substring(0,17))/2),78); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",185-(this.g.stringWidth("-")/2),40); 
			this.g.flip();
		}else if (this.s2) {
			this.g.setColor(0,col("dgray"));
            this.g.fillRect(122,0,239,95);	
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",185-(this.g.stringWidth("HOLD")/2),20);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SET",185-(this.g.stringWidth("TO SET")/2),60);
			this.g.flip();
            if (this.s2tid)  clearTimeout(this.s2tid);
            this.s2tid=setTimeout(function(t){
              t.s2=0;
              t.s2tid=0;
              t.g.setFont("Vector",22);	
              t.g.setColor(0,col("dgray"));
              t.g.fillRect(122,0,239,95);
              t.g.setColor(1,col("black"));
	          t.g.drawString("EMPTY",185-(t.g.stringWidth("EMPTY")/2),40);
              t.g.flip();
            },1000,this);
        }
    }
      //slot 3
    if (this.s3!=this.sv3){
		this.sv3=this.s3;	
	    if (this.slot3_mac) {
			this.g.setColor(0,(this.s3)?col("dblue"):col("dgray"));
            this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString(this.slot3_maker.toUpperCase(),60-(this.g.stringWidth(this.slot3_maker.toUpperCase())/2),110); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot3_mac.substring(0,17),60-(this.g.stringWidth(this.slot3_mac.substring(0,17))/2),178); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",60-(this.g.stringWidth("-")/2),140); 
			this.g.flip();
        }else if (this.s3) {
			this.g.setColor(0,col("dgray"));
            this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",60-(this.g.stringWidth("HOLD")/2),120);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SET",60-(this.g.stringWidth("TO SET")/2),160);
			this.g.flip();
            if (this.s3tid)  clearTimeout(this.s3tid);
            this.s3tid=setTimeout(function(t){
              t.s3=0;
              t.s3tid=0;
              t.g.setFont("Vector",22);	
              t.g.setColor(0,col("dgray"));
              t.g.fillRect(0,100,118,195);
              t.g.setColor(1,col("black"));
	          t.g.drawString("EMPTY",60-(t.g.stringWidth("EMPTY")/2),140);
              t.g.flip();
            },1000,this);
        }
    }
      //slot 4
    if (this.s4!=this.sv4){
		this.sv4=this.s4;
		if (this.slot4_mac) {
			this.g.setColor(0,(this.s4)?col("dblue"):col("dgray"));
    this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString(this.slot4_maker.toUpperCase(),185-(this.g.stringWidth(this.slot4_maker.toUpperCase())/2),110); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot4_mac.substring(0,17),185-(this.g.stringWidth(this.slot4_mac.substring(0,17))/2),178); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",185-(this.g.stringWidth("-")/2),140); 
			this.g.flip();
		}else if (this.s4) {
			this.g.setColor(0,col("dgray"));
            this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",185-(this.g.stringWidth("HOLD")/2),120);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SET",185-(this.g.stringWidth("TO SET")/2),160);
			this.g.flip();
            if (this.s4tid)  clearTimeout(this.s2tid);
            this.s4tid=setTimeout(function(t){
              t.s4=0;
              t.s4tid=0;
              t.g.setFont("Vector",22);	
              t.g.setColor(0,col("dgray"));
              t.g.fillRect(122,100,239,195);
              t.g.setColor(1,col("black"));
	          t.g.drawString("EMPTY",185-(t.g.stringWidth("EMPTY")/2),140);
              t.g.flip();
            },1000,this);
        }
	}
    this.tid=setTimeout(function(t){ 
      t.tid=-1;
      t.show(o);
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(){  
    if (this.s1tid)  clearTimeout(this.s1tid);
    if (this.s2tid)  clearTimeout(this.s2tid);
    if (this.s3tid)  clearTimeout(this.s3tid);
    if (this.s4tid)  clearTimeout(this.s4tid);
    pal[0]=col("black"); 
    this.g.clear(); 
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid); 
    this.tid=-1;
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
  return true;
  },
  show : function(){
   	face.go(face.appRoot[0],face.appRoot[1]);
    return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		this.timeout();
		digitalPulse(D16,1,[30,50,30]);
		if(0<x&&x<120&&0<y&&y<100) this.s=1;          //slot1
		else if(120<x&&x<239&&0<y&&y<100) this.s=2;   //slot2 
		else if(0<x&&x<120&&100<y&&y<200) this.s=3;   //slot3 
		else if(120<x&&x<239&&100<y&&y<200) this.s=4; //slot4
		if (face[0]["slot"+this.s+"_mac"]){
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			if (Boolean(require("Storage").read('euc_slot'+this.s,+'.json')))
				euc.dash=require("Storage").readJSON('euc_slot'+this.s,+'.json',1);
			else euc.resetDash(this.s);
			face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
		}
		face[0]["s"+this.s]=1
		this.timeout();
		break;
	case 1: //slide down event
		face.go("main",0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
	    digitalPulse(D16,1,[100]);
		if(0<=x&&x<=120&&0<=y&&y<=100)	this.s=1;			//slot1
		else if(120<=x&&x<=239&&0<=y&&y<=100) this.s=2;		//slot2
		else if (0<=x&&x<=120&&100<=y&&y<=200) this.s=3;	//slot3
		else if(120<=x&&x<=239&&100<=y&&y<=200) this.s=4;	//slot4
		//
		if (face[0]["slot"+this.s+"_mac"]){
			(s=>{s&&(delete s["slot"+this.s+"_mac"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			(s=>{s&&(delete s["slot"+this.s+"_maker"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			face[0]["slot"+this.s+"_mac"]=undefined;face[0]["slot"+this.s+"_maker"]=undefined;face[0]["sv"+this.s]=undefined;face[0]["s"+this.s]=1;
		}else {
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			face.go("dashScan",0);return;
		}
		this.timeout();
		break;
  }
};


