import { MiscJSON, SlashCommand } from "../modules/interfaces"
import { getRandomInt, jsonRead } from "emberutils"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler
import { client } from ".."

module.exports = {
    name: 'sudo',
    description: 'no emberglaze doesnt talk for me i swear',
    hideFromHelp: true,
    slashCommandOptions: [
        {
            name: 'text',
            description: ''
        }
    ],
    async run({ interaction, args }) {
        if (interaction.member.user.id === client.emberglazeID) {
            const sudo = args.join(' ')
            if (interaction) interaction.channel.send(sudo)
        } else {
            const { technobladeQuotes } = await jsonRead('./misc.json') as MiscJSON
            function randomTechnoQuote(): string {
                return technobladeQuotes[getRandomInt(technobladeQuotes.length + 1)]
            }
            const msg = `❌ ${randomTechnoQuote()}`;
            replyToCommand({ interaction, options: { content: msg } })
        }
    }
} as SlashCommand
