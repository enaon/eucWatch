//kingsong euc module 
//m_euc
//euc.conn(euc.mac[euc.go]);
//euc.wri("lightsOn")
//euc.ch.writeValue([0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A]) 
//
euc.cmd=function(no){
	switch (no) {
	  case "pass":return [0xAA,0x55,0x31,0x32,0x33,0x34,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
      case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
	  case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
	  case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
	  case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
      case "lightsOn":euc.lght=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
      case "lightsOff":euc.lght=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
	  case "lightsAuto":euc.lght=4;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
      case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
	  case "lock":euc.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
	  case "unlock":euc.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];	  
    }
};
//
euc.conn=function(mac){
var euc_al;
var euc_al_s;
var euc_al_a;
var euc_al_t;
var euc_al_b;

if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
}
//start connection  
NRF.connect(mac,{minInterval:7.5, maxInterval:7.5})
.then(function(g) {
   return g.getPrimaryService(0xffe0);
}).then(function(s) {
  return s.getCharacteristic(0xffe1);
}).then(function(c) {
  c.on('characteristicvaluechanged', function(event) {
    this.KSdata = event.target.value.buffer;
    if (euc.busy) return;
    if (this.KSdata[16]==169) {
		this.alert=0;
        euc.dash.spd=((((this.KSdata[4] & 0xFF) + (this.KSdata[5] << 8))/100)).toFixed(1); 
		if (euc.dash.spd>euc.dash.spd3)  {
			euc.dash.spdC=3;this.alert=1;
		}else if (euc.dash.spd>euc.dash.spd2) {
			euc.dash.spdC=2;this.alert=1;
		}else if (euc.dash.spd>euc.dash.spd1) {
			euc.dash.spdC=1;this.alert=1;			
		}
        //amp
		this.cur=((this.KSdata[10] & 0xFF) + (this.KSdata[11] << 8));
        if (this.cur > 32767) this.cur = this.cur - 65536;
        euc.dash.amp=(this.cur/100).toFixed(2);
		//charging
		if (euc.dash.spd[0]===0&&euc.dash.amp<0) {
		}
		//
		else if (euc.dash.amp>30)  {
			euc.dash.ampC=3;this.alert=1;
			euc.dash.spdC=3;		
		}else if (euc.dash.amp>23) {
			euc.dash.ampC=2;this.alert=1;
			if (euc.dash.spdC!=3) euc.dash.ampC=2;
		}else if (euc.dash.amp>15)  {
			euc.dash.ampC=1;
			if (euc.dash.spdC==0) euc.dash.spdC=1;
		}else if (euc.dash.amp<-10)  {
			euc.dash.ampC=3;this.alert=1;
			euc.dash.spdC=3;
		}else if (euc.dash.amp<-5)  {
			euc.dash.ampC=2;this.alert=1;
			if (euc.dash.spdC!=3) euc.dash.spdC=2;
		}else if (euc.dash.amp<0)  {
			euc.dash.ampC=1;this.alert=1;
			if (euc.dash.spdC==0) euc.dash.spdC=1;
		}else {euc.dash.ampC=0;}
		
		//volt
        euc.volt=(((this.KSdata[2] & 0xFF) + (this.KSdata[3] << 8))/100)+"";
        euc.dash.bat=(((euc.volt/20)*100-330)*1.1111)|0;
		if (euc.dash.bat<20)  {
			euc.dash.batC=3;this.alert=1;
			euc.dash.spdC=3;
		}else if (euc.dash.bat<60) {
			euc.dash.batC=2;this.alert=1;
		} else euc.dash.batC=0;
        //temp
		euc.dash.tmp=(((this.KSdata[12] & 0xFF) + (this.KSdata[13] << 8))/100)+"";
		if (euc.dash.tmp>65)  {
			euc.dash.tmpC=3;this.alert=1;
			euc.dash.spdC=3;
		}else if (euc.dash.tmp>55) {
			euc.dash.tmpC=2;this.alert=1;
		} else euc.dash.tmpC=0;
		//trip
        euc.dash.trpT=(((this.KSdata[6] << 16) + (this.KSdata[7] << 24) + this.KSdata[8] + (this.KSdata[9] << 8))/1000).toFixed(1);
		//mode                                    
        euc.rmode=this.KSdata[14];
		////////////////////////if (!this.alert)  euc.dash.spdC=0;
    }else if  (this.KSdata[16]==185){
        euc.dash.trpL=(((this.KSdata[2] << 16) + (this.KSdata[3] << 24) + this.KSdata[4] + (this.KSdata[5] << 8)) / 1000.0).toFixed(1);
		euc.dash.time=(((this.KSdata[6] & 0xFF) + (this.KSdata[7] << 8)) / 60.0).toFixed(0);
        euc.dash.spdT=(((this.KSdata[8] & 0xFF) + (this.KSdata[9] << 8)) / 100.0).toFixed(1);
    }else if (euc.state=="OFF"){
      euc.busy=1;
	  if (set.def.cli) console.log("EUCstartOff");
	  euc.lock=1;
      digitalPulse(D16,1,120);
	  c.writeValue(euc.cmd("lightsAuto"));
      if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	  euc.reconnect=setTimeout(() => {c.writeValue(euc.cmd("lock")).then(function() {
		euc.reconnect=0;global["\xFF"].BLE_GATTS.disconnect();});
	  }, 200);
    return;
	}
  });
return  c;
}).then(function(c) {
//on disconnect
  euc.ch=c;
  global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
    if (set.def.cli) console.log("EUC Disconnected :",reason);
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
    if (euc.state!="OFF") {  
	 if (set.def.cli) console.log("EUC restarting");
     euc.state="WAIT";
     euc.reconnect=setTimeout(() => {  euc.conn(euc.mac); }, 500);
      return;
    }else {
	  if (set.def.cli) console.log("Destroy euc (reason):",reason);
	  global["\xFF"].bleHdl=[];
	  global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
      NRF.setTxPower(set.def.rfTX);
    }
  });
//connected ****************************
  console.log("EUC connected"); 
  digitalPulse(D16,1,[90,40,150,40,90]);
  euc.busy=1;
  setTimeout(function(){c.writeValue(euc.cmd("serial"));euc.state="READY";},200);
  setTimeout(function(){c.writeValue(euc.cmd("pass"));},500);
  setTimeout(function(){c.writeValue(euc.cmd("unlock"));euc.lock=0;euc.busy=0;},800);
  setTimeout(function(){c.startNotifications();},1500);
//reconect
}).catch(function(err)  {
  if (set.def.cli) console.log("EUC error", err);
  if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
//  global.error.push("EUC :"+err);
  if (euc.state!="OFF") {
    if (set.def.cli) console.log("not off");
    if ( err==="Connection Timeout"  )  {
	  if (set.def.cli) console.log("retrying :timeout");
	  euc.state="LOST";
	  if (euc.lock==1) digitalPulse(D16,1,250);
	  else digitalPulse(D16,1,[250,200,250,200,250]);
	  euc.reconnect=setTimeout(() => {
		euc.reconnect=0;
	    euc.conn(euc.mac); 
	  }, 5000);
	}else if ( err==="Disconnected"|| err==="Not connected")  {
      if (set.def.cli) console.log("retrying :",err);
      euc.state="FAR";
	  //if (euc.lock==1) digitalPulse(D16,1,40);
	  //else digitalPulse(D16,1,[100,150,100]);
      euc.reconnect=setTimeout(() => {
		euc.reconnect=0;
	    euc.conn(euc.mac); 
      }, 500);
    }
  } else {
  	  if (set.def.cli) console.log("Destroy euc (reason-1):",reason);
	  global["\xFF"].bleHdl=[];
      global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
      NRF.setTxPower(set.def.rfTX);
  }
});
};
//
euc.wri= function(n) {
  euc.ch.writeValue(euc.cmd(n));
  return;
};
