//tpms face
face[0] = {
  offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:30000,
  g:w.gfx,
  spd:[],
  init: function(){
    this.log=0;
    this.foot="barS";
    this.page="sett";
    this.disp=0;
    this.tpms=Object.keys(tpms.def.list);
    if (!this.tpms[tpms.def.pos]) tpms.def.pos=0;
    this.log=require("Storage").readJSON("tpmsLog"+this.tpms[tpms.def.pos]+".json",1);
    this.sett();
  },
  show : function(o){
    return;
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
  sett:function(){
    let tpmsS=["OFF","5 MIN","30 MIN","1 HOUR","6 HOURS"];
    this.barS();
    this.btn(tpms.def.allowNew,(tpms.def.allowNew)?"ALLOW":"BLOCK",25,80,20,4,13,0,0,155,60);//1-2
    this.g.setColor(0,0);
    this.g.clearRect(156,0,159,60);
    this.g.flip();
    this.btn(1,(tpms.def.metric=="psi")?tpms.def.list[this.tpms[tpms.def.pos]].hiP: (tpms.def.list[this.tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,1,0,160,0,239,60); //3
    this.g.setColor(0,0);
    this.g.clearRect(0,61,239,64);
    this.g.flip();
    this.btn(tpms.def.int,"SCAN",28,80,84,4,(euc.state!="OFF"&&euc.dash.opt.tpms)?12:1,0,65,155,125); //4-5
    this.g.setColor(0,0);
    this.g.clearRect(156,65,159,125);
    this.g.flip();
    this.btn(1,(tpms.def.metric=="psi")?tpms.def.list[this.tpms[tpms.def.pos]].lowP:(tpms.def.list[this.tpms[tpms.def.pos]].lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,1,0,160,65,239,125); //6
    this.g.setColor(0,0);
    this.g.clearRect(0,126,239,129);
    this.g.flip();
    this.btn(1,"WAIT",18,40,152,1,0,0,130,80,185); //7
    this.g.setColor(0,0);
    this.g.clearRect(81,130,84,185);
    this.g.flip();
    this.btn(1,"RETRY",18,123,152,1,0,85,130,155,185); //8
    this.g.setColor(0,0);
    this.g.clearRect(156,130,159,185);
    this.g.flip();
    this.btn(1,tpms.def.metric.toUpperCase(),28,205,150,4,0,160,130,239,185,"",30,205,40); //9
  },
  barS: function(){
    this.g.setColor(0,0);
    this.g.clearRect(0,126,239,129);
    this.g.flip();
    this.btn(1,"WAIT",18,40,152,1,0,0,130,80,185); //7
    this.g.setColor(0,0);
    this.g.clearRect(81,130,84,185);
    this.g.flip();
    this.btn(1,"RETRY",18,123,152,1,0,85,130,155,185); //8
    this.g.setColor(0,0);
    this.g.clearRect(156,130,159,185);
    this.g.flip();
    this.btn(1,tpms.def.metric.toUpperCase(),28,205,150,4,0,160,130,239,185,"",30,205,40); //9
    if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY")) return;
    this.g.setColor(0,0);
    this.g.fillRect(0,186,239,239);
    this.g.setColor(1,11);
    this.g.setFont("Vector",55);
    this.g.drawString("<",15,195);
    img = require("heatshrink").decompress(atob("mEwwIROv/+AqoAPgf/AAXAg4FD8AFLFSQTCg8AgPwAoMPwAFHkAFE+EPAv4FLsEGL5IFVgH8AoM/AQKnDawQEBbAU/AoIUCj4FB/DkTAAgA="));
    this.g.drawImage(img,177,195);
    img=0;
    this.g.flip();
  },
  ntfy: function(txt1,txt2,size,clr,bt,tm,s,f,d){
    if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) return;
    if (f && this.ntid) {clearTimeout(this.ntid);this.ntid=0;}
    if (!this.ntid){
      this.g.setColor(0,clr);
      this.g.fillRect(0,130,239,239);
      this.g.setColor(1,15);
      if (s) {this.g.setFont("Vector",40);this.g.drawString("<",5,170);this.g.drawString(">",215,170);}
      this.g.setFont("Vector",size);
      this.g.drawString(txt1,125-(this.g.stringWidth(txt1)/2),150);
      //this.g.setFont("Vector",size);
      this.g.drawString(txt2,125-(this.g.stringWidth(txt2)/2),205);
      this.g.flip();
    }
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
    if (this.tid>=0) clearTimeout(this.tid);
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
    let got=require("Storage").readJSON("tpms.json",1);
    got.def=tpms.def;
    require("Storage").writeJSON("tpms.json",got);
    if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
    face.go("tpmsFace",0,1);
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
  if (tpms.status=="SCANNING"||tpms.status.startsWith("RETRY") ) {face.go("tpmsFace",0);return;}
  this.timeout();
  if (!this.lL) this.lL=getTime();
  switch (e) {
    case 5: //tap event
      if ( 125<y&&face[0].act) {
        if (face[0].act=="conf"){
          buzzer.nav([100,50,100]);
          delete tpms.def.list[face[0].tpms[tpms.def.pos]];
          require("Storage").erase("tpmsLog"+face[0].tpms[tpms.def.pos]+".json",1);
          face[0].ntfy(face[0].tpms[tpms.def.pos]+" CLEARED","",25,13,1,2,0,1,0);
          tpms.def.pos=0;
          let got=require("Storage").readJSON("tpms.json",1);
          got.def=tpms.def;
          require("Storage").writeJSON("tpms.json",got);
          got=0;
          setTimeout(()=>{face.go("tpmsFace",0);},1000);
          return;
        } else if (face[0].act=="del") {
          buzzer.nav([30,50,30]);
          face[0].ntfy("TAP TO","DELETE",26,13,1,2,0,1,1);
          face[0].act="conf";
        } else if (face[0].act=="hi") {
          buzzer.nav([30,50,30]);
          let fast=( getTime()-this.lL < 0.2 )?1:0;
          if  ( x < 120 ) {tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-((fast)?5:1);if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP){tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP+5;if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP<20)tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=20;}}
          else {tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP+((fast)?5:1); if ( 250 < tpms.def.list[face[0].tpms[tpms.def.pos]].hiP ) tpms.def.list[face[0].tpms[tpms.def.pos]].hiP=250;}
          face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].hiP: (tpms.def.list[face[0].tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,1,0,160,0,239,60); //3
          face[0].ntfy("","",27,0,1,2,0,0);
          this.lL=getTime();
        } else if (face[0].act=="low") {
          buzzer.nav([30,50,30]);
          let fast=( getTime()-this.lL < 0.2 )?1:0;
          if  ( x < 120 ) {tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP-((fast)?5:1); if (  tpms.def.list[face[0].tpms[tpms.def.pos]].lowP <1 ) tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=1;}
          else { tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].lowP+((fast)?5:1);if(tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5<tpms.def.list[face[0].tpms[tpms.def.pos]].lowP){tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=tpms.def.list[face[0].tpms[tpms.def.pos]].hiP-5;if ( 150 < tpms.def.list[face[0].tpms[tpms.def.pos]].lowP ) tpms.def.list[face[0].tpms[tpms.def.pos]].lowP=150;}}
          face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].lowP:(tpms.def.list[face[0].tpms[tpms.def.pos]].lowP/ ((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,1,0,160,65,239,125); //6
          face[0].ntfy("","",27,0,1,2,0,0);
          this.lL=getTime();
        } else if (face[0].act=="allow") {
          buzzer.nav(40);
        } else if (face[0].act=="int") {
          buzzer.nav([30,50,30]);
          tpms.def.int++; if (4 < tpms.def.int) tpms.def.int=0;
          let tpmsS=["ONCE","5 MIN","30 MIN","1 HOUR","6 HOURS"];
          face[0].ntfy((tpms.def.int)?"EVERY":"EUC",(tpms.def.int)?tpmsS[tpms.def.int]:"MODE",27,(tpms.def.int)?4:(euc.state!="OFF"&&euc.dash.opt.tpms)?12:1,1,3,1,1,1);
          face[0].btn(tpms.def.int,"SCAN",28,80,84,4,(euc.state!="OFF"&&euc.dash.opt.tpms)?12:1,0,65,155,125); //4-5
        } else if (face[0].act=="wait") {
          buzzer.nav([30,50,30]);
          let fast=( getTime()-this.lL < 0.2 )?1:0;
          tpms.def.wait=(x<120)?(tpms.def.wait<6)?5:tpms.def.wait-((fast)?5:1):(119<tpms.def.wait)?120:tpms.def.wait+((fast)?5:1);
          face[0].ntfy("SCAN FOR",tpms.def.wait+" SECONDS",25,4,1,2,1,1,1);
          this.lL=getTime();
        } else if (face[0].act=="try") {
          buzzer.nav([30,50,30]);
          tpms.def.try=(x<120)?(tpms.def.try<1)?0:tpms.def.try-1:(3<tpms.def.try)?4:tpms.def.try+1;
          face[0].ntfy("RETRIES",tpms.def.try+1,25,4,1,2,1,1,1);
        }
        return;
      }
      if (face[0].page=="sett"){
        if ( 0 < x && x < 155 && y < 62 ) { //1-2
          buzzer.nav([30,50,30]);
          tpms.def.allowNew=1-tpms.def.allowNew;
          face[0].btn(tpms.def.allowNew,(tpms.def.allowNew)?"ALLOW":"BLOCK",25,80,20,4,13,0,0,155,60);//1-2
          face[0].ntfy("NEW SENSOR","DISCOVERY",26,(tpms.def.allowNew)?4:13,1,1,0,1,1);
          face[0].act="allow";
        } else if (155 <= x && y < 62) { //3
          buzzer.nav([30,50,30]);
          if ( face[0].act == "hi" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
          else {face[0].ntfy("UPPER","(in "+tpms.def.metric.toUpperCase()+")",30,12,1,4,1,1,1);face[0].act="hi";}
        } else if (0 <= x && x < 155 && 62 < y && y < 127) { //4-5
          buzzer.nav([30,50,30]);
          if ( face[0].act == "int" ) {
            if (face[0].ntid) {clearTimeout(face[0].ntid);face[0].ntid=0;}
            face[0].barS();
            face[0].act=0;
          } else {
            let tpmsS=["ONCE","5 MIN","30 MIN","1 HOUR","6 HOURS"];
            face[0].ntfy((tpms.def.int)?"EVERY":"EUC",(tpms.def.int)?tpmsS[tpms.def.int]:"MODE",27,(tpms.def.int)?4:(euc.state!="OFF"&&euc.dash.opt.tpms)?12:1,1,3,1,1,1);
            face[0].act="int";
          }
        } else if (155 <= x && 62 <y && y < 127) { //6
          buzzer.nav([30,50,30]);
          if ( face[0].act == "low" ) {face[0].barS();if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;face[0].act=0;}
          else {face[0].ntfy("LOWER","(in "+tpms.def.metric.toUpperCase()+")",30,12,1,4,1,1,1);face[0].act="low";}
        } else if (x < 80 && 127 <y && y < 190) { //7
          buzzer.nav([30,50,30]);
          face[0].act="wait";
          face[0].ntfy("SCAN FOR",tpms.def.wait+" SECONDS",25,4,1,2,1,1,1);
        } else if (80 <  x && x < 160 && 127 <y && y < 190) { //8
          buzzer.nav([30,50,30]);
          face[0].act="try";
          face[0].ntfy("RETRIES",tpms.def.try+1,25,4,1,2,1,1,1);
        } else if (160 < x && 127 <y && y < 190) { //9 bar-psi
          face[0].act=0;
          buzzer.nav([30,50,30]);
          tpms.def.metric=(tpms.def.metric=="psi")?"kpa":(tpms.def.metric=="kpa")?"bar":"psi";
          face[0].btn(1,tpms.def.metric.toUpperCase(),28,205,150,4,0,160,130,239,185,"",30,205,40);
          face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].hiP: (tpms.def.list[face[0].tpms[tpms.def.pos]].hiP/((tpms.def.metric=="bar")?14.50377377:0.1450377377) ).toFixed((tpms.def.metric=="bar")?2:0),38,205,15,1,0,160,0,239,60); //3
          face[0].btn(1,(tpms.def.metric=="psi")?tpms.def.list[face[0].tpms[tpms.def.pos]].lowP:(tpms.def.list[face[0].tpms[tpms.def.pos]].lowP/((tpms.def.metric=="bar")?14.50377377:0.1450377377 )).toFixed((tpms.def.metric=="bar")?2:0),38,205,81,1,0,160,65,239,125); //6
        } else {
          if ( x < 80 ){
            buzzer.nav([30,50,30]);
            face.go("tpmsFace",0);
            return;
          } else if ( 160 < x ) {
            buzzer.nav([30,50,30]);
            face[0].ntfy("DELETE",face[0].tpms[tpms.def.pos],25,1,1,2,0,1,1);
            face[0].act="del";
          } else {
            buzzer.nav(40);
          }
        }
      }
      break;
    case 1: //slide down event
      let got=require("Storage").readJSON("tpms.json",1);
      got.def=tpms.def;
      require("Storage").writeJSON("tpms.json",got);
      if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
      if (euc.state!="OFF"&&face.faceSave[0].startsWith("dash")){
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
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
        buzzer.nav([30,50,30]);
      } else {
        let got=require("Storage").readJSON("tpms.json",1);
        got.def=tpms.def;
        require("Storage").writeJSON("tpms.json",got);got=0;
        if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
        face.go("settings",0,1);
      }
      break;
    case 3: //slide left event
      buzzer.nav(40);
      return;
    case 4: //slide right event (back action)
      if (face[0].act) {
        face[0].act=0;
        if (face[0].ntid) {clearTimeout(face[0].ntid);face[0].ntid=0;}
        face[0].barS();
      } else {
        let got=require("Storage").readJSON("tpms.json",1);
        got.def=tpms.def;
        require("Storage").writeJSON("tpms.json",got);got=0;
        if (tpms.def.int) tpms.scan(); else if (tpms.tid) {clearTimeout(tpms.tid); tpms.tid=0;}
        face.go("tpmsFace",0,1);
        return;
      }
      break;
    case 12: //touch and hold(long press) event
      buzzer.nav(40);
      return;
  }
};
