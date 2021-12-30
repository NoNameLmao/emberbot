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
import { serverinfo } from './interfaces';
(async () => {
    let config = await jsonRead('./config.json'),
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
        chatbotChannelID = '871507861132423168',
        nnlID = '341123308844220447',
        pingNNL = `<@${nnlID}>`,
        europesimStartYear = 1900,
        httpHost = '0.0.0.0',
        httpPort = 42069,
        requestListener: http.RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
            res.setHeader('Content-Type', 'text/html"');
            res.writeHead(200);
            res.end(indexFile);
        },
        httpServer = http.createServer(requestListener)
    ;

    let contents = await fsp.readFile(`${__dirname}/index.html`, { encoding: 'utf8' }).catch(error => {
        console.log(`[HttpServer] fsp couldnt read index.html file:\n${error}`);
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
    ],
        liechtenstein = [
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
    function randomTechnoQuote(): string {
        return TechnobladeQuote[getRandomInt(TechnobladeQuote.length + 1)];
    }
    
    
    let quoteInt = randomTechnoQuote(),
        userCount: number,
        memberCount: number,
        botCount: number,
        onlineUsers: number
    ;
    client.once('ready', async () => {
        log(`Logged in successfully as ${client.user.tag}!`);
        const filePath = path.resolve(__dirname, './config.json');
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
                else log(`[bots.moe] Successful request.`);
            }).catch(error => log(`[bots.moe] Error! ${error}`));
        }, 10 * 60000); // every 10 minutes

        const guild = await client.guilds.fetch(guildID),
            nnl = await client.users.fetch(nnlID),
            me = await guild.members.fetch(client.user.id),
            dateChannel = guild.channels.resolve(dateChannelID),
            botChannel = client.channels.cache.get(botchannelID) as Discord.TextChannel;
        ;
        process.on('uncaughtException', async (err) => {
            console.error(`[${now}] [${err.name}] ${err.stack}`);
            if (err.message.includes('Cannot send an empty message')) {
                await botChannel.send('❌ <empty message error>');
            } else {
                await botChannel.send(`some error happened ${pingNNL}\n\`\`\`js\n${err.stack}\`\`\`\nbye`);
                process.exit(0);
            }
        });

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
        } catch (error) {
            botChannel.send(`❌ error with member count stuff\n\`\`\`js\n${error.stack}\`\`\``);
        }
        function debugSend(message: string) {
            if (config.debug) botChannel.send(`\`[DEBUG]: ${message}\``);
        }
        try {
            DiscordVoice.joinVoiceChannel({
                channelId: dateChannelID,
                guildId: guildID,
                adapterCreator: (dateChannel.guild.voiceAdapterCreator as unknown) as DiscordVoice.DiscordGatewayAdapterCreator,
            });
            debugSend('ran DiscordVoice.joinVoiceChannel({...});');
        } catch (error) {
            botChannel.send(`:x: error with date voice channel stuff\n\`\`\`js\n${error}\`\`\``);
        }
        botChannel.send(`hi im online, i took ${(Date.now() - startTime) / 1000}s to start`);

        client.on('error', (error) => log(error.stack));
        client.on('messageCreate', async message => {
            if (message.channel.type === 'DM') return log(`Direct message from ${message.author.tag} at ${message.createdAt}:\n${message.content}`);
            if (message.channel.name === 'es-chatbot') {
                try {
                    if (message.author.bot) return;
                    if (!message.content) {
                        await message.react('❌');
                        return;
                    }
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
                } catch (error) {
                    if (error.stack.includes('Message content must be a non-empty string.')) {
                        await message.channel.send('❌ <message content must be a non-empty string>');
                        return;
                    } else {
                        await message.channel.send(`❌ epic fail \`\`\`js\n${error.stack}\`\`\``);
                        return;
                    }
                }
            }
            if (message.content.startsWith('..')) return;
            if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');

            const args: string[] = message.content.slice(config.prefix.length).trim().split(/ +/g),
                suscommand: string = message.content.slice(config.susprefix.length).trim().toLowerCase(),
                command = args.shift().toLowerCase()
            ;
            function logCommand() {
                log(`recieved a ${command} command from ${message.author.tag}: ${args}`);
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
                        await message.channel.send({ embeds: [esimEmbed] });
                        return;
                    } else if (args[0] === 'info') {
                        try {
                            updateGuildMembers();
                            const infoEmbed = new Discord.MessageEmbed()
                            .setTitle('esim info')
                            .setDescription('Europesim information')
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
                            await message.channel.send({ embeds: [infoEmbed] });
                        } catch (error) {
                            await message.channel.send(`:x: error\n\`\`\`js\n${error}\`\`\``);
                            await message.react('❌');
                            return;
                        }
                    } else if (args[0] === 'roll') {
                        let roll = getRandomArbitrary(1, 20);
                        if (roll === 0) {
                            roll = getRandomArbitrary(1, 20);
                            await message.channel.send('got a 0 for some reason, rerolling automatically');
                            if (args[1]) {
                                if (roll === 20) await message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                                else await message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                            } else await message.channel.send(`rolled a \`${roll}\``);
                        } else if (args[1]) {
                            if (roll === 20) await message.channel.send(`\`${args[1]}\` rolled a \`${roll}\` :L`);
                            else await message.channel.send(`\`${args[1]}\` rolled a \`${roll}\``);
                        } else await message.channel.send(`rolled a \`${roll}\``);
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
                        await message.channel.send({ embeds: [mcEmbed] });
                    } else if (['serverinfo', 'server', 'sinfo'].includes(args[0])) {
                        try {
                            await message.channel.send('Pinging minecraft server...');
                            const serverinfo: serverinfo = await mcdata.serverStatus(args[1]);
                            const serverInfoEmbed = new Discord.MessageEmbed()
                            .setTitle('Server Information')
                            .setColor(53380)
                            .setAuthor(`${args[1]}`)
                            .addField('Status', serverinfo.serverStatus, true)
                            .addField('Server IP', serverinfo.serverip, true)
                            .addField('Version', serverinfo.version, true)
                            .addField('Players', `${serverinfo.players}/${serverinfo.maxplayers} online`, true)
                            .addField('MOTD', removeMCColorCodes(serverinfo.motd.text), true)
                            .addField('Ping', `${serverinfo.ping}ms`, true);
                            await message.channel.send({ embeds: [serverInfoEmbed] });
                        } catch (error) {
                            await message.channel.send(`Error while running this command: \n\`${error}\``);
                        }
                    }
                } else if (command === 'hi') await message.channel.send('hi im online what do u want (main branch)');
                else if (command === 'setpfp' && message.author.id === nnlID) {
                    await message.channel.send('alright king');
                    let url;
                    if (message.attachments?.first()?.url?.length > 0) url = message.attachments?.first()?.url;
                    else url = args[0];
                    await client.user.setAvatar(url);
                    await message.channel.send('done, how do i look? (refresh discord or make me send another message)');
                } else if (command === 'eval') {
                    (async () => {
                        const code = args.join(' ');
                        let evalEmbed = new Discord.MessageEmbed()
                        .setTitle('eval result')
                        .addField('Input', `\`\`\`js\n${code}\`\`\``);
                        if (message.author.id === nnlID) {
                            try {
                                const result = eval(code);
                                let output = result;
                                if (typeof output !== 'string') output = require('util').inspect(result);
                                evalEmbed = evalEmbed
                                .setColor('GREEN')
                                .addField('Output', `\`\`\`js\n${output.limit(512)}\`\`\``);
                                await message.channel.send({ embeds: [evalEmbed] });
                            } catch (error) {
                                evalEmbed = evalEmbed
                                .setColor('RED')
                                .addField('Error output', `\`\`\`js\n${error.limit(512)}\`\`\``);
                                await message.channel.send({ embeds: [evalEmbed] });
                            }
                        } else {
                            evalEmbed = evalEmbed
                            .setColor('RED')
                            .addField('technoblade never dies', `${randomTechnoQuote()}`)
                            .setFooter('❌ No permission');
                            await message.channel.send({ embeds: [evalEmbed] });
                        }
                    })();
                } else if (command === 'exit') {
                    if (message.author.id === nnlID || message.member.roles.cache.find(role => role.name === 'Admin')) {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()}. goodbye`);
                        await message.channel.send(':sob:');
                        process.exit(1);
                    } else {
                        log(`recieved exit command from ${message.author.tag} @ ${now.toString()} lol permission denied have a technoblade quote instead nerd`);
                        quoteInt = randomTechnoQuote();
                        await message.channel.send(`${randomTechnoQuote()} (No permission)`);
                    }
                } else if (command === 'sudo') {
                    quoteInt = randomTechnoQuote();
                    if (message.author.id === nnlID) {
                        const sudo = args.join(' ');
                        message.delete();
                        await message.channel.send(sudo);
                    } else await message.channel.send(`${randomTechnoQuote()} (No permission)`);
                } else if (command === 'quote') {
                    quoteInt = randomTechnoQuote();
                    await message.channel.send(`quote number ${quoteInt}: \n"${randomTechnoQuote()}"`);
                } else if (command === 'suggest') {
                    const suggestion = args.join(' ');
                    nnl.send(`Bot suggestion by ${message.author.tag}:\n\`${suggestion}\`\nSent at ${message.createdAt} in <#${message.channel.id}>`);
                    await message.channel.send('Your suggestion has been sent! thanks');
                } else if (command === 'pfp' || command === 'avatar') {
                    try {
                        let user: Discord.User | undefined;
                        let pfp: string | null | undefined;
                        if (args[0]) {
                            if (message.mentions.users.size > 0) {
                                user = message.mentions.users.first();
                                pfp = user?.displayAvatarURL({ dynamic: true });
                                await message.channel.send(`oh man you could've just sent me an id why did you ping that poor person just for his pfp...\n${pfp}`);
                            } else {
                                user = await client.users.fetch(args[0])
                                pfp = user.avatarURL({ dynamic: true });
                                await message.channel.send(`got it!\n${pfp}`);
                            }
                        } else {
                            user = message.author;
                            pfp = user.avatarURL({ dynamic: true });
                            await message.channel.send(`you wanna look at your own pfp? alright fine\n${pfp}`);
                        }
                    } catch (error) {
                        await message.react('❌');
                        await message.channel.send(`epic bruh moment (command error)\n\`${error}\``);
                        log(`pfp command command fail: ${error}`);
                    }
                } else if (command === 'rng') {
                    const max = (!isNaN(parseInt(args[1])) ? parseInt(args[1]) : parseInt(args[0]));
                    const min = (max === parseInt(args[1]) ? parseInt(args[0]) : undefined);
                    if (args.filter(arg => !isNaN(parseInt(arg))).length === 0) await message.channel.send(`you didnt provide any numbers :gun:\nactual usage: \`${config.prefix}rng (number) <number>\``);
                    else if (max === parseInt(args[0])) {
                        const result = getRandomInt(max);
                        await message.channel.send(`random integer generator: ${result}`);
                        return;
                    } else if (max === parseInt(args[1])) {
                        const result = getRandomArbitrary(min, max);
                        await message.channel.send(`random arbitrary generator: ${result}`);
                        return;
                    }
                } else if (command === 'rcg') {
                    const countryList = await import('./countryList.json');
                    await message.channel.send(`Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``);
                    return;
                } else if (command === 'code') {
                    if (args[0] === 'args') {
                        await message.channel.send(
                            'u forgot again? bruh\n`.(command) (args[0]) (args[1])...` etc\nget good lol\nalso uh if you want to category `.(category => command) (command => args[0])`',
                        ); return;
                    } else if (args[0] === 'rae' || args[0] === 'randomarrayelement') {
                        await message.channel.send(
                            'how many times do i have to remind u with this shit?\n```js\narray[Math.floor(Math.random() * array.length)];```',
                        ); return;
                    } else message.channel.send('what now? random array element or args 🤣🤣🤣');
                } else if (command === 'help') {
                    const helpEmbed = new Discord.MessageEmbed()
                    .setTitle('All list of commands')
                    .setDescription(`prefix: ${config.prefix}\n<> = optional argument`)
                    .setColor(53380)
                    .setFooter('3.2')
                    .addFields(
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
                            name: 'quote',
                            value: 'Random technoblade quote',
                            inline: true,
                        },
                        {
                            name: 'suggest (idea)',
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
                            name: 'convert',
                            value: 'Categorised commands for conversion. Run this command for more info',
                            inline: true
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
                            name: 'help',
                            value: 'Display this',
                        }
                    );
                    await message.channel.send({ embeds: [helpEmbed] });
                } else if (command === 'dn') {
                    await message.channel.send('deez nuts');
                } else if (command === 'debug') {
                    if (args[0] === 'true') {
                        if (!config.debug) {
                            config.debug = true;
                            await jsonWrite(filePath, config);
                            await message.react('✅');
                        } else if (config.debug) {
                            await message.react('❌');
                        }
                    } else if (args[0] === 'false') {
                        if (!config.debug) {
                            await message.react('❌');
                        } else if (config.debug) {
                            config.debug = false;
                            await jsonWrite(filePath, config);
                            await message.react('✅');
                        }
                    } else if (!args[0]) {
                        if (config.debug) await message.channel.send('debug mode is currently on ✅');
                        else if (!config.debug) await message.channel.send('debug mode is currently off ❌');
                    }
                } else if (command === 'setNickame' && message.author.id === nnlID) {
                    await me.setNickname(args.join(' ')).catch(async error => {
                        await message.channel.send(`❌ Error changing nickname:\n\`\`\`${error}\`\`\``);
                    });
                    await message.channel.send(`Changed my nickname to \`${args.join(' ')}\``);
                } else if (command === 'convert') {
                    if (!args[0]) {
                        const convertEmbed = new Discord.MessageEmbed()
                        .setTitle('Command category: Convert')
                        .setDescription(`Usage: ${config.prefix}convert (command)\n<> = Optional argument(s)`)
                        .setColor(53380)
                        .addField('text2bf', 'Convert text to brainfuck')
                        .setFooter('Commands for converting stuff to other stuff');
                        await message.channel.send({ embeds: [convertEmbed] });
                    } else if (args[0] === 'text2bf') {
                        if (!args[1]) {
                            await message.channel.send(`❌ you didnt provide any text\nusage: ${config.prefix}convert text2bf (text)`);
                            return;
                        } else {
                            const { text2bf } = await import('./stuff/text2bf'),
                                text = args.slice(1).join(' '),
                                bf = text2bf(text),
                                text2bfEmbed = new Discord.MessageEmbed()
                                .setTitle('convert text2bf')
                                .setDescription('Converted text to brainfuck')
                                .setColor(53380)
                                .setFields(
                                    {
                                        name: 'Original text',
                                        value: text
                                    },
                                    {
                                        name: 'Brainfuck',
                                        value: bf
                                    }
                                )
                            ;
                            await message.channel.send({ embeds: [text2bfEmbed] });
                        }
                    }
                } else if (command === 'config') {
                    await message.channel.send(`\`\`\`json\n${JSON.stringify(require('./config.json'), null, 4)}\`\`\``);
                } else if (command === '') return;
            } else if (message.content.startsWith(config.susprefix) && message.author.id === nnlID) {
                const shelljs = await import('shelljs');
                shelljs.exec(suscommand, (code, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `stderr:\n\`\`\`${stderr}\`\`\`` : `stdout:\n\`\`\`${stdout}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    });
                });
            }
        });
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
                } catch (error) {
                    if (error instanceof Error) botChannel.send(`❌ updateDateLoop() failure\n\`\`\`js\n${error.stack}\`\`\``);
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
declare global {
    interface String {
        limit(length: number): string;
    }
}
String.prototype.limit = (length: number) => {
    // @ts-ignore: Object is possibly 'undefined'.
    return this!.length > length ? (this!.substring(0, length - 1) + '…') : this;
}
