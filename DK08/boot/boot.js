//watchdog
E.kickWatchdog();
function kickWd(){
  if(!BTN1.read())E.kickWatchdog();
}
var wdint=setInterval(kickWd,1000);
E.enableWatchdog(10, false);
global.save = function() { throw new Error("You don't need to use save() on DK08!"); };
//errata 108 fix // poke32(0x40000EE4,0x4f)
//load in devmode
if (BTN1.read() || Boolean(require("Storage").read("devmode"))) { 
  let mode=(require("Storage").read("devmode"));
  if ( mode=="off"){ 
    require("Storage").write("devmode","done");
    NRF.setAdvertising({},{connectable:false});
    NRF.disconnect();
    NRF.sleep();
    digitalPulse(D6,1,250);
  } else {
    require("Storage").write("devmode","done");
    NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
    digitalPulse(D6,1,100);
	print("Welcome!\n*** DevMode ***\nShort press the button\nto restart in WorkingMode");
  }
  setWatch(function(){
    require("Storage").erase("devmode");
    NRF.setServices({},{uart:false});
    NRF.setServices({},{uart:true}); 
    NRF.disconnect();
    setTimeout(() => {
	 reset();
    }, 500);
  },BTN1,{repeat:false, edge:"rising"}); 
}else{ //load in working mode
	if (!Boolean(require('Storage').read('setting.json'))) require('Storage').write('setting.json',{"watchtype":"DK08"});
	if (Boolean(require('Storage').read('lcd'))) eval(require('Storage').read('lcd'));
	if (Boolean(require('Storage').read('init'))) eval(require('Storage').read('init'));
	if (Boolean(require('Storage').read('handler'))) eval(require('Storage').read('handler'));	
	print("Welcome!\n*** WorkingMode ***\nLong hold the button\nto restart in DevMode");
    digitalPulse(D6,1,[100,50,100]);
}
  