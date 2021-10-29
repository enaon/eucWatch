>**NOTICE:** 
>
> <del>**Do not** use this how-to if your P8's about screen reports TON as a model number.</del> 
> 
> <del> @fanoush made an TON5 compatible 1st step bootloader, use the file step1-TON5-xx at the first step for TON5 models. </del> 
> 
> TON5 is now compatible with the same 1st-step file.

## Install espruino on the P8/P22 smart watch:

### Before installation:
You will need an android smartphone, and the [DaFlasher](https://play.google.com/store/apps/details?id=com.atcnetz.paatc.patc&hl=el&gl=US) app from the playstore, made by atc1441.

Using the app, you will upload four files to the P8 watch:


1. a custom app that will replace the bootloader of the p8.
2. a  bootloader.
3. yet another  bootloader, this time compatible with the espruino image linked bellow. 
4. finally the espruino image itself.



> Files are mirrored [here](https://github.com/enaon/eucWatch/tree/main/tools/hackme) 
> 
>  **original links:**
> [daflasher files](https://github.com/atc1441/DaFlasherFiles) (step 1&2)
> [espruino bootloader & image](https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8) (step 3&4)

> **Notice"" Do not "right click"->"save as" on github, use the download button instead, or the following links for convinience:

[**Step1 file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme/step1-DaFitBootloader23Hacked.bin)

[**Step2 file**](https://github.com/enaon/eucWatch/blob/main/tools/hackme/step2-FitBootloaderDFU2.0.1.zip)

[**Step3 file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme/step3-p8-sdk11-to-sdk12.zip)

[**Step4 P8 file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme/step4-espruino_2v09.119_p8_SDK12_SD30_SPIFLASH4M.zip)

[**Step4 P22/Pinetime file**](https://github.com/enaon/eucWatch/raw/main/tools/hackme/step4-espruino_2v09.119_p22_SDK12_SD30_SPIFLASH4M.zip)



### Installation:

> **Tip:** Disconnect any accessories and stop any programs you know may be using the BT on the phone.  

Open daFlasher, search for the P8 and select it. The program will report a DaFit device and offer to hack it:
 
![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme/images/2.png?raw=true )
>**Step 1.**


Press **Select File** and choose the file named step1-xxx you just downloaded, the app will begin the transfer, this step will needs a couple of minutes, you should see the bar moving within seconds, if not, close(kill) the app and try again:

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme/images/5.png?raw=true)
 
When finished the watch will reboot to a three squares screen, ready for step2.

Close DaFlasher or go back, scan again and this time look for an ATCdfu device, this is the P8 now. 
 
>**Step 2.**

Select the ATCdfu device, you will be prompted to do a dfu update, do it.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme/images/7.png?raw=true)

Select **Toggle Bluetooth** and **Use Nordic Bootloader**.
Then press the **Select DFU file** button, and choose the file step2-xxx.

>If this step fails, try again without the **Toggle Bluetooth**  check.

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme/images/8.png?raw=true)

When finished, the watch will reboot to a one square screen, ready for step3.

Go back or kill/start daFlasher again, look fof ATCdfu device and select it. 

>**Step 3.**
> 

As in step 2, select **Toggle Bluetooth** and **Use Nordic Bootloader**.
Then press the **Select DFU file** button, and choose the file step3-xxx. 

![alt](https://github.com/enaon/eucWatch/blob/main/tools/hackme/images/9.png?raw=true)

When step three ends, the watch will reboot to a blank screen, ready for the final step. 

Go back or kill/start Daflasher. and this time look for a device called dfutarg, this is the p8 now. 

>**Step 4.**

Select it,  select **Toggle Bluetooth** and **Use Nordic Bootloader** option, then press the **Select DFU file** button, and choose the file step4-xxx. 
>**Note** please make sure you have the correct step4 file for your watch, look for P8 or P22 in the filename.

This step will take up to 5 minutes, and when done the watch screen will remain black/off. 

### EucWatch Installation:

If all went ok disconnect the phone by turning off the BT radio, so that you will make sure the watch is disconnected, and go to the eucWatch [loader](https://enaon.github.io/eucWatch/p8) using a chromium based browser, press the **connect** button on the right top corner, connect to the p8/p22/pinetime (named p8xxx/p22xx etc), then on the installer tab select **feature set/all**. 


good luck :)
