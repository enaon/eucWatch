E.setFlags({pretokenise:1});
//tasks
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
				if (euc.log.trip[0]) {
					let v=ew.do.fileRead("logDaySlot"+ew.def.dash.slot,pr);
					ew.do.fileWrite("logDaySlot"+ew.def.dash.slot,pr, (euc.log.trip[0]?euc.dash.trip.totl-euc.log.trip[0]:0)+(v?v:0) );
				}
				require('Storage').list("logDaySlot").forEach(logfile=>{ew.do.fileWrite(logfile.split(".")[0],x);});
				euc.log.trip[0]=0;
			},
			day:x=>{
				let pr=(!x)?6:x-1;
				if (euc.log.trip[1]) {
					let v=ew.do.fileRead("logWeekSlot"+ew.def.dash.slot,pr);
					ew.do.fileWrite("logWeekSlot"+ew.def.dash.slot,pr,((euc.log.trip[1])?euc.dash.trip.totl-euc.log.trip[1]:0)+((v)?v:0));
				}
				require('Storage').list("logWeekSlot").forEach(logfile=>{ew.do.fileWrite(logfile.split(".")[0],x);});
				euc.log.trip[1]=0;
			},
			month:x=>{
				let pr=(!x)?11:x-1;
				if (euc.log.trip[2]) {
					let v=ew.do.fileRead("logYearSlot"+ew.def.dash.slot,pr);
					ew.do.fileWrite("logYearSlot"+ew.def.dash.slot,pr,((euc.log.trip[2])?euc.dash.trip.totl-euc.log.trip[2]:0)+((v)?v:0));
				}
				require('Storage').list("logYearSlot").forEach(logfile=>{ew.do.fileWrite(logfile.split(".")[0],x);});
				euc.log.trip[2]=0;
			}
		}
	}
};


cron.event.hour();
cron.on('hour',cron.task.euc.hour);
cron.on('day',cron.task.euc.day);
cron.on('month',cron.task.euc.month);