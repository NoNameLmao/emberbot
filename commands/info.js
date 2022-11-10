const { EmbedBuilder, SlashCommandBuilder, CommandInteraction } = require('discord.js')
const CommandHandler = require('./handler.js')

const name = 'info'
const description = 'See information about the bot'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    /** @param {CommandInteraction} interaction */
    async run(interaction) {
        let totalSeconds = interaction.client.uptime / 1000
        let days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        const infoEmbed = new EmbedBuilder()
        .setTitle('Bot information')
        .setColor(interaction.member.displayHexColor)
        .setFields(
            {
                name: 'Amount of guilds',
                value: `${interaction.client.guilds.cache.size}`
            },
            {
                name: 'Bot uptime',
                value: `${days}d ${hours}h ${minutes}m ${seconds}s`
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
