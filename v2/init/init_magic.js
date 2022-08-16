//eucWatch v2
//watchdog
//0x20000000+0x10000-process.memory().stackEndAddress
global.save = function() { throw new Error("You don't need to use save() on eucWatch!"); };
if ( process.env.BOARD!="BANGLEJS2"){
	E.kickWatchdog();
	KickWd=function(){
		"ram";
	  if( (typeof(BTN1)=='undefined')||(!BTN1.read()) ) E.kickWatchdog();
	};
	var wdint=setInterval(KickWd,3000);
	E.enableWatchdog(30, false);
	E.showMessage=print; //apploader suport
	D7.write(1); // turns off sp02 red led
}
if (process.env.BOARD=="MAGIC3"||process.env.BOARD=="Magic3"||process.env.BOARD=="ROCK")
	ew={pin:{BAT:D30,CHRG:D8,BUZZ:D6,BUZ0:0,BL:D12,i2c:{SCL:14,SDA:15},touch:{RST:D39,INT:D32},disp:{CS:D3,DC:D47,RST:D2,BL:D12},acc:{INT:D16}}};
else if ( process.env.BOARD=="BANGLEJS2")
	ew={pin:{BAT:D3,CHRG:D23,BUZZ:D19,BUZ0:1,BL:D8,i2c:{SCL:D34,SDA:D33},touch:{RST:D35,INT:D36},disp:{CS:D5,DC:D6,RST:D7,BL:D8},acc:{INT:D39}}};
else 
	ew={pin:{BAT:D31,CHRG:D19,BUZZ:D16,BUZ0:1,BL:D12,i2c:{SCL:D7,SDA:D6},touch:{RST:D13,INT:D28},disp:{CS:D25,DC:D18,RST:D26,BL:D14},acc:{INT:D8}}};
//devmode
if (BTN1.read() || require("Storage").read("devmode")) { 
  let mode=(require("Storage").read("devmode"));
  if ( mode=="loader"){ 
    digitalPulse(ew.pin.BUZZ,ew.pin.BUZ0,80);
  } else if ( mode=="shutdown"){ 
    digitalPulse(ew.pin.BUZZ,ew.pin.BUZ0,300);
	NRF.sleep();
  } else {
    require("Storage").write("devmode","done");
    NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
    digitalPulse(ew.pin.BUZZ,ew.pin.BUZ0,100);
	print("Welcome!\n*** DevMode ***\nShort press the side button\nto restart in WorkingMode");
  }
	
  lala=setWatch(function(){
    "ram";
    require("Storage").erase("devmode");
	require("Storage").erase("devmode.info");
    NRF.setServices({},{uart:false});
    NRF.setServices({},{uart:true}); 
    NRF.disconnect();
    setTimeout(() => {
	 reset();
    }, 500);
  },BTN1,{repeat:false, edge:0}); 
  
}else{ //working mode
var w;
if ( process.env.BOARD=="BANGLEJS2") {
	Bangle.setOptions({wakeOnTouch:1,lockTimeout:0,backlightTimeout:0,wakeOnBTN1:1,wakeOnTwist:0, });
	//E.setConsole(null,{force:true});	
	eval(require('Storage').read('.lcd_b2'));
}else if (process.env.BOARD=="P8"||process.env.BOARD=="P22")
	eval(require('Storage').read('.lcd_p8'));
else
	eval(require('Storage').read('.lcd_magic'));
if (!w) w=require("eucWatch");
eval(require('Storage').read('handler'));
eval(require('Storage').read('main'));
eval(require('Storage').read('euc'));
//
digitalPulse(ew.pin.BUZZ,ew.pin.BUZ0,[100,30,100]);
setTimeout(function(){
  if (global.face) face.go('main',0);
  setTimeout(function(){ if (global.set) setter.accR(); },1000); 
  digitalPulse(ew.pin.BUZZ,ew.pin.BUZ0,100);  
},200); 
}


