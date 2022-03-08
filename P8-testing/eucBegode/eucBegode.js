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
	//check if connected
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
				euc.dash.spd = Math.abs((event.target.value.getInt16(4) * 3.6)/100); 
				if (euc.dash.spdM < euc.dash.spd) euc.dash.spdM = euc.dash.spd;
				euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
				if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
					euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 	
				//battery
				euc.dash.volt=(event.target.value.getUint16(2)*euc.dash.bms)/100; //bms=1 67.2 ,1.25 84, 1.5 100,8
				euc.dash.bat=Math.round( 100*(euc.dash.volt*( 100/(16*euc.dash.bms)) - euc.dash.batE ) / (euc.dash.batF-euc.dash.batE) );
				//euc.dash.bat = Math.round(((euc.dash.volt / (16*euc.dash.bms)) * 100 - 310 ) * 0.909);
				batL.unshift(euc.dash.bat);
				if (20<batL.length) batL.pop();
				euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
				if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++;   
				//trip last
				euc.dash.trpL=event.target.value.getUint32(6)/1000;
				//euc.dash.trpL=(event.target.value.getUint32(6)/1000)*euc.dash.trpF*((set.def.dash.mph)?0.625:1);
				//amp
				euc.dash.amp=event.target.value.getInt16(10)/1000;
				if (euc.dash.ampR) euc.dash.amp=-euc.dash.amp;
				ampL.unshift(Math.round(euc.dash.amp));
				if (20<ampL.length) ampL.pop();
				euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
				if (euc.dash.hapA && euc.dash.ampC==2) {
					if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
					else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
				}
				//temp
				euc.dash.tmp=(event.target.value.getInt16(12) /340.0)+36.53;
				euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
				if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++;
			} else if ( event.target.value.buffer[0]==90 && event.target.value.buffer[1]==90 && event.target.value.buffer[4]==85 && event.target.value.buffer[5]==170) {
				//trip Total
				euc.dash.trpT=event.target.value.getUint32(6)/1000;
				euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
				euc.dash.mode = (event.target.value.getUint8(10) >> 4) & 0x0F;
				//euc.dash.alrm = event.target.value.getUint8(10) & 0x0F;
				euc.dash.spdT = event.target.value.getUint8(15);
				euc.dash.light = event.target.value.getUint8(17);
				euc.dash.alrm = event.target.value.getUint8(18);	
				//log
				almL.unshift(euc.dash.alrm);
				if (20<almL.length) almL.pop();		
				//haptic
				if (euc.dash.alrm && 10 < euc.dash.spd) euc.alert=20;
				//print("alarm :"euc.dash.alrm);
			}
			//haptic
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
							return c.writeValue(euc.cmd(euc.dash.aLight));
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
				if (!euc.dash.aLight) euc.dash.aLight="lightsOn";
				c.writeValue(euc.cmd(euc.dash.aLight)).then(function() {
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
						let tilt=euc.dash.spd3.toString().split('');
           // print (tilt);
						c.writeValue(48+Number(tilt[0])).then(function() {
							c.writeValue(48+Number(tilt[1])).then(function() {
								c.writeValue((euc.dash.spd2E)?(euc.dash.spd1E)?111:117:105).then(function() {
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
			/*//rest
			} else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err");
				});   
			*/}else{
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err");
				});
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.mac=euc.mac; euc.dash.batF=420;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
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
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};

