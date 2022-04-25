//test TP
face[0] = { 
  offms: 300000, 
  g:w.gfx, 
  init: function(o){ 
	if (set.TP) { 
		this.msg="TAP TO START\n\nTP TEST";
	} else this.msg="TP IS NOT\n\n816 TYPE";
   	this.g.clear();
    this.g.setColor(0,1);	
	this.g.fillRect(0,0,239,239);
    this.g.setColor(1,14);
    this.g.setFont("Vector",22);
    this.g.drawString(this.msg,120-(this.g.stringWidth(this.msg)/2),100);
    this.g.flip();
	this.out="";
	//this.run=true;
  },
  show : function(o){
    if (!this.run) return;
    if (this.btn!==this.last_btn){
      this.last_btn=this.btn;
      this.msg=(this.btn)?"Hello":"World";
      hello=this.msg;
      this.g.setColor(0,1);
      this.g.fillRect(30,10,210,100);
      this.g.setColor(1,14);
      this.g.setFont("Vector",50);
      this.g.drawString(this.msg,120-(this.g.stringWidth(this.msg)/2),35);    
      this.g.flip();
    }
    this.tid=setTimeout(function(t){ //the face's screen refresh rate. 
      t.tid=-1;
      t.show(o);
    },50,this);
  },
  x3:[[0,40,80],[80,120,160],[160,200,240]],
  y3:[[0,40,80],[80,120,160],[160,200,240]],
  btn: function(x,y,txt){ 
   	//this.g.clear();
    this.g.setColor(0,0);	
	this.g.fillRect(0,0,239,239);
	this.g.flip();
    this.g.setColor(0,4);
	this.g.fillRect(x[0],y[0],x[2],y[2]);
    this.g.setColor(1,14);
    this.g.setFont("Vector",22);
	if (!txt) txt="TAP";
    this.g.drawString(txt,x[1]-(this.g.stringWidth(txt)/2),y[1]-5);
    this.g.flip();
	//this.run=true;
  },
  
  tid:-1,
  run:false,
  clear : function(){ //enter here everything needed to clear all app running function on face exit. 
    //this.g.clear(); //as above
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid); //clears main face[0] timeout loop.
    this.tid=-1;
    return true;
  },
  off: function(){
    this.g.off();
    this.clear();
  }
};

//Redirection face, is used when time expires or the side button is pressed on page[0].
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
	reset();
  },
   clear: function(){
   return true;
  },
   off: function(){
   this.clear();
  }
};	
set.def.acc=0;
set.accR();
//touch
if (set.TP) clearWatch(set.TP); 
set.TP=setWatch(function(s){
	i2c.writeTo(0x15,0);
	touchHandler[0](i2c.readFrom(0x15,7));
},D28,{repeat:true, edge:"rising"}); 

touchHandler[0]=function(tp){ 
	let x3=[[0,40,80],[80,120,160],[160,200,240]];
	let y3=[[0,40,80],[80,120,160],[160,200,240]];
	if (!face[0].step) face[0].step=0;
	let x=x3[(face[0].step)%3];
	let y=y3[((face[0].step)/3)|0];
	if (face[0].step<9){
		buzzer([30,50,30]);
		face[0].btn(x,y);
	}else{	
		w.gfx.setColor(0,0);	
		w.gfx.fillRect(0,0,239,239);
		if (12<face[0].step){
			buzzer(40);
			w.gfx.setColor(1,14);
			w.gfx.setFont("Vector",20);
			let txt="        DONE\n\n  PRESS SIDE BTN\n\n      TO EXIT";
			w.gfx.drawString(txt,120-(w.gfx.stringWidth(txt)/2),25);
			w.gfx.flip();		
			w.gfx.setColor(0,1);	
			w.gfx.fillRect(0,160,239,239);			
			w.gfx.setColor(1,14);
			w.gfx.setFont("Vector",18);
			txt="TAP FOR:";
			w.gfx.drawString(txt,120-(w.gfx.stringWidth(txt)/2),180);
			w.gfx.setFont("Vector",20);
			txt="RESULTS";
			w.gfx.drawString(txt,120-(w.gfx.stringWidth(txt)/2),210);
		}else {
			buzzer([30,50,30]);
			w.gfx.flip();
			w.gfx.setColor(0,4);
			w.gfx.fillRect(40,40,200,200);
			w.gfx.setColor(1,14);
			w.gfx.setFont("Vector",16);
 			w.gfx.drawString("SWIPE",120-(w.gfx.stringWidth("SWIPE")/2),60);	
			w.gfx.setColor(1,15);
			w.gfx.setFont("Vector",24);
 			swipe={9:"DOWN",10:"UP",11:"LEFT\n\n<-",12:" RIGHT\n\n     ->"};
			w.gfx.drawString(swipe[face[0].step],120-(w.gfx.stringWidth(swipe[face[0].step])/2),110);
		}
		w.gfx.flip();		
	}
	if (0<face[0].step&&face[0].step<14) {
		//print(face[0].step,tp);
		face[0].out=face[0].out+face[0].step+": "+E.toJS(tp)+"\n";
	}else if (160<tp[6] && 13<face[0].step ){
		w.gfx.setColor(0,0);	
		w.gfx.fillRect(0,0,239,239);
		w.gfx.setColor(1,14);
		w.gfx.setFont("Vector",18);
		let txt=face[0].out;
		w.gfx.drawString(txt,120-(w.gfx.stringWidth(txt)/2),5);
		w.gfx.flip();		
		//print(face[0].out);

	}
	face[0].step++;

};
