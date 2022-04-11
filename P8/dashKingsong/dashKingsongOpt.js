//kingsong  set options
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
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
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("OPTIONS",120-(this.g.stringWidth("OPTIONS")/2),217); 
		this.g.flip(); 
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,200,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(98,200,120,204);
		this.g.flip(); 
        this.btn(euc.dash.lght.ride,"LED",18,60,15,4,1,0,0,119,97,"RIDE",28,60,50);//1
		this.btn((euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB),"WATCH",22,185,17,4,1,122,0,239,97,"ALERTS",22,185,55);		
        this.btn(euc.dash.ks.lift,"SENSOR",18,60,115,4,1,0,100,119,195,"LIFT",30,60,150);
        this.btn(euc.dash.horn,"HORN",25,185,136,4,1,122,100,239,195);		
        this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
		if (euc.dash.lght.ride!=this.ride) {
			this.ride=euc.dash.lght.ride;
	        this.btn(euc.dash.lght.ride,"LED",18,60,15,4,1,0,0,119,97,"RIDE",28,60,50);//1
		}
		if (euc.dash.ks.lift!=this.lift) {
			this.lift=euc.dash.ks.lift;
			this.btn(euc.dash.ks.lift,"SENSOR",18,60,115,4,1,0,100,119,195,"LIFT",30,60,150);
		}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },100,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
			this.g.setColor(0,(bt)?clr1:clr0);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size1);	
			this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
   			if (txt2){this.g.setFont("Vector",size2);	
            this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
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
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("OPTIONS",120-(t.g.stringWidth("OPTIONS")/2),217); 
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(98,200,120,204);
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
		face.go("dashKingsong",0);
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
		if ( x<=120 && y<100 ) { //ride led
			buzzer([30,50,30]);
			euc.wri("setLedRideOnOff",euc.dash.lght.ride);
            face[0].ntfy("RIDE LED ON","RIDE LED OFF",20,1,euc.dash.lght.ride);
		}else if ( 120<=x && y<=100 ) { //watch alerts
			buzzer([30,50,30]);						
			face.go("dashAlerts",0);
			return;		
		}else if ( x<=120 && 100<=y ) { //lift sensor
			buzzer([30,50,30]);		
            face[0].ntfy("LIFT SENSOR ENABLED","LIFT SENSOR DISABLED",19,1,euc.dash.ks.lift);
			euc.wri("setLiftOnOff",1-euc.dash.ks.lift);
			//euc.wri((euc.dash.ks.lift)?"liftOn":"liftOff");
		}else if  (120<=x && 100<=y ) { //horn
			euc.dash.horn=1-euc.dash.horn;
            face[0].btn(euc.dash.horn,"HORN",25,185,136,4,1,122,100,239,195);
            face[0].ntfy("SIDE BTN HORN >2KPH","HORN DISABLED",(euc.dash.horn)?19:20,1,euc.dash.horn);
			buzzer([30,50,30]);						
		}else buzzer([30,50,30]);
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else //if (y>100) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		//} else {buzzer(40);}
		this.timeout();
		break;
	case 3: //slide left event
		face.go("dashKingsongOpt2",0);
		return;
	case 4: //slide right event (back action)
		face.go("dashKingsong",0);
		return;
	case 12: //hold event
		if ( x<=120 && y<100 ) { //ride led
			euc.dash.lght.ride=1-euc.dash.lght.ride;
			buzzer([30,50,30]);
            face[0].btn(euc.dash.lght.ride,"LED",18,60,15,4,1,0,0,119,97,"RIDE",28,60,50);//1
            face[0].ntfy("RIDE LED ON","RIDE LED OFF",20,1,euc.dash.lght.ride);
			euc.wri("setLedRideOnOff",euc.dash.lght.ride);
		}else if ( 120<=x && y<=100 ) { //haptic
			if (euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB) {euc.dash.hapS=0;euc.dash.hapA=0;euc.dash.hapT=0;euc.dash.hapB=0;}
			else {euc.dash.hapS=1;euc.dash.hapA=1;euc.dash.hapT=1;euc.dash.hapB=1;}
			face[0].btn((euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB),"WATCH",22,185,17,4,1,122,0,239,97,"ALERTS",22,185,55);		
			face[0].ntfy("HAPTIC ENABLED","HAPTIC DISABLED",20,1,(euc.dash.hapS||euc.dash.hapA||euc.dash.hapT||euc.dash.hapB));
			buzzer([30,50,30]);
		}else if ( x<=120 && 100<=y ) { //lift sensor
			euc.dash.ks.lift=1-euc.dash.ks.lift;
			buzzer([30,50,30]);		
            face[0].btn(euc.dash.ks.lift,"SENSOR",18,60,115,4,1,0,100,119,195,"LIFT",30,60,150);
            face[0].ntfy("LIFT SENSOR ENABLED","LIFT SENSOR DISABLED",19,1,euc.dash.ks.lift);
			euc.wri("setLiftOnOff",euc.dash.ks.lift);
		}else if  (120<=x && 100<=y ) { //horn
			euc.dash.horn=1-euc.dash.horn;
            face[0].btn(euc.dash.horn,"HORN",25,185,136,4,1,122,100,239,195);
            face[0].ntfy("SIDE BTN HORN >2KPH","HORN DISABLED",(euc.dash.horn)?19:20,1,euc.dash.horn);
			buzzer([30,50,30]);						
		}else buzzer([30,50,30]);
		this.timeout();
		break;
  }
};
