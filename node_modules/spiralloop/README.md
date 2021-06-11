# SpiralLoop
Ever wanted to do a for loop starting from the center instead of a corner? Now you can!

# Install
```js
npm install spiralloop
```

# Usage

spiral(Lengths, [Center], Function)

### Lengths
An array of the lengths of your loop, such as [4, 4] or [5, 3, 7]. Handles array lengths as long as you'd like.

### Center (Optional)
The default center is in the middle (1.5, 1.5 of a 3x3) but feel free to change this up.

### Function
A function that will give paramaters of the current value. For example:
```
function(x, y, z) { }
```
If you return true in this function, it will act as a "break".

# Example
```js
var spiral = require('spiralloop');

spiral([3, 3], function(x, y) {
	console.log(x + ', ' + y);
});
```