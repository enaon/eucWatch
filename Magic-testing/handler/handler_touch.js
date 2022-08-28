if (ew.def.touchtype!="816"&&ew.def.touchtype!="716"){
	digitalPulse(ew.def.rstP,1,[5,500]); 
	i2c.writeTo(0x15,0x80);
	ew.def.touchtype=( i2c.readFrom(0x15,1)[0] == 96 )?"816":"716";
}
if ( process.env.BOARD=="BANGLEJS2")
	eval(require('Storage').read('handler_touch_b2'));
else if (ew.def.touchtype=="816") //816
	eval(require('Storage').read('handler_touch_816'));
else 
	eval(require('Storage').read('handler_touch_716'));


tcDn=(x,y)=>{
	"ram";
	buzzer.nav(buzzer.buzz.ok);
	if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
	if (global.euc&& euc.state!="OFF"){
		if (face.appCurr.startsWith("dash_")){
			if (ew.def.dash.face+1>=ew.is.dash.length) 
				ew.def.dash.face=0; 
			else 
				ew.def.dash.face++;
		} 
		face.go(ew.is.dash[ew.def.dash.face],0);
	}else if (face.appCurr=="clock"){
		face.go("clock",-1);
	}else{
		face.go("clock",0);
	}
};	
tcUp=(x,y)=>{
	"ram";
	if (y>170&&x<50) { 
		buzzer.nav(buzzer.buzz.ok);
		if (ew.def.bri!==7) {
		  ew.is.bri=ew.def.bri;
		  w.gfx.bri.set(7);
		}else 
			w.gfx.bri.set(ew.is.bri);
		if (face[0].bar) {
			UI.btn.ntfy(1,1,0,"_bar",6,"BRIGHTNESS","GESTURE",15,4,0);w.gfx.flip();
			if (face.appCurr=="settings"&&face[0].page=="set") UI.btn.img("main","_2x3",3,"bri",ew.def.bri==7?7:ew.is.bri,15,1,1);
		}
	}else if (UI.ntid&&ew.is.bar) {
		buzzer.nav(buzzer.buzz.na);
		clearTimeout(UI.ntid);
		UI.ntid=0;
		face[0].bar();
		ew.is.bar=0;
	} else if (face.appCurr!="settings") {
		buzzer.nav(buzzer.buzz.na);
		UI.bar(2);
	} else 
		face.go(face.appRoot[0],face.appRoot[1]);
};	
tcBack=()=>{
	buzzer.nav(buzzer.buzz.ok);
	face.go(face.appRoot[0],face.appRoot[1]);
};	
tcNext=()=>{
	buzzer.nav(buzzer.buzz.na);
};	
tcBar=(x,y)=>{UIc.tcBar(x,y);};	
TC.on('bar',tcBar);
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 
TC.on('tc3',tcNext);
TC.on('tc4',tcBack);
//TC.on('tc3',`setTimeout(()=>{tcNext()},50)`);
//TC.on('tc4',`setTimeout(()=>{tcBack()},50)`);
TC.on('tc5',UIc.xy);
