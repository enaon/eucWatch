UI={
  pos:{
	_fold:[12,[0,30,160,110],[80,30,240,110],[0,130,120,220],[120,130,240,220]], 
  	//_2x2:[35,[0,35,120,130],[121,35,240,130],[0,131,120,220],[121,131,240,220]],
  	_2x2:[35,[0,30,120,132],[121,30,240,132],[0,133,120,235],[121,133,240,235]],
	_2x3:[25,[0,30,80,110],[81,30,160,110],[161,30,239,110],[0,111,80,190],[81,111,160,190],[161,111,239,190]],
	_2x1:[25,[0,30,239,135],[0,136,239,235]],
	_sel:[15,[0,236,239,279],[0,221,239,279],[0,191,239,279],[0,30,239,235]],
	_ele:{"0":25,topS:[0,0,239,29],topS1:[0,0,239,27],top:[0,0,239,40],btmS:[0,236,239,279],btmM:[0,221,239,279],btmL:[0,191,239,279],ind:[75,265,165,270]},
	_ind:{"0":25,btm:[75,265,165,270],top:[75,9,165,14]},
	_bar:[20,[0,195,80,279],[80,200,160,279],[160,195,239,279]],
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
	  if (UIc.get&&(type[0]||type[1]) ){
		  if (type[0]&&UIc[loc]) UIc.xy.tap[loc]=UIc.xy.tap[loc]+`${UIc.xy.tap[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.tap.${loc}${no}_${po}();`;	
		  if (type[1]&&UIc[loc]) UIc.xy.hold[loc]=UIc.xy.hold[loc]+`${UIc.xy.hold[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]})  UIc.hold.${loc}${no}_${po}();`;	
	  }else w.gfx.flip();
    },
    img:function(loc,no,po,img,txt,fclr,bclr,side,tran){
      "ram";
      let p=(UI.pos[no][po]);
	  let x=p[0]+((p[2]-p[0])/2);
      let y=p[1]+((p[3]-p[1])/2);
	  //w.gfx.setColor(0,0);
      //w.gfx.fillRect(p[0],p[1],p[2],p[3]);
      if (!tran){ 
		w.gfx.setColor(0,bclr);
		//w.gfx.fillRect(p[0]+3,p[1]+3,p[2]-3,p[3]-3);
		w.gfx.fillRect(p[0],p[1],p[2],p[3]);
	  }
      w.gfx.setColor(1,fclr);	
	  if  (txt&&side){
		  //w.gfx.setFont("Vector",(p[3]-p[1])/2);
 		  w.gfx.setFont("Vector",UI.pos[no][0]*2);	
		  let xa=x-((w.gfx.imageMetrics(img).width+w.gfx.stringWidth(txt))/2);
	      w.gfx.drawImage(img,xa,y-(w.gfx.imageMetrics(img).width/2));
		 // w.gfx.setColor(1,bclr==3?0:3);
		  w.gfx.drawString(txt,xa+5+w.gfx.imageMetrics(img).width,y-(w.gfx.stringMetrics(txt).height/2)); 
	  }else if (set.def.info&&txt) {
		  w.gfx.drawImage(img,x-24*0.8,y-35,{scale:0.8});
		  w.gfx.setColor(1,bclr==3?0:14);
		  let size=(p[3]-p[1])/4.5;
		  if (30<size) size=30;
		  w.gfx.setFont("Vector",size);	
		  w.gfx.drawString(txt,x-(w.gfx.stringWidth(txt)/2),y+19); 
	  }else w.gfx.drawImage(img,x-(w.gfx.imageMetrics(img).width/2),y-(w.gfx.imageMetrics(img).width/2));
	  img=0;
	  //coordinates
	  if (UIc.get&&(type[0]||type[1]) ){
		  if (type[0]&&UIc[loc]) UIc.xy.tap[loc]=UIc.xy.tap[loc]+`${UIc.xy.tap[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) UIc.tap.${loc}${no}_${po}();`;	
		  if (type[1]&&UIc[loc]) UIc.xy.hold[loc]=UIc.xy.hold[loc]+`${UIc.xy.hold[loc]==" "?'':'else '}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]})  UIc.hold.${loc}${no}_${po}();`;	
	  }else w.gfx.flip();
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
        w.gfx.flip(); //if (!set.def.bpp) w.gfx.flip();
		if (UI.ntid) clearTimeout(UI.ntid);
		/*if (UIc.get&&(type[0]||type[1]) ){
		  if (type[0]) UIc.xy.tap=UIc.xy.tap+`${UIc.xy.tap!=""?'else ':''}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) face[0].btn.tap${no}_${po}();`;	
		  if (type[1]) UIc.xy.hold=UIc.xy.hold+`${UIc.xy.hold!=""?'else ':''}if (${p[0]}<x&&x<${p[2]}&&${p[1]}<y&&y<${p[3]}) face[0].btn.hold${no}_${po}();`;	
		}else w.gfx.flip();
		*/
		//UIc.xy.tap.bar=`if ( x< ${(p[2]-p[0])/2} && ${p[1]}<y&&y<${p[3]} ) face[0].btn.sel_rigth(); else if(${(p[2]-p[0])/2}<x && ${p[1]}<y&&y<${p[3]}) face[0].btn.sel_left();`;	
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
	scan:require("heatshrink").decompress(atob("mEwwIcZg/+Aocfx+AAoV4gPgAoQDBuAEBgPAgE4AoQVBjgFBgYCBhgoCAQMGAQUgAolACggFL6AFGGQQFJEZsGsAFEIIhNFLIplFgBxBnwFCPYP/AoU8gf/BwKVB/+/SAUD/kf+CjDh/4V4n8AoYeBAoq1DgIqDAAP/XYcAv4qEn4qEGwsfC4kPEYkHF4Z1DACA="))

};



var UIc={
	start:function(m,b){
	"ram";
	  if (m) {UIc.xy.tap.main=" ";UIc.xy.hold.main=" ";UIc.main=1;}
	  if (b) {UIc.xy.tap.bar=" ";UIc.xy.hold.bar=" ";UIc.bar=1;}
	  UIc.get=1;
	},
	end:function(){
	"ram";
		w.gfx.flip();
		UIc.get=0;UIc.main=0;UIc.bar=0;
		UIc.tap.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.xy.tap.main+UIc.xy.tap.bar+'},0);'));
		UIc.hold.xy.replaceWith(new Function("x", "y",'setTimeout(()=>{'+UIc.xy.hold.main+UIc.xy.hold.bar+'},0);'));
    	//TC.removeAllListeners("tc5");
		//TC.removeAllListeners("tc12");
		//TC.on('tc5',UIc.tap.btn);
		//TC.on('tc12',UIc.hold.btn);
		//UIc.xy={tap:0,hold:0,up:0,down:0,back:0,next:0};
	},
	get:1,
	xy:{tap:{main:" ",bar:" "},hold:{main:" ",bar:" "},up:" ",down:" ",back:" ",next:" "},
	tap:{xy:()=>{},main:{},bar:{}},
	hold:{xy:()=>{},main:{},bar:{}},
};