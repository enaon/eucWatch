//m_gb
//parts of code from bangle.js**put link 
//E.setConsole(Serial1,{force:true});
function gbSend(message) {
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
}
function sendBattery() {
    gbSend({ t: "status", bat: w.battVoltage() });
}
function dismissNotification(id) {
	gbSend({ "t":"notify", "id":id, "n":"DISMISS" });
}	
function handleNotificationEvent(event) {
	if (event.t === "notify-") return; //todo
	let d=(Date()).toString().split(' ');
    let ti=(""+d[4]+" "+d[0]+" "+d[2]);
	if (event.src){
		if (event.src.startsWith('Phone')||event.src.startsWith('Manage')){
			if (!event.body||!event.title) return;
			if (event.title.startsWith('Missed')||event.body.includes('Missed')){
				notify.nCall++;
				notify.New++;	
				notify.call.unshift(JSON.stringify({src:event.src.substr(0,15),title:event.title.substr(0,20),body:event.body.substr(0,90),time:ti,id:event.id,idUnread:true}));
				if (notify.call.length>10) notify.call.pop();
				if (ew.def.buzz&&!notify.ring) {
					buzzer.nav([80,50,80]);
					if (face.appCurr!="clock"||face.pageCurr!=0) {
						face.go("clock",0);
						face.appPrev="clock";face.pagePrev=-1;
					}
				}
			}
		}else if (event.src.startsWith('OsmAnd')){
			print(1);
		}else{
			notify.nIm++;
			notify.New++;
			notify.im.unshift(JSON.stringify({src:event.src.substr(0,15),title:(event.title)?event.title.substr(0,20):"-",body:(event.body)?event.body.substr(0,90):"-",time:ti,id:event.id,idUnread:true}));
			if (notify.im.length>10) notify.im.pop();
			if (ew.def.buzz&&!notify.ring&&Boolean(require("Storage").read("notify"))) {
				buzzer.nav([80,50,80]);
				if (face.appCurr!="notify"||face.pageCurr!=5) {
					face.go("notify",5,"im");
					face.appPrev="off";
                }
			}
		}
    }else if (event.sender) {
		notify.nIm++;
		notify.New++;
		notify.im.unshift(JSON.stringify({src:"SMS",title:event.sender.substr(0,20),body:(event.body)?event.body.substr(0,90):"-",time:ti,id:event.id,idUnread:true}));
		if (notify.im.length>10) notify.im.pop();
		if (ew.def.buzz&&!notify.ring&&Boolean(require("Storage").read("notify"))) {
			buzzer.nav([80,50,80]);
			if (face.appCurr!="notify"||face.pageCurr!=5) {
				face.go("notify",5,"im");
				face.appPrev="off";
			}
		}
	}else if(event.title=="Voice"){
		print(1);
//line:  GB({"t":"notify","id":1603025690,"title":"Voice","body":"in 30 meters, turn right onto  M***n "})
	//	notify.
//   	  notify.im.unshift(JSON.stringify({src:(event.src)?event.src:"SMS",title:(event.title)?event.title.substr(0,20):(event.sender)?event.sender:"UNKNOWN",body:event.body.substr(0,90),time:ti}));
	}
} 
function handleWeatherEvent(event) {
	  notify.nInfo++;
  	  notify.New++;
	  notify.wupd=1;
	  let d=(Date()).toString().split(' ');
      let ti=(""+d[4]+" "+d[0]+" "+d[2]);
	  notify.info.unshift("{\"src\":\"Weather\",\"title\":\"Weather Updated\",\"body\":\""+event.loc+"\",\"time\":\""+ti+"\"}");
      if (notify.info.length>10) notify.info.pop();
	  notify.weather=event;
	  if (ew.def.buzz&&!notify.ring) {
		buzzer.nav([80,50,80]);
		if (face.appCurr!="clock"||face.pageCurr!=0) {
			face.go("clock",0);
			face.appPrev="clock";face.pagePrev=-1;
		}
	  }
} 
function handleCallEvent(event) {
	if (event.cmd==="incoming"&&event.name){
		notify.in=event;notify.ring=1;
		buzzer.nav([80,50,80,50,200,50,80,50,80]);
		if (face.appCurr!="clock"||face.pageCurr!=0) {
			face.go("clock",0);
			face.appPrev="clock";face.pagePrev=-1;
        }
	}else if (event.cmd=="end") {
		  notify.ring=0;notify.in=0;
	}
} 
//require('Storage').writeJSON("messages.log",messages)
//if ( JSON.parse(messages[0]).t=="notify") print(1)
// var _GB = global.GB;
var find=0;
function handleFindEvent(event) {
    if (event.n===true) {
	  if (!find){
		  find=setInterval(function(){ buzzer.nav([100,50,100,50,100]); },1000); 
	  }
	} else { // found
		clearInterval(find);find=0;
    }
} 
global.GB = (event) => {
	switch (event.t) {
	  case "notify":
      //case "notify-":
        handleNotificationEvent(event);
        break;
      case "musicinfo":
        //handleMusicInfoUpdate(event);
        break;
      case "musicstate":
        //handleMusicStateUpdate(event);
        break;
      case "call":
        handleCallEvent(event);
        break;
      case "find":
        handleFindEvent(event);
        break;
	  case "weather":
        handleWeatherEvent(event);
        break;
    }
};
  
  
  