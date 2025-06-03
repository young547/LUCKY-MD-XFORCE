// brain.js
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");
const { Boom } = require("@hapi/boom");

// Auth state
const { state, saveState } = useSingleFileAuthState("./frezra/creds.json");

// Load config vars
const config = require("./config");
const emojiMap = require("./fredistudio/emoji");

// Handlers
const antiDelete = require("./frediwork/anti_delete");
const antiBot = require("./frediwork/anti_bot");
const antiCall = require("./frediwork/anti_call");
const antiBot = require("./frediwork/audio_reply");
const antiLink = require("./frediwork/anti_link");
const autoReact = require("./frediwork/auto_react");
const autoRead = require("./frediwork/auto_read");
const autoReply = require("./frediwork/auto_reply");
const welcome = require("./frediwork/welcome");
const goodbye = require("./frediwork/goodbye");
const waPresence = require("./frediwork/wa_presence");
const startMessage = require("./frediwork/start_message");
const warnManager = require("./frediwork/warn_manager");

// Load all plugins from plugins folder
const plugins = [];
fs.readdirSync("./plugins").forEach(file => {
  const plugin = require(`./plugins/${file}`);
  plugins.push(plugin);
});

async function startBot() {
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["LUCKY-MD-XFORCE", "Chrome", "10.0"]
  });

  frezra.ev.on("creds.update", saveState);

  frezra.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect?.error = new Boom(lastDisconnect?.error))?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    }
  });

  frezra.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    if (config.STARTING_BOT_MESSAGE === "true") startMessage(frezra, msg);
    if (config.ANTI_DELETE_MESSAGE === "true") antiDelete(frezra, msg);
    if (config.ANTI_BOT === "true") antiBot(frezra, msg);
    if (config.ANTI_CALL === "true") antiCall(frezra, msg);
    if (config.ANTI_LINK === "true") antiLink(frezra, msg);
    if (config.AUTO_READ_MESSAGE === "true") autoRead(frezra, msg);
    if (config.AUTO_AUDIO_REPLY === "true")     audioReply(frezra, msg, config);
    if (config.AUTO_REPLY_MESSAGE === "true") autoReply(frezra, msg);
    if (config.AUTO_REACT_AWAY === "true") autoReact(frezra, msg, "away", emojiMap);
    if (config.AUTO_REACT_HOME === "true") autoReact(frezra, msg, "home", emojiMap);
    if (config.AUTO_REACT_GROUP === "true") autoReact(frezra, msg, "group", emojiMap);
    if (config.AUTO_REACT_ALL === "true") autoReact(frezra, msg, "all", emojiMap);
    if (config.AUTO_REACT_STATUS === "true") autoReact(frezra, msg, "status", emojiMap);
    if (config.AUTO_REACT_CHANNEL === "true") autoReact(frezra, msg, "channel", emojiMap);
    if (config.AUTO_READ_STATUS === "true") autoRead(frezra, msg, "status");
    if (config.AUTO_DOWNLOAD_STATUS === "true") autoRead(frezra, msg, "download_status");
    if (config.WELCOME_MESSAGE === "true") welcome(frezra, msg);
    if (config.GOODBYE_MESSAGE === "true") goodbye(frezra, msg);
    if (config.WA_PRESENCE === "true") waPresence(frezra, msg);

    // Process command
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!body) return;
    const prefix = config.PREFIX;
if (!body.startsWith(prefix)) return;

const command = body.slice(prefix.length).split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);

    const plugin = plugins.find(cmd => cmd.name === command || (cmd.alias && cmd.alias.includes(command)));
    if (plugin) {
      try {
        await plugin.execute(frezra, msg, args, config);
      } catch (err) {
        console.log("Plugin error:", err);
        await frezra.sendMessage(msg.key.remoteJid, { text: "❌ Error executing command. Check logs." });
      }
    }
  });
}

startBot();
