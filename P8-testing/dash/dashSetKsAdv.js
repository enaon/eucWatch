//kingsong  set advanced
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        //info
		this.g.setColor(0,col("black"));
		this.g.drawLine (0,98,239,98);
		this.g.drawLine (0,99,239,99);
        this.g.flip();
		this.g.drawLine (120,0,120,195);
      	this.g.drawLine (121,0,121,195);
        this.g.flip();
		//this.g.setColor(0,col("black"));
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("ADVANCED",120-(this.g.stringWidth("ADVANCED")/2),214); 
		this.g.flip(); 
		//ride mode
		this.b1=euc.dash.mode;
		if (this.b1==0) {
			this.b1t="HARD";this.b1c=col("raf4");
		}else if (this.b1==1) {
			this.b1t="MED";this.b1c=col("raf2");
		}else if (this.b1==2) {
			this.b1t="SOFT";this.b1c=col("raf3");
		}
		this.g.setColor(0,this.b1c);
		this.g.fillRect(0,0,119,97);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",18);	
		this.g.drawString("MODE",60-(this.g.stringWidth("MODE")/2),15); 
		this.g.setFont("Vector",30);	
		this.g.drawString(this.b1t,60-(this.g.stringWidth(this.b1t)/2),50); 
		this.g.flip();

		//calibrate
		this.g.setColor(0,col("olive"));
		this.g.fillRect(122,0,239,97);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",18);	
		this.g.drawString("CALIBRATE",185-(this.g.stringWidth("CALIBRATE")/2),37); 
		this.g.flip();
		//limits
		this.g.setColor(0,col("olive"));
		this.g.fillRect(0,100,119,195);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",16);	
		this.g.drawString("LIMMITS",60-(this.g.stringWidth("LIMMITS")/2),110); 
		this.g.setFont("Vector",20);	
		this.g.drawString(euc.dash.spd1,40-(this.g.stringWidth(euc.dash.spd1)/2),140);
		this.g.drawString(euc.dash.spd2,40-(this.g.stringWidth(euc.dash.spd2)/2),170); 
		this.g.drawString(euc.dash.spd3,80-(this.g.stringWidth(euc.dash.spd3)/2),140); 
		this.g.drawString(euc.dash.spdT,80-(this.g.stringWidth(euc.dash.spdT)/2),170); 
		this.g.flip();
		//pass
		this.g.setColor(0,col("olive"));
		this.g.fillRect(122,100,239,195);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",28);	
		this.g.drawString("PASS",185-(this.g.stringWidth("PASS")/2),135); 
		this.g.flip();      
      
		this.b1=0;
		this.info=0;
		this.firstrun=1;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
		if (this.b1!=euc.dash.mode){ //ride mode
			this.b1=euc.dash.mode;
			if (this.b1==0) {
				this.b1t="HARD";this.b1c=col("raf4");
			}else if (this.b1==1) {
				this.b1t="MED";this.b1c=col("raf2");
			}else if (this.b1==2) {
				this.b1t="SOFT";this.b1c=col("raf3");
			}
			this.g.setColor(0,this.b1c);
			this.g.fillRect(0,0,119,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("MODE",60-(this.g.stringWidth("MODE")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b1t,60-(this.g.stringWidth(this.b1t)/2),50); 
			this.g.flip();
		}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },200,this);
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
		if (x<=120&&y<=100) { //ride mode
			if (euc.dash.mode==0) euc.wri("rideMed");
			else if (euc.dash.mode==1) euc.wri("rideSoft");
			else if (euc.dash.mode==2) euc.wri("rideHard");
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&y<=100) { //calibrate
            digitalPulse(D16,1,[30,50,30]);
			face.go("dashSetKsAdvCalibrate",0);
			return;
		}else if (x<=120&&100<=y<=200) {   //limits
			euc.dash.aOff=1-euc.dash.aOff;
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&100<=y<=200) { //pass
			face.go("dashSetKsPass",5);
			return;
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
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKsOpt",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
