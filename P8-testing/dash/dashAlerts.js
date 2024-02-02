E.setFlags({pretokenise:1});
//dash  Alerts
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (face.appPrev!="settings"&&face.appPrev!="dashOptions")  face.last=face.appPrev;
       //if (!face.appPrev.startsWith("dash")) this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.fillRect(0,196,239,197);
        this.g.flip();
		if (this.page){
			this.btn(euc.dash.alrt.pwm.hapt.en,euc.dash.alrt.pwm.hapt.en?"PWM: "+euc.dash.alrt.pwm.hapt.hi+" %":"PWM DISABLED",25,120,37,4,1,0,0,239,97);
			this.btn(0,"",25,120,37,4,0,0,100,239,195);
		}else{
			this.btn(euc.dash.alrt.spd.hapt.en,"SPEED",25,60,37,4,1,0,0,119,97);
			this.btn(euc.dash.alrt.amp.hapt.en,"AMP",25,180,37,4,1,122,0,239,97);
			this.btn(euc.dash.alrt.tmp.hapt.en,"TEMP",25,60,136,4,1,0,100,119,195);
			this.btn(euc.dash.alrt.bat.hapt.en,"BATT",25,180,136,4,1,122,100,239,195);
		}
      	//if ( euc.dash.info.get.makr=="Kingsong" ||euc.dash.info.get.makr=="Begode" || euc.dash.info.get.makr=="Veteran" ) {
      	if ( euc.dash.info.get.makr=="Kingsong"  || euc.dash.info.get.makr=="Veteran") {
			this.g.setColor(0,0);
			this.g.fillRect(0,196,239,204);
			this.g.setColor(1,3);
			this.g.fillRect(75,200,165,204);
			this.g.flip();
			this.g.setColor(1,15);
			if (this.page)  this.g.fillRect(120,200,165,204);
			else this.g.fillRect(75,200,120,204);
			this.g.flip();
			this.g.setColor(0,0);
			this.g.fillRect(0,205,239,239);
		}else {
			this.g.setColor(0,0);
			this.g.fillRect(0,196,239,239);
		}
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("WATCH ALERTS",120-(this.g.stringWidth("WATCH ALERTS")/2),217);
		this.g.flip();
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return;
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2,sele){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size1);
			this.g.drawString(txt1,x1+6-(this.g.stringWidth(txt1)/2),y1);
   			if (txt2){
				this.g.setFont("Vector",size2);this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);
				if (sele) {this.g.drawString("<",10,y2); this.g.drawString(">",207,y2); }
			}
			this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214);
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				if (t.set) t.hapSw();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
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
		if (face.appPrev=="dashGarage") euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		return true;
	},
	show : function(){
		if (face.appPrev=="dashGarage") {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go("dashGarage",0);
		}else face.go(ew.is.dash[ew.def.dash.face],0);
		return;
	},
	clear: function(){
		return true;
	},
};
//touch
touchHandler[0]=function(e,x,y){
	this.timeout();
	switch (e) {
	case 5: //tap event
		if (face[0].set) {
			if (face[0].set=="spd") {//spd
				buzzer.nav([30,50,30]);
				if (y<=120){
					if (x<=120){
						if (1<euc.dash.alrt.spd.hapt.hi) euc.dash.alrt.spd.hapt.hi--;
					}else if (euc.dash.alrt.spd.hapt.hi<99)
						euc.dash.alrt.spd.hapt.hi++;

					if (!face[0].spds) { face[0].spds=1;face[0].spdr=0;
						face[0].btn(1,"RESOLUTION:",18,120,110,2,0,0,100,239,195,euc.dash.alrt.spd.hapt.step,50,125,140);
					}
					return setTimeout(function() {
						face[0].btn(1,"SPEED (in "+((ew.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,12,0,0,0,239,97,(ew.def.dash.mph)?(euc.dash.alrt.spd.hapt.hi*0.625).toFixed(1):euc.dash.alrt.spd.hapt.hi,50,125,40,1);
						face[0].ntfy("ALERT IF OVER "+((ew.def.dash.mph)?(euc.dash.alrt.spd.hapt.hi*0.625).toFixed(1):euc.dash.alrt.spd.hapt.hi) +((ew.def.dash.mph)?" MPH":" Km/h"),"",18,12,1);
					},0);
				}else if  (y<=195) { //RESOLUTION
					if (x<=120){
						if (1<euc.dash.alrt.spd.hapt.step) euc.dash.alrt.spd.hapt.step--;
					}else if (euc.dash.alrt.spd.hapt.step<5)
						euc.dash.alrt.spd.hapt.step++;
					if (!face[0].spdr) { face[0].spdr=1;face[0].spds=0;
						face[0].btn(1,"SPEED (in "+((ew.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,1,0,0,0,239,97,(ew.def.dash.mph)?(euc.dash.alrt.spd.hapt.hi*0.625).toFixed(1):euc.dash.alrt.spd.hapt.hi,50,125,40);
					}
					return setTimeout(function() {
						face[0].btn(1,"RESOLUTION:",18,120,110,12,0,0,100,239,195,euc.dash.alrt.spd.hapt.step,50,125,140,1);
						face[0].ntfy("1 PULSE PER "+euc.dash.alrt.spd.hapt.step+((ew.def.dash.mph)?" MPH":"KPH")+" > "+((ew.def.dash.mph)?Math.round(euc.dash.alrt.spd.hapt.hi*0.625):euc.dash.alrt.spd.hapt.hi),"",18,12,1);
						},0);
				}  else {
					euc.dash.alrt.spd.hapt.en=1-euc.dash.alrt.spd.hapt.en;
					face[0].btn(euc.dash.alrt.spd.hapt.en,euc.dash.alrt.spd.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else if (face[0].set=="pwm") {
				buzzer.nav([30,50,30]);
				if (y<=140){ //pwm
					if (x<=120) {
						if (50<euc.dash.alrt.pwm.hapt.hi) euc.dash.alrt.pwm.hapt.hi--;
					}else if (euc.dash.alrt.pwm.hapt.hi<90)
						euc.dash.alrt.pwm.hapt.hi++;
					face[0].btn(1,euc.dash.alrt.pwm.hapt.hi,50,120,70,1,0,80,60,150,130);
					face[0].ntfy("ALERT IF OVER "+euc.dash.alrt.pwm.hapt.hi+" %","",18,12,1);
				}else if  (y<=195) {
				}  else { //haptic
					euc.dash.alrt.pwm.hapt.en=1-euc.dash.alrt.pwm.hapt.en;
					face[0].btn(euc.dash.alrt.pwm.hapt.en,euc.dash.alrt.pwm.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else if (face[0].set=="amp") { //amp
				buzzer.nav([30,50,30]);
				if (y<=65){ //uphill
					if (120<=x&&euc.dash.alrt.amp.hapt.hi<50) euc.dash.alrt.amp.hapt.hi++;
					else if (x<=120&&10<euc.dash.alrt.amp.hapt.hi) euc.dash.alrt.amp.hapt.hi--;
					if (!face[0].ampa) { face[0].ampa=1;face[0].ampd=0;face[0].ampr=0;
						face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.alrt.amp.hapt.low+ " A",35,182,84);
						face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.alrt.amp.hapt.step+ " A",35,190,150);
						face[0].ntfy("ALERT IF OVER "+euc.dash.alrt.amp.hapt.hi+" A","",18,1,1);
					}
					return setTimeout(function() {
						face[0].btn(1,"UPHILL:",20,65,23,12,0,0,0,239,63,euc.dash.alrt.amp.hapt.hi+" A",35,180,16);
						face[0].ntfy("ALERT IF OVER "+euc.dash.alrt.amp.hapt.hi+" A","",18,12,1);
					},0);
				}else if (65<=y&&y<=133){//braking
					if (x<=120&&euc.dash.alrt.amp.hapt.low<-5) euc.dash.alrt.amp.hapt.low++;
					else if (120<=x&&-40<euc.dash.alrt.amp.hapt.low) euc.dash.alrt.amp.hapt.low--;
					if (!face[0].ampd) { face[0].ampa=0;face[0].ampd=1;face[0].ampr=0;
						face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.alrt.amp.hapt.hi+" A",35,180,16);
						face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.alrt.amp.hapt.step+ " A",35,190,150);
					}
   					return setTimeout(function() {
						face[0].btn(1,"BRAKING:",20,65,90,12,0,0,66,239,132,euc.dash.alrt.amp.hapt.low+ " A",35,182,84);
						face[0].ntfy("ALERT IF UNDER "+euc.dash.alrt.amp.hapt.low+" A","",18,12,1);
					},0);
				}else  if  (y<=195) {//RESOLUTION
					if (120<=x&&euc.dash.alrt.amp.hapt.step<3) euc.dash.alrt.amp.hapt.step++;
					else if (x<=120&&1<euc.dash.alrt.amp.hapt.step) euc.dash.alrt.amp.hapt.step--;
					if (!face[0].ampr) { face[0].ampa=0;face[0].ampd=0;face[0].ampr=1;
						face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.alrt.amp.hapt.low+ " A",35,182,84);
						face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.alrt.amp.hapt.hi+" A",35,180,16);
						face[0].ntfy("ONE PULSE PER "+euc.dash.alrt.amp.hapt.step+ " A","",18,1,1);
					}
					return setTimeout(function() {
						face[0].btn(1,"RESOLUTION:",17,70,157,12,0,0,135,239,195,euc.dash.alrt.amp.hapt.step+ " A",35,190,150);
						face[0].ntfy("ONE PULSE PER "+euc.dash.alrt.amp.hapt.step+ " A","",18,12,1);
					},0);
				}  else {
					euc.dash.alrt.amp.hapt.en=1-euc.dash.alrt.amp.hapt.en;
					face[0].btn(euc.dash.alrt.amp.hapt.en,euc.dash.alrt.amp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
            }else if (face[0].set=="temp") { //temp
				if (y<=120){ //
					buzzer.nav([30,50,30]);
					if (120<=x&&euc.dash.alrt.tmp.hapt.hi<90) euc.dash.alrt.tmp.hapt.hi++;
					else if (x<=120&&25<euc.dash.alrt.tmp.hapt.hi) euc.dash.alrt.tmp.hapt.hi--;
					return setTimeout(function() {
						face[0].btn(1,"SET HI-TEMP (in "+((ew.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(ew.def.dash.farn)?(euc.dash.alrt.tmp.hapt.hi*1.8+32).toFixed(1):euc.dash.alrt.tmp.hapt.hi,50,125,40,1);
						face[0].ntfy("ALERT IF OVER "+((ew.def.dash.farn)?Math.round(euc.dash.alrt.tmp.hapt.hi*1.8+32):euc.dash.alrt.tmp.hapt.hi)+((ew.def.dash.farn)?" F":" C"),"",18,12,1);
					},0);
				}else  if  (195<=y) {
					buzzer.nav([30,50,30]);
					euc.dash.alrt.tmp.hapt.en=1-euc.dash.alrt.tmp.hapt.en;
					face[0].btn(euc.dash.alrt.tmp.hapt.en,euc.dash.alrt.tmp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					face[0].btn(euc.dash.alrt.tmp.hapt.en,"TEMP",25,60,136,4,1,0,100,119,195);
				}else if (120<=x) {
					buzzer.nav([30,50,30]);
					face[0].set="batt";
					face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.alrt.bat.hapt.low,50,125,40,1);
					face[0].btn(euc.dash.alrt.bat.hapt.en,euc.dash.alrt.bat.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					face[0].hapSw=function(){
						face[0].btn(euc.dash.alrt.bat.hapt.en,euc.dash.alrt.bat.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					}
				}else{ //back
					buzzer.nav(40);
                }
            }else if (face[0].set=="batt") { //bat
				if (y<=120){ //
					buzzer.nav([30,50,30]);
					if (120<=x&&euc.dash.alrt.bat.hapt.low<60) euc.dash.alrt.bat.hapt.low++;
   			  		else if (x<=120&&5<euc.dash.alrt.bat.hapt.low) euc.dash.alrt.bat.hapt.low--;
					return setTimeout(function() {
						face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.alrt.bat.hapt.low,50,125,40,1);
						face[0].ntfy("ALERT IF UNDER "+euc.dash.alrt.bat.hapt.low+" %","",18,12,1);
					},0);
				}else  if  (195<=y) {
					buzzer.nav([30,50,30]);
					euc.dash.alrt.bat.hapt.en=1-euc.dash.alrt.bat.hapt.en;
					face[0].btn(euc.dash.alrt.bat.hapt.en,euc.dash.alrt.bat.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					face[0].btn(euc.dash.alrt.bat.hapt.en,"BATT",25,180,136,4,1,122,100,239,195);
				}else if (x<=120) {
					buzzer.nav([30,50,30]);
					face[0].set="temp";
					face[0].btn(1,"SET HI-TEMP (in "+((ew.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(ew.def.dash.farn)?(euc.dash.alrt.tmp.hapt.hi*1.8+32).toFixed(1):euc.dash.alrt.tmp.hapt.hi,50,125,40,1);
					face[0].btn(euc.dash.alrt.tmp.hapt.en,euc.dash.alrt.tmp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					face[0].hapSw=function(){
						face[0].btn(euc.dash.alrt.tmp.hapt.en,euc.dash.alrt.tmp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
					}
				}else{
					buzzer.nav(40);
                }
			}else  {buzzer.nav(40);face[0].set=0;face[0].init();}
        }else if (face[0].page){
			if (y<100) { //pwm
				face[0].set="pwm";
				buzzer.nav([30,50,30]);
				face[0].btn(1,"PWM LIMIT (IN %)",18,120,20,1,0,0,0,239,145,euc.dash.alrt.pwm.hapt.hi,50,125,70,1);
				if ( euc.dash.info.get.makr=="Begode")
					face[0].btn(1,"CALIBRATE PWM",19,120,160,2,0,0,148,239,195);
				else
					face[0].btn(0,"",19,120,160,0,0,0,148,239,195);
				face[0].btn(euc.dash.alrt.pwm.hapt.en,euc.dash.alrt.pwm.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				face[0].hapSw=function(){
					face[0].btn(euc.dash.alrt.pwm.hapt.en,euc.dash.alrt.pwm.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else buzzer.nav(40);
		}else {
			if (x<=120&&y<100) { //spd
				face[0].set="spd";
				buzzer.nav([30,50,30]);
				face[0].btn(1,"SPEED (in "+((ew.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,1,0,0,0,239,97,(ew.def.dash.mph)?(euc.dash.alrt.spd.hapt.hi*0.625).toFixed(1):euc.dash.alrt.spd.hapt.hi,50,125,40);
				face[0].btn(1,"RESOLUTION:",18,120,110,2,0,0,100,239,195,euc.dash.alrt.spd.hapt.step,50,125,140);
				face[0].btn(euc.dash.alrt.spd.hapt.en,euc.dash.alrt.spd.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				face[0].hapSw=function(){
					face[0].btn(euc.dash.alrt.spd.hapt.en,euc.dash.alrt.spd.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else if (120<=x&&y<=100) { //amp
				face[0].set="amp";
				buzzer.nav([30,50,30]);
				w.gfx.setColor(0,0);
				w.gfx.fillRect(0,64,239,65);
				w.gfx.flip();
				face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.alrt.amp.hapt.hi+" A",35,180,16);
				face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.alrt.amp.hapt.low+ " A",35,182,84);
				face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.alrt.amp.hapt.step+ " A",35,190,150);
				face[0].btn(euc.dash.alrt.amp.hapt.en,euc.dash.alrt.amp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				face[0].hapSw=function(){
					face[0].btn(euc.dash.alrt.amp.hapt.en,euc.dash.alrt.amp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else if (x<=120&&100<=y&&y<=195) { //temp
				face[0].set="temp";
				buzzer.nav([30,50,30]);
				//face[0].btn(1,"TEMP",25,60,136,12,0,0,100,119,195);
				face[0].btn(1,"SET HI-TEMP (in "+((ew.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(ew.def.dash.farn)?(euc.dash.alrt.tmp.hapt.hi*1.8+32).toFixed(1):euc.dash.alrt.tmp.hapt.hi,50,125,40,1);
				face[0].btn(euc.dash.alrt.tmp.hapt.en,euc.dash.alrt.tmp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				face[0].hapSw=function(){
					face[0].btn(euc.dash.alrt.tmp.hapt.en,euc.dash.alrt.tmp.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else if (120<=x&&100<=y&&y<=195) { //batt
				face[0].set="batt";
				buzzer.nav([30,50,30]);
				//face[0].btn(1,"BATT",25,180,136,12,0,122,100,239,195);
				face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.alrt.bat.hapt.low,50,125,40,1);
				face[0].btn(euc.dash.alrt.bat.hapt.en,euc.dash.alrt.bat.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				face[0].hapSw=function(){
					face[0].btn(euc.dash.alrt.bat.hapt.en,euc.dash.alrt.bat.hapt.en?"HAPTIC ENABLED":"HAPTIC DISABLED",18,120,215,4,1,0,198,239,239);
				}
			}else buzzer.nav(40);
		}
		break;
	case 1: //slide down event
		if (face[0].set) {
			face[0].set=0;
			w.gfx.setColor(0,0);
			w.gfx.drawLine (0,98,239,98);
			w.gfx.drawLine (0,99,239,99);
			w.gfx.flip();
			w.gfx.drawLine (120,0,120,195);
			w.gfx.drawLine (121,0,121,195);
			w.gfx.flip();
			face[0].init();return;
		}
		if (face.appPrev=="dashGarage") {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go("dashGarage",0);
			return;
		}else face.go(ew.is.dash[ew.def.dash.face],0);
		return;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up.
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else //if (y>100) {
			face[0].set=0;
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
		//} else {buzzer.nav(40);}
		break;
	case 3: //slide left event
		//if ( !face[0].set &&!face[0].page&& (euc.dash.info.get.makr=="Kingsong" ||euc.dash.info.get.makr=="Begode" || euc.dash.info.get.makr=="Veteran" )) {
		if ( !face[0].set &&!face[0].page&& (euc.dash.info.get.makr=="Kingsong" || euc.dash.info.get.makr=="Veteran")) {
			face[0].page=1
			face[0].init();return;
			//face.go("dashAlertsPwm",0);
			//return;
		}else
			buzzer.nav(40);
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].set=0;
			w.gfx.setColor(0,0);
			w.gfx.drawLine (0,98,239,98);
			w.gfx.drawLine (0,99,239,99);
			w.gfx.flip();
			w.gfx.drawLine (120,0,120,195);
			w.gfx.drawLine (121,0,121,195);
			w.gfx.flip();
			face[0].init();return;
		}
		if (face[0].page) {
			face[0].page=0;
			face[0].init();return;
		}
		if (face.appPrev=="dashGarage") {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go("dashGarage",0);
			return;
		}else if (face.appPrev=="settings"||face.appPrev=="dashOptions") {
			face.go(face.last,0);
			return;
		}else face.go(face.appPrev,0);
		return;
	case 12: //hold event
		if (face[0].set) {
		    w.gfx.setColor(0,0);
		    w.gfx.drawLine (0,98,239,98);
		    w.gfx.drawLine (0,99,239,99);
            w.gfx.flip();
		    w.gfx.drawLine (120,0,120,195);
          	w.gfx.drawLine (121,0,121,195);
            w.gfx.flip();
			face[0].set=0;face[0].init();
			buzzer.nav([30,50,30]);
        }else
			buzzer.nav(40);
		break;
  }
};
