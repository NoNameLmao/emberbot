const { MessageEmbed } = require('discord.js')
const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const name = 'info'
const description = 'See information about the bot'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
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
