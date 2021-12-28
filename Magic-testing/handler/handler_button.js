//button 
function btn1(s){
	"ram";
	if (this.t1) {clearTimeout(this.t1); this.t1=0;}
	if (face.offid) {clearTimeout(face.offid);face.offid=0;}
	if (s.state) { 
		this.press=true;
		if (global.euc&&euc.state=="READY"&&2<=dash.live.spd&&dash.live.horn) {euc.wri("hornOn");return;}
		this.t1=setTimeout(() => {
			this.t1=0;
			if (global.euc) {
				euc.tgl();this.press=false;
			}
		}, 1000);
   }else if (this.press && !s.state)  { 
		this.press=false;
		if (global.euc&&euc.state=="READY"&&euc.horn&&dash.live.horn) {euc.wri("hornOff");return;}
		if (face.pageCurr==-1) {
			buzzer(buz.on);
			face.go((euc.state!="OFF")?set.dash[set.def.dash.face]:face.appCurr,0);
		}else { 
			if (face.appCurr=="main"||face.appPrev.startsWith("dash_")) {
				face.go(face.appCurr,-1);
				buzzer(buz.off);
			}else{
				face.go((euc.state!="OFF")?set.dash[set.def.dash.face]:"main",0);
				//face.go(face.appPrev,face.pagePrev);
				return true;
				//let to=face.pageCurr+1;
				//if (to>=2) to=0;
				//face.go(face.appCurr,to);
			}
		}
	}else if (this.press&&global.euc&&euc.state==="READY"&&euc.horn&&dash.live.horn) {euc.wri("hornOff");return;
	}else face.off();
}
btn1_wid=setWatch(btn1,BTN1, {repeat:true, debounce:10,edge:0});
D46.mode("input_pulldown")
btn2=btn1.bind();
btn2_wid=setWatch(btn2,D46, {repeat:true, debounce:10,edge:0});
