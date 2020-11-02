var cmd = lcd_spi_unbuf.command;

function gamma1(){
    cmd(0xe0, [208, 4, 13, 17, 19, 43, 63, 84, 76, 24, 13, 11, 31, 35]);
    cmd(0xe1, [208, 4, 12, 17, 19, 44, 63, 68, 81, 47, 31, 31, 32, 35]);
}

function gamma2(){
    cmd(0xe0, [0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);
    cmd(0xe1, [0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f]);
}

function draw(){
    g.setColor(1,0,0);
    g.fillRect(0,0,59,59);
    g.setColor(0,1,0);
    g.fillRect(60,60,119,119);
    g.setColor(0,0,1);
    g.fillRect(120,120,179,179);
    g.setColor(1,1,1);
    g.fillRect(180,180,239,239);
}

P8.setLCDTimeout(300);
