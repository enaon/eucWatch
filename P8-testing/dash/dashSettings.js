//settings face
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		this.g.setColor(1,col("gray"));
		this.g.fillRect(0,0,239,195); //left up
		this.g.setColor(0,0);
		this.g.setFont("Vector",32);
		this.g.drawString("TODO",120-(this.g.stringWidth("TODO")/2),9); 
	
		this.g.flip();
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("EUC SETTINGS",120-(this.g.stringWidth("EUC SETTING")/2),214); 
		this.g.flip(); 
		this.b1=0;
		this.run=true;
	},
	show : function(){
		if (!this.run) return; 
		if (this.b1!=this.b1s){
			this.b1s=this.b1;
			if (this.b1==0) {
				this.b1t="OFF";this.b1c=col("dgray");
			}else if (this.b1==1) {
				this.b1t="ON";this.b1c=col("dblue");
			}else if (this.b1==2) {
				this.b1t="AUTO";this.b1c=col("purple");
			}
				this.g.setColor(1,this.b1c);
				this.g.fillRect(0,0,118,95);
				this.g.setColor(0,col("white"));
				this.g.setFont("Vector",18);	
				this.g.drawString("LIGHTS",60-(this.g.stringWidth("LIGHTS")/2),10); 
				this.g.setFont("Vector",30);	
				this.g.drawString(this.b1t,60-(this.g.stringWidth(this.b1t)/2),40); 
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
		if (x<=120&&y<100) { //toggles full/current brightness on a left down corner swipe up. 
			face[0].b1++; if (face[0].b1==3) face[0].b1=0;
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
	    digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
