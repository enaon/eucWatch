euc.breakLight={
  int:2000,
  tid:0,
  pos:0,
  en:1,
  start:function(){
	  "ram";
    if(this.tid) return false;
	if(this.tidb) {clearInterval(this.tidb); this.tidb=0;}
	digitalPulse(D25,1,[80,150,80]);
	if(!this.en&&!w.isCharging()) return false;
    this.tid=setInterval(()=>{
		if (dash.live.spd==0) {
			if(!euc.breakLight.en) {if (euc.breakLight.int!=1000)  changeInterval(euc.breakLight.tid,1000); return false;}
			euc.breakLight.still();
		}else  {
			//digitalPulse(D25,1,[dash.live.spd*2,80,dash.live.spd*2]);
			digitalPulse(D25,1,[100,300,80,250,70,30,70,30,70]);
			//if (euc.breakLight.int!=200) 
			//changeInterval(euc.breakLight.tid,3000-(dash.live.spd*20));
			changeInterval(euc.breakLight.tid,1500);
		}
    },500);
  },
  still:function(){
  "ram";
	//for (var i=0;i<1000;i++)
	//	analogWrite(D25,i/10000,{freq:60});
	//	digitalPulse(D25,1,[100,300,80,250,70,30,70,30,70]);

		digitalPulse(D25,1,[50,100,50]);
	if (euc.breakLight.int!=3000)  changeInterval(euc.breakLight.tid,3000);
  },
  break:function(){
	  "ram";
	if(this.tid) { clearInterval(this.tid);  this.tid=0;}
    D25.set();
	if(this.tidb) clearInterval(this.tidb);
	this.tidb=setInterval(()=>{
		changeInterval(euc.breakLight.tid,150);
		digitalPulse(D25,1,80);
	},1000);

  },
  end:function(){
	//if(!this.tid) return false;
	if(this.tidb) clearInterval(this.tidb);
	this.tidb=0;
    if(this.tid) clearInterval(this.tid);
	this.tid=0;
	digitalPulse(D25,1,[400,200,100]);
  }
};
euc.on("state",(x)=>{print ("state",x);if (x) {euc.breakLight.start();} else{euc.breakLight.end();} });
euc.on("charge",(x)=>{ print ("charge",x); if (!x) {euc.breakLight.start();} else{ euc.breakLight.end();} });
euc.on("breakLight",(x)=>{print ("break",x);euc.breakLight.en=x?1:0;
	if (euc.breakLight.en) digitalPulse(D25,1,600);else digitalPulse(D25,1,[500,250,100]);
	if(x) euc.breakLight.start();
	else  euc.breakLight.end();
});
euc.on("amp",(x)=>{ 
	"ram";
	if ( x < 0 && euc.breakLight.pos){
		euc.breakLight.pos=0;
		if(euc.breakLight.tid) { clearInterval(euc.breakLight.tid);  euc.breakLight.tid=0;}
		D25.set();
		//euc.breakLight.break();
	}else if ( 0 < x && !euc.breakLight.pos){
		euc.breakLight.pos=1;
		euc.breakLight.start();
	}
});

acc.on("double",(x)=>{ 
	"ram";
	if (euc.state!="OFF"||w.isCharging() ) return;
	
	euc.start();
});
set.on("button",`buzzer(300);`);

//>NRF.findDevices(function(devices) {print(devices);},  {timeout : 3000, active:true,filters: [{namePrefix:'eL'}]  });

euc.start();