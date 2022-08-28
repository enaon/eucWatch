E.setFlags({pretokenise:1});
//touch
tcNext.replaceWith(()=>{
	if (face[0].tab==1&&!face[0].page&&euc.dash.info.get.makr=="Kingsong") {
		buzzer.nav(buzzer.buzz.ok);
		face[0].tab=2;
		face[0].bar();
	}else
		buzzer.nav(buzzer.buzz.na);
});
tcBack.replaceWith(()=>{
	buzzer.nav(buzzer.buzz.ok);
	if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();
	}else if (face[0].tab==2) {
		face[0].tab=1;
		face[0].bar();
	}else if (face.appPrev!="settings")
		face.go(face.appPrev,0);
	else
		face.go("clock",0);
});
//dash  Alerts
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:9000,
	g:w.gfx,
	init: function(){
		this.tab=1;
		if (face.appPrev!="settings"&&face.appPrev!="dashOptions")  face.last=face.appPrev;
		if (ew.def.info==2){
			UI.btn.ntfy(0,3,1);
			face[0].page=1;
			UI.txt.block("_main",6,"Dash color coding & haptic alert",15,15,0);
			UIc.start(1,1);
			UI.btn.img("bar","_bar",6,"alert","Alerts",15,6);
			UIc.end();	
			UIc.bar._bar=(i)=>{
				if (i==6){
				buzzer.nav(buzzer.buzz.ok);
				face[0].bar();
				}
			};
		}else{
			this.bar();
		}
	},
	sel:function(no,i,txt,txt2,trgt,limD,limU,m){
		this.slot=i;
		UIc.bar._bar=(i)=>{
			if (i==6){
				//buzzer.nav(buzzer.buzz.ok);
				face[0].page=1;
				UI.ele.ind(0,0,0);
				UIc.start(1,0);
				//if (m) 
				if (this.slot == "amp" ) {
					UI.btn.c2l("main","_main",1,trgt=="hi"?"HI":"LOW","",15,1);
					UI.btn.c2l("main","_main",2,"HAPTIC","",15,euc.dash.alrt[this.slot].hapt.en?4:1);
				}else UI.btn.c2l("main","_main",3,"HAPTIC","",15,euc.dash.alrt[this.slot].hapt.en?4:1);
				UIc.end();
				UI.btn.c3l("main","_lcd",1,euc.dash.alrt[this.slot].hapt[trgt],txt2,14,0);
				//UI.btn.ntfy(1,3,0,"_bar",6,txt,". . . . . . . . .",15,0,1);
				UI.btn.ntfy(1,3,0,"_bar",6,"SET",txt,15,1,1);
				ew.temp.bar=1;
				TC.val={cur:euc.dash.alrt[this.slot].hapt[trgt],dn:limD,up:limU,tmp:0};
				UIc.tcBar=(a,b)=>{ 
					UI.btn.ntfy(0,3,1);
					UI.btn.c1l("main","_lcd",1,b,"",14,0);
					euc.dash.alrt[this.slot].hapt[trgt]=b;
				};
				UIc.main._main=(i)=>{
					if (i==1){
						buzzer.nav(buzzer.buzz.ok);
						face[0].sel(2,"amp",trgt=="hi"?"LOW AMP":"HI AMP","AMP",trgt=="hi"?"low":"hi",trgt=="hi"?-40:10,trgt=="hi"?-1:99);
					}else if (i==2||i==3){
						buzzer.nav(buzzer.buzz.ok);
						euc.dash.alrt[this.slot].hapt.en=1-euc.dash.alrt[this.slot].hapt.en;
						/* if (ew.def.info) {
							ew.temp.l=1;
							//if (UI.ntid) {/clearTimeout(UI.ntid);UI.ntid=0;}
							UI.btn.ntfy(0,1,0,"_bar",6,euc.dash.alrt[this.slot].hapt.en?"ENABLED":"DISABLED","Haptic Feedback",15,0);
							UI.btn.c2l("main","_main",3,euc.dash.alrt[this.slot].hapt.en?"ON":"OFF","",15,euc.dash.alrt[this.slot].hapt.en?4:1);
							//UIc.bar._bar_6();
						}else  
						*/
						UIc.bar._bar(6);
					}
				};
			}else if(i==4){
				euc.dash.alrt[this.slot].hapt.en=1-euc.dash.alrt[this.slot].hapt.en;
				if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
				face[0].bar();
				//if (ew.def.info) {
				//	UI.btn.ntfy(0,0,0,"_bar",7,"HAPTIC "+(euc.dash.alrt[this.slot].hapt.en?"ENABLED":"DISABLED"),"",15,euc.dash.alrt[this.slot].hapt.en?4:0); w.gfx.flip();
				//}
			}
		};
		UIc.bar._bar(6);
	},
	bar:function(){
		"ram";
		UI.ele.ind(this.tab,euc.dash.info.get.makr=="Kingsong"?2:1,0);
		if(ew.temp.l) {ew.temp.l=0; UIc.bar._bar(6);return;}
		ew.temp.bar=0;
		this.page=0;
		UIc.start(1,1);
		if (face[0].tab==1){
			UI.btn.img("main","_2x2",1,"speedS",euc.dash.alrt.spd.hapt.hi,euc.dash.alrt.spd.hapt.en?15:3,euc.dash.alrt.spd.hapt.en?4:1,1);
			UI.btn.img("main","_2x2",2,"battSC",euc.dash.alrt.amp.hapt.hi,euc.dash.alrt.amp.hapt.en?15:3,euc.dash.alrt.amp.hapt.en?4:1,1);
			UI.btn.img("bar","_2x2",3,"tempS",euc.dash.alrt.tmp.hapt.hi,euc.dash.alrt.tmp.hapt.en?15:3,euc.dash.alrt.tmp.hapt.en?4:1,1);
			UI.btn.img("bar","_2x2",4,"battS",euc.dash.alrt.bat.hapt.low,euc.dash.alrt.bat.hapt.en?15:3,euc.dash.alrt.bat.hapt.en?4:1,1);	
			UIc.main._2x2=(i)=>{
				if(i==1){
					buzzer.nav(buzzer.buzz.ok);this.sel(1,"spd","HI SPEED",ew.def.dash.mph?"MPH":"KPH","hi",10,99);
				}else if(i==2){
					buzzer.nav(buzzer.buzz.ok);this.sel(2,"amp","HI AMP","AMP","hi",10,99);
				}
			};
			UIc.bar._2x2=(i)=>{
				if(i==3){
					buzzer.nav(buzzer.buzz.ok);this.sel(3,"tmp","HI TEMP",(ew.def.dash.farn)?"°F":"°C","hi",20,(ew.def.dash.farn)?185:85);
				}else if(i==4){
					buzzer.nav(buzzer.buzz.ok);this.sel(4,"bat","LOW BATT","%","low",5,50);
				}
			};
		}else{
			UI.btn.img("main","_2x1",1,"pwm",euc.dash.alrt.pwm.hapt.hi,15,euc.dash.alrt.pwm.hapt.en?4:1,1);
			UI.ele.fill("_2x1",2,0);
			UIc.main._2x1=(i)=>{
				buzzer.nav(buzzer.buzz.ok);
				this.sel(2,"pwm","HI PWM","%","hi",50,90);
			};
		}
		UI.ele.title("ALERTS",15,0);
		UIc.end();
	},
	show : function(){
		if (!this.run) return; 
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
	tid:-1,
	run:false,
	clear : function(){ew.temp.bar=0;/*TC.removeAllListeners();*/if (this.tid) clearTimeout(this.tid);this.tid=0;return true;},
	off: function(){w.gfx.off();this.clear();}
};
