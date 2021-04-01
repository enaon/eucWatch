//dsd6 handler 
var w_up=false;
var press=true;
var dbl=0;
var offid=-1;
var offms=5000;
var fcurr=-1;
var fprev=-1;
var faces = [
  clockFace,
//  nb_Main,
  nb_Info,
  nb_Main,
//  nb_Info2,

];

function buttonHandler(s){

  if (digitalRead(BTN)==1) { 
  
	
    press=true;
    if (typeof l2 !== "undefined") {clearTimeout(l2);}
    if (typeof offid !== "undefined") {clearTimeout(offid);}
	
	l2=setTimeout(() => {
        if (digitalRead(BTN)==1) {
        w.vibrate(0.85,2,400,100); 
        NRF.setServices({},{uart:false});
        NRF.setServices({},{uart:true});  
		l2=setTimeout(() => {reset();}, 1000);
        //reset();
	    }
    }, 4000);  
    if ( fcurr==-1 && nb_conn==0) return;
	offid=setTimeout(() => {
      if (gatt.connected || nb_conn==3) {
        nb_conn=0; w.vibrate(0.85,2,100,50);
		if (typeof nb_rec_tmr !== "undefined") {clearTimeout(nb_rec_tmr); console.log("clear tmr");}
        o.setContrast(75);
        w.accWrite(0x18,0x41); //acc in standby mode
        w_up=false;
        if (fcurr!=-1){
        faces[fcurr].exit(); faces[fcurr].off();
        }
        fcurr=1;
        faces[fcurr].init();faces[fcurr].show(o);
        offid=setTimeout(() => { faces[fcurr].exit(); 
          faces[fcurr].off();o.off(); fcurr=-1; }, 1500);
        
      } else if (!gatt.connected && nb_conn!=4 && nb_conn!=3) {
        w.vibrate(0.85,1,100,600); ninebot(); nb_conn=4; 
        o.setContrast(150);
        w.accWrite(0x18,0xC1); //acc in tilt mode
        if (fcurr!=-1){
        faces[fcurr].exit(); faces[fcurr].off();
        }        
        fcurr=1;
        faces[fcurr].init();faces[fcurr].show(o);
        offid=setTimeout(() => { faces[fcurr].exit(); 
        faces[fcurr].off();o.off(); fcurr=-1; }, 8000);
       }
      press=false;
    }, 1000);
    
    return;
    
  }else if (press)  { 
    if (typeof l2 !== "undefined") {clearTimeout(l2);}
    if (typeof offid !== "undefined") {clearTimeout(offid);}

    if  (fcurr==-1 && w_up==false) {
      dbl++;
      setTimeout(() => {dbl=0;}, 300);
      if (dbl==2) { dbl=0;}
      else return;
    }
	var fshow=1;
    if (fcurr<0){
    // nothing active, make first one
    fprev=fcurr;
    fcurr=0;
    if (nb_conn!=0) fcurr=1;  
    if (faces[fcurr].init) faces[fcurr].init();
    } else {
    // ask active one to exit
    if (!faces[fcurr].exit || faces[fcurr].exit(o)){
      // ok exit from current face allowed
      fprev=fcurr;
      if(o.isOn) {
        fcurr++; if (fcurr >= faces.length) fcurr=0;
      } else fcurr=0;
      if (faces[fcurr].init) faces[fcurr].init();
      } else fshow=0;
    }
    if (offid>=0) clearTimeout(offid);
    var foffms=faces[fcurr].offms;
    offid=setTimeout((f)=>{
      if (f>=0 && faces[f].off) faces[f].off(o);
      o.off();offid=-1;fcurr=-1;
    },(foffms>0)?foffms:offms,fcurr);
    if (fshow) faces[fcurr].show(o);
  }
}

//setup
setTimeout(()=>{
  o.setContrast(100);
  o.off();
  o.setRotation(0); //vertical
  //E.setPassword("1234");
//  E.lockConsole();
  w.vibrate(0.75,1,200,600);
  //eval(require('Storage').read('ninebot')); //call ninebot
  //w.setClock("2020-04-19T04:29:02",0); //set time
  E.setTimeZone(3);
  setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:"both"});

  w.initAccel();
  w.accWrite(0x18,0x41); //standby mode
  //w.accWrite(0x18,0x45); //both tilt and tap
  //w.accWrite(0x19,0x3F);;//all three axes
  w.accWrite(0x19,0x10);//enable when face up
  w.accWrite(0x22,0x01);
  w.accWrite(0x32,0x0C); //22 degrees
  //w.accWrite(0x32,0x03); //6 degrees
  w.accWrite(0x1c,0x30);
  w.accWrite(0x1f,0x01);
  //w.accWrite(0x1f,0x05); //both tilt and tap
  //w.accWrite(0x18,0xC1); // operational mode tilt
  //w.accWrite(0x18,0xC5);//operational mode both tilt and tap
  w.accRegDump(0x17);
  
  setWatch(function(s){
  if (s.state){
  console.log((w.accRegDump(0x10)));
    var state=(w.accRegDump(0x10)).toString().split(' ');
	if (state[0]==16) {
     // w.accWrite(0x19,0x2f);
      w.accWrite(0x19,0x2c);
      w_up=true;
      if (typeof offid !== "undefined") {clearTimeout(offid);}
      if (fcurr==-1) { 
        press=true;
        buttonHandler();
      }
    }else {
       w.accWrite(0x19,0x10);
       w_up=false;
      if (fcurr!=-1) {  
      if (typeof offid !== "undefined") {clearTimeout(offid);}
      offid=setTimeout(() => { faces[fcurr].exit(); 
        faces[fcurr].off();o.off(); fcurr=-1; }, 2000);
    }
    }
    w.accRegDump(0x17);
  }
  },D15,true);  
  
  setWatch(function(s){
	  if (digitalRead(D2)==1) 
		w.vibrate(0.85,1,200,600);
	  else
		w.vibrate(0.85,2,100,100);
  },D2,true);  
  
},500);

setupSerial();// first set to known state
// now pause serial console for power saving, it will be enabled when RX goes high
// it should be enough to connect to serial adapter
pauseConsole(Serial1);

