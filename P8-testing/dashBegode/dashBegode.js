//Begode set options
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
 		if (!face.appPrev.startsWith("dash")||face.appPrev.startsWith("dash_")) this.g.clear();
        this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("OPTIONS",120-(this.g.stringWidth("OPTIONS")/2),217); 
		this.g.flip();
		this.g.setColor(0,col("black"));
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,col("lgray"));
      	this.g.fillRect(106,200,165,204);
		this.g.flip();
        this.g.setColor(1,col("white"));
      	this.g.fillRect(75,200,120,204);
		this.g.flip(); 
		this.btn("LIGHTS",18,60,15,(euc.dash.aLight==="lightsOff")?col("black"):(euc.dash.aLight==="lightsOn")?col("raf2"):col("red"),0,0,119,97,(euc.dash.aLight==="lightsOff")?"OFF":(euc.dash.aLight==="lightsOn")?"ON":"STROBE",28,60,50); //1
		this.btn("HAPTIC",25,185,37,(euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB)?col("raf"):col("gray"),122,0,239,97);//2
        this.g.setColor(0,(euc.dash.emu)?col("blue1"):col("dgray"));
        this.g.fillRect(0,100,119,195); 
		this.g.setColor(1,col("white"));
		this.img=require("heatshrink").decompress(atob("oFAgINKv38AwkD/n88AHDj4HB/AHDv+8/k/A4f+jH+h+ADwXoiP+j4gCg/Mg4XB+AHBh8OFAN/FAUf40f/F3IIU/5wPBuf+GwUEA4MB/42CiE//kD/+AgP+ngHBi//4ED/0+A4M///gCQM/GoN/A4MH/9+A4P///wh//AoP8/vGA4vB4d4j///P//3Az4HFMgN8A4PBEoM4OQX/wIHBj0H/wHBgAHB54aBA4U//PnA4N3EgJ/BA4aCBn/6k/9+93wwHB+YmB+9jWQM/++P/3nA4Uf+YxBs9hA4vHsC6BA4eHsFwLgP7B4cYA4JpBA4TZC/CUBA4qkBw9wgeAgYHCg4HB+AHC/wHCZoIHDmADBgLfB/0OnAHI//hDIP8h0YA4P5A4UMjgHE/EcjkB//xA4PwjkOVwOHIIPgnAHCn4HDg6WBv4XB4FwA4MeA4MBwASBwAHCOYPggPAA4YFBgPgh1//EACoMA+EMA4UHA4N4ggHCh4hBngHB/QzBA4MegN/+QMBA4MPwAHCDIIqB4E/+hXBA4MB+Of8kH4AHBgH8z/In4GCFAPgiJYCAAMGuFzeYIADj/HJoIAI"));
		this.g.drawImage(this.img,30,117);
		delete this.img;
		this.g.flip();  
   		this.btn("HORN",25,185,137,(euc.dash.horn)?col("raf"):col("dgray"),122,100,239,195); //4
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(txt,size,x,y,clr,rx1,ry1,rx2,ry2,txt1,size1,x1,y1){
			this.g.setColor(0,clr);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);	
            this.g.drawString(txt,x-(this.g.stringWidth(txt)/2),y); 
   			if (txt1){
            this.g.setFont("Vector",size1);	
            this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1);
            }
			this.g.flip();
    },
    ntfy: function(txt,clr,size){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",(size)?size:20);
			this.g.drawString(txt,122-(this.g.stringWidth(txt)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
		        t.g.drawString("OPTIONS",122-(t.g.stringWidth("OPTIONS")/2),217); 
				t.g.flip();
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,col("lgray"));
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,col("white"));
				t.g.fillRect(75,200,120,204);
				t.g.flip(); 	
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
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
		face.go(set.dash[set.def.dash.face],0);
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
		if ( x<=120 && y<=100 ) { //lights
			if (euc.dash.aLight=="lightsOff") { euc.dash.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50); }
			else if (euc.dash.aLight=="lightsOn") { euc.dash.aLight="lightsOff"; euc.wri("lightsOff"); face[0].btn("LIGHTS",18,60,15,col("black"),0,0,119,97,"OFF",28,60,50); }
			else  { euc.dash.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50); }
            face[0].ntfy("HOLD -> STROBE",col("dgray"));
			digitalPulse(D16,1,[30,50,30]);
		}else if ( 120<=x && y<=100 ) { //haptic
			digitalPulse(D16,1,[30,50,30]);						
			face.go("dashAlerts",0);
			return;	
		}else if ( x<=120 && 100<=y ) { //bridge
			face[0].ntfy("HOLD -> TOGGLE",col("dgray"));
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x && 100<=y ) { //horn
			euc.dash.horn=1-euc.dash.horn;
            face[0].btn("HORN",25,185,136,(euc.dash.horn)?col("raf"):col("dgray"),122,100,239,195);//2
            face[0].ntfy((euc.dash.horn)?"BUTTON IS HORN >2KPH":"HORN DISABLED",(euc.dash.horn)?col("raf"):col("dgray"),(euc.dash.horn)?18:20);
			digitalPulse(D16,1,[30,50,30]);						
		}else digitalPulse(D16,1,40);
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		face.go("dashBegodeAdv",0);
		return;	
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash.face],0);
		return;
	case 12: //long press event
		if ( x<=120 && y<100 ) { //lights
			face[0].btn("LIGHTS",18,60,15,col("red"),0,0,119,97,"STROBE",28,60,50);
			euc.dash.aLight="lightsStrobe";
			euc.wri("lightsStrobe");
			digitalPulse(D16,1,[30,50,30]);
		}else if  (x<=120 && 100<=y ) { //bridge
            face[0].ntfy("NOT AVAILABLE",col("red"));
			digitalPulse(D16,1,40);
		}else if ( 120<=x && 100<=y ) { //off
			euc.wri("off");
			digitalPulse(D16,1,[30,50,30]);	
			euc.state="OFF";
	    }else digitalPulse(D16,1,40);
		this.timeout();
		break;
  }
};
