
Modules.addCached("DSD6",function(){
	// D3 pin is battery voltage
	// D2 pin is analog charger voltage
	// with known 5V input  5.0/analogRead(D2) gave me 6.61207596594
	// feel free to recalibrate yourself
	exports.battVoltage=function(){
		  var v=6.61207596594*analogRead(D3);
		  poke32(0x5000070c,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	};
	exports.chargerVoltage=function(){
		  var v=6.61207596594*analogRead(D2);
		  poke32(0x50000708,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	};
	exports.chargerState=function(){
		  var v=digitalRead(D2);
		  poke32(0x50000708,2); // disconnect pin for power saving, otherwise it draws 70uA more
		  return v;
	};
	var tOff=0; // offset to remember total runtime when changing clock
	//("2019-08-26T14:48:00",2)
	exports.setClock = function(t, z) {
		var c=getTime();
		if(z!==void(0))E.setTimeZone(z);
		setTime(Date.parse(t)/1E3);
		tOff+=getTime()-c;
	};
	exports.getUptime = function() {
		return getTime()-tOff;
	};


	exports.accRead=accRead;
	exports.accWrite=accWrite;
	exports.accRegDump=accRegDump;
)};

var o=require("DSD6");