var device;
var write_characteristic;
var Sent;
var Recv;
var receive_index = 0;
var receive_buffer = new Uint8Array(8 + 256); //max packet length
var packet_complete_callback = false;
function on_data_receive(event)
{
	var data = event.target.value;
	var array = new Uint8Array(data.buffer);
	receive_buffer.set(array, receive_index);

	receive_index += data.byteLength;

	var packetLen = receive_buffer[2] + 6;
	if(receive_index == packetLen)
	{
		if(packet_complete_callback)
		{
			var array = receive_buffer.slice(0, receive_index);

			receive_index = 0;

			packet_complete_callback(array);
			packet_complete_callback = false;
		}
		else
		{
			receive_index = 0;
		}
	}
}

function initialize_device(_device)
{
	device = _device;
	return device.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")
		.then(function(service) {

			return Promise.all([
				service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"),
				service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e"),
			]);

		}).then(function(characteristics) {
			
			write_characteristic = characteristics[0];
			
			characteristics[1].addEventListener('characteristicvaluechanged', on_data_receive);
			return characteristics[1].startNotifications();

		});
}

function calculate_checksum(packet)
{
	var end = packet[2] + 4;
	var sum = 0;
	for(var i = 2; i < end; i++)
		sum += packet[i];

	return (sum & 0xFFFF) ^ 0xFFFF;
}

function send_packet(command, offset, data)
{
	// 55 AA <len> 11 <cmd> <offset> [data...] <chk1> <chk2>

	var packetLen = 8 + data.byteLength;
	var packet = new Uint8Array(packetLen);
	packet[0] = 0x55;
	packet[1] = 0xAA;
	packet[2] = data.byteLength + 2;
	packet[3] = 0x11; // 0x09; for ninebot E
	packet[4] = command;
	packet[5] = offset;
	packet.set(data, 6);

	var checksum = calculate_checksum(packet);
	packet[packetLen - 2] = checksum & 0xFF;
	packet[packetLen - 1] = (checksum >> 8) & 0xFF;
	Sent=packet;
	return write_characteristic.writeValue(packet);
}

function receive_packet()
{
	return new Promise(function(resolve, reject) {

		packet_complete_callback = resolve;

	});
}

function read_register(offset, size)
{
	//cmd for reading is 0x01
	var data = new Uint8Array([size]);
	return send_packet(0x01, offset, data)
		.then(receive_packet)
		.then(function(packet) {
			Recv=packet;
			var view = new DataView(packet.buffer);

			if(view.getUint8(2) != size + 2)
				return Promise.reject("received packages payload does not match requests bytes length");

			switch(size)
			{
				case 1:
					return view.getUint8(6, true);
				
				case 2:
					return view.getUint16(6, true);

				case 4:
					return view.getUint32(6, true);

				default:
					return Promise.reject("Invalid register size, valid are 1/2/4");
			}

		});
}

function write_register(offset, value, size)
{
	var buff = new ArrayBuffer(size);
	var view = new DataView(buff);
	switch(size)
	{
		case 1:
			view.setUint8(0, value, true);
			break;
		
		case 2:
			view.setUint16(0, value, true);
			break;

		case 4:
			view.setUint32(0, value, true);
			break;

		default:
			return Promise.reject("Invalid register size, valid are 1/2/4");
	}

	//cmd for writing is 0x02
	return send_packet(0x02, offset, new Uint8Array(buff))
		.then(receive_packet)
		.then(function(packet) {

			// TODO check if we got an error as response

		});
}


