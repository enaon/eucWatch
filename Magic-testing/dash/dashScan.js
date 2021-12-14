//Dash Scan
face[0] = { 
  btn:{},
  offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
  bpp:set.def.bpp?0:1,
  g:w.gfx, 
  init: function(o){ 
	UI.ele.title("btmS","SCAN FOR",15,0);
	UI.ele.title("topS","",0,6);
	this.bar();
  },
  show : function(o){
	return;
  },
  bar: function(n) {
	UIc.start(1,1);
	this.page(1);
	UIc.end();
	UIc.main._2x1_1=function(n) {face[0].scan(1);};
	UIc.main._2x1_2=function(n) {face[0].scan(2);};
  },
  page : function(n) {
	this.set=n;
	UI.ele.ind("top",n,4);
	let txt1=["INMOTION","BEGODE","NINEBOT","NINEBOT"];
	let txt2=["V5/V8/V10","","ONE Z10","ONE S2"];
	UI.btn.c2l("main","_2x1",1,txt1[n-1],txt2[n-1],15,6); 
	txt1=["INMOTION V11","VETERAN","NINEBOT","KINGSONG"];
	txt2=["","","ONE C/E/P",""];	
	UI.btn.c2l("main","_2x1",2,txt1[n-1],txt2[n-1],15,1); 
  },
  scan: function(n) {
	buzzer(buz.ok);
  	let target=n==1?[0,["InmotionV1","Vx","ffb0"],["Begode","BG","ffe0"],["NinebotZ","Z10","e7fe"],["NinebotS","S2","e7fe"]]:
					[0,["Inmotion","V11","ffe0"],["Veteran","SM","ffe0"],["Ninebot","E+","ffe0"],["Kingsong","KS","fff0"]];
	if (!Boolean(require("Storage").read("euc"+target[face[0].set][0]))) {
			UI.ntfy.simple("btmS","INSTALL MODULE",0,15,7);
			UI.on('ntfy','UI.ele.title("btmS","GARAGE",15,1);');
			return; 
	}
	setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker",target[face[0].set][0]);
	setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Model",target[face[0].set][1]);
	dash.live.name=0;
	dash.live.maker=target[face[0].set][0];
	face.go('w_scan',0,target[face[0].set][2]);
  },
  tid:-1,
  run:false,
  clear : function(){TC.removeAllListeners();if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;} return true;},
  off: function(){this.g.off();this.clear();}
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
	clear: function(){TC.removeAllListeners();if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;}return true;},
	off: function(){this.clear();}
};	

UIc.back=(x,y)=>{
	buzzer(buz.ok);
    if ( 1 < face[0].set ) {
 		face[0].set -- ;
		face[0].page(face[0].set); 
    } else {
      face.go("dashGarage",0);
      return;
    }
};	
UIc.next=(x,y)=>{
	if ( face[0].set < 4 ) {
		buzzer(buz.ok);
		face[0].set ++ ;
		face[0].page(face[0].set);
    }else buzzer(buz.na); 
};	
TC.on('tc3',UIc.next); 	
TC.on('tc4',UIc.back); 
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp);
TC.on('tc5',UIc.xy); 


touchHandler[0]=function(){ return;};
