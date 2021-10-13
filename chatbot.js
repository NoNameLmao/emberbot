const { client } = require('./server');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

net.train([
    { input: 'hi', output: 'hi' },
    { input: 'hi', output: 'hello' },
    { input: 'hello', output: 'hi' },
    { input: 'hello', output: 'hello' },
    { input: 'how are you', output: 'im good' },
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