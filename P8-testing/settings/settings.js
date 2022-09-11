E.setFlags({pretokenise:1});
//settings	
face[0] = {
	offms: (ew.def.off[face.appCurr]) ? ew.def.off[face.appCurr] : 10000,
	g: w.gfx,
	init: function() {
		face.mode = 0;
		if (face.faceSave == -1) face.faceSave = [face.appPrev, face.pagePrev, face.pageArg];
		this.cli = -1;
		this.bt = -1;
		this.gb = -1;
		this.hid = -1;
		this.prxy = -1;
		this.bri = -1;
		this.acc = -1;
		this.buzz = -1;
		this.sys = 1;
		this.btn2 = 1;
		this.fmp = -1;
		face[0].btSetOn = 1;
		var d = (Date()).toString().split(' ');
		var t = (d[4]).toString().split(':');
		this.g.setColor(0, 0);
		//this.g.fillRect(0,0,239,155);
		this.g.fillRect(76, 0, 79, 155);
		this.g.fillRect(156, 0, 159, 155);
		this.g.fillRect(0, 76, 239, 79);
		this.g.setColor(1, 1);
		//if(!face.mode) this.g.setColor(1,1); else this.g.setColor(1,1);
		this.g.fillRect(0, 0, 75, 75); //1
		this.g.fillRect(80, 0, 155, 75); //2
		this.g.fillRect(160, 0, 239, 75); //3
		this.g.fillRect(0, 80, 75, 155); //4
		this.g.fillRect(80, 80, 155, 155); //5
		this.g.fillRect(160, 80, 239, 155); //6
		this.g.flip();
		//bottom
		this.g.setColor(0, 0);
		//this.g.fillRect(0,0,239,239);
		this.g.fillRect(0, 156, 239, 239);
		this.g.setColor(1, 11);
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")), 10, 193);
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwI2zgP/Ao0f////P/nE/AoP9/88ApU4EZYADAooAICg2AApE8/+/G4P4Aon8AoscCIgjLACkf8AFE+CJDz/3/B9CAoP8ApRBBDogFJF4gAsA=")), 95, 195); //this.g.drawImage(require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA==")),94,195);
		this.g.drawImage(require("heatshrink").decompress(atob("mEwwIjgn/8AgUB///wAFBg4FB8AFBh/BwfwCwUBwAYCv4FB/wFB/eAgPfEQPhAoOHwED4InBwfAgYsCgfAg4FCgPgg/AH4Xgh44CgHwh1gAgMMuEePId4jgWDnAFCEAIFDj8AAoUDJgM4ngQBLAM8n+Ag/wgP8AoXgAoIRCHoM8DoRJBFIYABAphNDgl4h1wAoMGuEPTAQ3BOIcDO4J9ERIcBR4S5BHoUAAoQPCAoI4DAqIAVA==")), 180, 195);
		//dash:"mEwwIjgn/8AgUB///wAFBg4FB8AFBh/BwfwCwUBwAYCv4FB/wFB/eAgPfEQPhAoOHwED4InBwfAgYsCgfAg4FCgPgg/AH4Xgh44CgHwh1gAgMMuEePId4jgWDnAFCEAIFDj8AAoUDJgM4ngQBLAM8n+Ag/wgP8AoXgAoIRCHoM8DoRJBFIYABAphNDgl4h1wAoMGuEPTAQ3BOIcDO4J9ERIcBR4S5BHoUAAoQPCAoI4DAqIAVA==",
		this.g.flip();
		this.run = true;
	},
	show: function(s) {
		if (!this.run) return;
		//torch
		if (s) face.mode = 1;
		if (this.tor == 1) {
			this.g.setColor(0, 15);
			this.g.fillRect(0, 0, 239, 239);
			this.g.setColor(1, 3);
			this.g.drawImage(require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")), 50, 30, { scale: 3 });
			this.g.flip();
			this.appImgNone = 0;
			this.btSetOn = 1;
			return;
		}
		else if (face.mode) {
			if (!this.appImgNone)
				if (Boolean(require('Storage').read('w_apps'))) eval(require('Storage').read('w_apps'));
		}
		else if (this.themeSet) {
			if (this.themeSetOn) {
				this.themeSetOn = 0;
				this.g.setColor(0, 0);
				this.g.fillRect(0, 0, 239, 155);
				this.g.setColor(1, 1);
				this.g.fillRect(0, 0, 239, 75);
				//this.g.fillRect(0,80,239,155); 
				this.g.flip();
				this.g.setColor(0, 15);
				this.g.setFont("Vector", 35);
				this.g.drawString(face.appRoot[0], 120 - (this.g.stringWidth(face.appRoot[0]) / 2), 20);
				this.g.flip();
				this.themetout();
			}

		}
		else if (this.btSet) {
			if (this.btSetOn) {
				this.btSetOn = 0;
				this.g.setColor(1, 1);
				this.g.fillRect(0, 0, 155, 75);
				this.g.setColor(0, 15);
				//bt
				this.g.drawImage(require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")), 54, 15);
				this.g.drawImage((ew.def.rfTX == -4) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74=")) : (ew.def.rfTX == 0) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74=")) : E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74=")), 125, 32);
				this.g.flip();
			}
			if (ew.def.cli != this.cli) {
				this.cli = ew.def.cli;
				this.btn(this.cli, 160, 0, 239, 75, require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4")), 176, 15, 11, 4, 0, 2); //btn3
			}
			if (ew.def.gb != this.gb) {
				this.gb = ew.def.gb;
				this.btn(this.gb, 0, 80, 75, 155, require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A==")), 13, 94, 11, 4, 0, 2); //btn4
			}
			if (ew.def.prxy != this.prxy) {
				this.prxy = ew.def.prxy;
				if (this.prxy) this.btn(1, 80, 80, 155, 155, require("heatshrink").decompress(atob("mEwwMB/4AL/ATBh4FB4AFBCwQgD//+Aod//kDCgU//kfEAUf/E/AoIJB+F/AoP+h4FD/4FBHIcH+H8vgFBw/gAoITBAowRCAoYdDAoovG/A7EI4v8NwXwLIJlDn5rF/+APongAoJ0CN4Q4D/grCAqYdF8EHAofAFwYFGwPBEIUAg5DBLIQFVD4ODEYQvH8AFE+BHEKYoAJA=")), 92, 93, 11, 4, 0, 2); //btn5
				//else if (this.prxy == 2) this.btn(1, 80, 80, 155, 155, require("heatshrink").decompress(atob("mUywIQNg//AAP4Aon/4EDAof4gIFD/8AAongv4SEj4DB44CBEgP+FAXDAoQcB+AFDv/+n4FCDgOP/8B/w1B8f/wIWBn/4IwP+/0PDAPw/ED4IYB/E4gF4n/j/0cG4MPDAMOgEB8IYB4eAgE4v+P8PAgEGj/j/FwCQPD/AeCgFwDAOGAoMcn4YBDwIrBDANgDAkYDAmHDAoxBg4xB/hQBgeHJQ/BCQNwMYV4KAJjB/8PwE+j4YB4P8v0HDAKwCZYKVCAIQYB8CuCDAK0D/k/TgLXCY4YFBToIADWALgEh4FD/j5GCQhmBAoaMBDIX8HQIAFA=")), 92, 93, 11, 4, 0, 2); //btn5
				else this.btn(0, 80, 80, 155, 155, require("heatshrink").decompress(atob("mEwwMB/4AL/ATBh4FB4AFBCwQgD//+Aod//kDCgU//kfEAUf/E/AoIJB+F/AoP+h4FD/4FBHIcH+H8vgFBw/gAoITBAowRCAoYdDAoovG/A7EI4v8NwXwLIJlDn5rF/+APongAoJ0CN4Q4D/grCAqYdF8EHAofAFwYFGwPBEIUAg5DBLIQFVD4ODEYQvH8AFE+BHEKYoAJA=")), 95, 94, 11, 4, 0, 2); //btn5
			}
			if (ew.def.hid != this.hid) {
				this.hid = ew.def.hid;
				this.btn(this.hid, 160, 80, 239, 155, require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA=")), 176, 94, 11, 4, 0, 2); //btn6
			}
		}
		else { //settings
			this.appImgNone = 0;
			//bluetooth settings
			if (ew.is.bt != this.bt) {
				this.bt = ew.is.bt;
				var state = (ew.def.cli || ew.def.gb || ew.def.prxy || ew.def.hid || ew.def.prxy) ? 1 : 0;
				//bt btn
				this.img = require("heatshrink").decompress(atob("lkwwIPMg4FE/AKE4AFDtwEDg1gAocjAgcDnAFDmOAAgUBxgKDjAbChkBwwJC8EMmAEBh8A4IbC+EEjAKDsBCC7/+g//4EN//gv//wFAEgUMgw0DsBQDgQKEkAKDg0EBQfgFYf4FYf8IIMGhhBDoJMDhhMCh0A4YhC4BtDPAOOPAifDgYaCAAMzRwcCPoQABsyvEXQl8AgcPDQcAuD/XABYA="));
				this.btn(state, 0, 0, 75, 75, (state) ? require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")) : this.img, 13, 15, 11, 1, 15, 1);
				this.img = 0;
			}
			//themes 
			if (this.btn2) {
				this.btn2 = 0;
				this.g.setColor(0, 0);
				this.g.clearRect(76, 0, 79, 75);
				this.g.flip();
				this.g.setColor(1, 1);
				this.g.fillRect(80, 0, 155, 75); //2
				this.g.setColor(0, 11);
				this.g.drawImage(require("heatshrink").decompress(atob("mEwwIHEgfwAocH/AFDh/8Aocf/wFDn//Aod/Aon//8PAQPBAomDAQMfAQMH//+AoP+BwIFC/gCE+AuB/Ef4AuC+EfwAuC8AFBgIFB4AFBgYFBwAFBFwJGBAoIuCAoQuCAoQuCAonwoAFBGgPgFIQLB4IFBQIJgB4EeRoJgB4Ecg+D/wFBjE/8P8h5XC+H4AoQzB+AFD/lAAoJdBIoIFDKIIFfQIIpDApB+BAoZsBAoX4PAPANIPwAoR1B+CtDcQaHCYAL3CTwIAC")), 95, 15);
				this.g.flip();
			}
			//buzz on/off
			if (ew.def.buzz != this.buzz) {
				this.buzz = ew.def.buzz;
				this.btn(this.buzz, 160, 0, 239, 75, (this.buzz) ? require("heatshrink").decompress(atob("mEwwIdag/gApMOuAFDn18Aof4j4ECgPAgeAAoIDBA4IiCAQIkChwCBEgUMKoQCBjACKBwUcAogaFAv4FEsACBgx8BPQQDBQwaMCTAYFH/4ACAozRNjCOCAo8MJITdHJIYAXA")) : require("heatshrink").decompress(atob("mEwwIdag/gEAIFEuAFBhwDBA4MAn18gPAAoP4j8DwEABAMDw4KBBAMBxwiCAQMcEQQCBnACBhgCBFwUYEoQFDgPYMgQlBzAFDg4aCAoMOAokcAok4AolwAongAoZUBAoZUBAoZUBAoZUBAoZdBAoZdBAoZdBAoVgRgMGKwPBRgMDQwODRgiDCgAFBQYQFCj//AAIaBn4FERgQACXYQABEoMYS4RdBAoZdCbYQuBboRPCIoL/TAAo")), 176, 15, 11, 4, 11, 2); //btn3

			}
			//find my phone
			if (ew.is.fmp != this.fmp) {
				this.fmp = ew.is.fmp;
				this.btn(this.fmp, 0, 80, 75, 155, require("heatshrink").decompress(atob("mEwwILIv/+AgUD///4AFBg8//HgAoMGj/4sAFCAQIFfgYFD4EPAofghwFDuEcAoc4nAFDjkw4wFBscMuIFDx1hwwFBAYPjAofG8YdD4/HApPjAqIjEAovHsY1D45BFJopZFMopxFPosHAofwSoq/jAo0HAQL1Cgf//40BAAM87wECAAg")), 13, 94, 15, 7, (ew.is.bt == 3) ? 15 : 0, (ew.is.bt == 3) ? 1 : 2); //btn4
			}
			//acc on/off
			if (ew.def.acc != this.acc) {
				this.acc = ew.def.acc;
				this.btn(this.acc, 80, 80, 155, 155, require("heatshrink").decompress(atob("mEwwJC/AAkPwAECgP//AFCg///4FCj4FBCQU/AoPgAoN/4Ef+AFB/wZBDwMB/gCCgUDBwV+h0HDQU/jkP4AsCvg/Dh/8j5JDAokH/k+Igf4Aoc//E8AoRbBvhhEAoUD//wjAnBwIFBEIRaEn/AgIFDJ4QFIKoQdDAoibDgECbfA=")), 95, 94, 11, global.euc.state != "OFF" ? 12 : 4, 11, global.euc.state != "OFF" ? 12 : 2);
			}
			//brightness level
			if (this.g.bri.lv != this.bri) {
				this.bri = this.g.bri.lv;
				this.c = 15;
				this.g.setColor(0, 1);
				this.g.clearRect(160, 80, 239, 155); //brightness
				this.g.setColor(1, this.c);
				this.g.setFont("Vector", 30);
				this.g.drawImage(require("heatshrink").decompress(atob("jEXwIHEhAKCAQcEAgMGAQMCuADB+EAgICEgYCBnYFEBwoXCDoUGiEAhw9DAQ4ABA")), 170, 107);
				this.g.setFont("Vector", 45);
				this.g.drawString(this.g.bri.lv, 194, 99);
				this.g.flip();
			}
		}
		//loop
		this.tid = setTimeout(function(t, o) {
			t.tid = -1;
			t.show(o);
		}, 100, this);
	},
	tid: -1,
	run: false,
	clear: function(o) {
		//pal[0]=0;
		//this.g.clear();
		if (ew.is.tor == 1) {
			w.gfx.bri.set(this.cbri);
			face.faceSave = -1;
			ew.is.tor = -1;
		}
		this.run = false;
		if (this.tid >= 0) clearTimeout(this.tid);
		this.tid = -1;
		return true;
	},
	off: function(o) {
		this.g.off();
		this.clear(o);
	},
	btn: function(state, rectx0, recty0, rectx1, recty1, Img, ImgX, ImgY, efCol, ebCol, dfCol, dbCol) {
		if (state) { this.colf = (efCol) ? efCol : 15;
			this.colb = (ebCol) ? ebCol : 4; }
		else { this.colf = (dfCol) ? dfCol : 0;
			this.colb = (dbCol) ? dbCol : 1; }
		this.g.setColor(1, this.colb);
		this.g.fillRect(rectx0, recty0, rectx1, recty1);
		this.g.setColor(0, this.colf);
		this.g.drawImage(Img, ImgX, ImgY);
		Img = -1;
		this.g.flip();
	},
	themetout: function(tim) {
		this.g.setColor(0, 1);
		this.g.fillRect(0, 80, 239, 155);
		this.g.setColor(1, 15);
		this.g.setFont("Vector", 18);
		this.tout = (ew.def.off[face.appRoot[0]]) ? ew.def.off[face.appRoot[0]] : 3000;
		this.g.drawString("TIMEOUT (" + ((this.tout < 60000) ? "seconds" : (this.tout < 3600000) ? "minutes" : "hours") + ")", 120 - (this.g.stringWidth("TIMEOUT (" + ((this.tout < 60000) ? "seconds" : (this.tout < 3600000) ? "minutes" : "hours") + ")") / 2), 85);
		//this.g.setFont("Vector",18);
		//this.g.drawString("TIMEOUT (seconds)",120-(this.g.stringWidth("TIMEOUT (seconds)")/2),85);
		this.g.setFont("Vector", 30);
		this.g.drawString("<", 20, 120);
		this.g.drawString(">", 195, 120);
		this.g.setFont("Vector", 45);
		this.g.drawString(this.tout / ((this.tout < 60000) ? "1000" : (this.tout < 3600000) ? "60000" : "3600000"), 120 - (this.g.stringWidth(this.tout / ((this.tout < 60000) ? "1000" : (this.tout < 3600000) ? "60000" : "3600000")) / 2), 115);
		this.g.flip();
	},
};
//
face[1] = {
	offms: 1000,
	g: w.gfx,
	init: function() {
		return true;
	},
	show: function() {
		//ew.do.update.settings();
		face[0].btSetOn = 1;
		if (face.faceSave != -1) {
			face.go(face.faceSave[0], face.faceSave[1], face.faceSave[2]);
			face.faceSave = -1;
		}
		else face.go("clock", 0);
		return true;
	},
	clear: function() {
		return true;
	},
};

//touch-settings  
touchHandler[0] = function(e, x, y) {
	if (ew.is.tor == 1) {
		w.gfx.bri.set(face[0].cbri);
		ew.is.tor = -1;
		face[0].tor = 0;
		face.go("settings", 0);
		return;
	}
	else if (e == 5) {
		if (x < 77 && y < 75) { //btn1
			if (face[0].btSet) {
				buzzer.nav([30, 50, 30]);
				face[0].btSet = 0;
				face[0].gb = -1;
				face[0].cli = -1;
				face[0].bt = -1;
				face[0].hid = -1;
				face[0].prxy = -1;
				face[0].bri = -1;
				face[0].acc = -1;
				face[0].buzz = -1;
				face[0].sys = 1;
				face[0].btn2 = 1;
				face[0].fmp = -1;
			}
			else if (face[0].themeSet) {
				buzzer.nav(40);
			}
			else if (face.mode) {
				if (face[0].appDo1) {
					buzzer.nav([30, 50, 30]);
					eval(face[0].appDo1);
					return;
				}
				else buzzer.nav(40);
			}
			else {
				face[0].btSetOn = 1;
				face[0].btSet = 1;
				buzzer.nav([30, 50, 30]);
				face[0].gb = -1;
				face[0].cli = -1;
				face[0].bt = -1;
				face[0].hid = -1;
				face[0].prxy = -1;
				face[0].bri = -1;
				face[0].acc = -1;
				face[0].buzz = -1;
				face[0].sys = 1;
				face[0].btn2 = 1;
				face[0].fmp = -1;
			}
		}
		else if (77 < x && x < 158 && y < 75) { //btn2
			if (face[0].btSet) {
				buzzer.nav([30, 50, 30]);
				face[0].btSet = 0;
				face[0].gb = -1;
				face[0].cli = -1;
				face[0].bt = -1;
				face[0].hid = -1;
				face[0].prxy = -1;
				face[0].bri = -1;
				face[0].acc = -1;
				face[0].buzz = -1;
				face[0].sys = 1;
				face[0].btn2 = 1;
				face[0].fmp = -1;
			}
			else if (face[0].themeSet) {
				buzzer.nav(40);
			}
			else if (face.mode) {
				if (face[0].appDo2) { buzzer.nav([30, 50, 30]);
					eval(face[0].appDo2); return; }
				else buzzer.nav(40);
			}
			else {
				face[0].themeSetOn = 1;
				face[0].themeSet = 1;
				buzzer.nav([30, 50, 30]);
				face[0].gb = -1;
				face[0].cli = -1;
				face[0].bt = -1;
				face[0].hid = -1;
				face[0].prxy = -1;
				face[0].bri = -1;
				face[0].acc = -1;
				face[0].buzz = -1;
				face[0].sys = 1;
				face[0].btn2 = 1;
				face[0].fmp = -1;
				//face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
			}
		}
		else if (158 < x && x < 239 && y < 75) { //btn3
			if (face.mode) {
				if (face[0].appDo3) { buzzer.nav([30, 50, 30]);
					eval(face[0].appDo3); return; }
				else buzzer.nav(40);
			}
			else if (face[0].btSet) {
				if (global.euc.state != "OFF") { buzzer.nav(300); return; }
				ew.def.cli = 1 - ew.def.cli;
				ew.do.update.bluetooth();
				buzzer.nav([30, 50, 30]);
			}
			else if (face[0].themeSet) {
				buzzer.nav(40);
			}
			else {
				ew.def.buzz = 1 - ew.def.buzz;
				if (ew.def.buzz) {
					buzzer.nav = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
					buzzer.nav([30, 50, 30]);
				}
				else {
					buzzer.nav([30, 50, 30]);
					buzzer.nav = function() {};
				}
			}
		}
		else if (77 > x && 77 < y && y < 159) { //btn4
			if (face.mode) {
				if (face[0].appDo4) { buzzer.nav([30, 50, 30]);
					eval(face[0].appDo4); return; }
				else buzzer.nav(40);
			}
			else if (face[0].btSet) {
				if (global.euc.state != "OFF") { buzzer.nav(300); return; }
				ew.def.gb = 1 - ew.def.gb;
				ew.do.update.bluetooth();
				buzzer.nav([30, 50, 30]);
			}
			else if (face[0].themeSet) {
				if (1000 < face[0].tout && face[0].tout <= 60000) {
					ew.def.off[face.appRoot[0]] = face[0].tout - 3000;
					if (ew.def.off[face.appRoot[0]] < 3000) ew.def.off[face.appRoot[0]] = 3000;
				}
				else if (60000 < face[0].tout && face[0].tout <= 3600000) {
					ew.def.off[face.appRoot[0]] = face[0].tout - 600000;
					if (ew.def.off[face.appRoot[0]] < 60000) ew.def.off[face.appRoot[0]] = 60000;
				}
				else if (3600000 < face[0].tout) {
					ew.def.off[face.appRoot[0]] = face[0].tout - 1800000;
					if (ew.def.off[face.appRoot[0]] < 3600000) ew.def.off[face.appRoot[0]] = 3600000;
				}
				else ew.def.off[face.appRoot[0]] = 3000; //1sec
				face[0].themetout();
				buzzer.nav([30, 50, 30]);
			}
			else if (ew.is.bt == 3) {
				buzzer.nav([30, 50, 30]);
				ew.is.fmp = 1 - ew.is.fmp;
				if (ew.is.fmp) ew.gbSend({ "t": "findPhone", "n": true });
				else ew.gbSend({ "t": "findPhone", "n": false });
				//face.go("settings",5);return;
			}
			else buzzer.nav(40);
		}
		else if (77 < x && x < 157 && 77 < y && y < 159) { //btn5
			if (face.mode) {
				if (face[0].appDo5) { buzzer.nav([30, 50, 30]);
					eval(face[0].appDo5); return; }
				else buzzer.nav(40);
			}
			else if (face[0].btSet) {
				if (global.euc.state != "OFF") { buzzer.nav(300); return; }
				//ew.def.prxy--;
				//if (ew.def.prxy < 0) ew.def.prxy = 2;
				ew.def.prxy=1-ew.def.prxy;
				ew.do.update.bluetooth();
				buzzer.nav([30, 50, 30]);
			}
			else if (face[0].themeSet) {
				buzzer.nav(40);
			}
			else {
				if (global.euc.state != "OFF") { buzzer.nav(40); return; }
				ew.def.acc = 1 - ew.def.acc;
				ew.do.update.acc();
				buzzer.nav([30, 50, 30]);
			}
		}
		else if (158 < x && x < 239 && 77 < y && y < 159) { //btn6
			if (face.mode) {
				if (face[0].appDo6) { buzzer.nav([30, 50, 30]);
					eval(face[0].appDo6); return; }
				else buzzer.nav(40);
			}
			else if (face[0].btSet) {
				if (global.euc.state != "OFF") { buzzer.nav(300); return; }
				ew.def.hid = 1 - ew.def.hid;
				ew.do.update.bluetooth();
				buzzer.nav([30, 50, 30]);
			}
			else if (face[0].themeSet) {
				if (1000 <= face[0].tout && face[0].tout < 60000)
					ew.def.off[face.appRoot[0]] = face[0].tout + 3000;
				else if (60000 <= face[0].tout && face[0].tout < 3600000) {
					ew.def.off[face.appRoot[0]] = face[0].tout + 600000;
					if (ew.def.off[face.appRoot[0]] < 1200000) ew.def.off[face.appRoot[0]] = 600000;
				}
				else if (3600000 <= face[0].tout) {
					ew.def.off[face.appRoot[0]] = face[0].tout + 1800000;
					if (14400000 < ew.def.off[face.appRoot[0]]) ew.def.off[face.appRoot[0]] = 14400000;
				}
				else ew.def.off[face.appRoot[0]] = 3000; //1sec
				face[0].themetout();
				buzzer.nav([30, 50, 30]);
			}
			else {
				face[0].cbri = w.gfx.bri.lv + 1;
				if (face[0].cbri > 7) face[0].cbri = 1;
				w.gfx.bri.set(face[0].cbri);
				buzzer.nav([30, 50, 30]);
			}
		}
		else if (0 < x && x < 75 && 158 < y && y < 239) { //btn7
			ew.is.tor = 1;
			face[0].cbri = w.gfx.bri.lv;
			w.gfx.bri.set(7);
			face[0].tor = 1;
			if (face.offid >= 0) { clearTimeout(face.offid);
				face.offid = -1; }
			face.offid = setTimeout((f) => {
				face[0].tor = 0;
				ew.is.tor = -1;
				w.gfx.bri.set(face[0].cbri);
				if (f >= 0 && face[f].off) face[f].off();
				face.offid = -1;
				face.pageCurr = -1;
				face.appPrev = "clock";
			}, 25000, face.pageCurr);
			buzzer.nav([30, 50, 30]);
			return;
		}
		else if (77 < x && x < 157 && 158 < y && y < 239) { //btn8	
			buzzer.nav([30, 50, 30]);
			//if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
			//face.go(face.faceSave[0].substring(0,4)+"Options",0);
			//}else 
			face.go("clockOptions", 0);
			return;
		}
		else if (158 < x && x < 239 && 160 < y && y < 239) { //btn9
			buzzer.nav([30, 50, 30]);
			if (require("Storage").read("dashOptions"))
				face.go("dashOptions", 0);
			return;
		}
		else buzzer.nav(40);
	}
	else if (e == 1) {
		//if (face[0].btSet) {
		//	face[0].btSet=0;
		//}else 
		if (158 < x && x < 239 && 60 < y && y < 180 && !face.mode) {
			face[0].cbri = w.gfx.bri.lv - 1;
			if (face[0].cbri < 1) face[0].cbri = 1;
			w.gfx.bri.set(face[0].cbri);
			buzzer.nav([30, 50, 30]);
		}
		else {
			//ew.do.update.settings();
			if (face.faceSave != -1) {
				face.go(face.faceSave[0], face.faceSave[1], face.faceSave[2]);
				face.faceSave = -1;
			}
			else {
				if (face.appPrev == "settings" || face.appPrev == face.faceSave[0].substring(0, 4) + "Options") { face.appPrev = "clock";
					face.pagePrev = 0; }
				face.go(face.appPrev, face.pagePrev, face.pageArg);
				return;
			}
		}
	}
	else if (e == 2) {
		if (y > 160 && x < 50) {
			if (w.gfx.bri.lv !== 7) { this.bri = w.gfx.bri.lv;
				w.gfx.bri.set(7); }
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30, 50, 30]);
		}
		else if (face[0].btSet) {
			face[0].btSet = 0;
			face[0].gb = -1;
			face[0].cli = -1;
			face[0].bt = -1;
			face[0].hid = -1;
			face[0].prxy = -1;
			face[0].bri = -1;
			face[0].acc = -1;
			face[0].buzz = -1;
			face[0].sys = 1;
			face[0].btn2 = 1;
			face[0].fmp = -1;
		}
		else if (face[0].themeSet) {
			w.gfx.setColor(0, 0);
			w.gfx.fillRect(76, 0, 79, 160);
			w.gfx.flip();
			w.gfx.fillRect(156, 0, 159, 160);
			w.gfx.flip();
			face[0].themeSet = 0;
		}
		else if (158 < x && x < 239 && 60 < y && y < 180 && !face.mode) {
			face[0].cbri = w.gfx.bri.lv + 1;
			if (face[0].cbri > 7) face[0].cbri = 7;
			w.gfx.bri.set(face[0].cbri);
			buzzer.nav([30, 50, 30]);
		}
		else if (face.faceSave != -1) {
			face.go(face.faceSave[0], face.faceSave[1], face.faceSave[2]);
			face.faceSave = -1;
			//ew.do.update.settings();
		}
		else {
			if (face.appPrev == "settings") { face.appPrev = "clock";
				face.pagePrev = 0; }
			face.go(face.appPrev, face.pagePrev, face.pageArg);
			return;
			//ew.do.update.settings();
		}
	}
	else if (e == 3) {
		if (face[0].btSet) {
			face[0].btSet = 0;
		}
		else if (face[0].themeSet) {
			w.gfx.setColor(0, 0);
			w.gfx.fillRect(76, 0, 79, 160);
			w.gfx.flip();
			w.gfx.fillRect(156, 0, 159, 160);
			w.gfx.flip();
			face[0].themeSet = 0;
		}
		else if (Boolean(require('Storage').read('w_apps'))) {
			face.mode = 1 - face.mode;
			face[0].btSet = 0;
			face[0].gb = -1;
			face[0].cli = -1;
			face[0].bt = -1;
			face[0].hid = -1;
			face[0].prxy = -1;
			face[0].bri = -1;
			face[0].acc = -1;
			face[0].buzz = -1;
			face[0].sys = 1;
			face[0].btn2 = 1;
			face[0].fmp = -1;
			buzzer.nav([30, 50, 30]);
		}
		else buzzer.nav(40);
	}
	else if (e == 4) {
		if (face[0].btSet) {
			face[0].btSet = 0;
			//ew.do.update.settings();
		}
		else if (face[0].themeSet) {
			w.gfx.setColor(0, 0);
			w.gfx.fillRect(76, 0, 79, 160);
			w.gfx.flip();
			w.gfx.fillRect(156, 0, 159, 160);
			w.gfx.flip();
			face[0].themeSet = 0;
			//}else if (face.faceSave!=-1) {
			//	face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}
		else if (Boolean(require('Storage').read('w_apps'))) {
			face.mode = 1 - face.mode;
			face[0].btSet = 0;
			face[0].gb = -1;
			face[0].cli = -1;
			face[0].bt = -1;
			face[0].hid = -1;
			face[0].prxy = -1;
			face[0].bri = -1;
			face[0].acc = -1;
			face[0].buzz = -1;
			face[0].sys = 1;
			face[0].btn2 = 1;
			face[0].fmp = -1;
			buzzer.nav([30, 50, 30]);
		}
		else {
			buzzer.nav(40);
			//if (face.appPrev=="settings") {face.appPrev="clock";face.pagePrev=0;}
			//face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		}
		/*	
		  if (face[0].btSet) {
			face[0].btSet=0;
			face[0].gb=-1;face[0].cli=-1;face[0].bt=-1;face[0].hid=-1;face[0].prxy=-1;face[0].bri=-1;face[0].acc=-1;face[0].buzz=-1;face[0].sys=1;face[0].btn2=1;face[0].fmp=-1;
		  }else if (face.faceSave!=-1) {
			  face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
			  //ew.do.update.settings();
		  }else{
			  if (face.appPrev=="settings") {face.appPrev="clock";face.pagePrev=0;}
			  face.go(face.appPrev,face.pagePrev,face.pageArg);return;
			  //ew.do.update.settings();
		  }
		  */
	}
	else if (e == 12) {
		if (face[0].btSet) {
			if (global.euc.state != "OFF") { buzzer.nav(300); return; }
			if (x < 160 && y < 77) { //bt toggle tx
				buzzer.nav([30, 50, 30]);
				if (ew.def.rfTX === -4) ew.def.rfTX = 0;
				else if (ew.def.rfTX === 0) ew.def.rfTX = 4;
				else if (ew.def.rfTX === 4) ew.def.rfTX = -4;
				NRF.setTxPower(ew.def.rfTX);
				face[0].btSetOn = 1;
			}
			else buzzer.nav(40);
		}
		else buzzer.nav(40);
	}
	this.timeout();
};
//
