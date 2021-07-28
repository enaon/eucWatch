//dash  Options
//dash options  
face[0] = {
	offms: 8000,
	g:w.gfx,
	init: function(){
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.faceSave=-1;face.go(set.dash[set.def.dash.face],0);return;}
        //this.g.clear();
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
        //this.g.clear();
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",25);
		this.g.drawString("DASH OPTIONS",120-(this.g.stringWidth("DASH OPTIONS")/2),217); 
		this.g.flip(); 
		this.btn(1,(set.def.dash.mph)?"MPH":"KPH",30,40,25,2220,0,0,0,75,75);//1
		this.btn(1,"o",20,100,20,2220,0,80,0,155,75,(set.def.dash.farn)?"F":"C",30,120,25);//2
		//this.btn(set.def.dash.mph,(set.def.dash.mph)?"MPH":"KPH",30,40,25,col("olive"),1453,0,0,75,75);//1
		//this.btn(set.def.dash.farn,"o",20,100,20,col("olive"),1453,80,0,155,75,(set.def.dash.farn)?"F":"C",30,120,25);//2
		let makr=set.read("dash","slot"+set.read("dash","slot")+"Maker"); 
		if (makr) {
			//if (makr=="Begode"){
				this.btn(euc.dash.ampR,"AMP",15,200,10,1365,1365,160,0,239,75,(euc.dash.ampR)?"R":"N",30,200,35); //3
				this.btn(1,"PACK",15,200,90,1365,col("olive"),160,80,239,155,euc.dash.bms*67.2|0,30,200,120); //6

			//}else {
			//	this.g.fillRect(160,0,239,75); //3
			//}
			this.btn(1,"SPEED X",15,40,90,1365,1453,0,80,75,155,euc.dash.spdF,30,40,120); //4
			this.btn(1,"DIST X",15,120,90,1365,1453,80,80,155,155,euc.dash.trpF,30,120,120); //5
		} else {
			this.g.fillRect(160,0,239,75);//3
			this.g.fillRect(0,80,75,155); //4
			this.g.fillRect(80,80,155,155); //5
			this.g.fillRect(160,80,239,155);//6
		}
	
        //this.run=true;
	},
	show : function(){
		if (!this.run) return; 
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
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
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
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
			if (y < 155) {
				face[0].set=0;
				face[0].btn(1,"SPEED X",15,40,90,1365,1453,0,80,75,155,euc.dash.spdF,30,40,120); //4
				face[0].btn(1,"DIST X",15,120,90,1365,1453,80,80,155,155,euc.dash.trpF,30,120,120); //5
				touchHandler[0](e,x,y);
				return;
			} else{
				digitalPulse(D16,1,[30,50,30]);
				if (face[0].set=="spdF") { 
					if (x<120){ //spd
						euc.dash.spdF=(euc.dash.spdF - 0.01);
						if (euc.dash.spdF <0.5)  euc.dash.spdF=0.5;
					}else{
						euc.dash.spdF=(euc.dash.spdF + 0.01);
						if (1.5 <euc.dash.spdF)  euc.dash.spdF=1.5;
					}
					face[0].btn(1,"SPEED X",15,40,90,170,0,0,80,75,155,euc.dash.spdF,30,40,120); //4
					face[0].ntfy("SPEED FACTOR",euc.dash.spdF,40,1,170,5000,1);
				}else if (face[0].set=="trpF") { 
					if (x<120){ //spd
						euc.dash.trpF=(euc.dash.trpF - 0.01);
						if (euc.dash.trpF <0.5)  euc.dash.trpF=0.5;
					}else{
						euc.dash.trpF=(euc.dash.trpF + 0.01);
						if (1.5 <euc.dash.trpF)  euc.dash.trpF=1.5;
					}
					face[0].btn(1,"DIST X",15,120,90,170,0,80,80,155,155,euc.dash.trpF,30,120,120); //5
					face[0].ntfy("DISTANCE FACTOR",euc.dash.trpF,40,1,170,5000,1);
				}else if (face[0].set=="temp") { //temp
				  if (x<120){ //

					}else{ //back

					}
				}else if (face[0].set=="batt") { //bat
				  if (x<120){ //
						
					}else{ //back

					}
				}else  {
					digitalPulse(D16,1,40);
					face[0].set=0;
					face[0].btn(1,"SPEED X",15,40,90,1365,1453,0,80,75,155,euc.dash.spdF,30,40,120); //4
					face[0].btn(1,"DIST X",15,120,90,1365,1453,80,80,155,155,euc.dash.trpF,30,120,120); //5
				}
			}
        }else if (x<75 && y<75) { //1
			//face[0].set="mph";
            digitalPulse(D16,1,[30,50,30]);
			set.def.dash.mph=1-set.def.dash.mph;
			face[0].btn(1,(set.def.dash.mph)?"MPH":"KPH",30,40,25,2220,0,0,0,75,75);
			face[0].ntfy("SPEED & DISTANCE IN",(set.def.dash.mph)?"MILES":"KILOMETERS",30,1,1365,1500);
		}else if (75<= x && x < 155 && y < 75) { //2
			//face[0].set="far";
			digitalPulse(D16,1,[30,50,30]);
            set.def.dash.farn=1-set.def.dash.farn;
			face[0].btn(1,"o",20,100,20,2220,0,80,0,155,75,(set.def.dash.farn)?"F":"C",30,120,25);
			face[0].ntfy("TMPERATURE IN",(set.def.dash.farn)?"FAHRENHEIT":"CELSIUS",30,1,1365,1500);
		}else if (155 <= x && y < 75) { //3
			euc.dash.ampR=1-euc.dash.ampR;
			face[0].btn(euc.dash.ampR,"AMP",15,200,10,1365,1365,160,0,239,75,(euc.dash.ampR)?"R":"N",30,200,35); //3
			face[0].ntfy("AMPERAGE REPORT",(euc.dash.ampR)?"REVERSED":"NORMAL",30,1,1365,1500);
            digitalPulse(D16,1,[30,50,30]);
		}else if (x<75 && 75 <y && y < 155) { //4
			face[0].set="spdF";
            digitalPulse(D16,1,[30,50,30]);
			//face[0].btn(1,"SPEED X",15,40,90,1453,0,0,80,75,155,euc.dash.spdF,30,40,120); //4
			face[0].ntfy("SPEED FACTOR",euc.dash.spdF,40,1,170,5000,1);
		}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
			face[0].set="trpF";
            digitalPulse(D16,1,[30,50,30]);
			//face[0].btn(1,"DIST X",15,120,90,1453,0,80,80,155,155,euc.dash.trpF,30,120,120); //5
			face[0].ntfy("DISTANCE FACTOR",euc.dash.trpF,40,1,170,5000,1);
		}else if (155 <= x && 75 <y && y < 155) { //6
			if (1.5<=euc.dash.bms) euc.dash.bms=1;
			else euc.dash.bms=euc.dash.bms+0.25;
			face[0].btn(1,"PACK",15,200,90,1365,col("olive"),160,80,239,155,euc.dash.bms*67.2|0,30,200,120); //6
			face[0].ntfy("BATTERY VOLTAGE",euc.dash.bms*67.2,40,1,1365,1500);
            digitalPulse(D16,1,[30,50,30]);   
		}else digitalPulse(D16,1,40);		
		this.timeout();
		return;
	case 1: //slide down event
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
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
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		face.go(face.appPrev,0);
		return;
	case 12: //hold event
		digitalPulse(D16,1,40);
		this.timeout();
		break;
  }
};
