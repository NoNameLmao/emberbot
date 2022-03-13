import { User } from "discord.js"
import { SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandUserOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'pfp'
const description = 'Display someone\'s (or yours) profile picture.'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addUserOption(
    new SlashCommandUserOption()
    .setName('guildMember')
    .setDescription('The guild member you want to display the profile picture of.')
    .setRequired(false)
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        if (args.getUser('guildMember')) {
            const user = args.getUser('guildMember', false)
            const pfp = user.displayAvatarURL({ dynamic: true, format: 'png' })
            const msg = pfp
            replyToCommand({ interaction, options: { content: msg } })
        } else {
            const user = interaction.user
            const pfp = user.displayAvatarURL({ dynamic: true, format: 'png' })
            const msg = pfp
            replyToCommand({ interaction, options: { content: msg } })
        }
    }
} as SlashCommand
