//716
var tfk={
	tid:0,
	x:0,
	y:0,
	do:0,
	st:1,
	loop:5,
	init:function(){
		var tp=i2c.readFrom(0x15,7);
		//print (tp);
		if ( (tp[3] == 255 )  && this.st ) return;
		if ( (tp[3] == 128 || tp[3] === 0) && tp[2] === 1 ) {
			if ( !this.time ) this.time=getTime();
			if ( this.st ) {
				this.st = 0;
				this.do = 1;
                if (process.env.BOARD == "MAGIC3"){
				    this.x = tp[4];
					this.y = (((tp[5] & 0x0F) << 8) | tp[6]);
                }else{
         			this.x = tp[4];
                	this.y = tp[6];       	
                }
                print(this.x,this.y)
                return;
			}
			if ( this.do && getTime() - this.time > 1 ) { 
				this.do = 0 ;
				return setTimeout(function() {touchHandler[face.pageCurr](12,tfk.x,tfk.y);},0);
			}else if ( this.do && !tp[1] ) {
				var a = 0;
				if ((((tp[5] & 0x0F) << 8) | tp[6]) >= this.y + 30) a = 1;
				else if ((((tp[5] & 0x0F) << 8) | tp[6]) <= this.y - 30) a = 2;
				else if ((((tp[3] & 0x0F) << 8) | tp[4]) <= this.x - 20) a = 3;
				else if ((((tp[3] & 0x0F) << 8) | tp[4]) >= this.x + 20) a = 4;
				if (a != 0 && this.aLast != a) {	
					
                    this.aLast=a;
					this.do=0;
					return setTimeout(function() {touchHandler[face.pageCurr](a,tfk.x,tfk.y);},0);
				}
			}else if ( this.do ){
				if ( tp[1] == 5 || tp[1] ==12 ){
					this.do=0;
					return setTimeout(function() { touchHandler[face.pageCurr](tp[1],tfk.x+(process.env.BOARD == "MAGIC3"?(TC.x / 10):0),tfk.y+(process.env.BOARD == "MAGIC3"?20:0));},0);
				}
			}
		}else  {
//		}else if ( (tp[3] == 255 || tp[3] == 0)  && !this.st ) {

			if (this.do===1){
				this.do=0;
				return setTimeout(function() {touchHandler[face.pageCurr](5,tfk.x,tfk.y);},0);
            }
            this.aLast=0;
			this.st = 1;
            this.time = 0;
		}
	},
	start:function(){ 
		if (this.tid) clearInterval(this.tid);
		digitalPulse(ew.def.rstP,1,[10,50]); //touch wake
        this.st=1;
		this.tid=setInterval(function(){
			tfk.init();
		},this.loop);
	},
	exit:function(){
		if (this.tid) clearInterval(this.tid);this.tid=0;
	    digitalPulse(ew.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,0xa5,3);},100);
		this.aLast=0;
		this.st = 1;
		this.time = 0;
	}
};	