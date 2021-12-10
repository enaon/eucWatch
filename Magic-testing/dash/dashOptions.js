//dash  Options
TC.removeAllListeners("tc5");
face[0] = {
	btn:{},
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:15000,
	g:w.gfx,
	init: function(){
		if (this.ntid) {clearTimeout(this.ntid); this.ntid=0;}
		if (!set.def.dash.rtr) set.def.dash.rtr=5;
		this.page=0;
		UI.ele.fill("_ele","topS",4);
		UI.ele.ind("top",1,2);
		UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,4);//1
		UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,4);//2
		UI.btn.c2l("main","_2x3",3,"",0,0,6); //3
		UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
		UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,1); //5
		UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,1); //6
		UI.ele.fill("_ele","btmM",0);
		UI.ele.title("btmS","DASH OPTIONS",15,4);

		if (set.def.bpp) w.gfx.flip();
        this.run=true;
	},
	show : function(){
		face[0].btn._2x3_1=()=>{
			buzzer(buz.ok);
			if (!face[0].page){	
				set.def.dash.mph=1-set.def.dash.mph;
				UI.btn.c2l("main","_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,4);
				face[0].ntfy("SPEED & DISTANCE IN",(set.def.dash.mph)?"MILES":"KILOMETERS",30,1,4,1500);
			}else{
				face[0].set="batF";
				UI.btn.c2l("main","_2x3",1,"FULL",dash.live.batF/100,15,1); //1
				face[0].ntfy("100% WHEN CELL IS AT",dash.live.batF/100 + " Volt",30,1,12,3000,1);
			} 	
		};
		face[0].btn._2x3_2=()=>{
			if (!face[0].page){
				buzzer(buz.ok);
				set.def.dash.farn=1-set.def.dash.farn;
				UI.btn.c2l("main","_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,4);
				face[0].ntfy("TEMPERATURE IN",(set.def.dash.farn)?"FAHRENHEIT":"CELSIUS",30,1,4,1500);
			}else{
				buzzer(buz.ok); 
			} 	
		};
		face[0].btn._2x3_3=()=>{
			if (!face[0].page){
				buzzer(buz.na);
			}else{
				dash.live.ampR=1-dash.live.ampR;
				UI.btn.c2l("main","_2x3",3,"AMP",(dash.live.ampR)?"R":"N",15,4); //3
				face[0].ntfy("AMPERAGE REPORT",(dash.live.ampR)?"REVERSED":"NORMAL",30,1,4,1500);
				buzzer(buz.ok);
			}
		};
		face[0].btn._2x3_4=()=>{
			buzzer(buz.ok);
			if (!face[0].page){	
				face[0].set="spdF";
				UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
				face[0].ntfy("SPEED FACTOR",dash.live.spdF,40,1,12,3000,1);
			}else{
				face[0].set="batE";
				UI.btn.c2l("main","_2x3",4,"EMPTY",dash.live.batE/100,15,1); //4
				face[0].ntfy("0% WHEN CELL IS AT",dash.live.batE/100 + " Volt",30,1,12,3000,1);
			} 	
		};
		face[0].btn._2x3_5=()=>{
			if (!face[0].page){	
				buzzer(buz.ok);
				face[0].set="trpF";
				UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,1); //5
				face[0].ntfy("DISTANCE FACTOR",dash.live.trpF,40,1,12,3000,1);
			}else{
				buzzer(buz.na); 
			} 	
		};
		face[0].btn._2x3_6=()=>{
			if (!face[0].page){	
				if (1.5<=dash.live.bms) dash.live.bms=1;
				else dash.live.bms=dash.live.bms+0.25;
				UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,4); //6
				face[0].ntfy("BATTERY VOLTAGE",dash.live.bms*67.2,40,1,4,1500);
				buzzer(buz.ok); 
			}else{
				if (1.5<=dash.live.bms) dash.live.bms=1;
				else dash.live.bms=dash.live.bms+0.25;
				UI.btn.c2l("main","_2x3",6,"PACK",dash.live.bms*67.2|0,15,4); //6
				face[0].ntfy("BATTERY VOLTAGE",dash.live.bms*67.2,40,1,4,1500);
				buzzer(buz.ok); 
			} 	
		};
	},
 	tid:-1,
	run:false,
	clear : function(){
		TC.removeAllListeners("tc5");
		TC.removeAllListeners("tc12");
		TC.removeAllListeners("tc1");
		TC.removeAllListeners("tc2");
		TC.removeAllListeners("tc3");
		TC.removeAllListeners("tc4");
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
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
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
/*
touchHandler[0]=function(e,x,y){};
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp); 	
tcL=(x,y)=>{
	buzzer(buz.ok);
	print("left",x,y);
	if (face[0].page=="app"){
		face[0].page="set";
		set.def.info=0;
		eval(require('Storage').read('set_set')); 
	}else { 
		set.def.info=1;
		face[0].page="app";
		print("left",x,y);
		eval(require('Storage').read('set_apps')); 
		w.gfx.flip();
	}
};	
TC.on('tc3',tcL); 	
TC.on('tc4',tcL); 	
*/




//touchHandler[0]
touchHa=function(e,x,y){ 
	switch (e) {
	case 5: //tap event
		if (face[0].set) { 
			if (y < 155) {
				face[0].set=0;
				if (!face[0].page){
					//UI.btn.c2l("main","_2x3",3,"EMPTY",dash.live.batE/100,15,1); //3
					UI.btn.c2l("main","_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
					UI.btn.c2l("main","_2x3",5,"DIST X",dash.live.trpF,15,1); //5
					UI.btn.c2l("main","_2x3",6,"RETRY",set.def.dash.rtr,15,1); //6
				}else {
					UI.btn.c2l("_2x3",1,"FULL",dash.live.batF/100,15,1); //1
					UI.btn.c2l("_2x3",4,"EMPTY",dash.live.batE/100,15,1); //4
				}
				touchHandler[0](e,x,y);
				return;
			} else{
				buzzer(buz.ok);
				if (face[0].set=="spdF") { 
					if (x<120){ //spd
						dash.live.spdF=(dash.live.spdF - 0.01);
						if (dash.live.spdF <0.5)  dash.live.spdF=0.5;
					}else{
						dash.live.spdF=(dash.live.spdF + 0.01);
						if (1.5 <dash.live.spdF)  dash.live.spdF=1.5;
					}
					UI.btn.c2l("_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
					face[0].ntfy("SPEED FACTOR",dash.live.spdF,40,1,12,5000,1);
				}else if (face[0].set=="trpF") { 
					if (x<120){ //spd
						dash.live.trpF=(dash.live.trpF - 0.01);
						if (dash.live.trpF <0.5)  dash.live.trpF=0.5;
					}else{
						dash.live.trpF=(dash.live.trpF + 0.01);
						if (1.5 <dash.live.trpF)  dash.live.trpF=1.5;
					}
					UI.btn.c2l("_2x3",5,"DIST X",dash.live.trpF,15,1); //5
					face[0].ntfy("DISTANCE FACTOR",dash.live.trpF,40,1,12,5000,1);
				}else if (face[0].set=="rtr") { //temp
				  if (x<120){ //
						set.def.dash.rtr--; if ( set.def.dash.rtr <= 1 ) set.def.dash.rtr = 1;
					}else{ //back
						set.def.dash.rtr++; if (20 <= set.def.dash.rtr) set.def.dash.rtr = 20;
					}
					UI.btn.c2l("_2x3",6,"RETRY",set.def.dash.rtr,15,1); //6
					face[0].ntfy("NUMBER OF RETRIES",set.def.dash.rtr,40,1,12,5000,1);
				}else if (face[0].set=="batF") { //bat
					if (x<120){ //
						dash.live.batF--; if ( dash.live.batF <= 400 ) dash.live.batF = 400;
					}else{ //back
						dash.live.batF++; if (425 <= dash.live.batF) dash.live.batF = 425;
					}
					UI.btn.c2l("_2x3",1,"FULL",dash.live.batF/100,15,1); //1
					face[0].ntfy("100% WHEN CELL IS AT",dash.live.batF/100 + " Volt",30,1,12,3000,1);
				}else if (face[0].set=="batE") { //bat
					if (x<120){ //
						dash.live.batE--; if ( dash.live.batE <= 300 ) dash.live.batE = 300;
					}else{ //back
						dash.live.batE++; if (340 <= dash.live.batE) dash.live.batE = 340;
					}
					UI.btn.c2l("_2x3",4,"EMPTY",dash.live.batE/100,15,1); //4
					face[0].ntfy("0% WHEN CELL IS AT",dash.live.batE/100 + " Volt",30,1,12,3000,1);	
				}else  {
					buzzer(buz.na);
					face[0].set=0;
					UI.btn.c2l("_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
					UI.btn.c2l("_2x3",5,"DIST X",dash.live.trpF,15,1); //5
				}
			}
		}else if (!face[0].page){	
			if (x<75 && y<75) { //1
				//face[0].set="mph";
				buzzer(buz.ok);
				set.def.dash.mph=1-set.def.dash.mph;
				UI.btn.c2l("_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,4);
				face[0].ntfy("SPEED & DISTANCE IN",(set.def.dash.mph)?"MILES":"KILOMETERS",30,1,4,1500);
			}else if (75<= x && x < 155 && y < 75) { //2
				//face[0].set="far";
				buzzer(buz.ok);
				set.def.dash.farn=1-set.def.dash.farn;
				UI.btn.c2l("_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,4);
				face[0].ntfy("TEMPERATURE IN",(set.def.dash.farn)?"FAHRENHEIT":"CELSIUS",30,1,4,1500);
			}else if (155 <= x && y < 75) { //3
				buzzer(buz.na);
			}else if (x<75 && 75 <y && y < 155) { //4
				buzzer(buz.ok);
				face[0].set="spdF";
				UI.btn.c2l("_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
				face[0].ntfy("SPEED FACTOR",dash.live.spdF,40,1,12,3000,1);
			}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
				buzzer(buz.ok);
				face[0].set="trpF";
				UI.btn.c2l("_2x3",5,"DIST X",dash.live.trpF,15,1); //5
				face[0].ntfy("DISTANCE FACTOR",dash.live.trpF,40,1,12,3000,1);
			}else if (155 <= x && 75 <y && y < 155) { //6
				buzzer(buz.ok);
				face[0].set="rtr";
				UI.btn.c2l("_2x3",6,"RETRY",set.def.dash.rtr,15,1); //6
				face[0].ntfy("NUMBER OF RETRIES",set.def.dash.rtr,40,1,12,3000,1);
			}else buzzer(buz.na);		
		}else {
			if (x<75 && y<75) { //1
				buzzer(buz.ok);     
				face[0].set="batF";
				UI.btn.c2l("_2x3",1,"FULL",dash.live.batF/100,15,1); //1
				face[0].ntfy("100% WHEN CELL IS AT",dash.live.batF/100 + " Volt",30,1,12,3000,1);
			}else if (75<= x && x < 155 && y < 75) { //2
				buzzer(50);  
			}else if (155 <= x && y < 75) { //3
				dash.live.ampR=1-dash.live.ampR;
				UI.btn.c2l("_2x3",3,"AMP",(dash.live.ampR)?"R":"N",15,4); //3
				face[0].ntfy("AMPERAGE REPORT",(dash.live.ampR)?"REVERSED":"NORMAL",30,1,4,1500);
				buzzer(buz.ok);
			}else if (x<75 && 75 <y && y < 155) { //4   15,40,90,12,0,0,80,75,155,dash.live.spdF,30,40,120); 
				buzzer(buz.ok);   
				face[0].set="batE";
				UI.btn.c2l("_2x3",4,"EMPTY",dash.live.batE/100,15,1); //4
				face[0].ntfy("0% WHEN CELL IS AT",dash.live.batE/100 + " Volt",30,1,12,3000,1);
			}else if (75<= x && x < 155 && 75 <y && y < 155) { //5
				buzzer(buz.na);
			}else if (155 <= x && 75 <y && y < 155) { //6
				if (1.5<=dash.live.bms) dash.live.bms=1;
				else dash.live.bms=dash.live.bms+0.25;
				UI.btn.c2l("_2x3",6,"PACK",dash.live.bms*67.2|0,15,4); //6
				face[0].ntfy("BATTERY VOLTAGE",dash.live.bms*67.2,40,1,4,1500);
				buzzer(buz.ok);   
			}else buzzer(buz.na);		
		}
		//yhis.timeout();
		return;
	case 1: //slide down event
		euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
		if (face.faceSave!=-1) {
			face.go(face.faceSave[0],face.faceSave[1],face.faceSave[2]);face.faceSave=-1;
		}else{
			if (face.appPrev=="settings") {face.appPrev="main";face.pagePrev=0;}
			face.go(face.appPrev,face.pagePrev,face.pageArg);return;
		}
		return; 
	case 2: //slide up event
		if (y>200&&x<50) { //toggles full/current brightness on a left down corner swipe up. 
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer(buz.ok);
			//yhis.timeout();
			return;
		}else {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go("settings",0);
			return;  
		}
		break;
	case 3: //slide left event
		//yhis.timeout();
		if (!face[0].page) {
			face[0].page=1;
			UI.btn.c2l("_2x3",1,"FULL",dash.live.batF/100,15,1); //1
			UI.btn.c2l("_2x3",2,"",0,0,2);//2
			UI.btn.c2l("_2x3",3,"AMP",(dash.live.ampR)?"R":"N",15,4); //3
			UI.btn.c2l("_2x3",4,"EMPTY",dash.live.batE/100,15,1); //4
			UI.btn.c2l("_2x3",5,"",0,0,2); //5
			UI.btn.c2l("_2x3",6,"PACK",dash.live.bms*67.2|0,15,4); //6
			if (face[0].ntid) {
				clearTimeout(face[0].ntid);face[0].ntid=0;
			}
		}else
			buzzer(buz.na);
		break;
	case 4: //slide right event (back action)
		if (face[0].page) {
			//yhis.timeout();
			face[0].page=0;		
			UI.btn.c2l("_2x3",1,(set.def.dash.mph)?"MPH":"KPH",0,15,4);//1
			UI.btn.c2l("_2x3",2,(set.def.dash.farn)?"°F":"°C",0,15,4);//2
			UI.btn.c2l("_2x3",3,"",0,0,2); //3
			UI.btn.c2l("_2x3",4,"SPEED X",dash.live.spdF,15,1); //4
			UI.btn.c2l("_2x3",5,"DIST X",dash.live.trpF,15,1); //5
			UI.btn.c2l("_2x3",6,"RETRY",set.def.dash.rtr,15,1); //6			
			if (face[0].ntid) {
				clearTimeout(face[0].ntid);face[0].ntid=0;
			}
		}else {
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			face.go(face.appPrev,0);
		}
		return;
	case 12: //hold event
		buzzer(buz.na);
		//yhis.timeout();
		break;
  }
};
