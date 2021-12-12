//scan face-used by dash/repellent
if(!global.scan){
	scan={
		mac:[],
		go:function(app,service){
			set.gIsB=1;
			NRF.findDevices(function(devices) {
				this.slot="";
				if (app=="repellent") this.filter = [{serviceData:{"fe95":{}}}];
				else {
					app="dash";
					if (euc.dash.maker=="NinebotZ"|| euc.dash.maker=="NinebotS")  this.filter = [{manufacturer:16974}];  
					else if (euc.dash.maker=="InmotionV11")  this.filter = [{ namePrefix: 'V11-' }];
					else this.filter = [{services:[service]}];
				}
				var found=[];
				NRF.filterDevices(devices, this.filter).forEach(function(entry) {found.push(entry.id+"|"+entry.name);});
				if (found!=""&&found!=undefined){ 
					if (app=="dash"){
						euc.dash.mac=0;
					}else{
						set.write("setting",app+"Mac",found[0].split("|")[0]);
						set.write("setting",app+"Name",found[0].split("|")[1].replace(/\0/g, ''));
						set.write("setting",app+"Go","0");
					}
					scan.mac=found;
				} else scan.mac=[];
				set.gIsB=0;
				face[0].start=1;
				if (face.appCurr!="w_scan") {delete scan.go;delete scan;}
			}, 2000);
		}	
	};
}
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
  g:w.gfx,
  go:0,
  find:function(service){
  	if(!this.start) return;
    this.start=0;
    if(set.gIsB) {
		//set.gDis();
		this.cnt=1;
        if (this.loop>=0) clearInterval(this.loop);
		this.loop = setInterval(function() {
			this.cnt++;
			if (!set.gIsB) scan.go(face.appPrev,service);
			else if (this.cnt>4) {print("scan timeout"); clearInterval(this.loop);this.loop=-1;return;}
		},1000);
	}else scan.go(face.appPrev,service);
  },
  init: function(o){
    //this.find(o);
	this.go=0;
    scan.mac=(require("Storage").readJSON("setting.json",1)||{})[face.appPrev+"Mac"];
	this.go=(require("Storage").readJSON("setting.json",1)||{})[face.appPrev+"_go"];
	this.go=0;

    this.start=1;
	if(!scan.mac) {scan.mac=[];this.find(o);}
    this.g.setColor(0,0); //header
    this.g.fillRect(0,0,239,35); 
    this.g.setColor(1,14);
    this.g.setFont("Vector",24);
	this.g.drawString((face.appPrev=="repellent")?"REPELLENT":"EUC",4,6); 
    this.g.flip();
    this.line=0;
    this.top=50;
	this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (!this.start){ 
      this.g.setColor(0,0); //header
      this.g.fillRect(160,0,239,35);
      this.g.flip();
      this.g.setColor(1,1);
      this.g.fillRect(0,36,239,239); 
      this.g.setColor(0,14);
      this.g.setFont("Vector",28);
      this.g.drawString("SCANNING",120-(this.g.stringWidth("SCANNING")/2),110);
      this.g.flip();
    }else if (scan.mac!=""&&this.start==1){
      this.start=2;
      this.g.setColor(0,0); //header
      this.g.fillRect(160,0,239,35);
      this.g.setColor(1,14);
      this.g.setFont("Vector",26);
      this.g.drawString(scan.mac.length+"/"+scan.mac.length,242-(this.g.stringWidth(scan.mac.length+"/"+scan.mac.length)),3);
      this.g.flip();
      this.g.setColor(0,1);
      this.g.fillRect(0,36,239,239); 
      this.g.flip();
      this.g.setFont("Vector",28);
      for (var entry=this.line;entry<this.line+4&&entry<scan.mac.length;entry++) {
        //print(entry,this.go);
		//print("got :"+scan.mac[entry]);
		//print("id :"+scan.mac[entry].substring(0,17),"name :"+scan.mac[entry].split("|")[1]);
		this.g.setColor(0,(this.go==entry)?4:(entry % 2)?1:2);
        this.g.fillRect(0,(this.top-14)+((entry-this.line)*this.top),239,(this.top+36)+((entry-this.line)*this.top)); 
		this.g.setColor(1,(this.go==entry)?14:15);
		//let dr=scan.mac[entry].substring(0,17);
		if (scan.mac[entry].split("|")[1]!=="undefined"){
			dr=E.toString(scan.mac[entry].split("|")[1].replace(/\0/g, ''));
			//print ("test",dr,dr.replace(/\0/g, ''),dr.replace(/\u0000/g, '') )
		}else dr=scan.mac[entry].substring(0,17);
		//let dr=scan.mac[entry].substring(0,17);
		//let dr=(scan.mac[entry].split("|")[1]!=="undefined")?scan.mac[entry].split("|")[1]:scan.mac[entry].substring(0,17);
		this.g.drawString(dr,1,this.top+((entry-this.line)*this.top));
		this.g.flip();
      }
      this.g.flip();
    }else if (this.start!==2){
      this.start=3;
      this.g.setColor(0,1); //header
      this.g.fillRect(0,36,239,239);
      this.g.setColor(1,14);
      this.g.setFont("Vector",25);
//      this.g.drawString((face.appPrev=="repellent")?"REPELLENT":"EUC",120-(this.g.stringWidth((face.appPrev=="repellent")?"REPELLENT":"EUC")/2),50);
      this.g.drawString("NOT FOUND",120-(this.g.stringWidth("NOT FOUND")/2),80);
      this.g.setFont("Vector",20);
      this.g.drawString("TOUCH TO RESCAN",120-(this.g.stringWidth("TOUCH TO RESCAN")/2),150);

      this.done=0;
      this.g.flip();
      //return;
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
	if (!set.gIsB&&face.appCurr!="w_scan") delete global.scan;
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
touchHandler[0]=function(e,x,y){
    if (e==5||e==12){
		if (!face[0].start||face[0].start==1) { buzzer(40);return;}
		if (face[0].start==3) { buzzer([30,50,30]);face[0].find(face.pageArg); return;}
		if(36<y&&y<=85) 	{this.mac=scan.mac[0].split("|")[0];this.name=(scan.mac[0].split("|")[1]!="undefined")?scan.mac[0].split("|")[1]:0;}
		else if(85<y&&y<=135) {this.mac=scan.mac[1].split("|")[0];this.name=(scan.mac[1].split("|")[1]!="undefined")?scan.mac[1].split("|")[1]:0;}
		else if(135<y&&y<=185) 	{this.mac=scan.mac[2].split("|")[0];this.name=(scan.mac[2].split("|")[1]!="undefined")?scan.mac[2].split("|")[1]:0;}
		else if(185<y) 	{this.mac=scan.mac[3].split("|")[0];this.name=(scan.mac[3].split("|")[1]!="undefined")?scan.mac[3].split("|")[1]:0;}
		if (this.mac!=undefined) {
			buzzer([30,50,30]);
			if (face.appRoot[0]!="repellent"){
				if (this.name) set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",this.name?E.toString(this.name).replace(/\0/g, ''):"NA");
                //set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Mac",this.mac);
				euc.mac=this.mac;
				euc.tgl();
				return;
			}else	{

                set.write("setting",face.appRoot[0]+"Go",face[0].line+"");
			}
			face.go(face.appRoot[0],face.appRoot[1]);return;
		}else buzzer(40);
    }else if  (e==1){
	  face.go(face.appPrev,face.pagePrev);return;
    }else if  (e==2){
	  if (y>200&&x<50) {
        if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
        else w.gfx.bri.set(this.bri);
		buzzer([30,50,30]);
	  } else buzzer(40);
    }else if  (e==3){
	  buzzer(40);    
    }else if  (e==4){
		face.go(face.appRoot[0],face.appRoot[1]);
	  return;
    }
    this.timeout();
};


