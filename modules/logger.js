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
/**
 * @param {'info' | 'warn' | 'error'} level
 * @param {string} text
 */
export function log(level, text) {
    logger.log(level, text)
}
log('info', 'Loaded logger')
