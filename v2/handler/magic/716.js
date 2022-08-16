var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});
   
// touch driver for CST716
const TOUCH_PIN = D32;
const RESET_PIN = D39;

pinMode(TOUCH_PIN,'input');

global.TC = {
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
    _wid:undefined, fx:-1, fy:-1, down:false,
    writeByte:(a,d) => { 
        i2c.writeTo(0x15,a,d);
    }, 
    readBytes:(a,n) => {
        i2c.writeTo(0x15, a);
        return i2c.readFrom(0x15,n); 
    },
    getXY:()=>{
        var _data = TC.readBytes(0x00,8);
        return { x:((_data[3]&0x0F)<<8)|_data[4],
                 y:((_data[5]&0x0F)<<8)|_data[6],
                 gest:_data[1],
                 b: _data[2]
               };
    },
    enable:()=>{TC.writeByte(0xed, 0xC8);},  // ?? 716 does not set gesture mode
    sleepMode:()=>{TC.writeByte(0xA5,0x03);},
    touchevent:() => {
        var p = TC.getXY();
        if (p.b && !TC.down) {
            TC.fx = p.x; TC.fy = p.y; TC.down = true;
            //wOS.time_left = wOS.ON_TIME; //reset LCD on time.
        }
        if (!p.b && TC.down) {
            var ax = Math.abs(p.x-TC.fx); 
            var ay = Math.abs(p.y-TC.fy);
            TC.down=false;
            if (ax<10 && ay<10) {TC.emit("touch",p);return;}
            if (ay>ax) p.gest = p.y>TC.fy ? TC.DOWN : TC.UP;
            else p.gest = p.x>TC.fx ? TC.RIGHT : TC.LEFT;
            TC.emit("swipe",p); 
        }
    },
    start:()=>{
        digitalPulse(RESET_PIN,0,5);
        var t = getTime()+50/1000; while(getTime()<t); // delay 50 ms
        TC.enable();
        if (TC._wid) clearWatch(TC._wid);
        TC._wid = setWatch(TC.touchevent,TOUCH_PIN,{repeat:true,edge:"falling"});
    },
    stop:()=>{
        if (TC._wid) {
            TC._wid = clearWatch(TC._wid);
            TC._wid = undefined;
        }
        TC.sleepMode();
    }
};


TC.on("touch", (p)=>{
    console.log("touch x: "+p.x+" y:"+p.y);
	//touchHandler[face.pageCurr](5,p.x,p.y);
	return setTimeout(function() {touchHandler[face.pageCurr](5,p.x,p.y);},0);
});
TC.on("swipe", (p)=>{
    console.log("swipe d: "+p);
	return setTimeout(function() {touchHandler[face.pageCurr](p.gest,p.x,p.y);},0);
	//touchHandler[face.pageCurr](p.gest,p.x,p.y);
});
TC.on("longtouch", (p)=>{
    console.log("long touch");
	//touchHandler[face.pageCurr](12,p.x,p.y);
	return setTimeout(function() {touchHandler[face.pageCurr](12,p.x,p.y);},0);

});

// touch driver for CST716
/*
const TOUCH_PIN = D32;
const RESET_PIN = D39;

pinMode(TOUCH_PIN,'input');
global.tfk = {
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
    _wid:undefined, fx:-1, fy:-1, down:false,
    writeByte:(a,d) => {
		"ram";		
        i2c.writeTo(0x15,a,d);
    }, 
    readBytes:(a,n) => {
		"ram";
        i2c.writeTo(0x15, a);
        return i2c.readFrom(0x15,n); 
    },
    getXY:()=>{
		"ram";
        var _data = tfk.readBytes(0x00,8);
        return { x:((_data[3]&0x0F)<<8)|_data[4],
                 y:((_data[5]&0x0F)<<8)|_data[6],
                 gest:_data[1],
                 b: _data[2]
               };
    },
    enable:()=>{"ram";tfk.writeByte(0xed, 0xC8);},  // ?? 716 does not set gesture mode
    sleepMode:()=>{"ram";tfk.writeByte(0xA5,0x03);},
    touchevent:() => {
		"ram";
        var p = tfk.getXY();
        if (p.b && !tfk.down) {
            tfk.fx = p.x; tfk.fy = p.y; tfk.down = true;
            //wOS.time_left = wOS.ON_TIME; //reset LCD on time.
        }
        if (!p.b && tfk.down) {
            var ax = Math.abs(p.x-tfk.fx); 
            var ay = Math.abs(p.y-tfk.fy);
            tfk.down=false;
            if (ax<10 && ay<10) {tfk.emit("touch",p);return;}
            if (ay>ax) p.gest = p.y>tfk.fy ? tfk.DOWN : tfk.UP;
            else p.gest = p.x>tfk.fx ? tfk.RIGHT : tfk.LEFT;
            tfk.emit("swipe",p); 
        }
    },
    start:()=>{
		"ram";
        digitalPulse(RESET_PIN,0,5);
        var t = getTime()+50/1000; while(getTime()<t); // delay 50 ms
        tfk.enable();
        if (tfk._wid) clearWatfkh(tfk._wid);
        tfk._wid = setWatch(tfk.touchevent,TOUCH_PIN,{repeat:true,edge:"falling"});
    },
    exit:()=>{
		"ram";
        if (tfk._wid) {
            tfk._wid = clearWatch(tfk._wid);
            tfk._wid = undefined;
        }
        tfk.sleepMode();
    }
};

tfk.on("touch", (p)=>{
    //console.log("touch x: "+p.x+" y:"+p.y);
	touchHandler[face.pageCurr](5,p.x,p.y);
	//return setTimeout(function() {touchHandler[face.pageCurr](5,p.x,p.y);},0);
});
tfk.on("swipe", (p)=>{
    //console.log("swipe d: "+p);
	//return setTimeout(function() {touchHandler[face.pageCurr](p.gest,p.x,p.y);},0);
	touchHandler[face.pageCurr](p.gest,p.x,p.y);
});
tfk.on("longtouch", (p)=>{
    //console.log("long touch");
	touchHandler[face.pageCurr](12,p.x,p.y);
	//return setTimeout(function() {touchHandler[face.pageCurr](12,p.x,p.y);},0);

});

*/
