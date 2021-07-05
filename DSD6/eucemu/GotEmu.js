E.setConsole(Serial1,{force:true}); //0000 devmode

euc={};
euc.dash=[];
euc.dash.bat=10;
timeLast=getTime();
lolo= new Uint8Array([0x5a,0xa5,0x20,0x14,0x3e,0x04,0xb0,0x00,0x00,0x00,0x00,0x48,0x98,0x00,0x00,euc.dash.bat,0x00,0x00,0x00,0x00,0x00,0x18,0x38,0x25,0x00,0x00,0x00,0x3b,0x00,0xbe,0x00,0xa2,0x14,0x08,0x00,0x00,0x00,0x00,0x00]);


//euc emu
euc.emuF=1;
//lala=[];
euc.emuR=function(evt){
  		//if (set.bt!=4){
		//	set.bt=4;
		//handleInfoEvent({"src":"BT","title":"EUC","body":"Phone connected"});
		//}
  print(evt);
 //euc.wri(evt.data);
  /*  
	if (evt.data==[170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 20, 90, 90]){
		if (set.bt!=4){
			set.bt=4;
		handleInfoEvent({"src":"BT","title":"EUC","body":"Phone connected"});
		}	
		euc.emuW([0xAA,0x55,0x00,0x00,0X00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0xf5,0x14,0x5A,0x5A]);
		//euc.emuW([0xAA,0x55,0x0f,0x20,0X00,0x00,0x04,0x00,0x3B,0xB4,0x08,0x00,0xa4,0x06,0x02,0xe0,0xa9,0x14,0x5A,0x5A]);
		//setTimeout(()=>{euc.emuU();},1000);
	} 
	else euc.wri(evt.data);
*/
//lala.push(evt);
};
NRF.setServices({
			0xffe0: {
				0xffe1: {
					value : [85, 170, 23, 225, 0, 0, 0, 0, 0, 0, 0, 75, 254, 82, 0, 1, 0, 9, 0, 24],
					maxLen : 20,
					writable : true,
					readable:false,
					notify:true,
					onWrite : function(evt) {
					  euc.emuR(evt);
					}
				}
			}
}, { advertise: ['0xFFE0'], uart: false });
euc.emuW= function(o) {
	NRF.updateServices({
		0xffe0: {
			0xffe1: {
				value : o,
				notify:true
			}
		},
	});
};
lala=new Uint8Array([85, 170, 23, 225, 0, 0, 0, 0, 0, 0, 0, 75, 254, 82, 0, 1, 0, 9, 0, 24]);
lala0=new Uint8Array([90, 90, 90, 90, 85, 170, 0, 0, 194, 90, 40, 0, 6, 248, 0, 99, 0, 1, 0, 3]);
lala1=new Uint8Array([90, 90, 90, 90, 85, 170, 0, 0, 194, 90, 40, 0, 6, 248, 0, 99, 0, 1, 0, 3]);
lala2=new Uint8Array([0, 195, 4, 24, 90, 90, 90, 90]);


euc.emuW(lala);