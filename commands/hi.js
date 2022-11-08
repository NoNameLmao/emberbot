const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const name = 'hi'
const description = 'Usually used to check if I\'m responding or not, but other than that - useless'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction) {
        const msg = 'hi im online what do you want'
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
