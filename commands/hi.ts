import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'hi',
    description: 'Usually used to check if I\'m responding or not, but other than that - useless',
    async run({ interaction }) {
        replyToCommand({
            interaction,
            options: {
                content: 'hi im online what do you want'
            }
        })
    }
} as SlashCommand
