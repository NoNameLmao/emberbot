import { User } from "discord.js"
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'pfp',
    description: 'doesnt every discord bot on the planet have this feature? 🤣',
    slashCommandOptions: [
        {
            name: 'guild_member',
            description: 'The guild member you want to get the profile picture of (Ignore for your own profile picture)',
            type: 6,
            required: false
        }
    ],
    async run({ interaction }) {
        try {
            let user: User
            let pfp: string
            if (interaction) {
                user = interaction.options.getMentionable('Guild member') as User
                pfp = user.displayAvatarURL({ dynamic: true, format: 'png' })
                const msg = `there you go\n${pfp}`
                replyToCommand({ interaction, options: { content: msg } })
            }
        } catch (error) {
            replyToCommand({ interaction, options: { content: `❌ Error!\n\`\`\`${error}\`\`\`` } })
        }
    }
} as SlashCommand
