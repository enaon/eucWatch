//dash simple 
//faces-main face
face[0] = {
  offms: 10000, //5 sec timeout
  g:w.gfx,
  spd:[],
  init: function(){
	if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
	this.g.clear();
	euc.buff=new Uint8Array(35);
	this.spdC=new Uint16Array([0,4095,4080,3840]);
	this.ampC=new Uint16Array([1365,4095,4080,3840]);
	this.tmpC=new Uint16Array([0,4095,4080,3840]);
	this.batC=new Uint16Array([0,0,4080,3840]);
	this.spd=-1;
	this.amp=-1;
	this.tmp=-1;
	this.batt=-1;
    this.trpL=-1;
	this.trpF=((set.def.dash.mph)?0.626:1)*euc.dash.trpF;
	if (euc.state=="READY") {
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,64);
		this.g.setColor(1,4095);
		this.g.setFont("7x11Numeric7Seg",4.5);
		this.g.drawString(euc.dash.tmp|0, 3,5); //temp  
		this.g.drawString(euc.dash.amp|0,(122-(this.g.stringWidth(euc.dash.amp|0)/2)),5); 
		if (set.def.dashBat)
			this.g.drawString(euc.dash.bat,238-(this.g.stringWidth(euc.dash.bat)),5); //fixed bat
		else {
			this.g.setFontVector(33);
			this.g.drawString(euc.dash.volt.toFixed(1),238-(this.g.stringWidth(euc.dash.volt.toFixed(1))),1); 
			this.g.setFontVector(13);
			this.g.drawString("VOLTS",188,36); //fixed bat
			}
		this.g.flip();
		this.g.setFont("7x11Numeric7Seg",4.5);
		this.g.setColor(0,this.spdC[euc.dash.spdC]);
		this.g.fillRect(0,65,239,239);
		this.g.setColor(1,(this.spdC[euc.dash.spdC]!=4080&&this.spdC[euc.dash.spdC]!=4095)?4095:0);
		this.spd=euc.dash.spd;
		this.g.setFontVector(200);
		this.g.drawString(Math.round(euc.dash.spd*this.spdF),(132-(this.g.stringWidth(Math.round(euc.dash.spd*this.spdF))/2)),65); 
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
    if (euc.dash.tmp!=this.tmp) {
      this.tmp=euc.dash.tmp;
	  this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
      this.g.fillRect(0,0,79,55);       
      this.g.setColor(1,(this.tmpC[euc.dash.tmpC]!=4080&&this.tmpC[euc.dash.tmpC]!=1535)?4095:0);
      this.g.setFont("7x11Numeric7Seg",4.5);
      this.g.drawString(this.tmp|0, 3,5); //temp      
	  this.g.flip();
    }
	//Amp
    if ((euc.dash.amp|0)!=this.amp) {
        this.amp=(euc.dash.amp|0);
		this.g.setColor(0,this.ampC[euc.dash.ampC]);
		this.g.fillRect(80,0,160,55); //amp 
        this.g.setColor(1,(this.ampC[euc.dash.ampC]!=4080&&this.ampC[euc.dash.ampC]!=4095)?4095:0);
        this.g.setFont("7x11Numeric7Seg",4.5);
        this.g.drawString(this.amp|0,(122-(this.g.stringWidth(this.amp|0)/2)),5); 
        this.g.flip();
    }
	//Battery
	if (set.def.dashBat){
		if (euc.dash.bat!=this.batt) {
			this.batt=euc.dash.bat;
			this.g.setColor(0,this.batC[euc.dash.batC]);
			this.g.fillRect(161,0,239,55);
			this.g.setColor(1,(this.batC[euc.dash.batC]!=4080&&this.batC[euc.dash.batC]!=1525)?4095:0);
			this.g.setFont("7x11Numeric7Seg",4.5);
			this.g.drawString(this.batt,238-(this.g.stringWidth(this.batt)),5); //fixed bat
			this.g.flip();
		}
	}else {
		if (euc.dash.volt!=this.volt) {
			this.volt=euc.dash.volt;
			this.g.setColor(0,this.batC[euc.dash.batC]);
			this.g.fillRect(161,0,239,55);
			this.g.setColor(1,(this.batC[euc.dash.batC]!=4080&&this.batC[euc.dash.batC]!=1525)?4095:0);
			this.g.setFontVector(33);
			this.g.drawString(this.volt.toFixed(1),238-(this.g.stringWidth(this.volt.toFixed(1))),1); //fixed bat
			this.g.setFontVector(13);
			this.g.drawString("VOLTS",188,36); //fixed bat
			this.g.flip();
		}
	}	
		//speed 
    if (euc.dash.spd|0!=this.spd){
		this.spd=euc.dash.spd|0;
		this.g.setColor(0,"black");
		this.g.fillRect(0,56,239,64);
		this.g.flip();
		this.g.setColor(0,this.spdC[euc.dash.spdC]);
		this.g.fillRect(0,65,239,239);
		this.g.setColor(1,(this.spdC[euc.dash.spdC]!=this.spdC[2]&&this.spdC[euc.dash.spdC]!=this.spdC[1])?4095:0);
		if (100 <= this.spd) {
			if (120 < this.spd)  this.spd=120;
			this.g.setFontVector(140);
		}else 
			this.g.setFontVector(200);	  
		this.g.drawString(Math.round(this.spd*this.spdF),132-(this.g.stringWidth(Math.round(this.spd*this.spdF))/2),65); 
		this.g.flip();
    }
 
  } else if (euc.state=="OFF")  {

			face.go("dashOff",0);
			return;
	//}
	/*
	if (euc.dash.lock!=this.lock&&euc.dash.lock==1){
      this.lock=euc.dash.lock;
      this.g.setColor(0,col("red"));
	  this.g.fillRect(80,0,160,55); //amp   
      this.g.setColor(1,4095);
      this.g.drawImage(require("heatshrink").decompress(atob("j0gwIIFnwCBgf/AYMf/wDB8E8gEHgFwgEcgHAgFggcAgOAhkAg0AmEAjAOJDoM4gF///4F4P/8EPAYPAn/jHAP/g/8gf8j/wh/wv4OFx4OB/0/BwP4Do3/BwIDBBwIDBwE//5hBAYPwOQYA=")),106,10);	 
	  this.g.flip();
	  this.clear(); //if (set.def.cli) console.log("faceEUCexited");
	*/
  //}
//rest
  } else  {
    if (euc.state!=this.connrest) {
      this.connrest=euc.state;
      this.g.setFontVector(36);
	  this.g.setColor(0,1365);
      this.g.fillRect(0,0,239,55); //top
      this.g.setColor(1,1535);
 	  this.g.drawImage(require("heatshrink").decompress(atob("jkwwIEBj4CBg/8AYP/8EAh//gEB//wgEeh4GB4FwDgMHwAGBnAGBgYGLjvzAwPfAzMDAwV9+fgh/fn8B+Px+E+j8HwfD/F8vl/8fHx//jl5//x98f/+e+P//Hvn//x3zAwQNCuP//Pnz//j14//h4/H/08nk/w+BQwP4j+ASYP+g/gg//SwIpBwCZDgCVBA=")),25,3);
      this.g.drawImage(require("heatshrink").decompress(atob("mEwwIdah/wAqkB///wAFBgYFB4AFh34FKn4FJ/wFK/gFE/AFK+AFFgYFD8EHApPAh4vEAosfApRHFv4FKPogFF/oFKU6zRFACwA=")),180,3);	 
      this.g.drawImage(require("heatshrink").decompress(atob("mEwwIMJv/4Aof/+AECjgFE/v/8AEBgf5AocH/f/4AFBj/D/+YAoM/g//3wFBvgFBn4FB/EP/0fwEB+AFBh/Agfgj/8g/gg/Aj/4BIMHwE//AVCFQJGBAoV/AoP4jwFBKYN4AoP/AoN8jkBAoPgvk8AoXAnk8gYFBwAFEgAFBKQP+Aon8AoRyBRwIFCh47BAo0cPwKIBAoaIBnhHBn+AgE4KYSBBnBfBvwFBvAFBGgMAuB3BYYXwg+BXoXggfBFwMBSoPjAoMD4EB+Y0BDYMA+4CBE4MAs4CBnwCBhzCCAQMMEwIxCjKVCAoMRR4QFBkCnBfQR9DAAwA=")),97,3);	 
      this.g.flip();
  	  this.g.setColor(0,0);
	  this.g.fillRect(0,56,239,239);
      this.g.setColor(1,4095);
      this.g.setFont("Vector",50);
      this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),115);
      this.g.flip();
	  if (euc.state=="WAIT"||euc.state=="RETRY"){this.spd=-1;this.amp=-1;this.tmp=-1;this.batt=-1;this.trpL=-1;this.conn="OFF";this.lock=2;this.run=true;}
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
	//if (face.appCurr!="dash_simple" || face.pageCurr!=0) this.g.clear();
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
		if (160<x&&y<55){//battery percentage/voltage
			if (set.def.dashBat==undefined) set.def.dashBat=0;
			set.def.dashBat=1-set.def.dashBat;
			face[0].batt=-1;face[0].volt=-1;
			digitalPulse(D16,1,[30,50,30]);
		}
		else{	
			digitalPulse(D16,1,40);
		}
		this.timeout();
		break;
    case 1: //slide down event
		if (set.def.dash+1>=set.dash.length) set.def.dash=0; else set.def.dash++;
		face.go(set.dash[set.def.dash.face],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
			this.timeout();
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
        this.timeout();
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):digitalPulse(D16,1,40);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		if (160<x&&y<55){
			if (set.def.dashBat==undefined) set.def.dashBat=0;
			set.def.dashBat=1-set.def.dashBat;
			digitalPulse(D16,1,100);
			face[0].batt=-1;face[0].volt=-1;
		}else digitalPulse(D16,1,40);
		this.timeout();
		return;
    }
};