//inmotionV1set actions
if (!face.menu) {
	face.menu={g:w.gfx};
	face.menu.full= function(title,titleSize,value,valueSize,frontColor,backColor,init){
		if (!init){
			this.g.setColor(0,backColor);
		    this.g.fillRect(50,50,195,150);                    
            this.g.setColor(1,col("white"));
			this.g.setFont("Vector",valueSize);
			this.g.drawString(value,130-(this.g.stringWidth(value)/2),65); 		
		    this.g.flip();
		}else{
			this.g.setColor(0,backColor);
			this.g.fillRect(0,0,239,195);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",titleSize);
			this.g.drawString(title,120-(this.g.stringWidth(title)/2),10); 		
			this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,70);
			this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,70);
			this.g.flip(); 
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",valueSize);
			this.g.drawString(value,130-(this.g.stringWidth(value)/2),65); 		
			this.g.flip(); 
		}
	};
}//face.menu.full("test",20,5,80,"a test",20,"another line",1453,1365);

face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		euc.busy=1;//stop bt loop-accept commands.
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
      	this.g.fillRect(75,200,165,204);
		this.g.flip();
        this.g.setColor(1,col("white"));
      	this.g.fillRect(75,200,98,204);
		this.g.flip(); 
        this.btn(euc.dash.lght.head,"LIGHT",18,60,15,col("raf"),col("dgray"),0,0,119,97,(euc.dash.lght.head)?"ON":"OFF",28,60,50);
		this.btn(euc.dash.ctrl.vol,"VOLUME",22,185,15,col("olive"),col("red"),122,0,239,97,(euc.dash.ctrl.vol)?euc.dash.ctrl.vol:"MUTE",30,185,50);//2
        this.btn(1,"TPMS",25,60,135,col("dgray"),0,0,100,119,195,"",22,60,155); //3
   		this.btn(1,"OFF",25,185,135,col("dgray"),col("dgray"),122,100,239,195); //4
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
				t.g.fillRect(75,200,98,204);
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
		setTimeout(function(){euc.busy=0;euc.tmp.live();},800);
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
		if (face[0].sub) {
			if (face[0].sub==="volume") {
				if ( x<=120 && y <= 170 ){
					euc.dash.ctrl.vol=euc.dash.ctrl.vol-10;if (euc.dash.ctrl.vol<=0)euc.dash.ctrl.vol=0;
					face.menu.full("VOLUME",20,euc.dash.ctrl.vol,80,1453,1365);
					euc.wri("setVolume",euc.dash.ctrl.vol);
					buzzer(D16,1,[30,50,30]);
				}else if ( 120 <=x  && y <= 170 ) {
					euc.dash.ctrl.vol=euc.dash.ctrl.vol+10;if (100<=euc.dash.ctrl.vol)euc.dash.ctrl.vol=100;
					face.menu.full("SET VOLUME",20,euc.dash.ctrl.vol,80,1453,1365);
					euc.wri("setVolume",euc.dash.ctrl.vol);
					buzzer(D16,1,[30,50,30]);
				}else {
					face[0].sub=0;
					face[0].init();
				}
			}else {
				face[0].sub=0;
				face[0].init();
			}
			this.timeout();
			return;
		}else {	
			if ( x<=120 && y<=100 ) { //lights
				euc.dash.lght.head=1-euc.dash.lght.head;
				euc.wri("setLights",(euc.dash.lght.head)?1:0);
				face[0].btn(euc.dash.lght.head,"LIGHT",18,60,15,col("raf"),col("dgray"),0,0,119,97,(euc.dash.lght.head)?"ON":"OFF",28,60,50);
				face[0].ntfy("LIGHT ON","LIGHT OFF",20,(euc.dash.lght.head)?col("raf"):col("dgray"),euc.dash.lght.head);
				buzzer(D16,1,[30,50,30]);
			}else if ( 120<=x && y<=100 ) { //Volume
				buzzer(D16,1,[30,50,30]);
				face.menu.full("VOLUME",20,euc.dash.ctrl.vol,80,1453,1365,1);
				face[0].ntfy("SET VOLUME","SET VOLUME",20,col("raf"),1);
				face[0].sub="volume";
			}else if ( x<=120 && 100<=y ) { //tpms
				face[0].ntfy("NOT YET","NOT YET",18,col("red"),1);
				buzzer(D16,1,[30,50,30]);		
			}else if (120<=x && 100<=y ) { //off
				face[0].ntfy("HOLD -> POWER OFF","",18,col("red"),1);
				buzzer(D16,1,[30,50,30]);						
			}else buzzer(D16,1,[30,50,30]);
		}
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		setTimeout(function(){euc.busy=0;euc.tmp.live();},800);
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		face.go("dashInmotionV1Opt",0);
		return;	
	case 4: //slide right event (back action)
		if (face[0].sub){
			face[0].sub=0;
			this.timeout();
			face[0].init();
			return;
		}
		setTimeout(function(){euc.busy=0;euc.tmp.live();},800);
		face.go(set.dash[set.def.dash.face],0);
		return;
	case 12: //long press event
		if ( x<=120 && y<100 ) { //lights
			face[0].btn(euc.dash.lght.head,"LIGHT",18,60,15,col("raf"),col("dgray"),0,0,119,97,(euc.dash.lght.head)?"ON":"OFF",28,60,50);
			euc.dash.aLight="lightsOff";
			euc.wri("lightsOff");
			buzzer(D16,1,[30,50,30]);
		}else if  (x<=120 && 100<=y ) { //tpms
			buzzer(D16,1,40);
			face[0].ntfy("NOT YET","NOT YET",18,col("red"),1);
		}else if ( 120<=x && 100<=y ) { //off
	   		face[0].btn(1,"OFF",25,185,135,col("red"),0,122,100,239,195); //4
			euc.tmp.aOff=1;
			euc.tgl();
	    }else buzzer(D16,1,[100]);
		this.timeout();
		break;
  }
};
