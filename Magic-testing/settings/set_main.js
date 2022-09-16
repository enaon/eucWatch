E.setFlags({pretokenise:1});
//
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();});
tcBack.replaceWith(()=>{buzzer.nav(buzzer.buzz.ok);eval(require("Storage").read("set_main"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}face[0].bar();});
//
//clock settings
face[0].page="clock";
UI.ele.ind(1,5,0);
UIc.start(1,0);
/*if (process.env.BOARD=="BANGLEJS2") 
	UI.btn.c2l("main","_2x3",1,"BANGLE","GO",15,0);
else UI.ele.fill("_2x3",1,0);
UI.ele.fill("_2x3",2,0);
*/
UI.ele.fill("_main",9,0);
UI.btn.img("main","_2x3",1,(ew.def.hid||ew.def.cli||ew.def.gb||ew.def.prxy)?"bt":"plane","BT",15,1);
UI.btn.img("main","_2x3",2,"themes","FACE",15,1);
//UI.ele.fill("_2x3",3,0);
UI.btn.c2l("main","_2x3",3,ew.def.txt?"MODE":ew.def.hr24?"24H":"12H",ew.def.txt?ew.def.hr24?"24H":"12H":"",15,5);
UI.btn.c2l("main","_2x3",4,"DBG","",15,ew.dbg?4:6);
UI.btn.img("main","_2x3",6,"power","PWR",15,6);
UI.btn.img("main","_2x3",5,"info","ABOUT",15,6);
UIc.end();
//
UIc.main._2x3=(i)=>{
	if (i==1){
		buzzer.nav(buzzer.buzz.ok);
		eval(require('Storage').read('set_bt'));
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}	
		//Bangle.showLauncher()
	}else if (i==2){
		buzzer.nav(buzzer.buzz.ok);
		eval(require('Storage').read('set_theme'));
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	}else if (i==3){
		buzzer.nav(buzzer.buzz.ok);
		ew.def.hr24=1-ew.def.hr24;
		if (ew.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"CLOCK MODE",ew.def.hr24?"24 HOURS":"A.M. / P.M.",0,15);
		UI.btn.c2l("main","_2x3",3,ew.def.txt?"MODE":ew.def.hr24?"24H":"12H",ew.def.txt?ew.def.hr24?"24H":"12H":"",15,5);
	}else if (i==4){
		buzzer.nav(buzzer.buzz.ok);
		ew.dbg=1-ew.dbg;
		if (ew.def.info) UI.btn.ntfy(1,1.5,0,"_bar",6,"DEBUG",ew.dbg?"ON":"OFF",0,15);
		UI.btn.c2l("main","_2x3",4,"DBG","",15,ew.dbg?4:6);
	}else if (i==6){
		buzzer.nav(buzzer.buzz.ok);
		UI.btn.ntfy(0,3,1,"_bar",6,"","",15,0);
		UIc.start(0,1);
		UI.btn.img("bar","_bar",4,"restart","RST",15,6);
		UI.btn.img("bar","_bar",5,"power","OFF",15,13);
		UIc.end();
		UIc.bar._bar=(i)=>{
			if (i==4){
				ew.do.update.settings();
				NRF.removeListener('disconnect',bdis);  
				NRF.disconnect();
				w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
				if (process.env.BOARD == "BANGLEJS2") E.reboot(); else reset();
			}else if (i==5){
				ew.do.update.settings();
				NRF.disconnect();
				require("Storage").write("devmode","shutdown");
				ew.def.acc=0;
				ew.do.update.acc();
				TC.stop();
				w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();w.gfx.off();
				if (process.env.BOARD == "BANGLEJS2") Bangle.off(); else E.reboot();
			}
		};
	}else if (i==5){
		buzzer.nav(buzzer.buzz.ok);
		UI.btn.ntfy(0,10,1,"_bar",6,"","",15,0);
		UIc.start(1,1);UIc.end();
		let s=(getTime()-ew.is.boot)|0;
		let d=0;
		let h=0;
		let m=0;
		if (s>864000) {ew.is.boot=getTime();s=(getTime()-ew.is.boot)|0;}
		while (s>86400) {s=s-86400;d++;}
		while (s>3600) {s=s-3600;h++;}
		while (s>60) {s=s-60;m++;}
		UI.btn.img("bar","_main",15,"hellas","",10,0);
		if (UI.ntid) clearTimeout(UI.ntid);
		UI.ntid=setTimeout(()=>{
			UI.ntid=0;
			UI.txt.block("_main",15,"\n"+"eucWatch v2.0"+"\n\n"+ "MEM: "+process.memory().free+"/"+process.memory().total+"\n"+"IMG: "+process.version+"-"+process.env.BOARD+"\n"+"ACC: "+ew.def.acctype+"\n"+"TP: "+ew.def.touchtype+"\n\n"+"UP: "+d+"D-"+h+"H-"+m+"M"+"\n"+"TEMP: "+E.getTemperature()+"\n\n"+"NAME: "+ew.def.name,30,15,1,1);
			w.gfx.flip();
		},800);
	
	}
};
//face[0].bar();

