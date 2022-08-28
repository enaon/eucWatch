//touch
tcNext.replaceWith(()=>{buzzer.nav(buzzer.buzz.na);});
tcBack.replaceWith(()=>{
	buzzer.nav(buzzer.buzz.ok);	
	for (let i = 0; i < 10; i++) {
          if (face[0]["tid"+i]) clearTimeout(face[0]["tid"+i]);face[0]["tid"+i]=0;
    }
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		eval(require('Storage').read("dashKingsongAdvPass")); 
	}else 
		eval(require('Storage').read("dashKingsongAdv")); 

});
//
face[0].page="pass settings";
UI.ele.ind(0,0,0);
face[0].lastpass="";
//
face[0].keypad=()=>{
	UIc.start(1,0);
	for (let i=1;i<10;i++){
		UI.btn.c2l("main","_kp4x3",i,i<10?i:bp[i-10],"",15,i<10||i==11?6:1);
	}
	UIc.end();
	face[0].bar=()=>{
		UIc.start(0,1);
		UI.ele.title(face[0].page.toUpperCase(),3,0);
		for (let i=10;i<13;i++){
			UI.btn.c2l("bar","_kp4x3",i,i==11?"0":"","",15,i==11?6:0);
		}
		UIc.end();
	};
	face[0].bar();
	face[0].pass="";
	face[0].passone="";
	//
	UIc.main._kp4x3=(i)=>{
		if (i==10||i==12) return;
		buzzer.nav(buzzer.buzz.ok);	
		face[0].pass=face[0].pass+(i==11?"0":i);
		UI.btn.c2l("main","_kp4x3",i,i==11?0:i,"",15,4);
		//highlight button
		if (face[0]["tid"+i]) clearTimeout(face[0]["tid"+i]);
		face[0]["tid"+i]=setTimeout(function(i){
			face[0]["tid"+i]=0;
			if ((i!=11||!UI.ntid)) UI.btn.c2l("main","_kp4x3",i,i==11?0:i,"",15,6);
		},800,i);
		if (face[0].pass.length==4) face[0].act();
	};
	UIc.bar._kp4x3=UIc.main._kp4x3;
	

};

face[0].opt=()=>{
	UIc.start(1,0);
	UI.btn.c2l("main","_2x1",1,"PASSWORD","CHANGE",15,6);
	UIc.end();
	face[0].bar=()=>{
		UIc.start(0,1);
		UI.ele.title(face[0].page.toUpperCase(),3,0);//w.gfx.flip();
		UI.btn.c2l("bar","_2x1",2,"PASSWORD","CLEAR",15,1);
		UIc.end();
	};
	face[0].bar();
	UIc.main._2x1=(i)=>{
		if (i==1){
			buzzer.nav(buzzer.buzz.ok);		
			face[0].page="change password";
			UI.ele.title(face[0].page.toUpperCase(),3,0);
			face[0].keypad();
		}
	};
	UIc.bar._2x1=(i)=>{
		if (i==2){
			buzzer.nav(buzzer.buzz.ok);		
			UI.btn.ntfy(0,1,1);
			UIc.start(0,1);
			UI.btn.c2l("bar","_bar",6,"TAP TO","CONFIRM",15,13);
			UIc.end();
			UIc.bar._bar=(i)=>{
				if (i==6) 	{
					buzzer.nav(buzzer.buzz.ok);	
					euc.dash.auto.onC.pass=0;
					euc.wri("setPassClear");					
					UI.btn.ntfy(1,1,0,"_bar",6,"PASSWORD","REMOVED",15,4);w.gfx.flip();
					setTimeout(()=>{eval(require('Storage').read("dashKingsongAdv")); },1000);
				}
			};
		}
	};
};
face[0].act=()=>{
	if (face[0].page=="password?"){
		if (euc.dash.opt.lock.pass==face[0].pass){
			buzzer.nav([20,100,90,40,80]);
			face[0].page="pass options";
			UI.btn.ntfy(1,1,0,"_bar",6,"CODE","ACCEPTED",15,4);w.gfx.flip();
			setTimeout(()=>{face[0].opt(); },1000);
		}else {
			buzzer.nav([20,100,200]);
			face[0].pass="";
			UI.btn.ntfy(1,1.5,0,"_bar",6,"CODE","IS WRONG",15,13);w.gfx.flip();
		}
	}else if (face[0].page=="set password"||face[0].page=="change password"){
		if (!face[0].passone){
			face[0].passone=face[0].pass;
			face[0].pass="";
			UI.btn.ntfy(1,1,0,"_bar",6,"RE-ENTER","TO VERIFY",15,4);w.gfx.flip();
		}else {
			if (face[0].pass==face[0].passone) {
				if (face[0].page=="change password"){
					euc.dash.opt.lock.passOld=euc.dash.opt.lock.pass;
					euc.dash.opt.lock.pass=face[0].pass;
					euc.wri("setPassChange");
					UI.btn.ntfy(1,1,0,"_bar",6,"CODE","CHANGED",15,4);w.gfx.flip();
				}else{
					euc.dash.opt.lock.passBck=euc.dash.opt.lock.pass;
					euc.dash.opt.lock.pass=face[0].pass;
					euc.wri("setPass");	
					UI.btn.ntfy(1,1,0,"_bar",6,"CODE","APPLIED",15,4);w.gfx.flip();
				}
				euc.dash.auto.onC.pass=1;
				setTimeout(()=>{eval(require('Storage').read("dashKingsongAdv")); },1000);
			}else{
				buzzer.nav([20,100,200]);
				UI.btn.ntfy(1,1,0,"_bar",6,"MISMATCH","TRY AGAIN",15,13);w.gfx.flip();
				face[0].pass="";
				face[0].passone="";
			}
		}		
	}else if (face[0].page=="enter password"){
		euc.dash.opt.lock.passOld=euc.dash.opt.lock.pass;
		euc.dash.opt.lock.pass=face[0].pass;		
		euc.wri("setPassSend");
		UI.btn.ntfy(1,3,0,"_bar",6,"PLEASE","WAIT",15,1);w.gfx.flip();
		setTimeout(()=>{
			if (euc.temp.pass){
				buzzer.nav([20,100,200]);
				euc.dash.opt.lock.pass="";
				face[0].pass="";
				UI.btn.ntfy(1,1.5,0,"_bar",6,"CODE","IS WRONG",15,13);w.gfx.flip();
			}else {
				UI.btn.ntfy(1,3,0,"_bar",6,"CODE","ACCEPTED",15,4);w.gfx.flip();
				setTimeout(()=>{
					euc.dash.auto.onC.pass=1;
					euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
					euc.wri("start");
					face.go(ew.is.dash[ew.def.dash.face],0);
					return;
				},800);
			}
		},800);		
	}
};
//
if (euc.temp.pass){
	//buzzer.nav(buzzer.buzz.ok);		
	face[0].page="enter password";
	UI.ele.title(face[0].page.toUpperCase(),3,0);
	face[0].keypad();
}else if (euc.dash.opt.lock.pass.length>=4){
	face[0].page="password?";
	face[0].keypad();
}else {
	UIc.start(1,1);
	UI.btn.c2l("main","_2x1",1,"PASSWORD","SET",15,1);
	UIc.end();
	face[0].bar=()=>{
		UI.ele.title(face[0].page.toUpperCase(),3,0);//w.gfx.flip();
		UI.btn.c2l("bar","_2x1",2,"","",15,0);
	};
	face[0].bar();
	UIc.main._2x1=(i)=>{
		buzzer.nav(buzzer.buzz.ok);		
		face[0].page="set password";
		UI.ele.title(face[0].page.toUpperCase(),3,0);
		face[0].keypad();
	};
}
