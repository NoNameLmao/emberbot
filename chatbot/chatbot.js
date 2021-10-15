const fs = require('fs');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
let { botChannel } = require('../server');

if (fs.existsSync('neuralnet.json')) {
    net.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
} else {
    botChannel.send(':x: `Can\'t find the neuralnet file, did you run the train.js thing lol`');
}

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