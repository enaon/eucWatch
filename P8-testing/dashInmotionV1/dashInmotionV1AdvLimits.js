//inmotionV1 set adv limits

face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
        this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("WHEEL ALERTS",120-(this.g.stringWidth("WHEEL ALERTS")/2),214); 
		this.g.flip(); 
		this.btn(euc.dash.limE[0],"ALARM 1",18,60,15,12,1,0,0,119,97,(euc.dash.limE[0])?euc.dash.lim[0]:"OFF",28,60,50);
		this.btn(euc.dash.limE[1],"ALARM 2",18,185,15,12,1,122,0,239,97,(euc.dash.limE[1])?euc.dash.lim[1]:"OFF",28,185,50);
		this.btn(1,"ALARM 3",18,60,115,12,0,0,100,119,195,euc.dash.lim[2],28,60,150);
        this.btn(1,"TILTBACK",18,185,115,4,0,122,100,239,195,euc.dash.lim[3],28,185,150);		
        if (!face.appPrev.startsWith("dashSet")){
		this.g.setColor(0,0);
		this.g.drawLine (0,98,239,98);
		this.g.drawLine (0,99,239,99);
        this.g.flip();
		this.g.drawLine (120,0,120,195);
      	this.g.drawLine (121,0,121,195);
        this.g.flip();
        }      
        this.run=false;
	},
	show : function(){
		if (euc.state!=="READY") {face.go(set.dash[set.def.dash.face],0);return;}
		if (!this.run) return; 
      
        this.tid=setTimeout(function(t,o){
		  t.tid=-1;
		  t.show();
        },1000,this);
	},
    btn: function(bt,txt1,size1,x1,y1,clr1,clr0,rx1,ry1,rx2,ry2,txt2,size2,x2,y2){
		this.g.setColor(0,(bt)?clr1:clr0);
		this.g.fillRect(rx1,ry1,rx2,ry2);
		this.g.setColor(1,15);
		this.g.setFont("Vector",size1);	
		this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1); 
		if (txt2){this.g.setFont("Vector",size2);	
		this.g.drawString(txt2,x2-(this.g.stringWidth(txt2)/2),y2);}
		this.g.flip();
    },
    ntfy: function(txt1,txt0,size,clr,bt){
		this.g.setColor(0,clr);
		this.g.fillRect(0,198,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",size);
		this.g.drawString((bt)?txt1:txt0,120-(this.g.stringWidth((bt)?txt1:txt0)/2),214); 
		this.g.flip();
		if (this.ntid) clearTimeout(this.ntid);
		this.ntid=setTimeout(function(t){
			t.ntid=0;
			t.g.setColor(0,0);
			t.g.fillRect(0,198,239,239);
			t.g.setColor(1,15);
			t.g.setFont("Vector",20);
			t.g.drawString("WHEEL ALERTS",120-(t.g.stringWidth("WHEEL ALERTS")/2),214); 
			t.g.flip();
		    },1000,this);
    },
	set: function(b,txt){
        this.setE=1;
        this.setEb=b;
		this.g.setColor(0,12);
		this.g.fillRect(0,0,239,195);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString(txt,120-(this.g.stringWidth(txt)/2),10); 		
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAs8A41+A43/AwsDA40HA40PA40f/wHFn/8Fw34AwkB//wGw3AGw2AGxk/Gw1/Gw4uFGwPgGxguBGwsfGw4uGv5lFGw4HBGwoHJC4wnHG45HHK45nHO444JGAynHW47HHHBKBHNJ44QA4o4BA4owBA41+A408A4wA6A==")),0,75);
		this.g.drawImage(require("heatshrink").decompress(atob("oFAwJC/AAU8A41+A43/A4/AA43gA43wA4t//AHFn/8A4sfGA0P/+AA4kDHA0BHCAwGn/+GA4HFg44QGA3/NJ44QA5oXHE443HI4xXHM453HGw6XHU44uGY442Hc473HMo9/Voy9Ifw42FA4IGFgF+A408A4wA9A=")),180,75);
		this.g.flip(); 
        this.btn(1,euc.dash.lim[b],100,126,60,12,1,60,40,180,160);
        euc.dash.limE[b]=1;
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
		euc.wri("setSpeedLimits");
		face.go("dashInmotionV1",0);
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
        if (!face[0].setE){//select page
			if (x<=120&&y<100) { //alarm 1
                if (euc.dash.limE[0]){
					euc.dash.limE[0]=0;
					face[0].btn(1,"ALARM 1",18,60,15,1,0,0,0,119,97,"OFF",28,60,50);
					face[0].ntfy("ALARM 1-> DISABLED","",20,1,1);
					buzzer([30,50,30]);
				}else {
					if (euc.dash.limE[1]){
						euc.dash.limE[0]=1;
                        if (euc.dash.lim[1]<=euc.dash.lim[0] ) euc.dash.lim[0]=euc.dash.lim[1]-1;
						face[0].btn(1,"ALARM 1",18,60,15,12,0,0,0,119,97,euc.dash.lim[0],28,60,50);
						face[0].ntfy("ALARM 1-> ENABLED","",20,1,1);
						buzzer([30,50,30]);
                    }else {face[0].ntfy("ENABLE ALARM 2","",20,7,1);buzzer(40);}
                }
			}else if (120<=x<=239&&y<=100) { //alarm 2
				if ( euc.dash.limE[1]){
					if (euc.dash.limE[0]) {face[0].ntfy("DISABLE ALARM 1","",20,7,1);buzzer(40);}
					else {
						euc.dash.limE[1]=0;
						buzzer([30,50,30]);
						face[0].btn(1,"ALARM 2",18,185,15,1,0,122,0,239,97,"OFF",28,185,50);
						face[0].ntfy("ALARM 2 -> DISABLED","",20,1,1);
					}
				}else {
					euc.dash.limE[1]=1;
                    if (euc.dash.lim[2]<=euc.dash.lim[1]) euc.dash.lim[1]=euc.dash.lim[2]-1;
					buzzer([30,50,30]);
					face[0].btn(euc.dash.limE[1],"ALARM 2",18,185,15,12,1,122,0,239,97,(euc.dash.limE[1])?euc.dash.lim[1]:"OFF",28,185,50);
					face[0].ntfy("ALARM 2 -> ENABLED","",20,1,1);
				}
			}else if (x<=120&&100<=y<=200) { //alarm 3
				face[0].ntfy("HOLD -> SET","HOLD -> SET",20,1,1);
				buzzer([30,50,30]);		
			}else if (120<=x<=239&&100<=y<=200) { //tiltback
				face[0].ntfy("HOLD -> SET","",20,1,1);
				buzzer([30,50,30]);						
			}else buzzer([30,50,30]);
		}else {//set page
			if (120<=x) { //up
                if (face[0].setEb==0) 
					if (euc.dash.limE[1])
					if (euc.dash.lim[0]+1<euc.dash.lim[1])  euc.dash.lim[0]++;
                    else face[0].ntfy("MOVE ALARM 2","",20,7,1);
					else face[0].ntfy("ENABLE ALARM 2","",20,7,1);
                else if (face[0].setEb==1) 
                    if (euc.dash.lim[1]+1<euc.dash.lim[2]) euc.dash.lim[1]++;
                    else face[0].ntfy("MOVE ALARM 3","",20,7,1);
                else if (face[0].setEb==2) 
                    if (euc.dash.lim[2]<euc.dash.lim[3]) euc.dash.lim[2]++;
                    else face[0].ntfy("MOVE TILTBACK","",20,7,1);
                else{ 
                    if (euc.dash.lim[3]<50) euc.dash.lim[3]++;
                    else face[0].ntfy("THE LIMIT IS 50KpH","",20,7,1);
                    } 
            }else {  //dn
                if (face[0].setEb=="0") {
					if (0<euc.dash.lim[0]) euc.dash.lim[0]--;
                    if (euc.dash.lim[0]==0)  {euc.dash.lim[0]=1;face[0].ntfy("DISABLED","",20,7,1);euc.dash.limE[0]=0;buzzer(40);return;}
                }else if (face[0].setEb=="1"){
					if (euc.dash.limE[0]){
						if (euc.dash.lim[1]<=5) { face[0].ntfy("AL1 DN LIMIT IS 5KpH","",20,7,1);buzzer(40);return;}
						if (euc.dash.lim[0]+1<euc.dash.lim[1]) euc.dash.lim[1]--;
						else face[0].ntfy("MOVE ALARM 1","",20,7,1);
					}else if (5<euc.dash.lim[1]) euc.dash.lim[1]--;
					else face[0].ntfy("AL1 DN LIMIT IS 5KpH","",20,7,1);
                }else if (face[0].setEb=="2") {
					if (euc.dash.limE[1]){
						if (euc.dash.lim[1]+1<euc.dash.lim[2]) euc.dash.lim[2]--;
						else face[0].ntfy("MOVE ALARM 2","",20,7,1);
					}else if (10<euc.dash.lim[2]) euc.dash.lim[2]--;
					else face[0].ntfy("AL2 DN LIMIT IS 10KpH","",20,7,1);
                }else if (face[0].setEb=="3"){
					if (euc.dash.limE[2]){
						if (euc.dash.lim[2]<euc.dash.lim[3]) euc.dash.lim[3]--;
						else face[0].ntfy("MOVE ALARM 3","",20,7,1);
					}else if (5<euc.dash.lim[3]) euc.dash.lim[3]--;
					else face[0].ntfy("THE DN LIMIT IS 5KpH","",20,7,1);
                } 
            } 
            buzzer([30,50,30]);
			face[0].btn(1,euc.dash.lim[face[0].setEb],100,126,60,12,1,60,40,180,160);
		}
		this.timeout();
		break;
	case 1: //slide down event
		setTimeout(function(){euc.busy=0;euc.tmp.live();},800);
        euc.wri("setSpeedLimits");
		face.go(set.dash[set.def.dash.face],0);
		return;	 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		this.timeout();
		break;
	case 3: //slide left event
		buzzer(40);
		break;
	case 4: //slide right event (back action)
        if (face[0].setE) {
          face[0].setE=0; 
          w.gfx.clear();
          face[0].init();
        } else {
        euc.wri("setSpeedLimits");
		face.go("dashInmotionV1Adv",0);
		return;
        }
        break;
   case 12: //hold event
			if (x<=120&&y<100) { //alarm 1
                if (euc.dash.limE[1]){
                if (euc.dash.lim[0]>=euc.dash.lim[1]) euc.dash.lim[0]=euc.dash.lim[1]-1;
				face[0].set("0","ALARM 1");
				buzzer([30,50,30]);
                }else  {face[0].ntfy("ENABLE ALARM 2","",20,7,1);buzzer(40);}
			}else if (120<=x<=239&&y<=100) { //alarm 2
                if (euc.dash.lim[1]>=euc.dash.lim[2]) euc.dash.lim[1]=euc.dash.lim[2]-1;
				face[0].set("1","ALARM 2");
				buzzer([30,50,30]);
			}else if (x<=120&&100<=y<=200) { //alarm 3
                if (euc.dash.lim[2]>=euc.dash.lim[3]) euc.dash.lim[2]=euc.dash.lim[3];
                face[0].set("2","ALARM 3");
				buzzer([30,50,30]);		
			}else if (120<=x<=239&&100<=y<=200) { //tiltback
                face[0].set("3","TITLBACK");
				buzzer([30,50,30]);						
			}else buzzer([30,50,30]);
			
		this.timeout();
		break;
	}
};
