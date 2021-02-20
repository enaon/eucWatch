E.setConsole(Serial1,{force:true}); //dsd6 devmode
//NRF.setConnectionInterval({minInterval:100, maxInterval:200});
//atc
var eucR= function(evt){
  //var ll=0; require("Storage").write("evt"+ll,evt); ll++;
  //global.srt=String.fromCharCode.apply(String,evt.data);  
  print(evt.data);
  //repl=[0xAA,0x55,0x0f,0x20,euc.dash.spd*100,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]; //rf 4C
//	eucwW([0xAA,0x55,0x0f,0x20,0X00,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]);
  
};
NRF.setServices(undefined,{uart:false });
//
NRF.setServices({
	0x1800: {
          0x2a02: {
			value : 0,
			maxLen : 20,
			writable : true,
			readable:true,
			onWrite : function(evt) {
				eucR(evt);
            }
		  },0x2a03: {
			value : [0,0,0,0,0,0],
			maxLen : 20,
			writable : true,
			readable:true,
			onWrite : function(evt) {
				eucR(evt);
			}
          }
	},0x1801: {
		0x2a05: {
			value : [0,0,0,0,0,0],
			maxLen : 20,
			indicate : true,
			onWrite : function(evt) {
				eucR(evt);
			}
		}
	},0x180A: {
		0x2a23: {
			value : "1",
			maxLen : 20,
			readable:true
		},0x2a24: {
			value : "1",
			maxLen : 20,
		  readable:true
		},0x2a25: {
			value : "1",
			maxLen : 20,
		  readable:true
		},0x2a26: {
			value : "1",
			maxLen : 20,
			readable:true
		},0x2a27: {
			value : "1",
			maxLen : 20,
			readable:true,
		},0x2a28: {
			value : "1",
			maxLen : 20,
			readable:true
		},0x2a29: {
			value : "1",
			maxLen : 20,
			readable:true
		},0x2a2a: {
			value : "1",
			maxLen : 20,
			readable:true
		},0x2a50: {
			value : "1",
			maxLen : 20,
			readable:true
		}
	},
	0xfff0: {
		0xffe1: {
			value : "1",
			maxLen : 20,
			writable : true,
			readable:true,
				onWrite : function(evt) {
			eucR(evt);
			}
		},0xfff2: {
			value : "1",
			maxLen : 20,
			readable:true,
				onWrite : function(evt) {
			eucR(evt);
			}
		},0xfff3: {
			value : "1",
			maxLen : 20,
			writable : true,
			onWrite : function(evt) {
				eucR(evt);
			}
		},0xfff4: {
			value : "1",
			maxLen : 20,
			notify:true,
			onWrite : function(evt) {
				eucR(evt);
			}
		},0xfff5: {
			value : "1",
			maxLen : 20,
			writable : true,
			readable:true,
			notify:true,
			onWrite : function(evt) {
				eucR(evt);
			}
		}
	},0xffe0: {
		0xffe1: {
			value : "1",
			maxLen : 20,
			writable : true,
			readable:true,
			notify:true,
			onWrite : function(evt) {
				eucR(evt);
			}
		}
  }
});

var eucwW= function(o) {
	NRF.updateServices({
		0xffe0 : {
			0xffe1 : {
				value : o,
				notify:true
			}
		}
	});
};

NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x02,0x0a,0x04,
0x0b,0x09,0x4b,0x53,0x2d,0x53,0x31,0x38,0x30,0x35,0x33,0x31
]]);