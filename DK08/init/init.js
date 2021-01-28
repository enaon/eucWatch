//fonts
//require('Font7x11Numeric7Seg').add(Graphics);
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

var lastmin=-1;
var volts;
function drawClock(){
  var d=Date();
  volts= volts ? (volts+battVolts())/2:battVolts(); // average until shown
  if (d.getMinutes()==lastmin) return;
  d=d.toString().split(' ');
  var min=d[4].substr(3,2);
  var sec=d[4].substr(-2);
  var tm=d[4].substring(0,5);
  var hr=d[4].substr(0,2);
  lastmin=min;
  g.clear();
  var w=g.getWidth();
  g.setColor(15);
  g.setFont("8x16",1);
  var batt=battInfo(volts);volts=0;// clear average
  g.drawString(batt,w-g.stringWidth(batt)-2,0);
  //var tm=hr+" "+min;
/*
  g.drawString(hr,40-g.stringWidth(hr)/2,10);
  g.drawString(min,40-g.stringWidth(min)/2,80);
*/
  g.setFontVector(62);
  //g.setFontCopasetic40x58Numeric();
  //g.drawString(hr,w/2-g.stringWidth(hr)-5,50);
  //g.drawString(min,w/2+5,50);
  g.drawString(tm,4+(w-g.stringWidth(tm))/2,50);
  //g.setColor(8+4);
  //g.setFontVector(26);
  //if (sec&1)g.drawString("o o",40-g.stringWidth("o o")/2,60);
  //if (sec&1)g.drawString(":",40-g.stringWidth(":")/2,42);
  //if (sec&1)g.drawString(". .",40-g.stringWidth(". .")/2,44);

  g.setFontVector(28);
  g.setColor(8+3);
  var dt=d[0]+" "+d[1]+" "+d[2];//+" "+d[3];
  g.drawString(dt,(w-g.stringWidth(dt))/2,130);
  g.flip();
}
function clock(){
  lastmin=-1;
  drawClock();
  LCD_FastMode(false);
  return setInterval(function(){
    drawClock();
  },1000);
}

var dayhours=Uint8Array([7,19]); // hours when backlight is not needed
function isDark(){
  var h=Date().getHours();
  return h<dayhours[0] || h>dayhours[1];
}

var screens=[clock];
var currscr=0;
var currint=0;
var blt=0;
var initdone=false;
setTimeout(()=>{
  ST7301_INIT();
  setTimeout(()=>{
    ST7301_INIT_NEXT();
    delayms(10);
    lcd_cmd(0x29);
    delayms(20);
    lcd_cmd(0x39);

    //LCD_FastMode(true);
    //LCD_Clear();
    LCD_FastMode(false);
    currint=clock();
    initdone=true;
//    analogWrite(BL,0.25);
//    LCD_FastMode(false);
  },250);//200
},250);//220




