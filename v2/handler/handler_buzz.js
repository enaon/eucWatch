E.setFlags({pretokenise:1});



//buzzer
if (ew.def.buzz) buzzer = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
else buzzer.nav=function(){return true;};