//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//commands
euc.cmd=function(no){
	
	switch (no) {
		//case "serial":return[85,170,3,9,1,38,2,202,255];
		case "serial":return [0xAA,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x9B,0x14,0x5A,0x5A]; 
    }
	
};
//array
euc.buff=new Uint8Array(35);
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
		this.decode=0;
		this.need=0;
		c.on('characteristicvaluechanged', function(event) {
			this.event=new Uint8Array(event.target.value.buffer);
			//check
           print ("time diff",getTime() - this.last );
			if (  0.2 < getTime() - this.last ) {
				print("took too long, reseting");
				this.need=0;
			}
			if (20 < this.need) {
				euc.buff.set(this.event, 20-this.start);
				print("got 20 more bytes:",euc.buff);
				this.need=this.need-20;
				this.decode=0;
			} else {
				this.lastStart=this.start;
                lala=event;
                this.start = this.event.indexOf(20);
				if  ( -1 < this.start && this.event[this.start+1]===21 && this.event[this.start+2]===22 ) {
					if (0 < this.need) {
						euc.buff.set(this.event,  (20-this.lastStart)+20);								
						this.cmd =  new Uint8Array(euc.buff,0);
						this.need= (this.event[this.start+3]+4) - (20-this.start);
						this.tBuff= new Uint8Array(this.event, this.start);
						euc.buff.set(this.tBuff, 0);							
						this.cmd =  new Uint8Array(euc.buff,0);
						this.decode=1;
						print("got cmd and next start bytes, decoding",this.cmd);
					} else {
						print("got start bytes");
						this.need= (this.event[this.start+3]+4) - (20-this.start);	
						this.tBuff= new Uint8Array(this.event, this.start);
						euc.buff.set(this.tBuff, 0);							
						print("total command will be "+ (this.event[this.start+3]+4)+ " bytes long");
						print("found first",20-this.start, "bytes");
						print("will need",( this.need < 20  )?1:2," more packet(s)");
						print("first part: ", print(euc.buff));
						this.decode=0;
					}
				}else if (0 < this.need) {
					euc.buff.set(this.event, 20-this.lastStart+20);
					this.cmd =  new Uint8Array(euc.buff,0);
					print("got cmd but no next start byte, decoding and starting over",this.cmd);
					this.need=0;
					this.decode=1;
				} else {
					//start over
					this.need=0;
					print("start over");
					this.decode=0;
                    this.last=getTime();
					return;
				}
                this.last=getTime();
			}
			if (this.decode) {
                this.decode=0;
				print("in decode",this.cmd);
              //speed
				euc.dash.spd=this.cmd[6]*10;
				//battery
				voltage=this.cmd[8];
				if (voltage > 10020) {
                        euc.dash.bat = 100;
                } else if (voltage > 8160) {
                       euc.dash.bat = ((voltage - 8070) / 19.5)|0;
                } else if (voltage > 7935) {
                        euc.dash.bat =  ((voltage - 7935) / 48.75)|0;
                } else {
                        euc.dash.bat = 0;
                }
                this.last=getTime();
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
            print(n);
			if (euc.busy) {print(1); clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},500);return;} euc.busy=euc.busy=setTimeout(()=>{euc.busy=0;},500);
            //end
			if (n=="end") {
               c.stopNotifications(); 
				if (euc.kill) {clearTimout(euc.kill);euc.kill=0;}
				global["\xFF"].BLE_GATTS.disconnect();
			//rest
            } else if (!euc.cmd(n)) {
				c.writeValue(n).then(function() {
					//clearTimeout(euc.busy);euc.busy=0;/*c.startNotifications();*/
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});   
            }else{
				c.writeValue(euc.cmd(n)).then(function() {
					clearTimeout(euc.busy);euc.busy=0;c.startNotifications();
				}).catch(function(err)  {
					clearTimeout(euc.busy);euc.busy=0;euc.off("err");
				});
			}
		};
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

