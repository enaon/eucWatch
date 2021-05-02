//code by freestyl3r
euc.tmp={count:0,loop:0};
euc.cmd=function(no,val){
	let cmd;
	switch (no) {
		case "live": return  [170, 170, 20, 1, 4, 17];
		case "drlOn": return          [170, 170, 20, 3, 96, 45, 1, 91];
		case "drlOff": return         [170, 170, 20, 3, 96, 45, 0, 90];
		case "lightsOn": return       [170, 170, 20, 3, 96, 64, 1, 54];
		case "lightsOff": return      [170, 170, 20, 3, 96, 64, 0, 55];
		case "fanOn": return          [170, 170, 20, 3, 96, 67, 1, 53];
		case "fanOff": return         [170, 170, 20, 3, 96, 67, 0, 52];
		case "fanQuietOn": return     [170, 170, 20, 3, 96, 56, 1, 78];
		case "fanQuietOff": return    [170, 170, 20, 3, 96, 56, 0, 79];
		case "liftOn": return         [170, 170, 20, 3, 96, 46, 1, 88];
		case "liftOff": return        [170, 170, 20, 3, 96, 46, 0, 89];
		case "lock": return           [170, 170, 20, 3, 96, 49, 1, 71];
		case "unlock": return         [170, 170, 20, 3, 96, 49, 0, 70];
		case "transportOn": return    [170, 170, 20, 3, 96, 50, 1, 68];
		case "transportOff": return   [170, 170, 20, 3, 96, 50, 0, 69];
		case "rideComfort": return    [170, 170, 20, 3, 96, 35, 0, 84];
		case "rideSport": return      [170, 170, 20, 3, 96, 35, 1, 85];
		case "performanceOn": return  [170, 170, 20, 3, 96, 36, 1, 82];
		case "performanceOff": return [170, 170, 20, 3, 96, 36, 0, 83];
		case "remainderReal": return  [170, 170, 20, 3, 96, 61, 1, 75];
		case "remainderEst": return   [170, 170, 20, 3, 96, 61, 0, 74];
		case "lowBatLimitOn": return  [170, 170, 20, 3, 96, 55, 1, 65];
		case "lowBatLimitOff": return [170, 170, 20, 3, 96, 55, 0, 64];
		case "usbOn": return          [170, 170, 20, 3, 96, 60, 1, 74];
		case "usbOff": return         [170, 170, 20, 3, 96, 60, 0, 75];
		case "loadDetectOn": return   [170, 170, 20, 3, 96, 54, 1, 64];
		case "loadDetectOff": return  [170, 170, 20, 3, 96, 54, 0, 65];
		case "mute": return           [170, 170, 20, 3, 96, 44, 0, 91];
		case "unmute": return         [170, 170, 20, 3, 96, 44, 1, 90];
		case "calibration": return    [170, 170, 20, 5, 96, 66, 1, 0, 1, 51];
		case "speedLimit":
			cmd = [170, 170, 20, 4, 96, 33];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "pedalTilt":
			cmd = [170, 170, 20, 4, 96, 34];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "pedalSensitivity":
			cmd = [170, 170, 20, 4, 96, 37, val, 100];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "setBrightness": 
			cmd = [170, 170, 20, 3, 96, 43, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "setVolume":
			cmd = [170, 170, 20, 3, 96, 38, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "playSound":   
			cmd = [170, 170, 20, 4, 96, 65, val, 1];
			cmd.push(cmd.reduce(checksum));
			return cmd;
	}
};
//
function checksum(check, val) {
	return (check ^ val) & 0xFF;
}
//
function validateChecksum(buffer) {
	receivedChecksum = buffer[buffer.length - 1];
	array = new Uint8Array(buffer, 0, buffer.length - 1);
	calculatedChecksum = array.reduce(checksum);
	return receivedChecksum == calculatedChecksum;
}
//
euc.conn=function(mac){
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		return global['\xFF'].BLE_GATTS.disconnect();
	}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
		.then(function(g) {
			return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
		}).then(function(s) {
			euc.serv=s;
			return euc.serv.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"); // write
		}).then(function(wc) {
			euc.wCha=wc;//write
			return euc.serv.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");//read
		}).then(function(rc) {
			euc.rCha=rc;
			//read
			euc.rCha.on('characteristicvaluechanged', function(event) {
				let data=event.target.value;
				if (data.buffer[3] != 51 || !validateChecksum(data.buffer)) {
					print ("packet dropped: ",data.buffer[3]);
					return;
				}
				print ("packet: ",data.buffer);
				euc.alert=0;			
				//volt
				euc.dash.volt=(data.getUint16(5, true)/100).toFixed(2);
				//batt
				euc.dash.bat = Math.round(((euc.dash.volt - 60) * 100) / (84 - 60));
				//euc.dash.bat = (data.buffer[21] & 0x7f);
				euc.dash.batC = (euc.dash.batH <= euc.dash.bat)? 0 : (euc.dash.batM <= euc.dash.bat)? 1 : (euc.dash.batL <= euc.dash.bat)? 2 : 3;	
				if ( euc.dash.hapB && euc.dash.bat <= euc.dash.batL ) { euc.alert ++; euc.dash.spdC = 3; }    
				//trip 
				euc.dash.trpT=(data.getUint16(17, true))*10;
				//if (!euc.dash.trpS) euc.dash.trpS=(data.getUint32(1, true)/1000).toFixed(3);
				//euc.dash.trpL=(data.getUint32(1, true)/1000).toFixed(3)-euc.dash.trpS;
				euc.dash.trpL=(data.getUint16(19, true))*10;
				//euc.dash.time=(data.getUint16(7, true)/60)|0;
				//temp
				euc.dash.tmp=((data.buffer[22] & 0xff) + 80 - 256).toFixed(1);
				euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
				if (euc.dash.tmpH <= euc.dash.tmp) {euc.alert++; euc.dash.spdC = 3;}   
				//amp
				euc.dash.amp= Math.round(data.getInt16(7, true) / 100);
				euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
				if ( euc.dash.ampH <= euc.dash.amp ){
					euc.dash.spdC = ( euc.dash.ampC === 3 )? 3 : ( euc.dash.spdC === 3 )? 3 : 2;
					if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
				}else if ( euc.dash.amp <= euc.dash.ampL )  {
					euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
					if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
				}
				//speed
				euc.dash.spd=Math.round(data.getInt16(9, true) / 100);
				euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd <= euc.dash.spd1+5 )? 1 : ( euc.dash.spd <= euc.dash.spd1+10 )? 2 : 3 ;	
				if ( euc.dash.hapS && euc.dash.spd >= euc.dash.spd1 ) 
					euc.alert = 1 + ((euc.dash.spd-euc.dash.spd1) / euc.dash.ampS|0) ;
				//average
				//euc.dash.spdA=((data.getUint16(17, true))/100).toFixed(1);
				//euc.dash.spdM=((data.getUint16(19, true))/100).toFixed(1);
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
				if ((1<euc.dash.spdC||1<euc.dash.ampC)&&!w.gfx.isOn ){
					face.go(set.dash[set.def.dash],0);
				}
			});
			//on disconnect
			global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
				euc.off(reason);
			});
			euc.rCha.startNotifications();	
			return  rc;
		}).then(function(c) {
			//connected 
			if (set.def.cli) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			digitalPulse(D16,1,[90,40,150,40,90]);
			euc.dash.lock=0;
			//write function
			euc.wri=function(cmd,value){
				if (euc.state==="OFF") {
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					setTimeout(()=>{global["\xFF"].BLE_GATTS.disconnect().catch(function(err)  {if (set.def.cli) console.log("EUC OUT disconnect failed:", err);});},200);
				} else {
					euc.wCha.writeValue(euc.cmd(cmd,value)).then(function() {
						if (!euc.busy) { 
							euc.loop=setTimeout(function(t,o){
								euc.loop=0;
								euc.wri("live");	
							},150);
						}
					}).catch(function(err)  {
						euc.off("writefail");	
					});
				}
			};
			euc.busy=0;
			setTimeout(() => {euc.wri("live");}, 500);
		//reconnect
		}).catch(function(err)  {
			euc.off(err);
	});
};

euc.off=function(err){
	//if (set.def.cli) console.log("EUC:", err);
	//  global.error.push("EUC :"+err);
	if (euc.tmp.loop) {clearInterval(euc.tmp.loop);euc.tmp.loop=0;}
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
			// if (euc.dash.lock==1) digitalPulse(D16,1,100);
			// else digitalPulse(D16,1,[100,150,100]);
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
			}, 1500);
		}
	} else {
		if (set.def.cli) console.log("EUC: OUT");
		global["\xFF"].bleHdl=[];
		delete euc.off;
		delete euc.conn;
		delete euc.wri;
		delete euc.tmp;
		delete euc.cmd;
		//delete euc.dash.trpS;
		delete euc.serv;
		delete euc.wCha;
		delete euc.rCha;
		NRF.setTxPower(set.def.rfTX);	
    }
};