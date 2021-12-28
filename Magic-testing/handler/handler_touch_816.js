set.def.touchtype="816";
set.def.rstR=0xA5; //the rock has auto sleep if 254 is 0.
var TC={
	ntid:0,
	act:{main:{},bar:{},titl:{}},
	start:function(){ 
    "ram";
		if (this.ntid) return;
		digitalPulse(set.def.rstP,1,[5,50]);
		setTimeout(()=>{
			i2c.writeTo(0x15,236,0); //MotionMask 7/4/1
			i2c.writeTo(0x15,0xF5,35); //lp scan threshold
			i2c.writeTo(0x15,0xF6,3); //lp scan range
			i2c.writeTo(0x15,0xF7,7); //lp scan freq
			i2c.writeTo(0x15,0xF8,50); //lp scan current
			i2c.writeTo(0x15,0xF9,2); //auto sleep timeout
			i2c.writeTo(0x15,0xFA,17); //gesture mode
			i2c.writeTo(0x15,254,0); //auto sleep on
		},150);
		this.init();
	},
	init:function(){
		this.ntid=setWatch(function(s){
			"ram";
			i2c.writeTo(0x15,0);
			var tp=i2c.readFrom(0x15,7);
			//print("in",tp);
			if (face.pageCurr>=0) {
				TC.emit("tc"+tp[1],tp[4],tp[6]);
				touchHandler[face.pageCurr](tp[1],tp[4],tp[6]);face.off();
			}else if (tp[1]==1) 
				face.go(face.appCurr,0);
		},ew.pin.touch.INT,{repeat:true, edge:"falling"}); 
	},
	stop:function(){
		"ram";
		return true;
		//"ram";
		////setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);
		//if (this.ntid&&set.def.rstR==229) {clearWatch(this.ntid);this.ntid=0;}
	}
};

/*TC.on('tc1',x=>{print(x);});
TC.on('tc2',x=>{print(x);});
TC.on('tc3',x=>{print(x);});
TC.on('tc4',x=>{print(x);});
TC.on('tc5',x=>{print(x);});
TC.on('tc12',x=>{print(x);});
*/