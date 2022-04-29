//watchdog
E.kickWatchdog();
function kickWd(){
  if(!BTN.read())E.kickWatchdog();
}
var wdint=setInterval(kickWd,1000);
E.enableWatchdog(7, false);
global.save = function() { throw new Error("You don't need to use save() on DSD6!"); };
//errata 108 fix // poke32(0x40000EE4,0x4f)
//load in devmode
Modules.addCached("DSD6OLED",function(){
	//modified SSD1306, 128x32 but needs 0xda,0x12
	// commands sent when initialising the display
	var initCmds = new Uint8Array([ 
		0xAe, // 0 disp off
		0xD5, // 1 clk div
		0x80, // 2 suggested ratio
		0xA8, 31, // 3 set multiplex, height-1
		0xD3,0x0, // 5 display offset
		0x40, // 7 start line
		0x8D, 0x14, // 8 charge pump
		0x20,0x0, // 10 memory mode - horizontal
		0xA1, // 12 seg remap 1
		0xC0, // 13 comscandec
		0xDA, 0x12, // 14 set compins, height==64 ? 0x12:0x02,
		0x81, 0xCF, // 16 set contrast
		0xD9, 0xF1, // 18 set precharge
		0xDb, 0x40, // 20 set vcom detect
		0xA4, // 22 display all on
		0xA6, // 23 display normal (non-inverted)
		0xAf // 24 disp on
	]);
	// commands sent when sending data to the display
	var flipCmds = new Uint8Array([
		0x21, // columns
		0, 127, // OLED_WIDTH-1
		0x22, // pages
		0, 3 /* (height>>3)-1 */
	]);
	var rotCmds = Uint8Array([
		0x20,0x0, // 10 memory mode - horizontal
		0xA1, // 12 seg remap 1
		0xC0, // 13 comscandec
	]);
	var rot;
	var gfxV;
	var gfxH;
	exports.connectSPI = function(spi, dc,  rst, callback, options) {
		if (rst) rst.reset();
		var cs = options?options.cs:undefined;
		var r = options&&options.rotation?options.rotation:90;
		if (options && options.contrast>=0) initCmds[17] = options.contrast;
		var oled = {};
		gfxV=Graphics.createArrayBuffer(32,128,1,{vertical_byte : false});
		gfxH=Graphics.createArrayBuffer(128,32,1,{vertical_byte : true});
		oled.isOn=false;
		oled.init = function(cmdArray){
			if (cs) cs.reset();
			// configure the OLED
			digitalWrite(dc,0); // command
			spi.write(cmdArray);
			digitalWrite(dc,1); // data
			if (cs) cs.set();
		};
		oled.setRotation = function(r){
			if (r=== 0){rotCmds[1]=1;rotCmds[2]=0xa1;rotCmds[3]=0xc8;}
			if (r==180){rotCmds[1]=1;rotCmds[2]=0xa0;rotCmds[3]=0xc0;}
			if (r== 90){rotCmds[1]=0;rotCmds[2]=0xa1;rotCmds[3]=0xc0;}
			if (r==270){rotCmds[1]=0;rotCmds[2]=0xa0;rotCmds[3]=0xc8;}
			oled.gfx=(r%180===0)?gfxV:gfxH;
			rot=r;
			oled.init(rotCmds);
		};
		if (rst) digitalPulse(rst,0,20);
			setTimeout(function() {
				oled.init(initCmds);
				oled.setRotation(r);
				oled.isOn=true;
				// if there is a callback, call it now(ish)
				if (callback !== undefined) setTimeout(callback, 10);
			}, 50);
		// write to the screen
		oled.flip = function() { 
			// set how the data is to be sent (whole screen)
			if (cs) cs.reset();
			digitalWrite(dc,0);// command
			spi.write(flipCmds);
			digitalWrite(dc,1);// data
			spi.write(((rot%180===0)?gfxV:gfxH).buffer);
			if (cs) cs.set();
		};
		// set contrast, 0..255
		oled.setContrast = function(c) { 
			if (cs) cs.reset();
			spi.write(0x81,c,dc);
			if (cs) cs.set();
		};
		// set off
		oled.off = function() { 
			if (cs) cs.reset();
			spi.write(0xAE,dc);
			if (cs) cs.set();
			oled.isOn=false;
		};
		// set on
		oled.on = function() { 
			if (cs) cs.reset();
			spi.write(0xAF,dc);
			if (cs) cs.set();
			oled.isOn=true;
		};
		// return graphics
		return oled;
		};
	});
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
	exports.initOLED=function(rot,f){
		require("Font8x16").add(Graphics);
		require('FontDylex7x13').add(Graphics);	
		require('Font7x11Numeric7Seg').add(Graphics);	
		var spi=SPI1; //new SPI()
		spi.setup({mosi:D6,sck:D5,baud:8000000});
		if (f===undefined) f=function(){
			 o.gfx.setFont8x16();
			 o.gfx.drawString("EucWatch DSD6",20,12);
			 o.flip();
		};
		if(rot===undefined) rot=0;
		var o=require("DSD6OLED").connectSPI(spi,D28,D4,f,{cs:D29,rotation:rot});
		exports.OLED=o;
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
	function accRead(reg,len){i2c.writeTo(0x1f,reg);return i2c.readFrom(0x1f,len);}
	function accWrite(reg,data){i2c.writeTo(0x1f,reg,data);}
	var i2c=new I2C();
	//var i2c=I2C1;
	exports.initAccel=function(){
		i2c.setup({scl:13, sda:14, bitrate:100000});
	};
	function accRegDump(reg){
		val=accRead(reg,1)[0];return val.toString(10)+" 0x"+val.toString(16)+" %"+val.toString(2);
	}
	exports.accINSDump=function(){
		console.log("tscp:",accRegDump(0x10),"INS1:",accRegDump(0x12),"INS2:",accRegDump(0x13),"INS3:",accRegDump(0x14));
	};
	exports.accelCoords=function(){
		coords=new Int16Array(accRead(0x06,6).buffer);
		return {x:coords[0],y:coords[1],z:coords[2]};
	};
	exports.accRead=accRead;
	exports.accWrite=accWrite;
	exports.accRegDump=accRegDump;
});

var w=require("DSD6");
w.initOLED(0); // init and set to Vertical mode
//w.initOLED(270); // init and set to landscape mode
var o=w.OLED;
function setupSerial(s){
	if (!s) s=Serial1;
	s.setup(38400,{rx:D22,tx:D23});
}
function resumeConsole(s){
	setupSerial(s);
	setTimeout(()=>{s.setConsole();},50);
}
function pauseConsole(s){
	if (!s) s=Serial1;
	if(s._options){
		Bluetooth.setConsole(1);
		setTimeout(()=>{
			var rx=s._options.rx;
			s.unsetup();
			rx.mode("input_pulldown");
			setWatch(()=>{resumeConsole(s);},rx,{edge:'rising',debounce:30});
		},500);
	}
}
function buzzer (a,b) {
digitalPulse(D25,a,b);
}
// watch KX023 interrupt pin
//setWatch(function(s){
//  if (s.state){w.accINSDump();console.log(s,w.accRegDump(0x17));}
//},D15,true);
if (BTN1.read() || Boolean(require("Storage").read("devmode"))) { 
	let mode=(require("Storage").read("devmode"));
	if ( mode=="off"){ 
		require("Storage").write("devmode","done");
		NRF.setAdvertising({},{connectable:false});
		NRF.disconnect();
		NRF.sleep();
		buzzer(1,250);
	} else {
		require("Storage").write("devmode","done");
		NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
		buzzer(1,100);
		print("Welcome!\n*** DevMode ***\nShort press the button\nto restart in WorkingMode");
		setTimeout(()=>{
			o.gfx.setFont8x16();
			o.gfx.clear();
			o.gfx.drawString("DEV mode",20,12);
			o.flip();
			setupSerial();// first set to known state
			// now pause serial console for power saving, it will be enabled when RX goes high
			// it should be enough to connect to serial adapter
			pauseConsole(Serial1);
		},200);
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
	if (!Boolean(require('Storage').read('setting.json'))) require('Storage').write('setting.json',{"watchtype":"dsd6"});
	eval(require('Storage').read('handler')); //call handler
	print("Welcome!\n*** WorkingMode ***\nLong hold the button\nto restart in DevMode");
    buzzer(1,[100,50,100]);
}
  
