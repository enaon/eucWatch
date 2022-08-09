//m_euc ninebot one Z10
euc.cmd=function(no){
	switch (no) {
//    case "live":return [90,165,1,62,20,01,176,32,219,254]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live" :return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0xb0,0x20,0xdb,0xfe]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live1":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x68,0x02,0x41,0xff]; 
    case "live2":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x10,0x0e,0x8d,0xff]; 
    case "live3":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x1a,0x02,0x8f,0xff]; 
    }
};
//
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	
    if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (set.def.cli) print("ble allready connected"); 
		if (global["\xFF"].BLE_GATTS.connected) 
		global["\xFF"].BLE_GATTS.disconnect();
		this.tgl();
		return;
    }
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect); euc.is.reconnect=0;}
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
				euc.is.alert=0;
				//print("eucNBZin :",event.target.value.buffer);
				if (event.target.value.buffer[0]==90 && event.target.value.buffer.length==20) {
					//speed
					euc.dash.live.spd=event.target.value.getUint16(17, true)/100;
					if (euc.dash.info.trip.topS < euc.dash.live.spd) euc.dash.info.trip.topS = euc.dash.live.spd;
					euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
					if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
						euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 
				}else  if (event.target.value.buffer[1] && event.target.value.buffer.length==20){
					//print("l",event.target.value.buffer);
					euc.dash.info.trip.totl=event.target.value.getUint32(1, true)/1000;
					euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.info.trip.totl;});
					euc.dash.info.trip.last=event.target.value.getUint32(1, true)/1000;
					euc.dash.info.trip.time=(event.target.value.getUint16(7, true)/60)|0;
					//temp
					euc.dash.live.tmp=event.target.value.getUint16(9, true)/10;
					euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
					if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++; 	
					//volt
					euc.dash.live.volt=(event.target.value.getUint16(11, true)/100);
					euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*7.13 - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
					euc.log.batL.unshift(euc.dash.live.bat);
					if (20<euc.log.batL.length) euc.log.batL.pop();
					euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
					if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++; 
					//print(euc.dash.live.volt);
					//amp
					euc.dash.live.amp=event.target.value.getInt16(13, true)/100;
					euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
					if (20<euc.log.ampL.length) euc.log.ampL.pop();
					euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
					if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
						if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
						else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
					}
					euc.dash.live.spd=event.target.value.getUint16(15, true)/100;
					if (euc.dash.info.trip.topS < euc.dash.live.spd) euc.dash.info.trip.topS = euc.dash.live.spd;
					euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
					if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
						euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
					//average
					euc.dash.info.trip.avrS=(event.target.value.getUint16(17, true))/100;
					//euc.dash.info.trip.topS=(event.target.value.getUint16(19, true))/100;
				} else return;
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
						for (let i = 0; i < euc.is.alert ; i++) a.push(200,150);
						digitalPulse(ew.pin.BUZZ,0,a);  
						setTimeout(() => { euc.is.buzz = 0; }, 3000);
				}
			});
			//on disconnect
			global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', euc.off);
			euc.rCha.startNotifications();	
			return  rc;
		}).then(function(c) {
			//connected 
			if (set.bt===2) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			buzzer([90,40,150,40,90]);
			euc.dash.opt.lock.en=0;
			//write function
			euc.wri=function(cmd){
			//print ("lala",cmd,euc.cmd(cmd));
				if (euc.state==="OFF"||cmd==="end") {
					euc.is.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
						euc.loop=setTimeout(()=>{
							euc.loop=0;
							global["\xFF"].BLE_GATTS.disconnect().catch(function(err)  {
								if (set.bt===2) console.log("EUC OUT disconnect failed:", err);
							});
						},300);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;						}
				} else {
					euc.wCha.writeValue(euc.cmd(cmd)).then(function() {
						if (!euc.is.busy) { 
							euc.loop=setTimeout(function(t,o){
								euc.loop=0;
								euc.wri("live");	
							},50);
						}
					}).catch(euc.off);
				}
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=4.14;
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
			}
			euc.is.busy=0;
			setTimeout(() => {euc.wri("live");euc.is.run=1;}, 500);
		//reconnect
		}).catch(euc.off);
};

euc.off=function(err){
	//if (set.bt===2) console.log("EUC:", err);
	//  global.error.push("EUC :"+err);
	if (euc.temp.loop) {clearInterval(euc.temp.loop);euc.temp.loop=0;}
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect); euc.is.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.bt===2) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.bt===2) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.is.run) {
				euc.tgl();
				return;
			}
			euc.is.run=euc.is.run+1;
			if (euc.dash.opt.lock.en==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.is.run=0;
		euc.temp=0;
		euc.is.busy=0;
		euc.serv=0;euc.wCha=0;euc.rCha=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);	
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
  }
};