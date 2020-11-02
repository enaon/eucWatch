// its a SC7A20 

var ACCEL = {
    faceuptime:0,
    faceup:false,
    writeByte:(a,d) => { 
        I2C1.writeTo(0x18,a,d);
    }, 
    readBytes:(a,n) => {
        I2C1.writeTo(0x18, a);
        return I2C1.readFrom(0x18,n); 
    },
    init:() => {
        var id = ACCEL.readBytes(0x0F,1)[0];
        ACCEL.writeByte(0x20,0x67);
        ACCEL.writeByte(0x23,0x88);
        return id;
    },
    read:()=>{
        var a = ACCEL.readBytes(0xA8,6);
        return a;
        //return {ax:a[0]<<8+a[1], ay:a[2]<<8+a[3], az:a[4]<<8+a[5]};
    },
    read2:()=> {
        return ACCEL.readBytes(0x01,1)[0];
    },
    check:()=>{
      if (ACCEL.read2()>192) {
        if (ACCEL.faceup) {
          if (Date.now()-ACCEL.faceuptime>1000) {
             ACCEL.emit("faceup");
             ACCEL.faceup=false;
             return;
          }
        } else {
          ACCEL.faceup =true;
          ACCEL.faceuptime = Date.now();
        }
      } else ACCEL.faceup=false;
    }
};




  
