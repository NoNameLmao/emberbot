const { SlashCommandBuilder } = require('discord.js')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dn')
        .setDescription('whats dn?'),
    run(interaction) {
        interaction.reply('deez nuts')
    }
}