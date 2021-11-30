//Ninebot Z settings
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		//euc.busy=1;//stop bt loop-accept commands.
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
 		if (!this.set&&(face.appPrev.startsWith("dash_")||face.appPrev==="settings")) this.g.clear();
        this.set=0;
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("SETTINGS",120-(this.g.stringWidth("SETTINGS")/2),217); 
		this.g.flip();
		//
        this.btn(dash.live.light,"LIGHT",18,60,15,4,1,0,0,119,97,(dash.live.light)?"ON":"OFF",28,60,50);
		this.btn((dash.live.hapS||dash.live.hapA||dash.live.hapT||dash.live.hapB),"WATCH",22,185,17,4,1,122,0,239,97,"ALERTS",22,185,55);		
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		this.btn(dash.live.tpms,(dash.live.tpms)?dash.live.tpms:"TPMS",18,60,115,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1,1,0,100,119,195,(dash.live.tpms)?(tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].psi)?Math.round(tpms.euc[dash.live.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",(dash.live.tpms)?32:28,60,150); //3				
        this.btn(dash.live.horn,"HORN",25,185,136,4,1,122,100,239,195);	
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
		//euc.busy=0;euc.wri("live");
		face.go(set.dash[set.def.dash.face],0);
		return;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5:  //tap/hold event
		if (face[0].set) { 
			if ( 100 < y ) {
              w.gfx.setColor(0,0);
              w.gfx.drawLine(120,0,120,97);
              w.gfx.drawLine(121,0,121,97);
              w.gfx.flip();
              face[0].init();return;
            }
			buzzer(buz.ok);
		}
		else {
			if ( x<=120 && y<100 ) { //Light
				buzzer(buz.ok);
				//dash.live.light=1-dash.live.light;
				//euc.wri((dash.live.light)?"lightsOn":"lightsOff");
		        //face[0].btn(dash.live.light,"LIGHT",18,60,15,4,1,0,0,119,97,(dash.live.light)?"ON":"OFF",28,60,50);
				//face[0].ntfy("LIGHT ON","LIGHT OFF",20,(dash.live.light)?4:1,dash.live.light);
				face[0].ntfy("NOT YET","NOT YET",18,7,1);
			}else if ( 120<=x && y<=100 ) { //watch alerts
				buzzer(buz.ok);						
				face.go("dashAlerts",0);
				return;	
			}else if ( x<=120 && 100<=y ) { //tpms
				buzzer(buz.ok);		
				if (!dash.live.tpms) face[0].ntfy("HOLD-> ON/OFF",4);
				else {
					tpms.def.pos=Object.keys(tpms.def.list).indexOf(dash.live.tpms);
					face.go("tpmsFace",0);
					return;
				}	
			}else if ( 120<=x && 100<=y ) { //HORN
				buzzer(buz.ok);		
				//dash.live.horn=1-dash.live.horn;
				//face[0].btn(dash.live.horn,"HORN",25,185,136,4,1,122,100,239,195);	
				//face[0].ntfy("BUTTON IS HORN >2KPH","HORN DISABLED",(dash.live.horn)?18:20,(dash.live.horn)?4:1,dash.live.horn);
				face[0].ntfy("NOT YET","NOT YET",18,7,1);
			}else buzzer(buz.ok);
		}
		
		break;
	case 1: //slide down event
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50 ) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(buz.ok);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		
		break;
	case 3: //slide left event
		buzzer(buz.na);
		
		break;
	case 4: //slide right event (back action)
        if (face[0].set) {
			w.gfx.setColor(0,0);
			w.gfx.drawLine(120,0,120,97);
			w.gfx.drawLine(121,0,121,97);
			w.gfx.flip();
			face[0].init();
        } else {
			//euc.busy=0;euc.wri("live");
			face.go(set.dash[set.def.dash.face],0);
			return;
        }
   		
        break;
	case 12: //long press event
		if  (x<=120 && 100<=y ) { //tpms
			buzzer(buz.ok);
			if (dash.live.tpms) {
				dash.live.tpms=0;
				face[0].btn(1,"TPMS",18,60,115,1,0,0,100,119,195,"OFF",28,60,155); //3
				face[0].ntfy("TPMS DISABLED","TPMS ",20,1,1);
				return;
			}else{
				if (global.tpms){ 
					tpms.scan();
					face.go("tpmsFace",0);
				}else 
					face[0].ntfy("NOT INSTALLED","",20,7,1);
			}
			return;
	    }else buzzer(buz.na);
		break;	
  }
};
