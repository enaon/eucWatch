This is the init file, renamed as .bootrst after uploading to the watch, and is the first file to allways load after a reset/power down. 


It loads a watchdog that reboots the watch to devmode(no apps running-resets NRF setup) if the side button is pressed for more then 40 secs (release the button 2-3 secs after you feel the buzz at around 40 secs in), and includes the [inline c screen/spi flash driver combo](https://gist.github.com/fanoush/3dede6a16cef85fbf55f9d925521e4a0) by @fanoush.

##### todo
show info messages in screen when in devmode. 
