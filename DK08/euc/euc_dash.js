//euc
//faces-main face
face[0] = {
  offms: 5000, //15 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
    g.setColor(1,col("gray"));
    g.fillRect(0,0,135,50); //temp
    g.fillRect(139,0,239,50); //batt      
    g.fillRect(0,158,239,193); //mileage
    g.setColor(0,col("black"));
    g.setFont("7x11Numeric7Seg",4);
    g.drawString(euc.temp, 10,3); //temp
    g.drawString(euc.batt,240-(g.stringWidth(euc.batt)+10),3); //fixed bat
    g.setFontVector(20); //mileage
    g.drawString("TRIP",1,167); 
    g.drawString("TOT",90,167); 
    g.drawString("LEFT",171,167); 
    g.flip();
    //mileage
    g.fillRect(0,194,239,239);
    g.setColor(1,col("gray"));
    if (euc.conn=="READY") g.setColor(1,col("lblue"));
    g.setFont("7x11Numeric7Seg",3);
    g.drawString(euc.trpN,0,205); 
    g.drawString(euc.trpT,(240-(g.stringWidth(euc.trpT)))/2,205); 
    g.drawString(euc.trpR,240-(g.stringWidth(euc.trpR)+1),205); 
    g.flip();
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
        if (euc.spdC!=col("black")) {
		  g.setColor(1,euc.spdC);
          g.fillRect(0,54,135,154);
          g.setColor(0,col("black"));
        }else { 
		  g.setColor(0,col("back"));
          g.fillRect(0,54,135,154);
          g.setColor(1,col("white"));
        }
        if (euc.spd[0]==0) {   
	      g.setFontVector(18);
          g.drawString("AV.SPEED",12,60);
	      g.setFont("7x11Numeric7Seg",5);
	      g.drawString(euc.aver,(139-(g.stringWidth(euc.aver)))/2,90); 
          g.flip();
        }else{
          g.setFontVector(84);
          g.drawString(euc.spd[0],(150-(g.stringWidth(euc.spd[0])))/2,65); 
          this.spd[0]=euc.spd[0];
          g.flip();
        }
    }
	//Amp
    if ((euc.amp|0)!=this.amp) {
        this.amp=(euc.amp|0);
        if  (euc.ampC!=col("black") ) {
		  g.setColor(1,euc.ampC);
          g.fillRect(139,54,239,154); 
          g.setColor(0,col("black"));
        }else { 
		  g.setColor(0,col("back"));
          g.fillRect(139,54,239,154); 
          g.setColor(1,col("white"));
        }
        
        if (((euc.amp|0)==0 && euc.spd[0]==0) ||  euc.lock==1) {  
	      g.setFontVector(18);
	      g.drawString("RunTIME",140,60);
	      g.setFont("7x11Numeric7Seg",5);
  	      g.drawString(euc.time,192-(g.stringWidth(euc.time)/2),90); 
          g.flip();
        }else{
          g.setFont("7x11Numeric7Seg",6);
          g.drawString(euc.amp|0,(142+(100-g.stringWidth(euc.amp|0))/2),73); 
          g.flip();
        }    
    }
	//Temp
    if (euc.temp!=this.temp) {
      this.temp=euc.temp;
	  g.setColor(1,euc.tmpC);
      g.fillRect(0,0,135,50);       
      g.setColor(0,col("black"));
      g.setFont("7x11Numeric7Seg",4);
      g.drawString(euc.temp, 10,3); //temp
      g.flip();
    }
	//Battery
    if (euc.batt!=this.batt) {
   	  this.batt=euc.batt;
	  g.setColor(1,euc.batC);
      g.fillRect(139,0,239,50);
      g.setColor(0,col("black"));
      g.setFont("7x11Numeric7Seg",4);
      g.drawString(euc.batt,240-(g.stringWidth(euc.batt)+10),3); //fixed bat
      g.flip();
    }
	//Mileage
	if (euc.trpN!=this.trpN) {
	  euc.tmp.trpN=euc.trpN;
	  g.setColor(0,col("black"));
	  g.fillRect(0,194,239,239);
      g.setColor(1,col("lblue"));
	  g.setFont("7x11Numeric7Seg",3);
   	  g.drawString(euc.trpN,0,205); 
	  g.drawString(euc.trpT,(240-(g.stringWidth(euc.trpT)))/2,205); 
	  g.drawString(euc.trpR,240-(g.stringWidth(euc.trpR)+1),205); 
	  g.flip();
    }     
//diconnected  
  } else if (euc.conn=="OFF")  {
    if (euc.lock!=this.lock){
    this.lock=euc.lock;
    g.setColor(1,col("gray"));
    g.fillRect(0,54,135,154);
    g.setColor(0,col("black"));
    g.setFontVector(18);
    g.drawString("AV.SPEED",12,60);
    g.setFont("7x11Numeric7Seg",5);
    g.drawString(euc.aver,(139-(g.stringWidth(euc.aver)))/2,90); 
    g.flip();
    if (euc.lock==1) g.setColor(1,col("yellow"));
    else  g.setColor(1,col("gray"));
    g.fillRect(139,54,239,154); 
    g.setColor(0,col("black")); 
	g.setFontVector(18);
	g.drawString("RunTIME",140,60);
	g.setFont("7x11Numeric7Seg",5);
  	g.drawString(euc.time,192-(g.stringWidth(euc.time)/2),90); 
    g.flip();
	if (euc.conn=="OFF" && euc.lock==1){
    this.clear(); //if (set.def.cli) console.log("faceEUCexited");
    }
    }
//rest
  } else  {
    if (euc.conn!=this.conn) {
    this.conn=euc.conn;
    g.setColor(1,col("gray"));
	g.fillRect(0,54,135,154);
	g.setColor(0,col("black"));
	g.setFontVector(18);
    g.drawString("AV.SPEED",12,60);
	g.setFont("7x11Numeric7Seg",5);
	g.drawString(euc.aver,(139-(g.stringWidth(euc.aver)))/2,90); 
    g.flip();
    g.fillRect(139,54,239,154); 
    g.setColor(1,col("white"));     
    g.setFont("Vector",27);
    g.drawString(euc.conn,(142+(100-g.stringWidth(euc.conn))/2),85);
    g.flip();
    g.setColor(1,col("gray"));
    g.fillRect(0,0,135,50);
    g.fillRect(139,0,239,50);
    g.setColor(0,col("black"));
    g.setFont("7x11Numeric7Seg",4);
    g.drawString(euc.temp, 10,3); //temp
    g.drawString(euc.batt,240-(g.stringWidth(euc.batt)+10),3);
    g.flip();
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
	if (face.appPrev!="euc" || face.appCurr!="euc" || face.pageCurr!=0) g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(){
    g.off();
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
    face.go("main",0);
    return true;
  },
  clear: function(){
  return true;
  },
};	
//settings face
face[5] = {
  offms: 5000,
  g:w.gfx,
  init: function(){
    g.setColor(1,col("gray"));
    g.fillRect(0,0,115,75); //left up
    g.fillRect(0,80,115,155); //left mid
    g.fillRect(0,160,115,239); //left dn
    g.fillRect(120,0,239,239); //right-riding mode      
    g.setColor(0,col("black"));
    g.setFont("Vector",24);
	g.drawString("RING",58-(g.stringWidth("RING")/2),9); 
	g.drawString("LIGHT",58-(g.stringWidth("LIGHT")/2),41); 
//    g.drawString("AUTO",58-(g.stringWidth("AUTO")/2),90);
//    g.drawString("LOCK",58-(g.stringWidth("LOCK")/2),122);
	g.drawString("TRIP",58-(g.stringWidth("TRIP")/2),170); 
	g.drawString("RESET",58-(g.stringWidth("RESET")/2),202); 
	//rdmd
 	g.drawString("IS",180-(g.stringWidth("IS")/2),105);
    g.setFont("Vector",35);
    g.drawString("EUC",180-(g.stringWidth("EUC")/2),60); 
	g.drawString("OFF",180-(g.stringWidth("OFF")/2),140);
	//g.setFont("Vector",80);
    //g.drawString(euc.rdmd,180-(g.stringWidth(euc.rdmd)/2),80); //fixed bat
	g.flip();
    this.rdmd=-1;
    this.alck=-1;
	this.run=true;
  },
  show : function(){
    if (!this.run) return; 
//autolock
    if (euc.alck != this.alck) {
	  this.alck=euc.alck;
      if (this.alck==1) g.setColor(1,col("blue"));
      else g.setColor(1,col("gray"));
      g.fillRect(0,80,115,155); //left mid
      g.setColor(0,col("black"));
 	  g.setFont("Vector",24);
      g.drawString("AUTO",58-(g.stringWidth("AUTO")/2),90);
      g.drawString("LOCK",58-(g.stringWidth("LOCK")/2),122);
      g.flip();
    }
//ride mode    
    if (euc.conn=="READY") {  
	if (euc.rdmd != this.rdmd) {
	  this.rdmd=euc.rdmd;	
      g.setColor(1,col("lblue"));
      g.fillRect(120,0,239,239); //right-riding mode     
      g.setColor(0,col("black"));
      g.setFont("Vector",88);
      g.drawString(euc.rdmd,180-(g.stringWidth(euc.rdmd)/2),73);  
      g.setFont("Vector",35);
      if (9>euc.rdmd) {
      g.drawString(euc.rdmd+1,180-(g.stringWidth(euc.rdmd+1)/2),32);  
      }
      if (euc.rdmd>0) {
      g.drawString(euc.rdmd-1,180-(g.stringWidth(euc.rdmd-1)/2),166); 
      }
      g.setFont("Vector",20);
      if (8>euc.rdmd) {
      g.drawString(euc.rdmd+2,180-(g.stringWidth(euc.rdmd+2)/2),7); 
      }
      if (euc.rdmd>1) {
      g.drawString(euc.rdmd-2,180-(g.stringWidth(euc.rdmd-2)/2),208); 
      }
      g.flip();
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
    g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(){
    g.off();
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
