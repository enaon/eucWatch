E.setFlags({pretokenise:1});

//charging notify
setWatch(function(s){
	let co;
	let g=w.gfx;
	if (!s.state) {
		buzzer(200); 
		ew.is.ondc=1;
		acc.off();
	}else {
		buzzer([100,80,100]);
		ew.is.ondc=0;
		ew.do.update.acc();
	}
	if (face.pageCurr<0|| face.batt){
		//g.clear();
		g.setColor(0,(ew.is.ondc)?4:1);
		g.fillRect(0,0,240,280);
		g.setColor(1,14);
		let img = require("heatshrink").decompress(atob("wGAwJC/AA0D///4APLh4PB+AP/B/N/BoIAD/gPHBwv//wPO/4PH+F8gEHXwN8h4PIKgwP/B/4P/B/4PbgQPOg4POh+AB7sfB50/H5wPPv4PO/4PdgIPP94PNgfPB5sHB5+PB5sPB50fBgQPLjwPOn0OB5t8jwPNvAPO/APNgPwB53gB5sDB5/AB5sHwAPNh+Aj//4APLYAIPMj4POnwhBB5k8AgJSBB5V8LoQPL/BtDB5TRCKQIPJZwIEBSAIPJXwIEBMQQPJ4AEBKQIPJg4PCvAPKRgP+MQQPNYgYPKMQR/KLoMBMQIPLjxiCB5ccMQQPLnjeBB5reBB5zhDB5TeBB5reBB5s8B5s4bwIPMvDeBB5reBB5oDCB5d5B517bwIPNZwIPMu4PO/7OBB7oGCB5f+B738B7sBZwQPcGQQPMZwQPbgDOCB5gADB/4P/B/4PY/4AGB69/Bwv+B538B44Ar"));
		g.drawImage(img,60,30);
		g.setFont("Vector",30);
		g.drawString(w.batt("info"),125-(g.stringWidth(w.batt("info"))/2),200);
		g.flip();
		if (face.offid) clearTimeout(face.offid);
		face.offid=setTimeout(()=>{
			face.pageCurr=-1;face.batt=0;
			g.clear();g.off();face.offid=0;
		},2000);
		if(!g.isOn) {face.batt=1;face.pageCurr=0; g.on();}
	}
},ew.pin.CHRG,{repeat:true, debounce:500,edge:0});  
