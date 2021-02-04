//Accelerometer
//BMA223 SPI accelerometer
//AI1=D4;AI2=D3;ACS=D2;AMOSI=D30;AMISO=D31;ACLK=D29;APWR=D7;

function BMA223(){
  var acc;

  function readreg(r){
    return acc.send([0x80|r,0x00],D2)[1];
  }

  function writereg(r,v){
      acc.send([0x7f & r,v],D2);
  }

  function setbit(r,b){
      var v = readreg(r);
      writereg(r,v | 1<<b);
  }
  function set2bit(r,b,val){
      var v = readreg(r);
      writereg(r,v | val<<b);
  }
  function resetbit(r,b){
    var v = readreg(r);
    writereg(r,v & ~(1<<b));
  }

  function lowPowerMode(b){
    if (b)
      setbit(0x11,6);
    else
      resetbit(0x11,6);
  }

  function initAll(){
    acc=new SPI();
    acc.setup({sck:D29,miso:D31,mosi:D30,mode:0});
    D2.reset();
    D7.reset();
    setTimeout(()=>{
        D7.set();
        D2.set();
        setTimeout(()=>{
          writereg(0x21,0x0E); //latch interrupt for 50ms
          setbit(0x16,5); // single tap enable
          setbit(0x19,5); // map it to INT1
		  set2bit(0x2b,7,0x00b); 
          lowPowerMode(true);
        },100);     
    },100);
  }
  tap={offid:0,wake:0};
  // values are 4 is face tap, 2 side tap, 1 bottom or top side tap
  setWatch(()=>{
      var rv = readreg(0x0b);
      var v = (rv&0x7f)>>4;
      v  = rv&0x80?-v:v;
	  if (tap.wake) {
		if (v<=1&&v>=-1) euc.wri("lightsOn");
		else {
          euc.ch.writeValue(euc.cmd("lightsAuto"));
          setTimeout(function(){euc.ch.writeValue(euc.cmd("lightsOn"));},200);
        }
	  } else {
	    tap.wake=1;lowPowerMode(false);
		if (tap.offid) {clearTimeout(tap.offid); tap.offid=0;}
		tap.offid=setTimeout((c)=>{
			tap.offid=0;
			tap.wake=0;
			lowPowerMode(true);
		},500);
	  }
      console.log("Tap: "+v);
  },D4,{ repeat:true, debounce:false, edge:'rising' });

  function readXYZ(){
    function conv(i){
      return (i & 0x7F)-(i & 0x80);
    }
    return {
      x:conv(readreg(3)),
      y:conv(readreg(5)),
      z:conv(readreg(7))
    };
  }

  return {init:initAll, read:readXYZ, lowPower:lowPowerMode};
}


var ACCEL = BMA223();
ACCEL.init();
