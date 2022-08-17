//ew.is.emuD=0;
function ccon(l){ 
	"ram";
	var cli="\x03";
	var loa="\x04";
	var gb="\x20\x03";
	 if (l.startsWith(loa)) {
		Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		return; 
	}else {
		if (ew.def.cli) {
			if (l.startsWith(cli)) {
				ew.is.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"IDE","title":"LOADER","body":"Connected"},1);
			}
		}
		if (ew.def.gb) {
			if (l.startsWith(gb)){
				ew.is.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"BT","title":"GB","body":"Connected"},1);
			}
		}
		if (l.length>5)  NRF.disconnect();
	}
}
function bcon() {
	if (ew.def.emuZ&&global.euc&&euc.state!="OFF") {
		ew.is.bt=4;Bluetooth.removeListener('data',ccon);
		handleInfoEvent({"src":"BT","title":"EUC-PROXY","body":"Connected"},1);
		return;
	}
	E.setConsole(null,{force:true});
	ew.is.bt=1; 
	if (ew.def.cli||ew.def.gb||ew.def.emuZ) { Bluetooth.on('data',ccon);}
	setTimeout(()=>{
    if (ew.is.bt==1){ 
		if (!ew.def.cli) 
			NRF.disconnect(); 
		else{ 
			handleInfoEvent({"src":"DEBUG","title":"BT","body":"BT Connected"},1);
			ew.is.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		}
	}
	},5000);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!ew.def.cli&&!ew.def.gb&&!ew.def.emuZ&&!ew.def.hid){
		NRF.sleep();
		ew.is.btsl=1;
    }	
	if (ew.is.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnected"},1);
	else if (ew.is.bt==2) handleInfoEvent({"src":"IDE","title":"LOADER","body":"Disconnected"},1);
	else if (ew.is.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnected"},1);
	//else if (ew.is.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (ew.is.bt==4) handleInfoEvent({"src":"BT","title":"EUC-PROXY","body":"Disconnected"},1);
	else if (ew.is.bt==5) handleInfoEvent({"src":"BT","title":"ESP","body":"Disconnected"},1);
  	ew.is.bt=0; 
	ew.is.emuD=0;
}
NRF.setTxPower(ew.def.rfTX);
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
NRF.setAdvertising({}, { name:ew.def.name,connectable:true });
ew.do.update.bluetooth();