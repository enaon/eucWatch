global.euc = {
	is: { "run": 0, "chrg": 0, "night": 1, "day": [7, 19], "buzz": 0 , "horn": 0, "busy":0},
	tout:{"horn":0, "loop":0, "alive":0, "reconnect":0, "busy":0 },
	ntid:{"horn":0},
	state: "OFF",
	proxy: 0,
	log: {
		trip: [0, 0, 0], //hour/day/month
		ampL: [],
		batL: [],
		almL: []
	},
	temp: {},
	updateDash: function(slot) { require('Storage').write('eucSlot' + slot + '.json', euc.dash); },
	wri: function(err) { if (ew.def.cli) console.log("EUC write, not connected", err); },
	tgl: function() {
		face.off();
		if (euc.tout.reconnect) {clearTimeout(euc.tout.reconnect);
			euc.tout.reconnect = 0; }
		if (euc.tout.loop) { clearTimeout(euc.tout.loop);
			euc.tout.loop = 0; }
		if (euc.tout.alive) { clearTimeout(euc.tout.alive);
			euc.tout.alive = 0; }
		if (euc.tout.busy) { clearTimeout(euc.tout.busy);
			euc.tout.busy = 0; }
		if (euc.tout.intervalLive) { clearInterval(euc.tout.intervalLive);
			euc.tout.intervalLive = 0; }
		if (this.state != "OFF") {
			buzzer.nav([90, 60, 90]);
			//log
			if (this.log.trip[0] && 0 < euc.dash.trip.totl - this.log.trip[0])
				ew.do.fileWrite("logDaySlot" + ew.def.dash.slot, Date().getHours(), (euc.dash.trip.totl - this.log.trip[0]) + ((ew.do.fileRead("logDaySlot" + ew.def.dash.slot, Date().getHours())) ? ew.do.fileRead("logDaySlot" + ew.def.dash.slot, Date().getHours()) : 0));
			this.log.trip[0] = 0;
			ew.def.dash.accE = 0;
			this.mac = 0;
			this.state = "OFF";
			acc.off();
			this.wri("end");
			setTimeout(() => {
				//print("log");
				if (this.log.trip[1] && 0 < euc.dash.trip.totl - this.log.trip[1]) {
					//print("week");
					ew.do.fileWrite("logWeekSlot" + ew.def.dash.slot, Date().getDay(), (euc.dash.trip.totl - this.log.trip[1]) + ((ew.do.fileRead("logWeekSlot" + ew.def.dash.slot, Date().getDay())) ? ew.do.fileRead("logWeekSlot" + ew.def.dash.slot, Date().getDay()) : 0));
				}
				if (this.log.trip[2] && 0 < euc.dash.trip.totl - this.log.trip[2]) {
					ew.do.fileWrite("logYearSlot" + ew.def.dash.slot, Date().getMonth(), (euc.dash.trip.totl - this.log.trip[2]) + ((ew.do.fileRead("logYearSlot" + ew.def.dash.slot, Date().getMonth())) ? ew.do.fileRead("logYearSlot" + ew.def.dash.slot, Date().getMonth()) : 0));
				}
				euc.updateDash(require("Storage").readJSON("dash.json", 1).slot);
				this.log.trip = [0, 0, 0];
				//if (face.appCurr=="dashOff") face.go('dashOff',0);
				if (ew.def.acc) acc.on(1);

			}, 1000);

			return;
		}
		else {
			buzzer.nav(100);
			this.log.trip = [0, 0, 0];
			NRF.setTxPower(4);
			this.mac = (this.mac) ? this.mac : ew.do.fileRead("dash", "slot" + ew.do.fileRead("dash", "slot") + "Mac");
			if (!this.mac) {
				face.go('dashScan', 0);
				return;
			}
			else {
				this.state = "ON";
				euc.temp = { count: 0, loop: 0, last: 0, rota: 0 };
				eval(require('Storage').read('euc' + require("Storage").readJSON("dash.json", 1)["slot" + require("Storage").readJSON("dash.json", 1).slot + "Maker"]));
				if (ew.def.prxy && require('Storage').read('proxy' + euc.dash.info.get.makr)) {
					eval(require('Storage').read('proxy' + euc.dash.info.get.makr));
				}
				if (euc.dash.info.get.makr !== "Kingsong" || euc.dash.info.get.makr !== "inmotionV11") euc.dash.trip.topS = 0;
				this.conn(this.mac);
				acc.off();
				if (ew.def.acc) {
					setTimeout(() => { ew.def.dash.accE = 1;
						acc.on(2); }, 1000);
				}
				if (euc.dash.opt.tpms && global.tpms && !tpms.def.int) { tpms.euc = {};
					setTimeout(() => { tpms.scan(); }, 10000); } //tpms
				face.go(ew.is.dash[ew.def.dash.face], 0);
				return;
			}
		}
	},
	off: function(err) {
		if (euc.dbg) console.log("EUC.off :", err);
		if (euc.tout.reconnect) {clearTimeout(euc.tout.reconnect);
			euc.tout.reconnect = 0; }
		if (euc.tout.loop) { clearTimeout(euc.tout.loop);
			euc.tout.loop = 0; }
		if (euc.tout.alive) { clearTimeout(euc.tout.alive);
			euc.tout.alive = 0; }
		if (euc.tout.busy) { clearTimeout(euc.tout.busy);
			euc.tout.busy = 0; }
		if (euc.tout.intervalLive) { clearInterval(euc.tout.intervalLive);
			euc.tout.intervalLive = 0; }
		// Restart watchdog updater
		if (wdint) {clearTimeout(wdint); wdint=0};
                wdint = setInterval(KickWd, process.env.BOARD == "DSD6"?1000:3000);
		//
		if (euc.state != "OFF") {
			if (euc.dbg) console.log("EUC: Restarting");
			let p = 2000;
			switch (err) {
				case 8:
					if (euc.gatt && euc.gatt.connected) {
						if (euc.dbg) console.log("ble still connected");
						euc.gatt.disconnect();
					}
				case "Connection Timeout":
					euc.state = "LOST";
					if (ew.def.dash.rtr < euc.is.run) {
						euc.tgl();
						return;
					}
					euc.is.run = euc.is.run + 1;
					if (euc.dash.opt.lock.en == 1) buzzer.nav(250);
					else buzzer.nav([250, 200, 250, 200, 250]);
					p = 5000;
					break;
				case "Disconnected":
				case "Not connected":
					euc.state = "FAR";
					p = 1000;
					break;
				default:
					euc.state = "RETRY";
					break;
			};
			euc.tout.reconnect = setTimeout(() => {
				euc.tout.reconnect = 0;
				if (euc.state != "OFF") euc.conn(euc.mac);
			}, p);

		} else {
			if (euc.dbg) console.log("EUC OUT:", err);
			/*if (euc.aOff == 0 || euc.aOff == 1) {
				euc.dash.auto.onD.off = euc.aOff;
				delete euc.aOff;
			}
			if (euc.aLck == 0 || euc.aLck == 1) {
				euc.dash.auto.onD.lock = euc.aLock;
				delete euc.aLck;
			}
			*/
			//euc.off = function(err) { if (euc.dbg) console.log("EUC off, not connected", err); };
			euc.wri = function(err) { if (euc.dbg) console.log("EUC write, not connected", err); };
			euc.conn = function(err) { if (euc.dbg) console.log("EUC conn, not connected", err); };
			euc.cmd = function(err) { if (euc.dbg) console.log("EUC cmd, not connected", err); };
			euc.is.run = 0;
			euc.temp = 0;
			global["\xFF"].bleHdl = [];
			if (euc.proxy) euc.proxy.e();
			NRF.setTxPower(ew.def.rfTX);
			if (euc.gatt && euc.gatt.connected) {
				if (euc.dbg) console.log("ble still connected");
				euc.gatt.disconnect();
			}
			if (euc.dbg) console.log("EUC: out");
		}
	}
};



//init
if (Boolean(require("Storage").read('eucSlot' + require("Storage").readJSON("dash.json", 1).slot + '.json'))) {
	euc.dash = require("Storage").readJSON('eucSlot' + require("Storage").readJSON("dash.json", 1).slot + '.json', 1);
}
else
	euc.dash = require("Storage").readJSON("eucSlot.json", 1);
ew.def.dash.slot = require("Storage").readJSON("dash.json", 1).slot;
//more
setTimeout(() => { if (require('Storage').read('tpms')) eval(require('Storage').read('tpms')); }, 2000);
