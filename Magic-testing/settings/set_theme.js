face[0].page="theme";
UIc.get=1;
UIc.cord="";
//
let tout=(set.def.off[face.appRoot[0]])?set.def.off[face.appRoot[0]]:3000;
let tm=(tout/((this.tout<60000)?"1000":(this.tout<3600000)?"60000":"3600000"))+ ((tout<60000)?"sec":(tout<3600000)?"min":"hours");
UI.ele.ind("top",1,1);
//UI.btn.img("_fold",1,UI.icon.themes,6<face.appRoot[0].length?face.appRoot[0].substr(0,6)+"..":face.appRoot[0],14,1,1);
UI.btn.img("_fold",1,UI.icon.themes,"FACE",14,1,1);
UI.btn.c2l("_2x3",3,"TIMEOUT",tm,0,3);
UI.btn.c2l("_2x3",4,"COLOR",0,0,3);
UI.btn.c2l("_2x3",5,"STYLE",0,0,3);
UI.btn.img("_2x3",6,UI.icon.info,set.def.info?"INFO":"",set.def.info?15:0,set.def.info?4:3);
//UI.btn.c2l("_2x3",6,"TEXT",set.def.info?"ON":"OFF",set.def.info?15:0,set.def.info?4:3);
if (set.def.bpp) w.gfx.flip();
//get coordinates
UIc.tap.btn.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.cord+'},0);'));
UIc.get=0;UIc.cord="";
//

face[0].btn._fold_1=()=>{buzzer(buz.ok);eval(require('Storage').read('set_set'));};
face[0].btn._2x3_3=()=>{
	buzzer(buz.ok);
	UI.btn.ntfy("_sel",3,"ala","lala",15,1,2,1);
	UIc.tap.bar.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.cord+'},0);'));
	UIc.get=0;UIc.cord="";
};
face[0].btn._2x3_4=()=>{
	buzzer(buz.na);
	UI.btn.ntfy("_sel",3,"NOT AVAILABLE","YET",15,7);
	UIc.tap.bar.replaceWith(new Function("x",'return;'));
};
face[0].btn._2x3_5=()=>{
	buzzer(buz.na);
	UI.btn.ntfy("_sel",3,"NOT AVAILABLE","YET",15,7);
	UIc.tap.bar.replaceWith(new Function("x",'return;'));
};
face[0].btn._2x3_6=()=>{
	buzzer(buz.ok);
	set.def.info=1-set.def.info;
	//eval(require('Storage').read('set_theme'));
	UI.btn.img("_2x3",6,UI.icon.info,set.def.info?"INFO":"",set.def.info?15:0,set.def.info?4:3);
	//UI.btn.c2l("_2x3",6,"TEXT",set.def.info?"ON":"OFF",set.def.info?15:0,set.def.info?4:3);
	UI.btn.ntfy("_sel",3,"INFO TEXT",set.def.info?"ENABLED":"DISABLED",15,set.def.info?4:1);
	UIc.tap.bar.replaceWith(new Function("x",'return;'));
};

		
/*this.g.drawString("TIMEOUT (" + ((this.tout<60000)?"seconds":(this.tout<3600000)?"minutes":"hours") + ")",120-(this.g.stringWidth("TIMEOUT (" + ((this.tout<60000)?"seconds":(this.tout<3600000)?"minutes":"hours") + ")")/2),85);


				this.g.drawString(face.appRoot[0],120-(this.g.stringWidth(face.appRoot[0])/2),20);



}else if (face[0].themeSet) {
				if ( 1000 < face[0].tout && face[0].tout <= 60000 ){
				  set.def.off[face.appRoot[0]]=face[0].tout-3000;
				  if (set.def.off[face.appRoot[0]] < 3000  )  set.def.off[face.appRoot[0]]=3000;
				}else if (60000 < face[0].tout && face[0].tout <= 3600000 ){					
				  set.def.off[face.appRoot[0]]=face[0].tout-600000; 
				  if (set.def.off[face.appRoot[0]] < 60000)  set.def.off[face.appRoot[0]]=60000;
				}else if (3600000 < face[0].tout ){
				  set.def.off[face.appRoot[0]]=face[0].tout-1800000; 
  				  if (set.def.off[face.appRoot[0]] < 3600000  )  set.def.off[face.appRoot[0]]=3600000;
				}else set.def.off[face.appRoot[0]]=3000; //1sec
				face[0].themetout();
				buzzer(buz.ok);
*/