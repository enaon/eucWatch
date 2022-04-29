//dsd6 btn handler 
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
set.tid.btn=setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:"both"});
