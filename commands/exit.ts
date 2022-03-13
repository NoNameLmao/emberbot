import { jsonRead, getRandomInt } from "emberutils"
import { client } from ".."
import { MiscJSON, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'exit',
    description: 'shortcut to process.exit(0)',
    hideFromHelp: true,
    async run(interaction) {
        const msg = ':sob:'
        if (interaction.user.id === client.emberglazeID) {
            replyToCommand({
                interaction,
                options: { content: msg }
            })
            process.exit(0)
        } else {
            const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON
            function randomTechnoQuote(): string {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
            }
            const msg = `❌ ${randomTechnoQuote()}`
            replyToCommand({
                interaction,
                options: { content: msg }
            })
        }
    }
} as SlashCommand
