//kingsong  set DIS
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
		this.g.drawString("ON DISCONNECT",120-(this.g.stringWidth("ON DISCONNECT")/2),217); 
		this.g.flip(); 
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,200,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(75,200,115,204);
		this.g.flip(); 
		let val=["NA","ON","OFF","AUTO","CITY"];
	    this.btn(euc.dash.ks.aHLD,"LIGHT",18,60,15,euc.dash.ks.aHLD!=2?12:1,0,0,0,119,97,val[euc.dash.ks.aHLD],28,60,50);
		this.btn(euc.dash.ks.aRideD,"LED",18,185,15,euc.dash.ks.aRideD==1?12:1,0,122,0,239,97,"RIDE",28,185,50);
        this.btn(euc.dash.ks.aLiftD,"SENSOR",18,60,115,euc.dash.ks.aLiftD==1?12:1,0,0,100,119,195,"LIFT",30,60,150);
        this.btn(euc.dash.ks.aVoiceD,"VOICE",18,185,115,euc.dash.ks.aVoiceD==1?12:1,0,122,100,239,195,"MODE",30,185,150);	
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
		        t.g.drawString("ON DISCONNECT",120-(t.g.stringWidth("ON DISCONNECT")/2),217); 
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(75,200,115,204);
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
		face.go("dashKingsongOpt",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	face.off();
	switch (e) {
      case 5: case 12: //tap event
		if ( x<=120 && y<100 ) { //lights
			euc.dash.ks.aHLD++;  if (3<euc.dash.ks.aHLD) euc.dash.ks.aHLD=0;
			let val=["NA","ON","OFF","AUTO"];
			face[0].btn(euc.dash.ks.aHLD,"LIGHT",18,60,15,euc.dash.ks.aHLD!=2?12:1,0,0,0,119,97,val[euc.dash.ks.aHLD],28,60,50);
            face[0].ntfy("SET LIGHT "+val[euc.dash.ks.aHLD],"NO ACTION",20,1,euc.dash.ks.aHLD);
			buzzer([30,50,30]);
		}else if ( 120<=x && y<=100 ) { //ride
			euc.dash.ks.aRideD++; if (2<euc.dash.ks.aRideD) euc.dash.ks.aRideD=0;
			face[0].btn(euc.dash.ks.aRideD,"LED",18,185,15,euc.dash.ks.aRideD==1?12:1,0,122,0,239,97,"RIDE",28,185,50);
			face[0].ntfy(euc.dash.ks.aRideD==1?"ENABLE RIDE LED":"DISABLE RIDE LED","NO ACTION",20,1,euc.dash.ks.aRideD);
			buzzer([30,50,30]);
		}else if ( x<=120 && 100<=y ) { //auto lift
			euc.dash.ks.aLiftD++; if (2<euc.dash.ks.aLiftD) euc.dash.ks.aLiftD=0;
            face[0].btn(euc.dash.ks.aLiftD,"SENSOR",18,60,115,euc.dash.ks.aLiftD==1?12:1,0,0,100,119,195,"LIFT",30,60,150);
            face[0].ntfy(euc.dash.ks.aLiftD==1?"ENABLE LIFT HANDLE":"DISABLE LIFT HANDLE","NO ACTION",20,1,euc.dash.ks.aLiftD);
			buzzer([30,50,30]);		
		}else if  (120<=x && 100<=y ) { //voice
			euc.dash.ks.aVoiceD++;  if (2<euc.dash.ks.aVoiceD) euc.dash.ks.aVoiceD=0;
			face[0].btn(euc.dash.ks.aVoiceD,"VOICE",18,185,115,euc.dash.ks.aVoiceD==1?12:1,0,122,100,239,195,"MODE",30,185,150);	
            face[0].ntfy(euc.dash.ks.aVoiceD==1?"ENABLE VOICE MODE":"DISABLE VOICE MODE","NO ACTION",20,1,euc.dash.ks.aVoiceD);
			buzzer([30,50,30]);		
		}else buzzer(40);
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
		break;
	case 3: //slide left event
		face.go("dashKingsongDis2",0);
		return;
	case 4: //slide right event (back action)
		face.go("dashKingsongOpt2",0);
		return;
  }
};
