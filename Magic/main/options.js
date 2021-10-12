//clock  Options
face[0] = {
	offms: 8000,
	g:w.gfx,
	init: function(){
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
        //this.g.clear();		
		this.g.setColor(0,0);
		this.g.fillRect(0,161,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",25);
		this.g.drawString("MAIN OPTIONS",120-(this.g.stringWidth("MAIN OPTIONS")/2),217); 
		this.g.flip(); 
		this.btn(1,(set.def.hr24)?"24 HOUR MODE":"12 HOUR MODE",24,120,25,1453,0,0,0,239,75);//1
		this.btn(1,"SET TIME",24,80,107,1365,0,0,80,155,155);//1
		this.btn(1,"INFO",24,205,107,1365,0,160,80,239,155);//1
		//this.run=true;
	},
	show : function(i){
		if (!this.run) return; 
		if (!i) {
			//let h=Date().getHours();
			this.btn(1,(set.def.hr24)?"24 HOUR MODE":"12 HOUR MODE",24,120,25,1453,0,0,0,239,75);//1
			this.btn(1,"SET TIME",24,80,107,1365,0,0,80,155,155);//1
			this.btn(1,"INFO",24,205,107,1365,0,160,80,239,155);//1

			
		}else{
			print(2);
			this.info();
		}
		
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
       // this.tid=setTimeout(function(t,o){
		//  t.tid=-1;
		//  t.show();
       // },1000,this);
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
				t.g.drawString("MAIN OPTIONS",120-(t.g.stringWidth("MAIN OPTIONS")/2),217); 
				t.g.flip();
			},tm,this);
    },
	info: function(){
		let s=(getTime()-set.boot)|0;
		let d=0;
		let h=0;
		let m=0;
		if (s>864000) {set.boot=getTime();s=(getTime()-set.boot)|0;}
		while (s>86400) {s=s-86400;d++;}
		while (s>3600) {s=s-3600;h++;}
		while (s>60) {s=s-60;m++;}
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,200); //all
		this.g.setColor(1,col("lblue"));
		this.g.setFont("Vector",18);
		this.g.drawString("MEMORY: "+process.memory().free+"/"+process.memory().total,120-(this.g.stringWidth("MEMORY: "+process.memory().free+"/"+process.memory().total)/2),0);  
		this.g.drawString("IMAGE: "+process.version,120-(this.g.stringWidth("IMAGE: "+process.version)/2),25);  
		this.g.drawString("ACC TYPE: "+set.def.acctype,120-(this.g.stringWidth("ACC TYPE: "+set.def.acctype)/2),50);  
		this.g.drawString("TOUCH TYPE: "+set.def.touchtype,120-(this.g.stringWidth("TOUCH TYPE: "+set.def.touchtype)/2),75);  
		
		this.g.drawString("UPTIME: "+d+"D-"+h+"H-"+m+"M",120-(this.g.stringWidth("UPTIME: "+d+"D-"+h+"H-"+m+"M")/2),100);  
		this.g.drawString("FLASH: "+require("Storage").getFree(),120-(this.g.stringWidth("FLASH: "+require("Storage").getFree())/2),125); 
		this.g.drawString("TEMPERATURE: "+E.getTemperature(),120-(this.g.stringWidth("TEMPERATURE: "+E.getTemperature())/2),150);  
		this.g.drawString("NAME: "+set.def.name,120-(this.g.stringWidth("NAME: "+set.def.name)/2),175);  
		this.g.flip();
		this.g.setFont("Vector",18);
		this.g.setColor(0,col("raf"));
		this.g.fillRect(0,195,119,239);
		this.g.setColor(1,col("white"));
		this.g.drawString("RESTART",18,210);
		this.g.flip();	
		this.g.setColor(0,col("red"));
		this.g.fillRect(120,195,239,239);
		this.g.setColor(1,col("white"));
		this.g.drawString("DEVMODE",136,210);
		this.g.flip();		
	},
	setTime: function(){
                
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,200); //all
		this.g.setColor(1,col("lblue"));
		this.g.setFont("Vector",18);
		this.g.drawString("MEMORY: "+process.memory().free+"/"+process.memory().total,120-(this.g.stringWidth("MEMORY: "+process.memory().free+"/"+process.memory().total)/2),0);  
		this.g.drawString("IMAGE: "+process.version,120-(this.g.stringWidth("IMAGE: "+process.version)/2),25);  
		this.g.drawString("ACC TYPE: "+set.def.acctype,120-(this.g.stringWidth("ACC TYPE: "+set.def.acctype)/2),50);  
		this.g.drawString("TOUCH TYPE: "+set.def.touchtype,120-(this.g.stringWidth("TOUCH TYPE: "+set.def.touchtype)/2),75);  
		
		this.g.drawString("UPTIME: "+d+"D-"+h+"H-"+m+"M",120-(this.g.stringWidth("UPTIME: "+d+"D-"+h+"H-"+m+"M")/2),100);  
		this.g.drawString("FLASH: "+require("Storage").getFree(),120-(this.g.stringWidth("FLASH: "+require("Storage").getFree())/2),125); 
		this.g.drawString("TEMPERATURE: "+E.getTemperature(),120-(this.g.stringWidth("TEMPERATURE: "+E.getTemperature())/2),150);  
		this.g.drawString("NAME: "+set.def.name,120-(this.g.stringWidth("NAME: "+set.def.name)/2),175);  
		this.g.flip();

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
			if (face[0].set=="info") {
				if ( x <=120 && 190 <= y) {
					set.updateSettings();
					NRF.removeListener('disconnect',bdis);  
					NRF.disconnect();
					w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
					reset();
				}else if ( 120 <= x && 190 <= y) {
					set.updateSettings();
					NRF.disconnect();
					require("Storage").write("devmode","dev");
					w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
					E.reboot();
				}else {
					face[0].set=0;
					w.gfx.clear();
					face[0].init();
					buzzer(ew.pin.BUZZ,0,[30,50,30]);
				}
			}

		}else if ( y <=80 ) {
			set.def.hr24=1-set.def.hr24;
 			face[0].btn(1,(set.def.hr24)?"24 HOUR MODE":"12 HOUR MODE",24,120,25,1453,0,0,0,239,75);//1
			buzzer(ew.pin.BUZZ,0,[30,50,30]);
		}else if ( x <=160 && 80 <= y && y <= 160 ) { //setTime
			face[0].set=1;
			buzzer(ew.pin.BUZZ,0,[30,50,30]);	
		}else if (  80 <= y && y <= 160 ) { //info
			face[0].set="info";
			face[0].info();
			buzzer(ew.pin.BUZZ,0,[30,50,30]);
		}else buzzer(ew.pin.BUZZ,0,40);	
		
		
		face.off();
		return;
	case 1: //slide down event
		if (face[0].set) {
			face[0].set=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}break;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(ew.pin.BUZZ,0,[30,50,30]);
		}else buzzer(ew.pin.BUZZ,0,40);
		face.off();
		break;
	case 3: //slide left event
		buzzer(ew.pin.BUZZ,0,40);
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].set=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}break;
	case 12: //hold event
		buzzer(ew.pin.BUZZ,0,40);
		face.off();
		break;
  }
};
