const fs = require('fs');
const path = require('path');

module.exports = async (frezra, msg) => {
  const imagePath = path.resolve(__dirname, '../fredistudio/menus.png');

  if (!fs.existsSync(imagePath)) {
    return await frezra.sendMessage(msg.key.remoteJid, {
      text: '❌ Menu image not found.',
    });
  }

  const buttons = [
    {
      buttonId: '.repo',
      buttonText: { displayText: '🛠 GitHub Repo' },
      type: 1,
    },
    {
      buttonId: '.website',
      buttonText: { displayText: '🌐 Visit Website' },
      type: 1,
    },
    {
      buttonId: '.menu',
      buttonText: { displayText: '📋 Menu' },
      type: 1,
    },
  ];

  const buttonMessage = {
    image: { url: imagePath },
    caption: `🌟 *FredieTech Multi-Bot Repo System* 🌟\n\nAccess source code, explore commands and contribute to development.`,
    footer: 'FredieTech © 2025',
    buttons: buttons,
    headerType: 4,
  };

  await frezra.sendMessage(msg.key.remoteJid, buttonMessage);
};
