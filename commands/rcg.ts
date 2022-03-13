import { jsonRead } from "emberutils"
import { MiscJSON, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'rcg',
    description: 'Random country generator. (dont kill me)',
    async run(interaction) {
        const { countryList } = await jsonRead('./misc.json') as MiscJSON
        const msg = `Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``
        replyToCommand({ interaction, options: { content: msg } })
    }
} as SlashCommand
