import { jsonRead, getRandomInt } from "emberutils"
import { client } from ".."
import { MiscJSON } from "../modules/interfaces"
import { CommandHandler } from './handler'

module.exports = {
    name: 'exit',
    description: 'shortcut to process.exit(0)',
    hideFromHelp: true,
    async run(interaction) {
        const msg = ':sob:'
        if (interaction.user.id === client.emberglazeID) {
            CommandHandler.replyToCommand({
                interaction,
                options: { content: msg }
            })
            process.exit(0)
        } else {
            /** @type {MiscJSON} */
            const { technobladeQuotes } = await jsonRead('./misc.json')
            function randomTechnoQuote() {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
            }
            const msg = `❌ ${randomTechnoQuote()}`
            CommandHandler.replyToCommand({
                interaction,
                options: { content: msg }
            })
        }
    }
}
