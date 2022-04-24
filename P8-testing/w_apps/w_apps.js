//quick apps for settings menu (swipe up to access settings, swipe up again for apps)
//custom part
var g=w.gfx;
this.appImgNone=E.toArrayBuffer(atob("AQGBAAA="));//empty
//App actions
//app1
this.appDo1="face.go('calc',0)";
g.setColor(1,1);
g.fillRect(0,0,75,75);
g.setColor(0,15);
this.img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="));
g.drawImage(this.img,13,15);
g.flip();
g.setColor(0,0);
g.clearRect(76,0,79,75);
g.flip();
//app2
g.setColor(1,1);
g.fillRect(80,0,155,75);
g.setColor(0,15);
if (require("Storage").read("repellent",1)) {
	this.appDo2="face.go('repellent',0)";
	this.img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="));
	g.drawImage(this.img,94,15);
}else g.drawImage(this.appImgNone,94,15);
g.flip();
//app3
g.setColor(1,1);
g.fillRect(160,0,239,75);
g.setColor(0,15);
if (global.tpms) {
	this.appDo3="face.go('tpmsFace',0)";
	var img = E.toArrayBuffer(atob("MDCBAf////////////////////////8H///wf/8H///wf/8H///wf/8P/j/4f/8P/B/4f/4P/B/4P/4f/B/8P/4f/B/8P/w//B/+H/h//B//D/h//B//D/D//B//h/H//B//x/H//B//x+P//B//4+P//B//4+P//B//48f//B//8cf//B//8cf//B//8cf//B//8cf//B//8cf//B//8cf//B//8cf//3//8cf/////8cf/////8eP/////4+P/////4+P//j//4+H//B//w/H//B//x/D//B//x/j//B//j/h//j//D/x/////H/w////+H/4f///8P/4AAAAAP/4AAAAAP/8AAAAAf/8DDBhgf/8HDjhwf/8HDjhwf////////w=="));
	g.drawImage(this.img,176,15);
}else g.drawImage(this.appImgNone,176,15);
g.flip();
//app4
//this.appDo4="face.go('hello',0)";
g.setColor(1,1);
g.fillRect(0,80,75,155);
g.setColor(0,15);
if (require("Storage").read("hello",1)) {
	this.appDo4="face.go('hello',0)";
	this.img=require("heatshrink").decompress(atob("mEwwIIFn4FKmYFHv/ggYFBgf//kD2cAh/An8B+cAngNB4AFBuAZB8F/gPgAoN4j0DwAFBjkMgYuCh0GgwFCAgMMAoUDg0cAoeGjEHwEegOGmEfFoOA4cwjFgsIFBsBwB4HAsYFL8AFDufADocz4ApDAoI1CPoPAQYgFEn4FKFgIFEPgQABuFgAodgApcx/wFC4AFFjCnCgOAjk4RIWAhhRBAoKdBg/AnilBg8B//4hwTCKAKlBYohJCaIQCBboYFBdIS8DeoJQDv4WCA"));
	g.drawImage(this.img,13,94);
}else g.drawImage(this.appImgNone,13,94);

g.flip();
//app5
//this.appDo5="face.go('life',0)";
g.setColor(1,1);
g.fillRect(80,80,155,155);
g.setColor(0,15);
g.drawImage(this.appImgNone,94,94);
g.flip();
//this.img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAGAAAAAAAPAAAAAAAfAAAAAAAfgAAAAAA9wAAAAAA84AAAAAB+cAAAAAB/OAAAAAB7nAAAAAB5zgAAAAB85wAAAAB+c4AAAAB/OcAAAAB7nOAAAAB5znAAAAB85z4AAP/+c78AB///Of4AH/////wAP/////gA/85//+AAfOc//wAAPnOeAAAABzneAAAAA5z+AAAAAc5+AAAAAOc+AAAAAHOeAAAAADneAAAAABz+AAAAAA5+AAAAAAc8AAAAAAO8AAAAAAH8AAAAAAD4AAAAAAD4AAAAAADwAAAAAABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="));
//g.drawImage(this.img,94,94);
g.flip();
//app6
g.setColor(1,1);
g.fillRect(160,80,239,155);
g.setColor(0,15);
if (require("Storage").read("w_testTP",1)) {
	this.appDo6="face.go('w_testTP',0)";
	img = require("heatshrink").decompress(atob("nE4wIifwAGLsGDAwkwwwGEjEMAwkIEIsD8AFDgPHuPABgfmmYOEhkYDYgG/j5+EAwJaDCgX+Awt/YIYGBsf4AwN+AwNh7gGB44GCTYXDxgGE4PMAwlg9kQAwl8gAGDmE8UYIGCjEcAYMGAQMcYQQGChkEAwgCCAYcDAwx0CAwUBAwsAPYQGDsAGFuAGFmA7CAwSmCAwYDCWAcOSwQGCg4lEH4PggK2E///Ygkf/jSEACIA=="));
	g.drawImage(this.img,176,94);
}else g.drawImage(this.appImgNone,176,94);

g.flip();
this.img=0;
this.appImgNone=-1;