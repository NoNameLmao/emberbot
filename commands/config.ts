import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'config',
    description: 'see config in fancy highlighting',
    hideFromHelp: true,
    async run(interaction) {
        const msg = `\`\`\`json\n${JSON.stringify(await import('../config.json'), null, 4)}\`\`\``
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
