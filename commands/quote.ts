import { jsonRead, getRandomInt } from "emberutils"
import { MiscJSON, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'quote',
    description: 'send a random technoblade quote because he never dies',
    slashCommandOptions: [
        {
            name: 'quote_number',
            description: 'If you wanna look at a specific quote, you can specify which quote you want',
            type: 10,
            autocomplete: false,
            required: false
        }
    ],
    async run({ interaction, args }) {
        const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON
        let number: number
        if (args[0]) number = parseInt(args[0] as string, 10)
        else number = getRandomInt(technobladeQuotes.length + 1)
        technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
        const msg = (
            `Quote number **${number}**:\n` +
            `**${technobladeQuotes[number]}**`
        )
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
