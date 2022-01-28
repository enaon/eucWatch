UI={
  size:{_2x2:20,_2x1:25,_txt:30,_sideSmall:20,sideBig:45,underSmall:20,txt:0.9,len:1,sca:1},
  pos:{
	_fold:[12,[0,20,160,105,30],[80,20,240,105,30],[0,106,120,220,30],[120,106,240,220,30]], 
  	_2x2:[35,[0,20,120,127,35],[121,20,240,127,35],[0,128,120,235,35],[121,128,240,235,35]],
	_2x3:[37,[0,20,80,100,35],[81,20,160,100,35],[161,20,239,100,35],[0,101,80,180,35],[81,101,160,180,35],[161,101,239,180,35]],
	_2x1:[25,[0,20,239,130,35],[0,131,239,235,35]],
	_ele:{"0":25,title:[0,236,239,279,28],ind:[80,7,160,12],indF:[0,0,239,19]},
	_bar:[20,[0,181,80,279,35],[81,181,160,279,35],[161,181,239,279,35],[0,181,120,279,35],[121,181,239,279,35],[0,181,239,279,27],[0,236,239,279,27]],
	_main:[20,[0,20,120,80,30],[121,20,239,80,30],[0,20,239,80,20],[0,81,160,180,30],[0,81,239,235,60],[0,20,239,180,60],[0,20,239,235,30],[0,101,239,180,30],[0,81,239,180,95]],
	_top:20,
	_head:2,
	_foot:255,
  },
  btn:{
    size:{_xs:28,_s:22,_m:28,_l:35,_xl:45,txt:1,len:1},
	c3l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
		"ram";
	  //draw
		let p=(UI.pos[no][po]);
		let x=p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/2);
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);
		w.gfx.setFont("Vector", p[4]);
		w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/3.5)); 
		w.gfx.setFont("Vector",p[4]*0.5);	
		w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height-10);
		if (!set.def.bpp) w.gfx.flip();
		//coordinates
		if (UIc.get[loc])
			UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
		else w.gfx.flip();
	},
    c2l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
      "ram";
	  //draw
      let p=(UI.pos[no][po]);
      let x=p[2]-((p[2]-p[0])/2);
      let y=p[3]-((p[3]-p[1])/2);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(1,fclr);
      if (txt2&&txt2!=""){
        w.gfx.setFont("Vector", p[4]*0.65*UI.size.txt);
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-w.gfx.stringMetrics(txt1).height-((p[3]-p[1])/10)); 
		//w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/(UI.size.txt*3.5) )); 
        w.gfx.setFont("Vector",p[4]*UI.size.txt);	
		//w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height);
		w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height*(1.95-UI.size.txt));
  		//w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height-( (p[3]-p[1])*UI.size.txt/25)  );
      }else{  
        w.gfx.setFont("Vector",p[4]*UI.size.txt);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+4-(w.gfx.stringMetrics(txt1).height/2)); 
      }
	  if (!set.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
    },
    img:function(loc,no,po,img,txt,fclr,bclr,side,tran){
      "ram";
      let p=(UI.pos[no][po]);
	  let x=p[0]+((p[2]-p[0])/2);
      let y=p[1]+((p[3]-p[1])/2);
      if (!tran){ 
		if (bclr==4){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0]+2,p[1]+2,p[2]-2,p[3]-2);
	    }else {		
  			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
	    }
	  }
      w.gfx.setColor(1,fclr);	
	  if  (txt&&side){
		  //w.gfx.setFont("Vector",(p[3]-p[1])/2);
 		  w.gfx.setFont("Vector",p[4]);	
		  let xa=x-((w.gfx.imageMetrics(img).width*0.75+w.gfx.stringWidth(txt))/2);
	      w.gfx.drawImage(img,xa,y-(w.gfx.imageMetrics(img).height/2),{scale:UI.size.sca});
		 // w.gfx.setColor(1,bclr==3?0:3);
		  w.gfx.drawString(txt,xa+5+w.gfx.imageMetrics(img).width,y-(w.gfx.stringMetrics(txt).height/2)+2); 
	  }else if (set.def.txt&&txt) {
		  w.gfx.drawImage(img,x-24*0.65*UI.size.sca,p[1]+((p[3]-p[1])*(2-UI.size.txt)/15) ,{scale:0.75*UI.size.sca});
		  //w.gfx.setColor(1,bclr==3?0:14);
		  w.gfx.setColor(1,fclr);
		  w.gfx.setFont("Vector",p[4]*0.7*UI.size.txt);	
		  w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+( (p[3]-p[1])*(2-UI.size.txt)/6 )); 
	  }else w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca/2),y-(w.gfx.imageMetrics(img).width*UI.size.sca/2),{scale:UI.size.sca});
	  img=0;
	  if (!set.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
	}, 
	ntfy:function(rst,tmot,ignr,no,po,txt1,txt2,fclr,bclr,sel){
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
		if (rst&&!sel) UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+'},0);'));	
		if (!ignr){
			let p=(UI.pos[no][po]);
			let x=p[2]-((p[2]-p[0])/2);
			let y=p[3]-((p[3]-p[1])/2);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(1,fclr);
			if (txt1) {//w.gfx.setFont("Vector",p[2]-p[0]this.size.);	
				//w.gfx.setFont("Vector",UI.pos[no][0]*( (80 < p[2]-p[0])?1:((p[2]-p[0])/80))*UI.size.txt);	
				w.gfx.setFont("Vector",p[4]*UI.size.txt);	
				w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/(3/UI.size.txt ))); 
			}
			if (txt2) 	{
				//w.gfx.setFont("Vector",UI.pos[no][0]*( (100 < p[2]-p[0])?1:((p[2]-p[0])/100))*UI.size.txt);	
				w.gfx.setFont("Vector",p[4]*1.05*UI.size.txt);	
				w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height-( (p[3]-p[1])/20)*UI.size.txt);
			}
			if (sel) {
				w.gfx.drawString("<",p[0]+7,y-((p[3]-p[1])/4));
				w.gfx.drawString(">",p[2]+-5-w.gfx.stringWidth(">"),y-((p[3]-p[1])/4));
				if (rst) {
					w.gfx.flip();
					UIc.raw.bar=`if (x<120&&${p[1]}<y&&y<${p[3]}) UIc.bar._sel_left(); else if (120<x&&${p[1]}<y&&y<${p[3]}) UIc.bar._sel_right();`;
					UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));	
				}
			}
		}
		UI.ntid=setTimeout(function(t){UI.ntid=0;/*UI.emit('ntfy',"ok");*/if (TC.tid) {clearTimeout(TC.tid);TC.tid=0;} set.bar=0; if (face[0].bar) face[0].bar(); },tmot?tmot*1000:1000);
	}
  },
  ele:{
	title:function(txt,fclr,bclr){
		"ram";
		let p=(UI.pos._ele.title);
		let x=4+p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/1.5);
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);	
		//w.gfx.setFont("Vector",((p[3]-p[1])/2)*UI.size.txt);	
		w.gfx.setFont("Vector",p[4]*UI.size.txt);
		w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y-2); 
        if (!set.def.bpp) w.gfx.flip();
	},
	ind:function(c,t,clr){
		"ram";
		if (UI.pos._ele.indF){
			let pf=(UI.pos._ele.indF);
			w.gfx.setColor(0,clr?clr:1);
			w.gfx.fillRect(pf[0],pf[1],pf[2],pf[3]);
		}
		let p=(UI.pos._ele.ind);
		w.gfx.setColor(0,0);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		let pa=(p[2]-p[0])/t;
		w.gfx.setColor(1,3);	
		w.gfx.fillRect(p[0]+(pa*(c-1)),p[1],p[0]+(pa*c),p[3]);
        if (!set.def.bpp) w.gfx.flip();
	},
	fill:function(no,po,clr){
		let p=(UI.pos[no][po]);
		w.gfx.setColor(0,clr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
        if (!set.def.bpp) w.gfx.flip();
	}
  },
  txt:{
	wrap:function(str,len){
		"ram";
		str=str.split(' ');
		var line="";
		let i=0;
		var prev=0;
		for (i==0;i<str.length;i++){
		  if (str[i].length<(len+1)){
			if (str[i].length+(line.length-line.lastIndexOf('\n'))<(len+1)) {
			if (line!="") line=line+" "+str[i]; else line=str[i];
			}else line=line+"\n"+str[i];
		  }else {
			var o=0;
			var l;
			while (o<str[i].length){
			  l=line.length-(line.lastIndexOf('\n')+1)>0?len-(line.length-line.lastIndexOf('\n')):len;
			  if (l<=0) l=len;
			  if (l<len) line=line+" "+str[i].substr(o,l);
			  else  { if (line!="") line=line+"\n"+str[i].substr(o,l);else line=str[i].substr(o,l);}
			  o=o+l;
			}
		  }
		}
		return line;
	},
    block:function(no,po,txt,len,fclr,bclr,tran){
		"ram";
		let p=(UI.pos[no][po]);
		let x=p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/2);
		w.gfx.setColor(0,bclr);
		//if (p[2]-p[0]-50<txt.length) txt=this.wrap(txt,p[2]-p[0]-50);
		txt=this.wrap(txt,len*UI.size.len);
		if (!tran) w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);	
		w.gfx.setFont("Vector",UI.size._txt*UI.size.txt);	
		w.gfx.drawString(txt,10+x-(w.gfx.stringWidth(txt)/2),p[1]+((p[3]-p[1])/10)); 
		if (!set.def.bpp) w.gfx.flip();
	}
  }
  
};
/*
if ( process.env.BOARD=="BANGLEJS2"){
 UI.pos={
	_fold:[12,[0,20,160,105,30],[80,20,240,105,30],[0,106,120,220,30],[120,106,240,220,30]], 
  	_2x2:[35,[0,20,87,107,28],[88,20,174,107,28],[0,108,87,174,28],[88,128,174,174,28]],
	_2x3:[22,[0,20,58,78,20],[59,20,116,78,20],[117,20,174,78,20],[0,79,58,136,20],[59,79,116,136,20],[117,79,174,136,20]],
	_2x1:[25,[0,20,239,130,26],[0,131,239,235,26]],
	_ele:{"0":25,title:[0,236,239,279],ind:[80,7,160,12],indF:[0,0,239,19]},
	_bar:[20,[0,181,80,279,35],[81,181,160,279,35],[161,181,239,279,35],[0,181,120,279,35],[121,181,239,279,35],[0,181,239,279,30],[0,236,239,279,30]],

	_main:[20,[0,20,120,80,30],[121,20,240,80,30],[0,20,239,80,20],[0,81,160,180,30],[0,181,239,235,30],[0,20,239,180,60],[0,20,239,235,30],[0,101,239,180,30],[0,81,239,180,55]],

	_main:[20,[0,20,120,80,30],[121,20,240,80,30],[0,20,239,80,20],[0,81,160,180,30],[0,181,239,235,30],[0,20,239,180,60],[0,20,239,235,30],[0,101,239,180,30],[0,81,239,180,55]],
	_top:20,
	_head:2,
	_foot:255,
  };
}
*/
if ( process.env.BOARD=="BANGLEJS2"){
 UI.size={_2x2:20,_2x1:25,_txt:24,_sideSmall:20,sideBig:45,underSmall:20,txt:1,len:1,sca:0.75};

 UI.pos={
	_fold:[12,[0,7,116,63,20],[117,7,178,63,20],[0,64,90,178,20],[90,64,178,179,20]], 
	_2x2:[35,[0,7,89,75,25],[90,7,178,75,25],[0,76,89,145,25],[90,76,175,145,25]],
	_2x3:[27,[0,7,58,63,27],[59,7,116,63,27],[117,7,175,63,27],[0,64,58,116,27],[59,64,116,116,27],[117,64,175,116,27]],
	_2x1:[25,[0,7,175,74,26],[0,75,175,145,26]],
	_ele:{"0":25,title:[0,146,178,178,22],ind:[60,2,115,4],indF:[0,0,175,6]},
	_bar:[20,[0,117,58,175,22],[59,117,116,175,22],[117,117,175,175,22],[0,117,89,175,22],[90,117,175,175,22],[0,117,175,175,21],[0,146,175,175,20]],
	_main:[20,[0,7,89,50,20],[90,7,178,50,20],[0,7,178,50,20],[0,51,178,145,20],[0,51,178,145,55],[0,7,178,116,30],[0,7,178,145,25],[0,93,178,145,20],[0,51,178,116,70]],
	_top:20,
	_head:2,
	_foot:255,
  };
  g.col=Uint16Array([  0,10,2047,2047,31,2047,31,63488,63519,63519,31,63519,63519,65504,65535,65535]);

}
//g.col=Uint16Array([  0,31,2016,2016,31,2047,2047,63488,63519,63519,   31,63519,63519,65504,65535,65535]);
//icon
eval(require('Storage').read('icons'));

var UIc={
	get:{bar:0,main:0},
	raw:{main:" ",bar:" ",up:" ",down:" ",back:" ",next:" "},
	xy:function(){},
	main:{},
	bar:{},
	start:function(m,b){
		"ram";
		if (m) {UIc.raw.main=" "; UIc.get.main=1;}
		if (b) {UIc.raw.bar=" "; UIc.get.bar=1;} 
	},
	end:function(){
	"ram";
		w.gfx.flip();
		UIc.get.main=0;UIc.get.bar=0;
		UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));
	},
	clear:function(){
		this.raw={main:" ",bar:" ",up:" ",down:" ",back:" ",next:" "};
	}
};

