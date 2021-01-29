//fonts
require('Font7x11Numeric7Seg').add(Graphics);
require("Font8x16").add(Graphics);
var VIB=D6;
function vibon(vib){
  if(vib.i>=1)VIB.set();else analogWrite(VIB,vib.i);
  setTimeout(viboff,vib.on,vib);
}
function viboff(vib){
  VIB.reset();
  if (vib.c>1){vib.c--;setTimeout(vibon,vib.off,vib);}
}

vibrate=function(intensity,count,onms,offms){
  vibon({i:intensity,c:count,on:onms,off:offms});
};
var CHPOW=D24; // power attached
var CHDONE=D23; //charging done
CHDONE.mode("input_pullup");

function battState(){
if (!CHPOW.read()) return 0;
return CHDONE.read()?2:1;
}
function battVolts(){
  return 4.20/0.29*analogRead(D5);
}
function battLevel(v){
  var l=3.5,h=4.19;
  v=v?v:battVolts();
  if(v>=h)return 100;
  if(v<=l)return 0;
  return 100*(v-l)/(h-l);
}
function battInfo(v){v=v?v:battVolts();return `${battLevel(v)|0}% ${v.toFixed(2)}V`;}

var dayhours=Uint8Array([7,19]); // hours when backlight is not needed
function isDark(){
  var h=Date().getHours();
  return h<dayhours[0] || h>dayhours[1];
}
/*
rese=reset;
function reset(){
  LCD_FastMode(true);
  rese();
}
*/
setTimeout(()=>{
  ST7301_INIT();
  setTimeout(()=>{
    ST7301_INIT_NEXT();
    delayms(10);
    lcd_cmd(0x29);
    delayms(20);
    lcd_cmd(0x39);
    LCD_FastMode(true);
    //LCD_Clear();
    //g.clear();g.flip();
	initdone=1;
	//LCD_FastMode(false);
	face.go("main",0);
  },200);//200
},220);//220




