//Kingsong Proxy
if (global.euc&&!euc.proxy){
euc.proxy={
	state:0,
	f:0,
	r:(o)=>{
    "ram";
		if (1<set.dbg)print("relay-in:",o.data);
		if (euc.state=="READY") euc.wri("proxy",o.data);
	},
	w:(o)=>{
    "ram";
		if (set.bt!=4) {if (1<set.dbg) print("relay-out:",o);return;}
		NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
	},
	s:(o)=>{
		NRF.updateServices({0xffa0:{0xffa1:{value:1,notify:true}},});
		
		/*
		NRF.setServices({
			0xfff0: {
				0xfff1: {
					value : [0x01],
					maxLen : 20,
					writable : false,
					readable:true,
					description:"Characteristic 1"
				},
			},
			0xffa0: {
				0xffa1: {
					value : [0x01],
					maxLen : 20,
					writable:true,
					onWrite : function(evt) {
						set.emit("btIn",evt);
					},
					readable:true,
					notify:true,
				   description:"ew"
				}
			},
			0xffe0: {
				0xffe1: {
					value : [0x00],
					maxLen : 20,
					writable:true,
					onWrite : function(evt) {
						euc.proxy.r(evt);
					},
					readable:true,
					notify:true,
				   description:"Kingsong"
				}
			}
		}, {advertise: ['0xfff0','0xffa0'],uart:true });
		
		*/
		
		
		//NRF.setAdvertising({}, { name:"eL-"+process.env.SERIAL.substring(15)+"-1-ON-"+w.isCharging()+"-"+w.batt(1)+"%",connectable:true });
		/*
		NRF.setAdvertising([[
			0x02,0x01,0x06,
			0x03,0x02,0xf0,0xff,
			0x05,0x12,0x60,0x00,0x0c,0x00,
		]], { name:"eL-"+process.env.SERIAL.substring(15)+"-1-ON-"+w.isCharging()+"-"+w.batt(1)+"%",connectable:true });
		*/
		
		/*
		NRF.setAdvertising({},{name:"eL-"+process.env.SERIAL.substring(15)+"-1-ON-"+w.isCharging()+"-"+w.batt(1)+"%",service:['0xfff0'],connectable:true});
		//NRF.setAdvertising({},{manufacturerData:[ledBT.cmd(c)]});
		NRF.setAddress(euc.mac);
		//NRF.setAddress("eu:cW:at:ch:00:01 public");
		NRF.restart();
		NRF.disconnect();
		//NRF.restart();
		*/
	}, 
	e:(o)=>{
		NRF.updateServices({0xffa0:{0xffa1:{value:0,notify:true}},});
		//NRF.setAdvertising({}, { name:set.def.name+" Light",connectable:true });
		//NRF.setAddress(set.def.addr+" random");
		/*
		set.updateBT();
		NRF.restart();
		NRF.disconnect();
		*/
		euc.proxy.state=0;
	}
};
euc.on("connState",(x)=>{ 
	if (euc.proxy) {
		if (x){ 
			euc.proxy.s();
			euc.proxy.state=1;
		}else{
			euc.proxy.state=0;
			euc.proxy.e();
		}
	}
});
//euc.proxy.s();
set.bt=4;
}

