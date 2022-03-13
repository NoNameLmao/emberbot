import { MessageEmbed } from "discord.js"
import { SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'poll'
const description = 'Create a mini poll. Can have up to 5 answer options.'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addStringOption(
    new SlashCommandStringOption()
    .setName('question')
    .setDescription('What will the poll decide?')
    .setRequired(true)
)
.addStringOption(
    new SlashCommandStringOption()
    .setName('answer_option_1')
    .setDescription('Answer option 1')
    .setRequired(true)
)
.addStringOption(
    new SlashCommandStringOption()
    .setName('answer_option_2')
    .setDescription('Answer option 2')
    .setRequired(true)
)
.addStringOption(
    new SlashCommandStringOption()
    .setName('answer_option_3')
    .setDescription('Answer option 3')
)
.addStringOption(
    new SlashCommandStringOption()
    .setName('answer_option_4')
    .setDescription('Answer option 4')
)
.addStringOption(
    new SlashCommandStringOption()
    .setName('answer_option_5')
    .setDescription('Answer option 5')
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const question = args.getString('question', true)
        const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
        const answerOptions = args.data.filter(answerOptionArg => {
            return answerOptionArg.name.includes('answerOption')
        })
        let embedOptionsString: string
        answerOptions.forEach((option, optionIndex) => {
            embedOptionsString += `:${numbers[optionIndex]}: ${option}\n`
        })
        const pollEmbed = new MessageEmbed()
        .setTitle(`:bar_chart: ${question}`)
        .setDescription(embedOptionsString.trim())
        .setFooter({
            text: `Poll by ${interaction.user.tag} at ${new Date().toUTCString().slice(5)}`,
            iconURL: interaction.user.avatarURL({ dynamic: true, format: 'png' })
        })
        replyToCommand({ interaction, options: { embeds: [pollEmbed] } })
    }
} as SlashCommand
