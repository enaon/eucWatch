//begode advanced
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("WHEEL SETTINGS",122-(this.g.stringWidth("WHEEL SETTINGS")/2),217); 
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,201,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(143,201,165,204);
		this.g.flip(); 
		this.btn(1,"CALIBRATE",18,185,35,12,1,122,0,239,97,"",25,185,55);		
        this.btn(1,"WHEEL",18,185,120,12,1,122,100,239,195,"ALERTS",22,185,155);
		this.mode=-1
		this.rolA=-1
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
		if ( this.mode!=euc.dash.opt.ride.mode) {
            this.mode=euc.dash.opt.ride.mode;
			let md=["SOFT","MED","HARD"];
			this.btn(euc.dash.opt.ride.mode,"MODE",18,60,20,euc.dash.opt.ride.mode==1?2:4,1,0,0,119,97,md[euc.dash.opt.ride.mode],25,60,55);
		}
		if ( this.rolA!=euc.dash.opt.ride.rolA) {
            this.rolA=euc.dash.opt.ride.rolA;
			let amd=["LOW","MED","HI"];
			this.btn(euc.dash.opt.ride.rolA,"ANGLE",18,60,120,euc.dash.opt.ride.rolA==1?2:4,1,0,100,119,195,amd[euc.dash.opt.ride.rolA],22,60,155);	
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
		face.go("dashBegode",0);
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
		if ( x<=120 && y<=100 ) { //ride mode
			buzzer.nav([30,50,30]);	
			if (euc.dash.opt.ride.mode==0){
				euc.wri("pedalMedium");
				euc.dash.opt.ride.mode=1;
			}else if (euc.dash.opt.ride.mode==1){
				euc.wri("pedalHard");
				euc.dash.opt.ride.mode=2;
			}else if (euc.dash.opt.ride.mode==2){
				euc.wri("pedalSoft");
				euc.dash.opt.ride.mode=0;
			}
		}else if ( 120<=x  && y<=100 ) { //calibrate
            buzzer.nav([30,50,30]);
			face.go("dashBegodeAdvCalibrate",0);
			return;
		}else if ( 120<=x && 100<=y ) { //limit
			buzzer.nav([30,50,30]);
			face.go("dashBegodeAdvLimits",0);
			return;
		}else if ( x<=120 && 100<=y ) {   //angle
			buzzer.nav([30,50,30]);		
			if (euc.dash.opt.ride.rolA==0){
				euc.wri("rollAngleMedium");
				euc.dash.opt.ride.rolA=1;
			}else if (euc.dash.opt.ride.rolA==1){
				euc.wri("rollAngleHigh");
				euc.dash.opt.ride.rolA=2;
			}else if (euc.dash.opt.ride.rolA==2){
				euc.wri("rollAngleLow");
				euc.dash.opt.ride.rolA=0;
			}
		}else buzzer.nav([30,50,30]);
		this.timeout();
		break;
	case 1: //slide down event
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer.nav(40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashBegodeOpt2",0);
		return;
  }
};
