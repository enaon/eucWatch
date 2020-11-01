//main
face[0] = {
  offms: 3000,
  g:w.gfx,
  init: function(){
    this.startTime=getTime();
    this.v=w.battVoltage(1);
    //top
    pal[0]=col("black");
    this.g.setColor(1,col("lgray"));
    this.g.fillRect(0,0,158,50); //date
    this.g.fillRect(162,0,239,50);//batt
    if (face.pagePrev!=2){this.g.fillRect(0,55,100,150);}
    this.g.setColor(0,col("black"));
    this.g.flip();
    this.wupd=1;
    this.bt=-1;
    this.nCall=-1;
    this.nIm=-1;
    this.nInfo=-1;
    this.hour=-1;
    this.min=-1;
    this.sec=-1;
    this.mem=-1;
	this.ring=-1;
    this.run=true;
	this.batt=-1;
    print("exit init",getTime()-this.startTime);

  },
  show : function(){
    if (!this.run) return;
    print("enter show",getTime()-this.startTime);

	//time
    print("enter  time",getTime()-this.startTime);
 	this.time();
    print(" exit time",getTime()-this.startTime);

	//bt status on date
    if (notify.ring){
   	  if (this.ring!=notify.ring){
	  this.bt=-1;
//	  this.g.setColor(0,col("raf3"));
      this.g.setColor(0,2220);
        this.g.fillRect(0,0,158,50); //date
      this.g.setColor(1,col("white"));
	  this.g.setFont("Vector",22);
	  this.g.drawString("MUTE",68,15);
	  //mute
	  this.g.drawImage(image("phoneMute"),15,9);
	  this.g.flip();
	  }
    }else if (set.bt != this.bt){
	  this.bt=set.bt;
	  this.ring=0;
      var colbt=colo.bck1;
      if (this.bt==3)  colbt=colo.bck3;
//      else if (this.bt==4)  colbt=col("blue");
      else if (this.bt==4)  colbt=143;
      else if (this.bt==2)  colbt=colo.btnSt;
      this.g.setColor(0,colbt);
	  this.g.fillRect(0,0,158,50); //date
      this.g.setColor(1,colo.txt1);
      this.g.setFont("Vector",35);
	  if (this.bt==0&&!set.def.cli&&!set.def.atc&&!set.def.hid&&!set.def.gb) {
	    this.g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (81-(this.g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,9); //date
	    this.g.flip();
	  }else {
        this.g.setFont("Vector",32);
	    this.g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (90-(this.g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,10); //date
		this.g.flip();
	    this.g.setColor(0,colbt);
		this.g.fillRect(0,0,15,50); //date
//		var colbtf=col("white");
        var colbtf=4095;
//        if (set.bt==0) colbtf=col("black");
        if (set.bt==0) colbtf=0;
        this.g.setColor(1,colbtf);
		this.g.drawImage(E.toArrayBuffer(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA==")),3,13);
		this.g.flip();
	  }  
     print("exit bt",getTime()-this.startTime);

    }
    //batt status
    if (notify.ring){
	  if (this.ring!=notify.ring){
	    this.g.setColor(0,col("olive"));
	    this.g.fillRect(162,0,239,50);//batt
        this.g.setColor(1,col("white"));
		this.g.drawImage(image("phoneMute"),183,9);
	    this.g.flip();
	  }
    }else if (notify.New&&(this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm)){
      this.batt=set.ondc;
	  if (notify.nCall)  {
        this.colf=col("white");this.colb=col("red");this.str=notify.nCall;this.bs="nCall";
        this.img = image("calls");
	  }else if (notify.nIm)  {
		this.colf=col("white");this.colb=col("raf");this.str=notify.nIm;this.bs="nIm";
        this.img = image("messages");
	  }else if (notify.nInfo)  {
		this.colf=col("white");this.colb=col("olive");this.str=notify.nInfo;this.bs="nInfo";
        this.img = image("infos");
	  }else { this.batt=-1; this.bs=0;}
	  this.g.setColor(0,this.colb);
	  this.g.fillRect(162,0,239,50);//batt
      this.g.setColor(1,this.colf);
	  this.g.drawImage(this.img,170,12);
	  this.img=-1;
	  if (this.str>9) {
		this.g.setFont("7x11Numeric7Seg",3);
		this.g.drawString("9",200,9);
       this.g.setFont("Vector",25);
        this.g.drawString("+",225,14);
	  }else{
		this.g.setFont("7x11Numeric7Seg",3);
		this.g.drawString(this.str,210,9);
      }
      this.g.flip();
    }else if (this.batt!=set.ondc ){
      this.batt=set.ondc;
      this.v=w.battVoltage(1);
      if (this.batt==1) this.g.setColor(0,colo.btnSt);
      else if (this.v<=20) this.g.setColor(0,col("red"));
      else this.g.setColor(0,col("olive"));
      this.g.fillRect(162,0,239,50);//batt
      this.g.setColor(1,colo.txt1);
      if (this.v<0) {this.g.setFont("Vector",21);this.g.drawString("EMPTY",240-(this.g.stringWidth("EMPTY")),14); 
	  }else if (this.v<100) {this.g.setFont("Vector",32);this.g.drawString(this.v,210-(this.g.stringWidth(this.v)),10);
		this.g.drawImage(require("heatshrink").decompress(atob("jEYwIEBngCDg//4EGgFgggCZgv/ASUEAQQaBHYPgJYQ=")),212,12);
        //this.g.drawImage(this.image("batteryMed"),212,12);
	  }else  {this.g.setFont("Vector",28);this.g.drawString("FULL",238-(this.g.stringWidth("FULL")),12); } 
      this.g.flip();
      print("end",getTime()-this.startTime);
    }
    this.widg();
    //loop
    this.tid=setTimeout(function(t){
    t.tid=-1;
    t.show();
    },200,this);
  },
  widg:function(){
    //push-(wip)   
	if (notify.ring){
	if (this.ring!=notify.ring){
	  this.ring=notify.ring;this.g.setColor(0,col("black"));this.g.clearRect(0,151,239,239);this.g.setColor(1,col("white"));
      this.g.setFont("Vector",26);
      this.g.drawString((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name,122-(this.g.stringWidth((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name))/2,168); //Name
	  this.g.drawString((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number,122-(this.g.stringWidth((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number))/2,210); //Number
	  this.g.flip();
	}
	}else if (this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm) {
      this.nInfo=notify.nInfo;this.nCall=notify.nCall;this.nIm=notify.nIm;this.New=notify.New;
      if (notify.nCall||notify.nIm||notify.nInfo){
		this.g.setColor(0,col("black"));
		this.g.clearRect(0,151,239,239);		  
        if (this.nCall)  {this.msg=JSON.parse(notify.call[0]);this.cf=col("red");}
	    else if (this.nIm)  {this.msg=JSON.parse(notify.im[0]);this.cf=col("lblue");}
        else if (this.nInfo)  {this.msg=JSON.parse(notify.info[0]);this.cf=col("raf2");}
	    this.g.setColor(1,col("white"));//
	    this.g.setFont("Vector",27);
	    this.g.drawString((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title,122-(this.g.stringWidth((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title))/2,168); //info
	    this.g.drawString((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body,122-(this.g.stringWidth((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body))/2,210); //info
		this.msg=-1;
	    this.g.flip();
      }else if (this.wupd&&notify.weather&&!this.New){
		//this.widp=1;
		this.wupd=0;  	
		this.g.setColor(0,col("black"));
		this.g.clearRect(0,151,239,239);
		this.g.setColor(1,col("white"));//
		this.g.setFont("Vector",25);
		this.g.drawString(notify.weather.txt,119-(this.g.stringWidth(notify.weather.txt))/2,165); //info
		//temp
		this.g.drawImage(image("weatherTemp"),20,200);
		this.g.drawString(notify.weather.temp/10,60,205); //info
		//hum   
		this.g.drawImage(image("weatherHum"),145,200);
		this.g.drawString(notify.weather.hum,190,205); //info
		this.g.flip();
		this.img=-1;
	  }else {
//		this.g.setColor(1,col("raf2"));
		this.g.setColor(0,col("black"));
		this.g.fillRect(0,151,239,239);
		this.g.flip();
	  }
    }
  },
  time:function(){
  //minutes
        print("pre time get ",getTime()-this.startTime);

  this.d=(Date()).toString().split(' ');
  this.t=(this.d[4]).toString().split(':');
  this.s=(this.t[2]).toString().split('');
            print("post time get ",getTime()-this.startTime);

  if (this.t[1]!=this.min ){
    this.min=this.t[1];
    this.g.setFont("Vector",66);
	this.fmin=colo.txt1;
    this.fsec=col("black");
	if (global.alrm) {
    if (alrm.buzz!=-1) {this.bmin=col("gray");this.fmin=col("yellow");this.fsec=col("gray");this.bsec=col("yellow");}
    else if (alrm[1].tmr!==-1||alrm[2].tmr!==-1||alrm[3].tmr!==-1) {this.bmin=colo.btnEn;this.bsec=colo.btnEn;}
    else  {this.bmin=col("raf2");this.fsec=col("dgray1");this.bsec=col("raf2");}
	}else {this.bmin=col("raf2");this.fsec=col("dgray1");this.bsec=col("raf2");}
	this.g.setColor(0,this.bmin);
    this.g.fillRect(105,55,210,150);
	this.g.setColor(1,this.fmin);
    this.g.drawString(this.t[1],120,72);
    this.g.flip();
  }
   //seconds
  this.g.setColor(0,this.bsec);
  this.g.fillRect(210,55,240,150);
  this.g.setColor(1,this.fsec);//
  this.g.setFont("Vector",35);
  this.g.drawString(this.s[0],218,70); //seconds
  this.g.drawString(this.s[1],218,108); //seconds
  this.g.flip(); 
  //hours
  if (this.t[0]!=this.hour){
    this.hour=this.t[0];
    this.g.setColor(0,colo.bck1);
    this.g.fillRect(0,55,100,150);
    this.g.setColor(1,colo.txt);
    this.g.setFont("Vector",66);
    this.g.drawString(this.t[0],15,72); //hours
  this.g.flip();
  }
	  
  },
  tid:-1,
  run:false,
  clear : function(){
    pal[0]=colo.bck0;
    this.g.clear();
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
//
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
	if (Boolean(require("Storage").read("euc"))) {face.go("euc",0);}
	else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);}  
	return true;
  },
  clear: function(){
  return true;
  },
  off: function(){
    this.g.off();
  }
};	
//
face[2] = {
  offms:2000,
  g:w.gfx,
  init: function(){ 
    face[0].hour=-1;
    face[0].min=-1;
    this.run=true; 
	this.g.setColor(0,col("black"));
    this.g.fillRect(0,0,239,239);
    this.g.flip();
	//push-(wip)    
  if (notify.New) {
	if (notify.nCall)  {this.msg=JSON.parse(notify.call[0]);this.cf=col("red");}
	else if (notify.nIm)  {this.msg=JSON.parse(notify.im[0]);this.cf=col("lblue");}
	else if (notify.nInfo)  {this.msg=JSON.parse(notify.info[0]);this.cf=col("raf2");}
   	this.g.setColor(0,col("black"));
	this.g.setColor(1,this.cf);//
	this.g.setFont("Vector",27);
	if (this.msg.title.length>16) this.msg.title=this.msg.title.substr(0,13)+"...";
	this.g.drawString(this.msg.title,122-(this.g.stringWidth(this.msg.title))/2,168); //info	
	this.msg=-1;
	this.g.flip();
	this.g.flip();
	this.g.flip();
  }
  },
  show : function(){
  if (!this.run) return;
  face[0].time();  
  //loop
  this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
  },1000,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    pal[0]=colo.bck0;
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
//touch
touchHandler[0]=function(e,x,y){
    var p=D16;
    if (e==5){
	  if (x<158 && y<50){//date
		if (notify.ring){
			digitalPulse(p,1,[30,50,30]);
			set.gbSend({t:"call",n:"ignore"});notify.ring=0;
		}else  digitalPulse(p,1,40);
	  }else if (x>105 && (55<y&&y<150)){ 
	     digitalPulse(D16,1,[30,50,30]);
		if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);return;}
	//hid music controls
      }else if (x>158 && y<50){//batt
		if (notify.ring){
			digitalPulse(D16,1,[30,50,30]);
			set.gbSend({t:"call",n:"accept"});notify.ring=0;
		}else if (face[0].bs){
			notify[face[0].bs]=0;
			if (!notify.nInfo&&!notify.nCall&&!notify.nIm) {face[0].batt=-1;face[0].bs=0;notify.New=0;}
			digitalPulse(D16,1,[30,50,30]);
		}else if (set.hidM){
			digitalPulse(D16,1,[30,50,30]);
			if (Boolean(require("Storage").read("hid"))) {face.go("hid",0);return;}
		}else digitalPulse(D16,1,40);
	  }else if (y>151&&face[0].bs){ 
		if (Boolean(require("Storage").read("notify"))) {
          digitalPulse(D16,1,[30,50,30]);	
          face.go("notify",5,face[0].bs.substr(1).toLowerCase());return;
		}else digitalPulse(D16,1,40);
	  }else digitalPulse(D16,1,40);
    }else if  (e==1){
		face.go("main",-1);return;
    }else if  (e==2){
		if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
     }else if (y>190) {
		if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
		if (Boolean(require("Storage").read("euc"))) {face.go("euc",0);return;}
		else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);return;}
    }else if  (e==4){
		if (Boolean(require("Storage").read("notify"))) {face.go("notify",0);return;}
    }else if  (e==12){
	if (150<y&&y<200){ 	
		digitalPulse(D16,1,180);
		notify.New=0;notify.nInfo=0;notify.nCall=0;notify.nIm=0;notify.nMail=0;
	}else if (x>162 && y>200){ 
      digitalPulse(D16,1,40);
	//alarms
     }else if (x>105 && (55<y&&y<150)&&global.alrm){ 
	   if (alrm.buzz!=-1) {
		alrm.stop(alrm.now); digitalPulse(D16,1,[80,40,80]);
	   }else {
        digitalPulse(D16,1,[30,50,30]);
		if (global.alrm){face.go("alarm",0);return;}
	   }	  
     }else digitalPulse(D16,1,40);
    }
   this.timeout();
};

touchHandler[2]=function(e,x,y){
    digitalPulse(D16,1,[30,50,30]);
    face.go("main",0);return;
};

