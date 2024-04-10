//Inmotion V10 module- code based on freestyl3r'wor
E.setFlags({ pretokenise: 1 });
euc.cmd=function(no,val){
  if (ew.is.bt===2) console.log("inmotion: send cmd :",no);
  let cmd;
  switch (no) {
    case "info": return new Uint8Array([0xAA, 0xAA, 0x14, 0x01, 0xA5, 0x55, 0x0F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x08, 0x05, 0x00, 0x01, 0x7F]);
    case "batLevelData": return new Uint8Array([0xAA, 0xAA, 0x14, 0x01, 0xA5, 0x55, 0x0F, 0x00, 0x00, 0x00, 0x15, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x01, 0x9C]);
    case "live": return new Uint8Array([0xAA, 0xAA, 0x13, 0x01, 0xA5, 0x55, 0x0F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x08, 0x05, 0x00, 0x00, 0x7D]);
    case "init": return new Uint8Array([0xAA, 0xAA, 0x07, 0x03, 0xA5, 0x55, 0x0F, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x9B]);
    case "calibration": return new Uint8Array([0xAA, 0xAA, 0x19, 0x01, 0xA5, 0x55, 0x0F, 0x32, 0x54, 0x76, 0x98, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x1F]);
    case "horn": return new Uint8Array([0xAA, 0xAA, 0x09, 0x06, 0xA5, 0x55, 0x0F, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x84]);
    case "beep": return new Uint8Array([0xAA, 0xAA, 0x09, 0x06, 0xA5, 0x55, 0x0F, 0x15, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x95]);
    case "led": return new Uint8Array([0xAA, 0xAA, 0x09, 0x06, 0xA5, 0x55, 0x0F, 0x15, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x95]);
    case "end": return new Uint8Array([0x55, 0x55]);

    case "playSound"://cmd=0-23
      cmd = new Uint8Array([0xAA, 0xAA, 0x09, 0x06, 0xA5, 0x55, 0x0F, val, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "setVolume"://cmd=0-100
      v = val * 100
      cmd = new Uint8Array([0xAA, 0xAA, 0x0A, 0x06, 0xA5, 0x55, 0x0F, v & 0xFF, (v >> 8) & 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "setLights"://val=0|1
      if (val!=0 && val!=1) return new Uint8Array([0]);
      cmd = new Uint8Array([0xAA, 0xAA, 0x0D, 0x01, 0xA5, 0x55, 0x0F, val, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "setBrightness":
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2B, val, 0x00]);
      break;
    case "setRideMode"://val=0=clasic|1=comfort
      if (val!=0 && val!=1) return new Uint8Array([0]);
      cmd = new Uint8Array([0xAA, 0xAA, 0x15, 0x01, 0xA5, 0x55, 0x0F, 0x00, 0x00, 0x00, 0x00, val, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "setPpedalTilt": //val=-80-+80
      viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
      viw.setInt32( 0, val * 65536 / 10  );
      cmd = new Uint8Array([0xAA, 0xAA, 0x15, 0x01, 0xA5, 0x55, 0x0F, 0x00, 0x00, 0x00, 0x00, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "setPedalSensitivity": //val=-80-+80
      viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
      viw.setInt32( 0, val * 65536 / 10  );
      cmd = new Uint8Array([0xAA, 0xAA, 0x15, 0x01, 0xA5, 0x55, 0x0F, 0x00, 0x00, 0x00, 0x00, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "speedLimit":
      viw = new DataView(new Int8Array(2).buffer); //to int16 BI.
      viw.setInt16( 0, val*1000 );
      cmd = new Uint8Array([0xAA, 0xAA, 0x15, 0x01, 0xA5, 0x55, 0x0F, 0x01, 0x00, 0x00, 0x00, viw.buffer[1], viw.buffer[0], 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "control"://15=ledOn|16=ledOff|5=powerOff|17=beep|
      cmd = new Uint8Array([0xAA, 0xAA, 0x16, 0x01, 0xA5, 0x55, 0x0F, 0xB2, 0x00, 0x00, 0x00, val, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "pincode"://
      cmd = new Uint8Array([0xAA, 0xAA, 0x07, 0x03, 0xA5, 0x55, 0x0F, val, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "alert"://
      cmd = new Uint8Array([0xAA, 0xAA, 0x01, 0x01, 0xA5, 0x55, 0x0F, val, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
    case "sethandleButton"://val=0|1
      if (val!=0 && val!=1) return new Uint8Array([0]);
      cmd = new Uint8Array([0xAA, 0xAA, 0x2E, 0x01, 0xA5, 0x55, 0x0F, val, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00]);
      break;
  }
  cmd.set([cmd.reduce(checksumN, 7) & 0xFF], cmd.length - 1);
  return cmd;
};

function checksum(check, val) {
  return (check + val) & 255;
}

function checksumN(check, val) {
  return (check + val);
}
//cmd=[[0xAA, 0xAA, 0x13, 0x01, 0xA5, 0x55, 0x0F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x08, 0x05, 0x00, 0x01]
//cmd.push(cmd.reduce(checksum));
function validateChecksum(buffer) {
  let receivedChecksum = buffer[buffer.length - 3];
  let array = new Uint8Array(buffer.length - 3);
  array.set(buffer);
  let calculatedChecksum = array.reduce(checksum,7)&0xFF;
  return receivedChecksum == calculatedChecksum;
}
function appendBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

function getModelName(id) {
  switch (id) {
    case "50": return "V5";
    case "51": return "V5PLUS";
    case "52": return "V5F";
    case "53": return "V5D";
    case "80": return "V8";
    case "86": return "V8F";
    case "87": return "V8S";
    case "100": return "V10S";
    case "101": return "V10SF";
    case "140": return "V10";
    case "141": return "V10F";
    case "142": return "V10T";
    case "143": return "V10FT";
  }
  return "UNKNOWN";
}

euc.temp.infoParse = function (inc){
  let lala = new DataView(inc);
  euc.is.lastGetInfo = getTime();
  //light
  euc.dash.opt.lght.HL=lala.getUint8(99);
  //led
  if(lala.byteLength>149) euc.dash.opt.lght.led=lala.getUint8(149);
  //volume
  if (lala.byteLength>145)
    euc.dash.opt.snd.vol=((lala.getUint8(145) << 8) | lala.getUint8(144)) / 100;
  if (euc.temp.infoGet) return;
  //firmware
  euc.dash.info.get.firmMJ=lala.getUint8(46);
  let v1=lala.getUint8(45);
  let v2=((lala.getUint8(44) << 8) | lala.getUint8(43));
  euc.dash.info.get.firm=[euc.dash.info.get.firmMJ, v1, v2].join('.');
  //serial
  let serial = new String('');
  let tByte;
  for (i=26; i > 18; i--) {
    tByte=lala.getUint8(i);
    if (tByte<0x10)
      serial=serial + '0' + tByte.toString(16);
    else
      serial=serial + tByte.toString(16);
  }
  euc.dash.info.get.serl=serial.toUpperCase();
  //manufacture date
  let year = 2000 + lala.getUint8(26);
  let month = ((lala.getUint8(25) & 0xF0) >> 4);
  let date = ((lala.getUint8(25) & 0x0F) << 4) | (lala.getUint8(24) & 0x0F);
  euc.dash.info.get.manD=[year.toString(10), month.toString(10), date.toString(10)].join('-');
  //model
  let modelId=lala.getUint8(126).toString(10)+lala.getUint8(123).toString(10)
  euc.dash.info.get.modl=getModelName(modelId);
  euc.dash.info.get.makr="InmotionV10";
  if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Name") || ew.do.fileRead("dash","slot"+"1"+"Name") != euc.dash.info.get.modl) {
    ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Name",euc.dash.info.get.modl);
  }
  euc.temp.infoGet=1;
  return;
}

euc.temp.liveParse = function (inc){
  let lala = new DataView(inc);
  euc.is.alert=0;
  euc.is.lastGetLive = getTime();
  //values
  //spd
  euc.dash.live.spd=(lala.getInt32(31, true)+lala.getInt32(35, true))/2000;
  if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
  if (euc.dash.live.spd<0) euc.dash.live.spd=-euc.dash.live.spd;
  euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;
  if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 )
  euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ;
  //volt
  euc.dash.live.volt=lala.getUint32(43, true)/100;
  //batt
  euc.dash.live.bat=Math.round(100* (euc.dash.live.volt*(100/euc.dash.opt.bat.pack) - euc.dash.opt.bat.low )  / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low) );
  euc.log.batL.unshift(euc.dash.live.bat);
  if (20<euc.log.batL.length) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;
  if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;
  //temp
  euc.dash.live.tmpM=lala.getInt8(51);
  if((euc.dash.info.get.modl == "V8F" || euc.dash.info.get.modl == "V8S") && euc.dash.info.get.firmMJ >= 102) euc.dash.live.tmp=lala.getInt8(51);
  else euc.dash.live.tmp=lala.getInt8(53);
  euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++;
  //amp
  euc.dash.live.amp= lala.getInt16(39, true) / 100;
  //log
  euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
  if (20<euc.log.ampL.length) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
    if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
    else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
  }
  //trip
  //print(euc.dash.trip.last);
  euc.dash.trip.totl=lala.getUint32(63, true)/1000;
  if(!euc.dash.trip.startStrip) euc.dash.trip.startStrip=euc.dash.trip.totl;
//  euc.dash.trip.last=lala.getInt32(67, true)/1000;
  euc.dash.trip.last=euc.dash.trip.totl-euc.dash.trip.startStrip;
  euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
  //mode
  euc.dash.opt.ride.mode=lala.getInt32(81, true);
  //haptic
  if (!euc.is.buzz && euc.is.alert) {
    if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face],0);
    //else face.off(6000);
    euc.is.buzz=1;
    if (20 <= euc.is.alert) euc.is.alert = 20;
    var a = [100];
    while (5 <= euc.is.alert) {
      a.push(200,500);
      euc.is.alert = euc.is.alert - 5;
    }
    let i;
    for (i = 0; i < euc.is.alert ; i++) {
      a.push(200,150);
    }
    buzzer.euc(a);
    setTimeout(() => { euc.is.buzz = 0; }, 3000);
  }
};

euc.temp.alertParse= function (inc){
	//let lala = new DataView(inc);
	euc.dash.alrt.id = inc[6];
	euc.dash.alrt.val = (inc[9] * 256) | (inc[8] & 0xFF);
	euc.dash.alrt.val2 = (inc[13] * 256 * 256 * 256) | ((inc[12] & 0xFF) * 256 * 256) | ((inc[11] & 0xFF) * 256) | (inc[10] & 0xFF);
	euc.dash.alrt.speed = Math.abs((euc.dash.alrt.val2 / 3812.0) * 3.6);
	switch (euc.dash.alrt.id) {
		case 3:	euc.dash.alrt.text = ("LIFT");break;
		case 5:euc.dash.alrt.text = ("START");	break;
		case 6:euc.dash.alrt.text = ("TILTBACK at speed "+euc.dash.alrt.speed+" at limit "+(euc.dash.alrt.val / 1000.0));break;
		case 14:euc.dash.alrt.text = ("HELLO");break;
		case 25:euc.dash.alrt.text = ("FALL");break;
		case 29:euc.dash.alrt.text = ("REPAIR: bad battery cell found. At voltage: "+ (euc.dash.alrt.val2 / 100.0));break;
		case 32:euc.dash.alrt.text = ("LOW BATTEY at voltage :" + (euc.dash.alrt.val2 / 100.0));break;
		case 33:euc.dash.alrt.text = ("CUT-OFF at speed :"+euc.dash.alrt.speed);break;
		case 38:euc.dash.alrt.text = ("HIGH LOAD at speed :"+euc.dash.alrt.speed+" and current :"+(euc.dash.alrt.val / 1000.0));break;
		default:euc.dash.alrt.text = ("Unknown Alert: "+ euc.dash.alrt.val+","+euc.dash.alrt.val2);
	}
	//euc.emit('alert',euc.dash.alrt.text);
};
//
euc.temp.inpk = function(event) {
  if (ew.is.bt===2&&euc.dbg==3) console.log("Inmotion: packet in ",event.target.value.buffer);
  //gather package
  let inc=event.target.value.buffer;
  euc.temp.tot=E.toUint8Array(euc.temp.last,inc);
  euc.temp.last=E.toUint8Array(euc.temp.tot.buffer);
  if (ew.is.bt===5) euc.proxy.w(inc);
  //got package
  if ( !((inc.length==1 && inc[0]==0x55) || (inc[inc.length - 2]==0x55 && inc[inc.length - 1]==0x55)) ) {
    delete inc;
    return;
  }
  delete inc;
  euc.temp.last = E.toUint8Array();
  if (ew.is.bt===2) console.log("Inmotion: in: length:",euc.temp.tot.buffer.length," data :",[].map.call(euc.temp.tot, x => x.toString(16)).toString());
  //live pckg
  if (euc.temp.tot.buffer[2]===0x13) {
    if (euc.temp.tot.length==euc.temp.pckL) {
      if (ew.is.bt===2) console.log("Inmotion: live in");
      euc.temp.liveParse(euc.temp.tot.buffer);
      return;
    } else {
      let temp=E.toUint8Array(euc.temp.tot.buffer);
      let d=0;
      for (let i = 15; i < temp.length; i++) {
        if (temp[i]===0xA5) {
          temp.set(temp.subarray(i+1),i);
          d++;
        }
      }
      temp = new Uint8Array(temp.subarray(0, temp.length - d));
      if (!validateChecksum(temp)) {
        if (ew.is.bt===2) console.log("Inmotion: problem: length:",  temp.length, " data:",[].map.call(temp, x => x.toString(16)).toString());
        return;
      }
      if (ew.is.bt===2) console.log("Inmotion: live in fixed : length: :", temp.length);
      euc.temp.pckL=temp.length;
      euc.temp.liveParse(E.toUint8Array(temp).buffer);
      return;
    }
  }
  //info pckg
  if (euc.temp.tot.buffer[2]===0x14) {
    if (euc.temp.tot.length==euc.temp.pckI) {
      if (ew.is.bt===2) console.log("Inmotion: info in");
    } else {
      if (!validateChecksum(euc.temp.tot.buffer)) {
        if (ew.is.bt===2) console.log("Inmotion: info packet error checksum. Skipping");
        return;
      }
      if (ew.is.bt===2) console.log("Inmotion: info packet checksum PASS");
      euc.temp.pckI=euc.temp.tot.length;
    }
    euc.temp.infoParse(euc.temp.tot.buffer);
    return;
  }
  //rest
  if (euc.temp.tot.buffer[2]===1) {
    if (ew.is.bt===2) console.log("Inmotion: ALERT in, length :",euc.temp.tot.buffer.length,", check:",euc.temp.chk);
    euc.temp.alertParse(euc.temp.tot.buffer);
    return;
  }
  if (ew.is.bt===2) console.log("Inmotion: unknown in, length :",euc.temp.tot.buffer.length,", check:",euc.temp.chk);
  return;
};

euc.temp.live= function(){
	if (getTime() - euc.is.lastGetLive < 0.5) return;
	if (euc.tout.busy) return;
	euc.tout.busy = 1;
	euc.temp.wCha.writeValue(new Uint8Array([0xAA, 0xAA, 0x13, 0x01, 0xA5, 0x55, 0x0F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x08, 0x05, 0x00, 0x00, 0x7D]))
	.then(function() { return euc.temp.wCha.writeValue(new Uint8Array([0x55, 0x55]))
	}).then(function() {
		if (getTime() - euc.is.lastGetInfo < 1) return;
		return euc.temp.wCha.writeValue(new Uint8Array([0xAA, 0xAA, 0x14, 0x01, 0xA5, 0x55, 0x0F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x08, 0x05, 0x00, 0x01, 0x7F]))
	}).then(function() {
		if (getTime() - euc.is.lastGetInfo < 1) return;
		return euc.temp.wCha.writeValue(new Uint8Array([0x55, 0x55]))
	}).then(function() { return euc.tout.busy = 0
	}).catch(function(err)  {
		if (ew.is.bt===2) console.log("EUC InmotionV1: live write fail");
	});
};
//
euc.wri=function(i) {if (ew.is.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	if (ew.is.bt===2) console.log("EUCInmotionV1 init");
	euc.temp.infoGet=0;
	euc.dash.trip.startStrip=0;
	if (euc.tout.alive) {clearTimeout(euc.tout.alive); euc.tout.alive=0};
	if (euc.gatt && euc.gatt.connected) {
		return euc.gatt.disconnect();
	}
	if (euc.tout.reconnect) {clearTimeout(euc.tout.reconnect); euc.tout.reconnect=0;}
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
		.then(function(g) {
			euc.gatt=g;
			return euc.gatt.getPrimaryService(0xffe5);
		}).then(function(s) {
			euc.temp.serv=s;
			return euc.temp.serv.getCharacteristic(0xffe9); // write
		}).then(function(wc) {
			euc.temp.wCha=wc;//write
			return euc.gatt.getPrimaryService(0xffe0);
		}).then(function(s) {
			euc.temp.serv=s;
			return euc.temp.serv.getCharacteristic(0xffe4);//read
		}).then(function(rc) {
			euc.temp.rCha=rc;
			euc.temp.last = [];
			euc.temp.chk = [];
			//read
			euc.temp.rCha.on('characteristicvaluechanged', euc.temp.inpk);
			//on disconnect
			euc.gatt.device.on('gattserverdisconnected', euc.off);
			return  rc;
		}).then(function(c) {
			//connected
			if (ew.is.bt===2) console.log("EUC InmotionV1: Connected");
			euc.state="READY"; //connected
			buzzer.nav([90,40,150,40,90]);
			euc.dash.opt.lock.en=0;
			//write function
			euc.wri=function(cmd,value){
				if (euc.tout.eucWrite) {
					clearTimeout(euc.tout.eucWrite);
					euc.tout.eucWrite=0;
				}
				if (euc.tout.busy) {
					if (cmd!=="proxy") {
						euc.tout.eucWrite=setTimeout(function() {euc.wri(cmd,value)},50);
					}
					return;
				}
				euc.tout.busy = 1;
				if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
				if (ew.is.bt===2) console.log("Inmotion cmd: ", cmd);
				//off
				if (cmd==="hornOn") {
					//if (euc.is.horn) return;
					euc.is.horn=1;
					//euc.temp.rCha.stopNotifications();
					if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
					euc.tout.loop=setTimeout(() => {euc.tout.loop=0;
						euc.temp.wCha.writeValue(euc.cmd("playSound",euc.dash.opt.horn.mode)).then(function()  {
								return euc.temp.wCha.writeValue(euc.cmd("end"));
							}).then(function()  {
								euc.tout.loop=0;
								euc.tout.busy=0;
							});
				  	},150);
				}else if (cmd==="hornOff") {
					euc.is.horn=0;
					euc.tout.busy=0;
					return;
				}else if (euc.state==="OFF"||cmd==="end") {
					if (euc.gatt && euc.gatt.connected) {
						if (euc.tout.loopEnd) {clearTimeout(euc.tout.loopEnd); euc.tout.loopEnd=0;}
						euc.tout.loopEnd=setTimeout(function(){
							euc.tout.loopEnd=0;
							euc.gatt.disconnect();
						},1000);
						if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
						euc.tout.loop=setTimeout(function(){
							euc.tout.loop=0;
							if (euc.dash.auto.onD.off||euc.temp.aOff) {
								euc.temp.wCha.writeValue(euc.cmd("control",5)).then(function() {
									return euc.temp.wCha.writeValue(euc.cmd("end"));
								}).then(function(err)  {
									euc.off("power off");
								}).catch(euc.off);
								return;
							}
							euc.temp.wCha.writeValue(euc.cmd("setLights",(euc.dash.auto.onC.HL)?0:2)).then(function() {
								return euc.temp.wCha.writeValue(euc.cmd("end"));
							}).then(function()  {
								if (euc.tout.loopEnd) {clearTimeout(euc.tout.loopEnd); euc.tout.loopEnd=0;}
								euc.gatt.disconnect();
								//euc.state="OFF";
								//euc.off("end");
							}).catch(euc.off);
						},400);
					}else {
						euc.state="OFF";
						euc.off("not connected");
						return;
					}
					euc.tout.busy=0;
				}else if (cmd==="start") {
					euc.temp.wCha.writeValue(euc.cmd("init")).then(function() {
						return euc.temp.wCha.writeValue(euc.cmd("end"));
					}).then(function()  {
						return (euc.dash.auto.onC.HL)?euc.temp.wCha.writeValue(euc.cmd("setLights",(euc.dash.opt.lght.HL)?1:0)):"ok";
					}).then(function()  {
						return (euc.dash.auto.onC.HL)?euc.temp.wCha.writeValue(euc.cmd("end")):"ok";
					}).then(function()  {
						return euc.temp.rCha.startNotifications();
					}).then(function()  {
						if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
						euc.tout.loop=setTimeout(function(){
							euc.tout.loop=0;euc.is.run=1;euc.tout.busy=0;
							euc.tout.intervalLive=setInterval(function(){
								try {
									euc.temp.live();
								} catch(e) { return }
							},200);
						},1000);
					}).catch(euc.off);
				} else if (cmd==="proxy") {
					euc.temp.wCha.writeValue(value)
					.then(function() { return euc.tout.busy=0})
					.catch(euc.off);
				} else {
					euc.temp.wCha.writeValue(euc.cmd(cmd,value))
					.then(function() {return euc.temp.wCha.writeValue(euc.cmd("end"))})
					.then(function() {return euc.tout.busy=0})
				}
			};
			if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Mac")) {
				euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=420;
				euc.dash.opt.bat.pack=1.25;//84 volts
				euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
				ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Mac",euc.mac);
			}
			//euc.wri("start");
			setTimeout(() => {euc.wri("start");}, 200);
		//reconnect
		}).catch(euc.off);
};
