const axios = require("axios");
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

// GitHub stats function
const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/Fred1e/LUCKY_MD");
        const forksCount = response.data.forks_count * 11;
        const starsCount = response.data.stargazers_count * 11;
        const totalUsers = forksCount + starsCount;
        return { forks: forksCount, stars: starsCount, totalUsers, updated_at: response.data.updated_at, created_at: response.data.created_at, html_url: response.data.html_url };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

// Bot Command
ezra({
    nomCom: "repo",
    aliases: ["script", "cs"],
    reaction: '🍼',
    nomFichier: __filename
}, async (command, reply, context) => {
    const { repondre, auteurMessage, nomAuteurMessage } = context;

    try {
        const stats = await fetchGitHubStats();

        const releaseDate = new Date(stats.created_at).toLocaleDateString('en-GB');
        const message = `
*Hello 👋 my friend ${nomAuteurMessage}*

*This is ${conf.BOT}*
the best bot in the universe developed by ${conf.OWNER_NAME}. Fork and give a star 🌟 to my repo!

╭═════〘 *📊 GitHub Stats* 〙═════
┣⁠✞  *Stars:* - ${stats.stars}
┣⁠✞  *Forks:* - ${stats.forks}
┣⁠✞  *Release Date:* - ${releaseDate}
┣⁠✞  *Repo:* - ${stats.html_url}
┣⁠✞  *Owner:*   *${conf.OWNER_NAME}*
╰═════════════════════`;

        await zk.sendMessage(command, {
            text: message,
            buttons: [
                { buttonId: ".menu", buttonText: { displayText: "📟 Menu" }, type: 1 },
                { buttonId: ".ping", buttonText: { displayText: "📶 Ping" }, type: 1 },
                { buttonId: "https://instagram.com/frediezra", buttonText: { displayText: "📷 Instagram" }, type: 1 },
                { buttonId: "https://facebook.com/FrediEzra", buttonText: { displayText: "📘 Facebook" }, type: 1 },
                { buttonId: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f", buttonText: { displayText: "📢 WhatsApp Channel" }, type: 1 },
                { buttonId: "https://youtube.com/@freeonlinetzT1", buttonText: { displayText: "▶️ YouTube" }, type: 1 },
            ],
            footer: "Powered by " + conf.BOT,
            headerType: 1
        });

    } catch (error) {
        console.error("Error in repo command:", error);
        repondre("❌ An error occurred while fetching the repository data.");
    }
});
