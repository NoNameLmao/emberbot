const { getRandomInt } = require('emberutils')
const logger = require('./logger.js')

module.exports = class WordHippo {
    base = 'https://www.wordhippo.com/what-is'
    async init() {
        logger.info('[WordHippo] Initializing...')
        const startTime = Date.now()
        this.jsdom = await import('jsdom')
        logger.info(`[WordHippo] JSDOM import complete after ${(Date.now() - startTime) / 1000}s`)
    }
    async oppositeOf(word) {
        logger.info(`[WordHippo] Running "oppositeOf" function on ${word}`)
        const startTime = Date.now()
        const rawHTML = await (await fetch(`${this.base}/the-opposite-of/${word}.html`)).text()
        logger.info(`[WordHippo] Raw HTML fetched. Parsing with JSDOM...`)
        const dom = new this.jsdom.JSDOM(rawHTML)
        const definitions = [...dom.window.document.getElementsByClassName('tabdesc')].map(element => element.textContent)
        const words = [...dom.window.document.getElementsByClassName('relatedwords')].map(element => element.textContent).map(words => words.split('\n').filter(e => e))
        /**
         * @type {{ antonyms: string[], definition: string }[]}
         */
        const antonymsByDefinitions = []
        for (let i = 0; i < definitions.length; i++) {
            const definition = definitions[i]
            const antonyms = words[i]
            antonymsByDefinitions.push({ definition, antonyms })
        }
        const definitionIndex = getRandomInt(definitions.length - 1)
        const wordIndex = getRandomInt(antonymsByDefinitions[definitionIndex].antonyms.length - 1)
        const definition = definitions[definitionIndex].replace('\n', '')
        const antonym = antonymsByDefinitions[definitionIndex].antonyms[wordIndex].replace('\n', '')
        logger.ok(`[WordHippo] Parsed in ${(Date.now() - startTime) / 1000}s! | ${antonym} - ${definition}`)
        return {
            antonym: antonym,
            definition: definition,
            time: Date.now() - startTime
        }
    }
    async oppositeOfChain(word, amount) {
        logger.info(`[WordHippo] Running "oppositeOf" function on ${word} ${amount} times`)
        const startTime = Date.now()
        let theword = await this.oppositeOf(word)
        for (let i = 1; i < amount; i++) {
            theword = await this.oppositeOf(theword.antonym)
        }
        logger.ok(`[WordHippo] Finished after ${(Date.now() - startTime) / 1000}s! | ${theword.antonym} - ${theword.definition}`)
        return {
            antonym: theword.antonym,
            definition: theword.definition,
            time: Date.now() - startTime
        }
    }
}