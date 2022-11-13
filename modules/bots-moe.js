const fetch = require('node-fetch')
const log = require('./logger.js')

/**
 * Send the bot's server count to bots.moe
 */
module.exports = function botsmoeFetchGuildCount(apikey, guildCount) {
    log('info', 'Fetching bots.moe...')
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://bots.moe/api/bot/848217938288967710/server_count', {
                method: 'POST',
                body: JSON.stringify({
                    server_count: guildCount
                }),
                headers: {
                    'Authorization': apikey,
                    'Content-Type': 'application/json'
                }
            })
            resolve(await res.json())
            log('info', 'Fetched bots.moe successfully')
        } catch (err) {
            log('warn', 'Failed to fetch bots.moe')
            reject(err)
        }
    })
}
