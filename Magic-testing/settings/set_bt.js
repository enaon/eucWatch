face[0].page="bt";
UI.ele.ind("top",1,1);
let img;
UIc.start(1,0);
//app1-2 header
//img=require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY="));
UI.btn.img("main","_fold",1,UI.icon.bt,"BT",14,1,1);
//app3 cli
//img=require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4"));
UI.btn.img("main","_2x3",3,UI.icon.cli,"CLI",set.def.cli?15:3,set.def.cli?4:0);
//app4 Gadgetbridge
//img=require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A=="));
UI.btn.img("main","_2x3",4,UI.icon.gb,"GB",set.def.gb?15:3,set.def.gb?4:0);
//app5 Proxy
//img=require("heatshrink").decompress(atob("mEwwIcZn////+AoIEBAAOAgIFD4EDAofgg/gCgMD+EH4AFBgPwh+AE4X4h4tDvAFFj8DwITBvkegeDD4M8AoPDAoQRBwYRCj4jKGopBFJosD/AFBj/gMopxFPo0PAoIaCEIIrCAqg9CEgQiDH4P8Wgg0CAAM+nwbC//8j5NBg4/BIYKzBApQZBRgojDF447FI4pTFABI"));
UI.btn.img("main","_2x3",5,UI.icon.proxy,"PROXY",set.def.emuZ?15:3,set.def.emuZ?4:0);
//app6 HID
//img=require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA="));
UI.btn.img("main","_2x3",6,UI.icon.hid,"HID",set.def.hid?15:3,set.def.hid?4:0);
img=0;
UIc.end();
//
UIc.main._fold_1=()=>{
	buzzer(buz.na);/*eval(require('Storage').read('set_set'));*/
};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	set.def.cli=1-set.def.cli;
	UI.btn.img("main","_2x3",3,UI.icon.cli,"CLI",set.def.cli?15:3,set.def.cli?4:0);
	if (set.def.info) {
		UI.btn.ntfy("_sel",3,"LOADER ACCESS",set.def.cli?"ENABLED":"DISABLED",15,6);
	}
	setter.updateBT();
};
UIc.main._2x3_4=()=>{
	buzzer(buz.ok);
	set.def.gb=1-set.def.gb;
	UI.btn.img("main","_2x3",4,UI.icon.gb,"GB",set.def.gb?15:3,set.def.gb?4:0);
	if (set.def.info) {
		UI.btn.ntfy("_sel",3,"GADGET BRIDGE",set.def.gb?"ENABLED":"DISABLED",15,6);
	}
	setter.updateBT();
};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.emuZ=1-set.def.emuZ;
	UI.btn.img("main","_2x3",5,UI.icon.proxy,"PROXY",set.def.emuZ?15:3,set.def.emuZ?4:0);
	if (set.def.info) {
		UI.btn.ntfy("_sel",3,"EUC PROXY",set.def.emuZ?"ENABLED":"DISABLED",15,6);
	}
	setter.updateBT();
};
UIc.main._2x3_6=()=>{
	buzzer(buz.na);
	if (set.def.info) {
		UI.btn.ntfy("_sel",3,"NOT AVAILABLE","YET",15,7);
	}/*set.def.hid=1-set.def.hid;setter.updateBT();buzzer(buz.ok);*/
};
