const Const = {
  /* Are we only putting a single app on a device? If so
  apps should all be saved as .bootcde and we write info
  about the current app into app.info */
  SINGLE_APP_ONLY: false,

  /* Should the app loader call 'load' after apps have
  been uploaded? On Bangle.js we don't do this because we don't
  trust the default clock app not to use too many resources.
  Note: SINGLE_APP_ONLY=true enables LOAD_APP_AFTER_UPLOAD regardless */
  LOAD_APP_AFTER_UPLOAD: false,

  /* Does our device have E.showMessage? */
  HAS_E_SHOWMESSAGE: false,

  /* base URL, eg https://github.com/${username}/BangleApps/tree/master/apps for
  links when people click on the GitHub link next to an app. undefined = no link*/
  APP_SOURCECODE_URL: undefined,
  //APP_SOURCECODE_URL : `https://github.com/enaon/eucWatch/tree/main/P8/`,


  /* Message to display when an app has been loaded */
  MESSAGE_RELOAD: 'Hold BTN\nto reload',

  /* The code to upload to the device show a progress bar on the screen (should define a fn. called 'p') */
  CODE_PROGRESSBAR: "g.drawRect(10,g.getHeight()-16,g.getWidth()-10,g.getHeight()-8).flip();p=x=>g.fillRect(10,g.getHeight()-16,10+(g.getWidth()-20)*x/100,g.getHeight()-8).flip();",

  /* Icons to use in the UI for favourite (usually a heart) */
  FAVOURITE_INACTIVE_ICON: "&#x2661;",
  FAVOURITE_ACTIVE_ICON: "&#x2665;",
};

let DEVICEINFO = [{
    /*
        id : "BANGLEJS",
        name : "Bangle.js",
        features : ["BLE","BLEHID","GRAPHICS","ACCEL","MAG"],
        g : { width : 240, height : 240, bpp : 16 },
        img : "https://www.espruino.com/img/BANGLEJS_thumb.jpg"
      }, {
        id : "BANGLEJS2",
        name : "Bangle.js 2",
        features : ["BLE","BLEHID","GRAPHICS","ACCEL","MAG","PRESSURE","TOUCH"],
        g : { width : 176, height : 176, bpp : 3 },
        img : "https://www.espruino.com/img/BANGLEJS2_thumb.jpg"
      }, {
        id : "PUCKJS",
        name : "Puck.js",
        features : ["BLE","BLEHID","NFC","GYRO","ACCEL","MAG"],
        img : "https://www.espruino.com/img/PUCKJS_thumb.jpg"
      }, {
        id : "PIXLJS",
        name : "Pixl.js",
        features : ["BLE","BLEHID","NFC","GRAPHICS"],
        g : { width : 128, height : 64, bpp : 1 },
        img : "https://www.espruino.com/img/PIXLJS_thumb.jpg"
      }, {
        id : "MDBT42Q",
        name : "MDBT42Q",
        features : ["BLE","BLEHID"],
        img : "https://www.espruino.com/img/MDBT42Q_thumb.jpg"
      }, {*/
    id: "MAGIC3",
    name: "Magic3-Rock",
    features: ["ROCK", "V2", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/Magic3.jpg"
  },
  {
    id: "BANGLEJS2",
    name: "BANGLE 2",
    features: ["BANGLEJS2", "V2", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/bangle2.jpg"
  },
  {
    id: "P8",
    name: "P8-P22-pineTime",
    features: ["P8", "V1", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/p8.jpg"
  }, {
    id: "P22",
    name: "P22 B1/D",
    features: ["P22B", "V1", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/p22.jpg"
  },
  {
    id: "DSD6",
    name: "DSD6",
    features: ["DSD6", "V1", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/dsd6.jpg"
  },
  {
    id: "EUCLIGHT",
    name: "eucLight",
    features: ["DSD6", "V1", "EW"],
    img: "https://loader.eucwatch.com/tools/assets/images/eucLight.jpg"
  }
];

function escapeHtml(text) {
  let map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
// simple glob to regex conversion, only supports "*" and "?" wildcards
function globToRegex(pattern) {
  const ESCAPE = '.*+-?^${}()|[]\\';
  const regex = pattern.replace(/./g, c => {
    switch (c) {
      case '?':
        return '.';
      case '*':
        return '.*';
      default:
        return ESCAPE.includes(c) ? ('\\' + c) : c;
    }
  });
  return new RegExp('^' + regex + '$');
}

function htmlToArray(collection) {
  return [].slice.call(collection);
}

function htmlElement(str) {
  let div = document.createElement('div');
  div.innerHTML = str.trim();
  return div.firstChild;
}

function httpGet(url) {
  let isBinary = !(url.endsWith(".js") || url.endsWith(".json") || url.endsWith(".csv") || url.endsWith(".txt"));
  return new Promise((resolve, reject) => {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", () => {
      if (oReq.status != 200) {
        reject(oReq.status + " - " + oReq.statusText)
        return;
      }
      if (!isBinary) {
        resolve(oReq.responseText)
      }
      else {
        // ensure we actually load the data as a raw 8 bit string (not utf-8/etc)
        let a = new FileReader();
        a.onloadend = function() {
          let bytes = new Uint8Array(a.result);
          let str = "";
          for (let i = 0; i < bytes.length; i++)
            str += String.fromCharCode(bytes[i]);
          resolve(str)
        };
        a.readAsArrayBuffer(oReq.response);
      }
    });
    oReq.addEventListener("error", () => reject());
    oReq.addEventListener("abort", () => reject());
    oReq.open("GET", url, true);
    oReq.onerror = function() {
      reject("HTTP Request failed");
    };
    if (isBinary)
      oReq.responseType = 'blob';
    oReq.send();
  });
}

function toJS(txt) {
  return JSON.stringify(txt);
}
// callback for sorting apps
function appSorter(a, b) {
  if (a.unknown || b.unknown)
    return (a.unknown) ? 1 : -1;
  let sa = 0 | a.sortorder;
  let sb = 0 | b.sortorder;
  if (sa < sb) return -1;
  if (sa > sb) return 1;
  return (a.name == b.name) ? 0 : ((a.name < b.name) ? -1 : 1);
}

/* Given 2 JSON structures (1st from apps.json, 2nd from an installed app)
work out what to display re: versions and if we can update */
function getVersionInfo(appListing, appInstalled) {
  let versionText = "";
  let canUpdate = false;

  function clicky(v) {
    return `<a class="c-hand" onclick="showChangeLog('${appListing.id}')">${v}</a>`;
  }

  if (!appInstalled) {
    if (appListing.version)
      versionText = clicky("v" + appListing.version);
  }
  else {
    versionText = (appInstalled.version ? (clicky("v" + appInstalled.version)) : "Unknown version");
    if (appListing.version != appInstalled.version) {
      if (appListing.version) versionText += ", latest " + clicky("v" + appListing.version);
      canUpdate = true;
    }
  }
  return {
    text: versionText,
    canUpdate: canUpdate
  }
}

function versionLess(a, b) {
  let v = x => x.split(/[v.]/).reduce((a, b, c) => a + parseInt(b, 10) / Math.pow(1000, c), 0);
  return v(a) < v(b);
}

/* Ensure actualFunction is called after delayInMs,
but don't call it more often than needed if 'debounce'
is called multiple times. */
function debounce(actualFunction, delayInMs) {
  let timeout;

  return function debounced(...args) {
    const later = function() {
      clearTimeout(timeout);
      actualFunction(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delayInMs);
  };
}
