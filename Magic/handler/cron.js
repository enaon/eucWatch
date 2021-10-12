cron={
	test:(x) => {console.log(x);print("ok");},
	date:{
		year:0,
		mnth:0,
		day:0,
		hour:0,
		min:0,
		sec:0,
	},
	event:{
		//date:()=>{ setTimeout(() =>{ cron.emit('dateChange',Date().getDate());cron.event.date();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate()+1)-Date()));},
		hour:()=>{setTimeout(() =>{ cron.emit('hour'  ,Date().getHours());  cron.event.date();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours()+1)-Date()));},
		min: ()=>{setTimeout(() =>{ cron.emit('mine',Date().getMinutes());cron.event.min();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes()+1)-Date()));},
		sec:()=>{setTimeout(() =>{ cron.emit('sec',Date().getSeconds());cron.event.sec();},(Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes(),Date().getSeconds()+1)-Date()));},
	},
	task:{
    euc:{
		Hour:x=>{
			let v=set.read("logDaySlot"+set.def.dash.slot,x-1);
			set.write("logDaySlot"+set.def.dash.slot,x-1,((euc.log.trpS)?euc.dash.trpT-euc.log.trpS:0)+((v)?v:0));
			set.write("logDaySlot"+set.def.dash.slot,x,0); 
		}
    }
  }
};

cron.on('hour', x => console.log(x));
cron.on('min', x => console.log(x));
cron.on('sec', x => console.log("sec:",x));
cron.event.sec();




cron.removeAllListeners('hourChange');






     let date= new Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes() ); 
    if (date < Date()) {
      date.setDate(date.getDate() + 1);
    }
    var diff=date-Date();
	
	
	function tick() {
  //get the mins of the current time
  var mins = new Date().getMinutes();
  if (mins == "00") {
    alert('Do stuff');
  }
  console.log('Tick ' + mins);
}

setInterval(tick, 1000);

let date= new Date(Date().getFullYear(),Date().getMonth(),Date().getDate(),Date().getHours(),Date().getMinutes() );


let date=Date();
Date().setHours(date.getHours()+1 );
date.setDate(date.getDate() + 1);


now
Date()/1000 ==== getTime();

setTime(Date()/1000)

hour up
setTime(Date().setHours(Date().getHours()+1)/1000)
hour dn
setTime(Date().setHours(Date().getHours()-1)/1000)
minup
setTime(Date().setMinutes(Date().getMinutes()+1)/1000)
min dn
setTime(Date().setMinutes(Date().getMinutes()-1)/1000)
day up
setTime(Date().setDate(Date().getDate()+1)/1000)
day dn
setTime(Date().setDate(Date().getDate()-1)/1000)
month up
setTime(Date().setMonth(Date().getMonth()+1)/1000)
month dn
setTime(Date().setMonth(Date().getMonth()-1)/1000)
year up
setTime(Date().setFullYear(Date().getFullYear()+1)/1000)
yesr dn
setTime(Date().setFullYear(Date().getFullYear()-1)/1000)
























emit

var o = {}; 
o.on('answer', x => console.log(x));


function printAnswer(d) {
  console.log("The answer is", d);
}
function printAnswer1(d) {
  console.log("The answer1 is", d);
}


o.emit('answer', 42);
o.emit('answer', 43);
o.emit('answer', 44);

o.on('answer', printAnswer);
o.on('answer', printAnswer1);

o.removeListener('answer', printAnswer);
o.removeAllListeners('answer')


o.emit('answer', 42);


var o = {}; // o can be any object...
// call an arrow function when the 'answer' event is received
o.on('answer', x => console.log(x));
// call a named function when the 'answer' event is received
function printAnswer(d) {
  console.log("The answer is", d);
}
o.on('answer', printAnswer);
// emit the 'answer' event - functions added with 'on' will be executed
o.emit('answer', 42);
// prints: 42
// prints: The answer is 42
// If you have a named function, it can be removed by name
o.removeListener('answer', printAnswer);
// Now 'printAnswer' is removed
o.emit('answer', 43);
// prints: 43
// Or you can remove all listeners for 'answer'
o.removeAllListeners('answer')
// Now nothing happens
o.emit('answer', 44);
// nothing printed


