// In-memory warn database (unaweza badilisha kuwa file au DB)
const warnDB = {};

module.exports = {
  warnUser: async (frezra, jid, user, reason = 'Violation') => {
    // Add warning count
    warnDB[user] = (warnDB[user] || 0) + 1;
    const warnCount = warnDB[user];

    // Send warning message
    await frezra.sendMessage(jid, {
      text: `⚠️ @${user.split('@')[0]} has been warned.\nReason: ${reason}\nWarnings: ${warnCount}/3`,
      mentions: [user],
    });

    // Auto-remove if reached 3
    if (warnCount >= 3) {
      await frezra.sendMessage(jid, {
        text: `❌ @${user.split('@')[0]} has been removed for exceeding warnings.`,
        mentions: [user],
      });
      await frezra.groupParticipantsUpdate(jid, [user], 'remove');
      warnDB[user] = 0; // Reset after removal
    }
  },

  removeUser: async (frezra, jid, user) => {
    await frezra.groupParticipantsUpdate(jid, [user], 'remove');
    warnDB[user] = 0; // Reset warn count on removal
  },

  getWarnCount: (user) => {
    return warnDB[user] || 0;
  },

  resetWarn: (user) => {
    warnDB[user] = 0;
  },

  getWarnList: () => {
    return warnDB;
  },
};
