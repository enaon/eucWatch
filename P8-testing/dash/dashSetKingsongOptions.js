//kingsong connection set
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
		this.g.fillRect(0,200,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("OPTIONS",120-(this.g.stringWidth("OPTIONS")/2),214); 
		this.g.flip(); 
		this.b1=-1;
		this.b2=-1;
		this.b3=-1;
		this.b4=-1;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
		if (this.b1!=euc.dash.aLck){ //auto lock
			this.b1=euc.dash.aLck;
			if (this.b1==0) {
				this.b1t="DISABLED";this.b1c=col("dgray");
			}else {
				this.b1t="ENABLED";this.b1c=col("blue");
			}
			this.g.setColor(0,this.b1c);
			this.g.fillRect(0,0,118,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("AUTO LOCK",60-(this.g.stringWidth("AUTO LOCK")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b1t,60-(this.g.stringWidth(this.b1t)/2),50); 
			this.g.flip();
		}
		if (this.b2!=euc.dash.buzz){ //buzz
			this.b2=euc.dash.buzz;
			print("b2:",this.b2);
			if (this.b2==0) {
				this.b2t="DISABLED";this.b2c=col("dgray");
			}else  {
				this.b2t="ENABLED";this.b2c=col("blue");
			}
			this.g.setColor(0,this.b2c);
			this.g.fillRect(122,0,239,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("BUZZER",185-(this.g.stringWidth("BUZZER")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b2t,185-(this.g.stringWidth(this.b2t)/2),50); 
			this.g.flip();
		}
		if (this.b3!=euc.dash.aOff){ //auto off
			this.b3=euc.dash.aOff;
			if (this.b3==0) {
				this.b3t="DISABLED";this.b3c=col("dgray");
			}else if (this.b3==1) {
				this.b3t="ENABLED";this.b3c=col("blue");
			
			}
			this.g.setColor(0,this.b3c);
			this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("AUTO OFF",60-(this.g.stringWidth("AUTO OFF")/2),115); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b3t,60-(this.g.stringWidth(this.b3t)/2),150); 
			this.g.flip();
		}
		if (this.b4!=euc.dash.horn){ //horn
			this.b4=euc.dash.horn;
			if (this.b4==0) {
				this.b4t="DISABLED";this.b4c=col("raf");
			}else {
				this.b4t="ENABLED";this.b4c=col("red");
			}
			this.g.setColor(0,this.b4c);
			this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("HORN",185-(this.g.stringWidth("HORN")/2),115); 
			this.g.setFont("Vector",30);	
			this.g.drawString(this.b4t,185-(this.g.stringWidth(this.b4t)/2),150); 
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
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKingsong",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
