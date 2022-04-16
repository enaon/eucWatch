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
		scan.go(face.appPrev,service);
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
        print(entry,this.go);
		print("got :"+scan.mac[entry]);
		print("id :"+scan.mac[entry][0],"name :"+scan.mac[entry][1]);
		this.g.setColor(0,/*this.go==entry?4:*/entry%2?1:2);
        this.g.fillRect(0,(this.top-14)+((entry-this.line)*this.top),239,(this.top+36)+((entry-this.line)*this.top)); 
		this.g.setColor(1,/*this.go==entry?14:*/15);
		if (scan.mac[entry][1]!="undefined"){
			dr=E.toString(scan.mac[entry][1].substring(0,14));
		}else dr=scan.mac[entry][0].substring(0,17);
		this.g.drawString(dr,1,this.top+((entry-this.line)*this.top));
      }
      UI.ele.title(scan.mac.length+"/"+scan.mac.length,15,4);
      this.g.flip();
	  return;
    }else {
	  UI.btn.c2l("main","_main",7,"TAP TO\n\nRESCAN","",15,1);
	  UI.ele.title("NOT FOUND",15,7);
      this.done=0;
      this.g.flip();
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
	  //face.go(face.appRoot[0],face.appRoot[1]);
      face.go("main",0);
	  return true;
  },
   clear: function(){
  return true;
  }
};	
//

/*
UIc.back=(x,y)=>{
	buzzer(buz.ok);
    if ( 1 < face[0].set ) {
 		face[0].set -- ;
		face[0].page(face[0].set); 
    } else {
      face.go("dashGarage",0);
      return;
    }
};	
UIc.next=(x,y)=>{
	if ( face[0].set < 4 ) {
		buzzer(buz.ok);
		face[0].set ++ ;
		face[0].page(face[0].set);
    }else buzzer(buz.na); 
};	
TC.on('tc3',UIc.next); 	
TC.on('tc4',UIc.back); 
TC.on('tc1',tcDn); 	
TC.on('tc2',tcUp);
TC.on('tc5',UIc.xy); 


*/
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


