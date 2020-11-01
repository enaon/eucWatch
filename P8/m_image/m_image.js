//images loader
function image(img){
	switch (img) {
      case "bt":return require("heatshrink").decompress(atob("mEwwIXUgYFFwAFE4AFE8AFE/AFE/gFE/wFE/4FE74qCgUD54qCg8D44qCh+D4fwAoXDAocD8YRDgPzDocA/YpDgF/Gok/IIkfJokPLIkHFwQFHCIodFFIo1FIIhNFLIplFOIp9FRIqVFUI6tFXIrFFaIrdFdIr/IABY="));
      case "btSmall":return E.toArrayBuffer(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA=="));
	  case "phoneMute": return require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA=="));
	  case "calls":return require("heatshrink").decompress(atob("kEgwMAn/gA4N/+ADB/4DC8FwAbvh+HnjHh8HjAYPABYNhAYVxAY0wIYU4H4U4EYUcnkP/0Oj0f/8Ph///8Hw/4g8D4IDBgIfBg8AD4IDBvgDCj+AAYIbCgEB//+FoM//gA=="));
	  case "messages":return require("heatshrink").decompress(atob("jEYwIPMv///wCFj///EP//w4f/4fw/8P/F+j/+jATBwP/BoICBAA4mIHZAA="));
	  case "infos":return require("heatshrink").decompress(atob("jEYwIHEv0AgP/wEH//gh//+Ef8/4j/D/E/4/8n///l///+v/nAQPDARM/4YXBAQIgCEwQsCGQQ4CHwQACA=="));
	  case "batteryMed":return require("heatshrink").decompress(atob("jEYwIEBngCDg//4EGgFgggCZgv/ASUEAQQaBHYPgJYQ="));
	  case "gb":return require("heatshrink").decompress(atob("mEwwIFCg4LEh/AAocfAok/Aol/zAFEnwREvwoD43+FAfw/ngFAX8/vwAoX+vP4DgX/uYFEs4RCv4FB84FDh/vAoP/h0f5+AAoMBn+fAoWOn8/CIXAv9/DoXg/xOCv5HB/g1C+H5HYfwuf6JoX5gf2AoeD8hlC/P75AFC/v5QgUH/v8mAFC///L4UDAoJ9CAosBAoKoCAopaB/5kBAqQdFgfwg41D8ABBAqgdEJpA1FII4A=="));
  	  case "cli":return require("heatshrink").decompress(atob("mEmwIPMggFEj4FEn+AAonAAongAonwDon4Aon8AocP/wFDg//AocD/4wDgP/GAgFFv42RAokPBZQFFEYovFHYhHBJoZTBL4hlEh5xEFxE///4SoQFDFwIFDFwIFCXIQFCYoUP/5KEAA4"));
   	  case "atc":return require("heatshrink").decompress(atob("mEwwILI///ArUBAoOAArMDAo/AAoMH8ABBAoMP4ED+AFBj4fB/AFBnwCB/gFEvgCEngCBvAOEAoUeAo9wAogyCApARFEZYFFIIoCCBAREFMoMAMoUPwBxDh59Eg/8n6JCR4q5dAoT7bAAYA="));
	  case "hid":return require("heatshrink").decompress(atob("mEwwIOLkAEDgPwAocHAok/AocB/4FDh4FEv4FDgf/AocfAogEBAoQhBApnxAomBAof8JoQ/CAohZDgP8AongAuF9AoZ4BAoaJDAoJ+BAoc/ApSbCMgIFCEAQRCEAQFC4AIEwAUEXgRBBP4IFCZAgFF4DlDEAIFEeIcP/wFDgb9EAAoA="));
  	  case "rfTX1":return E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAPgAEQACIABEAAiAARAAIgAHz74="));
   	  case "rfTX2":return E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4ADEABiAAxAfYgPsQEWICLEBFiAixARYgIsQHz74="));
	  case "rfTX3":return E.toArrayBuffer(atob("EyCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AARAAIgAEQD6IDFEBiiAxRfYovsUUWKKLFFFiiixRRYoosUXz74="));
	  case "themes":return require("heatshrink").decompress(atob("mEwwIHEgfwAocH/AFDh/8Aocf/wFDn//Aod/Aon//8PAQPBAomDAQMfAQMH//+AoP+BwIFC/gCE+AuB/Ef4AuC+EfwAuC8AFBgIFB4AFBgYFBwAFBFwJGBAoIuCAoQuCAoQuCAonwoAFBGgPgFIQLB4IFBQIJgB4EeRoJgB4Ecg+D/wFBjE/8P8h5XC+H4AoQzB+AFD/lAAoJdBIoIFDKIIFfQIIpDApB+BAoZsBAoX4PAPANIPwAoR1B+CtDcQaHCYAL3CTwIAC"));
	  case "findPhone":return require("heatshrink").decompress(atob("mEwwILIv/+AgUD///4AFBg8//HgAoMGj/4sAFCAQIFfgYFD4EPAofghwFDuEcAoc4nAFDjkw4wFBscMuIFDx1hwwFBAYPjAofG8YdD4/HApPjAqIjEAovHsY1D45BFJopZFMopxFPosHAofwSoq/jAo0HAQL1Cgf//40BAAM87wECAAg"));
      case "wakeScreen":return require("heatshrink").decompress(atob("mEwwJC/AAkPwAECgP//AFCg///4FCj4FBCQU/AoPgAoN/4Ef+AFB/wZBDwMB/gCCgUDBwV+h0HDQU/jkP4AsCvg/Dh/8j5JDAokH/k+Igf4Aoc//E8AoRbBvhhEAoUD//wjAnBwIFBEIRaEn/AgIFDJ4QFIKoQdDAoibDgECbfA="));      
	  case "bri":return require("heatshrink").decompress(atob("jEXwIHEhAKCAQcEAgMGAQMCuADB+EAgICEgYCBnYFEBwoXCDoUGiEAhw9DAQ4ABA")); 
	  case "dndOn":return require("heatshrink").decompress(atob("mEwwIdag/gApMOuAFDn18Aof4j4ECgPAgeAAoIDBA4IiCAQIkChwCBEgUMKoQCBjACKBwUcAogaFAv4FEsACBgx8BPQQDBQwaMCTAYFH/4ACAozRNjCOCAo8MJITdHJIYAXA"));
	  case "dndOff":return require("heatshrink").decompress(atob("mEwwIdag/gEAIFEuAFBhwDBA4MAn18gPAAoP4j8DwEABAMDw4KBBAMBxwiCAQMcEQQCBnACBhgCBFwUYEoQFDgPYMgQlBzAFDg4aCAoMOAokcAok4AolwAongAoZUBAoZUBAoZUBAoZUBAoZdBAoZdBAoZdBAoVgRgMGKwPBRgMDQwODRgiDCgAFBQYQFCj//AAIaBn4FERgQACXYQABEoMYS4RdBAoZdCbYQuBboRPCIoL/TAAo"));
	  case "torch":return require("heatshrink").decompress(atob("mEwwILIgOAAp0EAoMQAoMMAoMwAoMGAoNgAoMDAQPADgcBAooqEADcP///+AFNABcHCIPgKYQFHKYYFHLIYFHFQd/Aol8nwFDngFdvwFDn/+AvX8ApIADA=="));
	  case "info":return require("heatshrink").decompress(atob("mE3wIcZn////+AoIEBAAOAgIFD4ED4AOBgfgg+ADYXwh4hDvEOAoc4AoscgEBD4McAoIhBgEYAoMHAoIMBAoPwAoYRCAoQdChAFBAAQjCApcBJ4I1FAoQ1CAoY1BAvBHFAoU8SoRZBTYytFXIqNDM4LRB/EPaILdB/kf/4OBj/+n/4DQUPvAmDh6zCEIQFEFYYABXIQAkA=="));
  	  case "calc":return E.toArrayBuffer(atob("MDCBAAAAAAAAAAAAAAAAAAAAAAAAAA//+B//8B///D//+B///n//+B///n//+B///n//+B///n//+B///n//+B///n//+BwADn//+BwADn//+BwADn//+B///n//+B///n//+B///n//+B///nAAOB///nAAOB///nAAOB///n//+A///H//+Af/8H//+AAAAH//+AAAAH//+Af/8HAAOA///HAAOB///nAAOB/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+BwADn//+BwADn//+BwADn//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B/j/n//+B///n//+B///D//+A//+B//8AAAAAAAAAAAAAAAAAAAAAAAAA=="));
   	  case "repellent":return E.toArrayBuffer(atob("MDCBAAAAAAAAAAAB//gAAAAH//8AAABH///AAAPP///wAAPP///4AAeOAAf8AAeAAAH+AAeADgB/AAcB/+A/gAwP//wfwAA///4PwAB///8H4AD/4f/D8AH+AD/D8AP8AA/h8APwAAfx+Afgf4Pw+AfB/+H4+A/D//D4/A+H//j4fA+H8/j4fB8PwPj4fB8PgPj4fB8PgPj4fB8fg/j4fB8fA/j4fB8fAfD4fB8fgeH4fB8PgIHw+B8PgAPw+B8PwAfx+B+H4A/h+A+H+D/D8A/D//+D4AfB//8H4Afg//4PwAPwP/gfwAP4B8B/gAH+AAD/AAD/gAf+AAB//P/8AAA////wAAAP///AAAAD//8AAAAA//gAAAAAAAAAAAAAAAAAAA=="));
   	  case "euc":return E.toArrayBuffer(atob("MDCBAAAAAB/gAAAAA//+AAAAD//+AAAAPgAcAAAA/+AAAAAD//8AAAAH///AAAAP///wAAAf///8AAB////+AAD/////AAH8//+/gAP4//8fwAPw//8P4Afg//8H4A/A//+D8A/A//+D8A+A//+B+B+B//+B+B+B//+A+B8B//+A/B8B//+A/B8B//+A/D8B//+A/D8A//+A/D8A//8A/B8AAAAA/B+AAAAA/B+AAAAB/B+AGAAB+B/AP/wB+A/Af/4D+A/g//8H8Afw//8P8Afwf/4f4AP8P/g/wAH/f/x/gAH/////gAD/////AAB/////AAA////+AAAf///8AAAP///wAAAH///gAAAB//+AAAAAf/4AAAAAH/4AAAAAAAAAAA=="));
	  case "weatherTemp":return E.toArrayBuffer(atob("EyCBAADgAH8AH/AH3wDg4BwcA4GAcDAOBgHAwDuYB3MA7mAdzAO5gHcwHucHnPHjjzj45j+Pz/n5/z8/5+f8/H8dx8c8AOPAeD9+Af+AD4A="));
	  case "weatherHum":return E.toArrayBuffer(atob("HSCBAAAAAAAAEAAAAcAAAB8AAAD4AAAP4AAA94AABxwAAHjwAAODgAA4DgADwHgAHAHAAcAHAB4APADgAOAOGAOAYQQMBwhAcDhUA4HAIBwOAoDgcCCHAYAgMA4AA4BwABwBwAHAB4AcAB4DwAB//AAA/4AAAEAA"));
	default:  return E.toArrayBuffer(atob("AQGBAAA="));//empty
	}
}