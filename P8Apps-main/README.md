# P8 Espruino - Execution Environment and Apps


The repository contains a set of Espruino Apps for the P8 Smartwatch together with drivers to support these Apps. The following video demonstrates some of these:

https://youtu.be/cHj_lXSNEv0

This is very much based on the excellent Bangle.js and some Bangle apps and widgets require very little change to run on the P8. 

## Installation

For a brand-new P8, you need to follow the instructions [here](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8) produced by @fanoush to get the right bootloader required by Espruino - SDK12 with Softdevice S132 3.0. After that you can flash this firmware:

[espruino_2v08.60_p8_SDK12_SD30_SPIFLASH.zip](https://github.com/jeffmer/P8Apps/blob/main/firmware/espruino_2v08.60_p8_SDK12_SD30_SPIFLASH.zip)

This build has a modified `lcd_spi_unbuf` module that works with SPI FLASH. The build makes the full 4 megabytes available to Espruino applications. In addition, there is a small hack to bluetooth to support the ANCS widget that connects to iPhones.

Once Espruino is involved use the [P8 App Loader](https://jeffmer.github.io/P8Apps/) to load `Bootloader`, `Launcher` and `Settings` followed by the apps and widgets you want.

To change Apps, a long touch on the touch screen will start the `launch` app. In addition, the P8 will display `P8 Espruino` when first booted and a long touch is required to start `launch`.

### Warning

There is a distinct possibility of "bricking" your P8. 

To mitigate this risk, `boot` sets a watchdog timer and if you press the button and hold it for over 5 seconds, the P8 should reboot when you release the button. If there is no response, let the battery go flat and the P8 should restart when you connect the charger. 

*Do not use `clearWatch()` anywhere as it kills both the button and the touch screen.*


### Credits

@ATC1441, reverse engineered the DaFit app and wrote [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&gl=US) which allows you to replace the firmware the P8 comes with.

@Fanoush, for the Espruino builds/bootloader and his help with getting the LCD driver to work.


@gfwilliams, for [Espruino](https://www.espruino.com/) and for the Bangle App Loader used here. *If you want a hassle free watch you can program off the shelf get a Bangle.js.*

