const DiscordClient = require('./discord_client.js')
const { Routes } = require('discord.js')
const logger = require('./logger.js')
const fs = require('fs').promises
const { REST } = require('@discordjs/rest')

module.exports = class CommandHandler {
    /** @type {import('./interfaces').Command[]} */
    commands = []
    initialized = false
    rest
    async init() {
        logger.info('Reading the command folder...')
        this.files = await fs.readdir('./commands', { withFileTypes: true })
        logger.info(`Reading the command folder complete, ${fs.readdir.length} commands found`)
        logger.info('Importing commands')
        let fileImportPromises = []
        for (const file of this.files) {
            fileImportPromises.push(this.importCommand(file.name))
        }
        this.rest = new REST({ version: '10' }).setToken(process.env.DJS_TOKEN)
        this.initialized = true
        return Promise.all(fileImportPromises)
    }
    /**
     * @param {string} filename
     * */
    async importCommand(filename) {
        if (!filename.endsWith('.js')) return;
        logger.info(`  · Importing file ${filename}...`)
        const startTime = Date.now()
        /** @type {import('./interfaces').Command} */
        const command = await import(`../commands/${filename}`)
        logger.info(`  · Finished importing file ${filename}:`)
        logger.info(`    - Command name: ${command.data.name}`)
        logger.info(`    - Time taken: ${(Date.now() - startTime) / 1000}s`)
        this.commands.push(command)
        return command
    }
    /** @param {import('discord.js').Interaction} interaction */
    handleCommand(interaction) {
        if (!this.initialized) throw new ErrorNotInitialized()
        if (!interaction.isCommand()) return
        const matchingCommand = this.commands.filter(command => interaction.commandName === command.data.name)[0]
        if (!matchingCommand) return
        try {
            matchingCommand.default.run(interaction)
        } catch (error) {
            if (!interaction.deferred) interaction.reply(`❌ Error has occured while running this command: \`${error.message}\`. Please contact emberglaze about this`)
            else interaction.editReply(`❌ Error has occured while running this command: \`${error.message}\`. Please contact emberglaze about this`)
            logger.error(`❌ Command execution error!`)
            logger.error(`  · Error message: ${error.message}`)
            logger.error(`  · Full stack trace:\n${error.stack}`)
        }
    }
    /** @param {DiscordClient} client */
    updateSlashCommands(client) {
        if (!this.initialized) throw new ErrorNotInitialized()
        return new Promise(async (resolve, reject) => {
            logger.info('Started refreshing global slash commands')
            await client.application.commands.set(this.commands.map(command => command.data)).catch(error => {
                console.log(this.commands.map(command => command.data))
                logger.error('Global slash command update failed!')
                logger.error(`  · Error message: ${error.message}`)
                logger.error(`  · Full stack trace:\n${error.stack}`)
                reject(error)
            })
            logger.info('Finished refreshing global slash commands')
            resolve()
        })
    }
    /** @param {DiscordClient} client @param {string} guildID */
    resetGuildSlashCommands(client, guildID) {
        this.rest.get(Routes.applicationGuildCommands(client.application.id, guildID)).then(data => {
            const promises = []
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(client.application.id, guildID)}/${command.id}`
                promises.push(this.rest.delete(deleteUrl))
            }
            return Promise.all(promises)
        })
    }
}
class ErrorNotInitialized extends Error {
    message = 'Command handler has not been initialized! Run init() first'
}
