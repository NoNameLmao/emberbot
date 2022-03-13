import { getRandomInt, getRandomArbitrary, jsonRead } from "emberutils"
import { Config, SlashCommand } from "../modules/interfaces"
import { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandBuilder, SlashCommandNumberOption } from '@discordjs/builders'
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

const name = 'rng'
const description = 'Random number generator'
const slashCommandOptions = new SlashCommandBuilder()
.setName(name)
.setDescription(description)
.addSubcommandGroup(
    new SlashCommandSubcommandGroupBuilder()
    .setName('values')
    .setDescription('Values you want to provide to the generator')
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('maxOnly')
        .setDescription('Will generate a value between 0 and "max"')
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('maxValue')
            .setDescription('Maximal value to generate')
        )
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('minAndMax')
        .setDescription('Specify minimal and maximal values')
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('minValue')
            .setDescription('Minimal value to generate')
        )
        .addNumberOption(
            new SlashCommandNumberOption()
            .setName('maxValue')
            .setDescription('Maximal value to generate')
        )
    )
)

module.exports = {
    name, description,
    slashCommandOptions,
    async run(interaction, args) {
        const subcommand = args.getSubcommand()
        if (subcommand == 'maxOnly') {
            const max = args.getNumber('maxValue', true)
            const randomNumber = getRandomInt(max)
            const msg = `The number is: ${randomNumber}`
            replyToCommand({ interaction, options: { content: msg } })
        } else if (subcommand == 'minAndMax') {
            const min = args.getNumber('minValue', true)
            const max = args.getNumber('maxValue', true)
            const randomNumber = getRandomArbitrary(min, max)
            const msg = `The number is: ${randomNumber}`
            replyToCommand({ interaction, options: { content: msg } })
        }
    }
} as SlashCommand
