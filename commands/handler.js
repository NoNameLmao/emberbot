import { log } from '../modules/logger'
import fs from 'fs/promises'

export class CommandHandler {
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
            await client.application.commands.set(this.commands).catch(e => {
                const error = e
                log('error', 'Global slash command update failed!')
                log('error', `  · Error message: ${error.message}`)
                this.commands.forEach(command => console.log(command))
                reject(error)
            })
            log('info', 'Finished refreshing global slash commands')
            resolve()
        })
    }
    updateGuildSlashCommands(client, guildID) {
        if (!this.initialized) throw new ErrorNotInitialized()
        return new Promise(async resolve => {
            log('info', 'Started updating guild slash commands')
            const guild = client.guilds.cache.get(guildID)
            await guild.commands.set(this.commands)
            log('info', 'Finished refreshing guild slash commands')
            resolve()
        })
    }
    handleCommand(interaction) {
        if (!this.initialized) throw new ErrorNotInitialized()
        const args = interaction.options
        const commandInMessage = interaction.commandName
        const matchingSlashCommand = this.commands.filter(command => command.name == commandInMessage)[0]
        if (!matchingSlashCommand) {
            const msg = 'what a mystery, that command was not found. wait until discord updates my global slash commands or something'
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
            return
        }
        try {
            matchingSlashCommand.run(interaction, args)
        } catch (error) {
            const msg = `❌ oh... an error occured while running this command. please contact emberglaze for help and a poop code fix`
            CommandHandler.replyToCommand({ interaction, options: { content: msg } })
        }
    }
    static replyToCommand({ interaction, options }) {
        return interaction.reply(options)
    }
}
class ErrorNotInitialized extends Error {
    message = 'Command handler has not been initialized! Run init() first'
}
