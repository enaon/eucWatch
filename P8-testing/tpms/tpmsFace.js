//tpms face
if (!global.tpms) eval(require('Storage').read('tpms'));
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
	g:w.gfx,
	init: function(){
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
        //this.g.clear();		
		this.g.setColor(0,0);
		//this.g.fillRect(0,161,239,239);
		this.g.fillRect(0,0,239,239);
		this.g.setColor(1,col("white"));
		this.g.setFont("Vector",25);
		this.g.drawString("TPMS SENSOR",120-(this.g.stringWidth("TPMS SENSOR")/2),217); 
		this.g.flip(); 
		this.info();
		//this.run=true;
	},
	show : function(i){
		if (!this.run) return; 
		if (!i) {

		}else{
			this.info();
		}
		
		//if (euc.state!=="READY"&&face.appPrev!=="dashGarage") {face.go(set.dash[set.def.dash.face],0);return;}
       // this.tid=setTimeout(function(t,o){
		//  t.tid=-1;
		//  t.show();
       // },1000,this);
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
    ntfy: function(txt0,txt1,size,bt,clr,tm,s){
			if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
            this.g.setColor(0,clr);
			this.g.fillRect(0,160,239,239);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",18);
     		this.g.drawString(txt0,120-(this.g.stringWidth(txt0)/2),165); 
			if (s) {this.g.setFont("Vector",50);this.g.drawString("<",5,200);this.g.drawString(">",215,200);}
			this.g.setFont("Vector",size);
     		this.g.drawString(txt1,120-(this.g.stringWidth(txt1)/2),205); 
			this.g.flip();
			this.ntid=setTimeout(function(t){
                t.ntid=0;
				face[0].set=0;
				face[0].info();
				t.g.setColor(0,0);
				t.g.fillRect(0,156,239,239);
				t.g.setColor(1,col("white"));
				t.g.setFont("Vector",25);
				t.g.drawString("TPMS SENSOR",120-(t.g.stringWidth("TPMS SENSOR")/2),217); 
				t.g.flip();
			},tm,this);
    },
	info: function(){
		let cnt=0;

		this.tpms={};
		for (let i in tpms.slot ){
			cnt++; 
			let cl=((getTime()|0) - tpms.slot[i].time < 300)?1:0;
			col1=col("raf");
			col2=col("dgray");
			if (tpms.slot[i].alrm) col1=col("red");col2=col("purple")
			/*if  (cnt==1) 	 this.btn(cl,i,27,60,10,col1,col2,0,0,119,97,tpms.slot[i].psi,35,60,55);//1
			else if  (cnt==2) this.btn(cl,i,27,185,10,col1,col2,122,0,239,97,tpms.slot[i].psi,35,185,55);//2
			else if  (cnt==3) this.btn(cl,i,27,60,110,col1,col2,0,100,119,195,tpms.slot[i].psi,35,60,155);//3
			else if  (cnt==4) this.btn(cl,i,27,185,110,col1,col2,122,100,239,195,tpms.slot[i].psi,35,185,155);//4
			*/
			if  (cnt==1) 	 this.btn(cl,i,27,60,10,col1,col2,0,0,239,50,tpms.slot[i].psi,35,60,55);//1
			else if  (cnt==2) this.btn(cl,i,27,185,10,col1,col2,0,55,239,105,tpms.slot[i].psi,35,185,55);//2
			else if  (cnt==3) this.btn(cl,i,27,60,110,col1,col2,0,110,239,165,tpms.slot[i].psi,35,60,155);//3
			else if  (cnt==4) this.btn(cl,i,27,185,110,col1,col2,0,100,239,195,tpms.slot[i].psi,35,185,155);//4
			
			
			this.tpms[cnt]=i;
		}
		if (!cnt) 
			this.btn(1,"TOUCH TO SCAN",25,120,115,col("dgray"),0,0,80,239,160);//4
	},
	more: function(){
	
	},
	setTime:function(){
		
	},
	setDate:function(){
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
		face.go(appRoot[0],0);
		return;	 
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	this.timeout();
	switch (e) {
	case 5: //tap event
		if (face[0].set) { 
			if (face[0].set=="info") {
				if ( x <=120 && 190 <= y) {

				}else if ( 120 <= x && 190 <= y) {
					buzzer([30,50,30]);

				}else {
					face[0].set=0;
			   		if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
					w.gfx.clear();
					face[0].init();
					buzzer([30,50,30]);
				}
			}else if (face[0].set=="more") {
				if (30 <= y && y <= 80 ) {

				}else if ( x <=120 && 190 <= y) {

				}else if ( 120 <= x && 190 <= y) {

				}else {
					buzzer(40);
				}
			}else if (face[0].set=="setTime") {
				if ( x <=120 && y <= 120) { //hour up
					buzzer([30,50,30]);
				}else if ( x <=120 && 120 <= y) {//hour dn
					buzzer([30,50,30]);
				}else if ( 120 <= x && y <= 120) { //min up
					buzzer([30,50,30]);
				}else if ( 120 <= x && 120 <= y) {//min dn
					buzzer([30,50,30]);
				}else {
					face[0].set=0;
					w.gfx.clear();
					face[0].init();
					buzzer(40);
				}
			}else if (face[0].set=="setDate") {
				if ( x <=80 &&  y <= 120) { //date up
				}else if ( x <=80 && 120 <= y) {//date dn
					buzzer([30,50,30]);
				}else if ( 80 <= x && x <=160 && y <= 120) { //month up
					buzzer([30,50,30]);
				}else if ( 80 <= x && x <=160 && 120 <= y) {//month dn
					buzzer([30,50,30]);
				}else if ( 160 <= x && y <= 120) { //year up
					buzzer([30,50,30]);
				}else if ( 160 <= x && 120 <= y) {//year dn
					buzzer([30,50,30]);
				}else {
					face[0].set=0;
					w.gfx.clear();
					face[0].init();
					buzzer(40);
				}
			}
		}else if (  x <=120 &&  y <= 80  && face[0].tpms[1]) {//1
			buzzer([30,50,30]);
		}else if ( 120 <= x && y <= 80 && face[0].tpms[2]) {
			buzzer([30,50,30]);
		}else if ( x <=120 && 80 <= y && y <= 160 && face[0].tpms[3] ) { 
			buzzer([30,50,30]);	
		}else if (  80 <= y && y <= 160 && face[0].tpms[4] ) { 
			buzzer([30,50,30]);
		}else {
			face[0].ntfy("SCANNING","WAIT 10 SECS",30,1,col("raf"),10000);
			tpms.scan();
			buzzer(30,50,30);
		}
		this.timeout();
		return;
	case 1: //slide down event
		if (face[0].set) {
			face[0].set=0;
	   		if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			//w.gfx.clear();
			//face[0].init();
		}//else {
			if (face.faceSave!=-1) {
				face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
			}else{
				if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
				face.go(face.appPrev,face.pagePrev,face.pageArg);return;
			}
			//return; 
		//}
		break;
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else if (face[0].set) {
			face[0].set=0;
			if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}
		this.timeout();
		break;
	case 3: //slide left event
		buzzer(40);
		break;
	case 4: //slide right event (back action)
		if (face[0].set) {
			face[0].set=0;
			if (face[0].ntid) clearTimeout(face[0].ntid);face[0].ntid=0;
			w.gfx.clear();
			face[0].init();
		}else {
			face.go(face.appPrev,0);
			return; 
		}break;
	case 12: //hold event
		buzzer(40);
		this.timeout();
		break;
  }
};
