import { ChatBotMessageOptions, ChatBotApiResponse } from './interfaces'
import superagent from 'superagent'
import { log } from './logger'

class ChatBotClient {
    base = "https://api.affiliateplus.xyz/api"
    translateBase = "https://translate-api.ml"
    /**
     * @param {ChatBotMessageOptions} options
     * @returns {ChatBotApiResponse}
     */
    async fetchResponse(options) {
        const { language, message, name, owner, user } = options
        if (language.toLowerCase() === "en" || language.toLowerCase() === "english") {
            const res = await superagent.get(
                `${this.base}/chatbot?message=${encodeURIComponent(message)}&botname=${encodeURIComponent(name)}&ownername=${encodeURIComponent(owner)}&user=${encodeURIComponent(user)}`
            ).type("json").accept("json")
            return res.body
        }
    }
    /**
     * @param {ChatBotMessageOptions} options 
     * @returns {string}
     */
    async chat(options) {
        if (!options.message || options.message.length == 0) throw new Error('No message was provided')
        if (!options.language || options.language.length == 0) options.language = 'en'
        if (!options.user || options.user.length == 0) throw new Error('No user was provided')
        if (!options.name || options.name.length == 0) options.name = 'emberbot'
        if (!options.owner || options.owner.length == 0) options.owner = 'emberglaze'
        if (options.message.length > 5000) throw new Error('Message too long! (over 5000 characters)')

        const response = await this.fetchResponse(options).catch(error => { throw error })
        return response.message
    }
}
export const chatbot = new ChatBotClient()
log('info', 'Created chatbot client')
