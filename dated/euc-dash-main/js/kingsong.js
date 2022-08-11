const debug = new URL(window.location.href).searchParams.get('debug')
const Decoder = new TextDecoder()
const maxCellVolt = 4.2
const baseCellSeries = 16

function modelParams() {
		let model={
			"14D":[1,340,420,680,840],
			"16D":[1,340,420,680,840,520], 
			"16S":[1,680,840,0,420], 
			"16X":[1.25,777,1554], 
			"18A":[1,0,0,0,520,680,1360,840,1680],
			"18S":[1,0,0,680,1360,840,1680],
			"18L":[1.25,0,1036,0,1554],
			"S18":[1.25,1110],
			"S20":[1.875,2220]
		};	
	
	
	
  switch(wheelModel) {
    case '14D':       return { 'voltMultiplier': 1.25, 'minCellVolt': 3.3 }
    case '16D':        return { 'voltMultiplier': 1.25, 'minCellVolt': 3.3 }
    case '16S':          return { 'voltMultiplier': 1.25, 'minCellVolt': 3.25 }
    case '16X':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    case '18A':  return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    case '18S':     return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    case '18L':     return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    case 'S18':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    case 'S20':      return { 'voltMultiplier': 1.50, 'minCellVolt': 3.25 }
    default:            return { 'voltMultiplier': 1,    'minCellVolt': 3.3 }
  }
}

function commands(cmd, param) {
  switch(cmd) {
    	case "manual":return param; 
		case "getModel":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,155,20,90,90]; 
		case "getSerial":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,20,90,90]; 
		case "getAlarms":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,20,90,90]; 
		case "doHorn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,20,90,90]; 
		case "doBeep":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,124,20,90,90]; 
		case "setLiftOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,20,90,90]; 
		case "getPowerOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "setPowerOff":return [170,85,1,0,(param & 255),((param >> 8) & 255),0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "doPowerOff":return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,64,20,90,90];
		case "setLights": if(!param)param=euc.night?3:2; return [170,85,17+param,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "getStrobe":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,20,90,90];
		case "setStrobeOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "getLedMagic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "setLedMagicOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,20,90,90];
		case "getLedRide":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,109,20,90,90];
		case "setLedRideOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,20,90,90];
		case "getSpectrum":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,20,90,90]; // to b checked
		case "setSpectrumOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,20,90,90]; 
		case "getSpectrumMode":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,150,20,90,90];
		case "setSpectrumMode":return [170,85,param?param:0,0,0,0,0,0,0,0,0,0,0,0,0,0,151,20,90,90];
		//BT music mode
		case "getBTMusic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,87,20,90,90];
		case "setBTMusicOnOff":return [170,85,param?1:0,0,0,0,0,0,0,0,0,0,0,0,0,0,86,20,90,90];
		//voice
		case "getVoice":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,20,90,90];
		case "setVoiceOnOff":return [170,85,param?param:0,param?0:1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "setVoiceVolUp":return [170,85,255,0,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		case "setVoiceVolDn":return [170,85,0,255,0,0,0,0,0,0,0,0,0,0,0,0,149,20,90,90];
		//gyro
		case "doCalibrate": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,20,90,90];  
		case "getCalibrateTilt":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		case "setCalibrateTilt":return [170,85,1,0,param & 255,(param >> 8) & 255,0,0,0,0,0,0,0,0,0,0,138,20,90,90];
		//ride mode 0=hard,1=med,2=soft
		case "setRideMode":return [170,85,param?param:0,224,0,0,0,0,0,0,0,0,0,0,0,0,135,20,90,90];  
		case "getRideParamA":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,146,20,90,90]; 
		case "getRideParamB":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,20,90,90]; 
		case "getRideParamC":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,148,20,90,90]; 
		//lock
		case "doUnlock":return param; 
		case "doLock":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		case "doLockOnce":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71,20,90,90]; 
		case "getLock":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "getLockOnce":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,20,90,90];
		case "setLockOnOff":dash.live.lock=param?1:0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,93,20,90,90]; 
		//pass
		case "getPass": return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,20,90,90];
		case "setPass": 
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,65,20,90,90];
		case "setPassClear": 
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,66,20,90,90];
		case "setPassSend":
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),0,0,0,0,0,0,0,0,0,0,68,20,90,90]; 
		case "setPassChange":
			return [170,85,48+Number(dash.live.pass[0]),48+Number(dash.live.pass[1]),48+Number(dash.live.pass[2]),48+Number(dash.live.pass[3]),48+Number(dash.live.passOld[0]),48+Number(dash.live.passOld[1]),48+Number(dash.live.passOld[2]),48+Number(dash.live.passOld[3]),0,0,0,0,0,0,65,20,90,90]; //rf 43
		case "setAlarms":
			return [170,85,dash.live.limE[0]?dash.live.lim[0]:0,0,dash.live.limE[1]?dash.live.lim[1]:0,0,dash.live.lim[2],0,dash.live.lim[3],0,49,50,51,52,53,54,133,20,90,90];
		default:
			return param?param:[];
  }
}

const faultAlarms = {
  0: 'high power',
  1: 'high speed 2',
  2: 'high speed 1',
  3: 'low voltage',
  4: 'over voltage',
  5: 'high temperature',
  6: 'hall sensor error',
  7: 'transport mode'
}

async function sendCommand(cmd, param) {
  for (let byte of commands(cmd, param)) {
    await characteristic.writeValue(new Uint8Array([byte]))
    await new Promise(r => setTimeout(r, 250))
  }
}

async function scan() {
  device = await navigator.bluetooth.requestDevice({ filters: [
    { namePrefix: 'KS' },
    { services: [0xFFE0] },
  ],
  optionalServices: [0xFFE0],  
  
  })
  server = await device.gatt.connect()
  service = await server.getPrimaryService(0xFFE0)
  characteristic = await service.getCharacteristic(0xFFE1)
  await characteristic.startNotifications()
  characteristic.addEventListener('characteristicvaluechanged', readMainPackets)
  initialize()
}

async function initialize() {
  pwmAlarmSpeed = 0
  rendered = false
  wheelModel = ''
  document.getElementById('scan-disconnect').innerText = 'Disconnect'
  document.getElementById('scan-disconnect').className = 'btn-lg btn-danger'
  document.getElementById('scan-disconnect').onclick = disconnect
  document.getElementById('packet-switch').classList.remove('invisible')
  await sendCommand('getModel')
}

function disconnect() {
  device.gatt.disconnect()
  document.getElementById('scan-disconnect').innerText = 'Scan & Connect'
  document.getElementById('scan-disconnect').className = 'btn-lg btn-primary'
  document.getElementById('scan-disconnect').onclick = scan
  document.getElementById('packet-switch').classList.add('invisible')
}

async function startIAP() {
  await sendCommand('startIAP')
  characteristic.removeEventListener('characteristicvaluechanged', readMainPackets)
  characteristic.addEventListener('characteristicvaluechanged',
    (data) => console.log(Decoder.decode(data.target.value)))
}


async function setTiltbackSpeed(speed) {
  speed = parseInt(speed)

  if (speed == 0 || speed == 100)
    await sendCommand('tiltbackOff')
  else
    await sendCommand('tiltbackSpeed', speed)
}

function setField(field, val) {
  document.getElementById(field).value = val
}

async function setWheelModel(data) {
  wheelModel = Decoder.decode(data.buffer.slice(5)).trim()
  setField('wheel-model', wheelModel)
  await sendCommand('fetchModelCode')
}

function setWheelCodeName(data) {
  wheelCodeName = Decoder.decode(data.buffer.slice(2))
  setField('wheel-code-name', wheelCodeName)
}

function setImuModel(data) {
  imuModel = Decoder.decode(data.buffer.slice(1, 8))
  setField('imu-model', imuModel)
}

async function switchToMainPackets() {
  characteristic.removeEventListener('characteristicvaluechanged', readExtendedPackets)
  document.getElementById('extended').style.display = 'none'
  document.getElementById('main').style.display = null
  document.getElementById('packet-switch').innerText = 'Switch to extended packets'
  document.getElementById('packet-switch').onclick = switchToExtendedPackets
  await sendCommand('mainPacket')
  characteristic.addEventListener('characteristicvaluechanged', readMainPackets)
}

async function switchToExtendedPackets() {
  characteristic.removeEventListener('characteristicvaluechanged', readMainPackets)
  document.getElementById('main').style.display = 'none'
  document.getElementById('extended').style.display = null
  document.getElementById('packet-switch').innerText = 'Switch to main packets'
  document.getElementById('packet-switch').onclick = switchToMainPackets
  line = ''
  setupGauge()
  await sendCommand('extendedPacket')
  characteristic.addEventListener('characteristicvaluechanged', readExtendedPackets)
}

function updatePwmAlarmSpeed() {
  pwmAlarmSpeed = speed
  setField('pwm-alarm-speed', pwmAlarmSpeed)

  speedReduction = 1 - (100 - battery) / 450
  alarmSpeed100 = (speed / speedReduction).toFixed(1)
  setField('pwm-alarm-100', alarmSpeed100)

  alarmSpeeds = [10, 20, 30, 40, 50, 60, 70, 80, 90].forEach(batt => {
    speedReduction = 1 - (100 - batt) / 450
    setField(`pwm-alarm-${batt}`, (alarmSpeed100 * speedReduction).toFixed(1))
  })
}

function updateVoltageHelpText() {
  if (wheelModel == '')
    return

  minVoltage = (modelParams()['voltMultiplier'] * modelParams()['minCellVolt'] * 16).toFixed(1)
  maxVoltage = (modelParams()['voltMultiplier'] * maxCellVolt * 16).toFixed(1)
  voltageHelp.innerText = `min: ${minVoltage}v - max: ${maxVoltage}v`
}

function readFirstMainPacket(data) {
  voltage = data.getUint16(2) / 100
  scaledVoltage = (voltage * modelParams()['voltMultiplier']).toFixed(1)
  setField('voltage', scaledVoltage)

  voltageHelp = document.getElementById('voltage-help')
  if (voltageHelp.innerText == '')
    updateVoltageHelpText()

  battery = (100 * (voltage / baseCellSeries - modelParams()['minCellVolt']) /
   (maxCellVolt - modelParams()['minCellVolt'])).toFixed(2)
  setField('battery', battery)

  speed = Math.abs(data.getInt16(4) * 3.6 / 100).toFixed(1)
  setField('speed', speed)

  tripDistance = (data.getUint32(6) / 1000).toFixed(2)
  setField('trip-distance', tripDistance)

  phaseCurrent = data.getInt16(10) / 100
  setField('phase-current', phaseCurrent)

  temp = (data.getInt16(12) / 340 + 36.53).toFixed(2)
  setField('temp', temp)

  resets = data.getInt16(14)
  if (resets > 10)
    resets -= 9
  setField('resets', resets)

  volume = data.getInt16(16)
  document.getElementById(`volume-${volume}`).setAttribute('checked', true)
}

function readSecondMainPacket(data) {
  totalDistance = (data.getUint32(6) / 1000).toFixed(2)
  setField('total-distance', totalDistance)

  modes = data.getUint16(10)
  pedalMode      = modes >> 13 & 0x3
  speedAlarmMode = modes >> 10 & 0x3
  tiltAngleMode  = modes >>  7 & 0x3

  document.getElementById(`pedal-mode-${pedalMode}`).setAttribute('checked', true)
  document.getElementById(`speed-alert-${speedAlarmMode}`).setAttribute('checked', true)
  document.getElementById(`tilt-angle-${tiltAngleMode}`).setAttribute('checked', true)

  powerOffTime = data.getUint16(12)
  powerOffMinutes = Math.floor(powerOffTime / 60)
  powerOffSeconds = powerOffTime - (powerOffMinutes * 60)
  setField('poweroff-timer', `${powerOffMinutes}:${powerOffSeconds}`)

  tiltbackSpeed = data.getUint16(14)
  document.getElementById('tiltback-speed-label').innerHTML = tiltbackSpeed == 100 ? 'Disabled' : tiltbackSpeed
  document.getElementById('tiltback-speed').value = tiltbackSpeed

  ledMode = data.getUint16(16)
  document.getElementById(`led-mode-${ledMode}`).setAttribute('checked', true)

  faultAlarm = data.getUint8(18)
  faultAlarmLine = ''
  for (let bit = 0; bit < 8; bit++) {
    if (faultAlarm >> bit & 0x1)
      faultAlarmLine += faultAlarms[bit] + ', '
  }

  faultAlarmLine = faultAlarmLine.slice(0, -2)
  setField('fault-alarms', faultAlarmLine)

  if (faultAlarm & 0x1 && (pwmAlarmSpeed == 0 || speed < pwmAlarmSpeed))
    updatePwmAlarmSpeed()
}

function readMainPackets(event) {
  data = event.target.value

  if (data.getInt16(0) == 0x55AA && data.byteLength == 20) {
    readFirstMainPacket(data)
  } else if (data.getUint16(0) == 0x5A5A && data.byteLength == 20) {
    readSecondMainPacket(data)
  } else if (data.getUint32(0) == 0x4E414D45) {
    setWheelModel(data)
  } else if (data.getInt16(0) == 0x4757) {
    setWheelCodeName(data)
  } else if (data.getInt32(0) == 0x204D5055) {
    setImuModel(data)
  } else {
    // unhandled packet
  }
}

function appendElement(key, value) {
  return `
  <div class="mb-2 row">
    <label class="col-lg-5 col-form-label" for="${key}">${key}:</label>
    <div class="col-lg-7">
      <input class="form-control" id="${key}" type="text" value="${value}" disabled readonly>
    </div>
  </div>
  `
}

function appendTempHelp() {
  tempElement = document.getElementById('Tem')
  tempHelp = document.createElement('small')
  tempHelp.className = 'form-text text-muted'
  tempHelp.textContent = 'MPU6500 format'
  tempElement.after(tempHelp)
}

function readExtendedPackets(event) {
  fragment = Decoder.decode(event.target.value)
  if (line == '')
    line = fragment
  else
    line += fragment;

  if (fragment.endsWith('\r\n')) {
    keys = line.match(/[A-z/=]+/g)
    keys = keys.map(l => l.split('=')[0])
    values = line.match(/-?\d+/g)

    pwmIndex = keys.indexOf('PWM')
    if (pwmIndex != 1) {
      pwm = Math.abs(values[pwmIndex] / 100).toFixed(1)
      gauge.set(pwm)
    }

    tempIndex = keys.indexOf('Tem')
    if (tempIndex != 1)
      values[tempIndex] = (values[tempIndex] / 333.87 + 21.0).toFixed(2)

    if (rendered) {
      try { keys.forEach((key, i) => setField(key, values[i])) }
      catch { rendered = false }
    }
    else {
      html = ''
      keys.forEach((key, i) => html += appendElement(key, values[i]))
      document.getElementById('extended-data').innerHTML = html
      appendTempHelp()
      rendered = true
    }

    if (debug)
      console.log(line)

    line = ''
  }
}
