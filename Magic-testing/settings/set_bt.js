E.setFlags({pretokenise:1});
//touch
face[0].page="bt";
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}});

this.btn=[theme.btn.onT,theme.btn.onB,theme.btn.offT,theme.btn.offB];
	UI.btn.img("main","_fold",1,"bt","",11,1);
	w.gfx.drawImage((ew.def.rfTX == -4) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74=")) : (ew.def.rfTX == 0) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74=")) : E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74=")), 125, 55);
face[0].bt=()=>{
	UI.ele.coord("main","_fold",1);
	UI.btn.img("main","_2x3",3,"cli","CLI",ew.def.cli?btn[0]:btn[2],ew.def.cli?btn[1]:btn[3]);
	UI.btn.img("main","_2x3",4,"gb","GB",ew.def.gb?btn[0]:btn[2],ew.def.gb?btn[1]:btn[3]);
	UI.btn.img("main","_2x3",5,"proxy","EUC",ew.def.prxy?btn[0]:btn[2],ew.def.prxy?btn[1]:btn[3]);
	//UI.btn.img("main","_2x3",5,ew.def.prxy==2?"proxy_db":"proxy","EUC",ew.def.prxy?15:3,ew.def.prxy?4:0);
	UI.btn.img("main","_2x3",6,"hid","HID",ew.def.hid?btn[0]:btn[2],ew.def.hid?btn[1]:btn[3]);	
	img=0;
}
UI.ele.ind(0,0,0);
let img;
UIc.start(1,0);
face[0].bt();
UIc.end();
//
UIc.main._fold=(i,l)=>{
	if (l){
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.rfTX === -4) ew.def.rfTX = 0;
		else if (ew.def.rfTX === 0) ew.def.rfTX = 4;
		else if (ew.def.rfTX === 4) ew.def.rfTX = -4;
		NRF.setTxPower(ew.def.rfTX);
		UI.btn.img("main","_fold",1,"bt","",11,1);
		w.gfx.drawImage((ew.def.rfTX == -4) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74=")) : (ew.def.rfTX == 0) ? E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74=")) : E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74=")), 125, 55);
		UI.btn.ntfy(1,0,0,"_bar",6,"",ew.def.rfTX == -4 ? "TX MIN" : ew.def.rfTX == 0 ?"TX MED" : "TX MAX",0,15);w.gfx.flip();

	}
	else {
		buzzer.nav(buzzer.buzz.na);
		UI.btn.ntfy(1,0,0,"_bar",6,"HOLD TO SET","BT TX POWER",0,15);w.gfx.flip();
	}
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
