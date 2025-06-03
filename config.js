const config = {
  ANTI_DELETE_MESSAGE: process.env.ANTI_DELETE_MESSAGE || "true",
  ANTI_BOT_ACTION: 'false', // Options: 'remove', 'warn', 'false'
  ANTI_CALL: process.env.ANTI_CALL || "true",
  STARTING_BOT_MESSAGE: process.env.STARTING_BOT_MESSAGE || "true",
  WARN_COUNT: process.env.WARN_COUNT || "3",
 ANTI_LINK: process.env.ANTI_LINK || 'false', // options: false, remove, delete, warn
  AUTO_READ_MESSAGE: process.env.AUTO_READ_MESSAGE || "true",
  PREFIX: process.env.PREFIX || ".",
  
  AUTO_REPLY_MESSAGE: process.env.AUTO_REPLY_MESSAGE || "true",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "true",
  WA_PRESENCE_MODE: 'composing', // options: composing, recording, available, unavailable
  WELCOME_MESSAGE_GROUP: process.env.WELCOME_MESSAGE_GROUP || "true",
  GOODBYE_MESSAGE_GROUP: process.env.GOODBYE_MESSAGE_GROUP || "true",
  BOT_NAME: process.env. BOT_NAME || "LUCKY-MD-XFORCE",
  AUTO_REACT_AWAY: process.env.AUTO_REACT_AWAY || "true",
  AUTO_REACT_HOME: process.env.AUTO_REACT_HOME || "true",
  AUTO_REACT_GROUP: process.env.AUTO_REACT_GROUP || "true",
    SESSION_ID: process.env.SESSION_ID || "", // replace your session I'd here
  AUTO_REACT_ALL: process.env.AUTO_REACT_ALL || "true",
  AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "true",
  AUTO_REACT_CHANNEL: process.env.AUTO_REACT_CHANNEL || "true",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || "false"
};

module.exports = config;
