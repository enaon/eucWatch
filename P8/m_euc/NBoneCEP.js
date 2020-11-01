//m_euc
if (!global.euc){
//vars
global.euc= {
  spd: ["0","0"], 
  spdC:col("black"),
  amp: "0", 
  ampC: col("black"), 
  batt: "0", 
  batC: col("lgreen"), 
  temp: "0.0", 
  tmpC: col("lgreen"), 
  trpC: col("black"), 
  trpN: "0.0", 
  trpL: "0.0", 
  trpT: "0.0", 
  trpR: "0.0",
  aver:"0.0",
  rdmd:0,
  time:"0",
  lock: -1,
  alrm: 0,
  conn: "OFF",
  alck: 0,
  far: 83,
  near: 65,
  mac: 0, //enaon
//  mac: "88:C2:55:32:F6:5B public", //manowar
//  mac: "20:91:48:AB:2A:AD public", //megadeath
//  mac: "20:91:48:BC:91:3B public", //poet
};
//alerts
euc.alert = {
  spd: 23,
  temp: 60,
  batt: 20,
  ampH: 18,
  ampL: -6,
  on: false,
};
//toggle on/off
euc.tgl=function(){ 
  if (euc.conn!="OFF" ) {
    digitalPulse(D16,1,[90,60,90]);  
	if (euc.tmp.reconnect>=0 ||  euc.conn=="WAIT" || euc.conn=="ON") {
    clearTimeout(euc.tmp.reconnect); euc.tmp.reconnect=-1;
    }
  	euc.conn="OFF";
	face.go("euc",0);
  }else {
    digitalPulse(D16,1,100);   
	euc.mac=(require("Storage").readJSON("setting.json",1)||{}).euc_mac;
	euc.go=(require("Storage").readJSON("setting.json",1)||{}).euc_go;
	if(!euc.mac) {face.appCurr="euc";face.go('w_scan',0,'ffe0');}
	else {
	if (euc.conn == "OFF") euc.tmp.count=22; else euc.tmp.count=0;  //unlock
	euc.conn="ON";
	euc.con(euc.mac[euc.go]); 
	face.go("euc",0);
	}
  } 

};
//face.eRun=1;
euc.tmp = {
  spd: ["0","0"], 
  amp: "0", 
  temp: "0", 
  count:0,
  batt: "0", 
  trpN: "0",
  cmd: false,
  loop:-1,
  reconnect:-1,
  rssi:"",
};
}
euc.cmd=function(no){
	switch (no) {
      case 0:case 3:case 6:case 9:case 12:case 15:case 18:
	  return [85,170,3,9,1,80,2,160,255]; //Current Amperage with sign if v[80] > 32768 I = v[80] - 65536 else I = v[80] in Amperes * 100
	case 1:case 4:case 7:case 10:case 13:case 16:case 19:
	  return [85,170,3,9,1,38,2,202,255]; //Current Speed in Km/h*1000d
	case 2:
	  return [85,170,3,9,1,62,2,178,255]; //Temperature numeric positive C * 10
	case 5:
	  return [85,170,3,9,1,71,2,169,255]; //Voltage numeric positive V * 100
	case 8:
	  return [85,170,3,9,1,185,2,55,255]; //Single Mileage numeric positive in meters
	case 11:	  
	  return [85,170,3,9,1,58,2,182,255]; //Single Runtime numeric positive seconds
	case 14:
	  return [85,170,3,9,1,37,2,203,255]; //remaining mileage in Km*100
	case 17:
	  return [85,170,3,9,1,182,2,58,255]; //Average speed numeric positive m/h
	case 20:
	  return [85,170,3,9,1,112,2,128,255]; //Lock status
	case 21:
	  return [85,170,3,9,3,112,1,127,255]; //21- lock
	case 22:
	  return [85,170,3,9,3,112,0,128,255]; //22- unlock
	case 23:
	  return [85,170,3,9,1,210,2,30,255]; //23 get Riding Mode
	case 24:
	  return [85,170,4,9,2,210,0,0,30,255]; //24 set Riding Mode 0
	case 25:
	  return [85,170,4,9,2,210,1,0,29,255]; //25 set Riding Mode 1
	case 26:	  
	  return [85,170,3,9,2,210,2,29,255]; //26 set Riding Mode 2
	case 27:
	  return [85,170,3,9,2,210,3,28,255]; //27 set Riding Mode 3
	case 28:
	  return [85,170,3,9,2,210,4,27,255]; //28 set Riding Mode 4
	case 29:
	  return [85,170,3,9,2,210,5,26,255]; //29 set Riding Mode 5
	case 30:
	  return [85,170,3,9,2,210,6,25,255]; //30 set Riding Mode 6
	case 31:
	  return [85,170,3,9,2,210,7,24,255]; //31 set Riding Mode 7  
	case 32:
	  return [85,170,3,9,2,210,8,23,255]; //32 set Riding Mode 8
	case 33:
	  return [85,170,3,9,2,210,9,22,255];  //33 set Riding Mode 9
	}
};
//
euc.con=function(mac){
var euc_var;
var euc_al;
var euc_al_s;
var euc_al_a;
var euc_al_t;
var euc_al_b;
var tt=0;
var ts=0;
var ta=0;
var tr=0;
var tb=0;
var te=0; 
var tv=0; 
var tm=0; 
euc.tmp.spd[0]="-1";
euc.tmp.spd[1]="-1";
euc.tmp.amp="-1";
euc.tmp.temp="-1";
euc.tmp.batt="-1";
euc.tmp.trpN="-1";  
euc.spdC=col("black");
euc.tmp.rssi="-70";

if ( global["\xFF"].BLE_GATTS!="undefined") {
	if (set.def.cli) print("ble allready connected"); 
	if (global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
	return;
}
NRF.connect(mac,{minInterval:7.5, maxInterval:7.5})
.then(function(g) {
   return g.getPrimaryService(0xffe0);
}).then(function(s) {
  return s.getCharacteristic(0xffe1);
}).then(function(c) {
//  euc.tmp.characteristic=c;
  c.on('characteristicvaluechanged', function(event) {
  euc_var = event.target.value.getUint8(5, true);
  // if off button is pressed on euc
  if (euc_var==0) {
	  euc.conn="WAIT";
	  digitalPulse(D16,1,200);
      //return;
  //alarm
  }else if (euc_var==178) {
	  euc.tmp[euc_var] = event.target.value.getUint8(6, true);

/*     if (Number(euc_val).toString(2)[1]==1 &&  euc_alarm==0) {
        euc_alarm=1; 
        //if (set.def.cli) console.log("EUC_alarm :",euc_val);
        digitalPulse(D16,1,[250,50,250,50,250]);
		if (face.pageCurr==-1) {
			g.clear();	
            g.setFontVector(30);
			g.drawString("!",9, 30);
			g.flip();g.on();
			face.offid=setTimeout(() => {g.off();face.offid=-1}, 2000);
		}
	    setTimeout(() => { euc_alarm=0; }, 100);
      }
*/
//  }else if (euc_var==210) {
//	euc.tmp[euc_var] = event.target.value.getUint8(6, true);
//    euc.rdmd=euc.tmp[euc_var];
  // rest
  }else  {  
    euc.tmp[euc_var]=event.target.value.getUint16(6, true);
    euc_al=0;
	//speed
	if (euc_var==38 && euc.tmp[euc_var]!=ts) {
      euc.spd=(euc.tmp[euc_var]/1000).toFixed(1).toString().split('.');
		euc_al_s=false;	  
	  if (euc.spd[0]>=euc.alert.spd) {
		if (euc.spd[0]>=euc.alert.spd+5) euc.spdC=col("red");	
		else if (euc.spd[0]>=euc.alert.spd+2) euc.spdC=col("yellow");
		else euc.spdC=col("white");
		euc_al=(1+(euc.spd[0]|0)-euc.alert.spd);
		euc_al_s=true;
      } else euc.spdC=col("black");
      ts=euc.tmp[euc_var];
    //amp
    }else  if (euc_var==80 && euc.tmp[euc_var]!=ta) {
      if (euc.tmp[80]>32768) euc.amp=((euc.tmp[80]-65536)/100).toFixed(1); 
      else euc.amp=(euc.tmp[euc_var]/100).toFixed(1);
	  euc_al_a=false;
	  if (euc.amp>=euc.alert.ampH) {
		if  (euc.amp>=euc.alert.ampH+5 ) euc.ampC=col("red");
		else euc.ampC=col("yellow");
		euc_al=(euc_al+1+(euc.amp-euc.alert.ampH))|0;
		euc_al_a=true;
	  }else if (euc.amp>=10) { euc.ampC=col("purple");
	  }else if ( euc.amp<=euc.alert.ampL) {
		if  (euc.amp<=euc.alert.ampL-5 ) euc.ampC=col("red");
		else  euc.ampC=col("yellow");
		euc_al=(euc_al+1+(-(euc.amp-euc.alert.ampL)))|0;      
		euc_al_a=true;
	  }else if (euc.amp<0) euc.ampC=col("white"); else euc.ampC=col("black");
      ta=euc.tmp[euc_var];
	//trip
    }else if (euc_var==185 && euc.tmp[euc_var]!=tt) {
      if (euc.trpN > (euc.tmp[euc_var]/100).toFixed(1)) {
        euc.trpL=Number(euc.trpL)+Number(euc.trpN);
        if (set.def.cli) console.log("EUC_trip new :",euc.trpL);
      } 
      euc.trpN=(euc.tmp[euc_var]/100).toFixed(1);
	  euc.trpT=Number(euc.trpL)+Number(euc.trpN);
      tt=euc.tmp[euc_var];
    //battery fixed
    }else  if (euc_var==71 && euc.tmp[euc_var]!=tb) {
      euc.batt=(((euc.tmp[euc_var]/100)-51.5)*10|0); 
	  euc_al_t=false;
	  if ((euc.batt) >= 70) euc.batC=col("lblue");
      else  if ((euc.batt) >= 40) euc.batC=col("purple");
      else  if ((euc.batt) >= euc.alert.batt) euc.batC=col("yellow");
      else  {
		euc.batC=col("red");
		euc_al++;
		euc_al_b=true;
	  }
      tb=euc.tmp[euc_var];
    //remaining
    }else if (euc_var==37 && euc.tmp[euc_var]!=tr) {
      euc.trpR=(euc.tmp[euc_var]/100).toFixed(1);
      tr=euc.tmp[euc_var];
     //temp
    }else if (euc_var==62 && euc.tmp[euc_var]!=te) {
      euc.temp=(euc.tmp[euc_var]/10).toFixed(1);
      if (euc.temp>=euc.alert.temp ) {
		if (euc.temp>=65) euc.tmpC=col("red");
		else euc.tmpC=col("yellow");
		euc_al++;
		euc_al_t=true;
	  } else if (euc.temp>=50 ) euc.tmpC=purple; else euc.tmpC=col("lblue");	  
      te=euc.tmp[euc_var];
	 //average
    }else if (euc_var==182 && euc.tmp[euc_var]!=tv) {
      euc.aver=(euc.tmp[euc_var]/1000).toFixed(1);
      tv=euc.tmp[euc_var];
    }//runtime
    else if (euc_var==58 && euc.tmp[euc_var]!=tm) {
      euc.time=(euc.tmp[euc_var]/60).toFixed(0);
      tm=euc.tmp[euc_var];
	}//riding Mode
	else if (euc_var==210 ) {
	  if (euc.tmp[euc_var] >=10)  digitalPulse(D16,1,[100,80,100]);  
	  else euc.rdmd=euc.tmp[euc_var];
    } //lock
    else if (euc_var==112 && euc.tmp[euc_var]!=euc.lock) {
      euc.lock=euc.tmp[euc_var];
	  if (euc.lock==1) {
		euc.spdC=col("purple");
		euc.ampC=col("purple");
		euc.tmpC=col("purple");
		euc.batC=col("purple");
        euc.tmp.spd[0]="-1";
		euc.tmp.amp="-1";
		euc.tmp.temp="-1";
		euc.tmp.batt="-1";
		euc.tmp.trpN="-1";
      }else {
		 euc.spdC=col("black");
		euc.ampC=col("black");
		euc.tmpC=col("lblue");
		euc.batC=col("lblue");
		euc.tmp.spd[0]="-1";
		euc.tmp.amp="-1";
		euc.tmp.temp="-1";
		euc.tmp.batt="-1";
		euc.tmp.trpN="-1";
      }
    }
	//alerts
      if (euc_al!=0 && euc.alert.on!=true) {  
         euc.alert.on=true;
		var a=[200];
		var i;
		for (i = 1; i < euc_al ; i++) {
			a.push(150,100);
		}
        digitalPulse(D16,1,a);  
        setTimeout(() => {euc.alert.on=false; }, 2000);
      }
    }
  });
c.startNotifications(); 
return  c;
}).then(function(c) {
//connected 
  if (set.def.cli) console.log("EUC connected"); 
  euc.conn="READY"; //connected
  digitalPulse(D16,1,[90,40,150,40,90]);
  setTimeout(function(){  euc.wri(c); },100); 
//on disconnect
  global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
    if (set.def.cli) console.log("EUC Disconnected :",reason);
    if (euc.conn!="OFF") {  
	 if (set.def.cli) console.log("EUC restarting");
     euc.conn="WAIT"; 
     setTimeout(() => {  euc.con(euc.mac[euc.go]); }, 1500);
    }else {
	  if (set.def.cli) console.log("Destroy euc (reason):",reason);
      if (euc.tmp.loop!==-1) clearInterval(euc.tmp.loop);
	  global["\xFF"].bleHdl=[];
	  global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
//	  euc.wri=undefined;
//	  euc.con=undefined;
//	  euc.cmd=undefined;
//	  euc.tmp=undefined;
//	  DataView=undefined;
	  //NRF.setTxPower(0);
    }
  });
//reconect
}).catch(function(err)  {
  if (set.def.cli) console.log("EUC", err);
//  global.error.push("EUC :"+err);
  clearInterval(euc.tmp.loop);euc.tmp.loop=-1;
  if (euc.conn!="OFF") {
    if (set.def.cli) console.log("not off");
    if ( err==="Connection Timeout"  )  {
	  if (typeof global["\xFF"].timers[euc.tmp.reconnect] !== "undefined") clearTimeout(euc.tmp.reconnect); 
	  if (set.def.cli) console.log("retrying :timeout");
	  euc.conn="LOST";
	  if (euc.lock==1) digitalPulse(D16,1,250);
	  else digitalPulse(D16,1,[250,200,250,200,250]);
	  euc.tmp.reconnect=setTimeout(() => {
	    euc.con(euc.mac[euc.go]); 
	  }, 10000);
	}else if ( err==="Disconnected"|| err==="Not connected")  {
	  if (typeof global["\xFF"].timers[euc.tmp.reconnect]  !== "undefined") clearTimeout(euc.tmp.reconnect); 
      if (set.def.cli) console.log("retrying :",err);
      euc.conn="FAR";
	  if (euc.lock==1) digitalPulse(D16,1,100);
	  else digitalPulse(D16,1,[100,150,100]);
      euc.tmp.reconnect=setTimeout(() => {
	    euc.con(euc.mac[euc.go]); 
      }, 5000);
    }
  } else {
	  if (euc.tmp.loop!=-1) {
		clearInterval(euc.tmp.loop);
		euc.tmp.loop=-1;
	  }
      if (euc.tmp.loop!==-1) clearInterval(euc.tmp.loop);
	  global["\xFF"].bleHdl=[];
      global.BluetoothDevice=undefined;
	  global.BluetoothRemoteGATTServer=undefined;
	  global.BluetoothRemoteGATTService=undefined;
	  global.BluetoothRemoteGATTCharacteristic=undefined;
	  global.Promise=undefined;
	  global.Error=undefined;
  }
});
};
//function eRea() {
//}
//main loop
euc.wri= function(ch) {
 
  var euc_still_tmr=0;
  var euc_still=false;
  var busy = false;
  var euc_near=0;
  var euc_far=0;
  //gatt.setRSSIHandler();
  if (euc.tmp.loop >= 0) {clearInterval(euc.tmp.loop); euc.tmp.loop=-1;}
  euc.tmp.loop = setInterval(function() {
    if (busy  ) return;
	//check if still
    if (euc.spd[0]==0 && euc_still==false) {
      euc_still=3;
      //if (typeof euc_still_tmr !== "undefined") {clearTimeout(euc_still_tmr);}
      euc_still_tmr=(setTimeout(() => { 
        euc_still=true;
      },5000));
    }else if (euc.spd[0]>=1 && euc_still!=false) {
      clearTimeout(euc_still_tmr);
      euc_far=0;
      euc_still=false;
      changeInterval(euc.tmp.loop,100); 
    }
	//proximity auto lock 
    if (euc.alck===1) {
    global["\xFF"].BLE_GATTS.setRSSIHandler(function(rssi) {euc.tmp.rssi=rssi; });
    if (euc.tmp.rssi< -(euc.far) && euc_still==true && euc.lock==0) {
//      if (set.def.cli) console.log("far start");
	  euc_far++;
	  euc_near=0;
	  if (euc_far > 8 && euc.lock==0 ) {
		if (busy ) return;
     		busy = true;
			ch.writeValue(euc.cmd(21)).then(function() {
				euc.lock=1;
				busy = false;
		        euc.spdC=col("purple");
		        euc.ampC=col("purple");
		        euc.tmpC=col("purple");
		        euc.batC=col("purple");
				euc.tmp.spd[0]="-1";
				euc.tmp.spd[1]="-1";
				euc.tmp.amp="-1";
				euc.tmp.temp="-1";
				euc.tmp.batt="-1";
				euc.tmp.trpN="-1";
				digitalPulse(D16,1,[90,60,90]);
			});
      }
	}else if  (euc.tmp.rssi> -(euc.near) && euc.spd[0]<=5 && euc.lock==1 ) {
		euc_far=0;
			if (busy ) return;
			busy = true;
			ch.writeValue(euc.cmd(22)).then(function() {
			  busy = false;
			  euc_near=0;
			  euc.lock=0;
		        euc.spdC=col("black");
		        euc.ampC=col("black");
		        euc.tmpC=col("lblue");
		        euc.batC=col("lblue");
				euc.tmp.spd[0]="-1";
				euc.tmp.spd[1]="-1";
				euc.tmp.amp="-1";
				euc.tmp.treseeseseseemp="-1";
				euc.tmp.batt="-1";
				euc.tmp.trpN="-1";
			    digitalPulse(D16,1,100);
				if (set.def.cli) console.log("unlock");
            });
	} else  { euc_far=0; euc_near=0; }
    }
	//send command
    if (busy ) return;
	//only alarms when locked
    if (euc.lock==1 && euc.tmp.count<=21 && euc.spd[0]==0) {euc.tmp.count=20;changeInterval(euc.tmp.loop,2000);}
	//only get alarms-speed when still
//	else if (euc_still==true && euc.tmp.count<19 ) {euc.tmp.count=19;changeInterval(euc.tmp.loop,500);}
    else if (euc_still==true && euc.tmp.count<19 ) {changeInterval(euc.tmp.loop,500);}
    else if  ( euc_still!=true && euc.spd[0]<=2)  {changeInterval(euc.tmp.loop,200);	}
	else if  (euc.spd[0]>2 && face.appCurr=="euc")  {changeInterval(euc.tmp.loop,50);}
//    else if  (euc.spd[0]>2 && face.pageCurr!=-1)  {changeInterval(euc.tmp.loop,100);}
    else changeInterval(euc.tmp.loop,100);
	busy = true;
//	print("cmd:",euc.tmp.count);
	ch.writeValue(euc.cmd(euc.tmp.count)).then(function() {
		euc.tmp.count++;
		if (euc.tmp.count>=21) euc.tmp.count=0;
		if (euc.conn=="OFF"){
			if (set.def.cli) console.log("EUCstartOff");
			clearInterval(euc.tmp.loop);
			euc.tmp.loop=-1;
			euc.lock=1;
			digitalPulse(D16,1,120);
			euc.tmp.count=21;
			ch.writeValue(euc.cmd(euc.tmp.count)).then(function() {
			global["\xFF"].BLE_GATTS.disconnect();
			});
			return;
		}
		busy = false;

    });

  }, 100);  
};  
