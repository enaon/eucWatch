//themes -todo
function col15(no){
	switch (no) {
      case "black":return 0;case "white":return 4095;case "lblue":return 1535;case "blue":return 143;case "dblue":return 1375;case "blue1":return 1708;
	  case "raf":return 1453;case "raf1":return 1708;case "raf2":return 1963;case "raf3":return 2220;case "raf4":return 2474;case "raf5":return 3005;
  	  case "gray":return 2730;case "lgray":return 3003;case "dgray":return 1365;case "dgray1":return 1351;case "lgreen":return 1525;case "red":return 3840;
   	  case "dred":return 3925;case "dred1":return 3888;case "purple":return 3935;case "lyellow":return 4085;case "dyellow":return 4064;case "yellow":return 4080;
	  case "olive":return 170;
	}
}

var colo15={ txt: 4095, txt1: 1535, txt2: 1365, txt3: 0,
  hdr: 1368, hTxt: 3003, bck: 1708, bck0: 0, bck1: 3003,
  bck2: 2730, bck3: 1963, btnEn: 1453, btnEn1: 1535, btnEn2: 3935,
  btnDs: 2730, btnDs1: 3003, btnDs2: 1963, btnAl: 4085, btnAl1: 3840,
  btnSt: 3935, btnTxt: 0, btnTxt1: 4095 };


function col16(no){
	switch (no) {
      case "black":return 0x0000;case "white":return 0xFFFF;case "lblue":return 0x8E3F;case "blue":return 0x319B;case "dblue":return 0x0819;case "blue1":return 0x319B;
	  case "raf":return 0x3276;case "raf1":return 0x4B16;case "raf2":return 0x3ADC;case "raf3":return 0x2A16;case "raf4":return 0x6396;case "raf5":return 0x5332;
  	  case "gray":return 0x5B2F;case "lgray":return 0x94F5;case "dgray":return 0x31C8;case "dgray1":return 0x2104;case "green":return 0x24C5;case "lgreen":return 0x37C8;
	  case "red":return 0xF165;case "dred":return 0xA000;case "dred1":return 0x8904;case "purple":return 0xA815;case "lyellow":return 0xFFEA;case "dyellow":return 0xCEE0;
	  case "yellow":return 0xE667;case "olive":return 0x3C0C;
	}
}
col=col16;

var colo15={ txt: 4095, txt1: 1535, txt2: 1365, txt3: 0,
  hdr: 1368, hTxt: 3003, bck: 1708, bck0: 0, bck1: 3003,
  bck2: 2730, bck3: 1963, btnEn: 1453, btnEn1: 1535, btnEn2: 3935,
  btnDs: 2730, btnDs1: 3003, btnDs2: 1963, btnAl: 4085, btnAl1: 3840,
  btnSt: 3935, btnTxt: 0, btnTxt1: 4095 };

var colo16={ hdr: undefined, hTxt: 38133, bck: 19222, bck0: 0, bck1: 38133,
  bck2: 23343, bck3: 15068, btnEn: 12918, btnEn1: 36415, btnEn2: 43029,
  btnDs: 23343, btnDs1: 38133, btnDs2: 15068, btnAl: 58983, btnAl1: 61797,
  btnSt: 43029, btnTxt: 0, btnTxt1: 65535 };
  
colo=colo16;

/*
var colo16={
	txt:col("white"),
	txt1:col("lblue"),
	txt2:col("dgray"),
	txt3:col("black"),
	hdr:col("dgray+3"),
	hTxt:col("lgray"),
	bck:col("raf1"),
	bck0:col("black"),
	bck1:col("lgray"),
	bck2:col("gray"),
	bck3:col("raf2"),
	btnEn:col("raf"),
	btnEn1:col("lblue"),
	btnEn2:col("purple"),
	btnDs:col("gray"),
	btnDs1:col("lgray"),
	btnDs2:col("raf2"),
	btnAl:col("yellow"),
	btnAl1:col("red"),
	btnSt:col("purple"),
	btnTxt:col("black"),
   	btnTxt1:col("white")
};
*/