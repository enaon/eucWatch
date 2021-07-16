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
//start
euc.conn=function(mac){
	//check
	if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (set.def.cli) print("ble allready connected"); 
		if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		c.on('characteristicvaluechanged', function(event) {
			//print( event.target.value.buffer);
			if  ( event.target.value.buffer[0]===85 ) {
				//print( event.target.value.buffer);
				euc.alert=0;
				//speed
				euc.dash.spd = Math.abs(event.target.value.getInt16(4) * 3.6)/100|0;
				if ( (euc.dash.spdM < euc.dash.spd)&& euc.dash.spd < 100 ) euc.dash.spdM=euc.dash.spd;
				euc.dash.spdC = ( euc.dash.spd <= 25 )? 0 : ( euc.dash.spd <= 30 )? 1 : ( euc.dash.spd <= 35 )? 2 : 3 ;	
				if ( euc.dash.hapS && euc.dash[euc.dash.haSv]  <= euc.dash.spd ) 
					euc.alert = ( 1 + ((euc.dash.spd-euc.dash[euc.dash.haSv]) / euc.dash.spdS | 0 ) );  
				//battery
				euc.dash.volt=(event.target.value.getUint16(2)*euc.dash.bms)/100; //bms=1 67.2 ,2 84, 3 100,8
				euc.dash.bat = Math.round(((euc.dash.volt / (16*euc.dash.bms)) * 100 - 310 ) * 0.909);
				//log
				batL.unshift(euc.dash.bat);
				if (20<batL.length) batL.pop();
				euc.dash.batC = (euc.dash.batH <= euc.dash.bat)? 0 : (euc.dash.batM <= euc.dash.bat)? 1 : (euc.dash.batL <= euc.dash.bat)? 2 : 3;	
				if ( euc.dash.hapB && euc.dash.bat <= euc.dash.batL ) { euc.alert ++; euc.dash.spdC = 3; }   
				//trip
				euc.dash.trpL=event.target.value.getUint32(6)/1000;
				//amp
				euc.dash.amp=event.target.value.getInt16(10)/1000|0;
				if (euc.dash.ampR) euc.dash.amp=-euc.dash.amp;
				//log
				ampL.unshift(euc.dash.amp);
				if (20<ampL.length) ampL.pop();
				euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
				if ( euc.dash.ampH <= euc.dash.amp ){
					//euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
					if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
				}else if ( euc.dash.amp <= euc.dash.ampL )  {
					//euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
					if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
				}
				//temp
				//euc.dash.tmp=Math.round((event.target.value.getUint16(12)/340)+102)/10;
				euc.dash.tmp=((event.target.value.getInt16(12) /340.0)+36.53).toFixed(1);
				//print(euc.dash.tmp,euc.dash.tmp1);
				euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
				if (euc.dash.tmpH+5 <= euc.dash.tmp) {euc.alert++; euc.dash.spdC = 3;} 
				euc.new=1;
			} else if ( event.target.value.buffer[0]===90 ){
				print(event.target.value.buffer);
				//euc.dash.trpT=((event.target.value.getUint32(6)/1000)*1.2).toFixed(1);
				euc.dash.trpT=(event.target.value.getUint32(6)/1000).toFixed(1);
				euc.dash.mode = (event.target.value.getUint8(10) >> 4) & 0x0F;
				//euc.dash.alrm = event.target.value.getUint8(10) & 0x0F;
				euc.dash.spdT = event.target.value.getUint8(15);
				euc.dash.light = event.target.value.getUint8(17);
				euc.dash.alrm = event.target.value.getUint8(18);	
				//log
				almL.unshift(euc.dash.alrm);
				if (20<almL.length) almL.pop();		
				//haptic
				if (euc.dash.alrm) euc.alert=20;
				//print("alarm :"euc.dash.alrm);
				euc.new=1;
			}
			//haptic
        if (!euc.buzz && euc.alert) {  
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
				digitalPulse(D16,0,a);  
				setTimeout(() => { euc.buzz = 0; }, 3000);
			}
			//screen on
			if ((1<euc.dash.spdC||1<euc.dash.ampC||euc.dash.alrm)&&!w.gfx.isOn ){
				face.go(set.dash[set.def.dash],0);
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Begode connected!!"); 
		digitalPulse(D16,1,[90,40,150,40,90]);
		euc.wri= function(n) {
			print(n);
			if (euc.busy) {print(1); clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
			//end
			if (n=="end") {
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
			}else if (n=="start") {
				if (euc.dash.aLight!="lightsOn"||euc.dash.aLight!="lightsOff"||euc.dash.aLight!="lightsStrobe") euc.dash.aLight="lightsOn";
				c.writeValue(euc.cmd(euc.dash.aLight)).then(function() {
					if (!euc.run){
						c.writeValue(euc.cmd("beep")).then(function() {
							euc.run=1;
							clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
						});
					}else {
						clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
					}
				}).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
				});  
			}else if (n=="setAlarms") {
				c.writeValue(87).then(function() {
					c.writeValue(89).then(function() {
						let tilt=euc.dash.spd3.toString().split('');
            print (tilt);
						c.writeValue(48+Number(tilt[0])).then(function() {
							c.writeValue(48+Number(tilt[1])).then(function() {
								c.writeValue((euc.dash.spd2E)?(euc.dash.spd1E)?111:117:105).then(function() {
									c.writeValue(98);
									clearTimeout(euc.busy);euc.busy=0;
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
				setTimeout(()=>{c.writeValue(121);clearTimeout(euc.busy);euc.busy=0;},500);
			}else if (n=="hornOn") {
				c.writeValue(euc.cmd("lightsStrobe")).then(function() {
					c.writeValue(euc.cmd("beep"));
   					clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
				});  
			}else if (n=="hornOff") {
				c.writeValue(euc.cmd(euc.dash.aLight)).then(function() {
   					clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
				}); 
			//rest
			} else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});   
			}else{
				c.writeValue(euc.cmd(n)).then(function() {
					clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) set.write("dash","slot"+set.read("dash","slot")+"Mac",this.mac);
		setTimeout(() => {euc.wri("start");euc.state="READY";}, 500);
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {
		clearTimeout(euc.reconnect);
		euc.reconnect=0;
	}
	if (euc.state!="OFF") {
        euc.seq=1;
		if (set.def.cli) 
			console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if (euc.dash.lock==1) digitalPulse(D16,1,250);
			else digitalPulse(D16,1,[250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}
		else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
		else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (set.def.cli) 
			console.log("EUC OUT:",err);
	  	global["\xFF"].bleHdl=[];
			clearTimeout(euc.busy);euc.busy=0;
			delete euc.off;
			delete euc.conn;
			delete euc.wri;
			delete euc.cmd;
			euc.run=0;
			NRF.setTxPower(set.def.rfTX);	
    }
};

