require('colors').enable()
class Logger {
    error(stuff) { console.log(`${formatDate()} - ${'error'.red}:`, stuff) }
    warn(stuff) { console.log(`${formatDate()} - ${' warn'.yellow}:`, stuff) }
    info(stuff) { console.log(`${formatDate()} - ${' info'.cyan}:`, stuff) }
}
function formatDate() {
    return `${new Date().toLocaleDateString().replace(/\//g, '.')} ${new Date().toLocaleTimeString()}`
}
module.exports = new Logger()