//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(no){
	
	switch (no) {
		case "beep":return [98]; 
		case "lightsOn":return [81]; 
		case "lightsOff":return [69]; 
		case "lightsStrobe":return [84]; 
		case "rideSoft":return [111]; 
		case "rideMed":return [105]; 
		case "rideHard":return [117]; 
		case "rideHar":return [115]; 
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
			if  ( event.target.value.buffer[0]===85 ) {
				//print( event.target.value.buffer);
				euc.alert=0;
				//battery
				euc.dash.volt=event.target.value.getInt16(2);
				if (euc.dash.volt > 6680) {
				   euc.dash.bat = 100;
				} else if (euc.dash.volt > 5440) {
				   euc.dash.bat = ((euc.dash.volt - 5380) / 13)|0;
				} else if (euc.dash.volt > 5290) {
				  euc.dash.bat =  ((euc.dash.volt - 5290) / 32.5)|0;
				} else {
				  euc.dash.bat = 0;
				}
				euc.dash.batC = (euc.dash.batH <= euc.dash.bat)? 0 : (euc.dash.batM <= euc.dash.bat)? 1 : (euc.dash.batL <= euc.dash.bat)? 2 : 3;	
				if ( euc.dash.hapB && euc.dash.bat <= euc.dash.batL ) { euc.alert ++; euc.dash.spdC = 3; }   
				//speed
				euc.dash.spd = Math.abs(event.target.value.getInt16(4) * 3.6)/100|0;
				if ( (euc.dash.spdM < euc.dash.spd)&& euc.dash.spd < 100 ) euc.dash.spdM=euc.dash.spd;
				euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd <= euc.dash.spd2 )? 1 : ( euc.dash.spd <= euc.dash.spd3 )? 2 : 3 ;	
				if ( euc.dash.hapS && euc.dash[euc.dash.haSv]  <= euc.dash.spd ) 
					euc.alert = ( 1 + ((euc.dash.spd-euc.dash[euc.dash.haSv]) / euc.dash.spdS | 0 ) );  
				//trip
				euc.dash.trpL=event.target.value.getUint32(6)/1000;
				//amp
				euc.dash.amp=event.target.value.getInt16(10)/100|0;
				euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
				if ( euc.dash.ampH <= euc.dash.amp ){
					euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
					if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
				}else if ( euc.dash.amp <= euc.dash.ampL )  {
					euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
					if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
				}
				//temp
				euc.dash.tmp=Math.round((event.target.value.getUint16(12)/340)+102)/10;
				euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
				if (euc.dash.tmpH+5 <= euc.dash.tmp) {euc.alert++; euc.dash.spdC = 3;}   
			} else if ( event.target.value.buffer[0]===90 ){
				euc.dash.trpT=event.target.value.getUint32(6)/1000;
				euc.dash.mode = (event.target.value.buffer[10] >> 4) & 0x0F;
				euc.dash.spdT = event.target.value.getUint8(15);
				euc.dash.light = event.target.value.getUint8(17);
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
			if ((1<euc.dash.spdC||1<euc.dash.ampC)&&!w.gfx.isOn ){
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
		console.log("EUC Begode connected!!"); 
		digitalPulse(D16,1,[90,40,150,40,90]);
		euc.wri= function(n) {
			print(n);
			if (euc.busy) {print(1); clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
				//end
				if (n=="end") {
          c.writeValue(euc.cmd("lightsOff")).then(function() {
            c.writeValue(euc.cmd("beep")).then(function() {
			      	c.stopNotifications(); 
			      	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	  global["\xFF"].BLE_GATTS.disconnect();         
            });
          }).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
          });  
        }else if (n=="start") {
          c.writeValue(euc.cmd("lightsOn")).then(function() {
            c.writeValue(euc.cmd("beep")).then(function() {
					    clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
            });
          }).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
          });  
      }else if (n=="horn") {
          c.writeValue(euc.cmd("lightsStrobe")).then(function() {
            c.writeValue(euc.cmd("beep"));
   					clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
          }).catch(function(err)  {
			    	if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
			    	global["\xFF"].BLE_GATTS.disconnect();  
          });  
			//rest
			} else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
					//clearTimeout(euc.busy);euc.busy=0;/*c.startNotifications();*/
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});   
			}else{
				c.writeValue(euc.cmd(n)).then(function() {
					clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
		setTimeout(() => {euc.wri("start");euc.state="READY";}, 500);
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
			if (euc.dash.lock==1) digitalPulse(D16,1,250);
			else digitalPulse(D16,1,[250,200,250,200,250]);
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
			}, 500);
		}
		else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (set.def.cli) 
			console.log("EUC OUT:",err);
	  	global["\xFF"].bleHdl=[];
			clearTimeout(euc.busy);euc.busy=0;
			delete euc.off;
			delete euc.conn;
			delete euc.wri;
			delete euc.cmd;
			delete euc.unpk;
			NRF.setTxPower(set.def.rfTX);	
    }
};

