var notify={
	New:0,nIm:0,nInfo:0,nCall:0,nMail:0
};
notify.im=(Boolean(require('Storage').read('im.log')))?require('Storage').readJSON('im.log'):[];
notify.info=(Boolean(require('Storage').read('info.log')))?require('Storage').readJSON('info.log'):[];
notify.call=(Boolean(require('Storage').read('call.log')))?require('Storage').readJSON('call.log'):[];
function handleInfoEvent(event,disc) {
	"ram";
	notify.nInfo++;
	notify.New++;
	let d=(Date()).toString().split(' ');
    let ti=(""+d[4]+" "+d[0]+" "+d[2]);
	notify.info.unshift("{\"src\":\""+event.src+"\",\"title\":\""+event.title+"\",\"body\":\""+event.body+"\",\"time\":\""+ti+"\"}");
	if (notify.info.length>10) notify.info.pop();
	//buzzer([80,50,80]);
	if (ew.def.buzz&&!notify.ring) {
		buzzer([80,50,80]);
		if (!disc){
			if (face.appCurr!="main"||face.pageCurr!=0) {
				face.go("main",0);
				face.appPrev="main";face.pagePrev=-1;
			}
		}else {
			if (face[0].bar){
				UI.btn.ntfy(1,2,0,"_bar",6,event.title,event.body,15,4);w.gfx.flip();
			}
		
		}
	}
}
