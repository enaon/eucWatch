UI={
  size:{_2x2:20,_2x1:25,_txt:24,_sideSmall:20,sideBig:45,underSmall:20,txt:1,len:1},
  pos:{
	_fold:[12,[0,20,160,105],[80,20,240,105],[0,106,120,220],[120,106,240,220]], 
	_barT:[30,[0,20,120,80],[121,20,240,80],[0,20,240,80],[0,81,240,235]],
	//_barT:[30,[0,180,120,238],[121,180,240,238],[0,180,240,238],[0,0,240,179]],
	
	//_1x2B:[30,[0,160,120,235],[121,160,240,235],[0,30,240,159]],
  	_2x2:[35,[0,20,120,127],[121,20,240,127],[0,128,120,235],[121,128,240,235]],
	_2x3:[25,[0,20,80,100],[81,20,160,100],[161,20,239,100],[0,101,80,180],[81,101,160,180],[161,101,239,180]],
	_2x1:[25,[0,20,239,130],[0,131,239,235]],
	_sel:[15,[0,236,239,279],[0,221,239,279],[0,181,239,279],[0,30,239,235]],
	_ele:{"0":25,topS:[0,0,239,19],topS1:[0,0,239,27],top:[0,0,239,40],btmS:[0,236,239,279],btmM:[0,221,239,279],btmL:[0,181,239,279],ind:[75,265,165,270]},
	_ind:{"0":25,btm:[75,265,165,270],top:[80,7,160,12]},
	_bar:[20,[0,181,80,279],[81,181,160,279],[161,181,239,279],[0,181,120,279],[121,181,239,279],[0,181,239,279]],
	_main:[20,[0,20,80,180],[81,20,160,180],[161,20,239,180],[0,20,160,180],[81,20,239,180],[0,0,239,180],[0,20,239,100],[0,101,239,180],[0,81,239,180]],
	_top:30,
	_head:2,
	_foot:255,
  },
  btn:{
    c2l:function(loc,no,po,txt1,txt2,fclr,bclr){//type:main|bar,
      "ram";
	  //draw
      let p=(UI.pos[no][po]);
      let x=p[2]-((p[2]-p[0])/2);
      let y=p[3]-((p[3]-p[1])/2);
      w.gfx.setColor(0,bclr);
      w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      w.gfx.setColor(1,fclr);
      if (txt2&&txt2!=""){
        w.gfx.setFont("Vector",(p[3]-p[1])/5);
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/3.5)); 
        w.gfx.setFont("Vector",UI.pos[no][0]);	
        w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height-10);
      }else{  
        w.gfx.setFont("Vector",UI.pos[no][0]*( (100 < p[2]-p[0])?1:((p[2]-p[0])/100)) );	
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-(w.gfx.stringMetrics(txt1).height/2)); 
      }
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
    },
    img:function(loc,no,po,img,txt,fclr,bclr,side,tran){
      "ram";
      let p=(UI.pos[no][po]);
	  let x=p[0]+((p[2]-p[0])/2);
      let y=p[1]+((p[3]-p[1])/2);
	  //w.gfx.setColor(0,0);
      //w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      if (!tran){ 
		//w.gfx.fillRect(p[0]+3,p[1]+3,p[2]-3,p[3]-3);
		if (bclr==4){
			w.gfx.setColor(0,0);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0]+2,p[1]+3,p[2]-2,p[3]-3);
	    }else {		
  			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
	    }
	  }
      w.gfx.setColor(1,fclr);	
	  if  (txt&&side){
		  //w.gfx.setFont("Vector",(p[3]-p[1])/2);
 		  w.gfx.setFont("Vector",UI.pos[no][0]*2);	
		  let xa=x-((w.gfx.imageMetrics(img).width+w.gfx.stringWidth(txt))/2);
	      w.gfx.drawImage(img,xa,y-(w.gfx.imageMetrics(img).width/2));
		 // w.gfx.setColor(1,bclr==3?0:3);
		  w.gfx.drawString(txt,xa+5+w.gfx.imageMetrics(img).width,y-(w.gfx.stringMetrics(txt).height/2)+2); 
	  }else if (set.def.info&&txt) {
		  w.gfx.drawImage(img,x-24*0.85,y-35,{scale:0.85});
		  //w.gfx.setColor(1,bclr==3?0:14);
		  w.gfx.setColor(1,fclr);
		  let size=(p[3]-p[1])/4.5;
		  if (26<size) size=26;
		  w.gfx.setFont("Vector",size);	
		  w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+19); 
	  }else w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width/2),y-(w.gfx.imageMetrics(img).width/2));
	  img=0;
	  //coordinates
	  if (UIc.get[loc])
		UIc.raw[loc]=UIc.raw[loc]+`${UIc.raw[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.${loc}.${no}_${po}();`;	
	  else w.gfx.flip();
	}, 
	ntfy:function(no,po,txt1,txt2,fclr,bclr,tmot,sel){
		if (UI.ntid) {clearTimeout(UI.ntid);UI.ntid=0;}
		UI.removeAllListeners("ntfy");
		let p=(UI.pos[no][po]);
		let x=p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/2);
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);
        w.gfx.setFont("Vector",UI.pos[no][0]*( (100 < p[2]-p[0])?1:((p[2]-p[0])/100)));	
        if (sel) {w.gfx.drawString("<",p[0]+5,y-((p[3]-p[1])/4)); w.gfx.drawString(">",p[2]+-5-w.gfx.stringWidth(">"),y-((p[3]-p[1])/4));}
        w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y-((p[3]-p[1])/4)); 
        w.gfx.setFont("Vector",UI.pos[no][0]*( (100 < p[2]-p[0])?1:((p[2]-p[0])/100)));	
        w.gfx.drawString(txt2,x-(w.gfx.stringWidth(txt2)/2),p[3]-w.gfx.stringMetrics(txt2).height-10);
        //w.gfx.flip(); //if (!set.def.bpp) w.gfx.flip();
		if (UI.ntid) clearTimeout(UI.ntid);
		//
		UI.ntid=setTimeout(function(t){UI.ntid=0;UI.emit('ntfy',"ok");if (face[0].bar) face[0].bar(); },tmot?tmot*1000:1000);
	}
  },
  ele:{
	title:function(po,txt,fclr,bclr){
		"ram";
		let p=(UI.pos._ele[po]);
		let x=4+p[2]-((p[2]-p[0])/2);
		let y=p[3]-((p[3]-p[1])/1.5);
		w.gfx.setColor(0,bclr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		w.gfx.setColor(1,fclr);	
		w.gfx.setFont("Vector",(p[3]-p[1])/2);	
		w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y-2); 
        if (!set.def.bpp) w.gfx.flip();
	},
	ind:function(no,c,t){
		"ram";
		let p=(UI.pos._ind[no?no:"btm"]);
		w.gfx.setColor(0,0);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
		let pa=(p[2]-p[0])/t;
		w.gfx.setColor(1,3);	
		w.gfx.fillRect(p[0]+(pa*(c-1)),p[1],p[0]+(pa*c),p[3]);
        if (!set.def.bpp) w.gfx.flip();
	},
	fill:function(no,po,clr){
		let p=(UI.pos[no][po]);
		w.gfx.setColor(0,clr);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
        if (!set.def.bpp) w.gfx.flip();
	}
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
		w.gfx.setFont("Vector",UI.size._txt);	
		w.gfx.drawString(txt,10+x-(w.gfx.stringWidth(txt)/2),p[1]+25); 
		if (!set.def.bpp) w.gfx.flip();
	}
  }
  
};


UI.ntfy={
	simple:function(po,txt1,txt2,fclr,bclr,tmot){
			UI.removeAllListeners("ntfy");
			let p=(UI.pos._ele[po]);
			let x=4+p[2]-((p[2]-p[0])/2);
			let y=p[3]-((p[3]-p[1])/1.5);			
			w.gfx.setColor(0,bclr);
			w.gfx.fillRect(p[0],p[1],p[2],p[3]);
			w.gfx.setColor(1,fclr);
			w.gfx.setFont("Vector",(p[3]-p[1])/2);	
			w.gfx.drawString(txt1,x-(w.gfx.stringWidth(txt1)/2),y); 
			if (!set.def.bpp) w.gfx.flip();
			if (UI.ntid) clearTimeout(UI.ntid);
			UI.ntid=setTimeout(function(t){UI.ntid=0;UI.emit('ntfy',"ok");},tmot?tmot:1000);
	},	
	
	
};
	
UI.icon={	
	bt:require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY=")),
	plane:require("heatshrink").decompress(atob("lkwwIPMg4FE/AKE4AFDtwEDg1gAocjAgcDnAFDmOAAgUBxgKDjAbChkBwwJC8EMmAEBh8A4IbC+EEjAKDsBCC7/+g//4EN//gv//wFAEgUMgw0DsBQDgQKEkAKDg0EBQfgFYf4FYf8IIMGhhBDoJMDhhMCh0A4YhC4BtDPAOOPAifDgYaCAAMzRwcCPoQABsyvEXQl8AgcPDQcAuD/XABYA=")),
	themes:require("heatshrink").decompress(atob("mEwwIHEgfwAocH/AFDh/8Aocf/wFDn//Aod/Aon//8PAQPBAomDAQMfAQMH//+AoP+BwIFC/gCE+AuB/Ef4AuC+EfwAuC8AFBgIFB4AFBgYFBwAFBFwJGBAoIuCAoQuCAoQuCAonwoAFBGgPgFIQLB4IFBQIJgB4EeRoJgB4Ecg+D/wFBjE/8P8h5XC+H4AoQzB+AFD/lAAoJdBIoIFDKIIFfQIIpDApB+BAoZsBAoX4PAPANIPwAoR1B+CtDcQaHCYAL3CTwIAC")),
	dndOff:require("heatshrink").decompress(atob("mEwwIdag/gEAIFEuAFBhwDBA4MAn18gPAAoP4j8DwEABAMDw4KBBAMBxwiCAQMcEQQCBnACBhgCBFwUYEoQFDgPYMgQlBzAFDg4aCAoMOAokcAok4AolwAongAoZUBAoZUBAoZUBAoZUBAoZdBAoZdBAoZdBAoVgRgMGKwPBRgMDQwODRgiDCgAFBQYQFCj//AAIaBn4FERgQACXYQABEoMYS4RdBAoZdCbYQuBboRPCIoL/TAAo")),
	dndOn:require("heatshrink").decompress(atob("mEwwIdag/gApMOuAFDn18Aof4j4ECgPAgeAAoIDBA4IiCAQIkChwCBEgUMKoQCBjACKBwUcAogaFAv4FEsACBgx8BPQQDBQwaMCTAYFH/4ACAozRNjCOCAo8MJITdHJIYAXA")),
	findPhone:require("heatshrink").decompress(atob("mEwwILIv/+AgUD///4AFBg8//HgAoMGj/4sAFCAQIFfgYFD4EPAofghwFDuEcAoc4nAFDjkw4wFBscMuIFDx1hwwFBAYPjAofG8YdD4/HApPjAqIjEAovHsY1D45BFJopZFMopxFPosHAofwSoq/jAo0HAQL1Cgf//40BAAM87wECAAg")),
	wakeScreen:require("heatshrink").decompress(atob("mEwwJC/AAkPwAECgP//AFCg///4FCj4FBCQU/AoPgAoN/4Ef+AFB/wZBDwMB/gCCgUDBwV+h0HDQU/jkP4AsCvg/Dh/8j5JDAokH/k+Igf4Aoc//E8AoRbBvhhEAoUD//wjAnBwIFBEIRaEn/AgIFDJ4QFIKoQdDAoibDgECbfA=")),
	bri:require("heatshrink").decompress(atob("jEXwIHEhAKCAQcEAgMGAQMCuADB+EAgICEgYCBnYFEBwoXCDoUGiEAhw9DAQ4ABA")),
	torch:require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA==")),
	settings:require("heatshrink").decompress(atob("mEwwI2zgP/Ao0f////P/nE/AoP9/88ApU4EZYADAooAICg2AApE8/+/G4P4Aon8AoscCIgjLACkf8AFE+CJDz/3/B9CAoP8ApRBBDogFJF4gAsA=")),
	alarm:require("heatshrink").decompress(atob("mEwwIKH/ACBh8Agf+AoN/4EH/+AgH/+EP//AgP//EfAoMDAo38n4dDAoIpCj4FB8E//kHAoPA///wIFBwYFB8AFBGAI0BvkeFQIuBnkcn/wDgM4FgOAgIyC/41CAQIICn4OB/kB4EfAoP4AoMPKAPwAo8H8ABBAo8DAoJ2BAo5EBAYIFF8AFE+AFE/gFC8BMBEYQFBh+DAocHw4fCL4IJBAoZTBL4IFE/inCZAJ3EQYzaBR4abBh4aDU4QFEBYU/AoIXCvwFB3wFBvjbBjwFBXYMAAoQAEA=")),
	cli:require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4")),
	gb:require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A==")),
	proxy:require("heatshrink").decompress(atob("mEwwIcZn////+AoIEBAAOAgIFD4EDAofgg/gCgMD+EH4AFBgPwh+AE4X4h4tDvAFFj8DwITBvkegeDD4M8AoPDAoQRBwYRCj4jKGopBFJosD/AFBj/gMopxFPo0PAoIaCEIIrCAqg9CEgQiDH4P8Wgg0CAAM+nwbC//8j5NBg4/BIYKzBApQZBRgojDF447FI4pTFABI")),
	hid:require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA=")),
	info:require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA==")),
	scan:require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA=")),
	trash:require("heatshrink").decompress(atob("mEwwI1yg/4AocP/gFDhkMApE//4ABAo4PCAUIACAv4FQATkGAQMYXwSgBYAUBAoPgdsg")),
	tmout:require("heatshrink").decompress(atob("mEwwIjggf+AofD//ABQXh//gAoMH8EH/AFCB4P8CIQCBvwlEj4CBsEB4EPwEA+EBDwIFEgfAAYIFHAIQHEEgIDCAovwAopABAoVwGIIFMDYIFCgBkBAoZkBAoZkBFIIFBn4FCOwMfwAFDh+BKYSFB4JVDgeDLoJPCCoQFCFoV4AoKJCviVEGYMAnwICVokPRwK5Cgf//58DAoLRCDwP/XocPCwQAXA==")),
	tmout32:require("heatshrink").decompress(atob("kEgwIQNkf8AYNwvwDB+EPwEAoED4AIBwPgh0BwADC4FwAYUwhgDBnEAAYMYAYcYAZHgAYIwBjEcgF4AYU8nEMgEcnEOgEMmEHJIQDC8EDwAkBEQMHJ4P4j4NBn/+AYMP/ByM")),
	time:require("heatshrink").decompress(atob("mEwwIFCj/4BYf//4ECg4FB8AQC/1/+AFBn/Agf8AoN+AQghCn8AgPwgOAh+AgfggfAg4BBA4IeB8ANC4AVBj8AAoMA+EeAod4ngFJnk4Aol4AoceuAFJhxbBApEPAopzBAp4XBgIIBApBdBAo5BBLoI7BAQIFCjwFCNAMeMoIFCjgCBBIIHBAooCBgEMD4KVBAAXwUIIEBUIKvBAoS3BbQQJBgZICCoMBaIQhCborpFj/8eocH///EwUAAoI+Dj4lCA=")),
	txt:require("heatshrink").decompress(atob("mEwwJC/ABEH/4AC8EPAofwAosfAof4ApnAkfEgYFCkOEAocxxgFC+AsBh4FCAQIFC+P8n+PBYQFBCIYFECIwdEFIvx+OPCIfhw4LC/Pj4+fL5oFEQZaVFa/Y"))
};



var UIc={
	get:{bar:0,main:0},
	raw:{main:" ",bar:" ",up:" ",down:" ",back:" ",next:" "},
	xy:()=>{},
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