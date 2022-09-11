 }
>NRF.requestDevice({ filters: [{ services: ["fbb0"] }] }).then(function(device) { print(device) });
=Promise: {  }
BluetoothDevice: {
  "id": "81:ea:ca:21:37:fa public",
  "rssi": -48,
  "data": new Uint8Array([2, 1, 5, 3, 3, 176, 251, 19, 255, 0, 1, 129, 234, 202, 33, 55, 250, 0, 0, 0, 0, 123, 11, 0, 0, 82, 1]).buffer,
  "manufacturer": 256,
  "manufacturerData": new Uint8Array([129, 234, 202, 33, 55, 250, 0, 0, 0, 0, 123, 11, 0, 0, 82, 1]).buffer,
  "services": [
    "fbb0"
   ]
 }
>NRF.requestDevice({ filters: [{ services: ["fbb0"] }] }).then(function(device) { print(device) });
=Promise: {  }
BluetoothDevice: {
  "id": "80:ea:ca:11:36:ed public",
  "rssi": -60,
  "data": new Uint8Array([2, 1, 5, 3, 3, 176, 251, 19, 255, 0, 1, 128, 234, 202, 17, 54, 237, 0, 0, 0, 0, 122, 11, 0, 0, 98, 1]).buffer,
  "manufacturer": 256,
  "manufacturerData": new Uint8Array([128, 234, 202, 17, 54, 237, 0, 0, 0, 0, 122, 11, 0, 0, 98, 1]).buffer,
  "services": [
    "fbb0"
   ]
 }
> 

>String.fromCharCode.apply(String,new Uint8Array([128, 234, 202, 17, 54, 237, 0, 0, 0, 0, 122, 11, 0, 0, 98, 1]))
="\x80\xEA\xCA\x116\xED\0\0\0\0z\v\0\0b\1"

>String.fromCharCode.apply(String,Uint8Array([2, 1, 5, 3, 3, 176, 251, 19, 255, 0, 1, 128, 234, 202, 17, 54, 237, 0, 0, 0, 0, 122, 11, 0, 0, 98, 1]))
="\2\1\5\3\3\xB0\xFB\x13\xFF\0\1\x80\xEA\xCA\x116\xED\0\0\0\0z\v\0\0b\1"


 
 NRF.requestDevice({ filters: [{ services: ['fbb0'] }] }).then(function(device) { print(device) });
 
 
 NRF.findDevices(function(devices) {
console.log(devices);
}, 1000);

NRF.findDevices(function(devices) {
//this.filter = [{serviceData:{"fe95":{}}}];
//this.filter = [{manufacturer:17224}];  
//this.filter = [{ namePrefix: 'P8' }];
//this.filter = [{ name: 'P8b' }];
this.filter = [{services:[ "fbb0" ]}];
		NRF.filterDevices(devices, this.filter).forEach(function(entry) {
			print(entry);
		});
		print("done");
}, 5000);

NRF.requestDevice({ filters: [{ services: ["fbb0"] }] }).then(function(device) { print(device) });
NRF.requestDevice({ filters: [{ services: ['fbb0'] }] }).then(function(device) { print(device) });

