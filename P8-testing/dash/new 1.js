var i2c=new I2C();
i2c.setup({scl:D7, sda:D6, bitrate:100000});
acc={
	up:0,
	ori:[65,66],
	loop:0,
	tid:0,
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
		if (v) {
			if (v==1) { this.ori=[68,72]; i2c.writeTo(0x18,0x30,0x44);
		}else {this.ori=[65,66];i2c.writeTo(0x18,0x30,0x41);}
		}
		this.init(v);
	},
	off:function(){
		if (this.loop) { clearInterval(this.loop); this.loop=0;}
		if (this.tid) {
			clearWatch(this.tid);
			this.tid=0;
			i2c.writeTo(0x18,0x20,0x07); //Clear LPen-Enable all axes-Power down
			i2c.writeTo(0x18,0x26);
			i2c.readFrom(0x18,1);// Read REFERENCE-Reset filter block 
			return true;
		}else return false;
	},
	init:function(v){
		v=2;
		if (v==2) {
			if (this.loop) { clearInterval(this.loop); this.loop=0;}
			this.loop= setInterval(()=>{	
				let cor=acc.read();
				print(cor, cor.ax);
				if (-1000<=cor.ax && cor.ax<=0  && cor.az<=-300 ) {
					if (!w.gfx.isOn&&face.appCurr!=""){  
							if  (global.euc) {
								if (global.euc&&euc.state!="OFF") face.go(set.dash[set.def.dash.face],0);
								else{if (face.appCurr=="main") face.go("main",0);else face.go(face.appCurr,0);}
							}else{ 
								if (face.appCurr=="main") face.go("main",0);
								else face.go(face.appCurr,0);
							}
					}else if (w.gfx.isOn&&face.pageCurr!=-1) {
						if (set.tor==1)w.gfx.bri.set(face[0].cbri); else face.off(1000);
					}
					print("UP");
				}
			},500);
		}else if (!this.tid) {
			this.tid=setWatch(()=>{
				if (this.up) { 
					i2c.writeTo(0x18,0x30,this.ori[1]);
					this.up=0;
					print("up");
					if (!w.gfx.isOn&&face.appCurr!=""){  
						if  (global.euc) {
							if (global.euc&&euc.state!="OFF") face.go(set.dash[set.def.dash.face],0);
							else{if (face.appCurr=="main") face.go("main",0);else face.go(face.appCurr,0);}
						}else{ 
							if (face.appCurr=="main") face.go("main",0);
							else face.go(face.appCurr,0);
						}
					}else if (w.gfx.isOn&&face.pageCurr!=-1) {
						if (set.tor==1)w.gfx.bri.set(face[0].cbri); else face.off();
					} 
					if (this.loop) { clearInterval(this.loop); this.loop=0; }
					this.loop= setInterval(()=>{	
						let cor=acc.read();
						print(cor);
					},500);
				}else {
					if (this.loop) { clearInterval(this.loop); this.loop=0; }
					i2c.writeTo(0x18,0x30,this.ori[0]); 
					this.up=1;   
					print("dn");
					if (set.tor==1)
						w.gfx.bri.set(7);
					else 
						face.off(1200);
				}
			},D8,{repeat:true,edge:"rising"});
			return true;
		} else return false;
	},
	read:function(){
		function conv(lo,hi) { 
			var i = (hi<<8)+lo;
			return ((i & 0x7FFF) - (i & 0x8000))/16;
		}
		i2c.writeTo(0x18,0xA8);
		var a =i2c.readFrom(0x18,6);
		//print ( "test got : ax: " + ( a[1] << 8 | a[0] ) + " ay: " + ( a[3] << 8 | a[2] ) + " az: " + ( a[5] << 8 | a[4] ) );
		return {ax:conv(a[0],a[1]), ay:conv(a[2],a[3]), az:conv(a[4],a[5])};
	},
};	

acc.on(2)
