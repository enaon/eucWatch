//kingsong set actions
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		UI.ele.ind(1,1,1);
		UIc.start(1,1);
		UI.btn.c2l("main","_2x2",1,"LIGHTS",(dash.live.aLight==="lightsOff")?"OFF":(dash.live.aLight==="lightsOn")?"ON":(dash.live.aLight==="lightsAuto"||dash.live.aLight==0)?"AUTO":"CITY",15,(dash.live.aLight==="lightsOff")?0:(dash.live.aLight==="lightsOn")?6:(dash.live.aLight=="lightsAuto"||dash.live.aLight==0)?6:4);
		UI.btn.c2l("main","_2x2",2,"STROBE","",15,dash.live.strb?7:1);
		let metric={"psi":1,"bar":0.0689475,"kpa":6.89475};
		UI.btn.c2l("bar","_2x2",3,dash.live.tpms?dash.live.tpms:"TPMS","",15,(dash.live.tpms&&tpms.euc[dash.live.tpms]&&tpms.euc[dash.live.tpms].time&&(getTime()|0)-tpms.euc[dash.live.tpms].time<1800)?(tpms.euc[dash.live.tpms].alrm)?7:4:1);
		UI.btn.c2l("bar","_2x2",4,"LOCK","",15,dash.live.lock?7:1);	
		UIc.end();
		//
		UIc.main._2x2_1=()=>{
			buzzer(buz.ok);
			if (dash.live.aLight=="lightsOff") { 
				dash.live.aLight="lightsOn"; 
				euc.wri("lightsOn"); 
			}else if (dash.live.aLight=="lightsOn") {
				dash.live.aLight="lightsAuto"; 
				euc.wri("lightsAuto"); 
			}else if (dash.live.aLight=="lightsAuto") { 
				dash.live.aLight="lightsCity"; 
			}else if (dash.live.aLight=="lightsCity") { 
				dash.live.aLight="lightsOn"; 
				euc.wri("lightsOn"); 
			}else  { 
				dash.live.aLight="lightsOn"; 
				euc.wri("lightsOn"); 
			}
			UI.btn.c2l("main","_2x2",1,"LIGHTS",(dash.live.aLight==="lightsOff")?"OFF":(dash.live.aLight==="lightsOn")?"ON":(dash.live.aLight==="lightsAuto"||dash.live.aLight==0)?"AUTO":"CITY",15,(dash.live.aLight==="lightsOff")?0:(dash.live.aLight==="lightsOn")?6:(dash.live.aLight=="lightsAuto"||dash.live.aLight==0)?6:4);

            //face[0].ntfy("HOLD -> LIGHTS OFF",1);
		};
		UIc.main._2x2_2=()=>{
			buzzer(buz.ok);
			dash.live.strb=1-dash.live.strb;
			UI.btn.c2l("main","_2x2",2,"STROBE","",15,dash.live.strb?7:1);
			euc.wri((dash.live.strb)?"strobeOn":"strobeOff");
		};
		UIc.bar._2x2_3=()=>{
			buzzer(buz.ok);		
			if (!dash.live.tpms) print(1);
			  //face[0].ntfy("HOLD-> ON/OFF",4);
			else {
				tpms.def.pos=Object.keys(tpms.def.list).indexOf(dash.live.tpms);
				face.go("tpmsFace",0);
				return;
			}
		};
		UIc.bar._2x2_4=()=>{
			buzzer(buz.ok);	
			dash.live.lock=1-dash.live.lock;
			UI.btn.c2l("bar","_2x2",4,"LOCK","",15,dash.live.lock?7:1);	
            //face[0].ntfy("HOLD -> POWER OFF",7);
			euc.wri((dash.live.lock)?"lock":"unlock");
		};
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
	tid:-1,
	run:false,
	clear : function(){
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
//touch
touchHandler[0]=function(){return;};
tcN=(x,y)=>{
		buzzer(buz.na);
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();
	}else if (face.appPrev!="settings")
		face.go(face.appPrev,0);
	else if (euc.state!="OFF")
		face.go(set.dash[set.def.dash.face],0);
	else
		face.go("main",0);
};	
tcBack.replaceWith(tcB);