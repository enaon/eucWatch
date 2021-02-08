//Dash Select
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 

    this.g.setColor(0,col("black"));
    this.g.setColor(1,col("dgray"));
	this.g.setFont("Vector",22);	
    this.g.fillRect(0,0,118,95);
    this.g.fillRect(122,0,239,95);	
    this.g.fillRect(0,100,118,195);
    this.g.fillRect(122,100,239,195);
    this.g.flip();	
    this.g.setColor(0,col("black"));
    this.g.fillRect(0,200,239,239); 
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",20);
	this.g.drawString("SELECT WHEEL",120-(this.g.stringWidth("SELECT WHEEL")/2),220); 
    this.g.flip();	
    this.g.setColor(0,col("dblue"));
    this.g.fillRect(0,0,118,95);
    
	this.g.setColor(1,col("white"));
	this.img=require("heatshrink").decompress(atob("nE4gIMJugFEgf3AwkP+/AAwcf+/gAwnz+AGEAokHv/gmAGCh0/8EyAwnwiAGDv/wJQYGB+fBFAf/+HPwAGD/HvAwn849AAwMcv//84GCkgGB+YiClwGB+IbCngGB8IGJnM/AwIbCAw0zAwJ9DAwcgAwRGBAwcyAwPAsAGBkQNCuAGBsQGGh4UBAwVjAw2P/+IAweH/9cvAGCg/+tgGD4/8tgUCsOH+1uHwUhwfO9xMCkMDz1uAwdFn1/0AGBkGB/0/0IGBmGAeYlwR4QACiFA4EAWoUIowDBAwcn8GPC4cH8MbAwUEgfhm4NDgPzv4rE+fvBgcAn/eBgeDgF8AwdAwH4DYl/+AFDhEPLYkCgJcFEIgAF"));
    this.g.drawImage(this.img,5,35);
	this.g.drawString("KINGSONG",7,5); 
  	this.g.drawString("S18",70,50); 

    this.g.flip();		
    this.g.setColor(0,col("dgray"));
	this.g.setColor(1,col("white"));	this.img=require("heatshrink").decompress(atob("pFIgIQNn/gA4sH///CAwIBCQkBA4IIFh//5//4AIDj4OBgQiEv/xB4giD/gIEgYIB/uAIow0Fj//wEf7AIE+Eggf+K4nBDIN9BAf/DYP8nwtCgP+NQUPHof5GoXHCIUH/d/BAOjLYUP/gIChJICj/4BAUF+gICyAICwX6BAMvkAICwf5BAN+oAICwOcBA2Azg/BQQIIDpgRB/qhBBAVOoAIGgxqB3Z1BBAUmkEBIIIIDg4IBvQIEicggXyBAraB+AIEiMQgZuBGoYIEFggIHhoIHhKyBBCEBGoWBBAMBEYJHBAAYIIiIKBMQIADicQgVyBAkSBALICAAcQgF5egIHCkQjBnr0B//4gEkTAN9wEf//8gFEBAM8wE///+gFIDoP+oAIDwDOB/4IC/8BgAIBvsgBAjyBn2QDQUCkIjBn+IHwUEJYUfkkB//ghEOBAMP0SQB4EQjgIC44rB/3xnAIBg/nVQXxMgIIB+4IC/6eCgf8BAwzBjAsBn/gRQX/50+8H/4AIDBoPDZ4IICv57BMgKtDn/fJAQIDh/4//PUQIACg//EQLlEH4IABHoYtCBALbFZwYAFv4ZFAB4="));
    this.g.drawImage(this.img,146,15);
    this.g.flip();		
    this.img=0;	
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


