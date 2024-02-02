//InmotionV10 Proxy
if (global.euc && !euc.proxy) {
	euc.proxy = {
		state: 0,
		buffer:[],
		r: function(o) {
//			"ram";
			return;
//			if (euc.state == "READY") {
//				//euc.proxy.buffer.push(o.data)
//				euc.wri("proxy",o.data);
//			}
//			if (ew.dbg && ew.log) {
//				ew.log.unshift("Proxy from phone: " + " " + Date() + " " + E.toJS(o.data));
//				if (100 < ew.log.length) ew.log.pop();
//			}
		},
		w: function(o) {
//			return;
			if (ew.is.bt!=5) return;
//			if (euc.tout.busy) return;
//			if (euc.tout.alive) clearTimeout(euc.tout.alive);
//			if (euc.tout.info) clearTimeout(euc.tout.info);
//			euc.tout.alive=setTimeout(function(){euc.tout.alive=0;euc.is.busy=0;euc.temp.live();},500);
//			if (euc.is.busy) return;
//			euc.is.busy=1;
//			NRF.updateServices(  {0xffe0:  {0xffe4:  {value: o, notify:true} }} ).then(function() {euc.is.busy=0});
//			euc.tout.busy=1;
			NRF.updateServices(  {"6E400001-B5A3-F393-E0A9-E50E24dCCA9E":  {"6E400003-B5A3-F393-E0A9-E50E24DCCA9E":  {value: o, notify:true} }} );
//			.then(function () { return euc.tout.busy=0 });
		},
		s: function(o) {
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
					0xffa6: {
						value: [0x01],
						maxLen: 20,
						writable: false,
						readable: true,
						notify: false,
						description: "Inmotion"
					}
				},
				"6E400001-B5A3-F393-E0A9-E50E24dCCA9E": {
					"6E400002-B5A3-F393-E0A9-E50E24DCCA9E": {
						maxLen: 20,
						writable: true,
						onWrite: function(evt) {
							euc.proxy.r(evt);
						},
						description: "B CHL(TX,20Byte)"
					},
					"6E400003-B5A3-F393-E0A9-E50E24DCCA9E": {
						maxLen: 100,
						notify: true,
						description: "A CHL(RX,20Byte)"
					}
				}
			}, { advertise: ['6E400001-B5A3-F393-E0A9-E50E24DCCA9E'], uart: false });
			NRF.setAdvertising({}, { name: euc.dash.info.get.modl + "-" + ew.def.name, connectable: true });
			//NRF.setAddress(euc.mac);
			NRF.setAddress(NRF.getAddress().substr(0, 15) + "a3 public");
			NRF.disconnect();
			NRF.restart();
		},
		e: function(o) {
			euc.proxy = 0;
			ew.do.update.bluetooth();
			NRF.disconnect();
			NRF.restart();
			return;
		}
	};
	euc.proxy.s();
}
