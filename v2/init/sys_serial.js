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
function startSerial() {
	setupSerial();// first set to known state
	// now pause serial console for power saving, it will be enabled when RX goes high
	// it should be enough to connect to serial adapter
	pauseConsole(Serial1);
}