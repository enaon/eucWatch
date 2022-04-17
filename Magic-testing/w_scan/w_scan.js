//touch
tcN=(x,y)=>{
		buzzer(buz.na);	
};	
tcNext.replaceWith(tcN);
tcB=(x,y)=>{
	buzzer(buz.ok);	
	face.go("dashScan",0);

};	
tcBack.replaceWith(tcB);
//scan face-used by dash/repellent
if(!global.scan){
	scan={
		mac:[],
		run:0,
		go:function(app,service){
			if (this.run) return;
			this.run=1;
			NRF.findDevices(function(devices) {
				let found=[];
					if (dash.live.maker=="NinebotZ"|| dash.live.maker=="NinebotS")  this.filter = [{manufacturer:16974}];  
					else if (dash.live.maker=="InmotionV11")  this.filter = [{ namePrefix: 'V11-' }];
					else this.filter = [{services:[service]}];
				NRF.filterDevices(devices, this.filter).forEach(function(entry) {found.push([entry.id,entry.name]);});
				print("found :",found);
				scan.mac=found.length?found:[];
				scan.run=0;
				if (face.appCurr!="w_scan") {delete scan.go;delete scan;}
			},  {active:true, timeout:4000});
		}	
	};
}
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:30000,
	g:w.gfx,
	go:0,
	init: function(service){
		this.go=0;
		this.start=1;
		this.serv=service;
		scan.go(face.appPrev,this.serv);
		UI.ele.ind(1,1,1);
		this.line=0;
		this.top=50;
		this.run=true;
	},
  show : function(o){
    if (!this.run) return;
    if (scan.run) {
	  UI.ele.title("WAIT 5 SECS",15,0);
	  UI.btn.img("main","_main",12,_icon.scan,"SCANNING",14,1);
    }else if (scan.mac.length){
      this.g.setFont("Vector",28);
      for (var entry=this.line;entry<this.line+4&&entry<scan.mac.length;entry++) {
        //print(entry,this.go);
		//print("got :"+scan.mac[entry]);
		//print("id :"+scan.mac[entry][0],"name :"+scan.mac[entry][1]);
		if (scan.mac[entry][1]!="undefined"){
			dr=E.toString(scan.mac[entry][1].substring(0,14));
		}else dr=scan.mac[entry][0].substring(0,17);
		UIc.start(1,1);
		UI.btn.c2l("main","_4x1",entry+1,dr,"",15,1);
		UIc.end();
      }
      UI.ele.title((entry)+"/"+scan.mac.length,15,4);
      this.g.flip();
		UIc.main._4x1=(i)=>{
			//print(i);
			buzzer(buz.ok);
			this.mac=scan.mac[i-1][0];this.name=(scan.mac[i-1][1]!="undefined")?scan.mac[i-1][1]:0;
			setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",this.name?this.name:"UNKN");
            //setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Mac",this.mac);
			euc.mac=this.mac;
			euc.tgl();
			return;
		};
	  return;
    }else {
		UI.ele.title("NOT FOUND",15,13);
		UIc.start(1,1);
		UI.btn.c2l("main","_main",12,"TAP TO\n\nRESCAN","",15,1);
		UIc.end();
		UIc.main._main=(i)=>{
			if (i==12){
				buzzer(buz.ok);	
				face[0].init(face[0].serv);
				face[0].show();
			}
		}
		this.done=0;
		return;
    }
    this.tid=setTimeout(function(t){
      t.tid=-1;
      t.show(o);
    },500,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    if (this.loop>=0) clearInterval(this.loop);
	if (!set.gIsB /*&&face.appCurr!="w_scan"*/) delete global.scan;
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
  }
};	
//

touchHandler[0]=function(e,x,y){
    if (e==5||e==12){
		if (scan.run) { buzzer(buz.na);return;}
		if (!scan.run&&!scan.mac.length) { buzzer(buz.ok);face[0].init(face.pageArg); return;}
		if(36<y&&y<=85) 	{this.mac=scan.mac[0][0];this.name=(scan.mac[0][1]!="undefined")?scan.mac[0][1]:0;}
		else if(85<y&&y<=135) {this.mac=scan.mac[1][0];this.name=(scan.mac[1][1]!="undefined")?scan.mac[1][1]:0;}
		else if(135<y&&y<=185) 	{this.mac=scan.mac[2][0];this.name=(scan.mac[2][1]!="undefined")?scan.mac[2][1]:0;}
		else if(185<y) 	{this.mac=scan.mac[3][0];this.name=(scan.mac[3][1]!="undefined")?scan.mac[3][1]:0;}
		if (this.mac!=undefined) {
			buzzer(buz.ok);
			setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",this.name?this.name:"UNKN");
            //setter.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Mac",this.mac);
			euc.mac=this.mac;
			euc.tgl();
			return;
		}else buzzer(buz.na);
    }else if  (e==1){
	  face.go(face.appPrev,face.pagePrev);return;
    }else if  (e==2){
	  if (y>200&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer(buz.ok);
	  } else buzzer(buz.na);
   // }else if  (e==3){
	//  buzzer(buz.na);    
    //}else if  (e==4){
	//	face.go(face.appRoot[0],face.appRoot[1]);
	 // return;
    }
};
