//tpms face
if (!global.tpms) eval(require('Storage').read('tpms'));
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:30000,
	g:w.gfx,
	spd:[],
	init: function(){
		//if (tpms.status!="NOT FOUND") tpms.status="IDLE";
		this.disp=0;
		this.pos=(set.def.tpms)?set.def.tpms:0;
		this.try=tpms.try;
		this.tpms=set.read("tpms","slot");
		if (this.tpms.length) {
			this.dev=set.read("tpms","dev")[this.tpms[this.pos]];
			let tm=(getTime()|0) - this.dev.time;
			let cl=(tm < 300)?1:0;
			this.btn(cl,this.tpms[this.pos],35,75,7,col("raf"),col("dgray"),0,0,149,50);
			this.btn(1,this.pos+1+"/"+this.tpms.length,35,200,7,0,col("raf"),150,0,239,50);
			this.sel(this.dev.psi,"<  "+(tm < 3600)?new Date(tm * 1000).toISOString().substr(11, 8):new Date(tm * 1000).toString().substr(0,24)+"  >");
			if (tpms.status=="SCANNING") this.scan();
			else this.bar();
			this.page=0;
		}else {
			this.pos=0;
			this.g.setColor(0,0);
			this.g.clearRect(0,0,239,239);
			this.page="scan";
			this.btn(1,"TPMS SENSOR",25,100,7,0,0,0,0,239,50);
			this.btn(1,"TOUCH",30,120,80,col("dgray"),col("dgray"),0,50,239,185,"TO SCAN",30,120,130);
			if (tpms.status=="SCANNING") this.scan();
		}	
	},
	show : function(o){
		if (!this.run) return;
			this.btn(1,tpms.status,27,120,205,col("olive"),0,0,186,239,239,"",22,120,225);
			//this.btn(0,tpms.status,30,120,100,col("raf"),col("dgray"),0,55,239,200,"TRY :"+tpms.try,22,120,150);
  		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},500,this);
	},
	bar: function(){
		this.foot="bar";
		this.g.setColor(0,0);
		this.g.fillRect(0,186,239,239);
		this.g.setColor(1,col("lblue"));
		var img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
		this.g.drawImage(img,10,195);
		img = require("heatshrink").decompress(atob("mEwwI2zgP/Ao0f////P/nE/AoP9/88ApU4EZYADAooAICg2AApE8/+/G4P4Aon8AoscCIgjLACkf8AFE+CJDz/3/B9CAoP8ApRBBDogFJF4gAsA="));
		this.g.drawImage(img,95,195);
		img=require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA=="));
		this.g.drawImage(img,180,195);
		img=0;
		this.g.flip();
	},
	scan: function(){
		this.foot=0;
		if (tpms.status=="SUCCESS") {
			this.page=0;
			this.tpms=set.read("tpms","slot");
			this.dev=set.read("tpms","dev")[this.tpms[this.pos]];
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
		this.btn(1,tpms.status,27,120,205,col("olive"),0,0,190,239,239,"",22,120,225);
  		//refresh 
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.scan();
		},500,this);
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
		this.g.setFont("Vector",50);	
		let size=this.g.stringWidth(txt1);
		this.g.drawString(txt1,100-(this.g.stringWidth(txt1)/2),65); 
		this.g.setFont("Vector",27);	
		this.g.drawString(" PSI",120+(size/2)-(this.g.stringWidth(" PSI")/2),85);
		//this.g.setFont("Vector",23);	
		//this.g.drawString(this.dev.batt+"%",60-(this.g.stringWidth(this.dev.batt+"%")/2),115);
		//this.g.drawString(this.dev.temp+"C",170-(this.g.stringWidth(this.dev.temp+"C")/2),115);
		this.g.setFont("Vector",25);
		let tim=new Date(this.dev.time*1000).toString().split(" ")[1]+" "+new Date(this.dev.time*1000).toString().split(" ")[2]+" "+new Date(this.dev.time*1000).toString().split(" ")[4];
		this.g.drawString(tim,120-(this.g.stringWidth(tim)/2),145);
		this.g.flip();
		this.g.setColor(0,0);
		this.g.clearRect(0,186,239,189);
		this.g.flip();
    },
	sett:function(){
		this.g.setColor(0,0);
		this.g.clearRect(0,0,239,79);
		//this.g.clearRect(76,0,79,75);
		//this.g.clearRect(156,0,159,75);
		this.g.flip(); 
		this.btn(set.read("tpms","dev")[face[0].tpms[face[0].pos]].log,"LOG",22,40,25,col("raf"),col("dgray"),0,0,75,75,"",18,40,50);//1
		this.btn(1,"SLOT",22,120,10,col("raf"),0,80,0,155,75,"1",30,120,40);//2
		this.btn(1,"MODE",22,205,10,col("dgray"),0,160,0,239,75,"OFF",22,205,45); //3
		this.g.setColor(0,0);
		this.g.clearRect(0,80,239,190);
		//this.g.clearRect(0,76,239,79);
		//this.g.clearRect(76,80,79,155);
		//this.g.clearRect(156,80,159,155);
		//this.g.clearRect(0,156,239,190);
		this.g.flip(); 		
		this.btn(1,"HI",20,40,90,col("dgray"),0,0,80,75,155,"40",30,40,120); //4
		this.btn(1,"LOW",20,120,90,col("dgray"),0,80,80,155,155,"10",30,120,120); //5
		this.btn(1,"DEL",22,205,110,col("red"),0,160,80,239,155,"",30,205,120); //6
        //this.run=true;
	},	
	ntfy: function(txt1,txt0,size,clr,bt,tm){
		this.g.setColor(0,clr);
		this.g.fillRect(0,190,239,239);
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
			tpms.new=0;
			tpms.scan(face[0].try);
			//face[0].run=1;
			face[0].scan();
			buzzer([30,50,30]);
    }else if (face[0].page=="sett"){
			if (x<75 && y<75) { //1
				buzzer([30,50,30]);
				if (set.read("tpms","dev")[face[0].tpms[face[0].pos]].log) {
					set.write("tpms","dev",face[0].tpms[face[0].pos],"log",0);
					face[0].btn(1,"LOG",22,40,25,col("dgray"),0,0,0,75,75,"",18,40,50);//1
				}else {
					set.write("tpms","dev",face[0].tpms[face[0].pos],"log",1);
					face[0].btn(1,"LOG",22,40,25,col("raf"),0,0,0,75,75,"",18,40,50);//1
				}
			}else if (75<= x && x < 155 && y < 75) { //2
				buzzer([30,50,30]);
				let setS=set.read("tpms","dev")[face[0].tpms[face[0].pos]].slot;
				
				
				if (set.read("tpms","dev")[face[0].tpms[face[0].pos]].slot) {
					set.write("tpms","dev",face[0].tpms[face[0].pos],"log",0);
					face[0].btn(1,"LOG",22,40,25,col("dgray"),0,0,0,75,75,"",18,40,50);//1
				}else {
					set.write("tpms","dev",face[0].tpms[face[0].pos],"log",1);
					face[0].btn(1,"LOG",22,40,25,col("raf"),0,0,0,75,75,"",18,40,50);//1
				}
			}else if (155 <= x && y < 75) { //3
				buzzer([30,50,30]);				
			
			}else if (x<75 && 75 <y && y < 155) { //4
				buzzer([30,50,30]);

			}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
				buzzer([30,50,30]);

			}else if (155 <= x && 75 <y && y < 155) { //6
				buzzer([30,50,30]);

			}else {
				buzzer(40);		
				face[0].page=0;
				face[0].init();
			}
		}else if (190 < y) {
			if (face[0].foot=="bar") {
				if  ( x < 80 ) { 
					tpms.new=0;
					tpms.scan(face[0].try);
					face[0].scan();
					buzzer([30,50,30]);
				}else if  (80 < x && x < 160 ) { 
					buzzer([30,50,30]);	
					face[0].sett();
					face[0].page="sett";
				}else buzzer(40);
			}else buzzer(40);
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
				face[0].dev=set.read("tpms","dev")[face[0].tpms[face[0].pos]];
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
				face[0].dev=set.read("tpms","dev")[face[0].tpms[face[0].pos]];
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
		if (face.faceSave!=-1) {
			  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else
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
		buzzer(40);
		//face.go("dashGarage",0);
		return;
    case 4: //slide right event (back action)
		if (face[0].page && face[0].page!="scan") {
			//face[0].page=0;
			face[0].init();
			return;
		}
		face.go("settings",0,1);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		return;
    }
};