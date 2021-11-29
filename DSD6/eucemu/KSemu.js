E.setConsole(Serial1,{force:true}); //0000 devmode
//
eval(require('Storage').read('handler'));
eval(require('Storage').read('euc'));
set.bt=4;
euc.dash.emu=1;
//

if (!global.euc) euc={};
euc.emuF=0;
euc.emuR=function(evt){
	if (1<set.dbg)print("relay-in:",evt.data);
	if (euc.state=="READY") euc.wri(evt.data);
};

euc.emuW= function(o) {
	if (!euc.emuF) {if (1<set.dbg) print("relay-out:",o);return;}
	NRF.updateServices({
		0xffe0: {
			0xffe1: {
				value : o,
				notify:true
			}
		},
	});
};
//NRF.setServices(undefined,{uart:false });
//
NRF.setServices({
	0xfff0: {
	},0xffe0: {
		0xffe1: {
			value : [0x00],
			maxLen : 20,
            writable:true,
			onWrite : function(evt) {
				euc.emuR(evt);
			},
   			readable:true,
  			notify:true,
           description:"Key Press State"
		}
  }
}, {advertise: ['0xFFF0'],uart:false });


NRF.disconnect();

function bcon() {
    euc.emuF=1;
}
function bdis() {
    euc.emuF=0;
}

NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);


//
/*
E.setConsole(Serial1,{force:true}); //0000 devmode
function bcon() {
    Bluetooth.on('data',ccon);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
}
function ccon(l){ 
	if (set.dbg==2) print("relay-in:",E.toUint8Array(l));
	euc.wri(E.toUint8Array(l));
	//print(E.toJS(line));
  	//print(E.toString(line));
  	//print(E.toUint8Array(line));
}
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
*/