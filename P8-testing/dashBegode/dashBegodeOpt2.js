//begode more
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!euc.dash.vol) euc.dash.vol=1;
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,205,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("MORE",120-(this.g.stringWidth("MORE")/2),217); 
		this.g.flip(); 
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,204);
		this.g.setColor(1,3);
      	this.g.fillRect(75,201,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(120,201,143,204);
		this.g.flip();
		let date = new Date(0);
		date.setSeconds(euc.dash.auto.offT);
		let offTimeout = date.toISOString().substr(11, 8);
		this.btn(1,"ON",18,185,20,12,1,122,0,239,97,"CONN",25,185,55);		
        this.btn(1,"ON",18,185,120,12,1,122,100,239,195,"DISC",25,185,155);		
		this.offT=-1;
		this.vol=-1;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
		if (!face[0].setE){
			if (euc.dash.auto.offT!=this.offT) {
				this.offT=euc.dash.auto.offT;
				let date = new Date(0);
				date.setSeconds(euc.dash.auto.offT);
				let offTimeout = date.toISOString().substr(11, 8);
				this.btn(1,"AUTO OFF",18,60,20,1,1,0,0,119,97,offTimeout,25,60,55);
			}
			if (euc.dash.vol!=this.vol) {
				this.vol=euc.dash.vol;
		        this.btn(0,"VOLUME",18,60,120,12,1,0,100,119,195,this.vol,25,60,155);
			}
		} else if (euc.dash.vol!=this.vol)  {
			this.vol=euc.dash.vol;
	        this.btn(0,this.vol,100,126,60,12,1,60,40,180,160);
		}
		
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },200,this);
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
	set: function(b,txt){
        this.setE=1;
        this.setEb=b;
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),10); 		
		this.g.drawString("<",5,90); this.g.drawString(">",230,90); 
		this.g.flip(); 
        this.btn(0,b,100,126,60,12,1,60,40,180,160);
    },	
    ntfy: function(txt1,txt0,size,clr,bt){
            this.g.setColor(0,clr);
			this.g.fillRect(0,198,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
     		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
		  		if (!face[0].setE){
					t.g.setColor(0,0);
					t.g.fillRect(0,205,239,239);
					t.g.setColor(1,15);
					t.g.setFont("Vector",20);
					t.g.drawString("MORE",120-(t.g.stringWidth("MORE")/2),217); 
					t.g.flip();
					t.g.setColor(0,0);
					t.g.fillRect(0,196,239,204);
					t.g.setColor(1,3);
					t.g.fillRect(75,201,165,204);
					t.g.flip();
					t.g.setColor(1,15);
					t.g.fillRect(120,201,143,204);
					t.g.flip(); 
				}
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
		face.go("dashBegodeOpt",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	face.off();
	switch (e) {
      case 5://tap event
  		if (!face[0].setE){//select page

			if (face[0].page=="idle"){
				buzzer.nav(40);
			}else if ( x<=120 && y<100 ) { //auto off
				buzzer.nav(40);
			}else if ( 120<=x && y<=100 ) { //CONN
				buzzer.nav([30,50,30]);
				face.go("dashBegodeCon",0);
				return;		
			}else if ( x<=120 && y<=200 ) { //volume
				buzzer.nav([30,50,30]);
				face[0].set(euc.dash.vol,"VOLUME");
			}else if  (120<=x && y<=200 ) { //disconn
				buzzer.nav([30,50,30]);
				face.go("dashBegodeDis",0);
				return;					
			}else buzzer.nav(40);
		}else {
			if ( x <= 120  && 1<face[0].setEb ) {
				buzzer.nav([30,50,30]);
				face[0].setEb--;
			}else if ( 120 <= x && face[0].setEb<9 ) {
				buzzer.nav([30,50,30]);
				face[0].setEb++;
			}else 
				buzzer.nav(40);
			face[0].btn(0,face[0].setEb,100,126,60,12,1,60,40,180,160);
		}
		break;
	case 1: //slide down event
      if (face[0].setE) {
			face[0].setE=0; 
			face[0].init();
        } else 
			face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else 
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		break;
	case 3: //slide left event
		if (face[0].setE) {
			buzzer.nav(40);
			return;
        } 
		face.go("dashBegodeAdv",0);
		return;
	case 4: //slide right event (back action)
	    if (face[0].setE) {				
			euc.wri("volume",face[0].setEb);
			setTimeout(()=>{face[0].setE=0;face[0].init();euc.dash.vol=face[0].setEb;},100);
		} else
		face.go("dashBegodeOpt",0);
		return;
	case 12: //hold event
		buzzer.nav(40);
		this.timeout();
		break;
  }
};
