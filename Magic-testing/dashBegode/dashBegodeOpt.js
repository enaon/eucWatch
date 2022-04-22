//Begode settings
//touch
tcNext.replaceWith((x,y)=>{
	"ram";
	buzzer(buz.ok);	
	face.go("dashBegodeAdv",0);return; 
});
tcBack.replaceWith((x,y)=>{
	"ram";
	buzzer(buz.ok);	
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	face.go("dashBegode",0);return; 
});
//
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	page:dash.live.maker+" "+dash.live.name,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		UI.ele.ind(2,3,1);
		UI.ele.title(this.page.toUpperCase(),3,0);
		UIc.start(1,1);
		this.run=1;
		UI.btn.c2l("main","_2x2",1,"HEAD","LIGHT",15,dash.live.light?4:0);
		UI.btn.c2l("main","_2x2",2,"WATCH","ALERTS",15,(dash.live.hapS||dash.live.hapA||dash.live.hapT||dash.live.hapB)?4:1);
		UI.btn.c2l("main","_2x2",3,dash.live.tpms?dash.live.tpms:"TPMS",(dash.live.tpms)?(tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].psi)?Math.round(tpms.euc[dash.live.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",15,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1);
		UI.btn.c2l("main","_2x2",4,"BTN","HORN",15,dash.live.horn?4:0);	
		UIc.end();
		this.run=1;
		//
		UIc.main._2x2=(i)=>{
			if (i==1){
				buzzer(buz.ok);
				dash.live.light=1-dash.live.light;
				UI.btn.c2l("main","_2x2",1,"HEAD","LIGHT",15,dash.live.light?4:0);
				if (set.def.info) UI.btn.ntfy(1,2,0,"_bar",6,dash.live.light?"ON":"OFF","",15,0);w.gfx.flip();
			}else if (i==2){
				buzzer(buz.ok);
				face.go("dashAlerts",0);
				return;
		  }
		  else if (i==3){
				buzzer(buz.ok);		
				//UI.btn.c2l("main","_2x2",3,dash.live.tpms?dash.live.tpms:"TPMS",(dash.live.tpms)?(tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].psi)?Math.round(tpms.euc[dash.live.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",15,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1);
				//if (set.def.info) UI.btn.ntfy(1,2,0,"_bar",6,dash.live.ks.aLiftC?dash.live.ks.aLiftC==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);w.gfx.flip();
			}else if (i==4){
				buzzer(buz.ok);	
				dash.live.horn=1-dash.live.horn;
				UI.btn.c2l("main","_2x2",4,"BTN","HORN",15,dash.live.horn?4:0);	
				if (set.def.info) UI.btn.ntfy(1,2,0,"_bar",6,dash.live.horn?"Horn When Moving":"HORN",dash.live.horn?"SIDE BTN":"DISABLED",15,dash.live.horn?4:0);w.gfx.flip();
		  }
		};
		UIc.bar._2x2=(i)=>{
			if (i==3){
				buzzer(buz.ok);		
				UI.btn.ntfy(1,2,0,"_bar",6,dash.live.ks.aLiftC?dash.live.ks.aLiftC==1?"ENABLE":"DISABLE":"NO ACTION","",15,0);w.gfx.flip();
			}else if (i==4){
				buzzer(buz.ok);	
				dash.live.horn=1-dash.live.horn;
				UI.btn.ntfy(1,2,0,"_bar",6,dash.live.horn?"ENABLED":"DISABLED","",15,dash.live.horn?4:0);w.gfx.flip();
		  }
		};
	},
	show : function(){
		"ram";
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run)  return;
		this.tid=setTimeout(function(t,o){
		  face[0].tid=0;
		  face[0].show();
		},500);
	},
	bar:function(){
		"ram";
		set.bar=0;
		UI.ele.title(this.page.toUpperCase(),3,0);
		UI.btn.c2l("bar","_2x2",3,dash.live.tpms?dash.live.tpms:"TPMS",(dash.live.tpms)?(tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].psi)?Math.round(tpms.euc[dash.live.tpms].psi*metric[tpms.def.metric]).toString(1):"WAIT":"OFF",15,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1);
		UI.btn.c2l("bar","_2x2",4,"HORN","",15,4);	
	},
	tid:-1,
	run:false,
	clear : function(){
		"ram";
		set.bar=0;if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(){
		"ram";
		this.g.off();this.clear();
	}
};