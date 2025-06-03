const fs = require('fs');
const path = require('path');

module.exports = async (frezra, jid, participant, config) => {
  if (config.GOODBYE_MESSAGE_GROUP === 'true') {
    const username = participant.split('@')[0];

    // Ujumbe wa kuaga
    const goodbyeText = `👋 *Goodbye @${username}!* \n\nIt was nice having you in the group. We wish you all the best wherever you go! 😊`;

    // Path ya GIF ya kuambatanishwa
    const stickerPath = path.resolve(__dirname, 'fredistudio/goodbye.gif');

    // Tuma ujumbe wa maandishi
    await frezra.sendMessage(jid, {
      text: goodbyeText,
      mentions: [participant],
    });

    // Tuma GIF kama sticker au kama document ikiwa sticker haifanyi kazi
    if (fs.existsSync(stickerPath)) {
      await frezra.sendMessage(jid, {
        video: fs.readFileSync(stickerPath),
        gifPlayback: true,
        caption: '👋'
      });
    } else {
      console.warn('⚠️ goodbye.gif is not available in fredistudio/');
    }
  }
};
