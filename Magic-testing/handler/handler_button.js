//button 
function buttonHandler(s){
	"ram";
	if (this.t1) {clearTimeout(this.t1); this.t1=0;}
	if (face.offid) {clearTimeout(face.offid);face.offid=0;}
	if (s.state) { 
		this.press=true;
		if (global.euc&&euc.state=="READY"&&2<=euc.dash.spd&&euc.dash.horn) {euc.wri("hornOn");return;}
		this.t1=setTimeout(() => {
			this.t1=0;
			if (global.euc) {
				euc.tgl();this.press=false;
			}
		}, 1000);
   }else if (this.press && !s.state)  { 
		this.press=false;
		if (global.euc&&euc.state=="READY"&&euc.horn&&euc.dash.horn) {euc.wri("hornOff");return;}
		if (face.pageCurr==-1) {
			buzzer(buz.on);
			face.go((global.euc&&euc.state!="OFF")?set.dash[set.def.dash.face]:face.appCurr,0);
		}else { 
			if (face.appCurr=="main"&&face.pagePrev!=-1&&face.pagePrev!=2) {
				face.go("main",-1);
				buzzer(buz.off);
			}else{
				let to=face.pageCurr+1;
				if (to>=2) to=0;
				face.go(face.appCurr,to);
			}
		}
	}else if (this.press&&global.euc&&euc.state==="READY"&&euc.horn&&euc.dash.horn) {euc.wri("hornOff");return;
	}else face.off();
}
btn=setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:0});