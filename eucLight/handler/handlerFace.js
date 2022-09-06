//dsd6 face handler 
//face
var face={
	curr:"main",
	offms:-1,
	go:function(app,arg){
		if (face[0] && face[0].exit) face[0].exit();
		if (app=="off") {
      if (face.tid>0) {clearTimeout(face.tid); face.tid=-1;}
      o.off();return;
    }
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