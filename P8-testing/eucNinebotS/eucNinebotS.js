//m_euc ninebot one Z10
euc.tmp={count:0,loop:0,rota:0};
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
	case 14: euc.tmp.rota=1-euc.tmp.rota; return  (euc.tmp.rota)?[85,170,3,17,1,41,4,189,255]:[85,170,3,17,1,37,2,195,255];//Total Mileage numeric positive in meters // remaining mileage in Km*100
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
euc.conn=function(mac){
		global.time=getTime();

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
				//  this.var = event.target.value.getUint8(5, true);
				this.var= event.target.value.getUint8(5, true);
				this.in16=event.target.value.getUint16(6, true);
				//print(this.var);
				euc.alert=0;
				switch (this.var) {
					case 38://speed
						euc.dash.spd=(this.in16/1000).toFixed(0);
						euc.dash.spdC = ( euc.dash.spd <= euc.dash.spd1 )? 0 : ( euc.dash.spd1+5 <= euc.dash.spd )? 3 : ( euc.dash.spd1+2 <= euc.dash.spd )? 2 : 1 ;	
						if ( euc.dash.hapS && euc.dash.spd >= euc.dash.spd1 ) 
							euc.alert = 1 + ((euc.dash.spd-euc.dash.spd1) / euc.dash.ampS|0) ;
						break;
					case 80://amp
						if ( 32768 < this.in16 ) 
							euc.dash.amp =  (this.in16 - 65536) / 100 ; 
						else 
							euc.dash.amp = this.in16 / 100;
						ampL.unshift(Math.round(euc.dash.amp));
						if (20<ampL.length) ampL.pop();
						euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
						if ( euc.dash.ampH <= euc.dash.amp ){
							euc.dash.spdC = ( euc.dash.ampC === 3 )? 3 : ( euc.dash.spdC === 3 )? 3 : 2;
							if (euc.dash.hapA) euc.alert = ( euc.alert + 1 + ((euc.dash.amp - euc.dash.ampH) / euc.dash.ampS|0) );
						}else if ( euc.dash.amp <= euc.dash.ampL )  {
							euc.dash.spdC = (euc.dash.ampC === 3)? 3 : (euc.dash.spdC === 3)? 3 : 2;
							if (euc.dash.hapA) euc.alert = (euc.alert + 1 + ((-(euc.dash.amp - euc.dash.ampL)) / euc.dash.ampS|0));  				
						}
						euc.new=1;
						break;
					case 41://total trip
						euc.dash.trpT=(event.target.value.getUint32(6, true)/1000).toFixed(1); 
						break;
					case 185://current trip
						euc.dash.trpL=(this.in16/100).toFixed(2);
						break;
					case 71://battery fixed/voltage
						euc.dash.volt=this.in16/100;
						euc.dash.bat=(((this.in16/100)-51.5)*10|0); 
						batL.unshift(euc.dash.bat);
						if (20<batL.length) batL.pop();
						if ((euc.dash.bat) >= euc.dash.batH) euc.dash.batC=0;
						else  if ((euc.dash.bat) >= euc.dash.batM) euc.dash.batC=1;
						else  if ((euc.dash.bat) >= euc.dash.batL) euc.dash.batC=2;
						else  {
							euc.dash.batC=3;
							if (euc.dash.hapB) euc.alert++;
						}
						euc.new=1;
						break;
					case 37: //remaining
						euc.dash.trpR=(this.in16/100).toFixed(1);
						break;
					case 62: //temp
						euc.dash.tmp=(this.in16/10).toFixed(1);
						if (euc.dash.tmp>=euc.dash.tmpH ) {
							if (euc.dash.tmp>=65) euc.dash.tmpC=3;
							else euc.dash.tmpC=2;
							if (euc.dash.hapT) euc.alert++;
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
						if (this.in16 >=10)  {
						  if (face.appCurr=="dashSetNinebot") face[0].ntfy("OK","",22,col("blue1"),1);
						  digitalPulse(D16,1,[80,40,80]);  
						}else euc.dash.mode=this.in16;
						break;
					case 112: //lock status
						if ( this.in16!=euc.dash.lock) euc.dash.lock=this.in16;
						break;
					}
					//buzz
					if (euc.alert && !euc.buzz) {  
						euc.buzz=1;
						if (20<=euc.alert) euc.alert=20;
						var a=[];
						while (5 <= euc.alert) {
							a.push(150,500);
							euc.alert=euc.alert-5;
						}
						var i;
						for (i = 0; i < euc.alert ; i++) {
							a.push(150,150);
						}
						digitalPulse(D16,0,a);  
						setTimeout(() => {euc.buzz=0; }, 3000);
					}
					//screen on
					if ((1<euc.dash.spdC||1<euc.dash.ampC||euc.dash.alrm)&&!w.gfx.isOn ){
					face.go(set.dash[set.def.dash.face],0);
					}
					time=getTime();
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
			euc.wri=function(i){
				if (i==="end") {
					euc.busy=1;
					if (euc.loop) {clearTimeout(euc.loop); euc.loop=0;}
					euc.loop=setTimeout( function(){ 
						euc.loop=0;
						if (!global["\xFF"].BLE_GATTS) {;euc.off("not connected");return;}
						euc.wCha.writeValue(euc.cmd((euc.dash.aLck)?21:25)).then(function() {
							global["\xFF"].BLE_GATTS.disconnect().catch(function(err){if (set.def.cli)console.log("EUC OUT disconnect failed:", err);});
						}).catch(function(err)  {
							euc.off("end fail");	
						});
					},500);
				}else{
					euc.wCha.writeValue(euc.cmd(i)).then(function() {
						if (euc.busy==1) return;
						euc.loop=setTimeout( function(){ 
							euc.loop=0;
							euc.tmp.count++;
							if (euc.tmp.count>=21)euc.tmp.count=0;
							euc.wri(euc.tmp.count);
						},50);	
					}).catch(function(err)  {
						euc.off("write fail");	
					});
				} 
			};
			if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {euc.dash.mac=euc.mac; set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);}
			euc.busy=0;
			setTimeout(() => {euc.wri((euc.dash.aLck)?22:26);}, 500);
		//reconnect
		}).catch(function(err)  {
			euc.off(err);
	});
};

euc.off=function(err){
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
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 500);
		} else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
			if (set.def.cli) console.log("ble still connected"); 
			global["\xFF"].BLE_GATTS.disconnect();return;
		}
		if (set.def.cli) console.log("EUC OUT:",err);
		//global["\xFF"].bleHdl=[];
		euc.busy=0;
		euc.off=function(err){if (set.def.cli) console.log("EUC stoped at:",err);};
		euc.wri=function(err){if (set.def.cli) console.log("EUC write, not connected");};
		delete euc.conn;
		delete euc.cmd;
    }
};