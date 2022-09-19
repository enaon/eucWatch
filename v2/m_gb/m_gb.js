//m_gb
//parts of code from bangle.js**put link 
//E.setConsole(Serial1,{force:true});

global.GB= (event) => {
	if (ew.dbg && ew.log) {
		ew.log.unshift(event);
		if (100 < ew.log.length) ew.log.pop();
	}
	switch (event.t) {
	  case "notify":
      //case "notify-":
        gb.ntfy(event);
        break;
      case "musicinfo":
       gb.musicinfo(event);
        break;
      case "musicstate":
        gb.musicstate(event);
        break;
      case "call":
        gb.call(event);
        break;
      case "find":
        gb.find(event);
        break;
	  case "weather":
        gb.weather(event);
        break;
    }
};
gb={is:{}};
gb.send =function(message) {
	if (ew.dbg && ew.log) {
		ew.log.unshift(message);
		if (100 < ew.log.length) ew.log.pop();
	}
    Bluetooth.println(JSON.stringify(message));
    Bluetooth.println("");
    Bluetooth.println(JSON.stringify(message));
};
gb.sendBattery=function() {
    gb.send({ t: "status", bat: w.battVoltage() });
};
gb.dismiss=function(id) {
	gb.send({ "t":"notify", "id":id, "n":"DISMISS" });
}	;
gb.ntfy=function(event) {
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
		}else if (event.src.startsWith('maps')){
			handleInfoEvent({"src":"MAPS","title":"MAPS","body":"MAPS"});
		}else if (event.src.startsWith('OsmAnd')){
			print(1);
		}else if (event.src.startsWith('WheelLog')){
			handleInfoEvent({"src":"WHEELLOG","title":"STATUS","body":event.body.substr(0,90)});
		}else{
			notify.nIm++;
			notify.New++;
			handleInfoEvent({"src":"GB","title":"TELEGRAM","body":event.body});
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
		handleInfoEvent({"src":"GB","title":"Voice","body":event.body.substr(0,90)});
//line:  GB({"t":"notify","id":1603025690,"title":"Voice","body":"in 30 meters, turn right onto  M***n "})
	//	notify.
//   	  notify.im.unshift(JSON.stringify({src:(event.src)?event.src:"SMS",title:(event.title)?event.title.substr(0,20):(event.sender)?event.sender:"UNKNOWN",body:event.body.substr(0,90),time:ti}));
	}
} ;
gb.musicstate =function(event) {
//	handleInfoEvent({"src":"GB","title":"MUSIC","body":"STATE"});
	gb.is.state=event.state;
}
gb.musicinfo =function(event) {
//	handleInfoEvent({"src":"GB","title":"MUSIC","body":"INFO"});
}
gb.weather =function(event) {
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
} ;
gb.call =function(event) {
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
} ;
//require('Storage').writeJSON("messages.log",messages)
//if ( JSON.parse(messages[0]).t=="notify") print(1)
// var _GB = global.GB;
var find=0;
gb.find =function(event) {
    if (event.n===true) {
	  if (!find){
		handleInfoEvent({"src":"GB","title":"FIND WATCH","body":"HERE I AM"});
		find=setInterval(function(){ buzzer.nav([100,50,100,50,100]); },1000); 
	  }
	} else { // found
		handleInfoEvent({"src":"GB","title":"FIND WATCH","body":"FOUND !"});
		clearInterval(find);find=0;
    }
} ;  
  
  