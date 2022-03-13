import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'ping',
    description: 'Get discord latency (compares current time to the time when the command was sent)',
    async run(interaction) {
        const msg = (
            `Message-measured ping: **${Date.now() - interaction.createdTimestamp}**ms\n` +
            `WebSocket ping: **${interaction.client.ws.ping}**ms`
        )
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
