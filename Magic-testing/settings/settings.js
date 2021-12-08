//settings
face[0] = {
	run:false,
	btn:{},
	g:w.gfx,
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	bpp:set.def.bpp?0:1,
	init: function(o){ 
		if (face.faceSave==-1) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
		UI.ele.fill("_ele","topS",1);
		eval(require('Storage').read(o?'set_apps':'set_set')); 
		this.bar();
		TC.on('tc5',UIc.tap.xy);
		TC.on('tc12',UIc.hold.xy);
		//this.run=false;
	},
	show : function(s){
		if (!this.run) return;
	},
	bar : function(){
		//start bar
		TC.removeListener("tc5",UIc.tap.bar);
		UI.ele.fill("_ele","btmL",0);
		UIc.start(0,1);
		UI.btn.img("bar",[1,0,0],"_bar",1,UI.icon.torch,0,3,0);//btn2
		UI.btn.img("bar",[1,0,0],"_bar",2,UI.icon.settings,0,14,0);//btn2
		UI.btn.img("bar",[1,0,0],"_bar",3,UI.icon.alarm,0,3,0);//btn2
		UIc.end();
		UIc.tap.bar._bar=this.tap;
		UIc.hold.main._2x2=this.hold;
		//end bar
	},

	clear : function(o){
		TC.removeAllListeners();
		//pal[0]=0;
		//this.g.clear();
		if (set.tor==1){
			w.gfx.bri.set(set.bri);
			face.faceSave=-1;
			set.tor=-1;
		}
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=-1;
		return true;
	},
	off: function(o){
		this.g.off();
		this.clear(o);
	}
};
//
face[1] = {
  offms:1000,
  g:w.gfx,
  init: function(){
  return true;
  },
  show : function(){
	face[0].btSetOn=1;
	if (face.faceSave!=-1) {
		  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
    }else face.go("main",0);
    return true;
  },
  clear: function(){
  return true;
  },
};	

touchHandler[0]=function(){};
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 	
tcL=(x,y)=>{
	buzzer(buz.ok);
	if (face[0].page=="set"){
		eval(require('Storage').read('set_apps')); 
	}else  { 
		eval(require('Storage').read('set_set')); 
	}
};	
TC.on('tc3',tcL); 	
TC.on('tc4',tcL); 	



//bar
face[0].btn.tap_bar_1=()=>{buzzer(buz.na);};
face[0].btn.tap_bar_2=()=>{
if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
	buzzer(buz.ok);face.go(face.faceSave[0].substring(0,4)+"Options",0);
}else buzzer(buz.na);
};
face[0].btn.tap_bar_3=()=>{buzzer(buz.ok);face.go('alarm',0);};