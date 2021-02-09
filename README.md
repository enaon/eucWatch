### Loader version:

[**Loader version**] for the P8 watch (https://enaon.github.io/eucWatch/p8)
[**Loader version**] for the DK08 watch (https://enaon.github.io/eucWatch/dk08)

### Manual install:

Files for P8 watch are [here](https://github.com/enaon/eucWatch/tree/main/P8).  Can be used with the [flash enabled](https://github.com/fanoush/ds-d6/blob/master/espruino/DFU/P8/espruino_2v07.60_p8_SDK11_SD20_SPIFLASH.zip) or the  the [not flash enabled](https://github.com/fanoush/ds-d6/blob/master/espruino/DFU/P8/espruino_2v07.60_p8_SDK11_SD20.zip) [Espruino](https://www.espruino.com/) image build by @fanoush. 

**Enter this in left hand side (webide) to enable flash(one time only) before uploading.** 
(the loader version will do this automatically when an install option from the installer tab is selected)

var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0}); spi.send([0xab],D5);  //wake


### Credits

@ATC1441, who reverse engineered the DaFit app and made over the air hacking of the P8 watch possible. He then wrote the [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&gl=US) playstore app to make the proccess easy for anyone. He also made the adruino based [ATCWatch](https://github.com/atc1441/ATCwatch) custom firmware to run on the P8 watch.
**More info on DaFlasher [here](https://github.com/atc1441/DaFlasherFiles)**


@Fanoush, who makes the Espruino builds/bootloader and shares his knowledge. Among other things, he wrote the [inline c screen/spi-flash shared bus driver](https://gist.github.com/fanoush/3dede6a16cef85fbf55f9d925521e4a0) used in this project, and made an sdk12 bootloader to support secure BLE connections. 
**More info on the P8 watch [here](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8)**


@gfwilliams, who is the man behind Espruino. This project uses the Espruino [app loader](https://github.com/espruino/EspruinoApps) and many code snippets from [bangle.js](https://github.com/espruino/BangleApps) source code.
**More info on Espruino [here](https://www.espruino.com/)**


<details>
  <summary>Photos</summary>
  
![](https://user-content.gitter-static.net/ad26d169f97603701a963b080c6b16c0cecaad8f/68747470733a2f2f692e6962622e636f2f504d57317452502f494d472d32303230303932312d3130353333363037382e6a7067)
![](https://user-content.gitter-static.net/05b4971a01afdea5952cd3c1d817ee2dbb727e52/68747470733a2f2f692e6962622e636f2f5336525130584d2f494d472d32303230313030352d3137333631333733382e6a7067)
![](https://user-content.gitter-static.net/01fb3ba8dc69e31029380961aece1fa18b90fd7f/68747470733a2f2f692e6962622e636f2f4337725774724e2f494d472d32303230313030352d3137333633313436322e6a7067)
![](https://user-content.gitter-static.net/811714e337a539a2a260703918ab2758811a609c/68747470733a2f2f692e6962622e636f2f4837486d6643312f494d472d32303230313030352d3137343132303037372e6a7067)

  
</details>

