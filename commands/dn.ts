import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'dn',
    description: 'whats dn?',
    hideFromHelp: true,
    run(interaction) {
        const msg = 'deez nuts'
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
