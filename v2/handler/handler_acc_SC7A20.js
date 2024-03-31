//acc SC7A20  -based on work from jeffmer
E.setFlags({pretokenise:1});
ew.def.acctype="SC7A20";
acc={
	isUp:0,
	tid:0,
	tmr:100,
	mode:0,
	loop:0,
	chk1:process.env.BOARD=="P8"||process.env.BOARD=="P22"?
		()=>{ if ( 192 < i2c.readFrom(0x18,1)[0] )  return true;}:
		()=>{ if ( 10 < i2c.readFrom(0x18,1)[0] && i2c.readFrom(0x18,1)[0] < 192) return true;}
	,
	chk2:process.env.BOARD=="P8"||process.env.BOARD=="P22"?
		()=>{ let cor=acc.read(); if (-1200<=cor.ax && cor.ax<=-200 && -700<=cor.ay && cor.ay<=1000 && cor.az<=-100 )  return true;}:
		()=>{ let cor=acc.read(); if (-200<=cor.ax && cor.ay<=500  && 500<cor.az)return true;}
	,
	on:function(v){
		i2c.writeTo(0x18,0x20,0x4f); //CTRL_REG1 20h ODR3 ODR2 ODR1 ODR0 LPen Zen Yen Xen , 50hz, lpen1. zyx
		i2c.writeTo(0x18,0x21,0x00); //highpass filter disabled
		i2c.writeTo(0x18,0x22,0x40); //ia1 interrupt to INT1
		i2c.writeTo(0x18,0x23,0x80); //1000 BDU,MSB at high addr, 1000 HR low
		i2c.writeTo(0x18,0x24,0x00); // latched interrupt off
		i2c.writeTo(0x18,0x25,0x00); //no Interrupt2 , no int polatiry
		i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
		i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
		switch (scr.rotate) {
			case 0:
				i2c.writeTo(0x18,0x30,0xc1); //int1 to xh
				break;
			case 1:
				i2c.writeTo(0x18,0x30,0xc4); //int1 to yh
				break;
			case 2:
				i2c.writeTo(0x18,0x30,0xc2); //int1 to xl
				break;
			case 3:
				i2c.writeTo(0x18,0x30,0xc8); //int1 to yl
				break;
		}
		this.mode=(v)?v:0;
		this.init(v);
	},
	off:function(){
		if (ew.tid.acc){
			if (this.mode==2) {
				clearInterval(ew.tid.acc);
			}else clearWatch(ew.tid.acc);
			ew.tid.acc=0;
		}
		i2c.writeTo(0x18,0x20,0x07); //Clear LPen-Enable all axes-Power down
		i2c.writeTo(0x18,0x26);
		i2c.readFrom(0x18,1);// Read REFERENCE-Reset filter block 
		return true;
	},
	init:function(v){
		if (ew.tid.acc)  return false;
		if (v==2) { // euc mode
			i2c.writeTo(0x18,0x22,0x00); //ia1 interrupt to INT1
			i2c.writeTo(0x18,0x30,0x00); //int1 to xh
			i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
			i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
			ew.tid.acc= setInterval(()=>{
				"ram";
				if (this.chk2()) {
					if (w.gfx.isOn)	{
						changeInterval(ew.tid.acc,1500);
						face.off(0);
					}else if (!this.isUp) {changeInterval(ew.tid.acc,3000);face.go(ew.is.dash[ew.def.dash.face],0);this.isUp=1;}
				} else {
					changeInterval(ew.tid.acc,100);
					if (this.isUp) { 
						this.isUp=0;
						let tout=ew.def.off[face.appCurr];
						if ( !tout || ( tout &&  tout <= 60000)) 
							face.off(1000);
					}
				}
			},this.tmr);
			return true;
		}else  {	//watch mode
			i2c.writeTo(0x18,0x32,20); //int1_ths-threshold = 250 milli g's
			i2c.writeTo(0x18,0x33,1); //duration = 1 * 20ms
			ew.tid.acc=setWatch(()=>{
				//i2c.writeTo(0x18,0x1);
				if ( this.chk2()) {
					if (!w.gfx.isOn){  
						if (face.appCurr=="clock") face.go("clock",0);
						else face.go(face.appCurr,0);
					}else  if (ew.is.tor==1)w.gfx.bri.set(face[0].cbri);
					else face.off(); 
				} else {
					let tout=ew.def.off[face.appCurr];
					if ( !tout || ( tout &&  tout <= 60000)) {
						face.off(500);
						//if (face[0].clear) face.go(face.appCurr,-1); else face.off(500);
					}
				}
			},ew.pin.acc.INT,{repeat:true,edge:"rising",debounce:50});
			return true;
		} 
	},
	read:function(){
		"ram";
		i2c.writeTo(0x18,0xA8);
		var a =i2c.readFrom(0x18,6);
		let x = this.conv(a[0],a[1]);
		let y = this.conv(a[2],a[3]);
		let z = this.conv(a[4],a[5]);
		let t;
		switch (scr.rotate) {
			case 1:
				t = y;
				y = x * -1;
				x = t;
				break;
			case 2:
				x = x * -1;
				y = y * -1;
				break;
			case 3:
				t = y;
				y = x;
				x = t * -1;
				break;
		}
		return {ax:x, ay:y, az:z};
	},
	conv:function(lo,hi){
		"ram";
		let i = (hi<<8)+lo;
		return ((i & 0x7FFF) - (i & 0x8000))/16;
	}
};	


