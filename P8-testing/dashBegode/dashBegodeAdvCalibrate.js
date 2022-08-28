//Begode  set adv calibrate
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:30000,
	g:w.gfx,
	init: function(){
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,174);                    
		this.g.setColor(1,15);
		this.g.setFont("Vector",16);
		this.g.drawString("1. PRESS START",0,10); 	
		this.g.drawString("2. WHEEL BEEPS, TURN OFF",0,37); 		
		this.g.drawString("3. LEVEL WHEEL, TURN ON",0,64);
		this.g.drawString("4. WHEEL BEEPS, TURN OFF",0,91); 
		this.g.drawString("5. TURN WHEEL ON",0,118);
		this.g.drawString("6. DONE!",0,145);
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,175,120,239);                    
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("CANCEL",15,203); 	
		this.g.flip();
		this.g.setColor(0,4);
		this.g.fillRect(121,175,239,239);                    
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("START",150,203); 	
		this.g.flip();
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
		face.go("dashBegodeAdv",0);
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
  	if  (175<=y&&x<=120) {
			w.gfx.setColor(0,0);
			w.gfx.drawLine (0,98,239,98);
			w.gfx.drawLine (0,99,239,99);
			w.gfx.flip();
			w.gfx.drawLine (120,0,120,195);
			w.gfx.drawLine (121,0,121,195);
			w.gfx.flip();	
			face.go("dashBegodeAdv",0);return;
		}else if (175<=y&&120<=x) {
			buzzer.nav([30,50,30]);
			euc.wri("calibrate");
    }else buzzer.nav(40);
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("clock",0);
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
		face.go("dashBegodeAdv",0);
		return;
	case 12: //long press event
		buzzer.nav(100);
		this.timeout();
		break;
  }
};
