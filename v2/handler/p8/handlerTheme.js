/*

//themes -todo
if (!Boolean(require("Storage").read("colmode16"))){
	function col(no){
		switch (no) {
			case "black":return 0;case "white":return 4095;case "lblue":return 1535;case "blue":return 143;case "dblue":return 1375;case "blue1":return 1708;
			case "raf":return 1453;case "raf1":return 1708;case "raf2":return 1963;case "raf3":return 2220;case "raf4":return 2474;case "raf5":return 3005;
			case "gray":return 2730;case "lgray":return 3549;case "dgray":return 1365;case "dgray1":return 1351;case "lgreen":return 1525;case "red":return 3840;
			case "dred":return 3925;case "dred1":return 3888;case "purple":return 3935;case "lyellow":return 4085;case "dyellow":return 4064;case "yellow":return 4080;
			case "olive":return 170;
		}
	}
}else {
	function col(no){
		switch (no) {
			case "black":return 0x0000;case "white":return 0xFFFF;case "lblue":return 0xD7BF;case "blue":return 0xEFBF;case "dblue":return 0x0819;case "blue1":return 0x319B;
			case "raf":return 0x3276;case "raf1":return 0x4B16;case "raf2":return 0x3ADC;case "raf3":return 0x2A16;case "raf4":return 0x6396;case "raf5":return 0x5332;
			case "gray":return 0x5B2F;case "lgray":return 0xD6BA;case "dgray":return 0x31C8;case "dgray1":return 0x2104;case "green":return 0x24C5;case "lgreen":return 0x37C8;
			case "red":return 0xF165;case "dred":return 0xA000;case "dred1":return 0x8904;case "purple":return 0xA815;case "lyellow":return 0xFFEA;case "dyellow":return 0xCEE0;
			case "yellow":return 0xFFE0;case "olive":return 0x3C0C;
		}
	}
}
//end
// 16bit RGB565  //0=black,1=dgray,2=gray,3=lgray,4=raf,5=raf1,6=raf2,7=red,8=blue,9=purple,10=?,11=green,12=olive,13=yellow,14=lblue,15=white
g.col=Uint16Array([ 0x000,0x31C8,0x5B2F,0xD6BA,0x3276,0x4B16,0x3ADC,0xF165,0xEFBF,0xA815,2220,0x5ff,0x3C0C,0xFFE0,0xD7BF,0xFFFF ]);

*/