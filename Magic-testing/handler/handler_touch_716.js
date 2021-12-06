var TC={
	tid:0,
	x:0,
	y:0,
	do:0,
	st:1,
	loop:10,
	init:function(){
		"ram";
		var tp=i2c.readFrom(0x15,7);
		if ( tp == Uint8Array(7) || (tp[3] == 64 && this.st)  ) return;
		if (  tp[3] === 0 || tp[3] === 128) {
			if (tp[2]==1 && this.st  ) {
				this.st = 0;
				this.do = 1;
				this.x = ((tp[3]&0x0F)<<8)|tp[4];
				this.y =((tp[5]&0x0F)<<8)|tp[6];
				this.time=getTime();
				return;
			}	
			if ( this.do && getTime() - this.time > 1 && tp[2]==1 ) { 
				this.do = 0 ;
				TC.emit("tc12",TC.x+(TC.x/10),TC.y);
				return setTimeout(function() {touchHandler[face.pageCurr](12,TC.x+(TC.x/10),TC.y);face.off();},0);
			}else if ( this.do&&tp[2]==1) {
				var a=0;
				if ((((tp[5]&0x0F)<<8)|tp[6])>=this.y+10) a = 1;
				else if ((((tp[5]&0x0F)<<8)|tp[6])<=this.y-10) a = 2;
				else if ((((tp[3]&0x0F)<<8)|tp[4])<=this.x-10) a = 3;
				else if ((((tp[3]&0x0F)<<8)|tp[4])>=this.x+10) a = 4;
				if ( a != 0 && this.aLast != a ) {
					this.aLast=a;
					this.do=0;
					//TC.emit("tc"+a,TC.x+(TC.x/10),TC.y);
					return setTimeout(function() {TC.emit("tc"+a,TC.x+(TC.x/10),TC.y);touchHandler[face.pageCurr](a,TC.x+(TC.x/10),TC.y);face.off();},0);
				}
				return;
			}
		}else if ( tp[3] == 64 && !this.st ) {
			if (this.do===1){
				this.do=0;
				TC.emit("tc5",TC.x+(TC.x/10),TC.y);
				return setTimeout(function() {touchHandler[face.pageCurr](5,TC.x+(TC.x/10),TC.y);face.off();},0);
			}
			this.aLast=0;
			this.st = 1;
			this.time = 0;
		}
	},
	start:function(){ 
		"ram";
		if (this.tid) clearInterval(this.tid);
		digitalPulse(set.def.rstP,1,[10,50]); //touch wake
		i2c.writeTo(0x15,0);
		this.st=1;
		this.tid=setInterval(function(){
			TC.init();
		},this.loop);
	},
	stop:function(){
		"ram";
		if (this.tid) clearInterval(this.tid);this.tid=0;
		digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);
		this.aLast=0;
		this.st = 1;
		this.time = 0;
	}
};
var UIc={
	get:1,
	cord:"",
	tap:{},
};
/*
TC.on('tc5',x=>{print(x);});
TC.on('tc12',x=>{print(x);});
TC.on('tc1',x=>{print(x);});
TC.on('tc2',x=>{print(x);});
TC.on('tc3',x=>{print(x);});
TC.on('tc4',x=>{print(x);});
*/