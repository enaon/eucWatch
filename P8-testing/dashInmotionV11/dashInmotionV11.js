//Inmotion V11settings






face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		euc.is.busy=1;//stop bt loop-accept commands.
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
 		if (!this.set&&(face.appPrev.startsWith("dash_")||face.appPrev==="settings")) this.g.clear();
        this.set=0;
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("SETTINGS",120-(this.g.stringWidth("SETTINGS")/2),217); 
		this.g.flip();
		//
        this.btn(euc.dash.opt.lght.HL,"LIGHT",18,60,20,4,1,0,0,119,97,(euc.dash.opt.lght.HL)?"ON":"OFF",25,60,55);
		this.btn((euc.dash.alrt.spd.hapt.en||euc.dash.alrt.amp.hapt.en||euc.dash.alrt.tmp.hapt.en||euc.dash.alrt.bat.hapt.en),"WATCH",18,185,20,4,1,122,0,239,97,"ALERTS",22,185,55);		
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		this.btn(euc.dash.opt.tpms,(euc.dash.opt.tpms)?euc.dash.opt.tpms:"TPMS",18,60,115,(euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.opt.tpms].time<1800)?(tpms.euc[euc.dash.opt.tpms].alrm)?13:4:1,1,0,100,119,195,(euc.dash.opt.tpms)?(tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].psi)?Math.round(tpms.euc[euc.dash.opt.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",(euc.dash.opt.tpms)?32:28,60,150); //3				
        this.btn(euc.dash.opt.horn.en,"HORN",25,185,136,4,1,122,100,239,195);	
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size1);	
			this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
   			if (txt2){this.g.setFont("Vector",size2);	
            this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
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
				t.g.setFont("Vector",22);
		        t.g.drawString("SETTINGS",120-(t.g.stringWidth("SETTINGS")/2),217); 
				t.g.flip();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
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
face[0].menu={};
face[0].menu.full= function(title,titleSize,value,valueSize,frontColor,backColor,init){
	if (!init){
		w.gfx.setColor(0,backColor);
	    w.gfx.fillRect(50,50,195,150);                    
        w.gfx.setColor(1,15);
		w.gfx.setFont("Vector",valueSize);
		w.gfx.drawString(value,130-(w.gfx.stringWidth(value)/2),65); 		
	    w.gfx.flip();
	}else{
		w.gfx.setColor(0,backColor);
		w.gfx.fillRect(0,0,239,195);
		w.gfx.setColor(1,15);
		w.gfx.setFont("Vector",titleSize);
		w.gfx.drawString(title,120-(w.gfx.stringWidth(title)/2),10); 		
		w.gfx.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,70);
		w.gfx.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,70);
		w.gfx.flip(); 
		w.gfx.setColor(1,15);
		w.gfx.setFont("Vector",valueSize);
		w.gfx.drawString(value,130-(w.gfx.stringWidth(value)/2),65); 		
		w.gfx.flip(); 
	}
};


//loop face
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		euc.is.busy=0;euc.wri("live");
		face.go(ew.is.dash[ew.def.dash.face],0);
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
	case 5:  //tap/hold event
		  if (face[0].sub) {
			if (face[0].sub==="horn") {
				if ( x<=120 && y <= 170 ){
					euc.dash.opt.horn.mode=euc.dash.opt.horn.mode-1;if (euc.dash.opt.horn.mode<=1)euc.dash.opt.horn.mode=1;
					face[0].menu.full("SELECT SOUND",20,euc.dash.opt.horn.mode,80,1453,1365);
					euc.wri("playSound",euc.dash.opt.horn.mode);
					buzzer.nav([30,50,30]);
				}else if ( 120 <=x  && y <= 170 ) {
					euc.dash.opt.horn.mode=euc.dash.opt.horn.mode+1;if (30<=euc.dash.opt.horn.mode)euc.dash.opt.horn.mode=30;
					face[0].menu.full("SELECT SOUND",20,euc.dash.opt.horn.mode,80,1453,1365);
					euc.wri("playSound",euc.dash.opt.horn.mode);
					buzzer.nav([30,50,30]);
				}else {
					face[0].sub=0;
					face[0].init();
				}
			}else {
				face[0].sub=0;
				face[0].init();
			}
			this.timeout();
			return;
		}else if (face[0].set) { 
			if ( 100 < y ) {
              w.gfx.setColor(0,0);
              w.gfx.drawLine(120,0,120,97);
              w.gfx.drawLine(121,0,121,97);
              w.gfx.flip();
              face[0].init();return;
            }
			buzzer.nav([30,50,30]);
		}
		else {
			if ( x<=120 && y<100 ) { //Light
				euc.dash.opt.lght.HL=1-euc.dash.opt.lght.HL;
				euc.wri((euc.dash.opt.lght.HL)?"lightsOn":"lightsOff");
		        face[0].btn(euc.dash.opt.lght.HL,"LIGHT",18,60,20,4,1,0,0,119,97,(euc.dash.opt.lght.HL)?"ON":"OFF",25,60,55);
				face[0].ntfy("LIGHT ON","LIGHT OFF",20,(euc.dash.opt.lght.HL)?4:1,euc.dash.opt.lght.HL);
				buzzer.nav([30,50,30]);
			}else if ( 120<=x && y<=100 ) { //watch alerts
				buzzer.nav([30,50,30]);						
				face.go("dashAlerts",0);
				return;	
			}else if ( x<=120 && 100<=y ) { //tpms
				buzzer.nav([30,50,30]);		
				if (!euc.dash.opt.tpms) face[0].ntfy("HOLD-> ON/OFF","",20,1,1);
				else {
					tpms.def.pos=Object.keys(tpms.def.list).indexOf(euc.dash.opt.tpms);
					face.go("tpmsFace",0);
					return;
				}	
			}else if ( 120<=x && 100<=y ) { //HORN
				euc.dash.opt.horn.en=1-euc.dash.opt.horn.en;
				face[0].btn(euc.dash.opt.horn.en,"HORN",25,185,136,4,1,122,100,239,195);	
				face[0].ntfy("BUTTON IS HORN >2KPH","HORN DISABLED",(euc.dash.opt.horn.en)?18:20,(euc.dash.opt.horn.en)?4:1,euc.dash.opt.horn.en);
				buzzer.nav([30,50,30]);						
			}else buzzer.nav([30,50,30]);
		}
		break;
	case 1: //slide down event
		euc.is.busy=0;euc.wri("live");
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else {
			euc.is.busy=0;euc.wri("live");
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		}
		break;
	case 3: //slide left event
		buzzer.nav(40);
		break;
	case 4: //slide right event (back action)
		if (face[0].sub){
			face[0].sub=0;
			this.timeout();
			face[0].init();
			return;
		}
        if (face[0].set) {
			w.gfx.setColor(0,0);
			w.gfx.drawLine(120,0,120,97);
			w.gfx.drawLine(121,0,121,97);
			w.gfx.flip();
			face[0].init();
        } else {
			euc.is.busy=0;euc.wri("live");
			face.go(ew.is.dash[ew.def.dash.face],0);
			return;
        }
        break;
	case 12: //long press event
		if  (x<=120 && 100<=y ) { //tpms
			buzzer.nav([30,50,30]);
			if (euc.dash.opt.tpms) {
				euc.dash.opt.tpms=0;
				face[0].btn(1,"TPMS",18,60,115,1,0,0,100,119,195,"OFF",28,60,155); //3
				face[0].ntfy("TPMS DISABLED","",20,1,1);
				return;
			}else{
				if (global.tpms){ 
					tpms.scan();
					face.go("tpmsFace",0);
				}else 
					face[0].ntfy("NOT INSTALLED","",20,13,1);
			}
			return;
	    }else if  (120<=x && 100<=y ) { //horn
			face[0].menu.full("SELECT SOUND",20,euc.dash.opt.horn.mode,80,1453,1365,1);
			face[0].ntfy("SELECT SOUND","",20,4,1);
			face[0].sub="horn";
			buzzer.nav([30,50,30]);						
		}else buzzer.nav(40);
		break;	
  }
};
