//clock settings
face[0].page="clock";
UI.ele.ind("top",1,1);
UIc.start(1,0);
UI.btn.img("main","_2x3",1,(set.def.cli||set.def.gb||set.def.emuZ)?_icon.bt:_icon.plane,"BT",15,1);
UI.btn.img("main","_2x3",2,_icon.themes,"FACE",15,1);
UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri,15,1,1);
UI.btn.img("main","_2x3",4,_icon.findPhone,"FIND",3,0);
UI.btn.img("main","_2x3",5,_icon.wakeScreen,"WAKE ",set.def.acc?15:3,set.def.acc?4:0);
UI.btn.img("main","_2x3",6,_icon.info,"ABOUT",15,12);
UIc.end();
//
UIc.main._2x3_1=()=>{buzzer(buz.ok);};
UIc.main._2x3_2=()=>{buzzer(buz.ok);};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);

};
UIc.main._2x3_4=()=>{
	buzzer(buz.na);
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	
};
UIc.main._2x3_6=()=>{
	buzzer(buz.ok);
	let s=(getTime()-set.boot)|0;
	let d=0;
	let h=0;
	let m=0;
	if (s>864000) {set.boot=getTime();s=(getTime()-set.boot)|0;}
	while (s>86400) {s=s-86400;d++;}
	while (s>3600) {s=s-3600;h++;}
	while (s>60) {s=s-60;m++;}
	w.gfx.setColor(0,0);
	w.gfx.clear();
	w.gfx.setColor(1,14);
	w.gfx.setFont("Vector",18);
	w.gfx.drawString("MEMORY: "+process.memory().free+"/"+process.memory().total,120-(w.gfx.stringWidth("MEMORY: "+process.memory().free+"/"+process.memory().total)/2),0);  
	w.gfx.drawString("IMAGE: "+process.version,120-(w.gfx.stringWidth("IMAGE: "+process.version)/2),25);  
	w.gfx.drawString("ACC TYPE: "+set.def.acctype,120-(w.gfx.stringWidth("ACC TYPE: "+set.def.acctype)/2),50);  
	w.gfx.drawString("TOUCH TYPE: "+set.def.touchtype,120-(w.gfx.stringWidth("TOUCH TYPE: "+set.def.touchtype)/2),75);  
	w.gfx.drawString("UPTIME: "+d+"D-"+h+"H-"+m+"M",120-(w.gfx.stringWidth("UPTIME: "+d+"D-"+h+"H-"+m+"M")/2),100);  
	w.gfx.drawString("FLASH: "+require("Storage").getFree(),120-(w.gfx.stringWidth("FLASH: "+require("Storage").getFree())/2),125); 
	w.gfx.drawString("TEMPERATURE: "+E.getTemperature(),120-(w.gfx.stringWidth("TEMPERATURE: "+E.getTemperature())/2),150);  
	w.gfx.drawString("NAME: "+set.def.name,120-(w.gfx.stringWidth("NAME: "+set.def.name)/2),175);  
	w.gfx.flip();
};


/*
set.def.hr24=1-set.def.hr24;
face[0].btn(1,(set.def.hr24)?"24 H":"12 H",26,180,25,4,0,120,0,239,79);//2

}else if (face[0].set=="more") {
	if (30 <= y && y <= 80 ) {
		set.def.rstR=(set.def.rstR==165)?229:165;
		face[0].btn((set.def.rstR==165)?1:0,"TP SLEEP:",22,65,45,1,2,0,30,239,80,(set.def.rstR==165)?"P8":"P22",26,180,45);//1
	}else if ( x <=120 && 190 <= y) {
		setter.updateSettings();
		NRF.removeListener('disconnect',bdis);  
		NRF.disconnect();
		w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
		reset();
	}else if ( 120 <= x && 190 <= y) {
		setter.updateSettings();
		NRF.disconnect();
		require("Storage").write("devmode","dev");
		w.gfx.setColor(0,0);w.gfx.clear();w.gfx.flip();
		E.reboot();
*/

