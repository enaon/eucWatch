i2c.writeTo(0x15,0xE5,3);
i2c.writeTo(0x15,0xA5,3);
set.def.rstP="D13";
set.def.rstR=0xA5; 
setTimeout(()=>{ 
	digitalPulse(set.def.rstP,1,[5,50]);
	setTimeout(()=>{ 
		i2c.writeTo(0x15,0xA7);
		let tp=i2c.readFrom(0x15,1);
		if ( tp == 255 ) {
			set.def.rstP="D10";
			set.def.rstR=0xE5; 
			digitalPulse(set.def.rstP,1,[5,50]);
			setTimeout(()=>{ 
				i2c.writeTo(0x15,0xA7);
				let tp=i2c.readFrom(0x15,1);
				if ( tp != 255 ) {
					set.def.touchtype="816";
					set.updateSettings();
					setTimeout(()=> {reset();},800);
				}
			},100);
		}
		else{
			i2c.writeTo(0x15,0x80);
			tp=i2c.readFrom(0x15,1);
			set.def.touchtype=( tp[0] !== 0 )?"816":"716";
			if (process.env.BOARD!="P8") set.def.rstR=0xE5;
			set.updateSettings();
			setTimeout(()=> {reset();},800);
		}	
	},100);
},100);