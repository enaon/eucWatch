//Ninebot one c/e/p euc module
E.setFlags({ pretokenise: 1 });
euc.cmd=function(no){
	switch (no) {
    case 0:case 3:case 6:case 9:case 12:case 15:case 18:case "end":
	  return [85,170,3,9,1,80,2,160,255]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
	case 1:case 4:case 7:case 10:case 13:case 16:case 19:
	  return [85,170,3,9,1,38,2,202,255]; //Current Speed in Km/h*1000d
	case 2:return [85,170,3,9,1,62,2,178,255]; //Temperature numeric positive C * 10
	case 5:return [85,170,3,9,1,71,2,169,255]; //Voltage numeric positive V * 100
	case 8:return [85,170,3,9,1,185,2,55,255]; //Single Mileage numeric positive in meters
	case 11:return [85,170,3,9,1,58,2,182,255]; //Single Runtime numeric positive seconds
	case 14: euc.temp.rota=1-euc.temp.rota; return (!euc.temp.rota)?[85,170,3,9,1,37,2,203,255]:[85,170,3,9,1,41,4,197,255]; //remaining mileage in Km*100/total mileage
	case 17:return [85,170,3,9,1,182,2,58,255]; //Average speed numeric positive m/h
	case 20:return [85,170,3,9,1,112,2,128,255]; //Lock status
	case 21:return [85,170,3,9,3,112,1,127,255]; //21- lock
	case 22:return [85,170,3,9,3,112,0,128,255]; //22- unlock
	case 23:return [85,170,4,9,3,198,0,0,30,255]; //metric khp
	case 24:return [85,170,4,9,3,198,1,0,30,255]; //metric mph
	case 25:return [85,170,4,9,3,198,0,0,41,255]; //ring  off
	case 26:return [85,170,4,9,3,198,1,0,40,255]; //ring  cyrcle
	case 30:return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
	case 31:return [85,170,4,9,2,210,1,0,29,255]; //25 set Riding Mode 1
	case 32:return [85,170,3,9,2,210,2,29,255]; //26 set Riding Mode 2
	case 33:return [85,170,3,9,2,210,3,28,255]; //27 set Riding Mode 3
	case 34:return [85,170,3,9,2,210,4,27,255]; //28 set Riding Mode 4
	case 35:return [85,170,3,9,2,210,5,26,255]; //29 set Riding Mode 5
	case 36:return [85,170,3,9,2,210,6,25,255]; //30 set Riding Mode 6
	case 37:return [85,170,3,9,2,210,7,24,255]; //31 set Riding Mode 7
	case 38:return [85,170,3,9,2,210,8,23,255]; //32 set Riding Mode 8
	case 39:return [85,170,3,9,2,210,9,22,255];  //33 set Riding Mode 9
	case 40:return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
	default : return no;
    }
};
//
euc.wri=function(i) {if (ew.is.bt===2) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.conn=function(mac){
if ( euc.gatt&&euc.gatt.connected ) {
	if (ew.is.bt===2) console.log("ble allready connected");
	euc.gatt.disconnect();return;
}
//connect
NRF.connect(mac,{minInterval:7.5, maxInterval:15})
.then(function(g) {
	euc.gatt=g;
	return g.getPrimaryService(0xffe0);
}).then(function(s) {
	return s.getCharacteristic(0xffe1);
}).then(function(c) {
	//euc.temp.characteristic=c;
	c.on('characteristicvaluechanged', function(event) {
		if (ew.is.bt==5) {
			euc.proxy.w(event.target.value.buffer);
		}
		this.var= event.target.value.buffer[5];
		this.in16=event.target.value.getUint16(6, true);
		//print(this.var);
		euc.is.alert=0;
		switch (this.var) {
		case 38://speed
			//euc.dash.live.spd=Math.round((this.in16/1000)*euc.dash.opt.unit.fact.spd*((ew.def.dash.mph)?0.625:1));
			euc.dash.live.spd=this.in16/1000;
			if (euc.dash.trip.topS < euc.dash.live.spd) euc.dash.trip.topS = euc.dash.live.spd;
				euc.dash.alrt.spd.cc = ( euc.dash.alrt.spd.hapt.hi <= euc.dash.live.spd )? 2 : ( euc.dash.alrt.spd.hapt.low <= euc.dash.live.spd )? 1 : 0 ;
				if ( euc.dash.alrt.spd.hapt.en && euc.dash.alrt.spd.cc == 2 )
					euc.is.alert = 1 + Math.round((euc.dash.live.spd-euc.dash.alrt.spd.hapt.hi) / euc.dash.alrt.spd.hapt.step) ;
			break;
		case 80://amp
			if ( 32768 < this.in16 )
				euc.dash.live.amp = (this.in16 - 65536) / 100 ;
			else 
				euc.dash.live.amp = this.in16 / 100;
			euc.log.ampL.unshift(Math.round(euc.dash.live.amp));
			if (20<euc.log.ampL.length) euc.log.ampL.pop();
			euc.dash.alrt.amp.cc = ( euc.dash.alrt.amp.hapt.hi <= euc.dash.live.amp || euc.dash.live.amp <= euc.dash.alrt.amp.hapt.low )? 2 : ( euc.dash.live.amp  <= -0.5 || 15 <= euc.dash.live.amp)? 1 : 0;
			if (euc.dash.alrt.amp.hapt.en && euc.dash.alrt.amp.cc==2) {
				if (euc.dash.alrt.amp.hapt.hi<=euc.dash.live.amp)	euc.is.alert =  euc.is.alert + 1 + Math.round( (euc.dash.live.amp - euc.dash.alrt.amp.hapt.hi) / euc.dash.alrt.amp.hapt.step) ;
				else euc.is.alert =  euc.is.alert + 1 + Math.round(-(euc.dash.live.amp - euc.dash.alrt.amp.hapt.low) / euc.dash.alrt.amp.hapt.step) ;
			}
			break;
		case 41://total distance
			euc.dash.trip.totl=event.target.value.getUint32(6, true)/1000;
			euc.log.trip.forEach(function(val,pos){ if (!val) euc.log.trip[pos]=euc.dash.trip.totl;});
			break;
		case 185://trip
			euc.dash.trip.last=this.in16/100;
			break;
		case 71://battery fixed/voltage
			euc.dash.live.volt=this.in16/100;
			euc.dash.live.bat=Math.round(100*(euc.dash.live.volt*(100/euc.dash.opt.bat.pack) - euc.dash.opt.bat.low )  / (euc.dash.opt.bat.hi-euc.dash.opt.bat.low));
			//euc.dash.live.bat=(((this.in16/100)-51.5)*10|0);
			euc.log.batL.unshift(euc.dash.live.bat);
			if (20<euc.log.batL.length) euc.log.batL.pop();
			euc.dash.alrt.bat.cc = (50 <= euc.dash.live.bat)? 0 : (euc.dash.live.bat <= euc.dash.alrt.bat.hapt.low)? 2 : 1;
			if ( euc.dash.alrt.bat.hapt.en && euc.dash.alrt.bat.cc ==2 )  euc.is.alert ++;
			break;
		case 37: //remaining
			euc.dash.trip.left=this.in16/100;
			break;
		case 62: //temp
			euc.dash.live.tmp=this.in16/10;
			euc.dash.alrt.tmp.cc=(euc.dash.alrt.tmp.hapt.hi - 5 <= euc.dash.live.tmp )? (euc.dash.alrt.tmp.hapt.hi <= euc.dash.live.tmp )?2:1:0;
			if (euc.dash.alrt.tmp.hapt.en && euc.dash.alrt.tmp.cc==2) euc.is.alert++;
			break;
		case 182: //average
			euc.dash.trip.avrS=(this.in16/1000).toFixed(1);
			break;
		case 58: //runtime
			euc.dash.trip.time=Math.round(this.in16/60);
			break;
		case 210: //riding Mode
			if (this.in16 >=10)  {
              if (face.appCurr=="dashNinebot") face[0].ntfy("MODE CHANGED","",22,4,1);
              buzzer.nav([80,40,80]);
            }else euc.dash.opt.ride.mode=this.in16;
			break;
		case 112: //lock status
			if ( this.in16!=euc.dash.opt.lock.en) euc.dash.opt.lock.en=this.in16;
			break;
		}
    	//buzz
		if (euc.is.alert && !euc.is.buzz) {
			if (!w.gfx.isOn&&(euc.dash.alrt.spd.cc||euc.dash.alrt.amp.cc||euc.dash.alrt.pwr)) face.go(ew.is.dash[ew.def.dash.face],0);
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
	});
	//on disconnect
	euc.gatt.device.on('gattserverdisconnected', euc.off);
	c.startNotifications();
	return  c;
}).then(function(c) {
	//connected
	if (ew.is.bt===2) console.log("EUC: Connected");
	euc.state="READY"; //connected
	buzzer.nav([90,40,150,40,90]);
	euc.dash.opt.lock.en=0;
	//write function
	euc.wri=function(n,v){
		/*if (euc.tout.busy) {
			clearTimeout(euc.tout.busy);
			euc.tout.busy = setTimeout(() => { euc.tout.busy = 0; euc.wri(n,v); }, 250);
			return;
		}
		euc.tout.busy = setTimeout(() => { euc.tout.busy = 0; }, 100);
		*/
		//if (n==="proxy") {
		//		c.writeValue(v).then(function() {
        ////            if (euc.tout.busy) {clearTimeout(euc.tout.busy);euc.tout.busy=0;}
		//		}).catch(euc.off);
		//}else
		if ( euc.state==="OFF" || n==="end" ) {
			euc.is.busy=1;
			if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
			euc.tout.loop=setTimeout( function(){
				euc.tout.loop=0;
				if (!euc.gatt) {euc.off("not connected");return;}
				c.writeValue(euc.cmd((euc.dash.auto.onD.lock)?21:25)).then(function() {
					euc.gatt.disconnect().catch(function(err){if (ew.def.cli)console.log("EUC OUT disconnect failed:", err);});
				}).catch(euc.off);
			},500);
		}else {
			c.writeValue(euc.cmd(v)).then(function() {
                if (euc.tout.busy) {clearTimeout(euc.tout.busy);euc.tout.busy=0;}
				if (euc.is.busy==1||n=="proxy") return;
				if (euc.tout.loop) {clearTimeout(euc.tout.loop); euc.tout.loop=0;}
				euc.tout.loop=setTimeout( function(){
					euc.tout.loop=0;
					euc.temp.count++;
					if (euc.temp.count>=21)euc.temp.count=0;
				    euc.wri(1,euc.temp.count);
				},50);
			}).catch(euc.off);
		}
	};
	if (!ew.do.fileRead("dash","slot"+ew.do.fileRead("dash","slot")+"Mac")) {
		euc.dash.info.get.mac=euc.mac; euc.dash.opt.bat.hi=412;
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		ew.do.fileWrite("dash","slot"+ew.do.fileRead("dash","slot")+"Mac",euc.mac);
	}
    euc.is.busy=0;
	setTimeout(() => {
		euc.wri(1,(euc.dash.auto.onD.lock)?22:26);
		euc.is.run=1;
	}, 500);
//reconnect
}).catch(function(err)  {
	euc.off(err);
});
};
