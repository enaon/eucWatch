//Begode euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(cmd, param) {
  if (cmd=='extendedPacket') {
	  euc.temp.ext=1;
	  euc.temp.read.replaceWith(euc.temp.extd);
  }else if (euc.temp.ext){
  	euc.temp.ext=0;
	  euc.temp.read.replaceWith(euc.temp.main);
  }
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
    case 'pwmLimit':        return [87, 80, param / 10 + 48, param % 10 + 48];
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
euc.temp.hapt=function(){
	//haptic
	if (euc.dash.alrt.pwm.hapt.en && (euc.dash.alrt.warn.code || euc.dash.alrt.pwm.hapt.hi<=euc.dash.live.pwm)){
		digitalPulse(ew.pin.BUZZ,1,80);
	}else 	if (!euc.is.buzz && euc.is.alert) {  
		if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.warn.code)) face.go(set.dash[set.def.dash.face],0);
		//else face.off(6000);
		euc.is.buzz=1;
		if (20 <= euc.is.alert) euc.is.alert = 20;
		var a=[];
		while (5 <= euc.is.alert) {
			a.push(200,500);
			euc.is.alert = euc.is.alert - 5;
		}
		let i;
		for (i = 0; i < euc.is.alert ; i++) {
			a.push(200,150);
		}
		digitalPulse(ew.pin.BUZZ,0,a);  
		setTimeout(() => { euc.is.buzz = 0; }, 3000);
	}	
	
};
euc.temp.line="";
euc.temp.extd= function(event) {	
	if (set.bt==5) 	euc.proxy.w(event.target.value.buffer);
	if (euc.dbg)  console.log("input",event.target.value.buffer);
	let fragment = E.toString(event.target.value.buffer);
	let lineEnd = fragment.indexOf('\n');
	if (lineEnd == -1){
		euc.temp.line += fragment;
	}else {
		euc.temp.line += fragment.slice(0, lineEnd);
		let keys = euc.temp.line.match(/[A-z\/=]+/g);
		keys = keys.map(l => l.split('=')[0]);
		let values = euc.temp.line.match(/[-0-9]+/g);
		//get values
		let pwmIndex = keys.indexOf('PWM');
		if (pwmIndex == -1)
		  pwmIndex = keys.indexOf('pwmmmm');
		//pwm
		if (pwmIndex != -1)
		  euc.dash.live.pwm = Math.abs(values[pwmIndex] / 100);
		//tmp
		let tempIndex = keys.indexOf('Tem');
		if (tempIndex != -1)
		  euc.dash.live.tmp  = (values[tempIndex] / 333.87 + 21.0); // MPU6500 format
		//spd
		let spdIndex = keys.indexOf('M/s');
		if (spdIndex != -1)
			euc.dash.live.spd = Math.abs((values[spdIndex] * 3.6)/100); 
		//volt	
		let voltIndex = keys.indexOf('Voltage');
		if (voltIndex != -1){
			euc.dash.live.volt =Math.abs(values[voltIndex] / 100);		
			euc.dash.live.bat=Math.round( 100*(euc.dash.live.volt*( 100/(16*euc.dash.opt.bat.pack)) - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low) );
		}
		//keys.forEach((key, i) => print(key+"="+values[i]));
		euc.temp.line = fragment.slice(lineEnd + 1);
	}
};
euc.temp.main=function(event){
	if (set.bt==5) 	euc.proxy.w(event.target.value.buffer);
	if (euc.dbg)  console.log("input",event.target.value.buffer);
	//gather packet
	let part=JSON.parse(JSON.stringify(event.target.value.buffer));
	let startP = part.findIndex((el, idx, arr) => {return arr[idx] == 85 && arr[idx + 1] == 170;});
	let endP = part.findIndex((el, idx, arr) => {return arr[idx] == 90 && arr[idx + 1] == 90 && arr[idx + 2] == 90 && arr[idx + 3] == 90;});
	//format packet
	if (startP!=-1) {
		if (endP!=-1) 
			euc.temp.type(new DataView(E.toUint8Array(euc.temp.last,part.slice(0,endP+4)).buffer));	
		euc.temp.last=part.slice(startP,part.length);
	} else if (endP!=-1) {
		euc.temp.type(new DataView(E.toUint8Array(euc.temp.last,part.slice(0,endP+4)).buffer));
		euc.temp.last=[];	
	} else {// model/firm
		if (event.target.value.getUint32(0) == 0x4E414D45) { //fetchModel
			console.log("model fetch responce:",event.target.value.buffer);
			euc.dash.info.get.modl =  E.toString(event.target.value.buffer).slice(5).trim();
			if (!set.read("dash","slot"+set.read("dash","slot")+"Model")) 
				set.write("dash","slot"+set.read("dash","slot")+"Model",euc.dash.info.get.modl);
			euc.dash.opt.bat.pack=euc.temp.modelParams(euc.dash.info.get.modl).voltMultiplier;
			euc.dash.opt.bat.low=euc.temp.modelParams(euc.dash.info.get.modl).minCellVolt*100;
		} else if (event.target.value.getInt16(0) == 0x4757) { //fetchFirmware
			euc.dash.info.get.firm = E.toString(event.target.value.buffer).slice(2);
		} 
	}
};

euc.temp.type=function(data){
	if (data.byteLength == 24 && data.getInt16(0) == 0x55AA ){
		euc.is.alert=0;
		if (data.buffer[18]==0)	euc.temp.pck0(data);
		else if (data.buffer[18]==4) euc.temp.pck4(data);
		else if (data.buffer[18]==1)	euc.temp.pck1(data);	//master		
		//haptic
		euc.temp.hapt();
	}	
};
euc.temp.pck0=function(data) {
	//volt-battery
	euc.dash.live.volt=(data.getUint16(2)*euc.dash.opt.bat.pack)/100; //bms=1 67.2 ,1.25 84, 1.5 100,8
	euc.dash.live.bat=Math.round( 100*(euc.dash.live.volt*( 100/(16*euc.dash.opt.bat.pack)) - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low) );
	euc.log.batL.unshift(euc.dash.live.bat);
	if (20<euc.log.batL.length) euc.log.batL.pop();
	euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
	if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;   
	// calculate speed limit. 
    let rdct = 1 - (100 - euc.dash.live.bat) / 450;
	euc.dash.alrt.spd.max= euc.dash.alrt.spd.top * rdct;
	//speed
	euc.dash.live.spd = Math.abs((data.getInt16(4) * 3.6)/100); 
	if (euc.dash.info.trip.topS < euc.dash.live.spd) euc.dash.info.trip.topS = euc.dash.live.spd;
	euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
	if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
		euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
	//trip last
	//euc.dash.info.trip.last=data.getUint32(6)/1000;
	euc.dash.info.trip.last=data.getUint16(8)/1000;
	//amp
	euc.dash.live.amp=data.getInt16(10)/1000;
	if (euc.dash.opt.unit.ampR) euc.dash.live.amp=-euc.dash.live.amp;
	euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
	if (20<euc.log.ampL.length) euc.log.ampL.pop();
	euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
	if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
		if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
		else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
	}
	//temp
	euc.dash.live.tmp=(data.getInt16(12) /340.0)+36.53;
	euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
	if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++;
	//resets
	euc.dash.rsts=data.getUint16(14);
	//volume
	euc.dash.vol=data.getUint16(16);
};
euc.temp.pck1=function(data) {
  euc.dash.alrt.pwm.val = data.getUint16(2);
};
euc.temp.pck4=function(data) {
	euc.dash.info.trip.totl=data.getUint32(2)/1000;
	euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.info.trip.totl;});
	let mode=data.getUint16(6);
	euc.dash.opt.ride.mode	= mode >> 13 & 0x3; //riding mode
	euc.dash.alrt.mode	= mode >> 10 & 0x3; //warnings mode
	euc.dash.opt.ride.rolA	= mode >>  7 & 0x3; //roll angle
	euc.dash.opt.unit.mile	= mode & 0x1; //speed unit
	//
	euc.dash.auto.offT = data.getUint16(8);
	euc.dash.alrt.spd.tilt.val= data.getUint16(10);
	euc.dash.opt.lght.led = data.getUint16(12);
	//alarm error
	euc.dash.alrt.warn.code = data.getUint8(14);	
	if (euc.dash.alrt.warn.code){
		let faultAlarmLine = '';
		for (let bit = 0; bit < 8; bit++) {
			if (euc.dash.alrt.warn.code >> bit & 0x1)
			faultAlarmLine += euc.temp.faultAlarms(bit) + ', ';
		}
		faultAlarmLine = faultAlarmLine.slice(0, -2);
		euc.dash.alrt.warn.txt=faultAlarmLine;
		//updatePwmAlarmSpeed
		if (euc.dash.alrt.warn.code & 0x1 ){
			euc.dash.alrt.pwr=1;
			if (euc.dash.alrt.spd.max == 0 || euc.dash.live.spd < euc.dash.alrt.spd.max ){
				euc.dash.alrt.spd.max=euc.dash.live.spd;
				let speed_reduction = 1 - (100 - euc.dash.live.bat) / 450;
				euc.dash.alrt.spd.top = (euc.dash.live.spd / speed_reduction).toFixed(1);
			}
		}
	}else euc.dash.alrt.pwr=0;
	//log
	euc.log.almL.unshift(euc.dash.alrt.pwr);
	if (20<euc.log.almL.length) euc.log.almL.pop();	
	//light status
	euc.dash.opt.lght.HL = data.getUint8(15);
};

euc.temp.init=function(c) {
	let hlc=[0,"lightsOn","lightsOff","lightsStrobe"];
	c.writeValue(euc.cmd(euc.dash.auto.onC.HL?hlc[euc.dash.auto.onC.HL]:"none")).then(function() {
		return c.writeValue(euc.cmd(euc.dash.auto.onC.beep?"beep":"none"));
	}).then(function() {
		return euc.wri(euc.dash.auto.onC.led?("ledMode",euc.dash.auto.onC.led-1):"none");
	}).then(function() {
		if (!euc.dash.info.get.modl){
			console.log("model not found,fetch");
			return c.writeValue(euc.cmd("fetchModel"));
		}
	}).then(function() {
		if (!euc.dash.info.get.firm)
			return c.writeValue(euc.cmd("fetchFirmware")); 
	}).then(function() {
		euc.is.run=1;
		return c.startNotifications();
	}).catch(euc.off);

};
euc.temp.exit=function(c) {
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		let hld=["none","lightsOn","lightsOff","lightsStrobe"];
		c.writeValue(euc.cmd(hld[euc.dash.auto.onD.HL])).then(function() {
			return c.writeValue(euc.cmd(euc.dash.auto.onD.beep?"beep":"none"));
		}).then(function() {	
			return euc.wri(euc.dash.auto.onD.led?("ledMode",euc.dash.auto.onD.led-1):"none");
		}).then(function() {
			euc.is.run=0;
			return c.stopNotifications();
		}).then(function() {
			global["\xFF"].BLE_GATTS.disconnect(); 
		}).catch(euc.off);
	}else {
		if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
		euc.state="OFF";
		euc.off("not connected");
		return;
	}
};

euc.temp.read=function(){};
euc.temp.read.replaceWith(euc.temp.main);
euc.isProxy=0;
euc.is.run=0;
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
		c.on('characteristicvaluechanged',  euc.temp.read);
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', euc.off);
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Begode connected!"); 
		euc.wri= function(n,v) {
			if (euc.is.busy) { clearTimeout(euc.is.busy);euc.is.busy=setTimeout(()=>{euc.is.busy=0;},100);return;} 
			euc.is.busy=setTimeout(()=>{euc.is.busy=0;},150);	
			//end
			if (n==="proxy") {
				c.writeValue(v); 
			}else if (euc.state=="OFF"||n=="end") {
				euc.temp.exit(c);
			} else if (n==="start") {
				if (euc.is.run) c.startNotifications();
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
				}).catch(euc.off);
			}
		};
		//init garage slot
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.info.get.mac=euc.mac;
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}	
		//start wheel init
		buzzer([90,40,150]);
		setTimeout(() => {euc.wri("start");}, 500);
	//reconect
	}).catch(euc.off);
};
//catch
euc.off=function(err){
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect);euc.is.reconnect=0;}
	if (euc.state!="OFF") {
		if (euc.dbg) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (euc.dbg) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.is.run) {
				euc.tgl();
				return;
			}
			euc.is.run=euc.is.run+1;
			if (euc.dash.opt.lock.en==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}
		else if ( err==="Disconnected"|| err==="Not connected")  {
			if (euc.dbg) console.log("reason :",err);
			euc.state="FAR";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
		else {
			if (euc.dbg) console.log("reason :",err);
			euc.state="RETRY";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (euc.dbg) console.log("EUC OUT:",err);
		if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
		euc.off=function(err){if (euc.dbg) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (euc.dbg) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (euc.dbg) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (euc.dbg) console.log("EUC cmd, not connected",err);};
		euc.is.run=0;
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

