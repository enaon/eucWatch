//scan 
if(!global.scan){
scan={
    mac:[],
	go:function(app,service){
		set.gIsB=1;
		NRF.findDevices(function(devices) {
		  this.slot="";
		  app="dash";
		  if (euc.dash.maker=="NinebotZ")  this.filter = [{manufacturer:16974}];  
		  else if (euc.dash.maker=="InmotionV11")  this.filter = [{ namePrefix: 'V11-' }]
		  else this.filter = [{services:[service]}];
		  var found=[];
		  NRF.filterDevices(devices, this.filter).forEach(function(entry) {found.push(entry.id);});
		  if (found!=""&&found!=undefined){ 
			if (app=="dash"){
				set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Mac",found[0]+"");
				euc.dash.mac=found[0]+"";
			}else{
				set.write("setting",app+"Mac",found);
				set.write("setting",app+"_go","0");
			}
			scan.mac=found;
		  } else scan.mac=[];
		  set.gIsB=0;
		  face[0].start=1;
		  //if (face.appCurr!="w_scan") {delete scan.go;delete scan;}
		}, 2000);
	}	
};