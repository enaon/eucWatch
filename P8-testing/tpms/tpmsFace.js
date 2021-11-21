//tpms face
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:30000,
	g:w.gfx,
	spd:[],
	init: function(){
		//check if log is corrupted
		this.tpms=Object.keys(tpms.def.list);
		if (require("Storage").read("tpmsLog"+this.tpms[tpms.def.pos]+".json",1) && !require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1)){
			require("Storage").erase("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
			delete tpms.def.list[this.tpms[tpms.def.pos]];
		}
		if (!this.tpms.length) {tpms.def.allowNew=1;tpms.def.int=0;}
		//
		this.log=0;
		this.foot="bar";
		this.disp=0;
		//this.info=0;
		this.tpms=Object.keys(tpms.def.list);
		if (!this.tpms[tpms.def.pos]) tpms.def.pos=0;
		//tpms.def.id=this.tpms[tpms.def.pos];
		if (this.tpms.length) {
			this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
			this.sc();
			let cl=((getTime()|0) - this.log[tpms.def.ref].time < 1800)?1:0;
			//top
			this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.log[tpms.def.ref].psi < tpms.def.list[this.tpms[tpms.def.pos]].lowP ||  tpms.def.list[this.tpms[tpms.def.pos]].hiP < this.log[tpms.def.ref].psi )?col("red"):col("raf"),col("dgray"),0,0,149,50); //device
			this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,0,150,0,239,50);  //more
			//scale			
			let tm=(getTime()|0) - this.log[tpms.def.ref].time;
			let ago=0;
			if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
			//info
			this.sel((this.log.length)?this.log[tpms.def.ref][tpms.def.metric]:this.log[tpms.def.ref][tpms.def.metric] ,ago,(tm < 86400)?"AGO":0);
			if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) {this.scan();this.ind();}else if (!this.ntid){this.bar();} 
			this.page=0;
		}else {
			tpms.def.pos=0;
			this.g.setColor(0,0);
			this.g.clearRect(0,0,239,239);
			this.page="scan";
			this.btn(1,"TPMS SENSOR",25,100,7,0,0,0,0,239,50);
			this.btn(1,"TOUCH",30,120,80,col("dgray"),col("dgray"),0,50,239,185,"TO SCAN",30,120,130);
			if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) this.scan();
		}	
	},
	show : function(o){
		return;
	},
	sc:function(){
			this.scale=0;
			for (let i in this.log) {
				if (this.scale < this.log[i][tpms.def.metric]-0 ) this.scale=this.log[i][tpms.def.metric];
			}
			this.top=this.scale;
			this.scale=40/((this.scale)?this.scale:1);				
	},
	bar: function(l){
		if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) {if (this.log ) this.ind(); return;}
		this.g.setColor(0,0);
		this.g.fillRect(0,190,58,239);
		this.g.setColor(1,col("lblue"));
		let img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
		this.g.drawImage(img,5,195);
		this.g.flip();
		//this.ind();
		this.g.setColor(0,0);
		this.g.fillRect(59,190,239,239);
		if (!this.log ) return;
		for (let i in this.log) {
			//let lim=(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?1:0;		
			//this.g.setColor(1,col((lim)?"red":"raf"));
			if (this.log[i].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[i].psi)this.g.setColor(1,col("red"));else this.g.setColor(1,col("raf"));
			this.g.fillRect(239-(i*18)-16, 239-(this.log[i][tpms.def.metric]*this.scale),239-(i*18), 239);
			this.g.flip(); 
		}
		this.ind();
    },	
	ind: function(last){
		if (!this.log ) return;
		let lim=(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?1:0;		
		if (last || last===0) {
			this.g.setColor(0,0);
			this.g.fillRect(239-(last*18)-16,186,239-(last*18),189);
			this.g.setColor(1,col( (this.foot=="barS")?"black":(lim)?"yellow":"lblue"));
			this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
		}else {
			this.g.setColor(0,0);
			this.g.fillRect(0,186,239,190);
			this.g.setColor(1,col( (this.foot=="barS")?"black":(lim)?"yellow":"lblue"));
			this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
		}
		this.g.flip();
		if (this.act) return;
		this.g.setColor(0,0);
		this.g.setColor(1,col( ( (lim)?"yellow":"lblue") ));
		this.g.fillRect(239-(tpms.def.ref*18)-16, 196,239-(tpms.def.ref*18), 238-(this.log[tpms.def.ref][tpms.def.metric]*this.scale));
		this.g.flip(); 
		if ((last || last===0) && last!=tpms.def.ref){
			this.g.setColor(1,0);
			this.g.drawRect(239-(last*18)-16,196,239-(last*18),  238-(this.log[last][tpms.def.metric]*this.scale));
			this.g.flip(); 
		}

    },	
	scan: function(){
		this.act=1;
		if (tpms.status=="SUCCESS") {
			this.page=0;
			tpms.def.ref=0;
			this.tpms=Object.keys(tpms.def.list);
			tpms.def.pos=this.tpms.indexOf(tpms.def.id);
			this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
			this.sc();
			let cl=((getTime()|0) - this.log[tpms.def.ref].time < 1800)?1:0;
			this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sel(face[0].log[tpms.def.ref][tpms.def.metric],"JUST NOW");
			this.foot="bar";
			this.ntfy("FOUND : "+tpms.new,"",27,col("raf"),1,2);
			return;
		}else if (tpms.status=="NOT FOUND") {
			this.ntfy(tpms.status,"",27,col("red"),1,2);
			return;
		}
		this.btn(1,tpms.status+" "+(tpms.def.wait-( (getTime()|0)-tpms.cnt) ),27,120,205,col("olive"),0,0,190,239,239,"",22,120,225);
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
		this.g.drawString(txt1[0],((this.info)?100:80)-(size/2),65);
		this.g.setFont("Vector",42);
		this.g.drawString("."+((this.info)?txt1[1].slice(0,1):txt1[1]),((this.info)?100:80)+(size/2),72);
		size=(size/2)+this.g.stringWidth((this.info)?txt1[1].slice(0,1):txt1[1]);
		this.g.setFont("Vector",20);	
		this.g.drawString((this.info)?"°C":tpms.def.metric.toUpperCase(),((this.info)?117:97)+size,89);
		this.g.flip();
		this.g.setColor(0,col("dgray"));
		if (txt3){
			this.g.fillRect(0,121,239,185);
			this.g.setColor(1,col("lblue"));
			this.g.setFont("Vector",42);
			let size=this.g.stringWidth(txt2);
			this.g.drawString(txt2,((this.info)?120:110)-(size/2),135);	
			this.g.setFont("Vector",20);
			this.g.drawString(txt3,((this.info)?122:112)+(size/2),152);
		}else{
			this.g.fillRect(0,121,239,185);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",30);
			this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),145);
		}
		this.g.flip();
    },
	sett:function(){
		let tpmsS=["OFF","5 MIN","30 MIN","1 HOUR","6 HOURS"];
		this.barS();
		this.btn(tpms.def.allowNew,(tpms.def.allowNew)?"ALLOW":"BLOCK",25,80,20,col("raf"),col("red"),0,0,155,60);//1-2
		this.g.setColor(0,0);
		this.g.clearRect(156,0,159,60);
		this.g.flip(); 
		this.btn(1,(tpms.def.metric=="psi")?tpms.def.list[this.tpms[tpms.def.pos]].hiP: (tpms.def.list[this.tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
		this.g.setColor(0,0);
		this.g.clearRect(0,61,239,64);
		this.g.flip();
		this.btn(tpms.def.int,"SCAN",28,80,84,col("raf"),col("dgray"),0,65,155,125); //4-5
		this.g.setColor(0,0);
		this.g.clearRect(156,65,159,125);
		this.g.flip();
		this.btn(1,(tpms.def.metric=="psi")?tpms.def.list[this.tpms[tpms.def.pos]].lowP:(tpms.def.list[this.tpms[tpms.def.pos]].lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
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
		if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY")) return;
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
		if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) return;
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
		let cl=((getTime()|0) - this.log[tpms.def.ref].time < 1800)?1:0;
		this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
		this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
		this.info=1;
		w.gfx.setColor(0,0);
		w.gfx.fillRect(100,51,190,239); 
		w.gfx.setColor(1,col("white"));
		w.gfx.setFontVector(28);
		w.gfx.drawString(this.log[tpms.def.ref].bar,185-w.gfx.stringWidth(this.log[tpms.def.ref].bar),62);
		w.gfx.drawString(Number(this.log[tpms.def.ref].psi).toFixed(1),185-w.gfx.stringWidth(Number(this.log[tpms.def.ref].psi).toFixed(1)),100);
		w.gfx.drawString(this.log[tpms.def.ref].temp,185-w.gfx.stringWidth(this.log[tpms.def.ref].temp),139); 
		w.gfx.drawString(this.log[tpms.def.ref].batt,185-w.gfx.stringWidth(this.log[tpms.def.ref].batt),178); 
		w.gfx.drawString(this.log[tpms.def.ref].volt,185-w.gfx.stringWidth(this.log[tpms.def.ref].volt),217); 
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
			require("Storage").writeJSON("tpms.json",got);
		}
		if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
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
			buzzer([30,50,30]);
			tpms.new=0;
			tpms.scan();
			face[0].scan();
			return;
		}else if (190<y&& x< 80&&face[0].foot=="bar") {
			if  (tpms.status!="SCANNING"&&!tpms.status.startsWith("RETRY")  ) { 
				tpms.new=0;
				tpms.scan();
				face[0].scan();
				buzzer([30,50,30]);
			}else buzzer(40);
			return;
		}else if ( face[0].foot=="barS"&&125<y&&face[0].act) {
			if (face[0].act=="conf"){
				buzzer([100,50,100]);
				delete tpms.def.list[face[0].tpms[tpms.def.pos]];
				require("Storage").erase("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1);
				face[0].ntfy(face[0].tpms[tpms.def.pos]+" CLEARED","",25,col("red"),1,2,0,1,0);
				tpms.def.pos=0;
				face[0].init();
			}else if (face[0].act=="del"){
				buzzer([30,50,30]);
				face[0].ntfy("TAP TO","DELETE",26,col("red"),1,2,0,1,1);
				face[0].act="conf";
			}else if (face[0].act=="hi"){	
				buzzer([30,50,30]);
				let fast=( getTime()-this.lL < 0.2 )?1:0;
				if  ( x < 120 ) {tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-((fast)?5:1);if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP){tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP+5;if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP<20)tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=20;}}
				else {tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP+((fast)?5:1); if ( 250 < tpms.def.list[face[0].tpms[tpms.def.pos]].hiP ) tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=250;}
				face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].hiP: (tpms.def.list[face[0].tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
				face[0].ntfy("","",27,0,1,2,0,0);
				this.lL=getTime();
			}else if (face[0].act=="low"){		
				buzzer([30,50,30]);
				let fast=( getTime()-this.lL < 0.2 )?1:0;
				if  ( x < 120 ) {tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP-((fast)?5:1); if (  tpms.def.list[face[0].tpms[tpms.def.pos]].lowP <1 ) tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=1;}
				else { tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP+((fast)?5:1);if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP){tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5;if ( 150 < tpms.def.list[face[0].tpms[tpms.def.pos]].lowP ) tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=150;}}
				face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].lowP:(tpms.def.list[face[0].tpms[tpms.def.pos]].lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
				face[0].ntfy("","",27,0,1,2,0,0);
				this.lL=getTime();
			}else if (face[0].act=="allow"){	
				buzzer(40);
			}else if (face[0].act=="int"){	
				buzzer([30,50,30]);
				tpms.def.int++; if (4 < tpms.def.int) tpms.def.int=0;
				let tpmsS=["ONCE","5 MIN","30 MIN","1 HOUR","6 HOURS"];
				face[0].ntfy((tpms.def.int)?"EVERY":"MANUAL",(tpms.def.int)?tpmsS[tpms.def.int]:"SCAN",27,col((tpms.def.int)?"raf":"dgray"),1,3,1,1,1);
				face[0].btn(tpms.def.int,"SCAN",28,80,84,col("raf"),col("dgray"),0,65,155,125); //4-5
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
				tpms.def.allowNew=1-tpms.def.allowNew;
				face[0].btn(tpms.def.allowNew,(tpms.def.allowNew)?"ALLOW":"BLOCK",25,80,20,col("raf"),col("red"),0,0,155,60);//1-2
				face[0].ntfy("NEW SENSOR","DISCOVERY",26,col((tpms.def.allowNew)?"raf":"red"),1,1,0,1,1);
				face[0].act="allow";
			}else if (155 <= x && y < 62) { //3
				buzzer([30,50,30]);	
				if ( face[0].act == "hi" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
				else {face[0].ntfy("UPPER","(in "+tpms.def.metric.toUpperCase()+")",30,col("olive"),1,4,1,1,1);face[0].act="hi";}
			}else if (0 <= x && x < 155 && 62 < y && y < 127) { //4-5
				buzzer([30,50,30]);
				if ( face[0].act == "int" ) {
					if (face[0].ntid) {clearTimeout(face[0].ntid);face[0].ntid=0;}
					face[0].barS();
					face[0].act=0;
				}else {
					let tpmsS=["ONCE","5 MIN","30 MIN","1 HOUR","6 HOURS"];
				face[0].ntfy((tpms.def.int)?"EVERY":"MANUAL",(tpms.def.int)?tpmsS[tpms.def.int]:"SCAN",27,col((tpms.def.int)?"raf":"dgray"),1,3,1,1,1);
					face[0].act="int";
				}
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
				face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].hiP: (tpms.def.list[face[0].tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,col("dgray"),0,160,0,239,60); //3
				face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].lowP:(tpms.def.list[face[0].tpms[tpms.def.pos]].lowP/((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,col("dgray"),0,160,65,239,125); //6
			} else { 
				if ( x < 80 ){
					face[0].init();
				}else if ( 160 < x ){
					buzzer([30,50,30]);
					face[0].ntfy("DELETE",face[0].tpms[tpms.def.pos].toUpperCase(),25,col("dgray"),1,2,0,1,1);
					face[0].act="del";
				}else {
					buzzer(40);
				}
			}
		}else if (50 < y) { 
			//entry select
			if (!face[0].tpms.length ) {buzzer(40);return;}
			let last=tpms.def.ref;
			buzzer([30,50,30]);
			tpms.def.ref=(120<x)?(0<tpms.def.ref)?tpms.def.ref-1:face[0].log.length-1:(tpms.def.ref<face[0].log.length-1)?tpms.def.ref+1:0;
			if (face[0].info){
				face[0].sel(face[0].log[tpms.def.ref].temp,face[0].log[tpms.def.ref].batt,"%");
			}else {	
				let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
				let ago=0;
				if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
				face[0].sel((face[0].log.length)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
			}
			face[0].ind(last);
			return;
		}else {
			if  ( 150 < x ) { //settings
				if (face[0].page!="sett" && face[0].tpms.length&&tpms.status!="SCANNING"&&!tpms.status.startsWith("RETRY")){
					buzzer([30,50,30]);
					if (face[0].ntid) {clearTimeout(face[0].ntid);face[0].ntid=0;}
					face[0].sett();
					face[0].page="sett";
					face[0].act=0;	
				}else buzzer(40);
			}else{ //sensor
				if (face[0].tpms.length<=1) {buzzer(40);return;}
				buzzer([30,50,30]);
				if (tpms.def.pos+1 < face[0].tpms.length) tpms.def.pos++;
				else tpms.def.pos=0;
				tpms.def.ref=0;
				face[0].log=face[0].log=require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1);
				face[0].sc();	
				let cl=((getTime()|0) - face[0].log[tpms.def.ref].time < 1800)?1:0;
				face[0].btn(cl,face[0].tpms[tpms.def.pos],35,75,7,(face[0].log[tpms.def.ref].psi<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP||tpms.def.list[face[0].tpms[tpms.def.pos]].hiP<face[0].log[tpms.def.ref].psi)?col("red"):col("raf"),col("dgray"),0,0,149,50);
				face[0].btn(1,tpms.def.pos+1+"/"+face[0].tpms.length,35,200,7,0,col("raf"),150,0,239,50);
				//face[0].sc();	
				face[0].info=0;
				let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
				let ago=0;
				if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}
				else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
				face[0].sel((face[0].log.length)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
				face[0].bar();
			}			
		}
		break;
    case 1: //slide down event
			let got=require("Storage").readJSON("tpms.json",1);
			got.def=tpms.def;
			require("Storage").writeJSON("tpms.json",got);
		if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
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
			let got=require("Storage").readJSON("tpms.json",1);
			got.def=tpms.def;
			require("Storage").writeJSON("tpms.json",got);
		if (tpms.def.int ) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		face.go("settings",0);return;
		}
		break;
    case 3: //slide left event
		if (face[0].page!="sett") {
			buzzer([30,50,30]);
			if (face[0].info) {
				face[0].info=0;
				let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
				let ago=0;
				if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
				face[0].sel((face[0].log.length)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
				return;
			}else { 
				face[0].info=1;
				face[0].sel(face[0].log[tpms.def.ref].temp,face[0].log[tpms.def.ref].batt,"%");
			}
		}else
			buzzer(40);
		return;
    case 4: //slide right event (back action)
		if (face[0].page!="sett") {
			face[0].page=0;
			let got=require("Storage").readJSON("tpms.json",1);
			got.def=tpms.def;
			require("Storage").writeJSON("tpms.json",got);
		} 
		if (face[0].page && face[0].page!="scan") {
			if (face[0].ntid) {clearTimeout(face[0].ntid);face[0].ntid=0;}
			if (face[0].act&&tpms.status!="SCANNING"&&!tpms.status.startsWith("RETRY")) face[0].barS();
			else face[0].init();
			face[0].act=0;
			return;
		}
		if (tpms.def.int) tpms.scan();else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
		face.go("settings",0,1);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		return;
    }
};