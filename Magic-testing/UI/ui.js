UI={
  pos:{
	_2x2:[0,[3,0,119,97],[122,0,236,97],[3,100,119,195],[122,100,236,195]],
	_2x3:[0,[0,0,75,75],[80,0,155,75],[160,0,239,75],[0,80,75,155],[80,80,155,155],[160,80,239,155]],
	_4x2:[0,[0,0,119,97]],
	_4x1:[],
	_3x2:[],
	_3x1:[]
  },
  btn:{
    c2l:(no,po,txt1,txt2,fclr,bclr)=>{
      "ram";
      let p=(UI.pos[no][po]);
      let x=4+p[2]-((p[2]-p[0])/2);
      let y=p[3]-((p[3]-p[1])/1.5);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(1,fclr);
      if (txt2){
        w.gfx.setFont("Vector",(p[3]-p[1])/5);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/5)); 
        w.gfx.setFont("Vector",(p[3]-p[1])/2.5);	
        w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),y+((p[3]-p[1])/5));
      }else{  
        w.gfx.setFont("Vector",(p[3]-p[1])/3.5);	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y); 
      }
      w.gfx.flip();
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
      w.gfx.flip();
	},
    img:(no,po,Img,fclr,bclr)=>{
      "ram";
      let p=(UI.pos[no][po]);
      let x=p[0]+((p[2]-p[0])/4.5);
      let y=p[1]+((p[3]-p[1])/4.5);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(1,fclr);		
	  w.gfx.drawImage(Img,x,y);
	  Img=-1;
	  w.gfx.flip();
	},
    
  }  
};
UI.ele={
	
	btm:()=>{
		
		
	},
	top:()=>{
		
		
	},
	glbl:()=>{
		
		
	},
	dash:()=>{
		
		
	}
};

UI.ntfy={
	
	btm:()=>{
		
		
	},
	top:()=>{
		
		
	},
	glbl:()=>{
		
		
	},
	dash:()=>{
		
		
	}
};
	




