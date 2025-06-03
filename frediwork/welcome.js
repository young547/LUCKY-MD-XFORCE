const fs = require('fs');
const path = require('path');

module.exports = async (frezra, jid, participant, config) => {
  if (config.WELCOME_MESSAGE_GROUP === 'true') {
    const username = participant.split('@')[0];

    const welcomeText = `🎉 *Welcome @${username}!* \n\nWe're glad to have you here! Enjoy your stay with us. 😊`;

    const gifPath = path.resolve(__dirname, 'fredistudio/welcome.gif');

    // Send welcome text message
    await frezra.sendMessage(jid, {
      text: welcomeText,
      mentions: [participant],
    });

    // Send welcome gif if available
    if (fs.existsSync(gifPath)) {
      await frezra.sendMessage(jid, {
        video: fs.readFileSync(gifPath),
        gifPlayback: true,
        caption: '🎉'
      });
    } else {
      console.warn('⚠️ welcome.gif not found in fredistudio/');
    }
  }
};
