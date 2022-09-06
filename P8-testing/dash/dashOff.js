E.setFlags({pretokenise:1});
//dash off 
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	g:w.gfx,
	spd:[],
	init: function(){
		this.log=require("Storage").readJSON("logDaySlot"+ew.def.dash.slot+".json",1);
		if (!euc.dash.info.get.makr||!ew.def.dash.slot||!this.log) {face.go((face.appPrev=="dashGarage")?"clock":"dashGarage",0);return;}
		this.rowL=0;
		this.posL=0;
		this.ref=Date().getHours();
		this.len=24;
		this.pos=this.ref;
		this.disp=0;
		//this.g.setColor(0,0);
		//this.g.flip();
		this.btn(1,"24HRS",30,60,14,4,4,0,0,119,50);
		this.btn(1,"INFO",30,185,10,0,4,120,0,239,50);
		this.sc();
		this.sel(this.comf((this.totD*((ew.def.dash.mph)?0.625:1)).toFixed((this.page)?(this.page==1)?1:0:2)),"<   TOTAL   >");
		this.lg();
		this.id=(ew.def.hr24)?["00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00","06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"]
		:["12:00 - 1:00 AM","1:00 - 2:00 AM","2:00 - 3:00 AM","3:00 - 4:00 AM","4:00 - 5:00 AM","5:00 - 6:00 AM","6:00 - 7:00 AM","7:00 - 8:00 AM","8:00 - 9:00 AM","9:00 - 10:00 AM","10:00 - 11:00 AM","11:00 - 11:59 AM","12:00 - 1:00 PM","1:00 - 2:00 PM","2:00 - 3:00 PM","3:00 - 4:00 PM","4:00 - 5:00 PM","5:00 - 6:00 PM","6:00 - 7:00 PM","7:00 - 8:00 PM","8:00 - 9:00 PM","9:00 - 10:00 PM","10:00 - 11:00 PM","11:00 - 11:59 PM"];
		this.id[this.ref]="Now";
	},
	show : function(o){
		if (!this.run) return;
  		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},150,this);
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
		this.g.setColor(1,11);
		for (let i = 0; i < this.len; i++) {
   		let h=(this.ref-i<0)?this.len+(this.ref-i):this.ref-i;
			if (this.log[h]) {
				this.g.fillRect(239-(i*(240/this.len)),(this.log[h])?239-(this.log[h]*this.scale):239, 239-((i*(240/this.len))+((240/this.len)-2)),239);		
				this.g.flip(); 
			}
		}
		this.g.flip(); 
    },
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
		this.g.setColor(0,(bt)?clr1:clr0);
		this.g.fillRect(rx1,ry1,rx2,ry2);
		this.g.setColor(1,15);
		this.g.setFont("Vector",size1);	
		this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
		if (txt2){this.g.setFont("Vector",size2);	
		this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
		this.g.flip();
    },
	sel: function(txt1,txt2){
		this.g.setColor(0,1);
		this.g.fillRect(0,51,239,175);
		this.g.setColor(1,15);
		this.g.setFont("Vector",53);	
		let size=this.g.stringWidth(txt1);
		this.g.drawString(txt1,105-(this.g.stringWidth(txt1)/2),68); 
		this.g.setFont("Vector",27);	
		this.g.drawString((ew.def.dash.mph)?" mi":" km",125+(size/2)-(this.g.stringWidth((ew.def.dash.mph)?" mi":" km")/2),86);
		this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),137);
		this.g.flip();
    },
	ind: function(pos){
		pos=(((pos-1)*(240/this.len))+1);
		//print(pos,this.pos,this.len,this.ref);
		this.g.setColor(0,0);
		this.g.setColor(1,14);
		this.g.fillRect(pos,(this.log[this.pos])?239-(this.log[this.pos]*this.scale):239,pos+((240/this.len)-2),239);
		this.g.flip(); 
		if (this.rowL&&this.rowL!==pos){
			this.g.setColor(1,11);
			this.g.fillRect(this.rowL,(this.log[this.posL])?239-(this.log[this.posL]*this.scale):239,this.rowL+((240/this.len)-2),239);
			this.g.flip(); 
		}
		this.rowL=pos;
		this.posL=this.pos;
		pos=pos-1;
		this.g.setColor(0,0);
		this.g.fillRect(0,176,239,178);
		this.g.setColor(1,14);
		this.g.fillRect(pos,176,pos+(240/this.len),178);
		this.g.flip();
    },
	ntfy: function(txt1,txt0,size,clr,bt){
		this.g.setColor(0,clr);
		this.g.fillRect(0,180,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",size);
		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
		this.g.flip();
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.g.setColor(0,0);
			t.g.fillRect(0,196,239,239);
			t.g.setColor(1,15);
			t.g.setFont("Vector",20);
			t.g.drawString(euc.dash.info.get.makr,120-(t.g.stringWidth(euc.dash.info.get.makr)/2),217); 
			t.g.flip();
		},1000,this);
    },
	comf: function(num){
      var parts = (''+(num<0?-num:num)).split("."), s=parts[0], L, i=L= s.length, o='';
      while(i--){ o = (i===0?'':((L-i)%3?'':',')) 
        +s.charAt(i) +o; }
        return (num<0?'-':'') + o + (parts[1] ? (o.length>5?'.' + parts[1].toString().substr(0,3): '.' + parts[1]) : ''); 
	},
	tid:-1,
	run:false,
	clear : function(){
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
	return;
	},
	show : function(){
		face.go("clock",0);
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
	switch (e) {
	case 5: //tap event
		if (50 < y) {
		if (face[0].info) {buzzer.nav(40);return;}
			let i=0;
			buzzer.nav([30,50,30]);
			if (face[0].log[face[0].ref]&&!face[0].once){
				face[0].once=1;
				face[0].pos=face[0].ref;
			}else if  ( 120 < x ) {
				face[0].pos++;
				while (!face[0].log[face[0].pos]) {
 					face[0].pos++;
					i++;
					if (face[0].len<i) return;
					if (face[0].len<face[0].pos) face[0].pos=0;
				}
			}else if ( x < 120 ){
 				face[0].pos--;
				while (!face[0].log[face[0].pos]) {
 					face[0].pos--;
					if (face[0].pos< 0) face[0].pos=face[0].len-1;
					i++;
					if (face[0].len<i) return;
				}
			}
			face[0].sel(face[0].comf((face[0].log[face[0].pos]*((ew.def.dash.mph)?0.625:1)).toFixed((face[0].page)?(face[0].page==1)?1:0:2)), face[0].id[face[0].pos].toUpperCase());
			face[0].ind((face[0].pos<=face[0].ref)?face[0].len-(face[0].ref-face[0].pos):face[0].pos-face[0].ref);
		}else {
			buzzer.nav([30,50,30]);
			if  ( 120 < x ) { //info
				let btC=[4,1,13,14];
				if (face[0].info) {face[0].btn(1,euc.dash.live.volt,35,180,3,btC[euc.dash.alrt.bat.cc],0,120,0,239,50,"VOLT",10,220,40);return;}
				face[0].info=1;
				face[0].btn(1,euc.dash.live.bat,50,180,3,btC[euc.dash.alrt.bat.cc],0,120,0,239,50,"%",20,235,8);
				face[0].btn(1,"24HRS",30,60,13,0,0,0,0,119,50);
				face[0].page=2;	
				w.gfx.setColor(0,0);
				w.gfx.fillRect(0,51,239,239); 
				w.gfx.setColor(1,15);
				w.gfx.setFontVector(30);
				w.gfx.drawString(((euc.dash.info.get.name)?euc.dash.info.get.name:euc.dash.info.get.makr),120-w.gfx.stringWidth(((euc.dash.info.get.name)?euc.dash.info.get.name:euc.dash.info.get.makr))/2,62);
				w.gfx.setFontVector(28);
				w.gfx.drawString(euc.dash.trip.topS*((ew.def.dash.mph)?0.625:1)*euc.dash.opt.unit.fact.spd,185-w.gfx.stringWidth(euc.dash.trip.topS*((ew.def.dash.mph)?0.625:1)*euc.dash.opt.unit.fact.spd),99);
				w.gfx.drawString(euc.dash.trip.time,185-w.gfx.stringWidth(euc.dash.trip.time),139); 
				w.gfx.drawString(face[0].comf((euc.dash.trip.last*((ew.def.dash.mph)?0.625:1)).toFixed(0)),185-w.gfx.stringWidth(face[0].comf((euc.dash.trip.last*((ew.def.dash.mph)?0.625:1)).toFixed(0))),178); 
				w.gfx.drawString(face[0].comf((euc.dash.trip.totl*((ew.def.dash.mph)?0.625:1)).toFixed(1)),185-w.gfx.stringWidth(face[0].comf((euc.dash.trip.totl*((ew.def.dash.mph)?0.625:1)).toFixed(1))),217); 
				w.gfx.flip();	
				w.gfx.setColor(1,3);
				w.gfx.setFontVector(24);
				w.gfx.drawString("TOP",5,102);
				w.gfx.drawString("RUN",5,143);
				w.gfx.drawString("TRP",5,181);
				w.gfx.drawString("TOT",5,220);
				w.gfx.flip();
				w.gfx.setColor(1,3);
				w.gfx.drawString((ew.def.dash.mph)?"mph":"kph",195,102);
				w.gfx.drawString("Min",195,143);
				w.gfx.drawString((ew.def.dash.mph)?"mi":"Km",195,181);
				w.gfx.drawString((ew.def.dash.mph)?"mi":"Km",195,220);
				w.gfx.flip();
			}else{ //24HRS/7DAYS/month/year
				face[0].info=0;
				face[0].btn(1,"INFO",30,185,10,0,0,120,0,239,50);
				face[0].once=0;
				face[0].rowL=0;
				if (!face[0].page){
					face[0].page=1;
					face[0].len=7;
					face[0].ref=Date().getDay();
					face[0].pos=face[0].ref;
					face[0].btn(1,"7DAYS",30,60,13,4,4,0,0,119,50);
					face[0].log=require("Storage").readJSON("logWeekSlot"+ew.def.dash.slot+".json",1);
					face[0].id=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
					face[0].id[face[0].ref]="Today";
				}else if (face[0].page==1){
					face[0].page=2;
					face[0].len=12;
					face[0].ref=Date().getMonth();
					face[0].pos=face[0].ref;
					face[0].btn(1,"YEAR",30,60,13,4,4,0,0,119,50);
					face[0].log=require("Storage").readJSON("logYearSlot"+ew.def.dash.slot+".json",1);
					face[0].id=["January","February","March","April","May","June","July","August","September","October","November","December"];
					//face[0].id[face[0].ref]="running Month";
				}else{
					face[0].page=0;
					face[0].len=24;
					face[0].ref=Date().getHours();
					face[0].pos=face[0].ref;
					face[0].btn(1,"24HRS",30,60,13,4,4,0,0,119,50);
					face[0].log=require("Storage").readJSON("logDaySlot"+ew.def.dash.slot+".json",1);
					face[0].id=(ew.def.hr24)?["00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00","06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"]
		:["12:00 - 1:00 AM","1:00 - 2:00 AM","2:00 - 3:00 AM","3:00 - 4:00 AM","4:00 - 5:00 AM","5:00 - 6:00 AM","6:00 - 7:00 AM","7:00 - 8:00 AM","8:00 - 9:00 AM","9:00 - 10:00 AM","10:00 - 11:00 AM","11:00 - 11:59 AM","12:00 - 1:00 PM","1:00 - 2:00 PM","2:00 - 3:00 PM","3:00 - 4:00 PM","4:00 - 5:00 PM","5:00 - 6:00 PM","6:00 - 7:00 PM","7:00 - 8:00 PM","8:00 - 9:00 PM","9:00 - 10:00 PM","10:00 - 11:00 PM","11:00 - 11:59 PM"];
					face[0].id[face[0].ref]="Now";
				}
				face[0].sc();
				face[0].sel(face[0].comf((face[0].totD*((ew.def.dash.mph)?0.625:1)).toFixed((face[0].page)?(face[0].page==1)?1:0:2)),"<   TOTAL   >");
				face[0].lg();
			}			
		}
		this.timeout();
		break;
    case 1: //slide down event
		face.go("clock",0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
			this.timeout();
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
        this.timeout();
		break;
    case 3: //slide left event
		face.go("dashGarage",0);
		return;
    case 4: //slide right event (back action)
		face.go("clock",0);
		return;
    case 12: //touch and hold(long press) event
		buzzer.nav(40);
		this.timeout();
		return;
    }
};