//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
//commands
euc.wri=function(i) {if (set.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.cmd=function(no){
	switch (no) {
		case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
		case "alarms":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x98,0x14,0x5A,0x5A]; 
		case "lightsOn":euc.seq=0;euc.dash.opt.lght.HL=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsOff": euc.seq=0;euc.dash.opt.lght.HL=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsAuto":euc.seq=0;euc.dash.opt.lght.HL=2;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
		case "lightsCity": if (euc.is.night) {return euc.cmd("lightsAuto");} else {return euc.cmd("lightsOff");} break;
		case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
		case "lock":euc.dash.opt.lock.en=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
		case "unlock":euc.dash.opt.lock.en=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];
		case "passSend":return    [0xAA,0x55,0x30+Number(euc.dash.opt.lock.pass[0]),0x30+Number(euc.dash.opt.lock.pass[1]),0x30+Number(euc.dash.opt.lock.pass[2]),0x30+Number(euc.dash.opt.lock.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
		case "liftOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A]; //rf 4C
		case "liftOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A];
		case "rideLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 6E
		case "rideLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A];

    }
};
//start
euc.conn=function(mac){
	if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
		if (set.def.cli) console.log("ble allready connected"); 
		global["\xFF"].BLE_GATTS.disconnect();return;
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
//		inpk=new Uint8Array(event.target.value.buffer);
		var inpk=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			inpk.set(event.target.value.buffer);
            if (euc.is.busy) return;
			euc.is.alert=0;
			switch (inpk[16]){				
				case  169:
					//speed
					euc.dash.live.spd=(inpk[5] << 8 | inpk[4])/100; 
					euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
					if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
	 					euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
					//amp
					this.amp=inpk[11] << 8 | inpk[10];
					if ( 32767 < this.amp ) this.amp = this.amp - 65536;
					euc.dash.live.amp = ( this.amp / 100 );
					euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= 0 || 15 <= euc.dash.live.amp)? 1 : 0;
					//euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
					//if (20<euc.log.ampL.length) euc.log.ampL.pop();
					euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
					if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
						if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
						else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
					}
					//volt
					euc.dash.live.volt=(inpk[3] << 8 | inpk[2])/100;
					euc.dash.live.bat=Math.round(((euc.dash.live.volt*euc.dash.opt.bat.hi) - euc.dash.opt.bat.low ) * (100/(420-euc.dash.opt.bat.low)));
					//euc.log.batL.unshift(euc.dash.live.bat);
					//if (20<euc.log.batL.length) euc.log.batL.pop();
					euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
					if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++; 
					//temp
					euc.dash.live.tmp = (inpk[13] << 8 | inpk[12])/100;
					euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
					if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++; 
					//total mileage
					euc.dash.trip.totl = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
					euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
					//mode
					euc.dash.opt.ride.mode = inpk[14];
					//City lights 
						break;
				case 185://trip-time-max_speed
					euc.dash.trip.last=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
					euc.dash.trip.time=Math.round((inpk[7] << 8 | inpk[6])/60);
					euc.dash.trip.topS=Math.round((inpk[9] << 8 | inpk[8])/100) ;
					euc.dash.opt.snsr.fan=inpk[12];
					break;
				case 246:
					euc.dash.alrt.spd.max=(inpk[3] << 8 | inpk[2])/100;
					euc.dash.alrt.pwr=(euc.dash.alrt.spd.max< euc.dash.alrt.spd.tilt.val&& euc.dash.alrt.spd.max-5 < euc.dash.live.spd)?1:0;
					//euc.log.almL.unshift(euc.dash.alrt.pwr);
					//if (20<euc.log.almL.length) euc.log.almL.pop();
					//haptic
					if (euc.dash.alrt.pwr) euc.is.alert=20;
					break;	
				case 179://serial
					euc.dash.info.get.serl=String.fromCharCode.apply(String,inpk.slice(2,14))+String.fromCharCode.apply(String,inpk.slice(17,3));
					break;
				case 187://model
					//console.log("model");
					if (!euc.dash.info.get.name) {
						euc.dash.info.get.modl=String.fromCharCode.apply(String,inpk.slice(2,11));
						euc.dash.info.get.name=String.fromCharCode.apply(String,inpk.slice(5,8));
						if (euc.dash.info.get.modl.includes("-")) {
							let model=euc.dash.info.get.name.split("-")[0];
							if (model.includes("S18") || model.includes("18L") ||  model.includes("18XL") || model.includes("16X") )
								euc.dash.opt.bat.hi = 5;
							else 
								euc.dash.opt.bat.hi = 6.25;
						} else euc.dash.opt.bat.hi=5;
						set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",euc.dash.info.get.name);
					}
					break;
			}
			//haptic
			if (!euc.is.buzz && euc.is.alert) { 
				if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(set.dash[set.def.dash.face],0);
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
				digitalPulse(D16,0,a); 
				setTimeout(() => { euc.is.buzz = 0; }, 3000);
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', euc.off);
		return  c;
	//write
	}).then(function(c) {
		if (set.def.cli) console.log("EUC Kingsong connected"); 
		euc.wri= function(n) {
			if (euc.is.busy) { clearTimeout(euc.is.busy);euc.is.busy=setTimeout(()=>{euc.is.busy=0;},100);return;} 
			euc.is.busy=setTimeout(()=>{euc.is.busy=0;},1000);
			//if (n=="end") c.stopNotifications();
			if (n=="hornOn"){
				euc.horn=1;
				if (euc.temp) {clearTimeout(euc.temp);euc.temp=0;}
				c.writeValue(euc.cmd("lock")).then(function() {
					euc.dash.opt.lock.en=1;
					return c.writeValue(euc.cmd("lightsOn"));
				}).then(function() {	
					euc.dash.opt.lght.strb=1;
					return c.writeValue(euc.cmd("strobeOn"));
				}).then(function() {
					if (euc.temp) {clearInterval(euc.temp);euc.temp=0;}
					euc.temp=setInterval(() => {
						if (!BTN1.read()){
							if (euc.temp) {clearInterval(euc.temp);euc.temp=0;}
							c.writeValue(euc.cmd("unlock")).then(function() {		
								euc.dash.opt.lock.en=0;
								euc.dash.opt.lght.strb=0;
								return c.writeValue(euc.cmd("strobeOff"));
							}).then(function() {
								euc.horn=0;
								if (euc.is.busy){clearTimeout(euc.is.busy);euc.is.busy=0;}
								return c.writeValue(euc.cmd(euc.dash.aLight));
							});
						}
					}, 200); 
				});
			} else if (n=="hornOff") {
				euc.horn=0;
				if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
				return;
			} else if (n==="start") {
				euc.state="READY";
				buzzer([90,40,150]);
				c.writeValue(euc.cmd((euc.dash.auto.onC.pass)?"passSend":(euc.dash.aLck)?"unlock":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto")).then(function() {	
					return c.writeValue(euc.cmd((euc.dash.aLck&&euc.dash.auto.onC.pass)?"unlock":(euc.seq==0)?(euc.dash.opt.lght.led)?"rideLedOn":"rideLedOff":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return (euc.seq==0)?(euc.dash.aLck||euc.dash.auto.onC.pass)?c.writeValue(euc.cmd((euc.dash.opt.lght.led)?"rideLedOn":"rideLedOff")):"ok":c.writeValue(euc.cmd((euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return ((euc.dash.aLck&&euc.dash.auto.onC.pass)?c.writeValue(euc.cmd((euc.dash.opt.lght.led)?"rideLedOn":"rideLedOff")):"ok");
				}).then(function() {
					return c.startNotifications();
				}).then(function() {
					if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
					return c.writeValue(euc.cmd("alarms"));	
				}).then(function() {
					euc.is.run=1;
					return c.writeValue(euc.cmd("model"));
				}).then(function() {
					if (euc.dash.auto.onC.lift) euc.dash.opt.snsr.lift=0;
					return ((euc.dash.auto.onC.lift)?c.writeValue(euc.cmd("liftOff")):"ok");
				}).catch(euc.off);
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((euc.dash.aOff)?"off":"rideLedOff")).then(function() {
						return c.writeValue(euc.cmd((euc.dash.aLck)?"lock":"lightsOff"));
					}).then(function() {
						return ((euc.seq==0)?"ok":c.writeValue(euc.cmd("lightsOff")));
					}).then(function() {
						return ((euc.dash.auto.onC.lift)?c.writeValue(euc.cmd("liftOn")):"ok");
					}).then(function() {
						euc.is.run=0;
						return global["\xFF"].BLE_GATTS.disconnect();	
					}).catch(euc.off);
				}else {
					if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			}else { 
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.is.busy) {clearTimeout(euc.is.busy);euc.is.busy=0;}
				}).catch(euc.off);
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.info.get.mac=euc.mac; 
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		if (!euc.is.run) { 
			euc.wri("start");
		} else {
			setTimeout(()=>{ 
				//console.log(global["\xFF"].bleHdl[54].value.buffer[0]);
				if (global["\xFF"].bleHdl[54]&& (global["\xFF"].bleHdl[54].value.buffer[0]==65 ||global["\xFF"].bleHdl[54].value.buffer[0]==188)){
					euc.wri("start");
				} else {
					euc.state="READY";
					c.startNotifications();
				}
			},500);
		}
	//reconect
	}).catch(euc.off);
};
//catch
euc.off=function(err){
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect); euc.is.reconnect=0;}
	if (euc.state!="OFF") {
		euc.seq=1;
		//if (set.def.cli) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			//if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.is.run) {
				euc.tgl();
				return;
			}
			euc.is.run=euc.is.run+1;
			if (euc.dash.opt.lock.en==1) buzzer(250);
			else  buzzer([250,200,250,200,250])
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1000);
		} else {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 2000);
		}
	} else {
			if (euc.is.busy) { clearTimeout(euc.is.busy);euc.is.busy=setTimeout(()=>{euc.is.busy=0;},100);return;} 
			if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.aOff=euc.aOff;	delete euc.aOff;}
			if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.aLck=euc.aLck;	delete euc.aLck;}
			euc.off=function(err){if (set.def.cli) console.log("EUC stoped at:",err);};
			euc.wri=function(err){if (set.def.cli) console.log("EUC write, not connected");};
			euc.conn=function(err){if (set.def.cli) console.log("EUC conn, not connected");};
			euc.cmd=function(err){if (set.def.cli) console.log("EUC cmd, not connected");};
			euc.is.run=0;
			if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
				if (set.def.cli) console.log("ble still connected"); 
				global["\xFF"].BLE_GATTS.disconnect();
			}
			global["\xFF"].bleHdl=[];
			NRF.setTxPower(set.def.rfTX);
    }
};