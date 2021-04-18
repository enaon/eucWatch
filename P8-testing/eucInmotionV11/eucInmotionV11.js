const primaryService      = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const writeCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
const readCharacteristic  = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
const connectionOptions = { minInterval: 7.5, maxInterval: 15 }
const waitTime = 500
const loopTime = 100
const maxVolt = 84
const minVolt = 60
const realTimeResponse = 51
const commands = {
  requestData:    [170, 170, 20, 1, 4, 17],
  drlOn:          [170, 170, 20, 3, 96, 45, 1, 91],
  drlOff:         [170, 170, 20, 3, 96, 45, 0, 90],
  lightsOn:       [170, 170, 20, 3, 96, 64, 1, 54],
  lightsOff:      [170, 170, 20, 3, 96, 64, 0, 55],
  fanOn:          [170, 170, 20, 3, 96, 67, 1, 53],
  fanOff:         [170, 170, 20, 3, 96, 67, 0, 52],
  fanQuietOn:     [170, 170, 20, 3, 96, 56, 1, 78],
  fanQuietOff:    [170, 170, 20, 3, 96, 56, 0, 79],
  liftOn:         [170, 170, 20, 3, 96, 46, 1, 88],
  liftOff:        [170, 170, 20, 3, 96, 46, 0, 89],
  lock:           [170, 170, 20, 3, 96, 49, 1, 71],
  unlock:         [170, 170, 20, 3, 96, 49, 0, 70],
  transportOn:    [170, 170, 20, 3, 96, 50, 1, 68],
  transportOff:   [170, 170, 20, 3, 96, 50, 0, 69],
  rideComfort:    [170, 170, 20, 3, 96, 35, 0, 84],
  rideSport:      [170, 170, 20, 3, 96, 35, 1, 85],
  performanceOn:  [170, 170, 20, 3, 96, 36, 1, 82],
  performanceOff: [170, 170, 20, 3, 96, 36, 0, 83],
  remainderReal:  [170, 170, 20, 3, 96, 61, 1, 75],
  remainderEst:   [170, 170, 20, 3, 96, 61, 0, 74],
  lowBatLimitOn:  [170, 170, 20, 3, 96, 55, 1, 65],
  lowBatLimitOff: [170, 170, 20, 3, 96, 55, 0, 64],
  usbOn:          [170, 170, 20, 3, 96, 60, 1, 74],
  usbOff:         [170, 170, 20, 3, 96, 60, 0, 75],
  loadDetectOn:   [170, 170, 20, 3, 96, 54, 1, 64],
  loadDetectOff:  [170, 170, 20, 3, 96, 54, 0, 65],
  mute:           [170, 170, 20, 3, 96, 44, 0, 91],
  unmute:         [170, 170, 20, 3, 96, 44, 1, 90],
  calibration:    [170, 170, 20, 5, 96, 66, 1, 0, 1, 51],
  speedLimit: function(val) {
    var cmd = [170, 170, 20, 4, 96, 33]
    cmd.push((val * 100) & 0xFF)
    cmd.push(((val * 100) >> 8) & 0xFF)
    cmd.push(cmd.reduce(checksum))
    return cmd
  },
  pedalTilt: function(val) {
    var cmd = [170, 170, 20, 4, 96, 34]
    cmd.push((val * 100) & 0xFF)
    cmd.push(((val * 100) >> 8) & 0xFF)
    cmd.push(cmd.reduce(checksum))
    return cmd
  },
  pedalSensitivity: function(val) {
    var cmd = [170, 170, 20, 4, 96, 37, val, 100]
    cmd.push(cmd.reduce(checksum))
    return cmd
  },
  setBrightness: function(val) {
    var cmd = [170, 170, 20, 3, 96, 43, val]
    cmd.push(cmd.reduce(checksum))
    return cmd
  },
  setVolume: function(val) {
    var cmd = [170, 170, 20, 3, 96, 38, val]
    cmd.push(cmd.reduce(checksum))
    return cmd
  },
  playSound: function(val) {
    var cmd = [170, 170, 20, 4, 96, 65, val, 1]
    cmd.push(cmd.reduce(checksum))
    return cmd
  }
}

function checksum(check, val) {
  return (check ^ val) & 0xFF
}

function validateChecksum(buffer) {
  receivedChecksum = buffer[buffer.length - 1]
  array = new Uint8Array(buffer, 0, buffer.length - 1)
  calculatedChecksum = array.reduce(checksum)

  return receivedChecksum == calculatedChecksum
}

function mainLoop(event) {
  var data = event.target.value

  if (data.buffer[3] != realTimeResponse || !validateChecksum(data.buffer)) {
    setTimeout(() => euc.wri('requestData'), loopTime)
    return
  }

  var volt = data.getInt16(5, true) / 100
  euc.dash.bat = Math.round(((volt - minVolt) * 100) / (maxVolt - minVolt))
  euc.dash.amp = Math.round(data.getInt16(7, true) / 100)
  euc.dash.spd = Math.round(data.getInt16(9, true) / 100)

  setTimeout(() => euc.wri('requestData'), loopTime)
}

euc.conn = function(mac) {
  if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
    return global['\xFF'].BLE_GATTS.disconnect()
  }

  if (euc.state == 'OFF') { return }

  NRF.connect(mac, connectionOptions).then(gatt => {
    gatt.device.on('gattserverdisconnected', () => setTimeout(euc.conn, waitTime, mac))
    gatt.getPrimaryService(primaryService).then(service => {
      service.getCharacteristic(readCharacteristic).then(characteristic => {
        characteristic.on('characteristicvaluechanged', mainLoop)
        characteristic.startNotifications().then(() => {
          service.getCharacteristic(writeCharacteristic).then(characteristic => {
            euc.wri = function(cmd, value) {
              if (value == undefined) {
                characteristic.writeValue(commands[cmd])
              } else {
                characteristic.writeValue(commands[cmd](value))
              }
            }
            // Start Mainloop
            euc.wri('requestData')
            euc.state = 'READY'
          })
        })
      })
    })
  })
}
