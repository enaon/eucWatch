UI={
  size:{_2x2:20,_2x1:25,_txt:25,_sideSmall:20,sideBig:45,underSmall:20,txt:0.8,len:1,sca:1},
  pos:{
	_fold:[12,[0,20,160,105,20],[80,20,240,105,20],[0,106,120,220,20],[120,106,240,220,20]], 
	//_2x1:[25,[0,20,239,130,35],[0,131,239,235,35]],
  	//_2x2:[35,[0,20,120,127,25],[121,20,240,127,25],[0,128,120,235,25],[121,128,240,235,25]],
	//_2x3:[37,[0,20,80,105,28],[81,20,160,105,28],[161,20,239,105,28],[0,106,80,190,28],[81,106,160,190,28],[161,106,239,190,28]],

	_2x1:[25,[120],[75,185]],
 	_2x2:[25,[60,180],[80,200]],
	_2x3:[28,[40,120,200],[65,150]],
	
	_3x1:[25,[120],[40,120,200]],

	_3x1:[25,[0,20,239,91,25],[0,92,239,163,25],[0,164,239,235,25]],
	_4x1:[25,[0,20,239,74,25],[0,75,239,128,25],[0,129,239,182,25],[0,183,239,235,25]],
	_kp4x4:[25,[30,90,150,210],[50,110,170,230]],
	_ele:{"0":25,title:[0,236,239,279,25],ind:[80,7,160,12],indF:[0,0,239,19]},
	_bar:[20,[40,120,200,60,180,120],[235],[80,80,80,120,120,240],[90]],
	
	
	//_bar:[20,[0,191,80,279,30],[81,191,160,279,30],[161,191,239,279,30],[0,191,120,279,25],[121,191,239,279,25],[0,191,239,279,25],[0,236,239,279,25]],
	_main:[20,[0,20,120,70,27],[121,20,239,70,27],[0,20,239,70,27],[0,71,160,190,30],[0,71,239,235,60],[0,20,239,190,37],[0,20,239,235,60],[0,106,239,190,30],[0,71,239,190,80]],
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
        w.gfx.setFont("Vector",p[4]*UI.size.txt);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+5-(w.gfx.stringMetrics(txt1).height/2));  
        w.gfx.setFont("Vector",p[4]*UI.size.txt*0.27);	
		w.gfx.drawString(txt2,p[2]-w.gfx.stringWidth(txt2),y+(w.gfx.stringMetrics(txt2).height/2));
		if (!ew.def.bpp) w.gfx.flip();
		//coordinates
		if (UIc.get[loc])
			UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
		else w.gfx.flip();
	},
	c1l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
		"ram";
	  //draw
		let p=(UI.pos[no][po]);
		w.gfx.setFont("Vector",p[4]*UI.size.txt);	
		let x=p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/2);
		//if (!x0) this.x0=0;
		if (this.x0) {w.gfx.setColor(0,bclr);w.gfx.fillRect(this.x0,this.y0,this.x1,this.y1);}
		this.x0=x-(w.gfx.stringWidth(txt1)/2);
		this.x1=x+(w.gfx.stringWidth(txt1)/2);
		this.y0=y+4-(w.gfx.stringMetrics(txt1).height/2);
		this.y1=y+(w.gfx.stringMetrics(txt1).height/2);
		w.gfx.setColor(1,fclr);
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+5-(w.gfx.stringMetrics(txt1).height/2)); 
		w.gfx.flip();
	},
    c2l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
      "ram";
	  //draw
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		let szX= p[3]?p[3][(po-1)%len]/2:1<len? (p[1][1]-p[1][0])/2 : x/2;
		let szY= p[4]?p[4][((po-1)/len)|0]/2:(p[2][1]-p[2][0])/2;
//
		//let p=(UI.pos[no][po]);
		// let x=p[2]-((p[2]-p[0])/2);
		//let y=p[3]-((p[3]-p[1])/2);
		//w.gfx.setColor(0,bclr);
		// w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		//w.gfx.setColor(1,fclr);
	  if (bclr){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(x-szX,y-szX,x+szX,y+szX);
			//w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(0,bclr);
			//w.gfx.fillRect(p[0]+1,p[1]+1,p[2]-1,p[3]-1);
			w.gfx.fillRect(x-szX+1,y-szX+1,x+szX-1,y+szX-1);
	    }else {		
  			w.gfx.setColor(0,bclr);
			//w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.fillRect(x-szX,y-szX,x+szX,y+szX);
	    }
		w.gfx.setColor(1,fclr);
      if (txt2&&txt2!=""){
        //w.gfx.setFont("Vector", p[4]*0.7*UI.size.txt);
        w.gfx.setFont("Vector", p[0]*0.7*UI.size.txt);
//	    w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-w.gfx.stringMetrics(txt1).height-((p[3]-p[1])/10)); 
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-8-w.gfx.stringMetrics(txt1).height); 
        //w.gfx.setFont("Vector",p[4]*1.1*UI.size.txt);	
        w.gfx.setFont("Vector",p[0]*1.1*UI.size.txt);	
		w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+7*(2.00-UI.size.txt));
		//w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+7*(2.10-UI.size.txt));
		//w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height*(2.10-UI.size.txt));
      }else{  
        //w.gfx.setFont("Vector",p[4]*UI.size.txt);	
        w.gfx.setFont("Vector",p[0]*UI.size.txt);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+4-(w.gfx.stringMetrics(txt1).height/2)); 
      }
	  if (!ew.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}_${po}();`;	
		//UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
    },
    img:function(loc,no,po,img,txt,fclr,bclr,side,tran){
      "ram";
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		//
		let szX= p[3]?p[3][(po-1)%len]/2:1<len? (p[1][1]-p[1][0])/2 : x/2;
		let szY= p[4]?p[4][((po-1)/len)|0]/2:(p[2][1]-p[2][0])/2;
		//
		//let szX=p[1][(po-1)%len]  ? (x-p[1][(po-1)%len])/2 : x/2;
		//let szY=p[2][((po-1)/len)|0] ? (y-p[2][((po-1)/len)|0])/2 : (y-20)/2;	  
		//
		//let p=(UI.pos[no][po]);
		//let x=p[0]+((p[2]-p[0])/2);
		//let y=p[1]+((p[3]-p[1])/2);
      if (!tran){ 
		if (bclr){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(x-szX,y-szX,x+szX,y+szX);
			//w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX+1,y-szX+1,x+szX-1,y+szX-1);
			//w.gfx.fillRect(p[0]+2,p[1]+2,p[2]-2,p[3]-2);
	    }else {		
  			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX,y-szX,x+szX,y+szX);
			//w.gfx.fillRect(p[0],p[1],p[2],p[3]);
	    }
	  }
      w.gfx.setColor(1,fclr);	
	  if  (txt&&side){
		  //w.gfx.setFont("Vector",(p[3]-p[1])/2);
 		  w.gfx.setFont("Vector",p[0]*1.7*UI.size.txt);	
 		  //w.gfx.setFont("Vector",p[4]*1.7*UI.size.txt);	
		  let xa=x-((w.gfx.imageMetrics(img).width+w.gfx.stringWidth(txt))/2);
		  w.gfx.setColor(1,11);
	      w.gfx.drawImage(img,xa,y-(w.gfx.imageMetrics(img).height/2),{scale:UI.size.sca});
		 // w.gfx.setColor(1,bclr==3?0:3);
		 w.gfx.setColor(1,fclr);
		  w.gfx.drawString(txt,xa+5+w.gfx.imageMetrics(img).width,y-(w.gfx.stringMetrics(txt).height/2)+2); 
	  }else if (ew.def.txt&&txt) {
  		  w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca*0.75/2), y*(2-UI.size.txt)/15 ,{scale:0.75*UI.size.sca});
		  //w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca*0.75/2), p[1]+ ((p[3]-p[1]) *(2-UI.size.txt)/15)  ,{scale:0.75*UI.size.sca});
		  //w.gfx.setColor(1,bclr==3?0:14);
		  w.gfx.setColor(1,fclr);
			//w.gfx.setFont("Vector",p[4]*0.5*UI.size.txt);	
			w.gfx.setFont("Vector",p[0]*(no=="_2x3"?0.85:1)*UI.size.txt);	
			//w.gfx.setFont("Vector",p[4]*(no=="_2x3"?0.85:1)*UI.size.txt);	
		  w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+( (szY)*(2-UI.size.txt)/6 )); 
		  //w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+( (p[3]-p[1])*(2-UI.size.txt)/6 )); 
	  }else w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca/2),y-(w.gfx.imageMetrics(img).height*UI.size.sca/2),{scale:UI.size.sca});
	  img=0;
	  if (!ew.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}_${po}();`;	
		//UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
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
				w.gfx.setFont("Vector",UI.size._txt/2);	
				w.gfx.drawString("<<",p[0]+7,y-((p[3]-p[1])/4));
				w.gfx.drawString(">>",p[2]+-5-w.gfx.stringWidth(">>"),y-((p[3]-p[1])/4));
				if (rst) {
					w.gfx.flip();
					UIc.raw.bar=`if (x<120&&${p[1]}<y&&y<${p[3]}) UIc.bar._sel_left(); else if (120<x&&${p[1]}<y&&y<${p[3]}) UIc.bar._sel_right();`;
					UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));	
				}
			}
		}
		UI.ntid=setTimeout(function(t){UI.ntid=0;/*UI.emit('ntfy',"ok");*/if (TC.tid&&ew.def.touchtype!="716") {clearTimeout(TC.tid);TC.tid=0;} ew.temp.bar=0; if (face[0].exe) face[0].exe();face[0].exe=0;if (face[0].bar) face[0].bar();  },tmot?tmot*1000:1000);
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
        if (!ew.def.bpp) w.gfx.flip();
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
        if (!ew.def.bpp) w.gfx.flip();
	},
	fill:function(no,po,clr){
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][po%len];
		let y=p[2][(po/len)|0];
		let szX= p[3]?p[3][(po-1)%len]/2:1<len? (p[1][1]-p[1][0])/2 : x/2;
		let szY= p[4]?p[4][((po-1)/len)|0]/2:(p[2][1]-p[2][0])/2;
	  
		w.gfx.setColor(0,0);
		w.gfx.fillRect(x-szX,y-szX,x+szX,y+szX);
		
		//let p=(UI.pos[no][po]);
		//w.gfx.setColor(0,clr);
		//w.gfx.fillRect(p[0],p[1],p[2],p[3]);
        if (!ew.def.bpp) w.gfx.flip();
	},
	keypad:function(no,po,sz,clr){
		let len=(UI.pos[no][1].length);
		let x=(UI.pos[no][1][po%len]);
		let y=(UI.pos[no][2][(po/len)|0]);
		w.gfx.setColor(0,clr);
		w.gfx.fillRect(x-sz,y-sz,x+sz,y+sz);
        if (!ew.def.bpp) w.gfx.flip();
	},
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
		if (!ew.def.bpp) w.gfx.flip();
	}
  }
  
};
if ( process.env.BOARD=="BANGLEJS2"){
 UI.size={_2x2:20,_2x1:25,_txt:24,_sideSmall:20,sideBig:45,underSmall:20,txt:0.9,len:1,sca:0.75};

 UI.pos={
	_fold:[12,[0,7,116,63,20],[117,7,178,63,20],[0,64,90,178,20],[90,64,178,179,20]], 
	_2x2:[35,[0,7,89,75,25],[90,7,178,75,25],[0,76,89,145,25],[90,76,175,145,25]],
	_2x3:[27,[0,7,58,63,27],[59,7,116,63,27],[117,7,175,63,27],[0,64,58,116,27],[59,64,116,116,27],[117,64,175,116,27]],
	_2x1:[25,[0,7,175,74,26],[0,75,175,145,26]],
	_ele:{"0":25,title:[0,146,178,178,22],ind:[60,2,115,4],indF:[0,0,175,6]},
	_bar:[20,[0,117,58,175,22],[59,117,116,175,22],[117,117,175,175,22],[0,117,89,175,22],[90,117,175,175,22],[0,117,175,175,21],[0,146,175,175,20]],
	_main:[20,[0,7,89,50,20],[90,7,178,50,20],[0,7,178,50,20],[0,51,178,145,20],[0,51,178,145,55],[0,7,178,116,35],[0,7,178,145,45],[0,93,178,145,20],[0,51,178,116,70]],
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

