//settings	
face[0] = {
  offms: 3000,
  g:w.gfx,
  init: function(){
	if (face.faceSave==-1) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
    this.cli=-1;this.bt=-1;this.gb=-1;this.hid=-1;this.atc=-1;this.bri=-1;this.acc=-1;this.dnd=-1;this.sys=1;this.btn2=1;this.fmp=-1;
    var d=(Date()).toString().split(' ');
    var t=(d[4]).toString().split(':');	
      pal[0]=col("black");
      if(!face.mode) this.g.setColor(1,col("gray")); else this.g.setColor(1,col("raf2"));
      this.g.fillRect(0,0,75,75);//1
      this.g.fillRect(80,0,155,75); //2
      this.g.fillRect(160,0,239,75); //3
      this.g.fillRect(0,80,75,155); //4
      this.g.fillRect(80,80,155,155); //5
      this.g.fillRect(160,80,239,155);//6
      this.g.flip();
    //bottom
    this.g.setColor(0,col("black"));
    pal[0]=col("black");
    this.g.setColor(1,col("lblue"));
    this.g.drawImage(image("calc"),177,175);
	this.g.drawImage(image("torch"),11,173);
   	this.g.drawImage(image("info"),94,175);
    //info
    this.g.flip();
    this.run=true;
  },
//main loop
  show : function(){
    if (!this.run) return;
    //torch
    if (this.tor==1) {
      this.g.setColor(0,colo.txt);
      this.g.fillRect(0,0,239,239); 
      this.g.setColor(1,col("lblue"));
      this.g.drawImage(image("torch"),50,30,{scale:3});
      this.g.flip();
      this.appImgNone=0;
      this.btSetOn=1;
      return;
    }else if (face.mode) {
      if (!this.appImgNone) if (Boolean(require('Storage').read('w_apps'))) eval(require('Storage').read('w_apps')); 
	}else if(this.btSet){
      if(this.btSetOn){
        this.btSetOn=0;
        this.g.setColor(1,col("blue"));
        this.g.fillRect(0,0,155,75);//title
        this.g.setColor(0,col("white"));
        //bt
        this.g.drawImage(image("bt"),54,15);
		this.g.drawImage((set.def.rfTX==-4)?image("rfTX1"):(set.def.rfTX==0)?image("rfTX2"):image("rfTX3"),125,32);
        this.g.flip();
      }
      if (set.def.cli!=this.cli) {
        this.cli=set.def.cli;
        this.btn(this.cli,160,0,239,75,image("cli"),176,15,col("lblue"));//btn3
      }
      if (set.def.gb!=this.gb) {
        this.gb=set.def.gb;
        this.btn(this.gb,0,80,75,155,image("gb"),13,94,col("lblue"));//btn4
      }
      if (set.def.atc!=this.atc) {
        this.atc=set.def.atc;
        this.btn(this.atc,80,80,155,155,image("atc"),94,94,col("lblue"));//btn5
      }
      if (set.def.hid!=this.hid) {
        this.hid=set.def.hid;
        this.btn(this.hid,160,80,239,155,image("hid"),176,94,col("lblue"));//btn6
      }
//settings
    }else{
     this.appImgNone=0;
    //bluetooth settings
      if (set.bt!=this.bt) {
        this.bt=set.bt;
        var state=(set.def.cli||set.def.gb||set.def.atc||set.def.hid)?1:0;
        this.btn(state,0,0,75,75,image("bt"),13,15);
      }
    //themes 
    if (this.btn2) {
        this.btn2=0;
        this.g.setColor(0,0);
        this.g.clearRect(76,0,79,75);
        this.g.flip();
        this.g.setColor(1,col("gray"));
        this.g.fillRect(80,0,155,75); //2
        this.g.setColor(0,col("black"));
        this.g.drawImage(image("themes"),94,15);
        this.g.flip();
    }
    //dnd on/off
    if (set.def.dnd!=this.dnd) {
      this.dnd=set.def.dnd;
    this.btn(this.dnd,160,0,239,75,(this.dnd)?image("dndOn"):image("dndOff"),176,15);//btn3

    }
    //find my phone
    if (set.fmp!=this.fmp) {
      this.fmp=set.fmp;
	  this.btn(this.fmp,0,80,75,155,image("findPhone"),13,94,col("dyellow"),col("gray"));//btn3
      }
    //acc on/off
    if (set.def.acc!=this.acc) {
      this.acc=set.def.acc;
      this.btn(this.acc,80,80,155,155,image("wakeScreen"),94,94);
    }
	//brightness level
    if (this.g.bri.lv!=this.bri) {
      this.bri=this.g.bri.lv;
      this.c=colo.btnTxt1;
      this.g.setColor(0,col("gray"));
      this.g.clearRect(160,80,239,155);//brightness
      this.g.setColor(1,this.c);
      this.g.setFont("Vector",30);
      this.g.drawImage(image("bri"),170,107);
      this.g.setFont("Vector",45);
      this.g.drawString(this.g.bri.lv,194,99);   
      this.g.flip();
    }
    }
  //loop
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(o){
    pal[0]=colo.bck0;
    this.g.clear();
    if (set.tor==1){
      w.gfx.bri.set(this.cbri);
      face.faceSave=-1;
      set.tor=-1;
    }
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    this.g.off();
    this.clear(o);
  },
   btn:function(state,rectx0,recty0,rectx1,recty1,Img,ImgX,ImgY,fCol,bCol){
      this.colf=(fCol)?fCol:col("white");
      this.colb=(bCol)?bCol:col("raf3");
      if (state!==1) {this.colb=col("gray");this.colf=col("black");}
      this.g.setColor(1,this.colb);
      this.g.fillRect(rectx0,recty0,rectx1,recty1);
      this.g.setColor(0,this.colf);
      this.g.drawImage(Img,ImgX,ImgY);
	  Img=-1;
      this.g.flip();
  },
};
//
face[1] = {
  offms:1000,
  g:w.gfx,
  init: function(){
  return true;
  },
  show : function(){
    face.go("main",0);
    return true;
  },
  clear: function(){
  return true;
  },
};	
//info face
face[5] = {
  offms: 3000,
  g:w.gfx,
  init: function(){
	var mem=process.memory();
	var s=(getTime()-set.boot)|0;
	var d=0;
	var h=0;
	var m=0;
	if (s>864000) {set.boot=getTime();s=(getTime()-set.boot)|0;}
	while (s>86400) {s=s-86400;d++;}
	while (s>3600) {s=s-3600;h++;}
	while (s>60) {s=s-60;m++;}
    this.g.setColor(0,col("black"));
    this.g.fillRect(0,0,239,239); //all
    this.g.setColor(1,colo.txt1);
    this.g.setFont("Vector",18);
	this.g.drawString("MEM FREE: "+mem.free+"/"+mem.total,120-(this.g.stringWidth("MEM FREE: "+mem.free+"/"+mem.total)/2),0);  
	this.g.drawString("VERSION: "+process.version,120-(this.g.stringWidth("VERSION: "+process.version)/2),25);  
	this.g.drawString("ACC TYPE: "+acctype,120-(this.g.stringWidth("ACC TYPE: "+acctype)/2),50);  
    this.g.drawString("TOUCH TYPE: "+touchtype,120-(this.g.stringWidth("TOUCH TYPE: "+touchtype)/2),75);  
    this.g.drawString("UPTIME: "+d+"D-"+h+"H-"+m+"M",120-(this.g.stringWidth("UPTIME: "+d+"D-"+h+"H-"+m+"M")/2),100);  
	this.g.drawString("FLASH FREE: "+require("Storage").getFree(),120-(this.g.stringWidth("FLASH FREE: "+require("Storage").getFree())/2),125); 
	this.g.drawString("TEMPERATURE: "+E.getTemperature(),120-(this.g.stringWidth("TEMPERATURE: "+E.getTemperature())/2),150);  
	this.g.drawString("NAME: "+set.def.name,120-(this.g.stringWidth("NAME: "+set.def.name)/2),175);  
    this.g.flip();
    this.g.setFont("Vector",18);
	this.g.setColor(0,col("raf"));
	this.g.fillRect(0,200,115,239);
	this.g.setColor(1,col("white"));
	this.g.drawString("RESTART",15,213);
    this.g.flip();	
	this.g.setColor(0,col("raf"));
	this.g.fillRect(125,200,239,239);
	this.g.setColor(1,col("white"));
	this.g.drawString("SHUTDOWN",132,213);
	this.g.flip();
    face[0].appImgNone=0;
  },
  show : function(){
	return;
  },
  clear : function(o){
    pal[0]=colo.bck0;
    this.g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    this.g.off();
    this.clear(o);
  }
};
//touch-settings  
touchHandler[0]=function(e,x,y){
    if (set.tor==1){
        w.gfx.bri.set(face[0].cbri);
        set.tor=-1;
        face[0].tor=0;
        face.go("settings",0);
        return;
    }else if (e==5){
      if(x<77&&y<75){//btn1
        if (face[0].btSet) {
          digitalPulse(D16,1,[30,50,30]);face[0].btSet=0;
          face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].atc=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;this.btn2=1;face[0].fmp=-1;
        }else if (face.mode) {if (face[0].appDo1) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo1);return;} else digitalPulse(D16,1,40);
        }else {face[0].btSetOn=1;face[0].btSet=1;digitalPulse(D16,1,[30,50,30]);
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].atc=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
        }
	  }else if(77<x&&x<158&&y<75){//btn2
        if (face[0].btSet) {
          digitalPulse(D16,1,[30,50,30]);face[0].btSet=0;
          face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].atc=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
        }else if (face.mode) {if (face[0].appDo2) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo2);return;} else digitalPulse(D16,1,40);
        }else if (face[0].btSet) {
          digitalPulse(D16,1,40);
        }else digitalPulse(D16,1,40);
      }else if(158<x&&x<239&&y<75){//btn3
        if (face.mode) {if (face[0].appDo3) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo3);return;} else digitalPulse(D16,1,40);
        }else if (face[0].btSet) {
          set.def.cli=1-set.def.cli;set.upd();digitalPulse(D16,1,[30,50,30]);
        }else {set.def.dnd=1-set.def.dnd;digitalPulse(D16,1,[30,50,30]);}
      }else if(77>x&&77<y&&y<159){//btn4
        if (face.mode) {if (face[0].appDo4) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo4);return;} else digitalPulse(D16,1,40);
        }else if (face[0].btSet) {
          set.def.gb=1-set.def.gb;set.upd();digitalPulse(D16,1,[30,50,30]);
        }else if (set.bt==3){
			digitalPulse(D16,1,[30,50,30]);
			set.fmp=1-set.fmp;
			if (set.fmp) set.gbSend({ "t": "findPhone", "n": true });else set.gbSend({ "t": "findPhone", "n": false });
//			face.go("settings",5);return;
		} else digitalPulse(D16,1,40);
      }else if(77<x&&x<157&&77<y&&y<159){//btn5
        if (face.mode) {if (face[0].appDo5) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo5);return;} else digitalPulse(D16,1,40);
        }else if (face[0].btSet) {
          set.def.atc=1-set.def.atc;set.upd();digitalPulse(D16,1,[30,50,30]);
        }else {set.def.acc=1-set.def.acc;set.accR();digitalPulse(D16,1,[30,50,30]);}
      }else if(158<x&&x<239&&77<y&&y<159) {//btn6
        if (face.mode) {if (face[0].appDo6) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo6);return;} else digitalPulse(D16,1,40);
        }else if (face[0].btSet) {
          set.def.hid=1-set.def.hid;set.upd();digitalPulse(D16,1,[30,50,30]);
        }else {
        face[0].cbri=w.gfx.bri.lv+1;
        if (face[0].cbri>7) face[0].cbri=1;
        w.gfx.bri.set(face[0].cbri);   
   		digitalPulse(D16,1,[30,50,30]);
        }
      }else if(0<x&&x<75&&158<y&&y<239){//btn7
        set.tor=1;
        face[0].cbri=w.gfx.bri.lv;
        w.gfx.bri.set(7);
        face[0].tor=1;
        if (face.offid>=0) {clearTimeout(face.offid); face.offid=-1;}
        face.offid=setTimeout((f)=>{
		  face[0].tor=0;
          set.tor=-1;
          w.gfx.bri.set(face[0].cbri);
		  if (f>=0 && face[f].off) face[f].off();
          face.offid=-1;face.pageCurr=-1;face.appPrev="main";
        },25000,face.pageCurr);
   		digitalPulse(D16,1,[30,50,30]);
        return;  
      }else if(77<x&&x<157&&158<y&&y<239){//btn8	
   		digitalPulse(D16,1,[30,50,30]);
		face.go("settings",5);return;
      }else if(158<x&&x<239&&160<y&&y<239){//btn9
		digitalPulse(D16,1,[30,50,30]);
		if (Boolean(require("Storage").read("calc"))) {
          face.go("calc",0);return;}
      } else digitalPulse(D16,1,40);
    }else if  (e==1){
	  if (face[0].btSet) {
	        face[0].btSet=0;
      }else if(158<x&&x<239&&77<y&&y<160&&!face.mode) {
        face[0].cbri=w.gfx.bri.lv-1;
        if (face[0].cbri<1) face[0].cbri=1;
        w.gfx.bri.set(face[0].cbri);
   		digitalPulse(D16,1,[30,50,30]);
      }else { 
        if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
        }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
        }
      }  
    }else if  (e==2){
	  if (face[0].btSet) {
	        face[0].btSet=0;
      }else if(158<x&&x<239&&77<y&&y<160&&!face.mode) {
        face[0].cbri=w.gfx.bri.lv+1;
        if (face[0].cbri>7) face[0].cbri=7;
        w.gfx.bri.set(face[0].cbri);
   		digitalPulse(D16,1,[30,50,30]);
      }else if (Boolean(require('Storage').read('w_apps'))){
        face.mode=1-face.mode;
        face[0].btSet=0;
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].atc=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
   		digitalPulse(D16,1,[30,50,30]);
      } else digitalPulse(D16,1,40);
    }else if  (e==3){
	  digitalPulse(D16,1,40);
    }else if  (e==4){
      if (face[0].btSet) {
        face[0].btSet=0;
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].atc=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
      }else if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
      }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
      }
    }else if  (e==12){
	  if (face[0].btSet) {
		if(x<160&&y<77){//bt toggle tx
	   		digitalPulse(D16,1,[30,50,30]);
			if (set.def.rfTX===-4) set.def.rfTX=0;
			else if (set.def.rfTX===0) set.def.rfTX=4;
			else if (set.def.rfTX===4) set.def.rfTX=-4;
			NRF.setTxPower(set.def.rfTX);
			face[0].btSetOn=1;
		} else digitalPulse(D16,1,40);
	  }else if(158<x&&x<239&&y<75){
        set.def.hid=1-set.def.hid;
		set.upd();
        digitalPulse(D16,1,[30,50,30]);
      } else digitalPulse(D16,1,40);
    }
   this.timeout();
};
//
touchHandler[5]=function(e,x,y){
    if (e==5){
      if (x<120 && y>190) {
		NRF.removeListener('disconnect',bdis);  
        NRF.disconnect(); 
	    reset();
	  } else  digitalPulse(D16,1,40);
    }else if  (e==1){
      face[0].btSetOn=1;
	  face.go("settings",0);return;
    }else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
      digitalPulse(D16,1,40);
    }else if  (e==4){
      face[0].btSetOn=1;
	  face.go("settings",0);return;
    }else if  (e==12){
	//devmode-shutdown
	 if (x<120 && y>190) {
       require("Storage").write("devmode","dev");
       E.reboot();}
	 else if (x>120 && y>190) {
       NRF.disconnect();
       require("Storage").write("devmode","off");
       E.reboot();}
     else digitalPulse(D16,1,40);
    }
   this.timeout();
};
