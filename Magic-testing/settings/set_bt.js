E.setFlags({pretokenise:1});
//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});

face[0].page="bt";
face[0].bt=()=>{
	let img;
	UI.btn.img("main","_fold",1,"bt","BT",11,12,1);
	UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:1);
	UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:1);
	UI.btn.img("main","_2x3",5,"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:1);
	//UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
	UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?15:3,ew.def.hid?4:1);	
	img=0;
};


UI.ele.ind(0,0,0);
let img;
UIc.start(1,0);
face[0].bt();
UIc.end();
//
UIc.main._fold=()=>{
	buzzer.nav(buzzer.buzz.na);
};

face[0].bt=()=>{
//UI.btn.img("main","_fold",1,"bt","BT",11,12,1);
UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:1);
UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:1);
UI.btn.img("main","_2x3",5,"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:1);
//UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?15:3,ew.def.hid?4:1);	
};

UIc.main._2x3=(i)=>{
	if (i==3){
		if (ew.def.hid){ buzzer.nav(buzzer.buzz.na);UI.btn.ntfy(1,0,0,"_bar",6,"DISABLE","HID",15,13);w.gfx.flip(); return;}
		ew.def.cli=1-ew.def.cli;      
		ew.do.update.bluetooth();
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"LOADER ACCESS",ew.def.cli?"ENABLED":"DISABLED",0,15);w.gfx.flip();
	}else if (i==4){
		if (ew.def.hid){ buzzer.nav(buzzer.buzz.na);UI.btn.ntfy(1,0,0,"_bar",6,"DISABLE","HID",15,13);w.gfx.flip(); return;}
		ew.def.gb=1-ew.def.gb;
		ew.do.update.bluetooth();
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE",ew.def.gb?"ENABLED":"DISABLED",0,15);w.gfx.flip();
	}else if (i==5){
		ew.def.prxy=1-ew.def.prxy;
		ew.do.update.bluetooth();
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"EUC PROXY",ew.def.prxy?"ENABLED":"DISABLED",0,15);w.gfx.flip();
	}else if (i==6){
		ew.def.hid=1-ew.def.hid;
		ew.do.update.bluetooth();
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"HID MUSIC",ew.def.hid?"ENABLED":"DISABLED",0,15);w.gfx.flip();
	}
	face[0].bt();
};
