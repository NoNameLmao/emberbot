# chance.js
Simplest & smallest random weighted function execution library, so that you can execute weighted functions with ease.


## Installation
```
$ npm install chance.js
```

## Example
```js
var Chance = require('chance.js');

var result = {
    05: 0,
    15: 0,
    20: 0,
    60: 0
};

var chance = new Chance([{
    w: 60, // weight: 60%
    f: function (v) { // functions can accept arguments
        result[60]++;
    }
}, {
    w: 15, // weight: 15%
    f: function (v) {
        result[15]++;
    }
}, {
    w: 20, // weight: 20%
    f: function (v) {
        result[20]++;
    }
}, {
    w: 5, // weight: 05%
    f: function (v) {
        result[05]++;
    }
}]);


for (var i = 0; i < 100; i++) {
    chance.next('some arg'); // you can pass arguments
};

console.log(result);
```
