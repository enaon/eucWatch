//Dash Scan
face[0] = { 
  offms: 5000, 
  g:w.gfx, 
  init: function(o){ 
    this.g.setColor(0,0);
    this.g.fillRect(0,205,239,239);
    this.g.setColor(1,col("white"));
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
    this.g.setColor(0,col("dgray"));
    this.g.fillRect(0,0,239,96);
    this.g.setColor(1,col("white"));
	this.g.setFont("Vector",26);
  	this.g.drawString((n==1)?"KINGSONG":(n==2)?"BEGODE":"NINEBOT",120-(this.g.stringWidth((n==1)?"KINGSONG":(n==2)?"BEGODE":"NINEBOT")/2),38); 
	this.g.setFont("Vector",14);
    this.g.drawString((n==1)?"":(n==2)?"":"ONE Z10",120-(this.g.stringWidth((n==1)?"":(n==2)?"":"ONE Z10")/2),73);
    this.g.flip();
	this.g.setColor(0,0);	
	this.g.drawLine(0,97,239,97);
	this.g.drawLine(0,98,239,98);
    this.g.flip();
    this.g.setColor(0,col("dgray"));
    this.g.fillRect(0,99,239,195);
    this.g.setColor(1,col("white"));
	this.g.setFont("Vector",26);
    this.g.drawString((n==1)?"INMOTION":(n==2)?"VETERAN":"NINEBOT",120-(this.g.stringWidth((n==1)?"INMOTION":(n==2)?"VETERAN":"NINEBOT")/2),130);
	this.g.setFont("Vector",14);
    this.g.drawString((n==1)?"":(n==2)?"":"ONE C/E/P",120-(this.g.stringWidth((n==1)?"":(n==2)?"":"ONE C/E/P")/2),165);
    this.g.flip();
	this.g.setColor(0,col("black"));
	this.g.fillRect(0,196,239,204);
	this.g.setColor(1,col("lgray"));
    this.g.fillRect(75,200,165,204);
    this.g.flip();
    this.g.setColor(1,col("white"));
    if (n===1) this.g.fillRect(75,200,105,204);
    else if (n===2) this.g.fillRect(105,200,135,204);
    else this.g.fillRect(135,200,165,204);
	this.g.flip();
	this.g.setColor(0,0);
    this.g.fillRect(0,205,239,239);
    this.g.setColor(1,col("white"));
    this.g.setFont("Vector",20);
	this.g.drawString("SCAN FOR",120-(this.g.stringWidth("SCAN FOR")/2),217);
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
		        t.g.drawString("SCAN FOR",120-(t.g.stringWidth("SCAN FOR")/2),217); 
				t.g.flip();
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,col("lgray"));
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,col("white"));
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
  switch (e) {
  case 5: case 12: //tap event//long press event
	this.timeout();
    if(0<y&&y<100) {
		digitalPulse(D16,1,[30,50,30]);
		if ( face[0].set === 1 ) { //kingsong
			if (!Boolean(require("Storage").read('eucKingsong'))) {	face[0].ntfy("INSTALL MODULE","",20,col("red"),1); return; }
			(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Kingsong")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			euc.dash.maker="Kingsong"; 
			face.go('w_scan',0,'fff0'); return
        }else if ( face[0].set === 2 ) { //begode
			//(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Gegode")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			//euc.dash.maker="Begode";
			face[0].ntfy("NOT YET","",20,col("red"),1);
        }else if ( face[0].set === 3 ) { //Ninebot Z
			//(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="NinebotZ")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			//euc.dash.maker="NinebotZ";
			face[0].ntfy("NOT YET","",20,col("red"),1);
		}
    }else if(100<y&&y<200) {
		digitalPulse(D16,1,[30,50,30]);
		if ( face[0].set === 1 ) {
			//(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Inmotion")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			//euc.dash.maker="Inmotion";
			face[0].ntfy("NOT YET","",20,col("red"),1);
        }else if ( face[0].set === 2 ) {
			if (!Boolean(require("Storage").read('eucVeteran'))) {	face[0].ntfy("INSTALL MODULE","",20,col("red"),1); return; }
			(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Veteran")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			euc.dash.maker="Veteran";
			face.go('w_scan',0,'ffe0'); return;
        }else if ( face[0].set === 3 ) {
			if (!Boolean(require("Storage").read("eucNinebot"))) {	face[0].ntfy("INSTALL MODULE","",20,col("red"),1); return; }
			(s=>{s&&(s["slot"+require("Storage").readJSON("dash.json",1).slot+"Maker"]="Ninebot")&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			euc.dash.maker="Ninebot";
			face.go('w_scan',0,'ffe0'); return;
		}
    }else digitalPulse(D16,1,40); 
    break;
  case 1: //slide down event
    face.go(set.dash[set.def.dash],0);
	return;	 
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      digitalPulse(D16,1,[30,50,30]);
      this.timeout();
    }else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
	this.timeout();
    break;
  case 3: //slide left event
	if ( face[0].set < 3 ) {
		if (face[0].ntid) clearTimeout(face[0].ntid); face[0].ntid=0;
		face[0].set ++ ;
		face[0].page(face[0].set);
    }else digitalPulse(D16,1,40);    
	this.timeout();
    break;
  case 4: //slide right event (back action)
    if ( 1 < face[0].set ) {
		if (face[0].ntid) clearTimeout(face[0].ntid); face[0].ntid=0;
 		face[0].set -- ;
		face[0].page(face[0].set); 
        this.timeout();
    } else {
      face.go("dashGarage",0);
      return;
    }
    break;
  }
};


