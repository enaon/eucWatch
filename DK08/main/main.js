//clock
face[0] = {
  offms: 5000,
  init: function(){
    this.run=true;
	this.refRate=500;
  },
  show : function(){
    if (!this.run) return;
 	var lastmin=-1;
	var volts;
	var d=Date();
	volts= volts ? (volts+battVolts())/2:battVolts(); // average until shown
	if (d.getMinutes()==lastmin) return;
	d=d.toString().split(' ');
	var min=d[4].substr(3,2);
	var sec=d[4].substr(-2);
	var tm=d[4].substring(0,5);
	var hr=d[4].substr(0,2);
	lastmin=min;
	g.clear();
	var w=g.getWidth();
	g.setColor(15);
	g.setFont("8x16",1);
	var batt=battInfo(volts);volts=0;// clear average
	g.drawString(batt,w-g.stringWidth(batt)-2,0);
	//var tm=hr+" "+min;
/*
	g.drawString(hr,40-g.stringWidth(hr)/2,10);
	g.drawString(min,40-g.stringWidth(min)/2,80);
*/
	g.setFontVector(62);
	//g.setFontCopasetic40x58Numeric();
	//g.drawString(hr,w/2-g.stringWidth(hr)-5,50);
	//g.drawString(min,w/2+5,50);
	g.drawString(tm,4+(w-g.stringWidth(tm))/2,50);
	//g.setColor(8+4);
	//g.setFontVector(26);
	//if (sec&1)g.drawString("o o",40-g.stringWidth("o o")/2,60);
	//if (sec&1)g.drawString(":",40-g.stringWidth(":")/2,42);
	//if (sec&1)g.drawString(". .",40-g.stringWidth(". .")/2,44);

	g.setFontVector(28);
	g.setColor(8+3);
	var dt=d[0]+" "+d[1]+" "+d[2];//+" "+d[3];
	g.drawString(dt,(w-g.stringWidth(dt))/2,130);
	g.flip();
 
    //loop
    this.tid=setTimeout(function(t){
    t.tid=-1;
    t.show();
    },this.refRate,this);
  },
  tid:-1,
  run:false,
  clear : function(){
    //g.setColor(col("black"));
    g.clear();
    this.run=false;
    if (this.tid>=0) clearTimeout(this.tid);
    this.tid=-1;
    return true;
  },
  off: function(){
    this.clear();
  }
};
//
face[1] = {
  offms:1000,
  init: function(){
  return true;
  },
  show : function(){
	if (Boolean(require("Storage").read("euc"))) {face.go("euc",0);}
	else if (Boolean(require("Storage").read("alarm"))) {face.go("alarm",0);}  
	return true;
  },
  clear: function(){
  return true;
  },
  off: function(){
    //P8.sleep();
  }
};	

//touch
//touch
tapHandler[0]=function(a){
    var p=d6;
};
