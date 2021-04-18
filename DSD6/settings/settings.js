//dsd6 settings
var g=o.gfx;
face[0] = {
	offms: 5000, //5 sec timeout
	init: function(){
			return;
	},
	show : function(i){
		g.clear();
		function central(text, y) {
			g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
		}
		//    g.setFont8x16();
		g.setFontVector(15);
		g.drawRect(0,0,30,30);
		g.drawRect(0,32,30,60);
		g.drawRect(0,62,30,90);
		g.drawRect(0,92,30,120);
		o.flip();

/*		central(euc.dash.bat,0); //fixed bat
		g.drawLine(4,18,26,18);
		g.setFont7x11Numeric7Seg();
		central(euc.dash.trpL, 97); //mileage
		central(euc.dash.trpT, 117); //mileage total
		g.drawLine(0,92,31,92);
		g.drawLine(0,112,31,112);
*/
		o.flip();
		// schedule refresh 
		this.tid=setTimeout(function(t,i){
			t.tid=-1;
			t.show(i);
		},100,this,i);
	},
	btn: function (n,t,s,e){
		if
		
	},
	exit: function(i){
			this.run=false;
			if (this.tid>=0) clearTimeout(this.tid);
			this.tid=-1;
			return true;
	},
	off: function(i){
			this.exit(i);
	} 
};

global.button=function(i) {
	if (i=="short") {
		if (!o.isOn&&euc.state=="READY") face.go("dash");
		else face.go("main");
	}else if (i=="long")euc.tgl();
	print(i);
};
global.tilt=function(i){
  if (i=="up") face.go("dash");
  else face.go("off");
};
global.tap=function(i,o){
	if (global.euc){
    if (i=="single"&&o==1) button("short");
    else if (i=="double"&&o==8) euc.tgl();

		//if (euc.state=="READY") if (i=="single"&&o==1) euc.wri("horn");
		else if (i=="double"&&o==1) euc.tgl();
	}
};
