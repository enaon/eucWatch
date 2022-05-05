//code from fanoush
// D3 pin is battery voltage
// D2 pin is analog charger voltage
// with known 5V input  5.0/analogRead(D2) gave me 6.61207596594
// feel free to recalibrate yourself
w={	
	tOff:0, // offset to remember total runtime when changing clock ("2019-08-26T14:48:00",2)
	setClock:function(t, z) {
		var c=getTime();
		if(z!==void(0))E.setTimeZone(z);
		setTime(Date.parse(t)/1E3);
		this.tOff+=getTime()-c;
	},
	battVoltage:function(){
		  var v=6.61207596594*analogRead(D3);
		  poke32(0x5000070c,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	},
	chargerVoltage:function(){
		  var v=6.61207596594*analogRead(D2);
		  poke32(0x50000708,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	},
	isCharging:function(){
		  var v=digitalRead(D2);
		  poke32(0x50000708,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	},
	getUptime : function() {
		return getTime()-this.tOff;
	}
};
	
/*
function vibon(vib){
 if(vib.i>=1)D25.set();else analogWrite(D25,vib.i);
 setTimeout(viboff,vib.on,vib);
}
function viboff(vib){
 D25.reset();
 if (vib.c>1){vib.c=vib.c-1;setTimeout(vibon,vib.off,vib);}
}
exports.vibrate=function(intensity,count,onms,offms){
 vibon({i:intensity,c:count,on:onms,off:offms});
};

?*