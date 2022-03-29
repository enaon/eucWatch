//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
if (!euc.dash.lght) euc.dash.lght={"ride":0};
if (!euc.dash.ks||euc.dash.ks&&!euc.dash.ks.HL) euc.dash.ks={"lift":1,"aLift":0,"aRide":0,"aOff":0,"aLock":0,"aVoice":0,"HL":0};
euc.tmp={};
//commands
euc.wri=function(i) {if (set.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.cmd=function(no,val){
	switch (no) {
		//euc.wri("getParamA");
		case "manual":return val; 
		case "model":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155,20,90,90]; 
		//case "getMode":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155,20,90,90]; 
		case "serial":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90]; 
		case "getSerialNo":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90]; 
		case "alarms":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,20,90,90]; 
		case "getAlarms":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,20,90,90]; 
		case "horn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,20,90,90]; 
		case "doBeep":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,20,90,90]; 
		case "info1":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90]; 
		case "info2":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,20,90,90]; 
		//
		case "off":euc.seq=0;return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,64,20,90,90];
		//case "doPowerOff":euc.seq=0;return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,64,20,90,90];
		case "getPowerOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "setPowerOff":return [170,85,1,0,val & 255,(val >> 8) & 255,0,0,0,0,0,0,0,0,0,0,63,20,90,90];
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
		case "lightsOn":euc.seq=0;return [170,85,18,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "lightsOff": euc.seq=0;return [170,85,19,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "lightsAuto":euc.seq=0;return [170,85,20,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "lightsCity": euc.seq=0;
			return euc.night?[170,85,20,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90]: [170,85,19,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "getLightStrobe":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,20,90,90];
		case "strobeOn":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "strobeOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "getHeadLight":return  [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "getLightMagic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "setLightMagic":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,20,90,90];
		case "rideLedOn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90]; 
		case "rideLedOff":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90];
		//case "getLightCircle":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,109,20,90,90];
		//case "setLightCircle":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90];
		//case "setLightRideLed":return [170,85,val,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90];
		case "musicLedOn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,20,90,90]; 
		case "musicLedOff":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,125,20,90,90]; 
		case "setLightMusicOnOff":return [170,85,val,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,20,90,90]; 
		case "setLightMusicMode":return [170,85,val,0,0,0,0,0,0,0,0,0,0,0,0,0,151,20,90,90];
		case "getLightMusicMode":return [170,85,val,0,0,0,0,0,0,0,0,0,0,0,0,0,150,20,90,90];
		case "getLightColor":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,91,20,90,90];
		//
		case "getVoiceOnOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,20,90,90];
		case "setVoiceOnOff":return [170,85,val,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "setVoiceVolUp":return [170,85,255,0,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		case "setVoiceVolDn":return [170,85,0,255,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		//
		case "getMusic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,20,90,90];
		case "setMusic":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,86,20,90,90];
		case "setMusicNext":return [170,85,0,0,255,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		case "setMusicPrev":return [170,85,0,0,0,255,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		//
		case "calibrate": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,20,90,90];  
		//case "doCalibrate": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,20,90,90];  
		case "getGyroAround":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "setGyroAround":return [170,85,1,0,val & 255,(val >> 8) & 255,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "tiltSet":
			euc.dash.tiltSet=(99<=euc.dash.tiltSet||-99>=euc.dash.tiltSet)?0:euc.dash.tiltSet;let tiltSet=(0<=euc.dash.tiltSet)?euc.dash.tiltSet:255+euc.dash.tiltSet;
			return [170,85,1,0,tiltSet,(tiltSet<=100)?0:255,0,0,0,0,0,0,0,0,0,0,138,20,90,90]; 
		case "getGyroAbout":return [170,85,2,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "setGyroAbout":return [170,85,3,0,val & 255,(val >> 8) & 255,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "getBalabce":return [170,85,4,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "getReadV":return [170,85,6,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "setReadV":
			return [170,85,7,206,val & 255,(val >> 8) & 255,(~(val >> 8) & 255) & 255,(~(~(val >> 8) & 255) & 255) & 255,0,0,0,0,0,0,0,0,138,20,90,90];
		case "getInitV":return [170,85,7,32,0,0,255,255,0,0,0,0,0,0,0,0,138,20,90,90];
		//
		case "liftOn":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		case "liftOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90];
		//case wrong "getLiftOnOff":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		case "setLiftOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		// wrong case "getLiftOnOff":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		//
		case "getLanguage":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,106,20,90,90];
		case "setLanguage":return [170,85,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,105,20,90,90];
		//		
		case "setBmsSn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0]; 
		case "setBMS":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,1,0,122,1,129,7]; 
		case "getBattAInfo":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,20,90,90]; 
		case "getBattBInfo":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,20,90,90]; 
		case "setBattACleanFault":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,118,20,90,90]; 
		case "setBattBCleanFault":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,119,20,90,90];	
		case "getBattASleep":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,20,90,90]; 
		case "getBattBSleep":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,121,20,90,90];
		case "setBattACleanCycle":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,122,20,90,90]; 
		case "setBattBCleanCycle":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,123,20,90,90];
		//
		case "rideSoft":return [170,85,2,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];
		case "rideMed":return [170,85,1,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];
		case "rideHard":return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];  
		case "setRideMode":return [170,85,val,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];  
		case "getRideParamA":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90]; 
		case "getRideParamB":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,20,90,90]; 
		case "getRideParamC":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,148,20,90,90]; 
		//
		// < aa550100 30 30 30 30 30 30 0000000000005f145a5a
		// > aa550000000000000000 37 32 34 30 38 35 5d145a5a
		case "doLockOnce":euc.dash.lock=1;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,20,90,90]; 
		case "setLockOnOff":euc.dash.lock=val?1:0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		case "getLock":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "lock":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0x5d,20,90,90]; 
		case "doUnlock":return val; 
		case "unlock": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "unlock0":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x37,0x32,0x34,48,0x38,0x35,0x5D,20,90,90];
		case "unlock1":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x31,0x35,0x36,0x38,0x32,0x32,0x5d,20,90,90];
		case "unlock2":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x39,0x38,0x32,0x39,0x34,0x36,0x47,20,90,90];
		case "unlock3":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x39,48,0x34,0x31,0x33,0x39,0x5d,20,90,90];
		case "unlock4":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x47,20,90,90]; //ok for s18 old
		case "unlock5":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x37,0x32,0x34,48,0x38,0x35,0x47,20,90,90];
		case "unlock6":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x5D,20,90,90]; //ok for s18 old
		//case "unlock":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x47,20,90,90];
		case "passSend":
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,68,20,90,90]; 
		case "passChange":
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),48+Number(euc.dash.passOld[0]),48+Number(euc.dash.passOld[1]),48+Number(euc.dash.passOld[2]),48+Number(euc.dash.passOld[3]),0,0,0,0,0,0,0x41,20,90,90]; //rf 43
		case "passClear": 
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,0x42,20,90,90];  //rf 43
		case "passSet": 
			return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,0x41,20,90,90]; //rf 43
		case "setSpeedLimits":
			return [170,85,((euc.dash.limE[0])?euc.dash.lim[0]:(euc.dash.limE[1])?0x00:0xFF),0x00,(euc.dash.limE[1])?euc.dash.lim[1]:0,0x00,euc.dash.lim[2],0x00,euc.dash.lim[3],0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,20,90,90]; //speed in kph, rf A4
    }
};

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
	if ( euc.dash.aLight === "lightsCity" ) { 
		if ( euc.dash.amp < -1 && euc.dash.ks.HL ===1 ) {
			euc.wri("lightsAuto"); 
		}else if (euc.night && euc.dash.amp >= 0) {
			if ( 20 < euc.dash.spd && euc.dash.ks.HL !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( euc.dash.spd < 10 && euc.dash.ks.HL !== 2  ) 
				euc.wri("lightsAuto") ;
		} else if (euc.dash.amp >= 0) {
			if ( 35 < euc.dash.spd && !euc.dash.strobe  ) 
				euc.wri("strobeOn") ;
			else if  ( euc.dash.spd < 30 && euc.dash.strobe  ) 
				euc.wri("strobeOff") ;
			else if  ( 25 < euc.dash.spd && euc.dash.ks.HL !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( euc.dash.spd < 15 && euc.dash.ks.HL !== 2  ) 
				euc.wri("lightsAuto") ;
		}
	}
					
};
euc.tmp.two=function(inpk){
	euc.dash.trpL=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	euc.dash.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	euc.dash.spdM=Math.round((inpk[9] << 8 | inpk[8])/100) ;
	euc.dash.light=19-inpk[10];
	if (euc.dash.light!=euc.tmp.light){
		euc.tmp.light=euc.dash.light;
		if (euc.dash.light&&!euc.dash.ks.HL) euc.dash.ks.HL=1;
		else if (!euc.dash.light&&euc.dash.ks.HL) euc.dash.ks.HL=0;
	}
	euc.dash.fan=inpk[12];
					
};
euc.tmp.thre=function(inpk){
	euc.dash.spdL=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.alrm=(euc.dash.spdL < euc.dash.spdT && euc.dash.spdL-5 < euc.dash.spd)?1:0;
	almL.unshift(euc.dash.alrm);
	if (20<almL.length) almL.pop();
	//haptic
	if (euc.dash.alrm) euc.alert=20;
};
euc.tmp.four=function(inpk){
	//console.log("model");
	if (!euc.dash.name) {
		euc.dash.model=String.fromCharCode.apply(String,inpk.slice(2,11));
		euc.dash.name=String.fromCharCode.apply(String,inpk.slice(5,8));
		if (euc.dash.model.includes("-")) {
			let model=euc.dash.name.split("-")[0];
			if (model.includes("S18") || model.includes("18L") ||  model.includes("18XL") || model.includes("16X") )
				euc.dash.bms = 1.25;
			else 
				euc.dash.bms = 1;
		} else euc.dash.bms=1.25;
		set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",euc.dash.name);
	}	
};	
//start
euc.conn=function(mac){
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
			inpk.set(event.target.value.buffer);
			//let inpk=event.target.value.buffer;
			//console.log("in :",inpk);
			//return;
            if (euc.busy) return;
			euc.alert=0;
			//if (set.def.cli) console.log("lll",inpk);
			switch (inpk[16]){				
				case  169:
					euc.tmp.one(inpk);
					break;
				case 185://trip-time-max_speed
					euc.tmp.two(inpk);
					break;
				case 245:
					euc.dash.pwr=inpk[15];
					break;
				case 246:
					euc.tmp.thre(inpk);
					break;	
				case 181:
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
					break;
				case 179://serial
					euc.dash.serial=String.fromCharCode.apply(String,inpk.slice(2,14))+String.fromCharCode.apply(String,inpk.slice(17,3));
					break;
				case 187://model
					euc.tmp.four(inpk);
					break;
				default: 
					if ( inpk[16] == 76) 
						euc.dash.ks.lift=inpk[2];
					else if ( inpk[16] == 85) 
						euc.dash.strb=inpk[2];
					else if ( inpk[16] == 110) 	
						euc.dash.lght.ride=1-inpk[2];
					else if ( inpk[16] == 95){
						if (inpk[2]==1 ){
							let r1=(Math.random()*10)|0;
							let r2=(Math.random()*10)|0;
							let r3=(Math.random()*10)|0;
							let i1 = inpk[8]==0?5:inpk[8]-48;
							let i2 = inpk[4]==0?1:inpk[4]-48;
							let i3 = inpk[6]==0?4:inpk[6]-48;
							let i4 = r1 + r2 + r3;
							let i5 = (((i2 + i4) + i3) + i1) % 10;
							let i6 = i4 + i5;
							let i7 = ((i3 + i6) + i1) % 10;
							let outp= [170,85,0,0,0,0,0,0,0,0,48+i5,48+r1,48+i7,48+r2,48+(((i6 + i7) + i1) % 10),48+r3,93,20,90,90];
							print("Got new key:",outp);
							euc.dash.lock?euc.wri ("doUnlock",outp):euc.dash.ks.lockKey=outp;
						}
						euc.dash.lock=inpk[2];
						//euc.dash.lght.ride=1-inpk[2];	
					}					
					else if ( inpk[16] == 63) 
						euc.dash.ks.offT=inpk[5] << 8 | inpk[4];
					//	
					//if (set.def.cli) console.log(inpk);
					print(inpk[16],inpk[2]);
					break;
			}
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
		if (set.def.cli) console.log("EUC Kingsong connected"); 
		euc.wri= function(n,v) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},20);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},50);
			//if (n=="end") c.stopNotifications();
			if (n=="hornOn"){
				euc.horn=1;
				if (euc.tmp.horn) {clearTimeout(euc.tmp.horn);euc.tmp.horn=0;}
				c.writeValue(euc.cmd("lock")).then(function() {
					euc.dash.lock=1;
					return c.writeValue(euc.cmd("lightsOn"));
				}).then(function() {	
					euc.dash.strb=1;
					return c.writeValue(euc.cmd("strobeOn"));
				}).then(function() {
					if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
					euc.tmp.horn=setInterval(() => {
						if (!BTN1.read()){
							if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
							c.writeValue(euc.cmd("unlock")).then(function() {		
								euc.dash.lock=0;
								euc.dash.strb=0;
								return c.writeValue(euc.cmd("strobeOff"));
							}).then(function() {
								euc.horn=0;
								if (euc.busy){clearTimeout(euc.busy);euc.busy=0;}
								return c.writeValue(euc.cmd(euc.dash.aLight));
							});
						}
					}, 200); 
				});
			} else if (n=="hornOff") {
				euc.horn=0;
				if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				return;
			} else if (n==="start") {
				c.writeValue(euc.cmd((euc.dash.passSend)?"passSend":(euc.dash.ks.aLock)?"getLock":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto")).then(function() {
				}).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					return c.writeValue(euc.cmd((euc.dash.ks.aLock&&euc.dash.passSend)?"getLock":(euc.seq==0)?(euc.dash.lght.ride)?"rideLedOn":"rideLedOff":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return (euc.seq==0)?(euc.dash.ks.aLock||euc.dash.passSend)?c.writeValue(euc.cmd((euc.dash.lght.ride)?"rideLedOn":"rideLedOff")):"ok":c.writeValue(euc.cmd((euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return ((euc.dash.ks.aLock&&euc.dash.passSend)?c.writeValue(euc.cmd((euc.dash.lght.ride)?"rideLedOn":"rideLedOff")):"ok");
				}).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					return c.writeValue(euc.cmd("alarms"));	
				}).then(function() {
					euc.run=1;
					return c.writeValue(euc.cmd("model"));
				}).then(function() {
					if (euc.dash.ks.aLift) euc.dash.ks.lift=0;
					return ((euc.dash.ks.aLift)?c.writeValue(euc.cmd("liftOff")):"ok");
				}).then(function() {
					euc.run=1;
					print("dd",euc.dash.lock,euc.dash.ks.lockKey)
					return (euc.dash.lock&&euc.dash.ks.lockKey)?c.writeValue(euc.cmd("doUnlock",euc.dash.ks.lockKey)):"ok";	
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((euc.dash.ks.aLock)?"lock":"lightsOff")).then(function() {
						return ((euc.dash.ks.aOff)?c.writeValue(euc.cmd("off")):true);	
					}).then(function() {
						return ((euc.seq)?c.writeValue(euc.cmd("lightsOff")):true);
					}).then(function() {
						return ((euc.dash.ks.aRide)?c.writeValue(euc.cmd("rideLedOff")):true);	
					}).then(function() {
						return ((euc.dash.ks.aLift)?c.writeValue(euc.cmd("liftOn")):true);
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
		if (global["\xFF"].bleHdl && global["\xFF"].bleHdl[54] && global["\xFF"].bleHdl[54].value.buffer[0]!=65 && global["\xFF"].bleHdl[54].value.buffer[0]!=188) {
			setTimeout(()=>{ 
				print("EUC: ks is initialized");
				euc.state="READY";
				c.startNotifications();
			},500);
		}else {
			euc.dash.ks.lockKey=0;
			buzzer([90,40,150]);
			c.startNotifications().then(function() {
				euc.wri("start");
				euc.state="READY";
			});
		}
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (set.def.cli) console.log("EUC error :",err);
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
			if (euc.dash.lock==1) buzzer(250);
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
		if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.ks.aOff=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.ks.aLock=euc.aLck;	delete euc.aLck;}
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