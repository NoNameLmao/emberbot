const { jsonRead } = require("emberutils")

/**
 * @returns {Promise<import('./interfaces').MiscJSON>}
 */
async function readMisc() {
    return await jsonRead('../misc.json')
}
module.exports = readMisc