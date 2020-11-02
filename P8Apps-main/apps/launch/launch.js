/* T-watch Desktop launcher
*
*/

var s = require("Storage");
var apps = s.list(/\.info$/).map(app=>{var a=s.readJSON(app,1);return a&&{name:a.name,type:a.type,icon:a.icon,sortorder:a.sortorder,src:a.src};}).filter(app=>app && (app.type=="app" || app.type=="clock" || !app.type));
apps.sort((a,b)=>{
  var n=(0|a.sortorder)-(0|b.sortorder);
  if (n) return n; // do sortorder first
  if (a.name<b.name) return -1;
  if (a.name>b.name) return 1;
  return 0;
});

function draw_icon(n,selected) {
    var x = (n%3)*80; 
    var y = n>2?130:40;
    (selected?g.setColor(0.8,0.8,1.0):g.setColor(0.5,0.5,1.0)).fillRect(x,y,x+79,y+89);
    g.drawImage(s.read(apps[n].icon),x+10,y+10,{scale:1.25});
    g.setColor(-1).setFontAlign(0,-1,0).setFont("6x8",2).drawString(apps[n].name,x+40,y+74);
}

function init(){
    g.setColor(0.5,0.5,1.0).fillRect(0,0,239,239);
    g.setFont("6x8",2).setFontAlign(0,-1,0).setColor(1,1,1).drawString("P8-Espruino",120,12);
    for (var i=0;i<7;i++) {
        if (!apps[i]) return i;
        draw_icon(i,false);
    }
}

var Napps;
var selected = -1;

function isTouched(p,n){
    if (n<0 || n>5) return false;
    var x1 = (n%3)*80; var y1 = n>2?130:40;
    var x2 = x1+79; var y2 = y1+89;
    return (p.x>x1 && p.y>y1 && p.x<x2 && p.y<y2);
}

TC.on("touch",(p)=>{
    var i;
    for (i=0;i<Napps;i++){
        if (isTouched(p,i)) {
            draw_icon(i,true);
            if (selected>=0) {
                if (selected!=i){
                    draw_icon(selected,false);
                } else {
                  if (D17.read()) reset(); else load(apps[i].src);
                }
            }
            selected=i;
            break;
        }
    }
    if (i==Napps && selected>=0) {
        draw_icon(selected,false);
        selected=-1;
    }
});

setTimeout(()=>{Napps=init();},1000);
