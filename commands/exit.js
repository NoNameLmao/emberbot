const { jsonRead, getRandomInt, sleep } = require('emberutils')
const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const name = 'exit'
const description = 'shortcut to process.exit(0)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction) {
        const msg = ':sob:'
        if (interaction.user.id === '341123308844220447') {
            CommandHandler.replyToCommand({
                interaction,
                options: { content: msg }
            })
            await sleep(1000)
            process.exit(0)
        } else {
            /** @type {import('../modules/interfaces').MiscJSON} */
            const { technobladeQuotes } = await jsonRead('./misc.json')
            function randomTechnoQuote() {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
            }
            const msg = `❌ ${randomTechnoQuote()}`
            CommandHandler.replyToCommand({
                interaction,
                options: { content: msg }
            })
        }
    }
}
