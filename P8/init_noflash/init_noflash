//watchdog
E.kickWatchdog();
function P8KickWd(){
  if(!D17.read())E.kickWatchdog();
}
var wdint=setInterval(P8KickWd,1000);
E.enableWatchdog(20, false);
E.showMessage=print; //apploader suport
global.save = function() { throw new Error("You don't need to use save() on P8!"); };
//errata 108 fix // poke32(0x40000EE4,0x4f)
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
var w;
var pal;
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
	if (s) { v=(v*100-345)*1.43|0; //if (v>=100) v=100;
	}
    let hexString = ("0x"+(0x50000700+(D31*4)).toString(16));
	poke32(hexString,2); // disconnect pin for power saving, otherwise it draws 70uA more 
	return v;
};
//screen driver
var SPI2 = (function(){
  var bin=atob("AAAAAAAAAAAAAAAA/////////////////////wAAAAAAAAAAELUDTHxEIoBggKGA44AQvdT///8HS3tEm2hDsQRKE2gAK/zQACMTYANKekSTYHBHGDECQML///+u////LenwR5BGGUwZTv/35f8ZSt/4ZMAAIwElE2BP8P8OU2CpRiNgEDIfRv8pAOsDCsL4AKCLv/8zMWDG+ADgACGIv/85zPgAkLjxAA8G0Cm5C0t7RJ1gACC96PCH1PgAoLrxAA/60CdgACne0fPnGDECQEg1AkA0NQJAEDACQEz///8t6fBPmbDN6QASBJNDS3tEBkaT+ACQACh90AApe9AJ8f8yByp32AEiAvoJ8gE60rIEeAKSQniT+ASwBZNE6gIkAZqHHAirEKgUQc3pBjBP6kkC0rJP8AAIpLIDkkFGBZsBnZP4AqACmwCaI0BE+gn0MvgTwAKbI0BE+gn0MvgTIAObHUTtsgctgb8IPRf4ATvtssXxCA6EvwP6DvMcQ0/qLBNDVBMSAfECDkPqDBxDGAMxqvECCh0pg/gBwKSyAPgOIF/6ivoJ3QEi//dZ/9jxAQgLvweYBphBRgAhuvEAD8HRD0t7RNuIHkS3HHN4NHhE6gMkAZscQQvx/zMT8P8LpLKs0RmxBJr/9zr/WUYIRhmwvejwj0/w/zH45w7///84/v//H7XDssDzBxIACkDqAxDAsgApjfgFAI34CACN+AsAjfgOAAhGuL/IHY34BCCN+AYwjfgHII34CTCN+AogjfgMMI34DSCN+A8wwBD/9/P+EksSTAAiGmBaYKPyHEMPKRpgAaoiYA5KT/AMBBRgwr+i9VJyT/QAMRFgCkoBIRFgCkkAIhxoACz80AIoGmDYvwpgATj20QSwEL00NQJARDUCQEg1AkAQMAJAADICQP/3wr4YsRGxASL/99G+T/D/MHBHGLERsQAi//fJvk/w/zBwR/i1Ek5+RAdG82gAKw1GFdsBJAxKBPoD8xNgIUYAIv/3tf7zaJxACEsBLRxgBN0AImkeeBz/96r+ACAB4E/w/zD4vQC/DAUAUAgFAFAk/f//Ckp6RBC10mgAKgrbSLFBsQEjk0AEShNgACL/94/+ACAQvU/w/zD75wgFAFDW/P//MLUVTANGIGgQuxlKekQVaQAtHNtVaQAtAtqSaQAqFtsOShBoUGATSg1IekQbBhVpBWCVaUVgUGkKShBgU2EKS0kAGWAHIyNgCEsBIBhgML1P8P8w++cAvwA1AkAEMwJACDUCQBA1AkBUNQJAFDACQJz8//9+/P//BUsbaAuxBUoTYAVKACMTYKL1fnITYHBHBDMCQAgzAkAANQJABUsGSQAiGmAFSnpE0GkIYBJqGmBwRwC/ADUCQAQzAkAC/P//BEsaaAVLe0TaYQNKEmgaYnBHAL8EMwJAADUCQOL7//8QtQNMfETE6QUhIGHjYBC9xPv//w==");
  return {
    cmd:E.nativeCall(725, "int(int,int)", bin),
    data:E.nativeCall(805, "int(int,int)", bin),
    write:E.nativeCall(709, "int(int,int)", bin),
    write_async:E.nativeCall(693, "int(int, int)", bin),
    async_wait:E.nativeCall(689, "void()", bin),
    fill_color:E.nativeCall(517, "int(int,int)", bin),
    setpins:E.nativeCall(1077, "void(int,int,int,int)", bin),
    enable:E.nativeCall(853, "int(int,int)", bin),
    disable:E.nativeCall(973, "void()", bin),
    save:E.nativeCall(1045, "void()", bin),
    restore:E.nativeCall(1009, "void()", bin),
    blit_setup:E.nativeCall(37, "void(int,int,int,int)", bin),
    blt_pal:E.nativeCall(225, "int(int,int,int,int)", bin),
  };
})();
D26.reset();
// CLK,MOSI,LCD_CS,LCD_DC
D2.write(0);D3.write(0);D25.write(1);D18.write(1);
SPI2.save();
SPI2.setpins(D2,D3,-1,18);
SPI2.disable();SPI2.enable(0x80,0); //8MBit, mode 0

function lcd_cmd(arr){
  var b=E.toString(arr); // flat string buffer
  if (!b){E.defrag();b=E.toString(arr); }
  if (!b){E.defrag();b=E.toString(arr); }
  D25.reset();
  SPI2.cmd(E.getAddressOf(b,true),b.length);
  D25.set();
}
function lcd_data(arr){
  const b=E.toString(arr); // flat string
  D25.reset();
  SPI2.cmd(E.getAddressOf(b,true),b.length);
  D25.set();
}
D26.set();
var bpp=1;
var g=Graphics.createArrayBuffer(240,240,bpp);
g.isOn=false;
if (bpp==2) pal= Uint16Array([0x000,0xf00,0x0f0,0x00f]);
else pal= Uint16Array([0x000,0xfff]);
g.sc=g.setColor;
g.setColor=function(c,v){ 
  if (c==1) pal[1]=v; else pal[0]=v;
  g.sc(c);
};
//const INITCMDS = [

g.init=function(f){
  lcd_cmd([0x11]); // sleep out
  setTimeout(()=>{
  [
  // This is an unrotated screen
  [0x36, 0],     // MADCTL
  [0x37,0,0],
  // These 2 rotate the screen by 180 degrees
  //[0x36,0xC0],     // MADCTL
  //[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
  [0x3A, 0x03],  // COLMOD - interface pixel format - 12bpp, 05 - 16bpp
  [0xB2, 0xC, 0xC, 0, 0x33, 0x33], // PORCTRL (B2h): Porch Setting
  [0xB7, 0],     // GCTRL (B7h): Gate Control
  [0xBB, 0x3E],  // VCOMS (BBh): VCOM Setting 
  [0xC2, 1],     // VDVVRHEN (C2h): VDV and VRH Command Enable
  [0xC3, 0x19],  // VRHS (C3h): VRH Set 
  [0xC4, 0x20],  // VDVS (C4h): VDV Set
  [0xC5, 0xF],   // VCMOFSET (C5h): VCOM Offset Set .
  [0xD0, 0xA4, 0xA1],   // PWCTRL1 (D0h): Power Control 1 
  [0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f],   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
  [0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f],   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
  [0x29], // DISPON (29h): Display On 
  [0x21], // INVON (21h): Display Inversion On
  [0x2a,0,0,0,239],
  [0x2b,0,0,0,239],
  [0x2c]
  ].forEach((a)=>{lcd_cmd(a);});
  if (f !== undefined) f();
  else {g.clear();g.flip();g.off();
       } 
  },120);
};
g.bri={
	lv:3,
	set:function(o){	
	if (o) this.lv=o; else { this.lv++; if (this.lv>7) this.lv=1; o=this.lv; }
	digitalWrite([D23,D22,D14],7-o);
	return o;
	}
};
g.off=function(){
  lcd_cmd([0x10]);
  digitalWrite([D23,D22,D14],7);
  g.isOn=false;
};
g.on=function(){
  lcd_cmd([0x11]);
  g.bri.set(g.bri.lv);
  g.isOn=true;

};
g.flip=function(){
  var r=g.getModified(true);
  //print(r);
  if (r === undefined) return;
  var x1=r.x1&0xfe;var x2=(r.x2+2)&0xfe; // for 12bit mode align to 2 pixels
  var xw=(x2-x1);
  var yw=(r.y2-r.y1+1);
  var stride=g.getWidth()*bpp/8;
  lcd_cmd([0x2a,0,x1,0,x2-1]);
  lcd_cmd([0x2b,0,r.y1,0,r.y2]);
  lcd_cmd([0x2c]);
  SPI2.blit_setup(xw,yw,bpp,stride);
  var xbits=x1*bpp;
  var bitoff=xbits%8;
  var aoff=(xbits-bitoff)/8;
  var pa=E.getAddressOf(pal.buffer,true);
  var a=E.getAddressOf(g.buffer,true)+aoff+r.y1*stride; // address of upper left corner
  D25.reset();
  SPI2.blt_pal(a,pa,bitoff,0); // 0=not async, becasuse of CS
  D25.set();
};
module.exports = {
//  pin: pin,
  battVoltage: battVoltage,
  gfx: g
};
});
w=require("P8");
//load
w.gfx.init();
eval(require('Storage').read('handler'));
eval(require('Storage').read('main'));
//require('Storage').list(/m_/).forEach(modfile=>{eval(require('Storage').read(modfile));});
eval(require('Storage').read('m_euc'));
digitalPulse(D16,1,[100,30,100]);
setTimeout(function(){
if (global.face) face.go('main',2);
setTimeout(function(){ if (global.set) set.accR(); },1000); 
digitalPulse(D16,1,[100]);  
},200); 
}
  
