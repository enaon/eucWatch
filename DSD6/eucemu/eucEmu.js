E.setConsole(Serial1,{force:true}); //0000 devmode
euc={};
euc.emuF=1;
euc.emuR=function(evt){
	print("in",evt);

};
euc.emuW= function(o) {
	print("wr");
};
//NRF.setServices(undefined,{uart:false });
//
NRF.setServices({
    0xfee7: {
		0xfec8: {
			value : [0x02],
			maxLen : 20,
		    onWrite : function(evt) {
			  euc.emuR(evt);
			},
			readable:true,
            description:"Characteristic 2"
		},
		0xfec7: {
			value : [0x02],
			maxLen : 20,
		    onWrite : function(evt) {
			  euc.emuR(evt);
			},
			readable:true,
            description:"Characteristic 2"
		},
		0xfec9: {
			value : [0x02],
			maxLen : 20,
		    onWrite : function(evt) {
			  euc.emuR(evt);
			},
			readable:true,
            description:"Characteristic 2"
		}
  }
}, { });
//

E.setConsole(Serial1,{force:true}); //0000 devmode
function bcon() {
    Bluetooth.on('data',ccon);
	/*emuMon=setInterval(() => { 
		let btin=Bluetooth.read();
		if (btin) {
			print (btin);
		}	
	}, 100);
	*/
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	//if (emuMon) { clearInterval(emuMon);emuMon=0;}
}
function ccon(l){ 
    line=l;
	print(line);
	if (l=="U\xAA\3\x11\1\x1A\2\xCE\xFF"){
		print(1,line,l.charCodeAt(0));
	}
	else if  (l=="Z\xA5\1>\x14\1\x1A\2\x8F\xFF"){ //firmware
///		print(2,line,l.charCodeAt(0));
	 	Bluetooth.write([0x5a,0xa5,0x02,0x14,0x3e,0x04,0x1a,0x07,0x11,0x75,0xff]); //repl3
		print("firmware");
	}
	else if  (l=="Z\xA5\1>\x14\1\xB0\x20\xDB\xFE"){//live
		Bluetooth.write([0x5a,0xa5,0x20,0x14,0x3e,0x04,0xb0,0x00,0x00,0x00,0x00,0x48,0x98,0x00,0x00,0x41,0x00,0x00,0x00,0x00,0x00,0x18,0x38,0x25,0x00,0x00,0x00,0x3b,0x00,0xbe,0x00,0xa2,0x14,0x08,0x00,0x00,0x00,0x00,0x00,0x8c,0xfb]);
		print("live");
	}
	else if  (l=="Z\xA5\1>\x14\1\x68\2\x41\xFF"){ //start
		Bluetooth.write([0x5a,0xa5,0x02,0x14,0x3e,0x04,0x68,0x01,0x01,0x3d,0xff]) //start
		print("start");
	}
	else if  (l=="Z\xA5\1>\x14\1\x10\x0e\x8d\xFF"){ //info
		Bluetooth.write([0x5a,0xa5,0x0e,0x14,0x3e,0x04,0x10,0x4e,0x33,0x4f,0x54,0x43,0x31,0x38,0x33,0x33,0x54,0x30,0x30,0x33,0x38,0x36,0xfc]) //model info
		print("model info");
	}
	else if  (l=="Z\xA5\1>\x14\1\x66\6\x3f\xFF"){ //unknown
		Bluetooth.write([0x5a,0xa5,0x06,0x14,0x3e,0x04,0x66,0x17,0x01,0x17,0x01,0x01,0x01,0x0b,0xff]);
		print("unknown");
	}
	else {
		print(4,line);
		la=1;
		Bluetooth.write([0x5a,0xa5,0x0e,0x14,0x3e,0x04,0x10,0x4e,0x33,0x4f,0x54,0x43,0x31,0x38,0x33,0x33,0x54,0x30,0x30,0x33,0x38,0x36,0xfc]); //repl2
		print("rest");
    }
}
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);

//

//Bluetooth.write([0x5a,0xa5,0x14,0x09,0x01,0x01,0xb0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x06,0xff])
Bluetooth.write([0x5a,0xa5,0x02,0x14,0x3e,0x04,0x68,0x01,0x01,0x3d,0xff]) //repl1

Bluetooth.write([0x5a,0xa5,0x0e,0x14,0x3e,0x04,0x10,0x4e,0x33,0x4f,0x54,0x43,0x31,0x38,0x33,0x33,0x54,0x30,0x30,0x33]) //model
Bluetooth.write([0x38,0x36,0xfc]) //model
//model in one			
Bluetooth.write([0x5a,0xa5,0x0e,0x14,0x3e,0x04,0x10,0x4e,0x33,0x4f,0x54,0x43,0x31,0x38,0x33,0x33,0x54,0x30,0x30,0x33,0x38,0x36,0xfc]) //model info


Bluetooth.write([0x5a,0xa5,0x02,0x14,0x3e,0x04,0x1a,0x07,0x11,0x75,0xff]) //repl3


Bluetooth.write([0x5a,0xa5,0x20,0x14,0xe2,0x04,0xb0,0x00,0x00,0x00,0x00,0x48,0x98,0x00,0x00,0x41,0x00,0x00,0x00,0x00])
Bluetooth.write([0x00,0x18,0x38,0x25,0x00,0x00,0x00,0x3a,0x00,0xbe,0x00,0xa2,0x14,0x08,0x00,0x00,0x00,0x00,0x00,0x8d])
Bluetooth.write([0xfb]) //live
//live in one
Bluetooth.write([0x5a,0xa5,0x20,0x14,0xe2,0x04,0xb0,0x00,0x00,0x00,0x00,0x48,0x98,0x00,0x00,0x41,0x00,0x00,0x00,0x00,0x00,0x18,0x38,0x25,0x00,0x00,0x00,0x3a,0x00,0xbe,0x00,0xa2,0x14,0x08,0x00,0x00,0x00,0x00,0x00,0x8d,0xfb])


Bluetooth.write([0x5a,0xa5,0x14,0x09,0x01,0x01,0xb0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x06,0xff])
Bluetooth.write([0x5a,0xa5,0x14,0x09,0x01,0x01,0xb0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x06,0xff])

//E.setConsole(Serial1,{force:true}); //0000 devmode
//Bluetooth.on('data', function(data) { print(data); });

//NRF.on('connect',function(f){print("in:",f);});
//NRF.on('disconnect',function(f){print("out:",f);});

//lala.charCodeAt(1)
//parseFloat("12211")


//5a a5 01 3e 14 01 68 02 41 ff //start
//5a a5 01 3e 14 01 1a 02 8f ff live?
//5a a5 01 3e 14 01 66 06 3f ff  //eucworld
/*
 GetKey(0x00),
 Start(0x68),
 SerialNumber(0x10),
 Firmware(0x1a),
 Angles(0x61),
 BatteryLevel(0x22),
 ActivationDate(0x69),
 LiveData(0xb0);
*/
