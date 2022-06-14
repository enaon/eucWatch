//816
set.TP=setWatch(function(s){
	i2c.writeTo(0x15,0);
	var tp=i2c.readFrom(0x15,7);
	//print("touch816 :",tp);
	if (face.pageCurr>=0) {
		if (tp[1]== 0 && tp[3]==64) tp[1]=5;
		else if (set.def.rstR==0xE5 && tp[1]== 12 ) tp[6]=tp[6]+25;
		touchHandler[face.pageCurr](tp[1],tp[4],tp[6]);
	}else if (tp[1]==1) {
		face.go(face.appCurr,0);
	}
},D28,{repeat:true, edge:"rising"}); 
