import { MessageEmbed } from "discord.js"
import { CommandHandler } from './handler'

module.exports = {
    name: 'info',
    description: 'See information about the bot',
    async run(interaction) {
        const infoEmbed = new MessageEmbed()
        .setTitle('Bot information')
        .setColor(interaction.member.displayHexColor)
        .setFields(
            {
                name: 'Amount of guilds',
                value: `${interaction.client.guilds.cache.size}`
            },
            {
                name: 'Bot uptime',
                value: `${interaction.client.uptime}`
            }
        )
        CommandHandler.replyToCommand({
            interaction,
            options: {
                embeds: [infoEmbed]
            }
        })
    }
}
