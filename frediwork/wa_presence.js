module.exports = async (frezra, config) => {
  const mode = config.WA_PRESENCE_MODE?.toLowerCase();

  switch (mode) {
    case 'available':
      await frezra.sendPresenceUpdate('available');
      break;
    case 'composing':
      await frezra.sendPresenceUpdate('composing');
      break;
    case 'recording':
      await frezra.sendPresenceUpdate('recording');
      break;
    case 'unavailable':
      await frezra.sendPresenceUpdate('unavailable');
      break;
    default:
      console.log(`⚠️ Invalid WA_PRESENCE_MODE: "${mode}". Must be one of: available, composing, recording, unavailable.`);
  }
};
