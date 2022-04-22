//Begode euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
//tilt speed = 87 - 89 - 3(speed1) - 3(speed2) 
euc.cmd=function(no){
	switch (no) {
		case "beep":return [98]; 
		case "lightsOn":return [81]; 
		case "lightsOff":return [69]; 
		case "lightsStrobe":return [84]; 
		case "alertsOff":return [105]; 
		case "alertTwo":return [117]; 
		case "alertOneTwo":return [111]; 		
		case "rideSoft":return [115]; 
		case "rideMed":return [102]; 
		case "rideHard":return [104]; 
    }
};
euc.proxy=0;
//start
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	print("mac: ",mac);
	//check
	if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (set.def.cli) print("ble allready connected"); 
		if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
	}
	//check if proxy
	if (mac.includes("private-resolvable")&&!euc.proxy ){
		let name=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Name"];
		NRF.requestDevice({ timeout:2000, filters: [{ namePrefix: name }] }).then(function(device) { euc.proxy=1;euc.conn(device.id);}  ).catch(function(err) {print ("error "+err);euc.conn(euc.mac); });
		return;
	}
	euc.proxy=0;
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		c.on('characteristicvaluechanged', function(event) {
			if  ( event.target.value.buffer[0]==85 && event.target.value.buffer[1]==170 && event.target.value.buffer[18]==0 && event.target.value.buffer[19]==24 ) {
				//print( event.target.value.buffer);
				euc.alert=0;
				//speed
				dash.live.spd = Math.abs((event.target.value.getInt16(4) * 3.6)/100); 
				if (dash.live.spdM < dash.live.spd) dash.live.spdM = dash.live.spd;
				dash.live.spdC = ( dash.live.spd1 <= dash.live.spd )? 2 : ( dash.live.spd2 <= dash.live.spd )? 1 : 0 ;	
				if ( dash.live.hapS && dash.live.spdC == 2 ) 
					euc.alert = 1 + Math.round((dash.live.spd-dash.live.spd1) / dash.live.spdS) ; 	
				//battery
				dash.live.volt=(event.target.value.getUint16(2)*dash.live.bms)/100; //bms=1 67.2 ,1.25 84, 1.5 100,8
				dash.live.bat=Math.round( 100*(dash.live.volt*( 100/(16*dash.live.bms)) - dash.live.batE ) / (dash.live.batF-dash.live.batE) );
				//dash.live.bat = Math.round(((dash.live.volt / (16*dash.live.bms)) * 100 - 310 ) * 0.909);
				batL.unshift(dash.live.bat);
				if (20<batL.length) batL.pop();
				dash.live.batC = (50 <= dash.live.bat)? 0 : (dash.live.bat <= dash.live.batL)? 2 : 1;	
				if ( dash.live.hapB && dash.live.batC ==2 )  euc.alert ++;   
				//trip last
				dash.live.trpL=event.target.value.getUint32(6)/1000;
				//dash.live.trpL=(event.target.value.getUint32(6)/1000)*dash.live.trpF*((set.def.dash.mph)?0.625:1);
				//amp
				dash.live.amp=event.target.value.getInt16(10)/1000;
				if (dash.live.ampR) dash.live.amp=-dash.live.amp;
				ampL.unshift(Math.round(dash.live.amp));
				if (20<ampL.length) ampL.pop();
				dash.live.ampC = ( dash.live.ampH <= dash.live.amp || dash.live.amp <= dash.live.ampL )? 2 : ( dash.live.amp  <= -0.5 || 15 <= dash.live.amp)? 1 : 0;
				if (dash.live.hapA && dash.live.ampC==2) {
					if (dash.live.ampH<=dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (dash.live.amp - dash.live.ampH) / dash.live.ampS) ;
					else euc.alert =  euc.alert + 1 + Math.round(-(dash.live.amp - dash.live.ampL) / dash.live.ampS) ;
				}
				//temp
				dash.live.tmp=(event.target.value.getInt16(12) /340.0)+36.53;
				dash.live.tmpC=(dash.live.tmpH - 5 <= dash.live.tmp )? (dash.live.tmpH <= dash.live.tmp )?2:1:0;
				if (dash.live.hapT && dash.live.tmpC==2) euc.alert++;
			} else if ( event.target.value.buffer[0]==90 && event.target.value.buffer[1]==90 && event.target.value.buffer[4]==85 && event.target.value.buffer[5]==170) {
				//trip Total
				dash.live.trpT=event.target.value.getUint32(6)/1000;
				euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=dash.live.trpT;});
				dash.live.mode = (event.target.value.getUint8(10) >> 4) & 0x0F;
				//dash.live.alrm = event.target.value.getUint8(10) & 0x0F;
				dash.live.spdT = event.target.value.getUint8(15);
				dash.live.light = event.target.value.getUint8(17);
				dash.live.alrm = event.target.value.getUint8(18);	
				//log
				almL.unshift(dash.live.alrm);
				if (20<almL.length) almL.pop();		
				//haptic
				if (dash.live.alrm && 10 < dash.live.spd) euc.alert=20;
				//print("alarm :"dash.live.alrm);
			}
			//haptic
			if (!euc.buzz && euc.alert) {  
				if (!w.gfx.isOn&&(dash.live.spdC||dash.live.ampC||dash.live.alrm)) face.go(set.dash[set.def.dash.face],0);
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
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Begode connected!"); 
		buzzer([90,40,150,40,90]);
		euc.wri= function(n) {
			//print(n);
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
			//end
			if (n=="hornOn") {
				euc.horn=1;
				if (euc.tmp) {clearTimeout(euc.tmp);euc.tmp=0;}
				c.writeValue(euc.cmd("beep")).then(function() {
					return c.writeValue(euc.cmd("lightsStrobe"));
				}).then(function() {
					if (euc.tmp) {clearInterval(euc.tmp);euc.tmp=0;}
					euc.tmp=setInterval(() => {
						if (!BTN1.read()){
							if (euc.tmp) {clearInterval(euc.tmp);euc.tmp=0;}
							if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
							euc.horn=0;
							return c.writeValue(euc.cmd(dash.live.aLight));
						}else
							return c.writeValue(euc.cmd("beep"));
					}, 300); 
				});
			}else if (n=="hornOff") {
				euc.horn=0;
				if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				return;
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					
					c.writeValue(euc.cmd("lightsOff")).then(function() {
						c.writeValue(euc.cmd("beep")).then(function() {
							c.stopNotifications(); 
							if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
							global["\xFF"].BLE_GATTS.disconnect();         
						});
					}).catch(function(err)  {
						if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
						global["\xFF"].BLE_GATTS.disconnect();  
					});  
				}else {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			}else if (n=="start") {
				if (!dash.live.aLight) dash.live.aLight="lightsOn";
				c.writeValue(euc.cmd(dash.live.aLight)).then(function() {
					if (!euc.run){
						c.writeValue(euc.cmd("beep")).then(function() {
							euc.run=1;
							if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
							c.startNotifications();
						});
					}else {
						if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
						c.startNotifications();
					}
				}).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
				});  
			}else if (n=="setAlarms") {
				c.writeValue(87).then(function() {
					c.writeValue(89).then(function() {
						let tilt=dash.live.spd3.toString().split('');
           // print (tilt);
						c.writeValue(48+Number(tilt[0])).then(function() {
							c.writeValue(48+Number(tilt[1])).then(function() {
								c.writeValue((dash.live.spd2E)?(dash.live.spd1E)?111:117:105).then(function() {
									c.writeValue(98);
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
								});	
							});	
						});	
					});
				}).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
				});  
			}else if (n=="calibrate") {
				c.writeValue(99);
				setTimeout(()=>{c.writeValue(121);if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}},500);
			//rest
			}else{
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err");
				});
			}
		};
		if (!setter.read("dash","slot"+setter.read("dash","slot")+"Mac")) {
			dash.live.mac=euc.mac; dash.live.batF=420;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			setter.write("dash","slot"+setter.read("dash","slot")+"Mac",euc.mac);
		}	
		setTimeout(() => {euc.wri("start");euc.state="READY";}, 500);
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect);euc.reconnect=0;}
	if (euc.state!="OFF") {
        euc.seq=1;
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
			if (dash.live.lock==1) buzzer(250);
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
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};

