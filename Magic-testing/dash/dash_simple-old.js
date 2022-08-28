tcNext.replaceWith(()=>{
	if ( euc.state!="OFF"){
		buzzer.nav(buzzer.buzz.ok);
		face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0);
	}else 
		buzzer.nav(buzzer.buzz.na);
});

tcBack.replaceWith(()=>{
	buzzer.nav(buzzer.buzz.ok);
	face.go("clock",0);
});
//
//simple dash
face[0] = {
	run:false,
	g:w.gfx,
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	old:ew.def.bpp?0:1,
	init: function(o){ 
		this.ampC=[1,0,7,7];
		this.tmpC=[1,0,7,7];
		this.batC=[4,1,7,7];
		if ( process.env.BOARD=="BANGLEJS2") {
			this.gui={
				spd:[0,40,180,150],
				spdm:100,
				tmp:[0,0,90,40],
				bat:[91,0,180,40],
				txt:110*UI.size.txt,
				txt1:40*UI.size.txt
			};
			this.spdC=[15,13,7,7];
		}else{
			this.gui={
				//spd:UI.pos._main[5],
				//spdm:10+UI.pos._main[5][3]-((UI.pos._main[5][3]-UI.pos._main[5][1])/2),
				//tmp:UI.pos._main[1],
				//bat:UI.pos._main[2],txt:170*UI.size.txt,
				spd:[0,60,240,210],
				spdm:140,
				tmp:[0,20,120,60],
				bat:[121,20,240,60],
				txt:170*UI.size.txt,
				txt1:40*UI.size.txt
				};
			this.spdC=[0,13,7,7];
		}
		this.spd=euc.dash.live.spd-1;
		this.spdF=euc.dash.opt.unit.fact.spd*((ew.def.dash.mph)?0.625:1);
		this.trpF=euc.dash.opt.unit.fact.dist*((ew.def.dash.mph)?0.625:1);
		this.bar();
		this.run=true;
		//euc.on('refresh',face[0].show);
	},
	show : function(s){
		"ram";
		//if (!face[0].run) return;
		if (euc.state=="READY") {
			if (face[0].spd!=Math.round(euc.dash.live.spd)) face[0].spdf();
			else if (!ew.def.dash.clkS&&face[0].tmp!=euc.dash.live.tmp.toFixed(1) ){	
				//if (face[0].tmp!=euc.dash.live.tmp.toFixed(1))
				face[0].tmpf();
			}else if (ew.def.dash.clkS&& 60 < getTime()-face[0].time )	
				face[0].clkf();
			else if (ew.def.dash.batS &&face[0].bat!=euc.dash.live.bat){	
				//if (face[0].bat!=euc.dash.live.bat) 
				face[0].batf();
			}else  if (!ew.def.dash.batS&&face[0].volt!=euc.dash.live.volt.toFixed(1)) face[0].vltf();
			//else if (euc.dash.opt.tpms&&tpms.euc[euc.dash.opt.tpms]&&(face[0].tpms!=tpms.euc[euc.dash.opt.tpms].alrm)) face[0].tpmsf();
		} else  if (euc.state!=face[0].conn) {
				if (euc.state=="OFF"){ face.go("dashGarage",0); return;}
				//w.gfx.clear();
				face[0].conn=euc.state;
				UI.btn.c2l("main","_lcd",3,euc.state,0,15,0); //4
				face[0].spd=-1;face[0].time=0;face[0].amp=-1;face[0].tmp=-1;face[0].volt=-1;face[0].bat=-1;face[0].trpL=-1;face[0].conn=0;face[0].lock=2;face[0].run=true;
		}
		if (!face[0].old)face[0].g.flip();
		face[0].tid=setTimeout(function(t){
			t.tid=0;
			t.show();
		},50,this);
	},
	spdf: function(){
		"ram";
		if ( Math.abs(euc.dash.live.spd-this.spd) <2 ) this.spd =Math.round(euc.dash.live.spd);
		else if (euc.dash.live.spd<this.spd) this.spd=Math.round(this.spd-(this.spd-euc.dash.live.spd)/3); 
		else this.spd=Math.round(this.spd+(euc.dash.live.spd-this.spd)/3); 
		this.g.setColor(0,(euc.dash.alrt.spd.cc==1)?0:this.spdC[euc.dash.alrt.spd.cc]);
		this.g.fillRect(this.gui.spd[0],this.gui.spd[1],this.gui.spd[2],this.gui.spd[3]);
		if ( process.env.BOARD=="BANGLEJS2") this.g.setColor(1,0);
		else this.g.setColor(1,(euc.dash.alrt.spd.cc==1)?13:15);
		if (100 <= this.spd) {
			if (120 < this.spd)  this.spd=120;
			this.g.setFontVector(this.gui.txt-30);
		}else 
			this.g.setFontVector(this.gui.txt);	  
		this.g.drawString(Math.round(this.spd*this.spdF),(10+this.gui.spd[2]/2)-(this.g.stringWidth(Math.round(this.spd*this.spdF))/2),this.gui.spdm-(this.gui.txt/2)); 
		if (this.old)this.g.flip();
	},
	tmpf: function(){
		"ram";
		this.tmp=euc.dash.live.tmp.toFixed(1);
		this.g.setColor(0,this.tmpC[euc.dash.alrt.tmp.cc]);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,15);
		this.g.setFontVector(this.gui.txt1);	  
		let temp=((ew.def.dash.farn)?this.tmp*1.8+32:this.tmp).toString().split(".");
		let size=5+this.g.stringWidth(temp[0]);
		this.g.drawString(temp[0], 10,this.gui.tmp[1]+3); 
		if (temp[0]<100) {
			this.g.setFontVector(this.gui.txt1/1.8);
			this.g.drawString("."+temp[1],5+size,this.gui.tmp[1]+this.gui.txt1/2.6); 
			size=size+this.g.stringWidth(temp[1]);
		}
		this.g.setFontVector(this.gui.txt1/4);
		this.g.drawString((ew.def.dash.farn)?"°F":"°C",size,this.gui.tmp[1]+3); 
		if (this.old)this.g.flip();
	},
	clkf: function(){
		"ram";
		this.time=getTime();
		this.g.setColor(0,1);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,11);
		this.g.setFontVector(45);
		let d=(Date()).toString().split(' ');
		let t=(d[4]).toString().split(':');
		this.time=(t[0]+":"+t[1]);
		this.g.drawString(this.time,0,5); 
		if (this.old)this.g.flip();
	},
	batf: function(){
		"ram";
		this.bat=euc.dash.live.bat;
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(this.gui.bat[0],this.gui.bat[1],this.gui.bat[2],this.gui.bat[3]);
		this.g.setColor(1,15);
		this.g.setFontVector(this.gui.txt1);
		this.g.drawString(this.bat,225-(this.g.stringWidth(this.bat)),this.gui.bat[1]+3);
		this.g.setFontVector(this.gui.txt1/2);
		this.g.drawString("%",227,this.gui.bat[1]+8);
		if (this.old)this.g.flip();
	},
	vltf: function(){
		"ram";
		this.volt=euc.dash.live.volt.toFixed(1);
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(this.gui.bat[0],this.gui.bat[1],this.gui.bat[2],this.gui.bat[3]);
		this.g.setColor(1,15);
		let volt=this.volt.toString().split(".");
		this.g.setFontVector(this.gui.txt1/6);
		this.g.drawString("VOLT",this.gui.bat[2]-13-this.g.stringWidth("VOLT"),this.gui.bat[1]+5); 
		let size=this.gui.bat[2]-10;
		if (volt[0]<100) {
			this.g.setFontVector(this.gui.txt1/1.8);
			size=size-this.g.stringWidth("."+volt[1]);
			this.g.drawString("."+volt[1],size,this.gui.bat[1]+this.gui.txt1/2.6); 
		}
		this.g.setFontVector(this.gui.txt1);
		this.g.drawString(volt[0], size-this.g.stringWidth(volt[0]),this.gui.bat[1]+3); 
		if (this.old)this.g.flip();
	},
	ampf: function(){
		"ram";
		this.amp=euc.dash.live.amp;
		this.g.setColor(0,this.ampC[euc.dash.alrt.amp.cc]);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,15);
		this.g.setFontVector(33);
		this.g.drawString(this.amp|0,(122-(this.g.stringWidth(this.amp|0)/2)),5); 
		if (this.old)this.g.flip();
	},
	tpmsf: function(){		
		"ram";
		this.tpms=tpms.euc[euc.dash.opt.tpms].alrm;
		this.g.setColor(0,(this.tpms)?7:4);
		this.g.clearRect(0,210,239,239); //amp 
		this.g.setColor(1,11);
		this.g.setFontVector(25);
		this.g.drawString("TPMS",85,215); 
		if (this.old)this.g.flip();
	},
	bar:function(){
		UI.ele.fill("_bar",6,1);
		w.gfx.flip();
	},
	clear : function(o){
		ew.temp.bar=0;
		this.run=false;
		if (this.tid) clearTimeout(this.tid);this.tid=0;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		euc.removeAllListeners();
		return true;
	},
	off: function(o){
		this.g.off();this.clear(o);
	}
};
//
UIc.start(1,1);
UI.ele.coord("main","_2x2",1);
UI.ele.coord("main","_2x2",2);
//UI.ele.coord("main","_bar",6);
UIc.end();


UIc.main._2x2=(i)=>{ 
	buzzer.nav(buzzer.buzz.ok);
	if (i==1) ew.def.dash.clkS=1-ew.def.dash.clkS;
	else if (i==2) ew.def.dash.batS=1-ew.def.dash.batS;
};

