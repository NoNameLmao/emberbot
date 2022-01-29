import { Message, MessageEmbed } from "discord.js";
import { jsonRead } from "emberutils";
import { Config } from "../interfaces";
import { Command } from "./-handler";

module.exports = {
    name: 'help',
    aliases: ['?'],
    description: 'unless ur seeing this on github then you just ran this command and you know what it does',
    async run(message: Message) {
        const { prefix } = await jsonRead('./config.json') as Config;
        const helpEmbed = new MessageEmbed()
        .setTitle('All list of commands')
        .setDescription(`prefix: ${prefix}\n<> = optional argument`)
        .setColor(message.member.displayHexColor)
        .setFooter({ text: 'sus' })
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
    }
} as Command;