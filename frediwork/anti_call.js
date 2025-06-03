module.exports = async (frezra, call, config) => {
  if (config.ANTI_CALL === 'true') {
    await frezra.rejectCall(call.id);
    await frezra.sendMessage(call.from, { text: '📵 Calls are not allowed!' });
  }
};