require('colors').enable()
class Logger {
    error(stuff) { console.log(`${formatDate()} - ${' err'.red}:`   , stuff) }
    warn(stuff)  { console.log(`${formatDate()} - ${'warn'.yellow}:`, stuff) }
    info(stuff)  { console.log(`${formatDate()} - ${'info'.cyan}:`  , stuff) }
    ok(stuff)    { console.log(`${formatDate()} - ${'  ok'.green}:` , stuff) }
}
function formatDate() {
    return `${new Date().toLocaleDateString().replace(/\//g, '.')} ${new Date().toLocaleTimeString()}`
}
module.exports = new Logger()