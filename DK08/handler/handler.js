//handler
function col(no){
	switch (no) {
      case "black":return 0;case "dblue":return 1;case "green":return 2;case "teal":return 3;case "red":return 4;case "pink":return 5;
	  case "yellow":return 6;case "lgray":return 7;case "gray":return 8;case "blue":return 9;case "lgreen":return 10;case "lblue":return 11;
  	  case "yellow1":return 12;case "lping":return 13;case "yellow2":return 14;case "white":return 15;
	}
}
//settings 
var set={
  bt:0, //Incomming BT service status indicator- Not user settable.0=not_connected|1=unknown|2=webide|3=gadgetbridge|4=atc|5=esp32
  tor:0, //Enables/disables torch- Not user settable.
  ondc:0, //charging indicator-not user settable.
  btsl:0, //bt sleep status-not user settable.
  gIsB:0,//gat status-n.u.s- 0=not busy|1=busy 
  fmp:0, //find my phone-n.u.s.
  boot:getTime(), 
  gDis:function(){
	if (this.gIsB) {
		this.gIsb=2;
		if (global["\xFF"].BLE_GATTS) {
          if (global["\xFF"].BLE_GATTS.connected)
          global["\xFF"].BLE_GATTS.disconnect().then(function (c){this.gIsB=0;});
        }else gIsB=0;
     }
  },
  updateSettings:function(){require('Storage').write('setting.json', set.def);},
  resetSettings:function() {
	set.def = {
	name:"EUCWatch", //Set the name to be broadcasted by the Bluetooth module. 
	timezone:3, //Timezone
	woe:1, //wake Screen on event.0=disable|1=enable
	wob:1, //wake Screen on Button press.0=disable|1=enable
	rfTX:4, //BT radio tx power, -4=low|0=normal|4=high
	cli:1, //Nordic serial bluetooth access. Enables/disables Espruino Web IDE.
	hid:0, //enable/disable Bluetooth music controll Service.
	gb:0,  //Notifications service. Enables/disables support for "GadgetBridge" playstore app.
	atc:0, //Notifications service. Enables/disables support for "d6 notification" playstore app from ATC1441.
	acc:0, //enables/disables wake-screen on wrist-turn. 
	dnd:1, //Do not disturb mode, if ebabled vibrations are on.
	hidT:"media", //joy/kb/media
	bri:3 //Screen brightness 1..7
	};
	set.updateSettings();
  },
  accR:function(){if (this.def.acc)acc.on(); else acc.off();},
  hidM:undefined, //not user settable.
  clin:0,//not settable
  upd:function(){ //run this for settings changes to take effect.
	NRF.setServices(undefined,{uart:(this.def.cli||this.def.gb)?true:false});
	if (this.def.gb) eval(require('Storage').read('m_gb'));
	else {
		this.handleNotificationEvent=undefined;
		this.handleFindEvent=undefined;
		this.sendBattery=undefined;
		this.gbSend=undefined;
		global.GB=undefined;
	}		
    if (!this.def.cli&&!this.def.gb&&!this.def.atc&&!this.def.hid) { if (this.bt!=0) NRF.disconnect(); else{ NRF.sleep();this.btsl=1;}}
    else if (this.bt!=0) NRF.disconnect();
    else if (this.btsl==1) {NRF.restart();this.btsl=0;}
  }
};
set.def = require('Storage').readJSON('setting.json', 1);
if (!set.def) set.resetSettings();
//set.upd();
//face
var face={
  appCurr:"main",
  appPrev:"main",
  pageCurr:-1,
  pagePrev:-1,	
  pageArg:"",
  faceSave:-1,
  mode:0,
  offid:-1,
  offms:-1,
  off:function(page){ 
      if (this.pageCurr===-1) {print("face-1");return;}
      if (this.offid>=0) {clearTimeout(this.offid); this.offid=-1;}
      if (face[this.pageCurr]!=-1) this.offms=face[this.pageCurr].offms;
      this.offid=setTimeout((c)=>{
        this.offid=-1;
			//if (this.appCurr==="main") {
				//if (face[c].off) {
					//if (set.def.touchtype!="816") i2c.writeTo(0x15,0xa5,3); 
					//if (set.def.touchtype=="716") tfk.exit();	
					//face[c].off();this.pageCurr=-1;face.pagePrev=c;
				//}
			//}else 
	  },this.offms,this.pageCurr);
  },
  go:function(app,page,arg){
    this.appPrev=this.appCurr;
	this.pagePrev=this.pageCurr;
    this.appCurr=app;
    this.pageCurr=page;
	//if (this.pagePrev==-1&&w.gfx.isOn) {w.gfx.clear();w.gfx.off();}
    if (this.pagePrev!=-1) {
        face[this.pagePrev].clear();
    }
  	if (this.pageCurr==-1 && this.pagePrev!=-1) {
		//if (set.def.touchtype=="716")tfk.loop=100;
		//acc.go=0;
        face[this.pagePrev].off();
      if (this.offid>=0) {clearTimeout(this.offid); this.offid=-1;}
	  if (this.appCurr!=this.appPrev) eval(require('Storage').read(app));
		return;
	}
	if (this.appCurr!=this.appPrev) {
      face[1]=0;face[2]=0;face[5]=0;
	  this.appRoot=[this.appPrev,this.pagePrev,this.pageArg];
      eval(require('Storage').read(app));
    } 
	this.off(page);
	face[page].init(arg);	
	//if(!w.gfx.isOn) {w.gfx.on();
	//	if (set.def.touchtype!="816") digitalPulse(D13,1,[10,50]);
	//	if (set.def.touchtype=="716"){tfk.loop=5;if( tfk.tid==-1) tfk.init();}
	//}
	face[page].show(arg);
	if(arg) this.pageArg=arg;
  }
};

//button;
function buttonHandler(s){
  if (this.l1) {clearTimeout(this.l1); this.l1=-1;}
  if (s.state==true) { 
    this.press=true;
	if (!initdone) return;
	//manage light
	//this.blon=isDark();
	this.blon=true;
	if (this.blt) { clearTimeout(this.blt);this.blt=0;} else if (this.blon) g.bl(0.2); // backlight on 20%
	if (this.blon)
    this.blt=setTimeout(function(){
      g.bl(0);
      this.blt=0;
    },5000); //backlight off after 5 seconds
	//toggle EUC on long press
    this.l1=setTimeout(() => {
      this.l1=-1;
      if (typeof euc !== 'undefined' ) {
		euc.tgl();this.press=false;
      }
    }, 1000);
   }else if (this.press&&s.state==false)  { 
	this.press=false;
	if (face.pageCurr==-1) {
		digitalPulse(D6,1,[60,40,60]);
		if (global.euc){
			if (euc.conn!="OFF") face.go("euc",0);else face.go(face.appCurr,0);
		}else face.go(face.appCurr,0);
	}else { 
	  //if (face.appCurr=="main"&&face.pagePrev!=-1&&face.pagePrev!=2) {
        //if (set.def.acc==1) {
        //acc.off();
        //acc.go=0;
        //setTimeout(function(t){
		//  acc.on();
        //},2000);
        //}
      //  face.go("main",-1);
      //  digitalPulse(D6,1,100);
      //}else{
      var to=face.pageCurr+1;
      if (to>=2) to=0;
      face.go(face.appCurr,to);
	 // }
    }
	
  }
}
btn=setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:0});

tapHandler=[];