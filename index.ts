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
import { ServerInfo, PlayerInfo, Config, TagList, GuildConfig } from './interfaces';
(async () => {
    let config: Config = await jsonRead('./config.json'),
        tagList: TagList = await jsonRead('./tags.json'),
        guildConfig = await readGuildConfig(),
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
        'christmas - cancelled, halloween - cancelled! things were getting so fast, people thought it was twitter',
        'think of how far i could dropkick a dog that small',
        'these orphans are my toys',
        'i aint never seen a horse go to church',
        'just found out there are goverments irl',
        'i wanna rod this guy but he\'s a slideshow',
        'technoboat',
        'technoplane',
        'AY CARAMBA DONDE ESTA LA BIBLIOTECA',
        'i was using an advanced technique called LYING'
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
    
    
    let userCount: number,
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
                await botChannel.send(`some error happened ${pingNNL}\n\`\`\`ts\n${err.stack}\`\`\`\nbye`);
                process.exit(1);
            }
        });

        function updateGuildMembers() {
            memberCount = guild.memberCount;
            debugSend(`memberCount = guild.memberCount; ${memberCount} (${guild.memberCount})`);
            userCount = guild.members.cache.filter(member => !member.user.bot).size;
            debugSend(`userCount = guild.members.cache.filter(member => !member.user.bot).size; ${userCount}`);
            botCount = memberCount - userCount;
            debugSend(`botCount = memberCount - userCount; ${botCount} = ${memberCount} - ${userCount}`);
            onlineUsers = guild.members.cache.filter(member => member.presence?.status !== 'offline' && !member.user.bot).size;
        }
        try {
            updateGuildMembers();
        } catch (error) {
            botChannel.send(`❌ error with member count stuff\n\`\`\`ts\n${error.stack}\`\`\``);
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
            botChannel.send(`❌ error with date voice channel stuff\n\`\`\`ts\n${error}\`\`\``);
        }
        botChannel.send(`hi im online, i took ${(Date.now() - startTime) / 1000}s to start`);

        client.on('error', (error) => log(error.stack));
        client.on('messageCreate', async message => {
            let args: string[] = message.content.slice(config.prefix.length).trim().split(/ +/g),
                suscommand: string = message.content.slice(config.susprefix.length).trim().toLowerCase(),
                command = args.shift().toLowerCase()
            ;
            if (message.channel.type === 'DM') return log(`Direct message from ${message.author.tag} at ${message.createdAt}:\n${message.content}`);
            if (message.channel.name === 'es-chatbot') {
                try {
                    if (message.author.bot) return;
                    if (!message.content) {
                        message.react('❌');
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
            } else if (message.channel.id === '846866765530660874' && message.author.id === '337339955787333642') { // europesim #gateway
                if (/(^\(M\) .+: )|(^\[\d+\] .+: )/gm.test(message.content)) {
                    message.content = message.content.slice(/(^\(M\) .+: )|(^\[\d+\] .+: )/gm.exec(message.content)[0].length);
                    args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                    suscommand = message.content.slice(config.susprefix.length).trim().toLowerCase();
                    command = args.shift().toLowerCase();
                }
            } 
            if (message.content.startsWith('..')) return;
            if (liechtenstein.includes(message.content)) message.channel.send('liechtenstein*');
            
            if (message.content.startsWith(config.tagPrefix.user_specific)) {
                if (message.content.startsWith(config.tagPrefix.global)) {
                    const name = message.content.slice(config.tagPrefix.global.length);
                    let tag = tagList.global[name];
                    if (!tag) {
                        message.react('❌');
                        return;
                    }
                    message.channel.send(tag.text);
                    tag.info.used++;
                    await jsonWrite('./tags.json', tagList);
                } else {
                    const name = message.content.slice(config.tagPrefix.user_specific.length);
                    let tag = tagList.user_specific[message.author.id][name];
                    if (!tag) {
                        message.react('❌');
                        return;
                    }
                    message.channel.send(tag.text);
                    tag.info.used++;
                    await jsonWrite('./tags.json', tagList);
                }
            }
            if (message.content.startsWith(config.prefix)) {
                log(`recieved a ${command} command from ${message.author.tag}: ${args}`);
                debugSend(`${now.toString()}: recieved a ${command} command from ${message.author.tag}: ${args}`);
                if (command === 'esim') {
                    if (!args[0]) {
                        const esimEmbed = new Discord.MessageEmbed()
                        .setTitle('Command category: Europesim')
                        .setDescription(`Usage: ${config.prefix}esim (command)\n<> = Optional argument(s)`)
                        .setColor(message.member.displayHexColor)
                        .setFooter({ text: 'https://ourworldofpixels.com/europesim' })
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
                            .setAuthor({
                                name: 'Bot information',
                                iconURL: 'https://cdn.discordapp.com/icons/846807940727570433/4bbf13c1ce8bfb351fc7eafdc898e7d1.png'
                            })
                            .setColor(message.member.displayHexColor)
                            .setFooter({ text: 'https://ourworldofpixels.com/europesim' })
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
                            message.react('❌');
                            await message.channel.send(`❌ error\n\`\`\`js\n${error}\`\`\``);
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
                        .setColor(message.member.displayHexColor)
                        .setFooter({ text: `${randomTechnoQuote()}\n- Technoblade` })
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
                            const serverinfo: ServerInfo = await mcdata.serverStatus(args[1]);
                            const serverInfoEmbed = new Discord.MessageEmbed()
                            .setTitle('Server Information')
                            .setColor(message.member.displayHexColor)
                            .setAuthor({ name: `${args[1]}` })
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
                    } else if (['playerinfo', 'pinfo', 'playerstatus', 'pstatus'].includes(args[0])) {
                        try {
                            const playerInfo: PlayerInfo = await mcdata.playerStatus(args[1]);
                            const playerInfoEmbed = new Discord.MessageEmbed()
                            .setTitle('Player information')
                            .setColor(message.member.displayHexColor)
                            .setAuthor({ name: `${args[1]}` })
                            .addFields(
                                {
                                    name: 'UUID',
                                    value: `${playerInfo.uuid}`
                                },
                                {
                                    name: 'Name history',
                                    value: `${playerInfo.nameHistory}`
                                }
                            )
                            await message.channel.send({ embeds: [playerInfoEmbed]});
                        } catch (error) {
                            message.react('❌');
                            await message.channel.send(`There was an error!\n${error}`);
                        }
                    }
                } else if (command === 'hi') await message.channel.send('hi im online what do u want (main branch)');
                else if (command === 'setpfp' && message.author.id === nnlID) {
                    await message.channel.send('alright king');
                    let url: string;
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
                                .setColor(message.member.displayHexColor)
                                .addField('✅ Output', `\`\`\`js\n${limit(output, 503)}\`\`\``);
                                await message.channel.send({ embeds: [evalEmbed] });
                            } catch (error) {
                                evalEmbed = evalEmbed
                                .setColor('RED')
                                .addField('❌ Error output', limit(`\`\`\`js\n${error}\`\`\``, 512));
                                await message.channel.send({ embeds: [evalEmbed] });
                            }
                        } else {
                            evalEmbed = evalEmbed
                            .setColor('RED')
                            .addField('Technoblade never dies', `${randomTechnoQuote()}`)
                            .setFooter({ text: '❌ No permission' });
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
                        await message.channel.send(`❌ ${randomTechnoQuote()}`);
                    }
                } else if (command === 'sudo') {
                    if (message.author.id === nnlID) {
                        const sudo = args.join(' ');
                        message.delete();
                        await message.channel.send(sudo);
                    } else await message.channel.send(`❌ ${randomTechnoQuote()}`);
                } else if (command === 'quote') {
                    await message.channel.send(`"${randomTechnoQuote()}"`);
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
                        message.react('❌');
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
                    .setColor(message.member.displayHexColor)
                    .setFooter({ text: '3.3' })
                    .addFields(
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
                        },
                        {
                            name: 'tag OR tags',
                            value: 'Basically minicommands that you can create and store text in'
                        },
                        {
                            name: 'info',
                            value: 'See information about the bot'
                        }
                    );
                    await message.channel.send({ embeds: [helpEmbed] });
                } else if (command === 'dn') {
                    await message.channel.send('deez nuts');
                } else if (command === 'debug' && message.author.id === nnlID) {
                    if (args[0] === 'true') {
                        if (config.debug) {
                            await message.react('❌');
                            return;
                        }
                        config.debug = true;
                        await jsonWrite(filePath, config);
                        await message.react('✅');
                    } else if (args[0] === 'false') {
                        if (!config.debug) {
                            await message.react('❌');
                            return;
                        }
                        config.debug = false;
                        await jsonWrite(filePath, config);
                        await message.react('✅');
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
                        .setColor(message.member.displayHexColor)
                        .addField('text2bf', 'Convert text to brainfuck')
                        .setFooter({ text: 'Commands for converting stuff to other stuff'});
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
                                .setColor(message.member.displayHexColor)
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
                } else if (command === 'info') {
                    const infoEmbed = new Discord.MessageEmbed()
                    .setTitle('Bot information')
                    .setColor(message.member.displayHexColor)
                    .setFields(
                        {
                            name: 'Amount of guilds',
                            value: `${client.guilds.cache.size}`
                        }
                    )
                    await message.channel.send({ embeds: [infoEmbed] });
                } else if (['tags', 'tag'].includes(command)) {
                    if (!args[0]) {
                        const tagsEmbed = new Discord.MessageEmbed()
                        .setTitle('tags (you can also use "tag" instead)')
                        .setDescription('Basically minicommands that you can create and store text in')
                        .setColor(message.member.displayHexColor)
                        .setFields(
                            {
                                name: 'global',
                                value: `For global tags use "${config.prefix}tags global" instead`
                            },
                            {
                                name: 'view (tag name)',
                                value: 'View a tag',
                                inline: true
                            },
                            {
                                name: 'add (tag name) (text)',
                                value: 'Add your own tag!',
                                inline: true
                            },
                            {
                                name: 'create (tag name) text',
                                value: 'Same as "add"'
                            },
                            {
                                name: 'info (tag name)',
                                value: 'See information about a tag',
                                inline: true
                            },
                            {
                                name: 'list',
                                value: 'List of all your tags (sent in DM to prevent spam in the server)',
                                inline: true
                            }
                        )
                        .setFooter({ text: 'WIP af' });
                        await message.channel.send({ embeds: [tagsEmbed] });
                    } else if (args[0] === 'view') {
                        let tag = tagList.user_specific[message.author.id][args[1]];
                        if (!tagList.user_specific[message.author.id]) {
                            message.channel.send('❌ You do not have any tags');
                            return;
                        }
                        if (!tag) {
                            message.channel.send('❌ That tag does not exist or isn\'t yours');
                            return;
                        }
                        await message.channel.send(tag.text);
                        tag.info.used++;
                        await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
                    } else if (['add', 'create'].includes(args[0])) {
                        console.log(args[1]);
                        console.log(args.slice(2).join(' '));
                        console.log(new Date(). getTime());
                        console.log(message.author.tag);
                        console.log(message.author.id);
                        if (typeof tagList.user_specific[message.author.id] === 'undefined') {
                            tagList.user_specific[message.author.id] = {};
                        }
                        tagList.user_specific[message.author.id][args[1]] = {
                            text: args.slice(2).join(' '),
                            info: {
                                created: {
                                    at: new Date().getTime(),
                                    by: message.author.tag,
                                    byID: message.author.id
                                },
                                used: 0
                            }
                        }
                        await jsonWrite('./tags.json', tagList);
                        await message.channel.send('✅ Your tag was saved!');
                    } else if (args[0] === 'info') {
                        let tag = tagList.user_specific[message.author.id][args[1]];
                        if (!tagList.user_specific[message.author.id]) {
                            message.channel.send('❌ You do not have any tags');
                            return;
                        }
                        if (!tag) {
                            await message.channel.send('❌ That tag does not exist or isn\'t yours');
                            return;
                        }
                        await message.channel.send(
                            `Tag name: **${args[1]}**\n\n` +
                            `Author: **${tag.info.created.by}**\n` +
                            `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                            `It had been used **${tag.info.used}** time(s)`
                        );
                    } else if (args[0] === 'list') {
                        message.react('✅');
                        let userDMs = await message.member.createDM();
                        let msg = ``;
                        let i = 0;
                        for (; i < Object.keys(tagList.user_specific[message.author.id]).length; i++) {
                            const name = Object.keys(tagList.user_specific[message.author.id])[i];
                            msg += `${name}, `
                        }
                        await userDMs.send(msg);
                        await userDMs.send(`Total amount: **${i}**`);
                    } else if (args[0] === 'global') {
                        if (!args[1]) {
                            const tagsGlobalEmbed = new Discord.MessageEmbed()
                            .setTitle('tags global')
                            .setDescription('A global version of tags - tags that aren\'t exclusive to their authors and usable by everyone')
                            .setColor(message.member.displayHexColor)
                            .setFields(
                                {
                                    name: 'view (tag name)',
                                    value: 'View a tag',
                                    inline: true
                                },
                                {
                                    name: 'add (tag name) (text)',
                                    value: 'Add your own tag!',
                                    inline: true
                                },
                                {
                                    name: 'create (tag name) text',
                                    value: 'Same as "add"',
                                    inline: true
                                },
                                {
                                    name: 'info (tag name)',
                                    value: 'See information about a tag',
                                    inline: true
                                },
                                {
                                    name: 'list',
                                    value: 'A list of all global tags (sent in DM to prevent spam in the server)',
                                    inline: true
                                }
                            );
                            await message.channel.send({ embeds: [tagsGlobalEmbed] });
                        } else if (args[1] === 'view') {
                            let tag = tagList.global[args[2]];
                            if (!tag) {
                                await message.channel.send('❌ That tag does not exist.');
                                return;
                            }
                            await message.channel.send(tag.text);
                            tag.info.used++;
                            await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
                        } else if (['add', 'create'].includes(args[1])) {
                            tagList.global[args[2]] = {
                                text: args.slice(3).join(' '),
                                info: {
                                    created: {
                                        at: new Date().getTime(),
                                        by: message.author.tag,
                                        byID: message.author.id
                                    },
                                    used: 0
                                }
                            }
                            await jsonWrite('./tags.json', tagList).catch(error => message.channel.send(`❌ ${error}`));
                            message.channel.send('✅ Your tag was saved!');
                        } else if (args[1] === 'info') {
                            let tag = tagList.global[args[2]];
                            if (!tag) {
                                await message.channel.send('❌ That tag does not exist.');
                                return;
                            }
                            await message.channel.send(
                                `Global tag name: **${args[2]}**\n\n` +
                                `Author: **${tag.info.created.by}**\n` +
                                `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                                `It had been used **${tag.info.used}** time(s)`
                            );
                        } else if (args[1] === 'list') {
                            message.react('✅');
                            let userDMs = await message.member.createDM();
                            let msg = ``;
                            let i = 0;
                            for (; i < Object.keys(tagList.global).length; i++) {
                                const name = Object.keys(tagList.global)[i];
                                msg += `${name}, `
                            }
                            await userDMs.send(msg);
                            await userDMs.send(`Total amount: **${i}**`);
                        }
                    }
                } else if (command === 'config') {
                    await message.channel.send(`\`\`\`json\n${JSON.stringify(require('./config.json'), null, 4)}\`\`\``);
                } else if (command === '') return;
            } else if (message.content.startsWith(config.susprefix) && message.author.id === nnlID) {
                const shelljs = await import('shelljs');
                shelljs.exec(suscommand, (code, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `stderr:\n\`\`\`${limit(stderr, 498)}\`\`\`` : `stdout:\n\`\`\`${limit(stdout, 498)}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    });
                });
            }
        });
        function updateYear() {
            europesimStartDate = Date.parse(config.europesimStartDate);
            currentDate = Date.now();
            differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
            europesimCurrentYear = (Math.floor(config.europesimStartYear + differenceInDays));
        }
        function updateMonth() {
            now = new Date();
            nowUTC = now.getUTCHours();
            europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
        }
        async function updateDateLoop() {
            setInterval(async () => {
                updateMonth();
                updateYear();
                if (dateChannel.name !== `${europesimCurrentYear}, ${europesimCurrentMonth}`) {
                    await dateChannel.setName(`${europesimCurrentYear}, ${europesimCurrentMonth}`);
                } else return;
            }, 10000);
        }
        try {
            await updateDateLoop();
        } catch (error) {
            if (error instanceof Error) debugSend(`❌ date update error \n${error.stack}`);
        }
    });

    let europesimStartDate = Date.parse(config.europesimStartDate);
    let currentDate = Date.now();
    let differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(config.europesimStartYear + differenceInDays));
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
async function jsonWrite(filePath: string, data: object | object[] | string[]) {
    return new Promise<void>(async (resolve, reject) => {
        await fsp.writeFile(filePath, JSON.stringify(data, null, 4), { encoding: 'utf8' }).catch(reject);
        resolve();
    });
}
async function readGuildConfig() {
    return await jsonRead('./guild-config.json') as GuildConfig;
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function limit(string: string, limit: number) {
    if (string.length > limit) return string.substring(0, limit - 1) + '…';
    else return string;
}