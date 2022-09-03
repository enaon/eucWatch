//begode on connect
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (euc.dash.auto.onC.HL==undefined) euc.dash.auto.onC.HL=0;
		if (euc.dash.auto.onC.beep==undefined) euc.dash.auto.onC.beep=0;
		if (euc.dash.auto.onC.led==undefined) euc.dash.auto.onC.led=0;
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("ON CONNECT",120-(this.g.stringWidth("ON CONNECT")/2),217); 
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.flip();
		let val=["NA","ON","OFF","STOBE"];
		this.btn(euc.dash.auto.onC.HL,"LIGHT",18,60,20,euc.dash.auto.onC.HL==3?13:euc.dash.auto.onC.HL==1?4:1,0,0,0,119,97,val[euc.dash.auto.onC.HL],25,60,55);
		this.btn(euc.dash.auto.onC.led,"LED",18,185,20,12,0,122,0,239,97,euc.dash.auto.onC.led?euc.dash.auto.onC.led-1+"":"NA",25,185,55);
		//this.btn(euc.dash.auto.onC.led,"LED",18,185,20,euc.dash.auto.LED==1?12:1,0,122,0,239,97,"LED",25,185,55);
        this.btn(euc.dash.auto.onC.beep,"BEEP",18,60,120,euc.dash.auto.onC.beep==1?12:1,0,0,100,119,195,euc.dash.auto.onC.beep?"ON":"NA",25,60,155);
        //this.btn(euc.dash.auto.onC.talk,"VOICE",18,185,115,euc.dash.auto.onC.talk==1?12:1,0,122,100,239,195,"MODE",25,185,155);	
        this.btn(0,"",18,185,115,1,0,122,100,239,195,"",25,185,155);	

		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
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
		        t.g.drawString("ON CONNECT",120-(t.g.stringWidth("ON CONNECT")/2),217); 
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
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
		face.go("dashBegodeOpt",0);
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
		if ( x<=120 && y<100 ) { //light
			euc.dash.auto.onC.HL++;  if (3<euc.dash.auto.onC.HL) euc.dash.auto.onC.HL=0;
			//let val=["NA","CITY","AUTO","ON","OFF"];
			let val=["NA","ON","OFF","STOBE"];
			face[0].btn(euc.dash.auto.onC.HL,"LIGHT",18,60,20,euc.dash.auto.onC.HL==3?13:euc.dash.auto.onC.HL==1?4:1,0,0,0,119,97,val[euc.dash.auto.onC.HL],25,60,55);
            face[0].ntfy("SET LIGHT "+val[euc.dash.auto.onC.HL],"NO ACTION",20,1,euc.dash.auto.onC.HL);
			buzzer.nav([30,50,30]);
		}else if ( 120<=x && y<=100 ) { //led
			euc.dash.auto.onC.led++; if (10<euc.dash.auto.onC.led) euc.dash.auto.onC.led=0;
			face[0].btn(euc.dash.auto.onC.led,"LED",18,185,20,12,0,122,0,239,97,euc.dash.auto.onC.led?euc.dash.auto.onC.led-1+"":"NA",25,185,55);
			face[0].ntfy("LED MODE","NO ACTION",20,1,euc.dash.auto.onC.led);
			buzzer.nav([30,50,30]);
		}else if ( x<=120 && 100<=y ) { //beep
			euc.dash.auto.onC.beep=1-euc.dash.auto.onC.beep;
            face[0].btn(euc.dash.auto.onC.beep,"BEEP",18,60,120,euc.dash.auto.onC.beep==1?12:1,0,0,100,119,195,euc.dash.auto.onC.beep?"ON":"NA",25,60,155);
            face[0].ntfy("BEEP ON CONNECT","NO ACTION",20,1,euc.dash.auto.onC.beep);
			buzzer.nav([30,50,30]);		
		}else if  (120<=x && 100<=y ) {
			buzzer.nav(40);					
		}else buzzer.nav(40);
		break;
	case 1: //slide down event
		//face.go("clock",0);
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else //if (y>100) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		//} else {buzzer.nav(40);}
		break;
	case 3: //slide left event
		buzzer.nav(40);
		return;
	case 4: //slide right event (back action)
		face.go("dashBegodeOpt2",0);
		return;
  }
};
