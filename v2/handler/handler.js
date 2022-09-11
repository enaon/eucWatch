//handler
E.setFlags({ pretokenise: 1 });
if (process.env.BOARD != "P8" && process.env.BOARD != "P22" && process.env.BOARD != "PINETME") {
    if (require('Storage').read("f_Font8x12")) require("f_Font8x12").add(Graphics);
    if (require('Storage').read("f_Font7x11Numeric7Seg")) require("f_Font7x11Numeric7Seg").add(Graphics);
    if (require('Storage').read("f_FontDylex7x13")) require("f_FontDylex7x13").add(Graphics);
    if (require('Storage').read("f_FontCopasetic40x58Numeric")) require("f_FontCopasetic40x58Numeric").add(Graphics);
    if (require('Storage').read("f_FontTeletext10x18Ascii")) require("f_FontTeletext10x18Ascii").add(Graphics);
}
if (require('Storage').read("UI")) eval(require('Storage').read('UI'));
if (require('Storage').read("handler_buzz")) eval(require('Storage').read("handler_buzz"));
if (require('Storage').read("handler_notify")) eval(require('Storage').read("handler_notify"));
if (require('Storage').read("handler_set")) eval(require('Storage').read("handler_set"));
if (require('Storage').read("handler_conn")) eval(require('Storage').read("handler_conn"));
if (require('Storage').read("handler_face")) eval(require('Storage').read("handler_face"));
if (require('Storage').read("handler_charge")) eval(require('Storage').read("handler_charge"));
//touch controller
var touchHandler = {
    go: function(e, x, y) {
        touchHandler[face.pageCurr](e, x, y);
    },
    timeout: x => { setTimeout(() => { face.off(); }, 0); }
};
if (require('Storage').read("handler_btn")) eval(require('Storage').read("handler_btn"));
//var i2c=I2C1;f
var i2c = new I2C();
i2c.setup({ scl: ew.pin.i2c.SCL, sda: ew.pin.i2c.SDA, bitrate: 100000 });
//i2c.setup({scl:D7, sda:D6, bitrate:100000});

//find touch
//if (process.env.BOARD == "P8" || process.env.BOARD == "P22") {
if (require('Storage').read('tpms')){

    if (ew.def.touchtype != "716" && ew.def.touchtype != "816" && ew.def.touchtype != "816s") eval(require('Storage').read("handler_touch"));
    else if (ew.def.touchtype == "816") eval(require('Storage').read("handler_touch_816"));
    else if (ew.def.touchtype == "816s") eval(require('Storage').read("handler_touch_816s"));
    else if (ew.def.touchtype == "716") eval(require('Storage').read("handler_touch_716"));
}
else {
    eval(require('Storage').read('handler_touch'));
}


if (process.env.BOARD == "P8" || process.env.BOARD == "P22") {
    if (ew.def.acctype != "SC7A20" && ew.def.acctype != "BMA421") {
        i2c.writeTo(0x18, 0x0F);
        ew.def.acctype = (i2c.readFrom(0x18, 1) == 17) ? "SC7A20" : "BMA421";
    }
    else if (ew.def.acctype === "BMA421") eval(require('Storage').read("handler_acc_BMA421"));
    else if (ew.def.acctype === "SC7A20") eval(require('Storage').read("handler_acc_SC7A20"));
}
else {
    if (process.env.BOARD != "BANGLEJS2") eval(require('Storage').read('handler_acc_SC7A20'));
    else acc = { on: function() {}, off: function() {} };

}
//tasks
if (require('Storage').read("handler_cron")) eval(require('Storage').read("handler_cron"));
//theme
//if (require('Storage').read("handlerTheme")) eval(require('Storage').read("handlerTheme"));
