const { SlashCommandBuilder } = require('discord.js');
const { getRandomInt, getRandomArbitrary } = require('emberutils');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rng')
        .setDescription(`Random number generator`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('maxonly')
                .setDescription('Only provide the maximal number (0 - max)')
                .addNumberOption(option =>
                    option
                        .setName('maxvalue')
                        .setDescription('Enter the maximal number')
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('minandmax')
                .setDescription('Also provide a minimal value (min - max)')
                .addNumberOption(option =>
                    option
                        .setName('minvalue')
                        .setDescription('Enter the minimal number')
                ).addNumberOption(option =>
                    option
                        .setName('maxvalue')
                        .setDescription('Enter the maximal number')
                )
        ),
    async run(interaction) {
        const subcommand = interaction.options.getSubcommand(true)
        const max = interaction.options.getNumber('maxvalue')
        if (subcommand == 'maxonly') {
            const randomNumber = getRandomInt(max)
            const msg = `The number is: ${randomNumber}`
            interaction.reply(msg)
        } else {
            const min = interaction.options.getNumber('minvalue')
            const randomNumber = getRandomArbitrary(min, max)
            const msg = `The number is: ${randomNumber}`
            interaction.reply(msg)
        }
    }
}