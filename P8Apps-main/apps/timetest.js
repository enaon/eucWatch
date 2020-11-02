// time_fill = 81ms
// time_image = 154ms - no double buffering
// with double buffering 120+120
// time_fill = 82ms
// time_image = 125ms
// with double buffering 60+60
// time_fill = 85ms
// time_image = 111ms

var S = require("Storage");
eval(S.read("lcd.js"));
var g = ST7789();
brightness(3);

setTimeout(()=>{
    g.setFont("6x8",2).drawString("Time Test",20,20);
},500);

function sleep(){
    brightness(0);
    g.lcd_sleep();
}

function time_fill(){
    g.setColor(0x07E0);
    var time= Date.now();
    g.fillRect(0,40,239,199);
    g.flip();
    time = Math.floor(Date.now()-time);
    console.log("Time to Draw Rectangle: "+time+"ms");
}

var pal1color = new Uint16Array([0x0000,0xF100]);
var buf = Graphics.createArrayBuffer(240,160,1,{msb:true});
buf.setColor(1);
buf.fillRect(0,0,239,159);

function time_image(){
    var time= Date.now();
    g.drawImage({width:240,height:160,bpp:1,buffer:buf.buffer, palette:pal1color},0,40);
    g.flip();
    time = Math.floor(Date.now()-time);
    console.log("Time to Draw Image: "+time+"ms");
}
