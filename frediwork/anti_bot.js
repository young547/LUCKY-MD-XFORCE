const { warnUser, removeUser } = require('../warn_manager');

module.exports = async (frezra, msg, config) => {
  const jid = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.participant || msg.key.remoteJid;
  const isBot = sender?.includes('bot');

  if (!isBot) return;

  const action = config.ANTI_BOT_ACTION?.toLowerCase(); // remove / warn / false

  switch (action) {
    case 'remove':
      await frezra.sendMessage(jid, {
        text: `🚫 Bot detected: @${sender.split('@')[0]} has been removed.`,
        mentions: [sender],
      });
      await removeUser(frezra, jid, sender);
      break;

    case 'warn':
      await warnUser(frezra, jid, sender, 'Using unauthorized bot.');
      break;

    default:
      // Do nothing if false or undefined
      break;
  }
};
