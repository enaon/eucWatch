//euc
//faces-main face
face[0] = {
  offms: 5000, //5 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
 //   this.g.setColor(1,col("gray"));
 //   this.g.fillRect(0,0,79,55); //temp
//    this.g.fillRect(80,0,160,55); //amp 
//    this.g.fillRect(161,0,239,55); //batt  	
//    this.g.setColor(0,col("black"));
//    this.g.setFont("7x11Numeric7Seg",4.5);
//    this.g.drawString(euc.temp, 3,5); //temp
//    this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+3),5); //fixed bat
//    this.g.setFontVector(20); //mileage
//    this.g.flip();
    this.spd[0]=-1;
    this.spd[1]=-1;
    this.amp=-1;
    this.temp=-1;
    this.batt=-1;
    this.trpN=-1;
    this.conn="OFF";
    this.lock=2;
    if (euc.make=="ks") euc.aver=euc.spdT;
	this.run=true;
	
  },
  show : function(o){
  if (!this.run) return;
  if (euc.conn=="READY") {
	//speed 1
    if (euc.spd[0]!=this.spd[0]){
	  this.g.setColor(0,"black");
      this.g.fillRect(0,56,239,64);
      this.g.flip();
      this.spd[0]=euc.spd[0];
	  this.g.setColor(0,euc.spdC);
      this.g.fillRect(0,65,239,239);
      this.g.setColor(1,(euc.spdC!=col("yellow")&&euc.spdC!=col("white"))?col("white"):col("black"));
      this.spd[0]=euc.spd[0];
	  this.g.setFontVector(200);
      this.g.drawString(euc.spd[0],(132-(this.g.stringWidth(euc.spd[0])/2)),65); 
      this.spd[0]=euc.spd[0];
      this.g.flip();
    }
	//Temp
    if (euc.temp!=this.temp) {
      this.temp=euc.temp;
	  this.g.setColor(1,euc.tmpC);
      this.g.fillRect(0,0,79,55);       
      this.g.setColor(0,(euc.tmpC!=col("yellow")&&euc.tmpC!=col("lblue"))?col("white"):0);
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.temp, 3,5); //temp      
	  this.g.flip();
    }
	//Amp
    if ((euc.amp|0)!=this.amp) {
        this.amp=(euc.amp|0);
		this.g.setColor(1,euc.ampC);
		this.g.fillRect(80,0,160,55); //amp 
        this.g.setColor(0,(euc.ampC!=col("yellow")&&euc.ampC!=col("white"))?col("white"):0);
        this.g.setFont("7x11Numeric7Seg",4.5);
        this.g.drawString(euc.amp|0,(122-(this.g.stringWidth(euc.amp|0)/2)),5); 
        this.g.flip();
    }
	//Battery
    if (euc.batt!=this.batt) {
   	  this.batt=euc.batt;
	  this.g.setColor(1,euc.batC);
      this.g.fillRect(161,0,239,55);
      this.g.setColor(0,(euc.batC!=col("yellow")&&euc.batC!=col("lgreen"))?col("white"):0);
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+3),5); //fixed bat
      this.g.flip();
    }
	
/*	//Mileage
	if (euc.trpN!=this.trpN) {
	  euc.tmp.trpN=euc.trpN;
	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,194,239,239);
      this.g.setColor(1,col("lblue"));
	  this.g.setFont("7x11Numeric7Seg",3);
   	  this.g.drawString(euc.trpN,0,205); 
	  this.g.drawString(euc.trpT,240-(this.g.stringWidth(euc.trpT)+1),205); 
//	  this.g.drawString(euc.trpT,(240-(this.g.stringWidth(euc.trpT)))/2,205); 
//	  this.g.drawString(euc.trpR,240-(this.g.stringWidth(euc.trpR)+1),205); 
	  this.g.flip();
    }     
*/
//off  
  } else if (euc.conn=="OFF")  {
    if (euc.lock!=this.lock){
    this.lock=euc.lock;
    this.g.setColor(0,col("black"));
    this.g.fillRect(0,0,239,55); //top
    this.g.setColor(1,col("white"));
    this.g.drawImage(require("heatshrink").decompress(atob("kUgwIOLn/AAYX4AYMeg4DBAQPggEDwEYBAPAgwDBmEBwEAhkAsAQBgAQKh0AkP///AjADBGIM/AgMAh/9BgMD/0f+EA/8H/hJCCAX4v4QCn4QCx4QC8YQDEIX/CAf/CAQyDH4UBAYJoBBgIUBA==")),106,10);	 
	this.g.setFont("7x11Numeric7Seg",4.5);
    this.g.drawString(euc.temp,3,5); //temp
    this.g.drawString(euc.batt,240-(this.g.stringWidth(euc.batt)+3),5);
	this.g.flip();
    this.g.setColor(0,col("black"));
	this.g.fillRect(65,56,199,239); //middle	
    this.g.setColor(1,col("white"));
    this.g.setFontVector(28);
    this.g.drawString(euc.spdT,190-this.g.stringWidth(euc.spdT),90);
    this.g.drawString(euc.time|0,190-this.g.stringWidth(euc.time|0),133); 
    this.g.drawString(euc.trpL|0,190-this.g.stringWidth(euc.trpL|0),175); 
    this.g.drawString(euc.trpT|0,190-this.g.stringWidth(euc.trpT|0),217); 
	this.g.flip();	
    this.g.setColor(0,col("black"));
	this.g.fillRect(0,56,74,239); //left	
    this.g.setColor(1,col("lgray"));
    this.g.setFontVector(24);
    this.g.drawString("TOP",5,93);
    this.g.drawString("RUN",5,136);
    this.g.drawString("TRP",5,178);
    this.g.drawString("TOT",5,220);
	this.g.flip();
    this.g.setColor(0,col("black"));
	this.g.fillRect(200,56,239,239); //right	
    this.g.setColor(1,col("lgray"));
    this.g.drawString("kph",205,93);
    this.g.drawString("Min",205,136);
    this.g.drawString("Km",205,178);
    this.g.drawString("Km",205,220);
	this.g.flip();
	if (euc.conn=="OFF" && euc.lock==1){
      this.g.setColor(0,col("red"));
	  this.g.fillRect(80,0,160,55); //amp   
      this.g.setColor(1,col("white"));
      this.g.drawImage(require("heatshrink").decompress(atob("j0gwIIFnwCBgf/AYMf/wDB8E8gEHgFwgEcgHAgFggcAgOAhkAg0AmEAjAOJDoM4gF///4F4P/8EPAYPAn/jHAP/g/8gf8j/wh/wv4OFx4OB/0/BwP4Do3/BwIDBBwIDBwE//5hBAYPwOQYA=")),106,10);	 
	  this.g.flip();
	  this.clear(); //if (set.def.cli) console.log("faceEUCexited");
      }else{
      this.g.setColor(0,col("dgray"));
      this.g.fillRect(80,0,160,55); //amp   
      this.g.setColor(1,col("white"));
      this.g.drawImage(require("heatshrink").decompress(atob("kUgwIOLn/AAYX4AYMeg4DBAQPggEDwEYBAPAgwDBmEBwEAhkAsAQBgAQKh0AkP///AjADBGIM/AgMAh/9BgMD/0f+EA/8H/hJCCAX4v4QCn4QCx4QC8YQDEIX/CAf/CAQyDH4UBAYJoBBgIUBA==")),106,10);	 
	  this.g.flip();
	  }
    }
//rest
  } else  {
    if (euc.conn!=this.conn) {
      this.conn=euc.conn;
      this.g.setFontVector(36);

//  	  this.g.setColor(0,col("black"));
	  this.g.setColor(0,col("black"));
      this.g.fillRect(0,0,79,55); //temp
      this.g.fillRect(161,0,239,55); //temp
	  
      this.g.setColor(1,col("lblue"));
 	  this.g.drawImage(require("heatshrink").decompress(atob("kEgwIIFgfAAYMEkADGiADNgwPaguQAasJAYUT5ADBi/oAYMn+gDBl4DCk/kB4oXDhg7Cg/gPQgA=")),25,10);
      this.g.drawImage(require("heatshrink").decompress(atob("kEgwIIFg/gAYv//4DBwEBAaVBAYXBAYuBBYWDAYWCAYWEqIDCmIDBxERAYOekIXCAYQfDwQnCwRbCwY7CAYeCKaRrDAAQA==")),215,10);	 
      this.g.flip();
      this.g.setColor(0,col("purple"));
      this.g.fillRect(80,0,160,55); //temp
	  this.g.setColor(1,col("lblue"));
      this.g.drawImage(require("heatshrink").decompress(atob("lUgwIFCjwKDv/4AgV+j+AAgN4gHwAgM4gEOAgMcgEB4AHDBgMDAgMHBgOAhkAB4NgBAMYgEwDAMGgANB7AGBDIM2BoWAhHABoNgg0wgcD/EB/kA//+gHhwE/4OAmFgCgUIhAiBhkCAYIpCAANwIAQ+CAIMAHwIBBKwYPBMYRgBgHgMAQeCPYQMCh8AngEBgP/JIIABj4EDMIICBA")),101,12);	 
      this.g.flip();
      //this.g.fillRect(0,43,239,175);
  	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,56,239,239);
      this.g.setColor(1,col("white"));
      this.g.setFont("Vector",60);
      this.g.drawString(euc.conn,(125-this.g.stringWidth(euc.conn)/2),115);
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
    if (euc.conn=="OFF") face.go("main",0); else {face.pageCurr=0;face.go("euc",-1);}
    return true;
  },
  clear: function(){
  return true;
  },
  off: function(){
  return true;
  },
};	
//settings face
face[5] = {
  offms: 5000,
  g:w.gfx,
  init: function(){
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,115,75); //left up
    this.g.fillRect(0,80,115,155); //left mid
    this.g.fillRect(0,160,115,239); //left dn
    this.g.fillRect(120,0,239,239); //right-riding mode      
    this.g.setColor(0,col("black"));
    this.g.setFont("Vector",24);
	this.g.drawString("RING",58-(this.g.stringWidth("RING")/2),9); 
	this.g.drawString("LIGHT",58-(this.g.stringWidth("LIGHT")/2),41); 
	this.g.drawString("TRIP",58-(this.g.stringWidth("TRIP")/2),170); 
	this.g.drawString("RESET",58-(this.g.stringWidth("RESET")/2),202); 
	//rdmd
 	this.g.drawString("IS",180-(this.g.stringWidth("IS")/2),105);
    this.g.setFont("Vector",35);
    this.g.drawString("EUC",180-(this.g.stringWidth("EUC")/2),60); 
	this.g.drawString("OFF",180-(this.g.stringWidth("OFF")/2),140);
	this.g.flip();
    this.rdmd=-1;
    this.alck=-1;
	this.run=true;
  },
  show : function(){
    if (!this.run) return; 
//autolock
    if (euc.alck != this.alck) {
	  this.alck=euc.alck;
      if (this.alck==1) this.g.setColor(1,col("blue"));
      else this.g.setColor(1,col("gray"));
      this.g.fillRect(0,80,115,155); //left mid
      this.g.setColor(0,col("black"));
 	  this.g.setFont("Vector",24);
      this.g.drawString("AUTO",58-(this.g.stringWidth("AUTO")/2),90);
      this.g.drawString("LOCK",58-(this.g.stringWidth("LOCK")/2),122);
      this.g.flip();
    }
//ride mode    
    if (euc.conn=="READY") {  
	if (euc.rdmd != this.rdmd) {
	  this.rdmd=euc.rdmd;	
      this.g.setColor(1,col("lblue"));
      this.g.fillRect(120,0,239,239); //right-riding mode     
      this.g.setColor(0,col("black"));
      this.g.setFont("Vector",88);
      this.g.drawString(euc.rdmd,180-(this.g.stringWidth(euc.rdmd)/2),73);  
      this.g.setFont("Vector",35);
      if (9>euc.rdmd) {
      this.g.drawString(euc.rdmd+1,180-(this.g.stringWidth(euc.rdmd+1)/2),32);  
      }
      if (euc.rdmd>0) {
      this.g.drawString(euc.rdmd-1,180-(this.g.stringWidth(euc.rdmd-1)/2),166); 
      }
      this.g.setFont("Vector",20);
      if (8>euc.rdmd) {
      this.g.drawString(euc.rdmd+2,180-(this.g.stringWidth(euc.rdmd+2)/2),7); 
      }
      if (euc.rdmd>1) {
      this.g.drawString(euc.rdmd-2,180-(this.g.stringWidth(euc.rdmd-2)/2),208); 
      }
      this.g.flip();
    }
    }
//loop
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show();
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(){
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
//settings
touchHandler[5]=function(e,x,y){    
    if (e==5){ 
	  digitalPulse(D16,1,40);
    }else if  (e==1){
      if  (x>=120) {
        euc.rdmd++;
        if (euc.rdmd >9) {euc.rdmd=9; digitalPulse(D16,1,40);}
      }else digitalPulse(D16,1,40);
    }else if  (e==2){
      if  (x>=120) {
        euc.rdmd--;
        if (euc.rdmd <0) {euc.rdmd=0; digitalPulse(D16,1,40);}
      }else digitalPulse(D16,1,40);
    }else if  (e==3){
      digitalPulse(D16,1,40);
    }else if  (e==4){
	  face.go("euc",0);return;
    }else if  (e==12){
	  if (x<120&&y<80){
	 	digitalPulse(D16,1,[30,50,30]);
		face.go('w_scan',0,'ffe0');
		return;
      //ride mode
	  }else if  (x>120) { 
        euc.tmp.count=euc.rdmd+24;
      //reset mileage
      }else if (x<115 && y>145) {
        digitalPulse(D16,1,300);  
        euc.trpL="0.0";
	  //toggle EUC auto lock
	  }else if (x<115 && (80<y&&y<145)) {
        //if (set.def.cli) console.log("toggle alock");
        digitalPulse(D16,1,300);  
        euc.alck=1-euc.alck;
      }else digitalPulse(D16,1,40);
    }
    this.timeout();
};
