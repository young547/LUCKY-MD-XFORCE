const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@adiwajshing/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const config = require('./config');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session/frezra');
  const { version } = await fetchLatestBaileysVersion();

  const fez = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['SIR_FREDIE_XBOT', 'Safari', '1.0.0']
  });

  fez.ev.on('creds.update', saveCreds);

  function formatNumber(num) {
    if (num.includes('@s.whatsapp.net')) return num;
    return `${num}@s.whatsapp.net`;
  }

  const sudoNumbers = (config.sudoNumbers || []).map(formatNumber);
  const ownerNumbers = (config.ownerNumbers || []).map(formatNumber);

  const commands = {};
  const pluginsPath = path.join(__dirname, 'plugins');
  fs.readdirSync(pluginsPath).forEach(file => {
    if (file.endsWith('.js')) {
      const cmd = require(path.join(pluginsPath, file));
      if (cmd.commands) {
        cmd.commands.forEach(c => {
          commands[c] = cmd;
        });
      } else {
        commands[cmd.name] = cmd;
      }
    }
  });

  function isSudo(user) {
    return sudoNumbers.includes(user);
  }

  function isOwner(user) {
    return ownerNumbers.includes(user) || isSudo(user);
  }

  const settings = {
    autoStatusSeen: config.autoStatusSeen === true,
    autoStatusReply: config.autoStatusReply === true,
    autoStatusDownload: config.autoStatusDownload === true,
    autoStatusLike: config.autoStatusLike === true,
    autoReactOwnMessage: config.autoReactOwnMessage === true,
    autoReactAwayMessage: config.autoReactAwayMessage === true,
    autoReactGroupMessage: config.autoReactGroupMessage === true,
    antiBotInGroup: config.antiBotInGroup === true,
    antiLinkGroup: config.antiLinkGroup === true,
    antiCall: config.antiCall === true,
    autoBlockContact: config.autoBlockContact === true,
    chatBot: config.chatBot === true,
    antiDeleteMessage: config.antiDeleteMessage === true
  };

  const modsController = {
    antiDeleteMessage: settings.antiDeleteMessage,
    antiBotInGroup: settings.antiBotInGroup,
    antiLinkGroup: settings.antiLinkGroup,
    welcome: true,
    goodbye: true
  };

  fez.ev.on('connection.update', update => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if ((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
        startBot();
      } else {
        console.log('Logged out from WhatsApp. Please reauthenticate.');
      }
    }
    console.log('Connection status:', connection);
  });

  fez.ev.on('group-participants.update', async (update) => {
    const metadata = await fez.groupMetadata(update.id);
    const groupName = metadata.subject;

    for (const participant of update.participants) {
      const user = participant;
      const name = (await fez.onWhatsApp(user))[0]?.notify || user.split('@')[0];

      if (update.action === 'add' && modsController.welcome) {
        await fez.sendMessage(update.id, {
          text: `👋 Welcome @${name} to *${groupName}*!`,
          mentions: [user]
        });
      }

      if (update.action === 'remove' && modsController.goodbye) {
        await fez.sendMessage(update.id, {
          text: `👋 Goodbye @${name}!`,
          mentions: [user]
        });
      }
    }
  });

  fez.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');

    // Set presence (simulate typing/recording)
    await fez.sendPresenceUpdate('recording', from);
    setTimeout(() => fez.sendPresenceUpdate('composing', from), 1000);
    setTimeout(() => fez.sendPresenceUpdate('available', from), 2000);

    // Anti delete
    if (modsController.antiDeleteMessage && msg.message.protocolMessage?.type === 0) {
      console.log('Message was deleted (anti-delete triggered).');
    }

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    if (!text.startsWith(config.prefix)) return;

    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (!commands[cmd]) return;

    if (commands[cmd].ownerOnly && !isOwner(sender)) {
      await fez.sendMessage(from, { text: '❌ Owner only command.' });
      return;
    }

    if (commands[cmd].sudoOnly && !isSudo(sender)) {
      await fez.sendMessage(from, { text: '❌ Sudo only command.' });
      return;
    }

    try {
      await commands[cmd].execute(fez, msg, args, {
        isOwner: isOwner(sender),
        isSudo: isSudo(sender),
        isGroup,
        modsController,
        settings
      });
    } catch (err) {
      console.error('Command error:', err);
      await fez.sendMessage(from, { text: '❌ Command error occurred.' });
    }
  });

  console.log('🤖 Bot started as SIR_FREDIE_XBOT');
}

startBot();
