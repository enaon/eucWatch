//Begode euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
//tilt speed = 87 - 89 - 3(speed1) - 3(speed2) 

/*
+        max_speed = 72;
+        speed_reduction = 1 - (100 - euc.dash.bat) / 450;
+        euc.dash.spdL = max_speed * speed_reduction;
+
*/
euc.cmd=function(cmd, param) {
  switch(cmd) {
    case 'mainPacket':      return [44];
    case 'extendedPacket':  return [107];
    case 'fetchModel':      return [78];
    case 'fetchModelCode':  return [86];
    case 'fetchGreet':      return [103];
    case 'beep':            return [98];
    case 'lightsOn':        return [81];
    case 'lightsOff':       return [69];
    case 'lightsStrobe':    return [84];
    case 'alertsTwo':       return [117];
	case "alertOneTwo":		return [111];		
    case 'alertsOff':       return [105];
    case 'alertsTiltback':  return [73];
    case 'pedalSoft':       return [115];
    case 'pedalMedium':     return [102];
    case 'pedalHard':       return [104];
    case 'rollAngleLow':    return [62];
    case 'rollAngleMedium': return [61];
    case 'rollAngleHigh':   return [60];
    case 'speedKilometers': return [103];
    case 'speedMiles':      return [109];
    case 'calibrate':       return [99, 121];
    case 'startIAP':        return [33, 64];
    case 'tiltbackOff':     return [34];
    case 'tiltbackSpeed':   return [87, 89, param / 10 + 48, param % 10 + 48];
    case 'volume':          return [87, 66, 48 + param];
    case 'ledMode':         return [87, 77, 48 + param];
    default:                return cmd;
  }
};
euc.tmp={};
euc.tmp.modelParams=function(model) {
  switch(model) {
    case 'Mten3':       return { 'voltMultiplier': 1.25, 'minCellVolt': 3.3 };
    case 'MCM5':        return { 'voltMultiplier': 1.25, 'minCellVolt': 3.3 };
    case 'T3':          return { 'voltMultiplier': 1.25, 'minCellVolt': 3.25 };
    case 'Nikola':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'Msuper Pro':  return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'MSP C30':     return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'MSP C38':     return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'RS C30':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'RS C38':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'EX':          return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'EX20S C30':   return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'EX20S C38':   return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'Monster':     return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 };
    case 'EXN':         return { 'voltMultiplier': 1.50, 'minCellVolt': 3.15 };
    case 'Monster Pro': return { 'voltMultiplier': 1.50, 'minCellVolt': 3.1 };
    case 'Master':      return { 'voltMultiplier': 2,    'minCellVolt': 3.25 };
    default:            return { 'voltMultiplier': 1,    'minCellVolt': 3.3 };
  }
};

euc.tmp.faultAlarms =function(code) {
	switch(code) {
		case 0: return 'high power';
		case 1: return 'high speed 2';
		case 2: return 'high speed 1';
		case 3: return 'low voltage';
		case 4: return 'over voltage';
		case 5: return 'high temperature';
		case 6: return 'hall sensor error';
		case 7: return 'transport mode';
	}
};

euc.tmp.rfmp=function(data) {
	//if  ( data.buffer[0]==85 && data.buffer[1]==170 && data.buffer[18]==0 && data.buffer[19]==24 ) {
	euc.alert=0;
	//volt-battery
	euc.dash.volt=(data.getUint16(2)*euc.dash.bms)/100; //bms=1 67.2 ,1.25 84, 1.5 100,8
	euc.dash.bat=Math.round( 100*(euc.dash.volt*( 100/(16*euc.dash.bms)) - euc.dash.batE ) / (euc.dash.batF-euc.dash.batE) );
	//euc.dash.bat = Math.round(((euc.dash.volt / (16*euc.dash.bms)) * 100 - 310 ) * 0.909);
	batL.unshift(euc.dash.bat);
	if (20<batL.length) batL.pop();
	euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
	if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++;   
	//speed
	euc.dash.spd = Math.abs((data.getInt16(4) * 3.6)/100); 
	if (euc.dash.spdM < euc.dash.spd) euc.dash.spdM = euc.dash.spd;
	euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
	if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
		euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 	
	//trip last
	euc.dash.trpL=data.getUint32(6)/1000;
	//amp
	euc.dash.amp=data.getInt16(10)/1000;
	if (euc.dash.ampR) euc.dash.amp=-euc.dash.amp;
	ampL.unshift(Math.round(euc.dash.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
	if (euc.dash.hapA && euc.dash.ampC==2) {
		if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
	}
	//temp
	euc.dash.tmp=(data.getInt16(12) /340.0)+36.53;
	euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
	if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++;
	//resets
	euc.dash.rsts=data.getInt16(14);
	//volume
	euc.dash.vol=data.getInt16(16);
};

euc.tmp.rsmp=function(data) {
	euc.dash.trpT=data.getUint32(6)/1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
	let mode=data.getUint16(10);
	euc.dash.mode	= mode >> 13 & 0x3;
	euc.dash.almS	= mode >> 10 & 0x3;
	euc.dash.rolA	= mode >>  7 & 0x3;
	euc.dash.spdU	= mode >>  4 & 0x1;
	//
	euc.dash.offT = data.getUint16(12);
	euc.dash.spdT = data.getUint16(14);
	euc.dash.led = data.getUint16(16)
	//alarm
	euc.dash.alrm = data.getUint8(18);	
	if (euc.dash.alrm){
		let faultAlarmLine = '';
		for (let bit = 0; bit < 8; bit++) {
			if (euc.dash.alrm >> bit & 0x1)
			faultAlarmLine += euc.tmp.faultAlarms(bit) + ', ';
		}
		faultAlarmLine = faultAlarmLine.slice(0, -2);
		euc.dash.almT=faultAlarmLine;
	}
	//log
	almL.unshift(euc.dash.alrm);
	if (20<almL.length) almL.pop();	
	//light status
	euc.dash.light = data.getUint8(19);
	//haptic
	//if (euc.dash.hapP && (euc.dash.alrm || euc.dash.pwmL<=euc.dash.pwm)){
	//	digitalPulse(ew.pin.BUZZ,1,80);
	//}else 
	if (!euc.buzz && euc.alert) {  
		if (!w.gfx.isOn&&(euc.dash.spdC||euc.dash.ampC||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
		//else face.off(6000);
		euc.buzz=1;
		if (20 <= euc.alert) euc.alert = 20;
		var a=[];
		while (5 <= euc.alert) {
			a.push(200,500);
			euc.alert = euc.alert - 5;
		}
		let i;
		for (i = 0; i < euc.alert ; i++) {
			a.push(200,150);
		}
		digitalPulse(ew.pin.BUZZ,0,a);  
		setTimeout(() => { euc.buzz = 0; }, 3000);
	}
};
euc.tmp.init=function(c) {
	c.startNotifications().then(function() {
		let hlc=[0,"lightsOn","lightsOff","lightsStrobe"];
		return euc.dash.auto.HLC?c.writeValue(euc.cmd(hlc[euc.dash.auto.HLC])):"ok";
	}).then(function() {	
		return euc.dash.auto.ledC?euc.wri("ledMode",euc.dash.auto.ledC-1):"ok";
	}).then(function() {
		return euc.dash.auto.BEPC?c.writeValue(euc.cmd("beep")):"ok";
	}).then(function() {
		euc.run=1;
	}).catch(function(err)  {
		if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
		else euc.off("err-start");
	});

};
euc.tmp.exit=function(c) {
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		c.stopNotifications().then(function() {
			let hld=[0,"lightsOn","lightsOff","lightsStrobe"];
			return euc.dash.auto.HLD?c.writeValue(euc.cmd(hld[euc.dash.auto.HLD])):"ok";
		}).then(function() {	
			return euc.dash.auto.ledD?euc.wri("ledMode",euc.dash.auto.ledD-1):"ok";
		}).then(function() {
			return euc.dash.auto.BEPD?c.writeValue(euc.cmd("beep")):"ok";
		}).then(function() {
			euc.run=0;
			global["\xFF"].BLE_GATTS.disconnect(); 
		}).catch(function(err)  {
			if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
			else euc.off("err-start");
		});
	}else {
		if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
		euc.state="OFF";
		euc.off("not connected");
		return;
	}
};
euc.isProxy=0;
euc.run=0;
//start
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	//check if connected
	if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
	}
	//check if proxy
	if (mac.includes("private-resolvable")&&!euc.isProxy ){
		let name=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Name"];
		NRF.requestDevice({ timeout:2000, filters: [{ namePrefix: name }] }).then(function(device) { euc.isProxy=1;euc.conn(device.id);}  ).catch(function(err) {print ("error "+err);euc.conn(euc.mac); });
		return;
	}
	euc.isProxy=0;
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		c.on('characteristicvaluechanged', function(event) {
			if (set.bt==5) 	euc.proxy.w(event.target.value.buffer);
			if (euc.dbg)  console.log("input",event.target.value.buffer);
			// packet types
			if (event.target.value.getInt16(0) == 0x55AA && event.target.value.byteLength == 20) {
				euc.tmp.rfmp(event.target.value);
			} else if (event.target.value.getUint16(0) == 0x5A5A && event.target.value.byteLength == 20) {
				euc.tmp.rsmp(event.target.value);
			} else if (event.target.value.getUint32(0) == 0x4E414D45) {
				euc.dash.name =  E.toString(event.target.value.buffer).slice(5).trim();
			} else if (event.target.value.getInt16(0) == 0x4757) {
				euc.dash.firm = E.toString(event.target.value.buffer).slice(2);
			} else if (event.target.value.getInt32(0) == 0x204D5055) {
				euc.dash.imu = E.toString(event.target.value.buffer).slice(1, 8);
			} else {
				return;
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Begode connected!"); 
		euc.wri= function(n,v) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},100);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},150);	
			//end
			if (n==="proxy") {
				c.writeValue(v); 
			}else if (euc.state=="OFF"||n=="end") {
				euc.tmp.exit(c);
			} else if (n==="start") {
				if (euc.run) c.startNotifications();
				else euc.tmp.init(c);
				euc.state="READY";
			}else{
				let cob=euc.cmd(n,v)
				c.writeValue(cob[0]).then(function() {
					return cob[1]? c.writeValue(cob[1]):"ok";
				}).then(function() {
					return cob[2]? c.writeValue(cob[2]):"ok";
				}).then(function() {
					return cob[3]? c.writeValue(cob[3]):"ok";
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err");
				});
			}
		};
		//init garage slot
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.mac=euc.mac; euc.dash.batF=420;euc.dash.batE=325;
			//euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}	
		//start wheel init
		buzzer([90,40,150]);
		setTimeout(() => {euc.wri("start");}, 500);
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect);euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.def.cli) 
			console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.bt===2) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (euc.dash.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}
		else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
		else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (set.def.cli) console.log("EUC OUT:",err);
		if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.tmp=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);
		if (this.proxy) this.proxy.e();
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};

