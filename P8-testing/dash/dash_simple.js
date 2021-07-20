//dash simple 
//faces-main face
face[0] = {
	offms: 10000, //5 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
		this.g.clear();
		this.spdC=[0,4095,4080,3840];
		this.ampC=[1365,4095,4080,3840];
		this.tmpC=[0,4095,4080,3840];
		this.batC=[0,0,4080,3840];
		this.spd=-1;
		this.amp=-1;
		this.tmp=-1;
		this.bat=-1;
		this.spdF=((set.def.dash.mph)?0.625:1)*euc.dash.spdF;
		this.connrest=0;
		this.connoff=0;
		this.lock=2;
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (euc.state=="READY") {
			if (euc.dash.spd|0!=this.spd)
				this.spdf();
			else{
				if (this.tmp!=euc.dash.tmp) 
					this.tmpf(); 
				if (set.def.dash.batS){
					if (this.bat!=euc.dash.bat) 
						this.batf();
				}else 
					if (this.volt!=euc.dash.volt) 
						this.vltf();
			}
		} else if (euc.state=="OFF")  {
			face.go("dashOff",0);
			return;
		//rest
		} else  {
			if (euc.state!=this.connrest) {
				this.connrest=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,239);
				this.g.setColor(1,4095);
				this.g.setFont("Vector",50);
				this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),95);
				this.g.flip();
				if (euc.state=="WAIT"||euc.state=="RETRY"){this.spd=-1;this.amp=-1;this.tmp=-1;this.bat=-1;this.trpL=-1;this.conn="OFF";this.lock=2;this.run=true;}
			}
		}
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},50,this);
	},
	tmpf: function(){
		this.tmp=euc.dash.tmp;
		this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
		this.g.fillRect(0,0,119,55);       
		this.g.setColor(1,(this.tmpC[euc.dash.tmpC]!=4080&&this.tmpC[euc.dash.tmpC]!=1535)?4095:0);
		this.g.setFontVector(45);
		this.g.drawString(this.tmp, 5,5); 
		let size=this.g.stringWidth(this.tmp)+3;
		this.g.setFontVector(13);
		this.g.drawString("o",size,6); 
		this.g.setFontVector(16);
		this.g.drawString("C",size+8,10); 
		this.g.flip();
	},
	batf: function(){
		this.bat=euc.dash.bat;
		this.g.setColor(0,this.batC[euc.dash.batC]);
		this.g.fillRect(122,0,239,50);
//		this.g.setColor(1,4095);
		this.g.setColor(1,(this.batC[euc.dash.batC]!=4080&&this.batC[euc.dash.batC]!=1525)?4095:0);
		this.g.setFontVector(50);
		this.g.drawString(this.bat,220-(this.g.stringWidth(this.bat)),3);
		this.g.setFontVector(20);
		this.g.drawString("%",224,8);
		this.g.flip();
	},
	vltf: function(){
		this.volt=euc.dash.volt;
		
		this.g.setColor(0,this.batC[euc.dash.batC]);
		this.g.fillRect(122,0,239,55);
		this.g.setColor(1,(this.batC[euc.dash.batC]!=4080&&this.batC[euc.dash.batC]!=1525)?4095:0);
		this.g.setFontVector(50);
		this.g.drawString(this.volt.toFixed(1),225-(this.g.stringWidth(this.volt.toFixed(1))),3); 
		this.g.setFontVector(16);
		this.g.drawString("V",230,8); 
		this.g.flip();
	},
	spdf: function(){
		"ram";
		this.spd=euc.dash.spd;
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
	},
	amp: function(){
		this.amp=(euc.dash.amp);
		this.g.setColor(0,this.ampC[euc.dash.ampC]);
		this.g.fillRect(80,0,160,55); //amp 
		this.g.setColor(1,(this.ampC[euc.dash.ampC]!=4080&&this.ampC[euc.dash.ampC]!=4095)?4095:0);
		this.g.setFontVector(33);
		this.g.drawString(this.amp|0,(122-(this.g.stringWidth(this.amp|0)/2)),5); 
		this.g.flip();
	},
	tid:-1,
	run:false,
	clear : function(){
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
		if (120 < x && y < 60){//batery percentage/voltage
			if (set.def.dash.batS==undefined) set.def.dash.batS=0;
			set.def.dash.batS=1-set.def.dash.batS;
			face[0].bat=-1;face[0].volt=-1;
			digitalPulse(D16,1,[30,50,30]);
		}
		else{	
			digitalPulse(D16,1,40);
		}
		this.timeout();
		break;
    case 1: //slide down event
		if (set.def.dash.face+1>=set.dash.length) set.def.dash.face=0; else set.def.dash.face++;
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
		digitalPulse(D16,1,40);
		this.timeout();
		break;
    }
};