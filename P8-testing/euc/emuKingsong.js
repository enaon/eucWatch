//Kingsong Proxy
if (global.euc&&!euc.proxy){
euc.proxy={
	f:0,
	r:(o)=>{
    "ram";
		if (1<set.dbg)print("relay-in:",o.data);
		if (euc.state=="READY") euc.wri(o.data);
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
		NRF.setAdvertising({}, { name:euc.dash.model,connectable:true });
		NRF.setAddress(euc.mac);
		NRF.disconnect();
	}, 
	e:(o)=>{
		NRF.setAdvertising({}, { name:set.def.name,connectable:true });
		NRF.setAddress(set.def.addr+" random");
		set.upd();
		NRF.restart();
		NRF.disconnect();
		euc.proxy=0;
	}
};
euc.proxy.s();
}