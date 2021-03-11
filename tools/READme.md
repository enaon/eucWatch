
### Openocd basic how-to
> for use on windows with an stlink-v2

- extract openocd.zip 
- open cmd prompt to bin directory
- run 
> openocd.exe -d2 -f interface/stlink-v2.cfg  -f target/nrf52.cfg 
- then telnet to openocd using another cmd window:
> telnet 127.0.0.1  4444
- issue the following:
> reset halt
> 
> nrf51 mass_erase
> 
> program espruino_2v08.189_p8_SDK12_SD30.hex
> 
> reset run
> 


- done, disconnect stlink and connect from espruno ide



If telnet client is not nabled, enable it using this on an elevated cmd prompt:
> dism /online /Enable-Feature /FeatureName:TelnetClient
