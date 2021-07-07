E.setConsole(Serial1,{force:true}); //0000 devmode

euc={};
euc.dash=[];
euc.dash.bat=10;
timeLast=getTime();
lolo= new Uint8Array([0x5a,0xa5,0x20,0x14,0x3e,0x04,0xb0,0x00,0x00,0x00,0x00,0x48,0x98,0x00,0x00,euc.dash.bat,0x00,0x00,0x00,0x00,0x00,0x18,0x38,0x25,0x00,0x00,0x00,0x3b,0x00,0xbe,0x00,0xa2,0x14,0x08,0x00,0x00,0x00,0x00,0x00]);


//euc emu
euc.emuF=1;
//lala=[];
euc.emuR=function(evt){
  print(evt);
};
NRF.setServices({
	"0000180A-0000-1000-8000-00805f9b34fb": {
		"00002a23-0000-1000-8000-00805f9b34fb": {
			value : [0x4d,0x89,0x75,0x00,0x00,0x4e,0x69,0x64],
			maxLen : 20,
			readable:true
		},"00002a24-0000-1000-8000-00805f9b34fb": {
			value : "Model Number",
			maxLen : 20,
		  readable:true
		},"00002a25-0000-1000-8000-00805f9b34fb": {
			value : "Serial Number",
			maxLen : 20,
		  readable:true
		},"00002a26-0000-1000-8000-00805f9b34fb": {
			value : "Firmware Revision",
			maxLen : 20,
			readable:true
		},"00002a27-0000-1000-8000-00805f9b34fb": {
			value : "Firmware Revision",
			maxLen : 20,
			readable:true,
		},"00002a28-0000-1000-8000-00805f9b34fb": {
			value : "Software Revision",
			maxLen : 20,
			readable:true
		},"00002a29-0000-1000-8000-00805f9b34fb": {
			value : "Manufacturer Name",
			maxLen : 20,
			readable:true
		},"00002a2a-0000-1000-8000-00805f9b34fb": {
			value : [0xfe,0x00,0x65,0x78,0x70,0x65,0x72,0x69,0x6d,0x65,0x6e,0x74,0x61,0x6c],
			maxLen : 20,
			readable:true
		},"00002a50-0000-1000-8000-00805f9b34fb": {
			value : "000000D",
			maxLen : 20,
			readable:true
		}
	},
	"0000ffe0-0000-1000-8000-00805f9b34fb": {
		"0000ffe1-0000-1000-8000-00805f9b34fb": {
				value :[85, 170, 23, 225, 0, 0, 0, 0, 0, 0, 0, 75, 254, 82, 0, 1, 0, 9, 0, 24],
				maxLen : 20,
				readable:true,
				writable:true,
				onWrite : function(evt) {
				  euc.emuR(evt);
				},
				notify:true,
				description:"Key Press State"
		}
	}

/*	
	
			0xffe0: {
				0xffe1: {
					value : [85, 170, 23, 225, 0, 0, 0, 0, 0, 0, 0, 75, 254, 82, 0, 1, 0, 9, 0, 24],
					maxLen : 20,
					writable : true,
					readable:false,
					notify:true,
					onWrite : function(evt) {
					  euc.emuR(evt);
					}
				}
			}
*/
}, { advertise: ['0xFFE0'], uart: false });

euc.emuW= function(o) {
	NRF.updateServices({
		0xffe0: {
			0xffe1: {
				value : o,
				notify:true
			}
		},
	});
};

NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xe0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x07,0xFF,0x48,0x43,0x2D,0x30,0x38,0x00,
0x07,0x09,0x47,0x57,0x2d,0x53,0x31,0x38
 ]],{ name:"GW-S18"});


lala=new Uint8Array([85, 170, 23, 225, 0, 0, 0, 0, 0, 0, 0, 75, 254, 82, 0, 1, 0, 9, 0, 24]);
lala0=new Uint8Array([90, 90, 90, 90, 85, 170, 0, 0, 194, 90, 40, 0, 6, 248, 0, 99, 0, 1, 0, 3]);
lala1=new Uint8Array([90, 90, 90, 90, 85, 170, 0, 0, 194, 90, 40, 0, 6, 248, 0, 99, 0, 1, 0, 3]);
lala2=new Uint8Array([0, 195, 4, 24, 90, 90, 90, 90]);


euc.emuW(lala);