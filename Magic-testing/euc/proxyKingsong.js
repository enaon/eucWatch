//Kingsong Proxy
if (global.euc&&!euc.proxy){
euc.proxy={
	f:0,
	r:(o)=>{
    "ram";
		if (1<set.dbg)print("relay-in:",o.data);
		if (euc.state=="READY") euc.wri("proxy",o.data);
	},
	w:(o)=>{
    "ram";
		if (set.bt!=4) {if (1<set.dbg) print("relay-out:",o);return;}
		NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
	},
	s:(o)=>{
		NRF.setServices({
			0xfff0: {
				0xfff1: {
				value : [0x01],
				maxLen : 20,
				writable : false,
				readable:true,
				description:"Characteristic 1"
		  	}
			},0xffe0: {
				0xffe1: {
					value : [0x00],
					maxLen : 20,
					writable:true,
					onWrite : function(evt) {
						euc.proxy.r(evt);
					},
					readable:true,
					notify:true,
				   description:"Key Press State"
				}
			}
		}, {advertise: ['0xfff0'],uart:false });
		//NRF.setAdvertising({}, { name:dash.live.ks.name,connectable:true });
		//NRF.setAdvertising({}, { name:"KS-S180531",connectable:true });
		NRF.setAdvertising([[
			0x02,0x01,0x06,
			0x03,0x02,0xf0,0xff,
			0x05,0x12,0x60,0x00,0x0c,0x00,
		]], { name:dash.live.ks.name,connectable:true });
		NRF.setAddress(euc.mac);
		//NRF.setAddress("eu:cW:at:ch:00:01 public");
		NRF.restart();
		NRF.disconnect();
	}, 
	e:(o)=>{
		NRF.setAdvertising({}, { name:set.def.name,connectable:true });
		NRF.setAddress(set.def.addr+" random");
		setter.updateBT();
		NRF.restart();
		NRF.disconnect();
		euc.proxy=0;
	}
};
euc.proxy.s();
}

/*
NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x07,0xFF,0x48,0x43,0x2D,0x30,0x38,0x00,
]],{ name:"K-S18AA1"});

NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
0x07,0xFF,0x48,0x43,0x2D,0x30,0x38,0x00,
]],{ name:dash.live.model});

*/

/*
NRF.setAdvertising([[
0x02,0x01,0x06,
0x03,0x02,0xf0,0xff,
0x05,0x12,0x60,0x00,0x0c,0x00,
 ]],{ name:set.def.name});
*/