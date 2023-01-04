const logger = require('./modules/logger.js')
logger.info('Starting...')
const startTime = Date.now()

const { limit } = require('emberutils')
/** @type {import('./modules/interfaces.js').Serverline} */
const serverline = require('serverline')
const CommandHandler = require('./modules/command_handler.js')
const DiscordClient = require('./modules/discord_client.js')
const CandyVan = require('./modules/candy-van.js')
const ChatbotClient = require('./modules/chatbot.js')
const MusicPlayer = require('./modules/music-player.js')
const WordHippo = require('./modules/wordhippo.js')


const dcClient = new DiscordClient()
const commandHandler = new CommandHandler()
const candyVan = new CandyVan()
const chatbot = new ChatbotClient(process.env.LEBYY_CHATBOT_API_KEY)
const musicPlayer = new MusicPlayer(dcClient)
const wordhippo = new WordHippo()
module.exports = { dcClient, commandHandler, chatbot, musicPlayer, wordhippo };

(async () => {
    await dcClient.init()
    await commandHandler.init()
    await wordhippo.init()
    await candyVan.init(dcClient)
    serverline.init()
    serverline.setPrompt('eval > ')
    let serverline_mode = 'eval'
    serverline.on('line', async line => {
        if (serverline_mode == 'eval') {
            if (line == 'commandmode') {
                serverline.setPrompt('cmd > ')
                serverline_mode = 'command'
            } else {
                eval(line)
            }
        } else if (serverline_mode == 'command') {
            if (line.startsWith('clearconsole')) {
                console.clear()
            } else if (line.startsWith('sendmessage')) {
                const commandarr = line.split(' ')
                const args = commandarr.slice(1)
                const channelid = args[0]
                const text = args.slice(1).join(' ')
                dcClient.channels.fetch(channelid).then(channel => {
                    if (channel.isTextBased() && !channel.isVoiceBased()) {
                        channel.send(text)
                        console.log('Message sent')
                    } else {
                        console.log('FAILED Channel either isn\'t text based or is voice based.')
                    }
                }).catch(console.error)
            } else if (line == 'evalmode') {
                serverline_mode = 'eval'
                serverline.setPrompt('eval > ')
            } else if (line == 'help') {
                console.log(
                    `All commands:\n` +
                    `clearconsole - clear the console\n` +
                    `sendmessage  - send a message to a channel`
                )
            }
        }
    })
    dcClient.once('ready', async () => {
        process.on('uncaughtException', err => {
            if (err.message.includes('Cannot send an empty message')) logger.warn('Empty message error')
            else {
                logger.error(`Uncaught exception!`)
                logger.error(`  · Error message: ${err.message}`)
                logger.error(`  · Full error stack:\n${err.stack}`)
            }
        })
        candyVan.monitorJoinsAndLeaves()
        await commandHandler.updateSlashCommands(dcClient)
        logger.info(`Discord bot is ready after ${(Date.now() - startTime) / 1000}s`)
        dcClient.on('messageCreate', async message => {
            if (message.content === `<@${dcClient.user.id}>`) message.channel.send(`sorry the machine im being hosted on is not slow enough to make me ignore you`)
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
        dcClient.on('interactionCreate', interaction => {
            if (interaction.isChatInputCommand()) {
                logger.info('Recieved a command interaction')
                logger.info(`  · Name: ${interaction.commandName}`)
                logger.info(`  · Author: ${interaction.user.tag}`)
                logger.info(`  · Guild: ${interaction.guild.name}`)
                commandHandler.handleCommand(interaction)
            }
        })
    })
})()
