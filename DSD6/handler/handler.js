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
//accel
/*
w.initAccel();
//reset
w.accWrite(0x7f,0x00); 
w.accWrite(0x19,0x00); 
w.accWrite(0x19,0x80);
//w.accRead(0x0C,1); //=0x55(85)
//
//w.accWrite(0x18,0x40); //standby mode-high resolution
//w.accWrite(0x18,0x60); //standby mode-high resolution -interrupt
w.accWrite(0x18,0x41); //standby mode
//w.accWrite(0x18,0x44); //standby mode- high resolution -2g- tap
//w.accWrite(0x18,0x45); //both tilt and tap
//w.accWrite(0x1A,0x06); //wake up 50hz
//w.accWrite(0x1A,0x98); //tap 400hz


//w.accWrite(0x19,0x3F); //all three axes
w.accWrite(0x19,0x10);  //enable when face up
w.accWrite(0x22,0x01);
//w.accWrite(0x23,0x01); //motion time 0.1 if 50hz
//w.accWrite(0x24,0x03); //single and double tap (default)
//w.accWrite(0x25,0x78); //double tap  0.3sec (default)
//w.accWrite(0x30,0x08); //int wake up 0.5g
w.accWrite(0x32,0x05); //22 degrees
//w.accWrite(0x32,0x03); //6 degrees
w.accWrite(0x1c,0x30); // outputoutput physical interrupt ot tap
//w.accWrite(0x1c,0x38); //enable int1-polarity high-pulse 0.03-0.05
//w.accWrite(0x1D,0x7F); //direction of motion all
//w.accWrite(0x1E,0x3F); //direction of tap all
w.accWrite(0x1f,0x01);
//w.accWrite(0x1f,0x02); //report wake up on int1

//w.accWrite(0x1f,0x40); //buffer full in int1

//w.accWrite(0x1f,0x10); //data ready report on int1
//w.accWrite(0x1f,0x04); //tap report on int1
//w.accWrite(0x1f,0x05); //both tilt and tap report on int1
//w.accWrite(0x1B,0x02); // odr to 50hz (default)
//w.accWrite(0x18,0x42); //standby mode-high resolution-+2g-wake up
//w.accWrite(0x18,0x00); // standy-op mode low-+2g-acc pc1=1
//w.accWrite(0x18,0xE0); // operational mode acc pc1=1
//w.accWrite(0x18,0xC0); // operational mode pc1=1
//w.accWrite(0x18,0x80); // operational mode acc pc1=1
//w.accWrite(0x18,0xC1); // operational mode tilt
//w.accWrite(0x18,0xC4); // operational mode tap
//w.accWrite(0x18,0xC5); // operational mode tilt and tap

*/

var acc={
	curr:"main",
	offms:-1,
	on:function(){
		w.initAccel();
		w.accWrite(0x7f,0x00); 
		w.accWrite(0x19,0x00); 
		w.accWrite(0x19,0x80);
		w.accWrite(0x18,0x44); //standby mode-low current-int1-2g-tap-wake-notilt
		w.accWrite(0x18,0xC4); //standby mode-low current-int1-2g-tap-wake-notilt
		w.accWrite(0x1f,0x04); //tap report on int1
		w.accWrite(0x1c,0x30); //enable int1
		acc.wtc=setWatch(function(s){
			if (s.state){
				console.log((w.accRead(0,10)));
				console.log((w.accRegDump(0x10)));
				var state=(w.accRegDump(0x10)).toString().split(' ');
				if (state[0]==16) {
					// w.accWrite(0x19,0x2f);
					//w.accWrite(0x19,0x2c);
					w_up=true;
					print(1);
				}else {
					//w.accWrite(0x19,0x10);
					w_up=false;
					print(2);
				}
				w.accRegDump(0x17);
			}
		},D15,true);  
	},
	off:function(app){
		if (acc.wtc) {clearWatch(acc.wtc);acc.wtc=0;}
		w.accWrite(0x7f,0x00); 
		w.accWrite(0x19,0x00); 
		w.accWrite(0x19,0x80);
//		w.accWrite(0x1A,0x00); //cntrl3 slow
	}
};

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



