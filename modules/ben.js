const { TextChannel, CommandInteraction, Message } = require("discord.js")
const { chance, sleep } = require("emberutils")

module.exports = class Ben {
    onPhone = false
    responses = ['no', 'yes', 'ho ho ho ho', 'eugh']
    /** @type {CommandInteraction} */
    interaction
    /** @type {TextChannel} */
    channel
    /**
     * Create a Ben instance.
     * @param {CommandInteraction} interaction Discord slash command interaction to reply to.
     */
    constructor(interaction) {
        this.interaction = interaction
        this.channel = interaction.channel
    }

    /**
     * Start a call with Ben.
     */
    async newCall() {
        this.onPhone = true
        await this.ring()
        await this.pickUp()
        await this.name()
        await this.handleAnswer()
    }

    // discord
    /**
     * Wait for a message that isn't sent by the bot
     * @return {Promise<Message>}
     */
    waitForMessage() { 
        return new Promise(async (resolve, reject) => {
            setTimeout(reject, 5000)
            this.interaction.client.on('messageCreate', message => {
                if (message.channel.id === this.channel.id) {
                    if (message.author.id === this.interaction.client.user.id) return
                    resolve(message)
                }
            })
        })
    }
    /** 
     * Handle an answer after waiting for message
     */
    async handleAnswer() {
        /** @type {string} */
        let response;
        await this.waitForMessage().catch(async () => {
            await this.channel.send('*hangs up*')
            response = 'hang up'
        })
        if (chance(15)) {
            await sleep(2500)
            await this.channel.send('*hangs up*')
            response = 'hang up'
        }
        if (response === 'hang up') {
            this.onPhone = false
            return
        }
        response = this.responses[Math.floor(Math.random() * this.responses.length)]
        await sleep(1500)
        await this.channel.send(response)
        await this.handleAnswer()
    }

    // ben actions
    /**
     * Ring the phone
     */
    async ring() {
        await this.channel.send('*ringing*')
        await sleep(1000)
    }
    /**
     * Pick up the phone
     */
    async pickUp() {
        await this.channel.send('*picks up*')
        await sleep(1000)
    }
    /**
     * Say Ben's name
     */
    async name() {
        await this.channel.send('ben?')
    }
}