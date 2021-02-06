//settings face
face[5] = {
  offms: 5000,
  g:w.gfx,
  init: function(){
    this.g.setColor(1,col("gray"));
    this.g.fillRect(0,0,115,75); //left up
    this.g.fillRect(0,80,115,155); //left mid
    this.g.fillRect(0,160,115,239); //left dn
    this.g.fillRect(120,0,239,239); //right-riding mode      
    this.g.setColor(0,col("black"));
    this.g.setFont("Vector",24);
	this.g.drawString("RING",58-(this.g.stringWidth("RING")/2),9); 
	this.g.drawString("LIGHT",58-(this.g.stringWidth("LIGHT")/2),41); 
	this.g.drawString("TRIP",58-(this.g.stringWidth("TRIP")/2),170); 
	this.g.drawString("RESET",58-(this.g.stringWidth("RESET")/2),202); 
	//rdmd
 	this.g.drawString("IS",180-(this.g.stringWidth("IS")/2),105);
    this.g.setFont("Vector",35);
    this.g.drawString("EUC",180-(this.g.stringWidth("EUC")/2),60); 
	this.g.drawString("OFF",180-(this.g.stringWidth("OFF")/2),140);
	this.g.flip();
    this.rdmd=-1;
    this.alck=-1;
	this.run=true;
  },
  show : function(){
    if (!this.run) return; 
//autolock
    if (euc.alck != this.alck) {
	  this.alck=euc.alck;
      if (this.alck==1) this.g.setColor(1,col("blue"));
      else this.g.setColor(1,col("gray"));
      this.g.fillRect(0,80,115,155); //left mid
      this.g.setColor(0,col("black"));
 	  this.g.setFont("Vector",24);
      this.g.drawString("AUTO",58-(this.g.stringWidth("AUTO")/2),90);
      this.g.drawString("LOCK",58-(this.g.stringWidth("LOCK")/2),122);
      this.g.flip();
    }
//ride mode    
    if (euc.conn=="READY") {  
	if (euc.rdmd != this.rdmd) {
	  this.rdmd=euc.rdmd;	
      this.g.setColor(1,col("lblue"));
      this.g.fillRect(120,0,239,239); //right-riding mode     
      this.g.setColor(0,col("black"));
      this.g.setFont("Vector",88);
      this.g.drawString(euc.rdmd,180-(this.g.stringWidth(euc.rdmd)/2),73);  
      this.g.setFont("Vector",35);
      if (9>euc.rdmd) {
      this.g.drawString(euc.rdmd+1,180-(this.g.stringWidth(euc.rdmd+1)/2),32);  
      }
      if (euc.rdmd>0) {
      this.g.drawString(euc.rdmd-1,180-(this.g.stringWidth(euc.rdmd-1)/2),166); 
      }
      this.g.setFont("Vector",20);
      if (8>euc.rdmd) {
      this.g.drawString(euc.rdmd+2,180-(this.g.stringWidth(euc.rdmd+2)/2),7); 
      }
      if (euc.rdmd>1) {
      this.g.drawString(euc.rdmd-2,180-(this.g.stringWidth(euc.rdmd-2)/2),208); 
      }
      this.g.flip();
    }
    }
//loop
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show();
    },100,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    this.g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(){
    this.g.off();
    this.clear();
  }
};