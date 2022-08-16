//accelerometer(wake on wrist turn)
ew.def.acctype="SC7A20";
acc={
	up:0,
	//ori:[65,66],
	ori:[65,66],
	tid:0,
	mode:0,
	on:function(v){
		i2c.writeTo(0x18,0x20,0x4f); //CTRL_REG1 20h ODR3 ODR2 ODR1 ODR0 LPen Zen Yen Xen , 50hz, lpen1. zyx
		i2c.writeTo(0x18,0x21,0x00); //highpass filter disabled
		i2c.writeTo(0x18,0x22,0x40); //ia1 interrupt to INT1
		i2c.writeTo(0x18,0x23,0x80); //1000 BDU,MSB at high addr, 1000 HR low
		i2c.writeTo(0x18,0x24,0x00); // latched interrupt off
		i2c.writeTo(0x18,0x25,0x00); //no Interrupt2 , no int polatiry
		i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
		i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
		i2c.writeTo(0x18,0x30,0x02); //int1 to xh
		this.mode=(v)?v:0;
		this.init(v);
	},
	off:function(){
		if (this.tid){
			if (this.mode==2) clearInterval(this.tid);
			else clearWatch(this.tid);
			this.tid=0;
		}
		i2c.writeTo(0x18,0x20,0x07); //Clear LPen-Enable all axes-Power down
		i2c.writeTo(0x18,0x26);
		i2c.readFrom(0x18,1);// Read REFERENCE-Reset filter block 
		return true;
	},
	init:function(v){
		if (v==2) {
			i2c.writeTo(0x18,0x22,0x00); //ia1 interrupt to INT1
			i2c.writeTo(0x18,0x30,0x00); //int1 to xh
			i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
			i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
			this.tid= setInterval(()=>{	
				"ram";
				let cor=acc.read();
				if (-1100<=cor.ax && cor.ax<=0 &&  -700<=cor.ay &&cor.ay<=1000 && cor.az<=-500 ) {
					if (!w.gfx.isOn&&this.up)
						face.go(ew.is.dash[ew.def.dash.face],0);
					else if (w.gfx.isOn)  face.off(0);
					this.up=0;
					changeInterval(acc.tid,2000);
				} else if (!this.up) {
					this.up=1;
					let tout=ew.def.off[face.appCurr];
					if (w.gfx.isOn ) if ( !tout || ( tout &&  tout <= 60000)) 
						face.off(1000);
					changeInterval(acc.tid,100);
				}
			},100);
			return true;
		}else if (!this.tid) {
			i2c.writeTo(0x18,0x32,20); //int1_ths-threshold = 250 milli g's
			i2c.writeTo(0x18,0x33,1); //duration = 1 * 20ms
			ew.tid.acc=setWatch(()=>{
				//"ram";
				i2c.writeTo(0x18,0x1);
				if ( 192 < i2c.readFrom(0x18,1)[0] ) {
					if (!w.gfx.isOn){  
						if (face.appCurr=="main") face.go("main",0);
						else face.go(face.appCurr,0);
					}else  if (ew.is.tor==1)w.gfx.bri.set(face[0].cbri);
					else face.off(); 
				} else {
					let tout=ew.def.off[face.appCurr];
					if ( !tout || ( tout &&  tout <= 60000)) 
						face.off(500);
				}
			},D8,{repeat:true,edge:"rising",debounce:50});
			return true;
		} else return false;
	},
	read:function(){
		"ram";
		i2c.writeTo(0x18,0xA8);
		var a =i2c.readFrom(0x18,6);
		return {ax:this.conv(a[0],a[1]), ay:this.conv(a[2],a[3]), az:this.conv(a[4],a[5])};
	},
	conv:function(lo,hi){
		"ram";
		let i = (hi<<8)+lo;
		return ((i & 0x7FFF) - (i & 0x8000))/16;
	}
};	