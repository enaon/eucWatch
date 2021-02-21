//kingsong  set adv limits

face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("SPEED LIMITS",120-(this.g.stringWidth("SPEED LIMITS")/2),214); 
		this.g.flip(); 
        this.btn(1,"ALARM 1",18,60,15,col("olive"),col("gray"),0,0,119,97,euc.dash.spd1,28,60,50);
        this.btn(1,"ALARM 2",18,185,15,col("olive"),col("raf2"),122,0,239,97,euc.dash.spd2,28,185,50);		
        this.btn(1,"ALARM 3",18,60,115,col("olive"),col("raf3"),0,100,119,195,euc.dash.spd3,28,60,150);
        this.btn(1,"TILTBACK",18,185,115,col("red"),col("red"),122,100,239,195,euc.dash.spdT,28,185,150);		
        if (!face.appPrev.startsWith("dashSet")){
		this.g.setColor(0,0);
		this.g.drawLine (0,98,239,98);
		this.g.drawLine (0,99,239,99);
        this.g.flip();
		this.g.drawLine (120,0,120,195);
      	this.g.drawLine (121,0,121,195);
        this.g.flip();
        this.btn1=0;this.btn2=0;this.btn3=0;this.btn4=0;
        }      
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
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,198,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
		        t.g.drawString("SPEED LIMITS",120-(t.g.stringWidth("SPEED LIMITS")/2),214); 
				t.g.flip();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
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
      case 5:case 12: //tap event
		if (x<=120&&y<100) { //alarm 1
			face[0].btn1=1-face[0].btn1;
            face[0].btn(face[0].btn1,"ALARM 1",18,60,15,col("olive"),col("gray"),0,0,119,97,euc.dash.spd1,28,60,50);
            face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x<=239&&y<=100) { //alarm 2
			face[0].btn2=2-face[0].btn2;
            face[0].btn(face[0].btn2,"ALARM 2",18,185,15,col("olive"),col("gray"),122,0,239,97,euc.dash.spd2,28,185,50);
            face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
			digitalPulse(D16,1,[30,50,30]);
		}else if (x<=120&&100<=y<=200) { //alarm 3
			face[0].btn3=1-face[0].btn3;
            face[0].btn(face[0].btn3,"ALARM 3",18,60,115,col("olive"),col("gray"),0,100,119,195,euc.dash.spd3,28,60,150);
            face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
			digitalPulse(D16,1,[30,50,30]);		
		}else if (120<=x<=239&&100<=y<=200) { //tiltback
			face[0].btn4=1-face[0].btn4;
            face[0].btn(face[0].btn4,"TILTBACK",18,185,115,col("red"),col("red"),122,100,239,195,euc.dash.spdT,28,185,150);	
            face[0].ntfy("GOLD -> SET","HOLD -> SET",20,col("dgray"),1);
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
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKsAdv",0);
		return;
  }
};
