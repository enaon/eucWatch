//kingsong euc module 
//m_euc
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//
euc.cmd=function(no){
	switch (no) {
		case "serial":if(!euc.dash.aLck&&!euc.dash.passSend&&!euc.dash.aLight)euc.seq=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
		case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
		case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
		case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
		case "lightsOn":euc.seq=0;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsOff": euc.seq=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsAuto":euc.seq=0;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
		case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
		case "lock":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
        case "unlock":if(!euc.dash.aLight)euc.seq=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];
		case "strobeOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "strobeOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "off":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x14,0x5A,0x5A];
		case "pass":if(!euc.dash.aLck&&!euc.dash.aLight)euc.seq=0;return [0xAA,0x55,0x30+Number(euc.dash.pass.toString()[0]),0x30+Number(euc.dash.pass.toString()[1]),0x30+Number(euc.dash.pass.toString()[2]),0x30+Number(euc.dash.pass.toString()[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
//		case "passChange": return [0xAA,0x55,0x30+Number(euc.dash.pass.toString()[0]),0x30+Number(euc.dash.pass.toString()[1]),0x30+Number(euc.dash.pass.toString()[2]),0x30+Number(euc.dash.pass.toString()[3]),0x30,0x30,0x30,0x30,0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; 
//		case "passClear": return [0xAA,0x55,0x30+Number(euc.dash.pass.toString()[0]),0x30+Number(euc.dash.pass.toString()[1]),0x30+Number(euc.dash.pass.toString()[2]),0x30+Number(euc.dash.pass.toString()[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x42,0x14,0x5A,0x5A]; 
//		case "passSet": return [0xAA,0x55,0x30+Number(euc.dash.pass.toString()[0]),0x30+Number(euc.dash.pass.toString()[1]),0x30+Number(euc.dash.pass.toString()[2]),0x30+Number(euc.dash.pass.toString()[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; 

    }
};



//
euc.conn=function(mac){
//check gatt
if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
}
//start connection  
NRF.connect(mac,{minInterval:7.5, maxInterval:15})
.then(function(g) {
   return g.getPrimaryService(0xffe0);
}).then(function(s) {
  return s.getCharacteristic(0xffe1);
}).then(function(c) {
  c.on('characteristicvaluechanged', function(event) {
	this.var= event.target.value.getUint8(16, true);
	//print (this.var);
    if (euc.busy) return;
    if (this.var==169) {
		euc.alert=0;
		//speed
        euc.dash.spd=(event.target.value.getUint16(4, true)/100).toFixed(1); 
		euc.dash.spdC=(euc.dash.spd<=euc.dash.spd2)?1:(euc.dash.spd<=euc.dash.spd3)?2:3;	
		if (euc.dash.spd>=euc.dash.spd1) euc.alert=(euc.alert+1+((euc.dash.spd-euc.dash.spd1)/euc.dash.spdS))|0;      
        //amp
		this.amp=event.target.value.getUint16(10, true);
        if (this.amp > 32767) this.amp = this.amp - 65536;
        euc.dash.amp=(this.amp/100).toFixed(2);
		euc.dash.ampC=(euc.dash.amp>=euc.dash.ampH+10||euc.dash.amp<=euc.dash.ampL-5)?3:(euc.dash.amp>=euc.dash.ampH||euc.dash.amp<=euc.dash.ampL)?2:(euc.dash.amp<0)?1:0;
		if (euc.dash.amp>=euc.dash.ampH){
			euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
			euc.alert=(euc.alert+1+(euc.dash.amp-euc.dash.ampH))|0;
        }else if (euc.dash.amp<=euc.dash.ampL)  {
			euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
			euc.alert=(euc.alert+1+(-(euc.dash.amp-euc.dash.ampL)))|0;      
		}
		//volt
        this.volt=event.target.value.getUint16(2, true)/100;
        euc.dash.bat=(((this.volt/20)*100-330)*1.1111)|0;
		euc.dash.batC=(euc.dash.bat>=euc.dash.batH)?0:(euc.dash.bat>=euc.dash.batM)?1:(euc.dash.bat>=euc.dash.batL)?2:3;	
		if (euc.dash.bat<=euc.dash.batL) {euc.alert++; euc.dash.spdC=3;}     
        //temp
		euc.dash.tmp=(event.target.value.getUint16(12, true)/100).toFixed(1);
		euc.dash.tmpC=(euc.dash.tmp<=euc.dash.tmpM)?0:(euc.dash.tmp<=euc.dash.tmpH)?2:0;	
		if (euc.dash.tmp>=euc.dash.tmpH) {euc.alert++; euc.dash.spdC=3;}     
		//total mileage
        euc.dash.trpT=(((event.target.value.buffer[6] << 16) + (event.target.value.buffer[7] << 24) + event.target.value.buffer[8] + (event.target.value.buffer[9] << 8))/1000).toFixed(1);
		//mode                                    
        euc.dash.mode=event.target.value.getUint8(14, true);
		//alerts
		if (!euc.alert)  euc.dash.spdC=0;
		else if (!euc.buzz){ 
			euc.buzz=1;
			var a=[200];
			var i;
			for (i = 1; i < euc.alert ; i++) {
				a.push(150,100);
			}
			digitalPulse(D16,1,a);  
			setTimeout(() => {euc.buzz=0; }, 2000);
		}
    }else if  (this.var==185){
		//trip-time-top speed
        euc.dash.trpL=(((event.target.value.buffer[2] << 16) + (event.target.value.buffer[3] << 24) + event.target.value.buffer[4] + (event.target.value.buffer[5] << 8)) / 1000.0).toFixed(1);
		euc.dash.time=((event.target.value.getUint16(6, true)) / 60.0).toFixed(0);
        euc.dash.spdT=((event.target.value.getUint16(8, true)) / 100.0).toFixed(1);
	 }else if  (this.var==95){
        euc.dash.lock=event.target.value.getUint8(2, true);
    }else if (euc.state=="OFF"){
		if (set.def.cli) console.log("EUCstartOff");
		//euc.dash.lock=1;
		digitalPulse(D16,1,120);
        if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
		euc.wri("end");
		return;
	} //else print(event.target.value.buffer); 

	});
	//on disconnect
	global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
	});
return  c;
}).then(function(c) {
	//connected ****************************
	console.log("EUC connected"); 
	digitalPulse(D16,1,[90,40,150,40,90]);
	euc.wri= function(n) {
		if (euc.busy) return;
		euc.busy=1;
		if (n==="hornOn"||n==="hornOff"){
			c.writeValue(euc.cmd((n==="hornOn")?"strobeOn":"strobeOff")).then(function() {
               if (n==="hornOn")euc.dash.strb=1; else euc.dash.strb=0;
				c.writeValue(euc.cmd((n==="hornOn")?"lock":"unlock")).then(function(){
					if (n==="hornOn") euc.dash.lock=1; else {euc.dash.lock=0;euc.busy=0;c.startNotifications();return;}
					if (!BTN1.read()){ 
						c.writeValue(euc.cmd("unlock")).then(function(){
							euc.dash.lock=0;
							c.writeValue(euc.cmd("strobeOff")).then(function(){
								euc.dash.strb=0;euc.busy=0;c.startNotifications();
							}).catch(function(err)  {
								euc.busy=0;c.startNotifications();
								euc.off("err");
							});
						}).catch(function(err)  {
							euc.busy=0;c.startNotifications();
							euc.off("err");
						});
						return;
					}else euc.busy=0;c.startNotifications();
				}).catch(function(err)  {
					euc.busy=0;c.startNotifications();
					euc.off("err");
				});
			}).catch(function(err)  {
				euc.busy=0;c.startNotifications();
				euc.off("err");
			});	
        }else if (n==="start"||n=="end"){
			c.writeValue(euc.cmd((n==="start")?"serial":(euc.dash.aLck)?"lock":(euc.dash.aOff)?"off":"lightOff")).then(function() {
					if (euc.seq==0) {
						if (n==="start") {
							euc.state="READY";euc.busy=0;c.startNotifications();
						}else euc.off("end");
						return;
					}
					c.writeValue(euc.cmd((n==="start")?((euc.dash.passSend)?"pass":"lightsAuto"):(euc.dash.aOff)?"off":"lightOff")).then(function() {
						if (euc.seq==0) {
							if (n==="start") {
								euc.state="READY";euc.busy=0;c.startNotifications();
							}else global["\xFF"].BLE_GATTS.disconnect();
							return;
						}	
						c.writeValue(euc.cmd("lightsAuto")).then(function() {
							euc.busy=0;c.startNotifications();return;
						}).catch(function(err)  {
							euc.busy=0;c.startNotifications();
							euc.off("err");
						});
					}).catch(function(err)  {
						euc.busy=0;c.startNotifications();
						euc.off("err");
					});
			}).catch(function(err)  {
				euc.busy=0;c.startNotifications();
				euc.off("err");
			});
		}else{
			c.writeValue(euc.cmd(n)).then(function() {
				euc.busy=0;c.startNotifications();
			}).catch(function(err)  {
				euc.busy=0;c.startNotifications();
				euc.off("err");
			});
		}
	};
//	setTimeout(function(){c.writeValue(euc.cmd("serial"));euc.state="READY";},200);
//	if (euc.dash.passSend) setTimeout(function(){c.writeValue(euc.cmd("pass"));},500);
//	if (euc.dash.aLck) setTimeout(function(){c.writeValue(euc.cmd("unlock"));},800);
//	setTimeout(function(){euc.busy=0;c.startNotifications();},1500);
	euc.wri("start");
//reconect
}).catch(function(err)  {
	euc.off(err);
});
};
//
euc.off=function(err){
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
		if (set.def.cli) console.log("EUC: OUT");
		global["\xFF"].bleHdl=[];
            delete euc.off;
			delete euc.conn;
            delete euc.wri;
			delete euc.cmd;
			NRF.setTxPower(set.def.rfTX);	
    }
};