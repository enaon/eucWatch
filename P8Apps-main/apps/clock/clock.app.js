var FACES = [];
var iface = 0;
var STOR = require("Storage");
eval(STOR.read("prompt.js"));
eval(STOR.read("widgets.js"));
STOR.list(/\.face\.js$/).forEach(face=>FACES.push(eval(require("Storage").read(face))));
var face = FACES[iface]();
var intervalRefSec;

function stopdraw() {
  if(intervalRefSec) {intervalRefSec=clearInterval(intervalRefSec);}
  g.clear();
}

function widbat(){
    var x = 140;
    var y = 0;
    function getBattery(){
        var v = P8.batV();
        v = v<3.7?3.7:v;
        return Math.floor((v-3.7)*200);
    }
    var s = 39;
    g.reset();
    g.setColor(0xFFFF);
    g.fillRect(x,y+2,x+s-4,y+21);
    g.clearRect(x+2,y+4,x+s-6,y+19);
    g.fillRect(x+s-3,y+10,x+s,y+14);
    g.setColor(0x07E0).fillRect(x+4,y+6,x+4+getBattery()*(s-12)/100,y+17);
    g.flip();
}

function startdraw() {
  g.reset();
  face.init();
  intervalRefSec = setInterval(face.tick,1000);
  P8.drawWidgets();
}

var SCREENACCESS = {
  withApp:true,
  alertTO:undefined,
  request:function(){
    this.withApp=false;
    stopdraw();
    this.alertTO = setTimeout(()=>{load("launch.js");},600000);
  },
  release:function(){
    this.withApp=true;
    if (this.alertTO) {clearTimeout(this.alertTO); this.alertTO=undefined;}
    startdraw(); 
  }
}; 

P8.on('sleep',function(b) {
  if (!SCREENACCESS.withApp) return;
  if (!b) {
      startdraw();
  } else {
      stopdraw();
  }
});

function setButtons(){
  function newFace(inc){
    var n = FACES.length-1;
    iface+=inc;
    iface = iface>n?0:iface<0?n:iface;
    stopdraw();
    face = FACES[iface]();
    startdraw();
  }
  TC.on('swipe',(dir)=>{
    if (!SCREENACCESS.withApp) return;
    if (dir ==TC.RIGHT) newFace(1);
    else if (dir == TC.LEFT) newFace(-1);
  });
}

P8.loadWidgets();

setTimeout(()=>{
  g.clear();
  startdraw();
  setButtons();
},500);



