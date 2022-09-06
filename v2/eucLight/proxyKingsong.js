//Kingsong Proxy
if (global.euc&&!euc.proxy){
	euc.proxy={
		state:0,
		f:0,
		r:(o)=>{
		"ram";
			if (euc.state=="READY") euc.wri("proxy",o.data);
		},
		w:(o)=>{
		"ram";
			if (set.bt!=4) return;
			NRF.updateServices({0xffe0:{0xffe1:{value:o,notify:true}},});
		},
		s:(o)=>{
			NRF.wake();
			//set.updateBT();
			//NRF.updateServices({0xffa0:{0xffa1:{value:1,notify:true}},});
		}, 
		e:(o)=>{
			NRF.updateServices({0xffa0:{0xffa1:{value:0,notify:true}},});
			NRF.sleep();
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
	NRF.sleep();
}

