//clock  Options
face[0] = {
	offms: 8000,
	g:w.gfx,
	init: function(){
        //this.g.clear();
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
        //this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",25);
		this.g.drawString("SET TIME",120-(this.g.stringWidth("SET TIME")/2),217); 
		this.g.flip(); 
		//this.btn(1,(set.def.dash.mph)?"MPH":"KPH",30,40,25,2220,0,0,0,75,75);//1
			
        //this.run=true;
	},
	show : function(){
		if (!this.run) return; 
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
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
    ntfy: function(txt0,txt1,size,bt,col,tm,s){
			if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
            this.g.setColor(0,col);
			this.g.fillRect(0,160,239,239);
			this.g.setColor(1,4095);
			this.g.setFont("Vector",18);
     		this.g.drawString(txt0,120-(this.g.stringWidth(txt0)/2),165); 
			if (s) {this.g.setFont("Vector",50);this.g.drawString("<",5,200);this.g.drawString(">",215,200);}
			this.g.setFont("Vector",size);
     		this.g.drawString(txt1,120-(this.g.stringWidth(txt1)/2),205); 
			this.g.flip();
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				face[0].set=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,156,239,239);
				t.g.setColor(1,4095);
				t.g.setFont("Vector",25);
				t.g.drawString("DASH OPTIONS",120-(t.g.stringWidth("DASH OPTIONS")/2),217); 
				t.g.flip();
			},tm,this);
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
		//euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		return true;
	},
	show : function(){
		face.go(appRoot[0],0);
		return;	 
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		if (face[0].set) { 

 
		}else digitalPulse(D16,1,40);		
		this.timeout();
		return;
	case 1: //slide down event
		face.go(face.appPrev,0);
		return; 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else digitalPulse(D16,1,40);
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);
		break;
	case 4: //slide right event (back action)
		face.go(face.appPrev,0);
		return;
	case 12: //hold event
		digitalPulse(D16,1,40);
		this.timeout();
		break;
  }
};
