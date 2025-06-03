const fs = require('fs');
const path = require('path');

module.exports = async (frezra, config) => {
  if (config.BOT_STARTING_MESSAGE === 'true') {
    const botName = config.BOT_NAME || 'YourBot';
    const userJid = frezra.user.id;

    // Send image with caption
    const imagePath = path.resolve(__dirname, 'fredistudio/start.png');
    if (fs.existsSync(imagePath)) {
      await frezra.sendMessage(userJid, {
        image: fs.readFileSync(imagePath),
        caption: `✅ *${botName} is now active and running!* \nWelcome back! I'm here to assist you. 🤖`,
      });
    }

    // Send start audio
    const audioPath = path.resolve(__dirname, 'fredistudio/start.mp3');
    if (fs.existsSync(audioPath)) {
      await frezra.sendMessage(userJid, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4',
        ptt: true,
      });
    }

    // Send fallback text if files are missing
    if (!fs.existsSync(imagePath) || !fs.existsSync(audioPath)) {
      await frezra.sendMessage(userJid, {
        text: `🤖 *${botName} is now running!*`,
      });
    }
  }
};
