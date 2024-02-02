E.setFlags({ pretokenise: 1 });
//eucWatch v2
//watchdog
//0x20000000+0x10000-process.memory().stackEndAddress
global.save = function() { throw new Error("You don't need to use save() on eucWatch!"); };
global.ew = { "dbg": 0, "log": [], "def": {}, "is": {}, "do": { "reset": {}, "update": {} }, "tid": {}, "temp": {}, "pin": {} };

if (process.env.BOARD == "MAGIC3" || process.env.BOARD == "Magic3" || process.env.BOARD == "ROCK") {
  ew.pin =  { BAT: D30, CHRG: D8, BUZZ: D6, BUZ0: 0, BL: D12, i2c: { SCL: 14, SDA: 15 }, touch: { RST: D39, INT: D32 }, disp: { CS: D3, DC: D47, RST: D2, BL: D12 }, acc: { INT: D16 } } ;
  E.showMessage = print; //apploader suport
  D7.write(1); // turns off sp02 red led
}
else if (process.env.BOARD == "BANGLEJS2") {
       ew.pin = { BAT: D3, CHRG: D23, BUZZ: D19, BUZ0: 1, BL: D8, i2c: { SCL: D34, SDA: D33 }, touch: { RST: D35, INT: D36 }, disp: { CS: D5, DC: D6, RST: D7, BL: D8 }, acc: { INT: D39 } };
        Bangle.setOptions({ wakeOnTouch: 0, lockTimeout: 0, backlightTimeout: 0, wakeOnBTN1: 1, wakeOnTwist: 1, });
      //E.showMessage = print; //apploader suport
}

else if (process.env.BOARD == "DSD6") {
  ew.pin = { BAT: D03, CHRG: D02, BUZZ: D25, BUZ0: 1, BL: D12, i2c: { SCL: D7, SDA: D6 }, touch: { RST: D13, INT: D28 }, disp: { SPI:D5, MOSI: D6 ,CS: D29, DC: D28, RST: D04, BL: D14 }, acc: { INT: D8 } , serial: {rx: D22, tx:D23 } } ;
  E.showMessage = print; //apploader suport
}

else if (process.env.BOARD == "PINETIME") {
  ew.pin = { BAT: D31, CHRG: D19, BUZZ: D16, BUZ0: 1, BL: D12, i2c: { SCL: D7, SDA: D6 }, touch: { RST: D10, INT: D28 }, disp: { CS: D25, DC: D18, RST: D26, BL: D14 }, acc: { INT: D8 } } ;
  E.showMessage = print; //apploader suport
  D15.write(1); //enables BTN1
}
else {
  ew.pin = { BAT: D31, CHRG: D19, BUZZ: D16, BUZ0: 1, BL: D12, i2c: { SCL: D7, SDA: D6 }, touch: { RST: D13, INT: D28 }, disp: { CS: D25, DC: D18, RST: D26, BL: D14 }, acc: { INT: D8 } } ;
  E.showMessage = print; //apploader suport
}

E.kickWatchdog();
  KickWd = function() {
    "ram";
    if ((typeof(BTN1) == 'undefined') || (!BTN1.read())) E.kickWatchdog();
  };
var wdint = setInterval(KickWd, process.env.BOARD == "DSD6"?1000:3000);
E.enableWatchdog(process.env.BOARD == "DSD6"?2:30, false);

//devmode
if ((BTN1.read() || require("Storage").read("devmode")) && process.env.BOARD != "BANGLEJS2") {
//if ((BTN1.read() || require("Storage").read("devmode")) && process.env.BOARD != "BANGLEJS2") {
  let mode = (require("Storage").read("devmode"));
  if (mode == "loader") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 80);
  }
  else if (mode == "shutdown") {
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 300);
    NRF.sleep();
  }
  else {
    require("Storage").write("devmode", "done");
    NRF.setAdvertising({}, { name: "Espruino-devmode", connectable: true });
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
    print("Welcome!\n*** DevMode ***\nShort press the side button\nto restart in WorkingMode");
  }

  setWatch(function() {
    "ram";
    require("Storage").erase("devmode");
    require("Storage").erase("devmode.info");
    NRF.setServices({}, { uart: false });
    NRF.setServices({}, { uart: true });
    NRF.disconnect();
    setTimeout(() => {
      reset();
    }, 500);
  }, BTN1, { repeat: false, edge: "rising" });

}
else { //working mode
  var w;
  global.scr = require('Storage').readJSON('scrorient.json', 1);
  if (typeof scr === 'undefined') {
    scr = { "rotate": 0, "mirror": false };
    require('Storage').writeJSON('scrorient.json', scr);
  }
  if (require('Storage').read('.display')) {
    if (require('Storage').read('.displayM')&&(process.env.BOARD == "MAGIC3"||process.env.BOARD == "ROCK"))
      eval(require('Storage').read('.displayM'));
    else eval(require('Storage').read('.display'));
    if (!w) w = require("eucWatch");
  }
  if (require('Storage').read('handler')) eval(require('Storage').read('handler'));
  if (require('Storage').read('clock')) eval(require('Storage').read('clock'));
  if (require('Storage').read('euc')) eval(require('Storage').read('euc'));
  //
  digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, [100, 30, 100]);
  setTimeout(function() {
    if (global.face) face.go('clock', 0);
    setTimeout(function() { if (global.ew && ew.do) ew.do.update.acc(); }, 1000);
    digitalPulse(ew.pin.BUZZ, ew.pin.BUZ0, 100);
  }, 200);
}
