'use strict';

const beforeExit = require('../..');

beforeExit.do(function (signal) {
  process.send(signal);
});

beforeExit.do(function (signal) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      process.send(signal);
      resolve();
    }, 100);
  });
});

setTimeout(function () {
  process.send('Aborting...');
}, 1000);
