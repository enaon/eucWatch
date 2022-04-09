//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
if (!dash.live.ks||(dash.live.ks&&dash.live.ks.ver!=5)) dash.live.ks={"ver":5,"lift":1,"aLiftC":0,"aRideC":0,"aVoiceC":2,"aLiftD":0,"aRideD":0,"aVoiceD":0,"HL":0,"aHLC":3,"aHLD":2,"aOff":0,"aLock":0,"aUnlock":0,"city":0,"offT":0};
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
		case "setLockOnOff":dash.live.lock=val?1:0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		//pass
		case "getPass": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,20,90,90];
		case "setPass": 
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,65,20,90,90];
		case "setPassClear": 
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,66,20,90,90];
		case "setPassSend":
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,68,20,90,90]; 
		case "setPassChange":
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),48+Number(dash.live.passOld[0]),48+Number(dash.live.passOld[1]),48+Number(dash.live.passOld[2]),48+Number(dash.live.passOld[3]),0,0,0,0,0,0,65,20,90,90]; //rf 43
		case "setSpeedLimits":
			return [170,85,((dash.live.limE[0])?dash.live.lim[0]:(dash.live.limE[1])?0x00:0xFF),0x00,(dash.live.limE[1])?dash.live.lim[1]:0,0x00,dash.live.lim[2],0x00,dash.live.lim[3],0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,20,90,90];
		default:
			return val?val:[];
    }
};
euc.tmp.city=function(){
	"ram";
	if ( dash.live.amp < -1 && dash.live.ks.HL ===1 ) {
		euc.wri("setLights",3); 
		dash.live.ks.HL =3;
	}else if (euc.night && dash.live.amp >= 0) {
		if ( 15 < dash.live.spd && dash.live.ks.HL !== 1  ) {
			euc.wri("setLights",1); 
			dash.live.ks.HL =1;
		}else if ( dash.live.spd < 10 && dash.live.ks.HL !== 3  ) {
			euc.wri("setLights",3); 
			dash.live.ks.HL =3;
		}
	} else if (dash.live.amp >= 0) {
		if ( 35 < dash.live.spd && !dash.live.strobe  ) {
			euc.wri("setStrobeOnOff",1) ;
			dash.live.strobe=1;
		}else if  ( dash.live.spd < 30 && dash.live.strobe  ) { 
			euc.wri("setStrobeOnOff",0) ;
			dash.live.strobe=0;
		}else if  ( 15 < dash.live.spd && dash.live.ks.HL !== 1  ) {
			euc.wri("setLights",1); 
			dash.live.ks.HL =1;
		}else if ( dash.live.spd < 10 && dash.live.ks.HL !== 3  ) {
			euc.wri("setLights",3); 
			dash.live.ks.HL =3;
		}
	}
};
//
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
	if ( dash.live.ks.city && dash.live.spd) { 
		euc.tmp.city();
	}
					
};
euc.tmp.two=function(inpk){
	"ram";
	dash.live.trpL=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	dash.live.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	dash.live.spdM=Math.round((inpk[9] << 8 | inpk[8])/100) ;
	//dash.live.light=inpk[10]-17;
	dash.live.ks.HL=inpk[10]-17;
	dash.live.ks.onOffState=inpk[11];
	dash.live.ks.fan=inpk[12];
	dash.live.ks.charge=inpk[13];
	dash.live.ks.tempMotor=Math.round((inpk[15] << 8 | inpk[14])/100) ;
	dash.live.fan=inpk[12];
	//if (dash.live.light!=euc.tmp.light){
	//	euc.tmp.light=dash.live.light;
	//	if (!=2&&dash.live.ks.HL==2) dash.live.ks.HL=1;
	//	else if (dash.live.light==2&&dash.live.ks.HL!=2) dash.live.ks.HL=2;
	//}
	dash.live.fan=inpk[12];
					
};
euc.tmp.thre=function(inpk){
	"ram";
	dash.live.spdL=(inpk[3] << 8 | inpk[2])/100;
	dash.live.ks.totRideTime=(inpk[13] << 8 | inpk[12]);
	dash.live.ks.errorCode=(inpk[15] << 8 | inpk[14]);

	dash.live.alrm=(dash.live.spdL < dash.live.spdT && dash.live.spdL-5 < dash.live.spd)?1:0;
	almL.unshift(dash.live.alrm);
	if (20<almL.length) almL.pop();
	//haptic
	if (dash.live.alrm) euc.alert=20;
};
//
euc.tmp.resp=function(inpk){
	"ram";
	if ( inpk[16] == 63 ) 
		dash.live.ks.offT=inpk[5] << 8 | inpk[4];
	else if ( inpk[16] == 70 ) 
		euc.tmp.pass=inpk[2];
	else if ( inpk[16] == 72 ) 
		dash.live.ks.oldMode=inpk[2];
	else if ( inpk[16] == 74) 
		dash.live.ks.spectrum=inpk[2];
	else if ( inpk[16] == 76 ) 
		dash.live.ks.lift=inpk[2];
	else if ( inpk[16] == 77 ) 
		dash.live.ks.spectrumMode=inpk[2];
	else if ( inpk[16] == 82 ) 
		dash.live.ks.modeId=inpk[2];
	else if ( inpk[16] == 85 ) 
		dash.live.strb=inpk[2];
	else if ( inpk[16] == 88 ) 
		dash.live.ks.BTMusic=inpk[2];
	else if ( inpk[16] == 107 ) 
		dash.live.ks.lang=inpk[2];
	else if ( inpk[16] == 110 ) 	
		dash.live.ks.ride=1-inpk[2];
	else if ( inpk[16] == 138 ){ 	
		if ( inpk[2] == 1)  dash.live.tiltSet=inpk[5] << 8 | inpk[4];
	}else if ( inpk[16] == 162 ) 
		dash.live.mode=inpk[4];	
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
		dash.live.ks.serial=E.toString(inpk.slice(2,16),inpk.slice(17,20));
		dash.live.ks.manDate=E.toString(inpk[11],inpk[12],"-",inpk[13],inpk[14],"-20",inpk[9],inpk[10]);
		dash.live.ks.wheelColor=wc[E.toString(inpk[8])];
		dash.live.ks.model=E.toString(inpk.slice(4,7));
		dash.live.ks.batCap=model[dash.live.ks.model][inpk[7]-48];
		dash.live.ks.bms=model[dash.live.ks.model][0];
		dash.live.bms=dash.live.ks.bms;
		wc=0;model=0;

	}else if ( inpk[16] == 181 ){
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
	}else if ( inpk[16] == 187 ){
		if (!dash.live.name) {
			//dash.live.model=String.fromCharCode.apply(String,inpk.slice(2,11));
			dash.live.ks.type=E.toString(inpk.slice(2,inpk.indexOf(0)));
			if (dash.live.ks.type.split("-")) {
				dash.live.ks.firm=dash.live.ks.type.split("-")[2];
				dash.live.ks.name=dash.live.ks.type.split("-")[1];
				dash.live.name=dash.live.ks.name;
				setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",dash.live.name);
			}
		}	
	}else if ( inpk[16] == 201 ) 
		euc.lala=inpk;	
	else if ( inpk[16] == 231 ) //speedPswd
		print("in 231");
	else if ( inpk[16] == 95 ){
		if (inpk[2]==1 ){
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
		}
		dash.live.lock=inpk[2];
	}					
	if (2<euc.dbg) print("responce:",inpk);
	if (1<euc.dbg) print("responce:",inpk[16],inpk[2]);
};

//start
euc.conn=function(mac){
	"ram";
	if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
		if (euc.dbg) console.log("ble allready connected"); 
		global["\xFF"].BLE_GATTS.disconnect();return;
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:7.5})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		var inpk=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			inpk.set(event.target.value.buffer);
            if (euc.busy||inpk[0]==188){if (euc.dbg)  print("drop",inpk); return;}
			if (set.bt==4) 	euc.proxy.w(event.target.value.buffer);
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
				dash.live.ks.motorLine=inpk[6];
				dash.live.ks.gyro=inpk[7];
				dash.live.ks.motorHolzer=inpk[8];
				dash.live.ks.cpuRate=inpk[14];
				dash.live.ks.outputRate=inpk[15];
				dash.live.pwr=inpk[15];
			}else if (inpk[16] == 246){
				if (euc.dbg==7) console.log("INPUT :",inpk);
				euc.tmp.thre(inpk);
			}else
				euc.tmp.resp(inpk);
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
		if (euc.dbg) console.log("EUC Kingsong connected"); 
		euc.wri= function(n,v) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},10);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},20);
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
					return dash.live.passSend?c.writeValue(euc.cmd("setPassSend")):"ok";
				}).then(function() {
					return dash.live.ks.aUnlock?c.writeValue(euc.cmd("getLock")):"ok";
				}).then(function() {
					return dash.live.ks.aRideC?c.writeValue(euc.cmd("setLedRideOnOff",dash.live.ks.aRideC-1)):"ok";
				}).then(function() {
					return dash.live.ks.aHLC?c.writeValue(euc.cmd("setLights",dash.live.ks.aHLC)):"ok";
				}).then(function() {
					return c.writeValue(euc.cmd("getAlarms"));	
				}).then(function() {
					return dash.live.ks.aLiftC?c.writeValue(euc.cmd("setLiftOnOff",2-dash.live.ks.aLiftC)):"ok";
				}).then(function() {
					return dash.live.ks.aVoiceC?c.writeValue(euc.cmd("setVoiceOnOff",2-dash.live.ks.aVoiceC)):"ok";
				}).then(function() {
					if (dash.live.lock&&dash.live.ks.aUnlock&&euc.tmp.lockKey) {
						let onceUL=euc.tmp.lockKey;onceUL[16]=71;
						return c.writeValue(euc.cmd("doUnlock",onceUL));
					}
				}).then(function() {euc.run=1;
					if (2<euc.dbg) print("passstate:",euc.tmp.pass);
					if (euc.tmp.pass) {
						dash.live.pass2=dash.live.pass;
						dash.live.pass="";
						face.go("dashKingsongAdvPass",0,1);
						return;
					}
				}).then(function() {
					if (!dash.live.ks.serial) {
						return c.writeValue(euc.cmd("getSerial"));
					}
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((dash.live.ks.aLock)?"doLock":"na")).then(function() {
						return dash.live.ks.aOff?c.writeValue(euc.cmd("doPowerOff")):true;	
					}).then(function() {
						return dash.live.ks.aHLD?c.writeValue(euc.cmd("setLights",dash.live.ks.aHLD)):"ok";
					}).then(function() {
						return dash.live.ks.aRideD?c.writeValue(euc.cmd("setLedRideOnOff",dash.live.ks.aRideD-1)):"ok";
					}).then(function() {
						return dash.live.ks.aLiftD?c.writeValue(euc.cmd("setLiftOnOff",2-dash.live.ks.aLiftD)):"ok";
					}).then(function() {
						return dash.live.ks.aVoiceD?c.writeValue(euc.cmd("setVoiceOnOff",2-dash.live.ks.aVoiceD)):"ok";
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
			}else if (n==="proxy") {
				c.writeValue(v).then(function() {
                    clearTimeout(euc.busy);euc.busy=0;
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err-fwd");
				});
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
		if (!setter.read("dash","slot"+setter.read("dash","slot")+"Mac")) {
			dash.live.mac=euc.mac; dash.live.batF=420;dash.live.batE=320;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			setter.write("dash","slot"+setter.read("dash","slot")+"Mac",euc.mac);
		}
		if (global["\xFF"].bleHdl && global["\xFF"].bleHdl[54] && global["\xFF"].bleHdl[54].value.buffer[0]==170 && global["\xFF"].bleHdl[54].value.buffer[1]==85) {
			setTimeout(()=>{ 
				if (euc.dbg)  print("EUC: ks is initialized");
				euc.state="READY";
				c.startNotifications();
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
	"ram";
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
			if (dash.live.lock==1) buzzer(250);
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
		if ( euc.aOff==0 || euc.aOff==1 ) {dash.live.ks.aOff=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {dash.live.ks.aLock=euc.aLock;	delete euc.aLck;}
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
