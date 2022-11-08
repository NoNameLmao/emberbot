const { getRandomInt, getRandomArbitrary } = require("emberutils")
const { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandBuilder, SlashCommandNumberOption } = require('@discordjs/builders')
const CommandHandler = require('./handler.js')

const name = 'rng'
const description = 'Random number generator'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommandGroup(
    new SlashCommandSubcommandGroupBuilder()
    .setName('values')
    .setDescription('Values you want to provide to the generator')
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('max_only')
        .setDescription('Will generate a value between 0 and "max"')
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('max_value')
            .setDescription('Maximal value to generate')
        )
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('min_and_max')
        .setDescription('Specify minimal and maximal values')
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('min_value')
            .setDescription('Minimal value to generate')
        )
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('max_value')
            .setDescription('Maximal value to generate')
        )
    )
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const subcommand = args.getSubcommand()
        if (subcommand == 'max_only') {
            const max = args.getNumber('maxValue', true)
            const randomNumber = getRandomInt(max)
            const msg = `The number is: ${randomNumber}`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        } else if (subcommand == 'min_and_max') {
            const min = args.getNumber('minValue', true)
            const max = args.getNumber('maxValue', true)
            const randomNumber = getRandomArbitrary(min, max)
            const msg = `The number is: ${randomNumber}`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        }
    }
}
