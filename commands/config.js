import { CommandHandler } from './handler'

module.exports = {
    name: 'config',
    description: 'see config in fancy highlighting',
    hideFromHelp: true,
    async run(interaction) {
        const msg = `\`\`\`json\n${JSON.stringify(await import('../config.json'), null, 4)}\`\`\``
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
