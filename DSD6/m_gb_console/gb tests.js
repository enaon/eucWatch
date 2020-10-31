E.setConsole(Serial1,{force:true});
GB=1;
require('Storage').write('setting.json',{"watchtype":"eucwatch"});
  Bluetooth.line="";
  Bluetooth.on('data',function(d) {
    var l = (Bluetooth.line + d).split("\n");
    Bluetooth.line = l.pop();
    l.forEach(n=>Bluetooth.emit("line",n));
  });
  Bluetooth.on('line',function(l) {
	print("line: ",l);
    if (l.startsWith('\x10')) l=l.slice(1);
//	l.startsWith('setTime(') && l.endsWith('})')
	if (l.startsWith('setTime(') && l.endsWith('})') && global.GB)
		print("date"); //try {eval(l) } catch(e) {}
    if (l.startsWith('GB({') && l.endsWith('})') && global.GB)
		{print("gb cmd in");try { global.GB(JSON.parse(l.slice(3,-1))); } catch(e) {}}
  });


   function gbSend(message) {
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
  }

function sendBattery() {
    gbSend({ t: "status", bat: E.getBattery() });
}
  
 function push.event(event) {
    if (event.t === "notify") {
      //require("notify").show(prettifyNotificationEvent(event));
      print("event in: ",event.t)
	  //Bangle.buzz();
	  digitalPulse(D16,1,100);
    //} else { // notify-
    // require("notify").hide(event);
    }
  } 

// var _GB = global.GB;
  global.GB = (event) => {
    switch (event.t) {
      case "notify":
      case "notify-":
        handleNotificationEvent(event);
		print("handle evenet");
        break;
      case "musicinfo":
        //handleMusicInfoUpdate(event);
        break;
      case "musicstate":
        //handleMusicStateUpdate(event);
        break;
      case "call":
        //handleCallEvent(event);
        break;
      case "find":
        //handleFindEvent(event);
        break;
    }
 //   if(_GB)setTimeout(_GB,0,event);
  };

 function gbSend(message) {
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
 }  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /* If not programmable add our own handler for Bluetooth data
  to allow Gadgetbridge commands to be received*/
  Bluetooth.line="";
  Bluetooth.on('data',function(d) {
    var l = (Bluetooth.line + d).split("\n");
    Bluetooth.line = l.pop();
    l.forEach(n=>Bluetooth.emit("line",n));
  });
  Bluetooth.on('line',function(l) {
    if (l.startsWith('\x10')) l=l.slice(1);
    if (l.startsWith('GB({') && l.endsWith('})') && global.GB)
      try { global.GB(JSON.parse(l.slice(3,-1))); } catch(e) {}
  });
  
  
  
  
  
  








//gadgetBridge modules

Bluetooth.removeListener('data',da);
Bluetooth.removeListener('line',li);


E.reboot()
NRF.setServices({},{uart:false});


NRF.setAdvertising({}, { name:"Espruino-devmode",connectable:true });
E.setConsole(Serial1,{force:true});
Bluetooth.line="";
  Bluetooth.on('data',function(d) {
    var l = (Bluetooth.line + d).split("\n");
    Bluetooth.line = l.pop();
    l.forEach(n=>Bluetooth.emit("line",n));
  });
  Bluetooth.on('line',function(l) {
	print("line in1:",l);
  line=l;
	if (l.startsWith('\3\3\x10')) l=l.slice(3);
	
    if (l.startsWith('\x10GB({') && l.endsWith('})'))print("line:",l);
	print("line in2:",l);
  });
  
  
  
  function gb(j) {
    Bluetooth.println(JSON.stringify(j));
  }
  
 function gbSend(message) {
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
 }
 
 
 var _GB = global.GB;
  global.GB = (event) => {
    switch (event.t) {
      case "notify":
      case "notify-":
        handleNotificationEvent(event);
        break;
      case "musicinfo":
        handleMusicInfoUpdate(event);
        break;
      case "musicstate":
        handleMusicStateUpdate(event);
        break;
      case "call":
        handleCallEvent(event);
        break;
      case "find":
        handleFindEvent(event);
        break;
    }
    if(_GB)setTimeout(_GB,0,event);
  };
   
//E.setConsole(Serial1,{force:true}); 
//Bluetooth.println(JSON.stringify({t:"info", msg:"Hello World"}))
//Bluetooth.println(JSON.stringify({ t:"findPhone", n:bool}))
//Bluetooth.println(JSON.stringify({ t:"findPhone", n:true}))

 
    function gb(j) {
    Bluetooth.println(JSON.stringify(j));
  }
  
 function gbSend(message) {
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
 }
 
  
  function sendBattery() {
    gbSend({ t: "status", bat: "10" });
  }
  
   NRF.on("connect", () => setTimeout(sendBattery, 2000));
  setInterval(sendBattery, 10*60*1000);
  sendBattery();
  