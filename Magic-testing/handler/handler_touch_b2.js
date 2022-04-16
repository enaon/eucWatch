//bangle.js 2 
set.def.touchtype="816";
set.def.rstR=0xA5; //the rock has auto sleep if 254 is 0.
var TC={
	x:0,
	y:0,
	ntid:0,
	loop:0,
	act:{main:{},bar:{},titl:{}},
	val:{cur:0,up:0,dn:0},
	start:function(){ 
		"ram";
		if (this.ntid) return;
		digitalPulse(set.def.rstP,1,[5,50]);
		this.ntid=1;
		Bangle.on('drag', TC.init);
		setTimeout(()=>{i2c.writeTo(0x15,0xFA,17);i2c.writeTo(0x15,0);},1000); //gesture mode
	},
	init:function(){
		"ram";
		//i2c.writeTo(0x15,0);
		var tp=i2c.readFrom(0x15,7);
		if  (set.bar) { 
			if (116<tp[5]) {
				if (!TC.tid) {
					TC.tid=setInterval(function(){
						TC.bar();
					},30);
				}
				return;
			}else if (TC.tid){
				clearInterval(TC.tid);TC.st=1;TC.tid=0;set.bar=0;
			}
		}
		if (face.pageCurr>=0) {
			TC.emit("tc"+tp[0],tp[3],tp[5]);
			touchHandler[face.pageCurr](tp[0],tp[3],tp[5]);face.off();
		}else if (tp[0]==1) 
			face.go(face.appCurr,0);
		if (this.loop) {clearTimeout(this.loop); this.loop=0;}
		if (this.loop) {clearTimeout(this.loop); this.loop=0;}
			this.loop=setTimeout(()=>{
				TC.loop=0;
				if (set.bar) {
					if (!TC.tid) {
						TC.tid=setInterval(function(){
							TC.bar();
						},30);
						//print("start bar");
					}else if (tp[5]<116 ) {
						//print("clear bar");
						clearInterval(TC.tid);TC.st=1;TC.tid=0;
					}
				} 
			},50);		
	},
	bar:function(){
			var tp=i2c.readFrom(0x15,7);
			if (set.bar&&116<tp[5]) {  
				if (tp[1]) {
					if (this.st) {this.st=0; this.y=tp[3]; return;}
					if (this.y!=tp[3]) {
						this.val.tmp=this.y<tp[3]?this.val.tmp+(tp[3]-this.y):this.val.tmp-(this.y-tp[3]); 
						let len=10;
						let step=Math.round(this.val.tmp/len);
						if (step ==1) step=0;
						else if (step ==-1) step=0;
						else if ( step ==2 || step == 3) step=1;
						else if (step ==-2 || step == -3) step=-1;
						else if (step) step=step*2;
						if (step) {
							if ( len<this.val.tmp || this.val.tmp < -len) {
								//this.val.cur=this.val.cur+(step* (step==1||step==-1?1:Math.abs(step*2))   ); this.val.tmp=0;
								this.val.cur=this.val.cur+step; this.val.tmp=0;
							}
							if (this.val.up<this.val.cur) this.val.cur=this.val.up;else if (this.val.cur<this.val.dn) this.val.cur=this.val.dn;
							if (!this.val.tmp) {buzzer(20);TC.emit("bar",this.y<tp[3]?1:-1,this.val.cur);}
						}
					this.y=tp[3];
					}
				}else
					{this.st=1;face.off();}
				return;
			}
	},
	stop:function(){
		"ram";
		return true;
	}
};

/*

TC.tid=setInterval(function(){
TC.bar()
},30);
*/

/*TC.on('tc1',x=>{print(x);});
TC.on('tc2',x=>{print(x);});
TC.on('tc3',x=>{print(x);});
TC.on('tc4',x=>{print(x);});
TC.on('tc5',x=>{print(x);});
TC.on('tc12',x=>{print(x);});
*/