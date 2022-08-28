//touch
tcBack.replaceWith(()=>{face.go("clock",0);});
tcNext.replaceWith(()=>{face.go("dashGarage",0);});
//dash off 
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:10000,
	g:w.gfx,
	old:ew.def.bpp?0:1,
	spd:[],
	init: function(){
		face.go("dashGarage",0); return;
		this.log=require("Storage").readJSON("logDaySlot"+ew.def.dash.slot+".json",1);
		if (!euc.dash.info.get.makr||!ew.def.dash.slot||!this.log) {face.go((face.appPrev=="dashGarage")?"clock":"dashGarage",0);return;}
		this.rowL=0;
		this.posL=0;
		this.ref=Date().getHours();
		this.len=24;
		this.pos=this.ref;
		this.disp=0;
		UIc.start(1,0);	
		//UI.txt.block("_1x2T",3,"Press & hold the side button to start or end the EUC connection.",15,1);
		UI.ele.ind(1,2,6);
		UI.btn.c2l("main","_main",1,"","24HRS",15,4);
		UI.btn.c2l("main","_main",2,"","INFO",15,0);
		UIc.end();	
		//this.btn(1,"24HRS",30,65,13,4,4,0,0,119,50);
		//this.btn(1,"INFO",30,185,10,0,4,120,0,239,50);
		this.sc();
		this.sel(this.comf((this.totD*((ew.def.dash.mph)?0.625:1)).toFixed((this.page)?(this.page==1)?1:0:2)),"<   TOTAL   >");
		this.lg();
		this.id=(ew.def.hr24)?["00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00","06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"]
		:["12:00 - 1:00 AM","1:00 - 2:00 AM","2:00 - 3:00 AM","3:00 - 4:00 AM","4:00 - 5:00 AM","5:00 - 6:00 AM","6:00 - 7:00 AM","7:00 - 8:00 AM","8:00 - 9:00 AM","9:00 - 10:00 AM","10:00 - 11:00 AM","11:00 - 11:59 AM","12:00 - 1:00 PM","1:00 - 2:00 PM","2:00 - 3:00 PM","3:00 - 4:00 PM","4:00 - 5:00 PM","5:00 - 6:00 PM","6:00 - 7:00 PM","7:00 - 8:00 PM","8:00 - 9:00 PM","9:00 - 10:00 PM","10:00 - 11:00 PM","11:00 - 11:59 PM"];
		this.id[this.ref]="Now";
	},
	show : function(o){
		if (this.old) return;
  		//refresh 
		this.g.flip(); 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},100,this);
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
			this.scale=40/this.scale;		
			return this.scale;
	},
	lg: function(){
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,235);
		this.g.setColor(1,11);
		for (let i = 0; i < this.len; i++) {
   		let h=(this.ref-i<0)?this.len+(this.ref-i):this.ref-i;
			if (this.log[h]) {
				this.g.fillRect(239-(i*(240/this.len)),(this.log[h])?239-(this.log[h]*this.scale):239, 239-((i*(240/this.len))+((240/this.len)-2)),235);		
				if (this.old)this.g.flip(); 
			}
		}
		if (this.old)this.g.flip(); 
    },
	sel: function(txt1,txt2){
		this.g.setColor(0,1);
		this.g.fillRect(0,81,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",53);	
		let size=this.g.stringWidth(txt1);
		this.g.drawString(txt1,105-(this.g.stringWidth(txt1)/2),90); 
		this.g.setFont("Vector",27);	
		this.g.drawString((ew.def.dash.mph)?" mi":" km",125+(size/2)-(this.g.stringWidth((ew.def.dash.mph)?" mi":" km")/2),105);
		this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),165);
		this.g.flip();
    },
	ind: function(pos){
		pos=(((pos-1)*(240/this.len))+1);
		//print(pos,this.pos,this.len,this.ref);
		this.g.setColor(0,0);
		this.g.setColor(1,13);
		this.g.fillRect(pos,(this.log[this.pos])?239-(this.log[this.pos]*this.scale):239,pos+((240/this.len)-2),235);
				if (this.old)this.g.flip(); 
		if (this.rowL&&this.rowL!==pos){
			this.g.setColor(1,11);
			this.g.fillRect(this.rowL,(this.log[this.posL])?239-(this.log[this.posL]*this.scale):239,this.rowL+((240/this.len)-2),235);
				if (this.old)this.g.flip(); 
		}
		this.rowL=pos;
		this.posL=this.pos;
		pos=pos-1;
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,198);
		this.g.setColor(1,13);
		this.g.fillRect(pos,196,pos+(240/this.len),198);
				if (this.old)this.g.flip(); 
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
