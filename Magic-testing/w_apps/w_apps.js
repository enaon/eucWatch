//quick apps for settings menu (swipe up to access settings, swipe up again for apps)
//custom part
UI.ele.ind("top",2,2);
var g=w.gfx;
this.appImgNone='E.toArrayBuffer(atob("AQGBAAA="))';//empty
//App actions
//app1
this.appDo1="face.go('calc',0)";
this.img='E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="))';
UI.btn.img("main","_2x3",1,img,"Calc",15,1);
//app2
if (require("Storage").read("repellent",1)) {
	this.appDo2="face.go('repellent',0)";
	this.img='E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="))';
	UI.btn.img("main","_2x3",2,this.img,"Repel",15,1);
}else UI.btn.img("_2x3",2,this.appImgNone,0,1,1);
//app3
if (global.tpms) {
	this.appDo3="face.go('tpmsFace',0)";
	UI.btn.img("main","_2x3",3,_icon.tpms,"TPMS",15,1);
}else UI.btn.img("_2x3",3,this.appImgNone,0,1,1);
if (!ew.def.bpp) g.flip();
//app4
if (require("Storage").read("hello",1)) {
	this.appDo4="face.go('hello',0)";
	this.img='require("heatshrink").decompress(atob("mEwwIIFn4FKmYFHv/ggYFBgf//kD2cAh/An8B+cAngNB4AFBuAZB8F/gPgAoN4j0DwAFBjkMgYuCh0GgwFCAgMMAoUDg0cAoeGjEHwEegOGmEfFoOA4cwjFgsIFBsBwB4HAsYFL8AFDufADocz4ApDAoI1CPoPAQYgFEn4FKFgIFEPgQABuFgAodgApcx/wFC4AFFjCnCgOAjk4RIWAhhRBAoKdBg/AnilBg8B//4hwTCKAKlBYohJCaIQCBboYFBdIS8DeoJQDv4WCA"))';
	UI.btn.img("main","_2x3",4,this.img,"Hello",15,1);
}else UI.btn.img("_2x3",4,this.appImgNone,0,1,1);
//app5
UI.btn.img("main","_2x3",5,this.appImgNone,0,1,1);
//this.img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAGAAAAAAAPAAAAAAAfAAAAAAAfgAAAAAA9wAAAAAA84AAAAAB+cAAAAAB/OAAAAAB7nAAAAAB5zgAAAAB85wAAAAB+c4AAAAB/OcAAAAB7nOAAAAB5znAAAAB85z4AAP/+c78AB///Of4AH/////wAP/////gA/85//+AAfOc//wAAPnOeAAAABzneAAAAA5z+AAAAAc5+AAAAAOc+AAAAAHOeAAAAADneAAAAABz+AAAAAA5+AAAAAAc8AAAAAAO8AAAAAAH8AAAAAAD4AAAAAAD4AAAAAADwAAAAAABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="));
//g.drawImage(this.img,94,94);
//app6
UI.btn.img("main","_2x3",6,this.appImgNone,0,1,1);
this.img=0;
this.appImgNone=-1;