//Vteran euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(no){
	
	switch (no) {
		//case "serial":return[85,170,3,9,1,38,2,202,255];
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
    }
	
};
//start
euc.conn=function(mac){
	//check
	if ( global["\xFF"].BLE_GATTS!="undefined") {
		if (set.def.cli) print("ble allready connected"); 
		if (global["\xFF"].BLE_GATTS.connected) {global["\xFF"].BLE_GATTS.disconnect();return;}
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
		this.need=0;
		c.on('characteristicvaluechanged', function(event) {
			this.event=new Uint8Array(event.target.value.buffer);
			//print(this.event);
			if  ( this.event[0]===220 && this.event[1]===90 && this.event[2]===92 ) {
				//print("primary packet");
				euc.dash.volt=(this.event[4]  << 8 | this.event[5] )/100;
				euc.dash.bat = Math.round(((euc.dash.volt / 24) * 100 - 310 ) * 0.95);
				batL.unshift(euc.dash.bat);
				if (20<batL.length) batL.pop();
				euc.dash.batC = (euc.dash.batH <= euc.dash.bat)? 0 : (euc.dash.batM <= euc.dash.bat)? 1 : (euc.dash.batL <= euc.dash.bat)? 2 : 3;	
				batL.unshift(euc.dash.bat);
				if (20<batL.length) batL.pop();
				euc.dash.spd=Math.round((this.event[6] << 8 | this.event[7]) / 10);
				if (euc.dash.spdM <euc.dash.spd) euc.dash.spd = euc.dash.spdM;
				euc.dash.trpL=(this.event[10] << 24 | this.event[11] << 16 | this.event[8] << 8  | this.event[9])/1000;
				euc.dash.trpT=(this.event[14] << 24 | this.event[15] << 16 | this.event[12] << 8  | this.event[13])/1000;
				if (!euc.log.trpS) euc.log.trpS=euc.dash.trpT;
				euc.dash.amp=event.target.value.getInt16(16)/100;
				if (euc.dash.ampR) euc.dash.amp=-euc.dash.amp;				
					ampL.unshift(euc.dash.amp);
					if (20<ampL.length) ampL.pop();
				euc.dash.ampC = ( euc.dash.ampH+10 <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL - 5 )? 3 : ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp < 0 )? 1 : 0;
				euc.dash.tmp=((this.event[18] << 8 | this.event[19])/100).toFixed(1);
				euc.dash.tmpC = (euc.dash.tmp <= euc.dash.tmpH)? 0 : (euc.dash.tmp <= euc.dash.tmpH+5)? 2 : 3;	
			} else {
				//print("secondary packet");
				euc.dash.off=(this.event[0] << 8 | this.event[1]);
				euc.dash.chrg=(this.event[2] << 8 | this.event[3]);
				euc.dash.spd1=((this.event[4] << 8 | this.event[5]) / 10)|0;
				euc.dash.spdT=((this.event[6] << 8 | this.event[7]) / 10)|0;
				euc.dash.model=(this.event[8] << 8 | this.event[9]);
				euc.dash.mode=(this.event[10] << 8 | this.event[11]);
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Veteran connected!!"); 
		digitalPulse(D16,1,[90,40,150,40,90]);
		euc.wri= function(n) {
            //print(n);
			if (euc.busy) {print(1); clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
            //end
			if (euc.state=="OFF") {
               c.stopNotifications(); 
				if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
				setTimeout(()=>{global["\xFF"].BLE_GATTS.disconnect();if (set.def.cli) console.log("EUC Veteran out");},300);
            }else{
				c.writeValue(euc.cmd(n)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					c.startNotifications();
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.mac=euc.mac; 
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		setTimeout(() => {euc.wri("serial");euc.state="READY";}, 500);

	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {
		clearTimeout(euc.reconnect);
		euc.reconnect=0;
	}
	if (euc.state!="OFF") {
        euc.seq=1;
		if (set.def.cli) 
			console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if (euc.dash.lock==1) digitalPulse(D16,1,250);
			else digitalPulse(D16,1,[250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 5000);
		}
		else if ( err==="Disconnected"|| err==="Not connected")  {
			if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 500);
		}
		else {
			if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				euc.conn(euc.mac); 
			}, 1000);
		}
	} else {
		if (set.def.cli) 
			console.log("EUC OUT:",err);
		global["\xFF"].bleHdl=[];
			clearTimeout(euc.busy);euc.busy=0;
			delete euc.off;
			delete euc.conn;
			delete euc.wri;
			delete euc.cmd;
			delete euc.unpk;
			NRF.setTxPower(set.def.rfTX);	
    }
};

