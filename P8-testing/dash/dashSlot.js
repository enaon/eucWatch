//Dash slot options
face[0] = { 
	offms: 5000, 
	g:w.gfx, 
	init: function(o){ 
		this.g.setColor(0,col("black"));
        this.g.setColor(1,col("dgray"));
        this.g.fillRect(0,0,75,95);//1
        this.g.fillRect(80,0,155,95); //2
        this.g.fillRect(160,0,239,95); //3
        this.g.fillRect(0,100,75,195); //4
        this.g.fillRect(80,100,155,195); //5
        this.g.fillRect(160,100,239,195);//6
        this.g.flip();
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("DASH SETTINGS",120-(this.g.stringWidth("SELECT WHEEL")/2),214); 
		this.g.flip();      
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,0,75,95);//1
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("SPEED",40-(this.g.stringWidth("SPEED")/2),30); 
		this.g.flip();	
   		this.g.setColor(0,col("dgray"));
		this.g.fillRect(80,0,155,95); //2
      	this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("AMP",120-(this.g.stringWidth("AMP")/2),30); 
      	this.g.flip();	
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(160,0,239,95); //3
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",200-(this.g.stringWidth("TEMP")/2),30); 
      	this.g.flip();	
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,100,75,195); //4
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",40-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();      
		this.g.setColor(0,col("dgray"));
        this.g.fillRect(80,100,155,195); //5
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",120-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(160,100,239,195);//6
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",200-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();
		this.run=true;
	},
	show : function(o){
		if (this.delete) {
			this.delete=0;
			this.g.setColor(0,col("red"));
			this.g.fillRect(0,200,239,249);//6
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",20);
			this.g.drawString("HOLD TO DELETE",120-(this.g.stringWidth("HOLD TO DELETE")/2),214); 
			this.g.flip();
			if (this.dtid)  clearTimeout(this.dtid);
			this.dtid=setTimeout(function(t){
				t.delete=0;
				t.dtid=0;
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,200,239,249);//6
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
				t.g.drawString("DASH SETTINGS",120-(t.g.stringWidth("DASH SETTINGS")/2),214); 
				t.g.flip();
		    },1000,this);
        }
		
		this.tid=setTimeout(function(t,o){
			t.tid=-1;
			t.show();
		},100,this);
	},
	tid:-1,
	run:false,
	clear : function(){  
		pal[0]=col("black"); 
		this.g.clear(); 
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid); 
		if (this.dtid>=0) clearTimeout(this.dtid); 
		this.tid=-1;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
face[1] = {
	offms:1000,
	init: function(){return true;},
	show : function(){
        face.go("dashGarage",0);
		//face.go(face.appRoot[0],face.appRoot[1]); //go to the previous face on screen of the previous app.  
		//face.go(face.appPrev,face.pagePrev); //go to the previous face on screen, even if it was on the same app. 
		//face.go("hello",-1); //sleep and set this face as the on_wake face. 
		//face.go("main",-1);//sleep and set this face as the on_wake face. 
		//face.go("main",0);//go to main Clock face. 
		return true;
	},
	clear: function(){return true;},
	off: function(){this.clear();}
};	
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5:  //tap event//long press event
		//kingsong
		if(200<y) face[0].delete=1;
		else digitalPulse(D16,1,40); 
		this.timeout();
		break;
	case 1: //slide down event
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
		else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);this.timeout();}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashGarage",0);
		return;
	case 12:
		if (y>200) { //delete wheel
			digitalPulse(D16,1,120);
			(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"Mac"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			require("Storage").erase('eucSlot'+require("Storage").readJSON("dash.json",1).slot+'.json')
			face.go("dashGarage",0);
			return;
		}else digitalPulse(D16,1,40);
		this.timeout();
		break;
  }
};


