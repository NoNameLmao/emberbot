const { getRandomInt, getRandomArbitrary } = require("emberutils")
const { SlashCommandBuilder, CommandInteraction } = require('discord.js')
const CommandHandler = require('./handler.js')

const name = 'rng'
const description = 'Random number generator'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommand(subcommand =>
    subcommand
    .setName('max_only')
    .setDescription('Will generate a value between 0 and "max"')
    .addNumberOption(option =>
        option
        .setName('max_value')
        .setDescription('Maximal value to generate')
    )
).addSubcommand(subcommand =>
    subcommand
    .setName('min_and_max')
    .setDescription('Specify minimal and maximal values')
    .addNumberOption(option =>
        option
        .setName('min_value')
        .setDescription('Minimal value to generate')
    )
    .addNumberOption(option =>
        option
        .setName('max_value')
        .setDescription('Maximal value to generate')
    )
)

module.exports = {
    name, description,
    slashCommandOptions,
    /** @param {CommandInteraction} interaction */
    async run(interaction) {
        /** @type {string} */
        const subcommand = interaction.options.getSubcommand()
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
