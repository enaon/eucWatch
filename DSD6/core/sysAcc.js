var i2c=new I2C();
//var i2c=I2C1;
w.accRead=function(reg,len){i2c.writeTo(0x1f,reg);return i2c.readFrom(0x1f,len);};
w.accWrite=function(reg,data){i2c.writeTo(0x1f,reg,data);};
w.initAccel=function(){
	i2c.setup({scl:13, sda:14, bitrate:100000});
};
w.accRegDump=function(reg){
	val=w.accRead(reg,1)[0];return val.toString(10)+" 0x"+val.toString(16)+" %"+val.toString(2);
};
w.accINSDump=function(){
	console.log("tscp:",w.accRegDump(0x10),"INS1:",w.accRegDump(0x12),"INS2:",w.accRegDump(0x13),"INS3:",w.accRegDump(0x14));
};
w.accelCoords=function(){
	coords=new Int16Array(w.accRead(0x06,6).buffer);
	return {x:coords[0],y:coords[1],z:coords[2]};
};

