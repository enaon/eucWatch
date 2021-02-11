//settings face
face[0] = {
  offms: 5000,
  g:w.gfx,
  init: function(){
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,115,75); //left up
    this.g.fillRect(0,80,115,155); //left mid
    this.g.fillRect(0,160,115,239); //left dn
    this.g.fillRect(120,0,239,239); //right-riding mode      
    this.g.setColor(0,col("black"));
    this.g.setFont("Vector",24);
	this.g.drawString("RING",58-(this.g.stringWidth("RING")/2),9); 
	this.g.drawString("LIGHT",58-(this.g.stringWidth("LIGHT")/2),41); 
//    this.g.drawString("AUTO",58-(this.g.stringWidth("AUTO")/2),90);
//    this.g.drawString("LOCK",58-(this.g.stringWidth("LOCK")/2),122);
	this.g.drawString("TRIP",58-(this.g.stringWidth("TRIP")/2),170); 
	this.g.drawString("RESET",58-(this.g.stringWidth("RESET")/2),202); 
	//rdmd
 	this.g.drawString("IS",180-(this.g.stringWidth("IS")/2),105);
    this.g.setFont("Vector",35);
    this.g.drawString("EUC",180-(this.g.stringWidth("EUC")/2),60); 
	this.g.drawString("OFF",180-(this.g.stringWidth("OFF")/2),140);
	//this.g.setFont("Vector",80);
    //this.g.drawString(euc.rdmd,180-(this.g.stringWidth(euc.rdmd)/2),80); //fixed bat
	this.g.flip();
    this.rdmd=-1;
    this.alck=-1;
	this.run=true;
  },
  show : function(){
    if (!this.run) return; 
//autolock
    if (euc.alck != this.alck) {
	  this.alck=euc.alck;
      if (this.alck==1) this.g.setColor(1,col("blue"));
      else this.g.setColor(1,col("gray"));
      this.g.fillRect(0,80,115,155); //left mid
      this.g.setColor(0,col("black"));
 	  this.g.setFont("Vector",24);
      this.g.drawString("AUTO",58-(this.g.stringWidth("AUTO")/2),90);
      this.g.drawString("LOCK",58-(this.g.stringWidth("LOCK")/2),122);
      this.g.flip();
    }
//ride mode    
    if (euc.conn=="READY") {  
	if (euc.rdmd != this.rdmd) {
	  this.rdmd=euc.rdmd;	
      this.g.setColor(1,col("lblue"));
      this.g.fillRect(120,0,239,239); //right-riding mode     
      this.g.setColor(0,col("black"));
      this.g.setFont("Vector",88);
      this.g.drawString(euc.rdmd,180-(this.g.stringWidth(euc.rdmd)/2),73);  
      this.g.setFont("Vector",35);
      if (9>euc.rdmd) {
      this.g.drawString(euc.rdmd+1,180-(this.g.stringWidth(euc.rdmd+1)/2),32);  
      }
      if (euc.rdmd>0) {
      this.g.drawString(euc.rdmd-1,180-(this.g.stringWidth(euc.rdmd-1)/2),166); 
      }
      this.g.setFont("Vector",20);
      if (8>euc.rdmd) {
      this.g.drawString(euc.rdmd+2,180-(this.g.stringWidth(euc.rdmd+2)/2),7); 
      }
      if (euc.rdmd>1) {
      this.g.drawString(euc.rdmd-2,180-(this.g.stringWidth(euc.rdmd-2)/2),208); 
      }
      this.g.flip();
    }
    }
//loop
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show();
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    this.g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
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
   face.go(set.dash[set.def.dash],0);
    return true;
  },
  clear: function(){
  return true;
  },
};	

touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		this.timeout();
		digitalPulse(D16,1,[30,50,30]);
		if(0<x&&x<120&&0<y&&y<100) this.s=1;          //slot1
		else if(120<x&&x<239&&0<y&&y<100) this.s=2;   //slot2 
		else if(0<x&&x<120&&100<y&&y<200) this.s=3;   //slot3 
		else if(120<x&&x<239&&100<y&&y<200) this.s=4; //slot4
		if (face[0]["slot"+this.s+"_mac"]){
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			if (Boolean(require("Storage").read('euc_slot'+this.s+'.json')))
				euc.dash=require("Storage").readJSON('euc_slot'+this.s+'.json',1);
			else euc.dash=require("Storage").readJSON("euc_slot.json",1);
			face[0].s1=0;face[0].s2=0;face[0].s3=0;face[0].s4=0;
		}
		face[0]["s"+this.s]=1
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
	    digitalPulse(D16,1,[100]);
		if(0<=x&&x<=120&&0<=y&&y<=100)	this.s=1;			//slot1
		else if(120<=x&&x<=239&&0<=y&&y<=100) this.s=2;		//slot2
		else if (0<=x&&x<=120&&100<=y&&y<=200) this.s=3;	//slot3
		else if(120<=x&&x<=239&&100<=y&&y<=200) this.s=4;	//slot4
		//
		if (face[0]["slot"+this.s+"_mac"]){
			(s=>{s&&(delete s["slot"+this.s+"_mac"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			(s=>{s&&(delete s["slot"+this.s+"_maker"])&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			require("Storage").erase('euc_slot'+this.s+'.json')
			face[0]["slot"+this.s+"_mac"]=undefined;face[0]["slot"+this.s+"_maker"]=undefined;face[0]["sv"+this.s]=undefined;face[0]["s"+this.s]=1;
		}else {
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			face.go("dashScan",0);return;
		}
		this.timeout();
		break;
  }
};
