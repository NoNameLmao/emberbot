const startTime = Date.now()

const { limit } = require('emberutils')
const serverline = require('serverline')
const CommandHandler = require('./commands/handler.js')
const { chatbot } = require('./modules/chatbot.js')
const { log } = require('./modules/logger.js')
const DiscordClient = require('./modules/client.js')
const CandyVan = require('./modules/candy-van.js')
log('info', 'Starting...')

const dcClient = new DiscordClient()
const commandHandler = new CommandHandler()
const candyVan = new CandyVan()
module.exports = { dcClient, commandHandler };

(async () => {
    await dcClient.init()
    await commandHandler.init()
    await candyVan.init(dcClient)
    serverline.init()
    serverline.setPrompt('eval > ')
    serverline.on('line', line => log('eval', `Eval output:\n${eval(line)}`))

    dcClient.once('ready', async () => {
        process.on('uncaughtException', err => {
            if (err.message.includes('Cannot send an empty message')) log('warn', 'Empty message error')
            else {
                log('error', `Uncaught exception!`)
                log('error', `  · Error message: ${err.message}`)
                log('error', `  · Full error stack:\n${err.stack}`)
            }
        })
        log('info', `Discord bot is ready after ${(Date.now() - startTime) / 1000}s`)
        dcClient.on('messageCreate', async message => {
            if (message.content === `<@${dcClient.user.id}>`) message.channel.send(`use slash commands 🥺🥺🥺🙏🙏🙏`)
            if (message.channel.type === 'DM') {
                if (message.author.id !== dcClient.user.id) {
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

            const suscommand = message.content.slice(1).trim().toLowerCase()
            if (message.content.startsWith('$') && message.author.id === dcClient.emberglazeID) {
                exec(suscommand, (_, stdout, stderr) => {
                    message.reply({
                        content: stderr.length > 0 ? `stderr:\n\`\`\`${limit(stderr, 498)}\`\`\`` : `stdout:\n\`\`\`${limit(stdout, 498)}\`\`\``,
                        allowedMentions: { repliedUser: true }
                    })
                })
            }
        })
        const guilds = dcClient.guilds.cache
        for await (const guildCacheCollectionEntry of guilds) {
            const guild = guildCacheCollectionEntry[1]
            await commandHandler.updateGuildSlashCommands(dcClient, guild.id).catch(error => {
                if (error.message == ('Missing Access')) {
                    log('warn', 'No permission to update slash commands.')
                    log('warn', '  · Guild:')
                    log('warn', `    - Name: ${guild.name}`)
                    log('warn', `    - ID: ${guild.id}`)
                } else {
                    log('error', 'Unknown guild slash command update error!')
                    log('error', '  · Guild information:')
                    log('error', `    - Name: ${guild.name}`)
                    log('error', `    - ID: ${guild.id}`)
                    log('error', '  · Error:')
                    log('error', `    - Message: ${error.message}`)
                }
            })
        }
        dcClient.on('interactionCreate', interaction => {
            if (interaction.isCommand()) {
                log('info', 'Recieved a command interaction')
                log('info', `  · Name: ${interaction.commandName}`)
                log('info', `  · Author: ${interaction.user.tag}`)
                log('info', `  · Guild: ${interaction.guild.name}`)
                commandHandler.handleCommand(interaction)
            }
        })
        dcClient.on('guildCreate', guild => {
            commandHandler.updateGuildSlashCommands(dcClient, guild.id).then(() => {
                log('info', 'Successfully updated slash commands')
                log('warn', '  · Guild:')
                log('warn', `    - Name: ${guild.name}`)
                log('warn', `    - ID: ${guild.id}`)
            }).catch(error => {
                if (error.message == ('Missing Access')) {
                    log('warn', 'No permission to update slash commands.')
                    log('warn', '  · Guild:')
                    log('warn', `    - Name: ${guild.name}`)
                    log('warn', `    - ID: ${guild.id}`)
                } else {
                    log('error', 'Unknown guild slash command update error!')
                    log('error', '  · Guild information:')
                    log('error', `    - Name: ${guild.name}`)
                    log('error', `    - ID: ${guild.id}`)
                    log('error', '  · Error:')
                    log('error', `    - Message: ${error.message}`)
                }
            })
        })
    })
})()