//Dash Select
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
    //this.msg=(global.hello)?hello:"Hello";
    this.g.setColor(0,col("black"));
//    this.g.fillRect(0,0,239,35); 
//    this.g.setColor(1,col("lblue"));
//    this.g.setFont("Vector",18);
//	this.g.drawString("SELECT WHEEL",120-(this.g.stringWidth("SELECT WHEEL")/2),6); 
	this.g.flip();	
	this.g.setFont("Vector",22);	
    this.g.setColor(0,col("dgray"));
    this.g.fillRect(0,0,239,60);
    this.g.fillRect(0,64,239,124); 
    this.g.fillRect(0,128,239,188); 
	this.g.setColor(1,col("white"));
	this.g.drawString("NO WHEEL SAVED",120-(this.g.stringWidth("NO WHEEL SAVED")/2),55); 
	this.g.drawString("NO WHEEL SAVED",120-(this.g.stringWidth("NO WHEEL SAVED")/2),115); 
	this.g.drawString("NO WHEEL SAVED",120-(this.g.stringWidth("NO WHEEL SAVED")/2),175); 

 
    this.g.flip();			
    this.g.setColor(0,col("red"));
    this.g.fillRect(0,192,239,239); 
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",23);
	this.g.drawString("SCAN NEW WHEEL",120-(this.g.stringWidth("SCAN NEW WHEEL")/2),206); 
    this.g.flip();		
	this.run=true;
  },
  show : function(o){
    if (!this.run) return;
   
   
   
    this.tid=setTimeout(function(t){ //the face's screen refresh rate. 
      t.tid=-1;
      t.show(o);
    },50,this);
  },
  tid:-1,
  run:false,
  clear : function(){ //enter here everything needed to clear all app running function on face exit. 
    pal[0]=col("black"); //this is for cleaner face transitions but adds delay, maybe will change in the future
    this.g.clear(); //as above
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid); //clears main face[0] timeout loop.
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
    if(30<x&&x<115&&130<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);//send double buzz pulse to indicate tap was acknowledged.
      face[0].btn=1-face[0].btn;
    }else if(125<x&&x<210&&130<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
      face.go("alarm",0);return;
    }else digitalPulse(D16,1,40); //send short buzz pulse to indicate tap was not acknowledged.
    break;
  case 1: //slide down event-on directional swipes the x,y indicate the point of starting the swipe, so one can swipe up/dn on buttons like on the brightenss button at the main settings face. 
    //face.go(face.appPrev,face.pagePrev);return; //return when changing faces, so that this action will not reset this face timeout. 
	face.go("main",0);
	return;	 
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      digitalPulse(D16,1,[30,50,30]);
    }else if (y>190) {
	  if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
    } else digitalPulse(D16,1,40);
    break;
  case 3: //slide left event
    digitalPulse(D16,1,40);    
    break;
  case 4: //slide right event (back action)
    face.go(set.dash[set.def.dash],0);
	return;
  case 12: //touch and hold(long press) event
    digitalPulse(D16,1,40);  
    break;
  default: 
    this.timeout();
  }
};


