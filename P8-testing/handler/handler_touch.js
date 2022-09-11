if (process.env.BOARD == "MAGIC3") {
	ew.def.rstR=0xA5; 
	ew.def.touchtype="716";
	ew.do.update.settings();
	setTimeout(()=> {reset();},800);
}else if ( process.env.BOARD == "ROCK"){
	ew.def.rstR=0xA5;
	ew.def.touchtype="816";
	ew.do.update.settings();
	setTimeout(()=> {reset();},800);
}else  if ( process.env.BOARD != "BANGLEJS2") {
	i2c.writeTo(0x15,0xE5,3);
	i2c.writeTo(0x15,0xA5,3);
	//ew.def.rstP="D13";
	ew.def.rstP=ew.pin.touch.RST;
	ew.def.rstR=0xA5; 
	setTimeout(()=>{ 
		digitalPulse(ew.def.rstP,1,[5,50]);
		setTimeout(()=>{ 
			i2c.writeTo(0x15,0xA7);
			let tp=i2c.readFrom(0x15,1);
			if ( tp == 255 ) {
				ew.def.rstP="D10";
				ew.def.rstR=0xE5; 
				digitalPulse(ew.def.rstP,1,[5,50]);
				setTimeout(()=>{ 
					i2c.writeTo(0x15,0xA7);
					let tp=i2c.readFrom(0x15,1);
					if ( tp != 255 ) {
						ew.def.touchtype="816";
						ew.do.update.settings();
						setTimeout(()=> {reset();},800);
					}
				},100);
			}
			else{
				i2c.writeTo(0x15,0x80);
				tp=i2c.readFrom(0x15,1);
				ew.def.touchtype=( tp[0] !== 0 )?"816":"716";
				if (process.env.BOARD!="P8") ew.def.rstR=0xE5;
				ew.do.update.settings();
				setTimeout(()=> {reset();},800);
			}	
		},100);
	},100);
}