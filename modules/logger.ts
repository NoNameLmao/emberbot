import winston from 'winston'
const logger = winston
const { transports: { File, Console } } = logger
logger.remove(Console)
logger.add(File, {
    filename: 'emberbot.log'
})
logger.add(Console, {
    timestamp() { return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` },
    colorize: true
})
export function log(level: 'info' | 'warn' | 'error', text: string): void {
    logger.log(level, text)
}
log('info', 'Loaded logger')
