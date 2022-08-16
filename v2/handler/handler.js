//handler
//require('Font7x11Numeric7Seg').add(Graphics);
//
if (require('Storage').read("UI")) eval(require('Storage').read('UI'));
if (require('Storage').read("handlerNotify")) eval(require('Storage').read('handler_notify'));
if (require('Storage').read("handler_set")) eval(require('Storage').read('handler_set'));

if (require('Storage').read("handler_conn")) eval(require('Storage').read('handler_conn'));

if (require('Storage').read("handler_face")) eval(require('Storage').read('handler_face'));

if (require('Storage').read("handler_charge")) eval(require('Storage').read('handler_charge'));

var touchHandler = {
	timeout:x=>{setTimeout(()=>{face.off();},0);}
};
touchHandler= {
	timeout:x=>{setTimeout(()=>{face.off();},0);},
	go:function(e,x,y){
		touchHandler[face.pageCurr](e,x,y);
	}
};
//button
if (require('Storage').read("handler_button"))  eval(require('Storage').read('handler_button'));

var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});

var i2c=new I2C();
i2c.setup({scl:D7, sda:D6, bitrate:100000});

eval(require('Storage').read('handler_touch'));

//find touch
if ( set.def.touchtype != "716" && set.def.touchtype != "816" && set.def.touchtype != "816s" )  eval(require('Storage').read("handlerTouch"));
else if (set.def.touchtype=="816") eval(require('Storage').read("handlerTouch816"));
else if (set.def.touchtype=="816s") eval(require('Storage').read("handlerTouch816s"));
else if (set.def.touchtype=="716") eval(require('Storage').read("handlerTouch716"));
//find acc
if (set.def.acctype!="SC7A20"&&set.def.acctype!="BMA421") {
 i2c.writeTo(0x18,0x0F);
	set.def.acctype=( i2c.readFrom(0x18,1)==17)?"SC7A20":"BMA421";
}
else if (set.def.acctype==="BMA421") eval(require('Storage').read("handlerAccBMA421"));
else if (set.def.acctype==="SC7A20") eval(require('Storage').read("handlerAccSC7A20"));

if ( process.env.BOARD!="BANGLEJS2") eval(require('Storage').read('handler_accel_SC7A20'));
else acc={on:function(){},off:function(){} };

//tasks
if (require('Storage').read("handler_tasks")) eval(require('Storage').read('handler_tasks'));
//theme
//if (require('Storage').read("handler_theme")) eval(require('Storage').read("handler_theme"));
//more
if (set.def.size) UI.size.txt=set.def.size;


