//Dash slot options
face[0] = { 
	offms: 5000, 
	g:w.gfx, 
	init: function(o){ 
		this.g.setColor(0,col("black"));
        this.g.setColor(1,col("dgray"));
        this.g.fillRect(0,0,75,75);//1
        this.g.fillRect(80,0,155,75); //2
        this.g.fillRect(160,0,239,75); //3
        this.g.fillRect(0,80,75,155); //4
        this.g.fillRect(80,80,155,155); //5
        this.g.fillRect(160,80,239,155);//6
        this.g.flip();
      
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,0,75,75);//1
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("SPEED",40-(this.g.stringWidth("SPEED")/2),30); 
		this.g.flip();	
   		this.g.setColor(0,col("dgray"));
		this.g.fillRect(80,0,155,75); //2
      	this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("AMP",120-(this.g.stringWidth("AMP")/2),30); 
      	this.g.flip();	
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(160,0,239,75); //3
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",200-(this.g.stringWidth("TEMP")/2),30); 
      	this.g.flip();	
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,80,75,155); //4
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",40-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();      
		this.g.setColor(0,col("dgray"));
        this.g.fillRect(80,80,155,155); //5
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",120-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(160,80,239,155);//6
        this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("TEMP",200-(this.g.stringWidth("TEMP")/2),110); 
      	this.g.flip();      
	},
	show : function(o){

	},
	tid:-1,
	run:false,
		clear : function(){  
		pal[0]=col("black"); 
		this.g.clear(); 
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
        face.go("dashSelect",0);
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
		if(0<y&&y<100) {
			digitalPulse(D16,1,[30,50,30]);
			
		//ninebot
		}else if(100<y&&y<200) {
			digitalPulse(D16,1,[30,50,30]);

		}else digitalPulse(D16,1,40); 
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
		face.go("dashSelect",0);
		return;
	case 12:
		if (y>200) { //delete wheel
			digitalPulse(D16,1,120);
			(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"_mac"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			(s=>{s&&(delete s["slot"+require("Storage").readJSON("dash.json",1).slot+"_maker"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			require("Storage").erase('euc_slot'+require("Storage").readJSON("dash.json",1).slot+'.json')
			face.go("dashSelect",0);
			return;
		}else digitalPulse(D16,1,40);
		this.timeout();
		break;
  }
};


