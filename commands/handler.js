const { log } = require('../modules/logger.js')
const fs = require('fs').promises

module.exports = class CommandHandler {
    /** @type {import('../modules/interfaces').SlashCommand[]} */
    commands = []
    files
    initialized = false
    async init() {
        log('info', 'Reading "commands" folder...')
        this.files = await fs.readdir('./commands/')
        log('info', 'Importing all commands...')
        for await (const file of this.files) {
            const command = await CommandHandler.importCommand(file)
            if (typeof command === 'undefined') continue
            if (!command.name) continue
            this.commands.push(command)
        }
        this.initialized = true
    }
    /**
     * @param {string} fileName 
     * @returns {Promise<import('../modules/interfaces').SlashCommand>}
     */
    static async importCommand(fileName) {
        if (!fileName.endsWith('.js') || fileName == 'handler.js') {
            log('warn', `Ignoring file ${fileName}...`)
            return
        }
        log('info', `  · Importing file ${fileName}...`)
        const startTime = Date.now()
        const command = await import(`./${fileName}`)
        log('info', `  · Finished importing file ${fileName}:`)
        log('info', `    - Command name: ${command.name}`)
        log('info', `    - Time taken: ${(Date.now() - startTime) / 1000}s`)
        return command
    }
    updateSlashCommands(client) {
        if (!this.initialized) throw new ErrorNotInitialized()
        return new Promise(async (resolve, reject) => {
            log('info', 'Started refreshing global slash commands')
            await client.application.commands.set(this.commands).catch(error => {
                log('error', 'Global slash command update failed!')
                log('error', `  · Error message: ${error.message}`)
                reject(error)
            })
            log('info', 'Finished refreshing global slash commands')
            resolve()
        })
    }
    /**
     * @param {import('../modules/client.js')} client 
     * @param {string} guildID 
     * @returns {Promise<void>}
     */
    updateGuildSlashCommands(client, guildID) {
        if (!this.initialized) throw new ErrorNotInitialized()
        return new Promise(async (resolve, reject) => {
            const guild = client.guilds.cache.get(guildID)
            await guild.commands.set(this.commands).catch(error => {
                reject(error)
            })
            resolve()
        })
    }
    /** @param {import('discord.js').CommandInteraction} interaction */
    handleCommand(interaction) {
        if (!this.initialized) throw new ErrorNotInitialized()
        const args = interaction.options
        const matchingSlashCommand = this.commands.filter(command => command.name == interaction.commandName)[0]
        if (!matchingSlashCommand) {
            const msg = 'the command you just tried to ran wasn\'t found by me, time to panic'
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            return
        }
        try {
            matchingSlashCommand.default.run(interaction, args)
        } catch (error) {
            const msg = `❌ some error happened while running this command, contact emberglaze`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            throw error
        }
    }
    static replyToCommand({ interaction, options }) {
        return interaction.reply(options)
    }
}
class ErrorNotInitialized extends Error {
    message = 'Command handler has not been initialized! Run init() first'
}
