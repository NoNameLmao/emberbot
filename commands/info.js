const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { dcClient } = require('..')
const logger = require('../modules/logger.js')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('See information about the bot'),
    async execute(interaction) {
        await interaction.deferReply()
        let totalSeconds = interaction.client.uptime / 1000
        let days = Math.floor(totalSeconds / 86400)
        totalSeconds %= 86400
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        logger.info(`Bot information: ${interaction.client.guilds.cache.size} guilds, ${days}d ${hours}h ${minutes}m ${seconds}s uptime, ${await dcClient.getTotalMembers()} total members`)
        let infoEmbed
        try {
            infoEmbed = new EmbedBuilder()
            .setTitle('Bot information')
            .setColor(interaction.member.displayHexColor)
            .setFields(
                {
                    name: 'Amount of guilds',
                    value: `${interaction.client.guilds.cache.size}`
                },
                {
                    name: 'Bot uptime',
                    value: `${days}d ${hours}h ${minutes}m ${seconds}s`
                },
                {
                    name: 'Total members across all guilds',
                    value: (await dcClient.getTotalMembers()).toString()
                }
            )
        } catch (err) {
            logger.warn(`Could not create "Bot information" embed`)
            console.warn(err)
            interaction.editReply(`Could not create an embed for some reason, here's raw format:\n${interaction.client.guild.cache.size} guilds\n${days}d ${hours}h ${minutes}m ${seconds}s uptime\n${await dcClient.getTotalMembers()} total members`)
        }
        interaction.editReply({ embeds: [infoEmbed] })
    }
}