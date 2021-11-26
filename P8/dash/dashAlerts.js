//dash  Alerts
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
		if (face.appPrev!="settings"&&face.appPrev!="dashOptions")  face.last=face.appPrev;
       //if (!face.appPrev.startsWith("dash")) this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();		
		this.g.fillRect(0,196,239,197);
        this.g.flip();		
		this.btn(euc.dash.hapS,"SPEED",25,60,37,4,1,0,0,119,97);
		this.btn(euc.dash.hapA,"AMP",25,180,37,4,1,122,0,239,97);
		this.btn(euc.dash.hapT,"TEMP",25,60,136,4,1,0,100,119,195);
        this.btn(euc.dash.hapB,"BATT",25,180,136,4,1,122,100,239,195);			
		this.ntfy("HOLD FOR HAPTIC","",22,4,1);
        this.run=true;
	},
	show : function(){
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
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
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("WATCH ALERTS",120-(t.g.stringWidth("WATCH ALERTS")/2),217); 
				t.g.flip();

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
		}else face.go(set.dash[set.def.dash.face],0);
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
			buzzer([30,50,30]);
			if (face[0].set=="spd") {
				if (y<=120){ //spd
					if (x<=120){ if (1<euc.dash.spd1) euc.dash.spd1--;
					}else if (euc.dash.spd1<99) euc.dash.spd1++;
                    euc.dash.haSv="spd1";
					if (!face[0].spds) { face[0].spds=1;face[0].spdr=0;
						face[0].btn(1,"RESOLUTION:",18,120,110,2,0,0,100,239,195,euc.dash.spdS,50,125,140);
					}
					return setTimeout(function() {
						face[0].btn(1,"SPEED (in "+((set.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,12,0,0,0,239,97,(set.def.dash.mph)?(euc.dash[euc.dash.haSv]*0.625).toFixed(1):euc.dash[euc.dash.haSv],50,125,40,1);
						face[0].ntfy("ALERT IF OVER "+((set.def.dash.mph)?(euc.dash[euc.dash.haSv]*0.625).toFixed(1):euc.dash[euc.dash.haSv]) +((set.def.dash.mph)?" MPH":" Km/h"),"",18,12,1);
					},0);
				}else{ //RESOLUTION
					if (x<=120){ if (1<euc.dash.spdS) euc.dash.spdS--;
					}else if (euc.dash.spdS<5) euc.dash.spdS++;
					if (!face[0].spdr) { face[0].spdr=1;face[0].spds=0;
						face[0].btn(1,"SPEED (in "+((set.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,1,0,0,0,239,97,(set.def.dash.mph)?(euc.dash[euc.dash.haSv]*0.625).toFixed(1):euc.dash[euc.dash.haSv],50,125,40);
					}
					return setTimeout(function() {
						face[0].btn(1,"RESOLUTION:",18,120,110,12,0,0,100,239,195,euc.dash.spdS,50,125,140,1);
						face[0].ntfy("1 PULSE PER "+euc.dash.spdS+((set.def.dash.mph)?" MPH":"KPH")+" > "+((set.def.dash.mph)?Math.round(euc.dash[euc.dash.haSv]*0.625):euc.dash[euc.dash.haSv]),"",18,12,1);
						},0);
				}  
			}else if (face[0].set=="amp") { //amp
				if (y<=65){ //uphill
					if (120<=x&&euc.dash.ampH<50) euc.dash.ampH++;
					else if (x<=120&&10<euc.dash.ampH) euc.dash.ampH--;
					if (!face[0].ampa) { face[0].ampa=1;face[0].ampd=0;face[0].ampr=0;
						face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.ampL+ " A",35,182,84);
						face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.ampS+ " A",35,190,150);
						face[0].ntfy("ALERT IF OVER "+euc.dash.ampH+" A","",18,1,1);						
					}
					return setTimeout(function() {
						face[0].btn(1,"UPHILL:",20,65,23,12,0,0,0,239,63,euc.dash.ampH+" A",35,180,16);
						face[0].ntfy("ALERT IF OVER "+euc.dash.ampH+" A","",18,12,1);						
					},0);
				}else if (65<=y&&y<=133){//braking
					if (x<=120&&euc.dash.ampL<-5) euc.dash.ampL++;
					else if (120<=x&&-40<euc.dash.ampL) euc.dash.ampL--;
					if (!face[0].ampd) { face[0].ampa=0;face[0].ampd=1;face[0].ampr=0;
						face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.ampH+" A",35,180,16);
						face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.ampS+ " A",35,190,150);
					}
   					return setTimeout(function() {
						face[0].btn(1,"BRAKING:",20,65,90,12,0,0,66,239,132,euc.dash.ampL+ " A",35,182,84);
						face[0].ntfy("ALERT IF UNDER "+euc.dash.ampL+" A","",18,12,1);   
					},0);
				}else {//RESOLUTION
					if (120<=x&&euc.dash.ampS<3) euc.dash.ampS++;
					else if (x<=120&&1<euc.dash.ampS) euc.dash.ampS--;
					if (!face[0].ampr) { face[0].ampa=0;face[0].ampd=0;face[0].ampr=1;
						face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.ampL+ " A",35,182,84);
						face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.ampH+" A",35,180,16);
						face[0].ntfy("ONE PULSE PER "+euc.dash.ampS+ " A","",18,1,1);
					}
					return setTimeout(function() {
						face[0].btn(1,"RESOLUTION:",17,70,157,12,0,0,135,239,195,euc.dash.ampS+ " A",35,190,150);
						face[0].ntfy("ONE PULSE PER "+euc.dash.ampS+ " A","",18,12,1);
					},0);
				}
            }else if (face[0].set=="temp") { //temp
              if (y<=120){ //
					if (120<=x&&euc.dash.tmpH<90) euc.dash.tmpH++;
					else if (x<=120&&25<euc.dash.tmpH) euc.dash.tmpH--;
					return setTimeout(function() {
						face[0].btn(1,"SET HI-TEMP (in "+((set.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(set.def.dash.farn)?(euc.dash.tmpH*1.8+32).toFixed(1):euc.dash.tmpH,50,125,40,1);
						face[0].ntfy("ALERT IF OVER "+((set.def.dash.farn)?Math.round(euc.dash.tmpH*1.8+32):euc.dash.tmpH)+((set.def.dash.farn)?" F":" C"),"",18,12,1);
					},0);
				}else if (120<=x) {
					face[0].set="batt";
					return setTimeout(function() {
						face[0].btn(euc.dash.hapT,"TEMP",25,60,136,4,1,0,100,119,195);
						face[0].btn(1,"BATT",25,180,136,12,0,122,100,239,195);	
						face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.batL,50,125,40,1);
					},0);
				}else{ //back
		            w.gfx.setColor(0,0);
					w.gfx.drawLine (120,0,120,97);
					w.gfx.drawLine (121,0,121,97);
					w.gfx.flip();
					face[0].btn(euc.dash.hapT,"TEMP",25,60,136,4,1,0,100,119,195);
					face[0].set=0;face[0].init();
                }
            }else if (face[0].set=="batt") { //bat
				if (y<=120){ //
					if (120<=x&&euc.dash.batL<60) euc.dash.batL++;
   			  		else if (x<=120&&5<euc.dash.batL) euc.dash.batL--;
					return setTimeout(function() {
						face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.batL,50,125,40,1);
						face[0].ntfy("ALERT IF UNDER "+euc.dash.batL+" %","",18,12,1);
					},0);
				}else if (x<=120) {
					face[0].set="temp";
					return setTimeout(function() {
						face[0].btn(euc.dash.hapB,"BATT",25,180,136,4,1,122,100,239,195);	
						face[0].btn(1,"TEMP",25,60,136,12,0,0,100,119,195);
						face[0].btn(1,"SET HI-TEMP (in "+((set.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(set.def.dash.farn)?(euc.dash.tmpH*1.8+32).toFixed(1):euc.dash.tmpH,50,125,40,1);
					},0);
				}else{ //back
           		    w.gfx.setColor(0,0);
					w.gfx.drawLine (120,0,120,97);
					w.gfx.drawLine (121,0,121,97);
					w.gfx.flip();
					face[0].btn(euc.dash.hapB,"BATT",25,180,136,4,1,122,100,239,195);	
					face[0].set=0;face[0].init();
                }
			}else  {buzzer(40);face[0].set=0;face[0].init();}
        }else if (x<=120&&y<100) { //spd
			face[0].set="spd";
            buzzer([30,50,30]);
			face[0].btn(1,"SPEED (in "+((set.def.dash.mph)?"MPH)":"Km/h)"),18,120,8,1,0,0,0,239,97,(set.def.dash.mph)?(euc.dash[euc.dash.haSv]*0.625).toFixed(1):euc.dash[euc.dash.haSv],50,125,40);
			face[0].btn(1,"RESOLUTION:",18,120,110,2,0,0,100,239,195,euc.dash.spdS,50,125,140);
		}else if (120<=x&&y<=100) { //amp
			face[0].set="amp";
			buzzer([30,50,30]);
            w.gfx.setColor(0,0);
	    	w.gfx.fillRect(0,64,239,65);
    		w.gfx.flip();
            face[0].btn(1,"UPHILL:",20,65,23,2,0,0,0,239,63,euc.dash.ampH+" A",35,180,16);
			face[0].btn(1,"BRAKING:",20,65,90,1,0,0,66,239,132,euc.dash.ampL+ " A",35,182,84);
			face[0].btn(1,"RESOLUTION:",17,70,157,2,0,0,135,239,195,euc.dash.ampS+ " A",35,190,150);
		}else if (x<=120&&100<=y) { //temp
			face[0].set="temp";
            buzzer([30,50,30]);
			face[0].btn(1,"TEMP",25,60,136,12,0,0,100,119,195);
            face[0].btn(1,"SET HI-TEMP (in "+((set.def.dash.farn)?"F)":"C)"),18,120,8,12,0,0,0,239,97,(set.def.dash.farn)?(euc.dash.tmpH*1.8+32).toFixed(1):euc.dash.tmpH,50,125,40,1);
		}else if (120<=x&&100<=y) { //batt
			face[0].set="batt";
            buzzer([30,50,30]);
			face[0].btn(1,"BATT",25,180,136,12,0,122,100,239,195);	
            face[0].btn(1,"SET LOW-BATT (in %)",18,120,8,12,0,0,0,239,97,euc.dash.batL,50,125,40,1);
		}else buzzer([30,50,30]);		
		break;
	case 1: //slide down event
		if (face[0].set) { 
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
		}else face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else //if (y>100) {
			face[0].set=0;
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		//} else {buzzer(40);}
		
		break;
	case 3: //slide left event
		buzzer(40);
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
			buzzer([30,50,30]);	
        }else if (x<=120&&y<100) { //Speed
			euc.dash.hapS=1-euc.dash.hapS;
			face[0].btn(euc.dash.hapS,"SPEED",25,60,37,4,1,0,0,119,97);
			face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",22,(euc.dash.hapS)?4:1,euc.dash.hapS);
			buzzer([30,50,30]);
		}else if (120<=x&&y<=100) { //Ampere
			euc.dash.hapA=1-euc.dash.hapA;
			face[0].btn(euc.dash.hapA,"AMP",25,180,37,4,1,122,0,239,97);
			face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",22,(euc.dash.hapA)?4:1,euc.dash.hapA);
			buzzer([30,50,30]);
		}else if (x<=120&&100<=y) { //Temp
			euc.dash.hapT=1-euc.dash.hapT;
			face[0].btn(euc.dash.hapT,"TEMP",25,60,136,4,1,0,100,119,195);
			face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",22,(euc.dash.hapT)?4:1,euc.dash.hapT);
			buzzer([30,50,30]);		
		}else if (120<=x&&100<=y) { //Batt
			euc.dash.hapB=1-euc.dash.hapB;
			face[0].btn(euc.dash.hapB,"BATT",25,180,136,4,1,122,100,239,195);
			face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",22,(euc.dash.hapB)?4:1,euc.dash.hapB);
			buzzer([30,50,30]);						
			}else buzzer([30,50,30]);
		
		break;
  }
};
