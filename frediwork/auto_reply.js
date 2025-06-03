const fs = require('fs');
const path = require('path');

module.exports = async (frezra, msg, config) => {
  if (config.AUTO_REPLY_MESSAGE === 'true') {
    const senderJid = msg.key.participant || msg.key.remoteJid;
    const senderMention = senderJid.split('@')[0];

    // Send auto-reply message
    await frezra.sendMessage(msg.key.remoteJid, {
      text: `💬 Hello @${senderMention}! 👋\nThanks for your message.\nI’m currently auto-responding 🤖 – your message will be reviewed soon.`,
      mentions: [senderJid],
    });

    // Send reply audio if available
    const audioPath = path.resolve(__dirname, 'fredistudio/reply.mp3');
    if (fs.existsSync(audioPath)) {
      await frezra.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4',
        ptt: true,
      });
    }
  }
};
