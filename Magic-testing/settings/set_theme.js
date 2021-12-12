face[0].page="theme";
//
let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
let tm=(tout/(tout<60000?"1000":tout<3600000?"60000":"3600000"))+ (tout<60000?"''":tout<3600000?"'":"h");
UI.ele.ind("top",1,1);
UIc.start(1,0);
//UI.btn.img("main","_fold",1,_icon.themes,6<face.appRoot[0].length?face.appRoot[0].substr(0,6)+"..":face.appRoot[0],14,1,1);
UI.btn.img("main","_fold",1,_icon.themes,"FACE",14,1,1);
//UI.btn.img("main","_2x3",3,_icon.tmout,"TIMER",14,tout==3000?1:4);
UI.btn.c2l("main","_2x3",3,set.def.txt?"OFF":tm,set.def.txt?tm:"",15,1);
UI.btn.c2l("main","_2x3",4,"CLR",0,3,0);
UI.btn.img("main","_2x3",5,_icon.txt,"TXT",set.def.txt?15:3,set.def.txt?4:0);
UI.btn.img("main","_2x3",6,_icon.info,"INFO",set.def.info?15:3,set.def.info?4:0);
UIc.end();


UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	let f=16<face.appRoot[0].length?face.appRoot[0].substr(0,16).toUpperCase()+"..":face.appRoot[0].toUpperCase();
	UI.btn.ntfy(1,3,0,"_bar",6,"TIMEOUT FOR:",f,15,0,1);
	UIc.bar._sel_left=()=>{
		buzzer(buz.ok);
		let tout=set.def.off[face.appRoot[0]]?set.def.off[face.appRoot[0]]:3000;
		if ( 1000 < tout && tout <= 15000 ) tout=tout<3000?3000:tout-3000;
		else if ( 15000 < tout && tout <= 60000 ) tout=tout-5000;
		else if (60000 < tout && tout <= 3600000 )tout=tout < 600001?60000:tout-600000; 
		else if (3600000 < tout ) tout=tout < 3600000?3600000:tout-1800000; 
		else tout=3000;
		let tm=(tout/(tout<60000?"1000":tout<3600000?"60000":"3600000"))+ (tout<60000?"''":tout<3600000?"'":"h");
		UI.btn.ntfy(0,3,1,"_bar",6,"","",15,0,1);
		UI.btn.c2l("main","_2x3",3,tm,0,15,1);
		set.def.off[face.appRoot[0]]=tout;
	};
	UIc.bar._sel_right=()=>{
		buzzer(buz.ok);
		let tout=set.def.off[face.appRoot[0]]?set.def.off[face.appRoot[0]]:3000;
		if (1000 <= tout && tout < 15000 )	tout=tout+3000;
		else if (15000 <= tout && tout < 60000 )	tout=tout+5000;
		else if (60000 <= tout && tout < 3600000) tout=tout<600000?600000:tout+600000; 
		else if (3600000 <= tout ) tout=14400000<tout?14400000:tout+1800000; 
		else tout=3000; //1sec
		let tm=(tout/(tout<60000?"1000":tout<3600000?"60000":"3600000"))+ (tout<60000?"''":tout<3600000?"'":"h");
		UI.btn.ntfy(0,3,1,"_bar",6,"","",15,0,1);
		UI.btn.c2l("main","_2x3",3,tm,0,15,1);
		set.def.off[face.appRoot[0]]=tout;
	};	
};
UIc.main._fold_1=UIc.main._2x3_3;
UIc.main._2x3_4=()=>{
	buzzer(buz.na);
	UI.btn.ntfy(1,0,0,"_bar",6,"NOT AVAILABLE","YET",15,7);
	w.gfx.flip();
};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.txt=1-set.def.txt;
	if (set.def.info) UI.btn.ntfy(1,0,0,"_bar",6,"TEXT UNDER ICON",set.def.txt?"ENABLED":"DISABLED",15,set.def.txt?4:0);
	UI.btn.img("main","_2x3",5,_icon.txt,"TXT",set.def.txt?15:3,set.def.txt?4:0);
	UI.btn.img("main","_2x3",6,_icon.info,"INFO",set.def.info?15:3,set.def.info?4:0);
	UI.btn.c2l("main","_2x3",3,set.def.txt?"OFF":tm,set.def.txt?tm:"",15,1);
	//UI.btn.img("main","_2x3",3,_icon.tmout,"TIMER",14,tout==3000?1:4);

};
UIc.main._2x3_6=()=>{
	buzzer(buz.ok);
	set.def.info=1-set.def.info;
	UI.btn.ntfy(1,0,0,"_bar",6,"INFO ON ACTIONS",set.def.info?"ENABLED":"DISABLED",15,set.def.info?4:0);
	UI.btn.img("main","_2x3",6,_icon.info,"INFO",set.def.info?15:3,set.def.info?4:0);
};
tcNext.replaceWith(new Function('buzzer(buz.na);'));
tcBack.replaceWith(new Function('buzzer(buz.ok);eval(require("Storage").read("set_set"));if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;face[0].bar();}'));
