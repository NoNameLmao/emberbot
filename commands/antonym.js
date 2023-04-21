const { SlashCommandBuilder } = require('discord.js');
const { wordhippo } = require('..')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('antonym')
        .setDescription('find a word that is the complete opposite of your word')
        .addStringOption(option =>
            option
                .setName('word')
                .setDescription('The word you wanna find an antonym of')
                .setRequired(true)    
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const query = interaction.options.getString('word')
        const res = await wordhippo.oppositeOf(query)
        interaction.editReply(`Finished in ${res.time / 1000}s. Found an antonym to **${query}**: **${res.antonym}** (${res.definition})`)
    }
}