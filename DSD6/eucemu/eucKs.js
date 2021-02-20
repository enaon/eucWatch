E.setConsole(Serial1,{force:true}); //0000 devmode
//NRF.setConnectionInterval({minInterval:100, maxInterval:200});
//atc
var eucR= function(evt){
  //var ll=0; require("Storage").write("evt"+ll,evt); ll++;
  //global.srt=String.fromCharCode.apply(String,evt.data);  
  print(evt.data);
  //repl=[0xAA,0x55,0x0f,0x20,euc.dash.spd*100,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]; //rf 4C
//	eucwW([0xAA,0x55,0x0f,0x20,0X00,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]);
  
};
//NRF.setServices(undefined,{uart:false });
//
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
	"0000fff0-0000-1000-8000-00805f9b34fb": {
		"0000fff1-0000-1000-8000-00805f9b34fb": {
			value : [0x01],
			maxLen : 20,
			writable : true,
			readable:true,
			onWrite : function(evt) {
			  eucR(evt);
			},
            description:"Characteristic 1"
		},"0000fff2-0000-1000-8000-00805f9b34fb": {
			value : [0x02],
			maxLen : 20,
		    onWrite : function(evt) {
			  eucR(evt);
			},
			readable:true,
            description:"Characteristic 2"
		},"0000fff3-0000-1000-8000-00805f9b34fb": {
			maxLen : 20,
			writable : true,
			onWrite : function(evt) {
				eucR(evt);
			},
            description:"Characteristic 3"
		},"0000fff4-0000-1000-8000-00805f9b34fb": {
			maxLen : 20,
			notify:true,
            description:"Characteristic 4"
		},"0000fff5-0000-1000-8000-00805f9b34fb": {
			value : [0x01,0x02,0x03,0x04,0x05],
			maxLen : 20,
            writable:true,
			onWrite : function(evt) {
				eucR(evt);
			},
			readable:true,
			notify:true,
            description:"Characteristic 5"
		}
	},"0000ffe0-0000-1000-8000-00805f9b34fb": {
		"0000ffe1-0000-1000-8000-00805f9b34fb": {
			value : [0x00],
			maxLen : 20,
            writable:true,
			onWrite : function(evt) {
				eucR(evt);
			},
   			readable:true,
  			notify:true,
           description:"Key Press State"
		}
  }
},{uart:false });

var eucwW= function(o) {
	NRF.updateServices({
		"0000ffe0-0000-1000-8000-00805f9b34fb" : {
			"0000ffe1-0000-1000-8000-00805f9b34fb" : {
				value : o,
				notify:true
			}
		},
	});
};

NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x02,0x0a,0x04,
0x0b,0x09,0x4b,0x53,0x2d,0x53,0x31,0x38,0x30,0x35,0x33,0x32
]],{ name:"KS-S180532",connectable:true });


NRF.on('connect',function(f){print("in:",f);});
NRF.on('disconnect',function(f){print("out:",f);});