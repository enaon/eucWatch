//Veteran euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(no){
	
	switch (no) {
		
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
    }
	
};
//array
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
		euc.busy=0;
		c.on('characteristicvaluechanged', function(event) {
			//check
			this.time=0;
			for (c in event.target.value.buffer) {
				//if (euc.unpk.addC(event.target.value.buffer[c])) {
				if (unpack(event.target.value.buffer[c])) {
				print("got buffer :",buff);
				}
            }
			//end
			//this.var= event.target.value.getUint8(16, true);
			//print (event.target.value.buffer);
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		console.log("EUC Veteran connected"); 
		digitalPulse(D16,1,[90,40,150,40,90]);
		euc.wri= function(n) {
			if (euc.busy) {print(1); clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
			if (!euc.cmd(n)) {
              //print(2);
				c.writeValue(n).then(function() {
					//clearTimeout(euc.busy);euc.busy=0;/*c.startNotifications();*/
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			//rest
			}else{
              //print(3);
				c.writeValue(euc.cmd(n)).then(function() {
                                print(31);

					clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
		setTimeout(() => {print(0);euc.wri("serial");euc.state="READY";}, 500);

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
//wheellog port

sta=0; //unknown,collecting,lensearch,done
buff=new Uint8Array(35);
old1=0;
old2=0;
len=0;
cnt=0;


unpack = function (c){
  
  
  switch (sta) {
			case 1: //collecting
				buff[cnt]=c;
				cnt++;
				if (buff.length == len+4) {
					sta = 3;
					//print("done");
					rese();
					return true;
				}
				break;
			case 2: //lensearch
				buff[cnt]=c;
				cnt++;
				len = c;
				sta = 1;
				old2 = old1;
				old1 = c;
				//print(" lensearch, len:", len ) ;
				break;
			default:
				if (c == 92 && old1 ==  90 && old2 ==  220 ) {
					buff[0]=220;
					buff[1]=90;
					buff[2]=92;
					cnt=3;
					//print("start");
					sta = 2;
				} else if (c ==  90 && old1 ==  220) {
					old2 = old1;
				} else {
					old2 = 0;
				}
				old1 = c;
		}
		return false;
  
 
};


rese =function () {
  old1 = 0;
  old2 = 0;
  sta = 0;
  cnt=0;
} ; 
  

