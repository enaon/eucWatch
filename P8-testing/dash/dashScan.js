//Dash Select
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
    this.g.setColor(1,col("dgray"));
	this.g.setFont("Vector",22);	
    this.g.fillRect(0,0,239,95);
    this.g.fillRect(0,100,239,195);
    this.g.setColor(0,col("black"));
	this.g.flip();
    this.g.setColor(1,col("white"));
	this.g.setFont("Vector",25);
  	this.g.drawString("KINGSONG",120-(this.g.stringWidth("EMPTY")/2),40); 
  	this.g.drawString("NINEBOT",120-(this.g.stringWidth("EMPTY")/2),140);
    this.g.flip();
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",20);
	this.g.drawString("SELECT MAKER",120-(this.g.stringWidth("SELECT MAKER")/2),220); 
    this.g.flip();
  },
  show : function(o){
	return;
  },
  tid:-1,
  run:false,
  clear : function(){  
    pal[0]=col("black"); 
    this.g.clear(); 
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
  },//only use this part of the face to set redirection.
  show : function(){
   	face.go(face.appRoot[0],face.appRoot[1]); //go to the previous face on screen of the previous app.  
	//face.go(face.appPrev,face.pagePrev); //go to the previous face on screen, even if it was on the same app. 
  	//face.go("hello",-1); //sleep and set this face as the on_wake face. 
	//face.go("main",-1);//sleep and set this face as the on_wake face. 
	//face.go("main",0);//go to main Clock face. 
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
	  face[0].s1=1;face[0].s2=0;face[0].s3=0;face[0].s4=0;
	//slot2 
    }else if(120<x&&x<239&&0<y&&y<100) {
	  digitalPulse(D16,1,[30,50,30]);
	  face[0].s1=0;face[0].s2=1;face[0].s3=0;face[0].s4=0;
   	//slot3 
    }else if(0<x&&x<120&&100<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
	  face[0].s1=0;face[0].s2=0;face[0].s3=1;face[0].s4=0;
	//slot4 
    }else if(120<x&&x<239&&100<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
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


