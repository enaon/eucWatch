//kingsong  set options
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        this.g.setColor(0,col("black"));
		this.g.fillRect(0,198,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("OPTIONS",120-(this.g.stringWidth("OPTIONS")/2),214); 
		this.g.flip(); 
		if (!face.appPrev.startsWith("dashSet"){
			this.g.setColor(0,col("black"));
			this.g.setColor(1,col("dgray"));
			this.g.fillRect(0,0,119,97);
			this.g.fillRect(121,0,239,97);	
			this.g.fillRect(0,100,119,195);
			this.g.fillRect(121,100,239,195);
			this.g.flip();
        }
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
            this.btn(this.b1,"AUTO",18,60,15,col("raf"),col("dgray"),0,0,119,97,"LOCK",28,60,50);
            if (!this.firstrun) {
            this.ntfy("DISCONNECT -> LOCK","AUTO LOCK DISABLED",16,col("raf3"),this.b1);
			}
		}
		if (this.b2!=euc.dash.buzz){ //buzz
			this.b2=euc.dash.buzz;
            this.btn(this.b2,"HAPTIC",25,185,37,col("raf"),col("dgray"),122,0,239,97);
            if (!this.firstrun) {
            this.ntfy("VIBRATE ON ALERTS","VIBRATION DISABLED",16,col("raf3"),this.b2);
			}
		}
		if (this.b3!=euc.dash.aOff){ //auto off
			this.b3=euc.dash.aOff;
            this.btn(this.b3,"AUTO",18,60,115,col("raf"),col("dgray"),0,100,119,195,"OFF",30,60,150);
            if (!this.firstrun) {
            this.ntfy("DISCONNECT->POWER OFF","AUTO OFF DISABLED",16,col("raf3"),this.b3);
			}
		}
		if (this.b4!=euc.dash.horn){ //horn
			this.b4=euc.dash.horn;
            this.btn(this.b4,"HORN",25,185,136,col("raf"),col("dgray"),122,100,239,195);
			if (!this.firstrun) {
            this.ntfy("BUTTON IS HORN >2KPH","HORN DISABLED",16,col("raf3"),this.b4);
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
        },200,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size1);	
          this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
   			if (txt2){this.g.setFont("Vector",size2);	
            this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
			this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);
			 this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.info=1;
			this.g.flip();
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
		face.go("dashSetKsAdv",0);
		return;
	case 4: //slide right event (back action)
		face.go("dashSetKingsong",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
