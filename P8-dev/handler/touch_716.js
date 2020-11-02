// touch driver

var touchHandler = {
  timeout: function(){
	face.off(face.pagePrev);
  }
};
var i2c=new I2C();
i2c.setup({scl:D7, sda:D6, bitrate:200000});
//I2C1.setup({scl:D7,sda:D6,bitrate:200000});

const TOUCH_PIN = D28;
const RESET_PIN = D13;

pinMode(TOUCH_PIN,'input');

var TC = {
	"ram";
    DOWN:1, UP:2, LEFT:3, RIGHT:4, CLICK:5, LONG:12,
	x:0, y:0, do:0, st:0, loop:0, tid:-1,
    _wid:undefined,
	init:()=>{
	var tp=i2c.readFrom(0x15,7);
//	print(tp);
	if (tp[3]==128) {
        if (this.time==-1) this.time=getTime();
        if (this.st) {
          if (face.pageCurr==-1){this.loop=5;face.go(face.appCurr,0);return;}
          this.st=0;
          this.do=1;
          this.x=tp[4];this.y=tp[6];
        }
        if (this.do===1&&getTime()-this.time>1){ 
            touchHandler[face.pageCurr](12,this.x,this.y);
			TC.emit("longtouch",{"gest":12,"x":this.x,"y":this.y});
            this.do=0;
        }else if (this.do===1&&tp[1]==0) {
            var a=0;
            if (tp[6]>=this.y+20) a=1;
	        else if (tp[6]<=this.y-20) a=2;
	        else if (tp[4]<=this.x-20) a=3;
	        else if (tp[4]>=this.x+20) a=4;
            if (a!=0) {
              this.do=0;
              touchHandler[face.pageCurr](a,this.x,this.y);
			  TC.emit("swipe",{"gest":a,"x":this.x,"y":this.y});
            }
        }else if (this.do===1){
            if (tp[1]==5||tp[1]==12){
              touchHandler[face.pageCurr](tp[1],this.x,this.y);this.do=0;
			  if (tp[1]===5) TC.emit("touch",{"gest":5,"x":this.x,"y":this.y}); else TC.emit("longtouch",{"gest":5,"x":this.x,"y":this.y});
            }
        }
	}else if (tp[3]==255) {
		if (this.do===1){
			touchHandler[face.pageCurr](5,this.x,this.y);this.do=0;        
			TC.emit("touch",{"gest":5,"x":this.x,"y":this.y});
		}
		this.st=1;this.time=-1;
    }
	this.tid=setTimeout(function(t){
		t.tid=-1;
		t.init();
	},this.loop,this);
	},
    enable:()=>{i2c.writeTo(0x15,0xED,0xC8);},
    sleepMode:()=>{i2c.writeTo(0x15,0xa5,3);},
    touchevent:() => {
        var p = TC.getXY();
        if (p.gest==TC.CLICK) TC.emit("touch",p);
        else if (p.gest>=1 && p.gest<=4) TC.emit("swipe",p.gest); 
        else if (p.gest==TC.LONG) TC.emit("longtouch",p);
		touchHandler[face.pageCurr](p.gest,p.x,p.y);
    },
    start:()=>{
        digitalPulse(RESET_PIN,0,5);
        setTimeout(()=>{
            TC.enable();
            if (TC.tid) clearTimeout(TC.tid);
            TC.init();
        },100);
    },
    stop:()=>{
        if (TC.tid) {
            clearTimeout(TC.tid);
            TC._wid = -1;
        }
        TC.sleepMode();
    }
};

/*
TC.on("touch", (p)=>{
    console.log("touch x: "+p.x+" y:"+p.y);
});

TC.on("swipe", (d)=>{
    console.log("swipe d: "+d);
});

TC.on("longtouch", (p)=>{
    console.log("long touch");
});
*/


