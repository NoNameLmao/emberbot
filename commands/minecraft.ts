import { Message, MessageEmbed } from "discord.js";
import { getRandomInt, jsonRead } from "emberutils";
import { Config, MiscJSON, PlayerInfo, ServerInfo } from "../interfaces";
import { Command } from "../interfaces";
import mcdata = require('mcdata');

module.exports = {
    name: 'minecraft',
    aliases: ['minec', 'mcraft', 'mc'],
    description: 'Categorised minecraft commands. Run this command for more information.',
    async run(message: Message, args: string[]) {
        const { prefix } = await jsonRead('./config.json') as Config;
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON;
        function randomTechnoQuote(): string {
            return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)];
        }
        if (!args[0]) {
            const mcEmbed = new MessageEmbed()
            .setTitle('Command category: Minecraft')
            .setDescription(`Usage: ${prefix}mc (command)`)
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
                message.channel.send('Pinging minecraft server...');
                const serverinfo: ServerInfo = await mcdata.serverStatus(args[1]);
                const serverInfoEmbed = new MessageEmbed()
                .setTitle('Server Information')
                .setColor(message.member.displayHexColor)
                .setAuthor({ name: `${args[1]}` })
                .addField('Status', `Currently ${serverinfo.serverStatus}`, true)
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
                const playerInfoEmbed = new MessageEmbed()
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
        function removeMCColorCodes(string: string): string {
            return string
            // color
            .replace('§4', '').replace('§c', '').replace('§6', '').replace('§e', '').replace('§2', '').replace('§a', '').replace('§b', '').replace('§3', '').replace('§1', '')
            .replace('§9', '').replace('§d', '').replace('§5', '').replace('§f', '').replace('§7', '').replace('§8', '').replace('§0', '')
            // font
            .replace('§k', '').replace('§l', '').replace('§m', '').replace('§n', '').replace('§o', '').replace('§r', '');
        }
    }
} as Command;