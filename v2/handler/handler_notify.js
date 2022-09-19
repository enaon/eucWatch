E.setFlags({pretokenise:1});
//notifications
var notify={
	New:0,nIm:0,nInfo:0,nCall:0,nMail:0
};
notify.im=(require('Storage').read('im.log'))?require('Storage').readJSON('im.log'):[];
notify.info=(require('Storage').read('info.log'))?require('Storage').readJSON('info.log'):[];
notify.call=(require('Storage').read('call.log'))?require('Storage').readJSON('call.log'):[];
function handleInfoEvent(event,discrete) {
	//"ram";
	notify.nInfo++;
	notify.New++;
	
	let d=(Date()).toString().split(' ');
    let ti=(""+d[4]+" "+d[0]+" "+d[2]);
	notify.info.unshift("{\"src\":\""+event.src+"\",\"title\":\""+event.title+"\",\"body\":\""+event.body+"\",\"time\":\""+ti+"\"}");
	if (notify.info.length>10) notify.info.pop();
	if (ew.def.buzz&&!notify.ring) {
		face.off(8000);
		buzzer.nav([80,50,80]);
		if (face[0].bar){
			UI.btn.ntfy(1,4,0,"_bar",6,event.title,event.body,0,15);w.gfx.flip();
		}else if (!discrete){
			if (face.appCurr!="clock"||face.pageCurr!=0) {
				face.go("clock",0);
				face.appPrev="clock";face.pagePrev=-1;
			}
		}
	}
}
