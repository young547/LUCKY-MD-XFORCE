const { ezra } = require(__dirname + "/../fredi/ezra");
const util = require('util');
const fs = require('fs-extra');
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
}

// Command to list all bot commands along with descriptions and aliases
ezra({
    nomCom: "help",
    reaction: "🤦",
    aliases: ["panelist", "commandlist", "cmdlist", "list"],
    desc: "Get bot command list.",
    categorie: "Fredi-Menu"
}, async (dest, zk, context) => {
    const { respond, prefix, nomAuteurMessage } = context;
    const commands = require(__dirname + "/../fredi/ezra").cm;

    let menu = '☢️LUCKY MD X-FORCE☢️ COMMAND LIST\n\n';
    let ezraList = [];

    // Loop through all commands to fetch the relevant information (commands, description, and aliases)
    commands.forEach((command) => {
        const { nomCom, desc = 'No description available', aliases = 'No aliases', categorie, reaction } = command;

        // Ensure no command with undefined 'nomCom' gets added
        if (nomCom) {
            ezraList.push({ nomCom, desc, aliases, categorie, reaction });
        }
    });

    // Sort the command list alphabetically by command name
    ezraList.sort((a, b) => a.nomCom.localeCompare(b.nomCom));

    // Format and add each command, description, and alias to the menu
    ezraList.forEach(({ nomCom, desc, aliases, categorie, reaction }, index) => {
        menu += `${index + 1}. ${toFancyUppercaseFont(nomCom.trim())}\n`;
        menu += `Description: ${toFancyLowercaseFont(desc)}\n`;
        menu += `Aliases: ${toFancyLowercaseFont(aliases)}\n`;
        menu += `Category: ${toFancyLowercaseFont(categorie)}\n`;
        menu += `Reaction: ${toFancyLowercaseFont(reaction)}\n\n`;
    });

    // Send the formatted menu as a message
    return await zk.sendMessage(dest, {
        text: menu,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363313124070136@newsletter',
         newsletterName: "@FrediEzra",
         serverMessageId: 143,
            }
        }
    });
});


// ALL MENU LIST COMMANDS BOT
ezra({ 
    nomCom: "menu", 
    categorie: "Fredi-Menu", 
    reaction: "☢️", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
    const { cm } = require("../fredi/ezra");
    let coms = {};
    let mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_es_Salaam");
    const hour = moment().hour();
    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ!";
    else if (hour >= 18) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ!";
    else if (hour >= 22 || hour < 5) greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/3o37c5.jpeg';
    const imgs = 'https://files.catbox.moe/uw4l17.jpeg';

    const infoMsg = `
╭┈┈┈┈━⊷
*┋* *ʙᴏᴛ ɴᴀᴍᴇ :  ☢️LUCKY MD X-FORCE☢️*
*┋* *ᴘʀᴇғɪx :* [ ${s.PREFIXE} ]
*┋* *ᴍᴏᴅᴇ :* ${mode}
*┋* *ᴅᴀᴛᴇ  :* ${date}
*┋* *ᴘʟᴀᴛғᴏʀᴍ :* ${os.platform()}
*┋* *ᴏᴡɴᴇʀ ɪs : FREDI*
*┋* *ᴘʟᴜɢɪɴs ᴄᴍᴅ :* ${cm.length}
╰┈┈┈┈━⊷\n`;
    
    let menuMsg = ` *${greeting}*`;
    
    for (const cat in coms) {
        menuMsg += `
*「 ${toFancyUppercaseFont(cat)} 」*
╭─━⊷ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
*┋* ${toFancyLowercaseFont(cmd)}`;   
        }
        menuMsg += `
╰─━⊷`;
    }
    
    menuMsg += `
> @made by FredieTech 2025\n`;

    try {
        await zk.sendMessage(dest, { 
            image: { url: img },
            caption: infoMsg + menuMsg,
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
                    body: "🗡️FredieTech Commands List",
                    thumbnailUrl: imgs,
                    sourceUrl: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
      } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
    
      
 // COMMAND TO GET BIBLE VERSE LIST
ezra({ nomCom: "bible-list", categorie: "Fredi-Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../fredi//ezra");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_Es_Salam");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `

🤲🕍  ┈─• *HOLY BIBLE* •─┈  🕍🤲

 💫 𝘈𝘭𝘭 Holy books 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘧𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 books 𝘵𝘺𝘱𝘦 ${s.PREFIXE}bible judges 2:3 Or ${s.PREFIXE}biblie judges 3:6💫🌸 

📜 *Old Testament.* 📜
1. 🧬 Genesis (MWANZO)
2. ♟️ Exodus (KUTOKA)
3. 🕴️ Leviticus (WALAWI)
4. 🔢 Numbers (HESABU)
5. 🗞️ Deuteronomy (TORATI)
6. 🍁 Joshua (JOSHUA)
7. 👨‍⚖️ Judges (WAAMUZI)
8. 🌹 Ruth (RUTH)
9. 🥀 1 Samuel (1SAMWELI)
10. 🌺 2 Samuel (2 SAMWEL)
11. 🌷 1 Kings (1 WAFALME)
12. 👑 2 Kings(2 WAFALME)
13. 🪷 1 Chronicles (1 WATHESALONIKE)
14. 🌸 2 Chronicles (2 WATHESALONIKE)
15. 💮 Ezra (EZRA)
16. 🏵️ Nehemiah (NEHEMIA)
17. 🌻 Esther (ESTA)
18. 🌼 Job (AYUBU)
19. 🍂 Psalms (ZABURI)
20. 🍄 Proverbs (MITHALI)
21. 🌾 Ecclesiastes (MHUBIRI)
22. 🌱 Song of Solomon (WIMBO WA SULEMAN)
23. 🌿 Isaiah (ISAYA)
24. 🍃 Jeremiah (YEREMIA)
25. ☘️ Lamentations (MAOMBOLEZO)
26. 🍀 Ezekiel (EZEKIEL)
27. 🪴 Daniel (DANIEL)
28. 🌵 Hosea (HESEA)
29. 🌴 Joel (JOEL)
30. 🌳 Amos (AMOSI)
31. 🌲 Obadiah (OBADIA)
32. 🪵 Jonah (YONA)
33. 🪹 Micah (MIKA)
34. 🪺 Nahum (NAHUM)
35. 🏜️ Habakkuk (HABAKUKI)
36. 🏞️ Zephaniah (ZEFANIA)
37. 🏝️ Haggai (HAGAI)
38. 🌅 Zechariah (ZAKARIA)
39. 🌄 Malachi (MALAKI)

📖 *New Testament.* 📖
1. 🌈 Matthew (MATHAYO)
2. ☔ Mark (MARKO)
3. 💧 Luke (LUKA)
4. ☁️ John (JOHN)
5. 🌨️ Acts (MATENDO)
6. 🌧️ Romans (WARUMI)
7. 🌩️ 1 Corinthians (1 WAKORITHO)
8. 🌦️ 2 Corinthians (2 WAKORITHO)
9. ⛈️ Galatians (WAGALATIA)
10. 🌥️ Ephesians (WAEFESO)
11. ⛅ Philippians (WAFILIPI)
12. 🌤️ Colossians (WAKOLOSAI)
13. ☀️ 1 Thessalonians (1 WATHESALONIKE)
14. 🪐 2 Thessalonians (2WATHESALONIKE)
15. 🌞 1 Timothy (TIMOTHEO)
16. 🌝 2 Timothy (2TIMOTHEO)
17. 🌚 Titus (TITO)
18. 🌜 Philemon (FILEMONI)
19. 🌛 Hebrews (WAEBRANIA)
20. ⭐ James (JAMES)
21. 🌟 1 Peter (1 PETER)
22. ✨ 2 Peter (2 PETER)
23. 💫 1 John (1 JOHN)
24. 🌙 2 John (2JOHN)
25. ☄️ 3 John (3 JOHN)
26. 🌠 Jude (YUDA)
27. 🌌 Revelation (UFUNUO WA YOHANA)


❤️BY LUCKY MD X-FORCE❤️
`;
    
let menuMsg = `
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
> *POWERED BY LUCKY MD X-FORCE*

> ©FrediEzra

 `;

        // Use correct variable for sender name
    try {
        await zk.sendMessage(dest, { 
            image: { url: "https://files.catbox.moe/uw4l17.jpeg" },
            caption: infoMsg + menuMsg,
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
                    body: "📖Bible Verse List",
                    thumbnailUrl: "https://files.catbox.moe/3o37c5.jpeg",
                    sourceUrl: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
      } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});



// Quran Menu List
ezra({ nomCom: "quran-menu", categorie: "Fredi-Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../fredi/ezra");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_Es_Salam");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `

🤲🕌  ┈• *QURAN KAREEM* •┈  🕌🤲

 💫 𝘈𝘭𝘭 𝘴𝘶𝘳𝘢𝘩 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘧𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 𝘴𝘶𝘳𝘢𝘩 𝘵𝘺𝘱𝘦 ${s.PREFIXE}quran 57 OR ${s.PREFIXE}surah 57 💫🌸 

1. 🕌 Al-Fatiha (The Opening) - الفاتحہ (پہلا سورہ)


2. 🐄 Al-Baqarah (The Cow) - البقرہ (گائے)


3. 🏠 Aali Imran (The Family of Imran) - آل عمران (عمران کا خاندان)


4. 👩 An-Nisa' (The Women) - النساء (عورتیں)


5. 🍽️ Al-Ma'idah (The Table Spread) - المائدہ (پھیلی ہوئی میز)


6. 🐪 Al-An'am (The Cattle) - الانعام (مویشی)


7. ⛰️ Al-A'raf (The Heights) - الأعراف (بلندیاں)


8. ⚔️ Al-Anfal (The Spoils of War) - الانفال (غنائم)


9. 🙏 At-Tawbah (The Repentance) - التوبہ (توبہ)


10. 🐟 Yunus (Jonah) - یونس (یونس)


11. 🌩️ Hud (Hud) - ہود (ہود)


12. 👶 Yusuf (Joseph) - یوسف (یوسف)


13. ⚡ Ar-Rad (The Thunder) - الرعد (گرج)


14. 🕊️ Ibrahim (Abraham) - ابراہیم (ابراہیم)


15. 🪨 Al-Hijr (The Rocky Tract) - الحجر (پتھرائی زمین)


16. 🐝 An-Nahl (The Bee) - النحل (مکھی)


17. 🌙 Al-Isra' (The Night Journey) - الإسراء (رات کا سفر)


18. 🕳️ Al-Kahf (The Cave) - الکہف (غار)


19. 🧕🏻 Maryam (Mary) - مریم (مریم)


20. 📜 Ta-Ha (Ta-Ha) - طٰہٰ (طٰہٰ)


21. 📖 Al-Anbiya' (The Prophets) - الانبیاء (پیغمبروں)


22. 🕋 Al-Hajj (The Pilgrimage) - الحج (حج)


23. 🙌 Al-Mu'minun (The Believers) - المؤمنون (ایمان والے)


24. 💡 An-Nur (The Light) - النور (روشنی)


25. ⚖️ Al-Furqan (The Criterion) - الفرقان (فرق کرنے والا)


26. 🎤 Ash-Shu'ara' (The Poets) - الشعراء (شاعر)


27. 🐜 An-Naml (The Ant) - النمل (چڑیا)


28. 📚 Al-Qasas (The Stories) - القصص (کہانیاں)


29. 🕷️ Al-Ankabut (The Spider) - الأنعام (مکڑی)


30. 🏛️ Ar-Rum (The Romans) - الروم (رومی)


31. 📖 Luqman (Luqman) - لقمان (لقمان)


32. 🙇 As-Sajda (The Prostration) - السجدہ (سجدہ)


33. ⚔️ Al-Ahzab (The Combined Forces) - الاحزاب (مخلوط قوتیں)


34. 🌸 Saba' (Sheba) - سبا (سبا)


35. 🛠️ Fatir (The Originator) - فاطر (خالق)


36. 📖 Ya-Sin (Ya-Sin) - یس (یس)


37. 🛡️ As-Saffat (Those who set the Ranks) - الصافات (صفیں مرتب کرنے والے)


38. 🅱️ Sad (The Letter Sad) - صاد (حرف صاد)


39. 🪖 Az-Zumar (The Troops) - الزمر (جنگی دستے)


40. 🤲 Ghafir (The Forgiver) - غافر (بخشنے والا)


41. 📜 Fussilat (Explained in Detail) - فصلت (تفصیل سے بیان)


42. 🗣️ Ash-Shura (Consultation) - الشوری (مشاورت)


43. 💰 Az-Zukhruf (The Gold Adornments) - الزخرف (سونے کے زیور)


44. 💨 Ad-Dukhan (The Smoke) - الدخان (دھواں)


45. 🐊 Al-Jathiyah (The Crouching) - الجاثیہ (جھکنا)


46. 🌪️ Al-Ahqaf (The Wind-Curved Sandhills) - الأحقاف (ہوائی چکروں والی ریت کی پہاڑیاں)


47. 🕋 Muhammad (Muhammad) - محمد (محمد)


48. 🏆 Al-Fath (The Victory) - الفتح (فتح)


49. 🏠 Al-Hujurat (The Rooms) - الحجرات (کمرے)


50. 🔤 Qaf (The Letter Qaf) - قاف (حرف قاف)


51. 🌬️ Adh-Dhariyat (The Winnowing Winds) - الذاریات (پھٹنے والی ہوائیں)


52. ⛰️ At-Tur (The Mount) - الطور (پہاڑ)


53. 🌟 An-Najm (The Star) - النجم (ستارہ)


54. 🌙 Al-Qamar (The Moon) - القمر (چاند)


55. 💖 Ar-Rahman (The Beneficent) - الرحمن (بہت مہربان)


56. 🌌 Al-Waqi'a (The Inevitable) - الواقعہ (ہونے والا)


57. 🔩 Al-Hadid (The Iron) - الحدید (لوہا)


58. 👩‍⚖️ Al-Mujadila (The Pleading Woman) - المجادلہ (مدعی عورت)


59. 🏴 Al-Hashr (The Exile) - الحشر (اخراج)


60. 🔍 Al-Mumtahanah (She that is to be examined) - الممتحنہ (جانچنے والی)


61. 📊 As-Saff (The Ranks) - الصف (صفیں)


62. 🕌 Al-Jumu'ah (Friday) - الجمعة (جمعہ)


63. 🤥 Al-Munafiqun (The Hypocrites) - المنافقون (منافق)


64. 🌪️ At-Taghabun (Mutual Disillusion) - التغابن (آپس کی بے وقوفی)


65. 💔 At-Talaq (The Divorce) - الطلاق (طلاق)


66. 🚫 At-Tahrim (The Prohibition) - التحریم (پابندی)


67. 👑 Al-Mulk (The Sovereignty) - المُلك (حکومت)


68. 🖋️ Al-Qalam (The Pen) - القلم (قلم)


69. 🔍 Al-Haqqah (The Reality) - الحقہ (حقیقت)


70. ⬆️ Al-Ma'arij (The Ascending Stairways) - المعارج (چڑھنے کی سیڑھیاں)


71. 🌊 Nuh (Noah) - نوح (نوح)


72. 👻 Al-Jinn (The Jinn) - الجن (جنات)


73. 🕵️‍♂️ Al-Muzzammil (The Enshrouded One) - المزمل (چادر اوڑھے ہوئے)


74. 🧕 Al-Muddathir (The Cloaked One) - المُدثر (پوشیدہ)


75. 🌅 Al-Qari'ah (The Calamity) - القارعة (آفت)


76. 🧑‍🤝‍🧑 Al-Insan (Man) - الانسان (انسان)


77. ✉️ Al-Mursalat (The Emissaries) - المُرسلات (پہنچانے والے)


78. 📣 An-Naba' (The Tidings) - النبأ (خبریں)


79. 🪤 An-Nazi'at (Those who drag forth) - النازعات (کھینچنے والے)


80. 😠 Abasa (He frowned) - عبس (اس نے چہرہ بدلا)


81. 💥 At-Takwir (The Overthrowing) - التکوير (پھٹنا)


82. 💔 Al-Infitar (The Cleaving) - الانفطار (پھٹنا)


83. ⚖️ Al-Mutaffifin (Defrauding) - المطففين (کم تولنے والے)


84. 🌀 Al-Inshiqaq (The Splitting Open) - الانشقاق (پھٹنا)


85. 🌌 Al-Buruj (The Mansions of the Stars) - البروج (ستاروں کے گھر)


86. 🌠 At-Tariq (The Morning Star) - الطارق (صبح کا ستارہ)


87. 🌍 Al-Ala (The Most High) - الأعلى (سب سے بلند)


88. 🌊 Al-Ghashiyah (The Overwhelming) - الغاشیہ (پرامن)


89. 🌅 Al-Fajr (The Dawn) - الفجر (صبح)


90. 🏙️ Al-Balad (The City) - البلد (شہر)


91. ☀️ Ash-Shams (The Sun) - الشمس (سورج)


92. 🌜 Al-Lail (The Night) - اللیل (رات)


93. 🌅 Ad-Duha (The Morning Hours) - الضحی (صبح کے گھنٹے)


94. 📖 As-Sharh (The Relief) - الشرح (آرام)


95. 🍈 At-Tin (The Fig) - التین (انجیر)


96. 💧 Al-Alaq (The Clot) - العلق (خون کا لوتھڑا)


97. ⚡ Al-Qadr (The Power) - القدر (قدرت)


98. 📜 Al-Bayyinah (The Clear Proof) - البینة (واضح دلیل)


99. 🌍 Az-Zalzalah (The Earthquake) - الزلزلة (زلزلہ)


100. 🐎 Al-Adiyat (The Chargers) - العادیات (چارج کرنے والے)


101. ⚡ Al-Qari'ah (The Calamity) - القارعة (آفت)


102. 💰 At-Takathur (The Abundance of Wealth) - التکاثر (مال کی کثرت)


103. ⏳ Al-Asr (The Time) - العصر (وقت)


104. 😠 Al-Humazah (The Scandal-Monger) - الہمزہ (چغلی کرنے والا)


105. 🐘 Al-Fil (The Elephant) - الفیل (ہاتھی)


106. 🕌 Quraysh (Quraysh) - قریش (قریش)


107. 🤲 Al-Ma'un (Acts of Kindness) - الماعون (نیکی کے کام)


108. 🍇 Al-Kawthar (The Abundance) - الکوثر (کثرت)


109. ❌ Al-Kafirun (The Disbelievers) - الکافرون (کافر)


110. 🛡️ An-Nasr (The Help) - النصر (مدد)


111. 🔥 Al-Lahab (The Flame) - اللہب (شعلہ)


112. ❤️ Al-Ikhlas (The Sincerity) - الإخلاص (اخلاص)


113. 🌅 Al-Falaq (The Daybreak) - الفلق (طلوع صبح)


114. 🌐 An-Nas (Mankind) - الناس (انسانیت)`;
    
       try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
           isForwarded: true,
            forwardedNewsletterMessageInfo: {
            newsletterJid: '120363313124070136@newsletter',
            newsletterName: "@FrediEzra",
            serverMessageId: 143,
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
