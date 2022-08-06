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
			scan.run=1;
			app="dash";
			if (euc.dash.info.get.makr=="NinebotS")  this.filter = [{manufacturer:16974}];  
			else if (euc.dash.info.get.makr=="NinebotZ")  this.filter = [{ namePrefix: 'N3' }];
			else if (euc.dash.info.get.makr=="NinebotE")  this.filter = [{ namePrefix: 'NOC' },{ namePrefix: 'NOE' },{ namePrefix: 'NOP' }];
			else if (euc.dash.info.get.makr=="InmotionV11")  this.filter = [{ namePrefix: 'V11-' }];
			else if (euc.dash.info.get.makr=="InmotionV12")  this.filter = [{ namePrefix: 'V12-' }];
			else if (euc.dash.info.get.makr=="Begode")  this.filter = [{ namePrefix: 'GotWay' }];
			else if (euc.dash.info.get.makr=="Veteran")  this.filter = [{ namePrefix: 'LK' }];
			//else if (euc.dash.info.get.makr=="Kingsong")  this.filter = [{ namePrefix: 'KS-' }];
			else if (euc.dash.info.get.makr=="Kingsong")  this.filter =  [{}]; 
			else this.filter = [{services:[service]}];
			this.slot="";
			scan.found=[];
			if (scan.tid) {clearTimeout(scan.tid);scan.tid=0;}
			NRF.setScan(function(devices) {		
				if (euc.dash.info.get.makr=="Kingsong") {
						if (devices.shortName&&devices.shortName.startsWith("KSN-")&&!scan.found.includes(devices.id+"|"+devices.shortName) ) scan.found.push(devices.id+"|"+devices.shortName);
						if (devices.name&&devices.name.startsWith("KS-")&&!scan.found.includes(devices.id+"|"+devices.name) )  scan.found.push(devices.id+"|"+devices.name);
				}else if (!scan.found.includes(devices.id+"|"+devices.name)) scan.found.push(devices.id+"|"+devices.name);
			},{filters:this.filter ,active:true });
       		scan.tid=setTimeout(()=>{
				scan.tid=0;
				NRF.setScan();
				if (scan.found!=""&&scan.found!=undefined){ 
					if (app=="dash"){
						euc.dash.info.get.mac=0;
					}else{
						set.write("setting",app+"Mac",scan.found[0].split("|")[0]);
						set.write("setting",app+"Name",scan.found[0].split("|")[1].replace(/\0/g, ''));
						set.write("setting",app+"Go","0");
					}
					scan.mac=scan.found;
				} else scan.mac=[];
				face[0].start=1;
				scan.run=0;
				if (face.appCurr!="w_scan") {delete scan.go;delete scan;}
			},2500);
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
	  UI.btn.img("main","_main",12,"scan","SCANNING",14,1);
    }else if (scan.mac.length){
		UI.btn.c2l("main","_main",12,"","",15,6);
      for (var entry=this.line;entry<this.line+4&&entry<scan.mac.length;entry++) {
        //print(entry,this.go);
		//print("got :"+scan.mac[entry]);
		//print("id :"+scan.mac[entry][0],"name :"+scan.mac[entry][1]);
		if (scan.mac[entry].split("|")[1]!=="undefined"){
			dr=E.toString(scan.mac[entry].split("|")[1].replace(/\0/g, ''));
		}else dr=scan.mac[entry].substring(0,17);
		UIc.start(1,1);
		UI.btn.c2l("main","_4x1",entry+1,dr,"",15,1);
		UIc.end();
      }
      UI.ele.title((entry)+"/"+scan.mac.length,15,4);
      this.g.flip();
		UIc.main._4x1=(i)=>{
			print(i,scan.mac,scan.mac[i-1][0]);
			buzzer(buz.ok);
			this.mac=scan.mac[i-1].split("|")[0];
			this.name=(scan.mac[i-1].split("|")[1]!="undefined")?scan.mac[i-1].split("|")[1]:0;
			//set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",this.name?this.name:"UNKN");
			set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",this.name?E.toString(this.name).replace(/\0/g, ''):"NA");
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
	if (!scan.run) delete global.scan;
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
