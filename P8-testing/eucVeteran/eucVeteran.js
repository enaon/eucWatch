//Vteran euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(no){
	switch (no) {
		case "beep":return [98]; 
		case "rideSoft":return "SETs"; 
		case "rideMed":return  "SETm"; 
		case "rideStrong":return "SETh";
		case "setLightOn":return "SetLightON";
		case "setLightOff":return "SetLightOFF";
		case "setVolUp":return "SetFctVol+";
		case "setVolDn":return "SetFctVol-";
		case "clearMeter":return "CLEARMETER";
		case "switchPackets": euc.temp=1; return "CHANGESTRORPACK";
		case "changePage": euc.temp++; return "CHANGESHOWPAGE";
		case "returnMain": euc.temp=0;return "CHANGESTRORPACK";
		default: return [];
    }
};
euc.isProxy=0;
//start
euc.wri=function(i) {if (set.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	//check
	if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (set.def.cli) print("ble allready connected"); 
		if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
	}
	//check if proxy
	if (mac.includes("private-resolvable")&&!euc.isProxy ){
		let name=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Name"];
		NRF.requestDevice({ timeout:2000, filters: [{ namePrefix: name }] }).then(function(device) { euc.isProxy=1;euc.conn(device.id);}  ).catch(function(err) {print ("error "+err);euc.conn(euc.mac); });
		return;
	}
	euc.isProxy=0;
	euc.pac=[]; 
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		this.need=0;
		//this.event=new Uint8Array(event.target.value.buffer);
		let ev=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			if (!euc.run) return;
			if (set.bt==5) 	euc.proxy.w(event.target.value.buffer);
			ev.set(event.target.value.buffer);
			euc.alert=0;
			/*if (euc.temp) {
				euc.tot=E.toUint8Array(euc.pac,event.target.value.buffer);
				if ( (event.target.value.buffer[event.target.value.buffer.length - 2]== 85 && event.target.value.buffer[event.target.value.buffer.length - 1]==53) ||(event.target.value.buffer[event.target.value.buffer.length - 2]== 80 && event.target.value.buffer[event.target.value.buffer.length - 1]==55)||(event.target.value.buffer[event.target.value.buffer.length - 2]== 70 && event.target.value.buffer[event.target.value.buffer.length - 1]==99) ) {
					euc.pac=[];
					print(E.toString(euc.tot));
				} else euc.pac=euc.tot;
				return;
			}
			*/
			//print(this.ev);
			if  ( ev[0]===220 && ev[1]===90 && ev[2]===92 ) {
				//volt-bat
				euc.dash.live.volt=(ev[4]  << 8 | ev[5] )/100;
				euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*4.166 - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
				batL.unshift(euc.dash.live.bat);
				if (20<batL.length) batL.pop();
				euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
				if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.alert ++;   
				//spd
				euc.dash.live.spd=(ev[6] << 8 | ev[7]) / 10;
				if (euc.dash.info.trip.topS < euc.dash.live.spd) euc.dash.info.trip.topS = euc.dash.live.spd;
				euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
				if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
					euc.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
				//trip
				euc.dash.info.trip.last=(ev[10] << 24 | ev[11] << 16 | ev[8] << 8  | ev[9])/1000;
				euc.dash.info.trip.totl=(ev[14] << 24 | ev[15] << 16 | ev[12] << 8  | ev[13])/1000;
				euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.info.trip.totl;});
				//amp
				euc.dash.live.amp=(32766<(ev[16]<<8|ev[17]))?((ev[16]<<8|ev[17])-65535)/100:(ev[16]<<8|ev[17])/100 ;
				if (euc.dash.opt.unit.ampR) euc.dash.live.amp=-euc.dash.live.amp;				
				ampL.unshift(euc.dash.live.amp);
				if (20<ampL.length) ampL.pop();
				euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
				if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
					if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
					else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
				}
				//tmp
				euc.dash.live.tmp=(ev[18] << 8 | ev[19])/100;
				euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
				if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.alert++;
			} else {
				euc.dash.info.trip.avrS=((ev[4] << 8 | ev[5]) / 10)|0;
				if (!euc.dash.info.get.modl) euc.dash.info.get.modl=(ev[8] << 8 | ev[9]);
				euc.dash.opt.ride.mode=(ev[10] << 8 | ev[11]);
				euc.dash.live.pwm=event.target.value.getInt16(12)/100;
			}
			//alerts
			if (euc.alert && !euc.buzz) {  
				if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(set.dash[set.def.dash.face],0);
				//else face.off(6000);
				euc.buzz=1;
				if (20<=euc.alert) euc.alert=20;
				var a=[];
				while (5 <= euc.alert) {
					a.push(150,500);
					euc.alert=euc.alert-5;
				}
				for (let i = 0; i < euc.alert ; i++) a.push(150,150);
				digitalPulse(ew.pin.BUZZ,0,a);  
				setTimeout(() => {euc.buzz=0; }, 3000);
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Veteran connected!!"); 
		euc.wri= function(n,v) {
            //console.log("got :", n);
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},100);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},200);
            //end
			if (n=="hornOn") {
				euc.horn=1;
				let md={"1":"SETs","2":"SETm","3":"SETh"};
				c.writeValue(md[euc.dash.opt.ride.mode]).then(function() { 
					if (euc.run) {euc.run=0;euc.horn=1;c.stopNotifications();}
					setTimeout(() => {
						c.writeValue((euc.dash.opt.lght.HL)?"SetLightOFF":"SetLightON").then(function() {
							setTimeout(() => { 
								c.writeValue((euc.dash.opt.lght.HL)?"SetLightON":"SetLightOFF").then(function() {	
									setTimeout(() => {
										if (BTN1.read()) {
											if (euc.busy) { clearTimeout(euc.busy);euc.busy=0;} 
											euc.wri("hornOn");
										}else {
											euc.horn=0;
											euc.run=1;
											c.startNotifications();
										}
									},30); 	
								});
							},30);
						});	
					},60);
				});
			}else if (n=="hornOff") {
				euc.horn=0;
			}else if (n=="start") {
				c.writeValue(euc.cmd((euc.dash.opt.lght.HL)?"setLightOn":"setLightOff")).then(function() {
					buzzer([100,100,150,]);
					return c.startNotifications(); 
				}).then(function()  {
					let md={"1":"SETs","2":"SETm","3":"SETh"};
					if (euc.dash.opt.lock.en) c.writeValue(md[euc.dash.opt.ride.mode]);
					//if (euc.dash.opt.lock.en) c.writeValue(euc.cmd("beep"));
					euc.run=1;
					return true;
				});
			}else if (euc.state=="OFF"||n=="end") {
				//if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd("setLightOff")).then(function() {
						let md={"1":"SETs","2":"SETm","3":"SETh"};
						return ((euc.dash.opt.lock.en)?c.writeValue(md[euc.dash.opt.ride.mode]):"ok");
					}).then(function()  {
						global["\xFF"].BLE_GATTS.disconnect();if (set.def.cli) console.log("EUC Veteran out");
					}).catch(function(err)  {
						global["\xFF"].BLE_GATTS.disconnect();if (set.def.cli) console.log("EUC Veteran out catch");
					});
				}else {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			}else if (n==="proxy") {
				c.writeValue(v).then(function() {
                    if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					return;
				}).catch(function(err)  {
                    if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				});
            }else if (euc.cmd(n)) {
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err");
				});
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=420;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		euc.state="READY";euc.wri("start");
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
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (euc.dash.opt.lock.en==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
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
			}, 1500);
		}
		else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (set.def.cli) console.log("EUC OUT:",err);
		if (euc.horn) {clearInterval(euc.horn);euc.horn=0;}
		if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.temp=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);
		if (this.proxy) this.proxy.e();
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
    }
};

//euc.wri("changePage")
//euc.wri("switchPackets")
//euc.wri("returnMain")