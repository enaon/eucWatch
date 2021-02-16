//dash simple 
//faces-main face
face[0] = {
  offms: 10000, //5 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
	this.spdC={0:0,1:4095,2:4080,3:3840};
	this.ampC={0:1365,1:4095,2:4080,3:3840};
	this.tmpC={0:0,1:4095,2:4080,3:3840};
	this.batC={0:0,1:0,2:4080,3:3840};
    this.spd=-1;
    this.amp=-1;
    this.temp=-1;
    this.batt=-1;
    this.trpL=-1;
	if (euc.state=="READY") {
	  this.g.setColor(0,col("black"));
      this.g.fillRect(0,0,239,64);
	  this.g.setColor(1,col("white"));
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.dash.tmp|0, 3,5); //temp  
      this.g.drawString(euc.dash.amp|0,(122-(this.g.stringWidth(euc.dash.amp|0)/2)),5); 
      this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+3),5); //fixed bat
      this.temp=euc.dash.tmp;
      this.amp=euc.dash.amp;
      this.batt=euc.dash.bat;
      this.g.flip();
	  this.g.setColor(0,this.spdC[euc.dash.spdC]);
      this.g.fillRect(0,65,239,239);
      this.g.setColor(1,(this.spdC[euc.dash.spdC]!=col("yellow")&&this.spdC[euc.dash.spdC]!=col("white"))?col("white"):col("black"));
      this.spd=euc.dash.spd;
	  this.g.setFontVector(200);
      this.g.drawString(euc.dash.spd|0,(132-(this.g.stringWidth(euc.dash.spd|0)/2)),65); 
      this.spd=euc.dash.spd;
      this.g.flip();
	}
    this.connrest=0;
	this.connoff=0;
    this.lock=2;
	this.run=true;
	
  },
  show : function(o){
  if (!this.run) return;
  if (euc.state=="READY") {
	//Temp
    if (euc.dash.tmp!=this.temp) {
      this.temp=euc.dash.tmp;
	  this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
      this.g.fillRect(0,0,79,55);       
      this.g.setColor(1,(this.tmpC[euc.dash.tmpC]!=col("yellow")&&this.tmpC[euc.dash.tmpC]!=col("lblue"))?col("white"):0);
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.dash.tmp|0, 3,5); //temp      
	  this.g.flip();
    }
	//Amp
    if ((euc.dash.amp|0)!=this.amp) {
        this.amp=(euc.dash.amp|0);
		this.g.setColor(0,this.ampC[euc.dash.ampC]);
		this.g.fillRect(80,0,160,55); //amp 
        this.g.setColor(1,(this.ampC[euc.dash.ampC]!=col("yellow")&&this.ampC[euc.dash.ampC]!=col("white"))?col("white"):0);
        this.g.setFont("7x11Numeric7Seg",4.5);
        this.g.drawString(euc.dash.amp|0,(122-(this.g.stringWidth(euc.dash.amp|0)/2)),5); 
        this.g.flip();
    }
	//Battery
    if (euc.dash.bat!=this.batt) {
   	  this.batt=euc.dash.bat;
	  this.g.setColor(0,this.batC[euc.dash.batC]);
      this.g.fillRect(161,0,239,55);
      this.g.setColor(1,(this.batC[euc.dash.batC]!=col("yellow")&&this.batC[euc.dash.batC]!=col("lgreen"))?col("white"):0);
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+3),5); //fixed bat
      this.g.flip();
    }
		//speed 1
    if (euc.dash.spd|0!=this.spd){
      this.spd=euc.dash.spd|0;
	  this.g.setColor(0,"black");
      this.g.fillRect(0,56,239,64);
      this.g.flip();
	  this.g.setColor(0,this.spdC[euc.dash.spdC]);
      this.g.fillRect(0,65,239,239);
      this.g.setColor(1,(this.spdC[euc.dash.spdC]!=this.spdC[2]&&this.spdC[euc.dash.spdC]!=this.spdC[1])?col("white"):col("black"));
	  this.g.setFontVector(200);
      this.g.drawString(euc.dash.spd|0,132-(this.g.stringWidth(euc.dash.spd|0)/2),65); 
      this.g.flip();
    }
 
  } else if (euc.state=="OFF")  {
	if (euc.state!=this.connoff) {
      this.connoff=euc.state;
	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,0,79,55); //temp
	  this.g.fillRect(161,0,239,55); //batt	  
	  this.g.setColor(1,col("white"));
	  this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(euc.dash.tmp|0,3,5); //temp
      this.g.drawString(euc.dash.bat,240-(this.g.stringWidth(euc.dash.bat)+3),5);
	  this.g.flip();
	  this.g.setColor(0,col("dgray"));
      this.g.fillRect(80,0,160,55); //amp   
      this.g.setColor(1,col("white"));
      this.g.drawImage(require("heatshrink").decompress(atob("kUgwIOLn/AAYX4AYMeg4DBAQPggEDwEYBAPAgwDBmEBwEAhkAsAQBgAQKh0AkP///AjADBGIM/AgMAh/9BgMD/0f+EA/8H/hJCCAX4v4QCn4QCx4QC8YQDEIX/CAf/CAQyDH4UBAYJoBBgIUBA==")),106,10);	 
	  this.g.flip();
      this.g.setColor(0,col("black"));
	  this.g.fillRect(65,56,199,239); //middle	
      this.g.setColor(1,col("white"));
      this.g.setFontVector(28);
      this.g.drawString(euc.dash.spdM,190-this.g.stringWidth(euc.dash.spdM),90);
      this.g.drawString(euc.dash.time,190-this.g.stringWidth(euc.dash.time),133); 
      this.g.drawString(euc.dash.trpL,190-this.g.stringWidth(euc.dash.trpL),175); 
      this.g.drawString(euc.dash.trpT,190-this.g.stringWidth(euc.dash.trpT),217); 
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
	}
	if (euc.dash.lock!=this.lock&&euc.dash.lock==1){
      this.lock=euc.dash.lock;
      this.g.setColor(0,col("red"));
	  this.g.fillRect(80,0,160,55); //amp   
      this.g.setColor(1,col("white"));
      this.g.drawImage(require("heatshrink").decompress(atob("j0gwIIFnwCBgf/AYMf/wDB8E8gEHgFwgEcgHAgFggcAgOAhkAg0AmEAjAOJDoM4gF///4F4P/8EPAYPAn/jHAP/g/8gf8j/wh/wv4OFx4OB/0/BwP4Do3/BwIDBBwIDBwE//5hBAYPwOQYA=")),106,10);	 
	  this.g.flip();
	  this.clear(); //if (set.def.cli) console.log("faceEUCexited");
	}
//rest
  } else  {
    if (euc.state!=this.connrest) {
      this.connrest=euc.state;
      this.g.setFontVector(36);
	  this.g.setColor(0,col("dgray"));
      this.g.fillRect(0,0,239,55); //top
      this.g.setColor(1,col("lblue"));
 	  this.g.drawImage(require("heatshrink").decompress(atob("jkwwIEBj4CBg/8AYP/8EAh//gEB//wgEeh4GB4FwDgMHwAGBnAGBgYGLjvzAwPfAzMDAwV9+fgh/fn8B+Px+E+j8HwfD/F8vl/8fHx//jl5//x98f/+e+P//Hvn//x3zAwQNCuP//Pnz//j14//h4/H/08nk/w+BQwP4j+ASYP+g/gg//SwIpBwCZDgCVBA=")),25,3);
      this.g.drawImage(require("heatshrink").decompress(atob("mEwwIdah/wAqkB///wAFBgYFB4AFh34FKn4FJ/wFK/gFE/AFK+AFFgYFD8EHApPAh4vEAosfApRHFv4FKPogFF/oFKU6zRFACwA=")),180,3);	 
      this.g.drawImage(require("heatshrink").decompress(atob("mEwwIMJv/4Aof/+AECjgFE/v/8AEBgf5AocH/f/4AFBj/D/+YAoM/g//3wFBvgFBn4FB/EP/0fwEB+AFBh/Agfgj/8g/gg/Aj/4BIMHwE//AVCFQJGBAoV/AoP4jwFBKYN4AoP/AoN8jkBAoPgvk8AoXAnk8gYFBwAFEgAFBKQP+Aon8AoRyBRwIFCh47BAo0cPwKIBAoaIBnhHBn+AgE4KYSBBnBfBvwFBvAFBGgMAuB3BYYXwg+BXoXggfBFwMBSoPjAoMD4EB+Y0BDYMA+4CBE4MAs4CBnwCBhzCCAQMMEwIxCjKVCAoMRR4QFBkCnBfQR9DAAwA=")),97,3);	 
      this.g.flip();
  	  this.g.setColor(0,col("black"));
	  this.g.fillRect(0,56,239,239);
      this.g.setColor(1,col("white"));
      this.g.setFont("Vector",50);
      this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),115);
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
	if (face.appCurr!="dash_simple" || face.pageCurr!=0) this.g.clear();
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
  off: function(){
  return true;
  },
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event
		digitalPulse(D16,1,40);
		this.timeout();
		break;
    case 1: //slide down event
		if (set.def.dash+1>=set.dash.length) set.def.dash=0; else set.def.dash++;
		face.go(set.dash[set.def.dash],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
			this.timeout();
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	} else {digitalPulse(D16,1,40);this.timeout();}
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dashSet'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashSelect",0):digitalPulse(D16,1,40);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		this.timeout();
		euc.tgl();
		return;
    }
};