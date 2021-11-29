//handler - enaon 2021
//notify
eval(require('Storage').read('handler_notify'));
//set
eval(require('Storage').read('handler_set'));
//
E.setTimeZone(set.def.timezone);
//conn
eval(require('Storage').read('handler_conn'));
//face
eval(require('Storage').read('handler_face'));
//charge 
eval(require('Storage').read('handler_charge'));
//touch controller
touchHandler= {
	timeout:x=>{setTimeout(()=>{face.off();},0);},
	go:function(e,x,y){
		touchHandler[face.pageCurr](e,x,y);
	},
};

//var i2c=I2C1;
var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});
if (set.def.touchtype=="816"){ //816
	eval(require('Storage').read('handler_touch_816'));
}else{
	eval(require('Storage').read('handler_touch_716'));
}
