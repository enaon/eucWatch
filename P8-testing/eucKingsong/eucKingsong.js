//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
if (!euc.dash.lght) euc.dash.lght={"ride":0};
if (!euc.dash.ks||(euc.dash.ks&&euc.dash.ks.ver!=6)) euc.dash.ks={"ver":6,"lift":1,"aLiftC":0,"aRideC":0,"aVoiceC":2,"aLiftD":0,"aRideD":0,"aVoiceD":0,"HL":0,"aHLC":3,"aHLD":2,"aOff":0,"aLock":0,"aUnlock":0,"city":0,"offT":0};
euc.tmp={};
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
		case "setLockOnOff":euc.dash.lock=val?1:0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		//pass
		case "getPass": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,20,90,90];
		case "setPass": 
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,65,20,90,90];
		case "setPassClear": 
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,66,20,90,90];
		case "setPassSend":
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,68,20,90,90]; 
		case "setPassChange":
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),48+Number(euc.dash.passOld[0]),48+Number(euc.dash.passOld[1]),48+Number(euc.dash.passOld[2]),48+Number(euc.dash.passOld[3]),0,0,0,0,0,0,65,20,90,90]; //rf 43
		case "setSpeedLimits":
			return [170,85,euc.dash.limE[0]?euc.dash.lim[0]:0,0,euc.dash.limE[1]?euc.dash.lim[1]:0,0,euc.dash.lim[2],0,euc.dash.lim[3],0,49,50,51,52,53,54,133,20,90,90];	
		default:
			return [];
    }
};
euc.tmp.city=function(){
	if ( euc.dash.amp < -1 && euc.dash.ks.HL ===1 ) {
		euc.wri("setLights",3); 
		euc.dash.ks.HL =3;
	}else if (euc.night && euc.dash.amp >= 0) {
		if ( 15 < euc.dash.spd && euc.dash.ks.HL !== 1  ) {
			euc.wri("setLights",1); 
			euc.dash.ks.HL =1;
		}else if ( euc.dash.spd < 10 && euc.dash.ks.HL !== 3  ) {
			euc.wri("setLights",3); 
			euc.dash.ks.HL =3;
		}
	} else if (euc.dash.amp >= 0) {
		if ( 35 < euc.dash.spd && !euc.dash.strb  ) {
			euc.wri("setStrobeOnOff",1) ;
			euc.dash.strb=1;
		}else if  ( euc.dash.spd < 30 && euc.dash.strb  ) { 
			euc.wri("setStrobeOnOff",0) ;
			euc.dash.strb=0;
		}else if  ( 15 < euc.dash.spd && euc.dash.ks.HL !== 1  ) {
			euc.wri("setLights",1); 
			euc.dash.ks.HL =1;
		}else if ( euc.dash.spd < 10 && euc.dash.ks.HL !== 3  ) {
			euc.wri("setLights",3); 
			euc.dash.ks.HL =3;
		}
	}
};
//
euc.tmp.one=function(inpk){
	//speed
	euc.dash.spd=(inpk[5] << 8 | inpk[4])/100; 
	euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
	if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
		euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 	
	//amp
	this.amp=inpk[11] << 8 | inpk[10];
	if ( 32767 < this.amp ) this.amp = this.amp - 65536;
	euc.dash.amp = ( this.amp / 100 );
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= 0 || 15 <= euc.dash.amp)? 1 : 0;
	ampL.unshift(Math.round(euc.dash.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
	if (euc.dash.hapA && euc.dash.ampC==2) {
		if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
	}
	//volt
	euc.dash.volt=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.bat=Math.round(100* (euc.dash.volt*( 100/(16*euc.dash.bms)) - euc.dash.batE )  / (euc.dash.batF-euc.dash.batE) );
	batL.unshift(euc.dash.bat);
	if (20<batL.length) batL.pop();
	euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
	if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++; 
	//temp
	euc.dash.tmp = (inpk[13] << 8 | inpk[12])/100;
	euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
	if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++; 
	//total mileage
	euc.dash.trpT = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
	//mode
	euc.dash.mode = inpk[14];
	//City lights 
	if ( euc.dash.ks.city && euc.dash.spd) { 
		euc.tmp.city();
	}
					
};
euc.tmp.two=function(inpk){
	euc.dash.trpL=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	euc.dash.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	euc.dash.spdM=Math.round((inpk[9] << 8 | inpk[8])/100) ;
	//euc.dash.light=inpk[10]-17;
	euc.dash.ks.HL=inpk[10]-17;
	euc.dash.ks.onOffState=inpk[11];
	euc.dash.ks.fan=inpk[12];
	euc.dash.ks.charge=inpk[13];
	euc.charge=euc.dash.ks.charge?1:0;
	euc.dash.ks.tempMotor=Math.round((inpk[15] << 8 | inpk[14])/100) ;
	euc.dash.fan=inpk[12];
	//if (euc.dash.light!=euc.tmp.light){
	//	euc.tmp.light=euc.dash.light;
	//	if (!=2&&euc.dash.ks.HL==2) euc.dash.ks.HL=1;
	//	else if (euc.dash.light==2&&euc.dash.ks.HL!=2) euc.dash.ks.HL=2;
	//}
	euc.dash.fan=inpk[12];
					
};
euc.tmp.thre=function(inpk){
	euc.dash.spdL=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.ks.totRideTime=(inpk[13] << 8 | inpk[12]);
	euc.dash.ks.errorCode=(inpk[15] << 8 | inpk[14]);

	euc.dash.alrm=(euc.dash.spdL < euc.dash.spdT && euc.dash.spdL-5 < euc.dash.spd)?1:0;
	almL.unshift(euc.dash.alrm);
	if (20<almL.length) almL.pop();
	//haptic
	if (euc.dash.alrm) euc.alert=20;
};
//
euc.tmp.resp=function(inpk){
	if ( inpk[16] == 63 ) 
		euc.dash.ks.offT=inpk[5] << 8 | inpk[4];
	else if ( inpk[16] == 67 ) {
		if (2<euc.dbg) print("bt pass:",inpk);
		if (inpk[6]==1){
			if (inpk[2]==255) euc.dash.pass="";
			else euc.dash.pass=""+(inpk[2]-48)+(inpk[3]-48)+(inpk[4]-48)+(inpk[5]-48);
		}
	}else if ( inpk[16] == 70 ) {
		if (2<euc.dbg) print("bt pass state:",inpk);
		euc.tmp.pass=inpk[2];
  }else if ( inpk[16] == 72 ) 
		euc.dash.ks.oldMode=inpk[2];
	else if ( inpk[16] == 74) 
		euc.dash.ks.spectrum=inpk[2];
	else if ( inpk[16] == 76 ) 
		euc.dash.ks.lift=inpk[2];
	else if ( inpk[16] == 77 ) 
		euc.dash.ks.spectrumMode=inpk[2];
	else if ( inpk[16] == 82 ) 
		euc.dash.ks.modeId=inpk[2];
	else if ( inpk[16] == 85 ) 
		euc.dash.strb=inpk[2];
	else if ( inpk[16] == 88 ) 
		euc.dash.ks.BTMusic=inpk[2];
	else if ( inpk[16] == 107 ) 
		euc.dash.ks.lang=inpk[2];
	else if ( inpk[16] == 110 ) 	
		euc.dash.lght.ride=1-inpk[2];
	else if ( inpk[16] == 138 ){ 	
		if ( inpk[2] == 0)  {
			euc.dash.tiltSet=((inpk[5]& 0xff)  << 8) | (inpk[4] & 0xff);
			if ( 32767 < euc.dash.tiltSet ) euc.dash.tiltSet = euc.dash.tiltSet - 65536;
		}
	}else if ( inpk[16] == 162 ) 
		euc.dash.mode=inpk[4];	
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
		euc.dash.ks.serial=E.toString(inpk.slice(2,16),inpk.slice(17,20));
		euc.dash.ks.manDate=E.toString(inpk[11],inpk[12],"-",inpk[13],inpk[14],"-20",inpk[9],inpk[10]);
		euc.dash.ks.wheelColor=wc[E.toString(inpk[8])];
		euc.dash.ks.model=E.toString(inpk.slice(4,7));
		euc.dash.ks.batCap=model[euc.dash.ks.model][inpk[7]-48];
		euc.dash.ks.bms=model[euc.dash.ks.model][0];
		euc.dash.bms=euc.dash.ks.bms;
		wc=0;model=0;

	}else if ( inpk[16] == 181 ){
		if (inpk[4]==0||inpk[4]==255) euc.dash.limE[0]=0;
		else {
			euc.dash.lim[0]=inpk[4];
			euc.dash.limE[0]=1;
		}
		if (inpk[6]==0) euc.dash.limE[1]=0; 
		else {
			euc.dash.lim[1]=inpk[6];
			euc.dash.limE[1]=1;
		}
		euc.dash.lim[2]=inpk[8];
		euc.dash.lim[3]=inpk[10];
	}else if ( inpk[16] == 187 ){
		if (!euc.dash.name) {
			//euc.dash.model=String.fromCharCode.apply(String,inpk.slice(2,11));
			euc.dash.ks.type=E.toString(inpk.slice(2,inpk.indexOf(0)));
			if (euc.dash.ks.type.split("-")) {
				euc.dash.ks.firm=euc.dash.ks.type.split("-")[2];
				euc.dash.ks.name=euc.dash.ks.type.split("-")[1];
				euc.dash.name=euc.dash.ks.name;
				set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",euc.dash.name);
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
			euc.tmp.lockKey= [170,85,0,0,0,0,0,0,0,0,48+i5,48+r1,48+i7,48+r2,48+(i6 + i7 + i1) % 10,48+r3,93,20,90,90];
		//}
		euc.dash.lock=inpk[2];
	}					
	if (2<euc.dbg) print("responce:",inpk);
	if (1<euc.dbg) print("responce:",inpk[16],inpk[2]);
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
            //if (euc.busy&&euc.dbg)  print("busy",inpk);
            if (inpk[0]==188) return;
			euc.alert=0;
			if (8<euc.dbg) console.log("INPUT :",inpk);
			if (inpk[16] == 169){
				if (euc.dbg==4) console.log("INPUT :",inpk);
				euc.tmp.one(inpk);
			}else if (inpk[16] == 185){//trip-time-max_speed
				if (euc.dbg==5) console.log("INPUT :",inpk);
				euc.tmp.two(inpk);
			}else if (inpk[16] == 245){
				if (euc.dbg==6) console.log("INPUT :",inpk);
				euc.dash.ks.motorLine=inpk[6];
				euc.dash.ks.gyro=inpk[7];
				euc.dash.ks.motorHolzer=inpk[8];
				euc.dash.ks.cpuRate=inpk[14];
				euc.dash.ks.outputRate=inpk[15];
				euc.dash.pwr=inpk[15];
			}else if (inpk[16] == 246){
				if (euc.dbg==7) console.log("INPUT :",inpk);
				euc.tmp.thre(inpk);
			}else
				euc.tmp.resp(inpk);
			//haptic
			if (!euc.buzz && euc.alert) { 
				if (!w.gfx.isOn&&(euc.dash.spdC||euc.dash.ampC||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
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
				if (euc.tmp.horn) {clearTimeout(euc.tmp.horn);euc.tmp.horn=0;}
				c.writeValue(euc.cmd("doHorn")).then(function() {
					return c.writeValue(euc.cmd("setStrobeOnOff",1));
				}).then(function() {
					if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
					euc.tmp.horn=setInterval(() => {
						if (!BTN1.read()){
							if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
							c.writeValue(euc.cmd("setStrobeOnOff",0)).then(function() {		
								euc.horn=0;
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
				c.startNotifications().then(function() {
					return c.writeValue(euc.cmd("getModel"));
				}).then(function() {	
					return euc.dash.passSend?c.writeValue(euc.cmd("setPassSend")):"ok";
				}).then(function() {
					return euc.dash.ks.aUnlock?c.writeValue(euc.cmd("getLock")):"ok";
				}).then(function() {
					return euc.dash.ks.aRideC?c.writeValue(euc.cmd("setLedRideOnOff",euc.dash.ks.aRideC-1)):"ok";
				}).then(function() {
					return euc.dash.ks.aHLC?c.writeValue(euc.cmd("setLights",euc.dash.ks.aHLC)):"ok";
				}).then(function() {
					return c.writeValue(euc.cmd("getAlarms"));	
				}).then(function() {
					return euc.dash.ks.aLiftC?c.writeValue(euc.cmd("setLiftOnOff",2-euc.dash.ks.aLiftC)):"ok";
				}).then(function() {
					return euc.dash.ks.aVoiceC?c.writeValue(euc.cmd("setVoiceOnOff",2-euc.dash.ks.aVoiceC)):"ok";
				}).then(function() {
					if (euc.dash.lock&&euc.dash.ks.aUnlock&&euc.tmp.lockKey) {
						let onceUL=euc.tmp.lockKey;onceUL[16]=71;
						return c.writeValue(euc.cmd("doUnlock",onceUL));
					}
				}).then(function() {euc.run=1;
					if (2<euc.dbg) print("passstate:",euc.tmp.pass);
					if (euc.tmp.pass) {
						euc.dash.pass2=euc.dash.pass;
						euc.dash.pass="";
						face.go("dashKingsongAdvPass",0,1);
						return;
					}
				}).then(function() {
					if (!euc.dash.ks.serial) {
						return c.writeValue(euc.cmd("getSerial"));
					}
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((euc.dash.ks.aLock)?"doLock":"na")).then(function() {
						return euc.dash.ks.aOff?c.writeValue(euc.cmd("doPowerOff")):true;	
					}).then(function() {
						return euc.dash.ks.aHLD?c.writeValue(euc.cmd("setLights",euc.dash.ks.aHLD)):"ok";
					}).then(function() {
						return euc.dash.ks.aRideD?c.writeValue(euc.cmd("setLedRideOnOff",euc.dash.ks.aRideD-1)):"ok";
					}).then(function() {
						return euc.dash.ks.aLiftD?c.writeValue(euc.cmd("setLiftOnOff",2-euc.dash.ks.aLiftD)):"ok";
					}).then(function() {
						return euc.dash.ks.aVoiceD?c.writeValue(euc.cmd("setVoiceOnOff",2-euc.dash.ks.aVoiceD)):"ok";
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
			//rest					
			}else { 
				c.writeValue(euc.cmd(n,v)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err-rest");
				});
			}
			return true;
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.mac=euc.mac; euc.dash.batF=420;euc.dash.batE=320;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		if (global["\xFF"].bleHdl && global["\xFF"].bleHdl[54] && global["\xFF"].bleHdl[54].value.buffer[0]==170 && global["\xFF"].bleHdl[54].value.buffer[1]==85) {
			setTimeout(()=>{ 
				if (euc.dbg)  print("EUC: ks is initialized");
				euc.state="READY";
				c.startNotifications().then(function() {
					return euc.dash.ks.aVoiceC?euc.wri("setVoiceOnOff",2- euc.dash.ks.aVoiceC):"ok";
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
			if (euc.dash.lock==1) buzzer(250);
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
		if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.ks.aOff=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.ks.aLock=euc.aLock;	delete euc.aLck;}
		euc.off=function(err){if (euc.dbg) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (euc.dbg) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (euc.dbg) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (euc.dbg) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.tmp=0;
		global["\xFF"].bleHdl=[];
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