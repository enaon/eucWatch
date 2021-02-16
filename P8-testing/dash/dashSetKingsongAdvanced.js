//kingsong  set advanced
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


   this.g.setColor(1,col("dgray"));
    this.g.fillRect(0,0,118,95);
    this.g.fillRect(121,0,239,95);	
    this.g.fillRect(0,98,118,195);
    this.g.fillRect(121,98,239,195);
    this.g.setColor(0,col("black"));
		this.g.setColor(0,col("black"));
			this.g.flip();
*/
		this.g.setColor(0,col("black"));
		this.g.fillRect(0,198,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("ADVANCED",120-(this.g.stringWidth("ADVANCED")/2),214); 
		this.g.flip(); 
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
		if (this.b1!=euc.dash.aLck){ //tilt
			this.b1=euc.dash.aLck;
			this.g.setColor(0,(this.b1)?col("raf"):col("dgray"));
			this.g.fillRect(0,0,118,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("SET",60-(this.g.stringWidth("SET")/2),15); 
			this.g.setFont("Vector",30);	
			this.g.drawString("TILT",60-(this.g.stringWidth("TILT")/2),50); 
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
		if (this.b2!=euc.dash.buzz){ //calibrate
			this.b2=euc.dash.buzz;
			this.g.setColor(0,(this.b2)?col("raf"):col("dgray"));
			this.g.fillRect(122,0,239,97);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);	
			this.g.drawString("CALIBRATE",185-(this.g.stringWidth("CALIBRATE")/2),37); 
			this.g.flip();
            if (!this.firstrun) {
			this.g.setColor(0,col("raf3"));
			this.g.fillRect(0,198,239,239);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",16);
			 this.g.drawString((this.b2)?"VIBRATE ON ALERTS":"VIBRATION DISABLED",120-(this.g.stringWidth((this.b2)?"VIBRATE ON ALERTS":"VIBRATION DISABLED")/2),214); 
			this.info=1;
			this.g.flip();
			}
		}
		if (this.b3!=euc.dash.aOff){ //limmits
			this.b3=euc.dash.aOff;
			this.g.setColor(0,(this.b3)?col("raf"):col("dgray"));
			this.g.fillRect(0,100,118,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",16);	
			this.g.drawString("LIMMITS",60-(this.g.stringWidth("LIMMITS")/2),110); 
			this.g.setFont("Vector",20);	
			this.g.drawString("35",60-(this.g.stringWidth("35")/2),140);
			this.g.drawString("40",60-(this.g.stringWidth("40")/2),155); 
			this.g.drawString("45",60-(this.g.stringWidth("45")/2),170); 
			this.g.drawString("45",60-(this.g.stringWidth("45")/2),185); 
			
			this.g.flip();
            if (!this.firstrun) {
			this.g.setColor(0,col("raf3"));
			this.g.fillRect(0,198,239,239);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",16);
			 this.g.drawString((this.b3)?"DISCONNECT->POWER OFF":"AUTO OFF DISABLED",120-(this.g.stringWidth((this.b3)?"DISCONNECT->POWER OFF":"AUTO OFF DISABLED")/2),214); 
			this.info=1;
			this.g.flip();
			}
		}
		if (this.b4!=euc.dash.horn){ //pass
			this.b4=euc.dash.horn;
			this.g.setColor(0,(this.b4)?col("raf"):col("dgray"));
			this.g.fillRect(122,100,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",28);	
			this.g.drawString("PASS",185-(this.g.stringWidth("PASS")/2),136); 
			this.g.flip();
			if (!this.firstrun) {
			this.g.setColor(0,col("raf3"));
			this.g.fillRect(0,198,239,239);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",16);
			 this.g.drawString((this.b4)?"BUTTON IS HORN >2KPH":"BUTTON HORN DISABLED",120-(this.g.stringWidth((this.b4)?"BUTTON IS HORN >2KPH":"BUTTON HORN DISABLED")/2),214); 
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
				t.g.drawString("ADVANCED",120-(t.g.stringWidth("ADVANCED")/2),214); 
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
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKingsongOptions",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
