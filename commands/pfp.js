const { SlashCommandBuilder } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pfp')
        .setDescription(`Display someone's (or your) profile picture`)
        .addUserOption(option =>
            option
            	.setName('guildmember')
                .setDescription('The guild member you want to display the profile picture of')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const user = interaction.options.getUser('guildmember', true)
        interaction.editReply(user.displayAvatarURL({ dynamic: true, extension: 'png' }))
    }
}