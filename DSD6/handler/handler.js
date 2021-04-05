//dsd6 handler 
//face
//kx023 https://kionixfs.kionix.com/en/datasheet/KX023-1025%20Specifications%20Rev%2012.0.pdf
// http://static6.arrow.com/aropdfconversion/d627a443f35fdb58d80c5dedaee45b6bd2b8ae25/5332090777856918an04120getting20started20with20the20kx02320and20kx02.pdf
// https://kionixfs.kionix.com/en/document/TN014%20KX022%2C%20KX023%20Accelerometer%20Power-On%20Procedure.pdf
var face={
	curr:"main",
	offms:-1,
	go:function(app,arg){
		if (face[0] && face[0].exit) face[0].exit();
		face.curr=app;
		eval(require('Storage').read(app));
		face[0].init();
		if (!o.isOn) o.on();
		face[0].show();
		face.off();
	},
	off:function(app){	
		face.offms=face[0].offms;
		if (face.tid>0) {clearTimeout(face.tid); face.tid=-1;}
		face.tid= setTimeout(()=>{
			face[0].exit();
			face.tid=-1;
			o.off();
		},face.offms);
	}
};
//button
var press;
var long=0;
function button(o){
	face.go("main");
}
function buttonHandler(s){
	if (digitalRead(BTN)==1) { 
		press=true;
		if (long) {clearTimeout(long);}
		long=setTimeout(() => {
			button("long");
			press=false;
		}, 1000);
		return;
	}else if (press)  { 
		if (long) {clearTimeout(long);}
		button("short");
	}
}
setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:"both"});
//acc
function tilt(i){print(i);}
function tap(i,o){print(i,o);}
var acc={
	mode:0,
	on:function(i){
		if (acc.wtc) {clearWatch(acc.wtc);acc.wtc=0;}
		w.initAccel();
		w.accWrite(0x7f,0x00); 
		w.accWrite(0x19,0x00); 
		w.accWrite(0x19,0x80);
		if (i==2) {
			this.mode=i;
			w.accWrite(0x18,0x45); //standby mode-high current-int1-2g-tap-tilt
			w.accWrite(0x22,0x01); //tilt
			w.accWrite(0x19,0x10); //enable face up
			w.accWrite(0x32,0x0C); //22 degrees
			//w.accWrite(0x32,0x03); //6 degrees
			w.accWrite(0x1f,0x05); //tap-tilt report on int1
			w.accWrite(0x1c,0x30); //enable int1
			w.accWrite(0x18,0xC5); //opp mode-high current-int1-2g-tap-tilt-enable
		}else if (i==1){
			this.mode=i;
//			w.accWrite(0x18,0x44); //standby mode-high current-int1-2g-tap
			w.accWrite(0x18,0x4C); //standby mode-high current-int1-4g-tap
			w.accWrite(0x18,0x5C); //standby mode-high current-int1-8g-tap
			w.accWrite(0x1f,0x04); //tap report on int1
			w.accWrite(0x1c,0x30); //enable int1
//			w.accWrite(0x18,0xC4); //opp mode-high current-int1-2g-tap
//			w.accWrite(0x18,0xCC); //opp mode-high current-int1-4g-tap
			w.accWrite(0x18,0xDC); //opp mode-high current-int1-8g-tap

		} else {
			this.mode=0;
			w.accWrite(0x18,0x41); //standby mode-high current-int1-2g-tilt
			w.accWrite(0x22,0x01); //tilt
			w.accWrite(0x19,0x10);
			w.accWrite(0x32,0x0C); //22 degrees
			//w.accWrite(0x32,0x03); //6 degrees
			w.accWrite(0x1f,0x01); //tilt report on int1
			w.accWrite(0x1c,0x30); //enable int1
			w.accWrite(0x18,0xC1); //opp mode-high current-int1-2g-tilt
		}		
		acc.wtc=setWatch(function(s){
			if (s.state){
				console.log((w.accRead(17,3)));
				let state=w.accRead(17,3);
				if (state[2]==1) {
					if (state[0]==32||state[0]==4||state[0]==8) {
						w.accWrite(0x19,0x2c);
						tilt("up");
					}else {
						w.accWrite(0x19,0x10);
						tilt("dn");
					}
				}else {
					if  (state[2]==4) {
						tap("single",state[1]);
					}else
						tap("double",state[1]);
					}
			}
			w.accRegDump(0x17);
		},D15,true);  
	},
	off:function(app){
		if (acc.wtc) {clearWatch(acc.wtc);acc.wtc=0;}
		w.accWrite(0x7f,0x00); 
		w.accWrite(0x18,0x00); 
		w.accWrite(0x19,0x00); 
		w.accWrite(0x19,0x80);
//		w.accWrite(0x1A,0x00); //cntrl3 slow
	}
};
acc.off();
//charge pin
setWatch(function(s){
		if (digitalRead(D2)==1) 
			w.vibrate(0.85,1,200,600);
		else
			w.vibrate(0.85,2,100,100);
	},D2,true);  
//start
setTimeout(()=>{
	o.setContrast(100);
	face.go("main");
	//o.off();
	o.setRotation(0); //vertical
},500);