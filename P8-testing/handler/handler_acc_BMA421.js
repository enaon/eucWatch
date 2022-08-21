//acc BMA421
i2c.writeTo(0x18,0x40,0x17);
i2c.writeTo(0x18,0x7c,0x03);
acc={
	loop:200,
	tid:0,
	run:0,
	up:0,
	on:function(v){
		if (this.tid) {clearInterval(this.tid); this.tid=0;}
		i2c.writeTo(0x18,0x7d,0x04);
		i2c.writeTo(0x18,0x12);
		this.yedge=253;this.xedge=20;
		this.run=1;
		if (v==2) {
			this.tid=setInterval(function(t){
				"ram";
				t.euc(); 
			},this.loop,this);	
		}else {	 
			this.tid=setInterval(function(t){
				t.init(); 
			},this.loop,this);
		}
	},
	off:function(){
		if (this.tid) {clearInterval(this.tid); this.tid=0;}
		i2c.writeTo(0x18,0x7d,0x04);
		this.run=0;
	},
	euc:function(){
		"ram";
		let data=i2c.readFrom(0x18,6);
		//print(data);
		if (220<data[3]&&data[3]<255) {
			if (data[1]<this.xedge||data[1]>=240) {
				if (!this.up&&!w.gfx.isOn){  
					face.go(ew.is.dash[ew.def.dash.face],0);
				}else if (w.gfx.isOn&&face.pageCurr!=-1) {
					if ( !ew.def.off[face.appCurr] || ( ew.def.off[face.appCurr] &&  ew.def.off[face.appCurr] <= 60000))
						face.off(2000);		
				} 
				this.up=1;
				changeInterval(acc.tid,1500);
			}
		}else if (this.up && data[3] < 210 ) {
			if ( !ew.def.off[face.appCurr] || ( ew.def.off[face.appCurr] &&  ew.def.off[face.appCurr] <= 60000)) {
				face.off(1500);	
			}	
			this.up=0;
			changeInterval(acc.tid,100);
		}
	},
	init:function(){
		if(!this.run) return;
		let data=i2c.readFrom(0x18,6);
		//print("acc :",data);
		//if (!this.up && 230<data[3]&&data[3]<this.yedge) {
		if (230<data[3]&&data[3]<this.yedge) {
			if (data[1]<this.xedge||data[1]>=220) {
				if (!this.up&&!w.gfx.isOn&&face.appCurr!=""){  
						if  (global.euc) {
							if (global.euc&&euc.state!="OFF") face.go(ew.is.dash[ew.def.dash.face],0);
							else{if (face.appCurr=="clock") face.go("clock",0);else face.go(face.appCurr,0);}
						}else{ 
							if (face.appCurr=="clock") face.go("clock",0);
							else face.go(face.appCurr,0);
						}
						changeInterval(acc.tid,1000);
				}else if (w.gfx.isOn&&face.pageCurr!=-1) {
					if (ew.is.tor==1)w.gfx.bri.set(face[0].cbri); 
					else if ( !ew.def.off[face.appCurr] || ( ew.def.off[face.appCurr] &&  ew.def.off[face.appCurr] <= 60000))
						face.off(1500);		
					changeInterval(acc.tid,200);
				} 
				this.up=1;
			}
		}else if (this.up && data[3] < 220 ) {
			if (ew.is.tor==1)
				w.gfx.bri.set(7);	
			else if ( !ew.def.off[face.appCurr] || ( ew.def.off[face.appCurr] &&  ew.def.off[face.appCurr] <= 60000)) {
				face.off(1500);	
				this.loop=300;
			}	
			this.up=0;
		}
	}
};	