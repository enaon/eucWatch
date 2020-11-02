//face
var face={
  appCurr:"main",
  appPrev:"main",
  pageCurr:-1,
  pagePrev:-1,	
  pageArg:"",
  faceSave:-1,
  mode:0,
  offid:-1,
  offms:-1,
  off:function(page){ 
      if (this.pageCurr===-1) {print("face-1");return;}
      if (this.offid>=0) {clearTimeout(this.offid); this.offid=-1;}
      if (face[this.pageCurr]!=-1) this.offms=face[this.pageCurr].offms;
      this.offid=setTimeout((c)=>{
        this.offid=-1;
		//if (set.def.acc&&acc.tid==-1) acc.on();
		if (c===0||c===2) {
			if (this.appCurr==="main") {
				if (face[c].off) {
					if (set.def.touchtype!="816") i2c.writeTo(0x15,0xa5,3); 
					if (set.def.touchtype=="716") tfk.exit();	
					face[c].off();this.pageCurr=-1;face.pagePrev=c;
				}
			}else face.go(this.appCurr,1);
		}else if (face.appPrev=="off") {
			if (face[c].off) {
				if (set.def.touchtype!="816") i2c.writeTo(0x15,0xa5,3); 
				if (set.def.touchtype=="716") tfk.exit();	
				face.go("main",-1);face.pagePrev=c;
			}
		}else if (c>1) face.go(this.appCurr,0);
	  },this.offms,this.pageCurr);
  },
  go:function(app,page,arg){
    this.appPrev=this.appCurr;
	this.pagePrev=this.pageCurr;
    this.appCurr=app;
    this.pageCurr=page;
	if (this.pagePrev==-1&&w.gfx.isOn) {w.gfx.clear();w.gfx.off();}
    if (this.pagePrev!=-1) {
        face[this.pagePrev].clear();
    }
  	if (this.pageCurr==-1 && this.pagePrev!=-1) {
		if (set.def.touchtype=="716")tfk.loop=100;
		acc.go=0;
        face[this.pagePrev].off();
      if (this.offid>=0) {clearTimeout(this.offid); this.offid=-1;}
	  if (this.appCurr!=this.appPrev) eval(require('Storage').read(app));
		return;
	}
	if (this.appCurr!=this.appPrev) {
      face[1]=0;face[2]=0;face[5]=0;
	  this.appRoot=[this.appPrev,this.pagePrev,this.pageArg];
      eval(require('Storage').read(app));
    } 
	this.off(page);
	face[page].init(arg);	
	if(!w.gfx.isOn) {w.gfx.on();
		if (set.def.touchtype!="816") digitalPulse(D13,1,[10,50]);
		if (set.def.touchtype=="716"){tfk.loop=5;if( tfk.tid==-1) tfk.init();}
	}
	face[page].show(arg);
	if(arg) this.pageArg=arg;
  }
};