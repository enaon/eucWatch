//kingsong euc module 
//m_euc
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//
euc.cmd=function(no){
	switch (no) {
	  case "pass":return [0xAA,0x55,0x31,0x32,0x33,0x34,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
      case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
	  case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
	  case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
	  case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
      case "lightsOn":euc.light=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
      case "lightsOff":euc.light=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
	  case "lightsAuto":euc.light=4;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
      case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
      case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
	  case "lock":euc.dash.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
	  case "unlock":euc.dash.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];	  
    }
};
//
euc.conn=function(mac){
//check gatt
if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
}
//start connection  
NRF.connect(mac,{minInterval:7.5, maxInterval:15})
.then(function(g) {
   return g.getPrimaryService(0xffe0);
}).then(function(s) {
  return s.getCharacteristic(0xffe1);
}).then(function(c) {
  c.on('characteristicvaluechanged', function(event) {
    this.KSdata = event.target.value.buffer;
    if (euc.busy) return;
    if (this.KSdata[16]==169) {
		euc.alert=0;
		//speed
        euc.dash.spd=((((this.KSdata[4] & 0xFF) + (this.KSdata[5] << 8))/100)).toFixed(1); 
		euc.dash.spdC=(euc.dash.spd<=euc.dash.spd2)?1:(euc.dash.spd<=euc.dash.spd3)?2:3;	
		if (euc.dash.spd>=euc.dash.spd1) euc.alert=(euc.alert+1+((euc.dash.spd-euc.dash.spd1)/euc.dash.spdS))|0;      
        //amp
		this.amp=((this.KSdata[10] & 0xFF) + (this.KSdata[11] << 8));
        if (this.amp > 32767) this.amp = this.amp - 65536;
        euc.dash.amp=(this.amp/100).toFixed(2);
		euc.dash.ampC=(euc.dash.amp>=euc.dash.ampH+10||euc.dash.amp<=euc.dash.ampL-5)?3:(euc.dash.amp>=euc.dash.ampH||euc.dash.amp<=euc.dash.ampL)?2:(euc.dash.amp<0)?1:0;
		if (euc.dash.amp>=euc.dash.ampH){
			euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
			euc.alert=(euc.alert+1+(euc.dash.amp-euc.dash.ampH))|0;
        }else if (euc.dash.amp<=euc.dash.ampL)  {
			euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
			euc.alert=(euc.alert+1+(-(euc.dash.amp-euc.dash.ampL)))|0;      
		}
		//volt
        this.volt=(((this.KSdata[2] & 0xFF) + (this.KSdata[3] << 8))/100)+"";
        euc.dash.bat=(((this.volt/20)*100-330)*1.1111)|0;
		euc.dash.batC=(euc.dash.bat>=euc.dash.batH)?0:(euc.dash.bat>=euc.dash.batM)?1:(euc.dash.bat>=euc.dash.batL)?2:3;	
		if (euc.dash.bat<=euc.dash.batL) {euc.alert++; euc.dash.spdC=3;}     
        //temp
		euc.dash.tmp=(((this.KSdata[12] & 0xFF) + (this.KSdata[13] << 8))/100).toFixed(1);
		euc.dash.tmpC=(euc.dash.tmp<=euc.dash.tmpM)?0:(euc.dash.tmp<=euc.dash.tmpH)?2:0;	
		if (euc.dash.tmp>=euc.dash.tmpH) {euc.alert++; euc.dash.spdC=3;}     
		//trip
        euc.dash.trpT=(((this.KSdata[6] << 16) + (this.KSdata[7] << 24) + this.KSdata[8] + (this.KSdata[9] << 8))/1000).toFixed(1);
		//mode                                    
        euc.dash.mode=this.KSdata[14];
		//alerts
		if (!euc.alert)  euc.dash.spdC=0;
		else if (!euc.buzz){ 
			euc.buzz=1;
			var a=[200];
			var i;
			for (i = 1; i < euc.alert ; i++) {
				a.push(150,100);
			}
			digitalPulse(D16,1,a);  
			setTimeout(() => {euc.buzz=0; }, 2000);
		}
    }else if  (this.KSdata[16]==185){
        euc.dash.trpL=(((this.KSdata[2] << 16) + (this.KSdata[3] << 24) + this.KSdata[4] + (this.KSdata[5] << 8)) / 1000.0).toFixed(1);
		euc.dash.time=(((this.KSdata[6] & 0xFF) + (this.KSdata[7] << 8)) / 60.0).toFixed(0);
        euc.dash.spdT=(((this.KSdata[8] & 0xFF) + (this.KSdata[9] << 8)) / 100.0).toFixed(1);
    }else if (euc.state=="OFF"){
		euc.busy=1;
		if (set.def.cli) console.log("EUCstartOff");
		euc.dash.lock=1;
		digitalPulse(D16,1,120);
		c.writeValue(euc.cmd("lightsAuto"));
		if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
		euc.reconnect=setTimeout(() => {c.writeValue(euc.cmd("lock")).then(function() {
			euc.reconnect=0;global["\xFF"].BLE_GATTS.disconnect();});
		}, 200);
    return;
	}
	});
	//on disconnect
	global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
	});
return  c;
}).then(function(c) {
	//connected ****************************
	console.log("EUC connected"); 
	digitalPulse(D16,1,[90,40,150,40,90]);
	euc.busy=1;
	euc.wri= function(n) {
		c.writeValue(euc.cmd(n)).catch(function(err){euc.off(err);});
		return;
	};
	setTimeout(function(){c.writeValue(euc.cmd("serial"));euc.state="READY";},200);
	setTimeout(function(){c.writeValue(euc.cmd("pass"));},500);
	setTimeout(function(){c.writeValue(euc.cmd("unlock"));euc.dash.lock=0;},800);
	setTimeout(function(){euc.busy=0;c.startNotifications();},1500);
//reconect
}).catch(function(err)  {
	euc.off(err);
});
};
//


euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.def.cli) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if (euc.dash.lock==1) digitalPulse(D16,1,250);
			else digitalPulse(D16,1,[250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		} else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (set.def.cli) console.log("EUC: OUT");
		global["\xFF"].bleHdl=[];
            delete euc.off;
			delete euc.conn;
            delete euc.wri;
			delete euc.cmd;
			NRF.setTxPower(set.def.rfTX);	
    }
};