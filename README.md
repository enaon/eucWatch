
>**Notice**:
>There are two problems one might face when buying a P8 watch to use with this git. 
>1. The antenna of the p8 might not be good enouph for a solid connection to the EUC. It will work but is a bit random, <del> only 3 out of 10 that I got my hand on were good enough to not need an antenna change.</del>, if not perfect you may need to order another one or change the antenna. That requires opening up the watch, and if done carefully it barelly leaves any visible marks. 
>2. Some watches, version TON5, are mising a crystal, <del> that makes them currently incompatible with daFlasher. They can still be flashed, but that requires opening up the watch.</del>  @fanoush made an TON5 compatible 1st step bootloader, use the file step1-TON5-xx at the first step. 
>
#### Espruino Installation on P8 [how-to](https://enaon.github.io/eucWatch/tools/hackme/)

### Loader version:

[**Web loader**](https://enaon.github.io/eucWatch/p8)  for the P8 watch

[**Web loader**](https://enaon.github.io/eucWatch/dk08) for the DK08 watch

[**Web loader**](https://enaon.github.io/eucWatch/dsd6) for the DSD6 band

### Manual scripts install:

Files for P8 watch are [here](https://github.com/enaon/eucWatch/tree/main/P8).  To be used with the **flash enabled** [Espruino](https://www.espruino.com/) image build by @fanoush. 

**Enter this in left hand side (webide) to enable flash(one time only) before uploading.** 
(the loader version will do this automatically when an install option from the installer tab is selected)

var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0}); spi.send([0xab],D5);  //wake

### Credits

@ATC1441, who made over the air hacking of the P8 watch possible. He wrote the [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&gl=US) playstore app to make the proccess easy. He also made the adruino based [ATCWatch](https://github.com/atc1441/ATCwatch) custom firmware to run on the P8 watch.
**More info on DaFlasher [here](https://github.com/atc1441/DaFlasherFiles)**


@Fanoush, who makes the Espruino builds/bootloader and shares his knowledge. Among other things, he wrote the [inline c screen/spi-flash shared bus driver](https://gist.github.com/fanoush/3dede6a16cef85fbf55f9d925521e4a0) used in this project, and made an sdk12 bootloader to support secure BLE connections. 
**More info on the P8 watch [here](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8)**

@gfwilliams, who is the man behind Espruino. This project uses the Espruino [app loader](https://github.com/espruino/EspruinoApps) and many code snippets from [bangle.js](https://github.com/espruino/BangleApps) source code.
**More info on Espruino [here](https://www.espruino.com/)**


![image](/tools/assets/images/eucwatch.jpg)
photo from [TheDuke](https://www.espritroue.fr/topic/16585-euc-watch-hackable/?tab=comments#comment-294216&ct=1618804287)

<details>
  <summary>Photos</summary>
  
![](https://user-content.gitter-static.net/ad26d169f97603701a963b080c6b16c0cecaad8f/68747470733a2f2f692e6962622e636f2f504d57317452502f494d472d32303230303932312d3130353333363037382e6a7067)
![](https://user-content.gitter-static.net/05b4971a01afdea5952cd3c1d817ee2dbb727e52/68747470733a2f2f692e6962622e636f2f5336525130584d2f494d472d32303230313030352d3137333631333733382e6a7067)
![](https://user-content.gitter-static.net/01fb3ba8dc69e31029380961aece1fa18b90fd7f/68747470733a2f2f692e6962622e636f2f4337725774724e2f494d472d32303230313030352d3137333633313436322e6a7067)
![](https://user-content.gitter-static.net/811714e337a539a2a260703918ab2758811a609c/68747470733a2f2f692e6962622e636f2f4837486d6643312f494d472d32303230313030352d3137343132303037372e6a7067)

  
</details>

