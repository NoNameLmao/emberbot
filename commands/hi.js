import { CommandHandler } from './handler'

module.exports = {
    name: 'hi',
    description: 'Usually used to check if I\'m responding or not, but other than that - useless',
    async run(interaction) {
        CommandHandler.replyToCommand({
            interaction,
            options: {
                content: 'hi im online what do you want'
            }
        })
    }
}
