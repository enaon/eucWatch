//Ninebot one Z10 euc module
E.setFlags({ pretokenise: 1 });
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
euc.wri=function(i) {if (ew.is.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	
    if ( euc.gatt!="undefined") {
		if (ew.def.cli) print("ble allready connected"); 
		if (euc.gatt.connected) 
		euc.gatt.disconnect();
		this.tgl();
		return;
    }
	if (euc.tout.reconnect) {clearTimeout(euc.tout.reconnect); euc.tout.reconnect=0;}
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
		.then(function(g) {
			euc.gatt=g;
			return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
		}).then(function(s) {
			euc.temp.serv=s;
			return euc.temp.serv.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"); // write
		}).then(function(wc) {
			euc.temp.wCha=wc;//write
			return euc.temp.serv.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");//read
		}).then(function(rc) {
			euc.temp.rCha=rc;
			//read
			euc.temp.rCha.on('characteristicvaluechanged', function(event) {
				euc.is.alert=0;
				//print("eucNBZin :",event.target.value.buffer);
				if (event.target.value.buffer[0]==90 && event.target.value.buffer.length==20) {
					//speed
					euc.dash.live.spd=event.target.value.getUint16(17, true)/100;
					if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
					euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
					if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
						euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 
				}else  if (event.target.value.buffer[1] && event.target.value.buffer.length==20){
					//print("l",event.target.value.buffer);
					euc.dash.trip.totl=event.target.value.getUint32(1, true)/1000;
					euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
					euc.dash.trip.last=event.target.value.getUint32(1, true)/1000;
					euc.dash.trip.time=(event.target.value.getUint16(7, true)/60)|0;
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
					if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
					euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
					if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
						euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
					//average
					euc.dash.trip.avrS=(event.target.value.getUint16(17, true))/100;
					//euc.dash.trip.topS=(event.target.value.getUint16(19, true))/100;
				} else return;
				//haptic
				if (!euc.is.buzz && euc.is.alert) {  
						if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face],0);
						//else face.off(6000);
						euc.is.buzz=1;
						if (20 <= euc.is.alert) euc.is.alert = 20;
						var a = [100];
						while (5 <= euc.is.alert) {
							a.push(200,500);
							euc.is.alert = euc.is.alert - 5;
						}
						for (let i = 0; i < euc.is.alert ; i++) a.push(200,150);
						buzzer.euc(a);  
						setTimeout(() => { euc.is.buzz = 0; }, 3000);
				}
			});
			//on disconnect
			euc.gatt.device.on('gattserverdisconnected', euc.off);
			euc.temp.rCha.startNotifications();	
			return  rc;
		}).then(function(c) {
			//connected 
			if (ew.is.bt===2) console.log("EUC: Connected"); 
			euc.state="READY"; //connected
			buzzer.nav([90,40,150,40,90]);
			euc.dash.opt.lock.en=0;
			//write function
			euc.wri=function(cmd){
			//print ("lala",cmd,euc.cmd(cmd));
				if (euc.state==="OFF"||cmd==="end") {
					euc.is.busy=1;
					if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
					if (euc.gatt && euc.gatt.connected) {
						euc.tout.loop=setTimeout(()=>{
							euc.tout.loop=0;
							euc.gatt.disconnect().catch(function(err)  {
								if (ew.is.bt===2) console.log("EUC OUT disconnect failed:", err);
							});
						},300);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;						}
				} else {
					euc.temp.wCha.writeValue(euc.cmd(cmd)).then(function() {
						if (!euc.is.busy) { 
							euc.tout.loop=setTimeout(function(t,o){
								euc.tout.loop=0;
								euc.wri("live");	
							},50);
						}
					}).catch(euc.off);
				}
			};
			if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Mac")) {
				euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=4.14;
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Mac",euc.mac);
			}
			euc.is.busy=0;
			setTimeout(() => {euc.wri("live");euc.is.run=1;}, 500);
		//reconnect
		}).catch(euc.off);
};