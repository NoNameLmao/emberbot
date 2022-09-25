import { CommandHandler } from './handler'

module.exports = {
    name: 'ping',
    description: 'Get bot\'s latency on discord (includes measuring with message timestamps and WebSocket ping)',
    async run(interaction) {
        const msg = (
            `Message-measured ping: **${Date.now() - interaction.createdTimestamp}**ms\n` +
            `WebSocket ping: **${interaction.client.ws.ping}**ms`
        )
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
