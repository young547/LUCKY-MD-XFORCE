// frediwork/audio_reply.js
const fs = require('fs');
const path = require('path');

module.exports = async (frezra, msg, config) => {
  if (config.AUTO_AUDIO_REPLY !== 'true') return;
  if (!msg.message?.conversation) return;

  const text = msg.message.conversation.toLowerCase();

  const jsonPath = path.resolve(__dirname, '../fredistudio/fredisongs.json');
  if (!fs.existsSync(jsonPath)) return;

  let audioMap = {};
  try {
    audioMap = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch (err) {
    console.error('❌ Error reading fredisongs.json:', err);
    return;
  }

  // Angalia kama keyword ipo kwenye message
  for (const keyword in audioMap) {
    if (text.includes(keyword.toLowerCase())) {
      const audioFile = audioMap[keyword];
      const audioPath = path.resolve(__dirname, `../fredistudio/${audioFile}`);
      if (!fs.existsSync(audioPath)) return;

      await frezra.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4',
        ptt: true,
      });

      break; // Stop after first match
    }
  }
};
