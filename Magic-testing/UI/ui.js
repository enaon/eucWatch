global.UI={};
UI.g=w.gfx;
UI.btn={
	
	_4x1:(pos,txt,size,clr)=>{
		"ram";
		let p=[
		this.g.setColor(0,clr);
		this.g.fillRect(rx1,ry1,rx2,ry2);
		this.g.setColor(1,col("white"));

	},
	_4x2:(pos,txt,size,clr)=>{
		
		
	},
	_4x3:(pos,txt,size,clr)=>{
		
		
	},
	free:{pos.txt,size,clr}=>{
		
		
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
	

	    btn: function(txt,size,x,y,clr,rx1,ry1,rx2,ry2,txt1,size1,x1,y1){
			this.g.setColor(0,clr);
			this.g.fillRect(rx1,ry1,rx2,ry2);
			this.g.setColor(1,col("white"));
			this.g.setFont("Vector",size);	
            this.g.drawString(txt,x-(this.g.stringWidth(txt)/2),y); 
   			if (txt1){
            this.g.setFont("Vector",size1);	
            this.g.drawString(txt1,x1-(this.g.stringWidth(txt1)/2),y1);
            }
			this.g.flip();
    },



