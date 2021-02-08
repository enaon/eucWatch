//Dash Select
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
	this.slot1_mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot1_mac;
	this.slot3_mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot2_mac;
	this.slot4_mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot3_mac;
	this.slot5_mac=(require("Storage").readJSON("setting.json",1)||{}).dash_slot4_mac;
	this.slot1_maker=(require("Storage").readJSON("setting.json",1)||{}).dash_slot1_maker;
	this.slot3_maker=(require("Storage").readJSON("setting.json",1)||{}).dash_slot2_maker;
	this.slot4_maker=(require("Storage").readJSON("setting.json",1)||{}).dash_slot3_maker;
	this.slot5_maker=(require("Storage").readJSON("setting.json",1)||{}).dash_slot4_maker;
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
	this.g.drawString("SELECT WHEEL",120-(this.g.stringWidth("SELECT WHEEL")/2),215); 
    this.g.flip();
	this.s1=0;this.s2=0;this.s3=0;this.s4=0;
	this.sv1=0;this.sv2=0;this.sv3=0;this.sv4=0;
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
			this.g.setFont("Vector",21);	
			this.g.drawString(this.slot1_maker.toUpperCase(),60-(this.g.stringWidth(this.slot1_maker.toUpperCase())/2),10); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot1_mac.substring(0,17),60-(this.g.stringWidth(this.slot1_mac.substring(0,17))/2),78); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",60-(this.g.stringWidth("-")/2),40); 
			this.g.flip();
		}else {
			this.g.setColor(0,col("dgray"));
			this.g.fillRect(0,0,118,95);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",60-(this.g.stringWidth("HOLD")/2),20);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SCAN",60-(this.g.stringWidth("TO SCAN")/2),60);
			this.g.flip();
        }
    }
    //slot 2    
    if (this.s2!=this.sv2){
		this.sv2=this.s2;
		if (this.slot2_mac) {
			this.g.setColor(0,(this.s2)?col("dblue"):col("dgray"));
            this.g.fillRect(122,0,239,95);	
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",21);	
			this.g.drawString(this.slot2_maker.toUpperCase(),180-(this.g.stringWidth(this.slot2_maker.toUpperCase())/2),10); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot2_mac.substring(0,17),180-(this.g.stringWidth(this.slot2_mac.substring(0,17))/2),78); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",180-(this.g.stringWidth("-")/2),40); 
			this.g.flip();
		}else {
			this.g.setColor(0,col("dgray"));
            this.g.fillRect(122,0,239,95);	
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",180-(this.g.stringWidth("HOLD")/2),20);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SCAN",180-(this.g.stringWidth("TO SCAN")/2),60);
			this.g.flip();
        }
    }
      //slot 3
    if (this.s3!=this.sv3){
		this.sv3=this.s3;	
	    if (this.slot3_mac) {
			this.g.setColor(0,(this.s3)?col("dblue"):col("dgray"));
    this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",21);	
			this.g.drawString(this.slot3_maker.toUpperCase(),60-(this.g.stringWidth(this.slot3_maker.toUpperCase())/2),110); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot3_mac.substring(0,17),60-(this.g.stringWidth(this.slot3_mac.substring(0,17))/2),178); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",60-(this.g.stringWidth("-")/2),140); 
			this.g.flip();
		}else {
			this.g.setColor(0,col("dgray"));
    this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",60-(this.g.stringWidth("HOLD")/2),120);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SCAN",60-(this.g.stringWidth("TO SCAN")/2),160);
			this.g.flip();
        }
    }
      //slot 4
    if (this.s4!=this.sv4){
		this.sv4=this.s4;
		if (this.slot4_mac) {
			this.g.setColor(0,(this.s4)?col("dblue"):col("dgray"));
    this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",21);	
			this.g.drawString(this.slot4_maker.toUpperCase(),180-(this.g.stringWidth(this.slot4_maker.toUpperCase())/2),110); 
			this.g.setFont("Vector",13);	
			this.g.drawString(this.slot4_mac.substring(0,17),180-(this.g.stringWidth(this.slot4_mac.substring(0,17))/2),178); 
			this.g.setFont("Vector",30);	
			this.g.drawString("-",180-(this.g.stringWidth("-")/2),140); 
			this.g.flip();
		}else {
			this.g.setColor(0,col("dgray"));
    this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",22);	
			this.g.drawString("HOLD",180-(this.g.stringWidth("HOLD")/2),120);
			this.g.setFont("Vector",18);	
			this.g.drawString("TO SCAN",180-(this.g.stringWidth("TO SCAN")/2),160);
			this.g.flip();
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
	//slot1
    if(0<x&&x<120&&0<y&&y<100) {
	  digitalPulse(D16,1,[30,50,30]);
	  set.def.dashSlot=1;
	  face[0].s1=1;face[0].s2=0;face[0].s3=0;face[0].s4=0;
	//slot2 
    }else if(120<x&&x<239&&0<y&&y<100) {
	  digitalPulse(D16,1,[30,50,30]);
  	  set.def.dashSlot=2;
	  face[0].s1=0;face[0].s2=1;face[0].s3=0;face[0].s4=0;
   	//slot3 
    }else if(0<x&&x<120&&100<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
	  set.def.dashSlot=3;
	  face[0].s1=0;face[0].s2=0;face[0].s3=1;face[0].s4=0;
	//slot4 
    }else if(120<x&&x<239&&100<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
	  set.def.dashSlot=4;
	  face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=1;
    }else digitalPulse(D16,1,40); 
    break;
  case 1: //slide down event
	face.go("main",0);
	return;	 
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      digitalPulse(D16,1,[30,50,30]);
      this.timeout();
    }else if (y>190) {
	  if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
  } else {digitalPulse(D16,1,40);this.timeout();}
    break;
  case 3: //slide left event
    digitalPulse(D16,1,40);    
	this.timeout();
    break;
  case 4: //slide right event (back action)
    face.go(set.dash[set.def.dash],0);
	return;
  case 12: //long press event
    digitalPulse(D16,1,40);  
	this.timeout();
    break;
  }
};


