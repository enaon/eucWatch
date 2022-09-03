E.setFlags({ pretokenise: 1 });
//dash simple 
face[0] = {
	offms: (ew.def.off[face.appCurr]) ? ew.def.off[face.appCurr] : 10000,
	g: w.gfx,
	spd: [],
	init: function() {
		if (euc.is.day[0] < Date().getHours() && Date().getHours() < euc.is.day[1]) euc.is.night = 0;
		else euc.is.night = 1;
		if (face.appPrev.startsWith("dash_")) {
			this.g.setColor(0, 0);
			this.g.fillRect(0, 51, 239, 239);
			this.g.flip();
		}
		else this.g.clear();
		if (euc.dash.opt.tpms && !tpms.euc[euc.dash.opt.tpms]) {
			this.g.setColor(0, 1);
			this.g.clearRect(0, 210, 239, 239);
			this.g.setColor(1, 3);
			this.g.setFontVector(18);
			this.g.drawString("WAITING FOR TPMS", 25, 220);
			this.g.flip();
		}
		else this.tpms = -1;
		this.spdC = [0, 14, 13, 13];
		this.ampC = [1, 0, 13, 13];
		this.tmpC = [1, 0, 13, 13];
		this.batC = [4, 1, 13, 13];
		this.spd = -1;
		this.amp = -1;
		this.tmp = -1;
		this.time = -1;
		this.bat = -1;
		this.volt = -1;
		this.conn = 0;
		this.lock = 2;
		this.spdF = euc.dash.opt.unit.fact.spd * ((ew.def.dash.mph) ? 0.625 : 1);
		this.trpF = euc.dash.opt.unit.fact.dist * ((ew.def.dash.mph) ? 0.625 : 1);
		this.run = true;
	},
	show: function(o) {
		if (!this.run) return;
		if (euc.state == "READY") {
			//if (euc.charge)  	{this.charge();return;}
			this.g.setColor(0, 0);
			//this.g.fillRect(0,0,0,0);
			this.g.flip();
			if (this.spd != Math.round(euc.dash.live.spd)) this.spdf();
			if (!ew.def.dash.clkS) {
				if (this.tmp != euc.dash.live.tmp.toFixed(1)) this.tmpf();
			}
			else if (60 < getTime() - this.time)
				this.clkf();
			if (ew.def.dash.batS) { if (this.bat != euc.dash.live.bat) this.batf(); }
			else if (this.volt != euc.dash.live.volt.toFixed(1)) this.vltf();
			else if (euc.dash.opt.tpms && tpms.euc[euc.dash.opt.tpms] && (this.tpms != tpms.euc[euc.dash.opt.tpms].alrm)) this.tpmsf();
		}
		else if (euc.state == "OFF") {
			setTimeout(function() {
				face.go("dashOff", 0);
			}, 150);
			return;
			//rest
		}
		else {
			if (euc.state != this.conn) {
				this.conn = euc.state;
				this.g.setColor(0, 0);
				this.g.fillRect(0, 0, 239, 239);
				this.g.setColor(1, 15);
				this.g.setFont("Vector", 50);
				this.g.drawString(euc.state, (125 - this.g.stringWidth(euc.state) / 2), 95);
				this.g.flip();
				this.spd = -1;
				this.time = 0;
				this.amp = -1;
				this.tmp = -1;
				this.volt = -1;
				this.bat = -1;
				this.trpL = -1;
				this.conn = 0;
				this.lock = 2;
				this.run = true;
			}
		}
		//refresh 
		this.tid = setTimeout(function(t) {
			let tm = getTime();
			t.tid = -1;
			t.show();
			if (ew.dbg) print("simple dash, time in loop",getTime()-tm);
		}, 100, this);
	},
	tmpf: function() {
		this.tmp = euc.dash.live.tmp.toFixed(1);
		this.g.setColor(0, this.tmpC[euc.dash.alrt.tmp.cc]);
		this.g.fillRect(0, 0, 119, 50);
		this.g.setColor(1, 15);
		this.g.setFontVector(50);
		let temp = ((ew.def.dash.farn) ? this.tmp * 1.8 + 32 : this.tmp).toString().split(".");
		let size = 5 + this.g.stringWidth(temp[0]);
		this.g.drawString(temp[0], 5, 3);
		if (temp[0] < 100) {
			this.g.setFontVector(35);
			this.g.drawString("." + temp[1], size, 17);
			size = size + this.g.stringWidth(temp[1]);
		}
		this.g.setFontVector(16);
		this.g.drawString((ew.def.dash.farn) ? "°F" : "°C", 3 + size, 5);
		this.g.flip();
	},
	clkf: function() {
		this.time = getTime();
		this.g.setColor(0, 1);
		this.g.fillRect(0, 0, 119, 50);
		this.g.setColor(1, 11);
		this.g.setFontVector(45);
		let d = (Date()).toString().split(' ');
		let t = (d[4]).toString().split(':');
		//this.tim=(t[0]+":"+t[1]);
		this.g.drawString((t[0] + ":" + t[1]), 0, 5);
		//this.g.setFontVector(13);
		//this.g.drawString("CLOCK",1,40);
		this.g.flip();
	},
	batf: function() {
		this.bat = euc.dash.live.bat;
		this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122, 0, 239, 50);
		//		this.g.setColor(1,15);
		this.g.setColor(1, 15);
		this.g.setFontVector(50);
		this.g.drawString(this.bat, 225 - (this.g.stringWidth(this.bat)), 3);
		this.g.setFontVector(20);
		this.g.drawString("%", 227, 8);
		this.g.flip();
	},
	vltf: function() {
		this.volt = euc.dash.live.volt.toFixed(1);
		this.g.setColor(0, this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122, 0, 239, 50);
		this.g.setColor(1, 15);
		let volt = this.volt.toString().split(".");
		this.g.setFontVector(14);
		this.g.drawString("V", 230, 30);
		let size = 230;
		if (volt[0] < 100) {
			this.g.setFontVector(35);
			size = size - this.g.stringWidth("." + volt[1]);
			this.g.drawString("." + volt[1], size, 15);
		}
		this.g.setFontVector(50);
		this.g.drawString(volt[0], size - this.g.stringWidth(volt[0]), 3);
		this.g.flip();
	},
	spdf: function() {
		//this.spd=Math.round(euc.dash.live.spd);
		if (Math.abs(euc.dash.live.spd - this.spd) < 2) this.spd = Math.round(euc.dash.live.spd);
		else if (euc.dash.live.spd < this.spd) this.spd = Math.round(this.spd - (this.spd - euc.dash.live.spd) / 2);
		else this.spd = Math.round(this.spd + (euc.dash.live.spd - this.spd) / 2);
		this.g.setColor(0, (euc.dash.alrt.spd.cc == 1) ? 0 : this.spdC[euc.dash.alrt.spd.cc]);
		this.g.fillRect(0, 55, 239, 210);
		this.g.setColor(1, (euc.dash.alrt.spd.cc == 1) ? 14 : 15);
		if (100 <= this.spd) this.g.setFontVector(130);
		else this.g.setFontVector(185);
		this.g.drawString(Math.round(this.spd * this.spdF), 132 - (this.g.stringWidth(Math.round(this.spd * this.spdF)) / 2), (100 <= this.spd) ? 75 : 55);
		this.g.flip();
	},
	ampf: function() {
		this.amp = euc.dash.live.amp;
		this.g.setColor(0, this.ampC[euc.dash.alrt.amp.cc]);
		this.g.fillRect(80, 0, 160, 55); //amp 
		this.g.setColor(1, 15);
		this.g.setFontVector(33);
		this.g.drawString(this.amp | 0, (122 - (this.g.stringWidth(this.amp | 0) / 2)), 5);
		this.g.flip();
	},
	tpmsf: function() {
		this.tpms = tpms.euc[euc.dash.opt.tpms].alrm;
		this.g.setColor(0, (this.tpms) ? 13 : 4);
		this.g.clearRect(0, 210, 239, 239); //amp 
		this.g.setColor(1, 11);
		this.g.setFontVector(25);
		this.g.drawString("TPMS", 85, 215);
		this.g.flip();
	},
	charge: function() {
		face.go("dashKingsongCharging", 0);
		return;
	},
	tid: -1,
	run: false,
	clear: function() {
		this.run = false;
		if (this.tid >= 0) clearTimeout(this.tid);
		this.tid = -1;
		return true;
	},
	off: function() {
		this.g.off();
		this.clear();
	}
};
//loop face
face[1] = {
	offms: 1000,
	init: function() {
		return true;
	},
	show: function() {
		if (euc.state == "OFF") face.go("clock", 0);
		else { face.pageCurr = 0;
			face.go(ew.is.dash[ew.def.dash.face], -1); }
		return true;
	},
	clear: function() {
		return true;
	},
	off: function() {
		return true;
	},
};

//touch-main
touchHandler[0] = function(e, x, y) {
	switch (e) {
		case 5: //tap event
			if (x < 120 && y < 60) { //temp/clock
				if (ew.def.dash.clkS == undefined) ew.def.dash.clkS = 0;
				ew.def.dash.clkS = 1 - ew.def.dash.clkS;
				face[0].time = -1;
				face[0].tmp = -1;
				buzzer.nav([30, 50, 30]);
			}
			else if (120 < x && y < 60) { //batery percentage/voltage
				if (ew.def.dash.batS == undefined) ew.def.dash.batS = 0;
				ew.def.dash.batS = 1 - ew.def.dash.batS;
				face[0].bat = -1;
				face[0].volt = -1;
				buzzer.nav([30, 50, 30]);
			}
			else {
				buzzer.nav(40);
			}
			this.timeout();
			break;
		case 1: //slide down event
			if (ew.def.dash.face + 1 >= ew.is.dash.length) ew.def.dash.face = 0;
			else ew.def.dash.face++;
			face.go(ew.is.dash[ew.def.dash.face], 0);
			return;
		case 2: //slide up event
			if (y > 160 && x < 50) {
				if (w.gfx.bri.lv !== 7) { this.bri = w.gfx.bri.lv;
					w.gfx.bri.set(7); }
				else w.gfx.bri.set(this.bri);
				buzzer.nav([30, 50, 30]);
				this.timeout();
			}
			else if (Boolean(require("Storage").read("settings"))) { face.go("settings", 0); return; }
			this.timeout();
			break;
		case 3: //slide left event
			(euc.state == "READY") ? face.go('dash' + require("Storage").readJSON("dash.json", 1)['slot' + require("Storage").readJSON("dash.json", 1).slot + 'Maker'], 0): (euc.state == "OFF") ? face.go("dashGarage", 0) : buzzer.nav(40);
			return;
		case 4: //slide right event (back action)
			face.go("clock", 0);
			return;
		case 12: //touch and hold(long press) event
			buzzer.nav(40);
			this.timeout();
			break;
	}
};