(function(){
  var CHARGING = 0x07E0;

  function setWidth() {
    WIDGETS["bat"].width = 40 + (P8.isPower()?16:0);
  }

  E.getBattery = function (){
    var v = P8.batV();
    v = v<3.7?3.7:v;
    return Math.floor((v-3.7)*200);
  }

  function draw() {
    var s = 39;
    var x = this.x, y = this.y;
    if (P8.isPower()) {
      g.setColor(CHARGING).drawImage(atob("DhgBHOBzgc4HOP////////////////////3/4HgB4AeAHgB4AeAHgB4AeAHg"),x,y);
      x+=16;
    }
    g.setColor(-1);
    g.fillRect(x,y+2,x+s-4,y+21);
    g.clearRect(x+2,y+4,x+s-6,y+19);
    g.fillRect(x+s-3,y+10,x+s,y+14);
    g.setColor(CHARGING).fillRect(x+4,y+6,x+4+E.getBattery()*(s-12)/100,y+17);
    g.setColor(-1);
  }

  P8.on('power',function(charging) {
    setWidth();
    P8.drawWidgets(); // relayout widgets
    g.flip();
  });

  WIDGETS["bat"]={area:"tr",width:40,draw:draw};
  setWidth();
})()

