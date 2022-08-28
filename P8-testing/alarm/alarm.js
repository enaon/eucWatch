//Alarms setter
if (!global.alrm) {
  global.alrm ={
  buzz:-1,btn:-1,start:1,
  1:{hour:8,min:0,rep:0,snz:0,on:0,set:0,tmr:-1},
  2:{hour:13,min:0,rep:0,snz:0,on:0,set:0,tmr:-1},
  3:{hour:21,min:30,rep:0,snz:0,on:0,set:0,tmr:-1},
  set: function(o){
    if ( this[o].tmr!=-1){ clearTimeout(this[o].tmr); this[o].tmr=-1;}
    var date = new Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),this[o].hour,this[o].min ); 
    if (date < Date()) {
      date.setDate(date.getDate() + 1);
    }
    var diff=date-Date();
    this[o].tmr=setTimeout((i)=>{
      this.vibr(i);
      this[i].tmr=-1;
      if (this[i].rep===1)this.set(i); 
    },(diff-2000),o); 
  },
  clear: function(o){  
    clearTimeout(this[o].tmr);
    this[o].tmr=-1;
  },
  vibr: function(o){
    if (this.buzz!=-1) return; //do something here
	this.btn=1;
	var a=[200,300,100,80,100,80,100,80,100];
    digitalPulse(D16,1,a);
    this[o].on=1;
	this.now=o;
	this.buzz=setInterval((o)=>{
      digitalPulse(D16,1,a); 
    },15000);
  },
  snz: function(o){  
    if (this.buzz!=-1) {
    }
  },
  stop: function(o){  
    if (this.buzz!=-1) {
      clearInterval(this.buzz);
      this.buzz=-1;
      this[o].on=0;
	  this.now=-1;
      this.btn=1;
    }
  }
};
}
//main face
face[0]= {
  offms: 5000,
  g:w.gfx,
  pad:function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }, 
  init: function(){
    var d=(Date()).toString().split(' ');
    var t=(d[4]).toString().split(':');
    this.g.setColor(0,0);//header bck
    this.g.fillRect(0,0,239,38); 
    this.g.setColor(1,11);//header txt
    this.g.setFont("Vector",25);
	this.g.drawString("ALARMS",4,6); 
    this.g.setFont("Vector",32);
  	this.g.drawString(t[0]+":"+t[1],242-(this.g.stringWidth(t[0]+":"+t[1])),3); 
    this.g.flip();
	this.al1=-2;
	this.al2=-2;
	this.al3=-2;
	this.run=true; 
  },
  show : function(){
    if (!this.run) return;
    this.g.setFont("Vector",55);  
    if (alrm[1].tmr!=this.al1) {
      this.al1=alrm[1].tmr;
      this.c=15;
      if (this.al1!==-1) this.g.setColor(1,4);
      else { this.g.setColor(1,2); this.c=0;}
      if (alrm[1].on===1)  this.c=13;
      this.g.fillRect(0,39,239,104); //1
      this.g.setColor(0,this.c);
      this.g.drawString(this.pad(alrm[1].hour)+":"+this.pad(alrm[1].min),120-(this.g.stringWidth(this.pad(alrm[1].hour)+":"+this.pad(alrm[1].min)))/2,50); 
  	  this.g.flip();
      this.g.setColor(0,0);
      this.g.drawLine(0,105,239,105);
      this.g.drawLine(0,106,239,106);
   	  this.g.flip();
    }
    if (alrm[2].tmr!=this.al2) {
      this.al2=alrm[2].tmr;
	  this.c=15;
      if (this.al2!==-1) this.g.setColor(1,4);
      else { this.g.setColor(1,2); this.c=0;}
      if (alrm[2].on===1)  this.c=13;
      this.g.fillRect(0,107,239,172); //2
      this.g.setColor(0,this.c);
     this.g.drawString(this.pad(alrm[2].hour)+":"+this.pad(alrm[2].min),120-(this.g.stringWidth(this.pad(alrm[2].hour)+":"+this.pad(alrm[2].min)))/2,118); 
  	  this.g.flip();
      this.g.setColor(0,0);
      this.g.drawLine(0,173,239,173);
      this.g.drawLine(0,174,239,174);

   	  this.g.flip();
    } 
    if (alrm[3].tmr!=this.al3) {
      this.al3=alrm[3].tmr;
      this.c=15;
      if (this.al3!==-1) this.g.setColor(1,4);
      else { this.g.setColor(1,2); this.c=0;}
      if (alrm[3].on===1)  this.c=13;
      this.g.fillRect(0,175,239,239); //3
      this.g.setColor(0,this.c);
      this.g.drawString(this.pad(alrm[3].hour)+":"+this.pad(alrm[3].min),120-(this.g.stringWidth(this.pad(alrm[3].hour)+":"+this.pad(alrm[3].min)))/2,186); 
  	  this.g.flip();
    }
    this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
    },100,this);
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
  return true;
  },
  show : function(){
    face.go("clock",0);
    return true;
  },
   clear: function(){
  return true;
  }
};	
//setup face
face[5] = {
	offms: 5000,
	g:w.gfx,
	al:{
		1:{hour:0,min:0,rep:0,snz:0,on:0,set:0},
		2:{hour:0,min:0,rep:0,snz:0,on:0,set:0},
		3:{hour:0,min:0,rep:0,snz:0,on:0,set:0},
		curr:-1
	},
	pad:function pad(n) {
		return (n < 10) ? ("0" + n) : n;
	}, 
	init: function(o){
		this.al[o].hour=-1;
		this.al[o].min=-1;
		this.al[o].rep=-1;
		this.al[o].snz=-1;
		this.al.curr=o;
		var d=(Date()).toString().split(' ');
		var t=(d[4]).toString().split(':');
		this.g.setColor(0,0); //header
		this.g.fillRect(0,0,239,35); 
		this.g.setColor(1,11);
		this.g.setFont("Vector",25);
		this.g.drawString("SET AL"+this.al.curr,4,6); 
		this.g.setFont("Vector",32);
		this.g.drawString(t[0]+":"+t[1],242-(this.g.stringWidth(t[0]+":"+t[1])),3); 
		this.g.flip();
		this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (alrm[o].hour!=this.al[o].hour) {
		this.al[o].hour=alrm[o].hour;
		this.g.setColor(0,2);
		this.g.fillRect(0,39,121,181);//hour
		if (alrm[o].tmr!=-1) this.g.setColor(1,11);else this.g.setColor(1,15);
		this.g.setFont("Vector",75);  
		this.g.drawString(this.pad(this.al[o].hour),66-(this.g.stringWidth(this.pad(this.al[o].hour)))/2,70); 
		this.g.flip();
    }
    if (alrm[o].min!=this.al[o].min) {
		this.al[o].min=alrm[o].min;
		if (alrm[o].tmr!=-1){
			this.g.setColor(0,4);
			this.g.fillRect(122,39,239,181);//min
			this.g.setColor(1,11);
		}else {
			this.g.setColor(0,2);
			this.g.fillRect(122,39,239,181);//min
			this.g.setColor(1,15);
		}
	this.g.setFont("Vector",75);  
	this.g.drawString(this.pad(this.al[o].min),190-(this.g.stringWidth(this.pad(this.al[o].min)))/2,70); 
	this.g.flip();
    }
    if (alrm[o].snz!=this.al[o].snz) {
		this.al[o].snz=alrm[o].snz;
		this.c=0;
		if (this.al[o].snz===1)  { this.g.setColor(0,4);this.c=15;}
		else this.g.setColor(0,2); 
		this.g.fillRect(0,185,120,239);//snooze
		this.g.setColor(1,this.c);
		this.g.setFont("Vector",25);  
		this.g.drawString("SNOOZE",4,202); 
		this.g.flip();
		this.g.setColor(0,2);
		this.g.drawLine (121,185,121,239);
		this.g.flip();
    }
    if (alrm[o].rep!=this.al[o].rep) {
		this.al[o].rep=alrm[o].rep;
		this.c=0;
		if (this.al[o].rep===1) { this.g.setColor(0,4);this.c=15;}
		else this.g.setColor(0,2); 
		this.g.fillRect(122,185,239,239);//repeat
		this.g.setColor(1,this.c);
		this.g.setFont("Vector",25);  
		this.g.drawString("REPEAT",130,202); 
		this.g.flip();
    }
    this.tid=setTimeout(function(t){
		t.tid=-1;
		t.show(o);
    },100,this);
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
//touch main
touchHandler[0]=function(e,x,y){
    if (e==5){
	   if(39<y&&y<105&&alrm[1].on!==1) {
		 if (alrm[1].tmr===-1) alrm.set(1); else alrm.clear(1);
		 buzzer.nav([30,50,30]);
	   }else if(105<y&&y<174&&alrm[2].on!==1) {
		 if (alrm[2].tmr===-1) alrm.set(2); else alrm.clear(2);
	     buzzer.nav([30,50,30]);
	   }else if(174<y&&y<239&&alrm[3].on!==1) {
		 if (alrm[3].tmr===-1) alrm.set(3); else alrm.clear(3);
	     buzzer.nav([30,50,30]);
	   }else buzzer.nav(40);
    }else if  (e==1){
		//face.go("alarm",-1);return;
  	  	if (face.faceSave!=-1) {
			  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else
			face.go("clock",0);
		return;
    }else if  (e==2){
	  if (y>200&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer.nav([30,50,30]);
      }else {face.go("settings",0);return;}
    }else if  (e==3){
	  if(39<y&&y<105) {
		if(alrm[1].on===1) {alrm.stop(1);face[0].al1=-2;}
		else {face.go("alarm",5,1);return;}
	  }else if(105<y&&y<174) {
		if(alrm[2].on===1) {alrm.stop(2);face[0].al2=-2;}
		else {face.go("alarm",5,2);return;}
      }else if(174<y&&y<239) {
		if(alrm[3].on===1) {alrm.stop(3);face[0].al3=-2;}
		else {face.go("alarm",5,3);return;}
	  }else buzzer.nav(40);    
    }else if  (e==4){
		face.go("settings",0,1);return;
	//face.go(face.appPrev, face.pagePrev);
    }else if  (e==12){		
	  if(39<y&&y<105) {
		if(alrm[1].on===1) {alrm.stop(1);face[0].al1=-2;}
		else {face.go("alarm",5,1);return; }
        buzzer.nav([30,50,30]);
	  }else if(105<y&&y<174) {
		if(alrm[2].on===1) {alrm.stop(2);face[0].al2=-2;}
		else {face.go("alarm",5,2);return;}
        buzzer.nav([30,50,30]);
      }else if(174<y&&y<239) {
		if(alrm[3].on===1) {alrm.stop(3);face[0].al3=-2;}
		else {face.go("alarm",5,3);return;}
        buzzer.nav([30,50,30]);
	  }else buzzer.nav(40);    
    }
    this.timeout();
};
//setup 
touchHandler[5]=function(e,x,y){
	var a=face[5].al.curr;
    if (e==5){
		if (y>185){
		  if(0<x&&x<120) alrm[a].snz=1-alrm[a].snz;	
		  else if(121<x&&x<239) alrm[a].rep=1-alrm[a].rep;
		  buzzer.nav([30,50,30]);		
        }else	buzzer.nav(40);	
    }else if (e==2){
	  if (y>200&&x<80) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer.nav([30,50,30]);
      }else if(x<30&&y<200) { 
   		alrm[a].hour=alrm[a].hour+3;
		if (alrm[a].hour>23) alrm[a].hour=alrm[a].hour-24;
      }else  if(30<x&&x<120&&y<200) { 
   		alrm[a].hour++;
		if (alrm[a].hour>23) alrm[a].hour=alrm[a].hour-24;
      }else if(120<x&&x<210&&y<200){ 
        alrm[a].min=alrm[a].min+10;
		if (alrm[a].min>59) {alrm[a].min=alrm[a].min-60; alrm[a].hour=alrm[a].hour+1;}
      } else if(x>=210&&y<200){ 
		alrm[a].min++;
		if (alrm[a].min>59) {alrm[a].min=alrm[a].min-60; alrm[a].hour=alrm[a].hour+1;}
//      }else if (y>200) {
//		face.go("settings",0);return;
	  } else buzzer.nav(40);
    }else if  (e==1){
	  if(x<30&&y<185) { 
   		alrm[a].hour=alrm[a].hour-3;
		if (alrm[a].hour<0) alrm[a].hour=alrm[a].hour+24;
      }else  if(30<x&&x<120&&y<185) { 
   		alrm[a].hour--;
		if (alrm[a].hour<0) alrm[a].hour=alrm[a].hour+24;
      }else if(120<x&&x<210&&y<185){ 
        alrm[a].min=alrm[a].min-10;
		if (alrm[a].min<0){alrm[a].min=alrm[a].min+60; alrm[a].hour=alrm[a].hour-1;}
      } else if(x>=210&&y<185){ 
		alrm[a].min--;
		if (alrm[a].min<0) {alrm[a].min=alrm[a].min+60; alrm[a].hour=alrm[a].hour-1;}
      }else	buzzer.nav(40);	
    }else if  (e==3){
      buzzer.nav(40);
    }else if  (e==4){
	  face.go("alarm",0);return;
    }else if  (e==12){
      alrm[a].hour=Date().getHours();
      alrm[a].min=Date().getMinutes();
      buzzer.nav([80,60,80]); 
    }
	if (alrm[a].tmr!==-1){alrm.clear(a); 
        alrm.set(a);
    }
    this.timeout();
};
 