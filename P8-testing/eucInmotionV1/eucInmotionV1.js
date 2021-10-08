//code by freestyl3r
euc.tmp={count:0,loop:0};

euc.cmd=function(no,val){
	if (set.bt===2) console.log("inmotion: send cmd :",no);
	let cmd;
		switch (no) {
		case "info" :		return		[170, 170, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127]; 
		case "batLevelData":return 		[170, 170, 20, 1, 165, 85, 15, 0, 0, 0, 21, 0, 0, 0, 0, 8, 5, 0, 1, 156];
		case "live":		return 		[170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "liveS":		return 		[170, 170, 19, 1, 165, 85, 15, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 0, 1, 126];
		case "liveS1":		return 		[170, 170, 19, 1, 165, 85, 15, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 0, 1, 125];
		case "init":		return 		[170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "calibration": return 		[170, 170, 22, 1, 165, 85, 15, 50, 84, 118, 152, 0, 0, 0, 0, 8, 5, 0, 0, 63];
		case "horn": 		return		[170, 170, 9, 6, 165, 85, 15, 4, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];
		case "beep":		return 		[170, 170, 9, 6, 165, 85, 15, 21, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 149];
		case "led":			return 		[170, 170, 9, 6, 165, 85, 15, 21, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 149];
		case "end":			return      [85, 85];

		case "playSound"://cmd=0-23
			cmd = [170, 170, 9, 6, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setVolume"://cmd=0-100
			cmd = [170, 170, 10, 6, 165, 85, 15, (val * 100) & 0xFF, ((val * 100) / 0x100) & 0xFF, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setLights"://val=0|1
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 13, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setBrightness": 
			cmd = [170, 170, 20, 3, 96, 43, val];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setRideMode"://val=0=clasic|1=comfort
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, val, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setPpedalTilt": //val=-80-+80
			viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
			viw.setInt32( 0, val * 65536 / 10  );
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setPedalSensitivity": //val=-80-+80
			viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
			viw.setInt32( 0, val * 65536 / 10  );
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "speedLimit":
			viw = new DataView(new Int8Array(2).buffer); //to int16 BI.
			viw.setInt16( 0, val*1000 );
			cmd = [170, 170, 21, 1, 165, 85, 15, 1, 0, 0, 0, viw.buffer[1], viw.buffer[0], 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "control"://15=ledOn|16=ledOff|5=powerOff|17=beep|
			cmd = [170, 170, 22, 1, 165, 85, 15, 178, 0, 0, 0, val, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "pincode"://
			cmd = [170, 170, 7, 3, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "alert"://
			cmd = [170, 170, 1, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "handleButton"://val=0|1
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 46, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
	}
};
//
function checksum(check, val) {
	return (check + val) & 255;
}
//cmd=[[170, 170, 19, 1, 165, 85, 15, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 0, 1]
//cmd.push(cmd.reduce(checksum));
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
	let lala = new DataView(inc.buffer);
	//values
	//spd
	euc.dash.spd=(lala.getInt32(31, true)+lala.getInt32(35, true))/2000;
	if (euc.dash.spdM < euc.dash.spd) euc.dash.spdM = euc.dash.spd;
	if (euc.dash.spd<0) euc.dash.spd=-euc.dash.spd;
	euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
	if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
	euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 
	//volt
	euc.dash.volt=lala.getUint32(43, true)/100;
	//batt
	//euc.dash.bat=Math.round(((euc.dash.volt*5) - euc.dash.batE ) * (100/(420-euc.dash.batE)));
	euc.dash.bat=Math.round(((euc.dash.volt*( 100/(16*euc.dash.bms))) - euc.dash.batE ) * (100/(420-euc.dash.batE)));
	//euc.dash.bat = Math.round(((euc.dash.volt - 60) * 100) / (84 - 60));
	batL.unshift(euc.dash.bat);
	if (20<batL.length) batL.pop();
	euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
	if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++;
	//temp
	euc.dash.tmp=(lala.buffer[51] & 0xff);
	//euc.dash.tmp=(lala.buffer[53] & 0xff); //alt temp 2
	euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
	if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++;
	//amp
	euc.dash.amp= lala.getInt16(39, true) / 100;
	//log
	ampL.unshift(Math.round(euc.dash.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
	if (euc.dash.hapA && euc.dash.ampC==2) {
		if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
	}
	//trip 
	euc.dash.trpL=lala.getInt32(67, true);
	//print(euc.dash.trpL);
	euc.dash.trpT=lala.getUint32(63, true)/1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
	//mode
	euc.dash.mode=lala.getInt32(81, true);
	//haptic
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
			euc.tmp.chk=new Uint8Array(0);
			euc.rCha.on('characteristicvaluechanged', function(event) {
				//if (set.bt===2) console.log("Inmotion: packet in ",event.target.value.buffer); 
				if (euc.busy) return;
				euc.tmp.tot=new Uint8Array(euc.tmp.last.length + event.target.value.buffer.length);
				euc.tmp.tot.set(euc.tmp.last);
				euc.tmp.tot.set(event.target.value.buffer,euc.tmp.last.length);
				euc.tmp.last=euc.tmp.tot;
				if ( (event.target.value.buffer.length==1 && event.target.value.buffer[0]==85) || (event.target.value.buffer[event.target.value.buffer.length - 2]==85 && event.target.value.buffer[event.target.value.buffer.length - 1]==85) ) {
					if (set.bt===2) console.log("Inmotion: packet got :",euc.tmp.tot); 
					if (set.bt===2) console.log("Inmotion: packet length :",euc.tmp.tot.buffer.length); 
					euc.tmp.chk=new Uint8Array(euc.tmp.tot.length -3);
					euc.tmp.chk.set(euc.tmp.tot);
					if ( euc.tmp.chk.reduce(checksum) + 7 == euc.tmp.tot.buffer[euc.tmp.tot.length - 3] ){
						if (100 <= euc.tmp.tot.length && euc.tmp.tot.buffer[2]===19) {
							if (set.bt===2) console.log("Inmotion: checksum ok :"); 
							if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
							euc.tmp.loop=setTimeout(function(v){ euc.tmp.loop=0;eucin(v);},50,euc.tmp.tot);
						//eucin(euc.tmp.tot);
						}else{
							if (set.bt===2) console.log("Inmotion: not live: packet droped");
							console.log("Inmotion: not live: packet droped");
							euc.busy=1;
							if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
							euc.tmp.loop=setTimeout(function(){ euc.tmp.loop=0;euc.busy=0;euc.tmp.live();},300);
							//euc.tmp.live();
						}
						
					}else {
						if (set.bt===2) console.log("Inmotion: checksum FAIL : packet droped");
						if (euc.tmp.tot.buffer[2]!=19) {
							if (set.bt===2) console.log("Inmotion: not live: packet droped");
							console.log("Inmotion: not live: packet droped");
							euc.busy=1;
							if (euc.tmp.loop) {clearTimeout(euc.tmp.loop); euc.tmp.loop=0;}
							euc.tmp.loop=setTimeout(function(){ euc.tmp.loop=0;euc.busy=0;euc.tmp.live();},300);
							//euc.tmp.live();
						}else{
							console.log("Inmotion packet invalis check: droped");
							euc.tmp.live();
						}
					}
					euc.tmp.last=new Uint8Array(0);
					euc.tmp.tot=new Uint8Array(0);	
					return;
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
				  euc.wCha.writeValue([170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125]).then(function() {
						return euc.wCha.writeValue([85,85]);
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
								euc.wCha.writeValue(euc.cmd("control",5)).then(function() {
									return euc.wCha.writeValue(euc.cmd("end"));
								}).then(function(err)  {
									euc.off("power off");
								}).catch(function(err)  {
									euc.state="OFF";
									euc.off("end fail");	
								});	
								return;
							}	
							euc.tmp.loop=0;
							euc.wCha.writeValue(euc.cmd("setLights",0)).then(function() {
								return euc.wCha.writeValue(euc.cmd("end"));
							}).then(function()  {
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
						return euc.wCha.writeValue(euc.cmd("end"));
					}).then(function()  {	
						return (euc.dash.light)?euc.wCha.writeValue(euc.cmd("setLights",1)):"ok";
					}).then(function()  {
						return (euc.dash.light)?euc.wCha.writeValue(euc.cmd("end")):"ok";
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
							return euc.wCha.writeValue(euc.cmd("end"));
						//}).then(function(err)  {
						//return euc.wCha.writeValue(euc.cmd(cmd,value));
						}).catch(function(err)  {
							euc.off("writefail");	
						});
					},250);
				}
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.mac=euc.mac; 
				euc.dash.bms=1.25;//84 volts
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