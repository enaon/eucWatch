E.setConsole(Serial1,{force:true}); //0000 devmode
eval(require('Storage').read('handler'));
eval(require('Storage').read('euc'));
set.bt=4;

//Kingsong Proxy
euc.proxy={
	f:0,
	r:(o)=>{
		"ram";
		if (1<set.dbg)print("relay-in:",o.data);
		if (euc.state=="READY") euc.wri(o.data);
	},
	w:(o)=>{
		"ram";
		if (set.bt!=4) {if (1<set.dbg) print("relay-out:",o);return;}
		NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
	},
	s:(o)=>{
		NRF.setServices({
			0xfff0: {
			},0xffe0: {
				0xffe1: {
					value : [0x00],
					maxLen : 20,
					writable:true,
					onWrite : function(evt) {
						euc.proxy.r(evt);
					},
					readable:true,
					notify:true,
				   description:"Key Press State"
				}
			}
		}, {advertise: ['fff0'],uart:false });
		//NRF.setAdvertising({}, { name:euc.dash.model,connectable:true });
		//NRF.setAddress(euc.mac);
		NRF.disconnect();
	}, 
	e:(o)=>{
		//set.upd();
		//NRF.disconnect();
		euc.proxy=0;
	}
};
euc.proxy.s();

NRF.disconnect();

function bcon() {
    set.bt=4;
}
function bdis() {
    set.bt=2;
}

NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);


