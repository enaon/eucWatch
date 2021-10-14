//dash off 
//faces-main face
face[0] = {
	offms: 10000, //5 sec timeout
	g:w.gfx,
	spd:[],
	init: function(){
		this.g.setColor(0,0);
		this.g.fillRect(0,0,79,55); //temp
		this.g.fillRect(161,0,239,55); //batt	  
		this.g.setColor(1,col("white"));
		this.g.setFont("7x11Numeric7Seg",4.5);
		this.g.drawString(euc.dash.tmp|0,3,5); //temp
		this.g.drawString(euc.dash.bat,238-(this.g.stringWidth(euc.dash.bat)),5);
		this.g.flip();
		this.g.setColor(0,col("dgray"));
		this.g.fillRect(80,0,160,55); //amp   
		this.g.setColor(1,col("white"));
this.g.drawImage(require("heatshrink").decompress(atob("kUgwIOLn/AAYX4AYMeg4DBAQPggEDwEYBAPAgwDBmEBwEAhkAsAQBgAQKh0AkP///AjADBGIM/AgMAh/9BgMD/0f+EA/8H/hJCCAX4v4QCn4QCx4QC8YQDEIX/CAf/CAQyDH4UBAYJoBBgIUBA==")),106,10);	 
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(65,56,199,239); //middle	
		this.g.setColor(1,col("white"));
		this.g.setFontVector(28);
		this.g.drawString(euc.dash.spdM,190-this.g.stringWidth(euc.dash.spdM),90);
		this.g.drawString(euc.dash.time,190-this.g.stringWidth(euc.dash.time),133); 
		this.g.drawString(euc.dash.trpL,190-this.g.stringWidth(euc.dash.trpL),175); 
		this.g.drawString(euc.dash.trpT,190-this.g.stringWidth(euc.dash.trpT),217); 
		this.g.flip();	
		this.g.setColor(0,0);
		this.g.fillRect(0,56,74,239); //left	
		this.g.setColor(1,col("lgray"));
		this.g.setFontVector(24);
		this.g.drawString("TOP",5,93);
		this.g.drawString("RUN",5,136);
		this.g.drawString("TRP",5,178);
		this.g.drawString("TOT",5,220);
		this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(200,56,239,239); //right	
		this.g.setColor(1,col("lgray"));
		this.g.drawString("kph",205,93);
		this.g.drawString("Min",205,136);
		this.g.drawString("Km",205,178);
		this.g.drawString("Km",205,220);
		this.g.flip();
		//}
		/*		if (euc.dash.lock!=this.lock&&euc.dash.lock==1){
		  this.lock=euc.dash.lock;
		  this.g.setColor(0,col("red"));
		  this.g.fillRect(80,0,160,55); //amp   
		  this.g.setColor(1,col("white"));
		  this.g.drawImage(require("heatshrink").decompress(atob("j0gwIIFnwCBgf/AYMf/wDB8E8gEHgFwgEcgHAgFggcAgOAhkAg0AmEAjAOJDoM4gF///4F4P/8EPAYPAn/jHAP/g/8gf8j/wh/wv4OFx4OB/0/BwP4Do3/BwIDBBwIDBwE//5hBAYPwOQYA=")),106,10);	 
		  this.g.flip();
		  this.clear(); //if (set.def.cli) console.log("faceEUCexited");
		*/
    //}
		//}

	},
	show : function(o){
		if (!this.run) return;
  		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},150,this);
	},
	tid:-1,
	run:false,
	clear : function(){
		//if (face.appCurr!="dash_simple" || face.pageCurr!=0) this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=-1;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	} 
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
	return true;
	},
	show : function(){
		face.go("main",0);
		return true;
	},
	clear: function(){
		return true;
	},
	off: function(){
		return true;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event
		buzzer(40);
		this.timeout();
		break;
    case 1: //slide down event
		face.go("main",0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
			this.timeout();
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
        this.timeout();
		break;
    case 3: //slide left event
		face.go("dashGarage",0);
		return;
    case 4: //slide right event (back action)
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		this.timeout();
		return;
    }
};