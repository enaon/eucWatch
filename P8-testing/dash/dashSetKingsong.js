//kingsong set actions
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
        this.btn("LIGHTS",18,60,15,(euc.dash.light)?col("raf"):col("dgray"),0,0,119,97,(!euc.dash.light)?"OFF":(euc.dash.light==1)?"ON":(euc.dash.light==2)?"AUTO":"CITY",28,60,50); //1
		if (!face.appPrev.startsWith("dashSet")){
		this.g.setColor(0,0);
		this.g.drawLine (120,0,120,99);
      	this.g.drawLine (121,0,121,99);
        this.g.flip();
		}
        this.btn("STROBE",18,185,15,(euc.dash.strb)?col("raf"):col("dgray"),122,0,239,97,(!euc.dash.strb)?"OFF":"ON",28,185,50);//2
		if (!face.appPrev.startsWith("dashSet")){
		this.g.setColor(0,0);
		this.g.drawLine (0,98,239,98);
		this.g.drawLine (0,99,239,99);
        this.g.flip();
        this.g.drawLine (120,100,120,195);
      	this.g.drawLine (121,100,121,195);
        this.g.flip();  
		}	
        //this.btn("MODE",18,60,115,(euc.dash.mode)?col("raf"):col("dgray"),0,100,119,195,(!euc.dash.mode)?"OFF":(euc.dash.mode==1)?"MED":"SOFT",30,60,150); //3
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,100,119,195); 
		this.g.setColor(1,col("white"));

		this.img=require("heatshrink").decompress(atob("oFAgINKv38AwkD/n88AHDj4HB/AHDv+8/k/A4f+jH+h+ADwXoiP+j4gCg/Mg4XB+AHBh8OFAN/FAUf40f/F3IIU/5wPBuf+GwUEA4MB/42CiE//kD/+AgP+ngHBi//4ED/0+A4M///gCQM/GoN/A4MH/9+A4P///wh//AoP8/vGA4vB4d4j///P//3Az4HFMgN8A4PBEoM4OQX/wIHBj0H/wHBgAHB54aBA4U//PnA4N3EgJ/BA4aCBn/6k/9+93wwHB+YmB+9jWQM/++P/3nA4Uf+YxBs9hA4vHsC6BA4eHsFwLgP7B4cYA4JpBA4TZC/CUBA4qkBw9wgeAgYHCg4HB+AHC/wHCZoIHDmADBgLfB/0OnAHI//hDIP8h0YA4P5A4UMjgHE/EcjkB//xA4PwjkOVwOHIIPgnAHCn4HDg6WBv4XB4FwA4MeA4MBwASBwAHCOYPggPAA4YFBgPgh1//EACoMA+EMA4UHA4N4ggHCh4hBngHB/QzBA4MegN/+QMBA4MPwAHCDIIqB4E/+hXBA4MB+Of8kH4AHBgH8z/In4GCFAPgiJYCAAMGuFzeYIADj/HJoIAI"));
		this.g.drawImage(this.img,30,117);
		delete this.img;
		this.g.flip();  

		this.btn("LOCK",18,185,115,(euc.dash.lock)?col("red"):col("dgray"),122,100,239,195,(!euc.dash.lock)?"OFF":"ON",30,185,150); //4
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("ACTIONS",120-(this.g.stringWidth("ACTIONS")/2),218); 
		this.g.flip();
		this.g.setFont("Vector",70);
		this.g.setColor(1,col("lgray"));
		this.g.drawString(".",117,150); 
		this.g.drawString(".",133,150); 
      	this.g.flip(); 
      	this.g.setColor(1,col("white"));
		this.g.drawString(".",102,150); 
		this.g.flip(); 		
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
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
    ntfy: function(txt,clr){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",20);
			this.g.drawString(txt,122-(this.g.stringWidth(txt)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
		        t.g.drawString("ACTIONS",122-(t.g.stringWidth("ACTIONS")/2),218); 
				t.g.flip();
				t.g.setFont("Vector",70);
				t.g.setColor(1,col("lgray"));
				t.g.drawString(".",102,150); 
				t.g.drawString(".",133,150); 
				t.g.flip(); 
				t.g.setColor(1,col("white"));
				t.g.drawString(".",117,150); 
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
			if (euc.dash.light==0) {euc.wri("lightsOn");euc.dash.light=1;face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50);}
			else if (euc.dash.light==1) {euc.wri("lightsAuto");euc.dash.light=2;face[0].btn("LIGHTS",18,60,15,col("raf3"),0,0,119,97,"AUTO",28,60,50);}
			else if (euc.dash.light==2) {euc.dash.aLight=1;euc.dash.light=3;face[0].btn("LIGHTS",18,60,15,col("raf4"),0,0,119,97,"CITY",28,60,50);}
			else if (euc.dash.light==3) {euc.wri("lightsOn");euc.dash.light=1;face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50);}
			else  {euc.wri("lightsOn");euc.dash.light=1;face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50);}
            face[0].ntfy("HOLD -> LIGHTS OFF",col("dgray"));
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x<=239&&y<=100) { //strobe
			euc.dash.strb=1-euc.dash.strb;
            face[0].btn("STROBE",18,185,15,(euc.dash.strb)?col("raf"):col("dgray"),122,0,239,97,(!euc.dash.strb)?"OFF":"ON",28,185,50);//2
			euc.wri((euc.dash.strb)?"strobeOn":"strobeOff");
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<=120&&100<=y<=200) { //ride mode
			if (euc.dash.mode==0){ euc.wri("rideMed");face[0].btn("MODE",18,60,115,col("raf2"),0,100,119,195,"MED",30,60,150); //3
            }else if (euc.dash.mode==1){ euc.wri("rideSoft");face[0].btn("MODE",18,60,115,col("raf3"),0,100,119,195,"SOFT",30,60,150); //3;
            }else if (euc.dash.mode==2){ euc.wri("rideHard");face[0].btn("MODE",18,60,115,col("raf4"),0,100,119,195,"HARD",30,60,150); //3;
            }digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&100<=y<=200) { //lock
			euc.dash.lock=1-euc.dash.lock;
            face[0].btn("LOCK",18,185,115,(euc.dash.lock)?col("red"):col("dgray"),122,100,239,195,(!euc.dash.lock)?"OFF":"ON",30,185,150); //4
            face[0].ntfy("HOLD -> POWER OFF",col("red"));
			euc.wri((euc.dash.lock)?"lock":"unlock");
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
		face.go("dashSetKsOpt",0);
		return;	
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
		if (x<=120&&y<100) { //lights
			euc.dash.light=0;
			face[0].btn("LIGHTS",18,60,15,col("dgray"),0,0,119,97,"OFF",28,60,50);
			euc.wri("lightsOff");
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x<=239&&100<=y<=200) { //off
			euc.wri("off");
			digitalPulse(D16,1,[30,50,30]);	
			euc.state="OFF";
	    }else digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
