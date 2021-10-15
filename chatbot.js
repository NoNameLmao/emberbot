const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

net.train([
    { input: 'hi', output: 'hello' },
    { input: 'hello', output: 'hi' },
    { input: 'test', output: 'just a test.' },
    { input: 'how are you', output: 'im good' },
    { input: 'search joe', output: 'joe who sir' },
    { input: 'the nuts', output: 'dont miss them' },
    { input: 'ur mom', output: 'i dont have a mom' },
    { input: 'this is better', output: 'sound good' },
    { input: 'he big brain', output: 'i big brain yes'},
    { input: 'my name is deez', output: 'deez what sir' },
    { input: 'are you technoblade', output: 'not yet sadly' },
    { input: 'correct', output: 'sounds like something worked' },
    { input: 'pls talk', output: 'i dont talk, i only send messages' },
    { input: 'do you hate', output: 'im not trained to hate anything/anyone' },
    { input: 'are you better than the older one', output: 'not yet, if you want an already polished company then .chatbot' },
], {
    iterations: 2000,
    log: true,
    errorThresh: 0.001,
    logPeriod: 50,
    momentum: 0.1,
    learningRate: 0.001,
});

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