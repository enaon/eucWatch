//handler .set={def:{acctype:"sc7a20",touchtype:"716"}}
//fonts
//require('Font7x11Numeric7Seg').add(Graphics);
//notifications
var notify={
	New:0,nIm:0,nInfo:0,nCall:0,nMail:0
};
notify.im=(Boolean(require('Storage').read('im.log')))?require('Storage').readJSON('im.log'):[];
notify.info=(Boolean(require('Storage').read('info.log')))?require('Storage').readJSON('info.log'):[];
notify.call=(Boolean(require('Storage').read('call.log')))?require('Storage').readJSON('call.log'):[];
function handleInfoEvent(event,disc) {
	"ram";
	notify.nInfo++;
	notify.New++;
	let d=(Date()).toString().split(' ');
    let ti=(""+d[4]+" "+d[0]+" "+d[2]);
	notify.info.unshift("{\"src\":\""+event.src+"\",\"title\":\""+event.title+"\",\"body\":\""+event.body+"\",\"time\":\""+ti+"\"}");
	if (notify.info.length>10) notify.info.pop();
	buzzer([80,50,80]);
	if (set.def.buzz&&!notify.ring&&!disc) {
		if (face.appCurr!="main"||face.pageCurr!=0) {
			face.go("main",0);
			face.appPrev="main";face.pagePrev=-1;
        }
	}
}
//settings - run set.upd() after changing BT settings to take effect.
var set={
	bt:0, //Incomming BT service status indicator- Not user settable.0=not_connected|1=unknown|2=webide|3=gadgetbridge|4=eucemu|5=esp32
	tor:0, //Enables/disables torch- Not user settable.
	ondc:0, //charging indicator-not user settable.
	btsl:0, //bt sleep status-not user settable.
	gIsB:0,//gat status-n.u.s- 0=not busy|1=busy 
	fmp:0, //find my phone-n.u.s.
	boot:getTime(), 
	dash:[],
	read:function(file,name){
		"ram";
		let got=require("Storage").readJSON([file+".json"],1);
		if (got==undefined) return false;
		if (name) {
			if (require("Storage").readJSON([file+".json"],1)[name])
			return require("Storage").readJSON([file+".json"],1)[name];
			else return false;
		}else return require("Storage").readJSON([file+".json"],1);
	},	
	write:function(file,name,value,value2,value3){
		"ram";
		let got=require("Storage").readJSON([file+".json"],1);
		if (got==undefined) got={};
		if (!value)  delete got[name]; //delete
		else {
			if (value2 && got[name] ) 
				if (value3 || value3==0) got[name][value][value2]=value3;
				else got[name][value]=value2;
			else 
				got[name]=value;
		}
		require("Storage").writeJSON([file+".json"],got);
		return true;
	},
	gDis:function(){
		if (this.gIsB) {
			this.gIsb=2;
			if (global["\xFF"].BLE_GATTS) {
				if (global["\xFF"].BLE_GATTS.connected)
				global["\xFF"].BLE_GATTS.disconnect().then(function (c){this.gIsB=0;});
			}else gIsB=0;
		 }
	},
	updateSettings:function(){require('Storage').write('setting.json', set.def);},
	resetSettings:function() {
		set.def = {
		dash:{
			mph:0, 
			amp:0, 
			bat:0,
			batS:0, 
			face:0,  
			accE:0,//euc acc on/off
			clck:0,
			clkS:0,	
			farn:0,
			rtr:5
		},
		off:{ //face timeout 
		},
		name:"eucWatch", //Set the name to be broadcasted by the Bluetooth module. 
		timezone:0, //Timezone
		hr24:1, //24 hour mode
		woe:1, //wake Screen on event.0=disable|1=enable
		wob:1, //wake Screen on Button press.0=disable|1=enable
		rfTX:-4, //BT radio tx power, -4=low|0=normal|4=high
		cli:1, //Nordic serial bluetooth access. Enables/disables Espruino Web IDE.
		hid:0, //enable/disable Bluetooth music controll Service.
		gb:0,  //Notifications service. Enables/disables support for "GadgetBridge" playstore app.
		atc:0, //Notifications service. Enables/disables support for "d6 notification" playstore app from ATC1441.
		emuZ:0, //emulator service. Enables/disables bridge support for euc world, wheelog, darknessbot emulating a z10 .
		acc:0, //enables/disables wake-screen on wrist-turn. 
		hidT:"media", //joy/kb/media
		bri:2, //Screen brightness 1..7
		acctype:"0",
		touchtype:"0",
		buzz:1
		};
		set.updateSettings();
	},	
	accR:function(){if(!this.def.dash.accE) { if (this.def.acc)acc.on(); else acc.off();}},
	hidM:undefined, //not user settable.
	clin:0,//not settable
	upd:function(){ //run this for settings changes to take effect.
	if (this.def.hid===1) {this.def.hid=0; return;}
	if (this.def.emuZ){
		this.def.cli=0;
		this.def.gb=0;
		this.def.hid=0;
		eval(require('Storage').read('emuZ'));
		// ninebotZ emu support
		NRF.setServices({
			0xfee7: {
				0xfec8: {
				},
				0xfec7: {
				},
				0xfec9: {
				}
			}
		}, { uart: true});
	}else {
		NRF.setServices(undefined,{uart:(this.def.cli||this.def.gb)?true:false,hid:(this.def.hid&&this.hidM)?this.hidM.report:undefined });
		if (global.emuZ)  emuZ=0;
		//if (this.atcW) {this.atcW=undefined;this.atcR=undefined;} 
	}
	if (this.def.gb) eval(require('Storage').read('m_gb'));
	else {
		this.gbSend=function(){return;};
		this.handleNotificationEvent=0;this.handleFindEvent=0;handleWeatherEvent=0;handleCallEvent=0;handleFindEvent=0;sendBattery=0;global.GB=0;
	}		
	if (!this.def.cli&&!this.def.gb&&!this.def.emuZ&&!this.def.hid) { if (this.bt) NRF.disconnect(); else{ NRF.sleep();this.btsl=1;}}
	else if (this.bt) NRF.disconnect();
	else if (this.btsl==1) {NRF.restart();this.btsl=0;}
	}
};

set.def = require('Storage').readJSON('setting.json', 1);
if (!set.def) {set.resetSettings();set.updateSettings();}
//set.def.touchtype="716";
if (!set.def.rstP) set.def.rstP="D39";
if (!set.def.rstR) set.def.rstR=0xA5;
//buzzzer
if (set.def.buzz) buzzer = digitalPulse.bind(null,ew.pin.BUZZ,0);
else buzzer=function(){return true;};
buz={ok:[5,20,5],na:20,ln:80,on:40,off:[20,25,20]};

if (!set.def.off) set.def.off={};
//dash
require('Storage').list("dash_").forEach(dashfile=>{
	set.dash.push(dashfile);
});
if (!Boolean(require("Storage").read("dash.json"))) { 
	let dash={slot:1};
	require('Storage').write('dash.json', dash);
}
//
E.setTimeZone(set.def.timezone);
//nrf
//set.emuD=0;
function ccon(l){ 
	"ram";
	if (set.def.emuZ) {
		//if (set.emuD) return;
		emuZ.cmd(l);
		return;
	}else {
		var cli="\x03";
		var loa="\x04";
		var gb="\x20\x03";
		 if (l.startsWith(loa)) {
			Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
			return; 
		}else {
		if (set.def.cli) {
			if (l.startsWith(cli)) {
				set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
			}
		}
		if (set.def.gb) {
			if (l.startsWith(gb)){
				set.bt=3;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
				handleInfoEvent({"src":"BT","title":"GB","body":"Connected"});
			}
		}
		if (l.length>5)  NRF.disconnect();
		}
	}
}
function bcon() {
	E.setConsole(null,{force:true});
	set.bt=1; 
	if (set.def.cli||set.def.gb||set.def.emuZ) { Bluetooth.on('data',ccon);}
	setTimeout(()=>{
    if (set.bt==1){ 
		if (!set.def.cli) 
			NRF.disconnect(); 
		else{ 
			handleInfoEvent({"src":"DEBUG","title":"RELAY","body":"Relay Connected"});
			set.bt=2;Bluetooth.removeListener('data',ccon);E.setConsole(Bluetooth,{force:false});
		}
	}
	},5000);
}
function bdis() {
    Bluetooth.removeListener('data',ccon);
	E.setConsole(null,{force:true});
    if (!set.def.cli&&!set.def.gb&&!set.def.emuZ&&!set.def.hid){
		NRF.sleep();
		set.btsl=1;
    }	
	if (set.bt==1) handleInfoEvent({"src":"BT","title":"BT","body":"Disconnected"});
	else if (set.bt==2) handleInfoEvent({"src":"BT","title":"IDE","body":"Disconnected"});
	else if (set.bt==3) handleInfoEvent({"src":"BT","title":"GB","body":"Disconnected"});
	//else if (set.bt==4) handleInfoEvent({"src":"BT","title":"ATC","body":"Disconnected"});
	else if (set.bt==4) handleInfoEvent({"src":"BT","title":"BRIDGE","body":"Disconnected"});
	else if (set.bt==5) handleInfoEvent({"src":"BT","title":"ESP","body":"Disconnected"});
  	set.bt=0; 
	set.emuD=0;
}
NRF.setTxPower(set.def.rfTX);
NRF.on('disconnect',bdis);  
NRF.on('connect',bcon);
NRF.setAdvertising({}, { name:set.def.name,connectable:true });
set.upd();
//face
var face={
	appCurr:"main",
	appPrev:"main",
	pageCurr:-1,
	pagePrev:-1,	
	pageArg:"",
	faceSave:-1,
	mode:0,
	offid:0,
	offms:-1,
	off:function(t){ 
    "ram";
		face.batt=0;
		if (this.pageCurr===-1) return;
		if (this.offid) {clearTimeout(this.offid); this.offid=0;}
		if (face[this.pageCurr]!=-1){
			this.offms=(t)?t:face[this.pageCurr].offms;
		}
		this.offid=setTimeout((c)=>{
			this.offid=0;
			if (c===0||c===2) {
				if (this.appCurr==="main") {
					if (face[c].off) {
						if (set.def.touchtype=="716") tfk.exit();	
						else {digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);} 
						face[c].off();this.pageCurr=-1;face.pagePrev=c;
					}
				}else face.go(this.appCurr,1);
			}else if (face.appPrev=="off") {
				if (face[c].off) {
					if (set.def.touchtype=="716") tfk.exit();	
				else {digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);} 
					face.go("main",-1);face.pagePrev=c;
				}
			}else if (c>1) face.go(this.appCurr,0);
		},this.offms,this.pageCurr);
	},
	go:function(app,page,arg){
    "ram";
		this.appPrev=this.appCurr;
		this.pagePrev=this.pageCurr;
		this.appCurr=app;
		this.pageCurr=page;
		if (this.pagePrev==-1&&w.gfx.isOn) {w.gfx.clear();w.gfx.off();return;}
		if (this.pagePrev!=-1) {
			face[this.pagePrev].clear();
		}
		if (this.pageCurr==-1 && this.pagePrev!=-1) {
			if (set.def.touchtype=="716") tfk.exit();	
			else {digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,set.def.rstR,3);},100);} 
			acc.go=0;
			face[this.pagePrev].off();
			if (this.offid) {clearTimeout(this.offid); this.offid=0;}
			if (this.appCurr!=this.appPrev) {
				if (face[app]) {
					face[0]=face[face.appCurr][0];face[1]=face[face.appCurr][1];
					touchHandler[0]=touchHandler[face.appCurr][0];
				}else eval(require('Storage').read(app));	
			}
			return;
		}
		if (this.appCurr!=this.appPrev) {
			face[2]=0;face[5]=0;
			this.appRoot=[this.appPrev,this.pagePrev,this.pageArg];
			if (face[app]) {
				face[0]=face[face.appCurr][0];face[1]=face[face.appCurr][1];
				touchHandler[0]=touchHandler[face.appCurr][0];
			}else eval(require('Storage').read(app));
		} 
		this.off();
		face[page].init(arg);	
		if(!w.gfx.isOn) {
			if (set.def.touchtype=="716") tfk.start();
			else digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0xFA,0X11);},100);

			w.gfx.on();
		}
		face[page].show(arg);
		if(arg) this.pageArg=arg;
	}
};
//touch 
//charging notify
setWatch(function(s){
	let co;
	let g=w.gfx;
	if (!s.state) {
		digitalPulse(ew.pin.BUZZ,0,200); 
		set.ondc=1;
	}else {
		digitalPulse(ew.pin.BUZZ,0,[100,80,100]);
		set.ondc=0;
	}
	if (face.pageCurr<0|| face.batt){
		//g.clear();
		g.setColor(0,(set.ondc)?4:1);
		g.fillRect(0,0,240,240);
		g.setColor(1,14);
		let img = require("heatshrink").decompress(atob("wGAwJC/AA0D///4APLh4PB+AP/B/N/BoIAD/gPHBwv//wPO/4PH+F8gEHXwN8h4PIKgwP/B/4P/B/4PbgQPOg4POh+AB7sfB50/H5wPPv4PO/4PdgIPP94PNgfPB5sHB5+PB5sPB50fBgQPLjwPOn0OB5t8jwPNvAPO/APNgPwB53gB5sDB5/AB5sHwAPNh+Aj//4APLYAIPMj4POnwhBB5k8AgJSBB5V8LoQPL/BtDB5TRCKQIPJZwIEBSAIPJXwIEBMQQPJ4AEBKQIPJg4PCvAPKRgP+MQQPNYgYPKMQR/KLoMBMQIPLjxiCB5ccMQQPLnjeBB5reBB5zhDB5TeBB5reBB5s8B5s4bwIPMvDeBB5reBB5oDCB5d5B517bwIPNZwIPMu4PO/7OBB7oGCB5f+B738B7sBZwQPcGQQPMZwQPbgDOCB5gADB/4P/B/4PY/4AGB69/Bwv+B538B44Ar"));
		g.drawImage(img,60,30);
		g.setFont("Vector",30);
		g.drawString(w.batt("info"),125-(g.stringWidth(w.batt("info"))/2),200);
		g.flip();
		if (face.offid) clearTimeout(face.offid);
		face.offid=setTimeout(()=>{
			face.pageCurr=-1;face.batt=0;
			g.clear();g.off();face.offid=0;
		},2000);
		if(!g.isOn) {face.batt=1;face.pageCurr=0; g.on();}
	}
},ew.pin.CHRG,{repeat:true, debounce:500,edge:0});  
//button 
function buttonHandler(s){
	"ram";
	if (this.t1) {clearTimeout(this.t1); this.t1=0;}
	if (face.offid) {clearTimeout(face.offid);face.offid=0;}
	if (s.state) { 
		this.press=true;
		if (global.euc&&euc.state=="READY"&&2<=euc.dash.spd&&euc.dash.horn) {euc.wri("hornOn");return;}
		this.t1=setTimeout(() => {
			this.t1=0;
			if (global.euc) {
				euc.tgl();this.press=false;
			}
		}, 1000);
   }else if (this.press && !s.state)  { 
		this.press=false;
		if (global.euc&&euc.state=="READY"&&euc.horn&&euc.dash.horn) {euc.wri("hornOff");return;}
		if (face.pageCurr==-1) {
			buzzer(buz.on);
			face.go((global.euc&&euc.state!="OFF")?set.dash[set.def.dash.face]:face.appCurr,0);
		}else { 
			if (face.appCurr=="main"&&face.pagePrev!=-1&&face.pagePrev!=2) {
				face.go("main",-1);
				buzzer(buz.off);
			}else{
				let to=face.pageCurr+1;
				if (to>=2) to=0;
				face.go(face.appCurr,to);
			}
		}
	}else if (this.press&&global.euc&&euc.state==="READY"&&euc.horn&&euc.dash.horn) {euc.wri("hornOff");return;
	}else face.off();
}
btn=setWatch(buttonHandler,BTN1, {repeat:true, debounce:10,edge:0});
//touch controller
touchHandler= {
	timeout:x=>{setTimeout(()=>{face.off();},0);},
	go:function(e,x,y){
		touchHandler[face.pageCurr](e,x,y);
	},
};

if (set.def.touchtype==0) set.def.touchtype="716";

//var i2c=I2C1;
var i2c=new I2C();
i2c.setup({scl:ew.pin.i2c.SCL, sda:ew.pin.i2c.SDA, bitrate:100000});
if (set.def.touchtype=="816"){ //816
digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0xFA,0X11);},150);
tpnst=1;
tpnen=0;
//set.def.touchtype="816";
	watchTouch=setWatch(function(s){
		i2c.writeTo(0x15,0);
		var tp=i2c.readFrom(0x15,7);
		//print("in",tp);
		
		if (tpnst && !tp[1]&&tp[3]==0){
			tpnst=0;tpnen=1;
			//print("in st");
		}else if (tpnen && (tp[1] || (!tp[1]&&  tp[3]==64) )) {
				if (tp[3]==64) tp[1]=5;
				//print("in en");
				tpnst=1;tpnen=0;
			if (face.pageCurr>=0) {
				touchHandler[face.pageCurr](tp[1],tp[4]+20,tp[6]);}
			else if (tp[1]==1) {
				face.go(face.appCurr,0);
			}
		}else return;	
		//print("touch816 end");

	},ew.pin.touch.INT,{repeat:true, edge:"rising"}); 

}else{




var tfk={
	tid:0,
	x:0,
	y:0,
	do:0,
	st:1,
	loop:10,
	init:function(){
		"ram";
		var tp=i2c.readFrom(0x15,7);
		if ( tp == Uint8Array(7) || (tp[3] == 64 && this.st)  ) return;
		if (  tp[3] === 0 || tp[3] === 128) {
			if (tp[2]==1 && this.st  ) {
				this.st = 0;
				this.do = 1;
				this.x = ((tp[3]&0x0F)<<8)|tp[4];
				this.y =((tp[5]&0x0F)<<8)|tp[6];
				this.time=getTime();
				return;
			}	
			if ( this.do && getTime() - this.time > 1 && tp[2]==1 ) { 
				this.do = 0 ;
				return setTimeout(function() {touchHandler[face.pageCurr](12,tfk.x+20,tfk.y);},0);
			}else if ( this.do&&tp[2]==1) {
				var a=0;
				if ((((tp[5]&0x0F)<<8)|tp[6])>=this.y+10) a = 1;
				else if ((((tp[5]&0x0F)<<8)|tp[6])<=this.y-10) a = 2;
				else if ((((tp[3]&0x0F)<<8)|tp[4])<=this.x-10) a = 3;
				else if ((((tp[3]&0x0F)<<8)|tp[4])>=this.x+10) a = 4;
				if ( a != 0 && this.aLast != a ) {
					this.aLast=a;
					this.do=0;
					return setTimeout(function() {	touchHandler[face.pageCurr](a,tfk.x+20,tfk.y);},0);
				}
				return;
			}
		}else if ( tp[3] == 64 && !this.st ) {
			if (this.do===1){
				this.do=0;
				//tfk.emit('touch',5,this.x,this.y) ;
				return setTimeout(function() {touchHandler[face.pageCurr](5,tfk.x+20,tfk.y);},0);
			}
			this.aLast=0;
			this.st = 1;
			this.time = 0;
		}
	},
	start:function(){ 
		"ram";
		if (this.tid) clearInterval(this.tid);
		digitalPulse(set.def.rstP,1,[10,50]); //touch wake
		i2c.writeTo(0x15,0);
		this.st=1;
		this.tid=setInterval(function(){
			tfk.init();
		},this.loop);
	},
	exit:function(){
		"ram";
		if (this.tid) clearInterval(this.tid);this.tid=0;
		digitalPulse(set.def.rstP,1,[5,50]);setTimeout(()=>{i2c.writeTo(0x15,0xA5,3);},100);
		this.aLast=0;
		this.st = 1;
		this.time = 0;
	}
};


tfk.on('touch',touchHandler.go);

}
//tfk.emit('touch',Date().getHours());cron.event.hour();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours()+1,0,1)-Date()));},
//tfk.emit('touch',(1,2,1));},
//i2c.writeTo(0x15,254,1);i2c.writeTo(0x15,100)
//lala=setInterval(()=>{ 
//print(i2c.readFrom(0x15,5));
//},50)

//
set.def.acctype="SC7A20";
//accelerometer(wake on wrist turn)
//based on work from jeffmer
	acc={
		up:0,
		//ori:[65,66],
		ori:[65,66],
		loop:0,
		tid:0,
		on:function(v){
			i2c.writeTo(0x18,0x20,0x4f); //CTRL_REG1 20h ODR3 ODR2 ODR1 ODR0 LPen Zen Yen Xen , 50hz, lpen1. zyx
			i2c.writeTo(0x18,0x21,0x00); //highpass filter disabled
			i2c.writeTo(0x18,0x22,0x40); //ia1 interrupt to INT1
			i2c.writeTo(0x18,0x23,0x80); //1000 BDU,MSB at high addr, 1000 HR low
			i2c.writeTo(0x18,0x24,0x00); // latched interrupt off
			i2c.writeTo(0x18,0x25,0x00); //no Interrupt2 , no int polatiry
			i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
			i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
			i2c.writeTo(0x18,0x30,0x02); //int1 to xh
			this.mode=(v)?v:0;
			this.init(v);
		},
		off:function(){
			if (this.tid){
				if (this.mode==2) clearInterval(this.tid);
				else clearWatch(this.tid);
				this.tid=0;
			}
			i2c.writeTo(0x18,0x20,0x07); //Clear LPen-Enable all axes-Power down
			i2c.writeTo(0x18,0x26);
			i2c.readFrom(0x18,1);// Read REFERENCE-Reset filter block 
			return true;
		},
		init:function(v){
			"ram";
			if (v==2) {
				i2c.writeTo(0x18,0x22,0x00); //ia1 interrupt to INT1
				i2c.writeTo(0x18,0x30,0x00); //int1 to xh
				i2c.writeTo(0x18,0x32,5); //int1_ths-threshold = 250 milli g's
				i2c.writeTo(0x18,0x33,15); //duration = 1 * 20ms
				if (this.loop) { clearInterval(this.loop); this.loop=0;}
				this.tid= setInterval(()=>{	
					let cor=acc.read();
					//print (cor.ax,cor.ay,cor.az);
					if (-200<=cor.ax && cor.ay<=500  && 500<cor.az ) {
						if (!w.gfx.isOn&&face.appCurr!=""&&this.up){  
								face.go(set.dash[set.def.dash.face],0);
						}else {
							let tout=set.def.off[face.appCurr];
							if ( !tout || ( tout &&  tout <= 60000)) 
								face.off(1500);
						}
						this.up=0;
					} else this.up=1;
				},100);
				return true;
			}else if (!this.tid) {
				i2c.writeTo(0x18,0x32,20); //int1_ths-threshold = 250 milli g's
				i2c.writeTo(0x18,0x33,1); //duration = 1 * 20ms
				this.tid=setWatch(()=>{
					i2c.writeTo(0x18,0x1);
					if ( 10 < i2c.readFrom(0x18,1)[0] && i2c.readFrom(0x18,1)[0] < 192) {
						if (!w.gfx.isOn){  
							if (face.appCurr=="main") face.go("main",0);
							else face.go(face.appCurr,0);
						}else  if (set.tor==1)w.gfx.bri.set(face[0].cbri);
						else face.off(); 
					} else {
						let tout=set.def.off[face.appCurr];
						if ( !tout || ( tout &&  tout <= 60000)) 
							face.off(500);
					}
				},ew.pin.acc.INT,{repeat:true,edge:"rising",debounce:50});
				return true;
			} else return false;
		},
		read:function(){
			"ram";
			i2c.writeTo(0x18,0xA8);
			var a =i2c.readFrom(0x18,6);
			return {ax:this.conv(a[0],a[1]), ay:this.conv(a[2],a[3]), az:this.conv(a[4],a[5])};
		},
		conv:function(lo,hi){
			"ram";
			let i = (hi<<8)+lo;
			return ((i & 0x7FFF) - (i & 0x8000))/16;
		}
	};	

cron={
	event:{
		//date:()=>{ setTimeout(() =>{ cron.emit('dateChange',Date().getDate());cron.event.date();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate()+1)-Date()));},
		hour:()=>{setTimeout(() =>{ cron.emit('hour',Date().getHours());cron.event.hour();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours()+1,0,1)-Date()));},
		//min: ()=>{setTimeout(() =>{ cron.emit('min',Date().getMinutes());cron.event.min();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes()+1)-Date()));},
		//sec:()=>{setTimeout(() =>{ cron.emit('sec',Date().getSeconds());cron.event.sec();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes(),Date().getSeconds()+1)-Date()));},
	},
	task:{
		euc:{
			hour:x=>{
				if (!Date().getHours()) {
					cron.emit('day',Date().getDay());
					if (Date().getDate()==1) cron.emit('month',Date().getMonth());
				}
				let pr=(!x)?23:x-1;
				if (euc.log.trp[0]) {
					let v=set.read("logDaySlot"+set.def.dash.slot,pr);
					set.write("logDaySlot"+set.def.dash.slot,pr,((euc.log.trp[0])?euc.dash.trpT-euc.log.trp[0]:0)+((v)?v:0));
				}
				require('Storage').list("logDaySlot").forEach(logfile=>{set.write(logfile.split(".")[0],x);});
				euc.log.trp[0]=0;
			},
			day:x=>{
				let pr=(!x)?6:x-1;
				if (euc.log.trp[1]) {
					let v=set.read("logWeekSlot"+set.def.dash.slot,pr);
					set.write("logWeekSlot"+set.def.dash.slot,pr,((euc.log.trp[1])?euc.dash.trpT-euc.log.trp[1]:0)+((v)?v:0));
				}
				require('Storage').list("logWeekSlot").forEach(logfile=>{set.write(logfile.split(".")[0],x);});
				euc.log.trp[1]=0;
			},
			month:x=>{
				let pr=(!x)?11:x-1;
				if (euc.log.trp[2]) {
					let v=set.read("logYearSlot"+set.def.dash.slot,pr);
					set.write("logYearSlot"+set.def.dash.slot,pr,((euc.log.trp[2])?euc.dash.trpT-euc.log.trp[2]:0)+((v)?v:0));
				}
				require('Storage').list("logYearSlot").forEach(logfile=>{set.write(logfile.split(".")[0],x);});
				euc.log.trp[2]=0;
			}
		}
	}
};

cron.event.hour();
cron.on('hour',cron.task.euc.hour);
cron.on('day',cron.task.euc.day);
cron.on('month',cron.task.euc.month);



