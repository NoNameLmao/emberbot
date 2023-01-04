const { musicPlayer } = require('..')
const { SlashCommandBuilder } = require('discord.js');

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('all kinds of music commands, WIP')
        .addSubcommand(subcommand =>
            subcommand
                .setName('join')
                .setDescription('Join a voice channel')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('If I will find that user in a voice channel, I will join that channel')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option
                    	.setName('channelid')
                        .setDescription(`Join a voice channel using it's ID`)
                        .setRequired(false)
                )
        ),
    async run(interaction) {
        interaction.deferReply()
        const subcommand = interaction.options.getSubcommand(true)
        if (subcommand == 'join') {
            try {
                if (interaction.options.getUser('user', false)) {
                    const userId = interaction.member.user.id
                    const user = interaction.guild.members.cache.get(userId)
                    const voiceChannel = user.voice.channel
                    if (!voiceChannel) {
                        interaction.editReply(`❌ The user is not in a voice channel that is visible to me!`)
                        return
                    }
                    await musicPlayer.joinVC(voiceChannel).then(() => {
                        interaction.editReply(`✅ Joined voice channel "${voiceChannel.name}"!`)
                    }).catch(err => {
                        interaction.editReply(`⚠️ Error joining the voice channel!\n\`\`\`${err.message}\`\`\``)
                    })
                }
                if (interaction.options.getString('channelid', false)) {
                    const channelId = interaction.options.getString('channelid')
                    const channel = interaction.guild.channels.cache.get(channelId)
                    if (!channel.isVoiceBased()) {
                        interaction.editReply('❌ The channel that I found is not a voice channel!')
                        return
                    }
                    await musicPlayer.joinVC(channel).then(() => {
                        interaction.editReply(`✅ Joined voice channel "${voiceChannel.name}"!`)
                    }).catch(err => {
                        interaction.editReply(`⚠️ Error joining the voice channel!\n\`\`\`${err.message}\`\`\``)
                    })
                }
            } catch (err) {
                interaction.editReply(`❌⚠️ Critical uncaught error, please contact emberglaze\n\`\`\`${err.message}\`\`\``)
            }
        }
    }
}