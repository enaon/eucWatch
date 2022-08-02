//m_euc ninebot one Z10
euc.cmd=function(no){
	switch (no) {
    case 0:case 3:case 6:case 9:case 12:case 15:case 18:case "end":
	  return [85,170,3,17,1,80,2,152,255]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
	case 1:case 4:case 7:case 10:case 13:case 16:case 19:
	  return [85,170,3,17,1,38,2,194,255]; //Current Speed in Km/h*1000d
	case 2:return [85,170,3,17,1,62,2,170,255]; //Temperature numeric positive C * 10
	case 5:return [85,170,3,17,1,71,2,161,255]; //Voltage numeric positive V * 100
	case 8:return [85,170,3,17,1,185,2,47,255]; //Single Mileage numeric positive in meters
	case 11:return [85,170,3,17,1,58,2,174,255]; //Single Runtime numeric positive seconds
	case 14: euc.temp.rota=1-euc.temp.rota; return  (euc.temp.rota)?[85,170,3,17,1,41,4,189,255]:[85,170,3,17,1,37,2,195,255];//Total Mileage numeric positive in meters // remaining mileage in Km*100
//	case 14:return [85,170,3,17,1,41,4,189,255]; //Total Mileage numeric positive in meters
	case 17:return [85,170,3,17,1,182,2,50,255]; //Average speed numeric positive m/h
	case 20:return [85,170,3,17,1,112,2,120,255]; //Lock status
	case 21:return [85,170,3,17,2,112,1,120,255]; //21- lock
	case 22:return [85,170,3,17,2,112,0,121,255]; //22- unlock
	case 23:return [85,170,4,9,3,198,0,0,30,255]; //metric khp
	case 24:return [85,170,4,9,3,198,1,0,30,255]; //metric mph	
	case 25:return [85,170,4,9,3,198,0,0,41,255]; //ring  off
	case 26:return [85,170,4,9,3,198,1,0,40,255]; //ring  cyrcle
    case 30:return [85,170,3,17,2,210,0,23,255]; //set Riding Mode 0
	case 31:return [85,170,3,17,2,210,1,22,255]; //set Riding Mode 1
	case 32:return [85,170,3,17,2,210,2,21,255]; //set Riding Mode 2
	case 33:return [85,170,3,17,2,210,3,20,255]; //set Riding Mode 3
	case 34:return [85,170,3,17,2,210,4,19,255]; //set Riding Mode 4
	case 35:return [85,170,3,17,2,210,5,18,255]; //set Riding Mode 5
	case 36:return [85,170,3,17,2,210,6,17,255]; //set Riding Mode 6
	case 37:return [85,170,3,17,2,210,7,16,255]; //set Riding Mode 7  
	case 38:return [85,170,3,17,2,210,8,15,255]; //set Riding Mode 8
	case 39:return [85,170,3,17,2,210,9,14,255]; //set Riding Mode 9
    }
};
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
				//  this.var = event.target.value.getUint8(5, true);
				this.var= event.target.value.getUint8(5, true);
				this.in16=event.target.value.getUint16(6, true);
				//print(this.var);
				euc.is.alert=0;
				switch (this.var) {
					case 38://speed
						euc.dash.live.spd=this.in16/1000;
						if (euc.dash.info.trip.topS < euc.dash.live.spd) euc.dash.info.trip.topS = euc.dash.live.spd;
						euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;	
						if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 ) 
							euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ; 	
						break;
					case 80://amp
						if ( 32768 < this.in16 ) 
							euc.dash.live.amp =  (this.in16 - 65536) / 100 ; 
						else 
							euc.dash.live.amp = this.in16 / 100;
						euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
						if (20<euc.log.ampL.unshift) euc.log.ampL.pop();
						euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
						if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
							if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
							else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
						}
						break;
					case 41://total trip
						euc.dash.info.trip.totl=event.target.value.getUint32(6, true)/1000; 
						euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.info.trip.totl;});
						break;
					case 185://current trip
						euc.dash.info.trip.last=this.in16/100;
						break;
					case 71://battery fixed/voltage
						euc.dash.live.volt=this.in16/100;
						//euc.dash.live.bat=(((this.in16/100)-51.5)*10|0); 
						euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*6.66 - euc.dash.opt.bat.low )  / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
						euc.log.batL.unshift(euc.dash.live.bat);
						if (20<euc.log.batL.unshift) euc.log.batL.pop();
						euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
						if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;   
						break;
					case 37: //remaining
						euc.dash.info.trip.left=this.in16/100;
						break;
					case 62: //temp
						euc.dash.live.tmp=this.in16/10;
						euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
						if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++; 	  
						break;
					case 182: //average
						euc.dash.info.trip.avrS=(this.in16/1000).toFixed(1);
						break;
					case 58: //runtime
						euc.dash.info.trip.time=Math.round(this.in16/60);
						break;
					case 210: //riding Mode
						if (this.in16 >=10)  {
						  if (face.appCurr=="dashSetNinebot") face[0].ntfy("OK","",22,col("blue1"),1);
						  buzzer([80,40,80]);  
						}else euc.dash.opt.ride.mode=this.in16;
						break;
					case 112: //lock status
						if ( this.in16!=euc.dash.opt.lock.en) euc.dash.opt.lock.en=this.in16;
						break;
					}
					//buzz
					if (euc.is.alert && !euc.is.buzz) {  
						if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(set.dash[set.def.dash.face],0);
						euc.is.buzz=1;
						if (20<=euc.is.alert) euc.is.alert=20;
						var a=[];
						while (5 <= euc.is.alert) {
							a.push(150,500);
							euc.is.alert=euc.is.alert-5;
						}
						for (let i = 0; i < euc.is.alert ; i++) a.push(150,150);
						digitalPulse(ew.pin.BUZZ,0,a);  
						setTimeout(() => {euc.is.buzz=0; }, 3000);
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
			euc.wri=function(i){
				if ( euc.state==="OFF"||i==="end") {
					euc.is.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
						euc.loop=setTimeout( function(){ 
							euc.loop=0;
							if (!global["\xFF"].BLE_GATTS) {euc.off("not connected");return;}
							euc.wCha.writeValue(euc.cmd((euc.dash.aLck)?21:25)).then(function() {
								global["\xFF"].BLE_GATTS.disconnect().catch(function(err){if (set.def.cli)console.log("EUC OUT disconnect failed:", err);});
							}).catch(euc.off);
						},500);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;					}
				}else{
					euc.wCha.writeValue(euc.cmd(i)).then(function() {
						if (euc.is.busy==1) return;
						euc.loop=setTimeout( function(){ 
							euc.loop=0;
							euc.temp.count++;
							if (euc.temp.count>=21)euc.temp.count=0;
							euc.wri(euc.temp.count);
						},50);	
					}).catch(euc.off);
				} 
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
				euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=413;
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
			}
			euc.is.busy=0;
			setTimeout(() => {euc.wri((euc.dash.aLck)?22:26);euc.is.run=1;}, 500);
		//reconnect
		}).catch(euc.off);
};

euc.off=function(err){
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
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 500);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
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