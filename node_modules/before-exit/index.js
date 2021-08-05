'use strict';

const actions = [];

function addAction (fn) {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function but got a ' + typeof fn);
  }
  actions.push(fn);
}

function doActions (signal) {
  Promise.all(actions.map(action => action(signal))).then(function () {
    process.exit(0);
  }).catch(function () {
    process.exit(1);
  });
}

const signals = ['SIGINT', 'SIGTERM'];

signals.forEach(function (signal) {
  process.on(signal, function () {
    doActions(signal);
  });
});

module.exports = {
  do: addAction
};
