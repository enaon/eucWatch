//Dash Scan
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
    this.g.setColor(0,col("black"));
    this.g.setColor(1,col("dgray"));
    this.g.fillRect(0,0,239,95);
    this.g.flip();   
    this.g.setColor(1,col("dgray"));
    this.g.setColor(0,col("white"));
	this.g.setFont("Vector",26);
  	this.g.drawString("KINGSONG",120-(this.g.stringWidth("KINGSONG")/2),38); 
    this.g.flip();
    this.g.setColor(1,col("dgray"));
    this.g.fillRect(0,100,239,195);
    this.g.flip();
    this.g.setColor(1,col("dgray"));
    this.g.setColor(0,col("white"));
    this.g.drawString("NINEBOT",120-(this.g.stringWidth("NINEBOT")/2),130);
	this.g.setFont("Vector",14);
    this.g.drawString("ONE C/E/P",120-(this.g.stringWidth("ONE C/E/P")/2),165);
    this.g.flip();
    this.g.setColor(0,col("black"));
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",20);
	this.g.drawString("SCAN FOR",120-(this.g.stringWidth("SCAN FOR")/2),214);
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
  case 5: case 12: //tap event//long press event
	this.timeout();
	//kingsong
    if(0<y&&y<100) {
	  digitalPulse(D16,1,[30,50,30]);
	  (s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Kingsong")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
      euc.dash.maker="Kingsong";
	  //face.appCurr=set.dash[set.def.dash];
	  face.go('w_scan',0,'fff0');
      return;
	//ninebot
    }else if(100<y&&y<200) {
	  digitalPulse(D16,1,[30,50,30]);
	  (s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Ninebot")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
	  euc.dash.maker="Ninebot";
      //face.appCurr=set.dash[set.def.dash];
      face.go('w_scan',0,'ffe0');
    }else digitalPulse(D16,1,40); 
    break;
  case 1: //slide down event
    face.go(set.dash[set.def.dash],0);
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
    face.go("dashSelect",0);
	return;
  }
};


