function setupSerial(s){
	if (!s) s=Serial1;
	s.setup(38400,{rx:D22,tx:D23});
}
function resumeConsole(s){
	setupSerial(s);
	setTimeout(()=>{s.setConsole();},50);
}
function pauseConsole(s){
	if (!s) s=Serial1;
	if(s._options){
		Bluetooth.setConsole(1);
		setTimeout(()=>{
			var rx=s._options.rx;
			s.unsetup();
			rx.mode("input_pulldown");
			setWatch(()=>{resumeConsole(s);},rx,{edge:'rising',debounce:30});
		},500);
	}
}
