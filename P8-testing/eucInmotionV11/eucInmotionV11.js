const primaryService      = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const writeCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const readCharacteristic  = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const connectionOptions = { minInterval: 7.5, maxInterval: 15 };
const waitTime = 500;
const loopTime = 100;
const maxVolt = 84;
const minVolt = 60;
const realTimeResponse = 51;
euc.cmd=function(no,val){
	switch (no) {
		case "requestData": return  [170, 170, 20, 1, 4, 17];
		case "drlOn": return          [170, 170, 20, 3, 96, 45, 1, 91];
		case "drlOff": return         [170, 170, 20, 3, 96, 45, 0, 90];
		case "lightsOn": return       [170, 170, 20, 3, 96, 64, 1, 54];
		case "lightsOff": return      [170, 170, 20, 3, 96, 64, 0, 55];
		case "fanOn": return          [170, 170, 20, 3, 96, 67, 1, 53];
		case "fanOff": return         [170, 170, 20, 3, 96, 67, 0, 52];
		case "fanQuietOn": return     [170, 170, 20, 3, 96, 56, 1, 78];
		case "fanQuietOff": return    [170, 170, 20, 3, 96, 56, 0, 79];
		case "liftOn": return         [170, 170, 20, 3, 96, 46, 1, 88];
		case "liftOff": return        [170, 170, 20, 3, 96, 46, 0, 89];
		case "lock": return           [170, 170, 20, 3, 96, 49, 1, 71];
		case "unlock": return         [170, 170, 20, 3, 96, 49, 0, 70];
		case "transportOn": return    [170, 170, 20, 3, 96, 50, 1, 68];
		case "transportOff": return   [170, 170, 20, 3, 96, 50, 0, 69];
		case "rideComfort": return    [170, 170, 20, 3, 96, 35, 0, 84];
		case "rideSport": return      [170, 170, 20, 3, 96, 35, 1, 85];
		case "performanceOn": return  [170, 170, 20, 3, 96, 36, 1, 82];
		case "performanceOff": return [170, 170, 20, 3, 96, 36, 0, 83];
		case "remainderReal": return  [170, 170, 20, 3, 96, 61, 1, 75];
		case "remainderEst": return   [170, 170, 20, 3, 96, 61, 0, 74];
		case "lowBatLimitOn": return  [170, 170, 20, 3, 96, 55, 1, 65];
		case "lowBatLimitOff": return [170, 170, 20, 3, 96, 55, 0, 64];
		case "usbOn": return          [170, 170, 20, 3, 96, 60, 1, 74];
		case "usbOff": return         [170, 170, 20, 3, 96, 60, 0, 75];
		case "loadDetectOn": return   [170, 170, 20, 3, 96, 54, 1, 64];
		case "loadDetectOff": return  [170, 170, 20, 3, 96, 54, 0, 65];
		case "mute": return           [170, 170, 20, 3, 96, 44, 0, 91];
		case "unmute": return         [170, 170, 20, 3, 96, 44, 1, 90];
		case "calibration": return    [170, 170, 20, 5, 96, 66, 1, 0, 1, 51];
		case "speedLimit": return  function(val) {
			var cmd = [170, 170, 20, 4, 96, 33];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
		case "speedLimit": return  function(val) {
			var cmd = [170, 170, 20, 4, 96, 34];
			cmd.push((val * 100) & 0xFF);
			cmd.push(((val * 100) >> 8) & 0xFF);
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
		case "pedalSensitivity": return  function(val) {
			var cmd = [170, 170, 20, 4, 96, 37, val, 100];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
		case "setBrightness": return  function(val) {
			var cmd = [170, 170, 20, 3, 96, 43, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
		case "setVolume": return  function(val) {
			var cmd = [170, 170, 20, 3, 96, 38, val];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
		case "playSound": return  function(val) {
			var cmd = [170, 170, 20, 4, 96, 65, val, 1];
			cmd.push(cmd.reduce(checksum));
			return cmd;
		};
	}
};

function checksum(check, val) {
  return (check ^ val) & 0xFF;
}

function validateChecksum(buffer) {
  receivedChecksum = buffer[buffer.length - 1];
  array = new Uint8Array(buffer, 0, buffer.length - 1);
  calculatedChecksum = array.reduce(checksum);

  return receivedChecksum == calculatedChecksum;
}

function mainLoop(event) {
  var data = event.target.value;

  if (data.buffer[3] != realTimeResponse || !validateChecksum(data.buffer)) {
    //setTimeout(() => euc.wri('requestData'), loopTime);
    return;
  }

  euc.dash.volt = data.getInt16(5, true) / 100;
  euc.dash.bat = Math.round(((euc.dash.volt - minVolt) * 100) / (maxVolt - minVolt));
  euc.dash.amp = Math.round(data.getInt16(7, true) / 100);
  euc.dash.spd = Math.round(data.getInt16(9, true) / 100);

  //setTimeout(() => euc.wri('requestData'), loopTime)
}

euc.conn = function(mac) {
  if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
    return global['\xFF'].BLE_GATTS.disconnect();
  }

  if (euc.state == 'OFF') { return; }

  NRF.connect(mac, connectionOptions).then(gatt => {
    gatt.device.on('gattserverdisconnected', () => setTimeout(euc.conn, waitTime, mac));
    gatt.getPrimaryService(primaryService).then(service => {
      service.getCharacteristic(readCharacteristic).then(characteristic => {
        characteristic.on('characteristicvaluechanged', mainLoop);
        characteristic.startNotifications().then(() => {
          service.getCharacteristic(writeCharacteristic).then(characteristic => {
            euc.wri = function(cmd, value) {
              if (value == undefined) {
                characteristic.writeValue(euc.cmd[cmd]);
              } else {
                characteristic.writeValue(euc.cmd[cmd](value));
              }
            };
            // Start Mainloop
            euc.wri('requestData');
            euc.state = 'READY';
          });
        });
      });
    });
  });
};
