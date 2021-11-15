//tpms face
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:30000,
	g:w.gfx,
	spd:[],
	init: function(){
		this.foot="bar";
		this.disp=0;
		tpms.pos=(tpms.pos)?tpms.pos:0;
		this.try=tpms.try;
		this.tpms=(require("Storage").readJSON("tpms.json",1).slot)?require("Storage").readJSON("tpms.json",1).slot:[];
		this.log=(require("Storage").readJSON("tpmsLog"+this.tpms[tpms.pos]+".json",1))?require("Storage").readJSON("tpmsLog"+this.tpms[tpms.pos]+".json",1):[];
		if (this.tpms.length) {
			this.dev=require("Storage").readJSON("tpms.json",1).dev[this.tpms[tpms.pos]];
			this.dev.lowP=(this.dev.lowP)?this.dev.lowP:10;this.dev.hiP=(this.dev.hiP)?this.dev.hiP:40;
			this.dev.log=(this.dev.log)?1:0;
			let cl=((getTime()|0) - face[0].dev.time < 1800)?1:0;
			this.btn(cl,this.tpms[tpms.pos],35,75,7,(this.dev.psi < this.dev.lowP ||  this.dev.hiP < this.dev.psi )?col("red"):col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,tpms.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sc();
			let tm=(getTime()|0) - this.dev.time;
			let ago=0;
			if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h"+ago[1]+"'";}}else ago=new Date(tm*1000).toString().substr(0,24);
			this.sel(this.dev[tpms.metric],ago,(tm < 86400)?"AGO":0);
			if (tpms.status=="SCANNING") {this.scan();}else if (!this.ntid){tpms.cnt=0;this.bar();this.page=0;} 
		}else {
			tpms.pos=0;
			this.g.setColor(0,0);
			this.g.clearRect(0,0,239,239);
			this.page="scan";
			this.btn(1,"TPMS SENSOR",25,100,7,0,0,0,0,239,50);
			this.btn(1,"TOUCH",30,120,80,col("dgray"),col("dgray"),0,50,239,185,"TO SCAN",30,120,130);
			if (tpms.status=="SCANNING") this.scan();
		}	
	},
	show : function(o){
		return;
	},
	sc:function(){
			if (!this.log || !this.log.length) return;
			this.scale=0;
			for (let i in this.log) {
				if (this.scale < this.log[i][tpms.metric]-0 ) this.scale=this.log[i][tpms.metric];
			}
			//tpms.ref=(tpms.ref)?tpms.ref:0;
			this.top=this.scale;
			this.scale=40/this.scale;				
	},
	bar: function(l){
		if (tpms.status=="SCANNING") return;
		this.g.setColor(0,0);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("lblue"));
		let img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
		this.g.drawImage(img,5,195);
		this.g.flip();
	if (!this.log || !this.log.length || !this.dev.log) return;
		for (let i in this.log) {
			if (this.log[i].psi<this.dev.lowP||this.dev.hiP<this.log[i].psi)this.g.setColor(1,col("red"));else this.g.setColor(1,col("raf"));
			this.g.fillRect(239-(i*18)-16, 239-(this.log[i][tpms.metric]*this.scale),239-(i*18), 239);
			this.g.flip(); 
		}
		this.ind();
    },	
	ind: function(last){
		if (!this.log || !this.log.length ||!this.dev.log) return;
		if (last || last===0) {
			if (this.log[tpms.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.ref].psi)this.g.setColor(1,col("yellow"));else this.g.setColor(1,col("lblue"));
			this.g.fillRect(239-(tpms.ref*18)-16,187,239-(tpms.ref*18),190);
			this.g.setColor(0,0);
			this.g.fillRect(239-(last*18)-16,187,239-(last*18),190);
		}else {
			this.g.setColor(0,0);
			this.g.fillRect(0,186,239,190);
			if (this.log[tpms.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.ref].psi)this.g.setColor(1,col("yellow"));else this.g.setColor(1,col("lblue"));
			this.g.fillRect(239-(tpms.ref*18)-16,187,239-(tpms.ref*18),190);
		}
		this.g.flip();
		if (tpms.status=="SCANNING" || this.act) return;
		this.g.setColor(0,0);
		if (this.log[tpms.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.ref].psi)this.g.setColor(1,col("yellow"));else this.g.setColor(1,col("lblue"));
		this.g.fillRect(239-(tpms.ref*18)-16, 239-(this.log[tpms.ref][tpms.metric]*this.scale),239-(tpms.ref*18), 239);
		this.g.flip(); 
		if ((last || last===0) && last!=tpms.ref){
			if (this.log[last].psi < this.dev.lowP ||  this.dev.hiP < this.log[last].psi ) this.g.setColor(1,col("red"));
			else this.g.setColor(1,col("raf"));
			this.g.fillRect(239-(last*18)-16, 239-(this.log[last][tpms.metric]*this.scale),239-(last*18), 239);
			this.g.flip(); 
		}
    },	
	scan: function(){
		this.act=1;
		if (!tpms.cnt) tpms.cnt=getTime()|0;
		if (tpms.status=="SUCCESS") {
			this.page=0;
			tpms.ref=0;
			this.tpms=require("Storage").readJSON("tpms.json",1).slot;
			this.dev=require("Storage").readJSON("tpms.json",1).dev[this.tpms[tpms.pos]];
			if ( this.log.length )  {
				this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.pos]+".json",1);
				this.sc();
			}
			let cl=((getTime()|0) - face[0].dev.time < 1800)?1:0;
			this.btn(cl,this.tpms[tpms.pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,tpms.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sel(face[0].dev[tpms.metric],"JUST NOW");
			this.ntfy("FOUND : "+tpms.new,"",27,col("raf"),1,2);
			tpms.cnt=0;			
			return;
		}else if (tpms.status=="NOT FOUND") {
			this.ntfy(tpms.status,"",27,col("red"),1,2);
			tpms.cnt=0;
			return;
		}
		this.btn(1,tpms.status+" "+(tpms.wait-( (getTime()|0)-tpms.cnt) ),27,120,205,col("olive"),0,0,190,239,239,"",22,120,225);
  		//refresh 
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.scan();
		},1000,this);
    },
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
		this.g.setColor(0,(bt)?clr1:clr0);
		this.g.fillRect(rx1,ry1,rx2,ry2);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",size1);	
		this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
		if (txt2){this.g.setFont("Vector",size2);	
		this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
		this.g.flip();
    },
	sel: function(txt1,txt2,txt3){
		this.g.setColor(0,col("dgray"));
		//this.g.fillRect(0,51,239,185);
		this.g.fillRect(0,51,239,120);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",55);	
		let size=this.g.stringWidth(txt1);
		this.g.drawString(txt1,100-(this.g.stringWidth(txt1)/2),65); 
		this.g.setFont("Vector",26);	
		this.g.drawString(tpms.metric.toUpperCase(),110+(size/2),84);
		this.g.flip();
		this.g.setColor(0,col("dgray"));
		if (txt3){
			this.g.fillRect(0,121,185,185);
			this.g.setColor(1,col("lblue"));
			this.g.setFont("Vector",47);
			this.g.drawString(txt2,125-(this.g.stringWidth(txt2)/2),132);		
			this.g.flip();
			this.g.setColor(0,col("dgray"));
			this.g.fillRect(185,121,239,185);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",20);
			this.g.drawString(txt3,189,152);
		}else{
			this.g.fillRect(0,121,239,185);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",25);
			this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),145);
		}
		this.g.flip();
    },
	sett:function(){
		let tpmsS=["OFF","5 MIN","30 MIN","1 HOUR","EUC"];
		this.barS();
		this.btn(this.dev.log,"LOGGING",25,80,20,col("raf"),col("gray"),0,0,155,60);//1-2
		this.g.setColor(0,0);
		this.g.clearRect(156,0,159,60);
		this.g.flip(); 
		this.btn(1,(tpms.metric=="bar")?(this.dev.hiP/14.50377377).toFixed(2):this.dev.hiP,38,205,15,col("dgray"),0,160,0,239,60); //3
		this.g.setColor(0,0);
		this.g.clearRect(0,61,239,64);
		this.g.flip();
		this.btn(tpms.mode,tpmsS[tpms.mode],28,80,84,(tpms.mode==4)?col("olive"):col("raf"),col("dgray"),0,65,155,125); //4-5
		this.g.setColor(0,0);
		this.g.clearRect(156,65,159,125);
		this.g.flip();
		this.btn(1,(tpms.metric=="bar")?(this.dev.lowP/14.50377377).toFixed(2):this.dev.lowP,38,205,81,col("dgray"),0,160,65,239,125); //6
	},	
	barS: function(){
		this.foot="barS";
		if (tpms.status=="SCANNING") return;
		this.g.setColor(0,0);
		this.g.clearRect(0,126,239,129);
		this.g.flip();
		this.btn(1,"RETRY: "+tpms.try,25,85,150,col("dgray"),0,0,130,155,185); 
		this.g.setColor(0,0);
		this.g.clearRect(156,130,159,190);
		this.g.flip();
		this.btn(1,tpms.metric.toUpperCase(),25,205,150,col("dgray"),0,160,130,239,185,"",30,205,40); 
		this.g.setColor(0,0);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("lblue"));
		let img = require("heatshrink").decompress(atob("mEwwIZWsAFE/AEDgIFEg/8AocPAokfAok/C4n/+AiD//AAoUD/+AFAf/FAn+EQgoEv4iDFAPgFBAiBFAcPFAhLLn4oEn4oDC4ILEN4sHJgheBRog7EKYJHDGA0fHggqLEgxsEFQJPEFQsPZYoFEgbdKgAdEACgA="));
		this.g.drawImage(img,10,195);
		this.g.flip();
		this.g.setColor(1,col("lblue"));
		img = require("heatshrink").decompress(atob("mEwwIROv/+AqoAPgf/AAXAg4FD8AFLFSQTCg8AgPwAoMPwAFHkAFE+EPAv4FLsEGL5IFVgH8AoM/AQKnDawQEBbAU/AoIUCj4FB/DkTAAgA="));
		this.g.drawImage(img,177,195);
		img=0;
		this.g.flip();
	},	
	ntfy: function(txt1,txt2,size,clr,bt,tm,s,f,d){
		if (tpms.status=="SCANNING") return;
		if (f && this.ntid) {clearTimeout(this.ntid);this.ntid=0;}
		if (!this.ntid){
			this.g.setColor(0,clr);
			if (d) {
				this.g.fillRect(0,130,239,239);
				this.g.setColor(1,col("white"));
				if (s) {this.g.setFont("Vector",45);this.g.drawString("<",5,203);this.g.drawString(">",215,203);}
				this.g.setFont("Vector",28);
				this.g.drawString(txt1,120-(this.g.stringWidth(txt1)/2),150); 
				this.g.setFont("Vector",size);
				this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),210); 
			}else{
				this.g.fillRect(0,190,239,239);
				this.g.setColor(1,col("white"));
				if (s) {this.g.setFont("Vector",45);this.g.drawString("<",5,197);this.g.drawString(">",215,197);}
				this.g.setFont("Vector",size);
				this.g.drawString((bt)?txt1:txt2,120-(this.g.stringWidth((bt)?txt1:txt2)/2),205); 
			}
			this.g.flip();
		}
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t[t.foot]();
			t.act=0;
		},tm*1000,this);
    },
	inf:function(){
		this.dev=require("Storage").readJSON("tpms.json",1).dev[this.tpms[tpms.pos]];
		//this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.pos]+".json",1);
		this.info=1;
		let cl=((getTime()|0) - this.dev.time < 1800)?1:0;
		this.btn(cl,this.tpms[tpms.pos],35,75,7,(this.dev.psi<this.dev.lowP||this.dev.hiP<this.psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
		this.btn(1,tpms.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
		this.info=1;
		w.gfx.setColor(0,0);
		w.gfx.fillRect(100,51,190,239); 
		w.gfx.setColor(1,col("white"));
		w.gfx.setFontVector(28);
		w.gfx.drawString(this.dev.bar,185-w.gfx.stringWidth(this.dev.bar),62);
		w.gfx.drawString(this.dev.psi,185-w.gfx.stringWidth(this.dev.psi),100);
		w.gfx.drawString(this.dev.temp,185-w.gfx.stringWidth(this.dev.temp),139); 
		w.gfx.drawString(this.dev.batt,185-w.gfx.stringWidth(this.dev.batt),178); 
		w.gfx.drawString(this.dev.volt,185-w.gfx.stringWidth(this.dev.volt),217); 
		w.gfx.flip();	
		w.gfx.setColor(0,0);
		w.gfx.fillRect(0,51,99,239); 				
		w.gfx.setColor(1,col("lgray"));
		w.gfx.setFontVector(22);
		w.gfx.drawString("Pressure",5,65);
		w.gfx.setFontVector(24);
		w.gfx.drawString("Temp",5,143);
		w.gfx.drawString("Battery",5,181);
		w.gfx.flip();
		w.gfx.setColor(0,0);
		w.gfx.fillRect(191,51,239,239); 
		w.gfx.setColor(1,col("lgray"));
		w.gfx.drawString("Bar",195,65);
		w.gfx.drawString("Psi",195,105);
		w.gfx.drawString("C",195,143);
		w.gfx.drawString("%",195,181);
		w.gfx.drawString("V",195,220);
		w.gfx.flip();	
	},	
	tid:-1,
	run:false,
	clear : function(){
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		if (this.ntid) clearTimeout(this.ntid);
		this.tid=-1;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	} 
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
	return;
	},
	show : function(){
		if (face[0].page=="sett") set.write("tpms","dev",face[0].tpms[tpms.pos],face[0].dev);
		if (tpms.mode && tpms.mode!=4) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		if (global.euc && euc.state!="OFF")
			face.go(set.dash[set.def.dash.face],0);
		else
			face.go("settings",0,1);
		return;
	},
	clear: function(){
		return;
	},
	off: function(){
		return;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	this.timeout();
	if (!this.lL) this.lL=getTime();
	switch (e) {
	case 5: //tap event
		if (face[0].page=="scan"){
			tpms.new=0;
			tpms.scan(face[0].try);
			face[0].scan();
			buzzer([30,50,30]);
		}else if (190 < y) {
			if (face[0].foot=="bar") {
				if  (tpms.status!="SCANNING" ) { 
					tpms.new=0;
					tpms.scan(face[0].try);
					face[0].scan();
					buzzer([30,50,30]);
				}else buzzer(40);
			}else if (face[0].foot=="barS") {
				if (face[0].act=="del"){	
						buzzer([100,50,100]);
						//set.write("tpms.json",dev,[this.tpms[tpms.pos]
						//require("Storage").remove("tpms.json",1).dev[this.tpms[tpms.pos]]
						//require("Storage").remove("tpmsLog"+face[0].tpms[tpms.pos]+".json",1)
						face[0].ntfy(face[0].tpms[tpms.pos]+" DELETED","",25,col("red"),1,2,0,1,0);
						face[0].init();
						face[0].act=0;
				}else if (face[0].act=="hi"){	
						buzzer([30,50,30]);
						let fast=( getTime()-this.lL < 0.2 )?1:0;
						if  ( x < 120 ) {face[0].dev.hiP=face[0].dev.hiP-((fast)?5:1);if(face[0].dev.hiP-5<face[0].dev.lowP){face[0].dev.hiP=face[0].dev.lowP+5;if(face[0].dev.hiP<20)face[0].dev.hiP=20;}}
						else {face[0].dev.hiP=face[0].dev.hiP+((fast)?5:1); if ( 250 < face[0].dev.hiP ) face[0].dev.hiP=250;}
						face[0].btn(1,(tpms.metric=="bar")?(face[0].dev.hiP/14.50377377).toFixed(2):face[0].dev.hiP,38,205,15,col("dgray"),0,160,0,239,60); //3
						face[0].ntfy("","",27,0,1,2,0,0);
						this.lL=getTime();
				}else if (face[0].act=="low"){		
						buzzer([30,50,30]);
						let fast=( getTime()-this.lL < 0.2 )?1:0;
						if  ( x < 120 ) {face[0].dev.lowP=face[0].dev.lowP-((fast)?5:1); if (  face[0].dev.lowP <0 ) face[0].dev.lowP=0;}
						else { face[0].dev.lowP=face[0].dev.lowP+((fast)?5:1);if(face[0].dev.hiP-5<face[0].dev.lowP){face[0].dev.lowP=face[0].dev.hiP-5;if ( 150 < face[0].dev.lowP ) face[0].dev.lowP=150;}}
						face[0].btn(1,(tpms.metric=="bar")?(face[0].dev.lowP/14.50377377).toFixed(2):face[0].dev.lowP,38,205,81,col("dgray"),0,160,65,239,125); //6
						face[0].ntfy("","",27,0,1,2,0,0);
						this.lL=getTime();
				}else { 
					if ( x < 80 ){
						buzzer([30,50,30]);
						face[0].init();
					}else if ( 180 < x ){
						buzzer([30,50,30]);
						face[0].ntfy("TAP -> DELETE","",25,col("red"),1,2,0,1,0);
						face[0].act="del";
					}else {
						buzzer(40);
					}
				}
				
			}else buzzer(40);	
		}else if (face[0].page=="sett"){
			if ( 0 < x && x < 155 && y < 65 ) { //1-2
				buzzer([30,50,30]);
				face[0].dev.log = 1 - face[0].dev.log;
				face[0].btn(face[0].dev.log,"LOGGING",25,80,20,col("raf"),col("gray"),0,0,155,60);//1-2
				face[0].ntfy("ENABLED","DISABLED",27,(face[0].dev.log)?col("raf"):col("dgray"),face[0].dev.log,2,0,1,0);
			}else if (155 <= x && y < 65) { //3
				buzzer([30,50,30]);	
				face[0].ntfy("HI PRESSURE","LIMIT",27,col("olive"),1,4,1,1,1);
				face[0].act="hi";
			}else if (0 <= x && x < 155 && 65 <y && y < 130) { //4-5
				buzzer([30,50,30]);
				tpms.mode++; if (4 < tpms.mode) tpms.mode=0;
				set.write("tpms","mode",tpms.mode+"");
				let tpmsS=["OFF","5 MIN","30 MIN","1 HOUR","EUC"];
				//face[0].btn(tpms.mode,"REFRESH",20,80,73,(tpms.mode==4)?col("olive"):col("raf"),col("dgray"),0,65,155,125,tpmsS[tpms.mode],25,80,100); //4-5
				face[0].btn(tpms.mode,tpmsS[tpms.mode],28,80,84,(tpms.mode==4)?col("olive"):col("raf"),col("dgray"),0,65,155,125); //4-5
				face[0].ntfy("REFRESH","MODE",27,col("dgray"),1,2,0,1,1);
			}else if (155 <= x && 65 <y && y < 130) { //6
				buzzer([30,50,30]);
				face[0].ntfy("LOW PRESSURE","LIMIT",27,col("olive"),1,4,1,1,1);
				face[0].act="low";
			}else if (x < 160 && 130 <y && y < 190) { //7-8 
				buzzer([30,50,30]);
				
			} else if (160 < x && 130 <y && y < 190) { //9 bar-psi
				buzzer([30,50,30]);
				tpms.metric=(tpms.metric=="bar")?"psi":"bar";
				face[0].btn(1,tpms.metric.toUpperCase(),25,205,150,col("dgray"),0,160,130,239,185,"",30,205,40); 
				face[0].btn(1,(tpms.metric=="bar")?(face[0].dev.hiP/14.50377377).toFixed(2):face[0].dev.hiP,38,205,15,col("dgray"),0,160,0,239,60); //3
				face[0].btn(1,(tpms.metric=="bar")?(face[0].dev.lowP/14.50377377).toFixed(2):face[0].dev.lowP,38,205,81,col("dgray"),0,160,65,239,125); //6
			} 
		}else if (50 < y) { 
			//entry select
			if (face[0].info || !face[0].log.length || !face[0].dev.log  ) {buzzer(40);return;}
			let last=tpms.ref;
			buzzer([30,50,30]);
			if  ( 120 < x ){
				if (  0 < tpms.ref  ) tpms.ref--; //{ buzzer([30,50,30]);tpms.ref--;}
				else   tpms.ref=face[0].log.length-1;//{buzzer(40);return;}
			}else {
				if ( tpms.ref  < face[0].log.length-1 )tpms.ref++;
				else tpms.ref=0;
			}
			let tm=(getTime()|0) - face[0].log[tpms.ref].time;
			let ago=0;
			if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h"+ago[1]+"'";}}else ago=new Date(tm*1000).toString().substr(0,24);
			face[0].sel(face[0].log[tpms.ref][tpms.metric],ago,(tm < 86400)?"AGO":0);
			face[0].ind(last);
			return;
		}else {
			if  ( 150 < x ) { //info
				if (face[0].info) {
					if (face[0].tpms.length <=1 ) {buzzer(40);return;}
					if (tpms.pos+1 < face[0].tpms.length) tpms.pos++;
					else tpms.pos=0;
					tpms.ref=0;
				} 
				buzzer([30,50,30]);
				face[0].inf();
			}else{ //sensor
				if (face[0].info) {
					face[0].info=0;
				} else {
					if (face[0].tpms.length <=1 ) {buzzer(40);return;}
					if (tpms.pos+1 < face[0].tpms.length) tpms.pos++;
					else tpms.pos=0;
					tpms.ref=0;
				}
				buzzer([30,50,30]);
				face[0].dev=require("Storage").readJSON("tpms.json",1).dev[face[0].tpms[tpms.pos]];
				face[0].log=(require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.pos]+".json",1) )?face[0].log=require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.pos]+".json",1):[];
				let cl=((getTime()|0) - face[0].dev.time < 1800)?1:0;
				face[0].btn(cl,face[0].tpms[tpms.pos],35,75,7,(face[0].dev.psi<face[0].dev.lowP||face[0].dev.hiP<face[0].psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
				face[0].btn(1,tpms.pos+1+"/"+face[0].tpms.length,35,200,7,0,col("raf"),150,0,239,50);
				face[0].sc();	
				let tm=(getTime()|0) - face[0].dev.time;
				let ago=0;
				if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h"+ago[1]+"'";}}else ago=new Date(tm*1000).toString().substr(0,24);
				face[0].sel(face[0].dev[tpms.metric],ago,(tm < 86400)?"AGO":0);
				face[0].bar();
			}			
		}
		break;
    case 1: //slide down event
		if (face[0].page=="sett") set.write("tpms","dev",face[0].tpms[tpms.pos],face[0].dev);
		if (tpms.mode && tpms.mode!=4) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		if (face.faceSave!=-1) {
			face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else
			face.go("main",0);
		return;
    case 2: //slide up =event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else {
			if (face[0].page=="sett") set.write("tpms","dev",face[0].tpms[tpms.pos],face[0].dev);
			if (tpms.mode && tpms.mode!=4) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
			face.go("settings",0);return;
		}
		break;
    case 3: //slide left event
		if (face[0].page!="sett" && face[0].tpms.length){
			if (face[0].ntid) clearTimeout(face[0].ntid);
			face[0].ntid=0;
			face[0].sett();
			face[0].page="sett";
		}else
			buzzer(40);
		return;
    case 4: //slide right event (back action)
		if (face[0].page && face[0].page!="scan") {
			if (face[0].ntid) clearTimeout(face[0].ntid);
			face[0].ntid=0;
			if (face[0].page=="sett") set.write("tpms","dev",face[0].tpms[tpms.pos],face[0].dev);
			face[0].init();
			return;
		}
		if (tpms.mode && tpms.mode!=4) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		face.go("settings",0,1);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		return;
    }
};