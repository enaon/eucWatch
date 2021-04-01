var g=o.gfx;
var clockFace = {
  offms: 3000,
  show : function(o){
    if (!this.run) return;
    var g=o.gfx;g.clear();
    var d=(Date()).toString().split(' ');
    var t=(d[4]).toString().split(':');
    function central(text, y) {
       g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
    }
       
    g.setFontVector(23);
    central(t[0],26);
    central(t[1],67);
    g.setFont8x16();
    central(".  .",49);
    central(this.v,2); 
    g.setFont7x11Numeric7Seg();
    central(d[2],100);
    g.setFontDylex7x13();
    central(d[0],118);
	g.drawRect(0, 0, 29, 17);
    g.drawRect(30, 4, 31, 12);
    o.flip();o.on();

    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },1000-Date().getMilliseconds(),this,o);
  },
  tid:-1,
  run:false,
  init: function(){
	this.v=(w.battVoltage()*100-365)*2|0;
    if (this.v>=100) this.v=100;
    this.run=true;
  },
  exit: function(o){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(o){
    this.exit(o);
  }
};

var nb_Main = {
  offms: 10000, //10 sec timeout
  show : function(o){
    var g=o.gfx;g.clear();
    var nb_m=(ninebot_185/100).toFixed(2);
    var nb_trip=((ninebot_185+ninebot_trip)/100).toFixed(2);
    if (ninebot_38>0) nb_s=(ninebot_38/1000).toFixed(1).toString().split('.');
    else if (nb_conn!=3) nb_s=["-","0"]; 
   	if (ninebot_lock && nb_conn!=3) nb_s=["L","-"]; 
    function central(text, y) {
       g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
    }
  
    if (nb_conn==1) {
      g.setFontVector(23);
      central(nb_s[0], 23); //speed 1
      if  (nb_a<=0){
      var nb_a_tmp=-nb_a;
      g.fillRect(0,70,31,91);
      o.gfx.setColor(0);
      g.setFontVector(19);central(nb_a_tmp, 71);
      o.gfx.setColor(1);
      } else if (nb_a<10) {g.setFontVector(19);central(nb_a, 71);} //amp
      else  {g.setFontVector(18); central(nb_a|0, 71);}//amp
      g.setFont7x11Numeric7Seg();
      central(ninebot_62/10, 55); //temp
	  g.drawCircle(29, 55, 2);
    } else if (nb_conn==3) {
      //nb_s=["SCAN"];
      g.setFontVector(12);
	  if (nb_s[0]=="LOST") g.setFontVector(11);
      central(nb_s[0], 40); //speed-state
      if (ninebot_lock) {central("L", 62);} //speed-state
    }  else if (nb_conn==2)  {
      nb_s=["Wait"];
      g.setFontVector(12);
      central(nb_s[0], 40); //speed-state      
    }  else if (nb_conn==0)  {
      nb_s=["OFF"];
      g.setFontVector(12);
      central(nb_s[0], 40); //speed-state 
      g.setFontVector(16);
      if (ninebot_lock) {central("L", 62);} //speed-state	  
    }   else if (nb_conn==4)  {
      nb_s=["ON"];
      g.setFontVector(16);
      central(nb_s[0], 40); //speed-state
    }
//    g.setFont8x16();
    //g.setFontVector(15);
     g.setFont("Teletext10x18Ascii",1);
    central((((ninebot_71/100)-51.5)*10|0), 0); //fixed bat
    g.drawLine(4,18,26,18);
    g.setFont7x11Numeric7Seg();
    central(nb_m, 97); //mileage
    central(nb_trip, 117); //mileage total
    g.drawLine(0,92,31,92);
    g.drawLine(0,112,31,112);
	
    o.flip();
     // schedule refresh 
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },100,this,o);

  },
  
  exit: function(o){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },

  off: function(o){
    this.exit(o);
  }, 
  init: function(){
 //   this.page=0;
	o.on();
    
  }
};

var nb_Info = {
  offms: 30000, //30 sec timeout
  show : function(o){
    var g=o.gfx;g.clear();
    if (ninebot_38>0) nb_s=(ninebot_38/1000).toFixed(1).toString().split('.');
    else if (nb_conn!=3) nb_s=["-","0"]; 
   	if (ninebot_lock && nb_conn!=3) nb_s=["L","-"]; 
    function central(text, y) {
       g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
    }

    if (nb_conn==1) {
      g.setFontVector(23);
      central(nb_s[0], 25); //speed 1
//      g.setFontVector(16);
      g.setFont("Teletext10x18Ascii",1);
       central(nb_s[1], 57); //speed 1
    }  else if (nb_conn==0)  {
      nb_s=["OFF"];
      g.setFontVector(12);
      central(nb_s[0], 30); //speed-state  
      if (ninebot_lock) {g.setFontVector(16);central("L", 53);} //speed-state	
    } else if (nb_conn==3) {
      //nb_s=["SCAN"];
      g.setFontVector(10);
      central(nb_s[0], 30); //speed-state
    }  else if (nb_conn==2)  {
      nb_s=["Wait"];
      g.setFontVector(12);
      central(nb_s[0], 30); //speed-state        
    }   else if (nb_conn==4)  {
      nb_s=["ON"];
      g.setFontVector(12);
      central(nb_s[0], 37); //speed-state
    }
	
      if  (nb_a<=0){
        var nb_a_tmp=-nb_a;
        g.fillRect(0,80,31,104);
        o.gfx.setColor(0);
        g.setFontVector(19);central(nb_a_tmp, 82);
        o.gfx.setColor(1);
      } else if (nb_a<10) {g.setFontVector(19);central(nb_a, 82);} //amp
      else  {g.setFontVector(23); central(nb_a|0, 79);}//amp
//      g.setFontVector(13);
      g.setFont("Teletext10x18Ascii",1);
      central(ninebot_62, 114); //temp
      g.drawString(".",15,114);
//      g.setFontVector(15);
//      g.setFont("Teletext10x18Ascii",1);
      central((((ninebot_71/100)-51.5)*10|0), 0); //fixed bat
    g.drawLine(0,20,31,20);
    g.drawLine(0,79,31,79);
    g.drawLine(0,105,31,105);
	
    o.flip();o.on();
     // schedule refresh 
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },100,this,o);

  },
  
  exit: function(o){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },

  off: function(o){
    this.exit(o);
  }, 
  init: function(){
    this.page=0;
  }
};

var nb_Info2 = {
  offms: 10000, //10 sec timeout
  show : function(o){
    var g=o.gfx;g.clear();

    function central(text, y) {
       g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
    }


      g.setFont("Teletext10x18Ascii",1);
//      central((ninebot_37/100).toFixed(1), 25); //speed 1
      central(ninebot_37/100|0, 25); //remaining mileage
      //g.setFont("7x11Numeric7Seg",1);

      central((ninebot_182/1000), 50); //average speed
      central("105", 80); //average speed

	  g.drawLine(0,20,31,20);
	  g.drawLine(0,79,31,79);
	  g.drawLine(0,105,31,105);
	
    o.flip();o.on();
     // schedule refresh 
    this.tid=setTimeout(function(t,o){
      t.tid=-1;
      t.show(o);
    },1000,this,o);

  },
  
  exit: function(o){
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },

  off: function(o){
    this.exit(o);
  }, 
  init: function(){
    this.page=0;
  }
};
