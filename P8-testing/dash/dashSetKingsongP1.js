//kingsong set
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
/*		this.g.setColor(1,col("gray"));
		this.g.fillRect(0,0,239,195); //left up
		this.g.setColor(0,col("black"));
		this.g.setFont("Vector",32);
		this.g.drawString("TODO",120-(this.g.stringWidth("TODO")/2),9); 
	
		this.g.flip();
*/
		this.g.setColor(0,col("black"));
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("EUC SETTINGS",120-(this.g.stringWidth("EUC SETTING")/2),214); 
		this.g.flip(); 
		this.b1=-1;
		this.b2=-1;
		this.b3=-1;
		this.b4=0;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
		if (this.b1!=euc.dash.lght){ //lights
			this.b1=euc.dash.lght;
			if (this.b1==0) {
				this.b1t="OFF";this.b1c=col("black");
			}else if (this.b1==1) {
				this.b1t="ON";this.b1c=col("blue");
			}else if (this.b1==2) {
				this.b1t="AUTO";this.b1c=col("olive");
			}
			this.g.setColor(0,this.b1c);
			this.g.fillRect(0,0,118,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("LIGHTS",60-(this.g.stringWidth("LIGHTS")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b1t,60-(this.g.stringWidth(this.b1t)/2),50); 
			this.g.flip();
		}
		if (this.b2!=euc.dash.lock){ //lock
			this.b2=euc.dash.lock;
			print("b2:",this.b2);
			if (this.b2==0) {
				this.b2t="OFF";this.b2c=col("blue");
			}else if (this.b2==1) {
				this.b2t="ON";this.b2c=col("red");
			}
			this.g.setColor(0,this.b2c);
			this.g.fillRect(122,0,239,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("LOCK",185-(this.g.stringWidth("LOCK")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b2t,185-(this.g.stringWidth(this.b2t)/2),50); 
			this.g.flip();
		}
		if (this.b3!=euc.dash.mode){ //ride mode
			this.b3=euc.dash.mode;
			if (this.b3==0) {
				this.b3t="HARD";this.b3c=col("raf1");
			}else if (this.b3==1) {
				this.b3t="MED";this.b3c=col("olive");
			}else if (this.b3==2) {
				this.b3t="SOFT";this.b3c=col("raf4");
			}
			this.g.setColor(0,this.b3c);
			this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("MODE",60-(this.g.stringWidth("MODE")/2),115); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b3t,60-(this.g.stringWidth(this.b3t)/2),150); 
			this.g.flip();
		}
		if (this.b4!=this.b4s){
			this.b4s=this.b4;
			this.g.setColor(0,col("black"));
			this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("lblue"));
			this.g.setFont("Vector",30);	
			this.g.drawString("MORE",185-(this.g.stringWidth("MORE")/2),135); 
			this.g.flip();
		}		
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },300,this);
	},
	tid:-1,
	run:false,
	clear : function(){
		this.g.clear();
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
		face.go(set.dash[set.def.dash],0);
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
		if (x<=120&&y<100) { //lights
			if (euc.dash.lght==0) {euc.wri("lightsOn");euc.dash.lght=1;}
			else if (euc.dash.lght==1) {euc.wri("lightsAuto");euc.dash.lght=2;}
			else if (euc.dash.lght==2) {euc.wri("lightsOn");euc.dash.lght=1;}
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x<=239&&y<=100) { //lock
			if (euc.dash.lock==0) euc.wri("lock");
			else if (euc.dash.lock==1) euc.wri("unlock");
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<=120&&100<=y<=200) { //ride mode
			if (euc.dash.mode==0) euc.wri("rideMed");
			else if (euc.dash.mode==1) euc.wri("rideSoft");
			else if (euc.dash.mode==2) euc.wri("rideHard");
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&100<=y<=200) { //btn4
			face[0].b4++; if (face[0].b4==3) face[0].b4=0;
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
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
		if (x<=120&&y<100) { //lights
			euc.dash.lght=0;
			euc.wri("lightsOff");
			digitalPulse(D16,1,[30,50,30]);
	    }else digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
