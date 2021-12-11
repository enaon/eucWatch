face[0].page="theme";
//
let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
let tm=(tout/((tout<60000)?"1000":(tout<3600000)?"60000":"3600000"))+ ((tout<60000)?"sec":(tout<3600000)?"min":"hours");
UI.ele.ind("top",1,1);
UIc.start(1,0);
//UI.btn.img("main","_fold",1,UI.icon.themes,6<face.appRoot[0].length?face.appRoot[0].substr(0,6)+"..":face.appRoot[0],14,1,1);
UI.btn.img("main","_fold",1,UI.icon.themes,"FACE",14,1,1);
UI.btn.img("main","_2x3",3,UI.icon.tmout,"",14,tout==3000?1:4);
UI.btn.c2l("main","_2x3",4,"CLR",0,3,0);
UI.btn.img("main","_2x3",5,UI.icon.txt,"",set.def.txt?15:3,set.def.txt?4:0);
UI.btn.img("main","_2x3",6,UI.icon.info,"",set.def.info?15:3,set.def.info?4:0);
UIc.end();


UIc.main._fold_1=()=>{buzzer(buz.na);};
UIc.main._2x3_3=()=>{
	buzzer(buz.ok);
	//let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
	//let tm=(tout/((tout<60000)?"1000":(tout<3600000)?"60000":"3600000"))+ ((tout<60000)?"''":(tout<3600000)?"'":"h");
	UIc.start(0,1);
	UI.btn.c2l("bar","_bar",1,"",0,3,0);
	UI.btn.c2l("bar","_bar",3,"",0,15,0);
	//UI.btn.c2l("bar","_bar",2,tm,0,15,0);
	let f=16<face.appRoot[0].length?face.appRoot[0].substr(0,16).toUpperCase()+"..":face.appRoot[0].toUpperCase();
	UI.btn.ntfy(0,3,0,"_bar",6,"TIMEOUT FOR:",f,15,1);
	UIc.end();
	UIc.bar._bar_1=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(0,3,0,"_bar",6,"","",15,4,1);
		let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
		if ( 1000 < tout && tout <= 60000 ){
		  set.def.off[face.appRoot[0]]=tout-3000;
		  if (set.def.off[face.appRoot[0]] < 3000  )  set.def.off[face.appRoot[0]]=3000;
		}else if (60000 < tout && tout <= 3600000 ){					
		  set.def.off[face.appRoot[0]]=tout-600000; 
		  if (set.def.off[face.appRoot[0]] < 60000)  set.def.off[face.appRoot[0]]=60000;
		}else if (3600000 < tout ){
		  set.def.off[face.appRoot[0]]=tout-1800000; 
		  if (set.def.off[face.appRoot[0]] < 3600000  )  set.def.off[face.appRoot[0]]=3600000;
		}else set.def.off[face.appRoot[0]]=3000;
		let tm=(tout/((tout<60000)?"1000":(tout<3600000)?"60000":"3600000"))+ ((tout<60000)?"''":(tout<3600000)?"'":"h");
		UI.btn.c2l("bar","_bar",2,tm,0,15,4);

	};
	UIc.bar._bar_3=()=>{
		buzzer(buz.ok);
		UI.btn.ntfy(0,3,0,"_bar",6,"","",15,4,1);
		let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
		if (1000 <= tout && tout < 60000 )
			set.def.off[face.appRoot[0]]=tout+3000;
		else if (60000 <= tout && tout < 3600000){
			set.def.off[face.appRoot[0]]=tout+600000; 
			if (set.def.off[face.appRoot[0]] < 1200000  )  set.def.off[face.appRoot[0]]=600000;
		}else if (3600000 <= tout ){
			set.def.off[face.appRoot[0]]=tout+1800000; 
			if ( 14400000 < set.def.off[face.appRoot[0]]  )  set.def.off[face.appRoot[0]]=14400000;
		}else set.def.off[face.appRoot[0]]=3000; //1sec
		let tm=(tout/((tout<60000)?"1000":(tout<3600000)?"60000":"3600000"))+ ((tout<60000)?"''":(tout<3600000)?"'":"h");
		UI.btn.c2l("bar","_bar",2,tm,0,15,4);
	};	
};
UIc.main._2x3_4=()=>{
	buzzer(buz.na);
	UI.btn.ntfy(0,0,0,"_bar",6,"NOT AVAILABLE","YET",15,7);
	w.gfx.flip();
};
UIc.main._2x3_5=()=>{
	buzzer(buz.ok);
	set.def.txt=1-set.def.txt;
	UI.btn.ntfy(0,0,0,"_bar",6,"TEXT UNDER ICON",set.def.txt?"ENABLED":"DISABLED",15,set.def.txt?4:0);
	UI.btn.img("main","_2x3",5,UI.icon.txt,"",set.def.txt?15:3,set.def.txt?4:0);
};
UIc.main._2x3_6=()=>{
	buzzer(buz.ok);
	set.def.info=1-set.def.info;
	UI.btn.ntfy(0,0,0,"_bar",6,"INFO ON ACTIONS",set.def.info?"ENABLED":"DISABLED",15,set.def.info?4:0);
	UI.btn.img("main","_2x3",6,UI.icon.info,"",set.def.info?15:3,set.def.info?4:0);
};
