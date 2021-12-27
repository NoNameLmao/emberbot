import fs = require('fs/promises');
import brain = require('brain.js');
const net = new brain.recurrent.LSTM();
type Value = string | number | boolean | string[] | number[] | boolean[];
interface data {
	input: Value,
	output: Value
}
(async () => {
	const data = JSON.parse(await fs.readFile('data.json', { encoding: 'utf8'})) as data[];
	console.log('Training...');
	const d = new Date().getTime();
	net.train(data, {
		iterations: 5000,
		log: true,
		errorThresh: 0.001,
		logPeriod: 1,
		learningRate: 0.001,
	});
	await fs.writeFile('neuralnet.json', JSON.stringify(net.toJSON())).catch(console.error);
	console.log(`Finished in ${(new Date().getTime() - d) / 1000} s`);
});
