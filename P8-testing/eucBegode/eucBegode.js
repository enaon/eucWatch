//Begode euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
//tilt speed = 87 - 89 - 3(speed1) - 3(speed2) 
/*
+        max_speed = 72;
+        speed_reduction = 1 - (100 - euc.dash.live.bat) / 450;
+        euc.dash.alrm.tilt = max_speed * speed_reduction;
+
*/
euc.cmd=function(cmd, param) {
  switch(cmd) {
    case 'mainPacket':      return [44];
    case 'extendedPacket':  return [107];
    case 'fetchModel':      return [78];
    case 'fetchFirmware': 	return [86];
    case 'fetchGreet':      return [103];
    case 'beep':            return [98];
    case 'lightsOn':        return [81];
    case 'lightsOff':       return [69];
    case 'lightsStrobe':    return [84];
    case 'alertsTwo':       return [117];
	case "alertsOneTwo":	return [111];		
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
    default:                return [];
  }
};
euc.temp.modelParams=function(model) {
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
euc.temp.faultAlarms =function(code) {
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
euc.temp.rfmp=function(data) {
	//if  ( data.buffer[0]==85 && data.buffer[1]==170 && data.buffer[18]==0 && data.buffer[19]==24 ) {
	euc.alert=0;
	//volt-battery
	euc.dash.live.volt=(data.getUint16(2)*euc.dash.slot.bms)/100; //bms=1 67.2 ,1.25 84, 1.5 100,8
	euc.dash.live.bat=Math.round( 100*(euc.dash.live.volt*( 100/(16*euc.dash.slot.bms)) - euc.dash.opt.batE ) / (euc.dash.opt.batF-euc.dash.opt.batE) );
	batL.unshift(euc.dash.live.bat);
	if (20<batL.length) batL.pop();
	euc.dash.alrm.bat = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.hapt.batL)? 2 : 1;	
	if ( euc.dash.hapt.bat && euc.dash.alrm.bat ==2 )  euc.alert ++;   
	// calculate pwm limit. 
    let rdct = 1 - (100 - euc.dash.live.bat) / 450;
	euc.dash.alrm.tilt = euc.dash.slot.maxSpeedFull * rdct;
	//speed
	euc.dash.live.spd = Math.abs((data.getInt16(4) * 3.6)/100); 
	if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
	euc.dash.alrm.spd = ( euc.dash.live.spd1 <= euc.dash.live.spd )? 2 : ( euc.dash.live.spd2 <= euc.dash.live.spd )? 1 : 0 ;	
	if ( euc.dash.hapt.spd && euc.dash.alrm.spd == 2 ) 
		euc.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.live.spd1) / euc.dash.hapt.spdS) ; 	
	//trip last
	euc.dash.trip.last=data.getUint32(6)/1000;
	//amp
	euc.dash.live.amp=data.getInt16(10)/1000;
	if (euc.dash.opt.ampR) euc.dash.live.amp=-euc.dash.live.amp;
	ampL.unshift(Math.round(euc.dash.live.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.alrm.amp = ( euc.dash.hapt.ampH <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.hapt.ampL )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
	if (euc.dash.hapt.amp && euc.dash.alrm.amp==2) {
		if (euc.dash.hapt.ampH<=euc.dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.hapt.ampH) / euc.dash.hapt.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.hapt.ampL) / euc.dash.hapt.ampS) ;
	}
	//temp
	euc.dash.live.tmp=(data.getInt16(12) /340.0)+36.53;
	euc.dash.alrm.tmp=(euc.dash.hapt.tmpH - 5 <= euc.dash.live.tmp )? (euc.dash.hapt.tmpH <= euc.dash.live.tmp )?2:1:0;
	if (euc.dash.hapt.tmp && euc.dash.alrm.tmp==2) euc.alert++;
	//resets
	euc.dash.rsts=data.getInt16(14);
	//volume
	euc.dash.vol=data.getInt16(16);
};

euc.temp.rsmp=function(data) {
	euc.dash.trip.totl=data.getUint32(2)/1000;
	euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
	let mode=data.getUint16(6);
	euc.dash.set.mode	= mode >> 13 & 0x3; //riding mode
	euc.dash.alrm.mode	= mode >> 10 & 0x3; //warnings mode
	euc.dash.set.rolA	= mode >>  7 & 0x3; //roll angle
	euc.dash.set.unit	= mode & 0x1; //speed unit
	//
	euc.dash.set.offT = data.getUint16(8);
	euc.dash.limt.tilt= data.getUint16(10);
	euc.dash.set.led = data.getUint16(12);
	//alarm error
	euc.dash.alrm.err = data.getUint8(14);	
	if (euc.dash.alrm.err){
		let faultAlarmLine = '';
		for (let bit = 0; bit < 8; bit++) {
			if (euc.dash.alrm.err >> bit & 0x1)
			faultAlarmLine += euc.temp.faultAlarms(bit) + ', ';
		}
		faultAlarmLine = faultAlarmLine.slice(0, -2);
		euc.dash.alrm.txt=faultAlarmLine;
	}
	//log
	almL.unshift(euc.dash.alrm.err);
	if (20<almL.length) almL.pop();	
	//light status
	euc.dash.set.HL = data.getUint8(15);
	//haptic
	//if (euc.dash.hapt.pwm && (euc.dash.alrm.err || euc.dash.hapt.pwmH<=euc.dash.live.pwm)){
	//	digitalPulse(ew.pin.BUZZ,1,80);
	//}else 
	if (!euc.buzz && euc.alert) {  
		if (!w.gfx.isOn&&(euc.dash.alrm.spd||euc.dash.alrm.amp||euc.dash.alrm.err)) face.go(set.dash[set.def.dash.face],0);
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
euc.temp.init=function(c) {
	let hlc=[0,"lightsOn","lightsOff","lightsStrobe"];
	c.writeValue(euc.cmd(euc.dash.auto.onC.HL?hlc[euc.dash.auto.onC.HL]:"none")).then(function() {
		return c.writeValue(euc.cmd(euc.dash.auto.onC.beep?"beep":"none"));
	}).then(function() {
		return euc.wri(euc.dash.auto.onC.led?("ledMode",euc.dash.auto.onC.led-1):"none");
	}).then(function() {
		euc.run=1;
		return c.startNotifications();
	}).then(function() {
		if (!set.read("dash","slot"+set.read("dash","slot")+"Model"))
			return c.writeValue(euc.cmd("fetchModel")); 
	}).then(function() {
		if (!euc.dash.slot.firm)
			return c.writeValue(euc.cmd("fetchFirmware")); 
	}).catch(function(err)  {
		if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
		else euc.off("err-start");
	});

};
euc.temp.exit=function(c) {
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		let hld=["none","lightsOn","lightsOff","lightsStrobe"];
		c.writeValue(euc.cmd(hld[euc.dash.auto.onD.HL])).then(function() {
			return c.writeValue(euc.cmd(euc.dash.auto.onD.beep?"beep":"none"));
		}).then(function() {	
			return euc.wri(euc.dash.auto.onD.led?("ledMode",euc.dash.auto.onD.led-1):"none");
		}).then(function() {
			euc.run=0;
			return c.stopNotifications();
		}).then(function() {
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

euc.temp.packet=function(pakt){
	if (pakt.byteLength == 24 && pakt.getInt16(0) == 0x55AA ){
		if (pakt.buffer[18]==0)	euc.temp.rfmp(pakt);
		else if (pakt.buffer[18]==4) euc.temp.rsmp(pakt);
		else if (pakt.buffer[18]==1)	return;	//master		
	}	
};
euc.isProxy=0;
euc.run=0;
//start
euc.wri=function(i) {if (euc.dbg) console.log("not connected yet"); if (i=="end") euc.off(); return;};
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
		euc.temp.last= [];
		c.on('characteristicvaluechanged', function(event) {
			if (set.bt==5) 	euc.proxy.w(event.target.value.buffer);
			if (euc.dbg)  console.log("input",event.target.value.buffer);
			//gather package
			let part=JSON.parse(JSON.stringify(event.target.value.buffer));
			let startP=part.indexOf(170)?part[part.indexOf(170)-1]==85?part.indexOf(85):-1:-1;
			let endP=part.indexOf(90)!=-1?part[part.indexOf(90)+1]==90?part[part.indexOf(90)+3]==90?part.indexOf(90)+4:-1:-1:-1;
			if (startP!=-1) {
				if  (endP!=-1) euc.temp.packet(new DataView(E.toUint8Array(euc.temp.last,part.slice(0,endP)).buffer));	
				euc.temp.last=part.slice(startP,part.length);
				return;
			} else if (endP!=-1) {
				euc.temp.packet(new DataView(E.toUint8Array(euc.temp.last,part.slice(0,endP)).buffer));
				euc.temp.last=[];	
				return;
			}
			//
			if (event.target.value.getUint32(0) == 0x4E414D45) { //fetchModel
				euc.dash.slot.modl =  E.toString(event.target.value.buffer).slice(5).trim();
				if (!set.read("dash","slot"+set.read("dash","slot")+"Model")) 
					set.write("dash","slot"+set.read("dash","slot")+"Model",euc.dash.slot.modl);
				euc.dash.slot.bms=euc.temp.modelParams(euc.dash.slot.modl).voltMultiplier;
				euc.dash.opt.batE=euc.temp.modelParams(euc.dash.slot.modl).minCellVolt*100;
			} else if (event.target.value.getInt16(0) == 0x4757) { //fetchFirmware
				euc.dash.slot.firm = E.toString(event.target.value.buffer).slice(2);
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
				euc.temp.exit(c);
			} else if (n==="start") {
				if (euc.run) c.startNotifications();
				else euc.temp.init(c);
				euc.state="READY";
			}else{
				let cob=euc.cmd(n,v);
				if (!cob[0]) return;
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
			euc.dash.slot.mac=euc.mac;
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
		if (euc.dbg) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (euc.dbg) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (euc.dash.set.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}
		else if ( err==="Disconnected"|| err==="Not connected")  {
			if (euc.dbg) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
		else {
			if (euc.dbg) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (euc.dbg) console.log("EUC OUT:",err);
		if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
		euc.off=function(err){if (euc.dbg) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (euc.dbg) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (euc.dbg) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (euc.dbg) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.temp=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);
		if (this.proxy) this.proxy.e();
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (euc.dbg) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};

