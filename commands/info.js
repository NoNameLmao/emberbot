const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { dcClient } = require('..');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('See information about the bot'),
    async run(interaction) {
        let totalSeconds = interaction.client.uptime / 1000
        let days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        const infoEmbed = new EmbedBuilder()
        .setTitle('Bot information')
        .setColor(interaction.member.displayHexColor)
        .setFields(
            {
                name: 'Amount of guilds',
                value: `${interaction.client.guilds.cache.size}`,
                inline: true
            },
            {
                name: 'Bot uptime',
                value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                inline: true
            },
            {
                name: 'Total members across all guilds',
                value: await dcClient.getTotalMembers(),
                inline: true
            }
        )
        interaction.reply({ embeds: [infoEmbed] })
    }
}