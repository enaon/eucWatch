//dash digital
//faces-main face
face[0] = {
  offms: 10000, //15 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
	this.spdC={0:0,1:4095,2:4080,3:3840};
	this.ampC={0:1365,1:4095,2:4080,3:3840};
	this.tmpC={0:col("lblue"),1:4095,2:4080,3:3840};
	this.batC={0:col("lgreen"),1:4095,2:4080,3:3840}; 
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,135,50); //temp
    this.g.fillRect(139,0,239,50); //batt      
    this.g.fillRect(0,158,239,193); //mileage
    this.g.setColor(0,col("black"));
    this.g.setFont("7x11Numeric7Seg",4);
    this.g.drawString(euc.dash.tmp, 10,3); //temp
    this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+10),3); //fixed bat
    this.g.setFontVector(20); //mileage
    this.g.drawString("TRIP",1,167); 
    this.g.drawString("TOT",90,167); 
    this.g.drawString("LEFT",171,167); 
    this.g.flip();
    //mileage
    this.g.fillRect(0,194,239,239);
    this.g.setColor(1,col("gray"));
    if (euc.state=="READY") this.g.setColor(1,col("lblue"));
    this.g.setFont("7x11Numeric7Seg",3);
    this.g.drawString(euc.dash.trpL,0,205); 
    this.g.drawString(euc.dash.trpT|0,(240-(this.g.stringWidth(euc.dash.trpT|0)))/2,205); 
    this.g.drawString(euc.dash.trpR,240-(this.g.stringWidth(euc.dash.trpR)+1),205); 
    this.g.flip();
    this.spd=-1;
    this.amp=-1;
    this.temp=-1;
    this.batt=-1;
    this.trpL=-1;
    this.conn="OFF";
    this.lock=2;
    this.run=true;
  },
  show : function(o){
  if (!this.run) return;
//connected  
  if (euc.state=="READY") {
	//speed 1
    if (euc.dash.spd!=this.spd){
      this.spd=euc.dash.spd;
        if (this.spdC[euc.dash.spdC]!=col("black")) {
		  this.g.setColor(1,this.spdC[euc.dash.spdC]);
          this.g.fillRect(0,54,135,154);
          this.g.setColor(0,col("black"));
        }else { 
		  this.g.setColor(0,col("back"));
          this.g.fillRect(0,54,135,154);
          this.g.setColor(1,col("white"));
        }
        if (euc.dash.spd==0) {   
	      this.g.setFontVector(18);
          this.g.drawString("AV.SPEED",12,60);
	      this.g.setFont("7x11Numeric7Seg",5);
	      this.g.drawString(euc.dash.spdA,(139-(this.g.stringWidth(euc.dash.spdA)))/2,90); 
          this.g.flip();
        }else{
          this.g.setFontVector(84);
          this.g.drawString(euc.dash.spd|0,(150-(this.g.stringWidth(euc.dash.spd|0)))/2,65); 
          this.spd=euc.dash.spd;
          this.g.flip();
        }
    }
	//Amp
    if ((euc.dash.amp|0)!=this.amp) {
        this.amp=(euc.dash.amp|0);
        if  (this.ampC[euc.dash.ampC]!=this.ampC[0] ) {
		  this.g.setColor(1,this.ampC[euc.dash.ampC]);
          this.g.fillRect(139,54,239,154); 
          this.g.setColor(0,col("black"));
        }else { 
		  this.g.setColor(0,col("back"));
          this.g.fillRect(139,54,239,154); 
          this.g.setColor(1,col("white"));
        }
        
        if (((euc.dash.amp|0)==0 && euc.dash.spd==0) ||  euc.dash.lock==1) {  
	      this.g.setFontVector(18);
	      this.g.drawString("RunTIME",140,60);
	      this.g.setFont("7x11Numeric7Seg",5);
  	      this.g.drawString(euc.dash.time,192-(this.g.stringWidth(euc.dash.time)/2),90); 
          this.g.flip();
        }else{
          this.g.setFont("7x11Numeric7Seg",6);
          this.g.drawString(euc.dash.amp|0,(142+(100-this.g.stringWidth(euc.dash.amp|0))/2),73); 
          this.g.flip();
        }    
    }
	//Temp
    if (euc.dash.tmp!=this.temp) {
      this.temp=euc.dash.tmp;
	  this.g.setColor(1,this.tmpC[euc.dash.tmpC]);
      this.g.fillRect(0,0,135,50);       
      this.g.setColor(0,col("black"));
      this.g.setFont("7x11Numeric7Seg",4);
      this.g.drawString(euc.dash.tmp, 10,3); //temp
      this.g.flip();
    }
	//Battery
    if (euc.dash.bat!=this.batt) {
   	  this.batt=euc.dash.bat;
	  this.g.setColor(1,this.batC[euc.dash.batC]);
      this.g.fillRect(139,0,239,50);
      this.g.setColor(0,col("black"));
      this.g.setFont("7x11Numeric7Seg",4);
      this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+10),3); //fixed bat
      this.g.flip();
    }
	//Mileage
	if (euc.dash.trpL!=this.trpL) {
	  this.trpL=euc.dash.trpL;
	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,194,239,239);
      this.g.setColor(1,col("lblue"));
	  this.g.setFont("7x11Numeric7Seg",3);
   	  this.g.drawString(euc.dash.trpL,0,205); 
	  this.g.drawString(euc.dash.trpT|0,(240-(this.g.stringWidth(euc.dash.trpT|0)))/2,205); 
	  this.g.drawString(euc.dash.trpR,240-(this.g.stringWidth(euc.dash.trpR)+1),205); 
	  this.g.flip();
    }     
//off
  } else if (euc.state=="OFF")  {
    if (euc.dash.lock!=this.lock){
    this.lock=euc.dash.lock;
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,54,135,154);
    this.g.setColor(0,col("black"));
    this.g.setFontVector(18);
    this.g.drawString("AV.SPEED",12,60);
    this.g.setFont("7x11Numeric7Seg",5);
    this.g.drawString(euc.dash.spdA,(139-(this.g.stringWidth(euc.dash.spdA)))/2,90); 
    this.g.flip();
	this.g.setColor(0,(euc.dash.lock)?col("red"):col("gray"));
    this.g.fillRect(139,54,239,154); 
	this.g.setColor(1,(euc.dash.lock)?col("white"):col("black"));
	this.g.setFontVector(18);
	this.g.drawString("RunTIME",140,60);
	this.g.setFont("7x11Numeric7Seg",5);
  	this.g.drawString(euc.dash.time,192-(this.g.stringWidth(euc.dash.time)/2),90); 
    this.g.flip();
	if (euc.state=="OFF" && euc.dash.lock==1){
    this.clear(); //if (set.def.cli) console.log("faceEUCexited");
    }
    }
//rest
  } else  {
    if (euc.state!=this.conn) {
    this.conn=euc.state;
    this.g.setColor(1,col("gray"));
	this.g.fillRect(0,54,135,154);
	this.g.setColor(0,col("black"));
	this.g.setFontVector(18);
    this.g.drawString("AV.SPEED",12,60);
	this.g.setFont("7x11Numeric7Seg",5);
	this.g.drawString(euc.dash.spdA,(139-(this.g.stringWidth(euc.dash.spdA)))/2,90); 
    this.g.flip();
    this.g.fillRect(139,54,239,154); 
    this.g.setColor(1,col("white"));     
    this.g.setFont("Vector",27);
    this.g.drawString(euc.state,(142+(100-this.g.stringWidth(euc.state))/2),85);
    this.g.flip();
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,135,50);
    this.g.fillRect(139,0,239,50);
    this.g.setColor(0,col("black"));
    this.g.setFont("7x11Numeric7Seg",4);
    this.g.drawString(euc.dash.tmp, 10,3); //temp
    this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+10),3);
    this.g.flip();
	  if (euc.state=="WAIT"||euc.state=="RETRY"){this.spd=-1;this.amp=-1;this.temp=-1;this.batt=-1;this.trpL=-1;this.conn="OFF";this.lock=2;this.run=true;}
    }
  }
//refresh 
  this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
    },150,this);
  },
  tid:-1,
  run:false,
  clear : function(){
	if (face.appCurr!="dash_digital" || face.pageCurr!=0) this.g.clear();
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
    if (euc.state=="OFF") face.go("main",0); else {face.pageCurr=0;face.go(set.dash[set.def.dash],-1);}
    return true;
  },
  clear: function(){
  return true;
  },
};	

//touch-main
touchHandler[0]=function(e,x,y){
    if (e==5){ 
	  digitalPulse(D16,1,40);
    }else if  (e==1){
	  if (set.def.dash+1>=set.dash.length) set.def.dash=0; else set.def.dash++;
	  face.go(set.dash[set.def.dash],0);
	  return;
    }else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
     }else if (y>190) {
	  if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
		(euc.state=="READY")?face.go('dashSet'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):digitalPulse(D16,1,40);
	  return;
    }else if  (e==4){		
	  face.go("main",0);
	  return;
    }else if  (e==12){
//euc on/off
	  if  (y<158) {
  	    euc.tgl();
//euc settings
	  }else if(euc.state!=="WAIT"){
        digitalPulse(D16,1,140);
 	    //euc.tmp.count=23;
		face.go("dashSet",0);return;
      }else digitalPulse(D16,1,80);
    }
    this.timeout();
};