//scan face-used by dash/repellent
if (!global.scan) {
  scan = {
    mac: [],
    go: function(app, service) {
      ew.is.gIsB = 1;
      if (app == "repellent") this.filter = [{ serviceData: { "fe95": {} } }];
      else {
        app = "dash";
        //if (euc.dash.info.get.makr == "NinebotS") this.filter = [{ manufacturer: 16974 }];
  			if (euc.dash.info.get.makr == "NinebotS") this.filter = [{ namePrefix: 'N1' }];
        else if (euc.dash.info.get.makr == "NinebotZ") this.filter = [{ namePrefix: 'N3' }];
        else if (euc.dash.info.get.makr == "NinebotE") this.filter = [{ namePrefix: 'NOC' }, { namePrefix: 'NOE' }, { namePrefix: 'NOP' }];
        else if (euc.dash.info.get.makr == "InmotionV11") this.filter = [{ namePrefix: 'V11-' }];
        else if (euc.dash.info.get.makr == "InmotionV12") this.filter = [{ namePrefix: 'V12-' }];
        else if (euc.dash.info.get.makr == "Begode") this.filter = [{ namePrefix: 'GotWay' }];
        else if (euc.dash.info.get.makr == "Veteran") this.filter = [{ namePrefix: 'LK' }];
       // else if (euc.dash.info.get.makr == "Kingsong") this.filter = [{ namePrefix: 'KS' }];
  			else if (euc.dash.info.get.makr=="Kingsong")  this.filter =  [{}]; 
        else this.filter = [{ services: [service] }];
      }
      this.slot = "";
      scan.found = [];
      if (scan.tid) { clearTimeout(scan.tid);
        scan.tid = 0; }
      NRF.setScan(function(devices) {
        if (euc.dash.info.get.makr=="Kingsong") {
						if (devices.shortName&&devices.shortName.startsWith("KSN")&&!scan.found.includes(devices.id+"|"+devices.shortName) ) scan.found.push(devices.id+"|"+devices.shortName);
						if (devices.name&&devices.name.startsWith("KS")&&!scan.found.includes(devices.id+"|"+devices.name) )  scan.found.push(devices.id+"|"+devices.name);
				}else if (!scan.found.includes(devices.id+"|"+devices.name)) scan.found.push(devices.id+"|"+devices.name);
      }, { filters: this.filter, active: true });
      scan.tid = setTimeout(() => {
        scan.tid = 0;
        NRF.setScan();
        if (scan.found != "" && scan.found != undefined) {
          if (app == "dash") {
            euc.dash.info.get.mac = 0;
          }
          else {
            ew.do.fileWrite("setting", app + "Mac", scan.found[0].split("|")[0]);
            ew.do.fileWrite("setting", app + "Name", scan.found[0].split("|")[1].replace(/\0/g, ''));
            ew.do.fileWrite("setting", app + "Go", "0");
          }
          scan.mac = scan.found;
        }
        else scan.mac = [];
        ew.is.gIsB = 0;
        face[0].start = 1;
        if (face.appCurr != "w_scan") { delete scan.go;
          delete scan; }
      }, 2500);
    }
  };
}
face[0] = {
  offms: (ew.def.off[face.appCurr]) ? ew.def.off[face.appCurr] : 10000,
  g: w.gfx,
  go: 0,
  find: function(service) {
    if (!this.start) return;
    this.start = 0;
    if (ew.is.gIsB) {
      //ew.do.setGattState();
      this.cnt = 1;
      if (this.loop >= 0) clearInterval(this.loop);
      this.loop = setInterval(function() {
        this.cnt++;
        if (!ew.is.gIsB) scan.go(face.appPrev, service);
        else if (this.cnt > 4) { print("scan timeout");
          clearInterval(this.loop);
          this.loop = -1; return; }
      }, 1000);
    }
    else scan.go(face.appPrev, service);
  },
  init: function(o) {
    //this.find(o);
    this.go = 0;
    scan.mac = (require("Storage").readJSON("ew.json", 1) || {})[face.appPrev + "Mac"];
    this.go = (require("Storage").readJSON("ew.json", 1) || {})[face.appPrev + "_go"];
    this.go = 0;
    this.start = 1;
    if (!scan.mac) { scan.mac = [];
      this.find(o); }
    this.g.setColor(0, 0); //header
    this.g.fillRect(0, 0, 239, 35);
    this.g.setColor(1, 11);
    this.g.setFont("Vector", 24);
    this.g.drawString((face.appPrev == "repellent") ? "REPELLENT" : "EUC", 30, 6);
    this.g.flip();
    this.line = 0;
    this.top = 50;
    this.run = true;
  },
  show: function(o) {
    if (!this.run) return;
    if (!this.start) {
      this.g.setColor(0, 0); //header
      this.g.fillRect(160, 0, 239, 35);
      this.g.flip();
      this.g.setColor(1, 1);
      this.g.fillRect(0, 36, 239, 239);
      this.g.setColor(0, 11);
      this.g.setFont("Vector", 28);
      this.g.drawString("SCANNING", 120 - (this.g.stringWidth("SCANNING") / 2), 110);
      this.g.flip();
    }
    else if (scan.mac != "" && this.start == 1) {
      this.start = 2;
      this.g.setColor(0, 0); //header
      this.g.fillRect(160, 0, 239, 35);
      this.g.setColor(1, 11);
      this.g.setFont("Vector", 26);
      this.g.drawString(scan.mac.length + "/" + scan.mac.length, 242 - (this.g.stringWidth(scan.mac.length + "/" + scan.mac.length)), 3);
      this.g.flip();
      this.g.setColor(0, 1);
      this.g.fillRect(0, 36, 239, 239);
      this.g.flip();
      this.g.setFont("Vector", 28);
      for (var entry = this.line; entry < this.line + 4 && entry < scan.mac.length; entry++) {
        this.g.setColor(0, (this.go == entry) ? 4 : (entry % 2) ? 1 : 2);
        this.g.fillRect(0, (this.top - 14) + ((entry - this.line) * this.top), 239, (this.top + 36) + ((entry - this.line) * this.top));
        this.g.setColor(1, (this.go == entry) ? 14 : 15);
        if (scan.mac[entry].split("|")[1] !== "undefined") {
          dr = E.toString(scan.mac[entry].split("|")[1].replace(/\0/g, ''));
        }
        else dr = scan.mac[entry].substring(0, 17);
        this.g.drawString(dr, 1, this.top + ((entry - this.line) * this.top));
        this.g.flip();
      }
      this.g.flip();
    }
    else if (this.start !== 2) {
      this.start = 3;
      this.g.setColor(0, 1); //header
      this.g.fillRect(0, 36, 239, 239);
      this.g.setColor(1, 11);
      this.g.setFont("Vector", 25);
      this.g.drawString("NOT FOUND", 120 - (this.g.stringWidth("NOT FOUND") / 2), 80);
      this.g.setFont("Vector", 20);
      this.g.drawString("TOUCH TO RESCAN", 120 - (this.g.stringWidth("TOUCH TO RESCAN") / 2), 150);
      this.done = 0;
      this.g.flip();
    }
    this.tid = setTimeout(function(t) {
      t.tid = -1;
      t.show(o);
    }, 500, this);
  },
  tid: -1,
  run: false,
  clear: function() {
    this.run = false;
    if (this.tid >= 0) clearTimeout(this.tid);
    if (this.loop >= 0) clearInterval(this.loop);
    if (!ew.is.gIsB && face.appCurr != "w_scan") delete global.scan;
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
    //face.go(face.appRoot[0],face.appRoot[1]);
    face.go("clock", 0);
    return true;
  },
  clear: function() {
    return true;
  }
};
//
touchHandler[0] = function(e, x, y) {
  this.timeout();
  if (e == 5 || e == 12) {
    if (!face[0].start || face[0].start == 1) { buzzer.nav(40); return; }
    if (face[0].start == 3) { buzzer.nav([30, 50, 30]);
      face[0].find(face.pageArg); return; }
    if (36 < y && y <= 85) { this.mac = scan.mac[0].split("|")[0];
      this.name = (scan.mac[0].split("|")[1] != "undefined") ? scan.mac[0].split("|")[1] : 0; }
    else if (85 < y && y <= 135) { this.mac = scan.mac[1].split("|")[0];
      this.name = (scan.mac[1].split("|")[1] != "undefined") ? scan.mac[1].split("|")[1] : 0; }
    else if (135 < y && y <= 185) { this.mac = scan.mac[2].split("|")[0];
      this.name = (scan.mac[2].split("|")[1] != "undefined") ? scan.mac[2].split("|")[1] : 0; }
    else if (185 < y) { this.mac = scan.mac[3].split("|")[0];
      this.name = (scan.mac[3].split("|")[1] != "undefined") ? scan.mac[3].split("|")[1] : 0; }
    if (this.mac != undefined) {
      buzzer.nav([30, 50, 30]);
      if (face.appRoot[0] != "repellent") {
        if (this.name) ew.do.fileWrite("dash", "slot" + require("Storage").readJSON("dash.json", 1).slot + "Name", this.name ? E.toString(this.name).replace(/\0/g, '') : "NA");
        //ew.do.fileWrite("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Mac",this.mac);
        euc.mac = this.mac;
        euc.tgl();
        return;
      }
      else {

        ew.do.fileWrite("setting", face.appRoot[0] + "Go", face[0].line + "");
      }
      face.go(face.appRoot[0], face.appRoot[1]);
      return;
    }
    else buzzer.nav(40);
  }
  else if (e == 1) {
    face.go(face.appPrev, face.pagePrev);
    return;
  }
  else if (e == 2) {
    if (y > 200 && x < 50) {
      if (w.gfx.bri.lv !== 7) { this.bri = w.gfx.bri.lv;
        w.gfx.bri.set(7); }
      else w.gfx.bri.set(this.bri);
      buzzer.nav([30, 50, 30]);
    }
    else buzzer.nav(40);
  }
  else if (e == 3) {
    buzzer.nav(40);
  }
  else if (e == 4) {
    face.go(face.appRoot[0], face.appRoot[1]);
    return;
  }
};
