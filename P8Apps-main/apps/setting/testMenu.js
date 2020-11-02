var boolean = false;
var number = 50;
// First menu
var mainmenu = {
  "" : { "title" : "-- Main Menu --" },
  "Backlight On" : function() { console.log("On"); },
  "Backlight Off" : function() { console.log("Off");  },
  "Submenu" : function() { showMenu(submenu); },
  "A Boolean" : {
    value : boolean,
    format : v => v?"On":"Off",
    onchange : v => { boolean=v; }
  },
  "A Number" : {
    value : number,
    min:0,max:100,step:10,
    onchange : v => { number=v; }
  },
  "Exit" : function() { showMenu(); }, // remove the menu
};
// Submenu
var submenu = {
  "" : { "title" : "-- SubMenu --" },
  "One" : undefined, // do nothing
  "Two" : undefined, // do nothing
  "< Back" : function() { showMenu(mainmenu); },
};

  