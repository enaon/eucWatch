E.setFlags({pretokenise:1});
//Dash Scan
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
  g:w.gfx,
  init: function(o){
    this.g.setColor(0,0);
    this.g.fillRect(0,205,239,239);
    this.g.setColor(1,15);
    this.g.setFont("Vector",20);
	this.g.drawString("SCAN FOR",120-(this.g.stringWidth("SCAN FOR")/2),217);
    this.g.flip();
	this.page(1);

  },
  show : function(o){
	return;
  },
  page : function(n) {
    this.set=n;
    this.g.setColor(0,1);
    this.g.fillRect(0,0,239,96);
    this.g.setColor(1,15);
    this.g.setFont("Vector",26);
    let s=(n==1)?"INMOTION":(n==2)?"BEGODE":(n==3)?"NINEBOT":(n==4)?"NINEBOT":"INMOTION V2";
    this.g.drawString(s,120-(this.g.stringWidth(s)/2),38);
    this.g.setFont("Vector",14);
    s=(n==1)?"V5/V8/V10":(n==2)?"":(n==3)?"ONE Z10":(n==4)?"ONE S2":"V11/V12/V13 TEST";
    this.g.drawString(s,120-(this.g.stringWidth(s)/2),73);
    this.g.flip();
	this.g.setColor(0,0);
	this.g.drawLine(0,97,239,97);
	this.g.drawLine(0,98,239,98);
    this.g.flip();
	if (n==1) {
		this.g.drawLine(120,99,120,195);this.g.drawLine(121,99,121,195);
		this.g.flip();
	}
    this.g.setColor(0,1);
	if (n==1) {
		this.g.fillRect(0,99,119,195);this.g.flip();this.g.fillRect(122,99,239,195);this.g.flip();
	}
	else
		this.g.fillRect(0,99,239,195);
    this.g.setColor(1,15);
	this.g.setFont("Vector",26);
	if (n==1) {this.g.drawString("V11",30,135);this.g.flip();this.g.drawString("V12",160,135);
	}else {
    this.g.drawString((n==1)?"INMOTION V11":(n==2)?"VETERAN":(n==3)?"NINEBOT":(n==4)?"KINGSONG":"",120-(this.g.stringWidth((n==1)?"INMOTION V11":(n==2)?"VETERAN":(n==3)?"NINEBOT":(n==4)?"KINGSONG":"")/2),130);
	this.g.setFont("Vector",14);
    this.g.drawString((n==1)?"":(n==2)?"":(n==3)?"ONE C/E/P":"",120-(this.g.stringWidth((n==1)?"":(n==2)?"":(n==3)?"ONE C/E/P":"")/2),165);
    }
    this.g.flip();
	this.g.setColor(0,0);
	this.g.fillRect(0,196,239,204);
	this.g.setColor(1,3);
    this.g.fillRect(75,200,165,204);
    this.g.flip();
    this.g.setColor(1,15);
    if (n===1) this.g.fillRect(75,200,97,204);
    else if (n===2) this.g.fillRect(92,200,114,204);
    else if (n===3) this.g.fillRect(109,200,131,204);
    else if (n===4) this.g.fillRect(126,200,148,204);
    else this.g.fillRect(143,200,165,204);
    this.g.flip();
    this.g.setColor(0,0);
    this.g.fillRect(0,205,239,239);
    this.g.setColor(1,15);
    this.g.setFont("Vector",20);
    this.g.drawString("SCAN FOR",120-(this.g.stringWidth("SCAN FOR")/2),217);
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
		        t.g.drawString("SCAN FOR",120-(t.g.stringWidth("SCAN FOR")/2),217);
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				if (face[0].set===1) t.g.fillRect(75,200,105,204);
				else if (face[0].set===2) t.g.fillRect(105,200,135,204);
				else t.g.fillRect(135,200,165,204);
				t.g.flip();
			},1000,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    this.run=false;
	if (this.ntid) clearTimeout(this.ntid); this.ntid=0;
    if (this.tid>=0) clearTimeout(this.tid); this.tid=-1;
    return true;
  },
  off: function(){
    this.g.off();
    this.clear();
  }
};
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },//only use this part of the face to set redirection.
  show : function(){
    face.go("dashGarage",0);
    return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};
touchHandler[0]=function(e,x,y){
	this.timeout();
  switch (e) {
  case 5: case 12: //tap event//long press event
    if(0<y&&y<100) {
		buzzer.nav([30,50,30]);
		if ( face[0].set === 1 ) { //Inmotiion V5/8/10
			if (!require("Storage").read('eucInmotionV10')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","InmotionV10");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","V?");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="InmotionV10";
			face.go('w_scan',0,'ffb0');
			return;
		}else if ( face[0].set === 2 ) { //begode
			if (!require("Storage").read('eucBegode')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","Begode");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","BG-NO NAME");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="Begode";
			face.go('w_scan',0,'ffe0');
			//face[0].ntfy("NOT YET","",20,13,1);
		}else if ( face[0].set === 3 ) { //Ninebot Z
			if (!require("Storage").read('eucNinebotZ')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","NinebotZ");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","Z10");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="NinebotZ";
			face.go('w_scan',0,'e7fe');
		}else if ( face[0].set === 4 ) { //Ninebot S
			if (!require("Storage").read('eucNinebotS')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","NinebotS");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","S2");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="NinebotS";
			face.go('w_scan',0,'e7fe');
		}else if ( face[0].set === 5 ) { //Inmotiion V11/12/13
			if (!require("Storage").read('eucInmotionV2')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","InmotionV2");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","V2");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="InmotionV2";
			face.go('w_scan',0,'6e400001-b5a3-f393-e0a9-e50e24dcca9e');
			return;
		}
	}else if(100<y&&y<200) {
		buzzer.nav([30,50,30]);
		if ( face[0].set === 1 ) {
			if(x<120){
				if (!require("Storage").read('eucInmotionV11')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
				ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","InmotionV11");
				ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","V11");
				euc.dash.info.get.name=0;
				euc.dash.info.get.makr="InmotionV11";
				face.go('w_scan',0,'ffe0');
			}else {
				if (!require("Storage").read('eucInmotionV12')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
				ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","InmotionV12");
				ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","V12");
				euc.dash.info.get.name=0;
				euc.dash.info.get.makr="InmotionV12";
				face.go('w_scan',0,'ffe0');
			}
			return;
		}else if ( face[0].set === 2 ) {
			if (!require("Storage").read('eucVeteran')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","Veteran");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","SM-NO NAME");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="Veteran";
			face.go('w_scan',0,'ffe0'); return;
		}else if ( face[0].set === 3 ) {
			if (!require("Storage").read("eucNinebotE")) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","NinebotE");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","E+-NO NAME");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="NinebotE";
			face.go('w_scan',0,'ffe0'); return;
		}else if ( face[0].set === 4 ) { //Kingsong
			if (!require("Storage").read('eucKingsong')) {face[0].ntfy("INSTALL MODULE","",20,13,1); return; }
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker","Kingsong");
			ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name","KS-NO NAME");
			euc.dash.info.get.name=0;
			euc.dash.info.get.makr="Kingsong";
			face.go('w_scan',0,'fff0');
		}
    }else buzzer.nav(40);
    break;
  case 1: //slide down event
    face.go(ew.is.dash[ew.def.dash.face],0);
	return;
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up.
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      buzzer.nav([30,50,30]);
    }else {face.go("settings",0);return;}
    break;
  case 3: //slide left event
	if ( face[0].set < 5 ) {
		if (face[0].ntid) clearTimeout(face[0].ntid); face[0].ntid=0;
		face[0].set ++ ;
		face[0].page(face[0].set);
    }else buzzer.nav(40);
    break;
  case 4: //slide right event (back action)
    if ( 1 < face[0].set ) {
		if (face[0].ntid) clearTimeout(face[0].ntid); face[0].ntid=0;
 		face[0].set -- ;
		face[0].page(face[0].set);
    } else {
      face.go("dashGarage",0);
      return;
    }
    break;
  }
};
