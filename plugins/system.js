const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { ezra } = require(__dirname + "/../fredi/ezra");
const os = require("os");
const moment = require("moment-timezone");
const set = require(__dirname + "/../set");
const moment = require("moment");

const AUDIO_URL = "https://files.catbox.moe/wdap4t.mp3"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/uw4l17.jpeg"; // New image URL

moment.tz.setDefault(`${set.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
ezra({ nomCom: "ping", categorie: "Fredi-General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            audio: { url: AUDIO_URL }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Voice note form
            contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
              newsletterJid: '120363313124070136@newsletter',
                  newsletterName: "@FrediEzra",
                  serverMessageId: 143,
                   },
                   forwardingScore: 999, // Score to indicate it has been forwarded
                   externalAdReply: {
                    title: "☢️LUCKY MD X-FORCE☢️",
                    body: `☢️lucky md xforce ping: ${ping}ms\n📅 *Date:* ${date}\n⏰ *Time:* ${time}`,
                    thumbnailUrl: THUMBNAIL_URL,
                    mediaType: 1,
                    renderSmallThumbnail: true // Small thumbnail rendering
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

// For repo request 
ezra({ 
    nomCom: "repo", 
    categorie: "Fredi-General", 
    reaction: "☢️", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { pushname, repondre } = commandeOptions;
    const githubRepo = 'https://api.github.com/repos/mr-X-force/LUCKY-MD-XFORCE';
    const img = 'https://files.catbox.moe/uw4l17.jpeg';
    const imgs = 'https://files.catbox.moe/uw4l17.jpeg';

    try {
        const response = await axios.get(githubRepo);
        const data = response.data;

        const created = moment(data.created_at).format("DD/MM/YYYY");
        const updated = moment(data.updated_at).format("DD/MM/YYYY");

        const gitdata = `

*╭━⊷*
*┋* *ɴᴀᴍᴇ:     ☢️LUCKY MD X-FORCE☢️*
*┋* *sᴛᴀʀs:*  ${data.stargazers_count}
*┋* *ғᴏʀᴋs:*  ${data.forks_count}
*┋* *ᴡᴀᴛᴄʜᴇʀs:*  ${data.watchers}
*┋* *ᴜᴘᴅᴀᴛᴇᴅ:*  ${updated}
*╰━⊷*

> https://lucky-md-xforce-deploy-your-bot-with-your-github-username.vercel.app

 ${data.html_url}


> regards FredieTech!`;


await zk.sendMessage(dest, { 
            image: { url: img },
            caption: gitdata,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363313124070136@newsletter",
                    newsletterName: "@FrediEzra",
                    serverMessageId: -1
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: "☢️LUCKY MD X-FORCE☢️",
                    body: "Repository info",
                    thumbnailUrl: imgs,
                    sourceUrl: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        // Send audio with caption
        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/tkjzh7.m4a" // Replace with your audio URL
            }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Set to true if you want it as a voice note
            caption: "☢️LUCKY MD X-FORCE☢️ REPO SONG,
            contextInfo: {
             isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: "120363313124070136@newsletter",
              newsletterName: "@FrediEzra",
               serverMessageId: -1
               },
                forwardingScore: 999,
                externalAdReply: {
               body: "☢️LUCKY MD X-FORCE☢️",
               thumbnailUrl: "https://files.catbox.moe/uw4l17.jpeg",
               sourceUrl: 'https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f',
               rendersmallThumbnail: false
                }
            }
        });

    } catch (e) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
    }
});


