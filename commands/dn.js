import { CommandHandler } from './handler'

module.exports = {
    name: 'dn',
    description: 'whats dn?',
    hideFromHelp: true,
    run(interaction) {
        const msg = 'deez nuts'
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
