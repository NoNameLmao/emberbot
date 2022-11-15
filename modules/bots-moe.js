const fetch = require('node-fetch')
const logger = require('./logger.js')

/**
 * Send the bot's server count to bots.moe
 */
module.exports = function botsmoeFetchGuildCount(apikey, guildCount) {
    logger.info('Fetching bots.moe...')
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
            logger.info('Fetched bots.moe successfully')
        } catch (err) {
            logger.warn('Failed to fetch bots.moe')
            reject(err)
        }
    })
}
