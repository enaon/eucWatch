//tpms 
if (!global.tpms) eval(require('Storage').read('tpms'));
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	g:w.gfx,
	spd:[],
	init: function(){
		//if (tpms.status!="NOT FOUND") tpms.status="IDLE";
		this.disp=0;
		this.pos=(set.def.tpms)?set.def.tpms:0;
		this.try=tpms.try;
		this.tpms=set.read("tpms","slot");
		this.dev=set.read("tpms",this.tpms[this.pos]);
		if (this.tpms.length) {
			let tm=(getTime()|0) - this.dev.time;
			let cl=(tm < 300)?1:0;
			this.btn(cl,this.tpms[this.pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,this.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sel(this.dev.psi,"<  "+(tm < 3600)?new Date(tm * 1000).toISOString().substr(11, 8):new Date(tm * 1000).toString().substr(0,24)+"  >");
			if (tpms.status=="SCANNING") this.scan();
			else this.bar();
			this.page=0;
		}else {
			this.g.clearRect(0,0,239,239);
			this.page="scan";
			this.btn(1,"TOUCH TO SCAN",22,120,7,col("raf"),col("dgray"),0,0,239,50);
			this.run=1;
		}	
	},
	show : function(o){
		if (!this.run) return;
			this.btn(0,tpms.status,30,120,100,col("raf"),col("dgray"),0,55,239,200,"TRY :"+tpms.try,22,120,150);
  		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},150,this);
	},
	get: function(){
		this.tpms=[];
		for (let i in tpms.dev ){
			this.tpms.unshift(i);
		}
	},
	bar: function(){
		this.foot="bar";
		this.g.setColor(0,0);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("lblue"));
		var img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
		this.g.drawImage(img,10,190);
		img=0;
		this.g.flip();
		//this.btn(1,"TOUCH TO SCAN",22,120,7,col("raf"),col("dgray"),0,0,239,50);
	},
	scan: function(){
		this.foot=0;
		if (tpms.status=="SUCCESS") {
			this.dev=set.read("tpms",this.tpms[this.pos]);
			let tm=(getTime()|0) - this.dev.time;
			let cl=(tm < 300)?1:0;
			this.btn(cl,this.tpms[this.pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,this.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sel(this.dev.psi,"<  "+(tm < 3600)?new Date(tm * 1000).toISOString().substr(11, 8):new Date(tm * 1000).toString().substr(0,24)+"  >");
			this.ntfy("FOUND : "+tpms.new,"",27,col("raf"),1,2);	
			return;
		}else if (tpms.status=="NOT FOUND") {
			this.ntfy(tpms.status,"",27,col("red"),1,2);	
			return;
		}
		this.btn(1,tpms.status,27,120,205,col("olive"),0,0,186,239,239,"",22,120,225);
  		//refresh 
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.scan();
		},500,this);
    },
	sc:function(){
	 		this.totD=0;
			this.scale=0;
			for (let i = 0; i < this.len; i++) {
				if (this.log[i]) {
					this.totD=this.totD+this.log[i];
					if (this.scale<this.log[i] ) this.scale=this.log[i];
				}
			}
			this.scale=60/this.scale;		
			return this.scale;
	},
	lg: function(){
		this.g.setColor(0,0);
		this.g.fillRect(0,176,239,239);
		this.g.setColor(1,col("lblue"));
		this.g.flip(); 
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
	sel: function(txt1,txt2){
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(0,51,239,185);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",53);	
		let size=this.g.stringWidth(txt1);
		this.g.drawString(txt1,105-(this.g.stringWidth(txt1)/2),68); 
		this.g.setFont("Vector",27);	
		this.g.drawString(" PSI",125+(size/2)-(this.g.stringWidth(" PSI")/2),86);
		this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),137);
		this.g.flip();
    },
	ind: function(pos){
		pos=(((pos-1)*(240/this.len))+1);
		this.g.setColor(0,0);
		this.g.setColor(1,col("yellow"));
		this.g.fillRect(pos,(this.log[this.pos])?239-(this.log[this.pos]*this.scale):239,pos+((240/this.len)-2),239);
		this.g.flip(); 
		if (this.rowL&&this.rowL!==pos){
			this.g.setColor(1,col("lblue"));
			this.g.fillRect(this.rowL,(this.log[this.posL])?239-(this.log[this.posL]*this.scale):239,this.rowL+((240/this.len)-2),239);
			this.g.flip(); 
		}
		this.rowL=pos;
		this.posL=this.pos;
		pos=pos-1;
		this.g.setColor(0,0);
		this.g.fillRect(0,176,239,178);
		this.g.setColor(1,col("yellow"));
		this.g.fillRect(pos,176,pos+(240/this.len),178);
		this.g.flip();
    },
	ntfy: function(txt1,txt0,size,clr,bt,tm){
		this.g.setColor(0,clr);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",size);
		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),205); 
		this.g.flip();
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.bar();
		},tm*1000,this);
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
		face.go("main",0);
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
	switch (e) {
	case 5: //tap event
		if (face[0].page=="scan"){
			tpms.scan(face[0].try);
			buzzer([30,50,30]);
		}else if (190 < y) {
			if (face[0].foot=="bar") {
				if  ( x < 80 ) { 
					tpms.scan(face[0].try);
					face[0].scan();
					buzzer([30,50,30]);
			
				}
				
				buzzer(40);return;
				}
			let i=0;
			buzzer([30,50,30]);
		}else if (50 < y) {
			if (face[0].info) {buzzer(40);return;}
			let i=0;
			buzzer([30,50,30]);
		}else {
			buzzer([30,50,30]);
			if  ( 150 < x ) { //info
				if (face[0].info) {
					if (face[0].pos+1 < face[0].tpms.length) face[0].pos++;
					else face[0].pos=0;
					set.def.tpms=face[0].pos;
				} 
				face[0].dev=set.read("tpms",face[0].tpms[face[0].pos]);
				face[0].info=1;
				let cl=((getTime()|0) - face[0].dev.time < 300)?1:0;
				face[0].btn(cl,face[0].tpms[face[0].pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
				face[0].btn(1,face[0].pos+1+"/"+face[0].tpms.length,35,200,7,0,col("raf"),150,0,239,50);
				face[0].info=1;
				w.gfx.setColor(0,0);
				w.gfx.fillRect(100,51,190,239); 
				w.gfx.setColor(1,col("white"));
				w.gfx.setFontVector(28);
				w.gfx.drawString(face[0].dev.bar,185-w.gfx.stringWidth(face[0].dev.bar),62);
				w.gfx.drawString(face[0].dev.psi,185-w.gfx.stringWidth(face[0].dev.psi),100);
				w.gfx.drawString(face[0].dev.temp,185-w.gfx.stringWidth(face[0].dev.temp),139); 
				w.gfx.drawString(face[0].dev.batt,185-w.gfx.stringWidth(face[0].dev.batt),178); 
				w.gfx.drawString(face[0].dev.volt,185-w.gfx.stringWidth(face[0].dev.volt),217); 
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
			}else{ //sensor
				if (face[0].info) {
					face[0].info=0;
				} else {
					if (face[0].pos+1 < face[0].tpms.length) face[0].pos++;
					else face[0].pos=0;
					set.def.tpms=face[0].pos;
				}
				face[0].dev=set.read("tpms",face[0].tpms[face[0].pos]);
				let cl=((getTime()|0) - face[0].dev.time < 300)?1:0;
				face[0].btn(cl,face[0].tpms[face[0].pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
				face[0].btn(1,face[0].pos+1+"/"+face[0].tpms.length,35,200,7,0,col("raf"),150,0,239,50);
				let tm=(getTime()|0) - face[0].dev.time;
				face[0].sel(face[0].dev.psi,"<  "+(tm < 3600)?new Date(tm * 1000).toISOString().substr(11, 8):new Date(tm * 1000).toString().substr(0,24)+"  >");
				face[0].bar();
			}			
		}
		break;
    case 1: //slide down event
		face.go("main",0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
		break;
    case 3: //slide left event
		face.go("dashGarage",0);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		return;
    }
};