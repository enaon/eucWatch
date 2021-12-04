UI={
  pos:{
 	_2x2:[3.3,[0,40,120,140],[120,40,240,140],[0,140,120,240],[120,140,240,240]],
	//_2x2:[3.3,[3,0,119,97],[122,0,236,97],[3,100,119,195],[122,100,236,195]],
	//_2x3:[4.5,[0,0,80,80],[80,0,160,80],[160,0,239,80],[0,80,80,160],[80,80,160,160],[160,80,239,160]],
	_2x3:[4.5,[0,20,80,100],[80,20,160,100],[160,20,239,100],[0,100,80,180],[80,100,160,180],[160,100,239,180]],
	_4x2:[0,[0,0,119,97]],
	_2x1:[4,[0,40,239,137],[0,140,239,235]],
	//_2x1:[4,[0,0,239,96],[0,99,239,195]],
	_ele:{top:[0,0,239,40],dnS:[0,200,239,240],btm:[0,240,239,279],btmL:[0,200,239,279],ind:[75,265,165,270]},
	//_ele:{top:[0,0,239,37],btm:[0,240,239,279]},
	_head:2,
	_foot:255,
  },
  btn:{
    c2l:(no,po,txt1,txt2,fclr,bclr)=>{
      "ram";
      let p=(UI.pos[no][po]);
      let x=4+p[2]-((p[2]-p[0])/2);
      let y=p[3]-((p[3]-p[1])/1.5);
	  w.gfx.setColor(0,0);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0]+3,p[1]+3,p[2]-3,p[3]-3);
      w.gfx.setColor(1,fclr);
      if (txt2&&txt2!=""){
        w.gfx.setFont("Vector",(p[3]-p[1])/5);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/5)); 
        w.gfx.setFont("Vector",(p[3]-p[1])/3.5);	
        w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+((p[3]-p[1])/5));
      }else{  
        w.gfx.setFont("Vector",(p[3]-p[1])/3.5);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y); 
      }
      if (!set.def.bpp) w.gfx.flip();
    },
    rows:(no,po,txt1,size1,txt2,size2,fclr,bclr)=>{
      "ram";
      let p=(UI.pos[no][po]);
      let x=p[2]-((p[2]-p[0])/2);
      let y=p[3]-((p[3]-p[1])/2);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(1,fclr);
      if (txt2){
        w.gfx.setFont("Vector",size1);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-10); 
        w.gfx.setFont("Vector",size2);	
        w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+10);
      }else{  
        w.gfx.setFont("Vector",size1);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y); 
      }
      if (!set.def.bpp) w.gfx.flip();
	},
    img:(no,po,Img,fclr,bclr)=>{
      "ram";
      let p=(UI.pos[no][po]);
      let x=p[0]+((p[2]-p[0])/UI.pos[no][0]);
      let y=p[1]+((p[3]-p[1])/UI.pos[no][0]);
	  w.gfx.setColor(0,0);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0]+3,p[1]+3,p[2]-3,p[3]-3);
      w.gfx.setColor(1,fclr);		
	  w.gfx.drawImage(Img,x,y);
	  Img=-1;
      if (!set.def.bpp) w.gfx.flip();
	},
    
  }  
};
UI.ele={
	title:(po,txt,fclr,bclr)=>{
		"ram";
		let p=(UI.pos._ele[po]);
		let x=4+p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/1.5);
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);	
    w.gfx.setFont("Vector",(p[3]-p[1])/1.7);	
		w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y-2); 
        if (!set.def.bpp) w.gfx.flip();
	},
	ind:(c,t)=>{
		"ram";
		let p=(UI.pos._ele.ind);
		w.gfx.setColor(0,2);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		let pa=(p[2]-p[0])/t;
		w.gfx.setColor(1,15);	
		w.gfx.fillRect(p[0]+(pa*(c-1)),p[1],p[0]+(pa*c),p[3]);
        if (!set.def.bpp) w.gfx.flip();
	}
};

UI.ntfy={
	simple:(po,txt1,txt2,fclr,bclr,tmot)=>{
			UI.removeAllListeners("ntfy");
			let p=(UI.pos._ele[po]);
			let x=4+p[2]-((p[2]-p[0])/2);
			let y=p[3]-((p[3]-p[1])/1.5);			
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(1,fclr);
			w.gfx.setFont("Vector",(p[3]-p[1])/1.7);	
			w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y); 
			if (!set.def.bpp) w.gfx.flip();
			if (UI.ntid) clearTimeout(UI.ntid);
			UI.ntid=setTimeout(function(t){UI.ntid=0;UI.emit('ntfy',"ok");},tmot?tmot:1000);
	},
};
	




