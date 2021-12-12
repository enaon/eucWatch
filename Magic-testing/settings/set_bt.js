face[0].page="bt";
UI.ele.ind("top",1,1);
let img;
UIc.start(1,0);
UI.btn.img("main","_fold",1,_icon.bt,"BT",14,1,1);
UI.btn.img("main","_2x3",3,_icon.cli,"CLI",set.def.cli?15:3,set.def.cli?4:0);
UI.btn.img("main","_2x3",4,_icon.gb,"GB",set.def.gb?15:3,set.def.gb?4:0);
UI.btn.img("main","_2x3",5,_icon.proxy,"PROXY",set.def.emuZ?15:3,set.def.emuZ?4:0);
UI.btn.img("main","_2x3",6,_icon.hid,"HID",set.def.hid?15:3,set.def.hid?4:0);
img=0;
//UI.ele.fill("_bar",6,0);
UIc.end();
//
UIc.main._fold_1=()=>{
	buzzer(buz.na);/*eval(require('Storage').read('set_set'));*/
};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	set.def.cli=1-set.def.cli;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"LOADER ACCESS",set.def.cli?"ENABLED":"DISABLED",15,set.def.cli?4:0);
	UI.btn.img("main","_2x3",3,_icon.cli,"CLI",set.def.cli?15:3,set.def.cli?4:0);
	setter.updateBT();
};
UIc.main._2x3_4=()=>{
	buzzer(buz.ok);
	set.def.gb=1-set.def.gb;
	UI.btn.img("main","_2x3",4,_icon.gb,"GB",set.def.gb?15:3,set.def.gb?4:0);
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"GADGET BRIDGE",set.def.gb?"ENABLED":"DISABLED",15,set.def.gb?4:0);
	UI.btn.img("main","_2x3",4,_icon.gb,"GB",set.def.gb?15:3,set.def.gb?4:0);
	setter.updateBT();
};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.emuZ=1-set.def.emuZ;
	UI.btn.img("main","_2x3",5,_icon.proxy,"PROXY",set.def.emuZ?15:3,set.def.emuZ?4:0);
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"EUC PROXY",set.def.emuZ?"ENABLED":"DISABLED",15,set.def.emuZ?4:0);
	UI.btn.img("main","_2x3",5,_icon.proxy,"PROXY",set.def.emuZ?15:3,set.def.emuZ?4:0);
	setter.updateBT();
};
UIc.main._2x3_6=()=>{
	buzzer(buz.na);
	//if (set.def.info)
	UI.btn.ntfy(1,0,0,"_bar",6,"NOT AVAILABLE","YET",15,7);
	w.gfx.flip();
};


tcNext.replaceWith((x,y)=>{
	buzzer(buz.na);
});
tcBack.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}'));
