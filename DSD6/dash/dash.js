if (!Boolean(require("Storage").read("dash.json"))) { 
	let dash={slot:1};
	require('Storage').write('dash.json', dash);
	set.write("dash","slot1Maker","Kingsong");
}
var g=o.gfx;
if (!global.euc) eval(require('Storage').read('euc'));
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
		if (euc.state=="READY") {
			g.setFontVector(23);
			central(euc.dash.spd, 23); //speed 1
			if  (euc.dash.amp<=0){
				g.fillRect(0,70,31,91);
				g.setColor(0);
				g.setFontVector(19);
				central(-euc.dash.amp, 71);
				g.setColor(1);
			} else if (euc.dash.amp<10) {
				g.setFontVector(19);
				central(euc.dash.amp, 71);
			} else {
				g.setFontVector(18);
				central(euc.dash.amp|0, 71);
			}
			g.setFont7x11Numeric7Seg();
			central(euc.dash.tmp, 55); //temp
			g.drawCircle(29, 55, 2);
		} else if (euc.state=="FAR") {
			g.setFontVector(12);
			central("FAR", 40); //speed-state
			if (euc.dash.lock) {central("L", 62);} //speed-state
		} else if (euc.state=="LOST") {
			g.setFontVector(12);
			g.setFontVector(11);
			central("LOST", 40); //speed-state
			if (euc.dash.lock) {central("L", 62);} //speed-state
		}  else if (euc.state=="WAIT")  {
			g.setFontVector(12);
			central("WAIT", 40); //speed-state      
		}  else if (euc.state=="OFF")  {
			g.setFontVector(12);
			central("OFF", 40); //speed-state 
			g.setFontVector(16);
			if (euc.dash.lock) {central("L", 62);} //speed-state	  
		}   else if (euc.state=="ON")  {
			g.setFontVector(16);
			central("ON", 40); //speed-state
		}
		//    g.setFont8x16();
		g.setFontVector(15);
		//g.setFont("Teletext10x18Ascii",1);
		central(euc.dash.bat,0); //fixed bat
		g.drawLine(4,18,26,18);
		g.setFont7x11Numeric7Seg();
		central(euc.dash.trpL, 97); //mileage
		central(euc.dash.trpT, 117); //mileage total
		g.drawLine(0,92,31,92);
		g.drawLine(0,112,31,112);
		o.flip();
		// schedule refresh 
		this.tid=setTimeout(function(t,i){
			t.tid=-1;
			t.show(i);
		},100,this,i);
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

button=function(i) {
	if (i=="short") face.go("main");
	else euc.tgl();
	print(i);
};

function tilt(i){
  if (i=="up") o.on();
  else o.off();
}
