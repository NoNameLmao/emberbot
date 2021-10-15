const fs = require('fs');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
let { botChannel } = require('../server');

net.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));

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