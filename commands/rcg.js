const { jsonRead } = require("emberutils")
const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('discord.js')

const name = 'rcg'
const description = 'Random country generator. (dont kill me)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction) {
        /** @type {import('../modules/interfaces').MiscJSON} */
        const { countryList } = await jsonRead('./misc.json')
        const msg = `Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
