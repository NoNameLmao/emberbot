import fetch from 'node-fetch'
import { client } from '../index'
import { log } from './logger'

/**
 * Send the bot's server count to bots.moe
 */
export function botsmoeFetchGuildCount() {
    log('info', 'Fetching bots.moe...')
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://bots.moe/api/bot/848217938288967710/server_count', {
                method: 'POST',
                body: JSON.stringify({
                    server_count: client.guildCount
                }),
                headers: {
                    'Authorization': process.env.BOTS_MOE_API_KEY,
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
