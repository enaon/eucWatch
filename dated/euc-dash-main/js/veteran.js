const Encoder = new TextEncoder()
const Decoder = new TextDecoder()

function commands(cmd) {
  switch(cmd) {
    case 'horn':          return 'b'
    case 'pedalSoft':     return 'SETs'
    case 'pedalMedium':   return 'SETm'
    case 'pedalHard':     return 'SETh'
    case 'lightsOn':      return 'SetLightON'
    case 'lightsOff':     return 'SetLightOFF'
    case 'VolumeUp':      return 'SetFctVol+'
    case 'VolumeDown':    return 'SetFctVol-'
    case 'clearDistance': return 'CLEARMETER'
    case 'switchPackets': return 'CHANGESTRORPACK'
    case 'nextPage':      return 'CHANGESHOWPAGE'
    default:              return cmd
  }
}

const pedalModeHuman = {
  1: 'soft',
  2: 'medium',
  3: 'hard'
}

async function sendCommand(cmd) {
  await characteristic.writeValue(Encoder.encode(commands(cmd)))
}

async function scan() {
  device = await navigator.bluetooth.requestDevice(
    { filters: [{ namePrefix: 'LK' }], optionalServices: [0xFFE0]})
  server = await device.gatt.connect()
  service = await server.getPrimaryService(0xFFE0)
  characteristic = await service.getCharacteristic(0xFFE1)
  await characteristic.startNotifications()
  characteristic.addEventListener('characteristicvaluechanged', readMainPackets)
  initialize()
}

async function initialize() {
  document.getElementById('scan-disconnect').innerText = 'Disconnect'
  document.getElementById('scan-disconnect').className = 'btn-lg btn-danger'
  document.getElementById('scan-disconnect').onclick = disconnect
  document.getElementById('packet-switch').classList.remove('invisible')
}

function disconnect() {
  device.gatt.disconnect()
  document.getElementById('scan-disconnect').innerText = 'Scan & Connect'
  document.getElementById('scan-disconnect').className = 'btn-lg btn-primary'
  document.getElementById('scan-disconnect').onclick = scan
  document.getElementById('packet-switch').classList.add('invisible')
  document.getElementById('next-page').classList.add('invisible')
}

function setField(field, val) {
  document.getElementById(field).value = val
}

async function switchToMainPackets() {
  characteristic.removeEventListener('characteristicvaluechanged', readExtendedPackets)
  document.getElementById('extended').style.display = 'none'
  document.getElementById('main').style.display = null
  document.getElementById('packet-switch').innerText = 'Switch to extended packets'
  document.getElementById('packet-switch').onclick = switchToExtendedPackets
  document.getElementById('next-page').classList.add('invisible')
  await sendCommand('switchPackets')
  characteristic.addEventListener('characteristicvaluechanged', readMainPackets)
}

async function switchToExtendedPackets() {
  characteristic.removeEventListener('characteristicvaluechanged', readMainPackets)
  document.getElementById('main').style.display = 'none'
  document.getElementById('extended').style.display = null
  document.getElementById('packet-switch').innerText = 'Switch to main packets'
  document.getElementById('packet-switch').onclick = switchToMainPackets
  document.getElementById('next-page').classList.remove('invisible')
  line = ''
  rendered = false
  await sendCommand('switchPackets')
  characteristic.addEventListener('characteristicvaluechanged', readExtendedPackets)
}

async function nextPage() {
  line = ''
  rendered = false
  await sendCommand('nextPage')
}

async function readMainPackets(event) {
  data = event.target.value

  if (data.getUint32(0) == 0xDC5A5C20)
    readFirstMainPacket(data)
  else if (data.byteLength == 16 && data.getUint8(15) == 0)
    readSecondMainPacket(data)
  else
    await sendCommand('switchPackets')
}

function readFirstMainPacket(data) {
  voltage = data.getUint16(4) / 100
  setField('voltage', voltage)

  speed = data.getInt16(6) / 10
  setField('speed', speed)

  tripDistanceHigh = data.getUint16(8)
  tripDistanceLow = data.getUint16(10)
  tripDistance = ((tripDistanceHigh + (tripDistanceLow << 16)) / 1000).toFixed(2)
  setField('trip-distance', tripDistance)

  totalDistanceHigh = data.getUint16(12)
  totalDistanceLow = data.getUint16(14)
  totalDistance = ((totalDistanceHigh + (totalDistanceLow << 16)) / 1000).toFixed(1)
  setField('total-distance', totalDistance)

  phaseCurrent = data.getInt16(16) / 10
  setField('phase-current', phaseCurrent)

  temperature = data.getInt16(18) / 100
  setField('temperature', temperature)
}

function readSecondMainPacket(data) {
  powerOffTime = data.getUint16(0)
  powerOffMinutes = Math.floor(powerOffTime / 60)
  powerOffSeconds = powerOffTime - (powerOffMinutes * 60)
  setField('poweroff-timer', `${powerOffMinutes}:${powerOffSeconds}`)

  chargeMode = data.getUint16(2)
  setField('charge-mode', chargeMode)

  alarmSpeed = data.getUint16(4) / 10
  setField('alarm-speed', alarmSpeed == 280 ? 'off' : alarmSpeed)

  tiltbackSpeed = data.getUint16(6) / 10
  setField('tiltback-speed', tiltbackSpeed == 280 ? 'off' : tiltbackSpeed)

  version = data.getUint16(8).toString()
  setField('version', `${version[0]}.${version[1]}.${version.slice(2)}`)

  pedalMode = data.getUint16(10)
  setField('pedal-mode', pedalModeHuman[pedalMode])

  roll = data.getInt16(12)
  setField('roll', roll)
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

function readExtendedPackets(event) {
  fragment = Decoder.decode(event.target.value)
  if (line == '')
    line = fragment
  else
    line += fragment;

  if (fragment.endsWith('P7') || fragment.endsWith('BvFc') || fragment.endsWith('U5')) {
    keys = line.match(/>\w+/g)
    keys = keys.map(k => k.slice(1))
    values = line.match(/-?\d+/g)

    if (fragment.endsWith('U5')) {
      idleTime = line.match(/\d+:.+:.\d+/)[0]
      keys.unshift('idle')
      values.splice(0, 3, idleTime)
    }

    if (rendered) {
      try { keys.forEach((key, i) => setField(key, values[i])) }
      catch { rendered = false }
    }
    else {
      html = ''
      keys.forEach((key, i) => html += appendElement(key, values[i]))
      document.getElementById('extended-data').innerHTML = html
      rendered = true
    }

    line = ''
  }
}
