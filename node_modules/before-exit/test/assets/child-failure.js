'use strict';

const beforeExit = require('../..');

beforeExit.do(function (signal) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      process.send(signal);
      reject();
    }, 100);
  });
});

setTimeout(function () {
  process.send('Aborting...');
}, 1000);
