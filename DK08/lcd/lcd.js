// MIT License (c) 2020 fanoush https://github.com/fanoush
// see full license text at https://choosealicense.com/licenses/mit/
var SPI2 = (function(){
  var bin=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8QtQNMfEQigGCAoYDjgBC92P///wdLe0QbiUOxBEoTaAAr/NAAIxNgA0p6RBOBcEcYMQJAxv///7L///8t6fBHkEYZTBlO//fl/xlK3/hkwAAjASUTYE/w/w5TYKlGI2AQMh9G/ykA6wMKwvgAoIu//zMxYMb4AOAAIYi//znM+ACQuPEADwbQKbkLS3tEHYEAIL3o8IfU+ACguvEAD/rQJ2AAKd7R8+cYMQJASDUCQDQ1AkAQMAJAUP///y3p8E+TRldKnbB6RAKRkvgAoAZGACgA8J6AACkA8JuACvH/MwcrAPKWgAEjA/oK8wE727IDk4McAJMEeEN4svgEgETqAyTTaET6C/SksguxQkoTYERLe0QEkwqrBpNDS0/wAAl7RElGE6gHkwSbW4gBkwmrXUYFkwAiA5sCnyNAVUT7XAWf7bIHLdNVRPoK9FHYpLIBMgQq79Gd+CXAnfgkIE/qLBND6oIDnfgmIENUQxgfRpMQQ+oME3twnfgnMEPqghIBmwHxAg4EOwMxm7IjKQD4DiABkwndASL/91D/2fEBCRO/BphJRhOoACEBmwArwdEHm9uIHkSzHACTNHhzeAjx/zhE6gMkRPoL9B/6iPiksrjxAA+o0cmxQkb/9y//E0t7RNhoELENSxhgACAdsL3o8I8Anwg9F/gBOwCX7bLF8QgMA/oM8xxDpLKh5//3Av/l50/w/zDp5wwFAFAIBQBQFv///8r+//+8/v///P3//xVKekRwtQ5GEWkFRuGxEEsZYNJoArEaYAAiASEoRv/39f4OSwtMe0QBLhppImAE3QAicR5oHP/36f4JS3tE2GgIsSBgACBwvU/w/zD75wC/DAUAUAgFAFCq/f//hv3//3D9//8TtQAoHtsAKaa/jfgFEAIkASQAKqS/AqkJGY34BACkvwE0AfgELAAror8CqhIZATQhRgGoqL8C+AQ8//ev/yBGArAQvQAk+udwtQVGiLFGGAAkKEYQ+AEbGbFFGLVCAtlkQiBGcL3/95n/ACj50QE07+cERvXnAAAPSjC1FGjEuQ5LG2gLsQ5MI2ARSw1Me0QABl1pJWCdaWVg3GkKS0kAHGBYYVlkByMTYAhLASAYYDC9T/D/MPvnADUCQAQzAkAIMwJACDUCQBA1AkAUMAJAuvz//wVKACMTYKL1fnITYANLG2gLscL4ADJwRwA1AkAEMwJAELUGTHxExOkFAQEhAfoC8gH6A/PiYCNhEL0Av1D8//8=");
  return {
    cmd:E.nativeCall(593, "int(int,int)", bin),
    cmds:E.nativeCall(765, "int(int,int)", bin),
    cmd4:E.nativeCall(693, "int(int,int,int,int)", bin),
    setpins:E.nativeCall(937, "void(int,int,int,int)", bin),
    enable:E.nativeCall(813, "int(int,int)", bin),
    disable:E.nativeCall(905, "void()", bin),
    blit_setup:E.nativeCall(33, "void(int,int,int,int)", bin),
    blt_pal:E.nativeCall(221, "int(int,int,int)", bin),
  };
})();

//DK08 LCD pins
CS=D18;DC=D19;RST=D15;BL=D13;
CLK=D17;MOSI=D16;PWR=D11;
//fontchip SPI pins
FCS=D27;//FMOSI=D30;FMISO=D31;FCLK=D29;
var fc=new SPI();fc.setup({sck:D29,miso:D31,mosi:D30,mode:0});
//fc.send([0xab],FCS);//wake fontchip from deep sleep
//fc.send([0x90,0,0,1,0,0],FCS) // get flash id
//fc.send([0x9f,0,0,0],FCS); //get flash id
fc.send([0xb9],FCS); // put to deeep sleep
//HR sensor over i2c
//HPWR=D14;HSCL=D22;HSDA=D20;
//BMA253 SPI accelerometer
//AI1=D4;AI2=D3;ACS=D2;AMOSI=D30;AMISO=D31;ACLK=D22;APWR=D7;
//
function LCD_Init_Off(){
  // LCD pins init + reset/turn off
  BL.reset();
  RST.reset();
  CLK.write(0);MOSI.write(0);CS.write(0);DC.write(0);
  PWR.set();
}
function LCD_Init(){
  // pins init reset done + power up
  CS.set();CLK.set();MOSI.set();DC.set();
  RST.set();
  PWR.reset();
}
E.kickWatchdog();
LCD_Init_Off();
//SPI2.save();
SPI2.setpins(CLK,MOSI,CS,DC);
//SPI2.disable();
function toFlatString(arr){
  var b=E.toString(arr);if (b) return b;
  print("toFlatString() fail&retry!");E.defrag();b=E.toString(arr);if (b) return b;
  print("fail&retry again!");E.defrag();b=E.toString(arr);if (b) return b;
  print("failed!"); return b;
}

function lcd_cmd(a){
  var l=a.length;
  if (!l)return SPI2.cmd4(a,-1,-1,-1);
  if (l==2)return SPI2.cmd4(a[0],a[1],-1,-1);
  if (l==3)return SPI2.cmd4(a[0],a[1],a[2],-1);
  if (l==4)return SPI2.cmd4(a[0],a[1],a[2],a[3]);
  if (l==1)return SPI2.cmd4(a[0],-1,-1,-1);
  var b=toFlatString(a);
  SPI2.cmd(E.getAddressOf(b,true),b.length);
}

function lcd_cmds(arr){
  var b=toFlatString(arr);
  var c=SPI2.cmds(E.getAddressOf(b,true),b.length);
  if (c<0)print('lcd_cmds: buffer mismatch, cnt='+c);
  return c;
}

function ST7301_INIT(){
return lcd_cmds(
  //new Uint8Array(
  [
    2, 0xeb, 0x2,//
    2, 0xd7, 0x68,//
    2, 0xd1, 0x1, //
    3, 0xe8, 0x55, 0x06,//
    2, 0xc0, 0xe5,//
    3, 0xb2, 0x0, 0, //1,0x2,// refresh rates in hp (25,50Hz) lp (1/4,1/2,1,2,4,8Hz) modes
    11, 0xb4, 0xc5,0x77,0xf1,0xff,0xff,0x4f,0xf1,0xff,0xff,0x4f,
    2, 0xb7, 0,
    2, 0xb0, 0x59,
    1, 0x11, // sleep out
0]
//)
  );
}
function ST7301_INIT_NEXT(){
return lcd_cmds(
  //new Uint8Array(
  [
    3, 0xc7, 0x80, 0xe9,// framerate 25/50Hz
    2, 0xd6, 0x1,//
    2, 0xcb, 0x15,//
    2, 0x36, 0x48,//
    2, 0x3a, 0x11,// 10= 4px=4bytes (LCD_BPP=8), 11 4px=3bytes (LCD_BPP=6)
    5, 0x72, 0x20, 0x4, 0x80, 0xfa,// de-stress

    3, 0xb5, 2, 0,
    2, 0xb9, 0x23,
    2, 0xb8, 0x8,

//    3, 0x2a, 8, 0x33,
//    3, 0x2b, 0, 0xaf,
//    2, 0x35, 0,// TE on
    1, 0x34, // TE off 
    2, 0xd0, 0x1f,//
    1, 0x38,
    2, 0xd8, 0x1,//
    2, 0xc4, 0xb1,//
    2, 0xd8, 0x3,//
    2, 0xe3, 0x2,//
    //1, 0x3c,
  //
0]
//)
  );
}

function delayms(ms){
  digitalPulse(DC,0,ms);digitalPulse(DC,0,0);
}

var mode;
function LCD_FastMode(on){
 if (mode===on) return;
 if (on){
   lcd_cmd(0x38); // high power mode
   delayms(125);
   //lcd_cmd([0xcb,0x15]); // VCOMH voltage to 4.05V
   lcd_cmd([0xd6,0x1]); // change voltage source to vsh/vsl 1
   delayms(40);
 } else {
   //return; //disable for now
   //lcd_cmd([0xcb,0x1f]); raise VCOMH voltage to 4.55V for high power mode, why when we are switching to low power mode?)
   lcd_cmd([0xd6,0x3]); // change voltage source to vsh/vsl 3
   delayms(40);
   lcd_cmd(0x39); // low power mode on
 }
 mode=on;
}
/*
var lcd_on=0;
function LCD_Off(){
  if (lcd_on){
   lcd_cmd([0x38);
    // delay 0xfa - 250ms
  }
   lcd_cmd([0xd6,0xd0]);
   lcd_cmd([0xbd,1]);
   lcd_cmd([0x75,1]);
   lcd_cmd(0x28);
   lcd_cmd(0x10);
  //delay 100ms
  lcd_on=0;
}
function LCD_SleepIn(){
   lcd_cmd(0x29);
   lcd_cmd(0x10);
}

function LCD_AllDown(){
   lcd_cmd(0x28);
  LCD_Init_Off();
}
*/
E.kickWatchdog();
LCD_Init();
SPI2.enable(0x80,0); //8MBit, mode 0
//digitalPulse(RST,0,10);
//delayms(10);
// http://forum.espruino.com/conversations/316409/
// size of <23 bytes Uint8Array does not create flat string
// we need flat arrays to pass to native InlineC code
function toFlatBuffer(a){return E.toArrayBuffer(toFlatString(a));}

var bpp=4;
var g=Graphics.createArrayBuffer(176,176,bpp);
var pal;
switch(bpp){
  case 2: pal= new Uint8Array(toFlatBuffer([0x00,0xc0,0x30,0x0c]));break; // white won't fit
//  case 1: pal= new Uint8Array([0x00,0xff]);break;
  case 1:
    // same as 16color below, use for dynamic colors
  pal= new Uint8Array(toFlatBuffer(
//    [0x00,0x08,0x20,0x28,0x80,0x88,0x90,0xa8,
//    0x54,0x5c,0x74,0x7c,0xf4,0xdc,0xf4,0xfc]
    [0,0x2,0x8,0xa,0x20,0x22,0x24,0x2a,0x15,0x17,0x1d,0x1f,0x3d,0x37,0x3d,0x3f]
 ));
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
  case 4: pal=
    // CGA
    new Uint8Array(toFlatBuffer([
    // function RGB444to222(r,g,b){return(((r>>2)<<6)|((g>>2)<<4)|((b>>2)<<2)).toString(16);}
//  CGA palette 6bit RGB222
    0,0x2,0x8,0xa,0x20,0x22,0x24,0x2a,0x15,0x17,0x1d,0x1f,0x3d,0x37,0x3d,0x3f
    ]));break;
    case 6:
    pal = new Uint8Array(64);
    for(var i=0;i<64;i++) pal[i]=i<<2;
}
// preallocate setwindow command buffer for flip
g.winCmd=toFlatBuffer([
  3, 0x2a, 0, 0,
  3, 0x2b, 0, 0,
  1, 0x2c,
  0 ]);
// precompute addresses for flip
g.winA=E.getAddressOf(g.winCmd,true);
g.palA=E.getAddressOf(pal.buffer,true); // pallete address
g.buffA=E.getAddressOf(g.buffer,true); // framebuffer address
g.stride=g.getWidth()*bpp/8;
g.flip=function(){
  var r=g.getModified(true);
  //print(r);
  if (r === undefined) return;
  var x1=r.x1&0xfc;var x2=(r.x2+4)&0xfc; //align to 4 pixels 
  var xw=(x2-x1);
  var yw=(r.y2-r.y1+1);
  if (xw<1||yw<1) {print("empty rect ",xw,yw);return;}
  var c=g.winCmd;
  c[2]=8+(x1>>2);c[3]=8+(x2>>2)-1; //0x2a params
  c[6]=r.y1;c[7]=r.y2; // 0x2b params
  SPI2.blit_setup(xw,yw,bpp,g.stride);
  var xbits=x1*bpp;
  var bitoff=xbits%8;
  var addr=g.buffA+(xbits-bitoff)/8+r.y1*g.stride; // address of upper left corner
  //VIB.set();//debug
  SPI2.cmds(g.winA,c.length);
  SPI2.blt_pal(addr,g.palA,bitoff);
  //VIB.reset();//debug
};

g.bl=function(bl){
  if (bl>=1) BL.set();
  else if (bl<=0) BL.reset();
  else analogWrite(BL,bl);
};



