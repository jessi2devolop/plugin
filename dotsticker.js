const {
    Module 
} = require('../main');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {
    skbuffer
} = require('raganork-bot');
const Config = require('../config');
const {
    MODE,
    STICKER_DATA
} = require('../config');
const {
    getString
} = require('./misc/lang');
const {
    bass,
    sticker,
    addExif
} = require('./misc/misc');
const Lang = getString('converters');
let w = MODE == 'public' ? false : true
Module({
    pattern: '.sticker ?(.*)',
    use: 'edit',
    fromMe: w,
    desc: Lang.STICKER_DESC
}, (async (message, match) => {
    if (message.reply_message === false) return await message.sendMessage(Lang.STICKER_NEED_REPLY)
    var savedFile = await message.reply_message.download();
    var exif = {
        author: STICKER_DATA.split(";")[1] || "",
        packname: message.senderName,
        categories: STICKER_DATA.split(";")[2] || "😂",
        android: "https://github.com/souravkl11/Raganork-md/",
        ios: "https://github.com/souravkl11/Raganork-md/"
    }
    if (message.reply_message.image === true) {
        return await message.client.sendMessage(message.jid,{sticker: fs.readFileSync(await addExif(await sticker(savedFile),exif))},{quoted: message.quoted})
     } else {
        return await message.client.sendMessage(message.jid,{sticker:fs.readFileSync(await addExif(await sticker(savedFile,'video'),exif))},{quoted: message.quoted})
    }
}));
