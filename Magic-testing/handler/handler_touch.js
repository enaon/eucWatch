if (set.def.touchtype!="816"&&set.def.touchtype!="716"){
	//i2c.writeTo(0x15,0xa5,3);
	//i2c.writeTo(0x15,0xE5,3);
	//i2c.writeTo(0x15,0xa5,3); digitalPulse(set.def.rstP,1,[5,500]); i2c.writeTo(0x15,0); print(i2c.readFrom(0x15,255));
	digitalPulse(set.def.rstP,1,[5,500]); 
	i2c.writeTo(0x15,0x80);
	set.def.touchtype=( i2c.readFrom(0x15,1)[0] == 96 )?"816":"716";
}
if (set.def.touchtype=="816"){ //816
	eval(require('Storage').read('handler_touch_816'));
}else {
	eval(require('Storage').read('handler_touch_716'));
}

tcDn=(x,y)=>{
	print("down",x,y);
	if (global.euc&& euc.sate=="READY")
		face.go(set.dash[set.def.dash.face],0);
	else if (face.faceSave!=-1) {
	    face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
	}else if (face.appCurr=="main"){
		face.go("main",-1);
	}else{
		face.go("main",0);
	   // if (face.appPrev=="settings"||face.appPrev==face.faceSave[0].substring(0,4)+"Options") {face.appPrev="main";face.pagePrev=0;}
	  // face.go(face.appPrev,face.pagePrev,face.pageArg);return;
	}
};	
tcUp=(x,y)=>{
	print("up",x,y);
	if (y>170&&x<50) { 
      if (w.gfx.bri.lv!==7) {set.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(set.bri);
      buzzer(buz.ok);
    }else if (face.appCurr=="settings")
		buzzer(buz.na);
	else {face.go("settings",0);}  
};	


