/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
  Module
} = require('../main');
const fs = require("fs");
const {
  MODE,
  HANDLERS,
  AUDIO_DATA,
  BOT_INFO,
  settingsMenu
} = require('../config');
const config = require('../config');
const ffmpeg = require('fluent-ffmpeg');
// let parseBotJid = (id) => id+"@s.whatsapp.net";
const {
  getString
} = require('./misc/lang');
const {
  getJson,
  searchYT,
  searchSong
} = require('./misc/misc');
const {
    ytTitle,downloadYT, dlSong, ytv, getResolutions
  } = require('./misc/yt');
const Lang = getString('scrapers');
const {setVar} = require('./manage');
const {
  skbuffer,
  ytdlServer,
  getVideo,
  addInfo
} = require('raganork-bot');
let configs = settingsMenu
var handler = HANDLERS !== 'false'?HANDLERS.split("")[0]:""
let fm = MODE == 'public' ? false : true
const getID = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
//await message.client.sendMessage(message.jid,{document:file,mimetype:mime,fileName:match+"."+ext},{quoted: message.quoted});
Module({
  pattern: 'isong ?(.*)',
  fromMe: fm,
  desc: "To download songs in document format",
  use: 'download'
}, (async (message, match) => {
  if (!match[1] && !message.reply_message?.text) return message.sendReply(Lang.NEED_TEXT_SONG)
  var link = (match[1] || message.reply_message?.text).match(/\bhttps?:\/\/\S+/gi)
  if (link !== null && getID.test(link[0])) {
  let v_id = link[0].match(getID)[1]
  const title = await ytTitle(v_id);
  await message.sendReply(`*Downloading:* _${title}_`)
  let sdl = await dlSong(v_id);
  ffmpeg(sdl)
  .save('./temp/song.mp3')
  .on('end', async () => { 
  var song = await addInfo('./temp/song.mp3',title,BOT_INFO.split(";")[0],"Jessi MD audio downloader",await skbuffer(`https://i3.ytimg.com/vi/${link[0].match(getID)[1]}/hqdefault.jpg`))
  return await message.client.sendMessage(message.jid, {document:song,mimetype: 'audio/mp4':fileName.title}, {quoted: message.data});
 }); 
} else {
  var myid = message.client.user.id.split("@")[0].split(":")[0]
  var sr = await searchYT(match[1]);
  sr = sr.videos.splice(0,20);
  if (sr.length < 1) return await message.sendReply(Lang.NO_RESULT);
  var list = `_*Results matching "${match[1]}":*_\n\n` // format using Lang.MATCHING_SONGS
  var _i = 0;
  for (var i in sr){
    const title = sr[i].title?.text
    const dur = sr[i].thumbnail_overlays[0]?.text
    if (title && dur){
      _i++
      list+=`${_i}. *_${title} (${dur})_*\n`
  }
  }
  list+=`\n_Send number as reply to download song as document_`
  return await message.sendReply(list)
}
}));
