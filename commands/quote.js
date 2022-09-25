import { jsonRead, getRandomInt } from "emberutils"
import { MiscJSON } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandNumberOption } from '@discordjs/builders'
import { CommandHandler } from './handler'
const { replyToCommand } = CommandHandler

const name = 'quote'
const description = 'send a random technoblade quote because he never dies'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addNumberOption(
    new SlashCommandNumberOption()
    .setName('quote_number')
    .setDescription('You can specify the number of the quote you want')
    .setRequired(false)
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        /** @type {MiscJSON} */
        const { technobladeQuotes } = await jsonRead('./misc.json')
        /** @type {number} */
        let number
        if (args.getNumber('quote_number')) number = args.getNumber('quote_number')
        else number = getRandomInt(technobladeQuotes.length + 1)
        const msg = (
            `Quote number **${number}**:\n` +
            `**${technobladeQuotes[number]}**`
        )
        replyToCommand({ interaction, options: { content: msg } })
    }
}
