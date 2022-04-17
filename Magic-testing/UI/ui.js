UI={
  size:{_2x2:20,_2x1:25,_txt:26,_sideSmall:20,sideBig:45,underSmall:20,txt:0.8,len:1,sca:1},
  pos:{ //raw X colomn
	_fold:[20,[80,160],[62],[160,160],[88]],
	_2x1:[28,[120],[80,200],[240],[120,120]],
 	_2x2:[27,[60,180],[80,200],[120,120],[120,120]],
	_2x3:[30,[40,120,200],[65,155],[80,80,80],[90,90] ],
	_3x1:[25,[120],[40,120,200]],
	_4x1:[24,[120],[50,110,170,230],[240],[60,60,60,60]],
	_kp4x4:[28,[30,90,150,210],[50,110,170,230]],
	_kp4x3:[35,[40,120,200],[50,110,170,230],[80,80,80],[60,60,60,60]],
	_ele:{"0":25,title:[0,260,239,279,19],ind:[80,7,160,12],indF:[0,0,239,19]},
	_bar:[25,[40,120,200,60,180,120],[240],[80,80,80,120,120,240],[80]],
	_1x2:[25,[120],[80,200],[240],[120,120]],
	_main:[25,[60,180,120],[45,135,110,140],[120,120,240],[50,130,180,240]],
	_lcd:[110,[120],[135,110,140],[240],[130,180,240]],
	_top:20,
	_head:2,
	_foot:255,
  },
  btn:{
    size:{_xs:28,_s:22,_m:28,_l:35,_xl:45,txt:1,len:1},
	c3l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
		"ram";
	  //draw
		let p=(UI.pos[no]);
		let ln=p[1].length;
		let x=p[1][(po-1)%ln];
		let y=p[2][((po-1)/ln)|0];
		let szX= p[3][(po-1)%ln]/2;
		let szY= p[4][((po-1)/ln)|0]/2;
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
		w.gfx.setColor(1,fclr);
        w.gfx.setFont("Vector",p[0]*UI.size.txt);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+5-(w.gfx.stringMetrics(txt1).height/2));  
        w.gfx.setFont("Vector",p[0]*UI.size.txt*0.2);	
		w.gfx.drawString(txt2,x+szX-w.gfx.stringWidth(txt2),y+(w.gfx.stringMetrics(txt2).height/2));
		if (!set.def.bpp) w.gfx.flip();
		//coordinates
		if (UIc.get[loc])
			//UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}_${po}();`;	
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}(${po});`;	

		else w.gfx.flip();
	},
	c1l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
		"ram";
	  //draw
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;	
		w.gfx.setFont("Vector",p[0]*UI.size.txt);	
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
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;	
	  if (bclr){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX+1,y-szY+1,x+szX-1,y+szY-1);
	    }else {		
  			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
	    }
		w.gfx.setColor(1,fclr);
      if (txt2&&txt2!=""){
        w.gfx.setFont("Vector", p[0]*0.7*UI.size.txt);
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-8-w.gfx.stringMetrics(txt1).height); 
        w.gfx.setFont("Vector",p[0]*1.1*UI.size.txt);	
		w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+7*(2.00-UI.size.txt));
      }else{  
        w.gfx.setFont("Vector",p[0]*UI.size.txt);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y+4-(w.gfx.stringMetrics(txt1).height/2)); 
      }
	  if (!set.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
		//UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}_${po}();`;	
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}(${po});`;	

	  else w.gfx.flip();
    },
    img:function(loc,no,po,img,txt,fclr,bclr,side,tran){
      "ram";
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;	
      if (!tran){ 
		if (bclr){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX+1,y-szY+1,x+szX-1,y+szY-1);
	    }else {		
  			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
	    }
	  }
      w.gfx.setColor(1,fclr);	
	  if  (txt&&side){
 		  w.gfx.setFont("Vector",p[0]*1.7*UI.size.txt);	
		  let xa=x-((w.gfx.imageMetrics(img).width+w.gfx.stringWidth(txt))/2);
		  w.gfx.setColor(1,14);
	      w.gfx.drawImage(img,xa,y-(w.gfx.imageMetrics(img).height/2),{scale:UI.size.sca});
		 w.gfx.setColor(1,fclr);
		  w.gfx.drawString(txt,xa+5+w.gfx.imageMetrics(img).width,y-(w.gfx.stringMetrics(txt).height/2)+2); 
	  }else if (set.def.txt&&txt) {
		  w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca*0.75/2), (y-szY)+ ((szY*2) *(2-UI.size.txt)/15)  ,{scale:0.75*UI.size.sca});
		  w.gfx.setColor(1,fclr);
			w.gfx.setFont("Vector",p[0]*(no=="_2x3"?0.85:1)*UI.size.txt);	
		  w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+( (szY*2)*(2-UI.size.txt)/6 )); 
	  }else w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width*UI.size.sca/2),y-(w.gfx.imageMetrics(img).height*UI.size.sca/2),{scale:UI.size.sca});
	  img=0;
	  if (!set.def.bpp) w.gfx.flip();
	  //coordinates
	  if (UIc.get[loc])
	  	UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}(${po});`;	
		//UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
	}, 
	ntfy:function(rst,tmot,ignr,no,po,txt1,txt2,fclr,bclr,sel){
		"ram";
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
		if (rst&&!sel) UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+'},0);'));	
		if (!ignr){
			let p=(UI.pos[no]);
			let len=p[1].length;
			let x=p[1][(po-1)%len];
			let y=p[2][((po-1)/len)|0];
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;		
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
			w.gfx.setColor(1,fclr);
			if (txt1) {
				w.gfx.setFont("Vector",p[0]*UI.size.txt);	
				w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((szY*2)/(3/UI.size.txt ))); 
			}
			if (txt2) 	{
				w.gfx.setFont("Vector",p[0]*1.05*UI.size.txt);	
				w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+szY-w.gfx.stringMetrics(txt2).height-( (szY)/10)*UI.size.txt);
			}
			if (sel) {
				w.gfx.setFont("Vector",UI.size._txt/2);	
				w.gfx.drawString("<<",0+7,y-(szY/4));
				w.gfx.drawString(">>",240+-5-w.gfx.stringWidth(">>"),y-(szY/2));
				if (rst) {
					w.gfx.flip();
					UIc.raw.bar=`if (x<120&&${y}-${szY}<y&&y<${y}+${szY}) UIc.bar._sel_left(); else if (120<x&&${y}-${szY}<y&&y<${y}+${szY}) UIc.bar._sel_right();`;
					UIc.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.raw.main+UIc.raw.bar+'},0);'));	
				}
			}
		}
		UI.ntid=setTimeout(function(t){UI.ntid=0;/*UI.emit('ntfy',"ok");*/if (TC.tid&&set.def.touchtype!="716") {clearTimeout(TC.tid);TC.tid=0;} set.bar=0; if (face[0].exe) face[0].exe();face[0].exe=0;if (face[0].bar) face[0].bar();  },tmot?tmot*1000:1000);
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
		"ram";
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;	
		w.gfx.setColor(0,clr);
		w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
        if (!set.def.bpp) w.gfx.flip();
	},
	keypad:function(no,po,clr){
		let p=(UI.pos[no]);
	  	let len=p[1].length;
		let x=p[1][(po-1)%len];
		let y=p[2][((po-1)/len)|0];
		let szX= p[3][(po-1)%len]/2;
		let szY= p[4][((po-1)/len)|0]/2;	
		w.gfx.setColor(0,clr);
		w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
        if (!set.def.bpp) w.gfx.flip();
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
		let p=(UI.pos[no]);
		let ln=p[1].length;
		let x=p[1][(po-1)%ln];
		let y=p[2][((po-1)/ln)|0];
		let szX= p[3][(po-1)%ln]/2;
		let szY= p[4][((po-1)/ln)|0]/2;	
		w.gfx.setColor(0,bclr);
		txt=this.wrap(txt,len*UI.size.len);
		if (!tran) 	w.gfx.fillRect(x-szX,y-szY,x+szX,y+szY);
		w.gfx.setColor(1,fclr);	
		w.gfx.setFont("Vector",UI.size._txt*UI.size.txt);	
		//w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y-szY+((szY*2)/10)); 
		w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y-szY); 

		if (!set.def.bpp) w.gfx.flip();
	}
  }
  
};
if ( process.env.BOARD=="BANGLEJS2"){
 UI.size={_2x2:20,_2x1:25,_txt:19,_sideSmall:20,sideBig:45,underSmall:20,txt:0.9,len:1,sca:0.75};

 UI.pos={
	_fold:[12,[60,120],[45],[120,120],[80]],
	_2x1:[25,[90],[80,200],[180],[80,80]],
 	_2x2:[22,[45,135],[45,122],[90,90],[78,78]],
	_2x3:[24,[30,90,150],[35,95],[60,60,60],[60,60] ],
	_3x1:[25,[90],[40,120,200]],
	_4x1:[24,[90],[50,110,170,230],[240],[60,60,60,60]],
	_kp4x3:[25,[30,90,150],[20,60,100,140],[60,60,60],[40,40,40,40]],
	_ele:{"0":25,title:[0,160,180,180,19],ind:[60,1,120,4],indF:[0,0,180,5]},
	_bar:[20,[30,90,150,45,135,90],[152],[60,60,60,90,90,180],[55]],
	_1x2:[25,[90],[80,135],[180],[80,80]],
	_main:[25,[35,135,90],[45,135,110,87],[90,90,180],[60,90,135,165]],
	_lcd:[110,[90],[135,110,140],[240],[95,180,240]],
	_top:20,
	_head:2,
	_foot:255,
	 /*
	 
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
	*/
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

