const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders')
const CommandHandler = require('./handler.js')

const name = 'pfp'
const description = 'Display someone\'s (or yours) profile picture.'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addUserOption(
    new SlashCommandUserOption()
    .setName('guild_member')
    .setDescription('The guild member you want to display the profile picture of.')
    .setRequired(false)
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        if (args.getUser('guild_member')) {
            const user = args.getUser('guildMember', false)
            const pfp = user.displayAvatarURL({ dynamic: true, format: 'png' })
            const msg = pfp
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        } else {
            const user = interaction.user
            const pfp = user.displayAvatarURL({ dynamic: true, format: 'png' })
            const msg = pfp
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        }
    }
}
