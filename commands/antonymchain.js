const { SlashCommandBuilder } = require('discord.js');
const { wordhippo } = require('..')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('antonymchain')
        .setDescription('make the `antonym` command more chaotic')
        .addStringOption(option =>
            option
                .setName('word')
                .setDescription('The word you wanna have fun with')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('Amount of times you wanna keep rerunning the `antonym` command on the found word')
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(10)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const query = interaction.options.getString('word')
        const amount = interaction.options.getNumber('amount')
        const res = await wordhippo.oppositeOfChain(query, amount)
        interaction.editReply(`Finished in ${res.time / 1000}s. **${query}** => **${res.antonym}** (${res.definition})`)
    }
}