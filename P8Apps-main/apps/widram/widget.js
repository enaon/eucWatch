(() => {
  function draw() {
    g.reset();
    var m = process.memory();
    var pc = Math.round(m.usage*100/m.total);
    g.drawImage(atob("BwgBqgP////AVQ=="), this.x+(40-7)/2, this.y+4);
    g.setColor(pc>70 ? "#ff0000" : (pc>50 ? "#ffff00" : "#ffffff"));
    g.setFont("6x8").setFontAlign(0,0).drawString(pc+"%", this.x+20, this.y+20, true/*solid*/);
  }
  
  WIDGETS["ram"]={area:"tl",width: 40,draw:draw};
})()
