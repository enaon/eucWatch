//scan face-used by dash/repellent
if(!global.scan){
scan={
    mac:[],
	go:function(app,service){
	set.gIsB=1;
	NRF.findDevices(function(devices) {
	  this.slot="";
      if (app=="repellent") this.filter = [{serviceData:{"fe95":{}}}];
      else {
		app="dash";
		this.filter = [{services:[service]}];
	  }
      var found=[];
  	  NRF.filterDevices(devices, this.filter).forEach(function(entry) {found.push(entry.id);});
	  if (found!=""&&found!=undefined){ 
		if (app=="dash"){
			(s=>{s&&(s["dash_slot"+set.def.dashSlot+"_mac"]=found[0]+"")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
		}else{
			(s=>{s&&(s[app+"_mac"]=found)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
			(s=>{s&&(s[app+"_go"]="0")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
		}
		scan.mac=found;
	  } else scan.mac=[];
   	  set.gIsB=0;
      face[0].start=1;
   	  if (face.appCurr!="w_scan") {delete scan.go;delete scan;}
	}, 2000);
	}	
};
}
face[0] = {
  offms: 10000,
  g:w.gfx,
  go:0,
  find:function(service){
  	if(!this.start) return;
    this.start=0;
    if(set.gIsB) {
		//set.gDis();
		this.cnt=1;
        if (this.loop>=0) clearInterval(this.loop);
		this.loop = setInterval(function() {
			this.cnt++;
			if (!set.gIsB) scan.go(face.appPrev,service);
			else if (this.cnt>4) {print("scan timeout"); clearInterval(this.loop);this.loop=-1;return;}
		},1000);
	}else scan.go(face.appPrev,service);
  },
  init: function(o){
    //this.find(o);
    scan.mac=(require("Storage").readJSON("setting.json",1)||{})[face.appPrev+"_mac"];
	this.go=(require("Storage").readJSON("setting.json",1)||{})[face.appPrev+"_go"];
    this.start=1;
	if(!scan.mac) {scan.mac=[];this.find(o);}
    this.g.setColor(0,col("black")); //header
    this.g.fillRect(0,0,239,35); 
    this.g.setColor(1,col("lblue"));
    this.g.setFont("Vector",24);
	this.g.drawString((face.appPrev=="repellent")?"REPELLENT":"EUC",4,6); 
    this.g.flip();
    this.line=0;
    this.top=50;
	this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (!this.start){ 
      this.g.setColor(0,col("black")); //header
      this.g.fillRect(160,0,239,35);
      this.g.flip();
      this.g.setColor(1,col("dgray"));
      this.g.fillRect(0,36,239,239); 
      this.g.setColor(0,col("lblue"));
      this.g.setFont("Vector",28);
      this.g.drawString("SCANNING",120-(this.g.stringWidth("SCANNING")/2),110);
      this.g.flip();
    }else if (scan.mac!=""&&this.start==1){
      this.start=2;
      this.g.setColor(0,col("black")); //header
      this.g.fillRect(160,0,239,35);
      this.g.setColor(1,col("lblue"));
      this.g.setFont("Vector",26);
      this.g.drawString(scan.mac.length+"/"+scan.mac.length,242-(this.g.stringWidth(scan.mac.length+"/"+scan.mac.length)),3);
      this.g.flip();
      this.g.setColor(0,col("dgray"));
      this.g.fillRect(0,36,239,239); 
      this.g.flip();
      this.g.setFont("Vector",28);
      for (var entry=this.line;entry<this.line+4&&entry<scan.mac.length;entry++) {
        print(entry,this.go);
		this.g.setColor(0,col((this.go==entry)?"raf":(entry % 2)?"dgray":"gray"));
        this.g.fillRect(0,(this.top-14)+((entry-this.line)*this.top),239,(this.top+36)+((entry-this.line)*this.top)); 
		this.g.setColor(1,col((this.go==entry)?"lblue":"white"));
		this.g.drawString(scan.mac[entry].substring(0,17),239-this.g.stringWidth(scan.mac[entry].substring(0,17)),this.top+((entry-this.line)*this.top));
		this.g.flip();
      }
      this.g.flip();
    }else if (this.start!==2){
      this.start=3;
      this.g.setColor(0,col("dgray")); //header
      this.g.fillRect(0,36,239,239);
      this.g.setColor(1,col("lblue"));
      this.g.setFont("Vector",25);
//      this.g.drawString((face.appPrev=="repellent")?"REPELLENT":"EUC",120-(this.g.stringWidth((face.appPrev=="repellent")?"REPELLENT":"EUC")/2),50);
      this.g.drawString("NOT FOUND",120-(this.g.stringWidth("NOT FOUND")/2),80);
      this.g.setFont("Vector",20);
      this.g.drawString("TOUCH TO RESCAN",120-(this.g.stringWidth("TOUCH TO RESCAN")/2),150);

      this.done=0;
      this.g.flip();
      //return;
    }
    this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show(o);
    },500,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    pal[0]=col("black");
    this.g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    if (this.loop>=0) clearInterval(this.loop);
	if (!set.gIsB&&face.appCurr!="w_scan") delete global.scan;
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
	  face.go(face.appRoot[0],face.appRoot[1]);
	  return true;
  },
   clear: function(){
  return true;
  }
};	
//
touchHandler[0]=function(e,x,y){
    if (e==5){
       if(36<y&&y<=85) {
         if (scan.mac[0]!=undefined) {
			digitalPulse(D16,1,[30,50,30]);
			if (face.appRoot[0]!="repellent"){
				(s=>{s&&(s["dash_slot"+set.def.dashSlot+"_mac"]=scan.mac[0]+"")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
				(s=>{s&&(s["dash_slot"+set.def.dashSlot+"_maker"]=set.def.dashMaker)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
				euc.tgl();
			}
           //else	
			//	(s=>{s&&(s[face.appRoot[0]+"_go"]=face[0].line+"")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
			face.go(face.appRoot[0],face.appRoot[1]);return;
         } else digitalPulse(D16,1,40);
	   }else if(85<y&&y<=135) {
         if (scan.mac[1]!=undefined) {
			digitalPulse(D16,1,[30,50,30]);
			if (face.appRoot[0]!="repellent"){
				(s=>{s&&(s["dash_slot"+set.def.dashSlot+"_mac"]=scan.mac[0]+"")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
				(s=>{s&&(s["dash_slot"+set.def.dashSlot+"_maker"]=set.def.dashMaker)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
				euc.tgl();
			}else	
				(s=>{s&&(s[face.appRoot[0]+"_go"]=face[0].line+1)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
			face.go(face.appRoot[0],face.appRoot[1]);return;
         } else digitalPulse(D16,1,40);
       }else if(135<y&&y<=185) {
         if (scan.mac[2]!=undefined) {
			digitalPulse(D16,1,[30,50,30]);
			
		   (s=>{s&&(s[face.appRoot[0]+"_go"]=face[0].line+2)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
			face.go(face.appRoot[0],face.appRoot[1]);return;
         } else digitalPulse(D16,1,40);
       }else if(185<y) {
         if (scan.mac[3]!=undefined) {
			digitalPulse(D16,1,[30,50,30]);
		   (s=>{s&&(s[face.appRoot[0]+"_go"]=face[0].line+3)&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1));
			face.go(face.appRoot[0],face.appRoot[1]);return;
         } else digitalPulse(D16,1,40);
       }else digitalPulse(D16,1,40);
    }else if  (e==1){
	  face.go(face.appPrev,face.pagePrev);return;
    }else if  (e==2){
	  if (y>200&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
	  } else digitalPulse(D16,1,40);
    }else if  (e==3){
	  digitalPulse(D16,1,40);    
    }else if  (e==4){
		face.go(face.appRoot[0],face.appRoot[1]);
	  return;
    }else if  (e==12){		
	  digitalPulse(D16,1,40);    
    }
    this.timeout();
};


