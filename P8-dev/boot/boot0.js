//watchdog
E.kickWatchdog();
function P8KickWd(){
	"ram";
  if(!D17.read())E.kickWatchdog();
}
var wdint=setInterval(P8KickWd,4000);
E.enableWatchdog(20, false);
global.save = function() { throw new Error("You don't need to use save() on P8!"); };

//load in devmode
if (BTN1.read() || Boolean(require("Storage").read("devmode"))) { 
  let mode=(require("Storage").read("devmode"));
  if ( mode=="off"){ 
    require("Storage").write("devmode","done");
    NRF.setAdvertising({},{connectable:false});
    NRF.disconnect();
    NRF.sleep();
    digitalPulse(D16,1,250);
  } else {
    require("Storage").write("devmode","done");
    NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
    digitalPulse(D16,1,100);
	print("Welcome!\n*** DevMode ***\nShort press the side button\nto restart in WorkingMode");
  }
  setWatch(function(){
    "ram";
    require("Storage").erase("devmode");
	require("Storage").erase("devmode.info");
    NRF.setServices({},{uart:false});
    NRF.setServices({},{uart:true}); 
    NRF.disconnect();
    setTimeout(() => {
	 reset();
    }, 500);
  },BTN1,{repeat:false, edge:"rising"}); 
}else{ //load in working mode
if (!Boolean(require('Storage').read('setting.json'))) require('Storage').write('setting.json',{"watchtype":"eucwatch"});
NRF.setAdvertising({}, { name:"Espruino-jeff",connectable:true });
const STOR = require("Storage");
const P8 = {
    ON_TIME: 10,
    BRIGHT : 3,
    FACEUP:true,
    awake : true,
    time_left:10,
    ticker:undefined,
    pressedtime:0,
    buzz: (v)=>{
        v = v? v : 100;
        D16.set();
        setTimeout(()=>{D16.reset();},v);
    },
    batV: () => {
        pinMode(D16,"analog",true);
        var v = 7.1 * analogRead(D31);
        pinMode(D16,"input",true); //power saving?
        return v;
    },
    isPower:()=>{return D19.read();},
    setLCDTimeout:(v)=>{P8.ON_TIME=v<5?5:v;},
    setLCDBrightness:(v)=>{P8.BRIGHT=v; brightness(v);},
    init:()=>{
            var s = STOR.readJSON("settings.json",1)||{ontime:10, bright:3, timezone:1,faceup:true};
            P8.ON_TIME=s.ontime;
            P8.time_left=s.ontime;
            P8.BRIGHT=s.bright;
            P8.FACEUP=s.faceup;
            E.setTimeZone(s.timezone);
    },
    sleep:() => {
        P8.awake = false;
        brightness(0);
        TC.stop();
        P8.emit("sleep",true);
        g.lcd_sleep();
    },
    wake:()=> {
        P8.awake = true;
        P8.time_left = P8.ON_TIME;
        TC.start();
        g.lcd_wake();
        P8.emit("sleep",false);
        brightness(P8.BRIGHT);
        P8.ticker = setInterval(P8.tick,1000);
    },
    tick:()=>{
        P8.time_left--;
        if (P8.time_left<=0){
           if (ACCEL && ACCEL.faceup) {P8.time_left = P8.ON_TIME; return;}
           if (P8.ticker) P8.ticker=clearInterval(P8.ticker);
           P8.emit("sleep",true);
           P8.sleep();
        }
    }
};

setWatch(()=>{
    P8.emit("power",D19.read());
},D19,{repeat:true,debounce:500});
  

setWatch(() =>{P8.pressedtime = Date.now();},D17,{repeat:true,edge:"rising"});
//fonts
//require('Font7x11Numeric7Seg').add(Graphics);
P8.init();
eval(STOR.read("lcd.js"));
var g = ST7789();
brightness(P8.BRIGHT);
eval(STOR.read("touch.js"));
TC.start();
TC.on('touch',(p)=>{P8.time_left=P8.ON_TIME;});
TC.on('swipe',(d)=>{P8.time_left=P8.ON_TIME;});
TC.on("longtouch", (p)=> {P8.time_left=P8.ON_TIME;if (D17.read()) reset(); else load("launch.js");});
if (P8.FACEUP && Boolean(STOR.read("accel.js"))){ 
	eval(STOR.read("accel.js"));
    ACCEL.init();
    setInterval(ACCEL.check,200);
	ACCEL.on("faceup",()=>{if (!P8.awake) P8.wake();});
}
P8.ticker = setInterval(P8.tick,1000);
setWatch(() =>{
	if ((Date.now()-P8.pressedtime)>5000) E.reboot();
	if (!P8.awake) P8.wake();
},D17,{repeat:true,edge:"falling"});
























//battery
const battVoltage=function(s){
	let v=7.1*analogRead(D31);
	if (s) { v=(v*100-345)*1.43|0; //if (v>=100) v=100;
	}
    let hexString = ("0x"+(0x50000700+(D31*4)).toString(16));
	poke32(hexString,2); // disconnect pin for power saving, otherwise it draws 70uA more 
	return v;
};

g.bri={
  	lv:((require("Storage").readJSON("setting.json",1)||{}).bri)?(require("Storage").readJSON("setting.json",1)||{}).bri:3,
	set:function(o){	
//      print(o);
	if (o) this.lv=o; else { this.lv++; if (this.lv>7) this.lv=1; o=this.lv; }
	digitalWrite([D23,D22,D14],7-o);
    set.def.bri=o;
	return o;
	}
};

}
