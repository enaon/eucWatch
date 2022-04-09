//face
var face={
	appCurr:"main",
	appPrev:"main",
	pageCurr:-1,
	pagePrev:-1,	
	pageArg:"",
	faceSave:-1,
	mode:0,
	offid:0,
	offms:-1,
	off:function(t){ 
		"ram";
		if (this.pageCurr===-1) return;
		if (this.offid) {clearTimeout(this.offid); this.offid=0;}
		this.offms=(t)?t:face[this.pageCurr].offms;
		this.offid=setTimeout((c)=>{
			face.offid=0; //face.off1(c);
			face.go(this.appCurr,-1);
		},this.offms,this.pageCurr);
	},
	off1:function(c){ 
    "ram";
		face.batt=0;
		//if (this.appCurr==="main") {
		if (face[c].off) {
			TC.stop();	
			face[c].off();this.pageCurr=-1;face.pagePrev=c;
		//}
		}else face.go(this.appCurr,-1);
	},
	go:function(app,page,arg){
    "ram";
		this.appPrev=this.appCurr;
		this.pagePrev=this.pageCurr;
		this.appCurr=app;
		this.pageCurr=page;
		if (this.pagePrev==-1&&w.gfx.isOn) {w.gfx.clear();w.gfx.off();return;}
		if (this.pagePrev!=-1) {
			face[this.pagePrev].clear();
		}
		if (this.pageCurr==-1 && this.pagePrev!=-1) {
			TC.stop();	
			acc.go=0;
			face[this.pagePrev].off();
			if (this.offid) {clearTimeout(this.offid); this.offid=0;}
			if (this.appCurr!=this.appPrev) {
				if (face[app]) {
					face[0]=face[face.appCurr][0];face[1]=face[face.appCurr][1];
					touchHandler[0]=touchHandler[face.appCurr][0];
				}else eval(require('Storage').read(app));	
			}
			return;
		}
		if (this.appCurr!=this.appPrev) {
			face[2]=0;face[5]=0;
			this.appRoot=[this.appPrev,this.pagePrev,this.pageArg];
			if (face[app]) {
				face[0]=face[face.appCurr][0];face[1]=face[face.appCurr][1];
				touchHandler[0]=touchHandler[face.appCurr][0];
			}else eval(require('Storage').read(app));
		} 
		this.off();
		face[page].init(arg);	
		if(!w.gfx.isOn) {
			w.gfx.on();
			TC.start();
		}
		face[page].show(arg);
		if(arg) this.pageArg=arg;
	}
};