//atc
var atcR= function(evt){
  //var ll=0; require("Storage").write("evt"+ll,evt); ll++;
  let srt=String.fromCharCode.apply(String,evt.data);
  if (push.run==1) {
    push.txt=push.txt+srt;
    if  (push.txt.indexOf("\r\n") >= 0) {
      push.run=0;
      push.no++;
      push.txt = push.txt.replace(/(\xC2\xA0)/gm, " ");
      push.txt = push.txt.replace(/(\r\n)/g, "");
	  let p=push.txt.toString().split(','); //p[0]=type|p[1]=name(info:p[4]=body)|p[2]=body|p[3]=slot
      let d=(Date()).toString().split(' ');
      let ti=(""+d[4]+" "+d[0]+" "+d[2]);
      if (push.txt.indexOf(":") >= 0 && push.txt.indexOf(":") <= 20){ //info
//        push.info++;
		var from=p[1].substr(0, p[1].indexOf(':'));
        var txt=p[1].substr(p[1].indexOf(':')+2).replace(/(\n)/gm, " ");
	    if (push.el==1) txt=push.el2en(txt);
		if (push.em==1) txt=push.emoji(txt);
		if (push.caps==1 )txt=txt.toUpperCase();
//        require("Storage").write("info"+push.info,from+"|"+ti+"|"+txt); //old notify support
//new notify support
		notify.im.unshift("{\"src\":\"D6\",\"title\":\""+from+"\",\"body\":\""+txt+"\",\"time\":\""+ti+"\"}");
		if (notify.im.length>20) notify.im.pop();
		notify.nIm++;
		notify.New++;
		txt=undefined;
      } else if (p[0]==9) { //notes
        push.note++;
        push.from=p[1];
        if (p[2]=="") require("Storage").erase("note"+p[3]);
        else require("Storage").write("note"+p[3],push.from+"\n"+ti+"\n"+p[2]).replace(/(\n)/gm, " ");
      }  else if (p[0]==8) { //todo
        push.todo++;
        push.from=p[1];
        if (p[2]=="")require("Storage").erase("todo"+p[3]);
        else require("Storage").write("todo"+p[3],push.from+"\n"+ti+"\n"+p[2]).replace(/(\n)/gm, " ");
      }else {		
		notify.info.unshift("{\"src\":\"D6\",\"title\":\""+p[1]+"\",\"body\":\""+p[1]+"\",\"time\":\""+ti+"\"}");
		if (notify.info.length>20) notify.info.pop();
		notify.nInfo++;
		notify.New++;		  
	  }
      p=undefined;
      d=undefined;
      ti=undefined;
      push.txt=-1;
      set.atcW("AT+PUSH:OK");
    }
  }else{
    let i=srt.toString().split('=');
    srt = srt.replace(/(\r\n)/g, "");
    if (srt == "AT+BOND") {
      set.atcW("AT+BOND:OK");
	} else if (srt == "AT+ACT") {
	  set.atcW("AT+ACT:0");
	} else if (srt.substring(0, 7) == "BT+UPGB") {
	  start_bootloader();
	} else if (srt.substring(0, 8) == "BT+RESET") {
      reset();
    } else if (srt.substring(0, 7) == "AT+RUN=") {
      set.atcW("AT+RUN:" + srt.substring(7));
    } else if (srt.substring(0, 8) == "AT+USER=") {
      set.atcW("AT+USER:" + srt.substring(8));
    } else if (srt == "AT+PACE") {
      set.atcW("AT+PACE:10");
    } else if (srt == "AT+BATT") {
      //set.atcW("AT+BATT:40");
      set.atcW("AT+BATT:"+w.battVoltage(1));
    } else if (srt.substring(0, 8) == "AT+PUSH=") {
      digitalPulse(D16,1,[80,50,80]);
      if  (i[1].indexOf("\r\n") >= 0) {
        i[1] = i[1].replace(/(\r\n)/g, "");
        push.txt=i[1].substr(i[1].indexOf(',')+1,i[1].lastIndexOf(',')-2);
//new notify support
		let d=(Date()).toString().split(' ');
		let ti=(""+d[4]+" "+d[0]+" "+d[2]);
		notify.info.unshift("{\"src\":\"D6\",\"title\":\""+push.txt+"\",\"body\":\""+push.txt+"\",\"time\":\""+ti+"\"}");
		if (notify.info.length>20) notify.info.pop();
		notify.nInfo++;
		notify.New++;
//
        set.atcW("AT+PUSH:OK");
      }else {
        push.txt=i[1];
        push.run=1;
      }
    } else if (srt == "BT+VER") {
      set.atcW("BT+VER:sdk11");
    } else if (srt == "AT+VER") {
      set.atcW("AT+VER:"+process.version);
      digitalPulse(D16,1,[80]);
	  handleInfoEvent({"src":"BT","title":"ATC","body":"Connected"});
	  set.bt=4;
    } else if (srt == "AT+SN") {
      set.atcW("AT+SN:Espruino");
    } else if (srt.substring(0, 12) == "AT+CONTRAST=") {
      var ct = srt.substring(12);
      if (ct == "100") w.gfx.bri.set(1);
      else if (ct == "175") w.gfx.bri.set(3);
      else w.gfx.bri.set(7);
      set.atcW("AT+CONTRAST:" + srt.substring(12));
    } else if (srt.substring(0, 10) == "AT+MOTOR=1") {
      //motor_power = srt.substring(10);
      set.atcW("AT+MOTOR:1" + srt.substring(10));
    } else if (srt.substring(0, 6) == "AT+DT=") {
      var ye=i[1].toString().substring(0, 4);
      var mo=i[1].toString().substring(4, 6)-1;
      var da=i[1].toString().substring(6, 8);
      var ho=i[1].toString().substring(8, 10);
      var mi=i[1].toString().substring(10, 12);          
      var date=new Date(ye,mo,da,ho,mi);
      setTime((date-0).toFixed().substring(0, 10));		
      //console.log("Time set to :",date);
      set.atcW("AT+DT:" + i[1]);
    } else if (srt.substring(0, 5) == "AT+DT") {
      let mo=Date().getMonth()+1;
      if (mo < 10) mo = "0" + mo;
      let da=Date().getDate();
      if (da < 10) da = "0" + da; 
      let ti=(""+Date().getFullYear()+mo+da+Date().getHours()+Date().getMinutes()+Date().getSeconds());
      set.atcW("AT+DT:" + ti);
    }
  }
};
//

NRF.setServices({
  0x190A: {
     0x0001: {
      value : "RXchar",
      maxLen : 20,
      writable : true,
      onWrite : function(evt) {
		set.atcR(evt);
      }
     },
    0x0002: {
      value : "TXchar",
      maxLen : 20,
	  readable : true, 
      notify:true,
     },
   },
//}, { advertise: ['0x190A']});
}, { advertise: ['0x190A'], uart:(set.def.cli||set.def.gb)?true:false,hid:(set.def.hid&&set.def.hidM)?set.def.hidM.report:undefined });

var atcW= function(i) {
  i = i + "\r\n";
  while (i.length >0) {
   var  o = i.substring(0, 20);
    i = i.substring(20);    
    NRF.updateServices({
     0x190A : {
     0x0002 : {
       value : o,
       notify:true
     }
     }
    });
  }
};

//
//global
if (!global.push){
get=function(type){
   var list=require("Storage").list(type);
   if (list.length==0) return 0;
   else {return Number(list[list.length-1].substr(4));}
};  
global.push={
  em:1, //Translitarate emojis 
  caps:1, //convert to Uppercase 
  wrap:16, //number of characters to wrap text, -1 to disable wrapping.
  el:1, //Greek to latin transliteration
  info:get("info"),
  note:get("note"),
  todo:get("todo"),
  run:0,
  no:0,
  clear:function(i,n){
    this.no=0;
    this.list=require("Storage").list(i);
    if (n>0) require("Storage").erase(i+n);
    else {
      for (index = 0; index < this.list.length; index++) { 
        require("Storage").erase(i+(push.list[index].substr(4)));
      }
    this.no=0;
    }
//	if (require("Storage").getFree()<1000) require("Storage").compact(); //obsolete
    this.list=-1;
  },
  el2en:function(text) {
    text = text
    .replace(/\xCE\xB1/g, 'a')
    .replace(/\xCE\x91/g, 'A')
    .replace(/\xCE\xB2/g, 'b')
    .replace(/\xCE\x92/g, 'B')
    .replace(/\xCE\xB3/g, 'g')
    .replace(/\xCE\x93/g, 'G')
    .replace(/\xCE\xB4/g, 'd')
    .replace(/\xCE\x94/g, 'D')
    .replace(/\xCE\xB5/g, 'e')
    .replace(/\xCE\x95/g, 'E')
    .replace(/\xCE\xB6/g, 'z')
    .replace(/\xCE\x96/g, 'Z')
    .replace(/\xCE\xB7/g, 'h')
    .replace(/\xCE\x97/g, 'H')
    .replace(/\xCE\xB8/g, '8')
    .replace(/\xCE\x98/g, '8')
    .replace(/\xCE\xB9/g, 'i')
    .replace(/\xCE\x99/g, 'I')
    .replace(/\xCE\xBA/g, 'k')
    .replace(/\xCE\x9A/g, 'K')
    .replace(/\xCE\xBB/g, 'l')
    .replace(/\xCE\x9B/g, 'L')
    .replace(/\xCE\xBC/g, 'm')
    .replace(/\xCE\x9C/g, 'M')
    .replace(/\xCE\xBD/g, 'n')
    .replace(/\xCE\x9D/g, 'N')
    .replace(/\xCE\xBE/g, 'ks')
    .replace(/\xCE\x9E/g, 'KS')
    .replace(/\xCE\xBF/g, 'o')
    .replace(/\xCE\x9F/g, 'O')
    .replace(/\xCF\x80/g, 'p')
    .replace(/\xCE\xA0/g, 'P')
    .replace(/\xCF\x81/g, 'r')
    .replace(/\xCE\xA1/g, 'R')
    .replace(/\xCF\x83/g, 's')
    .replace(/\xCE\xA3/g, 'S')
    .replace(/\xCF\x82/g, 's')
    .replace(/\xCF\x84/g, 't')
    .replace(/\xCE\xA4/g, 'T')
    .replace(/\xCF\x85/g, 'u')
    .replace(/\xCE\xA4/g, 'Y')
    .replace(/\xCF\x86/g, 'f')
    .replace(/\xCE\xA6/g, 'F')
    .replace(/\xCF\x87/g, 'x')
    .replace(/\xCE\xA7/g, 'X')
    .replace(/\xCF\x88/g, 'ps')
    .replace(/\xCE\xA8/g, 'PS')
    .replace(/\xCF\x89/g, 'w')
    .replace(/\xCE\xA9/g, 'W')  
    .replace(/\xCE\xAC/g, 'a')
    .replace(/\xCE\xAD/g, 'e')
    .replace(/\xCF\x8C/g, 'o')
    .replace(/\xCF\x8E/g, 'w')
    .replace(/\xCE\xAF/g, 'i')
    .replace(/\xCE\xAE/g, 'h')
    .replace(/\xCE\x86/g, 'A')
    .replace(/\xCE\x88/g, 'E')
    .replace(/\xCE\x8C/g, 'O')
    .replace(/\xCE\x8F/g, 'W')
    .replace(/\xCE\x8A/g, 'I')
    .replace(/\xCE\x89/g, 'H')
    .replace(/\xCE\x8E/g, 'Y')
    .replace(/\xCF\x8D/g, 'u')
    .replace(/\xCF\x8A/g, 'i')
    .replace(/\xCF\xAB/g, 'u')
    .replace(/\xCE\x90/g, 'i')
    .replace(/\xCE\xB0/g, 'u')
    .replace(/\xCE\xAA/g, 'I')
    .replace(/\xCE\xAB/g, 'Y'); 	
    return text;
  },
  emoji:function(text) {
    text = text
    .replace(/\xF0\x9F\x98\x80/g, ':)')
    .replace(/\xF0\x9F\x99\x81/g, ':)')
    .replace(/\xF0\x9F\x99\x82/g, ':)')
    .replace(/\xF0\x9F\x98\x83/g, ':)')
    .replace(/\xF0\x9F\x98\x84/g, ':)')
	.replace(/\xF0\x9F\x98\x86/g, '>)')
    .replace(/\xF0\x9F\x98\x9E/g, ':(')
	.replace(/\xF0\x9F\x98\xA0/g, '><')
    .replace(/\xF0\x9F\x98\xA1/g, '><')
	.replace(/\xE2\x9D\xA4/g, ':HEART:')
    .replace(/\xF0\x9F\x98\x8D/g, ':LOVEYES');
    return text;
  }
};
get=undefined;
}
//end