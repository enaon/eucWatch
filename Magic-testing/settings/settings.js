//settings
face[0] = {
	run:false,
	btn:{},
	g:w.gfx,
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	bpp:set.def.bpp?0:1,
	init: function(o){ 
		//if (face.faceSave==-1) 
		face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
		eval(require('Storage').read(o?'set_apps':face.faceSave[0].substring(0,4)=="dash"?'set_dash':'set_set')); 
		this.bar();
		//TC.on('tc5',UIc.xy);
		//this.run=false;
	},
	show : function(s){
		if (!this.run) return;
	},
	bar:function(){
		"ram";
		set.bar=0;
		UIc.start(0,1);
		this.ref();
		UIc.end();
		UIc.bar._bar_1=()=>{
			if (this.page=="main") {buzzer(buz.na);return;}
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_main"));
			  setTimeout(function(){ face[0].ref();},0);
		};
		UIc.bar._bar_2=()=>{
			if (this.page=="set") {buzzer(buz.na);return;}
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_set"));
			  setTimeout(function(){ face[0].ref();},0);
		};
		UIc.bar._bar_3=()=>{
			  if (this.page=="dash1") {buzzer(buz.na);return;}
			  buzzer(buz.ok);
			  eval(require('Storage').read("set_dash"));
			  setTimeout(function(){ face[0].ref();},0);
    };
	},
	ref : function(s){
	  "ram";
		UI.btn.img("bar","_bar",1,_icon.settings,0,face[0].page=="main"?14:3,face[0].page=="main"?1:0);
		UI.btn.img("bar","_bar",2,_icon.watch,0,face[0].page=="bt"||face[0].page=="theme"||face[0].page=="set"||face[0].page=="apps"?14:3,face[0].page=="bt"||face[0].page=="theme"||face[0].page=="set"||face[0].page=="app"?1:0);
		UI.btn.img("bar","_bar",3,_icon.dash,0,face[0].page=="dash1"||face[0].page=="dash1"?14:3,face[0].page=="dash1"||face[0].page=="dash2"?1:0);
	},
	clear : function(o){
		set.bar=0;/*TC.removeAllListeners();*/if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(o){
		this.g.off();this.clear(o);
	}
};
//

touchHandler[0]=function(){};


