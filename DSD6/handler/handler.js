//dsd6 handler 
//face
var face={
	curr:"main",
	offms:-1,
	go:function(app,arg){
		if (face[0] && face[0].exit) face[0].exit();
		face.curr=app;
		eval(require('Storage').read(app));
		face[0].init();
		if (!o.isOn) o.on();
		face[0].show();
		face.off();
	},
	off:function(app){	
		face.offms=face[0].offms;
		if (face.tid>0) {clearTimeout(face.tid); face.tid=-1;}
		face.tid= setTimeout(()=>{
			face[0].exit();
			face.tid=-1;
      o.off();
		},face.offms);
	}
};
//button
var press;
var long=0;
function button(o){
	face.go("main");
}
function buttonHandler(s){
	if (digitalRead(BTN)==1) { 
		press=true;
		if (long) {clearTimeout(long);}
		long=setTimeout(() => {
			button("long");
			press=false;
		}, 1000);
		return;
	}else if (press)  { 
		if (long) {clearTimeout(long);}
		button("short");
	}
}
setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:"both"});
//charge pin
setWatch(function(s){
		if (digitalRead(D2)==1) 
			w.vibrate(0.85,1,200,600);
		else
			w.vibrate(0.85,2,100,100);
	},D2,true);  
//start
setTimeout(()=>{
	o.setContrast(100);
	o.off();
	o.setRotation(0); //vertical
},500);



