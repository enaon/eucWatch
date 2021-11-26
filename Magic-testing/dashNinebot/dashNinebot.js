//Ninebot S settings
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		euc.busy=1;//stop bt loop-accept commands.
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
 		//if (!this.set&&(face.appPrev.startsWith("dash_")||face.appPrev==="settings")) this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();		
		this.g.fillRect(0,196,239,197);
        this.g.flip();	
        this.set=0;
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("SETTINGS",120-(this.g.stringWidth("SETTINGS")/2),217); 
		this.g.flip();
		//
        this.btn(euc.dash.aLck,"AUTO",18,60,15,7,1,0,0,119,97,"LOCK",28,60,50);
		this.btn((euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB),"WATCH",22,185,17,4,1,122,0,239,97,"ALERTS",22,185,55);		
        this.btn(euc.dash.light,"RING",25,60,136,4,1,0,100,119,195);
        this.btn(1,"MODE:"+euc.dash.mode,25,185,136,12,0,122,100,239,195);	
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
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2,sele){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size1);	
			this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1);
			if (txt2){
				this.g.setFont("Vector",size2);this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);
				if (sele) { this.g.drawString("<",10,y2); this.g.drawString(">",205,y2); }
			}
			this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",22);
		        t.g.drawString("SETTINGS",120-(t.g.stringWidth("SETTINGS")/2),217); 
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
		euc.busy=0;euc.wri(1);
		face.go(set.dash[set.def.dash.face],0);
		return;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	this.timeout();
	switch (e) {
	case 5: //tap event
		if (face[0].set) { 
			if ( 100 < y ) {
			  euc.wri(30+euc.dash.mode);
              w.gfx.setColor(0,0);
              w.gfx.drawLine(120,0,120,97);
              w.gfx.drawLine(121,0,121,97);
              w.gfx.flip();
              face[0].init();return;
            }
			else if ( x<=120 && y<100 ) { //decrease
				if (0<euc.dash.mode) euc.dash.mode--;
			}else if (euc.dash.mode<9) euc.dash.mode++;
			buzzer([30,50,30]);
			face[0].btn(1,"SET RIDE MODE",20,125,5,12,0,0,0,239,97,euc.dash.mode.toString(),60,125,37,1);
		}
		else {
			if ( x<=120 && y<100 ) { //auto lock
				euc.dash.aLck=1-euc.dash.aLck;
				face[0].btn(euc.dash.aLck,"AUTO",18,60,15,7,1,0,0,119,97,"LOCK",28,60,50);
				face[0].ntfy("DISCONNECT -> LOCK","AUTO LOCK DISABLED",18,(euc.dash.aLck)?7:1,euc.dash.aLck);
				buzzer([30,50,30]);
			}else if ( 120<=x && y<=100 ) { //watch alerts
				buzzer([30,50,30]);						
				face.go("dashAlerts",0);
				return;	
			}else if ( x<=120 && 100<=y ) { //ring lights
				euc.dash.light=1-euc.dash.light;
				face[0].btn(euc.dash.light,"RING",25,60,136,4,1,0,100,119,195);
				face[0].ntfy("RING ON","RING OFF",20,(euc.dash.light)?4:1,euc.dash.light);
                euc.wri(25+euc.dash.light);
				buzzer([30,50,30]);	
			}else if ( 120<=x && 100<=y ) { //mode
				face[0].set=1;
				face[0].btn(1,"SET RIDE MODE",20,125,5,12,0,0,0,239,97,euc.dash.mode.toString(),60,125,37,1);
				buzzer([30,50,30]);						
			}else buzzer([30,50,30]);
		}
		
		break;
	case 1: //slide down event
	    if (face[0].set) {
			euc.wri(30+euc.dash.mode);
			setTimeout(()=>{euc.busy=0;euc.wri(1);},500);
        }
		//face.go("main",0);
		
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		
		break;
	case 3: //slide left event
		buzzer(40);
		
		break;
	case 4: //slide right event (back action)
        if (face[0].set) {
			  euc.wri(30+euc.dash.mode);
              w.gfx.setColor(0,0);
              w.gfx.drawLine(120,0,120,97);
              w.gfx.drawLine(121,0,121,97);
              w.gfx.flip();
              face[0].init();return;
        } else {
		  euc.busy=0;euc.wri(1);
          face.go(set.dash[set.def.dash.face],0);
          return;
        }
        break;
	case 12: //long press event
		if (face[0].set) { 
			face[0].set=0;face[0].init();
			buzzer([30,50,30]);	
        }else if ( x<=120 && y<100 ) { //auto lock
			euc.dash.aLck=1-euc.dash.aLck;
            face[0].btn(euc.dash.aLck,"AUTO",18,60,15,7,1,0,0,119,97,"LOCK",28,60,50);
            face[0].ntfy("DISCONNECT -> LOCK","AUTO LOCK DISABLED",18,1,euc.dash.aLck);
			buzzer([30,50,30]);
		}else if ( 120<=x && y<=100 ) { //watch alerts
			if (euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB) {euc.dash.hapS=0;euc.dash.hapA=0;euc.dash.hapT=0;euc.dash.hapB=0;}
			else {euc.dash.hapS=1;euc.dash.hapA=1;euc.dash.hapT=1;euc.dash.hapB=1;}
			face[0].btn((euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB),"WATCH",22,185,17,4,1,122,0,239,97,"ALERTS",22,185,55);		
            face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",19,1,(euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB));
			buzzer([30,50,30]);
		}else if ( x<=120 && 100<=y ) { //ring lights
			euc.dash.light=1-euc.dash.light;
            face[0].btn(euc.dash.light,"RING",25,60,136,4,1,0,100,119,195);
            face[0].ntfy("RING ON","RING OFF",20,1,euc.dash.light);
            euc.wri(25+euc.dash.light);
			buzzer([30,50,30]);		
		}else if ( 120<=x && 100<=y ) { //mode
			face[0].set=1;
			face[0].btn(1,"SET RIDE MODE",20,120,5,12,0,0,0,239,97,euc.dash.mode.toString(),60,125,37);
			buzzer([30,50,30]);	
		}else buzzer([30,50,30]);
		
		break;
  }
};
