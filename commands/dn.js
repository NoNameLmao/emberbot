const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('discord.js')

const name = 'dn'
const description = 'whats dn?'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    run(interaction) {
        const msg = 'deez nuts'
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
