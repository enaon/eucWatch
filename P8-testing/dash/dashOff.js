//dash off 
face[0] = {
	offms: 10000, //5 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		if (!euc.dash.maker||!Boolean(require("Storage").read("logDaySlot"+set.read("dash","slot")+".json"))  ) {face.go((face.appPrev=="dashGarage")?"main":"dashGarage",0);return;}
		this.btn(1,"DAY",25,60,15,1453,1453,0,0,119,50);
		this.btn(1,"INFO",25,180,15,0,1453,120,0,239,50);
		//logDay
		this.log=require("Storage").readJSON("logDaySlot"+set.read("dash","slot")+".json",1);
		this.ref=Date().getHours();
		this.pos=this.ref;
		this.btn(1,"<  Total Today  >",25,120,65,1365,1365,0,50,239,160,"74.54 km",45,120,110);
		this.g.setColor(0,0);
		this.g.fillRect(0,180,239,239);
		this.g.setColor(1,col("lblue"));
		for (let i = 0; i < 24; i++) {
			let h=(this.ref-i<0)?24+(this.ref-i):this.ref-i;
			if (this.log[h]) w.gfx.fillRect(237-(i*10),(this.log[h])?233-this.log[h]:233, 237-((i*10)+8),233);		
			this.g.flip(); 
		}
	},
	show : function(o){
		if (!this.run) return;
  		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},150,this);
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
		this.g.setColor(0,1365);
		this.g.fillRect(0,51,239,175);
		this.g.setColor(1,4095);
		this.g.setFont("Vector",50);	
		this.g.drawString(txt1,120-(this.g.stringWidth(txt1)/2),70); 
 		this.g.setFont("Vector",23);	
		this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),145);
		this.g.flip();
    },
  ind: function(pos){
    pos=((pos-1)*10)-2;
		this.g.setColor(0,0);
		this.g.fillRect(0,175,239,180);
		this.g.setColor(1,4080);
		this.g.fillRect(pos,175,pos+10,180);
		this.g.flip();
    },
	ntfy: function(txt1,txt0,size,clr,bt){
		this.g.setColor(0,clr);
		this.g.fillRect(0,180,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",size);
		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
		this.g.flip();
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.g.setColor(0,0);
			t.g.fillRect(0,196,239,239);
			t.g.setColor(1,col("white"));
			t.g.setFont("Vector",20);
			t.g.drawString(euc.dash.maker,120-(t.g.stringWidth(euc.dash.maker)/2),217); 
			t.g.flip();

		},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//if (face.appCurr!="dash_simple" || face.pageCurr!=0) this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
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
	return true;
	},
	show : function(){
		face.go("main",0);
		return true;
	},
	clear: function(){
		return true;
	},
	off: function(){
		return true;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event
		if (50 < y) {
			let i=0;
			print("ref :",face[0].ref);
			if (face[0].log[face[0].ref]&&!face[0].once){
				print("once");
				face[0].once=1;
				face[0].pos=face[0].ref;
			}else if  ( 120 < x ) {
				face[0].pos++;
				while (!face[0].log[face[0].pos]) {
					print("i",i);
 					face[0].pos++;
					i++;
					if (24<i) return;
					if (24<face[0].pos) face[0].pos=0;
				}
			}else if ( x < 120 ){
 				face[0].pos--;
				while (!face[0].log[face[0].pos]) {
 					face[0].pos--;
					print("i",i);
					if (face[0].pos< 0) face[0].pos=23;
					i++;
					if (24<i) return;
				}
			}
			print("position :",(face[0].pos<=face[0].ref)?24-(face[0].ref-face[0].pos):face[0].pos-face[0].ref);
			face[0].ind((face[0].pos<=face[0].ref)?24-(face[0].ref-face[0].pos):face[0].pos-face[0].ref);
			face[0].sel((face[0].log[face[0].pos]*((set.def.dash.mph)?0.625:1)).toFixed(2)+((set.def.dash.mph)?" mi":" km") , ((face[0].pos<=face[0].ref)?"":"Yday ")+face[0].pos+"-"+(face[0].pos+1)+((face[0].pos>12)?" PM":" AM"));
			digitalPulse(D16,1,[30,50,30]);
		}else 
			digitalPulse(D16,1,40);
		this.timeout();
		break;
    case 1: //slide down event
		face.go("main",0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
			this.timeout();
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
        this.timeout();
		break;
    case 3: //slide left event
		face.go("dashGarage",0);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		digitalPulse(D16,1,40);
		this.timeout();
		return;
    }
};