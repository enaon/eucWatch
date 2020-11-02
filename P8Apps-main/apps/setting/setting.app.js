P8.setLCDTimeout(30);
const storage = require("Storage");
eval(storage.read("menu.js"));
eval(storage.read("prompt.js"));
var s = storage.readJSON("settings.json",1)||{ontime:5, bright:3, timezone:1, faceup:true};

function doreboot(){
  E.showPrompt("Rebooting will\nreset time.\nReboot?").then((b)=>{
      if (b) E.reboot(); else { E.showMenu(mainmenu);}
  });
}

var mainmenu = {
    "" : { "title" : "Settings" },
    'App/Widget Settings': ()=>showAppSettingsMenu(),
    "On Time" :{ value : s.ontime,
                  min:5,max:300,step:5,
                  onchange : v => { s.ontime=v;}
                },
    "Brightness" :{ value : s.bright,
                  min:1,max:7,step:1,
                  onchange : v => { brightness(v); s.bright=v;}
                },
    "Time Zone" :{ value : s.timezone,
                  min:-12,max:12,step:1,
                  onchange : v => {s.timezone=v;}
                },
    'Face UP Wake': {
                  value: s.faceup,
                  format: () => (s.faceup ? 'Yes' : 'No'),
                  onchange: () => {s.faceup = !s.faceup;}
                },
    'Reboot': ()=>{E.showMenu(); setTimeout(doreboot,300)},
    "Exit" : function() { storage.writeJSON("settings.json",s); load("launch.js");}
};

function showAppSettingsMenu() {
  let appmenu = {
    '': { 'title': 'App Settings' },
    '< Back': ()=>showMainMenu(),
  }
  const apps = storage.list(/\.settings\.js$/)
    .map(s => s.substr(0, s.length-12))
    .map(id => {
      const a=storage.readJSON(id+'.info',1) || {name: id};
      return {id:id,name:a.name,sortorder:a.sortorder};
    })
    .sort((a, b) => {
      const n = (0|a.sortorder)-(0|b.sortorder);
      if (n) return n; // do sortorder first
      if (a.name<b.name) return -1;
      if (a.name>b.name) return 1;
      return 0;
    })
  if (apps.length === 0) {
    appmenu['No app has settings'] = () => { };
  }
  apps.forEach(function (app) {
    appmenu[app.name] = () => { showAppSettings(app) };
  })
  E.showMenu(appmenu)
}
function showAppSettings(app) {
  const showError = msg => {
    E.showMessage(`${app.name}:\n${msg}!\n\nBTN1 to go back`);
    setWatch(showAppSettingsMenu, BTN1, { repeat: false });
  }
  let appSettings = storage.read(app.id+'.settings.js');
  try {
    appSettings = eval(appSettings);
  } catch (e) {
    console.log(`${app.name} settings error:`, e)
    return showError('Error in settings');
  }
  if (typeof appSettings !== "function") {
    return showError('Invalid settings');
  }
  try {
    // pass showAppSettingsMenu as "back" argument
    appSettings(()=>showAppSettingsMenu());
  } catch (e) {
    console.log(`${app.name} settings error:`, e)
    return showError('Error in settings');
  }
}

function showMainMenu() {E.showMenu(mainmenu);};
setTimeout(showMainMenu,500);
