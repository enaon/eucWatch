//Dash Garage
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        //if (!face.appPrev.startsWith("dash")) this.g.clear();
		this.dash=require("Storage").readJSON("dash.json",1);
        this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",22);
		this.g.drawString("GARAGE",120-(this.g.stringWidth("GARAGE")/2),217); 
		this.g.flip(); 
		var i;
		for (i = 1; i < 5; i++) {
          //print(i,this.dash["slot"+i+"Mac"],this.dash);
			if (this.dash["slot"+i+"Mac"]){
				if (i==1)      this.btn((this.dash.slot==1)?1:0,this.dash.slot1Maker,24,60,20,col("red1"),  col("dgray"),0,0,119,97,this.dash.slot1Maker,14,60,70);
				else if (i==2) this.btn((this.dash.slot==2)?1:0,this.dash.slot1Maker,24,185,20,col("red1") ,col("dgray"),122,0,239,97,(euc.dash.hapA)?"HAPTIC ON":"HAPTIC OFF",14,185,70);
				else if (i==3) this.btn((this.dash.slot==3)?1:0,this.dash.slot1Maker,24,60,120,col("red1"), col("dgray"),0,100,119,195,(euc.dash.hapT)?"HAPTIC ON":"HAPTIC OFF",14,60,170);
				else if (i==4) this.btn((this.dash.slot==4)?1:0,this.dash.slot1Maker,24,185,120,col("red1"),col("dgray"),122,100,239,195,(euc.dash.hapB)?"HAPTIC ON":"HAPTIC OFF",14,185,170);
   				//this.ntfy("HOLD -> OPTIONS","",18,col("dgray"),1);
			}else{
                this.g.setFont("Vector",24);
				if (i==1) { this.g.setColor(0,col("dgray"));this.g.fillRect(0,0,119,97);this.g.setColor(1,0);this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),50);}
				else if (i==2) { this.g.setColor(0,col("dgray"));this.g.fillRect(122,0,239,97);this.g.setColor(1,0);this.g.drawString("EMPTY",185-(this.g.stringWidth("EMPTY")/2),50);}
				else if (i==3) { this.g.setColor(0,col("dgray"));this.g.fillRect(0,100,119,195);this.g.setColor(1,0);this.g.drawString("EMPTY",60-(this.g.stringWidth("EMPTY")/2),150);}
				else if (i==4) { this.g.setColor(0,col("dgray"));this.g.fillRect(122,100,239,195);this.g.setColor(1,0);this.g.drawString("EMPTY",6185-(this.g.stringWidth("EMPTY")/2),150);}
				this.g.flip();
				//this.ntfy("HOLD -> SET","",18,col("dgray"),1);
			}	
		}
        this.run=false;
	},
	show : function(){
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    upd: function(){
      this.dash=require("Storage").readJSON("dash.json",1);
      print(this.dash);
      for (i = 1; i < 5; i++) {
			if (this.dash["slot"+i+"Mac"]){
				if      (i==1) this.btn((this.dash.slot==1)?1:0,this.dash.slot1Maker,24,60,20,col("red1"),col("raf4"),0,0,119,97,(euc.dash.hapS)?"HAPTIC ON":"HAPTIC OFF",14,60,70);
				else if (i==2) this.btn((this.dash.slot==2)?1:0,this.dash.slot1Maker,24,185,20,col("red1"),col("raf4"),122,0,239,97,(euc.dash.hapA)?"HAPTIC ON":"HAPTIC OFF",14,185,70);
				else if (i==3) this.btn((this.dash.slot==3)?1:0,this.dash.slot1Maker,24,60,120,col("red1"),col("raf4"),0,100,119,195,(euc.dash.hapT)?"HAPTIC ON":"HAPTIC OFF",14,60,170);
				else if (i==4) this.btn((this.dash.slot==4)?1:0,this.dash.slot1Maker,24,185,120,col("red1"),col("raf4"),122,100,239,195,(euc.dash.hapB)?"HAPTIC ON":"HAPTIC OFF",14,185,170);
			}
		}
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
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
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
				t.g.setFont("Vector",22);
		        t.g.drawString("GARAGE",120-(t.g.stringWidth("GARAGE")/2),217); 
				t.g.flip();
			},1000,this);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
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
	face.go(set.dash[set.def.dash],0);
    return true;
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
//
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		this.timeout();
		digitalPulse(D16,1,[30,50,30]);
		if(x<120&&y<100) this.s=1;          //slot1
		else if(120<x&&y<100) this.s=2;   //slot2 
		else if(x<=120&&100<y) this.s=3;   //slot3 
		else if(120<x&&100<y) this.s=4; //slot4

		if (face[0].dash["slot"+this.s+"Mac"]){
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));//select this slot
			if (Boolean(require("Storage").read('eucSlot'+this.s+'.json')))
				euc.dash=require("Storage").readJSON('eucSlot'+this.s+'.json',1);
			else euc.dash=require("Storage").readJSON("eucSlot.json",1);
			face[0].upd();
           // face[0].ntfy("HOLD -> OPTIONS","",18,col("dgray"),1);
		}//else face[0].ntfy("HOLD -> SET","",18,col("dgray"),1);
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);    
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go(set.dash[set.def.dash],0);
		return;
	case 12: //long press event
	    digitalPulse(D16,1,[100]);
		if(0<=x&&x<=120&&0<=y&&y<=100)	this.s=1;			//slot1
		else if(120<=x&&x<=239&&0<=y&&y<=100) this.s=2;		//slot2
		else if (0<=x&&x<=120&&100<=y&&y<=200) this.s=3;	//slot3
		else if(120<=x&&x<=239&&100<=y&&y<=200) this.s=4;	//slot4
		if (require("Storage").readJSON("dash.json",1)["slot"+this.s+"Mac"]){
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			face.go("dashSlot",0);return;
		}else {
			(s=>{s&&(s["slot"]=this.s)&&require('Storage').write('dash.json',s);})(require('Storage').readJSON('dash.json',1));
			face.go("dashScan",0);return;
		}
		this.timeout();
		break;
  }
};



