E.setConsole(Serial1,{force:true});
  Bluetooth.line="";
  Bluetooth.on('data',function(d) {
   print(d);
  });
  Bluetooth.on('line',function(l) {
	print("line: ",l);
  
  });
  
  
  
  
  Bluetooth.on('line',function(l) {
	print("line: ",l);
    if (l.startsWith('\x10')) l=l.slice(1);
//	l.startsWith('setTime(') && l.endsWith('})')
	if (l.startsWith('setTime(') && l.endsWith('})') && global.GB)
		print("date"); //try {eval(l) } catch(e) {}
    if (l.startsWith('GB({') && l.endsWith('})') && global.GB)
		{print("gb cmd in");try { global.GB(JSON.parse(l.slice(3,-1))); } catch(e) {}}
  });
  
  
  ********************

NRF.setServices({}, { uart:false });

***************
  
  
  
Looking into the RAW BLE packet from NRF Connect, the Puck looks like it's advertising this:

0x02010608095075636b2e6a73
Which looks like 2 advertisements in 1 BLE packet.

Adv 1:
Length: 0x02
Type: 0x01 (Flag)
Value: 0x06

Adv 2:
Length: 0x08
Type: 0x09 (Complete Local Name)
Value: 0x5075636b2e6a73 ("Puck.js" in hex, using ASCII table)

However what I'm wanting to see, is 3 advertisements in the packet, the missing one being the service UUID. Something like

Adv 3:
Length: 0x11 (17 in hex, 1 for the type, 16 for the UUID itself)
Type: 0x07 (Complete List of 128-bit Service Class UUIDs)
Value: 0xabcdabcdabcdabcdabcdabcdabcdabcd (the service UUID)

So the overall RAW BLE packet looking something like this:

0x0201061107abcdabcdabcdabcdabcdabcdabcdabcd08095075636b2e6a73
What am I potentially doing wrong to where the service UUID isn't being brodcast in the RAW BLE packet?


  
  Ahh, ok. So it's what I'd mentioned above about the scan response packet (which is an extra advertising packet that can be requested in a 'active' scan). Espruino sticks advertised service UUIDs in there because usually there's not enough space in the main packet.

So to work around it, I'm afraid you'll have to manually specify the advertising data:

NRF.setAdvertising([
  [
0x02,0x01,0x06,
0x11,0x07,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,
0x08,0x09,0x50,0x75,0x63,0x6b,0x2e,0x6a,0x73,
]]); 
But that will likely work perfectly for you. In fact you wouldn't even have to stop the UART.


NRF.setAdvertising([
  [
0x02,0x01,0x06,
0x11,0x07,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,0xab,0xcd,
0x08,0x09,0x50,0x75,0x63,0x6b,0x2e,0x6a,0x73,
]]); 