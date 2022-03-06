import { Guild, GuildMember, MessageEmbed } from "discord.js"
import { jsonRead, jsonWrite } from "emberutils"
import { Config, TagList, SlashCommand } from "../modules/interfaces"
import { CommandHandler } from './-handler'
const { replyToCommand } = CommandHandler

module.exports = {
    name: 'tags',
    description: 'Basically minicommands that you can create and store text in',
    slashCommandOptions: [
        {
            name: 'tag_subcommand',
            description: 'First tag subcommand, used to interact with local tags or do the same with global tags instead',
            type: 3,
            choices: [
                {
                    name: 'global',
                    value: 'For global tags'
                },
                {
                    name: 'view',
                    value: 'View a local tag'
                },
                {
                    name: 'add',
                    value: 'Add your own tag!'
                },
                {
                    name: 'create',
                    value: 'Does the same as "add"'
                },
                {
                    name: 'info',
                    value: 'See information about a tag'
                },
                {
                    name: 'list',
                    value: 'List of all your tags (sent in DMs to prevent spam in the server)'
                }
            ]
        }
    ],
    async run({ interaction, args }) {
        const config = await jsonRead('./config.json') as Config
        const tagList: TagList = await jsonRead('./tags.json')
        if (!args[0]) {
            const tagsEmbed = new MessageEmbed()
            .setTitle('tags')
            .setDescription('Basically minicommands that you can create and store text in')
            .setColor((interaction.member as GuildMember).displayHexColor)
            .setFields(
                {
                    name: 'global',
                    value: `For global tags use "${config.prefix}tags global" instead`
                },
                {
                    name: 'view (tag name)',
                    value: 'View a local tag',
                    inline: true
                },
                {
                    name: 'add (tag name) (text)',
                    value: 'Add your own tag!',
                    inline: true
                },
                {
                    name: 'create (tag name) text',
                    value: 'Same as "add"'
                },
                {
                    name: 'info (tag name)',
                    value: 'See information about a tag',
                    inline: true
                },
                {
                    name: 'list',
                    value: 'List of all your tags (sent in DM to prevent spam in the server)',
                    inline: true
                }
            )
            .setFooter({ text: 'WIP af' })
            replyToCommand({ interaction, options: { embeds: [tagsEmbed] } })
        } else if (args[0] === 'view') {
            let tag = tagList.user_specific[interaction.user.id][args[1] as string]
            if (!tagList.user_specific[interaction.user.id]) {
                const msg = '❌ You do not have any tags'
                replyToCommand({ interaction, options: { content: msg } })
                return
            }
            if (!tag) {
                const msg = '❌ That tag does not exist or isn\'t yours'
                replyToCommand({ interaction, options: { content: msg } })
                return
            }
            const msg = tag.text
            replyToCommand({ interaction, options: { content: msg } })
            tag.info.used++
            await jsonWrite('./tags.json', tagList).catch(error => interaction.channel.send(`❌ ${error}`))
        } else if (['add', 'create'].includes(args[0] as string)) {
            console.log(args[1])
            console.log(args.slice(2).join(' '))
            console.log(new Date(). getTime())
            console.log(interaction.user.tag)
            console.log(interaction.user.id)
            if (typeof tagList.user_specific[interaction.user.id] === 'undefined') {
                tagList.user_specific[interaction.user.id] = {}
            }
            tagList.user_specific[interaction.user.id][args[1] as string] = {
                text: args.slice(2).join(' '),
                info: {
                    created: {
                        at: new Date().getTime(),
                        by: interaction.user.tag,
                        byID: interaction.user.id
                    },
                    used: 0
                }
            }
            await jsonWrite('./tags.json', tagList)
            const msg = '✅ Your tag was saved!'
            replyToCommand({ interaction, options: { content: msg } })
        } else if (args[0] === 'info') {
            let tag = tagList.user_specific[interaction.user.id][args[1] as string]
            if (!tagList.user_specific[interaction.user.id]) {
                const msg = '❌ You do not have any tags'
                replyToCommand({ interaction, options: { content: msg } })
                return
            }
            if (!tag) {
                const msg = '❌ That tag does not exist or isn\'t yours'
                replyToCommand({ interaction, options: { content: msg } })
                return
            }
            const msg = (
                `Tag name: **${args[1]}**\n\n` +
                `Author: **${tag.info.created.by}**\n` +
                `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                `It had been used **${tag.info.used}** time(s)`
            )
            replyToCommand({ interaction, options: { content: msg } })
        } else if (args[0] === 'list') {
            const userDMs = await (interaction.member as GuildMember).createDM()
            let msg = ``
            let i = 0
            if (!tagList.user_specific[interaction.user.id]) tagList.user_specific[interaction.user.id] = {}
            for (; i < Object.keys(tagList.user_specific[interaction.user.id]).length; i++) {
                const name = Object.keys(tagList.user_specific[interaction.user.id])[i]
                msg += `${name}, `
            }
            if (msg.length == 0) {
                await userDMs.send(`You don't have any tags!`)
                return
            }
            await userDMs.send(msg.slice(0, 2))
            await userDMs.send(`Total amount: **${i}**`)
        } else if (args[0] === 'global') {
            if (!args[1]) {
                const tagsGlobalEmbed = new MessageEmbed()
                .setTitle('tags global')
                .setDescription('A global version of tags - tags that aren\'t exclusive to their authors and usable by everyone')
                .setColor((interaction.member as GuildMember).displayHexColor)
                .setFields(
                    {
                        name: 'view (tag name)',
                        value: 'View a tag',
                        inline: true
                    },
                    {
                        name: 'add (tag name) (text)',
                        value: 'Add your own tag!',
                        inline: true
                    },
                    {
                        name: 'create (tag name) text',
                        value: 'Same as "add"',
                        inline: true
                    },
                    {
                        name: 'info (tag name)',
                        value: 'See information about a tag',
                        inline: true
                    },
                    {
                        name: 'list',
                        value: 'A list of all global tags (sent in DM to prevent spam in the server)',
                        inline: true
                    }
                )
                replyToCommand({ interaction, options: { embeds: [tagsGlobalEmbed] } })
            } else if (args[1] === 'view') {
                let tag = tagList.global[args[2] as string]
                if (!tag) {
                    const msg = '❌ That tag does not exist.'
                    replyToCommand({ interaction, options: { content: msg } })
                    return
                }
                const msg = tag.text
                replyToCommand({ interaction, options: { content: msg } })
                tag.info.used++
                await jsonWrite('./tags.json', tagList).catch(error => interaction.channel.send(`❌ ${error}`))
            } else if (['add', 'create'].includes(args[1] as string)) {
                tagList.global[args[2] as string] = {
                    text: args.slice(3).join(' '),
                    info: {
                        created: {
                            at: new Date().getTime(),
                            by: interaction.user.tag,
                            byID: interaction.user.id
                        },
                        used: 0
                    }
                }
                await jsonWrite('./tags.json', tagList).catch(error => interaction.channel.send(`❌ ${error}`))
                const msg = '✅ Your tag was saved!'
                replyToCommand({ interaction, options: { content: msg } })
            } else if (args[1] === 'info') {
                let tag = tagList.global[args[2] as string]
                if (!tag) {
                    const msg = '❌ That tag does not exist.'
                    replyToCommand({ interaction, options: { content: msg } })
                    return
                }
                const msg = (
                    `Global tag name: **${args[2]}**\n\n` +
                    `Author: **${tag.info.created.by}**\n` +
                    `Creation date: **${new Date(tag.info.created.at).toUTCString()}**\n` +
                    `It had been used **${tag.info.used}** time(s)`
                )
                replyToCommand({ interaction, options: { content: msg } })
            } else if (args[1] === 'list') {
                let userDMs = await (interaction.member as GuildMember).createDM()
                let msg = ``
                let i = 0
                for (; i < Object.keys(tagList.global).length; i++) {
                    const name = Object.keys(tagList.global)[i]
                    msg += `${name}, `
                }
                await userDMs.send(msg)
                await userDMs.send(`Total amount: **${i}**`)
            }
        }
    }
} as SlashCommand
