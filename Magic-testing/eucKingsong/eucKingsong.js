//kingsong euc module 
//KS-S180531
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
if (!dash.live.lght) dash.live.lght={"ride":0};
if (!dash.live.ks) dash.live.ks={"lift":1,"aLift":0,"aRide":0};
euc.tmp={};
//commands
euc.wri=function(i) {if (set.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.cmd=function(no){
	"ram";
	switch (no) {
		case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A]; 
		case "alarms":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x98,0x14,0x5A,0x5A]; 
		case "horn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x88,0x14,0x5A,0x5A]; 
		case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
		case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
		case "lightsOn":euc.seq=0;dash.live.light=1;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsOff": euc.seq=0;dash.live.light=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsAuto":euc.seq=0;dash.live.light=2;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
		case "lightsCity": if (euc.night) {return euc.cmd("lightsAuto");} else {return euc.cmd("lightsOff");} break;
		case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
		case "lock":dash.live.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
		case "unlock":dash.live.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];
		case "strobeOn":dash.live.strobe=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "strobeOff":dash.live.strobe=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "off":euc.seq=0;return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x14,0x5A,0x5A];
		case "passSend":return    [0xAA,0x55,0x30+Number(dash.live.pass[0]),0x30+Number(dash.live.pass[1]),0x30+Number(dash.live.pass[2]),0x30+Number(dash.live.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
		case "passChange": return [0xAA,0x55,0x30+Number(dash.live.pass[0]),0x30+Number(dash.live.pass[1]),0x30+Number(dash.live.pass[2]),0x30+Number(dash.live.pass[3]),0x30+Number(dash.live.passOld[0]),0x30+Number(dash.live.passOld[1]),0x30+Number(dash.live.passOld[2]),0x30+Number(dash.live.passOld[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "passClear": return [0xAA,0x55,0x30+Number(dash.live.pass[0]),0x30+Number(dash.live.pass[1]),0x30+Number(dash.live.pass[2]),0x30+Number(dash.live.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x42,0x14,0x5A,0x5A];  //rf 43
		case "passSet": return [0xAA,0x55,0x30+Number(dash.live.pass[0]),0x30+Number(dash.live.pass[1]),0x30+Number(dash.live.pass[2]),0x30+Number(dash.live.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "calibrate":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x89,0x14,0x5A,0x5A];  
		case "tiltSet":dash.live.tiltSet=(99<=dash.live.tiltSet||-99>=dash.live.tiltSet)?0:dash.live.tiltSet;let tiltSet=(0<=dash.live.tiltSet)?dash.live.tiltSet:255+dash.live.tiltSet;
			return [0xAA,0x55,0x01,0x00,tiltSet,(tiltSet<=100)?0:255,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x8A,0x14,0x5A,0x5A]; //rf 8A
		case "liftOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A]; //rf 4C
		case "liftOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A];
		case "setSpeedLimits":return [0xAA,0x55,((dash.live.limE[0])?dash.live.lim[0]:(dash.live.limE[1])?0x00:0xFF),0x00,(dash.live.limE[1])?dash.live.lim[1]:0,0x00,dash.live.lim[2],0x00,dash.live.lim[3],0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,0x14,0x5A,0x5A]; //speed in kph, rf A4
		case "rideLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 6E
		case "rideLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A];
		case "musicLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7D,0x14,0x5A,0x5A]; //rf 6E
		case "musicLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 4A
    }
};

euc.tmp.one=function(inpk){
	"ram";
	//speed
	dash.live.spd=(inpk[5] << 8 | inpk[4])/100; 
	dash.live.spdC = ( dash.live.spd1 <= dash.live.spd )? 2 : ( dash.live.spd2 <= dash.live.spd )? 1 : 0 ;	
	if ( dash.live.hapS && dash.live.spdC == 2 ) 
		euc.alert = 1 + Math.round((dash.live.spd-dash.live.spd1) / dash.live.spdS) ; 	
	//amp
	this.amp=inpk[11] << 8 | inpk[10];
	if ( 32767 < this.amp ) this.amp = this.amp - 65536;
	dash.live.amp = ( this.amp / 100 );
	dash.live.ampC = ( dash.live.ampH <= dash.live.amp || dash.live.amp <= dash.live.ampL )? 2 : ( dash.live.amp  <= 0 || 15 <= dash.live.amp)? 1 : 0;
	ampL.unshift(Math.round(dash.live.amp));
	if (20<ampL.length) ampL.pop();
	dash.live.ampC = ( dash.live.ampH <= dash.live.amp || dash.live.amp <= dash.live.ampL )? 2 : ( dash.live.amp  <= -0.5 || 15 <= dash.live.amp)? 1 : 0;
	if (dash.live.hapA && dash.live.ampC==2) {
		if (dash.live.ampH<=dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (dash.live.amp - dash.live.ampH) / dash.live.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(dash.live.amp - dash.live.ampL) / dash.live.ampS) ;
	}
	//volt
	dash.live.volt=(inpk[3] << 8 | inpk[2])/100;
	dash.live.bat=Math.round(100* (dash.live.volt*( 100/(16*dash.live.bms)) - dash.live.batE )  / (dash.live.batF-dash.live.batE) );
	batL.unshift(dash.live.bat);
	if (20<batL.length) batL.pop();
	dash.live.batC = (50 <= dash.live.bat)? 0 : (dash.live.bat <= dash.live.batL)? 2 : 1;	
	if ( dash.live.hapB && dash.live.batC ==2 )  euc.alert ++; 
	//temp
	dash.live.tmp = (inpk[13] << 8 | inpk[12])/100;
	dash.live.tmpC=(dash.live.tmpH - 5 <= dash.live.tmp )? (dash.live.tmpH <= dash.live.tmp )?2:1:0;
	if (dash.live.hapT && dash.live.tmpC==2) euc.alert++; 
	//total mileage
	dash.live.trpT = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=dash.live.trpT;});
	//mode
	dash.live.mode = inpk[14];
	//City lights 
	if ( dash.live.aLight === "lightsCity" ) { 
		if ( dash.live.amp < -1 && dash.live.light ===1 ) {
			euc.wri("lightsAuto"); 
		}else if (euc.night && dash.live.amp >= 0) {
			if ( 20 < dash.live.spd && dash.live.light !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( dash.live.spd < 10 && dash.live.light !== 2  ) 
				euc.wri("lightsAuto") ;
		} else if (dash.live.amp >= 0) {
			if ( 35 < dash.live.spd && !dash.live.strobe  ) 
				euc.wri("strobeOn") ;
			else if  ( dash.live.spd < 30 && dash.live.strobe  ) 
				euc.wri("strobeOff") ;
			else if  ( 25 < dash.live.spd && dash.live.light !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( dash.live.spd < 15 && dash.live.light !== 2  ) 
				euc.wri("lightsAuto") ;
		}
	}
	euc.emit("one");
					
};
euc.tmp.two=function(inpk){
	"ram";
	dash.live.trpL=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	dash.live.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	dash.live.spdM=Math.round((inpk[9] << 8 | inpk[8])/100) ;
	dash.live.fan=inpk[12];
	euc.emit("two");
};
euc.tmp.thre=function(inpk){
	"ram";
	dash.live.spdL=(inpk[3] << 8 | inpk[2])/100;
	dash.live.alrm=(dash.live.spdL < dash.live.spdT && dash.live.spdL-5 < dash.live.spd)?1:0;
	almL.unshift(dash.live.alrm);
	if (20<almL.length) almL.pop();
	//haptic
	if (dash.live.alrm) euc.alert=20;
};
euc.tmp.four=function(inpk){
	"ram";
	//console.log("model");
	if (!dash.live.name) {
		dash.live.model=String.fromCharCode.apply(String,inpk.slice(2,11));
		dash.live.name=String.fromCharCode.apply(String,inpk.slice(5,8));
		if (dash.live.model.includes("-")) {
			let model=dash.live.name.split("-")[0];
			if (model.includes("S18") || model.includes("18L") ||  model.includes("18XL") || model.includes("16X") )
				dash.live.bms = 1.25;
			else 
				dash.live.bms = 1;
		} else dash.live.bms=1.25;
		setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Model",dash.live.name);
	}	
};	
//start
euc.conn=function(mac){
	"ram";
	if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
		if (set.def.cli) console.log("ble allready connected"); 
		global["\xFF"].BLE_GATTS.disconnect();return;
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
//		inpk=new Uint8Array(event.target.value.buffer);
		var inpk=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			if (set.bt===2&&2<set.dbg) console.log("KingSong: packet in ",event.target.value.buffer); 
			if (set.bt==4) 	euc.proxy.w(event.target.value.buffer);
			inpk.set(event.target.value.buffer);
            if (euc.busy) return;
			euc.alert=0;
			switch (inpk[16]){				
				case  169:
					euc.tmp.one(inpk);
					break;
				case 185://trip-time-max_speed
					euc.tmp.two(inpk);
					break;
				case 245:
					dash.live.pwr=inpk[15];
					break;
				case 246:
					euc.tmp.thre(inpk);
					break;	
				case 181:
					if (inpk[4]==0||inpk[4]==255) dash.live.limE[0]=0;
					else {
						dash.live.lim[0]=inpk[4];
						dash.live.limE[0]=1;
					}
					if (inpk[6]==0) dash.live.limE[1]=0; 
					else {
						dash.live.lim[1]=inpk[6];
						dash.live.limE[1]=1;
					}
					dash.live.lim[2]=inpk[8];
					dash.live.lim[3]=inpk[10];
					break;
				case 179://serial
					dash.live.serial=String.fromCharCode.apply(String,inpk.slice(2,14))+String.fromCharCode.apply(String,inpk.slice(17,3));
					break;
				case 187://model
					euc.tmp.four(inpk);
					break;
			}
			//haptic
			if (!euc.buzz && euc.alert) { 
				if (!w.gfx.isOn&&(dash.live.spdC||dash.live.ampC||dash.live.alrm)) face.go(set.dash[set.def.dash.face],0);
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
		return  c;
	//write
	}).then(function(c) {
		if (set.def.cli) console.log("EUC Kingsong connected"); 
		euc.wri= function(n) {
			"ram";
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},100);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},1000);
			//if (n=="end") c.stopNotifications();
			if (n=="hornOn"){
				euc.horn=1;
				if (euc.tmp.horn) {clearTimeout(euc.tmp.horn);euc.tmp.horn=0;}
				c.writeValue(euc.cmd("lock")).then(function() {
					dash.live.lock=1;
					return c.writeValue(euc.cmd("lightsOn"));
				}).then(function() {	
					dash.live.strb=1;
					return c.writeValue(euc.cmd("strobeOn"));
				}).then(function() {
					if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
					euc.tmp.horn=setInterval(() => {
						if (!BTN1.read()){
							if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
							c.writeValue(euc.cmd("unlock")).then(function() {		
								dash.live.lock=0;
								dash.live.strb=0;
								return c.writeValue(euc.cmd("strobeOff"));
							}).then(function() {
								euc.horn=0;
								if (euc.busy){clearTimeout(euc.busy);euc.busy=0;}
								return c.writeValue(euc.cmd(dash.live.aLight));
							});
						}
					}, 200); 
				});
			} else if (n=="hornOff") {
				euc.horn=0;
				if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				return;
			} else if (n==="start") {
				euc.state="READY";
				buzzer([90,40,150]);
				c.writeValue(euc.cmd((dash.live.passSend)?"passSend":(dash.live.aLck)?"unlock":(dash.live.aLight)?dash.live.aLight:"lightsAuto")).then(function() {	
					return c.writeValue(euc.cmd((dash.live.aLck&&dash.live.passSend)?"unlock":(euc.seq==0)?(dash.live.lght.ride)?"rideLedOn":"rideLedOff":(dash.live.aLight)?dash.live.aLight:"lightsAuto"));
				}).then(function() {
					return (euc.seq==0)?(dash.live.aLck||dash.live.passSend)?c.writeValue(euc.cmd((dash.live.lght.ride)?"rideLedOn":"rideLedOff")):"ok":c.writeValue(euc.cmd((dash.live.aLight)?dash.live.aLight:"lightsAuto"));
				}).then(function() {
					return ((dash.live.aLck&&dash.live.passSend)?c.writeValue(euc.cmd((dash.live.lght.ride)?"rideLedOn":"rideLedOff")):"ok");
				}).then(function() {
					return c.startNotifications();
				}).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					return c.writeValue(euc.cmd("alarms"));	
				}).then(function() {
					euc.run=1;
					return c.writeValue(euc.cmd("model"));
				}).then(function() {
					if (dash.live.ks.aLift) dash.live.ks.lift=0;
					return ((dash.live.ks.aLift)?c.writeValue(euc.cmd("liftOff")):"ok");
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((dash.live.aLck)?"lock":"lightsOff")).then(function() {
						return ((dash.live.aOff)?c.writeValue(euc.cmd("off")):true);	
					}).then(function() {
						return ((euc.seq)?c.writeValue(euc.cmd("lightsOff")):true);
					}).then(function() {
						return ((dash.live.ks.aRide)?c.writeValue(euc.cmd("rideLedOff")):true);	
					}).then(function() {
						return ((dash.live.ks.aLift)?c.writeValue(euc.cmd("liftOn")):true);
					}).then(function() {
						euc.run=0;
						return global["\xFF"].BLE_GATTS.disconnect();	
					}).catch(function(err)  {
						euc.state="OFF";
						if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
						if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
						else euc.off("err-off");
					});
				}else {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			//forward if cmd unknown	
			}else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
                    clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err-fwd");
				});
			//rest	
			}else { 
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err-rest");
				});
			}
		};
		if (!setter.read("dash","slot"+setter.read("dash","slot")+"Mac")) {
			dash.live.mac=euc.mac; dash.live.batF=420;dash.live.batE=320;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			setter.write("dash","slot"+setter.read("dash","slot")+"Mac",euc.mac);
		}
		if (!euc.run) { 
			euc.wri("start");
		} else {
			setTimeout(()=>{ 
				//console.log(global["\xFF"].bleHdl[54].value.buffer[0]);
				if (global["\xFF"].bleHdl[54]&& (global["\xFF"].bleHdl[54].value.buffer[0]==65 ||global["\xFF"].bleHdl[54].value.buffer[0]==188)){
					euc.wri("start");
				} else {
					euc.state="READY";
					c.startNotifications();
				}
			},500);
		}
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		euc.seq=1;
		//if (set.def.cli) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			//if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (dash.live.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1000);
		} else {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 2000);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		if (euc.busy) { clearTimeout(euc.busy);euc.busy=0;} 
		if ( euc.aOff==0 || euc.aOff==1 ) {dash.live.aOff=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {dash.live.aLck=euc.aLck;	delete euc.aLck;}
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.tmp=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);
    }
};