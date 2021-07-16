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
				if (event.target.value.buffer[0]==90) {
					//print(event.target.value.buffer);
					//batt
					euc.dash.bat=event.target.value.getUint16(15, true);
					if ((euc.dash.bat) >= euc.dash.batH) euc.dash.batC=0;
					else  if ((euc.dash.bat) >= euc.dash.batM) euc.dash.batC=1;
					else  if ((euc.dash.bat) >= euc.dash.batL) euc.dash.batC=2;
					else  {
						euc.dash.batC=3;
						if (euc.dash.hapB) euc.alert++;
					}
					//speed
					//euc.dash.spd=event.target.value.getUint16(17, true)/100;
					//euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd <= euc.dash.spd1+5 )? 1 : ( euc.dash.spd <= euc.dash.spd1+10 )? 2 : 3 ;	
					//if ( euc.dash.hapS && euc.dash.spd >= euc.dash.spd1 ) 
					//	euc.alert = 1 + ((euc.dash.spd-euc.dash.spd1) / euc.dash.ampS|0) ;
				}else  if (event.target.value.buffer[1]){
					//print(event.target.value.buffer);
					euc.dash.trpT=(event.target.value.getUint32(1, true)/1000).toFixed(0);
					if (!euc.dash.trpS) euc.dash.trpS=(event.target.value.getUint32(1, true)/1000).toFixed(3);
					euc.dash.trpL=(event.target.value.getUint32(1, true)/1000).toFixed(3)-euc.dash.trpS;
					euc.dash.time=(event.target.value.getUint16(7, true)/60)|0;
					//temp
					euc.dash.tmp=(event.target.value.getUint16(9, true)/10).toFixed(1);
					euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
					if (euc.dash.tmpH <= euc.dash.tmp) {euc.alert++; euc.dash.spdC = 3;}   
					//volt
					euc.dash.volt=(event.target.value.getUint16(11, true)/100).toFixed(2);
					//amp
					euc.dash.amp=(event.target.value.getInt16(13, true)/100)|0;
					ampL.unshift(euc.dash.amp);
					if (14<ampL.length) ampL.pop();
					euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
					if ( euc.dash.ampH <= euc.dash.amp ){
						euc.dash.spdC = ( euc.dash.ampC === 3 )? 3 : ( euc.dash.spdC === 3 )? 3 : 2;
						if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
					}else if ( euc.dash.amp <= euc.dash.ampL )  {
						euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
						if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
					}
					//speed
					euc.dash.spd=event.target.value.getUint16(15, true)/100;
					euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd <= euc.dash.spd1+5 )? 1 : ( euc.dash.spd <= euc.dash.spd1+10 )? 2 : 3 ;	
					if ( euc.dash.hapS && euc.dash.spd >= euc.dash.spd1 ) 
						euc.alert = 1 + ((euc.dash.spd-euc.dash.spd1) / euc.dash.ampS|0) ;
					//average
					euc.dash.spdA=((event.target.value.getUint16(17, true))/100).toFixed(1);
					//euc.dash.spdM=((event.target.value.getUint16(19, true))/100).toFixed(1);
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
			euc.wri=function(cmd){
			//print ("lala",cmd,euc.cmd(cmd));
				if (euc.state==="OFF") {
					euc.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					euc.loop=setTimeout(()=>{euc.loop=0;global["\xFF"].BLE_GATTS.disconnect().catch(function(err)  {if (set.def.cli) console.log("EUC OUT disconnect failed:", err);});},300);
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
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) set.write("dash","slot"+set.read("dash","slot")+"Mac",this.mac);
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
			delete euc.dash.trpS;
			delete euc.serv;
			delete euc.wCha;
			delete euc.rCha;
			NRF.setTxPower(set.def.rfTX);	
    }
};