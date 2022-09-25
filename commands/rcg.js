import { jsonRead } from "emberutils"
import { MiscJSON } from "../modules/interfaces"
import { CommandHandler } from './handler'

module.exports = {
    name: 'rcg',
    description: 'Random country generator. (dont kill me)',
    async run(interaction) {
        /** @type {MiscJSON} */
        const { countryList } = await jsonRead('./misc.json')
        const msg = `Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``
        CommandHandler.replyToCommand({ interaction, options: { content: msg } })
    }
}
