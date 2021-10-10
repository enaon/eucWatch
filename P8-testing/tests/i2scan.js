
i2scan={
	run:1,
	rst:D39,
	scl:12,
	sda:1,
	pins: ['D2','D3','D4','D5','D8','D9','D10','D11','D12','D13','D14','D15','D16','D18','D19','D24','D25','D27','D28','D29','D30','D31','D33','D34','D35','D36','D37','D38','D39','D40','D41','D42','D43','D44','D45','D47'],
	//pins: ['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16','D17','D18','D19','D20','D21','D22','D23','D24','D25','D26','D27','D28','D29','D30','D31','D32','D33','D34','D35','D36','D37','D38','D39','D40','D41','D42','D43','D44','D45','D46','D47'],
	pinsSkip: ['D1','D17','D20','D21','D22','D23','D26','D32','D46'],
	check:function(){
		
	},	
	go:function(){
		if (!this.run) return
		console.log("looking at :", this.pins[this.scl]),this.pins[this.sda];
		var i2c=new I2C();
//		i2c.setup({scl:i2scan.scl, sda:i2scan.sda, bitrate:100000});
		i2c.setup({scl:this.pins[this.scl], sda:this.pins[this.sda], bitrate:100000});
		digitalPulse(i2scan.rst,1,[5,50]);
		setTimeout(()=>{ 
			i2c.writeTo(0x15,0xA7);
			i2scan.tp=i2c.readFrom(0x15,1);
			
			if ( i2scan.tp != 255 ) {
				i2c.writeTo(0x15,0x80);
				i2scan.tp=i2c.readFrom(0x15,1);
				i2scan.type=( i2scan.tp[0] !== 0 )?"816":"716";
				console.log("FOUND !!  at scl: ",this.pins[this.scl], " sda: ",this.pins[this.sda]);
			}
			else{
				console.log("Not found at scl: ",this.pins[this.scl], " sda: ",this.pins[this.sda]);
				setTimeout(()=>{ 
				if (this.sda<=this.pins.length) {
					this.sda++;
					this.go();
				}else{
					if (this.scl<=this.pins.length) { 
						this.sda=0
						this.scl++;
						this.go();
					}else{
						console.log("finished");
					}
				}
				},500);
			}	
		},300);
	}
};

i2scan.go()

