const CommandHandler = require('./handler.js')
const { SlashCommandBuilder, CommandInteraction } = require('discord.js')
const { getRandomInt, getRandomArbitrary } = require('emberutils')

const name = 'random'
const description = 'All kinds of random stuff'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommandGroup(group =>
    group
    .setName('number')
    .setDescription('Random number generator')
    .addSubcommand(subcommand =>
        subcommand
        .setName('max_only')
        .setDescription('Generate a value between 0 and "max"')
        .addNumberOption(option =>
            option
            .setName('max_value')
            .setDescription('Provide the "max" value for the generator')
        )
    ).addSubcommand(subcommand =>
        subcommand
        .setName('min_and_max')
        .setDescription('Generate a value between "min" and "max"')
        .addNumberOption(option =>
            option
            .setName('min_value')
            .setDescription('Provide the "min" value for the generator')
        )
        .addNumberOption(option =>
            option
            .setName('max_value')
            .setDescription('Provide the "max" value for the generator')
        )
    )
)
.addSubcommand(subcommand =>
    subcommand
    .setName('country')
    .setDescription('Random country generator')
)

module.exports = {
    name, description,
    slashCommandOptions,
    /** @param {CommandInteraction} interaction */
    async run(interaction) {
        if (interaction.options.getSubcommandGroup() == 'number') {
            const subcommand = interaction.options.getSubcommand(true)
            if (subcommand == 'max_only') {
                const max = interaction.options.getNumber('max_value')
                const randomNumber = getRandomInt(max)
                const msg = `The number is: ${randomNumber}`
                CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            } else if (subcommand == 'min_and_max') {
                const min = interaction.options.getNumber('min_value')
                const max = interaction.options.getNumber('max_value')
                const randomNumber = getRandomArbitrary(min, max)
                const msg = `The number is: ${randomNumber}`
                CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            } else {
                const msg = `❌ Unknown subcommand group!`
                CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            }
        } else if (interaction.options.getSubcommand() == 'country') {
            /** @type {import('../modules/interfaces').MiscJSON} */
            const { countryList } = await jsonRead('./misc.json')
            const msg = `Random country generator: \`${countryList[Math.floor(Math.random() * countryList.length)]}\``
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        }
    }
}
