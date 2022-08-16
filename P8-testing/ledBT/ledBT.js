if (!global.ledBT){
global.ledBT={
	busy:0,
	tid:0,
    cnt:1,
    val:0,
	run:0,
	solid:0,
	patern:0,
    preset:0,
	do:function(c){
        //print("in",c);
		if (this.busy) {print(1);ledBT.busy=0;return false;}
        this.busy=1;
        if (ledBT.cmd(c)) NRF.setAdvertising({},{manufacturerData:[ledBT.cmd(c)]});
        else {ledBT.busy=0;return;}
        if (ledBT.tid) clearTimeout(ledBT.tid);
        this.tid=setTimeout((c)=>{
            if (!ledBT.val) ledBT.val=c;
			ledBT.tid=0;
            //print("check",ledBT.val+ledBT.cnt);
            ledBT.busy=0;  
            if (ledBT.cmd(ledBT.val+ledBT.cnt)) {ledBT.do(ledBT.val+ledBT.cnt); ledBT.cnt++;}
            else { ledBT.tid=setTimeout(()=>{ledBT.tid=0;NRF.setAdvertising({},{manufacturerData:[]});},2000); ledBT.val=0;ledBT.cnt=1;}
		},50,c);
	},
	cmd:function(o){
		if (o=="bri100") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 147, 229, 29, 255, 184, 88, 241, 145, 188]).buffer;
		else if (o=="bri101") return   new Uint8Array([109, 182, 67, 213, 174, 14, 5, 147, 229, 29, 255, 184, 88, 241, 146, 189]).buffer;
		else if (o=="bri50") return  new Uint8Array(  [109, 182, 67, 213, 174, 14, 5, 147, 229, 29, 255, 83, 91, 241, 254, 182]).buffer;
		else if (o=="bri05") return  new Uint8Array(  [109, 182, 67, 213, 174, 14, 5, 147, 229, 29, 255, 83, 91, 241, 254, 182]).buffer;

		else if (o=="on") {ledBT.run=1;return   new Uint8Array([109, 182, 67, 213, 174, 14, 5, 147, 228, 28, 254, 184, 88, 253, 41, 101]).buffer;}
		else if (o=="off") {ledBT.run=0;return   new Uint8Array([109, 182, 67, 213, 174, 14, 5, 147, 228, 28, 254, 184, 91, 253, 65, 79]).buffer;}

		else if (o=="whiteOnce") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 146, 229, 29, 254, 185, 88, 249, 107, 233]).buffer;
		else if (o=="blue") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 226, 254, 71, 90, 240, 156, 229]).buffer;
		else if (o=="purple") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 226, 1, 184, 89, 240, 213, 204]).buffer;
		else if (o=="white") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 226, 1, 71, 88, 240, 254, 19]).buffer;
											
		else if (o=="yellow") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 29, 1, 71, 88, 240, 164, 230]).buffer ;
		else if (o=="green") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 29, 254, 71, 91, 240, 30, 9]).buffer;
		else if (o=="red") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 29, 1, 184, 91, 240, 63, 10]).buffer;

		else if (o=="PO1") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 212, 228, 29, 3, 79, 88, 251, 208, 247]).buffer;
		else if (o=="PO11") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 13, 153, 91, 248, 130, 5]).buffer;
		else if (o=="PO12") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 4, 229, 29, 255, 188, 90, 254, 123, 224]).buffer;

		else if (o=="PO2") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 214, 228, 63, 1, 239, 89, 251, 11, 153]).buffer;
		else if (o=="PO21") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 1, 248, 88, 248, 79, 231]).buffer;
		else if (o=="PO22") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 86, 229, 29, 254, 188, 91, 254, 108, 160]).buffer;

		else if (o=="PO3") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 215, 231, 16, 254, 71, 88, 251, 209, 21]).buffer;
		else if (o=="PO31") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 254, 184, 91, 248, 131, 14]).buffer;
		else if (o=="PO32") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 146, 229, 9, 4, 187, 90, 254, 9, 41]).buffer;

		else if (o=="PO4") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 214, 228, 63, 1, 239, 90, 251, 99, 179]).buffer;
		else if (o=="PO41") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 1, 248, 89, 248, 151, 254]).buffer;
		else if (o=="PO42") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 86, 229, 29, 254, 188, 88, 254, 4, 138]).buffer;
		
		else if (o=="RWB") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 215, 228, 29, 1, 184, 90, 251, 73, 85]).buffer;
		else if (o=="RWB1") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 4, 184, 89, 248, 182, 150]).buffer;
		else if (o=="RWB2") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 23, 131, 188, 88, 254, 248, 242]).buffer;
		
		else if (o=="RWG") return  new Uint8Array([109, 182, 67, 213, 174, 14, 5, 215, 228, 29, 1, 184, 89, 251, 33, 127]).buffer;
		else if (o=="RWG1") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 254, 242, 88, 248, 231, 81]).buffer;
		else if (o=="RWG2") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 104, 229, 23, 54, 188, 91, 254, 174, 98]).buffer;
		
		else if (o=="RWB-S")return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 215, 228, 29, 1, 184, 91, 251, 145, 76]).buffer;
		else if (o=="RWB-S1") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 4, 184, 90, 248, 222, 188]).buffer;
		else if (o=="RWB-S2") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 246, 229, 23, 204, 188, 89, 254, 110, 79]).buffer;

		else if (o=="WG") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 215, 231, 16, 254, 71, 88, 251, 209, 21]).buffer;
		else if (o=="WG1") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 109, 26, 226, 254, 184, 91, 248, 131, 14]).buffer;
		else if (o=="WG2") return new Uint8Array([109, 182, 67, 213, 174, 14, 5, 146, 229, 9, 4, 187, 90, 254, 9, 41]).buffer;
		
	}
};
}

//kingsong 
face[0] = {
	offms: (ew.def.off[face.appCurr])?ew.def.off[face.appCurr]:25000,
	g:w.gfx,
	color:["white","blue","red","yellow","green","purple"],
	patern:["RWB","RWB-S","RWG","WG","PO1","PO2","PO3","PO4"],
	init: function(val){
		this.last=10;
		this.g.setColor(0,0);
		this.g.fillRect(0,98,239,99);
        this.g.flip();	
		this.g.fillRect(120,0,121,195);
        this.g.flip();
		this.g.setColor(0,0);
		this.g.fillRect(0,196,239,239);
		this.g.setColor(1,15);
		this.g.setFont("Vector",20);
		this.g.drawString("BT LED",120-(this.g.stringWidth("BT LED")/2),217); 
		this.g.flip(); 
		this.btn(ledBT.run,ledBT.run?"ON":"OFF",25,60,35,4,1,0,0,119,97);
		
		this.btn(1,"SOLID",18,185,20,12,1,122,0,239,97,this.color[ledBT.color],25,185,50);	
		this.btn(1,"WHITE",18,60,115,4,1,0,100,119,195,"ONCE",25,60,150);
		this.btn(1,"PATERN",18,185,115,12,1,122,100,239,195,this.patern[ledBT.patern],25,185,150);	
/*		this.btn(1,"ON",18,60,20,4,1,0,0,119,97,"",25,60,55);
		this.btn(1,"OFF",18,185,20,7,1,122,0,239,97,"",25,185,55);	
		this.btn(1,"WHITE",18,60,115,4,1,0,100,119,195,"",25,60,150);
		this.btn(1,"POLICE",22,185,135,4,1,122,100,239,195,"",25,185,155);	
*/
	},
	show : function(){
		if (!this.run) return; 
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
				t.g.fillRect(0,196,239,239);
				t.g.setColor(1,15);
				t.g.setFont("Vector",22);
		        t.g.drawString("BT LED",120-(t.g.stringWidth("BT LED")/2),212); 
				t.g.flip();
			},1000,this);
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
		face.go("settings",0,1);
		return true;
	},
	clear: function(){
		return true;
	},
};	
//touch
touchHandler[0]=function(e,x,y){ 
	face.off();
	switch (e) {
      case 5: //tap event
		if ( x<=120 && y<100 ) { //on off
			buzzer([30,50,30]);	
			ledBT.do(ledBT.run?"off":"on");
			face[0].btn(ledBT.run,ledBT.run?"ON":"OFF",25,60,35,4,1,0,0,119,97);
			return;
		}else if ( 120<=x && y<=100 ) { //solid
			buzzer([30,50,30]);	
			if (ledBT.color < face[0].color.length-1) ledBT.color++; else ledBT.color=0;
			face[0].btn(1,"SOLID",18,185,20,12,1,122,0,239,97,face[0].color[ledBT.color],25,185,50);		
			ledBT.do(face[0].color[ledBT.color]);
  	}else if ( x<=120 && 100<=y ) { //once white
			buzzer([30,50,30]);		
			ledBT.do("whiteOnce");
		}else if  (120<=x && 100<=y ) { //patter
			buzzer([30,50,30]);		
			if (ledBT.patern< face[0].patern.length-1) ledBT.patern++; else ledBT.patern=0;
			face[0].btn(1,"PATERN",18,185,115,12,1,122,100,239,195,face[0].patern[ledBT.patern],25,185,150);	
			ledBT.do(face[0].patern[ledBT.patern]);
		}else buzzer(40);
		break;
	case 1: //slide down event
		if (euc.state!="OFF") face.go(ew.is.dash[ew.def.dash.face],0);
		else face.go("main",0);

		return;	 
	case 2: //slide up event
		if ( 200<=y && x<=50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
		}else //if (y>100) {
			if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}  
		//} else {buzzer(40);}
		break;
	case 3: //slide left event
		face.go(face.appPrev,0);
		return;	
	case 4: //slide right event (back action)
		face.go(ew.is.dash[ew.def.dash.face],0);
		return;

  }
};


/*
//script for scanning phone app commands (marvel light playstore app)
scanAdv=function(){
	NRF.findDevices(function(devices) {
		//print(devices);
		if (devices[0]) {
			print(devices[0].manufacturerData);
		}
		if (set.scan==1) scanAdv();
	},  {timeout : 50, filters: [{id:'f8:e0:79:89:0b:7e public'}]  });
};
*/