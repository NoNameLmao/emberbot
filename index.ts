const startTime = Date.now()

import { limit, jsonRead, jsonWrite } from 'emberutils'
import { CommandHandler }             from './commands/-handler'
import { Config, TagList }            from './modules/interfaces'
import { Europesim }                  from './modules/europesim'
import { chatbot }                    from './modules/chatbot'
import { DiscordClient }              from './modules/client'
import { readConfig }                 from './modules/config'
import { log }                        from './modules/logger'
import { exec }                       from 'shelljs'
log('info', 'Starting...')

export const client = new DiscordClient()
export const europesim = new Europesim()
export const commandHandler = new CommandHandler();

(async () => {
    await client.init()
    await europesim.init()
    await commandHandler.init()

    let tagList: TagList = await jsonRead('./tags.json')
    let config: Config = await readConfig()
    client.once('ready', async () => {
        process.on('uncaughtException', err => {
            if (err.message.includes('Cannot send an empty message')) log('warn', 'Empty message error')
            else {
                log('error', `Uncaught exception!`)
                log('error', `  · Error message: ${err.message}`)
                log('error', `  · Full error stack:\n${err.stack}`)
            }
        })

        // #TODO find fix 
        // client.europesim.joinDateChannel()

        log('info', `Discord bot is ready after ${(Date.now() - startTime) / 1000}s`)
        client.on('messageCreate', async message => {
            if (message.content === `<@${client.user.id}>`) message.channel.send(`my prefix: ${config.prefix}`)
            if (message.channel.type === 'DM') {
                if (message.author.id !== client.user.id) {
                    log('info', 'Recieved a direct message!')
                    log('info', `  · Author: ${message.author.tag}`)
                    log('info', `  · Content:\n${message.content}`)
                } else {
                    log('info', `Sent a direct message!`)
                    log('info', `  · Recipient: ${message.channel.recipient.tag}`)
                    log('info', `  · Content:\n${message.content}`)
                }
            }
            if (message.channel.type === 'GUILD_TEXT' && message.channel.name === 'es-chatbot') {
                try {
                    if (message.author.bot) return
                    if (!message.content) {
                        log('warn', `Chat bot recieved a message without any text content.`)
                        log('warn', `  · Author: ${message.author.tag}`)
                        message.react('❌')
                        return
                    }
                    message.channel.sendTyping()

                    let msg = (
                        await chatbot.chat({
                            message: message.content,
                            name: message.author.username,
                            user: message.author.username,
                            language: 'auto'
                        })
                    ).toLowerCase().replace(/\\/gm, '')

                    message.reply({
                        content: msg,
                        allowedMentions: { repliedUser: true }
                    })
                    return
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.stack.includes('Message content must be a non-empty string.')) {
                            message.channel.send('❌ <message content must be a non-empty string>')
                            return
                        } else {
                            message.channel.send(`❌ epic fail \`\`\`js\n${error.stack}\`\`\``)
                            return
                        }
                    }
                }
            }
            if (message.content.startsWith('..')) return
            
            if (message.content.startsWith(config.tagPrefix.user_specific)) {
                if (message.content.startsWith(config.tagPrefix.global)) {
                    try {
                        const name = message.content.slice(config.tagPrefix.global.length)
                        log('info', `"${message.author.tag}" requested a global tag "${name}"`)
                        const tag = tagList.global[name]
                        if (!tag) {
                            log('warn', `No global tag with the name of "${name}" was found`)
                            message.react('❌')
                            return
                        }
                        message.channel.send(tag.text)
                        tag.info.used++
                        await jsonWrite('./tags.json', tagList)
                    } catch (error) {
                        if (error instanceof Error) log('error', `Error accessing a global tag! "${error.message}" (by "${message.author.tag}" in "${message.guild.name}")`)
                    }
                } else {
                    try {
                        const name = message.content.slice(config.tagPrefix.user_specific.length)
                        log('info', `"${message.author.tag}" requested a user specific tag "${name}"`)
                        const tag = tagList.user_specific[message.author.id][name]
                        if (!tag) {
                            log('warn', `No user specific tag with the name of "${name}" was found`)
                            message.react('❌')
                            return
                        }
                        message.channel.send(tag.text)
                        tag.info.used++
                        await jsonWrite('./tags.json', tagList)
                    } catch (error) {
                        if (error instanceof Error) log('info', `Error accessing a user specific tag! "${error.message}" (by "${message.author.tag} in "${message.guild.name})`)
                    }
                }
            }
            const suscommand: string = message.content.slice(config.susprefix.length).trim().toLowerCase()
            if (message.content.startsWith(config.susprefix) && message.author.id === client.emberglazeID) {
                exec(suscommand, (_, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `stderr:\n\`\`\`${limit(stderr, 498)}\`\`\`` : `stdout:\n\`\`\`${limit(stdout, 498)}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    })
                })
            }
        })
        await commandHandler.updateSlashCommands(client)
        await europesim.guildResetSlashCommands(client)
        client.on('interactionCreate', interaction => {
            if (interaction.isCommand()) commandHandler.handleCommand(interaction)
        })
        async function updateDate() {
            europesim.updateDate()
            if (client.europesim.dateChannel.name !== europesim.currentDate.formatted) {
                log('warn', `Current europesim (${europesim.currentDate.formatted}) date doesn't match with the current date channel name (${client.europesim.dateChannel.name}), updating it...`)
                await client.europesim.dateChannel.setName(europesim.currentDate.formatted).catch(e => {
                    const error = <Error>e
                    log('error', 'There was an error updating the date channel name!')
                    log('error', `  · Error message: ${error.message}`)
                })
                log('info', 'Successfully updated date channel name')
            } else return
        }
        setInterval(updateDate, 10000)
    })
})()
