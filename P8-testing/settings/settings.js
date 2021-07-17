//settings	
face[0] = {
  offms: 5000,
  g:w.gfx,
  init: function(){
	face.mode=0;
	if (face.faceSave==-1) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
    this.cli=-1;this.bt=-1;this.gb=-1;this.hid=-1;this.emuZ=-1;this.bri=-1;this.acc=-1;this.dnd=-1;this.sys=1;this.btn2=1;this.fmp=-1;
    face[0].btSetOn=1;
    var d=(Date()).toString().split(' ');
    var t=(d[4]).toString().split(':');	
      this.g.setColor(0,0);
	  this.g.fillRect(0,0,239,155);
  	  this.g.setColor(1,col("dgray"));
      //if(!face.mode) this.g.setColor(1,col("dgray")); else this.g.setColor(1,col("dgray1"));
      this.g.fillRect(0,0,75,75);//1
      this.g.fillRect(80,0,155,75); //2
      this.g.fillRect(160,0,239,75); //3
      this.g.fillRect(0,80,75,155); //4
      this.g.fillRect(80,80,155,155); //5
      this.g.fillRect(160,80,239,155);//6
      this.g.flip();
    //bottom
    this.g.setColor(0,0);
//    this.g.fillRect(0,0,239,239);
    this.g.fillRect(0,156,239,239);
    this.g.setColor(1,col("lblue"));
    this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")),11,173);
	this.g.drawImage(require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA==")),94,175);
	this.g.drawImage(require("heatshrink").decompress(atob("mEwwIKH/ACBh8Agf+AoN/4EH/+AgH/+EP//AgP//EfAoMDAo38n4dDAoIpCj4FB8E//kHAoPA///wIFBwYFB8AFBGAI0BvkeFQIuBnkcn/wDgM4FgOAgIyC/41CAQIICn4OB/kB4EfAoP4AoMPKAPwAo8H8ABBAo8DAoJ2BAo5EBAYIFF8AFE+AFE/gFC8BMBEYQFBh+DAocHw4fCL4IJBAoZTBL4IFE/inCZAJ3EQYzaBR4abBh4aDU4QFEBYU/AoIXCvwFB3wFBvjbBjwFBXYMAAoQAEA=")),177,175);
//calc  this.g.drawImage(E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA==")),177,175);
    //info
    this.g.flip();
    this.run=true;
  },
//main loop
  show : function(){
    if (!this.run) return;
    //torch
    if (this.tor==1) {
      this.g.setColor(0,col("white"));
      this.g.fillRect(0,0,239,239); 
      this.g.setColor(1,col("lgray"));
      this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")),50,30,{scale:3});
      this.g.flip();
      this.appImgNone=0;
      this.btSetOn=1;
      return;
    }else if (face.mode) {
      if (!this.appImgNone) if (Boolean(require('Storage').read('w_apps'))) eval(require('Storage').read('w_apps')); 
	}else if(this.btSet){
      if(this.btSetOn){
        this.btSetOn=0;
        //this.g.setColor(1,(set.def.cli||set.def.gb||set.def.emuZ||set.def.hid)?col("dblue"):col("dgray"));
        this.g.setColor(1,col("dgray"));
        this.g.fillRect(0,0,155,75);//title
        this.g.setColor(0,col("white"));
        //bt
       
        this.g.drawImage(require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")),54,15);
		this.g.drawImage((set.def.rfTX==-4)?E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74=")):(set.def.rfTX==0)?E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74=")):E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74=")),125,32);
        this.g.flip();
      }
      if (set.def.cli!=this.cli) {
        this.cli=set.def.cli;
        this.btn(this.cli,160,0,239,75,require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4")),176,15,col("lblue"),col("dblue"),0,col("gray"));//btn3
      }
      if (set.def.gb!=this.gb) {
        this.gb=set.def.gb;
        this.btn(this.gb,0,80,75,155,require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A==")),13,94,col("lblue"),col("dblue"),0,col("gray"));//btn4
      }
      if (set.def.emuZ!=this.emuZ) {
        this.emuZ=set.def.emuZ;
		this.btn(this.emuZ,80,80,155,155,require("heatshrink").decompress(atob("oFAwMB/4ApwAsF/g4Bv4HD+F/4EfA4fjBIMPA4fPDIMHA4cYgf/AIIACkH4GIIGC/3P/0/4AwC/mf/+f8E/A4P7BYPP+AHCDoP/8/4IAX3AQPz/hAE//5A4ffA4X+JAQHC/gHG/xtDjkf3kO/k+h/AjEHjkDBgMP48Y8ccsOD7l/484A4P4g/8//AnAXB/EOC4IHBh4HCggfCA4WPggfBjHHjnx4+ED4IvCgfgC4Pgvvz3kHH4TaN8IFEgE/8AGD/AHBB4nwgEw4YHD4AHBbAmDwAHD7/8gYPBl4HC+EHA4negEPA4LPC5kHj0AuAlC8kD/wHBd4XkgP8hFwC4QNBJ4PgE4RdBAAPggZeEgPAA4P8BwUBLwZlBgEDwYWEgEHwIHC/lgKAMBH4X8mEAKAIHC/0cgF8gx+Dh8D/C1EFgPwj6WE/+ASwngHAS2FgDFELIJlDPAYHFXwIeEACwA=")),90,85,col("lblue"),col("dblue"),0,col("gray"));//btn5
		//this.btn(this.emuZ,80,80,155,155,require("heatshrink").decompress(atob("mEwwMB/4AS8EHAoeADYk/4AEC/n/+E/AoP5gP8j4FB+U+v0PAoP1/+/EgXr//fw4FB6//9/DFQf34IDB34FB8ILD/YFCv4FBAgPwsFmg+Dh/2s1msU/n/wAoPwv4FBsHm+FhCIMk83yuM/+QRBs0xCINns0PwZzEAAv8HIP//xsBAoX4hOMB4XwxOBAoXBAoe/gOJwoFB2FDgJ3C2F/gOPAoU+BYfQjkDgo4CgEDhAECgEGUIXAAoKtC8UAhkXAoPzgEcl4FB+OAvAFC/BOBMQbXBVQJkBFQJkC/8AgR1D4D1FHQQALA")),94,94,col("lblue"),col("dblue"),0,col("gray"));//btn5
		//this.btn(this.emuZ,80,80,155,155,require("heatshrink").decompress(atob("mEwwILI///ArUBAoOAArMDAo/AAoMH8ABBAoMP4ED+AFBj4fB/AFBnwCB/gFEvgCEngCBvAOEAoUeAo9wAogyCApARFEZYFFIIoCCBAREFMoMAMoUPwBxDh59Eg/8n6JCR4q5dAoT7bAAYA=")),94,94,col("lblue"),col("dblue"),0,col("gray"));//btn5
      }
      if (set.def.hid!=this.hid) {
        this.hid=set.def.hid;
        this.btn(this.hid,160,80,239,155,require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA=")),176,94,col("lblue"),col("dblue"),0,col("gray"));//btn6
      }
	//settings
    }else{
     this.appImgNone=0;
    //bluetooth settings
      if (set.bt!=this.bt) {
        this.bt=set.bt;
        var state=(set.def.cli||set.def.gb||set.def.emuZ||set.def.hid)?1:0;
//bt btn
        this.img=require("heatshrink").decompress(atob("lkwwIPMg4FE/AKE4AFDtwEDg1gAocjAgcDnAFDmOAAgUBxgKDjAbChkBwwJC8EMmAEBh8A4IbC+EEjAKDsBCC7/+g//4EN//gv//wFAEgUMgw0DsBQDgQKEkAKDg0EBQfgFYf4FYf8IIMGhhBDoJMDhhMCh0A4YhC4BtDPAOOPAifDgYaCAAMzRwcCPoQABsyvEXQl8AgcPDQcAuD/XABYA="));
        this.btn(state,0,0,75,75,(state)?require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")):this.img,13,15,col("lblue"),col("dgray"),col("white"),col("dgray"));this.img=0;
      }
    //themes 
    if (this.btn2) {
        this.btn2=0;
        this.g.setColor(0,0);
        this.g.clearRect(76,0,79,75);
        this.g.flip();
        this.g.setColor(1,col("gray"));
        this.g.fillRect(80,0,155,75); //2
        this.g.setColor(0,0);
        this.g.drawImage(require("heatshrink").decompress(atob("mEwwIHEgfwAocH/AFDh/8Aocf/wFDn//Aod/Aon//8PAQPBAomDAQMfAQMH//+AoP+BwIFC/gCE+AuB/Ef4AuC+EfwAuC8AFBgIFB4AFBgYFBwAFBFwJGBAoIuCAoQuCAoQuCAonwoAFBGgPgFIQLB4IFBQIJgB4EeRoJgB4Ecg+D/wFBjE/8P8h5XC+H4AoQzB+AFD/lAAoJdBIoIFDKIIFfQIIpDApB+BAoZsBAoX4PAPANIPwAoR1B+CtDcQaHCYAL3CTwIAC")),94,15);
        this.g.flip();
    }
    //dnd on/off
    if (set.def.dnd!=this.dnd) {
      this.dnd=set.def.dnd;
    this.btn(this.dnd,160,0,239,75,(this.dnd)?require("heatshrink").decompress(atob("mEwwIdag/gApMOuAFDn18Aof4j4ECgPAgeAAoIDBA4IiCAQIkChwCBEgUMKoQCBjACKBwUcAogaFAv4FEsACBgx8BPQQDBQwaMCTAYFH/4ACAozRNjCOCAo8MJITdHJIYAXA")):require("heatshrink").decompress(atob("mEwwIdag/gEAIFEuAFBhwDBA4MAn18gPAAoP4j8DwEABAMDw4KBBAMBxwiCAQMcEQQCBnACBhgCBFwUYEoQFDgPYMgQlBzAFDg4aCAoMOAokcAok4AolwAongAoZUBAoZUBAoZUBAoZUBAoZdBAoZdBAoZdBAoVgRgMGKwPBRgMDQwODRgiDCgAFBQYQFCj//AAIaBn4FERgQACXYQABEoMYS4RdBAoZdCbYQuBboRPCIoL/TAAo")),176,15,col("lblue"),col("dblue"),0,col("gray"));//btn3

    }
    //find my phone
    if (set.fmp!=this.fmp) {
      this.fmp=set.fmp;
	  this.btn(this.fmp,0,80,75,155,require("heatshrink").decompress(atob("mEwwILIv/+AgUD///4AFBg8//HgAoMGj/4sAFCAQIFfgYFD4EPAofghwFDuEcAoc4nAFDjkw4wFBscMuIFDx1hwwFBAYPjAofG8YdD4/HApPjAqIjEAovHsY1D45BFJopZFMopxFPosHAofwSoq/jAo0HAQL1Cgf//40BAAM87wECAAg")),13,94,col("white"),col("red"),(set.bt==3)?col("white"):0,(set.bt==3)?col("dgray"):col("gray"));//btn3
      }
    //acc on/off
    if (set.def.acc!=this.acc) {
      this.acc=set.def.acc;
      this.btn(this.acc,80,80,155,155,require("heatshrink").decompress(atob("mEwwJC/AAkPwAECgP//AFCg///4FCj4FBCQU/AoPgAoN/4Ef+AFB/wZBDwMB/gCCgUDBwV+h0HDQU/jkP4AsCvg/Dh/8j5JDAokH/k+Igf4Aoc//E8AoRbBvhhEAoUD//wjAnBwIFBEIRaEn/AgIFDJ4QFIKoQdDAoibDgECbfA=")),94,94,col("lblue"),col("dblue"),0,(euc.state=="READY")?col("dblue"):col("gray"));
    }
	//brightness level
    if (this.g.bri.lv!=this.bri) {
      this.bri=this.g.bri.lv;
      this.c=col("white");
      this.g.setColor(0,col("dgray"));
      this.g.clearRect(160,80,239,155);//brightness
      this.g.setColor(1,this.c);
      this.g.setFont("Vector",30);
      this.g.drawImage(require("heatshrink").decompress(atob("jEXwIHEhAKCAQcEAgMGAQMCuADB+EAgICEgYCBnYFEBwoXCDoUGiEAhw9DAQ4ABA")),170,107);
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
    pal[0]=0;
    //this.g.clear();
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
   btn:function(state,rectx0,recty0,rectx1,recty1,Img,ImgX,ImgY,efCol,ebCol,dfCol,dbCol){
	  if (state) {this.colf=(efCol)?efCol:col("white");this.colb=(ebCol)?ebCol:col("dblue");}
	  else {this.colf=(dfCol)?dfCol:0;this.colb=(dbCol)?dbCol:col("dgray");}
	  
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
  	//set.updateSettings();
    face.go("main",0);
	face[0].btSetOn=1;
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
    this.g.setColor(0,0);
    this.g.fillRect(0,0,239,239); //all
    this.g.setColor(1,col("lblue"));
    this.g.setFont("Vector",18);
	this.g.drawString("MEMORY: "+mem.free+"/"+mem.total,120-(this.g.stringWidth("MEMORY: "+mem.free+"/"+mem.total)/2),0);  
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
	this.g.fillRect(0,200,117,239);
	this.g.setColor(1,col("white"));
	this.g.drawString("RESTART",18,213);
    this.g.flip();	
	this.g.setColor(0,col("raf"));
	this.g.fillRect(121,200,239,239);
	this.g.setColor(1,col("white"));
	this.g.drawString("DEVMODE",136,213);
	this.g.flip();
    face[0].appImgNone=0;
  },
  show : function(){
	return;
  },
  clear : function(o){
    pal[0]=0;
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
          face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;this.btn2=1;face[0].fmp=-1;
        }else if (face.mode) {if (face[0].appDo1) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo1);return;} else digitalPulse(D16,1,40);
        }else {face[0].btSetOn=1;face[0].btSet=1;digitalPulse(D16,1,[30,50,30]);
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
        }
	  }else if(77<x&&x<158&&y<75){//btn2
        if (face[0].btSet) {
          digitalPulse(D16,1,[30,50,30]);face[0].btSet=0;
          face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
        }else if (face.mode) {if (face[0].appDo2) {digitalPulse(D16,1,[30,50,30]);eval(face[0].appDo2);return;} else digitalPulse(D16,1,40);
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
          set.def.emuZ=1-set.def.emuZ;set.upd();digitalPulse(D16,1,[30,50,30]);
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
		if (Boolean(require("Storage").read("alarm"))) {
          face.go("alarm",0);return;}
      } else digitalPulse(D16,1,40);
    }else if  (e==1){
	  if (face[0].btSet) {
	        face[0].btSet=0;
      }else if(158<x&&x<239&&60<y&&y<180&&!face.mode) {
        face[0].cbri=w.gfx.bri.lv-1;
        if (face[0].cbri<1) face[0].cbri=1;
        w.gfx.bri.set(face[0].cbri);
   		digitalPulse(D16,1,[30,50,30]);
      }else { 
		//set.updateSettings();
        if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
        }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
        }
      }  
	}else if  (e==2){
	  if (y>160&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		digitalPulse(D16,1,[30,50,30]);
	  }else if (face[0].btSet) {
        face[0].btSet=0;
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
      }else if(158<x&&x<239&&60<y&&y<180&&!face.mode) {
        face[0].cbri=w.gfx.bri.lv+1;
        if (face[0].cbri>7) face[0].cbri=7;
        w.gfx.bri.set(face[0].cbri);
   		digitalPulse(D16,1,[30,50,30]);
	  }else if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		  //set.updateSettings();
      }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		  //set.updateSettings();
      }    
	}else if  (e==3){
	  if (face[0].btSet) {
	        face[0].btSet=0;
      }else if (Boolean(require('Storage').read('w_apps'))){
        face.mode=1-face.mode;
        face[0].btSet=0;
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
   		digitalPulse(D16,1,[30,50,30]);
      } else digitalPulse(D16,1,40);
    }else if  (e==4){
	    if (face[0].btSet) {
	        face[0].btSet=0;
     		//set.updateSettings();
       }else if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
       }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
       }
	/*	
      if (face[0].btSet) {
        face[0].btSet=0;
        face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].emuZ=-1;face[0].bri=-1;face[0].acc=-1;face[0].dnd=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
      }else if (face.faceSave!=-1) {
          face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		  //set.updateSettings();
      }else{
          if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
		  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		  //set.updateSettings();
      }
	  */
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
      } else digitalPulse(D16,1,40);
    }
   this.timeout();
};
//
touchHandler[5]=function(e,x,y){
    if (e==5){
		if (x<120 && y>190) {
			set.updateSettings();
			NRF.removeListener('disconnect',bdis);  
			NRF.disconnect();
			w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
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
	//restart
		if (x<120 && y>190) {
			set.updateSettings();
			NRF.removeListener('disconnect',bdis);  
			NRF.disconnect();
			w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
			reset();
		}else if (x>120 && y>190) {
			//devmode
			set.updateSettings();
			NRF.disconnect();
			require("Storage").write("devmode","dev");
			w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
			E.reboot();
		}else digitalPulse(D16,1,40);
    }
   this.timeout();
};
