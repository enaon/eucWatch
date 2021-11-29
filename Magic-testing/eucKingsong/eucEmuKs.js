//euc emu
euc.emuF=1;
//lala=[];
euc.emuR=function(evt){
  		if (set.bt!=4){
			set.bt=4;
		//handleInfoEvent({"src":"BT","title":"EUC","body":"Phone connected"});
		}
  //print(evt);
 euc.wri(evt.data);
  /*  
	if (evt.data==[170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 20, 90, 90]){
		if (set.bt!=4){
			set.bt=4;
		handleInfoEvent({"src":"BT","title":"EUC","body":"Phone connected"});
		}	
		euc.emuW([0xAA,0x55,0x00,0x00,0X00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0xf5,0x14,0x5A,0x5A]);
		//euc.emuW([0xAA,0x55,0x0f,0x20,0X00,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]);
		//setTimeout(()=>{euc.emuU();},1000);
	} 
	else euc.wri(evt.data);
*/
//lala.push(evt);
};
//
NRF.setServices({
0x180A: {
		0x2a23: {
			value : [0x4d],
			maxLen : 20,
			readable:true
		},0x2a24: {
			value : "Model Number",
			maxLen : 20,
		  readable:true
		},0x2a25: {
			value : "Serial Number",
			maxLen : 20,
		  readable:true
		},0x2a26: {
			value : "",
			maxLen : 20,
			readable:true
		},0x2a27: {
			value : "",
			maxLen : 20,
			readable:true,
		},0x2a28: {
			value : "",
			maxLen : 20,
			readable:true
		},0x2a29: {
			value : "",
			maxLen : 20,
			readable:true
		},0x2a2a: {
			value : [0xfe],
			maxLen : 20,
			readable:true
		},0x2a50: {
			value : "000000D",
			maxLen : 20,
			readable:true
		}
	},
	0xfff0: {
		0xfff1: {
			value : [0x01],
			maxLen : 20,
			writable : true,
			readable:true,
			onWrite : function(evt) {
			 // euc.emuR(evt);
			},
            description:"1"
		},0xfff2: {
			value : [0x02],
			maxLen : 20,
		    onWrite : function(evt) {
			  //euc.emuR(evt);
			},
			readable:true,
            description:"2"
		},0xfff3: {
			writable : true,
			onWrite : function(evt) {
				//euc.emuR(evt);
			},
            description:"3"
		},0xfff4: {
			notify:true,
            description:"4"
		},0xfff5: {
			value : [0x01],
			maxLen : 20,
            writable:true,
			onWrite : function(evt) {
				//euc.emuR(evt);
			},
			readable:true,
			notify:true,
            description:"Characteristic 5"
		}
	},0xffe0: {
		0xffe1: {
			value : [0x00],
			maxLen : 20,
            writable:true,
			onWrite : function(evt) {
				euc.emuR(evt);
			},
   			readable:true,
  			notify:true,
           description:"Key Press State"
		}
  }
}, { uart:(set.def.cli||set.def.gb)?true:false,hid:(set.def.hid&&set.def.hidM)?set.def.hidM.report:undefined });

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
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x07,0xFF,0x48,0x43,0x2D,0x30,0x38,0x00,
]],{ name:"KS-S18XX"});

