import { GuildMember, MessageEmbed } from 'discord.js'
import { getRandomArbitrary, jsonRead } from 'emberutils'
import { Config, SlashCommand } from '../modules/interfaces'
import { CommandHandler } from './-handler'
import { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder, SlashCommandSubcommandBuilder } from '@discordjs/builders'
const { replyToCommand } = CommandHandler

const slashCommandOptions = new SlashCommandBuilder()
.setName('europesim')
.setDescription('Command category for Europesim. Run this command for more information.')
.addSubcommandGroup(
    new SlashCommandSubcommandGroupBuilder()
    .setName('command')
    .setDescription('Europesim category command')
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('Display information')
    )
    .addSubcommand(
        new SlashCommandSubcommandBuilder()
        .setName('roll')
        .setDescription('rng but for wars (1-20)')
    )
)

module.exports = {
    name: 'europesim',
    description: 'Command category for Europesim. Run this command for more information.',
    slashCommandOptions,
    async run(interaction, args) {
        const config = await jsonRead('./config.json') as Config,
            nowUTC = new Date().getUTCHours(),
            europesimStartDate = Date.parse(config.europesimStartDate),
            currentDate = Date.now(),
            differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24),
            europesimCurrentYear = (Math.floor(config.europesimStartYear + differenceInDays)),
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            europesimCurrentMonth = months[Math.floor(nowUTC / 2)],
            guildID = '846807940727570433',
            guild = await interaction.client.guilds.fetch(guildID),
            userCount = guild.members.cache.filter(member => !member.user.bot).size,
            memberCount = guild.memberCount,
            botCount = memberCount - userCount,
            onlineUsers = guild.members.cache.filter(member => member.presence?.status !== 'offline' && !member.user.bot).size,
            subcommand = args.getSubcommand(true)
        if (subcommand == 'info') {
            try {
                const infoEmbed = new MessageEmbed()
                .setTitle('europesim info')
                .setDescription('Europesim information')
                .setAuthor({
                    name: 'Bot information',
                    iconURL: 'https://cdn.discordapp.com/icons/846807940727570433/4bbf13c1ce8bfb351fc7eafdc898e7d1.png'
                })
                .setColor((interaction.member as GuildMember).displayHexColor)
                .setFooter({ text: 'https://ourworldofpixels.com/europesim' })
                .addFields(
                    {
                        name: 'Current UTC hour',
                        value: `${nowUTC}`,
                        inline: true,
                    },
                    {
                        name: 'Europesim year, month',
                        value: `${europesimCurrentYear}, ${europesimCurrentMonth}`,
                        inline: true,
                    },
                    {
                        name: 'Europesim\'s server member count',
                        value: `${userCount} users + ${botCount} bots = ${memberCount} overall. Online users: ${onlineUsers}`,
                    },
                )
                replyToCommand({ interaction, options: { embeds: [infoEmbed] } })
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = `❌ Error!\n\`\`\`js\n${error}\`\`\``
                    replyToCommand({ interaction, options: { content: errorMessage } })
                }
            }
        } else if (subcommand == 'roll') {
            let roll = getRandomArbitrary(1, 20)
            const messages = {
                country: {
                    20: `\`${args[1]}\` rolled a \`${roll}\` :L`,
                    other: `\`${args[1]}\` rolled a \`${roll}\``
                },
                other: `rolled a \`${roll}\``
            }
            if (roll === 0) {
                roll = getRandomArbitrary(1, 20)
                const msg = 'got a 0 for some reason, rerolling automatically'
                replyToCommand({ interaction, options: { content: msg } })
                if (args[1]) {
                    if (roll === 20) replyToCommand({ interaction, options: { content: messages.country['20'] } })
                    else replyToCommand({ interaction, options: { content: messages.country.other } })
                } else replyToCommand({ interaction, options: { content: messages.other } })
            } else if (args[1]) {
                if (roll === 20) replyToCommand({ interaction, options: { content: messages.country['20'] } })
                else replyToCommand({ interaction, options: { content: messages.country.other } })
            } else replyToCommand({ interaction, options: { content: messages.other } })
        }
    }
} as SlashCommand
