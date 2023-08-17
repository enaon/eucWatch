//InmotionV10 Proxy
if (global.euc && !euc.proxy) {
	euc.proxy = {
		state: 0,
		buffer:[],
		r: function(o) {
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
			NRF.updateServices(  {0xffe0:  {0xffe4:  {value: o, notify:true} }} );
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
					0xffa5: {
						value: [0x01],
						maxLen: 20,
						writable: false,
						readable: true,
						notify: false,
						description: "Inmotion"
					}
				},
				0xffe0: {
					0xffe4: {
						maxLen: 20,
						notify: true,
						description: "A CHL(RX,20Byte)"
					}
				},
				0xffe5: {
					0xffe9: {
						maxLen: 20,
						writable: true,
						onWrite: function(evt) {
							euc.proxy.r(evt);
						},
						description: "B CHL(TX,20Byte)"
					}
				},
				0xfe00: {
					0xfe01: {
						value: [0x00],
						readable: true,
						notify: false,
						writable: true,
						description: "RTC Clock"
					},
					0xfe02: {
						value: [0x00],
						readable: true,
						writable: true,
						description: "Timing Evt Index"
					},
					0xfe03: {
						value: [0x00],
						readable: true,
						writable: true,
						description: "Timing Evt"
					},
					0xfe04: {
						value: [0x00],
						readable: true,
						writable: true,
						description: "Timing Port Index"
					},
					0xfe05: {
						value: [0x00],
						readable: true,
						notify: true,
						writable: true,
						description: "Timing Port"
					},
					0xfe06: {
						value: [0x00],
						readable: true,
						notify: true,
						writable: true,
						description: "Timing config"
					}
				}
			}, { advertise: ['0xffe0'], uart: false });
			NRF.setAdvertising({}, { name: euc.dash.info.get.modl + "-" + ew.def.name, connectable: true });
			//NRF.setAddress(euc.mac);
			NRF.setAddress(NRF.getAddress().substr(0, 15) + "af public");
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
