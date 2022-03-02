//dash  Alerts
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
		if (face.appPrev!="settings"&&face.appPrev!="dashOptions")  face.last=face.appPrev;
       //if (!face.appPrev.startsWith("dash")) this.g.clear();
	    
		if (set.def.info){
			UI.btn.ntfy(0,3,1);
			face[0].page=1;
			UI.txt.block("_main",6,"Dash color coding & haptic alert",15,15,0);
			UIc.start(1,1);
			//UI.btn.img("bar","_bar",4,_icon.buzzOn,"Haptic",15,4);
			UI.btn.img("bar","_bar",6,_icon.settings,"Alerts",15,6);
			UIc.end();	
			UIc.bar._bar_6=function(){
				buzzer(buz.ok);
				face[0].bar();
			}
			//UIc.main._bar_4=function(){buzzer(buz.ok);face[0].del(no);};

			//UIc.bar._bar_4();
		}else{
			UI.ele.ind(1,1,6);
		UI.ele.title("ALERTS",15,0);
		UIc.start(1,1);
		UI.btn.img("main","_2x2",1,_icon.speed,dash.live.spd1,15,dash.live.hapS?4:1);
		UI.btn.img("main","_2x2",2,_icon.amp,dash.live.ampH,15,dash.live.hapA?4:1);
		UI.btn.img("bar","_2x2",3,_icon.temp,dash.live.tmpH,15,dash.live.hapT?4:1);
		UI.btn.img("bar","_2x2",4,_icon.batt,dash.live.batL,15,dash.live.hapB?4:1);	
		//UI.btn.c2l("main","_2x2",1,"HI SPEED",dash.live.spd1,15,dash.live.hapS?4:1);
		//UI.btn.c2l("main","_2x2",2,"HI AMP",dash.live.ampH,15,dash.live.hapA?4:1);
		//UI.btn.c2l("bar","_2x2",3,"HI TEMP",dash.live.tmpH,15,dash.live.hapT?4:1);
		//UI.btn.c2l("bar","_2x2",4,"LOW BATT",dash.live.batL,15,dash.live.hapB?4:1);		
		UIc.end();
		UIc.main._2x2_1=()=>{buzzer(buz.ok);this.sel(1,"hapS","HI SPEED",set.def.dash.mph?"MPH":"KPH","spd1",10,99);};
		UIc.main._2x2_2=()=>{buzzer(buz.ok);this.sel(2,"hapA","HI AMP","AMP","ampH",10,99);};
		UIc.bar._2x2_3=()=>{buzzer(buz.ok);this.sel(3,"hapT","HI TEMP",(set.def.dash.farn)?"°F":"°C","tmpH",20,99);};
		UIc.bar._2x2_4=()=>{buzzer(buz.ok);this.sel(4,"hapB","LOW BATT","%","batL",5,75);};
        //this.run=true;
		}
	},
	sel:function(no,i,txt,txt2,trgt,limD,limU,m){
		this.slot=i;
		UIc.bar._bar_6=function(){
			//buzzer(buz.ok);
			face[0].page=1;
			UIc.start(1,0);
			//if (m) 
			//UI.btn.c2l("main","_main",1,"MORE","",15,1);
			UI.btn.c2l("main","_main",3,"HAPTIC","",15,dash.live[i]?4:1);
			UIc.end();
			UI.btn.c3l("main","_main",9,dash.live[trgt],txt2,15,0);
			UI.btn.ntfy(1,3,0,"_bar",6,txt,". . . . . . . . .",15,6,1);
			set.bar=1;
			TC.val={cur:dash.live[trgt],dn:limD,up:limU,tmp:0};
			UIc.tcBar=(a,b)=>{ 
				UI.btn.ntfy(0,3,1);
				UI.btn.c1l("main","_main",9,b,"",15,0);
				dash.live[trgt]=b;
			};
			UIc.main._main_1=()=>{face[0].sel(3,"hapT","TEMP1","","tmpH",20,99);};
			UIc.main._main_3=()=>{
				buzzer(buz.ok);
				dash.live[i]=1-dash.live[i];
				if (set.def.info) {
					set.l=1;
					//if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;/*face[0].bar();*/}
					UI.btn.ntfy(0,1.5,0,"_bar",6,"HAPTIC",dash.live[i]?"ENABLED":"DISABLED",15,0);
					UI.btn.c2l("main","_main",3,dash.live[i]?"ON":"OFF","HAPTIC",15,dash.live[i]?4:1);
					//UIc.bar._bar_6();
				}else	
					UIc.bar._bar_6();
			};
		};
		UIc.bar._bar_4=function(){
			dash.live[i]=1-dash.live[i];
			//UI.btn.c2l("main","_2x2",no,txt,dash.live[i],15,dash.live[i]?4:1);
			//UI.btn.img("main","_2x2",no,_icon[txt.toLowerCase()],txt,15,dash.live[i]?4:1);
			if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
			face[0].bar();
			if (set.def.info) {
				UI.btn.ntfy(0,0,0,"_bar",7,"HAPTIC "+(dash.live[i]?"ENABLED":"DISABLED"),"",15,dash.live[i]?4:0); w.gfx.flip();
			}
		};
		UIc.bar._bar_6();
	},
	bar:function(){
		"ram";
		if(set.l) {set.l=0; UIc.bar._bar_6();return;}
		set.bar=0;
		if (this.page) {
			this.page=0;
			UIc.start(1,0);
			//UI.btn.c2l("main","_2x2",1,"SPEED",dash.live.spd1,15,dash.live.hapS?4:1);
			//UI.btn.c2l("main","_2x2",2,"AMP",dash.live.ampH,15,dash.live.hapA?4:1);
			UI.btn.img("main","_2x2",1,_icon.speed,dash.live.spd1,15,dash.live.hapS?4:1);
			UI.btn.img("main","_2x2",2,_icon.amp,dash.live.ampH,15,dash.live.hapA?4:1);
			UIc.end();
			UIc.main._2x2_1=()=>{buzzer(buz.ok);this.sel(1,"hapS","HI SPEED",set.def.dash.mph?"MPH":"KPH","spd1",10,99);};
			UIc.main._2x2_2=()=>{buzzer(buz.ok);this.sel(1,"hapA","HI AMP","AMP","ampH",10,99);};
		}
		UIc.start(0,1);
		//UI.btn.c2l("bar","_2x2",3,"HI TEMP",dash.live.tmpH,15,dash.live.hapT?4:1);
		//UI.btn.c2l("bar","_2x2",4,"LOW BATT",dash.live.batL,15,dash.live.hapB?4:1);
		UI.btn.img("bar","_2x2",3,_icon.temp,dash.live.tmpH,15,dash.live.hapT?4:1);
		UI.btn.img("bar","_2x2",4,_icon.batt,dash.live.batL,15,dash.live.hapB?4:1);	
		UI.ele.title("ALERTS",15,0);
		UIc.end();
		UIc.bar._2x2_3=()=>{buzzer(buz.ok);this.sel(3,"hapT","HI TEMP",(set.def.dash.farn)?"°F":"°C","tmpH",20,99);};
		UIc.bar._2x2_4=()=>{buzzer(buz.ok);this.sel(4,"hapB","LOW BATT","%","batL",5,75);};
	},
	show : function(){
		if (!this.run) return; 
		if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
	tid:-1,
	run:false,
	clear : function(){set.bar=0;/*TC.removeAllListeners();*/if (this.tid) clearTimeout(this.tid);this.tid=0;return true;},
	off: function(){this.g.off();this.clear();}
};

//touch
touchHandler[0]=function(){};
tcN=(x,y)=>{
	buzzer(buz.na);
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	if (UI.ntid) {/*buzzer(buz.ok);*/clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}
	else if (face.appPrev!="settings")
		face.go(face.appPrev,0);
	else
		face.go("main",0);
};	
tcBack.replaceWith(tcB);

