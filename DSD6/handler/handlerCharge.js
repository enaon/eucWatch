//dsd6 handler 
//charge pin
set.tid.charge=setWatch(function(s){
	if (digitalRead(D2)==1) 
		w.vibrate(0.85,1,200,600);
	else
		w.vibrate(0.85,2,100,100);
},D2,true);  
