var g=o.gfx;
face[0]= {
	offms: 3000,
		init: function(){
		this.v=(w.battVoltage()*100-365)*2|0;
		if (this.v>=100) this.v=100;
		this.run=true;
	},
	show : function(i){
		if (!this.run) return;
		g.clear();
		var d=(Date()).toString().split(' ');
		var t=(d[4]).toString().split(':');
		function central(text, y) {
		   g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
		}
		g.setFontVector(26);
		central(t[0],26);
		central(t[1],67);
		g.setFont8x16();
		central(".  .",49);
		central(this.v,2); 
		g.setFont7x11Numeric7Seg();
		central(d[2],100);
	    g.setFontDylex7x13();
		central(d[0],118);
		g.drawRect(0, 0, 29, 17);
		g.drawRect(30, 4, 31, 12);
		o.flip();
		this.tid=setTimeout(function(t,i){
			t.tid=-1;
			t.show(o);
		},1000-Date().getMilliseconds(),this,i);
	},
	tid:-1,
	run:false,
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
	if (i=="short") face.go("dash");
	print("main",i);
};