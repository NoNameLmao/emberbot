const { musicPlayer, dcClient } = require('..')
const { SlashCommandBuilder, codeBlock } = require('discord.js');

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
        await interaction.deferReply()
        const subcommand = interaction.options.getSubcommand(true)
        if (subcommand == 'join') {
            /** @type {NodeJS.UncaughtExceptionListener} */
            function listener(err) {
                if (!err.stack.includes('emberbot\\modules\\music-player.js')) return
                if (interaction.member.id == dcClient.emberglazeID) interaction.editReply(
                    `whats up nerd there's some issue thats somehow not caused by your code, will you catch that?\n`+
                    `                      :newspaper:\n`+
                    `\n`+
                    `<:ember:1040606263987425321>                             :man_golfing:\n`+
                    `${codeBlock(err.stack)}`
                )
                else interaction.editReply(`❌❌ Critical unaccounted error, probably something with the code of discord.js or DisTube. For more information contact emberglaze`)
            }
            process.on('uncaughtException', listener)
            try {
                if (interaction.options.getUser('user', false)) {
                    const userId = interaction.member.user.id
                    const user = interaction.guild.members.cache.get(userId)
                    const voiceChannel = user.voice.channel
                    if (!voiceChannel) {
                        interaction.editReply(`❌ The user is not in a voice channel that is visible to me!`)
                        process.off('uncaughtException', listener)
                        return
                    }
                    await musicPlayer.joinVC(voiceChannel).then(() => {
                        interaction.editReply(`✅ Joined voice channel "${voiceChannel.name}"!`)
                        process.off('uncaughtException', listener)
                    }).catch(err => {
                        interaction.editReply(`⚠️ Error joining the voice channel!\n\`\`\`${err.message}\`\`\``)
                        process.off('uncaughtException', listener)
                    })
                }
                if (interaction.options.getString('channelid', false)) {
                    const channelId = interaction.options.getString('channelid')
                    const channel = interaction.guild.channels.cache.get(channelId)
                    if (!channel.isVoiceBased()) {
                        interaction.editReply('❌ The channel that I found is not a voice channel!')
                        process.off('uncaughtException', listener)
                        return
                    }
                    await musicPlayer.joinVC(channel).then(() => {
                        interaction.editReply(`✅ Joined voice channel "${voiceChannel.name}"!`)
                        process.off('uncaughtException', listener)
                    }).catch(err => {
                        interaction.editReply(`⚠️ Error joining the voice channel!\n\`\`\`${err.message}\`\`\``)
                        process.off('uncaughtException', listener)
                    })
                }
            } catch (err) {
                interaction.editReply(`❌⚠️ Critical uncaught error, most likely an issue with bot's code. Please contact emberglaze\n\`\`\`${err.message}\`\`\``)
                process.off('uncaughtException', listener)
            }
        }
    }
}