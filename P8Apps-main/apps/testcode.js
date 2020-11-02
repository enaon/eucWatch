E.enableWatchdog(15, true);
var S = request("Storage");
eval(S.read("lcd.js"));
var g = ST7789();
brightness(4);
