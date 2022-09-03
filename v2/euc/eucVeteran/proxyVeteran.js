//Kingsong Proxy
if (global.euc&&!euc.proxy){
	euc.proxy={
		state:0,
		r:(o)=>{
		"ram";
			if (euc.state=="READY") euc.wri("proxy",o.data);
			if (ew.dbg && ew.log) {
				ew.log.unshift("Proxy from phone: " + " " + Date() + " " + E.toJS(o.data));
				if (100 < ew.log.length) ew.log.pop();
			}
		},
		w:(o)=>{
		"ram";
			if (ew.is.bt!=5) {if (1<euc.dbg) print("relay-out:",o);return;}
			NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
		},
		s:(o)=>{
			NRF.setServices({
				0xffa0: {
					0xffa1: {
						value: [0x01],
						maxLen: 20,
						writable: true,
						onWrite: function(evt) {
							ew.emit("ewBtIn",evt);
						},
						readable: true,
						notify: true,
						description: "ew"
					},
					0xffa7: {
						value: [0x01],
						maxLen: 20,
						writable: false,
						readable: true,
						notify: false,
						description: "Veteran"
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
			NRF.setAdvertising({}, { name:"LK_"+ew.def.name,connectable:true });
			//NRF.setAddress(euc.mac);
			NRF.setAddress(NRF.getAddress().substr(0,15)+"a7 public");
			NRF.disconnect();
			NRF.restart();
		}, 
		e:(o)=>{
			euc.proxy=0;
			ew.do.update.bluetooth();
			return;
		}
	};
euc.proxy.s();
}

