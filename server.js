const Discord = require('discord.js');
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: `.help`,
            type: 'PLAYING',
        },
    },
});
const config = require('./config.json');
const disbut = require('discord-buttons')(client);
const guildID = (`846807940727570433`); // 846807940727570433
const botchannelID = (`846811100338323497`);
const DateChannelID = (`848247855789375508`);
const prefix = config.prefix
const fs = require('fs');
const MarkovChain = require('./markovchain');
const quotes = new MarkovChain(fs.readFileSync('./quotes.txt', 'utf8'));
const pingNNL = ('<@341123308844220447>');
let now = new Date();
let nowUTC = now.getUTCHours();
let europesimStartYear = 1800;
let europesimCurrentYear;
let europesimCurrentMonth;

function updateYear() {
    let europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
    let currentDate = Date.now();
    let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = Math.floor(europesimStartYear + differenceInDays);
};
function updateMonth() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
};

const http = require('http');
const path = require('path');

http.createServer(function (request, response) {

   console.log('request starting for ');
   console.log(request);

   let filePath = '.' + request.url;
   if (filePath == './') filePath = './page.html';

   console.log(filePath);
   const extname = path.extname(filePath);
   const contentType = 'text/html';
   switch (extname) {
       case '.js':
           contentType = 'text/javascript';
           break;
       case '.css':
           contentType = 'text/css';
           break;
    };
   fs.access(filePath, function(exists) {

       if (exists) {
           fs.readFile(filePath, function(error, content) {
               if (error) {
                   response.writeHead(500);
                   response.end();
               }
               else {
                   response.writeHead(200, { 'Content-Type': contentType });
                   response.end(content, 'utf-8');
               }
           });
       }
       else {
           response.writeHead(404);
           response.end();
       }
   });

}).listen(process.env.PORT || 5000);

console.log('Server running at http://127.0.0.1:5000/');

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

const TechnobladeQuote = [
    'NOT EVEN CLOSE BABY TECHNOBLADE NEVER DIES',
    'technoblade never dies',
    'dude these orphans are getting destroyed',
    'this is the second worst thing that has happened to these orphans in their lives',
    'subscribe to technoblade',
    'if you wish to defeat me, train for another 100 years',
    'did you try getting good?',
    'i told you man... i am an anime protagonist',
    'sometimes its tough being the best',
    'blood for the blood god',
    'im not saying im winning this game.. but... im winning this game',
    'all part of my master plan',
    'this is my main game',
    'nerd spotted',
    'i can tryhard any game!',
    'im so good at video games',
    'aaaaaand not even close',
    'what a scam',
    'thank you hypixel',
    'dying is for casuals, forget what i did like 3 seconds ago',
    'i play minecraft! dont tell my parents they think i have a job',
    'i had no expectations and i still managed to get dissapointed... welcome to bedwars',
    'lets cyberbully some nerds',
    'im so good at this game',
    'off the map you all go',
    'weeeee',
    'he tried...',
    'sometimes i dream about trees',
    'tommy, just... just stop talking',
    'i call dibs on the planet',
    'i just threw some guy off a ledge. with my bare fist!',
    'weapons are for casuals',
    'the cyberbullying is off to a good start',
    'a little known fact, im actually the best fortnite player of all time',
    'am i wearing pants right now? you just have to take my word for it',
    'cant run away from your problems when they have ender pearls'
];
let quoteInt = getRandomInt(TechnobladeQuote.length + 1); // +1 bc not inclusive!!!!!!!!!!!!!!!!!!!!!!!

const liechtenstein = [
    'lichestien',
    'lichistint',
    'lichtenstein',
    'liehctenstein',
    'liechtenstien',
    'lechteinstei',
    'lechtenstei'
];

const hiMessage = [
    'https://tenor.com/view/troll-pilled-gif-19289988', // troll
    'https://cdn.discordapp.com/attachments/512345897577742339/857129762409414716/1624424716634.jpeg',
    'https://cdn.discordapp.com/attachments/603303568317087798/857659695062188084/IMG_20210623_095302.jpg', // wap
    'https://cdn.discordapp.com/attachments/813423631795355680/815953736307572816/image0-85.gif', // ong
    'https://tenor.com/view/i-love-it-gif-18812641', // democracy for the win
    'https://canary.discord.com/channels/752218282253353031/777486219910840331/857711152985014293', // did not ask
    'https://media.discordapp.net/attachments/399408989684891651/808734416737796156/image0.gif',
    'https://media.discordapp.net/attachments/664305979050950657/816984557852950539/freeze.gif',
    'https://cdn.discordapp.com/attachments/510632855601152013/774693195614257212/image0.gif',
    'https://media.discordapp.net/attachments/801529722513129543/801564698763067402/caption-2.gif',
    'https://cdn.discordapp.com/attachments/655219751739457547/802619982755528704/image0_5.gif',
    'https://tenor.com/view/get-real-cat-skate-funny-meme-gif-18666878',
    'https://media.discordapp.net/attachments/512345897577742339/856844900564598804/Screenshot_20210620-020741.png?width=534&height=537',
    'https://cdn.discordapp.com/attachments/512345897577742339/852661473020215376/FB_IMG_16233607158116289.jpg'
];
let hiMsgInt = getRandomInt(hiMessage.length + 1);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
let channel;
client.on('ready', async() => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
    process.on('uncaughtException', function (err) {
        console.error(now + ' uncaughtException:', err.stack);
        const errEmbed = {
            "plainText": "<@341123308844220447> lol ur so bad fix me",
            "title": "uncaught exception or smth ",
            "description": "stop looking at this embed CALL NNL QUICK",
            "author": {
                "name": `all part of my master plan`,
                "icon_url": "https://cdn.discordapp.com/emojis/530436914260606987.png?v=1"
            },
            "color": 15158332,
            "footer": {
                "text": "not even close baby i never go offline"
            },
            "fields": [
                {
                  "name": `${err.message}`,
                  "value": `${err.stack}`,
                  "inline": false
                }
            ]
        };
        channel.send({embed:errEmbed});
        setTimeout(() => {
           channel.send(`some error idk, go fix <@341123308844220447> \n\`\`\`${err.stack}\`\`\``); 
        }, 5000);
        console.error(now + ' uncaughtException:', err.stack);
        // process.exit(0);
    });    
    channel = await client.channels.fetch(botchannelID);

    if (!channel) {
        console.log(`Cannot find the bot channel! ping spam NoNameLmao(emberglaze lmao) to fix it`);
        process.exit(0);
    };
    let guild = await client.guilds.fetch(guildID);
    if (!guild) {
        console.log(`lmaoooooooo wrong guild id? or server non-existant :lmaoof: dm nnl lmao xddddd`);
        process.exit(0);
    };
    let DateChannel = guild.channels.cache.get(DateChannelID);
    DateChannel.join();

    // // button time
    // let yesbutton = new disbut.MessageButton()
    // .setStyle('green')
    // .setLabel('yea')
    // .setID('yes')
    // let nobutton = new disbut.MessageButton()
    // .setStyle('red')
    // .setLabel('nah')
    // .setID('no')

    channel.send(`${hiMessage[hiMsgInt]}`);
    client.on('message', function(message) {
        let memberCount = message.guild.memberCount;
        let infoEmbed = {
            "plainText": "some info on the bot",
          "title": "when /europesim is sus",
          "description": "owopus!!!!!!!!",
          "author": {
            "name": "Bot information",
            "icon_url": "https://cdn.discordapp.com/icons/846807940727570433/4bbf13c1ce8bfb351fc7eafdc898e7d1.png"
          },
          "color": 53380,
          "footer": {
            "text": "https://ourworldofpixels.com/europesim"
          },
          "fields": [
            {
              "name": "Current UTC hour",
              "value": `${nowUTC}`,
              "inline": true
            },
            {
              "name": "Europesim year, month",
              "value": `${europesimCurrentYear}, ${europesimCurrentMonth}`,
              "inline": true
            },
            {
              "name": "Server member count",
              "value": `${memberCount}`,
              "inline": true
            }
          ]
        };
        let helpEmbed = {
            "title": "All list of commands",
            "description": `prefix: ${prefix}`,
            "color": 53380,
            "footer": {
                "text": "hey maybe its a great thing that the entire bot is in one file lol idc that much"
            },
            "fields": [
                {
                  "name": "hi",
                  "value": "Usually used to check if bot is responding or not",
                  "inline": true
                },
                {
                  "name": "eval (code)",
                  "value": "Execute some JavaScript code",
                  "inline": true
                },
                {
                  "name": "exit",
                  "value": "Shortcut to process.exit(1);",
                  "inline": true
                },
                {
                  "name": "sudo (message)",
                  "value": "Send messages as me (idk why i added it, might remove)",
                  "inline": true
                },
                {
                  "name": "quote",
                  "value": `${TechnobladeQuote[quoteInt]} (random technoblade quote)`,
                  "inline": true
                },
                {
                    "name": "suggest",
                    "value": "Suggest some ideas, might add them to the bot",
                    "inline": true
                },
                {
                    "name": "info",
                    "value": "General bot information",
                    "inline": true
                },
                {
                    "name": "rng <minValue> (maxValue)",
                    "value": "Random number generator (minValue is optional)",
                    "inline": true
                },
                {
                    "name": "warmode (on/off)",
                    "value": `Alerts ${pingNNL} about an ongoing war so he will leave the bot in peace and stop doing anything with it`,
                    "inline": true
                },
                {
                    "name": "help",
                    "value": "It does exactly what you think it does.",
                    "inline": false
                }
            ]
        };

        if (message.content.includes(`hi online`)) {
            message.channel.send(`wrong. i am ${client.user.tag}. also hi ${message.author.tag}`);
        };
        if (liechtenstein.includes(message.content)) {
            message.channel.send('liechtenstein*');
        };
        const args = message.content.slice(prefix.length).trim().split(/ +/g); // arguments after the command
        const command = args.shift().toLowerCase();
        if (!message.content.includes(prefix || command)) console.log(`Message from ${message.author.tag} in ${message.channel.name} at ${message.createdAt}: ${message.content}`);
        if (!message.content.startsWith(prefix)) return; // if message doesnt start with prefix, ignore it
        function logCommand() {
            console.log(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
        };
        if (command === `hi`) {
            logCommand();
            channel.send(`hi im online what do u want (main branch)`);
        }
        else if (command === `eval`) {
            if (message.author.id === `341123308844220447` || message.author.id === `707359017252683896` || message.author.id === `638422704550313984` || message.author.id === `638422704550313984`) {
                let code = args.join(' ');
                try {
                    let result = eval(code);
                    let output = result;
                    if (typeof output !== 'string') {
                        output = require('util').inspect(result);
                    };
                    message.channel.send(output, {code: 'js'});
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${output, {code: 'js'}}`);
                } catch (error) {
                    message.channel.send(`\`Code ran with an error:\` \`\`\`xl\n${error}\n\`\`\``);
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${code} \nThere was an error running this code: \n${error}`);
                };
            } else return message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
        }
        else if (command === "exit") {
            if (message.author.id === `341123308844220447`) {
                console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                message.channel.send(`:sob:`).then(() => process.exit(1));
            }
            else {
                console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                let quoteInt = getRandomInt(37);
                message.channel.send(TechnobladeQuote[quoteInt]);    
            } return;
        }
        else if (command === "sudo") {
            logCommand();
            if (message.author.id === `341123308844220447`) {
                // if (message.content.includes(`whatever the hell that command was, i dont think it exists. have any doubts? check .help`)) {
                //     channel.send(`stop`);
                //     return;
                // }
                // else if (message.content.includes(`I hate orphans`) || message.content.includes(`i hate orphans`)) {
                //     channel.send(`<@${message.author.id}> hates orphans. Blood for the blood god.`);
                //     return;
                // }
                // else if (message.content.includes(`who is joe`) || message.content.includes("who's joe")) {
                //     channel.send(`i do not wish to know who joe is. snap back to reality`);
                //     return;
                // }
                // else {
                const sudo = args.join(" ");
                message.channel.send(sudo);
            }
            else return channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
        }  
        else if (command === "quote") {
            quoteInt = getRandomInt(37);
            return message.channel.send(`quote number ${quoteInt}: \n"${TechnobladeQuote[quoteInt]}"`);
        }
        else if (command === "suggest") {
            const suggest = args.join(" ");
            client.users.fetch('341123308844220447').then((nnl) => {
                nnl.send(`Bot suggestion by ${message.author.tag}: ${suggest} \nSent at ${message.createdAt} in <#${message.channel.id}>`);
            });
            return message.channel.send(`Your suggestion has been sent! thanks`);
        }
        else if (command === "info") {
            hours = nowUTC;
            return message.channel.send({embed:infoEmbed});
        }
        else if (command === "rng") {
            if (isNaN(args[1]) === true) {
                return message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nthis generator is inclusive at 0 but not at ${args[0] - 1} PLEASE keep that in mind\ntldr gives only 0 to ${args[0]}`);
            } else if (isNaN(args[1]) === false) {
                const min = args[0];
                const max = args[1];
                return message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nthis generator is inclusive at both ${min} and ${max}\nbasically gives values between ${min} and ${max} including them`);
            }
        }
        else if (command === "mark") {
            return;
        }
        else if (command === "help") {
            return message.channel.send({embed:helpEmbed});
        }
        else if (command === "dn") {
            logCommand();
            return message.channel.send('deez nuts');
        }
        else if (command === "warmode") {
            let mode = args.join(" ");
            let warmode = 'off';
            if (mode = 'on') {
                logCommand();
                message.channel.send(`${pingNNL} dude there is a war going on rn dont turn me off i beg u ppl need rng bro!!!!!!`);
                return warmode = 'on';
            } else if (mode = 'off') {
                logCommand();
                message.channel.send(`${pingNNL} war over now you can do whatever with the code in peace`);
                return warmode = 'off';
            } else {
                message.channel.send(`what the fuck bro`);
            }
            if (warmode = 'on') {
                setInterval(() => {
                    return channel.send(`just a quick reminder that ${prefix}warmode is still on. if war is finished PLEASE TURN IT OFF\n thanks`);
                }, 30000 * 60);
            } else return;
        }
        else if (command === "") return;
        else return message.channel.send(`sorry, "${prefix}${command}" doesnt exist\ncheck "${cprefix}help"`);
    });
    let a = 1;
    function updateDateLoop() {
        setTimeout(function() {
            updateMonth();
            updateYear();
            DateChannel.setName(`${europesimCurrentYear}, ${europesimCurrentMonth}`)
            if (a > 0) {
                updateDateLoop();
            }
        }, 10000);
    }
    updateDateLoop();
});

let europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
let currentDate = Date.now();
let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
europesimCurrentYear = Math.floor(europesimStartYear + differenceInDays);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
europesimCurrentMonth = months[Math.floor(nowUTC / 2)];

client.login(config.token);
