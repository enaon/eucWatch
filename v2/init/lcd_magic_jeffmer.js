//magic/rock 
//screen driver
//
function ST7789() {
    var LCD_WIDTH = 240;
    var LCD_HEIGHT = 280;
    var XOFF = 0;
    var YOFF = process.env.BOARD=="ROCK"?24:20;
    var INVERSE = 1;
    var cmd = lcd_spi_unbuf.command;

    function dispinit(rst,fn) {
        function delayms(d) {var t = getTime()+d/1000; while(getTime()<t);}
        if (rst) {
            digitalPulse(rst,0,10);
        } else {
            cmd(0x01); //ST7735_SWRESET: Software reset, 0 args, w/delay: 150 ms delay
        }
		/*
        delayms(120);   // no apps to run 
        cmd(0x11); //SLPOUT
        delayms(50);
        //MADCTL: Set Memory access control (directions), 1 arg: row addr/col addr, bottom to top refresh
        cmd(0x36, 0x00);
        //COLMOD: Set color mode, 1 arg, no delay: 16-bit color /5=16,3=12bit
        cmd(0x3a, 0x05);
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
		*/
 delayms(120);   // no apps to run 
        cmd(0x11); //SLPOUT
        delayms(50);
        //MADCTL: Set Memory access control (directions), 1 arg: row addr/col addr, bottom to top refresh
        cmd(0x36, 0x00);
		//cmd([0x37,0,0]);
		// These 2 rotate the screen by 180 degrees
		//[0x36,0xC0],     // MADCTL
		//[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
		cmd(0x3A, 0x05);  // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
        cmd(0xb2, [0x0b, 0x0b, 0x33, 0x00, 0x33]);
		cmd(0xB7, 0x11);     // GCTRL (B7h): Gate Control
		cmd(0xBB, 0x35);  // VCOMS (BBh): VCOM Setting 
		cmd(0xC0, 0x2c);
        cmd(0xc2, 0x01);
        cmd(0xc3, 0x08);
		cmd(0xC4, 0x20);  // VDVS (C4h): VDV Set
		cmd(0xC6, 0x1F);   // VCMOFSET (C5h): VCOM Offset Set .
		cmd(0xD0, [0xA4, 0xA1]);   // PWCTRL1 (D0h): Power Control 1 
		
        // PVGAMCTRL: Positive Voltage Gamma Control
        cmd(0xe0, [0xF0, 0x04, 0x0a, 0x0a, 0x08, 0x25, 0x33, 0x27, 0x3d, 0x38, 0x14, 0x14, 0x25, 0x2a]);
        // NVGAMCTRL: Negative Voltage Gamma Contro
        //cmd(0xe1, [0xf0, 0x05, 0x08, 0x07, 0x06, 0x02, 0x26, 0x32, 0x3d, 0x3a, 0x16, 0x16, 0x26, 0x2c]);
        if (INVERSE) {
        //TFT_INVONN: Invert display, no args, no delay
        cmd(0x21);
        } else {
        //TFT_INVOFF: Don't invert display, no args, no delay
        cmd(0x20);
        }
        //TFT_NORON: Set Normal display on, no args, w/delay: 10 ms delay
        cmd(0x13);
        //TFT_DISPON: Set Main screen turn on, no args w/delay: 100 ms delay
        cmd(0x29);
		
        if (fn) fn();
    }

    function connect(options , callback) {
        var spi=options.spi, dc=options.dc, ce=options.cs, rst=options.rst;
        var g = lcd_spi_unbuf.connect(options.spi, {
            dc: options.dc,
            cs: options.cs,
            height: LCD_HEIGHT,
            width: LCD_WIDTH,
            colstart: XOFF,
            rowstart: YOFF
        });
        g.off = function(){cmd(0x10);cmd(0x28);g.isOn=false;D12.reset();};
        g.on = function(){cmd(0x29);cmd(0x11);g.isOn=true;g.bri.set(4);};
        dispinit(rst, ()=>{g.clear(1).setFont("6x8").drawString("Loading...",20,20);});
		g.bri={
		  lv:((require("Storage").readJSON("ew.json",1)||{}).bri)?(require("Storage").readJSON("ew.json",1)||{}).bri:3,
		  set:function(o){	
			if (o) this.lv=o; else { this.lv++; if (this.lv>7) this.lv=1; o=this.lv; }
			if (this.lv==0||this.lv==7)
			  digitalWrite(D12,(this.lv==0)?0:1);
			else 
			  //analogWrite(BL,(this.lv*42.666)/256);
			  analogWrite(D12,(this.lv*42.666)/256,{freq:4096});
			  //digitalWrite([D23,D22,D14],7-o);
			ew.def.bri=o;
			return o;
		  }
		};
		g.col=Uint16Array([ 0x000,0x31C8,0x5B2F,0xD6BA,0x3276,0x4B16,0x3ADC,0xF165,0xEFBF,0xA815,2220,0x5ff,0x3C0C,0xFFE0,0xD7BF,0xFFFF ]);
		//g.col=Uint16Array([ 0x000,54,2730,3549,1629,83,72,3840,143,3935,2220,0x5ff,115,4080,1535,4095 ]);
		g.theme=  {fg:54,bg:0,fg2:2730,bg2:0,fgH:143,bgH:38400,dark:true};
		g.sc=g.setColor;
		g.setColor=(c,v)=>{g.sc(g.col[v]);}; 
		return g;
    }

    //var spi = new SPI();
    SPI1.setup({sck:D45, mosi:D44, baud: 32000000});

    return connect({spi:SPI1, dc:D47, cs:D3, rst:D2});
}

g = ST7789();

//battery
const batt=function(i,c){
  "ram";
  let v= 4.20/0.60*analogRead(ew.pin.BAT);
  let l=3.5,h=4.19;
  let hexString = ("0x"+(0x50000700+(ew.pin.BAT*4)).toString(16));
  poke32(hexString,2); // disconnect pin for power saving, otherwise it draws 70uA more 	
  if (i==="info"){
    if (c) return ((100*(v-l)/(h-l)|0)+'%-'+v.toFixed(2)+'V'); 
    return (((v<=l)?0:(h<=v)?100:((v-l)/(h-l)*100|0))+'%-'+v.toFixed(2)+'V'); 
  }else if (i) { 
    if (c) return (100*(v-l)/(h-l)|0);
    return ( (v<=l)?0:(h<=v)?100:((v-l)/(h-l)*100|0) );
  }else return +v.toFixed(2);
};
w={gfx:g,batt:batt};