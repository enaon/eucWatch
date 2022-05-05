//dsd6 handler 
//charge pin
set.tid.charge=setWatch(function(s){
	var v=digitalRead(D2);
	poke32(0x50000708,2); // disconnect pin for power saving, otherwise it draws 70uA more
	set.emit('charge',v);
},D2,true);  

set.charger=(x)=>{
	"ram";
	if (set.tid.chargeDelay) clearTimeout(set.tid.chargeDelay);
	set.tid.chargeDelay=setTimeout((x)=>{
		set.tid.chargeDelay=0;
		if (x) euc.start();
		else euc.end();
		print(x);
	},500,x);
};	
set.buzz=(x)=>{

	if (v==1) 
		buzzer([200]);
	else
		buzzer([100]);
};
set.on('charge',set.charger);





lu=function(){
  for (var i=0;i<1000;i++)
    analogWrite(D25,i/10000,{freq:60});
  setTimeout(()=>{
   //for (i=50;i<256;i++)
  for (var i=256;0<=i;i--)
    analogWrite(D25,i/2560,{freq:60});
    //analogWrite(D25,i/7056,{freq:60}); 
  },400); 
 
    setTimeout(()=>{ld();},800);
};
ld=function(){
  for (var i=50;0<=i;i--)
    analogWrite(D25,i/50,{freq:60});
    setTimeout(()=>{lu();},2000);
};
  