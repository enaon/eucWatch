//Vteran euc module
E.setFlags({ pretokenise: 1 });
euc.cmd=function(no){
	switch (no) {
		case "beep":return [98];
		case "rideSoft":return "SETs";
		case "rideMed":return  "SETm";
		case "rideStrong":return "SETh";
		case "setLightOn":return "SetLightON";
		case "setLightOff":return "SetLightOFF";
		case "setVolUp":return "SetFctVol+";
		case "setVolDn":return "SetFctVol-";
		case "clearMeter":return "CLEARMETER";
		case "switchPackets": euc.temp.CHANGESTRORPACK=1; return "CHANGESTRORPACK";
		case "changePage": euc.temp.CHANGESTRORPACK++; return "CHANGESHOWPAGE";
		case "returnMain": euc.temp.CHANGESTRORPACK=0;return "CHANGESTRORPACK";
		default: return [];
    }
};
//
function checksum(packet) {
  // Skip check if old firmware
  let FWVer = packet[28]<<8|packet[29];
  if (FWVer < 3012) {
    if (ew.is.bt===2) console.log("Firmware does not support checksum. FWVer: ", FWVer);
    return 1;
  }

  if (ew.is.bt===2) console.log("Checksum verification");

  let tCRC32View=new DataView(packet, packet.length-4, 4);
  let tPckt=new Uint8Array(packet, 0, packet.length-4);
  if (E.CRC32(tPckt) == tCRC32View.getUint32(0)) return 1;
  else return 0;
}
//
euc.isProxy=0;
//
euc.temp.liveParse = function (inc){
  let lala = new DataView(inc);
  euc.is.alert=0;
  //print(this.ev);
  //volt-bat
  euc.dash.live.volt=lala.getUint16(4)/100;
  euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*(100/euc.dash.opt.bat.pack) - euc.dash.opt.bat.low ) / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
  euc.log.batL.unshift(euc.dash.live.bat);
  if (20<euc.log.batL.length) euc.log.batL.pop();
  euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;
  if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;
  //spd
  euc.dash.live.spd=Math.abs(lala.getInt16(6)/10);
  if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
  euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;
  if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 )
    euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step);
  //trip
  euc.dash.trip.last=(lala.getUint16(10)<<16 | lala.getUint16(8))/1000;
  euc.dash.trip.totl=(lala.getUint16(14)<<16 | lala.getUint16(12))/1000;
  euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
  //amp
  euc.dash.live.amp=lala.getInt16(16)/100;
  if (euc.dash.opt.unit.ampR) euc.dash.live.amp=-euc.dash.live.amp;
  euc.log.ampL.unshift(euc.dash.live.amp);
  if (20<euc.log.ampL.length) euc.log.ampL.pop();
  euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
  if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
    if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step);
    else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step);
  }
  //tmp
  euc.dash.live.tmp=lala.getInt16(18)/100;
  euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
  if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++;
  euc.dash.trip.avrS=(lala.getUint16(24) / 10);
  if (!euc.dash.info.get.modl) euc.dash.info.get.modl=lala.getUint16(28);
  euc.dash.opt.ride.mode=lala.getUint16(30);
  //pwm
  euc.dash.live.pwm=lala.getUint16(34)/100;
  if (euc.dash.trip.pwm < euc.dash.live.pwm) euc.dash.trip.pwm = euc.dash.live.pwm;
  //alerts
  if (euc.dash.alrt.pwm.hapt.en && (euc.dash.alrt.pwr || euc.dash.alrt.pwm.hapt.hi <= euc.dash.live.pwm)) {
    buzzer.sys( 60);
    euc.is.alert = 0;
  } else if (!euc.is.buzz && euc.is.alert) {
    if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face],0);
    //else face.off(6000);
    euc.is.buzz=1;
    if (20<=euc.is.alert) euc.is.alert=20;
    var a = [100];
    while (5 <= euc.is.alert) {
      a.push(150,500);
      euc.is.alert=euc.is.alert-5;
    }
    for (let i = 0; i < euc.is.alert ; i++) a.push(150,150);
    buzzer.euc(a);
    setTimeout(() => {euc.is.buzz=0; }, 3000);
  }
}
//
euc.temp.inpk = function(event) {
  if (euc.is.busy) return;
  let inc=event.target.value.buffer;
  if (ew.is.bt==5) euc.proxy.w(inc);

  if ( inc.length>4 && inc[0]==0xDC && inc[1]==0x5A && inc[2]==0x5C ) euc.temp.tot=E.toUint8Array(inc);
  else if (euc.temp.tot.buffer.length>1) euc.temp.tot=E.toUint8Array(euc.temp.last,inc);
  else return;
  euc.temp.last=E.toUint8Array(euc.temp.tot.buffer);

  let needBufLen=euc.temp.tot.buffer[3] + 4;
  if (euc.temp.tot.buffer.length < needBufLen) return;

  if (euc.temp.tot.buffer.length == needBufLen) {
    if (ew.is.bt===2) console.log("Veteran: in: length:",euc.temp.tot.buffer.length," data :",[].map.call(euc.temp.tot, x => x.toString(16)).toString());
    if (checksum(euc.temp.tot.buffer)) {
      euc.temp.liveParse(euc.temp.tot.buffer);
    } else {
      if (ew.is.bt===2) console.log("Packet checksum error. Dropped.");
    }
  } else if (ew.is.bt===2) console.log("Packet size error. Dropped.");

  euc.temp.tot=E.toUint8Array([0]);
  euc.temp.last=E.toUint8Array(euc.temp.tot.buffer);
}
//start
euc.wri=function(i) {if (ew.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	euc.dash.trip.pwm=0;
	//check
	if ( euc.gatt!="undefined") {
		if (ew.def.cli) print("ble allready connected");
		if (euc.gatt.connected) {euc.gatt.disconnect();return;}
	}
	//check if proxy
	if (mac.includes("private-resolvable")&&!euc.isProxy ){
		let name=require("Storage").readJSON("dash.json",1)["slot"+require("Storage").readJSON("dash.json",1).slot+"Name"];
		NRF.requestDevice({ timeout:2000, filters: [{ namePrefix: name }] }).then(function(device) { euc.isProxy=1;euc.conn(device.id);}  ).catch(function(err) {print ("error "+err);euc.conn(euc.mac); });
		return;
	}
	euc.isProxy=0;
	euc.pac=[];
	//connect
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
		euc.gatt=g;
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		this.need=0;
		//this.event=new Uint8Array(event.target.value.buffer);
		c.on('characteristicvaluechanged', euc.temp.inpk);
		//on disconnect
		euc.gatt.device.on('gattserverdisconnected', euc.off);
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Veteran connected!!");
		euc.wri= function(n,v) {
            //console.log("got :", n);
			if (euc.tout.busy) { clearTimeout(euc.tout.busy);euc.tout.busy=setTimeout(()=>{euc.tout.busy=0;},100);return;}
			euc.tout.busy=setTimeout(()=>{euc.tout.busy=0;},200);
            //end
			if (n==="proxy") {
				c.writeValue(v).then(function() {
                    if (euc.tout.busy) {clearTimeout(euc.tout.busy);euc.tout.busy=0;}
				}).catch(euc.off);
			}else if (n=="hornOn") {
				euc.is.horn=1;
				let md={"1":"SETs","2":"SETm","3":"SETh"};
				c.writeValue(md[euc.dash.opt.ride.mode]).then(function() {
					if (!euc.is.busy) {euc.is.busy=1;euc.is.horn=1;c.stopNotifications();}
					setTimeout(() => {
						c.writeValue((euc.dash.opt.lght.HL)?"SetLightOFF":"SetLightON").then(function() {
							setTimeout(() => {
								c.writeValue((euc.dash.opt.lght.HL)?"SetLightON":"SetLightOFF").then(function() {
									setTimeout(() => {
										if (BTN1.read()) {
											if (euc.tout.busy) { clearTimeout(euc.tout.busy);euc.tout.busy=0;}
											euc.wri("hornOn");
										}else {
											euc.is.horn=0;
											euc.is.busy=0;
											c.startNotifications();
										}
									},30);
								});
							},30);
						});
					},60);
				});
			}else if (n=="hornOff") {
				euc.is.horn=0;
			}else if (n=="start") {
				c.startNotifications().then(function() {
					buzzer.nav([100,100,150,]);
					if (euc.dash.auto.onC.HL) return c.writeValue(euc.cmd((euc.dash.auto.onC.HL==1)?"setLightOn":"setLightOff"));
				}).then(function() {
					if (euc.dash.auto.onC.clrM) return c.writeValue(euc.cmd("clearMeter"));
				}).then(function()  {
					if (euc.dash.auto.onC.beep) return c.writeValue(euc.cmd("beep"));
					//if (euc.dash.auto.onC.rstT) {}
					euc.is.run=1;
					return true;
				});
			}else if (euc.state=="OFF"||n=="end") {
				let hld=["none","setLightOn","setLightOff"];
				c.writeValue(euc.cmd(hld[euc.dash.auto.onD.HL])).then(function() {
					if (euc.dash.auto.onD.beep) return c.writeValue(euc.cmd("beep"));
				}).then(function() {
					euc.is.run=0;
					return c.stopNotifications();
				}).then(function() {
					euc.gatt.disconnect();
				}).catch(euc.off);
            }else if (euc.cmd(n)) {
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.tout.busy) {clearTimeout(euc.tout.busy);euc.tout.busy=0;}
				}).catch(euc.off);
			}
		};
		if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Mac")) {
			euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=420;euc.dash.opt.bat.low=315;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Mac",euc.mac);
		}
		euc.state="READY";euc.wri("start");
	//reconect
	}).catch(euc.off);
};

//euc.wri("changePage")
//euc.wri("switchPackets")
//euc.wri("returnMain")
