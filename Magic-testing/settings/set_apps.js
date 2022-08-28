E.setFlags({pretokenise:1});
//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_dash"));face[0].bar();});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_set"));});
//
face[0].page="app";

UI.ele.ind(3,5,1);
let img;
UIc.start(1,0);
if (require("Storage").read("calc",1)) {
	img=`E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="))`;
	UI.btn.img("main","_2x3",1,img,"Calc",15,1);
}else UI.ele.fill("_2x3",1,1);
//app2
if (require("Storage").read("repellent",1)) {
	img=`E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="))`;
	UI.btn.img("main","_2x3",2,img,"Repel",15,1);
}else UI.ele.fill("_2x3",2,1);
//app3
if (global.tpms) {
	UI.btn.img("main","_2x3",3,"tpms","TPMS",15,1);
}else UI.ele.fill("_2x3",3,1);
//app4
if (require("Storage").read("hello",1)) {
	img=`require("heatshrink").decompress(atob("mEwwIIFn4FKmYFHv/ggYFBgf//kD2cAh/An8B+cAngNB4AFBuAZB8F/gPgAoN4j0DwAFBjkMgYuCh0GgwFCAgMMAoUDg0cAoeGjEHwEegOGmEfFoOA4cwjFgsIFBsBwB4HAsYFL8AFDufADocz4ApDAoI1CPoPAQYgFEn4FKFgIFEPgQABuFgAodgApcx/wFC4AFFjCnCgOAjk4RIWAhhRBAoKdBg/AnilBg8B//4hwTCKAKlBYohJCaIQCBboYFBdIS8DeoJQDv4WCA"))`;
	UI.btn.img("main","_2x3",4,img,"Hello",15,1);
}else  UI.ele.fill("_2x3",4,1);
//app5
UI.ele.fill("_2x3",5,1);//img=E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAGAAAAAAAPAAAAAAAfAAAAAAAfgAAAAAA9wAAAAAA84AAAAAB+cAAAAAB/OAAAAAB7nAAAAAB5zgAAAAB85wAAAAB+c4AAAAB/OcAAAAB7nOAAAAB5znAAAAB85z4AAP/+c78AB///Of4AH/////wAP/////gA/85//+AAfOc//wAAPnOeAAAABzneAAAAA5z+AAAAAc5+AAAAAOc+AAAAAHOeAAAAADneAAAAABz+AAAAAA5+AAAAAAc8AAAAAAO8AAAAAAH8AAAAAAD4AAAAAAD4AAAAAADwAAAAAABgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="))`;
//app6
UI.ele.fill("_2x3",6,1);
img=0;
UIc.end();
//TC.on('tc5',UIc.tap.btn);
//
UIc.main._2x3=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);face.go('calc',0);
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);face.go('repellent',0);
	}else if (i==3){
		buzzer.nav(buzzer.buzz.ok);face.go('tpmsFace',0);
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);face.go('hello',0);
	}else if (i==5){
		buzzer.nav(buzzer.buzz.na);	
	}else if (i==6){
		buzzer.nav(buzzer.buzz.na);
	}
};


