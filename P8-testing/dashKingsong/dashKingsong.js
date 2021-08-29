//kingsong set actions
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();	
        this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("ACTIONS",120-(this.g.stringWidth("ACTIONS")/2),217); 
		this.g.flip();
		this.g.setColor(0,col("black"));
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,col("lgray"));
      	this.g.fillRect(106,200,165,204);
		this.g.flip();
        this.g.setColor(1,col("white"));
      	this.g.fillRect(75,200,105,204);
		this.g.flip(); 
		this.btn("LIGHTS",18,60,15,(euc.dash.aLight==="lightsOff")?col("black"):(euc.dash.aLight==="lightsOn")?col("raf2"):(euc.dash.aLight=="lightsAuto"||euc.dash.aLight==0)?col("raf3"):col("raf"),0,0,119,97,(euc.dash.aLight==="lightsOff")?"OFF":(euc.dash.aLight==="lightsOn")?"ON":(euc.dash.aLight==="lightsAuto"||euc.dash.aLight==0)?"AUTO":"CITY",28,60,50); //1
		this.btn("STROBE",25,185,35,(euc.dash.strb)?col("red"):col("dgray"),122,0,239,97);//2
        this.btn("TPMS",25,60,135,1365,0,100,119,195,"",22,60,155); //3
   		this.btn("LOCK",25,185,135,(euc.dash.lock)?col("red"):col("dgray"),122,100,239,195); //4
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
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
		        t.g.drawString("ACTIONS",122-(t.g.stringWidth("ACTIONS")/2),217); 
				t.g.flip();
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,col("lgray"));
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,col("white"));
				t.g.fillRect(75,200,105,204);
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
			else if (euc.dash.aLight=="lightsOn") { euc.dash.aLight="lightsAuto"; euc.wri("lightsAuto"); face[0].btn("LIGHTS",18,60,15,col("raf3"),0,0,119,97,"AUTO",28,60,50); }
			else if (euc.dash.aLight=="lightsAuto") { euc.dash.aLight="lightsCity"; face[0].btn("LIGHTS",18,60,15,col("raf"),0,0,119,97,"CITY",28,60,50); }
			else if (euc.dash.aLight=="lightsCity") { euc.dash.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50); }
			else  { euc.dash.aLight="lightsOn"; euc.wri("lightsOn"); face[0].btn("LIGHTS",18,60,15,col("raf2"),0,0,119,97,"ON",28,60,50); }
            face[0].ntfy("HOLD -> LIGHTS OFF",col("dgray"));
			buzz(D16,1,[30,50,30]);
		}else if ( 120<=x && y<=100 ) { //strobe
			euc.dash.strb=1-euc.dash.strb;
            face[0].btn("STROBE",25,185,35,(euc.dash.strb)?col("red"):col("dgray"),122,0,239,97);//2
			euc.wri((euc.dash.strb)?"strobeOn":"strobeOff");
			buzz(D16,1,[30,50,30]);
		}else if ( x<=120 && 100<=y ) { //bridge
			face[0].ntfy("NOT YET",col("red"));
			buzz(D16,1,[30,50,30]);		
		}else if (120<=x && 100<=y ) { //lock
			euc.dash.lock=1-euc.dash.lock;
            face[0].btn("LOCK",25,185,135,(euc.dash.lock)?col("red"):col("dgray"),122,100,239,195); //4
            face[0].ntfy("HOLD -> POWER OFF",col("red"));
			euc.wri((euc.dash.lock)?"lock":"unlock");
			buzz(D16,1,[30,50,30]);						
		}else buzz(D16,1,[30,50,30]);
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
			buzz(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		face.go("dashKingsongOpt",0);
		return;	
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash.face],0);
		return;
	case 12: //long press event
		if ( x<=120 && y<100 ) { //lights
			face[0].btn("LIGHTS",18,60,15,col("black"),0,0,119,97,"OFF",28,60,50);
			euc.dash.aLight="lightsOff";
			euc.wri("lightsOff");
			buzz(D16,1,[30,50,30]);
		}else if  (x<=120 && 100<=y ) { //tpms
			buzz(D16,1,40);
			face[0].ntfy("NOT YET",col("red"));
		}else if ( 120<=x && 100<=y ) { //off
			euc.aOff=euc.dash.aOff;
			euc.aLck=euc.dash.aLck;
			euc.dash.aOff=1;
			euc.dash.aLck=0;
			euc.tgl();
	    }else buzz(D16,1,[100]);
		this.timeout();
		break;
  }
};
