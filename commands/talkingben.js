const Ben = require("../modules/ben.js")
const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const name = 'ben'
const description = 'A replica of Talking Ben\'s phone thing'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    async run(interaction) {
        const ben = new Ben(interaction)
        const msg = 'summoning ben...'
        await CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        await ben.newCall()
    }
}
