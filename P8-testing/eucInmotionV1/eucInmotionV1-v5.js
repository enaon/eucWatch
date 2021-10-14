//code by freestyl3r
euc.tmp={count:0,loop:0};

euc.cmd=function(no,val){
	if (set.bt===2) console.log("inmotion: send cmd :",no);
	let cmd;
	switch (no) {
		//lights on: aa aa 0d 01 a5 55 0f 01 00 00 00 00 00 00 00 08 05 00 00 80
		//lights off:55 55 0d 01 a5 55 0f 00 00 00 00 00 00 00 00 08 05 00 00 7f
		//off: 55 55 16 01 a5 55 0f b2 00 00 00 05 00 00 00 08 05 00 00 3f
		case "infoV10" :	return		[170, 170, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127]; 
		case "infoV5":		return		[85, 85, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127];
		case "liveV10":		return 		[170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "liveV5":		return  	[85, 85, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "initV5":		return  	[170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "initV10":		return      [85, 85, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "lightsOn":	return      [170, 170, 13, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 128];
		case "lightsOn1":	return      [85, 85, 13, 1, 165, 85, 15, 1, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 128];
		case "lightsOff":	return    	[170, 170, 13, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 127];
		case "lightsOff1":	return    	[85, 85, 13, 1, 165, 85, 15, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 127];
//		case "lightsOn":	return      [170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
//		case "lightsOff":	return      [170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "liftOn": 		return		[170, 170, 20, 3, 96, 46, 1, 88];
		case "liftOff": 	return		[170, 170, 20, 3, 96, 46, 0, 89];
		case "lock":		return    	[170, 170, 20, 3, 96, 49, 1, 71];
		case "unlock":		return		[170, 170, 20, 3, 96, 49, 0, 70];
		case "transportOn": return		[170, 170, 20, 3, 96, 50, 1, 68];
		case "transportOff":return   	[170, 170, 20, 3, 96, 50, 0, 69];
		case "rideComfort": return    	[170, 170, 20, 3, 96, 35, 0, 84];
		case "rideSport":	return     	[170, 170, 20, 3, 96, 35, 1, 85];
		case "remainderReal":return  	[170, 170, 20, 3, 96, 61, 1, 75];
		case "remainderEst":return   	[170, 170, 20, 3, 96, 61, 0, 74];
		case "mute":		return		[170, 170, 20, 3, 96, 44, 0, 91];
		case "unmute":		return		[170, 170, 20, 3, 96, 44, 1, 90];
		case "calibration":	return		[170, 170, 20, 5, 96, 66, 1, 0, 1, 51];
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
function appendBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

function eucin (inc){
	if (set.bt===2) console.log("inmotion: packet :",inc.buffer);
	if ((inc.buffer[0]==85&&inc.buffer[1]==85)||inc.buffer.length==0||(inc.buffer[78]==255&&inc.buffer[79]==255) ) {
			if (set.bt===2) console.log("inmotion: packet dropped.");
			euc.wri("live"+euc.dash.model);
			//setTimeout(function(){ euc.wri("live"+euc.dash.model);},250);	
			return;
	}
	if (inc.buffer[9]==255&&inc.buffer[10]==255&&inc.buffer[11]==255){
			if (set.bt===2) console.log("inmotion: packet corrected.");
			inc=new Uint8Array(inc.slice(1));
	}
	let lala = new DataView(inc.buffer);
	//values
	//spd
	euc.dash.spd=(lala.getInt32(11, true)+lala.getInt32(15, true))/2000;
	if (set.bt===2) console.log("inmotion: speed: ",euc.dash.spd );
	if (30<=euc.dash.spd||euc.dash.spd<= -30) {
		print(inc.buffer);
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
 	//setTimeout(function(){ euc.wri("live"+euc.dash.model);},250);	
	euc.wri("live"+euc.dash.model);
}					
						
//
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
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
				if ((event.target.value.buffer[0]==170 && event.target.value.buffer[5]==85)||(event.target.value.buffer[0]==85 ) ) return;
				if (event.target.value.buffer[event.target.value.buffer.length - 1]==85 ) {
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					if (set.bt===2) console.log("Inmotion: packet end"); 
					//eucin( euc.tmp.tot);
					euc.loop=setTimeout(function(v){ euc.loop=0;eucin(v);},50,euc.tmp.tot);	
					euc.tmp.last=new Uint8Array(0);
					euc.tmp.tot=new Uint8Array(0);
					return;
				}
				euc.tmp.tot= new Uint8Array(euc.tmp.last.length + event.target.value.buffer.length);
				euc.tmp.tot.set(new Uint8Array(euc.tmp.last));
				euc.tmp.tot.set(new Uint8Array(event.target.value.buffer),euc.tmp.last.length);
				euc.tmp.last=euc.tmp.tot;
				//
				//euc.tmp.tot=appendBuffer(euc.tmp.last,event.target.value.buffer);
				//euc.tmp.last=euc.tmp.tot;
				//
				if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
				euc.loop=setTimeout(function(){ 
					euc.loop=0;
					eucin( euc.tmp.tot);
					euc.tmp.last=new Uint8Array(0);
					euc.tmp.tot=new Uint8Array(0);
				},100);	
									
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
			if (set.bt===2) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			buzzer(D16,1,[90,40,150,40,90]);
			euc.dash.lock=0;
			//write function
			euc.wri=function(cmd,value){
				if (euc.state==="OFF"||cmd==="end") {
					euc.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
						euc.loop=setTimeout(function(){ 
							euc.loop=0;
							if (global['\xFF'].BLE_GATTS && !global['\xFF'].BLE_GATTS.connected)  {euc.off("not connected");return;}
							euc.wCha.writeValue(euc.cmd("lightsOff")).then(function() {
								euc.state="OFF";
								global["\xFF"].BLE_GATTS.disconnect(); 
								return;
							}).catch(function(err)  {
								euc.state="OFF";
								euc.off("end fail");	
								return;
							});
						},500);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;
					}
					
				}else if (cmd==="start") {
					euc.busy=0;
					euc.wCha.writeValue(euc.cmd("init"+euc.dash.model)).then(function() {
						euc.rCha.startNotifications();	
						if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
						euc.loop=setTimeout(function(){ 
							euc.loop=0;
							euc.busy=0;
							euc.run=1;
							if (euc.dash.light) euc.wri("lightsOn");
							else euc.wri("initV10");
						},300);	
					}).catch(function(err)  {
						euc.off("start fail");	
					});
				}else if (cmd==="hornOn") {
					//if (euc.horn) return;
					euc.busy=1;euc.horn=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					euc.loop=setTimeout(function(){
						euc.wCha.writeValue(euc.cmd("playSound",24)).then(function() { 
						euc.horn=0;euc.loop=0;
						euc.loop=setTimeout(function(){
							euc.loop=0;
							euc.busy=0;
							euc.wri("live"+euc.dash.model);	
						},150);
					});
					},350);
				}else if (cmd==="hornOff") {
					euc.horn=0;					
				} else {
					//if (euc.busy) return; 
					euc.wCha.writeValue(euc.cmd(cmd,value)).then(function() {
						if (euc.busy) return; 
						if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
						euc.loop=setTimeout(function(){
								euc.loop=0;
								euc.wri("live"+euc.dash.model);	
						},125);
					}).catch(function(err)  {
						euc.off("writefail");	
					});
				}
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.mac=euc.mac; 
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
			}			
			setTimeout(() => {euc.wri("start");}, 200);
		//reconnect
		}).catch(function(err)  {
			euc.off(err);
	});
};

euc.off=function(err){
	//if (set.bt===2) console.log("EUC:", err);
	//  global.error.push("EUC :"+err);
	if (euc.tmp.loop) {clearInterval(euc.tmp.loop);euc.tmp.loop=0;}
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
		if (set.bt===2) console.log("EUC OUT:",err);
		if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
		global["\xFF"].bleHdl=[];
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		delete euc.serv;
		delete euc.wCha;
		delete euc.rCha;
		euc.busy=0;euc.run=0;euc.horn=0;
		NRF.setTxPower(set.def.rfTX);	
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
    }
};