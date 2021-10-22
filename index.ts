const start = Date.now();
require('dotenv').config();
import Discord = require('discord.js');
import DiscordVoice = require('@discordjs/voice');
import { MessageEmbed } from 'discord.js';
const client = new Discord.Client({
    intents: 32767,
    presence: {
        status: 'online',
        activities: [{
            name: '.help',
            type: 'PLAYING',
        }],
    },
    allowedMentions: { parse: ['roles', 'users'] },
});
const smartestchatbot = require('smartestchatbot');
const scb = new smartestchatbot.Client();
import config from './config.json';
const guildID = '846807940727570433';
const botchannelID = '846811100338323497';
const DateChannelID = '848247855789375508';
const prefix = config.prefix;
import fs = require('fs');
const fsp = require('fs').promises;
import path = require('path');
import http = require('http');
const mcdata = require('mcdata');
const pingNNL = '<@341123308844220447>';

let now = new Date();
let nowUTC = now.getUTCHours();
const europesimStartYear = 1900;
let europesimCurrentYear: number;
let europesimCurrentMonth: string;

function updateYear() {
    europesimStartDate = Date.parse('August 30 2021 00:00:00 GMT');
    currentDate = Date.now();
    differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays));
}
function updateMonth() {
    now = new Date();
    nowUTC = now.getUTCHours();
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
}
function log(message: string) {
    console.log(`[server.js] ${message}`);
}
function removeMCColorCodes(string: string) {
    return string
    // color shenanigans
    .replace('§4', '').replace('§c', '').replace('§6', '').replace('§e', '').replace('§2', '').replace('§a', '').replace('§b', '').replace('§3', '').replace('§1', '')
    .replace('§9', '').replace('§d', '').replace('§5', '').replace('§f', '').replace('§7', '').replace('§8', '').replace('§0', '')
    // other font shenanigans
    .replace('§k', '').replace('§l', '').replace('§m', '').replace('§n', '').replace('§o', '').replace('§r', '');
}

const httpHost = '0.0.0.0';
const httpPort = 42069;
let indexFile: any;
const requestListener = (req: any, res: any) => {
    res.setHeader('Content-Type', 'text/html"');
    res.writeHead(200);
    res.end(indexFile);
};
const httpServer = http.createServer(requestListener);
fsp.readFile(`${__dirname}/index.html`).then((contents: any) => {
    indexFile = contents;
    httpServer.listen(httpPort, httpHost, () => {
        log(`[HttpServer] Server is running on http://${httpHost}:${httpPort}`);
    });
}).catch((error: any) => {
    console.error(`[HttpServer] Could not read index.html file: ${error}`);
    process.exit(1);
});

function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomInt(max: number) {
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
    'cant run away from your problems when they have ender pearls',
];
let quoteInt = getRandomInt(TechnobladeQuote.length + 1);
function randomTechnoQuote(quoteNumber: number) {
    return TechnobladeQuote[quoteNumber];
}

const liechtenstein = [
    'lichestien',
    'lichistint',
    'lichtenstein',
    'liehctenstein',
    'liechtensteing',
    'liechtenstien',
    'lechteinstei',
    'lechtenstei',
    'iechtenstein',
];

function jsonRead(filePath: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, content: any) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(content));
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
}
function jsonWrite(filePath: string, data: any) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 4), (err: any) => {
            if (err) {
                reject(err);
            } resolve(true);
        });
    });
}
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let botChannel: any, DateChannel: any, userCount: number, memberCount: number, botCount: number, onlineUsers: number;
client.on('ready', async () => {
    log(`Logged in successfully as ${client?.user.tag}!`);
    const filePath = path.resolve(__dirname, './config.json');
    process.on('uncaughtException', async (err) => {
        console.error(`[${now}] [${err.name}] ${err.stack}`);
        await botChannel.send(`Some serious af error happened <@341123308844220447>\n\`\`\`js\n${err.stack}\`\`\`\ncya losers`);
        process.exit(0);
    });
    botChannel = await client.channels.fetch(botchannelID);
    module.exports = { botChannel };
    const { netRun } = require('./chatbot/chatbot');
    botChannel.send(`hi im online, i took ${(Date.now() - start) / 1000}s to start`);
    let guild = await client.guilds.fetch(guildID);
    function updateGuildMembers() {
        memberCount = guild.memberCount;
        debugSend(`memberCount = guild.memberCount; ${memberCount} (${guild.memberCount})`);
        userCount = guild.members.cache.filter(
            (member: any) => !member.user.bot,
        ).size;
        debugSend(`userCount = guild.members.cache.filter(member => !member.user.bot).size; ${userCount} (${guild.members.cache.filter((member: any) => !member.user.bot).size})`);
        botCount = memberCount - userCount;
        debugSend(`botCount = memberCount - userCount; ${botCount} = ${memberCount} - ${userCount}`);
        onlineUsers = guild.members.cache.filter(
            (member: any) => member.presence?.status !== 'offline' && !member.user.bot,
        ).size;
    }
    try {
        updateGuildMembers();
    } catch (error) {
        botChannel.send(`:x: error with member count stuff\n\`\`\`js\n${error?.stack}\`\`\``);
    }
    function debugSend(message: string) {
        if (config.debug === true) botChannel.send(`\`[DEBUG]: ${message}\``);
        else return;
    }
    try {
        DateChannel = guild.channels.cache.get(DateChannelID);
        const connection = DiscordVoice.joinVoiceChannel({
            channelId: DateChannelID,
            guildId: guildID,
            adapterCreator: botChannel.guild.voiceAdapterCreator,
        });
        debugSend('ran DiscordVoice.joinVoiceChannel({...})');
        const player = DiscordVoice.createAudioPlayer();
        debugSend('ran DiscordVoice.createAudioPlayer()');
        connection.on(DiscordVoice.VoiceConnectionStatus.Ready, () => {
            debugSend('ready to play in voice channel');
        });
        async function playSound(
            {
                folder,
                sound
            } : { 
                folder: string,
                sound: string 
            }
        ) {
            return new Promise((resolve, reject) => {
                const resource = DiscordVoice.createAudioResource(
                    path.resolve(
                        `stuff/sounds/${folder}/${sound}.mp3`,
                    ),
                );
                player.play(resource);
                connection.subscribe(player);
                player.once('error', (error: any) => {
                    debugSend(`:x: player error\n${error}`);
                    console.log(`Player error!\n${error}`);
                    reject(error);
                });
                player.once('stateChange', (oldState: any, newState: any) => {
                    if (oldState === DiscordVoice.AudioPlayerStatus.Playing && newState === DiscordVoice.AudioPlayerStatus.Idle) {
                        resolve(true);
                    }
                });
            });
        }
        client.on('voiceStateUpdate', (oldState: any, newState: any) => {
            debugSend(`${oldState.member.displayName}, ${oldState.id} => ${newState.id}`);
            log(`${oldState.member.displayName}, ${oldState.id} => ${newState.id}`);
        });
        if (DateChannel.members.size > 1) {
            debugSend('DateChannel members size > 1');
            setTimeout(async () => {
                debugSend('playing sound?..');
                await playSound({
                    folder: 'technoblade',
                    sound: 'uhhh',
                }).then(() => {
                    debugSend('done, stopping');
                    player.stop();
                    connection.disconnect();
                });
            }, 2000);
        }
    } catch (error) {
        botChannel.send(`:x: error with date voice channel stuff\n\`\`\`js\n${error}\`\`\``);
    }

    client.on('error', (error: any) => log(error));
    client.on('messageCreate', async (message: any) => {
        if (message.channel.name === 'es-chatbot') {
            try {
                if (message.author.bot) return;
                if (config.chatbot === 'new') {
                    message.reply({
                        content: netRun(message.content),
                        allowedMentions: { repliedUser: true },
                    });
                } else {
                    if (!message.content) return message.react('❌');
                    message.channel.sendTyping();
                    scb.chat({ message: message.content, name: client?.user.username, user: message.author.id, owner: 'emberglaze', language: 'auto' }).then((msg: string) => {
                        message.reply({
                            content: msg.toLowerCase()
                            .replace('\'', '')
                            .replace('you can interrupt me at any time by clicking the “x” on the top-right', 'if you want me to stop then stop talking here, its that simple')
                            .replace('ok, ill stop when you click the “x” on the top-right', 'i will stop once you stop typing here dude'),
                            allowedMentions: { repliedUser: true },
                        });
                    });
                }
            } catch (error) {
                message.channel.send(`:x: epic fail \`\`\`js\n${error?.stack}\`\`\``);
            }
        }

        if (message.content.startsWith('..')) return log('"command" with .. start ignored');
        if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');

        const args: any[] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        function logCommand() {
            log(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
            if (config.debug === true) debugSend(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
        }
        if (message.content.startsWith(prefix)) {
            logCommand();
            if (command === 'esim') {
                if (!args[0]) {
                    const esimEmbed = new MessageEmbed()
                    .setTitle('Command category: Europesim')
                    .setDescription(`Usage: ${prefix}esim (command)\n<> = Optional argument(s)`)
                    .setColor(53380)
                    .setFooter('https://ourworldofpixels.com/europesim')
                    .addFields(
                        {
                            name: 'info',
                            value: 'Shows information, duh',
                            inline: true,
                        },
                        {
                            name: 'roll <country>',
                            value: 'Literally rng but for europesim (1-20)',
                            inline: true,
                        },
                    );
                    return message.channel.send({ embeds: [esimEmbed] });
                } else if (args[0] === 'info') {
                    try {
                        updateGuildMembers();
                        const infoEmbed = new MessageEmbed()
                        .setTitle('Useless information about europesim')
                        .setDescription('totally useless why did you use this command')
                        .setAuthor('Bot information', 'https://cdn.discordapp.com/icons/846807940727570433/4bbf13c1ce8bfb351fc7eafdc898e7d1.png')
                        .setColor(53380)
                        .setFooter('https://ourworldofpixels.com/europesim')
                        .addFields(
                            {
                                name: 'Current UTC hour',
                                value: `${nowUTC}`,
                                inline: true,
                            },
                            {
                                name: 'Europesim year, month',
                                value: `${europesimCurrentYear}, ${europesimCurrentMonth}`,
                                inline: true,
                            },
                            {
                                name: 'Europesim\'s server member count',
                                value: `${userCount} users + ${botCount} bots = ${memberCount} overall. Online users: ${onlineUsers}`,
                            },
                        );
                        return message.channel.send({ embeds: [infoEmbed] });
                    } catch (error) {
                        message.channel.send(`:x: eror\n\`\`\`js\n${error}\`\`\``);
                        message.react('❌');
                    }
                } else if (args[0] === 'roll') {
                    let roll = getRandomArbitrary(1, 20); // roll
                    if (roll === 0) {
                        roll = getRandomArbitrary(1, 20); // reroll
                        message.channel.send('got a 0 for some reason, rerolling automatically');
                        if (args[1]) {
                            if (roll === 20) {
                                return message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                            } else return message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                        } else return message.channel.send(`rolled a \`${roll}\``);
                    } else if (args[1]) {
                        if (roll === 20) {
                            return message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                        } else return message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                    } else return message.channel.send(`rolled a \`${roll}\``);
                }
            } else if (command === 'mc') {
                if (!args[0]) {
                    const mcEmbed = new MessageEmbed()
                    .setTitle('Command category: Minecraft')
                    .setDescription(`Usage: ${prefix}mc (command)`)
                    .setColor(53380)
                    .setFooter(`${TechnobladeQuote[quoteInt]}\n- Technoblade`)
                    .addFields(
                        {
                            name: 'serverinfo OR server OR sinfo (Minecraft Server IP)',
                            value: 'Ping a minecraft server and return information about the server',
                            inline: true,
                        },
                    );
                    return message.channel.send({ embeds: [mcEmbed] });
                } else if (args[0] === 'serverinfo' || args[0] === 'server' || args[0] === 'sinfo') {
                    try {
                        message.channel.send('Pinging minecraft server...');
                        mcdata.serverStatus(args[1]).then((serverinfo: any) => {
                            const serverInfoEmbed = new MessageEmbed()
                            .setTitle('Server Information')
                            .setColor(53380)
                            .setAuthor(`${args[1]}`)
                            .addField('Status', serverinfo.serverStatus, true)
                            .addField('Server IP', serverinfo.serverip, true)
                            .addField('Version', serverinfo.version, true)
                            .addField('Players', `${serverinfo.players}/${serverinfo.maxplayers} online`, true)
                            .addField('MOTD', removeMCColorCodes(serverinfo.motd.text.toString()), true)
                            .addField('Ping', `${serverinfo.ping}ms`, true);
                            message.channel.send({ embed:serverInfoEmbed });
                        });
                    } catch (error) {
                        return message.channel.send(`Error while running this command: \n\`${error}\``);
                    }
                }
            } else if (command === 'hi') {
                message.channel.send('hi im online what do u want (main branch)');
            } else if (command === 'setguildavatar' || command === 'setguildpfp') {
                // todo
            } else if (command === 'eval') {
                let evalEmbed = new MessageEmbed()
                .setTitle('eval result');
                if (message.member.roles.cache.some((role: any) => role.name === 'Admin') || message.author.id === '341123308844220447') {
                    const code = args.join(' ');
                    try {
                        const result = eval(code);
                        let output = result;
                        if (typeof output !== 'string') output = require('util').inspect(result);
                        evalEmbed = evalEmbed
                        .setColor(53380)
                        .addField('Output', `\`\`\`js\n${output}\`\`\``);
                        message.channel.send({ embeds: [evalEmbed] });
                        log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${output}`);
                    } catch (error) {
                        evalEmbed = evalEmbed
                        .setColor('RED')
                        .addField('Error output', `\`\`\`js\n${error}\`\`\``);
                        message.channel.send({ embeds: [evalEmbed] });
                        log(`recieved ${command} command from ${message.author.tag} @ ${now.toString()} ${message.content} \n${code} \nThere was an error running this code: \n${error}`);
                    }
                } else return message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
            } else if (command === 'exit') {
                try {
                    if (message.author.id === '341123308844220447' || message.member.roles.find((role: any) => role.name === 'Admin')) {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                        message.channel.send(':sob:').then(() => process.exit(1));
                    } else {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                        quoteInt = getRandomInt(37);
                        message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
                    } return;
                } catch (error) {
                    message.channel.send('I got an error executing the command!');
                    message.channel.send(error);
                    return;
                }
            } else if (command === 'sudo') {
                quoteInt = getRandomInt(37);
                if (message.author.id === '341123308844220447') {
                    const sudo = args.join(' ');
                    return message.channel.send(sudo);
                } else return message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
            } else if (command === 'quote') {
                quoteInt = getRandomInt(37);
                return message.channel.send(`quote number ${quoteInt}: \n"${TechnobladeQuote[quoteInt]}"`);
            } else if (command === 'suggest') {
                const suggest = args.join(' ');
                client.users.fetch('341123308844220447').then((nnl: any) => {
                    nnl.send(`Bot suggestion by ${message.author.tag}:\n\`${suggest}\`\nSent at ${message.createdAt} in <#${message.channel.id}>`);
                });
                return message.channel.send('Your suggestion has been sent! thanks');
            } else if (command === 'pfp' || command === 'avatar') {
                try {
                    let user;
                    let pfp;
                    if (args[0]) {
                        if (message.mentions.users.size > 0) {
                            user = message.mentions.users.first();
                            pfp = user.displayAvatarURL({ dynamic: true });
                            return message.channel.send(`oh man you could've just sent me an id why did you ping that poor person just for his pfp...\nanyway, ${pfp}`);
                        } else {
                            client.users.fetch(args[0]).then((user: Discord.User) => {
                                pfp = user.avatarURL({ dynamic: true });
                                return message.channel.send(`got it!\n${pfp}`);
                            });
                        }
                    } else {
                        user = message.author;
                        pfp = user.avatarURL({ dynamic: true });
                        return message.channel.send(`you wanna look at your own pfp? alright fine\n${pfp}`);
                    }
                } catch (error) {
                    message.react('❌');
                    message.channel.send(`epic bruh moment (command error)\n\`${error}\``);
                    log(`pfp command command fail: ${error}`);
                }
            } else if (command === 'rng') {
                if (isNaN(args[1]) === true) return message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nthis generator is inclusive at 0 but not at ${args[0] - 1} PLEASE keep that in mind\ntldr gives only 0 to ${args[0] - 1}`);
                else if (isNaN(args[1]) === false) {
                    const min = args[0];
                    const max = args[1];
                    return message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nthis generator is inclusive at both ${min} and ${max}\nbasically gives values between ${min} and ${max} including them`);
                }
            } else if (command === 'rcg') {
                const countryList = [
                    'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
                    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi',
                    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Democratic Republic of the Congo (Kinshasa)', 'Congo (Brazzaville)', 'Cook Islands', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
                    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
                    'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
                    'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories',
                    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana',
                    'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City)', 'Honduras', 'Hong Kong', 'Hungary',
                    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy',
                    'Jamaica', 'Japan', 'Jersey', 'Jordan',
                    'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan',
                    'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
                    'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia (Federated States of)', 'Moldova (the Republic of)', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar',
                    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway',
                    'Oman',
                    'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico',
                    'Qatar',
                    'Republic of North Macedonia', 'Romania', 'Russian Federation', 'Rwanda', 'Réunion',
                    'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syrian Arab Republic',
                    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu',
                    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom of Great Britain and Northern Ireland', 'United States Minor Outlying Islands', 'United States of America', 'Uruguay', 'Uzbekistan',
                    'Vanuatu', 'Venezuela', 'Vietnam', 'British Virgin Islands', 'American Virgin Islands',
                    'Wallis and Futuna', 'Western Sahara',
                    'Yemen',
                    'Zambia', 'Zimbabwe',
                    'Åland Islands (Aland Islands)',
                ];
                return message.channel.send(`Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``);
            }
            else if (command === 'code') {
                if (args[0] === 'args') {
                    return message.channel.send(
                        'u forgot again? bruh\n`.(command) (args[0]) (args[1])...` etc\nget good lol\nalso uh if you want to category `.(category => command) (command => args[0])`',
                    );
                } else if (args[0] === 'rae' || args[0] === 'randomarrayelement') {
                    return message.channel.send(
                        'how many times do i have to remind u with this shit?\n```js\narray[Math.floor(Math.random() * array.length)];```',
                    );
                } else return message.channel.send('what now? random array element or args 🤣🤣🤣');
            } else if (command === 'help') {
                const helpEmbed = new MessageEmbed()
                .setTitle('All list of commands')
                .setDescription(`prefix: ${config.prefix}\n<> = optional argument`)
                .setColor(53380)
                .setFooter('epic new chatbot (WIP af)')
                .addFields(
                    {
                        name: 'hi',
                        value: 'Usually used to check if bot is responding/online or not',
                        inline: true,
                    },
                    {
                        name: 'eval (code)',
                        value: 'Run JavaScript code',
                        inline: true,
                    },
                    {
                        name: 'exit',
                        value: 'Shortcut to process.exit(1)',
                        inline: true,
                    },
                    {
                        name: 'sudo (message)',
                        value: 'Send messages as me (idk why i added it, might remove)',
                        inline: true,
                    },
                    {
                        name: 'quote',
                        value: 'Random technoblade quote',
                        inline: true,
                    },
                    {
                        name: 'suggest (idea: string)',
                        value: 'Send bot suggestions to emberglaze, may or may not be added :shrug:',
                        inline: true,
                    },
                    {
                        name: 'esim',
                        value: 'Categorised commands that are related to europesim. Run this command for more info',
                        inline: true,
                    },
                    {
                        name: 'mc',
                        value: 'Categorised minecraft commands. Run this command for more info',
                        inline: true,
                    },
                    {
                        name: 'rng <minValue> (maxValue)',
                        value: 'Random number generator',
                        inline: true,
                    },
                    {
                        name: 'rcg',
                        value: 'Random country generator, don\'t kill me',
                        inline: true,
                    },
                    {
                        name: 'avatar OR pfp <mention OR account id>',
                        value: 'Returns a profile picture of either message author (leave arguments empty), mentioned/pinged account or account by id',
                    },
                    {
                        name: 'code <code stuff>',
                        value: `Serves as a reminder to ${pingNNL} for some parts of code he frequently forgets about lol he is so bad he forgets his own code`,
                    },
                    {
                        name: 'help',
                        value: 'It does exactly what you think it does',
                    },
                );
                return message.channel.send({ embeds: [helpEmbed] });
            } else if (command === 'dn') {
                return message.channel.send('deez nuts');
            } else if (command === 'debug') {
                if (args[0] === 'true') {
                    if (config.debug === false) {
                        message.channel.send('okie dokie');
                        config.debug = true;
                        jsonWrite(filePath, config);
                        message.channel.send('✅ done');
                    } else if (config.debug === true) {
                        message.channel.send('❌ its already on');
                    }
                } else if (args[0] === 'false') {
                    if (config.debug === false) {
                        return message.channel.send('its already off ❌ lol dont panic');
                    } else if (config.debug === true) {
                        config.debug = false;
                        message.channel.send('okie dokie');
                        jsonWrite(filePath, config);
                        return message.channel.send('✅ done');
                    }
                } else if (!args[0]) {
                    if (config.debug === true) {
                        message.channel.send('debug mode is currently on ✅');
                    } else if (config.debug === false) {
                        message.channel.send('debug mode is currently off ❌');
                    }
                }
            } else if (command === 'chatbot') {
                if (args[0] === 'new') {
                    if (config.chatbot === 'old') {
                        message.channel.send('toggling chatbot into newer one');
                        config.chatbot = 'new';
                        jsonWrite(filePath, config);
                        message.channel.send('done');
                    } else return message.channel.send(':x: either invalid value in config or its already toggled to new');
                } else if (args[0] === 'old') {
                    if (config.chatbot === 'new') {
                        message.channel.send('toggling chatbot into older one');
                        config.chatbot = 'old';
                        jsonWrite(filePath, config);
                        message.channel.send('done');
                    } else return message.channel.send(':x: either invalid value in config or its already toggled to old');
                } else if (!args[0]) {
                    if (config.chatbot === 'new') message.channel.send('Chatbot is currently toggled to new');
                    else if (config.chatbot === 'old') message.channel.send('Chatbot is currently toggled to old');
                    else message.channel.send(':x: invalid value in config, tell emberglaze to fix it');
                }
            } else if (command === 'config') {
                message.channel.send(`\`\`\`json\n${JSON.stringify(require('./config.json'), null, 4)}\`\`\``);
            } else if (command === '') return;
        } else if (!message.content.startsWith(prefix)) {
            if (message.channel.type === 'dm') return log(`Direct message from ${message.author.tag} at ${message.createdAt}:\n${message.content}`);
        }
    });
    const a = 1;

    function updateDateLoop() {
        setTimeout(() => {
            updateMonth();
            updateYear();
            DateChannel.setName(`${europesimCurrentYear}, ${europesimCurrentMonth}`);
            if (a > 0) {
                updateDateLoop();
            }
        }, 10000);
    }
    try {
        updateDateLoop();
    } catch (error) {
        botChannel.send(`date update error \n${error}`);
    }
});

let europesimStartDate = Date.parse('August 30 2021 00:00:00 GMT');
let currentDate = Date.now();
let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays));
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
europesimCurrentMonth = months[Math.floor(nowUTC / 2)];

client.login(process.env.DJS_TOKEN);
