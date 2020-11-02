//Hello face
//code is based on a structure fanoush had on dsd6 scripts. 

face[0] = { //the first face of the hello app, called by using `face.go("hello",0)` from the cli.
  offms: 90000, //face timeout, will fall to face[1] after it, face[1] is a redirection face, not actually visible.
  g:w.gfx, //set graphics as this.g variable
  buf:null,
  genA:null,
  genB:null,
  generation:0,
  gentime:0,
  currentY:1,
  myflip: function() {
    this.g.drawImage({width:160,height:160,bpp:1,buffer:this.buf.buffer},40,40);
    this.g.flip();
    this.buf.clear();
  },
  initDraw: function(gen) {
    for (let y = 1; y<17; ++y) {
      for (let x = 1; x<17; ++x) {
        var r = Math.random()<0.5?1:0;
        gen[x+y*18] = r;
        if (r==1) {
          var Xr=10*(x-1);
          var Yr=10*(y-1);
          this.buf.fillRect(Xr,Yr, Xr+7,Yr+7);
        }
      }
    }
    this.myflip();
  },
  next: function(){
    "ram";
    this.start = getTime();
    var cur=this.genA, fut=this.genB, y=this.currentY;
    var count=(p)=>{return cur[p-19]+cur[p-18]+cur[p-17]+cur[p-1]+cur[p+1]+cur[p+17]+cur[p+18]+cur[p+19];};
    for (let x = 1; x<17; ++x){
      var ind = x+y*18;
      var nc = count(ind);
      var r = (cur[ind]==1 && nc==2 || nc==3)?1:0;
      fut[ind]=r;
      if (r==1){
        var Xr=10*(x-1);
        var Yr=10*(y-1);
        this.buf.fillRect(Xr,Yr, Xr+7,Yr+7);
      }
    }
    this.gentime+=(getTime()-this.start);
    if (y==16) {
      this.myflip();
      var tmp = this.genA; this.genA=this.genB; this.genB=tmp;
      this.generation++;
      this.howlong();
      this.currentY=1;
    } else this.currentY++;
  },
  startdraw: function(init) {
    this.run=true;
  },
  regen: function(){
    this.initDraw(this.genA);
    this.currentY=1;
    this.generation = 0;
    this.gentime=0;
  },
  howlong: function(){
	this.g.setFont("6x8",2);
	this.gentime = Math.floor(this.gentime);
	this.g.drawString('Gen:'+this.generation+'  '+this.gentime+'ms  ',20,220,true);
	this.gentime=0;
  },
  init: function(o) { //put here the elements of the page that will not need refreshing and initializations.
    this.buf=Graphics.createArrayBuffer(160,160,1,{msb:true});
    this.genA=new Uint8Array(324);
    this.genB=new Uint8Array(324);
    this.btn=0;
    this.last_btn=1;
//  this.regen();
//  this.run=true;
    this.g.setColor(0,col("black"));
	this.g.clearRect(0,240,0,240);
    this.g.setColor(1,col("white"));
    this.g.setFont('Vector',40);
    this.g.drawString('LIFE',80,85);
    this.g.setFont('6x8',2);
    this.g.drawString("Conway's",75,10);
    this.g.drawString('(Touch Start)',45,180);
    this.g.flip();
  },
  show : function(o){
    if (!this.run) return;
    if (this.btn!==this.last_btn){
      this.last_btn=this.btn;
      this.regen();
    }
    this.next();
    this.tid=setTimeout(function(t){ //the face's screen refresh rate. 
      t.tid=-1;
      t.show();
    },5,this);
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
  off: function() {
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
//touch actions are set here, e is the event, x,y are the coordinates on screen.
touchHandler[0]=function(e,x,y){
  switch (e) {
    case 5: //tap event
    digitalPulse(D16,1,[30,50,30]);
    if (face[0].tid==-1) {face[0].run=true;face[0].show();} else face[0].clear();
    break;
    case 1: //slide down event 
    face.go(face.appPrev, face.pagePrev);
    return; //return when changing faces. 
    case 2: //slide up event
    digitalPulse(D16,1,40);
    break;
    case 3: //slide left event
    digitalPulse(D16,1,40);    
    break;
    case 4: //slide right event (back action)
    face.go(face.appPrev,face.pagePrev);
    return;
    case 12: //touch and hold(long press) event
    face[0].btn=1-face[0].btn;
    digitalPulse(D16,1,[30,50,30]);
    break;
    default: //reset face timeout. 
    this.timeout();
  }
};


