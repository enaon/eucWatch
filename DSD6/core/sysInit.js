//watchdog
E.kickWatchdog();
function kickWd(){
  if(!BTN.read())E.kickWatchdog();
}
var wdint=setInterval(kickWd,1000);
E.enableWatchdog(3, false);
pin=function(o){
	if (o=="chargeVoltage") return D02; 
	if (o=="battVoltage") return D03; 
	if (o=="oledReset") return D04; 
	if (o=="oledSpi") return D05; 
	if (o=="oledMosi") return D06; 
	if (o=="hrScl") return D07; 
	if (o=="hrSda") return D08; 
	if (o=="nfc1") return D09; 
	if (o=="nfc2") return D10; 
	if (o=="kx023Scl") return D13; 
	if (o=="kx023Sda") return D14; 
	if (o=="nrfReset") return D21; 
	if (o=="serialRx") return D22;  //USB connector, configured in Desay DFU bootlader as serial TX, Espruino/Micropython RX by mistake see photo
	if (o=="serialTx") return D23;  //USB connector, configured in Desay DFU bootlader as serial RX - Espruino/Micropython TX by mistake
	if (o=="motor") return D25; 
	if (o=="hrEnable") return D26; 
	if (o=="oledDc") return D28; 
	if (o=="oledCs") return D29; 
	if (o=="btn") return D30; 
};
global.save = function() { throw new Error("You don't need to use save() on DSD6!"); };
global.w={};
//errata 108 fix // poke32(0x40000EE4,0x4f)
buzzer = digitalPulse.bind(null,D25,1);
if (require('Storage').read('sysOled')) eval(require('Storage').read('sysOled')); 
if (require('Storage').read('sysSerial')) {eval(require('Storage').read('sysSerial')); startSerial();}

//load in devmode
if (BTN1.read() || require("Storage").read("devmode")) { 
	let mode=(require("Storage").read("devmode"));
	if ( mode=="off"){ 
		require("Storage").write("devmode","done");
		NRF.setAdvertising({},{connectable:false});
		NRF.disconnect();
		NRF.sleep();
		buzzer(250);
	} else {
		require("Storage").write("devmode","done");
		NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
		buzzer(100);
		print("Welcome!\n*** DevMode ***\nShort press the button\nto restart in WorkingMode");
		if (global.o) {
			setTimeout(()=>{
				o.gfx.setFont8x16();
				o.gfx.clear();
				o.gfx.drawString("DEV mode",20,12);
				o.flip();
			},200);
		}
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
	if (require('Storage').read('sysW')) eval(require('Storage').read('sysW')); 
	if (require('Storage').read('sysAcc')) eval(require('Storage').read('sysAcc')); 
	if (require('Storage').read('handler')) eval(require('Storage').read('handler')); //call handler
	if (require('Storage').read('euc')) eval(require('Storage').read('euc')); //call euc
	if (require('Storage').read('eucLight')) eval(require('Storage').read('eucLight')); //call euc

	print("Welcome!\n*** WorkingMode ***\nLong hold the button\nto restart in DevMode");
    buzzer([100,50,100]);
	if (global.o) o.off();
}
  
