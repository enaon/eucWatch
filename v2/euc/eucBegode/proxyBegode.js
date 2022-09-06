//Kingsong Proxy
if (global.euc&&!euc.proxy){
	euc.proxy={
		state:0,
		buffer:[],
		r:(o)=>{
			"ram";
			if (euc.state=="READY"&&!euc.temp.ext) {
				euc.proxy.buffer.push(o.data)
				euc.wri("proxy",1);
				
			}
			if (ew.dbg && ew.log) {
				ew.log.unshift("Proxy from phone: " + " " + Date() + " " + E.toJS(o.data));
				if (100 < ew.log.length) ew.log.pop();
			}
		},
		w:(o)=>{
			if (ew.is.bt!=5||euc.temp.ext) return;
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
					0xffa8: {
						value: [0x01],
						maxLen: 20,
						writable: false,
						readable: true,
						notify: false,
						description: "Begode"
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
					   description:"Begode"
					}
				}
			}, {advertise: ['0xffe0'],uart:false });
			NRF.setAdvertising({}, { name:"Gotway_"+ew.def.name,connectable:true });
			//NRF.setAddress(euc.mac);
			NRF.setAddress(NRF.getAddress().substr(0,15)+"a8 public");
			NRF.disconnect();
			NRF.restart();
		}, 
		e:(o)=>{
			euc.proxy=0;
			ew.do.update.bluetooth();
			NRF.disconnect();
			NRF.restart();
			return;
		}
	};
euc.proxy.s();
}

