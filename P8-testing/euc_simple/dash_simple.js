//euc
//faces-main face
face[0] = {
  offms: 10000, //15 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,135,65); //temp
    this.g.fillRect(139,0,239,65); //batt      
//    this.g.fillRect(0,158,239,193); //mileage
    this.g.setColor(0,col("black"));
    this.g.setFont("7x11Numeric7Seg",5);
    this.g.drawString(euc.temp, 3,3); //temp
    this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+3),3); //fixed bat
    this.g.setFontVector(20); //mileage
//    this.g.drawString("TRIP",1,167); 
//    this.g.drawString("TOT",90,167); 
//    this.g.drawString("LEFT",171,167); 
    this.g.flip();
/*
    //mileage
    this.g.fillRect(0,194,239,239);
    this.g.setColor(1,col("gray"));
    if (euc.conn=="READY") this.g.setColor(1,col("lblue"));
    this.g.setFont("7x11Numeric7Seg",3);
    this.g.drawString(euc.trpN,0,205); 
    this.g.drawString(euc.trpT,(240-(this.g.stringWidth(euc.trpT)))/2,205); 
    this.g.drawString(euc.trpR,240-(this.g.stringWidth(euc.trpR)+1),205); 
    this.g.flip();
*/	
    this.spd[0]=-1;
    this.spd[1]=-1;
    this.amp=-1;
    this.temp=-1;
    this.batt=-1;
    this.trpN=-1;
    this.conn="OFF";
    this.lock=2;
    this.run=true;
  },
  show : function(o){
  if (!this.run) return;
//connected  
  if (euc.conn=="READY") {
	//speed 1
    if (euc.spd[0]!=this.spd[0]){
      this.spd[0]=euc.spd[0];
		this.g.setColor(0,euc.spdC);
        this.g.fillRect(0,54,135,154);
        this.g.flip();
        this.g.setColor(1,(euc.spdC!=col("yellow")&&euc.spdC!=col("white"))?col("white"):col("black"));
        this.spd[0]=euc.spd[0];
        this.g.flip();
        if (euc.spd[0]==0) {   
	      this.g.setFontVector(18);
          this.g.drawString("AV.SPEED",12,60);
	      this.g.setFont("7x11Numeric7Seg",5);
	      this.g.drawString(euc.aver,(139-(this.g.stringWidth(euc.aver)))/2,90); 
          this.g.flip();
        }else{
          this.g.setFontVector(84);
          this.g.drawString(euc.spd[0],(150-(this.g.stringWidth(euc.spd[0])))/2,65); 
          this.spd[0]=euc.spd[0];
          this.g.flip();
        }
    }
	//Amp
    if ((euc.amp|0)!=this.amp) {
        this.amp=(euc.amp|0);
		this.g.setColor(0,euc.ampC);
        this.g.fillRect(139,54,239,154); 
        this.g.flip();
        this.g.setColor(1,(euc.ampC!=col("yellow")&&euc.ampC!=col("white"))?col("white"):col("black"));
        if (((euc.amp|0)==0 && euc.spd[0]==0) ||  euc.lock==1) {  
	      this.g.setFontVector(18);
	      this.g.drawString("RunTIME",140,60);
	      this.g.setFont("7x11Numeric7Seg",5);
  	      this.g.drawString(euc.time,192-(this.g.stringWidth(euc.time)/2),90); 
          this.g.flip();
        }else{
          this.g.setFont("7x11Numeric7Seg",6);
          this.g.drawString(euc.amp|0,(142+(100-this.g.stringWidth(euc.amp|0))/2),73); 
          this.g.flip();
        }    
    }
	//Temp
    if (euc.temp!=this.temp) {
      this.temp=euc.temp;
	  this.g.setColor(1,euc.tmpC);
      this.g.fillRect(0,0,135,50);       
      this.g.setColor(0,col("black"));
      this.g.setFont("7x11Numeric7Seg",4);
      this.g.drawString(euc.temp, 10,3); //temp
      this.g.flip();
    }
	//Battery
    if (euc.batt!=this.batt) {
   	  this.batt=euc.batt;
	  this.g.setColor(1,euc.batC);
      this.g.fillRect(139,0,239,50);
      this.g.setColor(0,col("black"));
      this.g.setFont("7x11Numeric7Seg",4);
      this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+10),3); //fixed bat
      this.g.flip();
    }
	//Mileage
	if (euc.trpN!=this.trpN) {
	  euc.tmp.trpN=euc.trpN;
	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,194,239,239);
      this.g.setColor(1,col("lblue"));
	  this.g.setFont("7x11Numeric7Seg",3);
   	  this.g.drawString(euc.trpN,0,205); 
	  this.g.drawString(euc.trpT,(240-(this.g.stringWidth(euc.trpT)))/2,205); 
	  this.g.drawString(euc.trpR,240-(this.g.stringWidth(euc.trpR)+1),205); 
	  this.g.flip();
    }     
//diconnected  
  } else if (euc.conn=="OFF")  {
    if (euc.lock!=this.lock){
    this.lock=euc.lock;
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,74,135,154);
    this.g.setColor(0,col("black"));
//    this.g.setFontVector(18);
//    this.g.drawString("AV.SPEED",12,60);
    this.g.setFont("7x11Numeric7Seg",5);
    this.g.drawString(euc.aver,(139-(this.g.stringWidth(euc.aver)))/2,90); 
    this.g.flip();
    if (euc.lock==1) this.g.setColor(1,col("yellow"));
    else  this.g.setColor(1,col("gray"));
    this.g.fillRect(139,74,239,154); 
    this.g.setColor(0,col("black")); 
//	this.g.setFontVector(18);
//	this.g.drawString("RunTIME",140,60);
	this.g.setFont("7x11Numeric7Seg",5);
  	this.g.drawString(euc.time,192-(this.g.stringWidth(euc.time)/2),90); 
    this.g.flip();
	if (euc.conn=="OFF" && euc.lock==1){
    this.clear(); //if (set.def.cli) console.log("faceEUCexited");
    }
    }
//rest
  } else  {
    if (euc.conn!=this.conn) {
    this.conn=euc.conn;
    this.g.setColor(1,col("gray"));
	this.g.fillRect(0,54,135,154);
	this.g.setColor(0,col("black"));
	this.g.setFontVector(18);
    this.g.drawString("AV.SPEED",12,60);
	this.g.setFont("7x11Numeric7Seg",5);
	this.g.drawString(euc.aver,(139-(this.g.stringWidth(euc.aver)))/2,90); 
    this.g.flip();
    this.g.fillRect(139,54,239,154); 
    this.g.setColor(1,col("white"));     
    this.g.setFont("Vector",27);
    this.g.drawString(euc.conn,(142+(100-this.g.stringWidth(euc.conn))/2),85);
    this.g.flip();
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,135,50);
    this.g.fillRect(139,0,239,50);
    this.g.setColor(0,col("black"));
    this.g.setFont("7x11Numeric7Seg",4);
    this.g.drawString(euc.temp, 10,3); //temp
    this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+10),3);
    this.g.flip();
	if (euc.conn=="WAIT"){this.spd[0]=-1;this.spd[1]=-1;this.amp=-1;this.temp=-1;this.batt=-1;this.trpN=-1;this.conn="OFF";this.lock=2;this.run=true;}
    }
  }
//refresh 
  this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(){
	if (face.appPrev!="euc" || face.appCurr!="euc" || face.pageCurr!=0) this.g.clear();
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
//loop face
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
    if (euc.conn=="OFF") face.go("main",0); else {face.pageCurr=0;face.go("euc",-1)};
    return true;
  },
  clear: function(){
  return true;
  },
  off: function(){
  return true;
  },
};	
//touch-main
touchHandler[0]=function(e,x,y){
    if (e==5){ 
	  digitalPulse(D16,1,40);
    }else if  (e==1){
	  if (euc.conn!="OFF") {face.go("euc",-1);return;}
	  else {face.go("main",0);return; }
    }else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
     }else if (y>190) {
	  if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
	  face.go("main",0);
    }else if  (e==4){		
	  face.go("main",0);
//	  face.go(face.appRoot[0],(face.appRoot[1])>2?face.appRoot[1]:0,face.appRoot[2]);return;
    }else if  (e==12){
//euc on/off
	  if  (y<158) {
  	    euc.tgl();
//		face.go("euc",0);return;
//euc settings
	  }else if(euc.conn!=="WAIT"){
        digitalPulse(D16,1,140);
 	    euc.tmp.count=23;
		face.go("euc",5);return;
      }else digitalPulse(D16,1,80);
    }
    this.timeout();
};