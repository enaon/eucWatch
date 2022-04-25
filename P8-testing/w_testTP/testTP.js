//test TP
face[0] = { /
  offms: 300000, 
  g:w.gfx, 
  init: function(o){ 
	if (set.TP) { clearWatch(set.TP); set.TP=0;);
   	this.g.clear();
    this.g.setColor(1,14);
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
      this.g.setColor(1,14);
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
	set.testTP=0;
	face.go("main",0);//go to main Clock face. 
 	return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
//touch
touchHandler[0]=function(e,x,y){ 
  
  
  
  
  }
};


