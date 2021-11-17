//tpms face
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:30000,
	g:w.gfx,
	spd:[],
	init: function(){
		this.foot="bar";
		this.disp=0;
		this.info=0;
		this.log=[];
		this.tpms=Object.keys(require("Storage").readJSON("tpms.json",1).dev);
		if (this.tpms.length) {
			this.dev=require("Storage").readJSON("tpms.json",1).dev[this.tpms[tpms.def.pos]];
			if (require("Storage").read("tpmsLog"+this.tpms[tpms.def.pos]+".json",1)) { 
				this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
				this.sc();
			}
			//this.dev.lowP=(this.dev.lowP)?this.dev.lowP:10;this.dev.hiP=(this.dev.hiP)?this.dev.hiP:40;this.dev.log=(this.dev.log)?1:0;
			let cl=((getTime()|0) - face[0].dev.time < 1800)?1:0;
			//top
			this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.dev.psi < this.dev.lowP ||  this.dev.hiP < this.dev.psi )?col("red"):col("raf"),col("dgray"),0,0,149,50); //device
			this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,0,150,0,239,50);  //more
			//scale			
			let tm=(getTime()|0) - this.dev.time;
			let ago=0;
			if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
			//info
			this.sel((this.log.length&&this.dev.log)?this.log[tpms.def.ref][tpms.def.metric]:this.dev[tpms.def.metric] ,ago,(tm < 86400)?"AGO":0);
			
			
			if (tpms.status=="SCANNING") {this.scan();this.ind();}else if (!this.ntid){this.bar();} 
			this.page=0;
		}else {
			tpms.def.pos=0;
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
				if (this.scale < this.log[i][tpms.def.metric]-0 ) this.scale=this.log[i][tpms.def.metric];
			}
			this.top=this.scale;
			this.scale=40/this.scale;				
	},
	bar: function(l){
		if (tpms.status=="SCANNING") {this.ind();return;}
		this.g.setColor(0,0);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("lblue"));
		let img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
		this.g.drawImage(img,5,195);
		this.g.flip();
		if (!this.log || !this.log.length || !this.dev.log) return;
		for (let i in this.log) {
			if (this.log[i].psi<this.dev.lowP||this.dev.hiP<this.log[i].psi)this.g.setColor(1,col("red"));else this.g.setColor(1,col("raf"));
			this.g.fillRect(239-(i*18)-16, 239-(this.log[i][tpms.def.metric]*this.scale),239-(i*18), 239);
			this.g.flip(); 
		}
		this.ind();
    },	
	ind: function(last){
		if (!this.log || !this.log.length ||!this.dev.log) return;
		if (last || last===0) {
			this.g.setColor(1,col( (this.foot=="barS")?"black":(this.log[tpms.def.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.def.ref].psi)?"yellow":"lblue"));
			this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
			this.g.setColor(0,0);
			this.g.fillRect(239-(last*18)-16,186,239-(last*18),189);
		}else {
			this.g.setColor(0,0);
			this.g.fillRect(0,186,239,190);
			//if (this.log[tpms.def.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.def.ref].psi)this.g.setColor(1,col("yellow"));else this.g.setColor(1,col("lblue"));
			this.g.setColor(1,col( (this.foot=="barS")?"black":(this.log[tpms.def.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.def.ref].psi)?"yellow":"lblue"));
			this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
		}
		this.g.flip();
		
		if (this.act) return;
		this.g.setColor(0,0);
		if (this.log[tpms.def.ref].psi<this.dev.lowP||this.dev.hiP<this.log[tpms.def.ref].psi)this.g.setColor(1,col("yellow"));else this.g.setColor(1,col("lblue"));
		//this.g.setColor(1,col("gray"));
		this.g.fillRect(239-(tpms.def.ref*18)-16, 196,239-(tpms.def.ref*18), 239-(this.log[tpms.def.ref][tpms.def.metric]*this.scale));
		this.g.flip(); 
		if ((last || last===0) && last!=tpms.def.ref){
			//if (this.log[last].psi < this.dev.lowP ||  this.dev.hiP < this.log[last].psi ) this.g.setColor(1,col("red"));
			this.g.setColor(1,0);
			this.g.drawRect(239-(last*18)-16,196,239-(last*18),  239-(this.log[last][tpms.def.metric]*this.scale));
			this.g.flip(); 
		}
    },	
	scan: function(){
		this.act=1;
		
		if (tpms.status=="SUCCESS") {
			this.page=0;
			tpms.def.ref=0;
			this.tpms=Object.keys(require("Storage").readJSON("tpms.json",1).dev);
			tpms.def.pos=this.tpms.indexOf(tpms.def.id);
			this.dev=require("Storage").readJSON("tpms.json",1).dev[this.tpms[tpms.def.pos]];
			this.dev.lowP=(this.dev.lowP)?this.dev.lowP:10;this.dev.hiP=(this.dev.hiP)?this.dev.hiP:40;this.dev.log=(this.dev.log)?1:0;
			if ( this.log.length )  {
				this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
				this.sc();
			}
			let cl=((getTime()|0) - this.dev.time < 1800)?1:0;
			this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.dev.psi<this.dev.lowP||this.dev.hiP<this.dev.psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			//this.sel((this.log.length)?this.log[tpms.def.ref][tpms.def.metric]:this.dev[tpms.def.metric],"JUST NOW");
			this.sel(face[0].dev[tpms.def.metric],"JUST NOW");
			this.ntfy("FOUND : "+tpms.new,"",27,col("raf"),1,2);
			return;
		}else if (tpms.status=="NOT FOUND") {
			this.ntfy(tpms.status,"",27,col("red"),1,2);
			return;
		}
		this.btn(1,tpms.status+((tpms.try)?"("+tpms.try+") ":" ")+(tpms.def.wait-( (getTime()|0)-tpms.cnt) ),27,120,205,col("olive"),0,0,190,239,239,"",22,120,225);
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
		txt1=txt1.split(".");
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,51,239,120);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",53);
		let size=this.g.stringWidth(txt1[0]);
		this.g.drawString(txt1[0],80-(size/2),65);
		this.g.setFont("Vector",42);
		this.g.drawString("."+txt1[1],80+(size/2),72);
		size=(size/2)+this.g.stringWidth(txt1[1]);
		this.g.setFont("Vector",20);	
		this.g.drawString(tpms.def.metric.toUpperCase(),97+size,89);
		
		this.g.flip();
		this.g.setColor(0,col("dgray"));
		if (txt3){
			this.g.fillRect(0,121,239,185);
			this.g.setColor(1,col("lblue"));
			this.g.setFont("Vector",42);
			let size=this.g.stringWidth(txt2);
			this.g.drawString(txt2,110-(size/2),135);	
			this.g.setFont("Vector",20);
			this.g.drawString(txt3,112+(size/2),152);
		}else{
			this.g.fillRect(0,121,239,185);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",30);
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
		//this.btn(1,(tpms.def.metric=="bar")?(this.dev.hiP/14.50377377).toFixed(2):this.dev.hiP,38,205,15,col("dgray"),0,160,0,239,60); //3
		this.btn(1,(tpms.def.metric=="psi")?face[0].dev.hiP: (face[0].dev.hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
		this.g.setColor(0,0);
		this.g.clearRect(0,61,239,64);
		this.g.flip();
		this.btn(tpms.def.mode,tpmsS[tpms.def.mode],28,80,84,(tpms.def.mode==4)?col("olive"):col("raf"),col("dgray"),0,65,155,125); //4-5
		this.g.setColor(0,0);
		this.g.clearRect(156,65,159,125);
		this.g.flip();
		//this.btn(1,(tpms.def.metric=="bar")?(this.dev.lowP/14.50377377).toFixed(2):this.dev.lowP,38,205,81,col("dgray"),0,160,65,239,125); //6
		this.btn(1,(tpms.def.metric=="psi")?face[0].dev.lowP:(face[0].dev.lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
			this.g.setColor(0,0);
			this.g.clearRect(0,126,239,129);
			this.g.flip();
			this.btn(1,"WAIT",18,40,152,col("dgray"),0,0,130,80,185); //7
			this.g.setColor(0,0);
			this.g.clearRect(81,130,84,185);
			this.g.flip();
			this.btn(1,"RETRY",18,123,152,col("dgray"),0,85,130,155,185); //8
			this.g.setColor(0,0);
			this.g.clearRect(156,130,159,185);
			this.g.flip();
			this.btn(1,tpms.def.metric.toUpperCase(),28,205,150,col("raf"),0,160,130,239,185,"",30,205,40); //9
	},	
	barS: function(){
		if ( this.page=="sett") {
			this.g.setColor(0,0);
			this.g.clearRect(0,126,239,129);
			this.g.flip();
			this.btn(1,"WAIT",18,40,152,col("dgray"),0,0,130,80,185); //7
			this.g.setColor(0,0);
			this.g.clearRect(81,130,84,185);
			this.g.flip();
			this.btn(1,"RETRY",18,123,152,col("dgray"),0,85,130,155,185); //8
			this.g.setColor(0,0);
			this.g.clearRect(156,130,159,185);
			this.g.flip();
			this.btn(1,tpms.def.metric.toUpperCase(),28,205,150,col("raf"),0,160,130,239,185,"",30,205,40); //9
		}
		this.foot="barS";
  	if (tpms.status=="SCANNING") {this.ind();return;}
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
				if (s) {this.g.setFont("Vector",40);this.g.drawString("<",5,170);this.g.drawString(">",215,170);}
				this.g.setFont("Vector",size);
				this.g.drawString(txt1,125-(this.g.stringWidth(txt1)/2),150); 
				//this.g.setFont("Vector",size);
				this.g.drawString(txt2,125-(this.g.stringWidth(txt2)/2),205); 
			}else{
				this.g.fillRect(0,190,239,239);
				this.g.setColor(1,col("white"));
				if (s) {this.g.setFont("Vector",45);this.g.drawString("<",5,197);this.g.drawString(">",215,197);}
				this.g.setFont("Vector",size);
				this.g.drawString((bt)?txt1:txt2,125-(this.g.stringWidth((bt)?txt1:txt2)/2),205); 
			}
			this.g.flip();
		}
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.act=0;
			t[t.foot]();
		},tm*1000,this);
    },
	inf:function(){
		//this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
		this.info=1;
		let cl=((getTime()|0) - this.dev.time < 1800)?1:0;
		this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.dev.psi<this.dev.lowP||this.dev.hiP<this.dev.psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
		this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
		this.info=1;
		w.gfx.setColor(0,0);
		w.gfx.fillRect(100,51,190,239); 
		w.gfx.setColor(1,col("white"));
		w.gfx.setFontVector(28);
		w.gfx.drawString(this.dev.bar,185-w.gfx.stringWidth(this.dev.bar),62);
		w.gfx.drawString(Number(this.dev.psi).toFixed(1),185-w.gfx.stringWidth(Number(this.dev.psi).toFixed(1)),100);
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
		if (face[0].page=="sett") {
			let got=require("Storage").readJSON("tpms.json",1);
			got.def=tpms.def;
			got.dev[face[0].tpms[tpms.def.pos]]=face[0].dev;
			require("Storage").writeJSON("tpms.json",got);
		}
		if (tpms.def.mode && tpms.def.mode!=4) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
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
			tpms.scan();
			face[0].scan();
			buzzer([30,50,30]);
		}else if (190<y&& x< 80&&face[0].foot=="bar") {
				if  (tpms.status!="SCANNING" ) { 
					tpms.new=0;
					tpms.scan();
					face[0].scan();
					buzzer([30,50,30]);
				}else buzzer(40);
				return;
		}else if ( face[0].foot=="barS"&&125<y&&face[0].act) {
				if (face[0].act=="confC"){
					buzzer([100,50,100]);
					face[0].dev.log=0;
					//tpms.def.pos=0;
					set.write("tpms","dev",face[0].tpms[tpms.def.pos],face[0].dev);
					require("Storage").erase("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1);
					face[0].ntfy(face[0].tpms[tpms.def.pos]+" CLEARED","",25,col("red"),1,2,0,1,0);
					face[0].init();
				}else if (face[0].act=="confD"){
					buzzer([100,50,100]);
					let got=require("Storage").readJSON("tpms.json",1);
					delete got.dev[face[0].tpms[tpms.def.pos]];
					require("Storage").writeJSON("tpms.json",got);
					tpms.def.pos=0;
					face[0].ntfy(face[0].tpms[tpms.def.pos]+" DELETED","",25,col("red"),1,2,0,1,0);
					face[0].init();
				}else if (face[0].act=="del"){
						buzzer([30,50,30]);
						if ( y < 195) {
							face[0].ntfy("TAP TO","CLEAR LOG",26,col("red"),1,2,0,1,1);
							face[0].act="confC";
						}else{
							face[0].ntfy("TAP TO","DELETE SENSOR",26,col("red"),1,2,0,1,1);
							face[0].act="confD";
						}
				}else if (face[0].act=="hi"){	
						buzzer([30,50,30]);
						let fast=( getTime()-this.lL < 0.2 )?1:0;
						if  ( x < 120 ) {face[0].dev.hiP=face[0].dev.hiP-((fast)?5:1);if(face[0].dev.hiP-5<face[0].dev.lowP){face[0].dev.hiP=face[0].dev.lowP+5;if(face[0].dev.hiP<20)face[0].dev.hiP=20;}}
						else {face[0].dev.hiP=face[0].dev.hiP+((fast)?5:1); if ( 250 < face[0].dev.hiP ) face[0].dev.hiP=250;}
						face[0].btn(1,(tpms.def.metric=="psi")?face[0].dev.hiP: (face[0].dev.hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
						face[0].ntfy("","",27,0,1,2,0,0);
						this.lL=getTime();
				}else if (face[0].act=="low"){		
						buzzer([30,50,30]);
						let fast=( getTime()-this.lL < 0.2 )?1:0;
						if  ( x < 120 ) {face[0].dev.lowP=face[0].dev.lowP-((fast)?5:1); if (  face[0].dev.lowP <1 ) face[0].dev.lowP=1;}
						else { face[0].dev.lowP=face[0].dev.lowP+((fast)?5:1);if(face[0].dev.hiP-5<face[0].dev.lowP){face[0].dev.lowP=face[0].dev.hiP-5;if ( 150 < face[0].dev.lowP ) face[0].dev.lowP=150;}}
						face[0].btn(1,(tpms.def.metric=="psi")?face[0].dev.lowP:(face[0].dev.lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
						face[0].ntfy("","",27,0,1,2,0,0);
						this.lL=getTime();
				}else if (face[0].act=="log"){	
						buzzer([30,50,30]);
						tpms.def.ref=0;
						face[0].dev.log = 1 - face[0].dev.log;
						face[0].btn(face[0].dev.log,"LOGGING",25,80,20,col("raf"),col("gray"),0,0,155,60);//1-2
						face[0].ntfy((face[0].dev.log)?"LOG ON":"LOG OFF",face[0].dev.id.toUpperCase(),30,(face[0].dev.log)?col("raf"):col("dgray"),1,4,1,1,1);
				}else if (face[0].act=="wait"){
 						buzzer([30,50,30]);
						tpms.def.wait=(x<120)?(tpms.def.wait<6)?5:tpms.def.wait-1:(19<tpms.def.wait)?20:tpms.def.wait+1;
						face[0].ntfy("SCAN FOR",tpms.def.wait+" SECONDS",25,col("raf"),1,2,1,1,1);
				}else if (face[0].act=="try"){
 						buzzer([30,50,30]);
						tpms.def.try=(x<120)?(tpms.def.try<1)?0:tpms.def.try-1:(3<tpms.def.try)?4:tpms.def.try+1;
						face[0].ntfy("RETRIES",tpms.def.try+1,25,col("raf"),1,2,1,1,1);
				}		
			return;
		}
		if (face[0].page=="sett"){
			if ( 0 < x && x < 155 && y < 62 ) { //1-2
				buzzer([30,50,30]);
				if ( face[0].act == "log" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
				else {face[0].ntfy((face[0].dev.log)?"LOG ON":"LOG OFF",face[0].dev.id.toUpperCase(),30,(face[0].dev.log)?col("raf"):col("dgray"),1,4,1,1,1);face[0].act="log";}
			}else if (155 <= x && y < 62) { //3
				buzzer([30,50,30]);	
				if ( face[0].act == "hi" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
				else {face[0].ntfy("UPPER","(in "+tpms.def.metric.toUpperCase()+")",30,col("olive"),1,4,1,1,1);face[0].act="hi";}
			}else if (0 <= x && x < 155 && 62 < y && y < 127) { //4-5
				buzzer([30,50,30]);
				face[0].act="mode";
				tpms.def.mode++; if (4 < tpms.def.mode) tpms.def.mode=0;
				let tpmsS=["OFF","5 MIN","30 MIN","1 HOUR","EUC"];
				face[0].btn(tpms.def.mode,tpmsS[tpms.def.mode],28,80,84,(tpms.def.mode==4)?col("olive"):col("raf"),col("dgray"),0,65,155,125); //4-5
				face[0].ntfy("REFRESH","MODE",27,col("dgray"),1,2,0,1,1);
			}else if (155 <= x && 62 <y && y < 127) { //6
				buzzer([30,50,30]);
				if ( face[0].act == "low" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
				else {face[0].ntfy("LOWER","(in "+tpms.def.metric.toUpperCase()+")",30,col("olive"),1,4,1,1,1);face[0].act="low";}
			}else if (x < 80 && 127 <y && y < 190) { //7
				buzzer([30,50,30]);
				face[0].act="wait";
				face[0].ntfy("SCAN FOR",tpms.def.wait+" SECONDS",25,col("raf"),1,2,1,1,1);
			}else if (80 <  x && x < 160 && 127 <y && y < 190) { //8
				buzzer([30,50,30]);
				face[0].act="try";	
				face[0].ntfy("RETRIES",tpms.def.try+1,25,col("raf"),1,2,1,1,1);
			} else if (160 < x && 127 <y && y < 190) { //9 bar-psi
				face[0].act=0;
				buzzer([30,50,30]);
				tpms.def.metric=(tpms.def.metric=="psi")?"kpa":(tpms.def.metric=="kpa")?"bar":"psi";
				face[0].btn(1,tpms.def.metric.toUpperCase(),28,205,150,col("raf"),0,160,130,239,185,"",30,205,40); 
				face[0].btn(1,(tpms.def.metric=="psi")?face[0].dev.hiP: (face[0].dev.hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
				face[0].btn(1,(tpms.def.metric=="psi")?face[0].dev.lowP:(face[0].dev.lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
			} else { 
				if ( x < 80 ){
					buzzer([30,50,30]);
					face[0].page=0;
					face[0].init();
				}else if ( 160 < x ){
					buzzer([30,50,30]);
					face[0].ntfy("CLEAR LOG","DELETE SENSOR",25,col("dgray"),1,2,0,1,1);
					face[0].act="del";
				}else {
					buzzer(40);
				}
			}
		}else if (50 < y) { 
			//entry select
			if (face[0].info || !face[0].log.length || !face[0].dev.log  ) {buzzer(40);return;}
			let last=tpms.def.ref;
			buzzer([30,50,30]);
			if  ( 120 < x ){
				if (  0 < tpms.def.ref  ) tpms.def.ref--; //{ buzzer([30,50,30]);tpms.def.ref--;}
				else   tpms.def.ref=face[0].log.length-1;//{buzzer(40);return;}
			}else {
				if ( tpms.def.ref  < face[0].log.length-1 )tpms.def.ref++;
				else tpms.def.ref=0;
			}
			let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
			let ago=0;
			if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
			face[0].sel((face[0].log.length&&face[0].dev.log)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].dev[tpms.def.metric],ago,(tm < 86400)?"AGO":0);
			//face[0].sel(face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
			face[0].ind(last);
			return;
		}else {
			if  ( 150 < x ) { //info
				if (face[0].info) {
					if (face[0].tpms.length <=1 ) {buzzer(40);return;}
					face[0].dev=require("Storage").readJSON("tpms.json",1).dev[face[0].tpms[tpms.def.pos]];
					face[0].dev.lowP=(face[0].dev.lowP)?face[0].dev.lowP:10;face[0].dev.hiP=(face[0].dev.hiP)?face[0].dev.hiP:40;face[0].dev.log=(face[0].dev.log)?1:0;
					if (tpms.def.pos+1 < face[0].tpms.length) tpms.def.pos++;
					else tpms.def.pos=0;
					tpms.def.ref=0;
				} 
				buzzer([30,50,30]);
				face[0].inf();
			}else{ //sensor
				if (face[0].info) {
					face[0].info=0;
				} else {
					if (face[0].tpms.length <=1 ) {buzzer(40);return;}
					if (tpms.def.pos+1 < face[0].tpms.length) tpms.def.pos++;
					else tpms.def.pos=0;
					tpms.def.ref=0;
					face[0].dev=require("Storage").readJSON("tpms.json",1).dev[face[0].tpms[tpms.def.pos]];
					face[0].dev.lowP=(face[0].dev.lowP)?face[0].dev.lowP:10;face[0].dev.hiP=(face[0].dev.hiP)?face[0].dev.hiP:40;face[0].dev.log=(face[0].dev.log)?1:0;
				}
				buzzer([30,50,30]);
				face[0].log=(require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1) )?face[0].log=require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1):[];
				let cl=((getTime()|0) - face[0].dev.time < 1800)?1:0;
				face[0].btn(cl,face[0].tpms[tpms.def.pos],35,75,7,(face[0].dev.psi<face[0].dev.lowP||face[0].dev.hiP<face[0].dev.psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
				face[0].btn(1,tpms.def.pos+1+"/"+face[0].tpms.length,35,200,7,0,col("raf"),150,0,239,50);
				face[0].sc();	
				let tm=(getTime()|0) - face[0].dev.time;
				let ago=0;
				if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}
				else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
				face[0].sel((face[0].log.length&&face[0].dev.log)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].dev[tpms.def.metric],ago,(tm < 86400)?"AGO":0);
				//face[0].sel(face[0].dev[tpms.def.metric],ago,(tm < 86400)?"AGO":0);
				face[0].bar();
			}			
		}
		break;
    case 1: //slide down event
		if (face[0].page=="sett") {
				let got=require("Storage").readJSON("tpms.json",1);
				got.def=tpms.def;
				got.dev[face[0].tpms[tpms.def.pos]]=face[0].dev;
				require("Storage").writeJSON("tpms.json",got);
		}
		if (tpms.def.mode && tpms.def.mode!=4) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
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
		if (face[0].page=="sett") {
				let got=require("Storage").readJSON("tpms.json",1);
				got.def=tpms.def;
				got.dev[face[0].tpms[tpms.def.pos]]=face[0].dev;
				require("Storage").writeJSON("tpms.json",got);
		}
		if (tpms.def.mode && tpms.def.mode!=4) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		face.go("settings",0);return;
		}
		break;
    case 3: //slide left event
		if (face[0].page!="sett" && face[0].tpms.length){
			if (face[0].ntid) clearTimeout(face[0].ntid);
			face[0].ntid=0;
			face[0].sett();
			face[0].page="sett";
			face[0].act=0;
		}else
			buzzer(40);
		return;
    case 4: //slide right event (back action)
		if (face[0].page && face[0].page!="scan") {
			face[0].act=0;
			if (face[0].ntid) clearTimeout(face[0].ntid);
			face[0].ntid=0;
			if (face[0].page=="sett") {
				face[0].page=0;
				let got=require("Storage").readJSON("tpms.json",1);
				got.def=tpms.def;
				got.dev[face[0].tpms[tpms.def.pos]]=face[0].dev;
				require("Storage").writeJSON("tpms.json",got);
				//set.write("tpms","dev",face[0].tpms[tpms.def.pos],face[0].dev);
			}
			face[0].init();
			return;
		}
		if (tpms.def.mode && tpms.def.mode!=4) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		face.go("settings",0,1);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		return;
    }
};