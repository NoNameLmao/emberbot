const { SlashCommandBuilder } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription(`Usually used to check if I'm responding or not, but other than that - useless`),
    run(interaction) {
        interaction.reply('hi im online what do you want')
    }
}