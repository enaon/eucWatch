Modules.addCached("eucWatch",function(){
g=global.g;
//g.col=Uint16Array([0,2047,2016,2016,2047,2047,31,   63488,63519,63519,63519,63519,63519,65504,2016,65535]);
//g.col=Uint16Array([  0,   0,2016,2016,2047,2047,31,63488,63519,63519,   31,63519,63519,65504,  31,65535]);
g.col=Uint16Array([  0,31,2016,2016,31,2047,0,63488,63519,63519,   31,63519,63519,65504,  65535,65535]);

//g.col= new Uint8Array(toFlatBuffer([0,0x2,0x8,0xa,0x20,0x22,0x24,0x2a,0x15,0x17,0x1d,0x1f,0x3d,0x37,0x3d,0x3f]));
//
g.sc=g.setColor;
g.setColor=(c,v)=>{g.sc(g.col[v]);}; 
g.on= function(){g.bri.set(ew.def.bri);};
g.off= function(){Bangle.setLCDBrightness(0);};

g.bri={
  lv:((require("Storage").readJSON("setting.json",1)||{}).bri)?(require("Storage").readJSON("setting.json",1)||{}).bri:3,
  set:function(o){	
    if (o) this.lv=o; else { this.lv++; if (this.lv>7) this.lv=1; o=this.lv; }
    if (this.lv==0||this.lv==7)
		Bangle.setLCDBrightness(this.lv==0?0:1);
    else 
		Bangle.setLCDBrightness(this.lv*0.14285714285);
    ew.def.bri=o;
    return o;
  }
};
//battery
const batt=function(i,c){
	let v= 7.1*analogRead(D31);
	let l=3.5,h=4.19;
    let hexString = ("0x"+(0x50000700+(D31*4)).toString(16));
	poke32(hexString,2); // disconnect pin for power saving, otherwise it draws 70uA more 	
	if (i==="info"){
		if (c) return ((100*(v-l)/(h-l)|0)+'%-'+v.toFixed(2)+'V'); 
		return (((v<=l)?0:(h<=v)?100:((v-l)/(h-l)*100|0))+'%-'+v.toFixed(2)+'V'); 
	}else if (i) { 
		if (c) return (100*(v-l)/(h-l)|0);
		return ( (v<=l)?0:(h<=v)?100:((v-l)/(h-l)*100|0) );
	}else return +v.toFixed(2);
};
module.exports = {
	batt: batt,
	gfx: g
};
});