//touch
tcBack.replaceWith((x,y)=>{
	"ram";
	buzzer(buz.ok);
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		face[0].show( face[0].page);
	}else if ( 1 < face[0].page ) {
 		face[0].page -- ;
		face[0].show( face[0].page);
    } else {
      face.go("dashGarage",0);
      return;
    }
});
tcNext.replaceWith((x,y)=>{
	"ram";
	if (UI.ntid) {
		clearTimeout(UI.ntid);UI.ntid=0;
		face[0].show( face[0].page);
	}else if ( face[0].page < 3 ) {
		buzzer(buz.ok);
		face[0].page ++ ;
		face[0].show( face[0].page);
    }else buzzer(buz.na); 
});
//Dash Scan
face[0] = { 
  btn:{},
  offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:5000,
  bpp:set.def.bpp?0:1,
  icon:"",
  g:w.gfx, 
  init: function(o){ 
	this.maker={
		kingsong:["Kingsong","KS","fff0"],
		begode:["Begode","BG","ffe0"],
		inmotionV10:["InmotionV10","V10","ffb0"],
		inmotionV11:["InmotionV11","V11","ffe0"],
		inmotionV12:["InmotionV12","V11","ffe0"],
		veteran:["Veteran","SM","ffe0"],
		ninebotE:["NinebotE","E+","ffe0"],
		ninebotS:["NinebotS","S2","e7fe"],
		ninebotZ:["NinebotZ","Z10","e7fe"]

	};

  },
  show : function(o) {
   this.bar(o?o:1);
  },
  bar: function(o) {
  	UI.ele.title("SCAN FOR",15,0);
	this.page=(o?o:1);
	UI.ele.ind(this.page,3,6);
	let txt1=["ks","im","nb"];
	let txt2=["","",""];
	UIc.start(1,1);
	UI.btn.img("main","_2x1",1,this.icon+txt1[this.page-1],txt2[this.page-1],15,6); 
	txt1=["bg","vt2","rw"];
	txt2=["","",""];	
	UI.btn.img("main","_2x1",2,this.icon+txt1[this.page-1],txt2[this.page-1],15,1); 
	UIc.end();
	UIc.main._2x1=(i)=>{
		if (i==1){
			if (face[0].page==1) face[0].scan(face[0].maker.kingsong); //kingsong
			else if (face[0].page==2){ //inmotion
				buzzer(buz.ok);
				UIc.start(1,1);
				UI.btn.img("main","_2x1",1,face[0].icon+"imV10","V5 V8 V10",15,4); 
				UI.btn.img("main","_2x2",3,face[0].icon+"imV11","V11",15,4); 
				UI.btn.img("main","_2x2",4,face[0].icon+"imV12","V12",15,6); 
				UIc.end();
				UIc.main._2x1=(i)=>{//V5
					face[0].scan(face[0].maker.inmotionV10);
				};
				UIc.main._2x2=(i)=>{
					if (i==4)//V12
							face[0].scan(face[0].maker.inmotionV12);
						else //V11
							face[0].scan(face[0].maker.inmotionV11);
					
				};
			}else if (face[0].page==3){ //ninebot
				buzzer(buz.ok);
				UIc.start(1,1);
				UI.btn.img("main","_2x2",1,face[0].icon+"nbZ","Z10",15,4); 
				UI.btn.img("main","_2x2",2,face[0].icon+"nbS","S2 A1",15,4); 
				UI.btn.img("main","_2x1",2,face[0].icon+"nbE","one C/E/P",15,6); 
				UIc.end();
				UIc.main._2x1=(i)=>{//oneE
					face[0].scan(face[0].maker.ninebotE);		
				};
				UIc.main._2x2=(i)=>{
					buzzer(buz.ok);
					if (i==1){//oneZ10
						face[0].scan(face[0].maker.ninebotZ);		
					}	else {//oneS2
						face[0].scan(face[0].maker.ninebotS);		
					}
				};
			}
		}else if (i==2){ //reciowheel
			if (face[0].page==3){
				buzzer(buz.ok);
				UIc.start(1,1);
				UI.btn.c2l("main","_2x1",1,"R16","",15,6); 
				UI.btn.c2l("main","_2x1",2,"R18","",15,1); 
				UIc.end();
				UIc.main._2x1=(i)=>{
					face[0].scan(face[0].maker.begode);		
				};
			}else if (face[0].page==1){//begode
				face[0].scan(face[0].maker.begode);
			}else {//veteran
				face[0].scan(face[0].maker.veteran);
			}
		}
	};
  },
  scan: function(o) {
	buzzer(buz.ok);
  	let target=o;
	if (!require("Storage").read("euc"+target[0])) {
			UI.btn.ntfy(1,3,0,"_bar",6,"MODULE","MISSING",15,13);w.gfx.flip();
			return; 
	}
	set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Maker",target[0]);
	set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Model",target[1]);
	euc.dash.info.get.name=0;
	euc.dash.info.get.makr=target[0];
	face.go('w_scan',0,target[2]);
  },
  tid:-1,
  run:false,
  clear : function(){/*TC.removeAllListeners();*/if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;} return true;},
  off: function(){this.g.off();this.clear();}
};
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},//only use this part of the face to set redirection.
	show : function(){
		face.go("dashGarage",0);
		return true;
	},
	clear: function(){/*TC.removeAllListeners();*/if(UI.ntid){clearTimeout(UI.ntid);UI.ntid=0;}return true;},
	off: function(){this.clear();}
};	

