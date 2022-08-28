E.setFlags({pretokenise:1});
ew.def.touchtype="816";
ew.is.tpT=0;
ew.def.rstR=0xA5; //the rock has auto sleep if 254 is 0.
var TC={
	x:0,
	y:0,
	loop:0,
	act:{main:{},bar:{},titl:{}},
	val:{cur:0,up:0,dn:0},
	start:function(){ 
    "ram";
		digitalPulse(ew.def.rstP,1,[5,50]);
		if (ew.tid.TC) {clearWatch(ew.tid.TC);ew.tid.TC=0;}
		setTimeout(()=>{
			i2c.writeTo(0x15,236,0); //MotionMask 7/4/1
			i2c.writeTo(0x15,0xF5,35); //lp scan threshold
			i2c.writeTo(0x15,0xF6,3); //lp scan range
			i2c.writeTo(0x15,0xF7,7); //lp scan freq
			i2c.writeTo(0x15,0xF8,50); //lp scan current
			i2c.writeTo(0x15,0xF9,2); //auto sleep timeout
			i2c.writeTo(0x15,0xFA,17); //gesture mode
			i2c.writeTo(0x15,254,1); //auto sleep off
			i2c.writeTo(0x15,0);
			//print("wake");
			this.init();
		},200);

	},
	init:function(){
		if (ew.tid.TC) return;
		ew.tid.TC=setWatch(function(s){
			"ram";
			//i2c.writeTo(0x15,0);
			var tp=i2c.readFrom(0x15,7);
			if  (ew.temp.bar) { 
				if ( 180<(((tp[5]&0x0F)<<8 )|tp[6]) ) {
					if (!TC.tid) {
						TC.tid=setInterval(function(){
							TC.bar();
						},30);
					}
					return;
				}else if (TC.tid){
					//print("clear bar1");
					clearInterval(TC.tid);TC.st=1;TC.tid=0;ew.temp.bar=0;
				}
			}
			//print("in",tp);
			if (face.pageCurr>=0) {
				face.off();
				TC.emit("tc"+tp[1],tp[4],(((tp[5]&0x0F)<<8 )|tp[6]));
			}else if (tp[1]==5) {
				if ( (getTime()|0) - ew.is.tpT < 1 )  {
					buzzer.nav(buzzer.buzz.ok)
					face.go(face.appCurr,0);
				}else   ew.is.tpT=getTime()|0;
			}		
			if (this.loop) {clearTimeout(this.loop); this.loop=0;}
			this.loop=setTimeout(()=>{
				TC.loop=0;
				if (ew.temp.bar) {
					if (!TC.tid) {
						TC.tid=setInterval(function(){
							TC.bar();
						},30);
						//print("start bar");
					}else if ( (((tp[5]&0x0F)<<8)|tp[6])<180 ) {
						//print("clear bar");
						clearInterval(TC.tid);TC.st=1;TC.tid=0;
					}
				} 
			},50);				
		},ew.pin.touch.INT,{repeat:true, edge:"falling"}); 
	},
	bar:function(){
			var tp=i2c.readFrom(0x15,7);
			if (ew.temp.bar&&180<(((tp[5]&0x0F)<<8)|tp[6])) {
				if (tp[2]) {
					if (this.st) {this.st=0; this.y=tp[4]; return;}
					if (this.y!=tp[4]) {
						this.val.tmp=this.y<tp[4]?this.val.tmp+(tp[4]-this.y):this.val.tmp-(this.y-tp[4]); 
						let len=15;
						let step=Math.round(this.val.tmp/len);
						if ( step ==1 || step ==-1) step=step;
						else if ( step == 2 || step == 3) step=1;
						else if ( step == -2 || step == -3) step=-1;
						else if ( step == 4 || step == 5) step=2;
						else if ( step == -4 || step == -5) step=-2;
						else if (step) step=Math.round(step*3);
						if (step) {
							if ( len<this.val.tmp || this.val.tmp < -len) {
								//this.val.cur=this.val.cur+(step* (step==1||step==-1?1:Math.abs(step*2))   ); this.val.tmp=0;
								this.val.cur=this.val.cur+step; 
								this.val.tmp=0;
								if (this.val.up<this.val.cur) this.val.cur=this.val.up;
								else if (this.val.cur<this.val.dn) this.val.cur=this.val.dn;
								buzzer.nav(20);TC.emit("bar",this.y<tp[4]?1:-1,this.val.cur);
							}
							//if (!this.val.tmp) {buzzer.nav(20);TC.emit("bar",this.y<tp[4]?1:-1,this.val.cur);}
						}
					this.y=tp[4];
					}
				}else
					{this.st=1;face.off();}
				return;
			}
	},
	stop:function(){
		"ram";
		i2c.writeTo(0x15,254,0); //auto sleep on
		i2c.writeTo(0x15,0);
		//print("sleep");
		return true;
	}
};
