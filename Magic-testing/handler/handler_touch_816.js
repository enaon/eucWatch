digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,0xFA,0x11);},150);

watchTouch=setWatch(function(s){
	i2c.writeTo(0x15,0);
	var tp=i2c.readFrom(0x15,7);
	//print("in",tp);
	if (face.pageCurr>=0) {
		touchHandler[face.pageCurr](tp[1],tp[4],tp[6]);}
	else if (tp[1]==1) {
		face.go(face.appCurr,0);
	}
},ew.pin.touch.INT,{repeat:true, edge:"falling"}); 