module.exports = async (frezra, msg, config) => {
  if (config.AUTO_READ_MESSAGE === 'true') {
    await frezra.readMessages([msg.key]);
  }
};