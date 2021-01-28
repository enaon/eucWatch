//handler
//button;
function buttonHandler(s){
  if (this.l1) {clearTimeout(this.l1); this.l1=-1;}
  if (s.state==true) { 
    this.press=true;
	if (!initdone) return;
	this,blon=isDark();
	if (this.blt) { clearTimeout(this.blt);this.blt=0;} else if this.(blon) g.bl(0.2); // backlight on 20%
	//toggle EUC on long press
    this.l1=setTimeout(() => {
      this.l1=-1;
      if (typeof euc !== 'undefined' ) {
		euc.tgl();this.press=false;
      }
    }, 1000);
   }else if (this.press&&s.state==false)  { 
	this.press=false;
	currscr++;if (currscr>=screens.length) currscr=0;
	if (currint>0) clearInterval(currint);
    currint=screens[currscr]();
	if (this.blon)
    this.blt=setTimeout(function(){
      g.bl(0);
      this.blt=0;
    },5000); //backlight off after 5 seconds
	
	
	/*
	if (face.pageCurr==-1) {
		digitalPulse(D6,1,[60,40,60]);
		if (global.euc){
			if (euc.conn!="OFF") face.go("euc",0);else face.go(face.appCurr,0);
		}else face.go(face.appCurr,0);
	}else { 
	  if (face.appCurr=="main"&&face.pagePrev!=-1&&face.pagePrev!=2) {
        if (set.def.acc==1) {
        acc.off();
        acc.go=0;
        setTimeout(function(t){
		  acc.on();
        },2000);
        }
        face.go("main",-1);
        digitalPulse(D6,1,100);
      }else{
      var to=face.pageCurr+1;
      if (to>=2) to=0;
      face.go(face.appCurr,to);
	  }
    }
	*/
  }
}
btn=setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:0});
