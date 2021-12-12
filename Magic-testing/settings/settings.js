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
		eval(require('Storage').read(o?'set_apps':face.faceSave[0].substring(0,4)=="dash"?'set_dash':'set_set')); 
		this.bar();
		TC.on('tc5',UIc.xy);
		//this.run=false;
	},
	show : function(s){
		if (!this.run) return;
	},

	clear : function(o){
		TC.removeAllListeners();
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
tcNext=(x,y)=>{
	buzzer(buz.ok);
};	
tcBack=(x,y)=>{
	buzzer(buz.ok);
};	
TC.on('tc3',tcNext); 	
TC.on('tc4',tcBack); 	

