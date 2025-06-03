const { addWarn, getWarnCount } = require('./warn_manager'); // Hakikisha ipo

module.exports = async (frezra, msg, config) => {
  const antiLinkMode = config.ANTI_LINK?.toLowerCase();
  const messageText = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
  const isLink = messageText.includes('http');

  if (!isLink || !['remove', 'warn', 'delete'].includes(antiLinkMode)) return;

  const jid = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;

  switch (antiLinkMode) {
    case 'remove':
      await frezra.sendMessage(jid, { text: '🚫 Link detected and removed.' }, { quoted: msg });
      await frezra.sendMessage(jid, { delete: msg.key });
      break;

    case 'warn':
      const warnCount = addWarn(sender);
      await frezra.sendMessage(jid, {
        text: `⚠️ Link not allowed! Warning ${warnCount}/3.`,
        mentions: [sender],
      });
      if (warnCount >= 5) {
        await frezra.sendMessage(jid, { text: `⛔ @${sender.split('@')[0]} removed due to too many warnings.`, mentions: [sender] });
        await frezra.groupParticipantsUpdate(jid, [sender], 'remove');
      }
      break;

    case 'delete':
      await frezra.sendMessage(jid, { text: `🔗 Link detected. Removing @${sender.split('@')[0]} from group...`, mentions: [sender] });
      await frezra.groupParticipantsUpdate(jid, [sender], 'remove');
      break;

    default:
      break;
  }
};
