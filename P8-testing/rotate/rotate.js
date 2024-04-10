//rotate
face[0] = {
  offms: 15000,
  g:w.gfx,
  init: function(){
    // Clear
    this.g.setColor(0,0);
    this.g.clear();
    this.g.flip();
    // Buttons
    this.g.setColor(0,4);
    this.g.fillRect(0,40,239,158);
    this.g.setColor(1,15);
    let img = require("heatshrink").decompress(atob("olUwIGDh//Bwsf///wEAjwPDAAMAgfwgEHA4X+gE/gEBA4X//AQCv4ID8AQBEAILBBAIQBgYHCBAP8CAN//AHBEoPj+EfFwIABGwO/DAJIBJ4fwv/gLAY3Bg4gCEQYQBNIhABgYYEDIPwjgGDNISCFA4JRCDQSCCH4XACAo2BBAIQEn4ICJYIeBLwIICAAYQBNAgQDBAt+E4QIDg/gZgQQDvjVDOIYwBBAP8BAQDCBAJhDIIU/VwaZDn4QCj43DDoUBCAYdDj4/DCAaSCCAIdCc4IuFfALcDCAU+aYYQCNoIQDPwaLDDoQQEFwZ+BCApPDFwiCDg4QHv5DCNocHAgR+ECAR+FCAZtDZgR+FCAR+EZYR+FXwZ+HKgYuDv4ICPwn/Fw0/BAQuE/4ICPwYIDTgkBBAPwVoYID/6LDBAZHDIIQQDIQP+BAQQCE4QICQwMPBAIaCK4QQDDwKSCCAZSFKAcAnEPGIIADg/AEAYAC/whBaYaZB8BLCDAYQCbgZoB4H9GQl//EP44iDj4eB/ipBKIfAh48BBAIHBIAP8QAIACDAIQBj4IDEoKKBv4HCGwIQBOARhDvCxDJ4aCDOIYA=="));
    this.g.drawImage(img,27,57);
    img = require("heatshrink").decompress(atob("rk0wIMJv//8AKHh///84BY4KB+/ACxP+CxP/+AKGg4LCwBFI+/8IpM/KI8B//x/4WHn//h/4HJHwv5cH/+/gZcHj/z+EfLgwTBn4ZBLg1/4fwg5cGIIIWBLgxaBgfwAYJaG8AWBLgwpBCwIxBLgpABjxICLQpXDLgoRFLgooELgo/FLghWFAoptFDgiEGGYg+FJQiyGAwbJHDoaDGGgb3HJYSxHA4bIGDwbfHGob2HJgRaGLgZaHLgZaGLgZaHJoXhLQxcDLQ5cC/5aHLgRaHLgX/LQ5cCLQs//4AI44KJ/w0BABHnCyvjBRP8A="))
    this.g.drawImage(img,134,73);
    this.g.flip();
    // Remove garbage
    this.g.setColor(0,0);
    this.g.fillRect(0,0,239,39);
    this.g.flip();
    this.g.fillRect(0,159,239,239);
    this.g.flip();
    this.g.fillRect(119,40,120,158);
    this.g.flip();
    // Header
    this.g.setColor(1,15);
    this.g.setFont("Vector",25);
    this.g.drawString("ROTATE  MIRROR",3,10);
    this.g.flip();
//side
    this.run=true;
    this.disp=-1;
    this.key=-1;
  },
  show : function(){
    if (!this.run) return;
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
  rotate: function(){
    if (scr.rotate==3) scr.rotate=0;
    else scr.rotate++;
    w.gfx.setRotation(scr.rotate, scr.mirror); face[0].init();
    let t = acc.mode; acc.off(); acc.on(t);
  },
  mirror: function(){
    if (scr.mirror==true) scr.mirror=false;
    else scr.mirror=true;
    w.gfx.setRotation(scr.rotate, scr.mirror); face[0].init();
  },
  off: function(o){
    this.g.off();
    this.clear(o);
  }
};
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
//touch
touchHandler[0]=function(e,x,y){
 //   var va;
  //short press
  if (e==5){
    if (x<119 && 39<y && y<159) { //rotate
      face[0].rotate();
    } else if(121<x && 39<y && y<159){ //mirror
      face[0].mirror();
    } else buzzer.nav(40);
  } else if (e==1){ //slide dn
    require('Storage').writeJSON('scrorient.json', scr);
    if (face.faceSave!=-1) {
      face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
    } else face.go("clock",0);
    return;
  } else if  (e==2){ //slide up
    if (y>160&&x<50) {
    if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
    else w.gfx.bri.set(this.bri);
    buzzer.nav([30,50,30]);
  } else
    require('Storage').writeJSON('scrorient.json', scr);
    face.go("settings",0);return;
  }
  this.timeout();
};
