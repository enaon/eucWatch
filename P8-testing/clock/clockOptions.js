//clock  Options
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
        //this.g.clear();		
		this.g.setColor(0,0);
		this.g.fillRect(0,161,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",25);
		this.g.drawString("MAIN OPTIONS",120-(this.g.stringWidth("MAIN OPTIONS")/2),217); 
		this.g.flip(); 
		this.btn(1,"SET",20,60,15,1,0,0,0,119,79,"TIME",26,60,45);//1
		this.btn(1,(ew.def.hr24)?"24 H":"12 H",26,180,25,4,0,120,0,239,79);//2
		this.btn(1,"SET",20,60,90,1,0,0,80,119,155,"DATE",26,60,120);//3
		this.btn(1,"ABOUT",24,180,107,1,0,120,80,239,155);//4
		this.min=-1;
		this.hour=-1;
		//this.run=true;
	},
	show : function(i){
		if (!this.run) return; 
		if (!i) {
			//let h=Date().getHours();
			this.btn(1,(ew.def.hr24)?"24 HOUR MODE":"12 HOUR MODE",24,120,25,4,0,0,0,239,75);//1
			this.btn(1,"SET TIME",24,80,107,1,0,0,80,155,155);//1
			this.btn(1,"INFO",24,205,107,1,0,160,80,239,155);//1

			
		}else{
			print(2);
			this.info();
		}
		
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
       // this.tid=setTimeout(function(t,o){
		//  t.tid=-1;
		//  t.show();
       // },1000,this);
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
			this.g.setColor(1,15);
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
				t.g.setColor(1,15);
				t.g.setFont("Vector",25);
				t.g.drawString("MAIN OPTIONS",120-(t.g.stringWidth("MAIN OPTIONS")/2),217); 
				t.g.flip();
			},tm,this);
    },
	info: function(){
		let s=(getTime()-ew.is.boot)|0;
		let d=0;
		let h=0;
		let m=0;
		if (s>864000) {ew.is.boot=getTime();s=(getTime()-ew.is.boot)|0;}
		while (s>86400) {s=s-86400;d++;}
		while (s>3600) {s=s-3600;h++;}
		while (s>60) {s=s-60;m++;}
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,194); //all
		this.g.setColor(1,11);
		this.g.setFont("Vector",18);
		this.g.drawString("MEMORY: "+process.memory().free+"/"+process.memory().total,120-(this.g.stringWidth("MEMORY: "+process.memory().free+"/"+process.memory().total)/2),0);  
		this.g.drawString("IMAGE: "+process.version,120-(this.g.stringWidth("IMAGE: "+process.version)/2),25);  
		this.g.drawString("ACC TYPE: "+ew.def.acctype,120-(this.g.stringWidth("ACC TYPE: "+ew.def.acctype)/2),50);  
		this.g.drawString("TOUCH TYPE: "+ew.def.touchtype,120-(this.g.stringWidth("TOUCH TYPE: "+ew.def.touchtype)/2),75);  
		
		this.g.drawString("UPTIME: "+d+"D-"+h+"H-"+m+"M",120-(this.g.stringWidth("UPTIME: "+d+"D-"+h+"H-"+m+"M")/2),100);  
		this.g.drawString("FLASH: "+require("Storage").getFree(),120-(this.g.stringWidth("FLASH: "+require("Storage").getFree())/2),125); 
		this.g.drawString("TEMPERATURE: "+E.getTemperature(),120-(this.g.stringWidth("TEMPERATURE: "+E.getTemperature())/2),150);  
		this.g.drawString("NAME: "+ew.def.name,120-(this.g.stringWidth("NAME: "+ew.def.name)/2),175);  
		this.g.flip();
		this.g.setFont("Vector",18);
		this.g.setColor(0,4);
		this.g.fillRect(0,195,119,239);
		this.g.setColor(1,15);
		this.g.drawString("RESTART",18,210);
		this.g.flip();	
		this.g.setColor(0,1);
		this.g.fillRect(120,195,239,239);
		this.g.setColor(1,15);
		this.g.drawString("MORE",156,210);
		this.g.flip();		
	},
	more: function(){
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,194); //all
		this.g.setColor(1,11);
		this.g.setFont("Vector",22);
		this.g.drawString("TP RST:",65-(this.g.stringWidth("TP RST:")/2),0);  
		this.g.setFont("Vector",26);
		this.g.drawString(ew.def.rstP,180-(this.g.stringWidth(ew.def.rstP)/2),0);  
		this.g.flip();
		this.btn((ew.def.rstR==165)?1:0,"TP SLEEP:",22,65,45,1,2,0,30,239,80,(ew.def.rstR==165)?"P8":"P22",26,180,45);
		this.g.setFont("Vector",18);
		this.g.setColor(0,4);
		this.g.fillRect(0,195,119,239);
		this.g.setColor(1,15);
		this.g.drawString("RESTART",18,210);
		this.g.flip();	
		this.g.setColor(0,13);
		this.g.fillRect(120,195,239,239);
		this.g.setColor(1,15);
		this.g.drawString("SHUTDOWN",130,210);
		this.g.flip();		
	},
	setTime:function(){
		//minutes
		this.d=(Date()).toString().split(' ');
		this.t=(this.d[4]).toString().split(':');
		this.s=(this.t[2]).toString().split('');
		if (this.t[1]!=this.min ){
			this.min=this.t[1];
			this.g.setFont("Vector",73);
			this.g.setColor(0,1);
			this.g.fillRect(100,55,203,150);
			this.g.setColor(1,11);
			this.g.drawString(this.t[1],107,75);
			this.g.flip();
		}
		//seconds
		this.g.setColor(0,1);
		this.g.fillRect(203,55,240,150);
		this.g.setColor(1,15);//
		this.g.setFont("Vector",18);
		let sec=(ew.def.hr24)?"24H":(this.t[0]<12)?"AM":"PM";
		this.g.drawString(sec,241-(this.g.stringWidth(sec)),79); //hours mode
		this.g.setFont("Vector",30);
		this.g.drawString(this.s[0]+this.s[1],206,106); //seconds
		this.g.flip(); 
		//hours
		if (this.t[0]!=this.hour){
			this.g.setColor(0,0);
			this.g.fillRect(0,0,239,54);
			//this.g.setColor(0,1);
			this.g.flip();
			this.g.setColor(0,0);
			this.g.fillRect(0,161,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",25);
			this.g.drawString("SET TIME",120-(this.g.stringWidth("SET TIME")/2),217); 
			this.g.flip();
			this.hour=this.t[0];
			this.g.setColor(0,1);
			this.g.fillRect(0,55,99,150);
			this.g.setColor(1,15);
			this.g.setFont("Vector",73);
			if (ew.def.hr24) {
				this.g.drawString(this.hour,0,74); //hours
			} else {	
				this.hour=(this.hour<10)?(this.hour=="00")?12:this.hour[1]:(this.hour<13)?this.hour:this.hour-12;
				this.g.drawString(this.hour,(this.hour<10)?45:0,74); //hours
			}
			this.g.fillRect(91,90,95,94);
			this.g.fillRect(91,110,95,114);
			this.g.flip();
		}
		this.ntid=setTimeout(function(t,o){
		  t.ntid=0;
		  t.setTime();
        },1000,this);
	},
	setDate:function(){
		this.g.setColor(0,0);
		this.g.fillRect(0,0,239,54);
		this.g.flip();		
		this.d=(Date()).toString().split(' ');
		this.g.setColor(0,1);
		this.g.fillRect(0,55,239,160);
		this.g.setColor(1,11);
		this.g.setFont("Vector",40);
		this.g.drawString(this.d[2],25-(this.g.stringWidth(this.d[2])/2),90); 
		//this.g.setFont("Vector",35);
		this.g.drawString(this.d[1],95-(this.g.stringWidth(this.d[1])/2),90); 
		//this.g.setFont("Vector",35);
		this.g.drawString(this.d[3],195-(this.g.stringWidth(this.d[3])/2),90); 
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,161,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",25);
		this.g.drawString("SET DATE",120-(this.g.stringWidth("SET DATE")/2),217); 
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
	this.timeout();
	switch (e) {
	case 5: //tap event
		if (face[0].set) { 
			if (face[0].set=="info") {
				if ( x <=120 && 190 <= y) {
					ew.do.update.settings();
					NRF.removeListener('disconnect',bdis);  
					NRF.disconnect();
					w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
					reset();
				}else if ( 120 <= x && 190 <= y) {
					buzzer.nav([30,50,30]);
					face[0].set="more";
					face[0].more();
					return;
				}else {
					face[0].set=0;
			   		if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					w.gfx.clear();
					face[0].init();
					buzzer.nav([30,50,30]);
				}
			}else if (face[0].set=="more") {
				if (30 <= y && y <= 80 ) {
					ew.def.rstR=(ew.def.rstR==165)?229:165;
					face[0].btn((ew.def.rstR==165)?1:0,"TP SLEEP:",22,65,45,1,2,0,30,239,80,(ew.def.rstR==165)?"P8":"P22",26,180,45);//1
				}else if ( x <=120 && 190 <= y) {
					ew.do.update.settings();
					NRF.removeListener('disconnect',bdis);  
					NRF.disconnect();
					w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
					reset();
				}else if ( 120 <= x && 190 <= y) {
					ew.do.update.settings();
					NRF.disconnect();
					require("Storage").write("devmode","shutdown");
					ew.def.acc=0;
					ew.do.update.acc();
					face.go("clock",-1);
					setTimeout(()=>{E.reboot();},500);
				}else {
					//face[0].set=0;
			   		//if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					//w.gfx.clear();
					//face[0].init();
					buzzer.nav(40);
				}
			}else if (face[0].set=="setTime") {
				if ( x <=120 && y <= 120) { //hour up
					buzzer.nav([30,50,30]);
					setTime(Date().setHours(Date().getHours()+1)/1000);
					if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					face[0].setTime();
				}else if ( x <=120 && 120 <= y) {//hour dn
					buzzer.nav([30,50,30]);
					setTime(Date().setHours(Date().getHours()-1)/1000);
					if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					face[0].setTime();
				}else if ( 120 <= x && y <= 120) { //min up
					buzzer.nav([30,50,30]);
					setTime(Date().setMinutes(Date().getMinutes()+1)/1000);
					if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					face[0].setTime();
				}else if ( 120 <= x && 120 <= y) {//min dn
					buzzer.nav([30,50,30]);
					setTime(Date().setMinutes(Date().getMinutes()-1)/1000);
					if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					face[0].setTime();
				}else {
					face[0].set=0;
					w.gfx.clear();
					face[0].init();
					buzzer.nav(40);
				}
			}else if (face[0].set=="setDate") {
				if ( x <=80 &&  y <= 120) { //date up
					buzzer.nav([30,50,30]);
					setTime(Date().setDate(Date().getDate()+1)/1000);
					face[0].setDate();
				}else if ( x <=80 && 120 <= y) {//date dn
					buzzer.nav([30,50,30]);
					setTime(Date().setDate(Date().getDate()-1)/1000);
					face[0].setDate();
				}else if ( 80 <= x && x <=160 && y <= 120) { //month up
					buzzer.nav([30,50,30]);
					setTime(Date().setMonth(Date().getMonth()+1)/1000);
					face[0].setDate();
				}else if ( 80 <= x && x <=160 && 120 <= y) {//month dn
					buzzer.nav([30,50,30]);
					setTime(Date().setMonth(Date().getMonth()-1)/1000);
					face[0].setDate();
				}else if ( 160 <= x && y <= 120) { //year up
					buzzer.nav([30,50,30]);
					setTime(Date().setFullYear(Date().getFullYear()+1)/1000);
					face[0].setDate();
				}else if ( 160 <= x && 120 <= y) {//year dn
					buzzer.nav([30,50,30]);
					setTime(Date().setFullYear(Date().getFullYear()-1)/1000);
					face[0].setDate();
				}else {
					face[0].set=0;
					w.gfx.clear();
					face[0].init();
					buzzer.nav(40);
				}
			}
		}else if (  x <=120 &&  y <= 80 ) {//setTime
			buzzer.nav([30,50,30]);
			face[0].set="setTime";
			face[0].setTime();			
		}else if ( 120 <= x && y <= 80 ) {//12/24 hour mode
			buzzer.nav([30,50,30]);
			ew.def.hr24=1-ew.def.hr24;
			face[0].btn(1,(ew.def.hr24)?"24 H":"12 H",26,180,25,4,0,120,0,239,79);//2
		}else if ( x <=120 && 80 <= y && y <= 160 ) { //setDate
			buzzer.nav([30,50,30]);	
			face[0].set="setDate";
			face[0].setDate();
		}else if (  80 <= y && y <= 160 ) { //about
			buzzer.nav([30,50,30]);
			face[0].set="info";
			face[0].info();
		}else buzzer.nav(40);	
		this.timeout();
		return;
	case 1: //slide down event
		if (face[0].set) {
			face[0].set=0;
	   		if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			//w.gfx.clear();
			//face[0].init();
		}//else {
			if (face.faceSave!=-1) {
				face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
			}else{
				if (face.appPrev=="settings") {face.appPrev="clock";face.pagePrev=0;}
				face.go(face.appPrev,face.pagePrev,face.pageArg);return;
			}
			//return; 
		//}
		break;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (face[0].set) {
			face[0].set=0;
			if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}
		this.timeout();
		break;
	case 3: //slide left event
		buzzer.nav(40);
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].set=0;
			if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}break;
	case 12: //hold event
		buzzer.nav(40);
		this.timeout();
		break;
  }
};
