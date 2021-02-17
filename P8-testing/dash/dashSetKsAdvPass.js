//kingsong  set adv password
face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		
        this.g.setColor(0,col("black"));
		this.g.fillRect(0,195,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("PASS SETTINGS",120-(this.g.stringWidth("PASS SETTINGS")/2),214); 
		this.g.flip(); 
		this.calibrate=0;
		this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
       
        if (this.info)  {
			this.info=0;
			if (this.itid)clearTimeout(this.itid);
			this.itid=setTimeout(function(t){
				t.itid=0;
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,198,239,239);//6
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",20);
				t.g.drawString("PASS SETTINGS",120-(t.g.stringWidth("PASS SETTINGS")/2),214); 
				t.g.flip();
		    },1000,this);
		}
		this.firstrun=0;
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },100,this);
	},
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.itid) clearTimeout(this.itid);this.itid=0;
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
		face.go("dashSetKingsong",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
face[5] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		this.g.setColor(0,col("olive"));
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",30);
		this.g.drawString(1,34,18);this.g.drawString(2,115,18);this.g.drawString(3,195,18);
		this.g.drawString(4,34,85);this.g.drawString(5,115,85);this.g.drawString(6,195,85);
		this.g.drawString(7,34,153);this.g.drawString(8,115,153);this.g.drawString(9,195,153);
		//this.g.drawString(0,130,65);
		this.g.flip(); 
        this.g.setColor(0,col("black"));
        this.g.drawLine(0,63,239,63);
        this.g.drawLine(0,65,239,65);
   		this.g.flip(); 
        this.g.drawLine(0,129,239,129);
        this.g.drawLine(0,130,239,130);
   		this.g.flip(); 
//        this.g.drawLine(59,0,59,195);
        this.g.drawLine(80,0,80,195);
   		this.g.flip();
//        this.g.drawLine(179,0,179,195);
        this.g.drawLine(160,0,160,195);
   		this.g.flip();

/*		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("ENTER PASSWORD",120-(this.g.stringWidth("ENTER PASSWORD")/2),214); 
		this.g.flip(); 
*/		
        this.pass="";
		this.run=false;
		this.ntfy("ENTER PASSWORD",20,0);

	},
	show : function(){
		if (!this.run) return; 
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },200,this);
	},
    ntfy: function(txt,size,clr){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,196,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);
			this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),212); 
			this.info=1;
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,col("black"));
				t.g.fillRect(0,196,239,239);
				t.g.flip();
				t.g.setColor(0,col("olive"));
				t.g.fillRect(82,198,158,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",30);
				t.g.drawString(0,115,213); 
				t.info=0;
				t.g.flip();
			},1000,this);
    },
    btn: function(x1,y1,x2,y2,bt,xb,yb){
            this.g.setColor(0,col("red"));
			this.g.fillRect(x1,y1,x2,y2);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",30);
			this.g.drawString(bt,xb,yb); 
			this.g.flip();
			if (this["tid"+bt]) clearTimeout(this["tid"+bt]);
			this["tid"+bt]=setTimeout(function(t,x1,y1,x2,y2,bt,xb,yb){
                t["tid"+bt]=0;
				t.g.setColor(0,col("olive"));
			    t.g.fillRect(x1,y1,x2,y2);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",30);
				t.g.drawString(bt,xb,yb); 
				t.g.flip();
			},500,this,x1,y1,x2,y2,bt,xb,yb);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
        let i;
        for (i = 0; i < 10; i++) {
          if (this["tid"+i]) clearTimeout(this["tid"+i]);this["tid"+i]=0;
        }
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	}
};
//touch
touchHandler[0]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
        if (!face[0].calibrate){
		if (x<=120&&y<175) { //tilt forward
			digitalPulse(D16,1,[30,50,30]);
		}else if (120<=x&&y<=175) { //tilt back
			digitalPulse(D16,1,[30,50,30]);
		}else if (175<=y) { //calibrate
			digitalPulse(D16,1,[30,50,30]);
		}else digitalPulse(D16,1,[30,50,30]);
        }else { //calibrate
          if (175<=y&&120<=x) {face.go("dashSetKsAdv",0);return;
          }else if (175<=y&&x<=120) euc.wri("calibrate");
          else digitalPulse(D16,1,40);
        }
		this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKsAdv",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
touchHandler[5]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
        digitalPulse(D16,1,40);
        if (x<=80&&y<=65) { //1
          face[5].pass=face[5].pass+1;
          face[5].btn(0,0,79,63,1,34,18);  
        }else if (80<=x&&x<=160&&y<=65) { //2 
          face[5].pass=face[5].pass+2;
          face[5].btn(82,0,158,63,2,115,18);  
        }else if (160<=x&&y<=65) { //3
          face[5].btn(162,0,239,63,3,195,18);  
          face[5].pass=face[5].pass+3;
        }else if (x<=80&&65<=y&&y<=130) { //4
          face[5].pass=face[5].pass+4;
          face[5].btn(0,66,79,129,4,34,85);  
         }else if (80<=x&&x<=160&&65<=y&&y<=130) { //5 
          face[5].pass=face[5].pass+5;
          face[5].btn(82,66,158,129,5,115,85);  
        }else if (160<=x&&65<=y&&y<=130) { //6 
          face[5].pass=face[5].pass+6;
          face[5].btn(162,66,239,129,6,195,85);  
        }else if (x<=80&&130<=y&&y<=195) { //7
          face[5].pass=face[5].pass+7;
          face[5].btn(0,131,79,194,7,34,153);  
        }else if (80<=x&&x<=160&&130<=y&&y<=195) { //8 
          face[5].pass=face[5].pass+8;
          face[5].btn(82,131,158,194,8,115,153);  
        }else if (160<=x&&130<=y&&y<=195) { //9 
          face[5].pass=face[5].pass+9;
          face[5].btn(162,131,239,194,9,195,153);  
        }else if (195<=y) { //0
        face[5].pass=face[5].pass+0;
        }

        if (face[5].pass.length>=4){
          if (face[5].pass==euc.dash.pass) {face.go("dashSetKsAdvPass",0);return;}	 
          else {
            digitalPulse(D16,1,120);
       		face[5].ntfy("WRONG PASSWORD",20,col("red"));
            face[5].pass="";}
        }
            
            
        this.timeout();
		break;
	case 1: //slide down event
		//face.go("main",0);
		face.go(set.dash[set.def.dash],0);
		return;	 
	case 2: //slide up event
     	if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			digitalPulse(D16,1,[30,50,30]);
		}else if (y>190) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		} else {digitalPulse(D16,1,40);}
		this.timeout();
		break;
	case 3: //slide left event
		digitalPulse(D16,1,40);
		this.timeout();
		break;
	case 4: //slide right event (back action)
		face.go("dashSetKsAdv",0);
		return;
	case 12: //long press event
		digitalPulse(D16,1,[100]);
		this.timeout();
		break;
  }
};
