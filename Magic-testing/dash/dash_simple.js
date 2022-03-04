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
			this.gui={spd:UI.pos._main[5],spdm:7+UI.pos._main[5][3]-((UI.pos._main[5][3]-UI.pos._main[5][1])/2),tmp:UI.pos._main[1],bat:UI.pos._main[2],txt:117*UI.size.txt,txt1:45*UI.size.txt};
			this.spdC=[15,13,7,7];
		}else{
			this.gui={spd:UI.pos._main[5],spdm:10+UI.pos._main[5][3]-((UI.pos._main[5][3]-UI.pos._main[5][1])/2),tmp:UI.pos._main[1],bat:UI.pos._main[2],txt:170*UI.size.txt,txt1:60*UI.size.txt};
			this.spdC=[0,13,7,7];
		}
		this.spdF=dash.live.spdF*((set.def.dash.mph)?0.625:1);
		this.trpF=dash.live.trpF*((set.def.dash.mph)?0.625:1);
		UI.ele.ind(0,0,1);
		/*UIc.start(1,1);
		UI.btn.c3l("main","_2x2",1,_icon.speed,"SPEED",15,dash.live.hapS?4:1);
		UI.btn.c3l("main","_2x2",1,_icon.speed,"SPEED",15,dash.live.hapS?4:1);
		UI.ele.title("||||| ||||| |||||",15,4);
		UIc.end();
		*/
		UI.ele.title("||||| ||||| |||||",15,4);
		this.run=true;
	},
	show : function(s){
		"ram";
		if (!this.run) return;
		if (euc.state=="READY") {
			if (this.spd!=Math.round(dash.live.spd)) this.spdf();
			if (!set.def.dash.clkS){	
				if (this.tmp!=dash.live.tmp.toFixed(1))	this.tmpf();
			}else if (60 < getTime()-this.time )	
				this.clkf();
			if (set.def.dash.batS){	if (this.bat!=dash.live.bat) this.batf();
			}else  if (this.volt!=dash.live.volt.toFixed(1)) this.vltf();
			else if (dash.live.tpms&&tpms.euc[dash.live.tpms]&&(this.tpms!=tpms.euc[dash.live.tpms].alrm)) this.tpmsf();
		} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				UI.btn.c2l("main","_main",7,euc.state,0,15,0); //4
				this.spd=-1;this.time=0;this.amp=-1;this.tmp=-1;this.volt=-1;this.bat=-1;this.trpL=-1;this.conn=0;this.lock=2;this.run=true;}
		}
		if (!this.old)this.g.flip();
		this.tid=setTimeout(function(t){
			t.tid=0;
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
		this.g.drawString(Math.round(this.spd*this.spdF),(10+this.gui.spd[2]/2)-(this.g.stringWidth(Math.round(this.spd*this.spdF))/2),this.gui.spdm-(this.gui.txt/2)); 
		if (this.old)this.g.flip();
	},
	tmpf: function(){
		"ram";
		this.tmp=dash.live.tmp.toFixed(1);
		this.g.setColor(0,this.tmpC[dash.live.tmpC]);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,15);
		this.g.setFontVector(this.gui.txt1);	  
		let temp=((set.def.dash.farn)?this.tmp*1.8+32:this.tmp).toString().split(".");
		let size=5+this.g.stringWidth(temp[0]);
		this.g.drawString(temp[0], 10,this.gui.tmp[1]+3); 
		if (temp[0]<100) {
			this.g.setFontVector(this.gui.txt1/1.8);
			this.g.drawString("."+temp[1],5+size,this.gui.tmp[1]+this.gui.txt1/2.6); 
			size=size+this.g.stringWidth(temp[1]);
		}
		this.g.setFontVector(this.gui.txt1/4);
		this.g.drawString((set.def.dash.farn)?"°F":"°C",size,this.gui.tmp[1]+3); 
		if (this.old)this.g.flip();
	},
	clkf: function(){
		"ram";
		this.time=getTime();
		this.g.setColor(0,1);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,14);
		this.g.setFontVector(45);
		let d=(Date()).toString().split(' ');
		let t=(d[4]).toString().split(':');
		this.time=(t[0]+":"+t[1]);
		this.g.drawString(this.time,0,5); 
		if (this.old)this.g.flip();
	},
	batf: function(){
		"ram";
		this.bat=dash.live.bat;
		this.g.setColor(0,this.batC[dash.live.batC]);
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
		this.volt=dash.live.volt.toFixed(1);
		this.g.setColor(0,this.batC[dash.live.batC]);
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
		this.amp=dash.live.amp;
		this.g.setColor(0,this.ampC[dash.live.ampC]);
		this.g.fillRect(this.gui.tmp[0],this.gui.tmp[1],this.gui.tmp[2],this.gui.tmp[3]);
		this.g.setColor(1,15);
		this.g.setFontVector(33);
		this.g.drawString(this.amp|0,(122-(this.g.stringWidth(this.amp|0)/2)),5); 
		if (this.old)this.g.flip();
	},
	tpmsf: function(){		
		"ram";
		this.tpms=tpms.euc[dash.live.tpms].alrm;
		this.g.setColor(0,(this.tpms)?7:4);
		this.g.clearRect(0,210,239,239); //amp 
		this.g.setColor(1,14);
		this.g.setFontVector(25);
		this.g.drawString("TPMS",85,215); 
		if (this.old)this.g.flip();
	},
	bar:function(){
		"ram";

	},
	clear : function(o){
		set.bar=0;
		this.run=false;
		if (this.tid) clearTimeout(this.tid);this.tid=0;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
		return true;
	},
	off: function(o){
		this.g.off();this.clear(o);
	}
};
//

touchHandler[0]=function(){};
UIc.main._2x2_1=()=>{buzzer(buz.ok);this.sel(1,"hapS","SPEED","haSv",10,100);};
UIc.main._2x2_2=()=>{buzzer(buz.ok);this.sel(2,"hapA","AMP","haSv",10,100);};
tcN=(x,y)=>{
	if ( euc.state!="OFF")
		face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0);
	else 
		buzzer(buz.na);
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	face.go("main",0);
};	
tcBack.replaceWith(tcB);

