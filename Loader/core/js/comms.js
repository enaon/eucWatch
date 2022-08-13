Puck.debug=0;
console.log("=============================================")
console.log("Type 'Puck.debug=3' for full BLE debug info")
console.log("=============================================")

// TODO: Add Comms.write/eval which return promises, and move over to using those
// FIXME: use UART lib so that we handle errors properly
const Comms = {
  // Write the given data, returns a promise
  write : (data) => new Promise((resolve,reject) => {
    return Puck.write(data,function(result) {
      if (result===null) return reject("");
      resolve(result);
    });
  }),
  // Show a message on the screen (if available)
  showMessage : (txt) => {
    console.log(`<COMMS> showMessage ${JSON.stringify(txt)}`);
    if (!Const.HAS_E_SHOWMESSAGE) return Promise.resolve();
    return Comms.write(`\x10E.showMessage(${JSON.stringify(txt)})\n`);
  },
  // When upload is finished, show a message (or reload)
  showUploadFinished : () => {
    if (Const.LOAD_APP_AFTER_UPLOAD || Const.SINGLE_APP_ONLY) return Comms.write("\x10load()\n");
    else return Comms.showMessage(Const.MESSAGE_RELOAD);
  },
  // Gets a text command to append to what's being sent to show progress. If progress==undefined, it's the first command
  getProgressCmd : (progress) => {
    console.log(`<COMMS> getProgressCmd ${JSON.stringify(progress)}`);
    if (!Const.HAS_E_SHOWMESSAGE) {
      if (progress===undefined) return "p=x=>digitalPulse(LED1,1,10);";
      return "p();";
    } else {
      if (progress===undefined) return Const.CODE_PROGRESSBAR;
      return `p(${Math.round(progress*100)});`
    }
  },
  // Reset the device, if opt=="wipe" erase any saved code
  reset : (opt) => new Promise((resolve,reject) => {
    let tries = 8;
    console.log("<COMMS> reset");
    Puck.write(`\x03\x10reset(${opt=="wipe"?"1":""});\n`,function rstHandler(result) {
      console.log("<COMMS> reset: got "+JSON.stringify(result));
      if (result===null) return reject("Connection failed");
      if (result=="" && (tries-- > 0)) {
        console.log(`<COMMS> reset: no response. waiting ${tries}...`);
        Puck.write("\x03",rstHandler);
      } else {
        console.log(`<COMMS> reset: complete.`);
        setTimeout(resolve,250);
      }
    });
  }),
  // Upload an app
  uploadApp : (app,skipReset) => { // expects an apps.json structure (i.e. with `storage`)
    Progress.show({title:`Uploading ${app.name}`,sticky:true});
    return AppInfo.getFiles(app, {
      fileGetter : httpGet,
      settings : SETTINGS
    }).then(fileContents => {
      return new Promise((resolve,reject) => {
        console.log("<COMMS> uploadApp:",fileContents.map(f=>f.name).join(", "));
        let maxBytes = fileContents.reduce((b,f)=>b+f.cmd.length, 0)||1;
        let currentBytes = 0;

        let appInfoFileName = AppInfo.getAppInfoFilename(app);
        let appInfoFile = fileContents.find(f=>f.name==appInfoFileName);
        let appInfo = undefined;
        if (appInfoFile)
          appInfo = JSON.parse(appInfoFile.content);
        else if (app.type!="RAM")
          reject(`${appInfoFileName} not found`);

        // Upload each file one at a time
        function doUploadFiles() {
        // No files left - print 'reboot' message
          if (fileContents.length==0) {
            Comms.showUploadFinished().then(() => {
              console.log("ew-filed end");
              Progress.hide({sticky:true});
              resolve(appInfo);
            }).catch(function() {
              reject("");
            });
            return;
          }
          let f = fileContents.shift();
          console.log(`<COMMS> Upload ${f.name} => ${JSON.stringify(f.content)}`);
          // Chould check CRC here if needed instead of returning 'OK'...
          // E.CRC32(require("Storage").read(${JSON.stringify(app.name)}))

          /* we can't just split on newline, because some commands (like
          an upload when evaluate:true) may contain newline in the command.
          In the absence of bracket counting/etc we'll just use the \x10
          char we use to signify echo(0) for a line */
          let cmds = f.cmd.split("\x10").filter(l=>l!="").map(l=>"\x10"+l.trim());
          // Function to upload a single line and wait for an 'OK' response
          function uploadCmd() {
            if (!cmds.length) return doUploadFiles();
            let cmd = cmds.shift();
            Progress.show({
              min:currentBytes / maxBytes,
              max:(currentBytes+cmd.length) / maxBytes});
            currentBytes += cmd.length;
            //Puck.write(`${cmd};Bluetooth.println("OK")\n`,(result) => {
            Puck.write(`${cmd};${Comms.getProgressCmd(currentBytes / maxBytes)}Bluetooth.println("OK")\n`,(result) => {
              if (!result || result.trim()!="OK") {
                Progress.hide({sticky:true});
                return reject("Unexpected response "+(result||""));
              }
              uploadCmd();
              //setTimeout(()=>{uploadCmd();},100);
            }, true); // wait for a newline
          }
          uploadCmd();
        }
        // Start the upload
        function doUpload() {
          Comms.showMessage(`Uploading\n${app.id}...`).
            then(() => Comms.write("\x10"+Comms.getProgressCmd()+"\n")).
            then(() => {
              doUploadFiles();
            }).catch(function() {
              Progress.hide({sticky:true});
              return reject("");
            });
        }
        if (skipReset) {
          doUpload();
        } else {
        // reset to ensure we have enough memory to upload what we need to
          Comms.reset().then(doUpload, reject)
        }
      });
    });
  },
  // Get Device ID and version, plus a JSON list of installed apps
  getDeviceInfo : (noReset) => {
    Progress.show({title:`Getting app list...`,sticky:true});
    return new Promise((resolve,reject) => {
      Puck.write("\x03",(result) => {
        if (result===null) {
          Progress.hide({sticky:true});
          return reject("");
        }
        console.log("<COMMS> Ctrl-C gave",JSON.stringify(result));
        if (result.includes("ERROR") && !noReset) {
          console.log("<COMMS> Got error, resetting to be sure.");
          // If the ctrl-c gave an error, just reset totally and
          // try again (need to display 'BTN3' message)
          Comms.reset().
            then(()=>Comms.showMessage(Const.MESSAGE_RELOAD)).
            then(()=>Comms.getDeviceInfo(true)).
            then(resolve);
          return;
        }

        let cmd, finalJS = `E.toJS([process.env.BOARD,process.env.VERSION]).substr(1)`;
        if (Const.SINGLE_APP_ONLY) // only one app on device, info file is in app.info
          cmd = `\x10Bluetooth.println("["+(require("Storage").read("app.info")||"null")+","+${finalJS})\n`;
        else
          cmd = `\x10Bluetooth.print("[");require("Storage").list(/\\.info$/).forEach(f=>{var j=require("Storage").readJSON(f,1)||{};Bluetooth.print(JSON.stringify(j)+",")});Bluetooth.println(${finalJS})\n`; //ew
          ///cmd = `\x10Bluetooth.print("[");require("Storage").list(/\\.info$/).forEach(f=>{var j=require("Storage").readJSON(f,1)||{};Bluetooth.print(JSON.stringify({id:f.slice(0,-5),version:j.version})+",")});Bluetooth.println(${finalJS})\n`;

        Puck.write(cmd, (appListStr,err) => {
          Progress.hide({sticky:true});
          if (appListStr=="") {
            return reject("No response from device. Is 'Programmable' set to 'Off'?");
          }
          let info = {};
          let appList;
          try {
            appList = JSON.parse(appListStr);
            // unpack the last 2 elements which are board info
            info.version = appList.pop();
            info.id = appList.pop();
            // if we just have 'null' then it means we have no apps
            if (appList.length==1 && appList[0]==null)
              appList = [];
          } catch (e) {
            appList = null;
            console.log("<COMMS> ERROR Parsing JSON",e.toString());
            console.log("<COMMS> Actual response: ",JSON.stringify(appListStr));
            err = "Invalid JSON";
          }
          if (appList===null) return reject(err || "");
          info.apps = appList;
          console.log("<COMMS> getDeviceInfo", info);
          resolve(info);
        }, true /* callback on newline */);
      });
    });
  },
  // Remove an app given an appinfo.id structure as JSON
  removeApp : app => { // expects an appid.info structure (i.e. with `files`)
    console.log("ll-1",app.files,app.data);
    console.log(app);
    if (!app.files && !app.data) return Promise.resolve(); // nothing to erase
    Progress.show({title:`Removing ${app.name}`,sticky:true});
    let cmds = '\x10const s=require("Storage");\n';
    // remove App files: regular files, exact names only
    cmds += app.files.split(',').map(file => `\x10s.erase(${toJS(file)});\n`).join("");
    // remove app Data: (dataFiles and storageFiles)
    const data = AppInfo.parseDataString(app.data)
    const isGlob = f => /[?*]/.test(f)
    //   regular files, can use wildcards
    cmds += data.dataFiles.map(file => {
      if (!isGlob(file)) return `\x10s.erase(${toJS(file)});\n`;
      const regex = new RegExp(globToRegex(file))
      return `\x10s.list(${regex}).forEach(f=>s.erase(f));\n`;
    }).join("");
    //   storageFiles, can use wildcards
    cmds += data.storageFiles.map(file => {
      if (!isGlob(file)) return `\x10s.open(${toJS(file)},'r').erase();\n`;
      // storageFiles have a chunk number appended to their real name
      const regex = globToRegex(file+'\u0001')
      // open() doesn't want the chunk number though
      let cmd = `\x10s.list(${regex}).forEach(f=>s.open(f.substring(0,f.length-1),'r').erase());\n`
      // using a literal \u0001 char fails (not sure why), so escape it
      return cmd.replace('\u0001', '\\x01')
    }).join("");
    console.log("<COMMS> removeApp", cmds);
    return Comms.reset().
      then(()=>Comms.showMessage(`Erasing\n${app.id}...`)).
      then(()=>Comms.write(cmds)).
      then(()=>Comms.showUploadFinished()).
      then(()=>Progress.hide({sticky:true})).
      catch(function(reason) {
        Progress.hide({sticky:true});
        return Promise.reject(reason);
      });
  },
  // Remove all apps from the device
  removeAllApps : () => {
    console.log("<COMMS> removeAllApps start");
    Progress.show({title:"Removing all apps",percent:"animate",sticky:true});
    return new Promise((resolve,reject) => {
      let timeout = 5;
      function handleResult(result,err) {
        console.log("<COMMS> removeAllApps: received "+JSON.stringify(result));
        if (result=="" && (timeout--)) {
          console.log("<COMMS> removeAllApps: no result - waiting some more ("+timeout+").");
          // send space and delete - so it's something, but it should just cancel out
          Puck.write(" \u0008", handleResult, true /* wait for newline */);
        } else {
          Progress.hide({sticky:true});
          if (!result || result.trim()!="OK") {
            if (!result) result = "No response";
            else result = "Got "+JSON.stringify(result.trim());
            return reject(err || result);
          } else resolve();
        }
      }
      // Use write with newline here so we wait for it to finish
      //let cmd = '\x10E.showMessage("Erasing...");require("Storage").eraseAll();Bluetooth.println("OK");reset()\n';
	  let cmd = '\x10require("Storage").eraseAll();Bluetooth.println("OK");reset()\n';
      Puck.write(cmd, handleResult, true /* wait for newline */);
    });
  },
  // Set the time on the device
  setTime : () => {
    let d = new Date();
    let tz = d.getTimezoneOffset()/-60
    let cmd = '\x03\x10setTime('+(d.getTime()/1000)+');';
    // in 1v93 we have timezones too
    cmd += 'E.setTimeZone('+tz+');';
    cmd += "(s=>{s&&(s.timezone="+tz+")&&require('Storage').write('setting.json',s);})(require('Storage').readJSON('setting.json',1))\n";
    return Comms.write(cmd);
  },
  // Reset the device
  resetDevice : () => {
    let cmd = "reset();load()\n";
    return Comms.write(cmd);
  },
  
  writeSettings : (val) => {
    return new Promise((resolve,reject) => {
      let cmd = '\x03\x10';
	cmd += `require('Storage').write('setting.json', ${val});`;
      Puck.write(cmd, (result) => {
        if (result===null) return reject("");
        resolve();
      });
    });
  },
  enableFlash : () => {
    return new Promise((resolve,reject) => {
      let cmd = '\x03\x10';
	cmd += `var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0}); spi.send([0xab],D5);`;
      Puck.write(cmd, (result) => {
        if (result===null) return reject("");
        resolve();
      });
    });
  },
  changeSettings : (file,id,val) => {
    return new Promise((resolve,reject) => {
      let cmd = '\x03\x10';
      cmd += "(s=>{s&&(s."+id+"='"+val+"')&&require('Storage').write('"+file+".json',s);})(require('Storage').readJSON('"+file+".json',1))\n";
      Puck.write(cmd, (result) => {
        if (result===null) return reject("");
        resolve();
      });
    });
  },
  readSettings : (file,id) => {
		return new Promise((resolve,reject) => {
			//let cmd = '\x03\x10';
			cmd = '';
			cmd += "require('Storage').readJSON('"+file+".json',1)."+id+"\n";
			Puck.eval(cmd, (resp,err) => {
				if (resp===null||resp===undefined) return reject(err || "");
				console.log("<COMMS> resp", resp);
				resolve(resp);
			});
		});
	},  
 
  // Force a disconnect from the device
  disconnectDevice: () => {
    let connection = Puck.getConnection();
    if (!connection) return;
    connection.close();
  },
  // call back when the connection state changes
  watchConnectionChange : cb => {
    let connected = Puck.isConnected();

    //TODO Switch to an event listener when Puck will support it
    let interval = setInterval(() => {
      if (connected === Puck.isConnected()) return;

      connected = Puck.isConnected();
      cb(connected);
    }, 1000);

    //stop watching
    return () => {
      clearInterval(interval);
    };
  },
  // List all files on the device
  listFiles : () => {
    return new Promise((resolve,reject) => {
      Puck.write("\x03",(result) => {
        if (result===null) return reject("");
        //use encodeURIComponent to serialize octal sequence of append files
        Puck.eval('require("Storage").list().map(encodeURIComponent)', (files,err) => {
          if (files===null) return reject(err || "");
          files = files.map(decodeURIComponent);
          console.log("<COMMS> listFiles", files);
          resolve(files);
        });
      });
    });
  },
  // Read a non-storagefile file
  readFile : (file) => {
    return new Promise((resolve,reject) => {
    //encode name to avoid serialization issue due to octal sequence
      const name = encodeURIComponent(file);
      Puck.write("\x03",(result) => {
        if (result===null) return reject("");
        //TODO: big files will not fit in RAM.
        //we should loop and read chunks one by one.
        //Use btoa for binary content
        Puck.eval(`btoa(require("Storage").read(decodeURIComponent("${name}"))))`, (content,err) => {
          if (content===null) return reject(err || "");
          resolve(atob(content));
        });
      });
    });
  },
  // Read a storagefile
  readStorageFile : (filename) => { // StorageFiles are different to normal storage entries
    return new Promise((resolve,reject) => {
    // Use "\xFF" to signal end of file (can't occur in files anyway)
      let fileContent = "";
      let fileSize = undefined;
      let connection = Puck.getConnection();
      connection.received = "";
      connection.cb = function(d) {
        let finished = false;
        let eofIndex = d.indexOf("\xFF");
        if (eofIndex>=0) {
          finished = true;
          d = d.substr(0,eofIndex);
        }
        fileContent += d;
        if (fileSize === undefined) {
          let newLineIdx = fileContent.indexOf("\n");
          if (newLineIdx>=0) {
            fileSize = parseInt(fileContent.substr(0,newLineIdx));
            console.log("<COMMS> readStorageFile size is "+fileSize);
            fileContent = fileContent.substr(newLineIdx+1);
          }
        } else {
          Progress.show({percent:100*fileContent.length / (fileSize||1000000)});
        }
        if (finished) {
          Progress.hide();
          connection.received = "";
          connection.cb = undefined;
          resolve(fileContent);
        }
      };
      console.log(`<COMMS> readStorageFile ${JSON.stringify(filename)}`);
      connection.write(`\x03\x10(function() {
      var f = require("Storage").open(${JSON.stringify(filename)},"r");
      Bluetooth.println(f.getLength());
      var l = f.readLine();
      while (l!==undefined) { Bluetooth.print(l); l = f.readLine(); }
      Bluetooth.print("\xFF");
    })()\n`,() => {
        Progress.show({title:`Reading ${JSON.stringify(filename)}`,percent:0});
        console.log(`<COMMS> StorageFile read started...`);
      });
    });
  }
};
