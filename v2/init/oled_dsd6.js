Modules.addCached("OLED",function(){
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
	 w.initOLED=function(rot,f){
			require("Font8x16").add(Graphics);
			if (require('Storage').read('Font7x11Numeric7Seg')) {eval(require('Storage').read('Font7x11Numeric7Seg')); require('Font7x11Numeric7Seg').add(Graphics);}
			if (require('Storage').read('FontDylex7x13.js')) {eval(require('Storage').read('FontDylex7x13.js')); require('FontDylex7x13').add(Graphics);}	
			var spi=SPI1; //new SPI()
			spi.setup({mosi:D6,sck:D5,baud:8000000});
			if (f===undefined) f=function(){
				 o.gfx.setFont8x16();
				 o.gfx.drawString("EucWatch DSD6",20,12);
				 o.flip();
			};
			if(rot===undefined) rot=0;
			var o=require("OLED").connectSPI(spi,D28,D4,f,{cs:D29,rotation:rot});
			//exports.OLED=o;
	};
w.initOLED(0); // init and set to Vertical mode
//w.initOLED(270); // init and set to landscape mode

