//kingsong 
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(val){
		this.last=10;
		if (euc.temp.pass)  {face.go("dashKingsongAdvPass",0,1);return;} 
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,200,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(75,200,98,204);
		this.g.flip(); 
		this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("ACTIONS",120-(this.g.stringWidth("ACTIONS")/2),217); 
		this.g.flip(); 
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		face[0].btn(1,euc.dash.opt.tpms?euc.dash.opt.tpms:"TPMS",18,60,115,(euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].time&&(getTime()|0)-tpms.euc[euc.dash.opt.tpms].time<1800)?(tpms.euc[euc.dash.opt.tpms].alrm)?13:4:1,1,0,100,119,195,(euc.dash.opt.tpms)?(tpms.euc[euc.dash.opt.tpms]&&tpms.euc[euc.dash.opt.tpms].psi)?Math.round(tpms.euc[euc.dash.opt.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",(euc.dash.opt.tpms)?32:28,60,150);
		if (!euc.temp.lockKey&&euc.dash.opt.lock.en){
			setTimeout(()=>{
					euc.wri("getLock");
			},100);
		}
		if (!euc.temp.strbstatus) {
			euc.temp.strbstatus=1;
			setTimeout(()=>{
				euc.wri("getStrobe");
			},300);
		}
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
		if ( this.light!=euc.dash.opt.lght.HL) {
            this.light=euc.dash.opt.lght.HL;
			let val=["CITY","ON","OFF","AUTO"];
			this.btn(euc.dash.opt.lght.HL!=2?1:0,euc.dash.opt.lght.city?"CITY":"LIGHTS",18,60,20,euc.dash.opt.lght.city?12:4,1,0,0,119,97,val[euc.dash.opt.lght.HL],25,60,55);
		}if ( this.strb!=euc.dash.opt.lght.strb) {
            this.strb=euc.dash.opt.lght.strb;
			this.btn(euc.dash.opt.lght.strb,"STROBE",18,185,20,13,1,122,0,239,97,euc.dash.opt.lght.strb?"ON":"OFF",25,185,55);	
			//this.btn(euc.dash.opt.lght.strb,"STROBE",18,185,20,13,1,122,0,239,97,"",25,185,55);	
		}
		if ( this.lock!=euc.dash.opt.lock.en) {
			this.lock=euc.dash.opt.lock.en;
			this.btn(euc.dash.opt.lock.en,"LOCK",25,185,136,euc.dash.auto.onC.unlk?9:13,1,122,100,239,195,"",25,185,155);	
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
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(75,200,98,204);
				t.g.flip(); 
				t.g.setColor(0,0);
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",22);
		        t.g.drawString("HEAD LIGHT",120-(t.g.stringWidth("HEAD LIGHT")/2),212); 
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
		face.go(ew.is.dash[ew.def.dash.face],0);
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
      case 5: //tap event
		if ( x<=120 && y<100 ) { //lights
			face.go("dashKingsongLight",0,"HL");
			return;
		}else if ( 120<=x && y<=100 ) { //STROBE
			buzzer.nav([30,50,30]);	
			euc.wri("setStrobeOnOff",1-euc.dash.opt.lght.strb);
		}else if ( x<=120 && 100<=y ) { //tpms
			buzzer.nav([30,50,30]);		
			if (!euc.dash.opt.tpms) face[0].ntfy("HOLD-> ON/OFF","NO ACTION",19,4,1);
			else {
				tpms.def.pos=Object.keys(tpms.def.list).indexOf(euc.dash.opt.tpms);
				face.go("tpmsFace",0);
				return;
			}
		}else if  (120<=x && 100<=y ) { //Lock
			//euc.dash.opt.lock.en=1-euc.dash.opt.lock.en;
			buzzer.nav([30,50,30]);	
			//euc.wri((1-euc.dash.opt.lock.en)?"doLock":"doUnlock",euc.temp.lockKey);
			if (euc.dash.opt.lock.en) {
				if (euc.dbg) console.log("EUC dash: starting unlock, lock key:",euc.temp.lockKey)
				euc.wri("doUnlock",euc.temp.lockKey);
			}else  euc.wri("doLock");
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
		face.go("dashKingsongOpt",0);
		return;	
	case 4: //slide right event (back action)
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;
	case 12:
		if  (x<=120 && 100<=y ) { //tpms
			buzzer.nav([30,50,30]);
			if (euc.dash.opt.tpms) {
				euc.dash.opt.tpms=0;
				face[0].btn(0,"TPMS",18,60,115,4,1,0,100,119,195,"OFF",28,60,150);
				//face[0].btn("TPMS",18,60,115,1,0,100,119,195,"OFF",28,60,155); //3
				face[0].ntfy("TPMS DISABLED","NO ACTION",19,1,1);
				return;
			}else{
				if (global.tpms){ 
					tpms.scan();
					face.go("tpmsFace",0);
				}else 
					face[0].ntfy("NO MODULE","NO ACTION",19,1,1);
			}
			return;
		}else buzzer.nav(40);
		break;
  }
};
