const CommandHandler = require('./handler.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const name = 'ping'
const description = 'Get bot\'s latency on discord (includes measuring with message timestamps and WebSocket ping)'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction) {
        const msg = (
            `Message-measured ping: **${interaction.createdTimestamp - Date.now()}**ms\n` +
            `WebSocket ping: **${interaction.client.ws.ping}**ms`
        )
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
