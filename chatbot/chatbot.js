const fs = require('fs');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

net.fromJSON(JSON.parse(fs.readFileSync('./chatbot/neuralnet.json', 'utf8')));

/**
 * Run a string through the net.
 * @param {string} string
 * @returns {string} string
 */
function netRun(string) {
    return net.run(string);
}

module.exports = {
    netRun,
};