# Before exit...

Easily add listeners to signals sent to the running process

## Install

```bash
npm install before-exit
```

## Usage

```javascript
const beforeExit = require('before-exit');

beforeExit.do(function (signal) {
  // will be called when the process receives SIGINT or SIGTERM
});
```

### Signal hooks

The module listens automatically for `SIGINT` and `SIGTERM` on initialization.

### Listeners

`do(fn)` adds a listener to the list of function to be called when a signal is received. `fn` will receive the signal name and can optionally return a promise to allow async exit operations to be completed before actually exiting the process.

### Exit and exit code

Once all the listeners complete, the process exits with code `0` but if any listener fails, it will exit with code `1`.

## Notes

As the module expects `Promise` object to exist, it requires node version 4.0 or higher.
