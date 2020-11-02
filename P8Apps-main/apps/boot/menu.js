E.showMenu = function(items) {
    var pal = new Uint16Array([0x0000,0x000F,0x03F7,0xFFFF]);
    var b = P8.buffer;
    if (!b) {
         b = Graphics.createArrayBuffer(240,180,2,{msb:true});
         P8.buffer = b;
    } else b.clear();
    var flip = function(){
      g.drawImage({width:240,height:180,bpp:2,buffer:b.buffer,palette:pal},0,20);
    }
    if (P8.buttons) {TC.removeListener("touch",P8.buttons); P8.buttons=undefined;}
    if (!items){ flip(); return; }
    var w = b.getWidth()-9;
    var h = b.getHeight();
    var menuItems = Object.keys(items);
    var options = items[""];
    if (options) menuItems.splice(menuItems.indexOf(""),1);
    if (!(options instanceof Object)) options = {};
    options.fontHeight=16;
    options.x=0;
    options.x2=w-2;
    options.y=0;
    options.y2=179;
    if (options.selected === undefined)
      options.selected = 0;
    if (!options.fontHeight)
      options.fontHeight = 6;
    var x = 0|options.x;
    var x2 = options.x2||(b.getWidth()-1);
    var y = 0|options.y;
    var y2 = options.y2||(b.getHeight()-1);
    if (options.title)
      y += options.fontHeight+2;
    var cBg = 1; // background col
    var cFg = 3; // foreground col
    var cHighlightBg = 2;
    var cHighlightFg = 3;
    var l = {
      draw : function() {
        b.reset();
        b.setColor(cFg);
        b.setFont('6x8',2).setFontAlign(0,-1,0);
        if (options.title) {
          b.drawString(options.title,(x+x2)/2,y-options.fontHeight-2);
          b.drawLine(x,y-2,x2,y-2);
        }
        var rows = 0|Math.min((y2-y) / options.fontHeight,menuItems.length);
        var idx = E.clip(options.selected-(rows>>1),0,menuItems.length-rows);
        var iy = y;
        var less = idx>0;
        while (rows--) {
          var name = menuItems[idx];
          var item = items[name];
          var hl = (idx==options.selected && !l.selectEdit);
          b.setColor(hl ? cHighlightBg : cBg);
          b.fillRect(x,iy,x2,iy+options.fontHeight-1);
          b.setColor(hl ? cHighlightFg : cFg);
          b.setFontAlign(-1,-1);
          b.drawString(name,x,iy);
          if ("object" == typeof item) {
            var xo = x2;
            var v = item.value;
            if (item.format) v=item.format(v);
            if (l.selectEdit && idx==options.selected) {
              xo -= 24 + 1;
              b.setColor(cHighlightBg);
              b.fillRect(xo-(b.stringWidth(v)+4),iy,x2,iy+options.fontHeight-1);
              b.setColor(cHighlightFg);
              b.drawImage("\x0c\x05\x81\x00 \x07\x00\xF9\xF0\x0E\x00@",xo,iy+(options.fontHeight-10)/2,{scale:2});
            }
            b.setFontAlign(1,-1);
            b.drawString(v,xo-2,iy);
          }
          b.setColor(cFg);
          iy += options.fontHeight;
          idx++;
        }
        b.setFontAlign(-1,-1);
        var more = idx<menuItems.length;      
        b.setColor(more?-1:0);
        b.fillPoly([104,172,136,172,120,179]);
        flip();
      },
      select : function(dir) {
        var item = items[menuItems[options.selected]];
        if ("function" == typeof item) item(l);
        else if ("object" == typeof item) {
          // if a number, go into 'edit mode'
          if ("number" == typeof item.value)
            l.selectEdit = l.selectEdit?undefined:item;
          else { // else just toggle bools
            if ("boolean" == typeof item.value) item.value=!item.value;
            if (item.onchange) item.onchange(item.value);
          }
          l.draw();
        }
      },
      move : function(dir) {
        if (l.selectEdit) {
          var item = l.selectEdit;
          item.value -= (dir||1)*(item.step||1);
          if (item.min!==undefined && item.value<item.min) item.value = item.min;
          if (item.max!==undefined && item.value>item.max) item.value = item.max;
          if (item.onchange) item.onchange(item.value);
        } else {
          options.selected = (dir+options.selected)%menuItems.length;
          if (options.selected<0) options.selected += menuItems.length;
        }
        l.draw();
      }
    };
    var selbut = -1;
    var butdefs = [{x1:10,y1:200,x2:59,y2:239,poly:[35,204,20,235,50,235]},
                   {x1:95,y1:200,x2:144,y2:239,poly:[105,204,135,204,105,235,135,235]},
                   {x1:180,y1:200,x2:229,y2:239,poly:[190,204,220,204,205,235]}];
    var drawButton = function(d,sel){
         (sel?g.setColor(0.8,0.8,1.0):g.setColor(0.5,0.5,1.0)).fillRect(d.x1,d.y1,d.x2,d.y2);
         g.setColor(-1).fillPoly(d.poly);
    };
    for(var i=0;i<3;i++)drawButton(butdefs[i],false);
    var isPressed = function(p,n) {
        var d = butdefs[n];
        var bb = (p.x>d.x1 && p.y>d.y1 && p.x<d.x2 && p.y<d.y2);
        if (bb) {selbut=n; drawButton(d,true);setTimeout(()=>{drawButton(d,false);},200);}
        return bb;
    };
    P8.buttons = function(p){
      if (isPressed(p,0)) l.move(-1);
      else if (isPressed(p,1)) l.select(); 
      else if (isPressed(p,2)) l.move(1);
      else selbut=-1;
    };
    l.draw();
    TC.on("touch",P8.buttons);
    return l;  
  };
