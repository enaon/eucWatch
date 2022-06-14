//set.emuD=0;
function ccon(l){ 
	"ram";
	var cli="\x03";
	var loa="\x04";
	var gb="\x20\x03";
	 if (l.startsWith(loa)) {
		Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		return; 
	}else {
		if (set.def.cli) {
			if (l.startsWith(cli)) {
				set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"IDE","title":"LOADER","body":"Connected"},1);
			}
		}
		if (set.def.gb) {
			if (l.startsWith(gb)){
				set.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"BT","title":"GB","body":"Connected"},1);
			}
		}
		if (l.length>5)  NRF.disconnect();
	}
}
function bcon() {
	if (set.def.emuZ&&global.euc&&euc.state=="READY") {
		set.bt=4;Bluetooth.removeListener('data',ccon);
		handleInfoEvent({"src":"BT","title":"EUC-PROXY","body":"Connected"},1);
		return;
	}
	E.setConsole(null,{force:true});
	set.bt=1; 
	if (set.def.cli||set.def.gb||set.def.emuZ) { Bluetooth.on('data',ccon);}
	setTimeout(()=>{
    if (set.bt==1){ 
		if (!set.def.cli) 
			NRF.disconnect(); 
		else{ 
			handleInfoEvent({"src":"DEBUG","title":"BT","body":"BT Connected"},1);
			set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		}
	}
	},5000);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!set.def.cli&&!set.def.gb&&!set.def.emuZ&&!set.def.hid){
		NRF.sleep();
		set.btsl=1;
    }	
	if (set.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnected"},1);
	else if (set.bt==2) handleInfoEvent({"src":"IDE","title":"LOADER","body":"Disconnected"},1);
	else if (set.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnected"},1);
	//else if (set.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (set.bt==4) handleInfoEvent({"src":"BT","title":"EUC-PROXY","body":"Disconnected"},1);
	else if (set.bt==5) handleInfoEvent({"src":"BT","title":"ESP","body":"Disconnected"},1);
  	set.bt=0; 
	set.emuD=0;
}
NRF.setTxPower(set.def.rfTX);
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
NRF.setAdvertising({}, { name:set.def.name,connectable:true });
setter.updateBT();