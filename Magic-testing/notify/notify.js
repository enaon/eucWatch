//notify	
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
  g:w.gfx,
  init: function(){
    this.g.setColor(1,0);
	this.g.fillRect(0,0,239,239);this.g.setColor(0,1);this.g.fillRect(0,0,170,77);this.g.fillRect(175,0,239,77);this.g.fillRect(0,83,170,157);this.g.fillRect(175,83,239,157);this.g.fillRect(0,163,170,249);this.g.fillRect(175,163,239,249);
	this.g.flip();
	this.g.setColor(1,14);	
	this.img = require("heatshrink").decompress(atob("lMwwMAv/GBAQEEn/Oh////YhwEC/kOgYEB+12CYUDj9gAgMBw8wj/wgHBnF//0AsEcn//gE4hwZCj4HBAAIrBwBfbn4wBFAxQBw5RB/0B4YEBBoPgKIWAuAUC4E4AgRREmEOEoOAjEHKI8H//AEYQEDACkfKwYoG4JQB/cA8JWCKIN/MAJRGAgRRBEARRBAgPAhkDwf/8EHgJMCagJ6D/7KBAAI="));
	this.g.drawImage(this.img,185,17);
    this.g.flip();	
	this.img = require("heatshrink").decompress(atob("mEwwIJGj//AAUAn4FKAAcHAqAAHn4FKAAcGAokPJYuADYnAAod58AjD+HwAoUB8F4BQUD4E8JgfgAocP+AFDj14C4c8ngjDvEfF4fwh/AjwuCg5HCFwJTDBIIPBLoYuEEgJ3CBIPwAoV4EgJtBgFwEgIXCuEHwYFDh6nDuEeAok8AoIjBuF4Aod/+AFBFIN/KYIXCv/Aa6IdCfZQLFAAoA=="));
	this.g.drawImage(this.img,185,98);
    this.g.flip();	
	this.img = require("heatshrink").decompress(atob("mEwwIROh/wAoc//wFD///wAEBgIFB4AFBgf4h/gAoMH8EDDwUP4EBAoYbB/AFBj4CBvACBjwCBvgFEngCBnwFEAS4dFFIo1FIIpNFLIplBAIJxDj4FCPoqJFgYLEg4FBEYUf+EPF4U/F4P8AoN/AQN+AQIICn4CBIgeATwsBWAfAgZKDWwLCDKwIFCCoMHagfwAocAIgIFFdgYFMAgYAHA=="));
	this.g.drawImage(this.img,182,177);
    this.g.flip();
	this.img=-1;
	this.nCall=-1;
	this.nIm=-1;
	this.nInfo=-1;
	this.run=1;
  },
  show : function(){
	if (!this.run) return;
	if (this.nCall!=notify.nCall){
		this.nCall=notify.nCall;
		this.g.setColor(1,(this.nCall)?7:1);
		this.g.fillRect(0,0,170,77);
		this.g.setColor(0,15);
		this.g.setFont("Vector",25);
		this.g.drawString((notify.nCall)?notify.nCall+" / "+notify.call.length:(notify.call.length)?notify.call.length+" OLD":"-",100-(this.g.stringWidth((notify.nCall)?notify.nCall+" / "+notify.call.length:(notify.call.length)?notify.call.length+" OLD":"-")/2),30);
		this.img = require("heatshrink").decompress(atob("jEYwIGDg4CBh4CBj+AAQPAgE/AQoLBn4RBnwCEj4CEh4RBh4XBg/g8ED+P4gP//kAAQV/AQM/AQMf/EAgfgIgQA="));
		this.g.drawImage(this.img,10,27);
		this.img=-1;
		this.g.flip();
	}
	if (this.nIm!=notify.nIm){
		this.nIm=notify.nIm;
		this.g.setColor(1,(this.nIm)?4:1);
		this.g.fillRect(0,83,170,157);
		this.g.setColor(0,15);
		this.g.setFont("Vector",25);
		this.g.drawString((notify.nIm)?notify.nIm+" / "+notify.im.length:(notify.im.length)?notify.im.length+" OLD":"-",100-(this.g.stringWidth((notify.nIm)?notify.nIm+" / "+notify.im.length:(notify.im.length)?notify.im.length+" OLD":"-")/2),110);
		this.img = require("heatshrink").decompress(atob("jEYwIPMv///wCFj///EP//w4f/4fw/8P/F+j/+jATBwP/BoICBAA4mIHZAA="));
		this.g.drawImage(this.img,10,107);
		this.img=-1;
		this.g.flip();
	}
	if (this.nInfo!=notify.nInfo){
		this.nInfo=notify.nInfo;
		this.g.setColor(1,(this.nInfo)?12:1);
		this.g.fillRect(0,163,170,249);
		this.g.setColor(0,15);
		this.g.setFont("Vector",25);		
		this.g.drawString((notify.nInfo)?notify.nInfo+" / "+notify.info.length:(notify.info.length)?notify.info.length+" OLD":"-",100-(this.g.stringWidth((notify.nInfo)?notify.nInfo+" / "+notify.info.length:(notify.info.length)?notify.info.length+" OLD":"-")/2),190);
		this.img = require("heatshrink").decompress(atob("jEYwIHEv0AgP/wEH//gh//+Ef8/4j/D/E/4/8n///l///+v/nAQPDARM/4YXBAQIgCEwQsCGQQ4CHwQACA=="));
		this.g.drawImage(this.img,10,187);
		this.img=-1;
		this.g.flip();
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
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    this.clear(o);
    this.g.off();
    return true;
  }
};
//
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
  },
};	
//info face
face[5] = {
  offms: 10000,
  g:w.gfx,
  wrap:function(str,size){
    str=str.split(' ');
    var line="";
    let i=0;
    var prev=0;
    for (i==0;i<str.length;i++){
      if (str[i].length<(size+1)){
        if (str[i].length+(line.length-line.lastIndexOf('\n'))<(size+1)) {
        if (line!="") line=line+" "+str[i]; else line=str[i];
        }else line=line+"\n"+str[i];
      }else {
        var o=0;
        var l;
        while (o<str[i].length){
          l=line.length-(line.lastIndexOf('\n')+1)>0?size-(line.length-line.lastIndexOf('\n')):size;
          if (l<=0) l=size;
          if (l<size) line=line+" "+str[i].substr(o,l);
          else  { if (line!="") line=line+"\n"+str[i].substr(o,l);else line=str[i].substr(o,l);}
          o=o+l;
        }
      }
    }
    return line;
  },
  init: function(type){
    this.g=w.gfx;
	this.dowrap=16;
    this.list=notify[type];
    this.type=type;
    this.go=0;
	this.at=-1;
    this.del=0;
    this.g.setColor(0,1);
    if (this.list.length==0){
      this.g.setColor(0,0);
      this.g.fillRect(0,0,239,239);
      this.g.setColor(1,14);
      this.g.setFont("Vector",24);		
      this.g.drawString("NO ENTRIES",120-(this.g.stringWidth("NO ENTRIES")/2),100); 
      this.at=this.go;
	} else  this.run=true;
    this.g.flip();
	this.nCall=notify.nCall;this.nIm=notify.Im;this.nInfo=notify.nInfo;
  },
  show : function(){
    if (!this.run||this.list.length==0) return;
    if (this.del===1) {
      this.del=2;
      this.g.setColor(1,7);
      this.g.fillRect(0,31,239,120);
      this.g.setColor(0,15);
	  //thrashbin
	  this.g.drawImage(require("heatshrink").decompress(atob("mEwwI1yg/4AocP/gFDhkMApE//4ABAo4PCAUIACAv4FQATkGAQMYXwSgBYAUBAoPgdsg")),40,35,{scale:1.5});
	  //swipe-left
	  this.g.drawImage(require("heatshrink").decompress(atob("mEwwJC/AAk4Aon+AgcgAolh/4FD//vAonHCIgFEkIFEgHGAolEAolFwAFDo3ACIl8AolnCQdEoVAAolgAoVAoEgAocCAoUPFAIFCiBoCApsOAokBHIIpDEYgvBAoxHDBIIFJGAJfDhEBNYcGgwFDgP4bbIA=")),130,35,{scale:1.5});
      this.g.flip();
    }else if (this.go!=this.at||notify["n"+this.type.substr(0,1).toUpperCase()+this.type.substr(1)]!=this["n"+this.type.substr(0,1).toUpperCase()+this.type.substr(1)]){
		this["n"+this.type.substr(0,1).toUpperCase()+this.type.substr(1)]=notify["n"+this.type.substr(0,1).toUpperCase()+this.type.substr(1)];
      this.list=notify[this.type];
      if (this.go>this.list.length-1) this.go=0;
      if (this.go<0) this.go=this.list.length-1;
      this.at=this.go;
      this.msg=JSON.parse(this.list[this.go]);
      //let this.msg=require("Storage").read(this.type+this.list[this.go].substr(4)).split("|");
      if (this.dowrap>0) this.msg.body=this.wrap(this.msg.body,this.dowrap);
      this.g.setFont("Vector",24);
	  if (this.type==="call") this.g.setColor(1,7);
	  else if (this.type==="im") this.g.setColor(1,4);
	  else if (this.type==="info") this.g.setColor(1,12);
      this.g.fillRect(0,0,239,30);
      //if (this.msg.idUnread) {this.g.setColor(0,15);set.gbSend({t:"notify", id:this.msg.id, n:"dismiss"});} else this.g.setColor(0,3);
//	  if (this.msg.id) set.gbSend({t:"notify", id:this.msg.id, n:"dismiss"});     
	  this.g.setColor(0,15);
	  this.g.drawString(this.msg.src,3,5);
      this.g.drawString(this.go+1+"/"+this.list.length,239-(this.g.stringWidth(this.go+1+"/"+this.list.length)),5);
	  this.g.flip();
      this.g.setFont("Vector",22);
      this.g.setColor(0,1);
      this.g.fillRect(0,30,239,210);
      this.g.setColor(1,14);
   	  if (this.msg.title.length>15) this.msg.title=this.msg.title.substr(0,12)+"...";
      this.g.drawString(this.msg.title+" :",3,35);
	  this.g.setFont("Vector",24);
      this.g.drawString(this.msg.body,122-(this.g.stringWidth(this.msg.body)/2),65);
      this.g.flip();
      this.g.setFont("Vector",24);
      this.g.setColor(0,1);
      this.g.fillRect(0,210,239,239);
      this.g.setColor(1,3);
   	  this.g.drawString(this.msg.time,120-(this.g.stringWidth(this.msg.time)/2),218);
      this.g.flip();
      //this.msg=undefined;
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
    this.g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    this.clear(o);
    this.g.off();
    return true;
    }
};
//touch-notify  
touchHandler[0]=function(e,x,y){
    if (e==5){
      if (y<80&&x<170){
        face.go("notify",5,"call");return;
      } else if (80<=y&&y<160&x<170){
        face.go("notify",5,"im");return;
      } else if (160<=y&&y<239&x<170){
        face.go("notify",5,"info");return;
	  }else if (y<80){
		buzzer(40);
      } else if (80<=y&&y<160){
		buzzer(40);
	  } else if (160<=y&&y<239){
		buzzer(40);
      }else buzzer(40);
    }else if  (e==1){
		//face.go("notify",-1);return;
		face.go("main",0);return;
    }else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer([30,50,30]);
      }else {
		face.go("settings",0);return;
	  } 
    }else if  (e==3){
		//buzzer(40);
		face.go("main",0);return;
    }else if  (e==4){
		if (face.appPrev=="main")buzzer(40);
		else face.go("main",0);return;
    }else if  (e==12){
      if (y<80&&x<170){
		buzzer([30,50,80]);notify.call=[];notify.nCall=0;face[0].nCall=-1;
		if (!notify.nCall&&!notify.nIm&&!notify.nInfo) {set.gbSend({t:"notify", n:"dismiss_all"});notify.New=0;}
      } else if (80<=y&&y<160&x<170){
		buzzer([30,50,80]);notify.im=[];notify.nIm=0;face[0].nIm=-1;
		if (!notify.nCall&&!notify.nIm&&!notify.nInfo) {set.gbSend({t:"notify", n:"dismiss_all"});notify.New=0;}
	  } else if (160<=y&&y<239&x<170){
		buzzer([30,50,80]);notify.info=[];notify.nInfo=0;face[0].nInfo=-1;
		if (!notify.nCall&&!notify.nIm&&!notify.nInfo) {set.gbSend({t:"notify", n:"dismiss_all"});notify.New=0;}
      }else buzzer(40);
    }
   this.timeout();
};
touchHandler[5]=function(e,x,y){
    if (face[5].del===2){
      if  (e==3) {
        if (notify[face[5].type].length==1) notify[face[5].type]=[];
        else notify[face[5].type].splice(face[5].at,1);
        if (notify[face[5].type].length==0){
			buzzer(80); notify["n"+face[5].type.substr(0,1).toUpperCase()+face[5].type.substr(1)]=0; 
			if (!notify.nCall&&!notify.nIm&&!notify.nInfo) {notify.New=0;}
			face.go("notify",0);return;} 
        face[5].go--;
      } else face[5].at=-1;
      face[5].del=0;
      return;
    }else if (e==5){
	  buzzer(40);
    }else if  (e==1){//slide down
	  if (face[5].msg&&face[5].msg.id) set.gbSend({t:"notify", id:face[5].msg.id, n:"dismiss"});   
      face[5].go--;
      buzzer([30,50,30]);
    }else if  (e==2){
	  if (face[5].msg&&face[5].msg.id) set.gbSend({t:"notify", id:face[5].msg.id, n:"dismiss"});   
	  face[5].go++;
      buzzer([30,50,30]);
    }else if  (e==3){
      if  (face[5].list.length>0) face[5].del=1;
      else {face.go("notify",0); return;}
    }else if  (e==4){//slide right event (back action)
	  if (face[5].msg&&face[5].msg.id) set.gbSend({t:"notify", id:face[5].msg.id, n:"dismiss"});   
	  notify["n"+face[5].type.substr(0,1).toUpperCase()+face[5].type.substr(1)]=0;
      if (!notify.nInfo&&!notify.nCall&&!notify.nIm) {notify.New=0;}
      if (face.appPrev=="off") {face.go("main",-1);return;}
		else  {face.go(face.appPrev,face.pagePrev,face.pageArg);return;}
    }else if  (e==12){
      buzzer(40);
    }
   this.timeout();
};

