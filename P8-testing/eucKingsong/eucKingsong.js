//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
//commands
euc.wri=function(i) {if (euc.dbg) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.cmd=function(no,val){
	switch (no) {
		//euc.wri("getParamA");
		case "manual":return val; 
		case "getModel":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155,20,90,90]; 
		case "getSerial":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90]; 
		case "getAlarms":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,20,90,90]; 
		case "doHorn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,20,90,90]; 
		case "doBeep":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,124,20,90,90]; 
		case "setLiftOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		//power
		case "getPowerOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "setPowerOff":return [170,85,1,0,(val & 255),((val >> 8) & 255),0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "doPowerOff":return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,64,20,90,90];
		//leds
		case "setLights": if(!val)val=euc.night?3:2; return [170,85,17+val,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "getStrobe":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,20,90,90];
		case "setStrobeOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "getLedMagic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "setLedMagicOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,20,90,90];
		case "getLedRide":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,109,20,90,90];
		case "setLedRideOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90];
		case "getSpectrum":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,20,90,90]; // to b checked
		case "setSpectrumOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,20,90,90]; 
		case "getSpectrumMode":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150,20,90,90];
		case "setSpectrumMode":return [170,85,val?val:0,0,0,0,0,0,0,0,0,0,0,0,0,0,151,20,90,90];
		//BT music mode
		case "getBTMusic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,20,90,90];
		case "setBTMusicOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,86,20,90,90];
		//voice
		case "getVoice":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,20,90,90];
		case "setVoiceOnOff":return [170,85,val?val:0,val?0:1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "setVoiceVolUp":return [170,85,255,0,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		case "setVoiceVolDn":return [170,85,0,255,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		//gyro
		case "doCalibrate": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,20,90,90];  
		case "getCalibrateTilt":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "setCalibrateTilt":return [170,85,1,0,val & 255,(val >> 8) & 255,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		//ride mode 0=hard,1=med,2=soft
		case "setRideMode":return [170,85,val?val:0,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];  
		case "getRideParamA":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90]; 
		case "getRideParamB":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,20,90,90]; 
		case "getRideParamC":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,148,20,90,90]; 
		//lock
		case "doUnlock":return val; 
		case "doLock":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		case "doLockOnce":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,20,90,90]; 
		case "getLock":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "getLockOnce":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,20,90,90];
		case "setLockOnOff":euc.dash.set.lock=val?1:0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		//pass
		case "getPass": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,20,90,90];
		case "setPass": 
			return [170,85,48+Number(euc.dash.set.pass[0]),48+Number(euc.dash.set.pass[1]),48+Number(euc.dash.set.pass[2]),48+Number(euc.dash.set.pass[3]),0,0,0,0,0,0,0,0,0,0,65,20,90,90];
		case "setPassClear": 
			return [170,85,48+Number(euc.dash.set.pass[0]),48+Number(euc.dash.set.pass[1]),48+Number(euc.dash.set.pass[2]),48+Number(euc.dash.set.pass[3]),0,0,0,0,0,0,0,0,0,0,66,20,90,90];
		case "setPassSend":
			return [170,85,48+Number(euc.dash.set.pass[0]),48+Number(euc.dash.set.pass[1]),48+Number(euc.dash.set.pass[2]),48+Number(euc.dash.set.pass[3]),0,0,0,0,0,0,0,0,0,0,68,20,90,90]; 
		case "setPassChange":
			return [170,85,48+Number(euc.dash.set.pass[0]),48+Number(euc.dash.set.pass[1]),48+Number(euc.dash.set.pass[2]),48+Number(euc.dash.set.pass[3]),48+Number(euc.dash.set.passOld[0]),48+Number(euc.dash.set.passOld[1]),48+Number(euc.dash.set.passOld[2]),48+Number(euc.dash.set.passOld[3]),0,0,0,0,0,0,65,20,90,90]; //rf 43
		case "setSpeedLimits":
			return [170,85,euc.dash.limt.en.spd?euc.dash.limt.spd:0,0,euc.dash.limt.en.spd1?euc.dash.limt.spd1:0,0,euc.dash.limt.spd2,0,euc.dash.limt.tilt,0,49,50,51,52,53,54,133,20,90,90];	
		default:
			return [];
    }
};
euc.temp.city=function(){
	if ( euc.dash.live.amp < -1 && euc.dash.set.HL ===1 ) {
		euc.wri("setLights",3); 
		euc.dash.set.HL =3;
	}else if (euc.night && euc.dash.live.amp >= 0) {
		if ( 15 < euc.dash.live.spd && euc.dash.set.HL !== 1  ) {
			euc.wri("setLights",1); 
			euc.dash.set.HL =1;
		}else if ( euc.dash.live.spd < 10 && euc.dash.set.HL !== 3  ) {
			euc.wri("setLights",3); 
			euc.dash.set.HL =3;
		}
	} else if (euc.dash.live.amp >= 0) {
		if ( 35 < euc.dash.live.spd && !euc.dash.set.strb  ) {
			euc.wri("setStrobeOnOff",1) ;
			euc.dash.set.strb=1;
		}else if  ( euc.dash.live.spd < 30 && euc.dash.set.strb  ) { 
			euc.wri("setStrobeOnOff",0) ;
			euc.dash.set.strb=0;
		}else if  ( 15 < euc.dash.live.spd && euc.dash.set.HL !== 1  ) {
			euc.wri("setLights",1); 
			euc.dash.set.HL =1;
		}else if ( euc.dash.live.spd < 10 && euc.dash.set.HL !== 3  ) {
			euc.wri("setLights",3); 
			euc.dash.set.HL =3;
		}
	}
};
//
euc.temp.one=function(inpk){
	//speed
	euc.dash.live.spd=(inpk[5] << 8 | inpk[4])/100; 
	euc.dash.alrm.spd = ( euc.dash.hapt.spdH <= euc.dash.live.spd )? 2 : ( euc.dash.limt.spd2 <= euc.dash.live.spd )? 1 : 0 ;	
	if ( euc.dash.hapt.spd && euc.dash.alrm.spd == 2 ) 
		euc.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.limt.spd1) / euc.dash.hapt.spdS) ; 	
	//amp
	this.amp=inpk[11] << 8 | inpk[10];
	if ( 32767 < this.amp ) this.amp = this.amp - 65536;
	euc.dash.live.amp = ( this.amp / 100 );
	ampL.unshift(Math.round(euc.dash.live.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.alrm.amp = ( euc.dash.hapt.ampH <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.hapt.ampL )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
	if (euc.dash.hapt.amp && euc.dash.alrm.amp==2) {
		if (euc.dash.hapt.ampH<=euc.dash.live.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.hapt.ampH) / euc.dash.hapt.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.hapt.ampL) / euc.dash.hapt.ampS) ;
	}
	//volt
	euc.dash.live.volt=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.live.bat=Math.round(100* (euc.dash.live.volt*( 100/(16*euc.dash.slot.bms)) - euc.dash.opt.batE )  / (euc.dash.opt.batF-euc.dash.opt.batE) );
	batL.unshift(euc.dash.live.bat);
	if (20<batL.length) batL.pop();
	euc.dash.alrm.bat = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.hapt.batL)? 2 : 1;	
	if ( euc.dash.hapt.bat && euc.dash.alrm.bat ==2 )  euc.alert ++; 
	//temp
	euc.dash.live.tmp = (inpk[13] << 8 | inpk[12])/100;
	euc.dash.alrm.tmp=(euc.dash.hapt.tmpH - 5 <= euc.dash.live.tmp )? (euc.dash.hapt.tmpH <= euc.dash.live.tmp )?2:1:0;
	if (euc.dash.hapt.tmp && euc.dash.alrm.tmp==2) euc.alert++; 
	//total mileage
	euc.dash.trip.totl = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
	euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
	//mode
	euc.dash.set.mode = inpk[14];
	//City lights 
	if ( euc.dash.opt.city && euc.dash.live.spd) { 
		euc.temp.city();
	}
					
};
euc.temp.two=function(inpk){
	euc.dash.trip.last=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	euc.dash.info.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	euc.dash.trip.topS=Math.round((inpk[9] << 8 | inpk[8])/100) ;///////
	//euc.dash.set.HL=inpk[10]-17;
	euc.dash.set.HL=inpk[10]-17;
	euc.dash.info.on=inpk[11];//onOffState
	euc.dash.info.fan=inpk[12];
	euc.dash.info.chrg=inpk[13];
	euc.charge=euc.dash.info.chrg?1:0;
	euc.dash.live.tmpM=Math.round((inpk[15] << 8 | inpk[14])/100) ;
	euc.dash.info.fan=inpk[12];
};
euc.temp.thre=function(inpk){
	euc.dash.alrm.tilt=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.info.tRdT=(inpk[13] << 8 | inpk[12]);
	euc.dash.alrm.err=(inpk[15] << 8 | inpk[14]);
	if (euc.dash.alrm.err) euc.dash.alrm.txt=euc.temp.faultAlarms(euc.dash.alrm.err);
	euc.dash.alrm.pwm=(euc.dash.alrm.tilt < euc.dash.limt.tilt && euc.dash.alrm.tilt-5 < euc.dash.live.spd)?1:0;
	almL.unshift(euc.dash.alrm.pwm);
	if (20<almL.length) almL.pop();
	//haptic
	//if (euc.dash.alrm.pwm==1) euc.alert++;
};
//
euc.temp.resp=function(inpk){
	if ( inpk[16] == 63 ) 
		euc.dash.set.offT=inpk[5] << 8 | inpk[4];
	else if ( inpk[16] == 67 ) {
		if (2<euc.dbg) print("bt pass:",inpk);
		if (inpk[6]==1){
			if (inpk[2]==255) euc.dash.set.pass="";
			else euc.dash.set.pass=""+(inpk[2]-48)+(inpk[3]-48)+(inpk[4]-48)+(inpk[5]-48);
		}
	}else if ( inpk[16] == 70 ) {
		if (2<euc.dbg) print("bt pass state:",inpk);
		euc.temp.pass=inpk[2];
  }else if ( inpk[16] == 72 ) 
		euc.dash.info.oldM=inpk[2];
	else if ( inpk[16] == 74) 
		euc.dash.set.sprm=inpk[2]; //spectrum
	else if ( inpk[16] == 76 ) 
		euc.dash.set.lift=inpk[2];
	else if ( inpk[16] == 77 ) 
		euc.dash.set.sprM=inpk[2]; //spectrum Mode
	else if ( inpk[16] == 82 ) 
		euc.dash.set.mdId=inpk[2]; //modeId
	else if ( inpk[16] == 85 ) 
		euc.dash.set.strb=inpk[2];
	else if ( inpk[16] == 88 ) 
		euc.dash.set.BTMc=inpk[2]; //BTMusic
	else if ( inpk[16] == 107 ) 
		euc.dash.set.lang=inpk[2];
	else if ( inpk[16] == 110 ) 	
		euc.dash.set.led=1-inpk[2];
	else if ( inpk[16] == 138 ){ 	
		if ( inpk[2] == 0)  {
			euc.dash.set.pTlt=((inpk[5]& 0xff)  << 8) | (inpk[4] & 0xff);
			if ( 32767 < euc.dash.set.pTlt ) euc.dash.set.pTlt = euc.dash.set.pTlt - 65536;
		}
	}else if ( inpk[16] == 162 ) 
		euc.dash.set.mode=inpk[4];	
	else if ( inpk[16] == 172 || inpk[16] == 173 || inpk[16] == 174  ) //Prapam
		print("in ",inpk[16]);
	else if ( inpk[16] == 179 ){
		let wc={"W":"WHITE","B":"BLACK","S":"SILVER GRAY","Y":"YELLOW","R":"RED","D":"RUBBER BLACK","C":"CUSTOM"};
		let model={
			"14D":[1,340,420,680,840],
			"16D":[1,340,420,680,840,520], 
			"16S":[1,680,840,0,420], 
			"16X":[1.25,777,1554], 
			"18A":[1,0,0,0,520,680,1360,840,1680],
			"18S":[1,0,0,680,1360,840,1680],
			"18L":[1.25,0,1036,0,1554],
			"S18":[1.25,1110],
			"S20":[1.875,2220]
		};
		euc.dash.slot.serl=E.toString(inpk.slice(2,16),inpk.slice(17,20));
		euc.dash.slot.manD=E.toString(inpk[11],inpk[12],"-",inpk[13],inpk[14],"-20",inpk[9],inpk[10]);
		euc.dash.slot.colr=wc[E.toString(inpk[8])];
		euc.dash.slot.modl=E.toString(inpk.slice(4,7));
		euc.dash.slot.mAh=model[euc.dash.slot.modl][inpk[7]-48];
		euc.dash.slot.bms=model[euc.dash.slot.modl][0];
		wc=0;model=0;

	}else if ( inpk[16] == 181 ){
		if (inpk[4]==0||inpk[4]==255) 
			euc.dash.limt.en.spd=0;
		else {
			euc.dash.limt.spd=inpk[4];
			euc.dash.limt.en.spd=1;
		}
		if (inpk[6]==0) 
			euc.dash.limt.en.spd1=0; 
		else {
			euc.dash.limt.spd1=inpk[6];
			euc.dash.limt.en.spd1=1;
		}
		euc.dash.limt.spd2=inpk[8];
		euc.dash.limt.tilt=inpk[10];
	}else if ( inpk[16] == 187 ){
		if (!euc.dash.slot.name) {
			euc.dash.slot.id=E.toString(inpk.slice(2,inpk.indexOf(0)));
			if (euc.dash.slot.id.split("-")) {
				euc.dash.slot.firm=euc.dash.slot.id.split("-")[2];
				euc.dash.slot.name=euc.dash.slot.id.split("-")[1];
				set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Model",euc.dash.slot.name);
			}
		}	
	}else if ( inpk[16] == 201 ) 
		euc.lala=inpk;	
	else if ( inpk[16] == 231 ) //speedPswd
		print("in 231");
	else if ( inpk[16] == 95 ){
		//if (inpk[2]==1 ){
			let r1=(Math.random()*10)|0;
			let r2=(Math.random()*10)|0;
			let r3=(Math.random()*10)|0;
			let i1 = inpk[8]==0?5:inpk[8]-48;
			let i2 = inpk[4]==0?1:inpk[4]-48;
			let i3 = inpk[6]==0?4:inpk[6]-48;
			let i4 = r1 + r2 + r3;
			let i5 = (i2 + i4 + i3 + i1) % 10;
			let i6 = i4 + i5;
			let i7 = (i3 + i6 + i1) % 10;
			euc.temp.lockKey= [170,85,0,0,0,0,0,0,0,0,48+i5,48+r1,48+i7,48+r2,48+(i6 + i7 + i1) % 10,48+r3,93,20,90,90];
		//}
		euc.dash.set.lock=inpk[2];
	}					
	if (2<euc.dbg) print("responce:",inpk);
};
euc.temp.faultAlarms =function(code) {
	switch(code) {
		case 202: return 'overcurrent error';
		case 203: return 'motor blocked';
		case 217: return 'hall sensor error';
		case 232: return 'lift sensor error';
		case 220: return 'overvoltage error';
		default: return code;
	}
};
//start
euc.conn=function(mac){
	if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
		if (euc.dbg) console.log("ble allready connected"); 
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
		var inpk=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			inpk.set(event.target.value.buffer);
			if (set.bt==5) NRF.updateServices({0xffe0:{0xffe1:{value:event.target.value.buffer,notify:true}}});
			//if (set.bt==5) euc.proxy.w(event.target.value.buffer);
            //if (euc.busy&&euc.dbg)  print("busy",inpk);
            if (inpk[0]==188) return;
			euc.alert=0;
			if (8<euc.dbg) console.log("INPUT :",inpk);
			if (inpk[16] == 169){
				if (euc.dbg==4) console.log("INPUT :",inpk);
				euc.temp.one(inpk);
			}else if (inpk[16] == 185){//trip-time-max_speed
				if (euc.dbg==5) console.log("INPUT :",inpk);
				euc.temp.two(inpk);
			}else if (inpk[16] == 245){
				if (euc.dbg==6) console.log("INPUT :",inpk);
				euc.dash.info.mtrL=inpk[6]; //motorLine
				euc.dash.info.gyro=inpk[7];
				euc.dash.info.mtrH=inpk[8]; //motorHolzer
				euc.dash.info.cpuR=inpk[14]; //cpuRate
				//euc.dash.info.outR=inpk[15]; //outputRate
				euc.dash.live.pwm=inpk[15];
			}else if (inpk[16] == 246){
				if (euc.dbg==7) console.log("INPUT :",inpk);
				euc.temp.thre(inpk);
			}else
				euc.temp.resp(inpk);
			//haptic
			if (euc.dash.hapt.pwm && (euc.dash.alrm.pwm || euc.dash.hapt.pwmH<=euc.dash.live.pwm)){
				digitalPulse(ew.pin.BUZZ,1,60);
				euc.alert=0;
			}else if (!euc.buzz && euc.alert) { 
				if (!w.gfx.isOn&&(euc.dash.alrm.spd||euc.dash.alrm.amp||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
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
		if (euc.dbg) console.log("EUC Kingsong connected"); 
		euc.wri= function(n,v) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},100);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},200);
			if (n=="hornOn"){
				euc.horn=1;
				if (euc.temp.horn) {clearTimeout(euc.temp.horn);euc.temp.horn=0;}
				c.writeValue(euc.cmd("doHorn")).then(function() {
					return c.writeValue(euc.cmd("setStrobeOnOff",1));
				}).then(function() {
					if (euc.temp.horn) {clearInterval(euc.temp.horn);euc.temp.horn=0;}
					euc.temp.horn=setInterval(() => {
						if (!BTN1.read()){
							if (euc.temp.horn) {clearInterval(euc.temp.horn);euc.temp.horn=0;}
							c.writeValue(euc.cmd("setStrobeOnOff",0)).then(function() {		
								euc.horn=0;
							});
						}
					}, 200); 
				});
			} else if (n=="hornOff") {
				euc.horn=0;
				return;
			} else if (n==="start") {
				euc.state="READY";
				c.startNotifications().then(function() {
					return c.writeValue(euc.cmd("getModel"));
				}).then(function() {	
					return euc.dash.auto.onC.pass?c.writeValue(euc.cmd("setPassSend")):"ok";
				}).then(function() {
					return euc.dash.auto.onC.unlk?c.writeValue(euc.cmd("getLock")):"ok";
				}).then(function() {
					return euc.dash.auto.onC.led?c.writeValue(euc.cmd("setLedRideOnOff",euc.dash.auto.onC.led-1)):"ok";
				}).then(function() {
					return euc.dash.auto.onC.HL?c.writeValue(euc.cmd("setLights",euc.dash.auto.onC.HL)):"ok";
				}).then(function() {
					return c.writeValue(euc.cmd("getAlarms"));	
				}).then(function() {
					return euc.dash.auto.onC.lift?c.writeValue(euc.cmd("setLiftOnOff",2-euc.dash.auto.onC.lift)):"ok";
				}).then(function() {
					return euc.dash.auto.onC.talk?c.writeValue(euc.cmd("setVoiceOnOff",2-euc.dash.auto.onC.talk)):"ok";
				}).then(function() {
					if (euc.dash.set.lock&&euc.dash.auto.onC.unlk&&euc.temp.lockKey) {
						let onceUL=euc.temp.lockKey;onceUL[16]=71;
						return c.writeValue(euc.cmd("doUnlock",onceUL));
					}
				}).then(function() {euc.run=1;
					if (2<euc.dbg) print("passstate:",euc.temp.pass);
					if (euc.temp.pass) {
						euc.dash.set.pass2=euc.dash.set.pass;
						euc.dash.set.pass="";
						face.go("dashKingsongAdvPass",0,1);
						return;
					}
				}).then(function() {
					if (!euc.dash.slot.serl) {
						return c.writeValue(euc.cmd("getSerial"));
					}
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((euc.dash.auto.onD.lock)?"doLock":"na")).then(function() {
						return euc.dash.auto.onD.off?c.writeValue(euc.cmd("doPowerOff")):true;	
					}).then(function() {
						return euc.dash.auto.onD.HL?c.writeValue(euc.cmd("setLights",euc.dash.auto.onD.HL)):"ok";
					}).then(function() {
						return euc.dash.auto.onC.led?c.writeValue(euc.cmd("setLedRideOnOff",euc.dash.auto.onC.led-1)):"ok";
					}).then(function() {
						return euc.dash.auto.onD.lift?c.writeValue(euc.cmd("setLiftOnOff",2-euc.dash.auto.onD.lift)):"ok";
					}).then(function() {
						return euc.dash.auto.onD.talk?c.writeValue(euc.cmd("setVoiceOnOff",2-euc.dash.auto.onD.talk)):"ok";
					}).then(function() {
						euc.run=0;
						return global["\xFF"].BLE_GATTS.disconnect();	
					}).catch(function(err)  {
						euc.state="OFF";
						if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
						else euc.off("err-off");
					});
				}else {
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			}else if (n==="proxy") {
				c.writeValue(v).then(function() {
					return;
				}).catch(function(err)  {
                    if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				});
			//rest					
			}else { 
					c.writeValue(euc.cmd(n,v)).then(function() {
				}).catch(function(err)  {
					euc.off("err-rest");
				});
			}
			return true;
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.slot.mac=euc.mac; euc.dash.opt.batF=420;euc.dash.opt.batE=320;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		if (global["\xFF"].bleHdl && global["\xFF"].bleHdl[54] && global["\xFF"].bleHdl[54].value.buffer[0]==170 && global["\xFF"].bleHdl[54].value.buffer[1]==85) {
			setTimeout(()=>{ 
				if (euc.dbg)  print("EUC: ks is initialized");
				euc.state="READY";
				c.startNotifications().then(function() {
					return euc.dash.auto.onC.talk?euc.wri("setVoiceOnOff",2- euc.dash.auto.onC.talk):"ok";
				});
			},500);
		}else {
			buzzer([90,40,150]);
			euc.wri("start");
		}
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.dbg) console.log("EUC.off :",err);
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		if (euc.dbg) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
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
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1000);
		} else {
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 2000);
		}
	} else {
		if (euc.dbg) console.log("EUC OUT:",err);
		if (euc.busy) { clearTimeout(euc.busy);euc.busy=0;} 
		if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.auto.onD.off=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.auto.onD.lock=euc.aLock;	delete euc.aLck;}
		euc.off=function(err){if (euc.dbg) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (euc.dbg) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (euc.dbg) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (euc.dbg) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.temp=0;
		global["\xFF"].bleHdl=[];
		if (this.proxy) this.proxy.e();
		NRF.setTxPower(set.def.rfTX);
    }
};

/*
		//
		case "getLogin":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,20,90,90];
		case "getOldMode":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,20,90,90];
		case "setOldMode":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,124,20,90,90];
		case "setNumRV":return [170,85,58,163,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90];
		case "setNumSV":return [170,85,26,161,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90];
		case "setTestMode":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103,20,90,90];
		case "doUpdateFirmware":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,20,90,90]; 
		case "getScooter":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,139,20,90,90]; 
		case "getParamA":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90]; 
		case "getParamB":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,20,90,90]; 
		case "getParamC":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,148,20,90,90]; 
		//
		case "doResetFactoryDefauts":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,20,90,90];
		case "doResetFactorySetA":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,102,20,90,90];
		//
		case "getTotalRideTime":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90];
		case "setTotalRideTime":return [170,85,val,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90];
		//
		case "getBTMusic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,20,90,90];
		case "setBTMusic":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,86,20,90,90];
		case "setMusicNext":return [170,85,0,0,255,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		case "setMusicPrev":return [170,85,0,0,0,255,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		//
		case "getLanguage":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,106,20,90,90];
		case "setLanguage":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,20,90,90];
		//
		case "getLedColor":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,91,20,90,90];

*/