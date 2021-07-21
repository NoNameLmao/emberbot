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
const guildID = (`846807940727570433`);
const botchannelID = (`846811100338323497`);
const DateChannelID = (`848247855789375508`);
const prefix = config.prefix
const fs = require('fs');
const MarkovChain = require('./markovchain');
const quotes = new MarkovChain(fs.readFileSync('./quotes.txt', 'utf8'));
const pingNNL = '<@341123308844220447>';
const botID = '848217938288967710';
let now = new Date();
let nowUTC = now.getUTCHours();
let europesimStartYear = 1800;
let europesimCurrentYear;
let europesimCurrentMonth;

function updateYear() {
    europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
    currentDate = Date.now();
    differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays)) - 2 - 18;
};
function updateMonth() {
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
};

const http = require('http');
const path = require('path');
const { constants } = require('buffer');

http.createServer(function (request, response) {

   console.log('request starting for ');
   console.log(request);

   let filePath = '.' + request.url;
   if (filePath == './') filePath = './page.html';

   console.log(filePath);
   const extname = path.extname(filePath);
   let contentType = 'text/html';
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
                } else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                };
           });
        } else {
            response.writeHead(404);
            response.end();
        };
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
let quoteInt = getRandomInt(TechnobladeQuote.length + 1); // +1 bc not inclusive

const liechtenstein = [
    'lichestien',
    'lichistint',
    'lichtenstein',
    'liehctenstein',
    'liechtenstien',
    'lechteinstei',
    'lechtenstei',
    'iechtenstein'
];

function jsonRead(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            } else try {
                resolve(JSON.parse(content));
            } catch (err) {
                reject(err);
            };
        });
    });
};
function jsonWrite(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            };
            resolve(true);
        });
    });
};
function getDebugState() {
    if (config.debug === true) return true
    else if (config.debug === false) return false
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
let channel;
client.on('ready', async() => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
    client.api.applications(client.user.id).guilds('846807940727570433').commands.post({
        data: {
            name: "hello",
            description: "hello world command"
        },
    });
    client.ws.on('INTERACTION_CREATE', async interaction => {
        let command = interaction.data.name.toLowerCase();
        let args = interaction.data.options;
        if (command === 'hello'){ 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "hello world!!!"
                    },
                },
            });
        };
    });
    const filePath = path.resolve(__dirname, './config.json');
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
    if (config.debug === true) {
        channel.send('ran DateChannel.join()');
    };

    client.on('error', error => {
        console.log(error);
    });
    client.on('message', function(message) {
        let memberCount = message.guild.memberCount;
        let userCount = guild.members.cache.filter(member => !member.user.bot).size;
        let botCount = memberCount - userCount;
        let onlineUsers = guild.members.cache.filter(member => member.presence.status !== 'offline' && !member.user.bot).size;
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
              "value": `${userCount} users + ${botCount} bots = ${memberCount} members overall. Online users: ${onlineUsers}`,
              "inline": false
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
        if (message.content.includes(`https://cdn.discordapp.com/attachments/245001780138606593/866145759917637662/image0-2-3.gif`)) {
            let yes = client.emojis.cache.get('866325679830073394');
            message.channel.send(`${yes}`);
        };

        message.content.replace(/<[@#:].*?>/g, "");
        if (message.content.includes('69')) {
            if (message.channel.id === '859719390927519744') {
                return console.log('detected funny number but its in frozensmp console NOOOOOO');
            } else if (message.author.tag === '/europesim bot#1478') {
                if (message.editable === true) {
                    message.edit(`${message.content} \*(nice)\*`);
                    return console.log('detected funny number in my msg laf at my own 69');
                };
            } else {
                message.channel.send('\*nice\*');
                return console.log('detected the funny number, laf');
            };
        };

        if (message.content.startsWith('..')) {
            return console.log(`"command" with .. start ignored`);
        };
        
        if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (!message.content.includes(prefix || command)) console.log(`Message from ${message.author.tag} in ${message.channel.name} at ${message.createdAt}: ${message.content}`);
        if (!message.content.startsWith(prefix)) return;
        function logCommand() {
            console.log(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
            if (config.debug === 'true') message.channel.send(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
        };
        if (command === `hi`) {
            logCommand();
            channel.send(`hi im online what do u want (main branch)`);
        } else if (command === `eval`) {
            if (message.member.roles.cache.some(r => r.name === "Admin") || message.author.id === '341123308844220447') {
                let code = args.join(' ');
                try {
                    let result = eval(code);
                    let output = result;
                    if (typeof output !== 'string') output = require('util').inspect(result);
                    message.channel.send(output, {code: 'js'});
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${output, {code: 'js'}}`);
                } catch (error) {
                    message.channel.send(`\`Code ran with an error:\` \`\`\`xl\n${error}\n\`\`\``);
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${code} \nThere was an error running this code: \n${error}`);
                };
            } else return message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
        } else if (command === "exit") {
            try {
                if (message.author.id === `341123308844220447` || message.member.roles.find(r => r.name === 'Admin')) {
                    console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                    message.channel.send(`:sob:`).then(() => process.exit(1));
                } else {
                    console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                    quoteInt = getRandomInt(37);
                    message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);    
                } return;    
            } catch(error) {
                message.channel.send(`I got an error executing the command!`);
                message.channel.send(error);
                return;
            };
        } else if (command === "sudo") {
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
            } else return channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
        } else if (command === "quote") {
            quoteInt = getRandomInt(37);
            return message.channel.send(`quote number ${quoteInt}: \n"${TechnobladeQuote[quoteInt]}"`);
        } else if (command === "suggest") {
            const suggest = args.join(" ");
            client.users.fetch('341123308844220447').then((nnl) => {
                nnl.send(`Bot suggestion by ${message.author.tag}: ${suggest} \nSent at ${message.createdAt} in <#${message.channel.id}>`);
            });
            return message.channel.send(`Your suggestion has been sent! thanks`);
        } else if (command === "info") {
            return message.channel.send({embed:infoEmbed}).catch(console.error);
        } else if (command === "rng") {
            if (isNaN(args[1]) === true) return message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nthis generator is inclusive at 0 but not at ${args[0] - 1} PLEASE keep that in mind\ntldr gives only 0 to ${args[0] - 1}`);
            else if (isNaN(args[1]) === false) {
                const min = args[0];
                const max = args[1];
                return message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nthis generator is inclusive at both ${min} and ${max}\nbasically gives values between ${min} and ${max} including them`);
            };
        } else if (command === "help") {
            return message.channel.send({embed:helpEmbed});
        } else if (command === "dn") {
            logCommand();
            return message.channel.send('deez nuts');
        } else if (command === "debug") {
            logCommand();
            if (args[0] === 'true') {
                if (config.debug === false) {
                    message.channel.send('okie dokie');
                    config.debug = true;
                    jsonWrite(filePath, config);
                    return message.channel.send('Success!');
                } else if (config.debug === true) {
                    return message.channel.send('It is already on lol');
                };
            } else if (args[0] === 'false') {
                if (config.debug === false) {
                    return message.channel.send('It is already off lol dont panic');
                } else if (config.debug === true) {
                    config.debug = false;
                    message.channel.send('okie dokie');
                    jsonWrite(filePath, config);
                    return message.channel.send('Success!');
                };
            } else if (args[0] === "") {
                if (config.debug === true) {
                    message.channel.send('Debug mode is currently on.');
                } else if (config.debug === false) {
                    message.channel.send('Debug mode is currently off.');
                };
            };
        } else if (command === "warmode") {
            let mode = args.join(" ");
            let warmode = 'off';
            if (mode === 'on') {
                logCommand();
                message.channel.send(`${pingNNL} dude there is a war going on rn dont turn me off i beg u ppl need rng bro!!!!!!`);
                return warmode = 'on';
            } else if (mode === 'off') {
                logCommand();
                message.channel.send(`${pingNNL} war over now you can do whatever with the code in peace`);
                return warmode = 'off';
            } else {
                message.channel.send(`what the fuck bro`);
            };
            if (warmode === 'on') {
                setInterval(() => {
                    return channel.send(`just a quick reminder that ${prefix}warmode is still on. if war is finished PLEASE TURN IT OFF\n thanks`);
                }, 30000 * 60);
            } else return;
        } else if (command === "") return;
        else return message.channel.send(`sorry, "${prefix}${command}" doesnt exist\ncheck "${prefix}help"`);
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
    };
    updateDateLoop();
});

let europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
let currentDate = Date.now();
let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays)) - 2 - 18; // 20 year setback bc of inactivity
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
europesimCurrentMonth = months[Math.floor(nowUTC / 2)];

client.login(process.env.DJS_TOKEN);
