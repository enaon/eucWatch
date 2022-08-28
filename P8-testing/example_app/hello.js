//Hello face
//code is based on a structure fanoush had on dsd6 scripts. 
face[0] = { //the first face of the hello app, called by using `face.go("hello",0)` from the cli.
  offms: 10000, //face timeout, will fall to face[1] after it, face[1] is a redirection face, not actually visible.
  g:w.gfx, //set graphics as this.g variable
  init: function(o){ //put here the elements of the page that will not need refreshing and initializations.
   	this.g.clear();
    this.msg=(global.hello)?hello:"Hello"; //check if global.hello var exists and get val or set to "hello". 
    //the way g.setColor is used on this project is not the espruino default. You can see changes on it at the init file. The screen driver is set at two colors mode to save on ram, and a flip is used when more colors are needed. The first argument is the color space, 0 or 1, the second argument is the actual color in 12-bit Color code. https://rangevoting.org/ColorCode.html#
    this.g.setColor(1,11);
    this.g.fillRect(30,10,210,100);
    this.g.drawRect(30,130,115,200);
    this.g.drawRect(125,130,210,200);
    this.g.setColor(0,0);
    this.g.setFont("Vector",50);
    this.g.drawString(this.msg,120-(this.g.stringWidth(this.msg)/2),35);
    this.g.flip();
    this.g.setColor(1,15);
    this.g.setFont("Vector",22);
    this.g.drawString("Hello\nWorld",45,140);
    this.g.drawString("ALRM",137,154);
    this.g.flip();
    this.btn=0;
    this.last_btn=this.btn;
	this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (this.btn!==this.last_btn){
      this.last_btn=this.btn;
      this.msg=(this.btn)?"Hello":"World";
      hello=this.msg;
      this.g.setColor(0,1);
      this.g.fillRect(30,10,210,100);
      this.g.setColor(1,11);
      this.g.setFont("Vector",50);
      this.g.drawString(this.msg,120-(this.g.stringWidth(this.msg)/2),35);    
      this.g.flip();
    }
    this.tid=setTimeout(function(t){ //the face's screen refresh rate. 
      t.tid=-1;
      t.show(o);
    },50,this);
  },
  tid:-1,
  run:false,
  clear : function(){ //enter here everything needed to clear all app running function on face exit. 
    //this.g.clear(); //as above
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
//Redirection face, is used when time expires or the side button is pressed on page[0].
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },//only use this part of the face to set redirection.
  show : function(){
   	face.go(face.appRoot[0],face.appRoot[1]); //go to the previous face on screen of the previous app.  
	//face.go(face.appPrev,face.pagePrev); //go to the previous face on screen, even if it was on the same app. 
  	//face.go("hello",-1); //sleep and set this face as the on_wake face. 
	//face.go("clock",-1);//sleep and set this face as the on_wake face. 
	//face.go("clock",0);//go to main Clock face. 
    return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
//touch actions are set here, e is the event, x,y are the coordinates on screen.
touchHandler[0]=function(e,x,y){ 
  switch (e) {
  case 5: //tap event
    if(30<x&&x<115&&130<y&&y<200) {
	  buzzer.nav([30,50,30]);//send double buzz pulse to indicate tap was acknowledged.
      face[0].btn=1-face[0].btn;
    }else if(125<x&&x<210&&130<y&&y<200) {
	  buzzer.nav([30,50,30]);
      face.go("alarm",0);return;
    }else buzzer.nav(40); //send short buzz pulse to indicate tap was not acknowledged.
    break;
  case 1: //slide down event-on directional swipes the x,y indicate the point of starting the swipe, so one can swipe up/dn on buttons like on the brightenss button at the main settings face. 
	if (face.faceSave!=-1) {
		  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
	}else
		face.go("clock",0);
	return; 
	//break;
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      buzzer.nav([30,50,30]);
    } else buzzer.nav(40);
    break;
  case 3: //slide left event
    buzzer.nav(40);    
    break;
  case 4: //slide right event (back action)
    face.go(face.appPrev,face.pagePrev,1);return;
    //break;
  case 12: //touch and hold(long press) event
    buzzer.nav(40);  
    break;
  default: //reset face timeout on every touch action, this function is in the handler file. 
    this.timeout();
  }
};


