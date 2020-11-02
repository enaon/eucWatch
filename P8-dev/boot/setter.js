//setter
//settings - run set.upd() after changing BT settings to take effect.
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
	name:"p8-EUCWatch", //Set the name to be broadcasted by the Bluetooth module. 
	timezone:3, //Timezone
	woe:1, //wake Screen on event.0=disable|1=enable
	wob:1, //wake Screen on Button press.0=disable|1=enable
	rfTX:4, //BT radio tx power, -4=low|0=normal|4=high
	cli:1, //Nordic serial bluetooth access. Enables/disables Espruino Web IDE.
	hid:0, //enable/disable Bluetooth music controll Service.
	gb:1,  //Notifications service. Enables/disables support for "GadgetBridge" playstore app.
	atc:0, //Notifications service. Enables/disables support for "d6 notification" playstore app from ATC1441.
	acc:1, //enables/disables wake-screen on wrist-turn. 
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
	if (this.def.hid==1&&this.hidM==undefined) {
		Modules.addCached("ble_hid_controls",function(){
		function b(a,b){NRF.sendHIDReport(a,function(){NRF.sendHIDReport(0,b);});}
		exports.report=new Uint8Array([5,12,9,1,161,1,21,0,37,1,117,1,149,5,9,181,9,182,9,183,9,205,9,226,129,6,149,2,9,233,9,234,129,2,149,1,129,1,192]);
		exports.next=function(a){b(1,a);};
		exports.prev=function(a){b(2,a);};
		exports.stop=function(a){b(4,a);};
		exports.playpause=function(a){b(8,a);};
		exports.mute=function(a){b(16,a);};
		exports.volumeUp=function(a){b(32,a);};
		exports.volumeDown=function(a){b(64,a);};});
		this.hidM=require("ble_hid_controls");
/*		if (this.def.hidT=="joy") this.hidM = E.toUint8Array(atob("BQEJBKEBCQGhAAUJGQEpBRUAJQGVBXUBgQKVA3UBgQMFAQkwCTEVgSV/dQiVAoECwMA="));
		else if (this.def.hidT=="kb") this.hidM = E.toUint8Array(atob("BQEJBqEBBQcZ4CnnFQAlAXUBlQiBApUBdQiBAZUFdQEFCBkBKQWRApUBdQORAZUGdQgVACVzBQcZAClzgQAJBRUAJv8AdQiVArECwA=="));
		else this.def.hidM = E.toUint8Array(atob("BQEJBqEBhQIFBxngKecVACUBdQGVCIEClQF1CIEBlQV1AQUIGQEpBZEClQF1A5EBlQZ1CBUAJXMFBxkAKXOBAAkFFQAm/wB1CJUCsQLABQwJAaEBhQEVACUBdQGVAQm1gQIJtoECCbeBAgm4gQIJzYECCeKBAgnpgQIJ6oECwA=="));
*/
  	}else if (this.def.hid==0 &&this.hidM!=undefined) {
		this.hidM=undefined;
		if (global["\xFF"].modules.ble_hid_controls) Modules.removeCached("ble_hid_controls");
    }
	if (!Boolean(require('Storage').read('atc'))) this.def.atc=0;
	if (this.def.atc) eval(require('Storage').read('atc'));
	else {
		NRF.setServices(undefined,{uart:(this.def.cli||this.def.gb)?true:false,hid:(this.def.hid&&this.hidM)?this.hidM.report:undefined });
		if (this.atcW) {this.atcW=undefined;this.atcR=undefined;} 
	}
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
//
//eval(require('Storage').read('handler.set')); //get defaults
E.setTimeZone(set.def.timezone);
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!set.def.cli&&!set.def.gb&&!set.def.atc&&!set.def.hid){
      NRF.sleep();
      set.btsl=1;
    }	
	if (set.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnected"});
	else if (set.bt==2) handleInfoEvent({"src":"BT","title":"IDE","body":"Disconnected"});
	else if (set.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnected"});
	else if (set.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (set.bt==5) handleInfoEvent({"src":"BT","title":"ESP","body":"Disconnected"});
  	set.bt=0; 
//	digitalPulse(D16,1,[100,50,50,50,100]); 
}
function bcon() {
	set.bt=1; 
//    digitalPulse(D16,1,100);
	if (set.def.cli==1||set.def.gb==1)  Bluetooth.on('data',ccon);
}
function ccon(l){ 
    var cli="\x03";
    var gb="\x20\x03";
	if (set.def.cli) {
		if (l.startsWith(cli)) {set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		print("Welcome.\n** Working mode **\nUse devmode (Settings-Info-long press on Restart) for uploading files."); 
		handleInfoEvent({"src":"BT","title":"IDE","body":"Connected"});
		}
    }
    if (set.def.gb) if (l.startsWith(gb)){
		set.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		handleInfoEvent({"src":"BT","title":"GB","body":"Connected"});
		}
    if (l.length>5)  NRF.disconnect();
}
NRF.setTxPower(set.def.rfTX);
//E.setConsole(null,{force:true});
NRF.setAdvertising({}, { name:set.def.name,connectable:true });
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
set.upd();