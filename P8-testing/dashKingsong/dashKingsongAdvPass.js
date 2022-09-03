//kingsong  set adv password
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(v){
   		if (!v&&euc.dash.opt.lock.pass) {face.go("dashKingsongAdv",0);return;}
   		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		//if (!face[5].pass) {
		//	face[5].ntfy("EMPTY PASSWORD",20,4);
        //    setTimeout(()=>{face.go("dashKingsongOpt",0);return;},1000);
		//	return;
		//}	
        //status
        if (euc.dash.opt.lock.pass.length>=4&&!euc.temp.pass){
			this.g.setColor(0,4);
			this.g.fillRect(0,0,239,97);
			this.g.setColor(1,15);
			this.g.setFont("Vector",16);
			this.g.drawString("WHEEL IS",120-(this.g.stringWidth("WHEEL IS")/2),18); 
			this.g.setFont("Vector",26);
			this.g.drawString("PASS LOCKED",120-(this.g.stringWidth("PASS LOCKED")/2),50); 
			this.g.flip();
			//line
			this.g.setColor(0,0);
			this.g.drawLine (0,98,239,98);
			this.g.drawLine (0,99,239,99);
			this.g.flip();
			//change
			this.g.setColor(0,12);
			this.g.fillRect(0,100,239,195);
			this.g.setColor(1,15);
			this.g.setFont("Vector",16);
			this.g.drawString("CHANGE",122-(this.g.stringWidth("CHANGE")/2),118); 
			this.g.setFont("Vector",26);
			this.g.drawString("PASS",122-(this.g.stringWidth("PASS")/2),150); 
			this.g.flip();
        }else {
			if (euc.temp.pass){
				this.g.setColor(0,1);
				this.g.fillRect(0,0,239,195);
				this.g.setColor(1,15);
				this.g.setFont("Vector",30);
				this.g.drawString("TOUCH",120-(this.g.stringWidth("TOUCH")/2),40); 
				this.g.drawString("TO ENTER",120-(this.g.stringWidth("TO ENTER")/2),90); 
				this.g.drawString("CODE",120-(this.g.stringWidth("CODE")/2),140); 

			}else {
				this.g.setColor(0,12);
				this.g.fillRect(0,0,239,195);
				this.g.setColor(1,15);
				this.g.setFont("Vector",18);
				this.g.drawString("WHEEL IS",120-(this.g.stringWidth("WHEEL IS")/2),55); 
				this.g.setFont("Vector",30);
				this.g.drawString("PASS FREE",120-(this.g.stringWidth("PASS FREE")/2),90); 
			}
			this.g.flip();
        }
        //info
        this.g.setColor(0,euc.temp.pass?13:0);
		this.g.fillRect(0,195,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(euc.temp.pass?"CODE PROTECTED":"PASS SETTINGS",120-(this.g.stringWidth(euc.temp.pass?"CODE PROTECTED":"PASS SETTINGS")/2),214); 
		this.g.flip(); 
		this.run=false;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		if (!this.run) return; 
         this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    ntfy: function(txt,size,clr){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,196,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
			this.g.drawString(txt,122-(this.g.stringWidth(txt)/2),212); 
			this.info=1;
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",20);
		        t.g.drawString("PASS SETTINGS",120-(t.g.stringWidth("PASS SETTINGS")/2),214); 
				t.g.flip();
			},1000,this);
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
		print(face.pageCurr);
		face.go("dashKingsongAdv",0);
		return true;
	},
	clear: function(){
		return true;
	},
};	
face[5] = {
	offms: 30000,
	g:w.gfx,
	init: function(){
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",30);
		this.g.drawString(1,34,18);this.g.drawString(2,115,18);this.g.drawString(3,195,18);
		this.g.drawString(4,34,85);this.g.drawString(5,115,85);this.g.drawString(6,195,85);
		this.g.drawString(7,34,153);this.g.drawString(8,115,153);this.g.drawString(9,195,153);
		this.g.flip(); 
        this.g.setColor(0,0);
        this.g.drawLine(0,64,239,64);
        this.g.drawLine(0,65,239,65);
   		this.g.flip(); 
        this.g.drawLine(0,129,239,129);
        this.g.drawLine(0,130,239,130);
   		this.g.flip(); 
        this.g.drawLine(80,0,80,195);
   		this.g.flip();
        this.g.drawLine(160,0,160,195);
   		this.g.flip();
        this.pass="";
		this.run=false;
		this.ntfy("ENTER PASSWORD",20,0);

	},
	show : function(){
		if (!this.run) return; 
		if (euc.state!=="READY") {face.go(ew.is.dash[ew.def.dash.face],0);return;}
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },200,this);
	},
    ntfy: function(txt,size,clr){
			this.info=1;
            this.g.setColor(0,clr);
			this.g.fillRect(0,196,239,239);
			this.g.setColor(1,15);
			this.g.setFont("Vector",size);
			this.g.drawString(txt,122-(this.g.stringWidth(txt)/2),212); 
			this.info=1;
			this.g.flip();
			if (this.ntid) clearTimeout(this.ntid);
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				t.g.setColor(0,0);
				t.g.fillRect(0,196,239,239);
				t.g.flip();
				t.g.setColor(0,1);
				t.g.fillRect(82,198,158,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",30);
				t.g.drawString(0,115,207); 
				if (t.pass.length >=4) t.pass="";
				t.g.flip();
			},1200,this);
    },
    btn: function(x1,y1,x2,y2,bt,xb,yb){
            this.g.setColor(0,4);
			this.g.fillRect(x1,y1,x2,y2);
			this.g.setColor(1,15);
			this.g.setFont("Vector",30);
			this.g.drawString(bt,xb,yb); 
			this.g.flip();
			if (this["tid"+bt]) clearTimeout(this["tid"+bt]);
			this["tid"+bt]=setTimeout(function(t,x1,y1,x2,y2,bt,xb,yb){
                t["tid"+bt]=0;
				t.g.setColor(0,1);
			    t.g.fillRect(x1,y1,x2,y2);
				t.g.setColor(1,15);
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
        if (euc.dash.opt.lock.pass.length>=4){
			buzzer.nav([30,50,30]);
			if (y<=100) { //enable/disable
			  face[0].ntfy("HOLD -> CLEAR",20,1);
			}else  { //change
			   face[0].ntfy("HOLD -> CHANGE",20,1);
			}
        } else {
			buzzer.nav(40);
			if (euc.temp.pass) {
				face.go("dashKingsongAdvPass",5);
				face[0].passSet=1;
				return;
			}
			face[0].ntfy("HOLD -> SET",20,1);
        }
        this.timeout();
		break;
	case 1: //slide down event
		//face.go("clock",0);
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer.nav(40);
		this.timeout();
		break;
	case 4: //slide right event (back action)
		w.gfx.setColor(0,0);
		w.gfx.drawLine (0,98,239,98);
		w.gfx.drawLine (0,99,239,99);
        w.gfx.flip();
		w.gfx.drawLine (120,0,120,195);
      	w.gfx.drawLine (121,0,121,195);
        w.gfx.flip();	
		face.go("dashKingsongAdv",0);
		return;
	case 12: //long press event
		buzzer.nav([30,50,30]);
        if (euc.dash.opt.lock.pass.length>=4){ 
			if (y<=100) { //clear
			  euc.wri("setPassClear");
			  euc.dash.opt.lock.passOld="";
			  euc.dash.opt.lock.pass="";
			  euc.dash.auto.onC.pass=0;
			  euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			  face.go("dashKingsongAdvPass",0);
			}else  { //change
				face.go("dashKingsongAdvPass",5);
				face[0].passSet=1;
				return;		
			}
        }else { //enable
          euc.dash.opt.lock.pass="";
          face.go("dashKingsongAdvPass",5);
          face[0].passSet=1;
        }  
		this.timeout();
		break;
  }
};
touchHandler[5]=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
        if (face[5].pass.length>=4) {buzzer.nav(40);return;}
		buzzer.nav([30,50,30]);
        let i;
        if (x<=80&&y<=65) {i=1;
          face[5].btn(0,0,79,63,i,34,18); 
          face[5].pass=face[5].pass+i;
        }else if (80<=x&&x<=160&&y<=65) {i=2;
          face[5].pass=face[5].pass+i;
          face[5].btn(82,0,158,63,i,115,18); 
        }else if (160<=x&&y<=65) {i=3;
          face[5].btn(162,0,239,63,i,195,18);  
          face[5].pass=face[5].pass+i;
        }else if (x<=80&&65<=y&&y<=130) {i=4;
          face[5].btn(0,66,79,129,i,34,85);  
          face[5].pass=face[5].pass+i; 
         }else if (80<=x&&x<=160&&65<=y&&y<=130) {i=5; 
          face[5].pass=face[5].pass+i;
          face[5].btn(82,66,158,129,i,115,85);  
        }else if (160<=x&&65<=y&&y<=130) {i=6;
          face[5].pass=face[5].pass+i;
          i=6;face[5].btn(162,66,239,129,i,195,85);  
        }else if (x<=80&&130<=y&&y<=195) {i=7;
          face[5].btn(0,131,79,194,i,34,153);  
          face[5].pass=face[5].pass+i;
        }else if (80<=x&&x<=160&&130<=y&&y<=195) {i=8;
          face[5].btn(82,131,158,194,i,115,153);
          face[5].pass=face[5].pass+i;
        }else if (160<=x&&130<=y&&y<=195) {i=9; 
          face[5].pass=face[5].pass+i;
          face[5].btn(162,131,239,194,i,195,153);  
        }else if (195<=y) {i=0;
          face[5].btn(82,197,158,239,0,115,207);  
          face[5].pass=face[5].pass+0;
        }
        if (face[5].pass.length>=4){
          if (face[5].tid0) {clearTimeout(face[5].tid0); face[5].tid0=0;}
          if (face[0].passSet){
			 if (euc.temp.pass){
					euc.dash.opt.lock.passOld=euc.dash.opt.lock.pass;
					euc.dash.opt.lock.pass=face[5].pass;		
					euc.wri("setPassSend");
					buzzer.nav(80);
					face[5].ntfy("PLEASE WAIT",20,1);
					setTimeout(()=>{
						if (euc.temp.pass){
							euc.dash.opt.lock.pass="";
							face[5].ntfy("CODE IS WRONG",20,7);
						}else {
							face[5].ntfy("CODE ACCEPTED",20,4);
							setTimeout(()=>{
								euc.dash.auto.onC.pass=1;
								euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
								euc.wri("start");
								face.go(ew.is.dash[ew.def.dash.face],0);
								return;
							},800);
						}
					},800);
             }else if (face[0].passSet>=2){
                if (face[5].pass==face[5].passTemp){
                  euc.dash.opt.lock.passOld=euc.dash.opt.lock.pass;
                  euc.dash.opt.lock.pass=face[5].pass;
                  buzzer.nav(80);
                  face[5].ntfy("SUCCESS!",20,4);
                  if (euc.dash.opt.lock.passOld!="")
					euc.wri("setPassChange");
				  else{
					if (euc.temp.pass) 
						euc.wri("start");
					else 
						euc.wri("setPass");
				  }
                  euc.dash.auto.onC.pass=1;
       			  euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
                  setTimeout(()=>{face.go(face.appPrev=="dashKingsongAdv"?"dashKingsongAdvPass":ew.is.dash[ew.def.dash.face],0);return;},1000);
                }else{
                  buzzer.nav(120);
                  face[5].ntfy("NOT THE SAME",20,7);
                  face[0].passSet=1;
                  face[5].passTemp="";
                }
              }else {
                 face[5].passTemp=face[5].pass;
                 buzzer.nav(80);
                 face[0].passSet=2;
                 face[5].ntfy("RE-ENTER->CONFIRM",20,4);
             }
          }else{
              if (face[5].pass==euc.dash.opt.lock.pass) {
                buzzer.nav(80);
                face[5].ntfy("PASSWORD ACCEPTED",20,4);
                setTimeout(()=>{face.go("dashKingsongAdvPass",0,1);return;},1000);
              } else {
                buzzer.nav(120);
       	  	    face[5].ntfy("WRONG PASSWORD",20,7);
              }
          }
        }       
        this.timeout();
		break;
	case 1: //slide down event
		//face.go("clock",0);
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;	 
	case 2: //slide up event
     	if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer.nav([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer.nav(40);
		this.timeout();
		break;
	case 4: //slide right event (back action)
		w.gfx.setColor(0,0);
		w.gfx.drawLine (0,98,239,98);
		w.gfx.drawLine (0,99,239,99);
        w.gfx.flip();
		w.gfx.drawLine (120,0,120,195);
      	w.gfx.drawLine (121,0,121,195);
        w.gfx.flip();	
		face.go("dashKingsongAdv",0);
		return;
	case 12: //long press event
		buzzer.nav(100);
		this.timeout();
		break;
  }
};
