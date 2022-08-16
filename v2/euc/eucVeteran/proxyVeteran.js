//Kingsong Proxy
if (global.euc&&!euc.proxy){
	euc.proxy={
		state:0,
		r:(o)=>{
		"ram";
			if (1<set.dbg)print("relay-in:",o.data);
			if (euc.state=="READY") euc.wri("proxy",o.data);
		},
		w:(o)=>{
		"ram";
			if (set.bt!=5) {if (1<set.dbg) print("relay-out:",o);return;}
			NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
		},
		s:(o)=>{
			NRF.setServices({
				0xffa0: {
					0xffa1: {
						value : [0x01],
						maxLen : 20,
						writable:true,
						onWrite : function(evt) {
							set.emit("btIn",evt);
						},
						readable:true,
						notify:true,
					   description:"ew"
					}
				},
				0xffe0: {
					0xffe1: {
						value : [0x00],
						maxLen : 20,
						writable:true,
						onWrite : function(evt) {
							euc.proxy.r(evt);
						},
						readable:true,
						notify:true,
					   description:"Veteran"
					}
				}
			}, {advertise: ['0xffe0'],uart:false });
			NRF.setAdvertising({}, { name:"LK_"+set.def.name,connectable:true });
			//NRF.setAddress(euc.mac);
			NRF.setAddress(NRF.getAddress().substr(0,15)+"aa public");
			NRF.disconnect();
			NRF.restart();
		}, 
		e:(o)=>{
			euc.proxy=0;
			set.upd();
			return;
		}
	};
euc.proxy.s();
}

