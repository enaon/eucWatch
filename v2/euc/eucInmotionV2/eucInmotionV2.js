//Inmotion V2 module- code based on https://github.com/Wheellog/Wheellog.Android
E.setFlags({ pretokenise: 1 });
/*
  //info type:
  NoOp(0),
  Version=1,
  info=2,
  Diagnostic=3,
  live=4,
  bms=5,
  Something1=16,
  stats=17,
  Settings=32,
  control=96;
*/
euc.cmd=function(no,val){
  let cmd;
  euc.temp.last=no;
  switch (no) {
    case "live": return new Uint8Array([0xAA, 0xAA, 0x14, 0x01, 0x04, 0x11]);
    case "stats": return new Uint8Array([0xAA, 0xAA, 0x14, 0x01, 0x11, 0x04]);
    case "getSettings": return new Uint8Array([0xAA, 0xAA, 0x14, 0x02, 0x20, 0x20, 0x16]);
    case "getVer": return new Uint8Array([0xAA, 0xAA, 0x11, 0x02, 0x02, 0x06, 0x17]);
    case "getSN": return new Uint8Array([0xAA, 0xAA, 0x11, 0x02, 0x02, 0x02, 0x13]);
    case "getType": return new Uint8Array([0xAA, 0xAA, 0x11, 0x02, 0x02, 0x01, 0x10]);
    case "getUseless": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x10, 0x00, 0x01, 0x06]);
    case "drlOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2D, 0x01, 0x5B]);
    case "drlOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2D, 0x00, 0x5A]);
    case "lightsOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x50, 0x01, 0x26]);
    case "lightsOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x50, 0x00, 0x27]);
    case "fanOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x43, 0x01, 0x35]);
    case "fanOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x43, 0x00, 0x34]);
    case "fanQuietOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x38, 0x01, 0x4E]);
    case "fanQuietOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x38, 0x00, 0x4F]);
    case "liftOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2E, 0x01, 0x58]);
    case "liftOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2E, 0x00, 0x59]);
    case "lock": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x31, 0x01, 0x47]);
    case "unlock": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x31, 0x00, 0x46]);
    case "transportOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x32, 0x01, 0x44]);
    case "transportOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x32, 0x00, 0x45]);
    case "rideComfort": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x23, 0x00, 0x54]);
    case "rideSport": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x23, 0x01, 0x55]);
    case "performanceOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x24, 0x01, 0x52]);
    case "performanceOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x24, 0x00, 0x53]);
    case "remainderReal": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x3D, 0x01, 0x4B]);
    case "remainderEst": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x3D, 0x00, 0x4A]);
    case "lowBatLimitOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x37, 0x01, 0x41]);
    case "lowBatLimitOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x37, 0x00, 0x40]);
    case "usbOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x3C, 0x01, 0x4A]);
    case "usbOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x3C, 0x00, 0x4B]);
    case "loadDetectOn": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x36, 0x01, 0x40]);
    case "loadDetectOff": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x36, 0x00, 0x41]);
    case "mute": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2C, 0x00, 0x5B]);
    case "unmute": return new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2C, 0x01, 0x5A]);
    case "calibration": return new Uint8Array([0xAA, 0xAA, 0x14, 0x05, 0x60, 0x42, 0x01, 0x00, 0x01, 0x33]);
    case "speedLimit":
      v = val * 100;
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x04, 0x60, 0x21, v & 0xFF, (v >> 8) & 0xFF, 0x00]);
      break;
    case "pedalTilt":
      v = val * 100;
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x04, 0x60, 0x22, v & 0xFF, (v >> 8) & 0xFF, 0x00]);
      break;
    case "pedalSensitivity":
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x04, 0x60, 0x25, val, 0x64, 0x00]);
      break;
    case "setBrightness":
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x2B, val, 0x00]);
      break;
    case "setVolume":
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x03, 0x60, 0x26, val, 0x00]);
      break;
    case "playSound":
      cmd = new Uint8Array([0xAA, 0xAA, 0x14, 0x04, 0x60, 0x51, val, 0x01, 0x00]);
      break;
  }
  cmd.set([cmd.reduce(checksum, 0) & 0xFF], cmd.length - 1);
  return cmd;
};
//
function checksum(check, val) {
  return (check ^ val);
};
//
function validateChecksum(buffer) {
  let receivedChecksum = buffer[buffer.length - 1];
  array = new Uint8Array(buffer, 0, buffer.length - 1);
  let calculatedChecksum = array.reduce(checksum)&0xFF;
  return receivedChecksum == calculatedChecksum;
};
function getModelName(id) {
  switch (id) {
    case 6: euc.temp.parseLive = euc.temp.parseLiveV11v2; return "V11";
    case 7: euc.temp.parseLive = euc.temp.parseLiveV12; return "V12";
    case 8: euc.temp.parseLive = euc.temp.parseLiveV13; return "V13";
  }
  return "UNKNOWN";
};
//
euc.temp.parseMainInfo = function (inc) {
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if(inc[5] == 0x01 && dataLen >= 6) {
    if (ew.is.bt===2) console.log("Parse main data");
    // 020601010100 -v11
    // 020701010100 -v12
    // 020801010100 -v13
    let series = lala.getUint8(7);
    euc.dash.info.get.modl=getModelName(series);
    euc.dash.info.get.makr = "Inmotion";
    euc.dash.info.get.mac = euc.mac;
    if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Name") || ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Name") != euc.dash.info.get.modl)
      ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Name",euc.dash.info.get.modl);
  } else if(inc[5] == 0x02 && dataLen >= 17) {
    if (ew.is.bt===2) console.log("Parse serial number");
    euc.dash.info.get.serl = "";
    for (let i = 6; i < 22; i++) {
      euc.dash.info.get.serl += String.fromCharCode(lala.getUint8(i));
    }
  } else if(inc[5] == 0x06 && dataLen >= 24) {
    if (ew.is.bt===2) console.log("Parse version");
    euc.temp.protocol = 0;
    let motherboard3 = lala.getUint16(16, true);
    let motherboard2 = lala.getUint8(18);
    let motherboard1 = lala.getUint8(19);
    euc.dash.info.get.firm = [motherboard1.toString(10), motherboard2.toString(10), motherboard3.toString(10)].join(".");
    if (euc.dash.info.get.modl == "V11") {
      if(motherboard1 < 1 && motherboard2 < 4) {
        euc.temp.protocol = 1;
        euc.temp.parseLive = euc.temp.parseLiveV11v1;
      } else euc.temp.protocol = 2;
    }
  }
};
//
euc.temp.parseSettings = function (inc) {
  if (ew.is.bt===2) console.log("Parse settings data");
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<8) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  euc.dash.alrt.spd.max = lala.getUint16(6, true)/100;
  euc.dash.opt.snd.vol = lala.getUint8(13);
};
//
euc.temp.parseLiveV11v1 = function (inc) {
  if (ew.is.bt===2) console.log("Parse realtime data (V11 old)");
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<21) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  //volt
  euc.dash.live.volt = lala.getUint16(5, true) / 100;
  //amp
  euc.dash.live.amp = lala.getInt16(7, true) / 100;
  //speed
  euc.dash.live.spd = Math.abs(lala.getInt16(9, true) / 100);
  //temp
  // mosfet temp
  euc.dash.live.tmp = lala.getUint8(22) - 176;
  // battery temp
  euc.dash.live.tmp2 = lala.getUint8(24) - 176;
  euc.temp.liveAll();
};
//
euc.temp.parseLiveV11v2 = function (inc){
  if (ew.is.bt===2) console.log("Parse realtime data (V11)");
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<46) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  //volt
  euc.dash.live.volt = lala.getUint16(5, true) / 100;
  //amp
  euc.dash.live.amp = lala.getInt16(7, true) / 100;
  //speed
  euc.dash.live.spd = Math.abs(lala.getInt16(9, true) / 100);
  //temp
  // mosfet temp
  euc.dash.live.tmp = lala.getUint8(47) - 176;
  // battery temp
  euc.dash.live.tmp2 = lala.getUint8(49) - 176;
  euc.temp.liveAll();
};
//
euc.temp.parseLiveV12 = function (inc) {
  if (ew.is.bt==2) console.log("Parse realtime data (V12)");
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<44) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  //volt
  euc.dash.live.volt = lala.getUint16(5, true) / 100;
  //amp
  euc.dash.live.amp = lala.getInt16(7, true) / 100;
  //speed
  euc.dash.live.spd = Math.abs(lala.getInt16(9, true) / 100);
  //temp
  // mosfet temp
  euc.dash.live.tmp = lala.getUint8(45) - 176;
  // battery temp
  euc.dash.live.tmp2 = lala.getUint8(47) - 176;
  euc.temp.liveAll();
};
//
euc.temp.parseLiveV13 = function (inc) {
  if (ew.is.bt==2) console.log("Parse realtime data (V13)");
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<62) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  //volt
  euc.dash.live.volt = lala.getUint16(5, true) / 100;
  //amp
  euc.dash.live.amp = lala.getInt16(7, true) / 100;
  //speed
  euc.dash.live.spd = Math.abs(lala.getInt16(13, true) / 100);
  //temp
  // mosfet temp
  euc.dash.live.tmp = lala.getUint8(63) - 176;
  // battery temp
  euc.dash.live.tmp2 = lala.getUint8(65) - 176;
  euc.temp.liveAll();
};
//
euc.temp.liveAll = function () {
  euc.is.lastGetLive = getTime();
  //batt
  euc.dash.live.bat = Math.round(100*(euc.dash.live.volt*(100/euc.dash.opt.bat.pack) - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
  euc.log.batL.unshift(euc.dash.live.bat);
  if (20<euc.log.batL.length) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;
  if (euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc == 2) euc.is.alert ++;
  // speed
  if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
  euc.dash.alrt.spd.cc = (euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd)? 2 : (euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd)? 1 : 0;
  if (euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2)
    euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step);
  // temp
  euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++;
  //log
  euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
  if (20<euc.log.ampL.length) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
    if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
    else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
  }
  euc.is.alert=0;
  //alarm
  euc.dash.alrt.pwr=0;
  //log
  euc.log.almL.unshift(euc.dash.alrt.pwr);
  if (20<euc.log.almL.length) euc.log.almL.pop();
  //haptic
  if (euc.dash.alrt.pwr) euc.is.alert=20;
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
    for (i = 0; i < euc.is.alert; i++) {
      a.push(200,150);
    }
    buzzer.euc(a);
    setTimeout(() => { euc.is.buzz = 0; }, 3000);
  }
};
//
euc.temp.parseStats = function (inc) {
  if (ew.is.bt===2) console.log("Parse total stats data");
  euc.is.lastGetStats = getTime();
  let lala = new DataView(inc);
  let dataLen = lala.getUint8(3);
  if (dataLen<22) {
    if (ew.is.bt===2) console.log("Short package. dataLen=", dataLen.toString(10));
    return;
  }
  //trip total
  euc.dash.trip.totl=lala.getUint32(5, true)/100;
    euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
  //time
  euc.dash.timR=(lala.getUint32(17, true)/60)|0;
  euc.dash.trip.time=(lala.getUint32(21, true)/60)|0;
  //deb
  if (2<euc.dbg) print("trip total :", euc.dash.trip.totl);
  if (2<euc.dbg) print("on time :", euc.dash.trip.time);
  if (2<euc.dbg) print("ride time :", euc.dash.timR);
};
//
crutchDoubleA5 = function(buf) {
  let len = buf.length;
  let needLen = buf[3] + 5;
  if (len === needLen) return buf;
  let oldByte = 0x00;
  let p = 0;
  let newArr = new Uint8Array(needLen);
  for (i = 0; i < Len; i++) {
    if (p >= needlen) break;
    if (oldByte === 0xA5 && buf[i] === 0xA5) continue;
    newArr[p] = buf[i];
    oldByte = buf[i];
    p++;
  }
  if (ew.is.bt===2&&euc.dbg==3) console.log("InmotionV2: in after crutch: length: ", needLen, " data: ",[].map.call(newArr, x => x.toString(16)).toString());
  return newArr;
};
//
euc.temp.inpk = function(event) {
  if (ew.is.bt===2&&euc.dbg==3) console.log("InmotionV2: packet in: ",[].map.call(event.target.value.buffer, x => x.toString(16)).toString());
  //gather package
  let inc=event.target.value.buffer;
  if (ew.is.bt==5) euc.proxy.w(inc);

  if ( inc.length>4 && inc[0]==0xAA && inc[1]==0xAA ) euc.temp.tot=E.toUint8Array(inc);
  else if (euc.temp.tot.buffer.length>1) euc.temp.tot=E.toUint8Array(euc.temp.last,inc);
  else return;
  euc.temp.last=E.toUint8Array(euc.temp.tot.buffer);
  let needBufLen=euc.temp.tot.buffer[3] + 5;
  if (euc.temp.tot.buffer.length < needBufLen) return;
  delete inc;
  delete euc.temp.last;
  if (euc.temp.tot.buffer.length > needBufLen) {
    if (ew.is.bt===2) console.log("InmotionV2: Packet size error. Trying a crutch.");
    euc.temp.tot = crutchDoubleA5(euc.temp.tot);
  }
  if (ew.is.bt===2) console.log("InmotionV2: in: length: ",euc.temp.tot.buffer.length," data: ",[].map.call(euc.temp.tot, x => x.toString(16)).toString());
  // Check packet
  if ( !validateChecksum(euc.temp.tot.buffer) ) {
    if (ew.is.bt===2) console.log("Fail checksum, packet dropped");
    euc.temp.tot=E.toUint8Array();
    return;
  }
  if ( euc.temp.tot.buffer[3] == 0 ) {
    if (ew.is.bt===2) console.log("No data, packet dropped");
    euc.temp.tot=E.toUint8Array();
    return;
  }
  //
  let m = euc.temp.tot.buffer[2];
  let t = euc.temp.tot.buffer[4] & 0x7F;
  if (m == 0x11 && t == 0x02) {
    euc.temp.parseMainInfo(euc.temp.tot.buffer);
    return;
  }
  if (m == 0x14) {
    switch (t) {
    case 0x20:
      if (euc.dash.info.get.modl == "V11") euc.temp.parseSettings(euc.temp.tot.buffer);
      break;
    case 0x11:
      euc.temp.parseStats(euc.temp.tot.buffer);
      break;
    case 0x04:
      euc.temp.parseLive(euc.temp.tot.buffer);
      break;
    default:
      if (ew.is.bt===2) console.log("Unknown Info packet. Dropped");
      break;
    }
  } else {
    if (ew.is.bt===2) console.log("Unknown packet. Dropped");
  }
};

euc.temp.keepAlive = function() {
  if ((getTime() - euc.is.lastGetLive) < 0.5) return;
  if (euc.tout.busy) return;
  euc.tout.busy = 1;
  let sendCommand;
  if (euc.temp.keepAlive.state == 0) sendCommand = euc.cmd("getType");
  else if(euc.temp.keepAlive.state == 1) sendCommand = euc.cmd("getSN");
  else if(euc.temp.keepAlive.state == 2) sendCommand = euc.cmd("getVer");
  else if(euc.temp.keepAlive.state == 3) sendCommand = euc.cmd("getSettings");
  else if(euc.temp.keepAlive.state == 4) sendCommand = euc.cmd("getUseless");
  else if(euc.temp.keepAlive.state == 5) sendCommand = euc.cmd("stats");
  else if(euc.temp.keepAlive.state == 6) sendCommand = euc.cmd("live");
  euc.temp.wCha.writeValue(sendCommand)
  .then(function() { return euc.tout.busy = 0 })
  .catch(function(err) {
    if (ew.is.bt===2) console.log("EUC InmotionV2: keepAlive write fail");
  });
  euc.temp.keepAlive.state++;
  if(euc.temp.keepAlive.state < 5) return;
  if(getTime() - euc.is.lastGetStats < 1) euc.temp.keepAlive.state = 6;
  else euc.temp.keepAlive.state = 5;
};

euc.isProxy=0;
euc.wri=function(i) {if (ew.is.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
  if (euc.gatt && euc.gatt.connected) return euc.gatt.disconnect();
  //check if proxy
  if (mac.includes("private-resolvable")&&!euc.isProxy ){
    let name=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Name"];
    NRF.requestDevice({ timeout:2000, filters: [{ namePrefix: name }] }).then(function(device) { euc.isProxy=1;euc.conn(device.id);}  ).catch(function(err) {print ("error "+err);euc.conn(euc.mac); });
    return;
  }
  euc.isProxy=0;
  if (euc.tout.reconnect) {clearTimeout(euc.tout.reconnect); euc.tout.reconnect=0;}
  NRF.connect(mac,{minInterval:7.5, maxInterval:15})
    .then(function(g) {
      euc.gatt=g;
      return g.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
    }).then(function(s) {
      euc.temp.serv=s;
      return euc.temp.serv.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"); // write
    }).then(function(wc) {
      euc.temp.wCha=wc; //write
      print("write packet: ", wc);
      return euc.temp.serv.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e"); //read
    }).then(function(rc) {
      euc.temp.rCha=rc;
      //read
      euc.temp.rCha.on('characteristicvaluechanged', euc.temp.inpk);
      //on disconnect
      euc.gatt.device.on('gattserverdisconnected', euc.off);
      return  rc;
    }).then(function(c) {
      //connected
      if (ew.is.bt===2) console.log("EUC: Connected");
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
          if (cmd!=="proxy") euc.tout.eucWrite=setTimeout(function() {euc.wri(cmd,value)},50);
          return;
        }
        euc.tout.busy = 1;
        if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
        if (euc.state === "OFF" || cmd === "end") {
          if (euc.gatt && euc.gatt.connected) {
            if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
            euc.tout.loop = setTimeout(function(){
              euc.tout.loop = 0;
              if (euc.gatt && !euc.gatt.connected) {euc.off("not connected"); return;}
              euc.gatt.disconnect().catch(euc.off);
            },500);
          } else {
            euc.state = "OFF";
            euc.off("not connected");
            euc.tout.busy = 0;
            euc.is.horn = 0;
            return;
          }
          euc.tout.busy = 0;
        } else if (cmd === "start") {
          euc.temp.keepAlive.state = 0;
          euc.temp.rCha.startNotifications();
          if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
          euc.tout.loop=setTimeout(function(){
            euc.tout.loop=0;euc.tout.busy=0;euc.is.run=1;
            euc.tout.intervalKeep=setInterval(function(){
              try { euc.temp.keepAlive();
              } catch(e) { return; }
            },200);
          },200);
        } else if (cmd === "hornOn") {
          if (euc.is.horn) return;
          euc.is.horn=1;
          if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
          euc.tout.loop = setTimeout(function(){
            euc.temp.wCha.writeValue(euc.cmd("playSound",euc.dash.opt.horn.mode)).then(function() {
              euc.is.horn = 0;
              euc.tout.loop = 0;
              euc.tout.loop = setTimeout(function(){
                euc.tout.loop = 0;
                euc.tout.busy = 0;
                euc.is.horn = 0;
              },250);
            });
          },350);
        } else if (cmd==="hornOff") {
          euc.is.horn = 0;
          euc.tout.busy = 0;
        } else if (cmd==="proxy") {
          euc.temp.wCha.writeValue(value)
          .then(function() {return euc.tout.busy = 0;})
          .catch(euc.off);
        } else {
          euc.temp.wCha.writeValue(euc.cmd(cmd,value))
          .then(function() {return euc.tout.busy = 0;})
          .catch(euc.off);
        }
      };
      if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Mac")) {
        euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=420;
        euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
        ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Mac",euc.mac);
      }
      setTimeout(() => {euc.wri("start");}, 200);
    //reconnect
    }).catch(euc.off);
};
