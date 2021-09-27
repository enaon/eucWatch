//watchdog
//setBusyIndicator(D27)
E.kickWatchdog();
function P8KickWd(){
	"ram";
  if(!BTN1.read())E.kickWatchdog();
}
var wdint=setInterval(P8KickWd,3000);
E.enableWatchdog(30, false);
//d25.write(0)
E.showMessage=print; //apploader suport
global.save = function() { throw new Error("You don't need to use save() on P8!"); };
//spi flash-notes
//var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0});
//spi.send([0xab],D5);  //wake
//spi.send([0xb9],D5); //powerdown
//spi.send([0x9f,0,0,0],D5); //check status
//errata 108 fix // poke32(0x40000EE4,0x4f) //obsolete
//load in devmode
if (BTN1.read() || Boolean(require("Storage").read("devmode"))) { 
  let mode=(require("Storage").read("devmode"));
  if ( mode=="loader"){ 
    //require("Storage").write("devmode","done");
    //NRF.setAdvertising({},{connectable:false});
    //NRF.disconnect();
    //NRF.sleep();
	//Bluetooth.println("devmode");
    digitalPulse(D16,1,80);
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
var w;
var pal=[];
Modules.addCached("P8",function(){
/*const pin = {
  BUTTON: D17,
  MOTOR: D16, 
  BATTERY: D31, 
  CHARGING: D19, 
  LCD_BL_L:D14,
  LCD_BL_M:D22,  
  LCD_BL_H:D23,  
  LCD_CLK: D2, 
  LCD_RST: D26, 
  LCD_CS: D25, 
  LCD_SI: D3,
  LCD_DC: D18, 
  //Touchscreen
  TP_SDA:D6,
  TP_SCL:D7,
  TP_RESET:D13, // P8 Watch
  TP_INT:D28,
};
*/

//battery
const battVoltage=function(s){
	let v=7.1*analogRead(D31);
	if (s) { v=(v*100-340)*1.33|0; //if (v>=100) v=100;
	}
    let hexString = ("0x"+(0x50000700+(D31*4)).toString(16));
	poke32(hexString,2); // disconnect pin for power saving, otherwise it draws 70uA more 
	return v;
};
//screen driver
//
// MIT License (c) 2020 fanoush https://github.com/fanoush
// see full license text at https://choosealicense.com/licenses/mit/
// compiled with options LCD_BPP=12,SHARED_SPIFLASH,SPIFLASH_CS=(1<<5)
/*
var SPI2 = (function(){
  var bin=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8QtQNMfEQigGCAoYDjgBC92P///wdLe0QbiUOxBEoTaAAr/NAAIxNgA0p6RBOBcEcYMQJAxv///7L///8t6fBHkEYZTBlO//fl/xlK3/hkwAAjASUTYE/w/w5TYKlGI2AQMh9G/ykA6wMKwvgAoIu//zMxYMb4AOAAIYi//znM+ACQuPEADwbQKbkLS3tEHYEAIL3o8IfU+ACguvEAD/rQJ2AAKd7R8+cYMQJASDUCQDQ1AkAQMAJAUP///y3p8E+dsM3pARJWSnpEBkaS+ACQACgA8JuAACkA8JiACfH/MwcrAPKTgAEjA/oJ8wE727IEeAOTQ3hHSZeIROoDJAKbAPECC0RIHEEgIwNgByMLYNNopLLN6QYBC7FAShNgT+pJA9uyBJM/S3tEE6gFkwqrzekIME/wAAhBRgWbAp2z+AKgA5sBmiNARPoJ9DL4E8ADmyNARPoJ9DL4EyAEmx1E7bIHLULYpLJP6iwTQ1QTEgHxAg5D6gwcQxgDMarxAgojKYP4AcAf+or6APgOIAndASL/91P/2PEBCAu/CZgImEFGACG68QAPy9EfS3tEAT/biB5Ev7JzeDR4ROoDJAKbHEEG8QILpLIAL7bR2bE6Rv/3NP8VS3tE22gLsQaaE2AHmwAgGGAdsL3o8I/eRgg9HvgBO+2yxfEICwP6C/McQ6Sy80aw5//3Bf/j50/w/zDp5wC/ADUCQAgFAFAMBQBQFP///7T+//8w/v//Bv7//xlKekT4tQZGEGkPRhCzE0wTTSAjI2AHIytgEksYYNJoArEaYAAiASEwRv/37/4PS3tEAS8baSNgBN0AInkecBz/9+T+Ckt7RNtoA7EjYAAgKGD4vU/w/zD75wC/CAUAUAA1AkAMBQBQqv3//3z9//9m/f//E7UAKB7bACmmv434BRACJAEkACqkvwKpCRmN+AQApL8BNAH4BCwAK6K/AqoSGQE0IUYBqKi/AvgEPP/3p/8gRgKwEL0AJPrncLUFRoixRhgAJChGEPgBGxmxRRi1QgLZZEIgRnC9//eR/wAo+dEBNO/nBEb15wAADUsbaBC1o7kMSxtoC7EMShNgDksLSntEAAZcaRRgnGlUYNppCEtJABpgWGFZZAEgEL1P8P8w++cANQJABDMCQAgzAkAINQJAEDUCQKr8//8FSgAjE2Ci9X5yE2ADSxtoC7HC+AAycEcANQJABDMCQBC1Bkx8RMTpBQEBIQH6AvIB+gPz4mAjYRC9AL9M/P//");
  return {
    cmd:E.nativeCall(593, "int(int,int)", bin),
    cmds:E.nativeCall(781, "int(int,int)", bin),
    cmd4:E.nativeCall(709, "int(int,int,int,int)", bin),
    setpins:E.nativeCall(941, "void(int,int,int,int)", bin),
    enable:E.nativeCall(829, "int(int,int)", bin),
    disable:E.nativeCall(909, "void()", bin),
    blit_setup:E.nativeCall(33, "void(int,int,int,int)", bin),
    blt_pal:E.nativeCall(221, "int(int,int,int)", bin),
  };
})();
*/
// slower 16bit mode version
// compiled with options LCD_BPP=16,SHARED_SPIFLASH,SPIFLASH_CS=(1<<5)
var SPI2 = (function(){
  var bin=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8QtQNMfEQigGCAoYDjgBC92P///wdLe0QbiUOxBEoTaAAr/NAAIxNgA0p6RBOBcEcYMQJAxv///7L///8t6fBHkEYZTBlO//fl/xlK3/hkwAAjASUTYE/w/w5TYKlGI2AQMh9G/ykA6wMKwvgAoIu//zMxYMb4AOAAIYi//znM+ACQuPEADwbQKbkLS3tEHYEAIL3o8IfU+ACguvEAD/rQJ2AAKd7R8+cYMQJASDUCQDQ1AkAQMAJAUP///y3p8E+bsBNGAJFOSXlEBkaR+ACwACgA8IyAAJoAKgDwiIAL8f8yByoA8oOAASIC+gvyATrSsgR4AZJCeD5NsfgEgETqAiSHHCAiPEgqYAciAmDKaBxBpLLN6QNQCrE4SQpgOUp6RBGoApIIqs3pBSBP8AAJSUYCmrL4AqAdRgGaXUTtsgctAuoEDACaiL8IPTL4HMCBvxf4ASvtssXxCA4C+g7yRPoL9E/qLC6IvxRDAPgB4EocAjEK8f86IymksgD4AsAf+or6C90BIgeT//dX/9nxAQkHmwu/BpgFmElGACG68QAPytEYSnpECPH/ONKIFkQf+oj4cng0eETqAiQcQbccpLK48QAPtNFxsUJG//c2/w5Le0TbaAuxA5oTYASbACAYYBuwvejwj//3FP/w50/w/zD25wgFAFAANQJADAUAUBT///+8/v//Nv7//wr+//8ZSnpE+LUGRhBpD0YQsxNME00gIyNgByMrYBJLGGDSaAKxGmAAIgEhMEb/9//+D0t7RAEvG2kjYATdACJ5HnAc//f0/gpLe0TbaAOxI2AAIChg+L1P8P8w++cAvwgFAFAANQJADAUAUMr9//+c/f//hv3//xO1ACge2wAppr+N+AUQAiQBJAAqpL8CqQkZjfgEAKS/ATQB+AQsACuivwKqEhkBNCFGAaiovwL4BDz/96f/IEYCsBC9ACT653C1BUaIsUYYACQoRhD4ARsZsUUYtUIC2WRCIEZwvf/3kf8AKPnRATTv5wRG9ecAAA1LG2gQtaO5DEsbaAuxDEoTYA5LC0p7RAAGXGkUYJxpVGDaaQhLSQAaYFhhWWQBIBC9T/D/MPvnADUCQAQzAkAIMwJACDUCQBA1AkDK/P//BUoAIxNgovV+chNgA0sbaAuxwvgAMnBHADUCQAQzAkAQtQZMfETE6QUBASEB+gLyAfoD8+JgI2EQvQC/bPz//w==");
  return {
    cmd:E.nativeCall(561, "int(int,int)", bin),
    cmds:E.nativeCall(749, "int(int,int)", bin),
    cmd4:E.nativeCall(677, "int(int,int,int,int)", bin),
    setpins:E.nativeCall(909, "void(int,int,int,int)", bin),
    enable:E.nativeCall(797, "int(int,int)", bin),
    disable:E.nativeCall(877, "void()", bin),
    blit_setup:E.nativeCall(33, "void(int,int,int,int)", bin),
    blt_pal:E.nativeCall(221, "int(int,int,int)", bin),
  };
})();

// this method would produce code string that can replace bin declaration above with heatshrink compressed variant
// however it seems the gain is very small so is not worth it
//    shrink:function(){return `var bin=E.toString(require("heatshrink").decompress(atob("${btoa(require("heatshrink").compress(bin))}")))`;}
//*/
//P8 pins
CS=D25;DC=D18;RST=D26;BL=D14;
SCK=D2;MOSI=D3;
RST.reset();
// CLK,MOSI,CS,DC
D2.write(0);D3.write(0);CS.write(1);DC.write(1);
SPI2.setpins(SCK,MOSI,CS,DC);
SPI2.enable(0x80,0); //8MBit, mode 0

function delayms(ms){
  digitalPulse(DC,0,ms); // just to wait 10ms
  digitalPulse(DC,0,0);
}

function toFlatString(arr){
  var b=E.toString(arr);if (b) return b;
  print("toFlatString() fail&retry!");E.defrag();b=E.toString(arr);if (b) return b;
  print("fail&retry again!");E.defrag();b=E.toString(arr);if (b) return b;
  print("failed!"); return b;
}
function toFlatBuffer(a){return E.toArrayBuffer(toFlatString(a));}

function cmd(a){
  var l=a.length;
  if (!l)return SPI2.cmd4(a,-1,-1,-1);
  if (l==2)return SPI2.cmd4(a[0],a[1],-1,-1);
  if (l==3)return SPI2.cmd4(a[0],a[1],a[2],-1);
  if (l==4)return SPI2.cmd4(a[0],a[1],a[2],a[3]);
  if (l==1)return SPI2.cmd4(a[0],-1,-1,-1);
  var b=toFlatString(a);
  SPI2.cmd(E.getAddressOf(b,true),b.length);
}

function cmds(arr){
  var b=toFlatString(arr);
  var c=SPI2.cmds(E.getAddressOf(b,true),b.length);
  if (c<0)print('lcd_cmds: buffer mismatch, cnt='+c);
  return c;
}

RST.set();

function init(){
	DC.write(1); 			//spi.Init();
	pinMode(D18,"output");  //nrf_gpio_cfg_output(pinDataCommand);
	pinMode(D26,"output");	//nrf_gpio_cfg_output(26);
	digitalWrite(D26,HIGH); 	//nrf_gpio_pin_set(26);
//
	digitalWrite(D26,LOW); 	//HardwareReset() //nrf_gpio_pin_clear(26);
	delayms(20);			//nrf_delay_ms(10);
	digitalWrite(D26,HIGH);	//nrf_gpio_pin_set(26);
//
	cmd(0x01); 		// SoftwareReset() WriteCommand(static_cast<uint8_t>(Commands::SoftwareReset)); //SoftwareReset = 0x01,
	delayms(200);	//nrf_delay_ms(150);
//  
	cmd(0x11); 		//SleepOut() // WriteCommand(static_cast<uint8_t>(Commands::SleepOut)); //SleepOut = 0x11,
	delayms(20);	//nrf_delay_ms(10);
// COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp //ColMod = 0x3a
	cmd([0x3A, 0x55]); 	// ColMod();  WriteCommand(static_cast<uint8_t>(Commands::ColMod));WriteData(0x55);
	delayms(20);		// nrf_delay_ms(10);
// MADCTL  //MemoryDataAccessControl = 0x36, (0 - This is an unrotated screen, 0x48 is for flipping the Column Address Order (X Axis) AND changing RGB order; only X Axis to be flipped its  0x40" ) 
	cmd([0x36, 0x48]); 	// MemoryDataAccessControl(); WriteCommand(static_cast<uint8_t>(Commands::MemoryDataAccessControl));WriteData(0x00); 
//	cmd([0x36, 0x0]); 	// MemoryDataAccessControl(); WriteCommand(static_cast<uint8_t>(Commands::MemoryDataAccessControl));WriteData(0x00); 
	delayms(20);		// nrf_delay_ms(10);
// 	ColumnAddressSet();  WriteCommand(static_cast<uint8_t>(Commands::ColumnAddressSet));  ColumnAddressSet = 0x2a,
	cmd([0x2a,0,0,0,239]); 	// WriteData(0x00);WriteData(0x00);WriteData(Width >> 8u);WriteData(Width & 0xffu);
//  RowAddressSet();   WriteCommand(static_cast<uint8_t>(Commands::RowAddressSet));  RowAddressSet = 0x2b,
	cmd([0x2b,0,0,0,319]);	// WriteData(0x00);WriteData(0x00);WriteData(320u >> 8u);WriteData(320u & 0xffu);
// 	DisplayInversionOn();  DisplayInversionOn = 0x21, (0x20 no invertion)
	cmd(0x20); 		// WriteCommand(static_cast<uint8_t>(Commands::DisplayInversionOn));
//	cmd(0x21); 		// WriteCommand(static_cast<uint8_t>(Commands::DisplayInversionOn));
	delayms(20);  	// nrf_delay_ms(10);
//	NormalModeOn();  // NormalModeOn = 0x13,
	cmd(0x13); 		//   WriteCommand(static_cast<uint8_t>(Commands::NormalModeOn));
	delayms(20);		//  nrf_delay_ms(10);
/*
//test
	cmd([0x37,0,0]);
	cmd([0xB2, 0xC, 0xC, 0, 0x33, 0x33]); // PORCTRL (B2h): Porch Setting
	cmd([0xB7, 0]);     // GCTRL (B7h): Gate Control
	cmd([0xBB, 0x3E]);  // VCOMS (BBh): VCOM Setting 
	cmd([0xC2, 1]);     // VDVVRHEN (C2h): VDV and VRH Command Enable
	cmd([0xC3, 0x19]);  // VRHS (C3h): VRH Set 
	cmd([0xC4, 0x20]);  // VDVS (C4h): VDV Set
	cmd([0xC5, 0xF]);   // VCMOFSET (C5h): VCOM Offset Set .
	cmd([0xD0, 0xA4, 0xA1]);   // PWCTRL1 (D0h): Power Control 1 
	cmd([0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
	cmd([0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
*/
//	DisplayOn();  //DisplayOn = 0x29,
	cmd(0x29); 		//     WriteCommand(static_cast<uint8_t>(Commands::DisplayOn));

/*	
// 
	cmd([0x36, 0]); 	// ColumnAddressSet();
	delayms(20);		//WriteData(0x00);
// 
	cmd([0x36, 0]); 	// ColumnAddressSet();
	delayms(20);		//WriteData(0x00);
												
	
	//cmd([0x36, 0]);     // MADCTL - This is an unrotated screen
	cmd([0x37,0,0]);
	// These 2 rotate the screen by 180 degrees
	//[0x36,0xC0],     // MADCTL
	//[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
	//cmd([0x3A, 0x03]);  // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
	//delayms(20);

	cmd([0xB2, 0xC, 0xC, 0, 0x33, 0x33]); // PORCTRL (B2h): Porch Setting
	cmd([0xB7, 0]);     // GCTRL (B7h): Gate Control
	cmd([0xBB, 0x3E]);  // VCOMS (BBh): VCOM Setting 
	cmd([0xC2, 1]);     // VDVVRHEN (C2h): VDV and VRH Command Enable
	cmd([0xC3, 0x19]);  // VRHS (C3h): VRH Set 
	cmd([0xC4, 0x20]);  // VDVS (C4h): VDV Set
	cmd([0xC5, 0xF]);   // VCMOFSET (C5h): VCOM Offset Set .
	cmd([0xD0, 0xA4, 0xA1]);   // PWCTRL1 (D0h): Power Control 1 
	cmd([0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
	cmd([0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
    delayms(20);
	cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    delayms(20);
	cmd(0x29); // DISPON (29h): Display On 
    delayms(20);
	cmd(0x21); // INVON (21h): Display Inversion On
    delayms(20);

	//cmd([0x2a,0,0,0,239]);
	//cmd([0x2b,0,0,0,239]);
	//cmd([0x2c]);
	//cmd([0x2a,0,0,0,239]);cmd([0x2b,0,0,0,239]);cmd([0x2c]);
*/
}

bpp=1; // powers of two work, 3=8 colors would be nice
var g=Graphics.createArrayBuffer(240,240,bpp);
//var pal;
g.isOn=false;
//bpp 1or2
if (bpp==2) pal= Uint16Array([0x0000,0x00a8,0xfaaa,0xffff]);
else pal= Uint16Array([0x0000,0xffff]);
g.sc=g.setColor;
g.setColor=function(c,v){ 
  if (c==1) pal[1]=v; else pal[0]=v;
  g.sc(c);
};
/*
switch(bpp){
  case 2: pal= Uint16Array([0x000,0xf00,0x0f0,0x00f]);break; // white won't fit
//  case 1: pal= Uint16Array([0x000,0xfff]);break;
  case 1:
  pal= Uint16Array( // same as 16color below, use for dynamic colors
    [ 0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
      0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff ]);
  g.sc=g.setColor;
  c1=pal[1]; //save color 1
  g.setColor=function(c){ //change color 1 dynamically
    c=Math.floor(c);
    if (c > 1) {
      pal[1]=pal[c]; g.sc(1);
    } else if (c==1) {
      pal[1]=c1; g.sc(1);
    } else g.sc(c);
  }; break;
  case 4: pal= Uint16Array( // CGA
    [
// 12bit RGB444
      0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
     0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff
//16bit RGB565
//      0x0000,0x00a8,0x0540,0x0555,0xa800,0xa815,0xaaa0,0xad55,
//      0x52aa,0x52bf,0x57ea,0x57ff,0xfaaa,0xfabf,0xffea,0xffff

    ]);break;
}

*/

// preallocate setwindow command buffer for flip
g.winCmd=toFlatBuffer([
  5, 0x2a, 0,0, 0,0,
  5, 0x2b, 0,0, 0,0,
  1, 0x2c,
  0 ]);
// precompute addresses for flip
g.winA=E.getAddressOf(g.winCmd,true);
g.palA=E.getAddressOf(pal.buffer,true); // pallete address
g.buffA=E.getAddressOf(g.buffer,true); // framebuffer address
g.stride=g.getWidth()*bpp/8;

g.flip=function(force){
  var r=g.getModified(true);
  if (force)
    r={x1:0,y1:0,x2:this.getWidth()-1,y2:this.getHeight()-1};
  if (r === undefined) return;
  var x1=r.x1&0xfe;var x2=(r.x2+2)&0xfe; // for 12bit mode align to 2 pixels
  var xw=(x2-x1);
  var yw=(r.y2-r.y1+1);
  if (xw<1||yw<1) {print("empty rect ",xw,yw);return;}
/*
  cmd([0x2a,0,x1,0,x2-1]);
  cmd([0x2b,0,r.y1,0,r.y2]);
  cmd([0x2c]);
*/
  var c=g.winCmd;
  c[3]=x1;c[5]=x2-1; //0x2a params
  c[9]=r.y1;c[11]=r.y2; // 0x2b params
  SPI2.blit_setup(xw,yw,bpp,g.stride);
  var xbits=x1*bpp;
  var bitoff=xbits%8;
  var addr=g.buffA+(xbits-bitoff)/8+r.y1*g.stride; // address of upper left corner
  //VIB.set();//debug
  SPI2.cmds(g.winA,c.length);
  SPI2.blt_pal(addr,g.palA,bitoff);
  //VIB.reset();//debug
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

g.isOn=false;
init();

g.on=function(){
  if (this.isOn) return;
	////RST.reset();
	//delayms(20);
	//RST.set();
	//init();
	//delayms(20);
	cmd(0x11);
	//delayms(20);

//  g.flip();
  //cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
  //cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
  this.bri.set(this.bri.lv);
  this.isOn=true;
//  this.setBrightness();
};


g.off=function(){
  if (!this.isOn) return;
  //cmd(0x28);
  cmd(0x10);
  digitalWrite([D23,D22,D14],7);
//  BL.set();
  this.isOn=false;
};

module.exports = {
//  pin: pin,
  battVoltage: battVoltage,
  gfx: g,
  cmd: cmd
};
});
w=require("P8");
//load
//w.gfx.init();
require("Storage").write("colmode16","done");
eval(require('Storage').read('handler'));
eval(require('Storage').read('main'));
eval(require('Storage').read('euc'));

//require('Storage').list(/m_/).forEach(modfile=>{eval(require('Storage').read(modfile));});
digitalPulse(D16,1,[100,30,100]);
setTimeout(function(){
if (global.face) face.go('main',0);
setTimeout(function(){ if (global.set) set.accR(); },1000); 
digitalPulse(D16,1,[100]);  
},200); 
}
