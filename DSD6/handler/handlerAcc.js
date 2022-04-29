//dsd6 acc handler 

//acc
function tilt(i){print(i);}
function tap(i,o){print(i,o);}
var acc={
	mode:0,
	on:function(i){
		if (set.tid.acc) {clearWatch(set.tid.acc);set.tid.acc=0;}
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
		set.tid.acc=setWatch(function(s){
			if (s.state){
				//console.log((w.accRead(17,3)));
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
		if (set.tid.acc) {clearWatch(set.tid.acc);set.tid.acc=0;}
		w.accWrite(0x7f,0x00); 
		w.accWrite(0x18,0x00); 
		w.accWrite(0x19,0x00); 
		w.accWrite(0x19,0x80);
//		w.accWrite(0x1A,0x00); //cntrl3 slow
	}
};
acc.off();