//kingsong  set options2
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!euc.dash.auto.offT) euc.wri("getPowerOff");
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
      	this.g.fillRect(75,200,165,204);
		this.g.flip();
        this.g.setColor(1,15);
      	this.g.fillRect(120,200,143,204);
		this.g.flip();
		let offH=Math.floor(euc.dash.auto.offT/3600);
		let offM=euc.dash.auto.offT/60 %60;	
        this.btn(1,"IDLE",18,60,20,1,1,0,0,119,97,!euc.dash.auto.offT?"-":offH+"h:"+offM+"m",25,60,55);
		this.btn(1,"ON",18,185,20,12,1,122,0,239,97,"CONN",25,185,55);		
        //this.btn(1,"INFO",18,60,115,1,1,0,100,119,195,"",25,60,150);
        this.btn(1,"INFO",25,60,135,12,1,0,100,119,195,"",25,60,150);
        this.btn(1,"ON",18,185,115,12,1,122,100,239,195,"DISC",25,185,155);		
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
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
	cho: function(title,val,button,button2,color){
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,177);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(title,120-(this.g.stringWidth(title)/2),10); 		
		this.g.drawString("<",5,90); this.g.drawString(">",230,90); 		
		this.g.setFont("Vector",55);
		this.g.drawString(val,130-(this.g.stringWidth(val)/2),70); 		
		this.g.flip(); 
		//if (!this.page){

		this.g.setColor(0,color);
		this.g.fillRect(0,177,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
   		this.g.drawString(button,120-(this.g.stringWidth(button)/2),188); 
		if (button2) this.g.drawString(button2,120-(this.g.stringWidth(button2)/2),216); 
		this.g.flip(); 
		//}
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
				t.g.setColor(0,0);
				t.g.fillRect(0,205,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("MORE",120-(t.g.stringWidth("MORE")/2),217); 
				t.g.flip();
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,204);
				t.g.setColor(1,3);
				t.g.fillRect(75,200,165,204);
				t.g.flip();
				t.g.setColor(1,15);
				t.g.fillRect(120,200,143,204);
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
		if (face[0].page=="idle")
			euc.wri("setPowerOff",euc.dash.auto.offT);
		face.go("dashKingsongOpt",0);
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
      case 5: case 12: //tap event
		if (face[0].page=="idle"){
			if ( 180 < y  ){
				euc.aOff=euc.dash.auto.onD.off;
				euc.aLck=euc.dash.auto.onD.lock;
				euc.dash.auto.onD.off=1;
				euc.dash.auto.onD.lock=0;
				euc.tgl();
				return;
			}else if ( x<=120)
				euc.dash.auto.offT=euc.dash.auto.offT-600;
			else euc.dash.auto.offT=euc.dash.auto.offT+600;
			buzzer.nav([30,50,30]);
			if (euc.dash.auto.offT <60 )euc.dash.auto.offT=60;
			if (euc.dash.auto.offT ==660 )euc.dash.auto.offT=600;
			if (14400<euc.dash.auto.offT  )euc.dash.auto.offT=14400;
			let offH=Math.floor(euc.dash.auto.offT/3600);
			let offM=euc.dash.auto.offT/60 %60;
			face[0].cho("SET IDLE TIMEOUT",offH+"h:"+offM+"m","TURN OFF","NOW",7);
			return;
		}else if ( x<=120 && y<100 ) { //set timeout
			let offH=Math.floor(euc.dash.auto.offT/3600);
			let offM=euc.dash.auto.offT/60 %60;
			face[0].page="idle";
			face[0].cho("SET IDLE TIMEOUT",offH+"h:"+offM+"m","TURN OFF","NOW",7);
			return;
		}else if ( 120<=x && y<=100 ) { //CONN
			face.go("dashKingsongCon",0);
			return;		
		}else if ( x<=120 && 100<=y ) { //info
			face.go("dashKingsongCharging",0);return;
		}else if  (120<=x && 100<=y ) { //disconn
			face.go("dashKingsongDis",0);
			return;					
		}else buzzer.nav([30,50,30]);
		break;
	case 1: //slide down event
		if (face[0].page=="idle")
			euc.wri("setPowerOff",euc.dash.auto.offT);
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
		if (face[0].page=="idle"){
			face[0].page=0;
			euc.wri("setPowerOff",euc.dash.auto.offT);
			face.go("dashKingsongOpt2",0);
		}else 
			if (face.appPrev!="dashKingsongAdv") euc.wri("getAlarms");
			face.go("dashKingsongAdv",0);
		return;
	case 4: //slide right event (back action)
		if (face[0].page=="idle"){
			face[0].page=0;
			euc.wri("setPowerOff",euc.dash.auto.offT);
			face.go("dashKingsongOpt2",0);

		}else 
			face.go("dashKingsongOpt",0);
		return;
  }
};
