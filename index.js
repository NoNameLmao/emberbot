const startTime = Date.now()

import { limit } from 'emberutils'
const { CommandHandler } = await import('./commands/handler.js')
const { chatbot } = await import('./modules/chatbot')
const { DiscordClient } = await import('./modules/client')
log('info', 'Starting...')

export const client = new DiscordClient()
export const commandHandler = new CommandHandler();

(async () => {
    await client.init()
    await commandHandler.init()

    let config = await readConfig()
    client.once('ready', async () => {
        process.on('uncaughtException', err => {
            if (err.message.includes('Cannot send an empty message')) log('warn', 'Empty message error')
            else {
                log('error', `Uncaught exception!`)
                log('error', `  · Error message: ${err.message}`)
                log('error', `  · Full error stack:\n${err.stack}`)
            }
        })
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
                } catch (e) {
                    const error = e
                    if (error.stack.includes('Message content must be a non-empty string.')) {
                        message.channel.send('❌ <message content must be a non-empty string>')
                        return
                    } else {
                        message.channel.send(`❌ epic fail \`\`\`js\n${error.stack}\`\`\``)
                        return
                    }
                }
            }
            if (message.content.startsWith('..')) return

            const suscommand = message.content.slice(config.susprefix.length).trim().toLowerCase()
            if (message.content.startsWith(config.susprefix) && message.author.id === client.emberglazeID) {
                exec(suscommand, (_, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `stderr:\n\`\`\`${limit(stderr, 498)}\`\`\`` : `stdout:\n\`\`\`${limit(stdout, 498)}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    })
                })
            }
        })
        // await commandHandler.updateSlashCommands(client)
        // await europesim.guildResetSlashCommands(client)
        const guilds = client.guilds.cache
        for await (const guildCacheCollectionEntry of guilds) {
            const guild = guildCacheCollectionEntry[1]
            await commandHandler.updateGuildSlashCommands(client, guild.id).catch(e => {
                const error = e
                log('error', 'Guild slash command update failed!')
                log('error', '  · Guild information:')
                log('error', `    - Name: ${guild.name}`)
                log('error', `    - ID: ${guild.id}`)
                log('error', '  · Error:')
                log('error', `    - Message: ${error.message}`)
            })
        }
        client.on('interactionCreate', interaction => {
            if (interaction.isCommand()) {
                log('info', 'Recieved interaction:')
                log('info', `  · Command: true`)
                log('info', `    - Name: ${interaction.commandName}`)
                log('info', `    - Author: ${interaction.user.tag}`)
                log('info', `    - Guild: ${interaction.guild.name}`)
                commandHandler.handleCommand(interaction)
            }
        })
        client.on('guildCreate', guild => {
            commandHandler.updateGuildSlashCommands(client, guild.id).then(() => {
                log('info', 'Successfully updated slash commands for a guild:')
                log('info', `  · Guild name: ${guild.name}`)
                log('info', `  · Guild id: ${guild.id}`)
            }).catch(e => {
                const error = e
                log('error', 'Guild slash command update failed!')
                log('error', '  · Guild information:')
                log('error', `    - Name: ${guild.name}`)
                log('error', `    - ID: ${guild.id}`)
                log('error', '  · Error:')
                log('error', `    - Message: ${error.message}`)
            })
        })
        async function updateDate() {
            europesim.updateDate()
            if (client.europesim.dateChannel.name !== europesim.currentDate.formatted) {
                log('warn', `Current europesim (${europesim.currentDate.formatted}) date doesn't match with the current date channel name (${client.europesim.dateChannel.name}), updating it...`)
                await client.europesim.dateChannel.setName(europesim.currentDate.formatted).catch(e => {
                    const error = e
                    log('error', 'There was an error updating the date channel name!')
                    log('error', `  · Error message: ${error.message}`)
                })
                log('info', 'Successfully updated date channel name')
            } else return
        }
        setInterval(updateDate, 10000)
    })
})()
