require('dotenv').config();
const colors = require('colors');
const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: `.help`,
            type: 'PLAYING',
        },
    },
    disableMentions: 'everyone',
});
const smartestchatbot = require('smartestchatbot');
const scb = new smartestchatbot.Client();
const config = require('./config.json');
const disbut = require('discord-buttons')(client);
const guildID = `846807940727570433`;
const botchannelID = `846811100338323497`;
const DateChannelID = `848247855789375508`;
const prefix = config.prefix;
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const http = require('http');
const { infoEmbed, helpEmbed, esimEmbed } = require('./embeds.js');
const webhook = require('webhook-discord');
const pingNNL = '<@341123308844220447>';
const botID = '848217938288967710';

let now = new Date();
let nowUTC = now.getUTCHours();
let europesimStartYear = 1800;
let europesimCurrentYear;
let europesimCurrentMonth;
module.exports = {
    nowUTC,
    europesimCurrentYear,
    europesimCurrentMonth,
    pingNNL
};

function updateYear() {
    europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
    currentDate = Date.now();
    differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays)) - 2 - 18;
}
function updateMonth() {
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
}
function log(stuff) {
    console.log(`[server.js] ${stuff}`);
}
/**
 * Will limit the length of a string to given (length - 1) and will add … afterwards because it counts as one character.
 * @param {number} length length of a string
 * @returns {string} string with it's (length - 1) + …
 */
String.prototype.limit = function(length) {
    return this.length > length ? (this.substring(0, length - 1) + '…') : this;
};

const httpHost = '0.0.0.0';
const httpPort = process.env.PORT;
let indexFile;
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};
const httpServer = http.createServer(requestListener);
fsp.readFile(__dirname + "/index.html").then(contents => {
    indexFile = contents;
    httpServer.listen(httpPort, httpHost, () => {
        log(`[HttpServer] Server is running on http://${httpHost}:${httpPort}`.green);
    });
}).catch(err => {
    console.error(`[HttpServer] Could not read index.html file: ${err}`.red);
    process.exit(1);
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

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
    'liechtensteing',
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
            } catch (error) {
                reject(error);
            }
        });
    });
}
function jsonWrite(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } resolve(true);
        });
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let channel;
client.on('ready', async () => {
    log(`Logged in successfully as ${client.user.tag}!`);
    const filePath = path.resolve(__dirname, './config.json');
    process.on('uncaughtException', function (err) {
        console.error(`[${now}] [Error] ${err.stack}`);
        channel.send(`some error idk, go fix <@341123308844220447> \n\`\`\`${err.stack}\`\`\``); 
    });
    channel = await client.channels.fetch(botchannelID);
    channel.send(`hi i either (re)started or got back from heroku's dumb idling thing`);
    if (!channel) {
        log(`Cannot find the bot channel! ping spam NoNameLmao(emberglaze lmao) to fix it`);
        process.exit(0);
    }
    let guild = await client.guilds.fetch(guildID);
    let memberCount = guild.memberCount;
    let userCount = guild.members.cache.filter(member => !member.user.bot).size;
    let botCount = memberCount - userCount;
    let onlineUsers = guild.members.cache.filter(member => member.presence.status !== 'offline' && !member.user.bot).size;

    let DateChannel = guild.channels.cache.get(DateChannelID);
    DateChannel.join();
    if (config.debug === true) channel.send('ran DateChannel.join()');

    client.on('error', error => log(error));
    client.on('message', function(message) {
        module.exports = {
            nowUTC,
            europesimCurrentYear,
            europesimCurrentMonth,
            pingNNL,
            userCount,
            memberCount,
            botCount,
            onlineUsers
        };
        if (message.channel.name === "es-chatbot") {
            if (message.author.bot) return;
            else {
                message.channel.startTyping();
                scb.chat({ message: message.content, name: client.user.username, user: message.author.id, language: "auto" }).then(msg => {
                    message.lineReply(msg);
                });
                message.channel.stopTyping();
            }
        }

        message.content.replace(/<[@#:].*?>/g, "");
        if (message.content.startsWith('..')) return log(`"command" with .. start ignored`);
        if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        function logCommand() {
            log(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
            if (config.debug === 'true') message.channel.send(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
        }
        if (message.content.startsWith(prefix)) {
            logCommand();
            if (command === 'esim') {
                if (!args[0]) {
                    return message.channel.send({ embed: esimEmbed });
                } else if (args[0] === 'info') {
                    return message.channel.send({embed:infoEmbed}).catch(console.error);    
                } 
            } else if (command === `hi`) {
                message.channel.send(`hi im online what do u want (main branch)`);
            } else if (command === `eval`) {
                if (message.member.roles.cache.some(r => r.name === "Admin") || message.author.id === '341123308844220447') {
                    let code = args.join(' ');
                    try {
                        let result = eval(code);
                        let output = result;
                        if (typeof output !== 'string') output = require('util').inspect(result);
                        message.channel.send(output, {code: 'js'});
                        log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${output}`);
                    } catch (error) {
                        message.channel.send(`\`Code ran with an error:\` \`\`\`xl\n${error}\n\`\`\``);
                        log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${code} \nThere was an error running this code: \n${error}`);
                    }
                } else return message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
            } else if (command === "exit") {
                try {
                    if (message.author.id === `341123308844220447` || message.member.roles.find(r => r.name === 'Admin')) {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                        message.channel.send(`:sob:`).then(() => process.exit(1));
                    } else {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                        quoteInt = getRandomInt(37);
                        message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);    
                    } return;    
                } catch(error) {
                    message.channel.send(`I got an error executing the command!`);
                    message.channel.send(error);
                    return;
                }
            } else if (command === "sudo") {
                if (message.author.id === `341123308844220447`) {
                    const sudo = args.join(" ");
                    message.channel.send(sudo);
                } else return channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
            } else if (command === "quote") {
                quoteInt = getRandomInt(37);
                return message.channel.send(`quote number ${quoteInt}: \n"${TechnobladeQuote[quoteInt]}"`);
            } else if (command === "suggest") {
                const suggest = args.join(" ");
                client.users.fetch('341123308844220447').then((nnl) => {
                    nnl.send(`Bot suggestion by ${message.author.tag}: \`${suggest}\`\nSent at ${message.createdAt} in <#${message.channel.id}>`);
                });
                return message.channel.send(`Your suggestion has been sent! thanks`);
            } else if (command === "rng") {
                if (isNaN(args[1]) === true) return message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nthis generator is inclusive at 0 but not at ${args[0] - 1} PLEASE keep that in mind\ntldr gives only 0 to ${args[0] - 1}`);
                else if (isNaN(args[1]) === false) {
                    const min = args[0];
                    const max = args[1];
                    return message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nthis generator is inclusive at both ${min} and ${max}\nbasically gives values between ${min} and ${max} including them`);
                }
            } else if (command === "code") {
                if (args[0] === "args") {
                    return message.channel.send(`u forgot about it again? bruh\n\`.(command) (args[0]) (args[1])...\` etc\nget good lol`);
                } else return message.channel.send(`oh wtf what now? args again?`);
            } else if (command === "help") {
                return message.channel.send({embed:helpEmbed});
            } else if (command === "dn") {
                return message.channel.send('deez nuts');
            } else if (command === "debug") {
                if (args[0] === 'true') {
                    if (config.debug === false) {
                        message.channel.send('okie dokie');
                        config.debug = true;
                        jsonWrite(filePath, config);
                        return message.channel.send('Success!');
                    } else if (config.debug === true) {
                        return message.channel.send('It is already on lol');
                    }
                } else if (args[0] === 'false') {
                    if (config.debug === false) {
                        return message.channel.send('It is already off lol dont panic');
                    } else if (config.debug === true) {
                        config.debug = false;
                        message.channel.send('okie dokie');
                        jsonWrite(filePath, config);
                        return message.channel.send('Success!');
                    }
                } else if (!args[0]) {
                    if (config.debug === true) {
                        message.channel.send('Debug mode is currently on.');
                    } else if (config.debug === false) {
                        message.channel.send('Debug mode is currently off.');
                    }
                }
            } else if (command === "") return;
        } else if (!message.content.startsWith(prefix)) log(`Message from ${message.author.tag} in ${message.guild.name} server, ${message.channel.name} channel at ${message.createdAt}: ${message.content}`);
    });
    let a = 1;
    function updateDateLoop() {
        setTimeout(function() {
            updateMonth();
            updateYear();
            DateChannel.setName(`${europesimCurrentYear}, ${europesimCurrentMonth}`);
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
europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays)) - 2 - 18; // 20 year setback bc of inactivity
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
europesimCurrentMonth = months[Math.floor(nowUTC / 2)];

client.login(process.env.DJS_TOKEN);
