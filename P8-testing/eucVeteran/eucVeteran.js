//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands




euc.cmd=function(no){
	
	switch (no) {
		
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
		case "model":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x63,0x14,0x5A,0x5A];
		case "info1":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A]; 
		case "info2":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x54,0x14,0x5A,0x5A]; 
		case "lightsOn":euc.seq=0;return [0xAA,0x55,0x12,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsOff": euc.seq=0;return [0xAA,0x55,0x13,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];  
		case "lightsAuto":euc.seq=0;return [0xAA,0x55,0x14,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x73,0x14,0x5A,0x5A];
		case "lightsCity": if (euc.night) {return euc.cmd("lightsAuto");} else {return euc.cmd("lightsOff");} break;
		case "rideSoft":return [0xAA,0x55,0x02,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideMed":return [0xAA,0x55,0x01,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];
		case "rideHard":return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x87,0x14,0x5A,0x5A];  
		case "lock":euc.dash.lock=1;return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x5d,0x14,0x5A,0x5A]; 
		case "unlock":euc.dash.lock=0;return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x37,0x37,0x33,0x35,0x32,0x35,0x5d,0x14,0x5A,0x5A];
		case "strobeOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "strobeOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x53,0x14,0x5A,0x5A];
		case "off":euc.seq=0;return [0xAA,0x55,0x00,0xE0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x14,0x5A,0x5A];
		case "passSend":return    [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x44,0x14,0x5A,0x5A]; 
		case "passChange": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x30+Number(euc.dash.passOld[0]),0x30+Number(euc.dash.passOld[1]),0x30+Number(euc.dash.passOld[2]),0x30+Number(euc.dash.passOld[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "passClear": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x42,0x14,0x5A,0x5A];  //rf 43
		case "passSet": return [0xAA,0x55,0x30+Number(euc.dash.pass[0]),0x30+Number(euc.dash.pass[1]),0x30+Number(euc.dash.pass[2]),0x30+Number(euc.dash.pass[3]),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x41,0x14,0x5A,0x5A]; //rf 43
		case "calibrate":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x89,0x14,0x5A,0x5A];  
		case "tiltSet":euc.dash.tiltSet=(99<=euc.dash.tiltSet||-99>=euc.dash.tiltSet)?0:euc.dash.tiltSet;let tiltSet=(0<=euc.dash.tiltSet)?euc.dash.tiltSet:255+euc.dash.tiltSet;
			return [0xAA,0x55,0x01,0x00,tiltSet,(tiltSet<=100)?0:255,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x8A,0x14,0x5A,0x5A]; //rf 8A
		case "liftOn":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A]; //rf 4C
		case "liftOff":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7E,0x14,0x5A,0x5A];
		case "setSpeedLimits":return [0xAA,0x55,(euc.dash.spd1E)?Number(euc.dash.spd1):0x00,0x00,(euc.dash.spd2E)?Number(euc.dash.spd2):0x00,0x00,Number(euc.dash.spd3),0x00,Number(euc.dash.spdT),0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,0x14,0x5A,0x5A]; //speed in kph, rf A4
		case "rideLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 6E
		case "rideLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A];
		case "musicLedOn":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x7D,0x14,0x5A,0x5A]; //rf 6E
		case "musicLedOff":return [0xAA,0x55,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x6C,0x14,0x5A,0x5A]; //rf 4A
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
		
		c.on('characteristicvaluechanged', function(event) {
			
			//check
			
			
			
			
			//end
			
			
			this.var= event.target.value.getUint8(16, true);
			//print (event.target.value.buffer);
			if (euc.busy) 
				return;
				
			if (this.var==169) {
				//forward euc emu
				if (set.bt==4&&euc.dash.emu==1) euc.emuW(event.target.value.buffer);
				euc.alert=0;
				//speed
				euc.dash.spd=(event.target.value.getUint16(4, true)/100).toFixed(0); 
				euc.dash.spdC=(euc.dash.spd<=euc.dash.spd2)?1:(euc.dash.spd<=euc.dash.spd3)?2:3;	
				if ( euc.dash.hapS && euc.dash.spd>=euc.dash.spd1) 
					euc.alert=(1+((euc.dash.spd-euc.dash.spd1)/euc.dash.spdS|0));  
				//City lights 
				if ( euc.dash.aLight === "lightsCity" ) { 
					if (euc.night) {
						if ( 20 < euc.dash.spd && euc.dash.light !== 1  ) {
							euc.dash.light = 1 ;
							euc.wri("lightsOn") ;
						} else if ( euc.dash.spd < 10 && euc.dash.light !== 2  ) {
							euc.dash.light = 2 ;
							euc.wri("lightsAuto") ;
						}
					} 
					
					else {
						if ( 35 < euc.dash.spd && !euc.dash.strobe  ) {
							euc.dash.strobe=1; 
							euc.wri("strobeOn") ;
						} else if  ( euc.dash.spd < 30 && euc.dash.strobe  ) {
							euc.dash.strobe = 0 ;
							euc.wri("strobeOff") ;
						} else if  ( 25 < euc.dash.spd && euc.dash.light !== 1  ) {
							euc.dash.light = 1 ;
							euc.wri("lightsOn") ;
						} else if ( euc.dash.spd < 15 && euc.dash.light !== 0  ) {
							euc.dash.light = 0 ;
							euc.wri("lightsOff") ;
						}
					}
                }
				//amp							 
				this.amp=event.target.value.getUint16(10, true);
				if (this.amp > 32767) 
					this.amp = this.amp - 65536;
				euc.dash.amp=(this.amp/100).toFixed(0);
				euc.dash.ampC=(euc.dash.amp>=euc.dash.ampH+10||euc.dash.amp<=euc.dash.ampL-5)?3:(euc.dash.amp>=euc.dash.ampH||euc.dash.amp<=euc.dash.ampL)?2:(euc.dash.amp<0)?1:0;
				if ( euc.dash.ampH <= euc.dash.amp ){
					euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
					if (euc.dash.hapA) 
						euc.alert=(euc.alert+1+((euc.dash.amp-euc.dash.ampH)/euc.dash.ampS|0));
				}
				else if ( euc.dash.amp <= euc.dash.ampL )  {
					euc.dash.spdC=(euc.dash.ampC=3)?3:(euc.dash.spdC=3)?3:2;
					if (euc.dash.hapA) 
						euc.alert=(euc.alert+1+((-(euc.dash.amp-euc.dash.ampL))/euc.dash.ampS|0));  				
				}
				//volt
				this.volt=event.target.value.getUint16(2, true)/100;
				euc.dash.bat=(((this.volt/20)*100-330)*1.1111)|0;
				euc.dash.batC=(euc.dash.bat>=euc.dash.batH)?0:(euc.dash.bat>=euc.dash.batM)?1:(euc.dash.bat>=euc.dash.batL)?2:3;	
				if (euc.dash.bat<=euc.dash.batL) {
					euc.alert++ ; 
					euc.dash.spdC = 3 ;
				}     
				//temp
				euc.dash.tmp=(event.target.value.getUint16(12, true)/100).toFixed(1);
				euc.dash.tmpC=(euc.dash.tmp<=euc.dash.tmpM)?0:(euc.dash.tmp<=euc.dash.tmpH)?2:0;	
				if (euc.dash.tmp>=euc.dash.tmpH) {euc.alert++; euc.dash.spdC=3;} 
				//total mileage
				euc.dash.trpT=(((event.target.value.buffer[6] << 16) + (event.target.value.buffer[7] << 24) + event.target.value.buffer[8] + (event.target.value.buffer[9] << 8))/1000).toFixed(1);
				//mode                                    
				euc.dash.mode=event.target.value.getUint8(14, true);
				//alerts
				if (!euc.alert)  euc.dash.spdC=0;
				else if (!euc.buzz) {  
					euc.buzz=1;
					if (20<=euc.alert) euc.alert=20;
					var a=[];
					while (5 <= euc.alert) {
						a.push(150,500);
						euc.alert=euc.alert-5;
					}
					var i;
					for (i = 0; i < euc.alert ; i++) {
						a.push(150,150);
					}
					digitalPulse(D16,0,a);  
					setTimeout(() => {euc.buzz=0; }, 3000);
				}
			}
			
			else if  (this.var==185){
				//trip-time-max speed
				euc.dash.trpL=(((event.target.value.buffer[2] << 16) + (event.target.value.buffer[3] << 24) + event.target.value.buffer[4] + (event.target.value.buffer[5] << 8)) / 1000.0).toFixed(1);
				euc.dash.time=((event.target.value.getUint16(6, true)) / 60.0).toFixed(0);
				euc.dash.spdM=((event.target.value.getUint16(8, true)) / 100.0).toFixed(1);
			}
			
			else if  (this.var==95){
				euc.dash.lock=event.target.value.getUint8(2, true);
			} //else print(event.target.value.buffer); 
			
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
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
			if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
					//clearTimeout(euc.busy);euc.busy=0;/*c.startNotifications();*/
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			
			//rest
			}else{
				c.writeValue(euc.cmd(n)).then(function() {
					clearTimeout(euc.busy);euc.busy=0;/*c.startNotifications();*/
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
		euc.wri("start");
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
euc.unpk={
		sta:0, //unknown,collecting,lensearch,done
		buff:[],
		old1:0,
		old2:0,
        len:0,

//        byte[] getBuffer() {
//            return buffer.toByteArray();
//        }

        addC: function(c) {

            switch (sta) {

                case 1: //collecting
                    buff.push(c);
                    bufS = buff.lenght;
                    if (buff.length == len+4) {
                        sta = 3;
						print("done");
                        reset();
                        return true;
                    }
                    break;

                case 2: //lensearch
                    buff.push(c);
                    len = c & 0xff;
                    sta = 1;
                    old2 = old1;
                    old1 = c;
					print(" lensearch, len:", len ) ;
                    break;

                default:
                    if (c == 0x5C && old1 ==  0x5A && old2 ==  0xDC) {
                        buff = [];
                        buff.push(0xDC);
                        buff.push(0x5A);
                        buff.push(0x5C);
						print("start");
                        sta = 2;
                    } else if (c ==  0x5A && old1 ==  0xDC) {
                        old2 = old1;
                    } else {
                        old2 = 0;
                    }
                    old1 = c;

            }
            return false;
        },

        reset: function() {
            old1 = 0;
            old2 = 0;
            sta = 0;

        }
    }