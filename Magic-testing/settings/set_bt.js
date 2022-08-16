face[0].page="bt";
UI.ele.ind(0,0,0);
let img;
UIc.start(1,0);
UI.btn.img("main","_fold",1,"bt","BT",14,12,1);
UI.btn.img("main","_2x3",3,"cli","CLI",set.def.cli?15:3,set.def.cli?4:0);
UI.btn.img("main","_2x3",4,"gb","GB",set.def.gb?15:3,set.def.gb?4:0);
UI.btn.img("main","_2x3",5,"proxy","EUC",set.def.emuZ?15:3,set.def.emuZ?4:0);
UI.btn.img("main","_2x3",6,"hid","HID",set.def.hid?15:3,set.def.hid?4:0);
img=0;
UIc.end();
//
UIc.main._fold=()=>{
	buzzer(buz.na);
};
UIc.main._2x3=(i)=>{
	if (i==3){
		buzzer(buz.ok);
		set.def.cli=1-set.def.cli;
		if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"LOADER ACCESS",set.def.cli?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",3,"cli","CLI",set.def.cli?15:3,set.def.cli?4:0);
		setter.updateBT();
	}else if (i==4){
		buzzer(buz.ok);
		set.def.gb=1-set.def.gb;
		if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE",set.def.gb?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",4,"gb","GB",set.def.gb?15:3,set.def.gb?4:0);
		setter.updateBT();
	}else if (i==5){
		buzzer(buz.ok);
		set.def.emuZ=1-set.def.emuZ;
		if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"EUC PROXY",set.def.emuZ?"ENABLED":"DISABLED",15,0);
		UI.btn.img("main","_2x3",5,"proxy","EUC",set.def.emuZ?15:3,set.def.emuZ?4:0);
		setter.updateBT();
	}else if (i==6){
		buzzer(buz.na);
		//if (set.def.info)
		UI.btn.ntfy(1,0,0,"_bar",6,"NOT AVAILABLE","YET",15,13);
		w.gfx.flip();
	}
};
tcNext.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}'));
tcBack.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}'));
