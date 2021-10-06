//code by freestyl3r
euc.tmp={count:0,loop:0};

euc.cmd=function(no,val){
	if (set.bt===2) console.log("inmotion: send cmd :",no);
	let cmd;
	
	//55551501a5550f01000000e880000008050000f0 tilt
	//55551501a5550f01000000d859000008050000b9
	//aaaa1501a5550f010000001027000008050000bf
	//RideMode(0x0F550115),
	
	//55550a06a5550f501400000000000008050000e5
	//aaaa0a06a5550f102700000000000008050000b8
	//SpeakerVolume(0x0F55060A)
	
	//55550a06a5550f00000000000000000805000081
	//calibration  msg.data = new byte[]{(byte) 0x32, (byte) 0x54, (byte) 0x76, (byte) 0x98, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x00};
	//beep msg.data = new byte[]{(byte) 0xB2, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x11, (byte) 0x00, (byte) 0x00, (byte) 0x00};
	//55551501a5550f00000000000000000805000087
	//55551501a5550f0000000000000800080500008f
	//aaaa1501a5550f0000000000000800080500008f
	
	//55 55 09 06 a5 55 0f 04 00 00 00 00 00 00 00 08 05 00 00 84//horn -danger sound
	//PlaySound(0x0F 5 5 06 09),

	//info 55 55 14 01 a5 55 0f ff ff ff ff ff ff ff ff 08 05 00 01 7f
		switch (no) {
		case "info" :		return		[170, 170, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127]; 
		case "infoR":		return		[85, 85, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127];
		case "live":		return 		[170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "liveR":		return  	[85, 85, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "init":		return 		[170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "initR":		return      [85, 85, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "lightsOn":	return      [170, 170, 13, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 128];
		case "lightsOnR":	return      [85, 85, 13, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 128];
		case "lightsOff":	return    	[170, 170, 13, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 127];
		case "lightsOffR":	return    	[85, 85, 13, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 127];
		case "liftOff": 	return		[170, 170, 46, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 160];
		case "liftOffR": 	return		[85, 85, 46, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 160];
		case "liftOn": 		return		[170, 170, 46, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 161];
		case "liftOnR": 	return		[85, 85, 46, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 161];
		case "powerOff": 	return		[170, 170, 22, 1, 165, 85, 15, 178, 0, 0, 0, 5, 0, 0, 0, 8, 5, 0, 0, 63];
		case "powerOffR": 	return		[85, 85, 22, 1, 165, 85, 15, 178, 0, 0, 0, 5, 0, 0, 0, 8, 5, 0, 0, 63];
		case "calibration": 	return		[85, 85, 22, 1, 165, 85, 15, 50, 84, 118, 152, 0, 0, 0, 0, 8, 5, 0, 0, 63];





		case "horn": 		return		[170, 170, 9, 6, 165, 85, 15, 4, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];
		case "hornR": 		return		[85, 85,  9, 6, 165, 85, 15, 4, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];
		case "horn1": 		return		[170, 170, 9, 6, 165, 85, 15, 5, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];
		case "horn1R": 		return		[85, 85, 9, 6, 165, 85, 15, 5, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];	
		case "rideComfort": return    	[170, 170, 20, 3, 96, 35, 0, 84];
		case "rideSport":	return     	[170, 170, 20, 3, 96, 35, 1, 85];

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
			cmd = [170, 170, 9, 6, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "playSound":   
			[170, 170, 9, 6, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0].reduce(checksum)
			cmd.push(cmd.reduce(checksum));
			return cmd;
		case "playSound":   
			cmd = [170, 170, 9, 6, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
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
function appendBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

function eucin (inc){
	if (set.bt===2) console.log("inmotion: packet :",inc.buffer);
	let lala = new DataView(inc.buffer);
	//values
	//spd
	euc.dash.spd=(lala.getInt32(11, true)+lala.getInt32(15, true))/2000;
	if (set.bt===2) console.log("inmotion: speed: ",euc.dash.spd );
	if (30<=euc.dash.spd||euc.dash.spd<= -30) {
		print("Problem : ppacket :",inc.buffer);
		console.log("Problem: packet length : ",inc.buffer.length );
		if (set.bt===2) console.log("inmotion: packet length : ",inc.buffer.length );
	}
	if (euc.dash.spdM < euc.dash.spd) euc.dash.spdM = euc.dash.spd;
	if (euc.dash.spd<0) euc.dash.spd=-euc.dash.spd;
	euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
	if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
	euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 
	//volt
	euc.dash.volt=lala.getUint32(23, true)/100;
	//batt
	//euc.dash.bat=Math.round(((euc.dash.volt*5) - euc.dash.batE ) * (100/(420-euc.dash.batE)));
	euc.dash.bat=Math.round(((euc.dash.volt*( 100/(16*euc.dash.bms))) - euc.dash.batE ) * (100/(420-euc.dash.batE)));
	//euc.dash.bat = Math.round(((euc.dash.volt - 60) * 100) / (84 - 60));
	batL.unshift(euc.dash.bat);
	if (20<batL.length) batL.pop();
	euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
	if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++;
	//temp
	euc.dash.tmp=(lala.buffer[31] & 0xff);
	//euc.dash.tmp=(lala.buffer[53] & 0xff); //alt temp 2
	euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
	if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++;
	//amp
	euc.dash.amp= lala.getInt16(19, true) / 100;
	//log
	ampL.unshift(Math.round(euc.dash.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
	if (euc.dash.hapA && euc.dash.ampC==2) {
		if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
	}
	//trip 
	euc.dash.trpL=lala.getInt32(47, true);
	//print(euc.dash.trpL);
	euc.dash.trpT=lala.getUint32(43, true)/1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
	//loop
 	//setTimeout(function(){ euc.wri("live");},100);

	euc.tmp.live();
}					
						
//
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	if (set.bt===2) console.log("EUCInmotionV1 init");
	if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
		return global['\xFF'].BLE_GATTS.disconnect();
	}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
		.then(function(g) {
			euc.gatt=g;
			return euc.gatt.getPrimaryService(0xffe5);
		}).then(function(s) {
			euc.serv=s;
			return euc.serv.getCharacteristic(0xffe9); // write
		}).then(function(wc) {
			euc.wCha=wc;//write
			return euc.gatt.getPrimaryService(0xffe0);
		}).then(function(s) {
			euc.serv=s;			
			return euc.serv.getCharacteristic(0xffe4);//read
		}).then(function(rc) {
			euc.rCha=rc;
			//read
			euc.tmp.last= new Uint8Array(0);
			euc.tmp.tot=new Uint8Array(0);
			euc.rCha.on('characteristicvaluechanged', function(event) {
				if (set.bt===2) console.log("Inmotion: packet in ",event.target.value.buffer); 
				if (euc.busy) return;
				if (event.target.value.buffer[0]==170 && event.target.value.buffer[1]==170 && event.target.value.buffer[5]==85  ) return;
				if ( 2 <= event.target.value.buffer.length && event.target.value.buffer[event.target.value.buffer.length - 1]==85 && event.target.value.buffer[event.target.value.buffer.length - 1]==85 ) {
					if (set.bt===2) console.log("Inmotion: packet end"); 
					if ( 18 != event.target.value.buffer.length || 80 != euc.tmp.tot.buffer.length ) {
						euc.tmp.tot=new Uint8Array(0);
						console.log("Inmotion: packet dropped");
						euc.tmp.last=new Uint8Array(0);
						euc.tmp.tot=new Uint8Array(0);	
						//euc.tmp.loop=setTimeout(function(v){ euc.tmp.loop=0;euc.tmp.live();},50,euc.tmp.tot);	
						euc.tmp.live();
						return;
						//euc.tmp.tot=new Uint8Array(euc.tmp.tot.slice(1));
					}
					//eucin( euc.tmp.tot);
					if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
					euc.tmp.loop=setTimeout(function(v){ euc.tmp.loop=0;eucin(v);},150,euc.tmp.tot);	
					euc.tmp.last=new Uint8Array(0);
					euc.tmp.tot=new Uint8Array(0);	
					return;
				}
				euc.tmp.tot=new Uint8Array(euc.tmp.last.length + event.target.value.buffer.length);
				euc.tmp.tot.set(new Uint8Array(euc.tmp.last));
				euc.tmp.tot.set(new Uint8Array(event.target.value.buffer),euc.tmp.last.length);
				euc.tmp.last=euc.tmp.tot;
				if (!euc.buzz && euc.alert) {  
					if (!w.gfx.isOn&&(euc.dash.spdC||euc.dash.ampC||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
					else face.off(6000);
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
			});
			//on disconnect
			global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
				euc.off(reason);
			});
			return  rc;
		}).then(function(c) {
			//connected 
			if (set.bt===2) console.log("EUC InmotionV1: Connected"); 
			euc.state="READY"; //connected
			buzzer(D16,1,[90,40,150,40,90]);
			euc.dash.lock=0;
			//write function
			euc.tmp.live= function(){
				  if (euc.busy) return;
				  euc.wCha.writeValue(euc.cmd("live")).then(function() {
						return euc.wCha.writeValue(euc.cmd("liveR"));
					}).catch(function(err)  {
						euc.off("writefail");	
					});
			};
			euc.wri=function(cmd,value){
				euc.busy=1;
				if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
				if (set.bt===2) console.log("Inmotion cmd: ", cmd);
				//off
				if (euc.state==="OFF"||cmd==="end") {
					if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
						if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
						euc.tmp.loop=setTimeout(function(){ 
							euc.tmp.loop=0;
							if (euc.dash.aOff) {
								euc.wCha.writeValue(euc.cmd("powerOff")).then(function() {
									return euc.wCha.writeValue(euc.cmd("powerOffR"));
								}).then(function(err)  {
									euc.off("power off");
								}).catch(function(err)  {
									euc.state="OFF";
									euc.off("end fail");	
								});	
								return;
							}	
							euc.tmp.loop=0;
							euc.wCha.writeValue(euc.cmd("lightsOff")).then(function() {
								return euc.wCha.writeValue(euc.cmd("lightsOffR"));
							}).then(function(err)  {
								return euc.wCha.writeValue(euc.cmd("lightsOff"));
							}).then(function(err)  {
								global['\xFF'].BLE_GATTS.disconnect();
								//euc.state="OFF";
								//euc.off("end");
							}).catch(function(err)  {
								euc.state="OFF";
								euc.off("end fail");	
							});
						},400);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;
					}
				}else if (cmd==="start") {
					euc.wCha.writeValue(euc.cmd("init")).then(function() {
						return euc.wCha.writeValue(euc.cmd("initR"));
					}).then(function()  {	
						return  (euc.dash.light)?euc.wCha.writeValue(euc.cmd("lightsOn")):"ok";
					}).then(function()  {
						return (euc.dash.light)?euc.wCha.writeValue(euc.cmd("lightsOnR")):"ok";
					}).then(function()  {
						return euc.rCha.startNotifications();
					}).then(function()  {
						if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
						euc.tmp.loop=setTimeout(function(){
							euc.tmp.loop=0;euc.run=1;euc.busy=0;
							return euc.tmp.live();
						},350);	
					}).catch(function(err)  {
						euc.off("start fail");	
					});
				}else if (cmd==="hornOn") {
					euc.horn=1;
					if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
					euc.tmp.loop=setTimeout(function(){
						euc.tmp.loop=0;
						euc.wCha.writeValue(euc.cmd("playSound",24)).then(function() { 
						euc.horn=0;
						if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
						euc.tmp.loop=setTimeout(function(){
							euc.tmp.loop=0;
							euc.busy=0;
							euc.tmp.live();
							},150);
					});
					},350);
				}else if (cmd==="hornOff") {
					euc.horn=0;					
				} else {
					//if (euc.busy) return; 
					if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
					euc.tmp.loop=setTimeout(function(){
						euc.tmp.loop=0;
						euc.wCha.writeValue(euc.cmd(cmd,value)).then(function() {
							return euc.wCha.writeValue(euc.cmd(cmd+"R",value));
						//}).then(function(err)  {
						//return euc.wCha.writeValue(euc.cmd(cmd,value));
						}).catch(function(err)  {
							euc.off("writefail");	
						});
					},200);
				}
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.mac=euc.mac; 
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
			}		
			//euc.wri("start");			
			setTimeout(() => {euc.wri("start");}, 200);
		//reconnect
		}).catch(function(err)  {
			euc.off(err);
	});
};

euc.off=function(err){
	if (set.bt===2) console.log("EUC:", err);
	//  global.error.push("EUC :"+err);
	if (euc.tmp.loop) {clearTimeout(euc.tmp.loop);euc.tmp.loop=0;}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.bt===2) console.log("EUC imV1: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.bt===2) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (euc.dash.lock==1) buzzer(D16,1,250);
			else buzzer(D16,1,[250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1000);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
			return global['\xFF'].BLE_GATTS.disconnect();
		}	
		if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
		global["\xFF"].bleHdl=[];
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		delete euc.serv;
		delete euc.wCha;
		delete euc.rCha;
		delete euc.tmp;
		delete euc.gatt;
		euc.busy=0;euc.run=0;euc.horn=0;
		NRF.setTxPower(set.def.rfTX);	
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		if (set.bt===2) console.log("EUC: Inmotion end", err);

    }
};