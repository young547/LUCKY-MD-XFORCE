const conf = require('../set');
const { ezra } = require('../fredi/ezra');

ezra({
    nomCom: "ping",
    alias: "speed",
    desc: "Check bot's response time.",
    categorie: "General-Fredi",
    react: "🫧",
    filename: __filename
},
async (zk, mek, m, { from, quoted, reply }) => {
    try {
        const startTime = Date.now();

        // Add a short delay
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay

        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping result
        await zk.sendMessage(from, { 
            text: `*Lucky Xforce Run: ${ping}ms*`, 
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363313124070136@newsletter',
                    newsletterName: '@FrediEzra',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
