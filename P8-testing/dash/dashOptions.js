E.setFlags({pretokenise:1});
//dash  Options
//dash options
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:15000,
	g:w.gfx,
	init: function(){
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
		if (!ew.def.dash.rtr) ew.def.dash.rtr=5;
		this.page=0;
		this.g.setColor(0,0);
		this.g.fillRect(0,160,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",25);
		this.g.drawString("DASH OPTIONS",120-(this.g.stringWidth("DASH OPTIONS")/2),217);
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(75,180,165,184);
		this.g.setColor(1,15);
      	this.g.fillRect(75,180,120,184);
		this.g.flip();
        this.g.setColor(1,2);
      	this.g.fillRect(120,180,165,184);
		this.g.flip();
		this.btn(1,(ew.def.dash.mph)?"MPH":"KPH",30,40,25,4,0,0,0,75,75);//1
		this.btn(1,"o",20,100,20,4,0,80,0,155,75,(ew.def.dash.farn)?"F":"C",30,120,25);//2
		//let makr=ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Maker");
		//if (makr) {
			//if (makr=="Begode"){
		//this.btn(1,"EMPTY",15,200,10,1,0,160,0,239,75,euc.dash.opt.bat.low/100,30,200,35); //3
		this.btn(1,"",15,200,10,1,0,160,0,239,75); //3
		this.btn(1,"SPEED X",15,40,90,1,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
		this.btn(1,"DIST X",15,120,90,1,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
		this.btn(1,"RETRY",15,200,90,1,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
        //this.run=true;
	},
	show : function(){
		if (!this.run) return;
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
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
    ntfy: function(txt0,txt1,size,bt,clr,tm,s){
    // txt0 - title
    // txt1 - value
    // size - font size for value
    // bt - ???
    // clr - background color
    // tm - timeout
    // s - show arrows
			if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
            this.g.setColor(0,clr);
			this.g.fillRect(0,160,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",18);
     		this.g.drawString(txt0,120-(this.g.stringWidth(txt0)/2),170);
			if (s) {this.g.setFont("Vector",50);this.g.drawString("<",5,200);this.g.drawString(">",215,200);}
			this.g.setFont("Vector",size);
     		this.g.drawString(txt1,120-(this.g.stringWidth(txt1)/2),205);
			this.g.flip();
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.set=0;
				if (!t.page){
					t.btn(1,"SPEED X",15,40,90,1,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
					t.btn(1,"DIST X",15,120,90,1,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
					t.btn(1,"RETRY",15,200,90,1,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
				}else {
					face[0].btn(1,"FULL",15,40,10,1,0,0,0,75,75,euc.dash.opt.bat.hi/100,30,40,35); //1
					face[0].btn(1,"EMPTY",15,40,90,1,0,0,80,75,155,euc.dash.opt.bat.low/100,30,40,120); //4
				}
				t.g.setColor(0,0);
				t.g.fillRect(0,156,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",25);
				t.g.drawString("DASH OPTIONS",120-(t.g.stringWidth("DASH OPTIONS")/2),217);
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(75,180,165,184);
				t.g.setColor(1,(t.page)?2:15);
				t.g.fillRect(75,180,120,184);
				t.g.flip();
				t.g.setColor(1,(t.page)?15:2);
				t.g.fillRect(120,180,165,184);
				t.g.flip();
			},tm,this);
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
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		return true;
	},
	show : function(){
		face.go(appRoot[0],0);
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
			if (y < 155) {
				face[0].set=0;
				if (!face[0].page){
					//face[0].btn(1,"EMPTY",15,200,10,1,0,160,0,239,75,euc.dash.opt.bat.low/100,30,200,35); //3
					face[0].btn(1,"SPEED X",15,40,90,1,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
					face[0].btn(1,"DIST X",15,120,90,1,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
					face[0].btn(1,"RETRY",15,200,90,1,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
				}else {
					face[0].btn(1,"FULL",15,40,10,1,0,0,0,75,75,euc.dash.opt.bat.hi/100,30,40,35); //1
					face[0].btn(1,"EMPTY",15,40,90,1,0,0,80,75,155,euc.dash.opt.bat.low/100,30,40,120); //4
				}
				touchHandler[0](e,x,y);
				return;
			} else{
				buzzer.nav([30,50,30]);
				if (face[0].set=="spdF") {
					if (x<120){ //spd
						euc.dash.opt.unit.fact.spd=(euc.dash.opt.unit.fact.spd - 0.01);
						if (euc.dash.opt.unit.fact.spd <0.5)  euc.dash.opt.unit.fact.spd=0.5;
					}else{
						euc.dash.opt.unit.fact.spd=(euc.dash.opt.unit.fact.spd + 0.01);
						if (1.5 <euc.dash.opt.unit.fact.spd)  euc.dash.opt.unit.fact.spd=1.5;
					}
					face[0].btn(1,"SPEED X",15,40,90,12,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
					face[0].ntfy("SPEED FACTOR",euc.dash.opt.unit.fact.spd,40,1,12,5000,1);
				}else if (face[0].set=="trpF") {
					if (x<120){ //spd
						euc.dash.opt.unit.fact.dist=(euc.dash.opt.unit.fact.dist - 0.01);
						if (euc.dash.opt.unit.fact.dist <0.5)  euc.dash.opt.unit.fact.dist=0.5;
					}else{
						euc.dash.opt.unit.fact.dist=(euc.dash.opt.unit.fact.dist + 0.01);
						if (1.5 <euc.dash.opt.unit.fact.dist)  euc.dash.opt.unit.fact.dist=1.5;
					}
					face[0].btn(1,"DIST X",15,120,90,12,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
					face[0].ntfy("DISTANCE FACTOR",euc.dash.opt.unit.fact.dist,40,1,12,5000,1);
				}else if (face[0].set=="rtr") { //temp
				  if (x<120){ //
						ew.def.dash.rtr--; if ( ew.def.dash.rtr <= 1 ) ew.def.dash.rtr = 1;
					}else{ //back
						ew.def.dash.rtr++; if (20 <= ew.def.dash.rtr) ew.def.dash.rtr = 20;
					}
					face[0].btn(1,"RETRY",15,200,90,12,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
					face[0].ntfy("NUMBER OF RETRIES",ew.def.dash.rtr,40,1,12,5000,1);
				}else if (face[0].set=="batF") { //bat
					if (x<120){ //
						euc.dash.opt.bat.hi--; if ( euc.dash.opt.bat.hi <= 400 ) euc.dash.opt.bat.hi = 400;
					}else{ //back
						euc.dash.opt.bat.hi++; if (425 <= euc.dash.opt.bat.hi) euc.dash.opt.bat.hi = 425;
					}
					face[0].btn(1,"FULL",15,40,10,12,0,0,0,75,75,euc.dash.opt.bat.hi/100,30,40,35); //1
					face[0].ntfy("100% WHEN CELL IS AT",euc.dash.opt.bat.hi/100 + " Volt",30,1,12,3000,1);
				}else if (face[0].set=="batE") { //bat
					if (x<120){ //
						euc.dash.opt.bat.low--; if ( euc.dash.opt.bat.low <= 300 ) euc.dash.opt.bat.low = 300;
					}else{ //back
						euc.dash.opt.bat.low++; if (340 <= euc.dash.opt.bat.low) euc.dash.opt.bat.low = 340;
					}
					face[0].btn(1,"EMPTY",15,40,90,12,0,0,80,75,155,euc.dash.opt.bat.low/100,30,40,120); //4
					face[0].ntfy("0% WHEN CELL IS AT",euc.dash.opt.bat.low/100 + " Volt",30,1,12,3000,1);
				}else if (face[0].set=="batP") { //bat
					if (x<120){ //
						euc.dash.opt.bat.pack--; if (euc.dash.opt.bat.pack < 1) euc.dash.opt.bat.pack = 1;
					}else{ //back
						euc.dash.opt.bat.pack++; if (99 < euc.dash.opt.bat.pack) euc.dash.opt.bat.pack = 99;
					}
					face[0].btn(1,"PACK",15,200,90,4,0,160,80,239,155,"S" + euc.dash.opt.bat.pack.toString(10),30,200,120); //6
					face[0].ntfy("BATTERY VOLTAGE",euc.dash.opt.bat.pack*4.2,40,1,4,3000,1);
				}else  {
					buzzer.nav(40);
					face[0].set=0;
					face[0].btn(1,"SPEED X",15,40,90,1,4,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
					face[0].btn(1,"DIST X",15,120,90,1,4,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
				}
			}
		}else if (!face[0].page){
			if (x<75 && y<75) { //1
				//face[0].set="mph";
				buzzer.nav([30,50,30]);
				ew.def.dash.mph=1-ew.def.dash.mph;
				face[0].btn(1,(ew.def.dash.mph)?"MPH":"KPH",30,40,25,4,0,0,0,75,75);
				face[0].ntfy("SPEED & DISTANCE IN",(ew.def.dash.mph)?"MILES":"KILOMETERS",30,1,4,1500);
			}else if (75<= x && x < 155 && y < 75) { //2
				//face[0].set="far";
				buzzer.nav([30,50,30]);
				ew.def.dash.farn=1-ew.def.dash.farn;
				face[0].btn(1,"o",20,100,20,4,0,80,0,155,75,(ew.def.dash.farn)?"F":"C",30,120,25);
				face[0].ntfy("TEMPERATURE IN",(ew.def.dash.farn)?"FAHRENHEIT":"CELSIUS",30,1,4,1500);
			}else if (155 <= x && y < 75) { //3
				buzzer.nav(40);
			}else if (x<75 && 75 <y && y < 155) { //4
				buzzer.nav([30,50,30]);
				face[0].set="spdF";
				face[0].btn(1,"SPEED X",15,40,90,12,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
				face[0].ntfy("SPEED FACTOR",euc.dash.opt.unit.fact.spd,40,1,12,3000,1);
			}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
				buzzer.nav([30,50,30]);
				face[0].set="trpF";
				face[0].btn(1,"DIST X",15,120,90,12,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
				face[0].ntfy("DISTANCE FACTOR",euc.dash.opt.unit.fact.dist,40,1,12,3000,1);
			}else if (155 <= x && 75 <y && y < 155) { //6
				buzzer.nav([30,50,30]);
				face[0].set="rtr";
				face[0].btn(1,"RETRY",15,200,90,12,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
				face[0].ntfy("NUMBER OF RETRIES",ew.def.dash.rtr,40,1,12,3000,1);
			}else buzzer.nav(40);
		}else {
			if (x<75 && y<75) { //1
				buzzer.nav([30,50,30]);
				face[0].set="batF";
				face[0].btn(1,"FULL",15,40,10,12,0,0,0,75,75,euc.dash.opt.bat.hi/100,30,40,35); //1
				face[0].ntfy("100% WHEN CELL IS AT",euc.dash.opt.bat.hi/100 + " Volt",30,1,12,3000,1);
			}else if (75<= x && x < 155 && y < 75) { //2
				buzzer.nav(50);
			}else if (155 <= x && y < 75) { //3
				euc.dash.opt.unit.ampR=1-euc.dash.opt.unit.ampR;
				face[0].btn(1,"AMP",15,200,10,4,1,160,0,239,75,(euc.dash.opt.unit.ampR)?"R":"N",30,200,35); //3
				face[0].ntfy("AMPERAGE REPORT",(euc.dash.opt.unit.ampR)?"REVERSED":"NORMAL",30,1,4,1500);
				buzzer.nav([30,50,30]);
			}else if (x<75 && 75 <y && y < 155) { //4   15,40,90,12,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120);
				buzzer.nav([30,50,30]);
				face[0].set="batE";
				face[0].btn(1,"EMPTY",15,40,90,12,0,0,80,75,155,euc.dash.opt.bat.low/100,30,40,120); //4
				face[0].ntfy("0% WHEN CELL IS AT",euc.dash.opt.bat.low/100 + " Volt",30,1,12,3000,1);
			}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
				buzzer.nav(40);
			}else if (155 <= x && 75 <y && y < 155) { //6
				face[0].set="batP";
				face[0].btn(1,"PACK",15,200,90,4,0,160,80,239,155,"S" + euc.dash.opt.bat.pack.toString(10),30,200,120); //6
				face[0].ntfy("BATTERY VOLTAGE",euc.dash.opt.bat.pack*4.2,40,1,4,3000,1);
				buzzer.nav([30,50,30]);
			}else buzzer.nav(40);
		}
		//yhis.timeout();
		return;
	case 1: //slide down event
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		if (face.faceSave!=-1) {
			face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else{
			if (face.appPrev=="settings") {face.appPrev="clock";face.pagePrev=0;}
			face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		}
		return;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up.
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
			//yhis.timeout();
			return;
		}else {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go("settings",0);
			return;
		}
		break;
	case 3: //slide left event
		//yhis.timeout();
		if (!face[0].page) {
			face[0].page=1;
			euc.dash.opt.bat.pack = Math.ceil(euc.dash.opt.bat.pack);
			if (!euc.dash.opt.bat.pack) euc.dash.opt.bat.pack = 1;
			face[0].btn(1,"FULL",15,40,10,1,0,0,0,75,75,euc.dash.opt.bat.hi/100,30,40,35); //1
			face[0].btn(1,"",20,100,20,1,0,80,0,155,75,"",30,120,25);//2
			face[0].btn(1,"AMP",15,200,10,4,0,160,0,239,75,(euc.dash.opt.unit.ampR)?"R":"N",30,200,35); //3
			face[0].btn(1,"EMPTY",15,40,90,1,0,0,80,75,155,euc.dash.opt.bat.low/100,30,40,120); //4
			face[0].btn(1,"",15,120,90,1,0,80,80,155,155,"",30,120,120); //5
			face[0].btn(1,"PACK",15,200,90,4,0,160,80,239,155,"S" + euc.dash.opt.bat.pack.toString(10),30,200,120); //6
			if (face[0].ntid) {
				clearTimeout(face[0].ntid);face[0].ntid=0;
				w.gfx.setColor(0,0);
				w.gfx.fillRect(0,156,239,239);
				w.gfx.setColor(1,15);
				w.gfx.setFont("Vector",25);
				w.gfx.drawString("DASH OPTIONS",120-(w.gfx.stringWidth("DASH OPTIONS")/2),217);
				w.gfx.flip();
			}
			w.gfx.setColor(0,0);
			w.gfx.fillRect(75,180,165,184);
			w.gfx.setColor(1,2);
			w.gfx.fillRect(75,180,120,184);
			w.gfx.flip();
			w.gfx.setColor(1,15);
			w.gfx.fillRect(120,180,165,184);
			w.gfx.flip();
		}else
			buzzer.nav(40);
		break;
	case 4: //slide right event (back action)
		if (face[0].page) {
			//yhis.timeout();
			face[0].page=0;
			face[0].btn(1,(ew.def.dash.mph)?"MPH":"KPH",30,40,25,4,0,0,0,75,75);//1
			face[0].btn(1,"o",20,100,20,4,0,80,0,155,75,(ew.def.dash.farn)?"F":"C",30,120,25);//2
			face[0].btn(1,"",15,200,10,1,0,160,0,239,75); //3
			//face[0].btn(1,"EMPTY",15,200,10,1,0,160,0,239,75,euc.dash.opt.bat.low/100,30,200,35); //3
			face[0].btn(1,"SPEED X",15,40,90,1,0,0,80,75,155,euc.dash.opt.unit.fact.spd,30,40,120); //4
			face[0].btn(1,"DIST X",15,120,90,1,0,80,80,155,155,euc.dash.opt.unit.fact.dist,30,120,120); //5
			face[0].btn(1,"RETRY",15,200,90,1,0,160,80,239,155,ew.def.dash.rtr,30,200,120); //6
			if (face[0].ntid) {
				clearTimeout(face[0].ntid);face[0].ntid=0;
				w.gfx.setColor(0,0);
				w.gfx.fillRect(0,156,239,239);
				w.gfx.setColor(1,15);
				w.gfx.setFont("Vector",25);
				w.gfx.drawString("DASH OPTIONS",120-(w.gfx.stringWidth("DASH OPTIONS")/2),217);
				w.gfx.flip();
			}
			w.gfx.setColor(0,0);
			w.gfx.fillRect(75,180,165,184);
			w.gfx.setColor(1,15);
			w.gfx.fillRect(75,180,120,184);
			w.gfx.flip();
			w.gfx.setColor(1,2);
			w.gfx.fillRect(120,180,165,184);
			w.gfx.flip();
		}else {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go(face.appPrev,0);
		}
		return;
	case 12: //hold event
		buzzer.nav(40);
		//yhis.timeout();
		break;
  }
};
