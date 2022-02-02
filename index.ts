const startTime = Date.now();

import fetch from 'node-fetch';
import Discord = require('discord.js');
import smartestchatbot = require('smartestchatbot');
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
import { Config, TagList } from './interfaces';
import { limit, jsonRead, jsonWrite } from 'emberutils';
import { handleCommand } from './commands/-handler';
(async () => {
    (await import('dotenv')).config();
    let config: Config = await jsonRead('./config.json'),
        tagList: TagList = await jsonRead('./tags.json'),
        now = new Date(),
        nowUTC = now.getUTCHours(),
        europesimCurrentYear: number,
        europesimCurrentMonth: string
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
        nnlID = '341123308844220447',
        pingNNL = `<@${nnlID}>`
    ;

    let userCount: number,
        memberCount: number,
        botCount: number,
        onlineUsers: number
    ;
    client.once('ready', async () => {
        log(`Logged in as ${client.user.tag}`);
        setInterval(async () => {
            try {
                let res = await fetch('https://bots.moe/api/bot/848217938288967710/server_count', {
                    method: 'POST',
                    body: JSON.stringify({
                        server_count: client.guilds.cache.size
                    }),
                    headers: {
                        'Authorization': process.env.BOTS_MOE_API_KEY,
                        'Content-Type': 'application/json'
                    }
                });
                let json = await res.json() as any;
                if (json.error) log(`[bots.moe] Recieved error in response! JSON: ${JSON.stringify(json, null, 4)}`);
                else log(`[bots.moe] Successful request.`);
            } catch (error) {
                log(`[bots.moe] Error fetching! Error: ${error}`);
            }
        }, 10 * 60000);

        const guild = await client.guilds.fetch(guildID),
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
            joinVoiceChannel({
                channelId: dateChannelID,
                guildId: guildID,
                adapterCreator: (dateChannel.guild.voiceAdapterCreator as unknown) as DiscordGatewayAdapterCreator,
            });
            debugSend('ran DiscordVoice.joinVoiceChannel({...});');
        } catch (error) {
            botChannel.send(`❌ error with date voice channel stuff\n\`\`\`ts\n${error}\`\`\``);
        }
        botChannel.send(`hi im online, i took ${(Date.now() - startTime) / 1000}s to start`);

        client.on('error', error => log(error.stack));
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
            
            if (message.content.startsWith(config.tagPrefix.user_specific)) {
                if (message.content.startsWith(config.tagPrefix.global)) {
                    try {
                        const name = message.content.slice(config.tagPrefix.global.length);
                        let tag = tagList.global[name];
                        if (!tag) {
                            message.react('❌');
                            return;
                        }
                        message.channel.send(tag.text);
                        tag.info.used++;
                        await jsonWrite('./tags.json', tagList);
                    } catch (error) {
                        log(
                            'Error with viewing a global tag!\n' +
                            `${error}\n` +
                            `Message author: ${message.author.tag}\n` +
                            `Server name: ${message.guild.name}`
                        )
                    }
                } else {
                    try {
                        const name = message.content.slice(config.tagPrefix.user_specific.length);
                        let tag = tagList.user_specific[message.author.id][name];
                        if (!tag) {
                            message.react('❌');
                            return;
                        }
                        message.channel.send(tag.text);
                        tag.info.used++;
                        await jsonWrite('./tags.json', tagList);
                    } catch (error) {
                        log(
                            'Error with viewing a tag!\n' +
                            `${error}\n` +
                            `Message author: ${message.author.tag}\n` +
                            `Server name: ${message.guild.name}`
                        )
                    }
                }
            }
            if (message.content.startsWith(config.prefix)) {
                logCommand(message, command, args);
                handleCommand(message);
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

function log(text: string): void {
    console.log(`[${new Date().toUTCString()}] [index.ts] ${text}`);
}
function logCommand(message: Discord.Message, command: string, args?: string[]): void {
    if (args.length != 0) {
        log(
            '\n' +
            'recieved command:\n' +
            `"${command}" (${args})\n` +
            `from: ${message.author.username}\n` +
            `on server: ${message.guild.name}`
        )
    } else {
        log(
            '\n' +
            'recieved command:\n' +
            `"${command}"\n` +
            `from: ${message.author.username}\n` +
            `on server: ${message.guild.name}`
        )
    }
    
}
