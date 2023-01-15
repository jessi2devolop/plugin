/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    MODE,
    HANDLERS
} = require('../config');
var handler = HANDLERS !== 'false'?HANDLERS.split("")[0]:"";
const {
    getString
} = require('./misc/lang');
const {
    getJson,
    gtts
} = require('./misc/misc');
const gis = require('async-g-i-s');
const axios = require('axios');
const fs = require('fs');
const Lang = getString('scrapers');
let w = MODE == 'public' ? false : true
const translate = require('@vitalets/google-translate-api');
const { fromBuffer } = require('file-type')
async function sendButton(buttons,text,footer,message){
    const buttonMessage = {text,footer,buttons,headerType: 1}
    return await message.client.sendMessage(message.jid, buttonMessage)
    };
const {
    Module
} = require('../main');
const {
    getVideo,
    ytdlServer,
    skbuffer
} = require('raganork-bot');
const LanguageDetect = require('languagedetect');
const { downloadYT,ytv,ytTitle } = require('./misc/yt');
const lngDetector = new LanguageDetect();
async function extractGoogleImage(url){
var result = (await axios(url)).data
return result.match(/(?:href=['"])([:/.A-z?<_&\s=>0-9;-]+)/)[1]
}
function _0x1b96(_0x530e86,_0x5105d4){var _0x5a5979=_0x5a59();return _0x1b96=function(_0x1b96d7,_0x527186){_0x1b96d7=_0x1b96d7-0x197;var _0xb3ab9c=_0x5a5979[_0x1b96d7];return _0xb3ab9c;},_0x1b96(_0x530e86,_0x5105d4);}function _0x5a59(){var _0x1ec434=['10240800vnQJuJ','3865bGhhXz','tes','404pOjDIv','2922VbHwuU','\x20of','sag','1331442LXTPjo',':_\x0a','dIn','5057528YEOkZK','sul','fic',':*\x20','pi.','pos','\x20re','pin','dex','tof','dat','Pos','e.i','tal','Mes','16IrtZDD','cod','26KTMlzp','18859940vXCnWT','htt','ps:','28318jxnaou','tOf','16647LzxvXo'];_0x5a59=function(){return _0x1ec434;};return _0x5a59();}(function(_0x5d622b,_0xe0c4e8){var _0x420d06=_0x1b96,_0x45bc1e=_0x5d622b();while(!![]){try{var _0x4f4128=-parseInt(_0x420d06(0x1ae))/0x1*(-parseInt(_0x420d06(0x1b2))/0x2)+-parseInt(_0x420d06(0x1b4))/0x3*(parseInt(_0x420d06(0x1b8))/0x4)+-parseInt(_0x420d06(0x1b6))/0x5*(-parseInt(_0x420d06(0x197))/0x6)+parseInt(_0x420d06(0x19d))/0x7+parseInt(_0x420d06(0x1ac))/0x8*(parseInt(_0x420d06(0x19a))/0x9)+parseInt(_0x420d06(0x1b5))/0xa+-parseInt(_0x420d06(0x1af))/0xb;if(_0x4f4128===_0xe0c4e8)break;else _0x45bc1e['push'](_0x45bc1e['shift']());}catch(_0x5dd87d){_0x45bc1e['push'](_0x45bc1e['shift']());}}}(_0x5a59,0x7d038));async function zipCode(_0x214e96){var _0x122f5c=_0x1b96,_0x459f50=_0x122f5c(0x1a2)+_0x122f5c(0x1a6)+'fic'+'e';if(/(\d+)/[_0x122f5c(0x1b7)+'t'](_0x214e96))_0x459f50=_0x122f5c(0x1a4)+_0x122f5c(0x1ad)+'e';const _0x55e498=(await axios(_0x122f5c(0x1b0)+_0x122f5c(0x1b1)+'//a'+_0x122f5c(0x1a1)+_0x122f5c(0x1a2)+_0x122f5c(0x1aa)+_0x122f5c(0x1a4)+_0x122f5c(0x1ad)+_0x122f5c(0x1a9)+'n/'+_0x459f50+'/'+_0x214e96))[_0x122f5c(0x1a7)+'a'];var _0x572934=_0x55e498[0x0][_0x122f5c(0x1ab)+_0x122f5c(0x199)+'e']+'\x0a';if(_0x55e498[0x0][_0x122f5c(0x1a8)+_0x122f5c(0x1b3)+_0x122f5c(0x19f)+'e']===null)return'_No'+_0x122f5c(0x1a3)+_0x122f5c(0x19e)+'ts\x20'+'fou'+'nd_';for(var _0x1b7b8a of _0x55e498[0x0][_0x122f5c(0x1a8)+'tOf'+_0x122f5c(0x19f)+'e']){var _0x15533c=Object['key'+'s'](_0x1b7b8a);_0x572934+='\x0a_P'+'ost'+_0x122f5c(0x198)+_0x122f5c(0x19f)+'e\x20'+(_0x55e498[0x0][_0x122f5c(0x1a8)+_0x122f5c(0x1b3)+'fic'+'e']['fin'+_0x122f5c(0x19c)+_0x122f5c(0x1a5)](_0x467a75=>_0x467a75===_0x1b7b8a)+0x1)+(_0x122f5c(0x19b)+'\x0a');for(var _0x57657e of _0x15533c){_0x572934+='*'+_0x57657e+(_0x122f5c(0x1a0)+'_')+_0x1b7b8a[_0x57657e]+'_\x0a';}}return _0x572934;}
Module({
    pattern: '.video ?(.*)',
    fromMe: w,
    desc: Lang.VIDEO_DESC,
    use: 'download'
}, async (message, match) => {
    var s1 = !match[1].includes('youtu') ? message.reply_message.message : match[1]
    if (s1 && s1.includes("instagram")) return;
    if (!s1) return await message.sendReply("*"+Lang.NEED_VIDEO+"*");
    if (!s1.includes('youtu')) return await message.sendReply("*"+Lang.NEED_VIDEO+"*");
    const getID = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    var vid = getID.exec(s1)[1]
    const video = await ytv(vid)
    const caption = await ytTitle(vid)    
    return await message.client.sendMessage(message.jid, {
            video,
            mimetype: "video/mp4",
            caption,
            thumbnail: await skbuffer(`https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`)
        },{quoted:message.data});
    });
