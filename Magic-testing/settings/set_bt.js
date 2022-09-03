E.setFlags({pretokenise:1});
//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});

face[0].page="bt";
UI.ele.ind(0,0,0);
let img;
UIc.start(1,0);
UI.btn.img("main","_fold",1,"bt","BT",11,12,1);
UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:0);
UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:0);
UI.btn.img("main","_2x3",5,"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
//UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?15:3,ew.def.hid?4:0);
img=0;
UIc.end();
//
UIc.main._fold=()=>{
	buzzer.nav(buzzer.buzz.na);
};
UIc.main._2x3=(i)=>{
	if (i==3){
		buzzer.nav(buzzer.buzz.ok);
		ew.def.cli=1-ew.def.cli;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"LOADER ACCESS",ew.def.cli?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:0);
		ew.do.update.bluetooth();
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);
		ew.def.gb=1-ew.def.gb;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE",ew.def.gb?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:0);
		ew.do.update.bluetooth();
	}else if (i==5){
		buzzer.nav(buzzer.buzz.ok);
		//ew.def.prxy--;
		//if (ew.def.prxy<0) ew.def.prxy=2;
		ew.def.prxy=1-ew.def.prxy;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"EUC PROXY",ew.def.prxy?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",5,"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
		//UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
		ew.do.update.bluetooth();
	}else if (i==6){
		buzzer.nav(buzzer.buzz.na);
		//if (ew.def.info)
		//UI.btn.ntfy(1,0,0,"_bar",6,"NOT AVAILABLE","YET",15,13);
		//w.gfx.flip();
		ew.def.hid=1-ew.def.hid;
		UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?15:3,ew.def.hid?4:0);
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"HID MUSIC",ew.def.hid?"ENABLED":"DISABLED",15,0);w.gfx.flip();
		ew.do.update.bluetooth();
	}
};
