//m_euc ninebot one c/e/p
euc.cmd=function(no){
	switch (no) {
    case 0:case 3:case 6:case 9:case 12:case 15:case 18:case "end":
	  return [85,170,3,9,1,80,2,160,255]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
	case 1:case 4:case 7:case 10:case 13:case 16:case 19:
	  return [85,170,3,9,1,38,2,202,255]; //Current Speed in Km/h*1000d
	case 2:return [85,170,3,9,1,62,2,178,255]; //Temperature numeric positive C * 10
	case 5:return [85,170,3,9,1,71,2,169,255]; //Voltage numeric positive V * 100
	case 8:return [85,170,3,9,1,185,2,55,255]; //Single Mileage numeric positive in meters
	case 11:return [85,170,3,9,1,58,2,182,255]; //Single Runtime numeric positive seconds
	case 14: euc.temp.rota=1-euc.temp.rota; return (!euc.temp.rota)?[85,170,3,9,1,37,2,203,255]:[85,170,3,9,1,41,4,197,255]; //remaining mileage in Km*100/total mileage
	case 17:return [85,170,3,9,1,182,2,58,255]; //Average speed numeric positive m/h
	case 20:return [85,170,3,9,1,112,2,128,255]; //Lock status
	case 21:return [85,170,3,9,3,112,1,127,255]; //21- lock
	case 22:return [85,170,3,9,3,112,0,128,255]; //22- unlock
	case 23:return [85,170,4,9,3,198,0,0,30,255]; //metric khp
	case 24:return [85,170,4,9,3,198,1,0,30,255]; //metric mph	
	case 25:return [85,170,4,9,3,198,0,0,41,255]; //ring  off
	case 26:return [85,170,4,9,3,198,1,0,40,255]; //ring  cyrcle
    case 30:return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
	case 31:return [85,170,4,9,2,210,1,0,29,255]; //25 set Riding Mode 1
	case 32:return [85,170,3,9,2,210,2,29,255]; //26 set Riding Mode 2
	case 33:return [85,170,3,9,2,210,3,28,255]; //27 set Riding Mode 3
	case 34:return [85,170,3,9,2,210,4,27,255]; //28 set Riding Mode 4
	case 35:return [85,170,3,9,2,210,5,26,255]; //29 set Riding Mode 5
	case 36:return [85,170,3,9,2,210,6,25,255]; //30 set Riding Mode 6
	case 37:return [85,170,3,9,2,210,7,24,255]; //31 set Riding Mode 7  
	case 38:return [85,170,3,9,2,210,8,23,255]; //32 set Riding Mode 8
	case 39:return [85,170,3,9,2,210,9,22,255];  //33 set Riding Mode 9
	case 40:return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
    }
};
//
euc.wri=function(i) {if (set.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
	if (set.bt===2) console.log("ble allready connected"); 
	global["\xFF"].BLE_GATTS.disconnect();return;
}
//connect
NRF.connect(mac,{minInterval:7.5, maxInterval:15})
.then(function(g) {
	return g.getPrimaryService(0xffe0);
}).then(function(s) {
	return s.getCharacteristic(0xffe1);
}).then(function(c) {
	//euc.temp.characteristic=c;
	c.on('characteristicvaluechanged', function(event) {
		this.var= event.target.value.buffer[5];
		this.in16=event.target.value.getUint16(6, true);
		//print(this.var);
		euc.alert=0;
		switch (this.var) {
		case 38://speed
			//euc.dash.live.spd=Math.round((this.in16/1000)*euc.dash.opt.spdF*((set.def.dash.mph)?0.625:1));
			euc.dash.live.spd=this.in16/1000;
			if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
				euc.dash.alrm.spd = ( euc.dash.live.spd1 <= euc.dash.live.spd )? 2 : ( euc.dash.live.spd2 <= euc.dash.live.spd )? 1 : 0 ;	
				if ( euc.dash.hapt.spd && euc.dash.alrm.spd == 2 ) 
					euc.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.live.spd1) / euc.dash.hapt.spdS) ; 	
			break;
		case 80://amp
			if ( 32768 < this.in16 ) 
				euc.dash.live.amp = (this.in16 - 65536) / 100 ; 
			else 
				euc.dash.live.amp = this.in16 / 100;
			ampL.unshift(Math.round(euc.dash.live.amp));
			if (20<ampL.length) ampL.pop();
			euc.dash.alrm.amp = ( euc.dash.hapt.ampH <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.hapt.ampL )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
			if (euc.dash.hapt.amp && euc.dash.alrm.amp==2) {
				if (euc.dash.hapt.ampH<=euc.dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.hapt.ampH) / euc.dash.hapt.ampS) ;
				else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.hapt.ampL) / euc.dash.hapt.ampS) ;
			}
			break;
		case 41://total distance
			euc.dash.trip.totl=event.target.value.getUint32(6, true)/1000;
			euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
			break;
		case 185://trip
			euc.dash.trip.last=this.in16/100;
			break;
		case 71://battery fixed/voltage
			euc.dash.live.volt=this.in16/100;
			euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*6.66 - euc.dash.opt.batE )  / (euc.dash.opt.batF-euc.dash.opt.batE));
			//euc.dash.live.bat=(((this.in16/100)-51.5)*10|0); 
			batL.unshift(euc.dash.live.bat);
			if (20<batL.length) batL.pop();
			euc.dash.alrm.bat = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.hapt.batL)? 2 : 1;	
			if ( euc.dash.hapt.bat && euc.dash.alrm.bat ==2 )  euc.alert ++; 
			break;
		case 37: //remaining
			euc.dash.trip.left=this.in16/100;
			break;
		case 62: //temp
			euc.dash.live.tmp=this.in16/10;
			euc.dash.alrm.tmp=(euc.dash.hapt.tmpH - 5 <= euc.dash.live.tmp )? (euc.dash.hapt.tmpH <= euc.dash.live.tmp )?2:1:0;
			if (euc.dash.hapt.tmp && euc.dash.alrm.tmp==2) euc.alert++; 	  
			break;
		case 182: //average
			euc.dash.trip.avrS=(this.in16/1000).toFixed(1);
			break;
		case 58: //runtime
			euc.dash.trip.time=Math.round(this.in16/60);
			break;
		case 210: //riding Mode
			if (this.in16 >=10)  {
              if (face.appCurr=="dashNinebot") face[0].ntfy("MODE CHANGED","",22,col("raf"),1);
              buzzer([80,40,80]);  
            }else euc.dash.set.mode=this.in16;
			break;
		case 112: //lock status
			if ( this.in16!=euc.dash.set.lock) euc.dash.set.lock=this.in16;
			break;
		}
    	//buzz
		if (euc.alert && !euc.buzz) {  
			if (!w.gfx.isOn&&(euc.dash.alrm.spd||euc.dash.alrm.amp||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
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
	c.startNotifications();	
	return  c;
}).then(function(c) {
	//connected 
	if (set.bt===2) console.log("EUC: Connected"); 
	euc.state="READY"; //connected
	buzzer([90,40,150,40,90]);
	euc.dash.set.lock=0;
	//write function
	euc.wri=function(i){
		if ( euc.state==="OFF" || i==="end" ) {
			euc.busy=1;
			if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
			if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
				euc.loop=setTimeout( function(){ 
					euc.loop=0;
					if (!global["\xFF"].BLE_GATTS) {euc.off("not connected");return;}
					c.writeValue(euc.cmd((euc.dash.aLck)?21:25)).then(function() {
						global["\xFF"].BLE_GATTS.disconnect().catch(function(err){if (set.def.cli)console.log("EUC OUT disconnect failed:", err);});
					}).catch(function(err)  {
						euc.state="OFF";
						euc.off("end fail");
						return;
					});
				},500);
			}else {
				euc.state="OFF";
				euc.off("not connected");
				return;
			}
		}else{
			c.writeValue(euc.cmd(i)).then(function() {
				if (euc.busy==1) return;
				euc.loop=setTimeout( function(){ 
					euc.loop=0;
					euc.temp.count++;
					if (euc.temp.count>=21)euc.temp.count=0;
					euc.wri(euc.temp.count);
				},50);	
			}).catch(function(err)  {
				euc.off("write fail");	
			});
		} 
	};
	if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
		euc.dash.slot.mac=euc.mac; euc.dash.opt.batF=412;
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
	}
    euc.busy=0;
	setTimeout(() => {
		euc.wri((euc.dash.aLck)?22:26);
		euc.run=1;
	}, 500);
//reconnect
}).catch(function(err)  {
	euc.off(err);
});
};

euc.off=function(err){
	if (euc.temp.loop) {clearInterval(euc.temp.loop);euc.temp.loop=0;}
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
			if (euc.dash.set.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1000);
		} else {
			if (set.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.temp=0;
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