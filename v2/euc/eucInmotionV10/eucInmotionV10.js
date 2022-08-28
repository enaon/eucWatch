//code by freestyl3r
euc.temp={count:0,loop:0};
if (!euc.dash.alrt) euc.dash.alrt={};
if (!euc.dash.lght) euc.dash.lght={"head":0,"tail":0,"ring":0,"aHead":0};
if (!euc.dash.ctrl) euc.dash.ctrl={"aLck":0,"aLift":0,"aOff":0,"aLight":0,"lift":1,"lamp":0,"vol":50,"horn":20};



euc.cmd=function(no,val){
	if (ew.is.bt===2) console.log("inmotion: send cmd :",no);
	let cmd;
		switch (no) {
		case "info" :		return		[170, 170, 20, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 1, 127]; 
		case "batLevelData":return 		[170, 170, 20, 1, 165, 85, 15, 0, 0, 0, 21, 0, 0, 0, 0, 8, 5, 0, 1, 156];
		case "live":		return 		[170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125];
		case "init":		return 		[170, 170, 7, 3, 165, 85, 15, 48, 48, 48, 48, 48, 48, 0, 0, 8, 5, 0, 0, 155];
		case "calibration": return 		[ 170, 170, 25, 1, 165, 85, 15, 50, 84, 118, 152, 0, 0, 0, 0, 8, 5, 0, 0, 31 ];
		case "horn": 		return		[170, 170, 9, 6, 165, 85, 15, 4, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 132];
		case "beep":		return 		[170, 170, 9, 6, 165, 85, 15, 21, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 149];
		case "led":			return 		[170, 170, 9, 6, 165, 85, 15, 21, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 149];
		case "end":			return      [85, 85];

		case "playSound"://cmd=0-23
			cmd = [170, 170, 9, 6, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setVolume"://cmd=0-100
			cmd = [170, 170, 10, 6, 165, 85, 15, (val * 100) & 0xFF, ((val * 100) / 0x100) & 0xFF, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setLights"://val=0|1
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 13, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setBrightness": 
			cmd = [170, 170, 20, 3, 96, 43, val];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setRideMode"://val=0=clasic|1=comfort
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, val, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setPpedalTilt": //val=-80-+80
			viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
			viw.setInt32( 0, val * 65536 / 10  );
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "setPedalSensitivity": //val=-80-+80
			viw = new DataView(new Int8Array(4).buffer); //to int32 BI.
			viw.setInt32( 0, val * 65536 / 10  );
			cmd = [170, 170, 21, 1, 165, 85, 15, 0, 0, 0, 0, viw.buffer[3], viw.buffer[2], viw.buffer[1], viw.buffer[0], 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "speedLimit":
			viw = new DataView(new Int8Array(2).buffer); //to int16 BI.
			viw.setInt16( 0, val*1000 );
			cmd = [170, 170, 21, 1, 165, 85, 15, 1, 0, 0, 0, viw.buffer[1], viw.buffer[0], 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "control"://15=ledOn|16=ledOff|5=powerOff|17=beep|
			cmd = [170, 170, 22, 1, 165, 85, 15, 178, 0, 0, 0, val, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "pincode"://
			cmd = [170, 170, 7, 3, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "alert"://
			cmd = [170, 170, 1, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
		case "sethandleButton"://val=0|1
			if (val!=0 && val!=1) return [0];
			cmd = [170, 170, 46, 1, 165, 85, 15, val, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 0];
			cmd.push(7+cmd.reduce(checksum));
			return cmd;
	}
};
//
function checksum(check, val) {
	return (check + val) & 255;
}
//cmd=[[170, 170, 19, 1, 165, 85, 15, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 0, 1]
//cmd.push(cmd.reduce(checksum));
function validateChecksum(buffer) {
	receivedChecksum = buffer[buffer.length - 1];
	array = new Uint8Array(buffer, 0, buffer.length - 1);
	calculatedChecksum = array.reduce(checksum);
	return receivedChecksum == calculatedChecksum;
}
function appendBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

euc.temp.liveParse= function (inc){
	let lala = new DataView(inc);
	euc.is.alert=0;
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
	euc.dash.live.bat=Math.round(100* (euc.dash.live.volt*( 100/(16*euc.dash.opt.bat.pack)) - euc.dash.opt.bat.low )  / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low) );
	//euc.dash.live.bat = Math.round(((euc.dash.live.volt - 60) * 100) / (84 - 60));
	euc.log.batL.unshift(euc.dash.live.bat);
	if (20<euc.log.batL.length) euc.log.batL.pop();
	euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;	
	if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;
	//temp
	euc.dash.live.tmp=(lala.buffer[51] & 0xff);
	//euc.dash.live.tmp=(lala.buffer[53] & 0xff); //alt temp 2
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
	euc.dash.trip.last=lala.getInt32(67, true)/1000;
	//print(euc.dash.trip.last);
	euc.dash.trip.totl=lala.getUint32(63, true)/1000;
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
	//if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
	//euc.temp.loop=setTimeout(function(v){ euc.temp.loop=0;euc.temp.live();},50);
	//euc.temp.live();
};			

euc.temp.alertParse= function (inc){
	//let lala = new DataView(inc);				
	euc.dash.alrt.id = inc[6];
	euc.dash.alrt.val = (inc[9] * 256) | (inc[8] & 0xFF);
	euc.dash.alrt.val2 = (inc[13] * 256 * 256 * 256) | ((inc[12] & 0xFF) * 256 * 256) | ((inc[11] & 0xFF) * 256) | (inc[10] & 0xFF);
	euc.dash.alrt.spd = Math.abs((euc.dash.alrt.val2 / 3812.0) * 3.6);
	switch (euc.dash.alrt.id) {
		case 3:	euc.dash.alrt.text = ("LIFT");break;			
		case 5:euc.dash.alrt.text = ("START");	break;
		case 6:euc.dash.alrt.text = ("TILTBACK at speed "+euc.dash.alrt.spd+" at limit "+(euc.dash.alrt.val / 1000.0));break;
		case 14:euc.dash.alrt.text = ("HELLO");break;
		case 25:euc.dash.alrt.text = ("FALL");break;
		case 29:euc.dash.alrt.text = ("REPAIR: bad battery cell found. At voltage: "+ (euc.dash.alrt.val2 / 100.0));break;
		case 32:euc.dash.alrt.text = ("LOW BATTEY at voltage :" + (euc.dash.alrt.val2 / 100.0));break;
		case 33:euc.dash.alrt.text = ("CUT-OFF at speed :"+euc.dash.alrt.spd);break;
		case 38:euc.dash.alrt.text = ("HIGH LOAD at speed :"+euc.dash.alrt.spd+" and current :"+(euc.dash.alrt.val / 1000.0));break;
		default:euc.dash.alrt.text = ("Unknown Alert: "+ euc.dash.alrt.val+","+euc.dash.alrt.val2);
    }
	//euc.emit('alert',euc.dash.alrt.text);
};
//
euc.wri=function(i) {if (ew.is.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
	if (ew.is.bt===2) console.log("EUCInmotionV1 init");
	if (euc.temp.alive) {clearTimeout(euc.temp.alive); euc.temp.alive=0};
	if (euc.gatt && euc.gatt.connected) {
		return euc.gatt.disconnect();
	}
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect); euc.is.reconnect=0;}
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
			//read
			euc.temp.last= [];
			euc.temp.chk= [];
			euc.temp.rCha.on('characteristicvaluechanged', function(event) {
				if (ew.is.bt===2&&euc.dbg==3) console.log("Inmotion: packet in ",event.target.value.buffer); 
				if (euc.temp.alive) {clearTimeout(euc.temp.alive); euc.temp.alive=0;}
				if (euc.is.busy) return;
				//gather package
				let inc=event.target.value.buffer;
				euc.temp.tot=E.toUint8Array(euc.temp.last,inc);
				euc.temp.last=E.toUint8Array(euc.temp.tot.buffer);
				//got package	
				if ( (inc.length==1 && inc[0]==85) || (inc[inc.length - 2]==85 && inc[inc.length - 1]==85) ) {	
					if (ew.is.bt===2) console.log("Inmotion: in: length:",euc.temp.tot.buffer.length," data :",euc.temp.tot); 
					//live pckg
					if (euc.temp.tot.buffer[2]===19) {
						if (euc.temp.tot.length==euc.temp.pckL) {
							euc.temp.last=[];
							if (ew.is.bt===2) console.log("Inmotion: live in"); 
							euc.temp.liveParse(euc.temp.tot.buffer);
							euc.temp.last=[];
							euc.temp.live();
							//setTimeout(function(){ euc.temp.live();},100);
							return;
						//}else if (119 <= euc.temp.tot.length) {
						}else{
							let temp=JSON.parse(JSON.stringify(euc.temp.tot.buffer));
							for (let i = 0; i < temp.length; i++){ if (temp[i]===165 && 15<=i) temp.splice(i,1);}
							euc.temp.chk=new Uint8Array(temp.length -3);
							euc.temp.chk.set(temp);
							euc.temp.chk=( euc.temp.chk.reduce(checksum) + 7 == temp[temp.length - 3] )?1:0;
							if (!euc.temp.chk) {
								if (ew.is.bt===2) console.log("Inmotion: problem: length:",  temp.length, temp); 
								euc.temp.live();
								//setTimeout(function(){euc.temp.live();},100);
								euc.temp.last=[];
								return;
							}
							if (ew.is.bt===2) console.log("Inmotion: live in fixed : length: :", temp.length); 
							euc.temp.pckL=temp.length;
							euc.temp.last=[];
							euc.temp.liveParse(E.toUint8Array(temp).buffer);
							euc.temp.live();
							//setTimeout(function(){ euc.temp.live();},100);
							return;
						}
					//rest
					}else {
						if (euc.temp.tot.buffer[2]===1) {
							if (ew.is.bt===2) console.log("Inmotion: ALERT in, length :",euc.temp.tot.buffer.length,", check:",euc.temp.chk); 
							euc.temp.alertParse(euc.temp.tot.buffer);
						}else
							if (ew.is.bt===2) console.log("Inmotion: unknown in, length :",euc.temp.tot.buffer.length,", check:",euc.temp.chk); 
					}
					euc.temp.last=[];
					return;
				}
			});
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
			euc.temp.live= function(){
				if (euc.temp.alive) clearTimeout(euc.temp.alive); 
				euc.temp.alive=setTimeout(function(){euc.temp.alive=0;euc.is.busy=0;euc.temp.live();},500);
				if (euc.is.busy) return;
				euc.temp.wCha.writeValue([170, 170, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125]).then(function() {
					return euc.temp.wCha.writeValue([85, 85, 19, 1, 165, 85, 15, 255, 255, 255, 255, 255, 255, 255, 255, 8, 5, 0, 0, 125]);
				}).catch(function(err)  {
					if (ew.is.bt===2) console.log("EUC InmotionV1: live write fail"); 
					//euc.off("writefail");	
				});
				
			};
			euc.wri=function(cmd,value){
				if (euc.temp.alive) {clearTimeout(euc.temp.alive); euc.temp.alive=0;}
				euc.is.busy=1;
				if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
				if (ew.is.bt===2) console.log("Inmotion cmd: ", cmd);
				//off
				if (cmd==="hornOn") {
					//if (euc.horn) return;
					euc.horn=1;
					//euc.temp.rCha.stopNotifications();
					if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
					euc.temp.loop=setTimeout(() => {euc.temp.loop=0;
						euc.temp.wCha.writeValue(euc.cmd("playSound",euc.dash.opt.horn.mode)).then(function()  {	
								return euc.temp.wCha.writeValue(euc.cmd("end"));
							}).then(function()  {
								euc.temp.loop=0;
								if (euc.temp.alive) {clearTimeout(euc.temp.alive); euc.temp.alive=0;}
								euc.temp.alive=setTimeout(function(){euc.temp.alive=0;euc.horn=0;euc.is.busy=0;euc.temp.live();},500);
							});
				  	},150);
				}else if (cmd==="hornOff") {
					euc.horn=0;	
					return;
				}else if (euc.state==="OFF"||cmd==="end") {
					if (euc.gatt && euc.gatt.connected) {
						if (euc.temp.loopEnd) {clearTimeout(euc.temp.loopEnd); euc.temp.loopEnd=0;}
						euc.temp.loopEnd=setTimeout(function(){
							euc.temp.loopEnd=0;
							euc.gatt.disconnect();
						},1000);	
						if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
						euc.temp.loop=setTimeout(function(){ 
							euc.temp.loop=0;
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
								if (euc.temp.loopEnd) {clearTimeout(euc.temp.loopEnd); euc.temp.loopEnd=0;}
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
						if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
						euc.temp.loop=setTimeout(function(){
							euc.temp.loop=0;euc.is.run=1;euc.is.busy=0;
							return euc.temp.live();
						},350);	
					}).catch(euc.off);
				
				} else {
					//if (euc.is.busy) return; 
					if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
					euc.temp.loop=setTimeout(function(){
						euc.temp.loop=0;
						euc.temp.wCha.writeValue(euc.cmd(cmd,value)).then(function() {
							return euc.temp.wCha.writeValue(euc.cmd("end"));
						//}).then(function(err)  {
						//return euc.temp.wCha.writeValue(euc.cmd(cmd,value));
						}).catch(euc.off);
					},250);
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
/*
euc.off=function(err){
	if (ew.is.bt===2) console.log("EUC:", err);
	if (euc.temp.alive) {clearTimeout(euc.temp.alive); euc.temp.alive=0;}
	//  global.error.push("EUC :"+err);
	if (euc.temp.loop) {clearTimeout(euc.temp.loop);euc.temp.loop=0;}
	if (euc.is.reconnect) {clearTimeout(euc.is.reconnect); euc.is.reconnect=0;}
	if (euc.state!="OFF") {
		if (ew.is.bt===2) console.log("EUC imV1: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (ew.is.bt===2) console.log("reason :timeout");
			euc.state="LOST";
			if ( ew.def.dash.rtr < euc.is.run) {
				euc.tgl();
				return;
			}
			euc.is.run=euc.is.run+1;
			if (euc.dash.opt.lock.en==1) buzzer.nav(250);
			else  buzzer.nav([250,200,250,200,250]);
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			if (ew.is.bt===2) console.log("reason :",err);
			euc.state="FAR";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1000);
		} else {
			if (ew.is.bt===2) console.log("reason :",err);
			euc.state="RETRY";
			euc.is.reconnect=setTimeout(() => {
				euc.is.reconnect=0;
				if (euc.state=="OFF") return;
				euc.conn(euc.mac); 
			}, 1500);
		}
	} else {
		if (ew.is.bt===2) console.log("EUC OUT:",err);
		if (euc.temp.loop) {clearTimeout(euc.temp.loop); euc.temp.loop=0;}
		euc.off=function(err){if (ew.is.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (ew.is.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (ew.is.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (ew.is.bt===2) console.log("EUC cmd, not connected",err);};
		euc.is.run=0;
		euc.temp=0;
		euc.is.busy=0;
		euc.temp.serv=0;euc.temp.wCha=0;euc.temp.rCha=0;euc.gatt=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(ew.def.rfTX);	
    }
};
*/