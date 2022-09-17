//settings
E.setFlags({pretokenise:1});

face[0] = {
	run:false,
	btn:{},
	g:w.gfx,
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	bpp:ew.def.bpp?0:1,
	init: function(o){ 
		face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
		UI.ele.fill("_main",9,0);
		eval(require('Storage').read(o==1?'set_main':o==2?'set_set':'set_dash')); 
		//eval(require('Storage').read(o==1?'set_main':o==2?'set_set':face.faceSave[0].substring(0,4)=="dash"?'set_dash':'set_set')); 
		this.bar();
	},
	show : function(s){
		if (!this.run) return;
	},
	bar:function(){
		//"ram";
		ew.temp.bar=0;
		UIc.start(0,1);
		this.ref();
		UIc.end();
		UIc.bar._bar=(i)=>{
			if (i==1){
				if (this.page=="clock") {buzzer.nav(buzzer.buzz.na);return;}
				buzzer.nav(buzzer.buzz.ok);
				eval(require('Storage').read("set_main"));
				face[0].ref1(i);

			}else if (i==2){
				if (this.page=="set") {buzzer.nav(buzzer.buzz.na);return;}
				buzzer.nav(buzzer.buzz.ok);
				eval(require('Storage').read("set_set"));
				face[0].ref1(i);

			}else if (i==3){
				if (this.page=="dash1") {buzzer.nav(buzzer.buzz.na);return;}
				buzzer.nav(buzzer.buzz.ok);
				eval(require('Storage').read("set_dash"));
				face[0].ref1(i);

				//setTimeout(function(){ face[0].ref();},0);
			}
    };
	},
	ref1 : function(i){
	  //"ram";
		UI.btn.img("bar","_bar",1,"settings",0,i==1?11:3,0);
		UI.btn.img("bar","_bar",2,"watch",0,i==2?11:3,0);
		UI.btn.img("bar","_bar",3,"dash",0,i==3?11:3,0);
	},
	ref : function(s){
	  //"ram";
		UI.btn.img("bar","_bar",1,"settings",0,face[0].page=="clock"?11:3,0);
		UI.btn.img("bar","_bar",2,"watch",0,face[0].page=="bt"||face[0].page=="theme"||face[0].page=="set"||face[0].page=="app"?11:3,0);
		UI.btn.img("bar","_bar",3,"dash",0,face[0].page=="dash1"||face[0].page=="dash1"?11:3,0);
	},
	clear : function(o){
		ew.temp.bar=0;/*TC.removeAllListeners();*/if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(o){
		this.g.off();this.clear(o);
	}
};
//

touchHandler[0]=function(){};


