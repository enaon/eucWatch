E.setFlags({pretokenise:1});
//touch
tcNext.replaceWith(()=>{buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});
tcBack.replaceWith(()=>{buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});

face[0].page="bt";
UI.ele.ind(0,0,0);
let img;
UIc.start(1,0);
UI.btn.img("main","_fold",1,"bt","BT",14,12,1);
UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:0);
UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:0);
UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?15:3,ew.def.hid?4:0);
img=0;
UIc.end();
//
UIc.main._fold=()=>{
	buzzer(buz.na);
};
UIc.main._2x3=(i)=>{
	if (i==3){
		buzzer(buz.ok);
		ew.def.cli=1-ew.def.cli;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"LOADER ACCESS",ew.def.cli?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?15:3,ew.def.cli?4:0);
		ew.do.update.bluetooth();
	}else if (i==4){
		buzzer(buz.ok);
		ew.def.gb=1-ew.def.gb;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE",ew.def.gb?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?15:3,ew.def.gb?4:0);
		ew.do.update.bluetooth();
	}else if (i==5){
		buzzer(buz.ok);
		ew.def.prxy--;
		if (ew.def.prxy<0) ew.def.prxy=2;
		if (ew.def.info) UI.btn.ntfy(1,0,0,"_bar",6,ew.def.prxy==1?"Z10 EMULATION":ew.def.prxy==2?"DASKNESSBOT":"DISABLED","EUC PROXY",15,0);
		UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
		ew.do.update.bluetooth();
	}else if (i==6){
		buzzer(buz.na);
		//if (ew.def.info)
		UI.btn.ntfy(1,0,0,"_bar",6,"NOT AVAILABLE","YET",15,13);
		w.gfx.flip();
	}
};
