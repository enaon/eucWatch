// MIT License (c) 2020 fanoush https://github.com/fanoush
// see full license text at https://choosealicense.com/licenses/mit/
// Magic3-Rock 
E.setFlags({ pretokenise: 1 });
ew.is.dddm = 12;
Modules.addCached("eucWatch", function() {
  //screen driver
  // compiled with options LCD_BPP=12,SHARED_SPIFLASH,SPIFLASH_CS=(1<<5)
  var SPI2 = (function() {
    "ram";
    var bin = atob("//////////8AAAAAAAAAAP////8AAAAAAAAAAAAAAL8QtQZMfETE6QABIDsBIQH6AvKZQKJg4WAQvQC/2P///wZLACLD+AAlw/gIIQEiWmDT+AQjCrHD+AgjcEcA8AJAEkvT+AAlELXqudP4BCMKscP4CCMOSnpEAAYUaMP4CEVUaMP4DEUSacP4ECVJAE/w/zLD+BQlw/hsJcP4JAXD+FQVASAQvU/w/zD75wDwAkCG////CEt7RJuKU7EFStL4GDEAK/vQACPC+BgxA0p6RJOCcEcA8AJARv///y7///8QtQNMfETigiCDYYOjgxC9GP////i1FUb/99z/FEsAJMP4NEX/J8P4OEUBIsP4GEEmRv8pAOsEDMP4RMWLv/80w/hIFcP4SHUAIYi//zkaYSWxGbkHS3tEmoL4vdP4GMG88QAP+tDD+BhhACnh0fTnAPACQMb+//8bSnpEOLUMRtFoWbMXTQcjxfgANU/woEPD+AwYkmgKscP4DCUAIgEh//e4/xFLe0QBLNpoT/CgQ8P4CCgE3QAiYR4BMP/3qv8LS3tEm2gbsU/woELC+Ag1ACABI8X4AAVrYDi9T/D/MPvnAL8A8AJAov7//3b+//9a/v//cLUERoixRhgAJSBGEPgBGxmxRBi0QgLZbUIoRnC9//ex/wAo+dEBNe/nBUb15xO1ACgd2wAppr+N+AUQAiQBJAAqob8CqQkZATQB+AQsACuivwKqEhkBNI34BACovwL4BDwhRgGo//eN/yBGArAQvQAk+uct6fBPobDN6QESU0p6RAdGkvgWkAAoAPCZgAApAPCWgAnx/zMHKwDykYABIwP6CfMBOwVG27I1+AJLA5MCm0VJsvgagBxBByPB+AA1k2ikshuxT/CgQsL4DDVP6kkD27IEkz5Le0QUqAWTCKvN6QYwT/AAC1lGBZsCnrP4GKADmwGaI0BE+gn0MvgTwAObI0BE+gn0MvgTIASbHkT2sgcugb8IPhX4ATv2ssbxCA6EvwP6DvMcQ0/qHBNDVBMKAfECDkPqDBxDGAMxqvECCi8pg/gBwKSyAPgOIB/6ivoJ3QEi//fj/tvxAQsLvweYBphZRgAhuvEAD8HRGUt7RAjx/zibix9EPUYCmzX4Aksf+oj4HEGksrjxAA+s0ZmxQkb/98T+D0t7RJtoG7FP8KBCwvgINQdKACABI8L4AAVTYCGwvejwj//3kf7r50/w/zD25wC/APACQKj9//9Q/f//uPz//478//8=");
    return {
      cmd: E.nativeCall(345, "int(int,int)", bin),
      cmds: E.nativeCall(469, "int(int,int)", bin),
      cmd4: E.nativeCall(515, "int(int,int,int,int)", bin),
      setpins: E.nativeCall(33, "void(int,int,int,int)", bin),
      enable: E.nativeCall(97, "int(int,int)", bin),
      disable: E.nativeCall(65, "void()", bin),
      blit_setup: E.nativeCall(225, "void(int,int,int,int)", bin),
      blt_pal: E.nativeCall(585, "int(int,int,int)", bin),
    };
  })();

  // this method would produce code string that can replace bin declaration above with heatshrink compressed variant
  // however it seems the gain is very small so is not worth it
  //    shrink:function(){return `var bin=E.toString(require("heatshrink").decompress(atob("${btoa(require("heatshrink").compress(bin))}")))`;}
  //*/
  E.kickWatchdog();

  D7.write(1); // turns off HR red led
  //MAGIC3 pins
  CS = D3;
  DC = D47;
  RST = D2;
  BL = D12;
  SCK = D45;
  MOSI = D44;
  RST.reset();
  // CLK,MOSI,CS,DC
  SCK.write(0);
  MOSI.write(0);
  CS.write(1);
  DC.write(1);
  SPI2.setpins(SCK, MOSI, CS, DC);
  SPI2.enable(0x14, 0); //32MBit, mode 0

  function delayms(ms) {
    "ram";
    digitalPulse(DC, 0, ms);
    digitalPulse(DC, 0, 0); // 0=wait for previous
  }

  function toFlatString(arr) {
    "ram";
    var b = E.toString(arr);
    if (b) return b;
    print("toFlatString() fail&retry!");
    E.defrag();
    b = E.toString(arr);
    if (b) return b;
    print("fail&retry again!");
    E.defrag();
    b = E.toString(arr);
    if (b) return b;
    print("failed!");
    return b;
  }

  function toFlatBuffer(a) { return E.toArrayBuffer(toFlatString(a)); }

  function cmd(a) {
    "ram";
    var l = a.length;
    if (!l) return SPI2.cmd4(a, -1, -1, -1);
    if (l == 2) return SPI2.cmd4(a[0], a[1], -1, -1);
    if (l == 3) return SPI2.cmd4(a[0], a[1], a[2], -1);
    if (l == 4) return SPI2.cmd4(a[0], a[1], a[2], a[3]);
    if (l == 1) return SPI2.cmd4(a[0], -1, -1, -1);
    var b = toFlatString(a);
    SPI2.cmd(E.getAddressOf(b, true), b.length);
  }

  function cmds(arr) {
    "ram";
    var b = toFlatString(arr);
    var c = SPI2.cmds(E.getAddressOf(b, true), b.length);
    if (c < 0) print('lcd_cmds: buffer mismatch, cnt=' + c);
    return c;
  }

  RST.set();

  function init(bppi) {
    "ram";
    cmd(0x01); //ST7735_SWRESET: Software reset, 0 args, w/delay: 150 ms delay
    delayms(120); // no apps to run 
    cmd(0x11); //SLPOUT
    delayms(50);
    //MADCTL: Set Memory access control (directions), 1 arg: row addr/col addr, bottom to top refresh
    cmd(0x36, 0x00);
    //COLMOD: Set color mode, 1 arg, no delay: 16-bit color /5=16,3=12bit
    cmd([0x3a, 0x03]);
    //PORCTRL: Porch control
    cmd(0xb2, [0x0b, 0x0b, 0x33, 0x00, 0x33]);
    //GCTRL: Gate control
    cmd(0xb7, 0x11);
    // VCOMS: VCOMS setting
    cmd(0xbb, 0x35);
    //LCMCTRL: CM control
    cmd(0xc0, 0x2c);
    //VDVVRHEN: VDV and VRH command enable
    cmd(0xc2, 0x01);
    // VRHS: VRH Set
    cmd(0xc3, 0x08);
    // VDVS: VDV Set
    cmd(0xc4, 0x20);
    //VCMOFSET: VCOM Offset Set .
    cmd(0xC6, 0x1F);
    //PWCTRL1: Power Control 1
    cmd(0xD0, [0xA4, 0xA1]);
    // PVGAMCTRL: Positive Voltage Gamma Control
    //cmd(0xe0, [0xF0, 0x04, 0x0a, 0x0a, 0x08, 0x25, 0x33, 0x27, 0x3d, 0x38, 0x14, 0x14, 0x25, 0x2a]);
    cmd([0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]); // PVGAMCTRL (E0h): Positive Voltage Gamma Control
    cmd([0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]); // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
    // NVGAMCTRL: Negative Voltage Gamma Contro
    // NVGAMCTRL: Negative Voltage Gamma Contro
    // cmd(0xe1, [0xf0, 0x05, 0x08, 0x07, 0x06, 0x02, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]);
    //TFT_INVONN: Invert display, no args, no delay
    cmd(0x21);
    //TFT_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    cmd(0x13);
    //TFT_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    cmd(0x29);


    //cmd([0x35, 0]);
    //cmd(0x2a,[0,0,0,239]);
    //cmd(0x2b,[0,0,0,279]);
    //cmd([0x2c]);

  }

  var bpp = (require("Storage").read("ew.json") && require("Storage").readJSON("ew.json").bpp) ? require("Storage").readJSON("ew.json").bpp : 1;
  if (require('Storage').read('.displayM')) bpp=4;//V1 support
  var g = Graphics.createArrayBuffer(240, 280, bpp);
  var pal;
  g.sc = g.setColor;

  // 16bit RGB565  //0=black,1=dgray,2=gray,3=lgray,4=raf,5=raf1,6=raf2,7=red,8=blue,9=purple,10=?,11=green,12=olive,13=yellow,14=lblue,15=white
  // 16bit RGB565  //0=black,1=dgray,2=red,3=lgray,4=raf,5=raf1,6=raf2,7=red,8=green,9=purple,10=?,11=green,12=olive,13=yellow,14=blue,15=white

  //g.col=Uint16Array([ 0x000,0x31C8,0x5B2F,0xD6BA,0x3276,0x4B16,0x3ADC,0xF165,0xEFBF,0xA815,2220,0x5ff,0x3C0C,0xFFE0,0xD7BF,0xFFFF ]);
  //g.col=Uint16Array([  0,31,2016,2016,31,2047,0,63488,63519,63519,   31,63519,63519,65504,  65535,65535]);


  // 16bit RGB565  //0=black,1=dgray,2=gray,3=lgray,4=raf,5=raf1,6=raf2,7=red,8=blue,9=purple,10=?,11=green,12=olive,13=yellow,14=lblue,15=white
  //g.col=Uint16Array([ 0x000,54,2730,3549,1629,83,72,3840,143,3935,2220,0x5ff,115,4080,1535,4095 ]);

  // 16bit RGB565  //0=black,1=dgray,2=gray,3=lgray,4=raf,5=dgreen,6=dark2,7=green,8=blue,9=purple,10=?,11=lblue,12=olive,13=red,14=yellow,15=white
  //g.col=Uint16Array([ 0x000,54,2220,3549,1629,83,72,0x0d0,143,3935,2220,0x5ff,115,3840,1535,4095 ]);
  //g.col=Uint16Array([ 0x000,54,2220,3549,1629,83,72,0x0d0,143,3935,2220,0x5ff,115,3840,4080,4095 ]);
  //g.col = Uint16Array([0x000, 54, 2220, 3549, 1629, 83, 72, 0x0d0, 143, 3935, 2220, 0x5ff, 143, 3840, 4080, 4095]);
  g.col = Uint16Array([0x000, 1365, 2730, 3549, 1629, 2474, 1963, 0x0d0, 143, 3935, 2220, 1535, 170, 3840, 4080, 4095]);


  //2730 old gray
  //1622 dgray 1610 dbue 1655-good grey 1672  dblack 50,68.85  115, 152 green
  //54,
  /*
  red e84417
  gred 0ed145
  blue 00a8f3 , 0962c8

  purple e85521
  */
  switch (bpp) {
    case 1:
      pal = Uint16Array([0x000, 4095]);
      //let sc = g.setColor;
      g.setColor = function(c, v) {
        if (c == 1) pal[1] = g.col[v];
        else pal[0] = g.col[v];
        g.sc(c);
      };
      break;
    case 2:
      pal = Uint16Array([0x000, 1365, 1629, 1535]); // white won't fit
      g.buffer = new ArrayBuffer(16800);
      break;
    case 4:
      g.buffer = new ArrayBuffer(33600);
      pal = g.col;
      g.setColor = (c, v) => { g.sc(v); };
      break;
  }
  // preallocate setwindow command buffer for flip
  g.winCmd = toFlatBuffer([
    5, 0x2a, 0, 0, 0, 0,
    5, 0x2b, 0, 0, 0, 0,
    1, 0x2c,
    0
  ]);
  /*
    cmd([0x2a,0,x1,0,x2-1]);
    cmd([0x2b,0,r.y1,0,r.y2]);
    cmd([0x2c]);
  */
  // precompute addresses for flip
  g.winA = E.getAddressOf(g.winCmd, true);
  g.palA = E.getAddressOf(pal.buffer, true); // pallete address
  g.buffA = E.getAddressOf(g.buffer, true); // framebuffer address
  g.stride = g.getWidth() * bpp / 8;
  
  if (require('Storage').read('.displayM')){  //V1 support
    g.lala=g.fillRect;
    g.fillRect=function(x,y,x1,y1){
      g.lala(5+x*0.74,y+30,5+x1*0.74,y1+30);
    };
    g.lal3=g.clearRect;
    g.clearRect=function(x,y,x1,y1){
      g.lal3(5+x*0.74,y+30,5+x1*0.74,y1+30);
    };
    g.lal4=g.drawLine;
    g.drawLine=function(x,y,x1,y1){
      g.lal4(5+x*0.74,y+30,5+x1*0.74,y1+30);
    };    
    g.lal1=g.drawString;
    g.drawString=function(t,x,y){
      g.lal1(t,5+x*0.74,y+30);
    };
    g.lal2=g.drawImage;
    g.drawImage=function(t,x,y,o){
      g.lal2(t,5+x*0.74,y+30,o);
    };  
    g.lal5=g.setFont;
    g.setFont=function(f,s){
      g.lal5(f,s*0.74);
    };
    
  }
  g.flip = function(force) {
    "ram";
    var r = g.getModified(true);
    if (force)
      r = { x1: 0, y1: 0, x2: this.getWidth() - 1, y2: this.getHeight() - 1 };
    if (r === undefined) return;
    var x1 = r.x1 & 0xfe;
    var x2 = (r.x2 + 2) & 0xfe; // for 12bit mode align to 2 pixels
    var xw = (x2 - x1);
    var yw = (r.y2 - r.y1 + 1);
    if (xw < 1 || yw < 1) { print("empty rect ", xw, yw); return; }
    var c = g.winCmd;
    c[3] = x1;
    c[5] = x2 - 1; //0x2a params
    var y = r.y1 + 20;
    c[9] = y % 256;
    c[8] = y >> 8;
    y = r.y2 + 20;
    c[11] = y % 256;
    c[10] = y >> 8; // 0x2b params
    SPI2.blit_setup(xw, yw, bpp, g.stride);
    var xbits = x1 * bpp;
    var bitoff = xbits % 8;
    var addr = g.buffA + (xbits - bitoff) / 8 + r.y1 * g.stride; // address of upper left corner
    //VIB.set();//debug
    SPI2.cmds(g.winA, c.length);
    SPI2.blt_pal(addr, g.palA, bitoff);
    //VIB.reset();//debug
  };

  g.isOn = false;
  init();

  g.on = function() {
    "ram";
    if (this.isOn) return;
    cmd(0x11);
    g.flip();
    //cmd(0x13); //ST7735_NORON: Set Normal display on, no args, w/delay: 10 ms delay
    //cmd(0x29); //ST7735_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
    this.isOn = true;
    this.bri.set(this.bri.lv);
    //this.setBrightness();
  };

  g.off = function() {
    "ram";
    if (!this.isOn) return;
    //cmd(0x28);
    cmd(0x10);
    BL.reset();
    this.isOn = false;
  };

  g.bri = {
    lv: ((require("Storage").readJSON("ew.json", 1) || {}).bri) ? (require("Storage").readJSON("ew.json", 1) || {}).bri : 3,
    set: function(o) {
      if (o) this.lv = o;
      else { this.lv++; if (this.lv > 7) this.lv = 1;
        o = this.lv; }
      if (this.lv == 0 || this.lv == 7)
        digitalWrite(BL, (this.lv == 0) ? 0 : 1);
      else
        //analogWrite(BL,(this.lv*42.666)/256);
        analogWrite(BL, (this.lv * 42.666) / 256, { freq: 4096 });
      //digitalWrite([D23,D22,D14],7-o);
      ew.def.bri = o;
      return o;
    }
  };
  //battery
  const batt = function(i, c) {
    "ram";
    let v = 4.20 / 0.60 * analogRead(ew.pin.BAT);
    let l = 3.5,
      h = 4.19;
    let hexString = ("0x" + (0x50000700 + (ew.pin.BAT * 4)).toString(16));
    poke32(hexString, 2); // disconnect pin for power saving, otherwise it draws 70uA more 	
    if (i === "info") {
      if (c) return ((100 * (v - l) / (h - l) | 0) + '%-' + v.toFixed(2) + 'V');
      return (((v <= l) ? 0 : (h <= v) ? 100 : ((v - l) / (h - l) * 100 | 0)) + '%-' + v.toFixed(2) + 'V');
    }
    else if (i) {
      if (c) return (100 * (v - l) / (h - l) | 0);
      return ((v <= l) ? 0 : (h <= v) ? 100 : ((v - l) / (h - l) * 100 | 0));
    }
    else return +v.toFixed(2);
  };
  module.exports = {
    batt: batt,
    gfx: g
  };
});
