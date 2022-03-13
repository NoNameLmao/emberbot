import { GuildMember, MessageEmbed } from "discord.js"
import { jsonRead } from "emberutils"
import { Config, SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandBuilder, SlashCommandStringOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'convert'
const description = 'Categorised commands for conversion.'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommandGroup(
    new SlashCommandSubcommandGroupBuilder()
    .setName('convertOption')
    .setDescription('Convert * to *')
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('text2bf')
        .setDescription('Convert text to brainf*ck')
        .addStringOption(
            new SlashCommandStringOption()
            .setName('text')
            .setDescription('Text to convert to brainf*ck')
            .setRequired(true)
        )
    )
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const config = await jsonRead('./config.json') as Config
        const subcommand = args.getSubcommand(true)
        if (subcommand == 'text2bf') {
            if (!args.getString('text', true)) {
                const msg = '❌ You didn\'t provide any text!'
                replyToCommand({ interaction, options: { content: msg } })
                return
            } else {
                const { text2bf } = await import('../stuff/text2bf')
                const text = args.getString('convertOption', true)
                const bf = text2bf(text)
                const text2bfEmbed = new MessageEmbed()
                .setTitle('convert text2bf')
                .setDescription('Converted text to brainfuck')
                .setColor((interaction.member as GuildMember).displayHexColor)
                .setFields(
                    {
                        name: 'Original text',
                        value: text
                    },
                    {
                        name: 'Brainfuck',
                        value: bf
                    }
                )
                replyToCommand({ interaction, options: { embeds: [text2bfEmbed] } })
            }
        }
    }
} as SlashCommand
