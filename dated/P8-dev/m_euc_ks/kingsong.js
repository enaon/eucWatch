//kingsong euc module 
//m_euc

if (!global.euc){
//vars
NRF.setTxPower(0);

global.euc= {
  spd: ["0","0"], 
  spdC:col("black"),
  spdT:0,
  amp: "0", 
  ampC: col("black"), 
  batt: "0", 
  batC: col("dblue"), 
  temp: "0", 
  tmpC: col("dblue"), 
  trpC: col("black"), 
  trpN: "0.0", 
  trpL: "0.0", 
  trpT: "0.0", 
  trpR: "0.0",
  aver:"0.0",
  rdmd:0,
  time:"0",
  lock: -1,
  alrm: 0,
  conn: "OFF",
  alck: 0,
  far: 83,
  near: 65,
  //mac:{0:"64:69:4e:75:89:4d public"},
  //go:0,
  busy:0
};
//alerts
euc.alert = {
  spd: 23,
  temp: 60,
  batt: 20,
  ampH: 18,
  ampL: -6,
  on: false,
};
euc.tmp = {
  spd: ["0","0"], 
  amp: "0", 
  temp: "0", 
  count:0,
  batt: "0", 
  trpN: "0",
  cmd: false,
  reconnect:-1,
  rssi:"",
};
euc.cmd=function(no){
	switch (no) {
	  case "pass":return [0xAA,0x55,0x31,0x32,0x33,0x34,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
      case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
	  case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
	  case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
	  case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
      case "lightsOn":return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
      case "lightsOff":return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
	  case "lightsAuto":return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
      case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
	  case "lock":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
	  case "unlock":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];	  
    }
};
}

euc.con=function(mac){
var euc_al;
var euc_al_s;
var euc_al_a;
var euc_al_t;
var euc_al_b;

if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
}
  
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
        euc.spd=((decode2byte(this.KSdata[4],this.KSdata[5])/100)+"").split("."); 
		if (euc.spd[0]>45)  {
			euc.spdC=col("red");this.alert=1;
		}else if (euc.spd[0]>35) {
			euc.spdC=col("yellow");this.alert=1;
		}else if (euc.spd[0]>25) {
			euc.spdC=col("white");this.alert=1;			
		}
        //amp
		this.cur=decode2byte(this.KSdata[10], this.KSdata[11]);
        if (this.cur > 32767) this.cur = this.cur - 65536;
        euc.amp=(this.cur/100)|0;
		if (euc.amp>30)  {
			euc.ampC=col("red");this.alert=1;
			euc.spdC=col("red");		
		}else if (euc.amp>23) {
			euc.ampC=col("yellow");this.alert=1;
			if (euc.spdC!=col("red")) euc.ampC=col("yellow");
		}else if (euc.amp>15)  {
			euc.ampC=col("white");
			if (euc.spdC==col("black")) euc.spdC=col("white");
		}else if (euc.amp<-10)  {
			euc.ampC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.amp<-5)  {
			euc.ampC=col("yellow");this.alert=1;
			if (euc.spdC!=col("red")) euc.spdC=col("yellow");
		}else if (euc.amp<0)  {
			euc.ampC=col("white");this.alert=1;
			if (euc.spdC==col("black")) euc.spdC=col("white");
		}else {euc.ampC=col("black");}
		//volt
        euc.volt=((decode2byte(this.KSdata[2],this.KSdata[3])/100)+"");
        euc.batt=(((euc.volt/20)*100-330)*1.1111)|0;
		if (euc.batt<20)  {
			euc.batC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.batt<60) {
			euc.batC=col("yellow");this.alert=1;
		} else euc.batC=col("dblue");
        //temp
		euc.temp=((decode2byte(this.KSdata[12],this.KSdata[13])/100)+"");
		if (euc.temp>65)  {
			euc.tmpC=col("red");this.alert=1;
			euc.spdC=col("red");
		}else if (euc.temp>55) {
			euc.tmpC=col("yellow");this.alert=1;
		} else euc.tmpC=col("dblue");
		//trip
        euc.trpT=((decode4byte(this.KSdata[6],this.KSdata[7],this.KSdata[8],this.KSdata[9])/1000.0));
		//mode
        euc.rmode=this.KSdata[14];
		if (!this.alert)  euc.spdC=col("black");
    }else if  (this.KSdata[16]==185){
        euc.trpL=(decode4byte(this.KSdata[2], this.KSdata[3], this.KSdata[4], this.KSdata[5]) / 1000.0);
        euc.time=(decode2byte(this.KSdata[6], this.KSdata[7]) / 100.0);
        euc.spdT=(decode2byte(this.KSdata[8], this.KSdata[9]) / 100.0);
    }else if (euc.conn=="OFF"){
      euc.busy=1;
	  if (set.def.cli) console.log("EUCstartOff");
	  euc.lock=1;
      digitalPulse(D16,1,120);
	  c.writeValue(euc.cmd("lock")).then(function() {
	  global["\xFF"].BLE_GATTS.disconnect();
	  });
	  //global["\xFF"].BLE_GATTS.disconnect();
	  
    return;
	}
  });
return  c;
}).then(function(c) {
//on disconnect
  euc.ch=c;
  global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
    if (set.def.cli) console.log("EUC Disconnected :",reason);
    if (euc.conn!="OFF") {  
	 if (set.def.cli) console.log("EUC restarting");
     euc.conn="WAIT"; 
     setTimeout(() => {  euc.con(euc.mac[euc.go]); }, 500);
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
    }
  });
//connected ****************************
  console.log("EUC connected"); 
  digitalPulse(D16,1,[90,40,150,40,90]);
  euc.busy=1;
  setTimeout(function(){c.writeValue(euc.cmd("serial"));euc.conn="READY";},200);
  setTimeout(function(){c.writeValue(euc.cmd("pass"));},500);
  setTimeout(function(){c.writeValue(euc.cmd("unlock"));euc.lock=0;euc.busy=0;},800);
  setTimeout(function(){c.startNotifications();},1500);
//reconect
}).catch(function(err)  {
  if (set.def.cli) console.log("EUC error", err);
//  global.error.push("EUC :"+err);
  if (euc.conn!="OFF") {
    if (set.def.cli) console.log("not off");
    if ( err==="Connection Timeout"  )  {
	  if (set.def.cli) console.log("retrying :timeout");
	  euc.conn="LOST";
	  if (euc.lock==1) digitalPulse(D16,1,250);
	  else digitalPulse(D16,1,[250,200,250,200,250]);
  	  if (euc.tmp.reconnect) {clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;}
	  euc.tmp.reconnect=setTimeout(() => {
		euc.tmp.reconnect=0;
	    euc.con(euc.mac[euc.go]); 
	  }, 5000);
	}else if ( err==="Disconnected"|| err==="Not connected")  {
      if (set.def.cli) console.log("retrying :",err);
      euc.conn="FAR";
	  //if (euc.lock==1) digitalPulse(D16,1,40);
	  //else digitalPulse(D16,1,[100,150,100]);
  	  if (euc.tmp.reconnect) {clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;}
      euc.tmp.reconnect=setTimeout(() => {
		euc.tmp.reconnect=0;
	    euc.con(euc.mac[euc.go]); 
      }, 500);
    }
  } else {
	  global["\xFF"].bleHdl=[];
      global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
  }
});
};

euc.wri= function(n) {
  euc.ch.writeValue(euc.cmd(n));
  return;
};
//euc.con(euc.mac[euc.go]);
//euc.wri("lightsOn")
//euc.ch.writeValue([0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A]) 

decode2byte=function(byte1, byte2){//converts big endian 2 byte value to int
    this.val = (byte1 & 0xFF) + (byte2 << 8);
    return this.val;
};
decode4byte=function(byte1,byte2,byte3,byte4){
    this.val = (byte1 << 16) + (byte2 << 24) + byte3 + (byte4 << 8);
    return this.val;
};

euc.tgl=function(){ 
  if (euc.conn!="OFF" ) {
    digitalPulse(D16,1,[90,60,90]);  
	if (euc.tmp.reconnect ||  euc.conn=="WAIT" || euc.conn=="ON") {
    clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=0;
    }
    NRF.setTxPower(0);
  	euc.conn="OFF";
	face.go("euc",0);
  }else {
    digitalPulse(D16,1,100);   
	euc.mac=(require("Storage").readJSON("setting.json",1)||{}).euc_mac;
	euc.go=(require("Storage").readJSON("setting.json",1)||{}).euc_go;
	if(!euc.mac) {face.appCurr="euc";face.go('w_scan',0,'fff0');}
	else {
	if (euc.conn == "OFF") euc.tmp.count=22; else euc.tmp.count=0;  //unlock
	euc.conn="ON";
    NRF.setTxPower(4);
	euc.con(euc.mac[euc.go]); 
	face.go("euc",0);
	}
  } 
};