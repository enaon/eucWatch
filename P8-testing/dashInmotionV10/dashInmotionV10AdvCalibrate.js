//inmotionV1 set adv calibrate
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:30000,
	g:w.gfx,
	init: function(){
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,177);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("SET PEDAL TILT",120-(this.g.stringWidth("SET PEDAL TILT")/2),10);
//		this.g.drawString("MANUALY SET PEDAL TILT",120-(this.g.stringWidth("MANUALY SET PEDAL TILT")/2),5);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,70);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,70);
		this.g.flip();
		this.g.setColor(1,15);
		this.g.setFont("Vector",80);
		this.g.drawString(euc.dash.opt.ride.pTlt,130-(this.g.stringWidth(euc.dash.opt.ride.pTlt)/2),65);
		this.g.flip();
        this.g.setColor(0,12);
		this.g.fillRect(0,177,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
   		this.g.drawString("START",120-(this.g.stringWidth("START")/2),188);
		this.g.drawString("CALIBRATION",120-(this.g.stringWidth("CALIBRATION")/2),216);
		this.g.flip();
		this.calibrate=0;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return;
        if (this.calibrate) {
            this.g.setColor(0,1);
		    this.g.fillRect(0,0,239,174);
            this.g.setColor(1,15);
		    this.g.setFont("Vector",17);
		    this.g.drawString("1. LEVEL WHEEL",25,10);
   		    this.g.drawString("2. HOLD HANDLE",25,37);
            this.g.drawString("3. PRESS START",25,64);
            //this.g.drawString("3. WHEEL BEEPS->OFF",25,91);
            this.g.drawString("4. WHEEL BEEPS",25,118);
            this.g.drawString("5. DONE!",25,145);
		    this.g.flip();
            this.g.setColor(0,4);
		    this.g.fillRect(0,175,120,239);
            this.g.setColor(1,15);
   		    this.g.setFont("Vector",22);
            this.g.drawString("START",20,200);
		    this.g.flip();
            this.g.setColor(0,12);
		    this.g.fillRect(121,175,239,239);
            this.g.setColor(1,15);
   		    this.g.setFont("Vector",22);
            this.g.drawString("CANCEL",140,200);
		    this.g.flip();
       		this.run=false;
        }else if (this.tilt!=euc.dash.opt.ride.pTlt){ //tilt Set
		    this.g.setColor(0,1);
		    this.g.fillRect(50,50,190,150);
            this.g.setColor(1,15);
		    this.g.setFont("Vector",80);
		    this.g.drawString(euc.dash.opt.ride.pTlt,130-(this.g.stringWidth(euc.dash.opt.ride.pTlt)/2),65);
		    this.g.flip();
		}

        if (this.info)  {
			this.info=0;
			if (this.itid)clearTimeout(this.itid);
			this.itid=setTimeout(function(t){
				t.itid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,198,239,239);//6
				t.g.setColor(1,15);
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
		w.gfx.setColor(0,0);
		w.gfx.drawLine (0,98,239,98);
		w.gfx.drawLine (0,99,239,99);
        w.gfx.flip();
		w.gfx.drawLine (120,0,120,195);
      	w.gfx.drawLine (121,0,121,195);
        w.gfx.flip();
		face.go("dashInmotionV1Adv",0);
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
        if (!face[0].calibrate){
		if (x<=120&&y<175) { //tilt forward
			euc.dash.opt.ride.pTlt--;
			euc.wri("setPpedalTilt",euc.dash.opt.ride.pTlt);
			buzzer.nav([30,50,30]);
		}else if (120<=x&&y<=175) { //tilt back
			euc.dash.opt.ride.pTlt++;
			euc.wri("setPpedalTilt",euc.dash.opt.ride.pTlt);
			buzzer.nav([30,50,30]);
		}else if (175<=y) { //calibrate
            face[0].calibrate=1;
			buzzer.nav([30,50,30]);
		}else buzzer.nav([30,50,30]);
        }else { //calibrate
			if (175<=y&&120<=x) {
				w.gfx.setColor(0,0);
				w.gfx.drawLine (0,98,239,98);
				w.gfx.drawLine (0,99,239,99);
				w.gfx.flip();
				w.gfx.drawLine (120,0,120,195);
				w.gfx.drawLine (121,0,121,195);
				w.gfx.flip();
				face.go("dashInmotionV1Adv",0);return;
			}else if (175<=y&&x<=120) {
				buzzer.nav([30,50,30]);
				euc.wri("calibration");
      }else buzzer.nav(40);
        }
		this.timeout();
		break;
	case 1: //slide down event
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up.
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
		this.timeout();
		break;
	case 3: //slide left event
		buzzer.nav(40);
		this.timeout();
		break;
	case 4: //slide right event (back action)
		w.gfx.setColor(0,0);
		w.gfx.drawLine (0,98,239,98);
		w.gfx.drawLine (0,99,239,99);
        w.gfx.flip();
		w.gfx.drawLine (120,0,120,195);
      	w.gfx.drawLine (121,0,121,195);
        w.gfx.flip();
		face.go("dashInmotionV1Adv",0);
		return;
	case 12: //long press event
		buzzer.nav(40);
		this.timeout();
		break;
  }
};
