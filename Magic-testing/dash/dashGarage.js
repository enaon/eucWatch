//
tcBack.replaceWith(() => {
	buzzer.nav(buzzer.buzz.ok);
	if (UI.ntid && face[0].bar) {
		clearTimeout(UI.ntid);
		UI.ntid = 0;
		face[0].bar();
	}
	else if (!euc.dash.info.get.makr || !ew.def.dash.slot || !require("Storage").readJSON("logDaySlot" + ew.def.dash.slot + ".json", 1))
		face.go("clock", 0);
	else
		face.go("clock", 0);
	//face.go("dashOff",0);
});
tcNext.replaceWith(() => { buzzer.nav(buzzer.buzz.na); });
//Dash Garage
face[0] = {
	offms: (ew.def.off[face.appCurr]) ? ew.def.off[face.appCurr] : 15000,
	bpp: ew.def.bpp ? 0 : 1,
	g: w.gfx,
	slot: 0,
	icon: "",
	init: function(o) {
		this.prevSlot = ew.def.dash.slot;
		this.bar();
		this.run = false;
	},
	show: function(o) { return; },
	bar: function() {
		this.slot = require("Storage").readJSON("dash.json", 1);
		target = { "InmotionV10": "im", "InmotionV11": "im", "InmotionV12": "im", "Begode": "bg", "NinebotS": "nb", "NinebotZ": "nb", "Veteran": "vt", "NinebotE": "nb", "Kingsong": "ks" };
		UI.ele.title("GARAGE", 3, 0);
		UI.ele.ind(2,2,0,8);
		UIc.start(1, 1);
		this.slot.slot1Mac ? UI.btn.img("main", "_2x2", 1, this.icon + target[this.slot.slot1Maker], this.slot.slot1Model.toUpperCase(), this.slot.slot == 1 ? 15 : 3, this.slot.slot == 1 ? 1 : 0) : UI.btn.img("main", "_2x2", 1, this.icon + "scan", "", 2, 0);
		this.slot.slot2Mac ? UI.btn.img("main", "_2x2", 2, this.icon + target[this.slot.slot2Maker], this.slot.slot2Model.toUpperCase(), this.slot.slot == 2 ? 15 : 3, this.slot.slot == 2 ? 1 : 0) : UI.btn.img("main", "_2x2", 2, this.icon + "scan", "", 2, 0);
		this.slot.slot3Mac ? UI.btn.img("bar", "_2x2", 3, this.icon + target[this.slot.slot3Maker], this.slot.slot3Model.toUpperCase(), this.slot.slot == 3 ? 15 : 3, this.slot.slot == 3 ? 1 : 0) : UI.btn.img("bar", "_2x2", 3, this.icon + "scan", "", 2, 0);
		this.slot.slot4Mac ? UI.btn.img("bar", "_2x2", 4, this.icon + target[this.slot.slot4Maker], this.slot.slot4Model.toUpperCase(), this.slot.slot == 4 ? 15 : 3, this.slot.slot == 4 ? 1 : 0) : UI.btn.img("bar", "_2x2", 4, this.icon + "scan", "", 2, 0);
		UIc.end();
		UIc.main._2x2 = (i) => {
			if (face[0].slot["slot" + i + "Mac"]) face[0].tap(i);
			else face[0].empty(i);
		};
		UIc.bar._2x2 = (i) => {
			if (face[0].slot["slot" + i + "Mac"]) face[0].tap(i);
			else face[0].empty(i);
		};
	},
	tap: function(no) {
		buzzer.nav(buzzer.buzz.ok);
		if (this.prevSlot == no) {
			//UI.ele.ind(0, 0, 0);
			UI.ele.title((euc.dash.info.get.makr + " " + euc.dash.info.get.modl).toUpperCase(), 3, 0, 1);
			UI.btn.ntfy(0, 3, 1);
			UI.ele.fill("_main", 9, 0);
			UIc.start(1, 1);
			UI.btn.c2l("main", "_2x1", 1, "CONNECT", "", 15, 4);
			UI.btn.img("bar", "_bar", 4, this.icon + "alert", "SET", 15, 1);
			UI.btn.img("bar", "_bar", 5, this.icon + "trash", "DEL", 15, 13);
			UIc.end();
			UIc.main._2x1 = (i) => {
				if (i == 1) {
					euc.tgl();
				}
				else if (i == 2) {
					buzzer.nav(buzzer.buzz.na);
					UI.btn.ntfy(1, 1.5, 0, "_bar", 6, "NOT YET", "", 15, 13);
					w.gfx.flip();
				}
				return;
			};
			UIc.bar._bar = (i) => {
				if (i == 4) {
					buzzer.nav(buzzer.buzz.ok);
					face.go("dashAlerts", 0);
				}
				else if (i == 5) {
					buzzer.nav(buzzer.buzz.ok);
					face[0].del(no);
				}
				return;
			};
		}
		else {
			UI.ele.title("SELECTED", 15, 0);
			ew.def.dash.slot = no;
			
			UI.btn.img("main", "_2x2", no, this.icon + target[this.slot["slot" + no + "Maker"]], this.slot["slot" + no + "Model"].toUpperCase(), 15, 1);
			if (this.slot["slot" + this.prevSlot + "Mac"]) {
				UI.btn.img("main", "_2x2", this.prevSlot, this.icon + target[this.slot["slot" + this.prevSlot + "Maker"]], this.slot["slot" + this.prevSlot + "Model"].toUpperCase(), 3, 0);
				require("Storage").writeJSON('eucSlot' + this.prevSlot + '.json', euc.dash);
				//ew.do.fileWrite('eucSlot' +  this.prevSlot + '.json', euc.dash);
			}
			this.prevSlot = no;
			ew.do.fileWrite("dash", "slot", no);
			if (Boolean(require("Storage").read('eucSlot' + no + '.json')))
				euc.dash = require("Storage").readJSON('eucSlot' + no + '.json', 1);
			else
				euc.dash = require("Storage").readJSON("eucSlot.json", 1);
		}
	

	},
	empty: function(no) {
		buzzer.nav(buzzer.buzz.ok);
		UI.btn.ntfy(0, 1.5, 1);
		//UI.ele.ind(0, 0, 0);
		//if (ew.def.info)
		//	UI.txt.block("_main",9,"SLOT "+no+" is empty. Scan for a Wheel.",11,15,0); 
		//else 
		UI.btn.img("main", "_2x2", this.icon + no, "scan", "", 3, 1);
		UIc.start(0, 1);
		UI.btn.img("bar", "_bar", 6, this.icon + "scan", "SCAN", 15, 4);
		UIc.end();
		UIc.bar._bar = (i) => {
			if (i == 6) {
				buzzer.nav(buzzer.buzz.ok);
				euc.dash = require("Storage").readJSON("eucSlot.json", 1);
				ew.do.fileWrite("dash", "slot", no);
				ew.def.dash.slot = no;
				face.go("dashScan", 0);
			}
		};
	},
	del: function(no) {
		UI.btn.ntfy(0, 2, 1);
		//if (ew.def.info)UI.btn.c2l("main","_main",6,`SLOT ${no}`,"DELETE?",15,0,1);
		UIc.start(1, 0);
		UI.btn.img("main", "_bar", 6, this.icon + "trash", "CONFIRM", 15, 13);
		UIc.end();
		UIc.main._bar = (i) => {
			if (i == 6) {
				buzzer.nav(300);
				ew.do.fileWrite("dash", `slot${no}Mac`);
				ew.do.fileWrite("dash", `slot${no}Name`);
				ew.do.fileWrite("dash", `slot${no}Maker`);
				ew.do.fileWrite("dash", `slot${no}Model`);
				require("Storage").erase(`logDaySlot${no}.json`);
				require("Storage").erase(`logWeekSlot${no}.json`);
				require("Storage").erase(`logYearlot${no}.json`);
				require("Storage").erase(`eucSlot${no}.json`);
				euc.dash = require("Storage").readJSON("eucSlot.json", 1);
				UI.btn.ntfy(0, 2.5, 1);
				UI.btn.c2l("main", "_bar", 6, `SLOT ${no}`, "DELETED", 15, 4);
				ew.def.dash.slot = 0;
				ew.do.fileWrite("dash", "slot", no);
				face[0].prevSlot = 0;
			}
		};
	},
	tid: -1,
	run: false,
	clear: function() { /*TC.removeAllListeners();*/
		if (UI.ntid) {
			clearTimeout(UI.ntid);
			UI.ntid = 0;
		}
		return true;
	},
	off: function() {
		this.g.off();
		this.clear();
	}
};
