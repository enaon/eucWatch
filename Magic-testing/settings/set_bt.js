TC.removeAllListeners("tc5");
face[0].page="bt";
face[0].btn={};
UI.ele.ind("top",1,1);
let img;
//app1-2 header
//img=require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY="));
UI.btn.img("_fold",1,UI.icon.bt,"BLUETOOTH",15,1);
//app3 cli
//img=require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4"));
UI.btn.img("_2x3",3,UI.icon.cli,"CLI",set.def.cli?15:0,set.def.cli?4:3);
//app4 Gadgetbridge
//img=require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A=="));
UI.btn.img("_2x3",4,UI.icon.gb,"GB",set.def.gb?15:0,set.def.gb?4:3);
//app5 Proxy
//img=require("heatshrink").decompress(atob("mEwwIcZn////+AoIEBAAOAgIFD4EDAofgg/gCgMD+EH4AFBgPwh+AE4X4h4tDvAFFj8DwITBvkegeDD4M8AoPDAoQRBwYRCj4jKGopBFJosD/AFBj/gMopxFPo0PAoIaCEIIrCAqg9CEgQiDH4P8Wgg0CAAM+nwbC//8j5NBg4/BIYKzBApQZBRgojDF447FI4pTFABI"));
UI.btn.img("_2x3",5,UI.icon.proxy,"PROXY",set.def.emuZ?15:0,set.def.emuZ?4:3);
//app6 HID
//img=require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA="));
UI.btn.img("_2x3",6,UI.icon.hid,"HID",set.def.hid?15:0,set.def.hid?4:3);

img=0;
//bar
UI.btn.img("_bar",1,UI.icon.torch,0,14,0);//btn2
UI.btn.img("_bar",2,UI.icon.settings,0,14,0);//btn2
UI.btn.img("_bar",3,UI.icon.alarm,0,14,0);//btn2
if (set.def.bpp) w.gfx.flip();
//
face[0].btn._fold_1=()=>{buzzer(buz.na);};
face[0].btn._2x3_3=()=>{buzzer(buz.ok);set.def.cli=1-set.def.cli;UI.btn.img("_2x3",3,UI.icon.cli,"CLI",set.def.cli?15:0,set.def.cli?4:3);
setter.updateBT();};
face[0].btn._2x3_4=()=>{buzzer(buz.ok);set.def.gb=1-set.def.gb;UI.btn.img("_2x3",4,UI.icon.gb,"GB",set.def.gb?15:0,set.def.gb?4:3);
setter.updateBT();};
face[0].btn._2x3_5=()=>{buzzer(buz.ok);set.def.emuZ=1-set.def.emuZ;UI.btn.img("_2x3",5,UI.icon.proxy,"PROXY",set.def.emuZ?15:0,set.def.emuZ?4:3);
setter.updateBT();};
face[0].btn._2x3_6=()=>{buzzer(buz.na);/*set.def.hid=1-set.def.hid;setter.updateBT();buzzer(buz.ok);*/};
//bar
face[0].btn._bar_1=()=>{buzzer(buz.na);};
face[0].btn._bar_2=()=>{
	if (Boolean(require("Storage").read(face.faceSave[0].substring(0,4)+"Options"))){
		buzzer(buz.ok);face.go(face.faceSave[0].substring(0,4)+"Options",0);
	}else buzzer(buz.na);
};
face[0].btn._bar_3=()=>{buzzer(buz.ok);face.go('alarm',0);};