## Install espruino on the KOSPET MAGIC3 - ROCK smart watch:

### Before installation:
You will need an android smartphone, a chrome based web browser and the [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&hl=el&gl=US) app from the playstore, made by atc1441.

>**NOTICE:** 
>
> Use latest DaFlasher version.

Using the DaFlasher app, you will upload three files to the watch. The second step will be done using the browser, not DaFlasher.:

1. custom espruino image that will replace the dafit app and allow for installing a bootloader using step2.
2. bootloader, using the chrome browser and the eucWatch loader.
3. espruino image. (select the one for your watch, Magic or Rock)
4. softDevice image, (downgrade to 6.0.0).

> 
>  **original links:**
> [espruino app image, bootloader & SoftDevice](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/Magic3) (step 1,2&4)
> [espruino image](https://github.com/jeffmer/WatchApps/tree/master/firmware) (step 3)

> 
> **Notice** Do not "right click"->"save as" on github, use the download button instead, or the following links for convenience 

> ( it is safe to "right clik->save as" on the links below:)
>
> [**Step1 file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme2/step1_espruino_2v10.102_magic3-dafit.bin)
> 
> [**Step3 Magic3 Espruino image file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme2/step3_espruino_2v10.364_magic3.zip)   or   [**Step3 Rock Espruino image file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme2/step3_espruino_2v10.360_rock.zip)
>
> [**Step4 SoftDevice file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme2/step4_S140-6.0.0-magic3.zip)


## Installation:

> **Tip:** Disconnect any accessories and stop any programs you know may be using the BT on the phone.  
> **Tip:** Disconnect the watch from the charger, make sure it is over 50% charged.

 

>**Step 1.**
Open daFlasher, search for the Magic3/Rock and select it. The program will report a DaFit device and offer to hack it:

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/1.png?raw=true )

Press **Select File** and choose the file named step1-xxx you just downloaded, the app will begin the transfer, this step will needs a couple of minutes, you should see the bar moving within seconds, if not, close(kill) the app and try again:

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/1.3.png?raw=true)
 
When finished the watch screen will be black, like off. 
Close DaFlasher, the next step will be done using a chrome browser, phone or PC.

>**Step 2.**

Using a chrome based browser, visit this [page](https://enaon.github.io/eucWatch), press the "connect" button on top right, find the watch (it will be ROCK_XXXX/MAGIC3_XXXX) and connect.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/2.png?raw=true )

> **Tip:** If the site fails to connect, wait a few second, refresh and try again. 

When connected, go to "Library" tab, then to "Core" section, and upload the "bootloader - MAGIC - ROCK (v1.00)" file to the watch using the arrow next to it. 

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/2.1.png?raw=true)

When finished, press the "Disconnect" button on top right. 

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/2.2.png?raw=true)


>**Step 3.**
> 

Open daFlasher, search for the Magic3/Rock and select it, it will be named as "DfuTarg". 

Unselect **Toggle Bluetooth** and select the **Use Nordic Bootloader**.

Then press the **Select DFU file** button, and choose the step3 file for your watch.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/3.png?raw=true)

>**Note** please make sure you have the correct step3 file for your watch, look for Magic or Rock in the filename.

When step three ends, the watch will be ready for the final step of the hacking part of the installation procedure. 


>**Step 4.**

This step is a bit tricky, we need to downgrade the bluetooth softdevice, to do that we must manually take the watch to DFU mode.  

Go back or kill Daflasher. 
Open DaFlasher, search for the Magic3/Rock. It may be named as "MAGIC3_XXX", or it may be named "Unknown". 
Select the watch, and on the next page press the "Start Bootloader" button.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/4.png?raw=true)

Go back or kill Daflasher. 
Open daFlasher, search for the Magic3/Rock. It should be named "DFUTarg". 
Select the watch, and on the next page preess the "Do DFU Update" button. (the "start bootloader" button should be grayed out)

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/4.1.png?raw=true)

Unselect **Toggle Bluetooth** and select **Use Nordic Bootloader** option, then press the **Select DFU file** button, and choose the file step4-xxx. 

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/4.2.png?raw=true)

This step will take up to 5 minutes, and when done the watch screen will remain black/off. 

## Post install
### EucWatch Installation:


If all went ok disconnect the phone by turning off the BT radio, so that you will make sure the watch is disconnected, and go to the eucWatch [loader](https://enaon.github.io/eucWatch) using PC or android chromium based browser. 

The loader is a web based app store service, using web Bluetooth technology it will connect to the watch, help install the scripts and keep you up to date by offring updates when available.

Using a chromium based browser, press the **connect** button (right top corner), connect to the watch (named MAGIC33xxx/ROCKxx etc), then on the installer tab select **Install All Apps**. 

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/5.png?raw=true)


>**Note** If the installation of scripts stops half way, repeat the installer proccess again.
>**Note** When all sripts are installed, press the "Disconnect" button on top right for the watch to restart in working mode.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme2/images/5.3.png?raw=true)


good luck :)
