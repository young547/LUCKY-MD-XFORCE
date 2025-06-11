const axios = require("axios");
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const settings = require(__dirname + "/../set");
const readMore = String.fromCharCode(8206).repeat(4001);

// ... (other functions and variables)

ezra({
  nomCom: "fredz",
  aliases: ["liste", "helplist", "commandlist"],
  categorie: "system"
}, async (message, client, config) => {
  const { ms, respond, prefix, nomAuteurMessage } = config;
  const commands = require(__dirname + "/../fredi/ezra").cm;
  const categorizedCommands = {};
  const mode = settings.MODE.toLowerCase() !== "public" ? "Private" : "Public";

  // ... (menu command logic)

  const buttons = [
    {
      buttonId: 'allcommands',
      buttonText: { displayText: 'All Commands' },
      type: 1
    },
    {
      buttonId: 'owner',
      buttonText: { displayText: 'Owner' },
      type: 1
    }
  ];

  try {
    const senderName = message.sender || message.from;
    await client.sendMessage(message, {
      text: responseMessage + commandsList,
      buttons: buttons,
      contextInfo: {
        mentionedJid: [senderName],
        externalAdReply: {
          title: settings.BOT,
          body: settings.OWNER_NAME,
          thumbnailUrl: settings.URL,
          sourceUrl: settings.GURL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.error("Menu error: ", error);
    respond(" Menu error: " + error);
  }
});

ezra({
  nomCom: "allcommands",
  categorie: "system"
}, async (message, client, config) => {
  const commands = require(__dirname + "/../fredi/ezra").cm;
  let commandsList = "*𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*\n";
  for (const command of commands) {
    commandsList += `\n*${command.nomCom}* - ${command.description || 'No description'}`;
  }
  await client.sendMessage(message, { text: commandsList });
});

ezra({
  nomCom: "owner",
  categorie: "system"
}, async (message, client, config) => {
  const ownerMessage = `*OWNER INFORMATION*\n\n*Name:* ${settings.OWNER_NAME}\n*Contact:* ${settings.OWNER_NUMBER}`;
  await client.sendMessage(message, { text: ownerMessage });
});
