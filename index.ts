const startTime = Date.now();

require('dotenv').config();
import path = require('path');
import http = require('http');
import fetch from 'node-fetch';
import mcdata = require('mcdata');
import fsp = require('fs/promises');
import Discord = require('discord.js');
import DiscordVoice = require('@discordjs/voice');
import smartestchatbot = require('smartestchatbot');
(async () => {
    let config = JSON.parse(await fsp.readFile('./config.json', { encoding: 'utf8' })),
        now = new Date(),
        nowUTC = now.getUTCHours(),
        europesimCurrentYear: number,
        europesimCurrentMonth: string,
        indexFile: string
    ;

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
    }),
        scb = new smartestchatbot.Client(),
        guildID = '846807940727570433',
        botchannelID = '846811100338323497',
        dateChannelID = '848247855789375508',
        pingNNL = '<@341123308844220447>',
        europesimStartYear = 1900,
        httpHost = '0.0.0.0',
        httpPort = 42069
    ;

    const requestListener: http.RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
        res.setHeader('Content-Type', 'text/html"');
        res.writeHead(200);
        res.end(indexFile);
    };
    const httpServer = http.createServer(requestListener);
    let contents = await fsp.readFile(`${__dirname}/index.html`, { encoding: 'utf8' }).catch(error => {
        console.error(`[HttpServer] Could not read index.html file: ${error}`);
        process.exit(1);
    });
    indexFile = contents;
    httpServer.listen(httpPort, httpHost, () => {
        log(`[HttpServer] Server is running on http://${httpHost}:${httpPort}`);
    });

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
    let quoteInt = randomTechnoQuote();
    function randomTechnoQuote(): string {
        return TechnobladeQuote[getRandomInt(TechnobladeQuote.length + 1)];
    }

    const liechtenstein = [
        'lichestien',
        'lichistint',
        'lechtenstei',
        'lichtenstein',
        'lechteinstei',
        'iechtenstein',
        'liehctenstein',
        'liechtenstien',
        'liechtensteing',
    ];

    let botChannel: any,
        userCount: number,
        memberCount: number,
        botCount: number,
        onlineUsers: number
    ;
    client.once('ready', async () => {
        log(`Logged in successfully as ${client?.user?.tag}!`);
        const filePath = path.resolve(__dirname, './config.json');
        process.on('uncaughtException', async (err) => {
            console.error(`[${now}] [${err.name}] ${err.stack}`);
            await botChannel.send(`Some serious af error happened <@341123308844220447>\n\`\`\`js\n${err.stack}\`\`\`\ncya losers`);
            process.exit(0);
        });
        setInterval(() => {
            fetch('https://bots.moe/api/bot/848217938288967710/server_count', {
                method: 'POST',
                body: JSON.stringify({
                    server_count: client.guilds.cache.size
                }),
                headers: {
                    'Authorization': process.env.BOTS_MOE_API_KEY,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                if (response.error) log(`[bots.moe] Recieved error in response! JSON: ${JSON.stringify(response, null, 4)}`);
                else log(`[bots.moe] Successful request. JSON: ${JSON.stringify(response, null, 4)}`);
            }).catch(error => log(`[bots.moe] Error! ${error}`));
        }, 10 * 60000); // every 10 minutes
        botChannel = await client.channels.fetch(botchannelID);
        module.exports = { botChannel };
        const { netRun } = require('./chatbot/chatbot');
        botChannel.send(`hi im online, i took ${(Date.now() - startTime) / 1000}s to start`);
        let guild = await client.guilds.fetch(guildID);
        const dateChannel = guild.channels.resolve(dateChannelID);
        function updateGuildMembers() {
            memberCount = guild.memberCount;
            debugSend(`memberCount = guild.memberCount; ${memberCount} (${guild.memberCount})`);
            userCount = guild.members.cache.filter(
                (member: Discord.GuildMember) => !member.user.bot
            ).size;
            debugSend(`userCount = guild.members.cache.filter(member => !member.user.bot).size; ${userCount}`);
            botCount = memberCount - userCount;
            debugSend(`botCount = memberCount - userCount; ${botCount} = ${memberCount} - ${userCount}`);
            onlineUsers = guild.members.cache.filter(
                (member: Discord.GuildMember) => member.presence?.status !== 'offline' && !member.user.bot,
            ).size;
        }
        try {
            updateGuildMembers();
        } catch (error: any) {
            botChannel.send(`❌ error with member count stuff\n\`\`\`js\n${error.stack}\`\`\``);
        }
        function debugSend(message: string) {
            if (config.debug === true) botChannel.send(`\`[DEBUG]: ${message}\``);
        }
        try {
            DiscordVoice.joinVoiceChannel({
                channelId: dateChannelID,
                guildId: guildID,
                adapterCreator: botChannel.guild.voiceAdapterCreator,
            });
            debugSend('ran DiscordVoice.joinVoiceChannel({...});');
        } catch (error) {
            botChannel.send(`:x: error with date voice channel stuff\n\`\`\`js\n${error}\`\`\``);
        }

        client.on('error', (error) => log(error.stack));
        client.on('messageCreate', async (message: Discord.Message) => {
            if (message.channel.type === 'DM') return log(`Direct message from ${message.author.tag} at ${message.createdAt}:\n${message.content}`);
            if (message.channel.name === 'es-chatbot') {
                try {
                    if (message.author.bot) return;
                    if (config.chatbot === 'new') {
                        await message.reply({
                            content: netRun(message.content),
                            allowedMentions: { repliedUser: true }
                        }); return;
                    } else if (config.chatbot === 'old') {
                        if (!message.content) { await message.react('❌'); return; }
                        message.channel.sendTyping();
                        let msg = await scb.chat({
                            message: message.content,
                            name: message.author.username,
                            owner: 'emberglaze',
                            user: message.author.id
                        });
                        await message.reply({
                            content: msg.toLowerCase()
                            .replace('\'', '')
                            .replace('you can interrupt me at any time by clicking the “x” on the top-right', 'if you want me to stop then stop talking here, its that simple')
                            .replace('ok, ill stop when you click the “x” on the top-right', 'i will stop once you stop typing here dude'),
                            allowedMentions: { repliedUser: true },
                        });
                        return;
                    } else { message.channel.send(`❌ Invalid chatbot value in config: ${config.chatbot}`); return; }
                } catch (error) {
                    message.channel.send(`:x: epic fail \`\`\`js\n${error?.stack}\`\`\``); return;
                }
            }
            if (message.content.startsWith('..')) return;
            if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');

            const args: any[] = message.content.slice(config.prefix.length).trim().split(/ +/g),
                suscommand: string = message.content.slice(config.susprefix.length).trim().toLowerCase(),
                command = args.shift().toLowerCase()
            ;
            function logCommand() {
                log(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
                debugSend(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
            }
            if (message.content.startsWith(config.prefix)) {
                logCommand();
                if (command === 'esim') {
                    if (!args[0]) {
                        const esimEmbed = new Discord.MessageEmbed()
                        .setTitle('Command category: Europesim')
                        .setDescription(`Usage: ${config.prefix}esim (command)\n<> = Optional argument(s)`)
                        .setColor(53380)
                        .setFooter('https://ourworldofpixels.com/europesim')
                        .addFields(
                            {
                                name: 'info',
                                value: 'Shows information, duh',
                                inline: true
                            },
                            {
                                name: 'roll <country>',
                                value: 'Literally rng but for europesim (1-20)',
                                inline: true
                            }
                        );
                        message.channel.send({ embeds: [esimEmbed] });
                        return;
                    } else if (args[0] === 'info') {
                        try {
                            updateGuildMembers();
                            const infoEmbed = new Discord.MessageEmbed()
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
                            message.channel.send({ embeds: [infoEmbed] });
                        } catch (error) {
                            message.channel.send(`:x: error\n\`\`\`js\n${error}\`\`\``);
                            message.react('❌');
                        }
                    } else if (args[0] === 'roll') {
                        let roll = getRandomArbitrary(1, 20);
                        if (roll === 0) {
                            roll = getRandomArbitrary(1, 20);
                            message.channel.send('got a 0 for some reason, rerolling automatically');
                            if (args[1]) {
                                if (roll === 20) {
                                    message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                                } else message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                            } else message.channel.send(`rolled a \`${roll}\``);
                        } else if (args[1]) {
                            if (roll === 20) {
                                message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                            } else message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                        } else message.channel.send(`rolled a \`${roll}\``);
                    }
                } else if (command === 'mc') {
                    if (!args[0]) {
                        const mcEmbed = new Discord.MessageEmbed()
                        .setTitle('Command category: Minecraft')
                        .setDescription(`Usage: ${config.prefix}mc (command)`)
                        .setColor(53380)
                        .setFooter(`${randomTechnoQuote()}\n- Technoblade`)
                        .addFields(
                            {
                                name: 'serverinfo OR server OR sinfo (Minecraft Server IP)',
                                value: 'Ping a minecraft server and return information about the server',
                                inline: true,
                            }
                        );
                        message.channel.send({ embeds: [mcEmbed] });
                    } else if (['serverinfo', 'server', 'sinfo'].includes(args[0])) {
                        try {
                            message.channel.send('Pinging minecraft server...');
                            mcdata.serverStatus(args[1]).then((serverinfo: any) => {
                                const serverInfoEmbed = new Discord.MessageEmbed()
                                .setTitle('Server Information')
                                .setColor(53380)
                                .setAuthor(`${args[1]}`)
                                .addField('Status', serverinfo.serverStatus, true)
                                .addField('Server IP', serverinfo.serverip, true)
                                .addField('Version', serverinfo.version, true)
                                .addField('Players', `${serverinfo.players}/${serverinfo.maxplayers} online`, true)
                                .addField('MOTD', removeMCColorCodes(serverinfo.motd.text.toString()), true)
                                .addField('Ping', `${serverinfo.ping}ms`, true);
                                message.channel.send({ embeds:[serverInfoEmbed] });
                            });
                        } catch (error) {
                            message.channel.send(`Error while running this command: \n\`${error}\``);
                        }
                    }
                } else if (command === 'hi') {
                    message.channel.send('hi im online what do u want (main branch)');
                } else if (command === 'setguildavatar' || command === 'setguildpfp') {
                    // todo
                } else if (command === 'eval') {
                    const code = args.join(' ');
                    let evalEmbed = new Discord.MessageEmbed()
                    .setTitle('eval result')
                    .addField('Input', `\`\`\`js\n${code}\`\`\``);
                    if (message.author.id === '341123308844220447') {
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
                    } else message.channel.send(`${randomTechnoQuote()} (No permission)`);
                } else if (command === 'exit') {
                    if (message?.author?.id === '341123308844220447' || message?.member?.roles?.cache?.find((role: Discord.Role) => role.name === 'Admin')) {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                        await message.channel.send(':sob:');
                        process.exit(1);
                    } else {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                        quoteInt = randomTechnoQuote();
                        message.channel.send(`${randomTechnoQuote()} (No permission)`);
                    }
                } else if (command === 'sudo') {
                    quoteInt = randomTechnoQuote();
                    if (message.author.id === '341123308844220447') {
                        const sudo = args.join(' ');
                        message.channel.send(sudo);
                    } else message.channel.send(`${TechnobladeQuote[quoteInt]} (No permission)`);
                } else if (command === 'quote') {
                    quoteInt = randomTechnoQuote();
                    message.channel.send(`quote number ${quoteInt}: \n"${TechnobladeQuote[quoteInt]}"`);
                } else if (command === 'suggest') {
                    const suggestion = args.join(' ');
                    let nnl = await client.users.fetch('341123308844220447');
                    nnl.send(`Bot suggestion by ${message.author.tag}:\n\`${suggestion}\`\nSent at ${message.createdAt} in <#${message.channel.id}>`);
                    message.channel.send('Your suggestion has been sent! thanks');
                } else if (command === 'pfp' || command === 'avatar') {
                    try {
                        let user: Discord.User | undefined;
                        let pfp: string | null | undefined;
                        if (args[0]) {
                            if (message.mentions.users.size > 0) {
                                user = message.mentions.users.first();
                                pfp = user?.displayAvatarURL({ dynamic: true });
                                message.channel.send(`oh man you could've just sent me an id why did you ping that poor person just for his pfp...\nanyway, ${pfp}`);
                            } else {
                                user = await client.users.fetch(args[0])
                                pfp = user.avatarURL({ dynamic: true });
                                message.channel.send(`got it!\n${pfp}`);
                            }
                        } else {
                            user = message.author;
                            pfp = user.avatarURL({ dynamic: true });
                            message.channel.send(`you wanna look at your own pfp? alright fine\n${pfp}`);
                        }
                    } catch (error) {
                        message.react('❌');
                        message.channel.send(`epic bruh moment (command error)\n\`${error}\``);
                        log(`pfp command command fail: ${error}`);
                    }
                } else if (command === 'rng') {
                    if (args.filter(arg => !isNaN(parseInt(arg))).length === 0) message.channel.send(`you didnt provide any numbers :gun:\nactual usage: \`${config.prefix}rng (number) <number>\``);
                    else if (isNaN(args[1])) message.channel.send(`random integer generator: \`${getRandomInt(args[0])}\`\nthis generator is inclusive at 0 but not at ${args[0] - 1} PLEASE keep that in mind\ntldr gives only 0 to ${args[0] - 1}`);
                    else if (!isNaN(args[1])) {
                        const min = args[0];
                        const max = args[1];
                        message.channel.send(`random arbitrary generator: \`${getRandomArbitrary(min, max)}\`\nthis generator is inclusive at both ${min} and ${max}\nbasically gives values between ${min} and ${max} including them`);
                    }
                } else if (command === 'rcg') {
                    const { countryList } = require('./countryList.json');
                    message.channel.send(`Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``);
                    return;
                } else if (command === 'code') {
                    if (args[0] === 'args') {
                        message.channel.send(
                            'u forgot again? bruh\n`.(command) (args[0]) (args[1])...` etc\nget good lol\nalso uh if you want to category `.(category => command) (command => args[0])`',
                        ); return;
                    } else if (args[0] === 'rae' || args[0] === 'randomarrayelement') {
                        message.channel.send(
                            'how many times do i have to remind u with this shit?\n```js\narray[Math.floor(Math.random() * array.length)];```',
                        ); return;
                    } else message.channel.send('what now? random array element or args 🤣🤣🤣');
                } else if (command === 'help') {
                    const helpEmbed = new Discord.MessageEmbed()
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
                    message.channel.send({ embeds: [helpEmbed] });
                } else if (command === 'dn') message.channel.send('deez nuts');
                else if (command === 'debug') {
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
                            message.channel.send('its already off ❌ lol dont panic');
                        } else if (config.debug === true) {
                            config.debug = false;
                            message.channel.send('okie dokie');
                            jsonWrite(filePath, config);
                            message.channel.send('✅ done');
                        }
                    } else if (!args[0]) {
                        if (config.debug) {
                            message.channel.send('debug mode is currently on ✅');
                        } else if (!config.debug) {
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
                        } else message.channel.send(':x: either invalid value in config or its already toggled to new');
                    } else if (args[0] === 'old') {
                        if (config.chatbot === 'new') {
                            message.channel.send('toggling chatbot into older one');
                            config.chatbot = 'old';
                            jsonWrite(filePath, config);
                            message.channel.send('done');
                        } else message.channel.send('❌ either invalid value in config or its already toggled to old');
                    } else if (!args[0]) {
                        if (config.chatbot === 'new') message.channel.send('Chatbot is currently toggled to new');
                        else if (config.chatbot === 'old') message.channel.send('Chatbot is currently toggled to old');
                        else message.channel.send('❌ invalid value in config, tell emberglaze to fix it');
                    }
                } else if (command === 'config') {
                    message.channel.send(`\`\`\`json\n${JSON.stringify(require('./config.json'), null, 4)}\`\`\``);
                } else if (command === '') return;
            } else if (command === 'setNickame' && message.author.id === '341123308844220447') {
                const me = await message.guild.members.fetch(client.user.id);
                await me.setNickname(args.join(' ')).catch(error => {
                    message.channel.send(`❌ Error changing nickname:\n\`\`\`${error}\`\`\``);
                });
                message.channel.send(`Changed my nickname to \`${args.join(' ')}\``);
            } else if (message.content.startsWith(config.susprefix) && message.author.id === '341123308844220447') {
                let shelljs = await import('shelljs');
                shelljs.exec(suscommand, (code, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `\`\`\`${stderr}\`\`\`` : `\`\`\`${stdout}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    });
                });
            }
        });
        const a = 1;
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

        async function updateDateLoop() {
            setTimeout(async () => {
                try {
                    updateMonth();
                    updateYear();
                    updateDateLoop();
                    await dateChannel.setName(`${europesimCurrentYear}, ${europesimCurrentMonth}`);
                } catch (error: any) {
                    botChannel.send(`❌ updateDateLoop() failure\n\`\`\`js\n${error?.stack}\`\`\``);
                }
            }, 10000);
        }
        try {
            await updateDateLoop();
        } catch (error) {
            debugSend(`❌ date update error \n${error}`);
        }
    });

    let europesimStartDate = Date.parse('August 30 2021 00:00:00 GMT');
    let currentDate = Date.now();
    let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];

    client.login(process.env.DJS_TOKEN);
})();

function getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}
function log(message: string): void {
    return console.log(`[${new Date().toUTCString()}] [index.ts] ${message}`);
}
function removeMCColorCodes(string: string): string {
    return string
    // color
    .replace('§4', '').replace('§c', '').replace('§6', '').replace('§e', '').replace('§2', '').replace('§a', '').replace('§b', '').replace('§3', '').replace('§1', '')
    .replace('§9', '').replace('§d', '').replace('§5', '').replace('§f', '').replace('§7', '').replace('§8', '').replace('§0', '')
    // font
    .replace('§k', '').replace('§l', '').replace('§m', '').replace('§n', '').replace('§o', '').replace('§r', '');
}
async function jsonRead(filePath: string) {
    return JSON.parse(await fsp.readFile(filePath, { encoding: 'utf8' }));
}
async function jsonWrite(filePath: string, data: object | string[]) {
    return await fsp.writeFile(filePath, JSON.stringify(data, null, 4));
}
async function readGuildConfig() {
    return JSON.parse(await fsp.readFile('guild-config.json', { encoding: 'utf8' }));
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
