//repellent
if (!global.rep){
global.rep={
gatt:0,characteristic:0,service:0,device:0,bat:-1,med:-1,sta:0,
mac:[],go:0,busy:0
};
}
if (!global.rep.read)
  global.rep.read=function(){
//  if (rep.mac==undefined){face.go('w_scan',0,'fe95');return;}
//  if (rep.go==undefined){face.go('w_scan',0,'fe95');return;}
  if(ew.is.gIsB) {return;}
  ew.is.gIsB=1;
  NRF.connect(rep.mac[rep.go],{minInterval:7.5, maxInterval:10}
  ).then(function(g) {
	rep.gatt = g;
	return rep.gatt.getPrimaryService("0000fe01-0000-1000-8000-00805f9b34fb");
  }).then(function(s) {
	rep.service=s;
	return rep.service.getCharacteristic("00000002-0000-1000-8000-00805f9b34fb");
  }).then(function (c) {
	rep.characteristic=c;
	return rep.characteristic.readValue();
  }).then(function () {
    rep.bat=rep.characteristic.value.buffer[0];
    rep.med=rep.characteristic.value.buffer[1];
  }).then(function() {
	return rep.service.getCharacteristic("00000001-0000-1000-8000-00805f9b34fb");
  }).then(function (c) {
	rep.characteristic=c;
	return rep.characteristic.readValue();
  }).then(function () {
    rep.sta=rep.characteristic.value.buffer[0];
	rep.gatt.disconnect().then(function (c){
    ew.is.gIsB=0;rep.gatt=0;rep.device=0;rep.characteristic=0;rep.service=0;
    });
    rep.con=1;
    face[0].btscan=1;
  }).catch(function(err)  {
    if (ew.def.cli) console.log("repellent:", err);
    ew.is.gIsB=0;rep.gatt=0;rep.device=0;rep.characteristic=0;rep.service=0;
    face[0].btscan=2;
  });
};
//rep face
face[0]= {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:20000,
  init: function(){
	rep.mac=(require("Storage").readJSON("ew.json",1)||{}).repellentMac;
	rep.go=(require("Storage").readJSON("ew.json",1)||{}).repellentGo;
    rep.con=0;
    var g=w.gfx;
  	g.clear();
    g.setColor(1,3);//header bck
	g.fillRect(120,0,239,50); //header
    g.fillRect(0,0,117,50); //status
    g.fillRect(0,200,239,239); //mac
    g.setColor(0,0);//header txt
    g.setFont("Vector",25);
	g.drawString("INSECT",4,3); 
    g.setFont("Vector",20);
  	g.drawString("REPELLENT",4,28); 
    g.flip();
	this.bat=-1;
	this.med=-1;
	this.sta=-1;
    this.mac=-1;
    this.con=0;
    this.btscan=0;
	if(global["\xFF"].BLE_GATTS==undefined) {
      this.run=true;
    }else {
      g.setFont("Vector",27);
      g.setColor(1,15);
      g.drawString("ERROR:",120-(g.stringWidth("ERROR:")/2),85);
      g.drawString("BT IN USE",120-(g.stringWidth("BT IN USE")/2),125);
      g.flip();
    }
  },
  show : function(){
    if (!this.run) return;
    var g=w.gfx;
    if (!rep.mac){
	  if (!rep.go) {
		g.setColor(1,1);
		g.fillRect(0,55,239,195);//batt
		g.setColor(0,15);
		g.setFont("Vector",30);
        g.drawString("DEVICE",120-(g.stringWidth("DEVICE")/2),70); //batt
		g.drawString("NOT FOUND",120-(g.stringWidth("NOT FOUND")/2),115); //batt
		g.setFont("Vector",20);
		g.drawString("TOUCH TO SCAN",120-(g.stringWidth("TOUCH TO SCAN")/2),170); //batt
		g.flip();
	  }else{
		face.go('w_scan',0,'fe95');	  
	  } 
	  return;
    }else 
    rep.read();
    if (this.btscan==0){
      g.setColor(1,1);
		g.fillRect(0,55,239,195);//batt
		g.setColor(0,15);
		g.setFont("Vector",30);
        g.drawString("READING",120-(g.stringWidth("READING")/2),70); //batt
		g.drawString("DEVICE",120-(g.stringWidth("DEVICE")/2),115); //batt
		g.setFont("Vector",20);
		g.drawString("INFORMATION",120-(g.stringWidth("INFORMATION")/2),170); //batt
		g.flip();
    }else if (this.btscan==2){
      g.setColor(1,1);
		g.fillRect(0,55,239,195);//batt
		g.setColor(0,15);
		g.setFont("Vector",30);
        g.drawString("DEVICE",120-(g.stringWidth("DEVICE")/2),70); //batt
		g.drawString("OUT OF",120-(g.stringWidth("OUT OF")/2),115); //batt
		g.setFont("Vector",20);
		g.drawString("RANGE",120-(g.stringWidth("RANGE")/2),170); //batt
		g.flip();
    }else {
    if(rep.con!=this.con) {
      this.con=rep.con;
	  g.setColor(1,6);
      g.fillRect(0,0,117,50);
	  g.setColor(0,11);
      g.setFont("Vector",18);
  	  g.drawString("CONNECTED",4,15); 
      g.flip();
	}
    if (rep.bat!=this.bat) {
      this.bat=rep.bat;
      this.c=15;
      g.setColor(1,1);
      g.fillRect(0,55,117,195);//batt
      g.setColor(0,this.c);
      g.setFont("Vector",45);
      g.drawString(this.bat+"%",60-(g.stringWidth(this.bat+"%")/2),95); //batt
      g.setFont("Vector",23);
      g.drawString((this.bat*1.5|0)+" DAYS",60-(g.stringWidth((this.bat*1.5|0)+" DAYS")/2),170);
      g.setFont("Vector",21);
      g.drawString("BATTERY",60-(g.stringWidth("BATTERY")/2),60); //batt
  	  g.flip();
    }
    if (rep.med!=this.med) {
      this.med=rep.med;
      this.c=14;
      //if (this.med>=50) 
      g.setColor(1,6);
      //else { g.setColor(1,9;}
	  g.fillRect(120,55,239,195);//med
      g.setColor(0,this.c);
      g.setFont("Vector",45);
      g.drawString(this.med+"%",185-(g.stringWidth(this.med+"%")/2),95); //med
      g.setFont("Vector",23);
      g.drawString((this.med*0.9|0)+" DAYS",183-(g.stringWidth((this.med*0.9|0)+" DAYS")/2),170);
      g.setFont("Vector",21);
      g.drawString("MEDICINE",183-(g.stringWidth("MEDICINE")/2),60); //med
  	  g.flip();
    }
    if (rep.sta!=this.sta) {
      this.sta=rep.sta;
      var s;
      if (this.sta==0) {s="OFF";this.c=0;this.b=2;}
      else if (this.sta==1) {s="ON";this.c=15;this.b=4;}
      else if (this.sta==3) {s="AUTO";this.c=13;this.b=4;}
      g.setColor(1,this.b);
	  g.fillRect(120,0,239,50); //status
      g.setColor(0,this.c);
      g.setFont("Vector",35);
      g.drawString(s,183-(g.stringWidth(s)/2),10); //sta
  	  g.flip();
    }
    if (rep.mac[rep.go]!=this.mac) {
      this.mac=rep.mac[rep.go];
      g.setColor(1,3);
      g.fillRect(0,200,239,239); //mac
      g.setColor(0,0);
      g.setFont("Vector",28);
      g.drawString(rep.mac[rep.go].substring(0,17),120-(g.stringWidth(rep.mac[rep.go].substring(0,17))/2),210);
      g.flip();
    }
    
    }
    this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
    },1000,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    var g=w.gfx;
    //g.clear();
    this.exit();
    return true;
  },
  exit: function(){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    //if (face.appCurr!="repellent") global.rep=undefined;
    this.tid=-1;
    return true;
  },
  off: function(){
    var g=w.gfx;
    g.off();
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

//touch main
touchHandler[0]=function(e,x,y){
    if (e==5){
		face.go('w_scan',0,'fe95');	  
    }else if  (e==1){
	  //face.go("repellent",-1);return;
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
      }else  {  
		face.go("settings",0);return;
	  } 
    }else if  (e==3){
	  face.go("settings",0);return;
    }else if  (e==4){
	   face.go("settings",0,1);return;
//	  face.go(face.appRoot[0],face.appRoot[1],face.appRoot[2]);return;
    }else if  (e==12){		
	  buzzer.nav(40);    
    }
    this.timeout();
};