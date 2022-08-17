//816s
var lt,xt,yt,tt,tf,c;
//var ct=0;
ew.tid.TP=setWatch(function(s){
	var tp=i2c.readFrom(0x15,7);
	//console.log(tp);
	if (face.pageCurr>=0) {
		if (tp[3]==255) return;
		else if (tp[3]==0) {
			if (tt) {clearTimeout(tt);tt=0;}
			xt=tp[4];yt=tp[6];lt=1;st=1;tf=1;
			return;
		}else if (tp[1]==0 && tf) {
			var a;
			a=5;
			if (tp[6]>=yt+35) a=1;
			else if (tp[6]<=yt-35) a=2;
			else if (tp[4]<=xt-35) a=3;
			else if (tp[4]>=xt+35) a=4;
			//    console.log(tp[4],xt,tp[6],yt,a,ct);
			if (tt) {clearTimeout(tt);tt=0;}
			if (a!=5){
				face.off();
				touchHandler[face.pageCurr](a,xt,yt);
				ct=0;
				tf=0;
				return;
			} else {  
				tt=setTimeout(()=>{
					face.off();
					touchHandler[face.pageCurr](a,xt,yt);
					tt=0;ct=0;
					tf=0;
				},20);  
			}
			return;
		}else if (tp[1]==5) {
			if (tt) {clearTimeout(tt);tt=0;}
			face.off();
			touchHandler[face.pageCurr](5,tp[4],tp[6]);
			tf=0;
			return;
		}else if (tp[1]==12) {
			if (tt) {clearTimeout(tt);tt=0;}
			if (lt){face.off();touchHandler[face.pageCurr](12,tp[4],tp[6]);}
			lt=0;
			tf=0;
			return;
		}
	}else {
		if(tp[3]==0) tf=1;
		if (tp[1]==5 && tf) {
			if (s.time-c<0.25) face.go(face.appCurr,0);
			c=s.time;tf=0;
		}else if (tp[1]==1 && tf) {face.go(face.appCurr,0);tf=0;}
	}
},D28,{repeat:true, edge:"falling"}); 