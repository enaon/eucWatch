//driver for HRS3300
/*
var dcFilter = E.compiledC(`
// void init(int, int)
// int filter(int)
// int avgDC()

__attribute__((section(".text"))) int NSAMPLE = 24;
__attribute__((section(".text"))) int BIAS = 0;
__attribute__((section(".text"))) int sample_avg_total = 0;

void init(int v, int bias){
    NSAMPLE=v;
    BIAS=bias;
}

//remove dc from sample
int  filter(int sample) {
    sample_avg_total += (sample - sample_avg_total/NSAMPLE);
    return (sample - sample_avg_total/NSAMPLE)+BIAS;
}
// return average dc
int avgDC() {return sample_avg_total/NSAMPLE;}
       
`);
*/

var dcFilter = (function(){
  var bin=atob("AAAAABgAAAAAAAAAAkt7RAnLkPvz8HBH7v///wdJeUQwtZHoJACS+/X0BBujGAtgk/v188MaiGgYRDC93v///wJLe0RYYJlgcEcAv7r///8=");
  return {
    init:E.nativeCall(65, "void(int, int)", bin),
    filter:E.nativeCall(29, "int(int)", bin),
    avgDC:E.nativeCall(13, "int()", bin),
  };
})();
/*
var maFilter = E.compiledC(`
// void init(int)
// int filter(int)

__attribute__((section(".text"))) int NSLOT = 8;
__attribute__((section(".text"))) int nextslot = 0;
__attribute__((section(".text"))) int buffer[16];

void init(int n){
  NSLOT = n<=0?1:n>16?16:n;
}

int filter(int value) {
  buffer[nextslot] = value;
  nextslot = (nextslot+1) % NSLOT;
  int total = 0;
  for(int i=0; i<NSLOT; ++i) total += buffer[i];
  return total/NSLOT;
}        
`);
*/
var maFilter = (function(){
  var bin=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADkl5RBC1C2gNTAHrgwIBM1BgSmyT+/LwAvsQMwtgACMYRnxEk0IF2iEdUfgjEAEzCET355D78vAQvQC/sv///5L///8AKAPdECiovxAgAOABIAJLe0RYZHBHAL9g////");
  return {
    init:E.nativeCall(141, "void(int)", bin),
    filter:E.nativeCall(73, "int(int)", bin),
  };
})();
/*

var medianFilter = E.compiledC(`
// int filter(int)

__attribute__((section(".text"))) int NSLOT = 7;
__attribute__((section(".text"))) int nextslot = 0;
__attribute__((section(".text"))) int buffer[7];

int filter(int value) {
  int mbuf[7];
  buffer[nextslot] = value;
  nextslot = (nextslot+1) % NSLOT;
  for(int p=0; p<NSLOT; ++p)mbuf[p]=buffer[p];
  int minValue;
  for(int i=0;i<4;++i){
      minValue=mbuf[i];
      for (int j = i+1;j<7;++j){
          if (mbuf[j]<minValue){
              minValue=mbuf[j];
              mbuf[j] = mbuf[i];
              mbuf[i]=minValue;
          }
      }
  }
  return mbuf[2];
}        
`);
*/

var medianFilter = (function(){
  var bin=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAGEp6RDC1E2gXTALrgwEBM0hgEWqT+/HwAfsQMxNgibAAI3xEi0ID22tGBKwHrQfgIh1S+CMAAapC+CMAATPx51P4BA8aRlL4BB+BQr+/GGgQYBlgCEaqQvXRo0Lw0QOYCbAwvdb///+2////");
  return {
    filter:E.nativeCall(37, "int(int)", bin),
  };
})();

var HRS = {
  avgtotal:0,
  NSAMPLE:24, // Exponential Moving average DC removal alpha = 1/NSAMPLE
  NSLOT:4,
  next:0,
  buf:Int16Array(4),
  writeByte:(a,d) => { 
      I2C1.writeTo(0x44,a,d);
  }, 
  readByte:(a) => {
      I2C1.writeTo(0x44, a);
      return I2C1.readFrom(0x18,1)[0]; 
  },
  init:() => {
      HRS.writeByte(0x01,0x60); //reg ENABLE 12.5ms wait, (partly) 20ma drive
      HRS.writeByte(0x0C,0x6E); // reg PDRIVER 20ma driver power on
      HRS.writeByte(0x16,0x88); //reg REG , HRS and ALS in 16-bit mode
      HRS.writeByte(0x17,0x10); //reg HGAIN , 64x gain
  },
  enable:(b) => {
      var en = HRS.readByte(0x01);
      en = b?en|0x80:en&~0x80;
      HRS.writeByte(0x01,en);
  },
  read:()=>{
      var m = HRS.readByte(0x09);
      var h = HRS.readByte(0x0A);
      var l = HRS.readByte(0x0F);
      return(m<<8)|((h&0x0F)<<4)|(l&0x0F); //16 bit
  },
};

P8.setLCDTimeout(600);
var x =0;
var interval;

function doread(){
  //var time= Date.now();
  var v =  HRS.read();
  v =  dcFilter.filter(v);
  v = medianFilter.filter(v);
  v = maFilter.filter(v);
  v = 120+v/4;
  v = v>239?239:v<0?0:v;
  g.setColor(0);
  g.fillRect(x,0,x,239);
  g.setColor(0x07E0);
  g.fillRect(x,239,x,239-v);
  ++x;
  if (x>=240) x = 0;
  //time = Math.floor(Date.now()-time);
  //console.log("Time: "+time+"ms");
}

function test(){
  g.clear();
  x=0;
  HRS.init();
  HRS.enable(true);
  dcFilter.init(24,0);
  interval = setInterval(doread,25);
  setTimeout(()=>{
      if(interval) clearInterval(interval); 
      HRS.enable(false);
  },40000);
}