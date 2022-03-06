import { getRandomInt, getRandomArbitrary, jsonRead } from "emberutils"
import { Config, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'rng',
    description: 'random number generator',
    async run({ interaction, args }) {
        const { prefix } = await jsonRead('./config.json') as Config
        const max = (!isNaN(parseInt(args[1] as string)) ? parseInt(args[1] as string) : parseInt(args[0] as string))
        const min = (max === parseInt(args[1] as string) ? parseInt(args[0] as string) : undefined)
        if (args.filter(arg => !isNaN(parseInt(arg as string))).length === 0) {
            const msg = `you didnt provide any numbers :gun:\nactual usage: \`${prefix}rng (number) <number>\``
            replyToCommand({ interaction, options: { content: msg } })
        }
        else if (max === parseInt(args[0] as string)) {
            const result = getRandomInt(max)
            const msg = `random integer generator: ${result}`
            replyToCommand({ interaction, options: { content: msg } })
        } else if (max === parseInt(args[1] as string)) {
            const result = getRandomArbitrary(min, max)
            const msg = `random arbitrary generator: ${result}`
            replyToCommand({ interaction, options: { content: msg } })
        }
    }
} as SlashCommand
