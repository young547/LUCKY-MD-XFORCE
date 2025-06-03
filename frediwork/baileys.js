// Baileys setup, connection, session
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const P = require('pino');

async function startBaileys() {
  const { state, saveCreds } = await useMultiFileAuthState('./frezra');
  const { version } = await fetchLatestBaileysVersion();

  const frezra = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    version,
  });

  frezra.ev.on('creds.update', saveCreds);
  return frezra;
}

module.exports = startBaileys;