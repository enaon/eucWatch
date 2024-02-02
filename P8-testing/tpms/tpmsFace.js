//tpms face
face[0] = {
  offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:30000,
  g:w.gfx,
  spd:[],
  init: function(){
    if (euc.state!="OFF"&&face.appPrev.startsWith("dash")) face.faceSave=[face.appPrev,face.pagePrev,face.pageArg];
    //check if log is corrupted
    this.tpms=Object.keys(tpms.def.list).map(key => String(key));
    if (require("Storage").read("tpmsLog"+this.tpms[tpms.def.pos]+".json",1) && !require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1)){
      require("Storage").erase("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
      delete tpms.def.list[this.tpms[tpms.def.pos]];
    }
    if (!this.tpms.length) {tpms.def.allowNew=1;tpms.def.int=0;}
    //
    this.log=0;
    this.foot="bar";
    this.disp=0;
    if (!this.tpms[tpms.def.pos]) tpms.def.pos=0;
    //tpms.def.id=this.tpms[tpms.def.pos];
    if (this.tpms.length) {
      this.g.setColor(0,0);
      this.g.clearRect(0,186,239,195);
      this.g.flip();
      this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
      this.sc();
      //scale
      let tm=(getTime()|0) - this.log[tpms.def.ref].time;
      let ago=0;
      if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(this.log[tpms.def.ref].time*1000).toString().substr(4,17)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
      //info
      this.sel(this.log[tpms.def.ref][tpms.def.metric] ,ago,(tm < 86400)?"AGO":0);
      let cl=((getTime()|0) - this.log[0].time < 1800)?1:0;
      //top
      this.btn(cl,this.tpms[tpms.def.pos],35,75,13,(this.log[0].psi < tpms.def.list[this.tpms[tpms.def.pos]].lowP ||  tpms.def.list[this.tpms[tpms.def.pos]].hiP < this.log[0].psi )?13:4,1,0,0,149,50); //device
      this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,0,150,0,239,50);  //more

      if ( tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) {this.scan();this.ind();}
      else if (!this.ntid){this.bar();}
      this.page=0;
    } else {
      tpms.def.pos=0;
      this.g.setColor(0,0);
      this.g.clearRect(0,0,239,239);
      this.page="scan";
      this.btn(1,"TPMS SENSOR",25,120,7,0,0,0,0,239,50);
      this.btn(1,"TOUCH",30,120,80,1,1,0,50,239,185,"TO SCAN",30,120,130);
      if ( tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) this.scan();
    }
    this.ref=tpms.def.ref;
  },
  show : function(o){
    if(this.ref!=tpms.def.ref) {
      this.ref=tpms.def.ref;
      if (this.info){this.sel(this.log[tpms.def.ref].temp,this.log[tpms.def.ref].batt,"%");
      } else {
        let tm=(getTime()|0) - this.log[tpms.def.ref].time;let ago=0;
        if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(this.log[tpms.def.ref].time*1000).toString().substr(4,17)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}this.sel(this.log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
      }
    }
    this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show();
    },250,this);
  },
  sc:function(){
      this.scale=0;
      for (let i in this.log) {
        if (this.scale < this.log[i][tpms.def.metric]-0 ) this.scale=this.log[i][tpms.def.metric];
      }
      this.top=this.scale;
      this.scale=40/((this.scale)?this.scale:1);
  },
  bar: function(l){
    if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) {if (this.log ) this.ind(); return;}
    this.g.setColor(0,0);
    this.g.fillRect(0,190,(this.log)?58:239,239);
    this.g.setColor(1,11);
    let img = require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="));
    this.g.drawImage(img,5,195);
    this.g.flip();
    //this.ind();
    this.g.setColor(0,0);
    this.g.fillRect(59,190,239,239);
    if (!this.log ) return;
    for (let i in this.log) {
      //let lim=(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?1:0;
      //this.g.setColor(1,(lim)?13:4);
      if (this.log[i].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[i].psi)this.g.setColor(1,13);else this.g.setColor(1,4);
      this.g.fillRect(239-(i*18)-16, 239-(this.log[i][tpms.def.metric]*this.scale),239-(i*18), 239);
      this.g.flip();
    }
    this.ind();
  },
  ind: function(last){
    if (!this.log ) return;
    let lim=(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?1:0;
    if (last || last===0) {
      this.g.setColor(0,0);
      this.g.fillRect(239-(last*18)-16,186,239-(last*18),189);
      this.g.setColor(1,(this.foot=="barS")?0:(lim)?13:14);
      this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
    } else {
      this.g.setColor(0,0);
      this.g.fillRect(0,186,239,190);
      this.g.setColor(1, (this.foot=="barS")?0:(lim)?13:14);
      this.g.fillRect(239-(tpms.def.ref*18)-16,186,239-(tpms.def.ref*18),189);
    }
    this.g.flip();
    if (this.act) return;
    this.g.setColor(0,0);
    this.g.setColor(1,(lim)?13:14);
    this.g.fillRect(239-(tpms.def.ref*18)-16, 196,239-(tpms.def.ref*18), 238-(this.log[tpms.def.ref][tpms.def.metric]*this.scale));
    this.g.flip();
    if ((last || last===0) && last!=tpms.def.ref){
      this.g.setColor(1,0);
      this.g.drawRect(239-(last*18)-16,196,239-(last*18),  238-(this.log[last][tpms.def.metric]*this.scale));
      this.g.flip();
    }
  },
  scan: function(){
    this.act=1;
    if (tpms.status=="SUCCESS") {
      this.page=0;
      tpms.def.ref=0;
      this.tpms=Object.keys(tpms.def.list).map(key => String(key));
      tpms.def.pos=this.tpms.indexOf(tpms.def.id);
      this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
      this.sc();
      let cl=((getTime()|0) - this.log[0].time < 1800)?1:0;
      this.btn(cl,this.tpms[tpms.def.pos],35,75,7,(this.log[tpms.def.ref].psi<tpms.def.list[this.tpms[tpms.def.pos]].lowP||tpms.def.list[this.tpms[tpms.def.pos]].hiP<this.log[tpms.def.ref].psi)?13:4,1,0,0,149,50);
      this.btn(1,tpms.def.pos+1+"/"+this.tpms.length,35,200,7,0,4,150,0,239,50);
      this.sel(this.log[tpms.def.ref][tpms.def.metric],"JUST NOW");
      this.foot="bar";
      this.ntfy("FOUND : "+tpms.new,"",27,4,1,2);
      return;
    } else if (tpms.status=="NOT FOUND") {
      this.ntfy(tpms.status,"",27,13,1,2);
      return;
    }
    this.btn(1,tpms.status+" "+(tpms.def.wait-( (getTime()|0)-tpms.cnt) ),27,120,205,12,0,0,190,239,239,"",22,120,225);
    //refresh
    if (this.stid>=0) clearTimeout(this.stid);
    this.stid=setTimeout(function(t){
      t.stid=0;
      t.scan();
    },1000,this);
  },
  btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
    this.g.setColor(0,(bt)?clr1:clr0);
    this.g.fillRect(rx1,ry1,rx2,ry2);
    this.g.setColor(1,15);
    this.g.setFont("Vector",size1);
    this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1);
    if (txt2){this.g.setFont("Vector",size2);
    this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
    this.g.flip();
  },
  sel: function(txt1,txt2,txt3){
    txt1=txt1.split(".");
    this.g.setColor(0,1);
    this.g.fillRect(0,51,239,120);
    this.g.setColor(1,15);
    this.g.setFont("Vector",53);
    let size=this.g.stringWidth(txt1[0]);
    this.g.drawString(txt1[0],((this.info)?100:80)-(size/2),65);
    this.g.setFont("Vector",42);
    this.g.drawString("."+((this.info)?txt1[1].slice(0,1):txt1[1]),((this.info)?100:80)+(size/2),72);
    size=(size/2)+this.g.stringWidth((this.info)?txt1[1].slice(0,1):txt1[1]);
    this.g.setFont("Vector",20);
    this.g.drawString((this.info)?"°C":tpms.def.metric.toUpperCase(),((this.info)?117:97)+size,89);
    this.g.flip();
    this.g.setColor(0,1);
    if (txt3){
      this.g.fillRect(0,121,239,185);
      this.g.setColor(1,11);
      this.g.setFont("Vector",42);
      let size=this.g.stringWidth(txt2);
      this.g.drawString(txt2,((this.info)?120:110)-(size/2),135);
      this.g.setFont("Vector",20);
      this.g.drawString(txt3,((this.info)?122:112)+(size/2),152);
    } else {
      this.g.fillRect(0,121,239,185);
      this.g.setColor(1,15);
      this.g.setFont("Vector",30);
      this.g.drawString(txt2,120-(this.g.stringWidth(txt2)/2),145);
    }
    this.g.flip();
  },
  ntfy: function(txt1,txt2,size,clr,bt,tm,s,f,d){
    this.g.setColor(0,clr);
    this.g.fillRect(0,190,239,239);
    this.g.setColor(1,15);
    if (s) {this.g.setFont("Vector",45);this.g.drawString("<",5,197);this.g.drawString(">",215,197);}
    this.g.setFont("Vector",size);
    this.g.drawString((bt)?txt1:txt2,125-(this.g.stringWidth((bt)?txt1:txt2)/2),205);
    this.g.flip();
    if (this.ntid) clearTimeout(this.ntid);
    this.ntid=setTimeout(function(t){
      t.ntid=0;
      t.act=0;
      t[t.foot]();
    },tm*1000,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    this.run=false;
    if (this.tid) clearTimeout(this.tid);
    if (this.stid) clearTimeout(this.stid);
    if (this.ntid) clearTimeout(this.ntid);
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
    return;
  },
  show : function(){
    if (global.euc &&euc.state!="OFF"&&face.faceSave[0].startsWith("dash")){
      euc.dash.opt.tpms=face[0].tpms[tpms.def.pos];
      tpms.def.id=face[0].tpms[tpms.def.pos];
      face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
    } else if (global.euc && euc.state!="OFF")
      face.go(ew.is.dash[ew.def.dash.face],0);
    else
      face.go("settings",0,1);
    return;
  },
  clear: function(){
    return;
  },
  off: function(){
    return;
  },
};

//touch-main
touchHandler[0]=function(e,x,y){
  this.timeout();
  if (!this.lL) this.lL=getTime();
  switch (e) {
    case 5: //tap event
      if (face[0].page=="scan"){
        buzzer.nav([30,50,30]);
        tpms.scan();
        face[0].scan();
        return;
      } else if (190 < y && x < 80 ) {
        if ( tpms.status!="SCANNING"&&!tpms.status.startsWith("RETRY") ) {
          buzzer.nav([30,50,30]);
          tpms.scan();
          if (face[0].act && face[0].ntid) { clearTimeout(face[0].ntid);face[0].ntid=0;}
          face[0].scan();
        } else buzzer.nav(40);
        return;
      }
      if (50 < y) {
        //entry select
        if (!face[0].tpms.length ) {buzzer.nav(40);return;}
        let last=tpms.def.ref;
        buzzer.nav([30,50,30]);
        tpms.def.ref=(120<x)?(0<tpms.def.ref)?tpms.def.ref-1:face[0].log.length-1:(tpms.def.ref<face[0].log.length-1)?tpms.def.ref+1:0;
        /*if (face[0].info){
        face[0].sel(face[0].log[tpms.def.ref].temp,face[0].log[tpms.def.ref].batt,"%");
        } else {
          let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
          let ago=0;
          if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(tm*1000).toString().substr(4,16)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
          face[0].sel((face[0].log.length)?face[0].log[tpms.def.ref][tpms.def.metric]:face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
        }
        */
        face[0].ind(last);
        return;
      } else {
        if  ( 150 < x ) { //settings
          if  (tpms.status!="SCANNING"&&!tpms.status.startsWith("RETRY")  ) {
            buzzer.nav([30,50,30]);
            face.go("tpmsOptions",0);
            return;
          } else buzzer.nav(40);
        } else { //sensor
          if (face[0].tpms.length<=1) {buzzer.nav(40);return;}
          buzzer.nav([30,50,30]);
          if (face[0].act && face[0].ntid) { clearTimeout(face[0].ntid);face[0].ntid=0;}
          if (tpms.def.pos+1 < face[0].tpms.length) tpms.def.pos++;
          else tpms.def.pos=0;
          tpms.def.ref=0;
          face[0].log=face[0].log=require("Storage").readJSON("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1);
          face[0].sc();
          let cl=((getTime()|0) - face[0].log[0].time < 1800)?1:0;
          face[0].btn(cl,face[0].tpms[tpms.def.pos],35,75,7,(face[0].log[0].psi<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP||tpms.def.list[face[0].tpms[tpms.def.pos]].hiP<face[0].log[0].psi)?13:4,1,0,0,149,50);
          face[0].btn(1,tpms.def.pos+1+"/"+face[0].tpms.length,35,200,7,0,4,150,0,239,50);
          //face[0].sc();
          face[0].info=0;
          let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
          let ago=0;
          if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}
          else {ago=(new Date(face[0].log[tpms.def.ref].time*1000).toString().substr(4,17)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
          face[0].sel(face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
          face[0].bar();
        }
      }
      break;
    case 1: //slide down event
      if (global.euc && euc.state!="OFF"&&face.faceSave[0].startsWith("dash")){
        euc.dash.opt.tpms=face[0].tpms[tpms.def.pos];
        tpms.def.id=face[0].tpms[tpms.def.pos];
        face.go(ew.is.dash[ew.def.dash.face],0);
      } else if (face.faceSave!=-1) {
        face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
      } else
        face.go("clock",0);
      return;
    case 2: //slide up =event
      if (y>160&&x<50) {
        buzzer.nav([30,50,30]);
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
      } else {
        face.go("settings",0);
        return;
      }
      break;
    case 3: //slide left event
      if (!face[0].log) {buzzer.nav(40);return;}
      buzzer.nav([30,50,30]);
      if (face[0].info) {
        face[0].info=0;
        let tm=(getTime()|0) - face[0].log[tpms.def.ref].time;
        let ago=0;
        if (tm < 86400){if(tm<60){ago=tm+"''";}else if(tm<3600){ago=((tm/60)|0)+"'";}else{ago=new Date(tm*1000).toISOString().substr(11,5).split(":");ago=Number(ago[0])+"h "+ago[1]+"'";}}else {ago=(new Date(face[0].log[tpms.def.ref].time*1000).toString().substr(4,17)).split(" ");ago=ago[0]+" "+ago[1]+" "+ago[3];}
        face[0].sel(face[0].log[tpms.def.ref][tpms.def.metric],ago,(tm < 86400)?"AGO":0);
        return;
      } else {
        face[0].info=1;
        face[0].sel(face[0].log[tpms.def.ref].temp,face[0].log[tpms.def.ref].batt,"%");
      }
      return;
    case 4: //slide right event (back action)
      if (global.euc && euc.state!="OFF"&&face.faceSave[0].startsWith("dash")){
        euc.dash.opt.tpms=face[0].tpms[tpms.def.pos];
        tpms.def.id=face[0].tpms[tpms.def.pos];
        face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
      }else
        face.go("settings",0,1);
      return;
    case 12: //touch and hold(long press) event
      buzzer.nav(40);
      return;
  }
};
