euc.breakLight={
  int:2000,
  tid:0,
  pos:0,
  en:0,
  start:function(){
	  "ram";
    if(this.tid) return false;
	digitalPulse(D25,1,80);
	if(!this.en&&!w.isCharging()) return false;
    this.tid=setInterval(()=>{
		if (dash.live.spd==0) {
			if(!euc.breakLight.en) {if (euc.breakLight.int!=1000)  changeInterval(euc.breakLight.tid,1000); return false;}
			euc.breakLight.still();
		}else  {
			digitalPulse(D25,1,dash.live.spd*2);
			if (euc.breakLight.int!=200) changeInterval(euc.breakLight.tid,200);
		}
    },100);
  },
  still:function(){
  "ram";
	for (var i=0;i<1000;i++)
		analogWrite(D25,i/10000,{freq:60});
		digitalPulse(D25,0,[300,50]);
	if (euc.breakLight.int!=5000)  changeInterval(euc.breakLight.tid,3000);
  },
  break:function(){
    if(this.tid) clearInterval(this.tid);
    this.tid=0;
    D25.set();
  },
  end:function(){
	//if(!this.tid) return false;
    if(this.tid) clearInterval(this.tid);
	digitalPulse(D25,1,[400,200,150]);
	this.tid=0;
  }
};
euc.on("state",(x)=>{print ("state",x);if (x) {euc.breakLight.start();} else{euc.breakLight.end();} });
euc.on("charge",(x)=>{ print ("charge",x); if (!x) {euc.breakLight.start();} else{ euc.breakLight.end();} });
euc.on("breakLight",(x)=>{print ("break",x);euc.breakLight.en=x?1:0; });
euc.on("amp",(x)=>{ 
	"ram";
	if ( x < 0 && euc.breakLight.pos){
		euc.breakLight.pos=0;
		euc.breakLight.break();
	}else if ( 0 < x && !euc.breakLight.pos){
		euc.breakLight.pos=1;
		euc.breakLight.start();
	}
});

acc.on("tap",(x)=>{ 
	"ram";
	if (euc.state!="OFF"||!w.isCharging() ) return;
	euc.start();
});

//euc.on("speed",`print(1)`);

//euc.on("state",(x)=>{ print(111111,x) });
