//dash simple 
face[0] = {
	offms: 10000, //5 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
        if (face.appPrev.startsWith("dash_")) {
			this.g.setColor(0,0);
			this.g.fillRect(0,51,239,239);
		this.g.flip();	
		}else this.g.clear();
		this.spdC=[0,4095,4080,3840];
		this.ampC=[1365,4095,4080,3840];
		this.tmpC=[0,4095,4080,3840];
		this.batC=[1453,1365,4080,3840];
		this.spd=-1;
		this.amp=-1;
		this.tmp=-1;
		this.time=-1;
		this.bat=-1;
		this.conn=0;
		this.lock=2;
		//this.clkf();
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (euc.state=="READY") {
			if (euc.dash.spd|0!=this.spd)
				this.spdf();
			if (!set.def.dash.clkS) {	
				if (this.tmp!=euc.dash.tmp) 
					this.tmpf();
			} else 	if (60 < getTime()-this.time ) 
				this.clkf();
			if (set.def.dash.batS){
					if (this.bat!=euc.dash.bat) 
						this.batf();
			}else 
				if (this.volt!=euc.dash.volt) 
					this.vltf();
		} else if (euc.state=="OFF")  {
			face.go("dashOff",0);
			return;
		//rest
		} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,239);
				this.g.setColor(1,4095);
				this.g.setFont("Vector",50);
				this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),95);
				this.g.flip();
				if (euc.state=="WAIT"||euc.state=="RETRY"){this.spd=-1;this.time=0;this.amp=-1;this.tmp=-1;this.bat=-1;this.trpL=-1;this.conn=0;this.lock=2;this.run=true;}
			}
		}
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},100,this);
	},
	tmpf: function(){
		this.tmp=euc.dash.tmp;
		this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
		this.g.fillRect(0,0,119,50);       
		this.g.setColor(1,(this.tmpC[euc.dash.tmpC]!=4080&&this.tmpC[euc.dash.tmpC]!=1535)?4095:0);
		this.g.setFontVector(50);
		this.g.drawString(this.tmp, 0,3); 
		let size=this.g.stringWidth(this.tmp)+0;
		this.g.setFontVector(13);
		this.g.drawString("o",size-3,2); 
		this.g.setFontVector(16);
		this.g.drawString("C",size+3,5); 
		this.g.flip();
	},
	clkf: function(){
		this.time=getTime();
		this.g.setColor(0,1365);
		this.g.fillRect(0,0,119,50);       
		this.g.setColor(1,1535);
		this.g.setFontVector(40);
		let d=(Date()).toString().split(' ');
		let t=(d[4]).toString().split(':');
		this.time=(t[0]+":"+t[1]);
		this.g.drawString(this.time,0,0); 
		this.g.setFontVector(13);
		this.g.drawString("CLOCK",1,40);
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
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,(this.batC[euc.dash.batC]!=4080&&this.batC[euc.dash.batC]!=1525)?4095:0);
		this.g.setFontVector((this.volt<100)?40:35);
		this.g.drawString(this.volt,(this.volt<100)?135:125,0); 
		this.g.setFontVector(13);
		this.g.drawString("VOLT",202,40);
		this.g.flip();
	},
	spdf: function(){
		//"ram";
		this.spd=euc.dash.spd;
		this.g.setColor(0,this.spdC[euc.dash.spdC]);
		this.g.fillRect(0,55,239,220);
		this.g.setColor(1,(this.spdC[euc.dash.spdC]!=this.spdC[2]&&this.spdC[euc.dash.spdC]!=this.spdC[1])?4095:0);
		if (100 <= this.spd) {
			if (120 < this.spd)  this.spd=120;
			this.g.setFontVector(140);
		}else 
			this.g.setFontVector(200);	  
		this.g.drawString(this.spd,132-(this.g.stringWidth(this.spd)/2),55); 
		this.g.flip();
	},
	ampf: function(){
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
		if (euc.state=="OFF") face.go("main",0); else {face.pageCurr=0;face.go(set.dash[set.def.dash.face],-1);}
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
		if (x < 120 && y < 60){//temp/clock
			if (set.def.dash.clkS==undefined) set.def.dash.clkS=0;
			set.def.dash.clkS=1-set.def.dash.clkS;
			face[0].time=-1;face[0].tmp=-1;
			digitalPulse(D16,1,[30,50,30]);
		}else if (120 < x && y < 60){//batery percentage/voltage
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