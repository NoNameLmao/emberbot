import { GuildMember, MessageEmbed } from "discord.js"
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'info',
    description: 'See information about the bot',
    async run(interaction) {
        const infoEmbed = new MessageEmbed()
        .setTitle('Bot information')
        .setColor((interaction.member as GuildMember).displayHexColor)
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
        replyToCommand({
            interaction,
            options: {
                embeds: [infoEmbed]
            }
        })
    }
} as SlashCommand
