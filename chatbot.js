const { client } = require('./server');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

net.train([
    {
        input: ['hi', 'hello', 'hey'], output: ['hi', 'hello', 'hey'],
    },
    {
        input: 'how are you', output: ['good', 'bad', 'fine', 'alright', 'im feeling like techoblade rn'],
    },
]);

/**
 * Run a string through the net.
 * @param {string} string
 * @returns {String} string
 */
function netRun(string) {
    return net.run(string);
}

module.exports = {
    netRun,
};