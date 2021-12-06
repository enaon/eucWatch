//Dash Scan
face[0] = { 
  btn:{},
  offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
  bpp:set.def.bpp?0:1,
  g:w.gfx, 
  init: function(o){ 
	UI.ele.title("top","SCAN FOR",15,0);
	UI.ele.title("btmS","",0,0);
	this.page(1);
  },
  show : function(o){
	return;
  },
  page : function(n) {
	this.set=n;
	let txt1=["INMOTION","BEGODE","NINEBOT","NINEBOT"];
	let txt2=["V5/V8/V10","","ONE Z10","ONE S2"];
	UI.btn.c2l("_2x1",1,txt1[n-1],txt2[n-1],15,12); 
	txt1=["INMOTION V11","VETERAN","NINEBOT","KINGSONG"];
	txt2=["","","ONE C/E/P",""];	
	UI.btn.c2l("_2x1",2,txt1[n-1],txt2[n-1],15,12); 
	UI.ele.ind("btmS",n,4);
	if (set.def.bpp) w.gfx.flip();
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
  }
};	
face[0].btn._2x1_1=()=>{};
face[0].btn._2x1_2=()=>{};

touchHandler[0]=function(e,x,y){ 
  switch (e) {
  case 5: case 12: //tap event//long press event
	buzzer(buz.ok);
    let target;
	if(0<y&&y<120) 
		target=[0,["InmotionV1","V?","ffb0"],["Begode","BG-NO NAME","ffe0"],["NinebotZ","Z10","e7fe"],["NinebotS","S2","e7fe"]] ;
	else 
	  target=[0,["Inmotion","V11","ffe0"],["Veteran","SM-NO NAME","ffe0"],["Ninebot","E+-NO NAME","ffe0"],["Kingsong","KS-NO NAME","fff0"]] ;
	if (!Boolean(require("Storage").read("euc"+target[face[0].set][0]))) {
			UI.ntfy.simple("btmS","INSTALL MODULE",0,15,7);
			UI.on('ntfy','UI.ele.title("btmS","GARAGE",15,1);');
			return; 
	}
	setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker",target[face[0].set][0]);
	setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",target[face[0].set][1]);
	dash.live.name=0;
	dash.live.maker=target[face[0].set][0];
	face.go('w_scan',0,target[face[0].set][2]);
    break;
  case 1: //slide down event
	face.go("dashGarage",0);
	return;	 
  case 2: //slide up event
    if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
      if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(this.bri);
      buzzer(buz.ok);
      
    }else {face.go("settings",0);return;}  
	
    break;
  case 3: //slide left event
	if ( face[0].set < 4 ) {
		if (face[0].ntid) clearTimeout(face[0].ntid); face[0].ntid=0;
		face[0].set ++ ;
		face[0].page(face[0].set);
    }else buzzer(buz.na);    
	
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


