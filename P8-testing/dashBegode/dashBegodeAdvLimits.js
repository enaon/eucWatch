//Begode  set adv limits

face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("WHEEL ALERTS",120-(this.g.stringWidth("WHEEL ALERTS")/2),214); 
		this.g.flip(); 
        if (!face.appPrev.startsWith("dashSet")){
			this.g.setColor(0,0);
			this.g.drawLine (0,98,239,98);
			this.g.drawLine (0,99,239,99);
			this.g.flip();
			this.g.fillRect(120,100,121,195);
			this.g.flip();
        }      
		this.almS=-1;
		this.spdT=-1;
        this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
		if (!this.setE) {
			if (this.almS!=euc.dash.almS){
				this.almS=euc.dash.almS;
				this.btn(euc.dash.almS,"SPEED ALARMS",18,120,20,euc.dash.almS==1?12:1,4,0,0,239,97,euc.dash.almS?euc.dash.almS>=2?"Both Disabled":"2nd only":"1st & 2nd",22,120,55);
				this.btn(euc.dash.almS==3?1:0,"PWM TILT",18,60,120,4,1,0,100,119,195,"FREESTYL3R\n FIRMWARE",16,60,155);
			}
			if (this.spdT!=euc.dash.spdT){
				this.spdT=euc.dash.spdT;
				this.btn(100<=this.spdT?0:1,"TILTBACK",18,185,120,12,1,122,100,239,195,100<=this.spdT?"OFF":set.def.dash.mph?(0.625*this.spdT).toFixed(0):this.spdT,25,185,155);
			}
		}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },200,this);
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
			if (!t.setE){
				t.g.setColor(0,0);
				t.g.fillRect(0,198,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
				t.g.drawString("WHEEL ALERTS",120-(t.g.stringWidth("WHEEL ALERTS")/2),214); 
				t.g.flip();
			}
		    },1000,this);
    },
	set: function(b,txt){
        this.setE=1;
        this.setEb=b;
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),10); 		
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,75);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,75);
		this.g.flip(); 
        this.btn(0,b<100?set.def.dash.mph?(0.625*b.toFixed(0)):b:"-",100,126,60,12,1,60,40,180,160);
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
		return true;
	},
	show : function(){
		face.go("dashBegode",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	

//touch
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5://tap event
        if (!face[0].setE){//select page
			if (y<100) { //speed alarms
				buzzer([30,50,30]);		
				if (!euc.dash.almS)
					euc.wri("alertsTwo");
				else if (euc.dash.almS==1)
					euc.wri("alertsOff");
				else if (2<=euc.dash.almS)
		   			euc.wri("alertsOneTwo");
			}else if (x<=120&&y<=200) { //pwm tiltback
				buzzer([30,50,30]);	
					if (euc.dash.almS!=3)
						euc.wri("alertsTiltback");
					else 
						euc.wri("alertsOff");
			}else if (120<=x&&y<=200) { //tiltback
				face[0].set(euc.dash.spdT,"TITLBACK ("+(set.def.dash.mph?"MPH)":"KPH)") );
				face[0].btn(100<=euc.dash.spdT?0:1,100<=euc.dash.spdT?"TILTBACK DISABLED":"TILTBACK ENABLED",18,120,215,4,1,0,198,239,239);
				buzzer([30,50,30]);						
			}else buzzer(40);
		}else {//set page
			if (120<=x&&y<=195) { //up
				if (100<=face[0].setEb) {
					buzzer(40);
					return;
				}	else if (99<=face[0].setEb) {
					face[0].btn(0,"TILTBACK DISABLED",18,120,215,4,1,0,198,239,239);
				}	
                if (face[0].setEb<100) face[0].setEb++;
                //else face[0].ntfy("THE LIMIT IS 99KpH","",20,7,1);
            }else  if (x<=120&&y<=195){  //dn
				if (5<face[0].setEb) face[0].setEb--;
				if (99<=face[0].setEb) {
					face[0].btn(1,"TILTBACK ENABLED",18,120,215,4,1,0,198,239,239);
				}	
				//else face[0].ntfy("NO LESS THAN 10KpH","",20,7,1);
            } else {
				if (100<=face[0].setEb) {
					face[0].setEb=50;
					face[0].ntfy("TILTBACK ENABLED","",18,4,1);
				}else {
					face[0].setEb=100;
					face[0].ntfy("TILTBACK DISABLED","",18,1,1);
				}
			}
            buzzer([30,50,30]);
			face[0].btn(0,100<=face[0].setEb?"-":set.def.dash.mph?(0.625*face[0].setEb).toFixed(0):face[0].setEb,100,126,60,12,1,60,40,180,160);
		}
		this.timeout();
		break;
	case 1: //slide down event
        if (face[0].setE) {
			if (100<=face[0].setEb) euc.wri("tiltbackOff");
			else euc.wri("tiltbackSpeed",face[0].setEb);
			face[0].setE=0; 
			w.gfx.clear();
			face[0].init();
        } else 
			face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer(40);
		break;
	case 4: //slide right event (back action)
        if (face[0].setE) {
			if (100<=face[0].setEb) euc.wri("tiltbackOff");
			else euc.wri("tiltbackSpeed",face[0].setEb);
			face[0].setE=0; 
			w.gfx.clear();
			face[0].init();
        } else {
		face.go("dashBegodeAdv",0);
		return;
        }
        break;
	case 12: //hold event
		buzzer(40);
   		return;
	}
};
