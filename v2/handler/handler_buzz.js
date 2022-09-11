E.setFlags({pretokenise:1});

//buzzzer
buzzer={buzz:{ok:[20,40,20],na:25,ln:80,on:40,off:[20,25,20]}};
//buz={ok:[20,40,20],na:25,ln:80,on:40,off:[20,25,20]};
buzzer.sys = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
buzzer.alrm = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
buzzer.euc = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
if (ew.def.buzz) buzzer.nav = digitalPulse.bind(null,ew.pin.BUZZ,ew.pin.BUZ0);
else buzzer.nav=function(){return true;};


