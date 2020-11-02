(() => {

    function getFace(){

    const p = Math.PI/2;
    const PRad = Math.PI/180;
    //var pal2color = new Uint16Array([0x0000,0xF800,0x07ff,0xffff],0,4);
    var buf = Graphics.createArrayBuffer(240,212,1,{msb:true});
    function flip() {
      g.setColor(1,1,1);
      g.drawImage({width:240,height:212,bpp:1,buffer:buf.buffer},0,25);
    }


    function seconds(angle, r) {
        const a = angle*PRad;
        const x = 120+Math.sin(a)*r;
        const y = 106-Math.cos(a)*r;
        if (angle % 90 == 0) {
            buf.setColor(1);
            buf.fillRect(x-6,y-6,x+6,y+6);
        } else if (angle % 30 == 0){
            buf.setColor(1);
            buf.fillRect(x-4,y-4,x+4,y+4);
        } else {
            buf.setColor(1,1,1);
            buf.fillRect(x-1,y-1,x+1,y+1);
        }
    }

    function hand(angle, r1,r2, r3) {
        const a = angle*PRad;
        buf.fillPoly([
            120+Math.sin(a)*r1,
            106-Math.cos(a)*r1,
            120+Math.sin(a+p)*r3,
            106-Math.cos(a+p)*r3,
            120+Math.sin(a)*r2,
            106-Math.cos(a)*r2,
            120+Math.sin(a-p)*r3,
            106-Math.cos(a-p)*r3]);
    }

    var minuteDate;
    var secondDate;

    function onSecond() {
        buf.setColor(0);
        hand(360*secondDate.getSeconds()/60, -5, 90, 3);
        if (secondDate.getSeconds() === 0) {
            hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -16, 60, 7);
            hand(360*minuteDate.getMinutes()/60, -16, 86, 7);
            minuteDate = new Date();
        }
        buf.setColor(1);
        hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -16, 60, 7);
        hand(360*minuteDate.getMinutes()/60, -16, 86, 7);
        buf.setColor(1);
        secondDate = new Date();
        hand(360*secondDate.getSeconds()/60, -5, 90, 3);
        buf.setColor(0);
        buf.fillCircle(120,106,2);
        flip();
    }

    function drawAll() {
        secondDate = minuteDate = new Date();
        // draw seconds
        buf.clear();
        buf.setColor(1);
        for (let i=0;i<60;i++)
            seconds(360*i/60, 100);
        onSecond();
    }

    return {init:drawAll, tick:onSecond};
 }

return getFace;

})();
