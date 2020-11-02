// touch driver

I2C1.setup({scl:D7,sda:D6,bitrate:200000});

const TOUCH_PIN = D28;
const RESET_PIN = D13;

pinMode(TOUCH_PIN,'input');

var TC = {
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
    _wid:undefined,
    writeByte:(a,d) => { 
        I2C1.writeTo(0x15,a,d);
    }, 
    readBytes:(a,n) => {
        I2C1.writeTo(0x15, a);
        return I2C1.readFrom(0x15,n); 
    },
    getXY:()=>{
        var _data = TC.readBytes(0x00,8);
        return { x:((_data[3]&0x0F)<<8)|_data[4],
                 y:((_data[5]&0x0F)<<8)|_data[6],
                 gest:_data[1]
               };
    },
    enable:()=>{TC.writeByte(0xED, 0xC8);},
    sleepMode:()=>{TC.writeByte(0xA5,0x03);},
    touchevent:() => {
        var p = TC.getXY();
        if (p.gest==TC.CLICK) TC.emit("touch",p);
        else if (p.gest>=1 && p.gest<=4) TC.emit("swipe",p.gest); 
        else if (p.gest==TC.LONG) TC.emit("longtouch",p); 
    },
    start:()=>{
        digitalPulse(RESET_PIN,0,5);
        setTimeout(()=>{
            TC.enable();
            if (TC._wid) clearWatch(TC._wid);
            TC._wid = setWatch(TC.touchevent,TOUCH_PIN,{repeat:true,edge:"falling"});
        },100);
    },
    stop:()=>{
        if (TC._wid) {
            TC._wid = clearWatch(TC._wid);
            TC._wid = undefined;
        }
        TC.sleepMode();
    }
};

/*
TC.on("touch", (p)=>{
    console.log("touch x: "+p.x+" y:"+p.y);
});

TC.on("swipe", (d)=>{
    console.log("swipe d: "+d);
});

TC.on("longtouch", (p)=>{
    console.log("long touch");
});
*/


