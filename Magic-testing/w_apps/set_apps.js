TC.removeAllListeners("tcT");
face[0].btn={};
UI.ele.ind("top",2,2);
let img;
if (require("Storage").read("calc",1)) {
	img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="));
	UI.btn.img("_2x3",1,img,"Calc",15,1);
}else UI.ele.fill("_2x3",1,1);
//app2
if (require("Storage").read("repellent",1)) {
	img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="));
	UI.btn.img("_2x3",2,img,"Repel",15,1);
}else UI.ele.fill("_2x3",2,1);
//app3
if (global.tpms) {
	img=require("heatshrink").decompress(atob("mEwwIWT/ACBh+AApnwgPAg4FCgfgAoMBAofAgPgAoMDAowBC8AJBDIIFBEIIFFh8AAoV4hwFDnAFFjgFDjgFLnAFDhwFlgB7BAoYABAoxBBAARHCAoqbBAoMeFIc8NYp9EnEHAodwV4QdBWII/BAAKpCAgKnBAIIFBXIX/AAQFGgAFDEIP8+fnz7vC+PHx4FHAAg"));
	UI.btn.img("_2x3",3,img,"TPMS",15,1);
}else UI.ele.fill("_2x3",3,1);
//app4
if (require("Storage").read("hello",1)) {
	img=require("heatshrink").decompress(atob("mEwwIIFn4FKmYFHv/ggYFBgf//kD2cAh/An8B+cAngNB4AFBuAZB8F/gPgAoN4j0DwAFBjkMgYuCh0GgwFCAgMMAoUDg0cAoeGjEHwEegOGmEfFoOA4cwjFgsIFBsBwB4HAsYFL8AFDufADocz4ApDAoI1CPoPAQYgFEn4FKFgIFEPgQABuFgAodgApcx/wFC4AFFjCnCgOAjk4RIWAhhRBAoKdBg/AnilBg8B//4hwTCKAKlBYohJCaIQCBboYFBdIS8DeoJQDv4WCA"));
	UI.btn.img("_2x3",4,img,"Hello",15,1);
}else  UI.ele.fill("_2x3",4,1);
//app5
UI.ele.fill("_2x3",5,1);//img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAGAAAAAAAPAAAAAAAfAAAAAAAfgAAAAAA9wAAAAAA84AAAAAB+cAAAAAB/OAAAAAB7nAAAAAB5zgAAAAB85wAAAAB+c4AAAAB/OcAAAAB7nOAAAAB5znAAAAB85z4AAP/+c78AB///Of4AH/////wAP/////gA/85//+AAfOc//wAAPnOeAAAABzneAAAAA5z+AAAAAc5+AAAAAOc+AAAAAHOeAAAAADneAAAAABz+AAAAAA5+AAAAAAc8AAAAAAO8AAAAAAH8AAAAAAD4AAAAAAD4AAAAAADwAAAAAABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="));
//app6
UI.ele.fill("_2x3",6,1);
img=0;
UI.btn.img("_bar",1,UI.icon.torch,0,14,0,1);//btn2
UI.btn.img("_bar",2,UI.icon.settings,0,14,face.appPrev=="main"?1:4,1);//btn2
UI.btn.img("_bar",3,UI.icon.alarm,0,14,0,1);//btn2
if (set.def.bpp) w.gfx.flip();
//
face[0].btn._2x3_1=()=>{buzzer(buz.ok);face.go('calc',0);};
face[0].btn._2x3_2=()=>{buzzer(buz.ok);face.go('repellent',0);};
face[0].btn._2x3_3=()=>{buzzer(buz.ok);face.go('tpmsFace',0);};
face[0].btn._2x3_4=()=>{buzzer(buz.ok);face.go('hello',0);};
face[0].btn._2x3_5=()=>{buzzer(buz.na);};
face[0].btn._2x3_6=()=>{buzzer(buz.na);};
//bar
face[0].btn._bar_1=()=>{buzzer(buz.na);};
face[0].btn._bar_2=()=>{
	if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
		buzzer(buz.ok);face.go(face.faceSave[0].substring(0,4)+"Options",0);
	}else buzzer(buz.na);
};
face[0].btn._bar_3=()=>{buzzer(buz.ok);face.go('alarm',0);};