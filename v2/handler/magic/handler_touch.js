if (set.def.touchtype!="816"&&set.def.touchtype!="716"){
	//i2c.writeTo(0x15,0xa5,3);
	//i2c.writeTo(0x15,0xE5,3);
	//i2c.writeTo(0x15,0xa5,3); digitalPulse(set.def.rstP,1,[5,500]); i2c.writeTo(0x15,0); print(i2c.readFrom(0x15,255));
	digitalPulse(set.def.rstP,1,[5,500]); 
	i2c.writeTo(0x15,0x80);
	set.def.touchtype=( i2c.readFrom(0x15,1)[0] == 96 )?"816":"716";
}
if ( process.env.BOARD=="BANGLEJS2")
	eval(require('Storage').read('handler_touch_b2'));
else if (set.def.touchtype=="816") //816
	eval(require('Storage').read('handler_touch_816'));
else 
	eval(require('Storage').read('handler_touch_716'));


tcDn=(x,y)=>{
	"ram";
	buzzer(buz.ok);
	if (global.euc&& euc.state=="READY"){
		if (set.def.dash.face+1>=set.dash.length) 
			set.def.dash.face=0; 
		else 
			set.def.dash.face++;
		face.go(set.dash[set.def.dash.face],0);	
//	}else if (face.faceSave!=-1) {
//	    face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;

	}else if (face.appCurr=="main"){
		face.go("main",-1);
	}else{
		face.go("main",0);
	   // if (face.appPrev=="settings"||face.appPrev==face.faceSave[0].substring(0,4)+"Options") {face.appPrev="main";face.pagePrev=0;}
	  // face.go(face.appPrev,face.pagePrev,face.pageArg);return;
	}
};	
tcUp=(x,y)=>{
	"ram";
	buzzer(buz.ok);
	if (y>170&&x<50) { 
     /* if (w.gfx.bri.lv!==7) {set.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
      else w.gfx.bri.set(set.bri);
      buzzer(buz.ok);
		*/
 		buzzer(buz.ok);
		if (set.def.bri!==7) {
		  set.bri=set.def.bri;
		  w.gfx.bri.set(7);
		}else 
			w.gfx.bri.set(set.bri);
		if (face.appCurr=="settings"&&face[0].page=="set") {
			UI.btn.ntfy(0,1,0,"_bar",6,"BRIGHTNESS","GESTURE",15,4,0);
			UI.btn.img("main","_2x3",3,_icon.bri,set.def.bri==7?7:set.bri,15,1,1);
		}
    }else if (face.appCurr=="settings")
		face.go(face.appRoot[0],face.appRoot[1]);
		//face.go("settings",0);
		//buzzer(buz.na);
	else {face.go("settings",0);}  
};	
tcBack=(x,y)=>{
	"ram";
	buzzer(buz.ok);
	face.go(face.appRoot[0],face.appRoot[1]);
};	
tcNext=(x,y)=>{
	"ram";
	buzzer(buz.na);
};	
tcBar=(x,y)=>{UIc.tcBar(x,y);};	
TC.on('bar',tcBar);
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 
//TC.on('tc2',`setTimeout(()=>{tcUp()},50)`);
//TC.on('tc3',tcNext); 	
TC.on('tc3',`setTimeout(()=>{tcNext()},50)`);
//TC.on('tc4',tcBack); 	
TC.on('tc4',`setTimeout(()=>{tcBack()},50)`);
TC.on('tc5',UIc.xy);
//TC.on('tc5',`setTimeout(()=>{UIc.xy(x,y)},50)`);
