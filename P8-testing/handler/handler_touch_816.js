//816
ew.is.tpT=0;
ew.tid.TP=setWatch(function(s){
	i2c.writeTo(0x15,0);
	var tp=i2c.readFrom(0x15,7);
	//print("touch816 :",tp);
	if (face.pageCurr>=0) {
		if (tp[1]== 0 && tp[3]==64) tp[1]=5;
		else if (ew.def.rstR==0xE5 && tp[1]== 12 ) tp[6]=tp[6]+25;
                let e = tp[1];
                let x = tp[4];
                let y = tp[6];
                switch (scr.rotate) {
                  case 1:
                    if (tp[1]==1) e = 4
                    else if (tp[1]==2) e = 3;
                    else if (tp[1]==3||tp[1]==4) e = tp[1] - 2;
                    x = tp[6];
                    y = 240 - tp[4];
                    break;
                  case 2:
                    if (tp[1]==1||tp[1]==3) e = tp[1] + 1;
                    else if (tp[1]==2||tp[1]==4) e = tp[1] - 1;
                    x = 240 - tp[4];
                    y = 240 - tp[6];
                    break;
                  case 3:
                    if (tp[1]==1||tp[1]==2) e = tp[1] + 2;
                    else if (tp[1]==3) e = 2;
                    else if (tp[1]==4) e = 1;
                    x = 240 - tp[6];
                    y = tp[4];
                    break;
                }
                if (scr.mirror) {
                    x = 240 - x;
                    if (e==3) e = 4;
                    else if (e==4) e = 3;
                }
		touchHandler[face.pageCurr](e,x,y);
	}else if (tp[1]==1) {
		face.go(face.appCurr,0);
	}else if (tp[1]==5) {
		if ( (getTime()|0) - ew.is.tpT < 1 )
			face.go(face.appCurr,0);
		else   ew.is.tpT=getTime()|0;
	}
},ew.pin.touch.INT,{repeat:true, edge:"rising"});
