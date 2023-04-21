const { SlashCommandBuilder } = require('discord.js')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Send a suggestion on how to improve the bot (or a bug fix request)')
        .addStringOption(option =>
            option
                .setName('suggestion')
                .setDescription('Text that you want to send as a suggestion')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply()
        const suggestion = interaction.options.getString('suggestion')
        const emberglaze = await interaction.client.users.fetch('341123308844220447')
        emberglaze.send(`Bot suggestion by ${interaction.user.tag}:\n\`${suggestion}\`\nSent at ${interaction.createdAt} in <#${interaction.channel.id}>`)
        interaction.editReply('Your suggestion has been sent and will be reviewed soon')
    }
}