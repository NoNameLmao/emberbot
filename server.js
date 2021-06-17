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
const mongo = require('./mongo');
const disbut = require('discord-buttons')(client);
const guildID = (`846807940727570433`); // 846807940727570433
const botchannelID = (`846811100338323497`);
const DateChannelID = (`848247855789375508`);
const pingNNL = ('<@341123308844220447>');
let now = new Date();
let nowUTC = now.getUTCHours();
const prefix = (`.`);
const token = (`ODQ4MjE3OTM4Mjg4OTY3NzEw.YLJagw.BdRe4iX1emlnPxrzmQzCBgpaYJ0`);
let europesimStartYear = 1800;

let europesimCurrentYear;
function updateYear() {
    let europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
    let currentDate = Date.now();
    let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = Math.floor(europesimStartYear + differenceInDays);
};
let europesimCurrentMonth;
function updateMonth() {
    switch (nowUTC) {
        case 0, 1:
            europesimCurrentMonth = 'January'
            break;
        case 2, 3:
            europesimCurrentMonth = 'Febuary'
            break;
        case 4, 5:
            europesimCurrentMonth = 'March'
            break;
        case 6, 7:
            europesimCurrentMonth = 'April'
            break;
        case 8, 9:
            europesimCurrentMonth = 'May'
            break;
        case 10, 11:
            europesimCurrentMonth = 'June'
            break;
        case 12, 13:
            europesimCurrentMonth = 'July'
            break;  
        case 14, 15:
            europesimCurrentMonth = 'August'
            break;  
        case 16, 17:
            europesimCurrentMonth = 'September'
            break;
        case 18, 19:
            europesimCurrentMonth = 'October'
            break;
        case 20, 21:
            europesimCurrentMonth = 'November'
            break;
        case 22, 23:
            europesimCurrentMonth = 'December'
            break;
    }
    // let hours = now.getUTCHours()
    // if (hours === 0 || hours === 1) europesimCurrentMonth = `January`
    // else if (hours === 2 || hours === 3) europesimCurrentMonth = `Febuary`
    // else if (hours === 4 || hours === 5) europesimCurrentMonth = `March`
    // else if (hours === 6 || hours === 7) europesimCurrentMonth = `April`
    // else if (hours === 8 || hours === 9) europesimCurrentMonth = `May`
    // else if (hours === 10 || hours === 11) europesimCurrentMonth = `June`
    // else if (hours === 12 || hours === 13) europesimCurrentMonth = `July`
    // else if (hours === 14 || hours === 15) europesimCurrentMonth = `August`
    // else if (hours === 16 || hours === 17) europesimCurrentMonth = `September`
    // else if (hours === 18 || hours === 19) europesimCurrentMonth = `October`
    // else if (hours === 20 || hours === 21) europesimCurrentMonth = `November`
    // else europesimCurrentMonth = `December`
};

var http = require('http');
var fs = require('fs');
var path = require('path');
const { randomInt } = require('crypto');

http.createServer(function (request, response) {

   console.log('request starting for ');
   console.log(request);

   var filePath = '.' + request.url;
   if (filePath == './')
       filePath = './index.html';

   console.log(filePath);
   var extname = path.extname(filePath);
   var contentType = 'text/html';
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
    return Math.floor(Math.random() * (max - min) + min);
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

const TechnobladeQuote = [
    {quote: 'NOT EVEN CLOSE BABY TECHNOBLADE NEVER DIES'}, // 1
    {quote: 'technoblade never dies'}, // 2
    {quote: 'dude these orphans are getting destroyed'}, // 3
    {quote: 'this is the second worst thing that has happened to these orphans in their lives'}, // 4
    {quote: 'subscribe to technoblade'}, // 5
    {quote: 'if you wish to defeat me, train for another 100 years'}, // 6
    {quote: 'did you try getting good?'}, // 7
    {quote: 'i told you man... i am an anime protagonist'}, // 8
    {quote: 'sometimes its tough being the best'}, // 9
    {quote: 'blood for the blood god'}, // 10
    {quote: 'im not saying im winning this game.. but... im winning this game'}, // 11
    {quote: 'all part of my master plan'}, // 12
    {quote: 'this is my main game'}, // 13
    {quote: 'nerd spotted'}, // 14
    {quote: 'i can tryhard any game!'}, // 15
    {quote: 'im so good at video games'}, // 16
    {quote: 'aaaaaand not even close'}, // 17
    {quote: 'what a scam'}, // 18
    {quote: 'thank you hypixel'}, // 19
    {quote: 'dying is for casuals, forget what i did like 3 seconds ago'}, // 20
    {quote: 'i play minecraft! dont tell my parents they think i have a job'}, // 21
    {quote: 'i had no expectations and i still managed to get dissapointed... welcome to bedwars'}, // 22
    {quote: 'lets cyberbully some nerds'}, // 23
    {quote: 'im so good at this game'}, // 24
    {quote: 'off the map you all go'}, // 25
    {quote: 'weeeee'}, // 26
    {quote: 'he tried...'}, // 27
    {quote: 'sometimes i dream about trees'}, // 28
    {quote: 'tommy, just... just stop talking'}, // 29
    {quote: 'i call dibs on the planet'}, // 30
    {quote: 'i just threw some guy off a ledge. with my bare fist!'}, // 31
    {quote: 'weapons are for casuals'}, // 32
    {quote: 'the cyberbullying is off to a good start'}, // 33
    {quote: 'a little known fact, im actually the best fortnite player of all time'}, // 34
    {quote: 'am i wearing pants right now? you just have to take my word for it'}, // 35
    {quote: 'cant run away from your problems when they have ender pearls'} // 36
];
let quoteInt = getRandomInt(TechnobladeQuote.length + 1);

const liechtenstein = [
    {misspell: 'lichestien'},
    {misspell: 'lichistint'},
    {misspell: 'lichtenstein'},
    {misspell: 'liehctenstein'},
    {misspell: 'liechtenstien'}
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
let channel;
client.on('ready', async() => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
//     await mongo().then(mongoose => {
//         try {
//             console.log('connected to mongo');
//         } finally {
//             mongoose.connection.close();
//         };
//     });
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

    channel.send(`https://media.discordapp.net/attachments/742059535484846150/761954413869793340/image0-16.gif`);
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
            "title": "All list of commands (Main branch)",
            "description": `prefix: .`,
            "color": 53380,
            "footer": {
                "text": "Added random number generator!"
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
                  "value": `${TechnobladeQuote[quoteInt].quote} (random technoblade quote)`,
                  "inline": true
                },
                {
                    "name": "suggest",
                    "value": "Suggest some ideas, might add it to the bot",
                    "inline": true
                },
                {
                    "name": "info",
                    "value": "General bot information",
                    "inline": true
                },
                {
                    "name": "rng (minNumber) (maxNumber)",
                    "value": "Random number generator (min value is optional)",
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

        // if (message.author.bot) return; // ignore all messages sent by other bots
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
            // if (message.author.id === `341123308844220447` || message.author.id === `707359017252683896` || message.author.id === `638422704550313984` || message.author.id === `638422704550313984`) {
                let code = args.join(' ');
                try {
                    let result = eval(code);
                    let output = result;
                    if (typeof output !== 'string') {
                        output = require('util').inspect(result);
                    }
                    message.channel.send(output, {code: 'js'});
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${output, {code: 'js'}}`);
                } catch (error) {
                    message.channel.send(`\`Code ran with an error:\` \`\`\`xl\n${error}\n\`\`\``);
                    console.log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${code} \nThere was an error running this code: \n${error}`);
                };
            // } else return channel.send(`${TechnobladeQuote[quoteInt].quote} (No permission)`);
        }
        else if (command === "exit") {
            if (message.author.id === `341123308844220447`) {
                console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                message.channel.send(`:sob:`).then(() => process.exit(1));
            }
            else {
                console.log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`)
                let quoteInt = getRandomInt(37);
                channel.send(TechnobladeQuote[quoteInt].quote);    
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
            else return channel.send(`${TechnobladeQuote[quoteInt].quote} (No permission)`);
        }  
        else if (command === "quote") {
            quoteInt = getRandomInt(37);
            return message.channel.send(TechnobladeQuote[quoteInt].quote);
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
                return message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nbtw if you do, for example, .rng 20 then the number it will actually give will be 1-19`);
            } else if (isNaN(args[1]) === false) {
                const min = args[0];
                const max = args[1];
                return message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nunder testing rn`);
            }
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
                return warmode = on;
            } else if (mode = 'off') {
                logCommand();
                message.channel.send(`${pingNNL} war over now you can do whatever with the code in peace`);
                return warmode = off;
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
    }
    updateDateLoop();
});

let europesimStartDate = Date.parse('May 25 2021 00:00:00 GMT');
let currentDate = Date.now();
let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
europesimCurrentYear = Math.floor(europesimStartYear + differenceInDays);
switch (nowUTC) {
    case 0, 1:
        europesimCurrentMonth = 'January'
        break;
    case 2, 3:
        europesimCurrentMonth = 'Febuary'
        break;
    case 4, 5:
        europesimCurrentMonth = 'March'
        break;
    case 6, 7:
        europesimCurrentMonth = 'April'
        break;
    case 8, 9:
        europesimCurrentMonth = 'May'
        break;
    case 10, 11:
        europesimCurrentMonth = 'June'
        break;
    case 12, 13:
        europesimCurrentMonth = 'July'
        break;  
    case 14, 15:
        europesimCurrentMonth = 'August'
        break;  
    case 16, 17:
        europesimCurrentMonth = 'September'
        break;
    case 18, 19:
        europesimCurrentMonth = 'October'
        break;
    case 20, 21:
        europesimCurrentMonth = 'November'
        break;
    case 22, 23:
        europesimCurrentMonth = 'December'
        break;
};

client.login(config.token);
