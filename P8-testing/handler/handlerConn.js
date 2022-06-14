
function ccon(l){ 
//	if (set.def.prxy&&global.euc&&global.euc.state=="READY") {
	if (set.def.emuZ) {
		//if (set.emuD) return;
		emuZ.cmd(l);
		return;
	}else {
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
			}
		}
		if (set.def.gb) {
			if (l.startsWith(gb)){
				set.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"BT","title":"GB","body":"Connected"});
			}
		}
		if (l.length>5)  NRF.disconnect();
		}
	}
}
function bcon() {
	if (set.def.prxy&&global.euc&&global.euc.state=="READY") {
		set.bt=5;
		Bluetooth.removeListener('data',ccon);
		handleInfoEvent({"src":"BT","title":"EUC-PROXY","body":"Client Connected"},1);
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
			handleInfoEvent({"src":"DEBUG","title":"RELAY","body":"Relay Connected"});
			set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		}
	}
	},5000);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!set.def.cli&&!set.def.gb&&!set.def.prxy&&!set.def.emuZ&&!set.def.hid){
		NRF.sleep();
		set.btsl=1;
    }	
	if (set.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnected"});
	else if (set.bt==2) handleInfoEvent({"src":"BT","title":"IDE","body":"Disconnected"});
	else if (set.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnected"});
	//else if (set.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (set.bt==4) handleInfoEvent({"src":"BT","title":"Z10 EMU","body":"Client Disconnected"},1);
	else if (set.bt==5) handleInfoEvent({"src":"BT","title":"PROXY","body":"Client Disconnected"},1);
  	set.bt=0; 
	set.emuD=0;
}
NRF.setTxPower(set.def.rfTX);
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
set.upd();








