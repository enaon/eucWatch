//hid
face[0] = {
  offms: 5000,
  col:{
	txt:col("white"),
	txt1:col("lblue"),
    txt2:col("black"),
	hdr:col("dgray+3"),
    hdrTxt:col("lgray"),
	bck:col("raf1"),
	bck1:col("lgray"),
	bck2:col("raf"),
	btnEn:col("raf"),
	btnDs:col("lgray"),
	btnDs1:col("olive"),
	btnTxt:col("black"),
    btnTxt1:col("white")
  },
  init: function(){	  
    var g=w.gfx;
	if (set.def.hid!=1){
		g.setColor(0,col("black"));
//		g.clearRect(1,0,239,239);
		g.setColor(1,col("white"));
		g.setFont("Vector",25);
		g.drawString("HID DISABLED",30,0);
		g.setFont("Vector",20);
		g.drawString("LONG PRESS",60,100);
		g.drawString("TOGGLE IN SETTINGS",10,140);
		g.drawString("TO ENABLE",60,200);
		g.flip();	
	}else{
	
	g.clearRect(1,0,239,239);
	g.flip();
    g.setFont("Vector",18);
    g.setColor(1,this.col("bck"));
	g.fillRect(0,0,75,75);//play/pause
	g.setColor(0,col("white"));
	g.drawString("PLAY",15,27);
	g.flip();
	g.setColor(1,this.col("bck"));
    g.fillRect(80,0,155,75);//prev
    g.setColor(0,col("white"));
	g.drawString("PREV",98,27);
	g.flip();	
	g.setColor(1,this.col("bck"));
    g.fillRect(160,0,239,75); //next
	g.setColor(0,col("white"));
	g.drawString("NEXT",180,27);
	g.flip();	
    g.setColor(1,this.col("bck"));
	g.fillRect(0,80,75,155); //stop
	g.setColor(0,col("white"));
	g.drawString("STOP",15,110);
	g.flip();
    g.setColor(1,this.col("bck"));
    g.fillRect(80,80,239,239);//Vol up/dn
    g.setColor(0,col("white"));
    g.setFont("Vector",22);
	g.drawString("VOL UP",110,115);   
	g.drawString("VOL DN",110,190);   
    g.flip();
//    this.run=true;
	}
  },
  show : function(){
    if (!this.run) return;
    var g=w.gfx;
   //loop
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },2000,this);
  },
  tid:-1,
  run:false,
  clear : function(o){
    var g=w.gfx;
    pal[0]=col("black");
    g.clear();
    this.exit(o);
    return true;
  },
  exit: function(o){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    var g=w.gfx;
    g.off();
    this.clear(o);
  }
};
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
    face.go("main",0);
    return true;
  },
   clear: function(){
  return true;
  }
};		
touchHandler[0]=function(e,x,y){
    var g=w.gfx;
    if (set.def.hid==1){
    if (e==5){
      if(x<77&&y<75){
		set.hidM.playpause();
        digitalPulse(D16,1,[30,50,30]);
      }else if(77<x&&x<158&&y<75){
  		set.hidM.prev();
        digitalPulse(D16,1,[30,50,30]);
      }else if(158<x&&x<239&&y<75){
		set.hidM.next();
        digitalPulse(D16,1,[30,50,30]);
	  }else if(0<x&&x<75&&75<y&&y<155){
		set.hidM.stop();
        digitalPulse(D16,1,[30,50,30]);
	  }else if(0<x&&x<75&&160<y&&y<239){
		set.hidM.stop();
        digitalPulse(D16,1,[30,50,30]);
	  }else if(80<x&&x<239&&77<y&&y<157){
		set.hidM.volumeUp();
        digitalPulse(D16,1,[30,50,30]);
	  }else if(80<x&&x<239&&160<y&&y<239){
		set.hidM.volumeDown();
        digitalPulse(D16,1,[30,50,30]);
      } else digitalPulse(D16,1,40);
    }  
    }
    if  (e==1){
		face.go("hid",-1);return;
	}else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
      }else if (y>200) {  
		face.go("settings",0);return;
      }else digitalPulse(D16,1,40);
    }else if  (e==3){
		digitalPulse(D16,1,40);
    }else if  (e==4){
		face.go("main",-0);return;
    }else if  (e==12){
      digitalPulse(D16,1,40);
    }
   this.timeout();

};

	