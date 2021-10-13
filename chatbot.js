const { client } = require('./server');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

net.train([
    { input: 'hi', output: 'hello' },
    { input: 'hello', output: 'hi' },
    { input: 'test', output: 'just a test.' },
    { input: 'how are you', output: 'im good' },
    { input: 'this is better', output: 'sound good' },
    { input: 'pls talk', output: 'i dont talk, i only send messages' },
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