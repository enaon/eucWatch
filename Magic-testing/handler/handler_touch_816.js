var TC={
	ntid:0,
	act:{"5":"T","12":"H","1":"Dn","2":"Up","3":"L","4":"R"},
	start:function(){ 
		digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,0xFA,0x11);},150);
		if (this.ntid&&set.def.rstR==165) return;
		this.ntid=setWatch(function(s){
			i2c.writeTo(0x15,0);
			var tp=i2c.readFrom(0x15,7);
			//print("in",tp);
			if (face.pageCurr>=0) {
				TC.emit("tc"+TC.act[tp[1]],tp[4],tp[6]);
				touchHandler[face.pageCurr](tp[1],tp[4],tp[6]);face.off();
			}else if (tp[1]==1) 
				face.go(face.appCurr,0);
		},ew.pin.touch.INT,{repeat:true, edge:"falling"}); 
	},
	stop:function(){
		"ram";
		setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);
		if (this.ntid&&set.def.rstR==229) {clearWatch(this.ntid);this.ntid=0;}
	}
};

TC.on('tcT',x=>{print(x);});
TC.on('tcH',x=>{print(x);});
TC.on('tcUp',x=>{print(x);});
TC.on('tcDn',x=>{print(x);});
TC.on('tcL',x=>{print(x);});
TC.on('tcR',x=>{print(x);});
