import { Ben } from "../modules/ben"
import { CommandHandler } from './handler'

module.exports = {
    name: 'ben',
    description: 'A replica of Talking Ben\'s phone thing',
    async run(interaction) {
        const ben = new Ben(interaction)
        const msg = 'summoning ben...'
        await CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        await ben.newCall()
    }
}
