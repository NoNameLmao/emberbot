const logger = require('winston')
const { transports: { File, Console } } = logger
logger.remove(Console)
logger.add(Console, {
    timestamp() { return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}` },
    colorize: true,
})
logger.setLevels({
    error: 0,
    warn: 1,
    info: 2,
    eval: 3
})
logger.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    eval: 'orange'
})
/**
 * @param {'info' | 'warn' | 'error' | 'eval'} level
 * @param {string} text
 */
function log(level, text) {
    logger.log(level, text)
}
log('info', 'Loaded logger')
module.exports = log
