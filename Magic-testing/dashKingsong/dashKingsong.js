//kingsong settings
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	page:"dashKS",
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (euc.temp.pass)  eval(require('Storage').read("dashKingsongAdvPass")); 
		else {
			if (!euc.temp.ls) {euc.temp.ls=1;setTimeout(()=>{euc.wri("getLock");setTimeout(()=>{euc.wri("getStrobe");},100);},300);}
			eval(require('Storage').read("dashKingsongAct")); 
			this.bar();
		}
		this.run=1;
	},
	show : function(){
		"ram";
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run)  return;
		if (this.page=="actions"){
			if ( this.light!=euc.dash.opt.lght.HL) {
				this.light=euc.dash.opt.lght.HL;
				let val=["CITY","ON","OFF","AUTO"];
				UI.btn.c2l("main","_2x2",1,"LIGHTS",val[euc.dash.opt.lght.HL],15,euc.dash.opt.lght.city?12:euc.dash.opt.lght.HL!=2?4:0);
			}if ( this.strb!=euc.dash.opt.lght.strb) {
				this.strb=euc.dash.opt.lght.strb;
				UI.btn.c2l("main","_2x2",2,"STRB","",15,euc.dash.opt.lght.strb?13:1);
			}
			if ( this.lock!=euc.dash.opt.lock.en) {
				this.lock=euc.dash.opt.lock.en;
				UI.btn.c2l("bar","_2x2",4,"LOCK","",15,euc.dash.opt.lock.en?13:1);	
			}		
		}else if (this.page=="light"){
			if ( this.last!=euc.dash.opt.lght.HL) {
				this.last=euc.dash.opt.lght.HL;
				UI.btn.c2l("main","_2x2",1,"ON","",15,euc.dash.opt.lght.HL==1?4:1);
				UI.btn.c2l("main","_2x2",2,"AUTO","",15,euc.dash.opt.lght.HL==3?4:1);
				UI.btn.c2l("main","_2x2",4,"OFF","",15,euc.dash.opt.lght.HL==2?0:1);	
				UI.btn.c2l("main","_2x2",3,"eucWatch","CITY",15,euc.dash.opt.lght.city?12:1);
			}
		}else if (this.page=="options"){
			if ( this.ride!=euc.dash.opt.ride.mode) {
				this.ride=euc.dash.opt.ride.mode;
				UI.btn.c2l("main","_2x2",1,"LED","RIDE",15,euc.dash.opt.ride.mode?4:1);
			}
			if ( this.lift!=euc.dash.opt.snsr.lift) {
				this.lift=euc.dash.opt.snsr.lift;
				UI.btn.c2l("main","_2x2",3,"SENSOR","LIFT",15,euc.dash.opt.snsr.lift?4:1);
			}
		}
		this.tid=setTimeout(function(t,o){
		  face[0].tid=0;
		  face[0].show();
		},100);
	},
	bar:function(){
		"ram";
		ew.temp.bar=0;
		if (this.page.includes("password")){
			UIc.start(0,1);
			for (let i=10;i<13;i++){
				UI.btn.c2l("bar","_kp4x3",i,i==11?"0":"","",15,i==11?6:1);
			}
			UIc.end();
		}
		if (this.page=="pass options"){
			UIc.start(0,1);
			for (let i=10;i<13;i++){
				UI.btn.c2l("bar","_2x1",2,"PASSWORD","CLEAR",15,1);
			}
			UIc.end();
		}
		
		UI.ele.title(this.page.toUpperCase(),3,0);w.gfx.flip();
	},
	tid:-1,
	run:false,
	clear : function(){
		for (let i = 0; i < 10; i++) {
			if (this["tid"+i]) clearTimeout(this["tid"+i]);this["tid"+i]=0;
		}
		ew.temp.bar=0;if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(){
		this.g.off();this.clear();
	}
};
