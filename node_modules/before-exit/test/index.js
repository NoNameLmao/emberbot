/* globals describe, it */

'use strict';

const expect = require('chai').expect;
const fork = require('child_process').fork;

const beforeExit = require('..');

describe('Exit hooks', function () {
  it('should fire twice on SIGINT and exit with code 0', function (done) {
    const signal = 'SIGINT';

    const child = fork(__dirname + '/assets/child-success.js');

    let fired = 0;

    child.on('message', function (data) {
      expect(data).to.equals(signal);
      fired++;
    });

    child.on('close', function (code) {
      expect(fired).to.equals(2);
      expect(code).to.equals(0);
      done();
    });

    setTimeout(function () {
      process.kill(child.pid, signal);
    }, 100);
  });

  it('should fire once on SIGTERM and exit with code 1', function (done) {
    const signal = 'SIGTERM';

    const child = fork(__dirname + '/assets/child-failure.js');

    let fired = 0;

    child.on('message', function (data) {
      expect(data).to.equals(signal);
      fired++;
    });

    child.on('close', function (code) {
      expect(fired).to.equals(1);
      expect(code).to.equals(1);
      done();
    });

    setTimeout(function () {
      process.kill(child.pid, signal);
    }, 100);
  });

  it('should fail if listener is not a function', function () {
    function addListener () {
      beforeExit.do('invalid');
    }
    expect(addListener).to.throw('Expected a function but got a string');
  });
});
