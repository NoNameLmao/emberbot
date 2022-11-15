const startTime = Date.now()

const { limit } = require('emberutils')
const serverline = require('serverline')
const CommandHandler = require('./modules/command_handler.js')
const logger = require('./modules/logger.js')
const DiscordClient = require('./modules/discord_client.js')
const CandyVan = require('./modules/candy-van.js')
const ChatbotClient = require('./modules/chatbot.js')
logger.info('Starting...')

const dcClient = new DiscordClient()
const commandHandler = new CommandHandler()
const candyVan = new CandyVan()
const chatbot = new ChatbotClient(process.env.LEBYY_CHATBOT_API_KEY)
module.exports = { dcClient, commandHandler, chatbot };

(async () => {
    await dcClient.init()
    await commandHandler.init()
    await candyVan.init(dcClient)
    serverline.init()
    serverline.setPrompt('eval > ')
    serverline.on('line', line => eval(line))

    dcClient.once('ready', async () => {
        process.on('uncaughtException', err => {
            if (err.message.includes('Cannot send an empty message')) logger.warn('Empty message error')
            else {
                logger.error(`Uncaught exception!`)
                logger.error(`  · Error message: ${err.message}`)
                logger.error(`  · Full error stack:\n${err.stack}`)
            }
        })
        await commandHandler.updateSlashCommands(dcClient)
        logger.info(`Discord bot is ready after ${(Date.now() - startTime) / 1000}s`)
        candyVan.monitorJoinsAndLeaves()
        dcClient.on('messageCreate', async message => {
            if (message.content === `<@${dcClient.user.id}>`) message.channel.send(`use slash commands im too lazy to remake it with classic commands`)
            if (message.channel.type === 'DM') {
                if (message.author.id !== dcClient.user.id) {
                    logger.info('Recieved a direct message!')
                    logger.info(`  · Author: ${message.author.tag}`)
                    logger.info(`  · Content:\n${message.content}`)
                } else {
                    logger.info(`Sent a direct message!`)
                    logger.info(`  · Recipient: ${message.channel.recipient.tag}`)
                    logger.info(`  · Content:\n${message.content}`)
                }
            }

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
        // const guilds = dcClient.guilds.cache
        // for await (const guildCacheCollectionEntry of guilds) {
        //     const guild = guildCacheCollectionEntry[1]
        //     commandHandler.resetGuildSlashCommands(dcClient, guild.id)
            // await commandHandler.updateGuildSlashCommands(dcClient, guild.id).catch(error => {
            //     if (error.message == ('Missing Access')) {
            //         logger.warn('No permission to update slash commands.')
            //         logger.warn('  · Guild:')
            //         logger.warn(`    - Name: ${guild.name}`)
            //         logger.warn(`    - ID: ${guild.id}`)
            //     } else {
            //         logger.error('Unknown guild slash command update error!')
            //         logger.error('  · Guild information:')
            //         logger.error(`    - Name: ${guild.name}`)
            //         logger.error(`    - ID: ${guild.id}`)
            //         logger.error('  · Error:')
            //         logger.error(`    - Message: ${error.message}`)
            //     }
            // })
        // }
        dcClient.on('interactionCreate', interaction => {
            if (interaction.isCommand()) {
                logger.info('Recieved a command interaction')
                logger.info(`  · Name: ${interaction.commandName}`)
                logger.info(`  · Author: ${interaction.user.tag}`)
                logger.info(`  · Guild: ${interaction.guild.name}`)
                commandHandler.handleCommand(interaction)
            }
        })
        // dcClient.on('guildCreate', guild => {
        //     commandHandler.updateGuildSlashCommands(dcClient, guild.id).then(() => {
        //         logger.info('Successfully updated slash commands')
        //         logger.warn('  · Guild:')
        //         logger.warn(`    - Name: ${guild.name}`)
        //         logger.warn(`    - ID: ${guild.id}`)
        //     }).catch(error => {
        //         if (error.message == ('Missing Access')) {
        //             logger.warn('No permission to update slash commands.')
        //             logger.warn('  · Guild:')
        //             logger.warn(`    - Name: ${guild.name}`)
        //             logger.warn(`    - ID: ${guild.id}`)
        //         } else {
        //             logger.error('Unknown guild slash command update error!')
        //             logger.error('  · Guild information:')
        //             logger.error(`    - Name: ${guild.name}`)
        //             logger.error(`    - ID: ${guild.id}`)
        //             logger.error('  · Error:')
        //             logger.error(`    - Message: ${error.message}`)
        //         }
        //     })
        // })
    })
})()
