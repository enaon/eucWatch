//button 
E.setFlags({pretokenise:1});
function btn1(s){
	//"ram";
	if (this.t1) {clearTimeout(this.t1); this.t1=0;}
	if (face.offid) {clearTimeout(face.offid);face.offid=0;}
	if (s.state) { 
		this.press=true;
		if (global.euc&&euc.state=="READY"&&2<=euc.dash.live.spd&&euc.dash.opt.horn.en) {euc.wri("hornOn");return;}
		this.t1=setTimeout(() => {
			this.t1=0;
			if (global.euc) {
				euc.tgl();
				this.press=false;
			}
		}, process.env.BOARD=="BANGLEJS2"?300:800);
   }else if (this.press && !s.state)  { 
		this.press=false;
		if (global.euc&&euc.state=="READY"&&euc.horn&&euc.dash.opt.horn.en) {euc.wri("hornOff");return;}
		if (face.pageCurr==-1) {
			buzzer.nav(buzzer.buzz.on);
			face.go((global.euc&&euc.state!="OFF")?ew.is.dash[ew.def.dash.face]:face.appCurr,0);
		}else if (euc.state!="OFF") { 
			if (face.appCurr.startsWith("dash_")) {
				acc.isUp=1;
				if (ew.tid.acc) changeInterval(ew.tid.acc,500);
				face.go(face.appCurr,-1);
				buzzer.nav(buzzer.buzz.off);
			}else face.go(ew.is.dash[ew.def.dash.face],0);
		}else {
			if (face.appCurr=="clock") {face.go("clock",-1); buzzer.nav(buzzer.buzz.off);}
			else face.go("clock",0); 
		}
		
	}else if (this.press&&global.euc&&euc.state==="READY"&&euc.horn&&euc.dash.opt.horn.en) {euc.wri("hornOff");return;
	}else face.off();
}
ew.tid.btn1=setWatch(btn1,BTN1, {repeat:true, debounce:50,edge:0});
if (process.env.BOARD=="ROCK"){
	D46.mode("input_pulldown");
	btn2=btn1.bind();
	ew.tid.btn2=setWatch(btn2,D46, {repeat:true, debounce:false,edge:0});
}