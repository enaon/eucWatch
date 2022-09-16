
//face
var face={
	appCurr:"clock",
	appPrev:"clock",
	pageCurr:-1,
	pagePrev:-1,	
	pageArg:"",
	faceSave:-1,
	mode:0,
	offid:0,
	offms:-1,
	off:function(t){ 
		face.batt=0;
		if (this.pageCurr===-1) return;
		if (this.offid) {clearTimeout(this.offid); this.offid=0;}
		if (face[this.pageCurr]!=-1){
			this.offms=(t)?t:face[this.pageCurr].offms;
		}
		this.offid=setTimeout((c)=>{
			this.offid=0;
			if (c===0||c===2) {
				if (this.appCurr==="clock") {
					if (face[c].off) {
						if (ew.def.touchtype=="716") tfk.exit();
						else if  (process.env.BOARD == "ROCK"){		
							i2c.writeTo(0x15,254,0); //auto sleep on
							i2c.writeTo(0x15,0); 
						}
						else {digitalPulse(ew.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,ew.def.rstR,3);},100);}
						face[c].off();this.pageCurr=-1;face.pagePrev=c;
					}
				}else face.go(this.appCurr,1);
			}else if (face.appPrev=="off") {
				if (face[c].off) {
					if (ew.def.touchtype=="716") tfk.exit();
					else if  (process.env.BOARD == "ROCK"){		
						i2c.writeTo(0x15,254,0); //auto sleep on
						i2c.writeTo(0x15,0); 
					}
					else {digitalPulse(ew.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,ew.def.rstR,3);},100);}
					face.go("clock",-1);face.pagePrev=c;
				}
			}else if (c>1) face.go(this.appCurr,0);
		},this.offms,this.pageCurr);
	},
	go:function(app,page,arg){
		this.appPrev=this.appCurr;
		this.pagePrev=this.pageCurr;
		this.appCurr=app;
		this.pageCurr=page;
		if (this.pagePrev==-1&&w.gfx.isOn) {w.gfx.clear();w.gfx.off();return;}
		if (this.pagePrev!=-1) {
			face[this.pagePrev].clear();
		}
		if (this.pageCurr==-1 && this.pagePrev!=-1) {
			if (ew.def.touchtype=="716") tfk.exit();
			else if  (process.env.BOARD == "ROCK"){		
				i2c.writeTo(0x15,254,0); //auto sleep on
				i2c.writeTo(0x15,0); 
			}
			else {digitalPulse(ew.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,ew.def.rstR,3);},100);} 
			acc.go=0;
			face[this.pagePrev].off();
			if (this.offid) {clearTimeout(this.offid); this.offid=0;}
			if (this.appCurr!=this.appPrev) eval(require('Storage').read(app));
			return;
		}
		if (this.appCurr!=this.appPrev) {
			face[2]=0;face[5]=0;
			this.appRoot=[this.appPrev,this.pagePrev,this.pageArg];
			eval(require('Storage').read(app));
		} 
		this.off();
		face[page].init(arg);	
		if(!w.gfx.isOn) {
			if (ew.def.touchtype=="716") tfk.start();
			else if  (process.env.BOARD == "ROCK"){	
				digitalPulse(ew.def.rstP,1,[5,50])
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
				},100);
			}
			else digitalPulse(ew.def.rstP,1,[5,50]);
			w.gfx.on();
		}
		face[page].show(arg);
		if(arg) this.pageArg=arg;
	}
};