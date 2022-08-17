//handler
if (require('Storage').read("handlerNotify")) eval(require('Storage').read("handlerNotify"));
if (require('Storage').read("handlerSet")) eval(require('Storage').read("handlerSet"));
if (require('Storage').read("handlerConn")) eval(require('Storage').read("handlerConn"));
if (require('Storage').read("handlerFace")) eval(require('Storage').read("handlerFace"));
if (require('Storage').read("handlerCharge")) eval(require('Storage').read("handlerCharge"));
if (require('Storage').read("handlerBtn")) eval(require('Storage').read("handlerBtn"));
//touch controller
var touchHandler = {
	timeout:x=>{setTimeout(()=>{face.off();},0);}
};
//var i2c=I2C1;
var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});
//i2c.setup({scl:D7, sda:D6, bitrate:100000});
//find touch
if ( ew.def.touchtype != "716" && ew.def.touchtype != "816" && ew.def.touchtype != "816s" )  eval(require('Storage').read("handlerTouch"));
else if (ew.def.touchtype=="816") eval(require('Storage').read("handlerTouch816"));
else if (ew.def.touchtype=="816s") eval(require('Storage').read("handlerTouch816s"));
else if (ew.def.touchtype=="716") eval(require('Storage').read("handlerTouch716"));
//find acc
if (ew.def.acctype!="SC7A20"&&ew.def.acctype!="BMA421") {
 i2c.writeTo(0x18,0x0F);
	ew.def.acctype=( i2c.readFrom(0x18,1)==17)?"SC7A20":"BMA421";
}
else if (ew.def.acctype==="BMA421") eval(require('Storage').read("handlerAccBMA421"));
else if (ew.def.acctype==="SC7A20") eval(require('Storage').read("handlerAccSC7A20"));
//tasks
if (require('Storage').read("handlerCron")) eval(require('Storage').read("handlerCron"));
//theme
//if (require('Storage').read("handlerTheme")) eval(require('Storage').read("handlerTheme"));



