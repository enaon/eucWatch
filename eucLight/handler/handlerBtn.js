//dsd6 btn handler 
set.btn=(x)=>{
	let press;
	if (long) {clearTimeout(long);long=0;}
	if (x) { 
		press=true;
		if (long) {clearTimeout(long);}
		long=setTimeout(() => {
			set.emit("button","long");
			press=false;
		}, 100);
		return;
	}else if (press)  { 
		if (long) {clearTimeout(long);}
		set.emit("button","short");
	}
};
set.tid.btn=setWatch(set.btn,BTN1, {repeat:true, debounce:10,edge:"both"});

set.on("button",`buzzer(300);`);