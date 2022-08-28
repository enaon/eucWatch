//Hello face
//code is based on a structure fanoush had on dsd6 scripts. 

face[0] = { //the first face of the hello app, called by using `face.go("hello",0)` from the cli.
  offms: 90000, //face timeout, will fall to face[1] after it, face[1] is a redirection face, not actually visible.
  g:w.gfx, //set graphics as this.g variable
  buf:Graphics.createArrayBuffer(160,160,1,{msb:true}),
  genA:null,
  genB:null,
  gentime:0,
  currentY:1,
  intervalRef:null,
  myflip: function() {
    this.g.drawImage({width:160,height:160,bpp:1,buffer:this.buf.buffer},40,40);
   	//this.g.drawString((this.gentime|0)+'ms  ',200,220,true);
   	//this.gentime=0;
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
  howlong: function(){
    this.generation++;
	this.g.setFont("6x8",2);
	//this.gentime = Math.floor(this.gentime);
	this.g.drawString('Gen:'+this.generation+'  '+(this.gentime|0)+'ms  ',20,220,true);
	this.gentime=0;
  },
  next: function(){
    "ram";
    this.start = Date.now();
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
    this.gentime+=(Date.now()-this.start);
    if (y==16) {
      this.howlong();
      this.myflip();
      var tmp = this.genA; this.genA=this.genB; this.genB=tmp;
      this.currentY=1;
    } else this.currentY++;
  },
  stopdraw: function() {
    if(this.intervalRef) {clearInterval(this.intervalRef);this.intervalRef=0;}
  },
  startdraw: function(init) {
    if (init===undefined) init=false;
    //if(!init) this.g.clear();
    if(!init) this.intervalRef = setInterval(function(t){t.next();},65,this);
  },
  regen: function(){
	this.stopdraw();
    this.initDraw(this.genA);
    this.currentY=1;
    this.generation = 0;
    this.gentime=0;
    this.intervalRef = setInterval(function(t){t.next();},65,this);
  },
  init: function(o) { //put here the elements of the page that will not need refreshing and initializations.
    this.buf=Graphics.createArrayBuffer(160,160,1,{msb:true});
    this.genA=new Uint8Array(324);
    this.genB=new Uint8Array(324);
    this.btn=0;
    this.last_btn=1;
    this.g.setColor(0,0);
	this.g.clearRect(0,240,0,240);
    this.g.setColor(1,15);
    this.g.setFont('Vector',40);
    this.g.drawString('LIFE',80,85);
    this.g.setFont('6x8',2);
    this.g.drawString("Conway's",75,10);
    this.g.drawString('(Touch Start)',45,180);
    this.g.flip();
    //this.startdraw(true);
  },
  show : function(o){
    return true;
  },
  tid:-1,
  run:false,
  clear : function(){ //enter here everything needed to clear all app running function on face exit. 
    this.g.clear(); //as above
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid); //clears main face[0] timeout loop.
	this.stopdraw();
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
    buzzer.nav([30,50,30]);
    if (face[0].intervalRef) face[0].stopdraw(); else face[0].regen();
    break;
    case 1: //slide down event 
    //face.go(face.appPrev, face.pagePrev);
	face.go("clock",0);
    return; //return when changing faces. 
    case 2: //slide up event
    buzzer.nav(40);
    break;
    case 3: //slide left event
    buzzer.nav(40);    
    break;
    case 4: //slide right event (back action)
    face.go(face.appPrev,face.pagePrev);
    return;
    case 12: //touch and hold(long press) event
    face[0].btn=1-face[0].btn;
    buzzer.nav([30,50,30]);
    break;
    default: //reset face timeout. 
    this.timeout();
  }
};


