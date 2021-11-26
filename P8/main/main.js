//main
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	g:w.gfx,
	init: function(){
		this.g.clear();
		this.startTime=getTime();
		this.v=w.batt(1);
		//top
		this.g.setColor(1,1);
		this.g.fillRect(0,0,158,50); //date
		this.g.fillRect(162,0,239,50);//batt
		if (face.pagePrev!=2){this.g.fillRect(0,55,100,150);}
		this.g.setColor(0,0);
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
	},
	show : function(){
		if (!this.run) return;
		//time
		this.time();
		//bt status on date
		if (notify.ring){
			if (this.ring!=notify.ring){
				this.bt=-1;
				this.g.setColor(0,2220);
				this.g.fillRect(0,0,158,50); //date
				this.g.setColor(1,15);
				this.g.setFont("Vector",22);
				this.g.drawString("MUTE",68,15);
				//mute
				this.g.drawImage( require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA==")),15,9);
				this.g.flip();
			}
		}else if (set.bt != this.bt){
			this.bt=set.bt;
			this.ring=0;
			var colbt=1;
			if (this.bt==3)  colbt=5;
			else if (this.bt==4)  colbt=4;
			else if (this.bt==2)  colbt=9;
			this.g.setColor(0,colbt);
			this.g.fillRect(0,0,158,50); //date
			this.g.setColor(1,14);
			this.g.setFont("Vector",35);
			if (this.bt==0&&!set.def.cli&&!set.def.emuZ&&!set.def.hid&&!set.def.gb) {
				this.g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (81-(this.g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,9); //date
				this.g.flip();
			}else {
				this.g.setFont("Vector",32);
				this.g.drawString(this.d[2]+" "+this.d[0].toUpperCase(), (90-(this.g.stringWidth(this.d[2]+" "+this.d[0].toUpperCase()))/2) ,10); //date
				this.g.flip();
				this.g.setColor(0,colbt);
				this.g.fillRect(0,0,15,50); //date
				var colbtf=15;
				if (set.bt==0) colbtf=3;
				this.g.setColor(1,colbtf);
				this.g.drawImage(E.toArrayBuffer(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA==")),3,13);
				this.g.flip();
			}  
		}
		//batt status
		if (notify.ring){
			if (this.ring!=notify.ring){
				this.g.setColor(0,5);
				this.g.fillRect(162,0,239,50);//batt
				this.g.setColor(1,15);
				this.g.drawImage(require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA==")),183,9);
				this.g.flip();
			}
		}else if (notify.New&&(this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm)){
			this.batt=set.ondc;
			if (notify.nCall)  {
				this.colf=15;this.colb=7;this.str=notify.nCall;this.bs="nCall";
				this.img =  require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA=="));
			}else if (notify.nIm)  {
				this.colf=15;this.colb=4;this.str=notify.nIm;this.bs="nIm";
				this.img = require("heatshrink").decompress(atob("jEYwIPMv///wCFj///EP//w4f/4fw/8P/F+j/+jATBwP/BoICBAA4mIHZAA="));
			}else if (notify.nInfo)  {
				this.colf=15;this.colb=12;this.str=notify.nInfo;this.bs="nInfo";
				this.img = require("heatshrink").decompress(atob("jEYwIHEv0AgP/wEH//gh//+Ef8/4j/D/E/4/8n///l///+v/nAQPDARM/4YXBAQIgCEwQsCGQQ4CHwQACA=="));
			}else { this.batt=-1; this.bs=0;}
			this.g.setColor(0,this.colb);
			this.g.fillRect(162,0,239,50);//batt
			this.g.setColor(1,this.colf);
			this.g.drawImage(this.img,170,12);
			this.img=-1;
			if (this.str>9) {
				this.g.setFont("Vector",32);
				//this.g.setFont("7x11Numeric7Seg",3);
				this.g.drawString("9",200,10);
				this.g.setFont("Vector",28);
				this.g.drawString("+",225,14);
			}else{
				this.g.setFont("Vector",32);
				//this.g.setFont("7x11Numeric7Seg",3);
				this.g.drawString(this.str,210,10);
			}
			this.g.flip();
		}else if (this.batt!=set.ondc ){
			this.batt=set.ondc;
			this.v=w.batt(1);
			if (this.batt==1) this.g.setColor(0,9);
			else if (this.v<=20) this.g.setColor(0,7);
			else this.g.setColor(0,5);
			this.g.fillRect(162,0,239,50);//batt
			this.g.setColor(1,14);
			if (this.v<0) {this.g.setFont("Vector",21);this.g.drawString("EMPTY",240-(this.g.stringWidth("EMPTY")),14); 
			}else if (this.v<100) {
				this.g.setFont("Vector",32);
				this.g.drawString(this.v,210-(this.g.stringWidth(this.v)),10);
				this.g.drawImage((this.batt==1)?require("heatshrink").decompress(atob("jEYwIKHiACEnACHvACEv/AgH/AQcB/+AAQsAh4UBAQUOAQ8EAQgAEA==")):require("heatshrink").decompress(atob("jEYwIEBngCDg//4EGgFgggCZgv/ASUEAQQaBHYPgJYQ=")),212,12);
				//this.g.drawImage(this.image("batteryMed"),212,12);
			}else  {
				this.g.setFont("Vector",28);
				this.g.drawString("FULL",238-(this.g.stringWidth("FULL")),12); 
			} 
			this.g.flip();
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
			this.ring=notify.ring;this.g.setColor(0,0);this.g.clearRect(0,151,239,239);this.g.setColor(1,15);
			this.g.setFont("Vector",26);
			this.g.drawString((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name,122-(this.g.stringWidth((notify.in.name.length>16)?notify.in.name.substr(0,13)+"...":notify.in.name))/2,168); //Name
			this.g.drawString((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number,122-(this.g.stringWidth((notify.in.number.length>16)?notify.in.number.substr(0,13)+"...":notify.in.number))/2,210); //Number
			this.g.flip();
		}
		}else if (this.nCall!=notify.nCall||this.nInfo!=notify.nInfo||this.nIm!=notify.nIm) {
			this.nInfo=notify.nInfo;this.nCall=notify.nCall;this.nIm=notify.nIm;this.New=notify.New;
			if (notify.nCall||notify.nIm||notify.nInfo){
				this.g.setColor(0,0);
				this.g.clearRect(0,151,239,239);		  
				if (this.nCall)  {this.msg=JSON.parse(notify.call[0]);this.cf=7;}
				else if (this.nIm)  {this.msg=JSON.parse(notify.im[0]);this.cf=14;}
				else if (this.nInfo)  {this.msg=JSON.parse(notify.info[0]);this.cf=5;}
				this.g.setColor(1,15);//
				this.g.setFont("Vector",25);
				this.g.drawString((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title,122-(this.g.stringWidth((this.msg.title.length>16)?this.msg.title.substr(0,13)+"...":this.msg.title))/2,168); //info
				this.g.drawString((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body,122-(this.g.stringWidth((this.msg.body.length>16)?this.msg.body.substr(0,13)+"...":this.msg.body))/2,210); //info
				this.msg=-1;
				this.g.flip();
			}else if (this.wupd&&notify.weather&&!this.New){
			//this.widp=1;
				this.wupd=0;  	
				this.g.setColor(0,0);
				this.g.clearRect(0,151,239,239);
				this.g.setColor(1,15);//
				this.g.setFont("Vector",25);
				this.g.drawString(notify.weather.txt,119-(this.g.stringWidth(notify.weather.txt))/2,165); //info
				//temp
				this.g.drawImage(E.toArrayBuffer(atob("EyCBAADgAH8AH/AH3wDg4BwcA4GAcDAOBgHAwDuYB3MA7mAdzAO5gHcwHucHnPHjjzj45j+Pz/n5/z8/5+f8/H8dx8c8AOPAeD9+Af+AD4A=")),20,200);
				this.g.drawString(Math.round(notify.weather.temp-273),60,205);
				//hum   
				this.g.drawImage(E.toArrayBuffer(atob("HSCBAAAAAAAAEAAAAcAAAB8AAAD4AAAP4AAA94AABxwAAHjwAAODgAA4DgADwHgAHAHAAcAHAB4APADgAOAOGAOAYQQMBwhAcDhUA4HAIBwOAoDgcCCHAYAgMA4AA4BwABwBwAHAB4AcAB4DwAB//AAA/4AAAEAA")),145,200);
				this.g.drawString(notify.weather.hum,190,205); //info
				this.g.flip();
				this.img=-1;
			}else {
				this.g.setColor(0,0);
				this.g.fillRect(0,151,239,239);
				this.g.setColor(1,15);//
				this.mac=(this.mac)?this.mac:set.read("dash","slot"+set.read("dash","slot")+"Mac");
				if(!this.mac) {
						this.g.setFont("Vector",25);
						this.g.drawString("eucWatch",119-(this.g.stringWidth("eucWatch")/2),170); 
						this.g.setFont("Vector",20);
						this.g.drawString("Hold side Btn to Scan",119-(this.g.stringWidth("Hold side Btn to Scan")/2),215); 
						this.g.flip();
				}else {
					this.g.setFont("Vector",35);
					//this.g.drawString(euc.dash.maker,119-(this.g.stringWidth(euc.dash.maker)/2),170)); 
					this.g.drawString(set.def.name,119-(this.g.stringWidth(set.def.name)/2),155);
					this.g.setFont("Vector",30);
					if (euc.state !== "OFF") {
						this.g.drawString(euc.state,119-(this.g.stringWidth(euc.state)/2),215); //
					} else 	{
						this.tot=0;
						require('Storage').list("logYearSlot").forEach(logfile=>{
							this.log=require("Storage").readJSON(logfile,1);
							for (var key in this.log) {
								this.tot += this.log[key];
							}
						});
						if (set.def.dash.tot) this.tot += Number(set.def.dash.tot);
						this.tot=Math.round(this.tot);
						if (3<this.tot.toString().length) 
                this.tot=this.tot.toString().substring(0,this.tot.toString().length-3)+","+this.tot.toString().substring(this.tot.toString().length-3, this.tot.toString().length);
						this.g.setFont("Vector",40);
						this.g.drawString(this.tot+" "+((set.def.dash.mph)?"mi":"Km"),119-(this.g.stringWidth(this.tot+" "+((set.def.dash.mph)?"mi":"Km"))/2),200); 
					}
					this.g.flip();
				}
			}
		}
	
	},
	time:function(){
		//minutes
		this.d=(Date()).toString().split(' ');
		this.t=(this.d[4]).toString().split(':');
		this.s=(this.t[2]).toString().split('');
		if (this.t[1]!=this.min ){
			this.min=this.t[1];
			this.g.setFont("Vector",73);
			this.fmin=14;
			this.fsec=0;
			if (global.alrm) {
				if (alrm.buzz!=-1) {this.bmin=1;this.fmin=13;this.fsec=13;this.bsec=1;}
				else if (alrm[1].tmr!==-1||alrm[2].tmr!==-1||alrm[3].tmr!==-1) {this.bmin=5;this.fsec=15;this.bsec=5;}
				else  {this.bmin=1;this.fsec=15;this.bsec=1;}
			}else {this.bmin=1;this.fsec=15;this.bsec=1;}
			this.g.setColor(0,this.bmin);
			this.g.fillRect(96,55,203,150);
			this.g.setColor(1,this.fmin);
			this.g.drawString(this.t[1],107,69);
			this.g.flip();
		}
		//seconds
		this.g.setColor(0,this.bsec);
		this.g.fillRect(203,55,240,150);
		this.g.setColor(1,this.fsec);//
		this.g.setFont("Vector",18);
		let sec=(set.def.hr24)?"24H":(this.t[0]<12)?"AM":"PM";
		this.g.drawString(sec,241-(this.g.stringWidth(sec)),74); //hours mode
		this.g.setFont("Vector",30);
		this.g.drawString(this.s[0]+this.s[1],206,101); //seconds

		this.g.flip(); 
		//hours
		if (this.t[0]!=this.hour){
			this.hour=this.t[0];
			this.g.setColor(0,this.bmin);
			this.g.fillRect(0,55,95,150);
			this.g.setColor(1,15);
			this.g.setFont("Vector",73);
			if (set.def.hr24) {
				this.g.drawString(this.hour,0,69); //hours
			} else {	
				this.hour=(this.hour<10)?(this.hour=="00")?12:this.hour[1]:(this.hour<13)?this.hour:this.hour-12;
				this.g.drawString(this.hour,(this.hour<10)?45:0,69); //hours
			}
			this.g.fillRect(91,90,95,94);
			this.g.fillRect(91,110,95,114);
			this.g.flip();
		}
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
//
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		if (Boolean(require("Storage").read(set.dash[set.def.dash.face]))) {
			(euc.state=="OFF")?face.go("dashOff",0):face.go(set.dash[set.def.dash.face],0);
			return;
		}
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

//touch
touchHandler[0]=function(e,x,y){
    var p=D16;
    if (e==5){
	  if (x<158 && y<50){//date
		if (notify.ring){
			buzzer(p,1,[30,50,30]);
			set.gbSend({t:"call",n:"ignore"});notify.ring=0;
		}else  buzzer(p,1,40);
	  //batt notifications dismiss
	  }else if (x>158 && y<50){//batt
		if (notify.ring){
			buzzer([30,50,30]);
			set.gbSend({t:"call",n:"accept"});notify.ring=0;
		}else if (face[0].bs){
			if (Boolean(require("Storage").read("notify"))) {
				buzzer([30,50,30]);	
				face.go("notify",5,face[0].bs.substr(1).toLowerCase());return;
			}else buzzer(40);
		}else if (set.hidM){
			buzzer([30,50,30]);
			if (Boolean(require("Storage").read("hid"))) {face.go("hid",0);return;}
		}else buzzer(40);
	  }else if (y>151&&face[0].bs){ 
			notify[face[0].bs]=0;
			if (!notify.nInfo&&!notify.nCall&&!notify.nIm) {face[0].batt=-1;face[0].bs=0;notify.New=0;}
			buzzer([30,50,30]);
	  }else buzzer(40);
	  
    }else if  (e==1){
		if (global.euc&&euc.state!="OFF")
			face.go(set.dash[set.def.dash.face],0);
		else
			face.go("main",-1);
		return;
    }else if  (e==2){
		if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer([30,50,30]);
     }else //if (y>160) {
		if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
	  //} else buzzer(40);
    }else if  (e==3){
		if (Boolean(require("Storage").read(set.dash[set.def.dash.face]))) {
			(euc.state=="OFF")?face.go("dashOff",0):face.go(set.dash[set.def.dash.face],0);
			//face.go(set.dash[set.def.dash.face],0);
			return;
		}else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);return;}
    }else if  (e==4){
		if (Boolean(require("Storage").read("notify"))) {face.go("notify",0);return;}
		else buzzer(40);
    }else if  (e==12){
	if (150<y&&y<200){ 	
		buzzer(180);
		notify.New=0;notify.nInfo=0;notify.nCall=0;notify.nIm=0;notify.nMail=0;
	}else if (x>162 && y>200){ 
      buzzer(40);
	//24 hour
	}else if (x<100 && 55<y && y<150){ 
		if (set.def.hr24==undefined) set.def.hr24=0;
		set.def.hr24=1-set.def.hr24;
		face[0].hour=-1;
		buzzer(100);
	//alarms
     }else if (x>105 && (55<y&&y<150)&&global.alrm){ 
	   if (alrm.buzz!=-1) {
		alrm.stop(alrm.now); buzzer([80,40,80]);
	   }else {
        buzzer([30,50,30]);
		if (global.alrm){face.go("alarm",0);return;}
	   }	  
     }else buzzer(40);
    }
   this.timeout();
};
