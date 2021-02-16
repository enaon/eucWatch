//kingsong  set options
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		this.g.setColor(0,col("black"));
		this.g.fillRect(0,198,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("CALIBRATION",120-(this.g.stringWidth("CALIBRATION")/2),214); 
		this.g.flip(); 
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,0,239,150);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("MANUALY SET PEDAL TILT",120-(this.g.stringWidth("MANUALY SET PEDAL TILT")/2),5); 		
		this.g.drawString("MANUALY SET PEDAL TILT",120-(this.g.stringWidth("MANUALY SET PEDAL TILT")/2),5);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),210,100);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),20,100);
		this.g.flip(); 
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(50,50,190,150);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",60);
		this.g.drawString(euc.dash.tiltSet,120-(this.g.stringWidth(euc.dash.tiltSet)/2),90); 		

//prev=require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A=="))		
//next=require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A="))
		this.b1=-1;
		this.b2=-1;
		this.b3=-1;
		this.b4=-1;
		this.info=0;
		this.firstrun=1;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
		if (this.b1!=euc.dash.aLck){ //auto lock
			this.b1=euc.dash.aLck;
			this.g.setColor(0,(this.b1)?col("raf"):col("dgray"));
			this.g.fillRect(0,0,118,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("AUTO",60-(this.g.stringWidth("AUTO")/2),15); 
			this.g.setFont("Vector",28);	
			this.g.drawString("LOCK",60-(this.g.stringWidth("LOCK")/2),50); 
			this.g.flip();
            if (!this.firstrun) {
			this.g.setColor(0,col("raf3"));
			this.g.fillRect(0,198,239,239);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",16);
			 this.g.drawString((this.b1)?"DISCONNECT -> LOCK":"AUTO LOCK DISABLED",120-(this.g.stringWidth((this.b1)?"DISCONNECT -> LOCK":"AUTO LOCK DISABLED")/2),214); 
			this.info=1;
			this.g.flip();
			}
		}
		
		if (this.info)  {
			this.info=0;
			if (this.itid)clearTimeout(this.itid);
			this.itid=setTimeout(function(t){
				t.itid=0;
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,198,239,239);//6
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
				t.g.drawString("OPTIONS",120-(t.g.stringWidth("OPTIONS")/2),214); 
				t.g.flip();
		    },1000,this);
		}
		this.firstrun=0;
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },100,this);
	},
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.itid) clearTimeout(this.itid);this.itid=0;
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
		face.go("dashSetKingsong",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		if (x<=120&&y<100) { //auto lock
			euc.dash.aLck=1-euc.dash.aLck;
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x<=239&&y<=100) { //buzz
			euc.dash.buzz=1-euc.dash.buzz;
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<=120&&100<=y<=200) { //auto off
			euc.dash.aOff=1-euc.dash.aOff;
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&100<=y<=200) { //lock
			euc.dash.horn=1-euc.dash.horn;
			digitalPulse(D16,1,[30,50,30]);						
		}else digitalPulse(D16,1,[30,50,30]);
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKsAdv",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
