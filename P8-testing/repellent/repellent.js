//kingsong  set adv limits

face[0] = {
	offms: 5000,
	g:w.gfx,
	init: function(){
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString("SPEED LIMITS",120-(this.g.stringWidth("SPEED LIMITS")/2),214); 
		this.g.flip(); 
        this.btn(euc.dash.spd1E,"ALARM 1",18,60,15,col("olive"),col("gray"),0,0,119,97,euc.dash.spd1,28,60,50);
        this.btn(euc.dash.spd2E,"ALARM 2",18,185,15,col("olive"),col("gray"),122,0,239,97,euc.dash.spd2,28,185,50);		
        this.btn(euc.dash.spd3E,"ALARM 3",18,60,115,col("olive"),col("gray"),0,100,119,195,euc.dash.spd3,28,60,150);
        this.btn(euc.dash.spd4E,"TILTBACK",18,185,115,col("red"),col("red"),122,100,239,195,euc.dash.spdT,28,185,150);		
        if (!face.appPrev.startsWith("dashSet")){
		this.g.setColor(0,0);
		this.g.drawLine (0,98,239,98);
		this.g.drawLine (0,99,239,99);
        this.g.flip();
		this.g.drawLine (120,0,120,195);
      	this.g.drawLine (121,0,121,195);
        this.g.flip();
        }      
        this.run=true;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash],0);return;}
		if (!this.run) return; 
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
		this.g.setColor(0,(bt)?clr1:clr0);
		this.g.fillRect(rx1,ry1,rx2,ry2);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",size1);	
		this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
		if (txt2){this.g.setFont("Vector",size2);	
		this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
		this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
		this.g.setColor(0,clr);
		this.g.fillRect(0,198,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",size);
		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
		this.g.flip();
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.g.setColor(0,0);
			t.g.fillRect(0,198,239,239);
			t.g.setColor(1,col("white"));
			t.g.setFont("Vector",20);
			t.g.drawString("SPEED LIMITS",120-(t.g.stringWidth("SPEED LIMITS")/2),214); 
			t.g.flip();
		},1000,this);
    },
	set: function(b,txt){
        this.setE=1;
        this.setEb=b;
		this.g.setColor(0,col("olive"));
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",20);
		this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),10); 		
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,75);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,75);
		this.g.flip(); 
        this.btn(1,euc.dash["spd"+b],100,126,60,col("olive"),col("gray"),60,40,180,160);
    },
	tid:-1,
	run:false,
	clear : function(){
		//this.g.clear();
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);this.tid=-1;
   		if (this.ntid) clearTimeout(this.ntid);this.ntid=0;
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
//touch
touchHandler[0]=function(e,x,y){
	switch (e) {
      case 5://tap event
        if (!face[0].setE){
			if (x<=120&&y<100) { //alarm 1
				euc.dash.spd1E=1-euc.dash.spd1E;
				face[0].btn(euc.dash.spd1E,"ALARM 1",18,60,15,col("olive"),col("gray"),0,0,119,97,(euc.dash.spd1E)?euc.dash.spd1:(euc.dash.spd2E)?euc.dash.spd2-1:(euc.dash.spd3E)?euc.dash.spd3-2:euc.dash.spdT-3,28,60,50);
				face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
				digitalPulse(D16,1,[30,50,30]);
			}else if (120<=x<=239&&y<=100) { //alarm 2
				euc.dash.spd2E=1-euc.dash.spd2E;
				face[0].btn(euc.dash.spd2E,"ALARM 2",18,185,15,col("olive"),col("gray"),122,0,239,97,(euc.dash.spd2E)?euc.dash.spd2:(euc.dash.spd3E)?euc.dash.spd3-1::euc.dash.spdT-2,28,185,50);
				face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
				digitalPulse(D16,1,[30,50,30]);
			}else if (x<=120&&100<=y<=200) { //alarm 3
				euc.dash.spd3E=1-euc.dash.spd3E;
				face[0].btn(euc.dash.spd3E,"ALARM 3",18,60,115,col("olive"),col("gray"),0,100,119,195,(euc.dash.spd3E)?euc.dash.spd3:euc.dash.spdT-1,28,60,150);
				face[0].ntfy("HOLD -> SET","HOLD -> SET",20,col("dgray"),1);
				digitalPulse(D16,1,[30,50,30]);		
			}else if (120<=x<=239&&100<=y<=200) { //tiltback
				//face[0].btn(1,"TILTBACK",18,185,115,col("red"),col("red"),122,100,239,195,euc.dash.spdT,28,185,150);	
				face[0].ntfy("GOLD -> SET","HOLD -> SET",20,col("dgray"),1);
				digitalPulse(D16,1,[30,50,30]);						
			}else digitalPulse(D16,1,[30,50,30]);
		}else {
			if (120<=x) { //up
                euc.dash["spd"+face[0].setEb]++;
                face[0].btn(1,euc.dash["spd"+face[0].setEb],100,126,60,col("olive"),col("gray"),60,40,180,160);

            }else {  //dn
                euc.dash["spd"+face[0].setEb]--;
                face[0].btn(1,euc.dash["spd"+face[0].setEb],100,126,60,col("olive"),col("gray"),60,40,180,160);
            }
  
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
		break;
	case 4: //slide right event (back action)
        if (face[0].setE) {
          face[0].setE=0; 
          w.gfx.clear();
          face[0].init();
        } else {
		face.go("dashSetKsAdv",0);
		return;
        }
        break;
   case 12: //hold event
		if (!face[0].setE){
			if (x<=120&&y<100) { //alarm 1
				face[0].set("1","ALARM 1");
				digitalPulse(D16,1,[30,50,30]);
			}else if (120<=x<=239&&y<=100) { //alarm 2
				face[0].set("2","ALARM 2");
				digitalPulse(D16,1,[30,50,30]);
			}else if (x<=120&&100<=y<=200) { //alarm 3
                face[0].set("3","ALARM 3");
				digitalPulse(D16,1,[30,50,30]);		
			}else if (120<=x<=239&&100<=y<=200) { //tiltback
                face[0].set("T","TITLBACK");
				digitalPulse(D16,1,[30,50,30]);						
			}else digitalPulse(D16,1,[30,50,30]);
		}else {
			
		}
		this.timeout();
		break;
  }
};
