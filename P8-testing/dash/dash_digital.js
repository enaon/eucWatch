E.setFlags({pretokenise:1});
//dash digital
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	g:w.gfx,
	spd:[],
	init: function(){
		if ( euc.is.day[0] < Date().getHours() && Date().getHours() < euc.is.day[1] ) euc.is.night=0; else euc.is.night=1;
        if (face.appPrev.startsWith("dash_")) {
			this.g.setColor(0,0);
			this.g.fillRect(0,51,239,239);
			this.g.flip();
		}else 	this.g.clear();
		this.spdC=[0,14,13,13];
		this.ampC=[1,9,13,13];
		this.tmpC=[1,0,13,13];
		this.batC=[4,1,13,13];
		this.spd=euc.dash.live.spd-1;
		this.aTlt=-1;
		this.topS=-1;
		this.topP=-1;
		this.amp=-10;
		this.tmp=-1;
		this.pwm=-1;
		this.bat=-1;
		this.volt=-1;
		this.buzz=-1;
		this.alrm=-1;
		this.conn="OFF";
		this.lock=2;
		this.trpL=-1;
		this.bar=0;
		this.fact=euc.dash.opt.unit.fact.spd*((ew.def.dash.mph)?0.625:1);
		this.trpF=euc.dash.opt.unit.fact.dist*((ew.def.dash.mph)?0.625:1);
		this.run=true;
		this.afterScrOff=false;
	},
	show : function(o){
		if (!this.run) return;
		if (euc.state=="READY") {
			this.g.setColor(0,0);
			if(euc.state!=this.conn) {
                                this.conn=euc.state;
				this.g.fillRect(0,0,239,239);
			}
			this.g.flip();
			if (this.spd != Math.round(euc.dash.live.spd)) this.spdF();
			// alarm events time graph
			if (euc.log.almL.includes(1)) {
				this.alF();
				this.bar=0;
			} else if ((5<=this.spd || 50<=this.topP) && euc.dash.info.get.makr=="Kingsong" || euc.dash.info.get.makr=="Veteran"){
				if (this.pwm!=euc.dash.live.pwm) {this.pwm=euc.dash.live.pwm; this.pwmF();}
				if (this.topP!=euc.dash.trip.pwm) {this.topP=euc.dash.trip.pwm; this.pwmMF();}
			} else if (!this.bar) { this.topP=-1; this.bar=1; this.barF();}
			//tmp/amp block
			if (!ew.def.dash.amp) {
				if (this.amp!=Math.round(euc.dash.live.amp)) this.ampF();
			}else
				if (this.tmp!=Math.round(euc.dash.live.tmp))	this.tmpF();
			//alarm block
			if (this.buzz!=euc.is.buzz) this.buzF();
			//spdMspeed block
			if (this.topS!=euc.dash.trip.topS.toFixed(1)) this.spMF();
			//buzzer/health block
			if (euc.dash.info.get.makr=="Kingsong"||euc.dash.info.get.makr=="Begode") {
				if (this.aTlt!=euc.dash.alrt.spd.max) this.limF();
			}else if (this.alrm!=euc.dash.alrt.pwr) this.alrF();
			//tmp/amp field
			if (ew.def.dash.amp){
				//if (this.ampL!=euc.log.ampL)
				this.amLF();
			}else if (this.tmp!=euc.dash.live.tmp.toFixed(1)) this.tmFF();
			//batery field
			if (!ew.def.dash.bat){
				if (this.volt!=euc.dash.live.volt.toFixed(2)) this.vltF();
			}else if (ew.def.dash.bat==1) {
				if (euc.dash.live.bat!=this.bat) this.batF();
			}else this.baLF();//if (this.batL!=euc.log.batL) this.baLF();
			//Mileage
			if (euc.dash.alrt.warn.txt) this.almTF();
			else if (this.trpL!=euc.dash.trip.last.toFixed(2)) this.mileage();
			this.afterScrOff=false;
		//off
		} else if (euc.state=="OFF")  {
			setTimeout(function(){
				face.go("dashOff",0);
			},250);
			this.afterScrOff=false;
			return;
		//rest
			} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,239);
				this.g.setColor(1,15);
				this.g.setFont("Vector",50);
				this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),95);
				this.g.flip();
				//this.spd=-1;
				this.spd=euc.dash.live.spd-1;
				this.pwm=-1;this.amp=-1;this.tmp=-1;this.bat=-1;this.trpL=-1;this.conn=0;this.lock=2;
				this.buzz=-1;this.volt=-1;this.alrm=-1;this.aTlt=-1;this.topS=-1;this.bar=0;
				//this.ampL.fill(1,0,1);this.batL.fill(1,0,1);
				this.run=true;
			}
		}
		euc.new=0;
		//refresh
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},20,this);
		this.afterScrOff=false;
	},
	spdF: function(){
		"ram";
		if ( Math.abs(euc.dash.live.spd-this.spd) <5 || this.afterScrOff) this.spd =Math.round(euc.dash.live.spd);
		else if (euc.dash.live.spd<this.spd) this.spd=Math.round(this.spd-(this.spd-euc.dash.live.spd)/2);
		else this.spd=Math.round(this.spd+(euc.dash.live.spd-this.spd)/2);
		//this.spd=Math.round(euc.dash.live.spd);
		this.g.setColor(0,(euc.dash.alrt.spd.cc==1)?0:this.spdC[euc.dash.alrt.spd.cc]);
		this.g.fillRect(43,54,197,170);
		this.g.setColor(1,(euc.dash.alrt.spd.cc==1)?14:15);
		if (100 <= this.spd) this.g.setFontVector(80);
		else this.g.setFontVector(130);
		this.g.drawString(Math.round(this.spd*this.fact),129-(this.g.stringWidth(Math.round(this.spd*this.fact))/2),(100 <= this.spd)?75:57);
		this.g.flip();
		if (this.spd==0 && this.topP<50) {
			this.topP=-1;
			this.bar=1;
			this.barF();
		}
	},
	alF: function(){
		this.g.setColor(0,13);
		this.g.clearRect(0,176,239,200);
		this.g.setColor(1,13);
		for (let i in euc.log.almL ){
			if (euc.log.almL[i]) w.gfx.fillRect(237-(i*12),(euc.log.almL[i])?180:195,237-((i*12)+10),195);
		}
		this.g.flip();
	},
	pwmF: function(){
		"ram";
		this.g.setColor(0,euc.dash.alrt.pwm.hapt.hi<=euc.dash.live.pwm?13:1);
		this.g.fillRect(0,176,191,200);
		this.g.setColor(1,50<=euc.dash.live.pwm?14:15);
		this.g.setFontVector(23);
		this.g.drawString(euc.dash.live.pwm,44-this.g.stringWidth(euc.dash.live.pwm),178);
		this.g.setFontVector(14);
		this.g.drawString("%",45,178);
		this.g.fillRect(59,180,59+euc.dash.live.pwm*1.32,187);
		this.g.flip();
	},
	pwmMF: function(){
		this.g.setColor(0,euc.dash.alrt.pwm.hapt.hi<=euc.dash.trip.pwm?13:1);
		this.g.fillRect(192,176,239,200);
		this.g.setFontVector(23);
		this.g.setColor(1,50<=euc.dash.trip.pwm?14:15);
		this.g.setFontVector(23);
		this.g.drawString(euc.dash.trip.pwm,239-this.g.stringWidth(euc.dash.trip.pwm),178);
		this.g.flip();
	},
	ampF: function(){
		this.amp=Math.round(euc.dash.live.amp);
		this.g.setColor(0,this.ampC[euc.dash.alrt.amp.cc]);
		this.g.fillRect(0,53,40,112);
		this.g.setColor(1,15);
		this.g.setFontVector(10);
		this.g.drawString("AMP", 11,59);
		this.g.setFontVector(29);
		this.g.drawString(this.amp|0, 22-(this.g.stringWidth(this.amp|0)/2),80);
		this.g.flip();
	},
	tmpF: function(){
		this.tmp=Math.round(euc.dash.live.tmp);
		this.g.setColor(0,this.tmpC[euc.dash.alrt.tmp.cc]);
		this.g.fillRect(0,53,40,112);
		this.g.setColor(1,15);
		this.g.setFontVector(10);
		this.g.drawString("TEMP", 7,59);
		let temp=(ew.def.dash.farn)?Math.round(this.tmp*1.8+32):Math.round(this.tmp);
		this.g.setFontVector((100<temp)?20:29);
		this.g.drawString(Math.round(this.tmp), 22-(this.g.stringWidth(Math.round(this.tmp))/2),80);
		this.g.flip();
	},
	buzF: function(){
		this.buzz=euc.is.buzz;
		if (!this.buzz&&euc.dash.info.get.makr=="Begode"&&euc.dash.alrt.mode==3){
			this.g.setColor(0,4);
			this.g.fillRect(0,115,40,173);
			this.g.setColor(1,11);
			this.g.setFontVector(14);
			this.g.drawString("PWM", 5,130);
			this.g.drawString("TILT", 4,145);
			this.g.flip();
		}else {
			this.g.setColor(0,(this.buzz)?13:1);
			this.g.fillRect(0,115,40,173);
			this.g.setColor(1,(this.buzz)?15:0);
			this.g.setFontVector(35);
			this.g.drawString("!", 19,130);
			this.g.flip();
		}
	},
	spMF: function(){
		this.topS=euc.dash.trip.topS.toFixed(1);
		this.g.setColor(0,1);
		this.g.fillRect(200,53,239,112);
		this.g.setColor(1,15);
		this.g.setFontVector(10);
		this.g.drawString("TOP", 210,59);
		this.g.setFontVector(29);
		this.g.drawString(Math.round(this.topS*this.fact), 222-(this.g.stringWidth(Math.round(this.topS*this.fact))/2),80);
		this.g.flip();
	},
	limF: function(){
		this.aTlt=euc.dash.alrt.spd.max;
		//if (euc.dash.info.get.makr=="Begode") this.g.setColor(0,(euc.dash.alrt.spd.tilt.val<=this.aTlt)?1:13);
		//else
		this.g.setColor(0,(euc.dash.live.spd+5<=this.aTlt)?1:13);
		this.g.fillRect(200,115,239,173);
		this.g.setColor(1,15);
		this.g.setFontVector(10);
		this.g.drawString("LIMIT", 207,120);
		this.g.setFontVector(29);
		this.g.drawString(Math.round(this.aTlt*this.fact), 222-(this.g.stringWidth(Math.round(this.aTlt*this.fact))/2),140);
		this.g.flip();
	},
	alrF: function(){
		this.alrm=euc.dash.alrt.pwr;
		this.g.setColor(0,1);
		this.g.fillRect(200,115,239,173);
		//this.g.setColor(1,0);
		//this.g.setFontVector(35);
		//this.g.drawString("B", 212,130);
		this.g.flip();
	},
	tmFF: function(){
		this.tmp=euc.dash.live.tmp.toFixed(1);
		this.g.setColor(0,this.tmpC[euc.dash.alrt.tmp.cc]);
		this.g.fillRect(0,0,119,50);
		this.g.setColor(1,15);
		if (euc.dash.info.get.makr=="Kingsong" || euc.dash.info.get.makr=="InmotionV10"){
			this.g.setFontVector(35);
			let temp= Math.round(((ew.def.dash.farn)?euc.dash.live.tmp* 1.8+32:this.tmp));
			let tempM=Math.round(((ew.def.dash.farn)?euc.dash.live.tmpM*1.8+32:euc.dash.live.tmpM));
			let size=3+this.g.stringWidth(temp);
			this.g.drawString(temp, 5,3);
			this.g.setFontVector(16);
			this.g.drawString((ew.def.dash.farn)?"°F":"°C",3+size,5);
			this.g.setFontVector(27);
			this.g.drawString(tempM,120-this.g.stringWidth(tempM),13);
			this.g.setFontVector(8);
			if (euc.dash.info.get.makr=="Kingsong")	   this.g.drawString("MOSFET            MOTOR", 7,40);
			if (euc.dash.info.get.makr=="InmotionV10") this.g.drawString("MOSFET          BATTERY", 7,40);
		}else{
			this.g.setFontVector(50);
			let temp=((ew.def.dash.farn)?this.tmp*1.8+32:this.tmp).toString().split(".");
			let size=5+this.g.stringWidth(temp[0]);
			this.g.drawString(temp[0], 5,3);
			if (temp[0]<100) {
				this.g.setFontVector(35);
				this.g.drawString("."+temp[1],size,17);
				size=size+this.g.stringWidth(temp[1]);
			}
			this.g.setFontVector(16);
			this.g.drawString((ew.def.dash.farn)?"°F":"°C",3+size,5);
		}
		this.g.flip();
	},
	amLF: function(){
		//this.ampL.set(euc.log.ampL);
		this.g.setColor(1,(1<euc.dash.alrt.amp.cc)?13:1);
		this.g.fillRect(0,0,119,50);
		this.g.setColor(0,15);
		//this.ampL.forEach(function(val,i){
		for (let i in euc.log.ampL ){
			w.gfx.fillRect(118-(i*6),(0<=euc.log.ampL[i])?50-(euc.log.ampL[i]*1.2):1,118-(i*6)-1,(0<=euc.log.ampL[i])?50:-euc.log.ampL[i]*2);
		}
		//});
		this.g.flip();
	},
	vltF: function(){
		this.volt=euc.dash.live.volt.toFixed(2);
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,15);
		this.g.setFontVector((this.volt<100)?40:35);
		this.g.drawString(this.volt,(this.volt<100)?135:125,0);
		this.g.setFontVector(10);
		this.g.drawString("VOLT",207,38);
		this.g.flip();
	},
	batF: function(){
		this.bat=euc.dash.live.bat;
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,15);
		this.g.setFontVector(50);
		this.g.drawString(this.bat,225-(this.g.stringWidth(this.bat)),3);
		this.g.setFontVector(20);
		this.g.drawString("%",227,8);
		this.g.flip();
	},
	baLF: function(){
		//this.batL.set(euc.log.batL);
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,15);
		//graph
		//this.batL.forEach(function(val,i){
		for (let i in euc.log.batL ){
			w.gfx.fillRect(238-(i*6),50-(euc.log.batL[i]/2),238-(i*6)-1,50);
		}
		//	w.gfx.fillRect(238-(i*6),50-(val/2),238-(i*6)-1,50);
		//});
		this.g.flip();
	},
	almTF: function(){
		if (this.almT==euc.dash.alrt.warn.txt) return;
		this.almT=euc.dash.alrt.warn.txt;
		this.g.setColor(0,13);
		this.g.fillRect(0,203,239,239);
		this.g.setColor(1,11);
		this.g.setFontVector(24);
		this.g.drawString(euc.dash.alrt.warn.txt, 120-(this.g.stringWidth(euc.dash.alrt.warn.txt)/2),212);
		this.g.flip();
	},
	mileage: function(){
		this.trpL=euc.dash.trip.last.toFixed(2);
		this.g.setColor(0,0);
		this.g.fillRect(0,203,239,239);
		this.g.setColor(1,11);
		this.g.setFontVector(35);
		this.g.drawString((this.trpL*this.trpF).toFixed(2),0,208);
		if (!ew.def.dash.clck) {//clock
			let d=(Date()).toString().split(' ');
			let t=(d[4]).toString().split(':');
			this.time=(t[0]+":"+t[1]);
			this.g.drawString(this.time, 240-(this.g.stringWidth(this.time)),208);
		}else
			this.g.drawString(Math.round(euc.dash.trip.totl*this.trpF),240-(this.g.stringWidth(Math.round(euc.dash.trip.totl*this.trpF))),208);
		//}
		this.g.flip();
	},
	barF: function(){
		this.g.setColor(1,1);
		this.g.fillRect(0,176,239,200); //mileage
		this.g.setColor(0,15);
		this.g.setFontVector(14); //mileage
		//if (euc.dash.info.get.makr=="NinebotE") {
		//	this.g.drawString("TRIP",2,180);
		//	this.g.drawString("TOT",101,180);
		//	this.g.drawString("LEFT",197,180);
		//} else {
			this.g.drawString("TRIP",2,183);
			this.g.drawString((ew.def.dash.mph)?"MPH":"KPH",107,183);
			this.g.drawString((!ew.def.dash.clck)?"CLOCK":"TOTAL",190,183);
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
		this.afterScrOff=true;
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
			face.go("clock",0);
		else {
			face.go(ew.is.dash[ew.def.dash.face],-1);
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
			if (ew.def.dash.bat==undefined || 1 < ew.def.dash.bat) ew.def.dash.bat=0; else ew.def.dash.bat++;
			face[0].bat=-1;face[0].volt=-1;//face[0].batL.fill(1,0,1);
			buzzer.nav([30,50,30]);
		}else if (x<120&&y<55){//tmp/amp
			if (ew.def.dash.amp==undefined) ew.def.dash.amp=0;
			ew.def.dash.amp=1-ew.def.dash.amp;
 			face[0].tmp=-1;face[0].amp=-1;//face[0].ampL.fill(1,0,1);
			buzzer.nav([30,50,30]);
		}else if (190<y){//mileage/time
			buzzer.nav([30,50,30]);
			if (euc.dash.alrt.warn.txt) {euc.dash.alrt.warn.txt=0;face[0].almT=-1;face[0].trpL=-1;return}
			if (ew.def.dash.clck==undefined) ew.def.dash.clck=0;
			ew.def.dash.clck=1-ew.def.dash.clck;
 			face[0].trpL=-1;face[0].barF();
		}else if (110<y&&y<195&&x<55&&euc.dash.info.get.makr=="Begode"){
			buzzer.nav([30,50,30]);
			face.go("dashBegodeAdvLimits",0);
			return;
		}else
			buzzer.nav(40);
		this.timeout();
		break;
    case 1: //slide down event
		if (ew.def.dash.face+1>=ew.is.dash.length)
			ew.def.dash.face=0;
		else
			ew.def.dash.face++;
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {
			face.go("settings",0);
			return;
		}
		this.timeout();
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):buzzer.nav(40);
		return;
    case 4: //slide right event (back action)
		face.go("clock",0);
		return;
    case 12: //touch and hold(long press) event
		this.timeout();
		buzzer.nav(40);
		break;
    }
};
