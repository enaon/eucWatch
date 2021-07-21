//dash digital
face[0] = {
	offms: 10000, //15 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
        if (face.appPrev.startsWith("dash_")) {
			this.g.setColor(0,0);
			this.g.fillRect(0,51,239,239);
			this.g.flip();	
		}else this.g.clear();
		this.spdC=new Uint16Array([0,4095,4080,3840]);
		this.ampC=new Uint16Array([1365,4095,4080,3840]);
		this.tmpC=new Uint16Array([1365,1365,4080,3840]);
		this.batC=new Uint16Array([1453,1453,1365,3840]);
		this.spd=-1;
		this.amp=-10;
		this.ampL=1;
		this.tmp=-1;
		this.bat=-1;
		this.batL=1;
		this.volt=-1;
		this.buzz=-1;
		this.max=-1;
		this.alrm=-1;
		this.conn="OFF";
		this.lock=2;
		this.spdL=-1;
		this.trpF=((set.def.dash.mph)?0.626:1)*euc.dash.trpF;
		this.run=true;
		
	},
	show : function(o){
		if (!this.run) return;
		//connected  
		if (euc.state=="READY") {
			//speed
			if (euc.dash.spd!=this.spd){
				this.spd=euc.dash.spd;
				this.g.setColor(0,0);
				this.g.fillRect(41,54,199,170);
				this.g.setColor(1,4095);
				if (100 <= this.spd) {
					if (150 < this.spd)  this.spd=150;
					this.g.setFontVector(80);
				}else 
					this.g.setFontVector(130);
				//this.g.drawString((set.def.dashSpd)?euc.dash.spd:Math.round(euc.dash.spd/1.6),129-(this.g.stringWidth((set.def.dashSpd)?euc.dash.spd:Math.round(euc.dash.spd/1.6))/2),57); 
				this.g.drawString(this.spd,129-(this.g.stringWidth(this.spd)/2),57); 
				this.g.flip();
				if (this.spd==0) { 
					this.g.flip();
					this.bar();
					this.g.setColor(0,0);
				}
			}
			// alarm events time graph
			if (this.spd!=0&&this.al!=almL) {
 				this.al= new Uint8Array(almL);
				this.g.setColor(0,1365);
				this.g.clearRect(0,176,239,197);
				this.g.setColor(1,4095);
				//graph
				let i=0;
				this.al.forEach(function(val){
					w.gfx.fillRect(237-(i*12),(val)?181:191,237-((i*12)+8),191);
					i++;
				});
				this.g.flip();
			}
			//tmp/amp block
			if (!set.def.dash.amp) {
				if (this.amp!=(euc.dash.amp|0)) {
					this.amp=euc.dash.amp|0;
					this.g.setColor(0,this.ampC[euc.dash.ampC]);
					this.g.fillRect(0,55,40,112);
					this.g.setColor(1,(euc.dash.ampC==1||euc.dash.ampC==2)?0:4095);
					this.g.setFontVector(12);
					this.g.drawString("AMP", 8,59);
					this.g.setFontVector(32);
					this.g.drawString(this.amp|0, 22-(this.g.stringWidth(this.amp|0)/2),80); 
					this.g.flip();
				}
			}else {
				if (this.tmp!=euc.dash.tmp|0) {
					this.tmp=euc.dash.tmp|0;
					this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
					this.g.fillRect(0,53,40,112);
					this.g.setColor(1,(euc.dash.tmpC==1||euc.dash.tmpC==2)?0:4095);
					this.g.setFontVector(11);
					this.g.drawString("TEMP", 6,59);
					this.g.setFontVector(32);
					this.g.drawString(Math.round(this.tmp), 22-(this.g.stringWidth(Math.round(this.tmp))/2),80); 
					this.g.flip();
				}
			}	
			//alarm block
			if (this.buzz!=euc.buzz) {
				this.buzz=euc.buzz;
				this.g.setFontVector(35);
				this.g.setColor(0,(this.buzz)?3840:1365);
				this.g.fillRect(0,115,40,173); 
				this.g.setColor(1,(this.buzz)?4095:0);
				this.g.drawString("!", 19,130); 
				this.g.flip();
			}
			//Maxspeed block
			if (euc.dash.spdM!=this.max) {
				this.max=euc.dash.spdM;
				this.g.setColor(0,1365);
				this.g.fillRect(200,53,239,112); 
				this.g.setColor(1,4095);
				this.g.setFontVector(12);
				this.g.drawString("TOP", 208,59);
				this.g.setFontVector(32);
				this.g.drawString(Math.round(this.max), 222-(this.g.stringWidth(Math.round(this.max))/2),80); 
				this.g.flip();
			}
			//buzzer/health block
			if (euc.dash.maker=="Kingsong") {
				if (this.spdL!=euc.dash.spdL) {
					this.spdL=euc.dash.spdL;
					this.g.setColor(0,(euc.dash.spdT<=this.spdL)?1365:3840);	
					this.g.fillRect(200,115,239,173); 
					this.g.setColor(1,4095);
					this.g.setFontVector(11);
					this.g.drawString("LIMIT", 205,120);
					this.g.setFontVector(32);
					this.g.drawString(this.spdL, 202,140); 
					this.g.flip();
				}
			}else if (this.alrm!=euc.dash.alrm) {
				this.alrm=euc.dash.alrm;
				this.g.setColor(0,1365);
				this.g.fillRect(200,115,239,173); 
				this.g.setColor(1,0);
				this.g.setFontVector(35);
				this.g.drawString("B", 212,130); 
				this.g.flip();
			}			
			//tmp/amp field
			if (!set.def.dash.amp){
				if (this.tmp!=euc.dash.tmp) {
					this.tmp=euc.dash.tmp;
					this.g.setColor(1,this.tmpC[euc.dash.tmpC]);
					this.g.fillRect(0,0,119,50);       
					this.g.setColor(0,(euc.dash.tmpC!=3&&euc.dash.tmpC!=0)?0:4095);
					this.g.setFontVector(50);
					this.g.drawString(this.tmp, 0,3); 
					let size=this.g.stringWidth(this.tmp)+0;
					this.g.setFontVector(13);
					this.g.drawString("o",size-3,2); 
					this.g.setFontVector(16);
					this.g.drawString("C",size+3,5); 
					this.g.flip();
				}
			}else if (this.ampL!=ampL){
					this.ampL = new Uint8Array(ampL);
					this.g.setColor(1,1365);
					this.g.fillRect(0,0,119,50);       
					this.g.setColor(0,(1<euc.dash.ampC)?4080:4095);
					//graph
					let i=0;
					this.ampL.forEach(function(val){
						//w.gfx.fillRect(118-(i*8),(0<=val)?50-(val*1.2):1,118-(i*8)-3,(0<=val)?50:1-(val*2));
						w.gfx.fillRect(118-(i*8),(val<200)?50-(val*1.2):1,118-(i*8)-3,(val<200)?50:(255-val)*2);
						i++;
					});
					this.g.flip();
			} 
			//batery field
			if (!set.def.dash.bat || set.def.dash.bat==1){
				if (this.volt!=euc.dash.volt) {
					this.volt=euc.dash.volt;
					this.g.setColor(0,this.batC[euc.dash.batC]);
					this.g.fillRect(122,0,239,50);
					this.g.setColor(1,4095);
					this.g.setFontVector((this.volt<100)?40:35);
					this.g.drawString(this.volt,(this.volt<100)?135:125,0); 
					this.g.setFontVector(13);
					this.g.drawString("VOLT",202,40);
					this.g.flip();
				}
			}else if (set.def.dash.bat==2) {
				if (euc.dash.bat!=this.bat) {
					this.bat=euc.dash.bat;
					this.g.setColor(0,this.batC[euc.dash.batC]);
					this.g.fillRect(122,0,239,50);
					this.g.setColor(1,4095);
					this.g.setFontVector(50);
					this.g.drawString(this.bat,220-(this.g.stringWidth(this.bat)),3);
					this.g.setFontVector(20);
					this.g.drawString("%",224,8);
					this.g.flip();
				}
			}else if (this.batL!=batL) {
					this.batL = new Uint8Array(batL);
					this.g.setColor(1,(euc.dash.batC==3)?3840:1453);
					this.g.fillRect(122,0,239,50);       
					this.g.setColor(0,4095);
					//graph
					let i=0;
					this.batL.forEach(function(val){
						w.gfx.fillRect(238-(i*6),50-(val/2),238-(i*6)-1,50);
						i++;
					});
					this.g.flip();
			}				
			//Mileage
			if (euc.dash.trpL!=this.trpL) {
				this.trpL=euc.dash.trpL;
				this.mileage();
			}     
		//off
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
		euc.new=0;
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},100,this);
	},
	mileage: function(){
		this.trpL=euc.dash.trpL;
		this.g.setColor(0,0);
		this.g.fillRect(0,203,239,239);
		this.g.setColor(1,1535);
		this.g.setFontVector(35);
		//if (euc.dash.maker=="Ninebot") {
		//	this.g.drawString(euc.dash.trpL,0,205); 
		//	this.g.drawString(euc.dash.trpT|0,(240-(this.g.stringWidth(euc.dash.trpT|0)))/2,210); 
		//	this.g.drawString(euc.dash.trpR,240-(this.g.stringWidth(euc.dash.trpR)+1),210); 
		//}else {
			this.g.drawString((euc.dash.trpL*this.trpF).toFixed(2),0,208); 
			if (!set.def.dash.clck) {//clock
				let d=(Date()).toString().split(' ');
				let t=(d[4]).toString().split(':');
				this.time=(t[0]+":"+t[1]);
				this.g.drawString(this.time, 240-(this.g.stringWidth(this.time)),208); //temp
			}else 	
				this.g.drawString(Math.round(euc.dash.trpT*this.trpF),240-(this.g.stringWidth(Math.round(euc.dash.trpT*this.trpF))),208); 
		//}
		this.g.flip();
	},
	bar: function(){
		this.g.setColor(1,1365);
		this.g.fillRect(0,176,239,197); //mileage
		this.g.setColor(0,4095);
		this.g.setFont("7x11Numeric7Seg",4);
		this.g.setFontVector(16); //mileage
		//if (euc.dash.maker=="Ninebot") {
		//	this.g.drawString("TRIP",2,180); 
		//	this.g.drawString("TOT",101,180); 
		//	this.g.drawString("LEFT",197,180); 
		//} else {
			this.g.drawString("TRIP",2,180); 
			this.g.drawString((set.def.dash.mph)?"MPH":"KPH",105,180);
			this.g.drawString((!set.def.dash.clck)?"CLOCK":"TOTAL",181,180); 
		//}
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
		face.pageCurr=0;
		if (euc.state=="OFF") 
			face.go("main",0); 
		else {
			face.go(set.dash[set.def.dash.face],-1);
		}
		return true;
	},
	clear: function(){
		return true;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event	
		if (120<x&&y<55){//batery percentage/voltage
			if (set.def.dash.bat==undefined || 2 < set.def.dash.bat) set.def.dash.bat=0;
			set.def.dash.bat++;
			face[0].bat=-1;face[0].batL=-1;face[0].volt=-1;
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<120&&y<55){//tmp/amp
			if (set.def.dash.amp==undefined) set.def.dash.amp=0;
			set.def.dash.amp=1-set.def.dash.amp;
 			face[0].tmp=-1;face[0].amp=-1;face[0].ampL=-1;
			digitalPulse(D16,1,[30,50,30]);
		}else if (190<y){//mileage/time
			if (set.def.dash.clck==undefined) set.def.dash.clck=0;
			set.def.dash.clck=1-set.def.dash.clck;
 			face[0].trpL=-1;face[0].bar();
			digitalPulse(D16,1,[30,50,30]);
		}else
			digitalPulse(D16,1,40);
		this.timeout();
		break;
    case 1: //slide down event
		if (set.def.dash.face+1>=set.dash.length) 
			set.def.dash.face=0; 
		else 
			set.def.dash.face++;
		face.go(set.dash[set.def.dash.face],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {
			face.go("settings",0);
			return;
		}
		this.timeout();
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):digitalPulse(D16,1,40);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		if (55<y && y<200) {
			if (set.def.dash.mph==undefined) set.def.dash.mph=0;
			set.def.dash.mph=1-set.def.dash.mph;
			digitalPulse(D16,1,[30,50,30]);
			face[0].bar();
			face[0].trpL=-1;
		}else if (x<120&&y<55 && set.def.dash.amp){//reverce amps
			if (euc.dash.ampR==undefined) euc.dash.ampR=0;
			euc.dash.ampR=1-euc.dash.ampR;
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<x&&y<55){//batery percentage/voltage
			if (1.5<=euc.dash.bms) euc.dash.bms=1;
			else euc.dash.bms=euc.dash.bms+0.25;
			face[0].bat=-1;
			digitalPulse(D16,1,[30,50,30]);
		} else digitalPulse(D16,1,40);
		this.timeout();
		break;
    }
};