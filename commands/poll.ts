import { MessageEmbed } from "discord.js"
import { SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'poll',
    description: 'Create a mini poll.',
    async run({ args, interaction }) {
        const separator = ' | '
        const pollArgs = args.join(' ').split(separator)
        const question = pollArgs.shift()
        let embedOptionsString: string
        const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
        pollArgs.forEach((option, optionIndex) => {
            embedOptionsString += `:${numbers[optionIndex]}: ${option}\n`
        })
        const pollEmbed = new MessageEmbed()
        .setTitle(`:bar_chart: ${question}`)
        .setDescription(embedOptionsString.trim())
        .setFooter({
            text: `Poll by ${interaction.user.tag} => ${new Date().toUTCString().slice(5)}`,
            iconURL: interaction.user.avatarURL({ dynamic: true, format: 'png' })
        })
        replyToCommand({ interaction, options: { embeds: [pollEmbed] } })
    }
} as SlashCommand
