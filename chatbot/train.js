const fs = require('fs');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM({
    activation: 'leaky-relu',
});

let trainingData = [];

// read training data, begin training a new neutral net
function loadInitialTraining() {
    train(JSON.parse(fs.readFileSync('data.json')));
}
function loadTraining() {
    net.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
	train(JSON.parse(fs.readFileSync('data.json')));
}
function saveTrainingData() {
    try {
		fs.writeFile('neuralnet.json', JSON.stringify(net.toJSON()), (err, result) => {
			if (err) console.log(`Error: ${err}`);
		});
	} catch (error) {
		console.log(error);
	}
}
function testTrainingModel() {
    net.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));
}

const train = (dt) => {
	console.log('Training.');
	const d = new Date();
	net.train(dt, {
		iterations: 100,
		log: true,
		errorThresh: 0.001,
		logPeriod: 5,
		momentum: 0.1,
		learningRate: 0.001,
	});
	saveTrainingData();
	console.log(`Finished in ${(new Date() - d) / 1000} s`);
};
const init = () => {
    loadInitialTraining();
};
init();
