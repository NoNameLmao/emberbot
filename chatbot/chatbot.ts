import fs = require('fs/promises');
import brain = require('brain.js');
const net = new brain.recurrent.LSTM();
(async () => {
    net.fromJSON(JSON.parse(await fs.readFile('./chatbot/neuralnet.json', 'utf8')));
});
export function netRun(string: string): string {
    return net.run(string);
}
