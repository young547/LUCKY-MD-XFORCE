const axios = require("axios");
const {ezra} = require("../fredi/ezra");
const traduire = require("../fredi/traduction");
const {Sticker ,StickerTypes}= require('wa-sticker-formatter');
const conf = require("../set");

ezra({
  nomCom: "ranime",
  categorie: "Fredi-Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    //const texttraduit = await traduire(synopsis,{ to: 'fr' })

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}
    
    \n\n> regards fredidezra\n\n`;
    
    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON :', error);
    repondre('Error retrieving data from JSON.');
  }
});

ezra({
  nomCom: "google",
  categorie: "Fredi-Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    repondre("Give me a query.\n*Example: .google Who is Lucky Md.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search for : ${arg}\n\n`;

    for (let result of results) {
      msg += `➣ Title : ${result.title}\n`;
      msg += `➣ Description : ${result.snippet}\n`;
      msg += `➣ Link : ${result.link}\n\n> regards frediezra\n\n`;
    }
    
   // const trdmsg = await traduire(msg,{to : 'fr'})
    repondre(msg);
  } catch (error) {
    repondre("An error occurred during Google search.");
  }
});

ezra({
  nomCom: "imdb",
  categorie: "Fredi-Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` lMDB SEARCH BY ☢️ LUCKY MD XFORCE```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});


ezra({
  nomCom: "emojimix",
  categorie: "Fredi-Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre,ms , nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😉+😊");
    return;
  }

  // Divisez la chaîne en deux emojis en utilisant le point-virgule comme séparateur
  const emojis = arg.join(' ').split('+');

  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a '+' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      // Si la requête a réussi, envoyez l'image résultante
      
      let stickerMess = new Sticker(response.data.result, {
        pack: ☢️LUCKY-MD XFORCE☢️,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix." + error );
  }
});

// Work for Boom message 
ezra(
  {
    nomCom: 'boom',
    categorie: 'Fredi-Fun',
    reaction: '😈',
  }, 

  

  async (dest,zk, commandeOptions) => {
    const {ms,arg,repondre,superUser} = commandeOptions;
    const limit = conf.BOOM_MESSAGE_LIMIT;

    if (!superUser) {
      repondre('You are not authorised to use this  command !!!');
      return;
    } else{
          if (!arg[0] || !arg[1] || arg[0] < 0){
            repondre(`
error wrong format
> try: ${conf.PREFIXE}boom 10 hey `);
              return;
          } else if (parseInt(arg[0]) > limit) {
            repondre(`can't send over ${limit} maessages`)
            return;
            } else {
            const tasks = []

            for (let i = 0 ; i < parseInt(arg[0]); i++){
              tasks.push(
                new Promise((resolve) => {
                  setTimeout(function() {
                    repondre(arg.slice(1).join(" "));
                    resolve();
                  }, 1000 * i);
                })
              )
            }

            await Promise.all(tasks)
            return;
            }
    }
  }
);

// Request Jokes 
ezra({
  nomCom: "joke",
  aliases: ["jokeapi", "getjoke"],
  desc: "Fetch a random joke from JokeAPI.",
  categorie: "Fredi-Fun",
  reaction: '🤭',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return repondre("❌ Error fetching joke. Please try again later.");
    }

    let jokeMessage = `😂 *☢️LUCKY MD X-FORCE☢️ random Joke:*\n\n${data.joke}\n\n`;
    jokeMessage += `🤷 *Category:* ${data.category}\n`;
    jokeMessage += `🤭 *Safe:* ${data.safe}\n`;
    jokeMessage += `*ID:* ${data.id}\n`;

    repondre(jokeMessage);
  } catch (error) {
    console.error("Error fetching joke:", error);
    repondre("❌ Error fetching joke. Please try again later.");
  }
});


ezra({
  nomCom: "randomjoke",
  aliases: ["jokeap"],
  desc: "Fetch a random joke from JokeAPI.",
  categorie: "Fredi-Fun",
  reaction: '🤭',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return repondre("❌ Error fetching joke. Please try again later.");
    }

    let jokeMessage = `😂 *☢️LUCKY MD X-FORCE☢️ random Joke:*\n\n${data.joke}\n\n`;
    jokeMessage += `🤷 *Category:* ${data.category}\n`;
    jokeMessage += `🤭 *Safe:* ${data.safe}\n`;
    jokeMessage += `*ID:* ${data.id}\n`;

    repondre(jokeMessage);
  } catch (error) {
    console.error("Error fetching joke:", error);
    repondre("❌ Error fetching joke. Please try again later.");
  }
});

// Continue request with fun emojis 
ezra({
  nomCom: "happies",
  categorie: "Fredi-Fun",
  reaction: "😂"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ HAPPY WE GO... 🤦" });
    const animations =  ['😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊', '😎', '🥳', '😸', '😹', '🌞', '🌈', '😃', '😄', '😁', '😊'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
ezra({
  nomCom: "heart",
  aliases: ["moyo", "hrt"],
  categorie: "Fredi-Fun",
  reaction: "🫀"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ HEART WE GO... 🤦" });
    const animations =  ['💖', '💗', '💕', '❤️', '💛', '💚', '🫀', '💙', '💜', '🖤', '♥️', '🤍', '🤎', '💗', '💞', '💓', '💘', '💝', '♥️', '💟', '🫀', '❤️'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
ezra({
  nomCom: "angry",
  categorie: "Fredi-Fun",
  reaction: "🥺"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ ANGRY HERE WE GO... 🤦" });
    const animations =   ['😡', '😠', '🤬', '😤', '😾', '😡', '😠', '🤬', '😤', '😾'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
ezra({
  nomCom: "sad",
  aliases: ["heartbroken", "hrtbroken"],
  categorie: "Fredi-Fun",
  reaction: "😒"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "*☢️LUCKY MD X-FORCE☢️ SAD WE GO...* 🤦" });
    const animations =  ['🥺', '😟', '😕', '😖', '😫', '🙁', '😩', '😥', '😓', '😪', '😢', '😔', '😞', '😭', '🙂‍↕️', '😭', '😿'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
ezra({
  nomCom: "shy",
  aliases: ["shyoff", "shyy"],
  categorie: "Fredi-Fun",
  reaction: "🥂"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ SHY WE GO... 🤦" });
    const animations =  ['😳', '😊', '😶', '🙈', '🙊', '😳', '😊', '😶', '🙈', '🙊'];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});
ezra({
  nomCom: "moon",
  aliases: ["mon", "mwezi"],
  categorie: "Fredi-Fun",
  reaction: "🌚"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ MOON WE GO... 🤦" });
    const animations =   ['🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌕', "🌚🌝"];
    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});

ezra({
  nomCom: "nikal",
  categorie: "Fredi-Fun",
  reaction: "⁉️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ NIKAL WE GO... 🤦" });
    const animations = ["   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏          ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Fredie   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|     ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭     ⢱       ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  (P)       ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄   __        ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸          ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭     ⢱         ⣿  ⢹           ⡇\n  ⠙⢿⣯⠄  |__|      ⡿  ⡇        ⡼\n   ⠹⣶⠆     ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸      `", "   ⣠⣶⡾⠏⠉⠙⠳⢦⡀   ⢠⠞⠉⠙⠲⡀ \n  ⣴⠿⠏           ⢳⡀ ⡏         ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀ ⣀⡀   ⣧ ⢸           ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭     ⢱        ⣿  ⢹            ⡇\n  ⠙⢿⣯⠄  lodu     ⡿  ⡇       ⡼\n   ⠹⣶⠆       ⡴⠃    ⠘⠤⣄⣠⠞ \n    ⢸⣷⡦⢤⡤⢤⣞⣁          \n ⢀⣤⣴⣿⣏⠁  ⠸⣏⢯⣷⣖⣦⡀      \n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿      \n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏    ⣄⢸ "];

    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});

ezra({
  nomCom: "hand",
  categorie: "Fredi-Fun",
  reaction: "👊"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  
  try {
    const sentMessage = await zk.sendMessage(dest, { text: "☢️LUCKY MD X-FORCE☢️ HAND WE GO...🤦" });
    const animations = [
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D', '8==✊️=D', '8=✊️==D', 
      '8✊️===D', '8=✊️==D', '8==✊️=D', '8===✊️D 💦', '8==✊️=D💦 💦', '8=✊️==D 💦💦 💦'
    ];

    for (const animation of animations) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await zk.relayMessage(dest, {
        protocolMessage: {
          key: sentMessage.key,
          type: 14, // Protocol message type for edited message
          editedMessage: {
            conversation: animation
          }
        }
      }, {});
    }
  } catch (error) {
    console.log(error);
    repondre("❌ *Error!* " + error.message);
  }
});

// request for Profile fun
ezra({
  nomCom: "profile",
  aliases: ["pp", "who"],
  desc: "to generate profile picture",
  categorie: "Fledi-Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    // Fetch profile picture URL (High resolution)
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); // Fetch high-res picture
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; // Fallback URL in case of an error
    }

    // Fetch user status (Baileys may not have direct method for this, you may need to handle it based on available methods)
    let status;
    try {
      // Assuming fetchStatus is not part of Baileys, you may need an alternate approach
      status = await zk.fetchStatus(jid); // Use the actual method from your instance
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" }; 
    }

    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}`, 
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    await zk.sendMessage(dest, mess, { quoted: ms }); 

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
  }
});

ezra({
  nomCom: "profile2",
  aliases: ["pp2", "whois2"],
  desc: "to generate business profile picture",
  categorie: "Fledi-Fun"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    // Fetch profile picture URL (High resolution)
    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); // Fetch high-res picture
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; // Fallback URL in case of an error
    }

    // Fetch user status (using sock.fetchStatus)
    let status;
    try {
      status = await zk.fetchStatus(jid); // Assuming 'zk.fetchStatus' works as Baileys' fetchStatus
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" };
    }

    // Fetch business profile information
    let businessProfile;
    try {
      businessProfile = await zk.getBusinessProfile(jid); // Fetch business profile information
    } catch (error) {
      console.error('Error retrieving business profile:', error);
      businessProfile = { description: "No business profile available", category: "Unknown" };
    }

    // Prepare the message object with the profile data
    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}\nBusiness Description: ${businessProfile.description}\nBusiness Category: ${businessProfile.category}`,
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    // Send the message with profile details
    await zk.sendMessage(dest, mess, { quoted: ms });

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
  }
});
