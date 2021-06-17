//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.wri=function() {if (set.def.cli) print("not connected yet");return false;};
euc.cmd=function(no){
	switch (no) {
		case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
		case "alarms":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x98,0x14,0x5A,0x5A]; 
		case "horn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x88,0x14,0x5A,0x5A]; 
		case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
		case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
		case "lightsOn":euc.seq=0;euc.dash.light=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsOff": euc.seq=0;euc.dash.light=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsAuto":euc.seq=0;euc.dash.light=2;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
		case "lightsCity": if (euc.night) {return euc.cmd("lightsAuto");} else {return euc.cmd("lightsOff");} break;
		case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
		case "lock":euc.dash.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
		case "unlock":euc.dash.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];
		case "strobeOn":euc.dash.strobe=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "strobeOff":euc.dash.strobe=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "off":euc.seq=0;return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x14,0x5A,0x5A];
		case "passSend":return    [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
		case "passChange": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x30+Number(euc.dash.passOld[0]),0x30+Number(euc.dash.passOld[1]),0x30+Number(euc.dash.passOld[2]),0x30+Number(euc.dash.passOld[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "passClear": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x42,0x14,0x5A,0x5A];  //rf 43
		case "passSet": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "calibrate":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x89,0x14,0x5A,0x5A];  
		case "tiltSet":euc.dash.tiltSet=(99<=euc.dash.tiltSet||-99>=euc.dash.tiltSet)?0:euc.dash.tiltSet;let tiltSet=(0<=euc.dash.tiltSet)?euc.dash.tiltSet:255+euc.dash.tiltSet;
			return [0xAA,0x55,0x01,0x00,tiltSet,(tiltSet<=100)?0:255,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x8A,0x14,0x5A,0x5A]; //rf 8A
		case "liftOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A]; //rf 4C
		case "liftOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A];
		case "setSpeedLimits":return [0xAA,0x55,(euc.dash.spd1E)?Number(euc.dash.spd1):0x00,0x00,(euc.dash.spd2E)?Number(euc.dash.spd2):0x00,0x00,Number(euc.dash.spd3),0x00,Number(euc.dash.spdT),0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,0x14,0x5A,0x5A]; //speed in kph, rf A4
		case "rideLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 6E
		case "rideLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A];
		case "musicLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7D,0x14,0x5A,0x5A]; //rf 6E
		case "musicLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 4A
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
			this.var= event.target.value.getUint8(16, true);
			//print (event.target.value.buffer);
            if (euc.busy) return;
            /*
			//forward euc emu
			if (set.bt==4&&euc.dash.emu==1) {
				euc.emuW(event.target.value.buffer);
			}
			*/
      euc.alert=0;
			switch (this.var){				
				case  169:
					//speed
					euc.dash.spd= ( event.target.value.getUint16(4, true) / 100 ).toFixed(0); 
					euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd <= euc.dash.spd2 )? 1 : ( euc.dash.spd <= euc.dash.spd3 )? 2 : 3 ;	
					if ( euc.dash.hapS && euc.dash[euc.dash.haSv]  <= euc.dash.spd ) 
						euc.alert = ( 1 + ((euc.dash.spd-euc.dash[euc.dash.haSv]) / euc.dash.spdS | 0 ) );  
					//City lights 
					if ( euc.dash.aLight === "lightsCity" ) { 
						if ( euc.dash.amp < -1 && euc.dash.light ===1 ) {
							euc.wri("lightsAuto"); 
						}else if (euc.night && euc.dash.amp >= 0) {
							if ( 20 < euc.dash.spd && euc.dash.light !== 1  ) 
								euc.wri("lightsOn") ;
							else if ( euc.dash.spd < 10 && euc.dash.light !== 2  ) 
								euc.wri("lightsAuto") ;
						} else if (euc.dash.amp >= 0) {
							if ( 35 < euc.dash.spd && !euc.dash.strobe  ) 
								euc.wri("strobeOn") ;
							else if  ( euc.dash.spd < 30 && euc.dash.strobe  ) 
								euc.wri("strobeOff") ;
							else if  ( 25 < euc.dash.spd && euc.dash.light !== 1  ) 
								euc.wri("lightsOn") ;
							else if ( euc.dash.spd < 15 && euc.dash.light !== 2  ) 
								euc.wri("lightsAuto") ;
						}
					}
					//amp
					this.amp=event.target.value.getUint16(10, true);
					if ( 32767 < this.amp ) this.amp = this.amp - 65536;
					euc.dash.amp = ( this.amp / 100 );
					euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
					if ( euc.dash.ampH <= euc.dash.amp ){
						//euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
						if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
					}else if ( euc.dash.amp <= euc.dash.ampL )  {
						//euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
						if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
					}
					//log
					ampL.unshift(Math.round(euc.dash.amp));
					if (20<ampL.length) ampL.pop();
					//volt
					euc.dash.volt = event.target.value.getUint16(2, true)/100;
					let model=euc.dash.name.split("-")[0];
					if (model.includes("S18") || model.includes("18L") ||  model.includes("18XL") || model.includes("16X") )
						euc.dash.bat = ((euc.dash.volt / 20) * 100 - 320 ) |0;
					else 
						euc.dash.bat = (((euc.dash.volt / 16) * 100 - 315 ) * 0.955)|0;
					//log
					batL.unshift(euc.dash.bat);
					if (20<batL.length) batL.pop();
					euc.dash.batC = (euc.dash.batH <= euc.dash.bat)? 0 : (euc.dash.batM <= euc.dash.bat)? 1 : (euc.dash.batL <= euc.dash.bat)? 2 : 3;	
					if ( euc.dash.hapB && euc.dash.bat <= euc.dash.batL ) { euc.alert ++; euc.dash.spdC = 3; }     
					//temp
					euc.dash.tmp = (event.target.value.getUint16(12, true) / 100).toFixed(1);
					euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
					if (euc.dash.tmpH <= euc.dash.tmp) {euc.alert++; euc.dash.spdC = 3;}     
					//total mileage
					euc.dash.trpT = (((event.target.value.buffer[6] << 16) + (event.target.value.buffer[7] << 24) + event.target.value.buffer[8] + (event.target.value.buffer[9] << 8)) / 1000).toFixed(1);
					//mode
					euc.dash.mode = event.target.value.getUint8(14, true);
					euc.new=1;
					break;
				case 185://trip-time-max_speed
					euc.dash.trpL=(((event.target.value.buffer[2] << 16) + (event.target.value.buffer[3] << 24) + event.target.value.buffer[4] + (event.target.value.buffer[5] << 8)) / 1000.0).toFixed(1);
					euc.dash.time=((event.target.value.getUint16(6, true)) / 60.0).toFixed(0);
					euc.dash.spdM=((event.target.value.getUint16(8, true)) / 100.0).toFixed(1);
					euc.dash.fan=event.target.value.buffer[12];
					break;
				case 245:
					euc.dash.cpu=event.target.value.buffer[14];
					//euc.dash.out=event.target.value.buffer[15];
					break;
				case 246:
					euc.dash.spdL=( event.target.value.getUint16(2, true) / 100 ).toFixed(0); 
						euc.dash.alrm=(euc.dash.spdL-5 < euc.dash.spdT)?1:0;
					//log alarms
					almL.unshift(euc.dash.alrm);
					if (20<almL.length) almL.pop();
					euc.new=1;
					//haptic
					if (euc.dash.alrm) euc.alert=20;
					//print(euc.dash.spdL,euc.dash.spdT);
					//print("packet: ",event.target.value.buffer);
					break;	
				case 181:
					//print(181);
					/*
					euc.dash.spd1=event.target.value.buffer[4];
					euc.dash.spd2=event.target.value.buffer[6];
					euc.dash.spd3=event.target.value.buffer[8];
					euc.dash.spdT=event.target.value.buffer[10];
					*/
					break;
				case 179://serial
					euc.dash.serial=String.fromCharCode.apply(String,new Uint8Array(event.target.value.buffer,2,14))+String.fromCharCode.apply(String,new Uint8Array(event.target.value.buffer,17,3));
					break;
				case 187://model
					if (!euc.dash.name) {
						euc.dash.model=String.fromCharCode.apply(String,new Uint8Array(event.target.value.buffer,2,11));
						euc.dash.name=String.fromCharCode.apply(String,new Uint8Array(event.target.value.buffer,5,8));
						set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",euc.dash.name);
					}
					break;
				//default :
					

				    //print ("got: ",this.var,event.target.value.buffer);
				    //print (this.var); //else print(event.target.value.buffer); 
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
		console.log("EUC connected"); 
          digitalPulse(D16,1,[90,40,150]);
		euc.wri= function(n) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},100);return;} euc.busy=setTimeout(()=>{euc.busy=0;},1000);
			//horn
			if (n==="hornOn"||n==="hornOff"){
				c.writeValue(euc.cmd((n==="hornOn")?"strobeOn":"strobeOff")).then(function() {
					c.writeValue(euc.cmd((n==="hornOn")?"lock":"unlock")).then(function(){
						if (n==="hornOn") euc.dash.lock=1; else {euc.dash.lock=0;if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;} return;}
						if (!BTN1.read()){ 
							c.writeValue(euc.cmd("unlock")).then(function(){
								euc.dash.lock=0;
								c.writeValue(euc.cmd("strobeOff")).then(function(){
									euc.dash.strb=0;if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
								}).catch(function(err)  {
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
									euc.off("err");
								});
							}).catch(function(err)  {
								if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
								euc.off("err");
							});
							return;
						}else if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					}).catch(function(err)  {
						if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
						euc.off("err");
					});
				}).catch(function(err)  {
                    if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
                    euc.off("err");
				});	
			//toogle
			}else if (n==="start"||n=="end"){
                if (n=="end") c.stopNotifications();
				c.writeValue(euc.cmd((n==="start")?"rideLedOn":((euc.dash.aLck)?"lock":(euc.dash.aOff)?"off":"lightsOff"))).then(function() {
					if (euc.seq==0) {
						c.writeValue(euc.cmd("rideLedOff")).then(function() {
							if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
							global["\xFF"].BLE_GATTS.disconnect();
						}).catch(function(err)  {
							if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
							global["\xFF"].BLE_GATTS.disconnect();
							if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
							euc.off("exit5");
						});
						return;
					}	
					c.writeValue(euc.cmd((n==="start")?((euc.dash.passSend)?"passSend":(euc.dash.aLck)?"unlock":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto"):(euc.dash.aOff)?"off":"lightsOff")).then(function() {
						if (euc.seq==0) {
							if (n==="start") {
								c.writeValue(euc.cmd("model")).then(function() {
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
									euc.state="READY";
                                    c.startNotifications();
									euc.run=1;
								});
							}else {
								c.writeValue(euc.cmd("rideLedOff")).then(function() {
									if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
									global["\xFF"].BLE_GATTS.disconnect();
								}).catch(function(err)  {
									if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
									global["\xFF"].BLE_GATTS.disconnect();
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
									euc.off("err-4");
								});
							}
							return;
						}	
						c.writeValue(euc.cmd((euc.dash.aLck&&euc.dash.passSend)?"unlock":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto")).then(function() {
							if (euc.seq==0) {
								c.writeValue(euc.cmd("model")).then(function() {
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
									euc.state="READY";
                                    c.startNotifications();
									euc.run=1;
								});
								return;
							}
							c.writeValue(euc.cmd((euc.dash.aLight)?euc.dash.aLight:"lightsAuto")).then(function() {
								c.writeValue(euc.cmd("model")).then(function() {
									if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
									euc.state="READY";
                                    c.startNotifications();
									euc.run=1;
								});
								return;
							}).catch(function(err)  {
								if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
								euc.off("err-3");
							});
						}).catch(function(err)  {
							if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
							euc.off("err-2");
						});
					}).catch(function(err)  {
						if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
						euc.off("err-1");
					});
				}).catch(function(err)  {
				  if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
                  euc.off("err-0");
				});
			//forward if cmd unknown
			}else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
                    clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err-fwd");
				});

			//rest
			}else{
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
                    euc.off("err-rest");
				});
			}
		};
		if (!euc.run) { 
			euc.wri("start");
        } else {
            euc.state="READY";
            setTimeout(()=>{ 
                //print(global["\xFF"].bleHdl[54].value.buffer[0]);
                if (global["\xFF"].bleHdl[54].value.buffer[0]==65 ||global["\xFF"].bleHdl[54].value.buffer[0]==188){
                    euc.wri("start");
				} else c.startNotifications();
            },1000);
        }
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
        euc.seq=1;
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
			}, 1000);
		}
	} else {
		if (set.def.cli) console.log("EUC OUT:",err);
			//global["\xFF"].bleHdl=[];
			if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.aOff=euc.aOff;	delete euc.aOff;}
			if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.aLck=euc.aLck;	delete euc.aLck;}
			clearTimeout(euc.busy);euc.busy=0;
			euc.off=function(){if (set.def.cli) console.log("EUC allready killed at:",err);};
			delete euc.conn;
			delete euc.wri;
			delete euc.cmd;
            euc.run=0;
			NRF.setTxPower(set.def.rfTX);	
    }
};