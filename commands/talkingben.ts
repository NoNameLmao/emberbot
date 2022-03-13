import { Ben } from "../modules/ben"
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'ben',
    description: 'A replica of Talking Ben\'s phone thing',
    async run(interaction) {
        const ben = new Ben(interaction)
        const msg = 'summoning ben...'
        await replyToCommand({ interaction, options: { content: msg } })
        await ben.newCall()
    }
} as SlashCommand
