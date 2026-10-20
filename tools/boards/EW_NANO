#!/bin/false
# This file is part of Espruino, a JavaScript interpreter for Microcontrollers
#
# Copyright (C) 2013 Gordon Williams <gw@pur3.co.uk>
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#
# ----------------------------------------------------------------------------------------
# This file contains information for a specific board - the available pins, and where LEDs,
# Buttons, and other in-built peripherals are. It is used to build documentation as well
# as various source and header files for Espruino.
# ----------------------------------------------------------------------------------------
# for f in uf2conf.py uf2families.json ; do wget https://raw.githubusercontent.com/microsoft/uf2/refs/heads/master/utils/$f ; done
# for f in espruino_2v*_nano.app_hex ; do python uf2conv.py -c -f 0xADA52840 $f -o $(basename $f .app_hex).uf2 ; done
import pinutils;

info = {
 'name' : "SuperMini 52840",
 'link' :  [ "https://wiki.icbbuy.com/doku.php?id=developmentboard:nrf52840" ],
 'default_console' : "EV_BLUETOOTH",
 'espruino_page_link' : 'NANO',
 'boardname' : 'NANO', # visible in process.env.BOARD
 'variables' : 13000, # How many variables are allocated for Espruino to use. RAM will be overflowed if this number is too high and code won't compile.
 'io_buffer_size' : 2048, # How big is the input buffer (in 4 byte words). Default on nRF52 is 1024
 'binary_name' : 'e_%v_ew_nano.hex',
 'build' : {
   'optimizeflags' : '-Os',
   'libraries' : [
     'BLUETOOTH',
     'CRYPTO','SHA256','SHA512',
     'AES_CCM',
     'GRAPHICS',
     'JIT',

   ],
   'makefile' : [
     'DEFINES += -DFORCE_D13_LOW', #D13 low, disable VCC output on startup, needs support in targets/nrf5x/jshardware.c

     'DEFINES+=-DESPR_OFFICIAL_BOARD', # Don't display the donations nag screen   
     'DEFINES += -DCONFIG_NFCT_PINS_AS_GPIOS', # Allow us to use NFC pins as GPIO

     'DEFINES += -DESPR_LSE_ENABLE', # Ensure low speed external osc enabled
     
     'DEFINES += -DNRF_SDH_BLE_GATT_MAX_MTU_SIZE=131', # 23+x*27 rule as per https://devzone.nordicsemi.com/f/nordic-q-a/44825/ios-mtu-size-why-only-185-bytes
     'DEFINES += -DNRF_SDH_BLE_GAP_EVENT_LENGTH=6', # Needed to allow coded phy connections
     'DEFINES += -DCENTRAL_LINK_COUNT=2 -DNRF_SDH_BLE_CENTRAL_LINK_COUNT=2', # allow two outgoing connections at once
     'LDFLAGS += -Xlinker --defsym=LD_APP_RAM_BASE=0x3b70', # set RAM base to match MTU=131 + CENTRAL_LINK_COUNT=2 + GAP_EVENT_LENGTH=6

     'DEFINES += -DBLUETOOTH_NAME_PREFIX=\'"eW-n"\'', 

     'DEFINES += -DESPR_DCDC_ENABLE=1', # Use DC/DC converter

#     'LDFLAGS += -Xlinker --defsym=LD_NOINIT_SIZE=0x1290',#2bf0 0x3058#37f8 0x3720
     'ASFLAGS += -D__STARTUP_CLEAR_BSS -D__START=main',  
     'LDFLAGS += -nostartfiles',

     'DEFINES += -DESPR_REGOUT0_1_8V', # don't reset REGOUT0 to 3.3V at startup

     'DFU_PRIVATE_KEY=targets/nrf5x_dfu/dfu_private_key.pem',
     'DFU_SETTINGS=--application-version 0xff --hw-version 52 --sd-req 0xa9,0xae,0xb6', #S140 6.0.0
     'BOOTLOADER_SETTINGS_FAMILY=NRF52840',
     'DEFINES += -DNRF_USB=1 -DUSB',
     'DEFINES += -DNO_DUMP_HARDWARE_INITIALISATION',
     'DEFINES += -DNRF_BL_DFU_INSECURE=1',
     'DEFINES += -DESPR_VREF_VDDH=1',
     'DEFINES += -DESPR_NO_LINE_NUMBERS=1', # we execute mainly from flash, so line numbers can be worked out
     'DEFINES += -DNRF_BOOTLOADER_NO_WRITE_PROTECT=1', # By default the bootloader protects flash. Avoid this (a patch for NRF_BOOTLOADER_NO_WRITE_PROTECT must be applied first)
     'NRF_SDK15=1'
   ]
 }
};

save_code_pages = 105
chip = {
  'part' : "NRF52840",
  'family' : "NRF52",
  'package' : "QFN48",
  'ram' : 256,
  'flash' : 1024,
  'speed' : 64,
  'usart' : 1, #2
  'spi' : 1, #3
  'i2c' : 1, #2
  'adc' : 1,
  'dac' : 0,
  'saved_code' : {
    'address' : ((0xe4 - 2 - save_code_pages) * 4096), # adafruit bootloader at 0xE4000
    'page_size' : 4096,
    'pages' : save_code_pages,
    'flash_available' : 1024 - ((0x26 + 0x20 + 2 + save_code_pages)*4) # Softdevice uses 38 pages of flash (0x26000/0x1000), bootloader 0x100-0xe0=0x20, FS 2, code 96. Each page is 4 kb.
  },
};

devices = {
  'BTN1' : { 'pin' : 'D6', 'pinstate' : 'IN_PULLDOWN' }, # Pin negated in software
#RGB LED
  'LED1' : { 'pin' : 'D15' },

};


# left-right, or top-bottom order
board = {
};

def get_pins():
  pins = pinutils.generate_pins(0,47) # 48 General Purpose I/O Pins.
  pinutils.findpin(pins, "PD0", True)["functions"]["XL1"]=0;
  pinutils.findpin(pins, "PD1", True)["functions"]["XL2"]=0;
  pinutils.findpin(pins, "PD2", True)["functions"]["ADC1_IN0"]=0;
  pinutils.findpin(pins, "PD3", True)["functions"]["ADC1_IN1"]=0;
  pinutils.findpin(pins, "PD4", True)["functions"]["ADC1_IN2"]=0;
  pinutils.findpin(pins, "PD5", True)["functions"]["ADC1_IN3"]=0;
  pinutils.findpin(pins, "PD28", True)["functions"]["ADC1_IN4"]=0;
  pinutils.findpin(pins, "PD29", True)["functions"]["ADC1_IN5"]=0;
  pinutils.findpin(pins, "PD30", True)["functions"]["ADC1_IN6"]=0;
  pinutils.findpin(pins, "PD31", True)["functions"]["ADC1_IN7"]=0;
  # Make buttons and LEDs negated
  pinutils.findpin(pins, "PD6", True)["functions"]["NEGATED"]=0; # button
  pinutils.findpin(pins, "PD8", True)["functions"]["NEGATED"]=0; # button


  # everything is non-5v tolerant
  for pin in pins:
    pin["functions"]["3.3"]=0;
  return pins
