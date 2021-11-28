//dash digital

face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	old:set.def.bpp?0:1,
	g:w.gfx,
	spd:[],
	init: function(){
		this.buff={spd:-1,spdL:-1,spdM:-1,amp:-10,tmp:-1,bat:-1,volt:-1,buzz:-1,alrm:-1,conn:"OFF",lock:2,trpL:-1,bar:0};
		if ( euc.day[0] < Date().getHours() && Date().getHours() < euc.day[1] ) euc.night=0; else euc.night=1;
        if (this.old&&face.appPrev.startsWith("dash_")) {
			this.g.setColor(0,0);
			if (this.old)this.g.flip();	
		}else this.g.clear();
		this.spdC=[0,0,7,7];
		this.ampC=[1,2992,7,7];
		this.tmpC=[1,2992,7,7];
		this.batC=[4,1,7,7];
		this.batL=new Uint8Array(20);
		this.ampL = new Uint8Array(20);
		this.al=new Uint8Array(20);
		this.ampL.fill(1,0,1);
		this.fact=euc.dash.spdF*((set.def.dash.mph)?0.625:1);		
		this.trpF=euc.dash.trpF*((set.def.dash.mph)?0.625:1);
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (euc.state=="READY") {
			this.g.setColor(0,0);
			//this.g.fillRect(0,0,0,0);
			if (this.old)this.g.flip();
			if (this.buff.spd != Math.round(euc.dash.spd)) this.spdF();
			// alarm events time graph
			if (5<=this.buff.spd && this.al!=almL) this.alF();
			else if (5<=this.buff.spd && !euc.buzz && euc.dash.maker=="Kingsong") this.pwrF();
			else if (!this.buff.bar) { this.buff.bar=1; this.barF();}
			//tmp/amp block
			if (!set.def.dash.amp) {
				if (this.buff.amp!=Math.round(euc.dash.amp)) this.ampF();
			}else 
				if (this.buff.tmp!=Math.round(euc.dash.tmp))	this.tmpF();
			//alarm block
			if (this.buff.buzz!=euc.buzz) this.buzF(); 
			//spdMspeed block
			if (this.buff.spdM!=euc.dash.spdM.toFixed(1)) this.spMF(); 
			//buzzer/health block
			if (euc.dash.maker=="Kingsong") {
				if (this.buff.spdL!=euc.dash.spdL) this.spLF();
			}else if (this.buff.alrm!=euc.dash.alrm) this.alrF();	
			//tmp/amp field
			if (set.def.dash.amp){
				if (this.ampL!=ampL) this.amLF();				
			}else if (this.buff.tmp!=euc.dash.tmp.toFixed(1)) this.tmFF();
			//batery field
			if (!set.def.dash.bat){
				if (this.buff.volt!=euc.dash.volt.toFixed(2)) this.vltF();
			}else if (set.def.dash.bat==1) {
				if (euc.dash.bat!=this.bat) this.batF();
			}else if (this.batL!=batL) this.baLF();			
			//Mileage
			if (this.buff.trpL!=euc.dash.trpL.toFixed(2)) this.mileage();    
		//off
		//} else if (euc.state=="OFF")  {
		//	setTimeout(function(){
		//		face.go("dashOff",0);
		//	},250);
		//	return;
		//rest
		} else  {
			if (euc.state!=this.buff.conn) {
				this.buff.conn=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,239);
				this.g.setColor(1,15);
				this.g.setFont("Vector",50);
				this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),95);
				if (this.old)this.g.flip();
				this.buff.spd=-1;this.buff.amp=-1;this.buff.tmp=-1;this.bat=-1;this.buff.trpL=-1;this.buff.conn=0;this.buff.lock=2;
				this.buff.buzz=-1;this.buff.volt=-1;this.buff.spdM=-1;this.buff.alrm=-1;this.buff.spdL=-1;this.buff.spdM=-1;this.buff.bar=0;
				this.ampL.fill(1,0,1);this.batL.fill(1,0,1);
				this.run=true;
			}
		}
		if (!this.old)this.g.flip();
		euc.new=0;
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},50,this);
	},
	spdF: function(){
		"ram";
		this.buff.spd=Math.round(euc.dash.spd);
		this.g.setColor(0,(euc.dash.spdC==1)?0:this.spdC[euc.dash.spdC]);
		this.g.fillRect(43,54,197,170);
		this.g.setColor(1,(euc.dash.spdC==1)?13:15);
		if (100 <= this.buff.spd) {
			if (150 < this.buff.spd)  this.buff.spd=150;
			this.g.setFontVector(80);
		}else 
			this.g.setFontVector(130);
		//this.g.drawString((set.def.dashSpd)?euc.dash.spd:Math.round(euc.dash.spd/1.6),129-(this.g.stringWidth((set.def.dashSpd)?euc.dash.spd:Math.round(euc.dash.spd/1.6))/2),57); 
		this.g.drawString(Math.round(this.buff.spd*this.fact),129-(this.g.stringWidth(Math.round(this.buff.spd*this.fact))/2),57); 
		if (this.old)this.g.flip();
		if (this.buff.spd==0) { 
			this.buff.bar=1;
			this.barF();
		}
	},
	alF: function(){
		"ram";
		this.al.set(almL);
		//print(this.al,almL);
		this.g.setColor(0,1);
		this.g.clearRect(0,176,239,197);
		this.g.setColor(1,15);
		//graph
		//this.al.forEach(function(val,i){
		for (let i in this.al ){
			w.gfx.fillRect(237-(i*12),(this.al[i])?181:191,237-((i*12)+8),191);
		}
		//});
		if (this.old)this.g.flip();
	},
	ampF: function(){
		this.buff.amp=Math.round(euc.dash.amp);
		this.g.setColor(0,this.ampC[euc.dash.ampC]);
		this.g.fillRect(0,53,40,112);
		this.g.setColor(1,15);
		this.g.setFontVector(12);
		this.g.drawString("AMP", 8,59);
		this.g.setFontVector(32);
		this.g.drawString(this.buff.amp|0, 22-(this.g.stringWidth(this.buff.amp|0)/2),80); 
		if (this.old)this.g.flip();
	},
	tmpF: function(){
		this.buff.tmp=Math.round(euc.dash.tmp);
		this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
		this.g.fillRect(0,53,40,112);
		this.g.setColor(1,15);
		this.g.setFontVector(11);
		this.g.drawString("TEMP", 6,59);
		let temp=(set.def.dash.farn)?Math.round(this.buff.tmp*1.8+32):Math.round(this.buff.tmp);
		this.g.setFontVector((100<temp)?20:32);
		this.g.drawString(temp,22-(this.g.stringWidth(temp)/2),80); 
		//this.g.drawString(Math.round(this.buff.tmp), 22-(this.g.stringWidth(Math.round(this.buff.tmp))/2),80); 
		if (this.old)this.g.flip();
	},
	buzF: function(){
		this.buff.buzz=euc.buzz;
		this.g.setFontVector(35);
		this.g.setColor(0,(this.buff.buzz)?7:1);
		this.g.fillRect(0,115,40,173); 
		this.g.setColor(1,(this.buff.buzz)?15:0);
		this.g.drawString("!", 19,130); 
		if (this.old)this.g.flip();
	},
	spMF: function(){
		this.buff.spdM=euc.dash.spdM.toFixed(1);
		this.g.setColor(0,1);
		this.g.fillRect(200,53,239,112); 
		this.g.setColor(1,15);
		this.g.setFontVector(12);
		this.g.drawString("TOP", 208,59);
		this.g.setFontVector(32);
		this.g.drawString(Math.round(this.buff.spdM*this.fact), 222-(this.g.stringWidth(Math.round(this.buff.spdM*this.fact))/2),80); 
		if (this.old)this.g.flip();
	},	
	spLF: function(){
		this.buff.spdL=euc.dash.spdL;
		this.g.setColor(0,(euc.dash.lim[3]<=this.buff.spdL)?1:7);	
		this.g.fillRect(200,115,239,173); 
		this.g.setColor(1,15);
		this.g.setFontVector(11);
		this.g.drawString("LIMIT", 205,120);
		this.g.setFontVector(32);
		this.g.drawString(Math.round(this.buff.spdL*this.fact), 202,140); 
		if (this.old)this.g.flip();
	},	
	alrF: function(){
		this.buff.alrm=euc.dash.alrm;
		this.g.setColor(0,1);
		this.g.fillRect(200,115,239,173); 
		this.g.setColor(1,0);
		this.g.setFontVector(35);
		this.g.drawString("B", 212,130); 
		if (this.old)this.g.flip();
	},	
	tmFF: function(){
		this.buff.tmp=euc.dash.tmp.toFixed(1);
		this.g.setColor(0,this.tmpC[euc.dash.tmpC]);
		this.g.fillRect(0,0,119,50);       
		this.g.setColor(1,15);
		this.g.setFontVector(50);
		let temp=(set.def.dash.farn)?this.buff.tmp*1.8+32:this.buff.tmp;
		temp=(temp<100)?Number(temp).toFixed(1):Math.round(temp);
		let size=this.g.stringWidth(temp);
		this.g.drawString(temp, 0,3); 
		//this.g.setFontVector(13);
		//this.g.drawString("o",size-3,2); 
		this.g.setFontVector(16);
		this.g.drawString((set.def.dash.farn)?"°F":"°C",size-1,5); 
		if (this.old)this.g.flip();
	},	
	amLF: function(){
		this.ampL.set(ampL);
		this.g.setColor(1,(1<euc.dash.ampC)?7:1);
		this.g.fillRect(0,0,119,50);       
		this.g.setColor(0,15);
		//this.ampL.forEach(function(val,i){
		for (let i in this.ampL ){
			w.gfx.fillRect(118-(i*6),(this.ampL[i]<200)?50-(this.ampL[i]*1.2):1,118-(i*6)-1,(this.ampL[i]<200)?50:(255-this.ampL[i])*2);
		}
		//w.gfx.fillRect(118-(i*6),(val<200)?50-(val*1.2):1,118-(i*6)-1,(val<200)?50:(255-val)*2);
		//});
		if (this.old)this.g.flip();
	},	
	pwrF: function(){
		this.g.setColor(0,1);
		//this.g.setColor(0,7);
		this.g.fillRect(0,176,239,197); 
		//this.g.fillRect(euc.dash.pwr*2.4,176,239,197); 
		this.g.setColor(1,(50<=euc.dash.pwr)?(80<=euc.dash.pwr)?7:13:15);
		this.g.setFontVector(25);
		this.g.drawString(((euc.dash.pwr/euc.dash.spd)*10).toFixed(1),3,177);
		this.g.fillRect(80,182,80+euc.dash.pwr*1.6,192); 
		w.gfx.flip();
	},
	vltF: function(){
		this.buff.volt=euc.dash.volt.toFixed(2);
		this.g.setColor(0,this.batC[euc.dash.batC]);
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,15);
		this.g.setFontVector((this.buff.volt<100)?40:35);
		this.g.drawString(this.buff.volt,(this.buff.volt<100)?135:125,0); 
		this.g.setFontVector(13);
		this.g.drawString("VOLT",202,38);
		if (this.old)this.g.flip();
	},	
	batF: function(){
		this.buff.bat=euc.dash.bat;
		this.g.setColor(0,this.batC[euc.dash.batC]);
		this.g.fillRect(122,0,239,50);
		this.g.setColor(1,15);
		this.g.setFontVector(50);
		this.g.drawString(this.buff.bat,225-(this.g.stringWidth(this.buff.bat)),3);
		this.g.setFontVector(20);
		this.g.drawString("%",227,8);
		if (this.old)this.g.flip();
	},
	baLF: function(){
		this.batL.set(batL);
		this.g.setColor(0,this.batC[euc.dash.batC]);
		this.g.fillRect(122,0,239,50);       
		this.g.setColor(1,15);
		//graph
		//this.batL.forEach(function(val,i){
		for (let i in this.batL ){
			w.gfx.fillRect(238-(i*6),50-(this.batL[i]/2),238-(i*6)-1,50);
		}
		//	w.gfx.fillRect(238-(i*6),50-(val/2),238-(i*6)-1,50);
		//});
		if (this.old)this.g.flip();
	},	
	mileage: function(){
		this.buff.trpL=euc.dash.trpL.toFixed(2);
		this.g.setColor(0,0);
		this.g.fillRect(0,203,239,239);
		this.g.setColor(1,14);
		this.g.setFontVector(35);
		this.g.drawString((this.buff.trpL*this.trpF).toFixed(2),0,208); 
		if (!set.def.dash.clck) {//clock
			let d=(Date()).toString().split(' ');
			let t=(d[4]).toString().split(':');
			this.time=(t[0]+":"+t[1]);
			this.g.drawString(this.time, 240-(this.g.stringWidth(this.time)),208); //temp
		}else 	
			this.g.drawString(Math.round(euc.dash.trpT*this.trpF),240-(this.g.stringWidth(Math.round(euc.dash.trpT*this.trpF))),208); 
		//}
		if (this.old)this.g.flip();
	},
	barF: function(){
		this.g.setColor(1,1);
		this.g.fillRect(0,176,239,197); //mileage
		this.g.setColor(0,15);
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
		if (this.old)this.g.flip();
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
			if (set.def.dash.bat==undefined || 1 < set.def.dash.bat) set.def.dash.bat=0; else set.def.dash.bat++;
			face[0].bat=-1;face[0].volt=-1;face[0].batL.fill(1,0,1);
			buzzer(buz.ok);
		}else if (x<120&&y<55){//tmp/amp
			if (set.def.dash.amp==undefined) set.def.dash.amp=0;
			set.def.dash.amp=1-set.def.dash.amp;
 			face[0].tmp=-1;face[0].amp=-1;face[0].ampL.fill(1,0,1);
			buzzer(buz.ok);
		}else if (190<y){//mileage/time
			if (set.def.dash.clck==undefined) set.def.dash.clck=0;
			set.def.dash.clck=1-set.def.dash.clck;
 			face[0].trpL=-1;face[0].barF();
			buzzer(buz.ok);
		}else
			buzzer(buz.na);
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
			buzzer(buz.ok);
		}else if (Boolean(require("Storage").read("settings"))) {
			face.go("settings",0);
			return;
		}
		this.timeout();
		break;
    case 3: //slide left event
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):buzzer(buz.na);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		this.timeout();
		buzzer(buz.na);
		break;
    }
};