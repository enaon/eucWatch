//m_euc ninebot one c/e/p
euc.tmp={count:0,loop:0};
euc.cmd=function(no){
	switch (no) {
    case 0:case 3:case 6:case 9:case 12:case 15:case 18:
	  return [85,170,3,9,1,80,2,160,255]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
	case 1:case 4:case 7:case 10:case 13:case 16:case 19:
	  return [85,170,3,9,1,38,2,202,255]; //Current Speed in Km/h*1000d
	case 2:return [85,170,3,9,1,62,2,178,255]; //Temperature numeric positive C * 10
	case 5:return [85,170,3,9,1,71,2,169,255]; //Voltage numeric positive V * 100
	case 8:return [85,170,3,9,1,185,2,55,255]; //Single Mileage numeric positive in meters
	case 11:return [85,170,3,9,1,58,2,182,255]; //Single Runtime numeric positive seconds
	case 14:return [85,170,3,9,1,37,2,203,255]; //remaining mileage in Km*100
	case 17:return [85,170,3,9,1,182,2,58,255]; //Average speed numeric positive m/h
	case 20:return [85,170,3,9,1,112,2,128,255]; //Lock status
	case 21:return [85,170,3,9,3,112,1,127,255]; //21- lock
	case 22:return [85,170,3,9,3,112,0,128,255]; //22- unlock
	case 23:return [85,170,3,9,1,210,2,30,255]; //23 get Riding Mode
	case 24:return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
	case 25:return [85,170,4,9,2,210,1,0,29,255]; //25 set Riding Mode 1
	case 26:return [85,170,3,9,2,210,2,29,255]; //26 set Riding Mode 2
	case 27:return [85,170,3,9,2,210,3,28,255]; //27 set Riding Mode 3
	case 28:return [85,170,3,9,2,210,4,27,255]; //28 set Riding Mode 4
	case 29:return [85,170,3,9,2,210,5,26,255]; //29 set Riding Mode 5
	case 30:return [85,170,3,9,2,210,6,25,255]; //30 set Riding Mode 6
	case 31:return [85,170,3,9,2,210,7,24,255]; //31 set Riding Mode 7  
	case 32:return [85,170,3,9,2,210,8,23,255]; //32 set Riding Mode 8
	case 33:return [85,170,3,9,2,210,9,22,255];  //33 set Riding Mode 9
	}
};
//
euc.conn=function(mac){
if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
	return;
}	
NRF.connect(mac,{minInterval:7.5, maxInterval:7.5})
.then(function(g) {
	return g.getPrimaryService(0xffe0);
}).then(function(s) {
	return s.getCharacteristic(0xffe1);
}).then(function(c) {
	//euc.tmp.characteristic=c;
	c.on('characteristicvaluechanged', function(event) {
		//  this.var = event.target.value.getUint8(5, true);
		this.var= event.target.value.getUint8(5, true);
		this.in16=event.target.value.getUint16(6, true);
      print(this.var);
		//this.in=event.target.value.buffer(5);
		/* // if off button is pressed on euc
		if (event.target.value.buffer[5]==0) {
			euc.state="WAIT";
			digitalPulse(D16,1,200);
			//return;
			//alarm
		}else if (event.target.value.buffer(5)==178) {
			euc.tmp[this.var] = event.target.value.getUint8(6, true);
			if (Number(euc_val).toString(2)[1]==1 &&  euc.alertarm==0) {
				euc.alertarm=1; 
				//if (set.def.cli) console.log("euc.alertarm :",euc_val);
				digitalPulse(D16,1,[250,50,250,50,250]);
				if (face.pageCurr==-1) {
					g.clear();	
					g.setFontVector(30);
					g.drawString("!",9, 30);
					g.flip();g.on();
					face.offid=setTimeout(() => {g.off();face.offid=-1}, 2000);
				}
				setTimeout(() => { euc.alertarm=0; }, 100);
			}

		//}else if (this.var==210) {
			//euc.tmp[this.var] = event.target.value.getUint8(6, true);
			//euc.rdmd=euc.tmp[this.var];
			//rest
			*/  
			//}else  {   
			//    euc.tmp[this.var]=event.target.value.getUint16(6, true);
			//alerts
		euc.alert=0;
		switch (this.var) {
		case 38://speed
			euc.dash.spd=(this.in16/1000).toFixed(1);
			if (euc.dash.spd>=euc.dash.spd1) {
				if (euc.dash.spd>=euc.dash.spd1+5) euc.dash.spdC=3;	
				else if (euc.dash.spd>=euc.dash.spd1+2) euc.dash.spdC=2;
				else euc.dash.spdC=1;
				euc.alert=(1+(euc.dash.spd|0)-euc.dash.spd1);
			} else euc.dash.spdC=0;
			break;
		case 80://amp
			if (this.in16>32768) euc.dash.amp=((this.in16-65536)/100).toFixed(1); 
			else euc.dash.amp=(this.in16/100).toFixed(1);
			if (euc.dash.amp>=euc.dash.ampH) {
				if  (euc.dash.amp>=euc.dash.ampH+5 ) euc.dash.ampC=3;
				else euc.dash.ampC=2;
				euc.alert=(euc.alert+1+(euc.dash.amp-euc.dash.ampH))|0;
			}else if (euc.dash.amp>=10) { euc.dash.ampC=1;
			}else if ( euc.dash.amp<=euc.dash.ampL) {
				if  (euc.dash.amp<=euc.dash.ampL-5 ) euc.dash.ampC=3;
				else  euc.dash.ampC=2;
				euc.alert=(euc.alert+1+(-(euc.dash.amp-euc.dash.ampL)))|0;      
				euc.alert_a=true;
			}else if (euc.dash.amp<0) euc.dash.ampC=1; 
			else euc.dash.ampC=0;
			break;
		case 185://trip
			// if (euc.dash.trpN > (euc.tmp[this.var]/100).toFixed(1)) {
			//   euc.dash.trpL=Number(euc.dash.trpL)+Number(euc.dash.trpN);
			//   if (set.def.cli) console.log("EUC_trip new :",euc.dash.trpL);
			// } 
			euc.dash.trpL=(this.in16/100).toFixed(1);
			euc.dash.trpT=(this.in16/100).toFixed(1);
			//euc.dash.trpT=Number(euc.dash.trpL)+Number(euc.dash.trpN);
			//tt=euc.tmp[this.var];
			break;
		case 71://battery fixed/voltage
			euc.dash.volt=(this.in16/100).toFixed(2);
			euc.dash.bat=(((this.in16/100)-51.5)*10|0); 
			if ((euc.dash.bat) >= euc.dash.batH) euc.dash.batC=0;
			else  if ((euc.dash.bat) >= euc.dash.batM) euc.dash.batC=1;
			else  if ((euc.dash.bat) >= euc.dash.batL) euc.dash.batC=2;
			else  {
				euc.dash.batC=3;
				euc.alert++;
			}
			break;
		case 37: //remaining
			euc.dash.trpR=(this.in16/100).toFixed(1);
			break;
		case 62: //temp
			euc.dash.tmp=(this.in16/10).toFixed(1);
			if (euc.dash.tmp>=euc.dash.tmpH ) {
				if (euc.dash.tmp>=65) euc.dash.tmpC=3;
				else euc.dash.tmpC=2;
				euc.alert++;
			} else if (euc.dash.tmp>=50 ) euc.dash.tmpC=1; 
			else euc.dash.tmpC=0;	  
			break;
		case 182: //average
			euc.dash.spdA=(this.in16/1000).toFixed(1);
			break;
		case 58: //runtime
			euc.dash.time=(this.in16/60).toFixed(0);
			break;
		case 210: //riding Mode
			if (this.in16 >=10)  digitalPulse(D16,1,[100,80,100]);  
			else euc.dash.mode=this.in16;
			break;
		case 112: //riding Mode
			if ( this.in16!=euc.lock) euc.lock=this.in16;
			break;
		}
    	//buzz
		if (euc.alert!=0 && !euc.buzz) {  
			euc.buzz=1;
			var a=[200];
			var i;
			for (i = 1; i < euc.alert ; i++) {
				a.push(150,100);
			}
			digitalPulse(D16,1,a);  
			setTimeout(() => {euc.buzz=0; }, 2000);
		
		}
	});
//on disconnect
	global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		if (set.def.cli) console.log("EUC Disconnected :",reason);
		if (euc.tmp.loop) {clearInterval(euc.tmp.loop);euc.tmp.loop=0;}
		if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}		
		if (euc.state!="OFF") {  
			if (set.def.cli) console.log("EUC restarting");
			euc.state="WAIT"; 
			euc.reconnect=setTimeout(() => {  euc.conn(euc.mac);euc.reconnect=0; }, 1500);
		}else {
			if (set.def.cli) console.log("Destroy euc (reason):",reason);
			global["\xFF"].bleHdl=[];
			delete euc.ch;
			NRF.setTxPower(set.def.rfTX);   
		}
	});
	c.startNotifications();	
	return  c;
}).then(function(c) {
//connected 
	if (set.def.cli) console.log("EUC connected"); 
	euc.state="READY"; //connected
	digitalPulse(D16,1,[90,40,150,40,90]);
	euc.tmp.count=22;// else euc.tmp.count=0;  //unlock	
	setTimeout(function(){  euc.wri(c); },200); 
	//reconect
}).catch(function(err)  {
	if (set.def.cli) console.log("EUC", err);
	//  global.error.push("EUC :"+err);
	if (euc.tmp.loop) {clearInterval(euc.tmp.loop);euc.tmp.loop=0;}
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (set.def.cli) console.log("not off");
		if ( err==="Connection Timeout"  )  {
			if (set.def.cli) console.log("retrying :timeout");
			euc.state="LOST";
			if (euc.lock==1) digitalPulse(D16,1,250);
			else digitalPulse(D16,1,[250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.def.cli) console.log("retrying :",err);
			euc.state="FAR";
			// if (euc.lock==1) digitalPulse(D16,1,100);
			// else digitalPulse(D16,1,[100,150,100]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
	} else {
		global["\xFF"].bleHdl=[];
		delete euc.ch;
		NRF.setTxPower(set.def.rfTX);	
    }
});
};
//function eRea() {
//}
//main loop
//main loop
euc.wri= function(ch) {
    busy=0;
	//gatt.setRSSIHandler();
	if (euc.tmp.loop) {clearInterval(euc.tmp.loop); euc.tmp.loop=0;}
	euc.tmp.loop = setInterval(function() {
/*		//check if still
		if (euc.dash.spd==0 && this.stll==false) {
			this.stll=3;
			//if (stis) {clearTimeout(stid);}
			stid=(setTimeout(() => { 
				this.stll=true;
			},5000));
		}else if (euc.dash.spd>=1 && this.stll!=false) {
			clearTimeout(stid);
			this.far=0;
			this.stll=false;
			changeInterval(euc.tmp.loop,100); 
		}
*/
/*		//proximity auto lock 
		if (euc.dash.aLck) {
			global["\xFF"].BLE_GATTS.setRSSIHandler(function(rssi) {euc.tmp.rssi=rssi; });
			if (euc.tmp.rssi< -(euc.dash.far) && this.stll==true && euc.lock==0) {
				//if (set.def.cli) console.log("far start");
				this.far++;
				this.near=0;
				if (this.far > 8 && euc.lock==0 ) {
					if (busy ) return;
					busy = true;
					ch.writeValue(euc.cmd(21)).then(function() {
						euc.lock=1;
						digitalPulse(D16,1,[90,60,90]);
					});
				}
			}else if  (euc.tmp.rssi> -(euc.dash.near) && euc.dash.spd<=5 && euc.lock==1 ) {
				this.far=0;
				if (busy ) return;
				busy = true;
				ch.writeValue(euc.cmd(22)).then(function() {
					busy = false;
					this.near=0;
					euc.lock=0;
					digitalPulse(D16,1,100);
					if (set.def.cli) console.log("unlock");
				});
			} else  { this.far=0; this.near=0; }
		}
*/
		//send command
		if (busy )  return;
		//only alarms when locked
		
//		if (euc.lock==1 && euc.tmp.count<=21 && euc.dash.spd==0) {euc.tmp.count=20;changeInterval(euc.tmp.loop,2000);}
		//only get alarms-speed when still
		//else if (this.stll==true && euc.tmp.count<19 ) {euc.tmp.count=19;changeInterval(euc.tmp.loop,500);}
//		else if (this.stll==true && euc.tmp.count<19 ) {changeInterval(euc.tmp.loop,500);}
//		else if  ( this.stll!=true && euc.dash.spd<=2)  {changeInterval(euc.tmp.loop,200);	}
//		else if  (euc.dash.spd>2 && face.appCurr==set.dash[set.def.dash])  {changeInterval(euc.tmp.loop,25);}
//		else changeInterval(euc.tmp.loop,50);
		busy = 1;
		//print("cmd:",euc.tmp.count);
		ch.writeValue(euc.cmd(euc.tmp.count)).then(function() {
			euc.tmp.count++;
			if (euc.tmp.count>=21) euc.tmp.count=0;
			if (euc.state=="OFF"){
				if (set.def.cli) console.log("EUCstartOff");
				clearInterval(euc.tmp.loop);
				euc.tmp.loop=0;
				euc.lock=1;
				digitalPulse(D16,1,120);
				euc.tmp.count=21;
				ch.writeValue(euc.cmd(euc.tmp.count)).then(function() {
					global["\xFF"].BLE_GATTS.disconnect();
				});
				return;
			}else busy = 0;
		});
	}, 100);  
};  
