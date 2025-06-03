const path = require('path');

module.exports = async (frezra, msg, config) => {
  if (
    config.ANTI_DELETE_MESSAGE === 'true' &&
    msg.messageStubType === 0x1 &&
    msg.key?.participant
  ) {
    const user = msg.key.participant;
    const deletedKey = msg.messageStubParameters?.[0]; // msg key of the deleted message
    const chat = msg.key.remoteJid;

    try {
      const metadata = await frezra.groupMetadata(chat).catch(() => null);
      const messages = await frezra.fetchMessages(chat, { limit: 10 });
      const deletedMsg = messages.find(m => m.key.id === deletedKey);

      if (!deletedMsg || !deletedMsg.message) return;

      const messageType = Object.keys(deletedMsg.message)[0];
      const typeMap = {
        conversation: "📝 Text Message",
        imageMessage: "🖼️ Image",
        videoMessage: "🎞️ Video",
        audioMessage: "🎧 Audio",
        documentMessage: "📄 Document",
        stickerMessage: "🖼️ Sticker",
        contactMessage: "👤 Contact",
        locationMessage: "📍 Location",
        pollCreationMessage: "📊 Poll",
      };

      const type = typeMap[messageType] || "📦 Unknown Message";

      await frezra.sendMessage(chat, {
        image: { url: path.resolve(__dirname, 'fredistudio/deleted_message.jpg') },
        caption: `⚠️ *A message was deleted!*\n👤 *User:* @${user.split('@')[0]}\n📨 *Type:* ${type}\n🕓 *Recovered:* (metadata unavailable for content)`,
        mentions: [user],
      });
    } catch (err) {
      console.error('❌ Anti-delete error:', err);
    }
  }
};
