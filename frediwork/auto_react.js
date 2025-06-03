const emojis = require('./fredistudio/emoji.json');

module.exports = async (frezra, msg, config, ownerNumber) => {
  const from = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const isGroup = from.endsWith('@g.us');
  const isChannel = from.endsWith('@broadcast');
  const isOwner = sender.includes(ownerNumber);

  const sendReaction = async (emojiList) => {
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    await frezra.sendMessage(from, {
      react: {
        text: emoji,
        key: msg.key,
      },
    });
  };

  if (config.AUTO_REACT_STATUS === 'true' && msg.message?.protocolMessage?.type === 3) {
    await sendReaction(emojis.auto_react_status);
  }

  if (config.AUTO_REACT_GROUP === 'true' && isGroup) {
    await sendReaction(emojis.auto_react_group);
  }

  if (config.AUTO_REACT_CHANNEL === 'true' && isChannel) {
    await sendReaction(emojis.auto_react_channel);
  }

  if (config.AUTO_REACT_HOME === 'true' && isOwner) {
    await sendReaction(emojis.auto_react_home);
  }

  if (config.AUTO_REACT_AWAY === 'true' && !isOwner) {
    await sendReaction(emojis.auto_react_away);
  }
};
