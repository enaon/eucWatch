euc.brakeLight={
	int:2000,
	tid:0,
	pos:0,
	lp:0,
	en:1,
	motion:function(){
		"ram";
		if(euc.brakeLight.tid) clearInterval(euc.brakeLight.tid);euc.brakeLight.tid=0;
		//digitalPulse(D25,1,[80,150,80]);
		euc.brakeLight.lp=0;
		euc.brakeLight.tid=setInterval(()=>{
			euc.brakeLight.lp++;
				if (dash.live.amp<0) {
					euc.brakeLight.lp=0;
					D25.set();
				}else if  (10<euc.brakeLight.lp) {
					euc.brakeLight.lp=0;
				}else if (euc.brakeLight.lp==7) {
					digitalPulse(D25,1,[40,40,40]);
				}else if (euc.brakeLight.lp==6){
					digitalPulse(D25,1,40);
				}else if (euc.brakeLight.lp==1||euc.brakeLight.lp==3) {
					digitalPulse(D25,1,80);
				} 
		},100);
	},
	still:function(){
		  "ram";
  		if(euc.brakeLight.tid) clearInterval(euc.brakeLight.tid);euc.brakeLight.tid=0;
		euc.brakeLight.lp=0;
		euc.brakeLight.tid=setInterval(()=>{
			euc.brakeLight.lp++;
			if(!euc.brakeLight.en||5<euc.brakeLight.lp) { //clearInterval(euc.brakeLight.tid);euc.brakeLight.tid=0;return;}
				euc.brakeLight.end();
				return;
			}
			digitalPulse(D25,1,[80,150,80]);
		},2200);
	},
	brakes:function(x){
		"ram";
		//print("inbrake",x);
		if(euc.brakeLight.tid) clearInterval(euc.brakeLight.tid);euc.brakeLight.tid=0;
		digitalPulse(D25,1,500);
		D25.set();
		//setTimeout(()=>{D25.set();},150);
	},
	end:function(){
		if(euc.brakeLight.tid) clearInterval(euc.brakeLight.tid);euc.brakeLight.tid=0;
		setTimeout(()=>{digitalPulse(D25,1,[500,250,100]);},300);
		//digitalPulse(D25,1,[500,250,100]);
	}
};
//euc.on("state",(x)=>{if (x) {euc.brakeLight.motion();} else{euc.brakeLight.end();} });
//euc.on("charge",(x)=>{if (!x) {euc.brakeLight.motion();} else{ euc.brakeLight.end();} });
euc.on("brakeLight",(x)=>{
	euc.brakeLight.en=x?1:0;
	if (euc.brakeLight.en) digitalPulse(D25,1,600);//else digitalPulse(D25,1,[500,250,100]);
	if(x) euc.brakeLight.still();
	else  euc.brakeLight.end();
});
euc.on("amp",(x)=>{ 
	"ram";
	if (x<0){
		if (3<dash.live.spd||dash.live.spd<-3) {
			if (euc.status!="brakes") { euc.status="brakes"; euc.emit("status","brakes"); }
		}else if (euc.status!="still") { euc.status="still"; euc.emit("status","still");}
	}else {
		if (3<dash.live.spd||dash.live.spd<-3) {
			if (euc.status!="motion")  { euc.status="motion"; euc.emit("status","motion");}
		}else if (euc.status!="still")  { euc.status="still"; euc.emit("status","still");}
	} 
});
euc.on("status",(x)=>{
	if (x=="brakes") {
		euc.emit("statusBrakes");
	}else if  (x=="still") {
		euc.emit("statusStill");
	}else if  (x=="motion") {
		euc.emit("statusMotion");
	}else if  (x=="charging") {
		euc.emit("statusCharging");
	}
});

//euc.on("statusBrakes",euc.brakeLight.brakes);
euc.on("statusStill",euc.brakeLight.still);
euc.on("statusMotion",euc.brakeLight.motion);

/*
acc.on("double",(x)=>{ 
	"ram";
	if (euc.state!="OFF"||w.isCharging() ) return;
	
	euc.start();
});
*/
set.on("button",`buzzer(300);`);
set.on("button",(x)=>{ 
	"ram";
	if (euc.state!="OFF"||w.isCharging()||!x ) return;
	euc.start();
});
//>NRF.findDevices(function(devices) {print(devices);},  {timeout : 3000, active:true,filters: [{namePrefix:'eL'}]  });

//euc.start();