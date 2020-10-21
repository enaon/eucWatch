### Manual install:

Files for P8 watch are [here](https://github.com/enaon/eucWatch/tree/main/P8/apps).  Only for use with the [flash enabled](https://github.com/fanoush/ds-d6/blob/master/espruino/DFU/P8/espruino_2v07.60_p8_SDK11_SD20_SPIFLASH.zip
) firmware by fanoush. 

**Enter this in left hand side (webide) to enable flash(one time only) before uploading.** 

var spi=new SPI();spi.setup({sck:D2,mosi:D3,miso:D4,mode:0}); spi.send([0xab],D5);  //wake

### Loader version:

Try the **Loader version** at [github.io](https://enaon.github.io/eucWatch/P8/)
