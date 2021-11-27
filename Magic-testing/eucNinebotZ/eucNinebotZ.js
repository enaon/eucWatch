//m_euc ninebot one Z10
euc.tmp={count:0,loop:0};
euc.cmd=function(no){
	switch (no) {
//    case "live":return [90,165,1,62,20,01,176,32,219,254]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live" :return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0xb0,0x20,0xdb,0xfe]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live1":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x68,0x02,0x41,0xff]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live2":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x10,0x0e,0x8d,0xff]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
    case "live3":return [0x5a,0xa5,0x01,0x3e,0x14,0x01,0x1a,0x02,0x8f,0xff]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
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
				euc.alert=0;
				//print("eucNBZin :",event.target.value.buffer);
				if (event.target.value.buffer[0]==90 && event.target.value.buffer.length==20) {
					//print("o",event.target.value.buffer);
					//batt
					/*euc.dash.bat=event.target.value.getUint16(15, true);
					batL.unshift(euc.dash.bat);
					if (20<batL.length) batL.pop();
					euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
					if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++; 
					*/
					//speed
					euc.dash.spd=event.target.value.getUint16(17, true)/100;
					euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
					if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
						euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 	
				}else  if (event.target.value.buffer[1] && event.target.value.buffer.length==20){
					//print("l",event.target.value.buffer);
					euc.dash.trpT=event.target.value.getUint32(1, true)/1000;
					euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
					euc.dash.trpL=event.target.value.getUint32(1, true)/1000;
					euc.dash.time=(event.target.value.getUint16(7, true)/60)|0;
					//temp
					euc.dash.tmp=event.target.value.getUint16(9, true)/10;
					euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
					if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++; 	
					//volt
					euc.dash.volt=(event.target.value.getUint16(11, true)/100);
					euc.dash.bat=Math.round(100*(euc.dash.volt*7.13 - euc.dash.batE ) / (euc.dash.batF-euc.dash.batE));
					batL.unshift(euc.dash.bat);
					if (20<batL.length) batL.pop();
					euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
					if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++; 
					//print(euc.dash.volt);
					//amp
					euc.dash.amp=event.target.value.getInt16(13, true)/100;
					ampL.unshift(Math.round(euc.dash.amp));
					if (20<ampL.length) ampL.pop();
					euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
					if (euc.dash.hapA && euc.dash.ampC==2) {
						if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
						else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
					}
					euc.dash.spd=event.target.value.getUint16(15, true)/100;
					if (euc.dash.spdM < euc.dash.spd) euc.dash.spdM = euc.dash.spd;
					euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd2 <= euc.dash.spd )? 2 : 1 ;	
					if ( euc.dash.hapS && euc.dash.spdC == 2 ) euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd2) / euc.dash.ampS) ; 	
					//average
					euc.dash.spdA=(event.target.value.getUint16(17, true))/100;
					//euc.dash.spdM=(event.target.value.getUint16(19, true))/100;
				} else return;
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
						for (let i = 0; i < euc.alert ; i++) a.push(200,150);
						digitalPulse(ew.pin.BUZZ,0,a);  
						setTimeout(() => { euc.buzz = 0; }, 3000);
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
			if (set.bt===2) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			buzzer([90,40,150,40,90]);
			euc.dash.lock=0;
			//write function
			euc.wri=function(cmd){
			//print ("lala",cmd,euc.cmd(cmd));
				if (euc.state==="OFF"||cmd==="end") {
					euc.busy=1;
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
						if (!euc.busy) { 
							euc.loop=setTimeout(function(t,o){
								euc.loop=0;
								euc.wri("live");	
							},50);
						}
					}).catch(function(err)  {
						euc.off("writefail");	
					});
				}
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.mac=euc.mac; euc.dash.batF=4.14;
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
			}
			euc.busy=0;
			setTimeout(() => {euc.wri("live");euc.run=1;}, 500);
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
		if (set.bt===2) console.log("EUC: Restarting");
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
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.tmp=0;
		euc.busy=0;
		euc.serv=0;euc.wCha=0;euc.rCha=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);	
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.bt===2) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
  }
};