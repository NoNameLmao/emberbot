import { Message, MessageEmbed } from "discord.js";
import { Command } from "../interfaces";

module.exports = {
    name: 'info',
    description: 'See information about the bot',
    async run(message: Message) {
        const infoEmbed = new MessageEmbed()
        .setTitle('Bot information')
        .setColor(message.member.displayHexColor)
        .setFields(
            {
                name: 'Amount of guilds',
                value: `${message.client.guilds.cache.size}`
            },
            {
                name: 'Bot uptime',
                value: `${message.client.uptime}`
            }
        )
        message.channel.send({ embeds: [infoEmbed] });
    }
} as Command;