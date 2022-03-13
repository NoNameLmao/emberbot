import { commandHandler, europesim } from ".."
import { DiscordClient } from "./client"
import { readConfig } from "./config"
import { log } from "./logger"

export class Europesim {
    startDate: number
    startYear: number
    currentYear: number
    currentMonth: string
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    private initialized = false
    private notInitializedError = 'Europesim class not initialized! Run init() first'

    constructor(startDate?: string, startYear?: number) {
        log('info', 'Creating Europesim class...')
        this.startDate = Date.parse(startDate)
        this.startYear = startYear
    }
    init() {
        log('info', 'Initializing Europesim class...')
        return new Promise<void>(async (resolve, reject) => {
            try {
                const { europesimStartDate, europesimStartYear } = await readConfig()
                if (!this.startDate) this.startDate = Date.parse(europesimStartDate)
                if (!this.startYear) this.startYear = europesimStartYear
                this.initialized = true
                log('info', 'Initialized Europesim successfully')
                resolve()
            } catch (e) {
                const error = <Error>e
                log('error', 'Initializing Europesim failed')
                reject(error)
            }
        })
    }
    updateDate() {
        if (!this.initialized) throw new Error(this.notInitializedError)
        try {
            this.currentYear = Math.floor(this.startYear + (Date.now() - this.startDate) / (1000 * 3600 * 24))
            this.currentMonth = this.months[Math.floor(new Date().getUTCHours() / 2)]
        } catch (e) {
            const error = <Error>e
            throw error
        }
    }
    async guildUpdateSlashCommands(client: DiscordClient) {
        return new Promise<void>(async (resolve, reject) => {
            log('info', 'Started refreshing europesim guild slash commands')
            await client.europesim.guild.commands.set(commandHandler.commands).catch(error => {
                if (error instanceof Error) {
                    log('error', 'Europesim guild slash command update failed!')
                    log('error', `  · Error message: ${error.message}`)
                    commandHandler.commands.forEach(command => console.log(command))
                    reject(error)
                }
            })
            log('info', 'Finished refreshing europesim guild slash commands')
            resolve()
        })
    }
    async guildResetSlashCommands(client: DiscordClient) {
        return new Promise<void>(async (resolve, reject) => {
            log('info', 'Started resetting europesim guild slash commands')
            await client.europesim.guild.commands.set([]).catch(error => {
                if (error instanceof Error) {
                    log('error', 'Europesim guild slash command reset failed!')
                    log('error', `  · Error message: ${error.message}`)
                    reject(error)
                }
            })
            log('info', 'Finished resetting europesim guild slash commands')
            resolve()
        })
    }
    get currentDate() {
        if (!this.initialized) throw new Error(this.notInitializedError)
        return {
            currentYear: this.currentYear,
            currentMonth: this.currentMonth,
            formatted: `${this.currentYear}, ${this.currentMonth}`
        }
    }
}
