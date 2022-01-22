//simple dash
face[0] = {
	run:false,
	g:w.gfx,
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	old:set.def.bpp?0:1,
	init: function(o){ 
		this.ampC=[1,2992,7,7];
		this.tmpC=[1,2992,7,7];
		this.batC=[4,1,7,7];
		//this.gui={spd:UI.pos._main[9],txt:60};
		//this.gui={spd:UI.pos._main[5],txt:UI.pos._main[5][3]-UI.pos._main[5][1]};
		if ( process.env.BOARD=="BANGLEJS2") {
			this.gui={spd:UI.pos._main[5],txt:130};
			this.spdC=[15,13,7,7];
		}else{
			this.gui={spd:UI.pos._main[5],txt:170};
			this.spdC=[0,13,7,7];
		}
		this.spdF=dash.live.spdF*((set.def.dash.mph)?0.625:1);
		this.trpF=dash.live.trpF*((set.def.dash.mph)?0.625:1);
		UI.ele.ind(0,0,1);
		UI.btn.c3l("main","_main",1,"TEMP","",15,1);
		UI.btn.c3l("main","_main",2,"BATT","",15,4);
		UI.ele.title("||||| ||||| ||||| ||||| |||||",15,4);

		this.run=true;
	},
	show : function(s){
		if (!this.run) return;
		if (euc.state=="READY") {
			if (this.spd!=Math.round(dash.live.spd)) this.spdf();
			/*
			if (!set.def.dash.clkS){	
				if (this.tmp!=dash.live.tmp.toFixed(1))	this.tmpf();}
			else if (60 < getTime()-this.time )	
				this.clkf();
			if (set.def.dash.batS){	if (this.bat!=dash.live.bat)	this.batf();}
			else  if (this.volt!=dash.live.volt.toFixed(1)) this.vltf();
			else if (dash.live.tpms&&tpms.euc[dash.live.tpms]&&(this.tpms!=tpms.euc[dash.live.tpms].alrm)) this.tpmsf();
			*/
		} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				UI.btn.c2l("main","_main",5,euc.state,0,15,0); //4
				this.spd=-1;this.time=0;this.amp=-1;this.tmp=-1;this.volt=-1;this.bat=-1;this.trpL=-1;this.conn=0;this.lock=2;this.run=true;}
		}
		if (!this.old)this.g.flip();
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},50,this);
	},
	spdf: function(){
		"ram";
		this.spd=Math.round(dash.live.spd);
		this.g.setColor(0,(dash.live.spdC==1)?0:this.spdC[dash.live.spdC]);
		this.g.fillRect(this.gui.spd[0],this.gui.spd[1],this.gui.spd[2],this.gui.spd[3]);
		if ( process.env.BOARD=="BANGLEJS2") this.g.setColor(1,0);
		else this.g.setColor(1,(dash.live.spdC==1)?13:15);
		if (100 <= this.spd) {
			if (120 < this.spd)  this.spd=120;
			this.g.setFontVector(this.gui.txt-30);
		}else 
			this.g.setFontVector(this.gui.txt);	  
		this.g.drawString(Math.round(this.spd*this.spdF),(10+this.gui.spd[2]/2)-(this.g.stringWidth(Math.round(this.spd*this.spdF))/2),this.gui.spd[3]+20-this.gui.txt); 
		if (this.old)this.g.flip();
	},
	bar:function(){
		"ram";

	},
	clear : function(o){
		set.bar=0;TC.removeAllListeners();if (this.tid) clearTimeout(this.tid);this.tid=0;return true;
	},
	off: function(o){
		this.g.off();this.clear(o);
	}
};
//

touchHandler[0]=function(){};
tcNext=(x,y)=>{
	buzzer(buz.ok);
	(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):buzzer(buz.na);
};	
tcBack=(x,y)=>{
	buzzer(buz.ok);
	face.go("main",0);
};	
tcBack=(x,y)=>{
	buzzer(buz.ok);
	face.go("main",0);
};	
tcDn.replaceWith(new Function('buzzer(buz.ok);if (set.def.dash.face+1>=set.dash.length) set.def.dash.face=0; else set.def.dash.face++;face.go(set.dash[set.def.dash.face],0);'));

tcBar=(x,y)=>{UIc.tcBar(x,y);};	
TC.on('bar',tcBar);
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 
TC.on('tc3',tcNext); 	
TC.on('tc4',tcBack); 	
TC.on('tc5',UIc.xy);
