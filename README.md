### Loader version:

Try the [**Loader version**](https://enaon.github.io/eucWatch/p8.html)

### Manual install:

Files for P8 watch are [here](https://github.com/enaon/eucWatch/tree/main/P8).  Can be used with the [flash enabled](https://github.com/fanoush/ds-d6/blob/master/espruino/DFU/P8/espruino_2v07.60_p8_SDK11_SD20_SPIFLASH.zip) or the  the [not flash enabled](https://github.com/fanoush/ds-d6/blob/master/espruino/DFU/P8/espruino_2v07.60_p8_SDK11_SD20.zip) [Espruino](https://www.espruino.com/) image build by @fanoush. 

**Enter this in left hand side (webide) to enable flash(one time only) before uploading.** 

var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0}); spi.send([0xab],D5);  //wake


### Credits

@ATC1441, who reverse engineered the DaFit app and made over the air hacking of the P8 watch possible. He then wrote the [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&gl=US) playstore app to make the proccess easy for anyone. He also made the adruino based [ATCWatch](https://github.com/atc1441/ATCwatch) custom firmware to run on the P8 watch.
**More info on DaFlasher [here](https://github.com/atc1441/DaFlasherFiles)**


@Fanoush, who makes the Espruino builds/bootloader and shares his knowledge. Among other things, he wrote the inline c screen/spi-flash shared bus driver used in this project, and made an sdk12 bootloader to support secure BLE connections. 
**More info on the P8 watch [here](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8)**


@gfwilliams, who is the man behind Espruino. This project uses the Espruino [app loader](https://github.com/espruino/EspruinoApps) and many code snippets from [bangle.js](https://github.com/espruino/BangleApps) source code.
**More info on Espruino [here](https://www.espruino.com/)**
