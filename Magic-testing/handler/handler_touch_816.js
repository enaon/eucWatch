digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0xFA,0X11);},150);
tpnst=1;
tpnen=0;

et.def.touchtype="816";
watchTouch=setWatch(function(s){
	i2c.writeTo(0x15,0);
	var tp=i2c.readFrom(0x15,7);
	//print("in",tp);
	
	if (tpnst && !tp[1]&&tp[3]==0){
		tpnst=0;tpnen=1;
		//print("in st");
	}else if (tpnen && (tp[1] || (!tp[1]&&  tp[3]==64) )) {
			if (tp[3]==64) tp[1]=5;
			//print("in en");
			tpnst=1;tpnen=0;
		if (face.pageCurr>=0) {
			touchHandler[face.pageCurr](tp[1],tp[4]+20,tp[6]);}
		else if (tp[1]==1) {
			face.go(face.appCurr,0);
		}
	}else return;	
	//print("touch816 end");

},ew.pin.touch.INT,{repeat:true, edge:"rising"}); 